import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

function getSupabaseUser(req: Request): { id: string; email: string } | null {
  try {
    const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
    if (!authHeader) return null;
    const token = authHeader.replace('Bearer ', '').trim();
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    let b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const payload = JSON.parse(atob(b64));
    if (!payload.sub) return null;
    return { id: payload.sub, email: payload.email || '' };
  } catch {
    return null;
  }
}

const ROLE_LEVEL: Record<string, number> = {
  user: 0, host: 1, agent: 2, agency: 3, admin: 4, owner: 5,
};

function isAdmin(role: string): boolean {
  return (ROLE_LEVEL[role] ?? 0) >= 4;
}

function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') || 'unknown';
}

// Liveness check steps in order
const LIVENESS_STEPS = [
  { key: 'face_front', instruction: 'Look directly at the camera', action: 'front' },
  { key: 'blink', instruction: 'Blink your eyes slowly', action: 'blink' },
  { key: 'turn_left', instruction: 'Slowly turn your face to the left', action: 'left' },
  { key: 'turn_right', instruction: 'Slowly turn your face to the right', action: 'right' },
  { key: 'look_up', instruction: 'Slowly look up', action: 'up' },
  { key: 'look_down', instruction: 'Slowly look down', action: 'down' },
  { key: 'zoom', instruction: 'Move your face slightly forward then backward', action: 'zoom' },
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = getSupabaseUser(req);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;
    const clientIP = getClientIP(req);

    // Get user profile
    let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
    if (profiles.length === 0) {
      profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
    }
    const userProfile = profiles && profiles.length > 0 ? profiles[0] : null;
    const userRole = userProfile?.role || 'user';

    // ============================================================
    // 1. START VERIFICATION — create record, return liveness steps
    // ============================================================
    if (action === 'startVerification') {
      // Check if already verified
      if (userProfile?.verification_status === 'verified') {
        return Response.json({
          already_verified: true,
          message: 'Your identity is already verified.',
          profile: userProfile,
        });
      }

      // Count previous failed attempts
      const prevRecords = await base44.asServiceRole.entities.VerificationRecord
        .filter({ user_id: user.id, verification_type: 'face' }, '-created_date', 50);
      const failedCount = (prevRecords || []).filter(r => r.status === 'failed').length;

      if (failedCount >= 3) {
        // Account under review
        if (userProfile) {
          await base44.asServiceRole.entities.UserProfile.update(userProfile.id, {
            verification_status: 'pending',
            safety_status: 'low',
          });
        }

        return Response.json({
          review_required: true,
          message: 'Your account is under review due to multiple failed verification attempts. Please contact support.',
          failed_attempts: failedCount,
        });
      }

      // Create verification record
      const verification = await base44.asServiceRole.entities.VerificationRecord.create({
        user_id: user.id,
        verification_type: 'face',
        status: 'in_progress',
        method: 'ai_liveness_detection',
        liveness_checks: {},
        face_detection_passed: false,
        eye_blink_verified: false,
        head_movement_verified: false,
        anti_spoof_passed: false,
        anti_replay_passed: false,
        ai_fraud_check_passed: false,
        risk_score: 0,
        attempt_count: failedCount + 1,
        metadata: { ip: clientIP, started_at: new Date().toISOString() },
      });

      // Create security event
      await base44.asServiceRole.entities.SecurityEvent.create({
        user_id: user.id,
        event_type: 'face_verification',
        severity: 'low',
        description: `Face verification started (attempt ${failedCount + 1})`,
        ip_address: clientIP,
        risk_level: 'low',
        risk_score: 0,
        status: 'active',
        metadata: { verification_id: verification.id },
      });

      return Response.json({
        verification_id: verification.id,
        steps: LIVENESS_STEPS,
        attempt_count: failedCount + 1,
        failed_attempts: failedCount,
        message: 'Verification started. Follow the on-screen instructions.',
      });
    }

    // ============================================================
    // 2. VERIFY LIVENESS STEP — AI analyzes captured frame
    // ============================================================
    if (action === 'verifyStep') {
      const { verification_id, step_key, frame_url } = body;
      if (!verification_id || !step_key || !frame_url) {
        return Response.json({ error: 'verification_id, step_key, and frame_url are required' }, { status: 400 });
      }

      const verification = await base44.asServiceRole.entities.VerificationRecord.get(verification_id);
      if (!verification) return Response.json({ error: 'Verification record not found' }, { status: 404 });
      if (verification.user_id !== user.id && !isAdmin(userRole)) {
        return Response.json({ error: 'Access denied' }, { status: 403 });
      }

      const step = LIVENESS_STEPS.find(s => s.key === step_key);
      if (!step) return Response.json({ error: 'Invalid step' }, { status: 400 });

      // AI analysis of the captured frame
      const stepPrompts: Record<string, string> = {
        face_front: 'The user should be looking DIRECTLY at the camera with their face centered and eyes open. Verify: (1) a real human face is visible, (2) the face is facing forward (frontal), (3) eyes are open and visible.',
        blink: 'The user should be in the process of BLINKING or have closed eyes. Verify: (1) eyes are closed or partially closed (blinking), (2) the rest of the face is normal.',
        turn_left: 'The user should have turned their face to the LEFT (their left, viewer\'s right). Verify: (1) the face is turned to the side, (2) the nose points to the left, (3) part of the right cheek/ear is more visible.',
        turn_right: 'The user should have turned their face to the RIGHT (their right, viewer\'s left). Verify: (1) the face is turned to the side, (2) the nose points to the right, (3) part of the left cheek/ear is more visible.',
        look_up: 'The user should be looking UP. Verify: (1) the face is tilted upward, (2) eyes are looking up, (3) the chin is raised.',
        look_down: 'The user should be looking DOWN. Verify: (1) the face is tilted downward, (2) eyes are looking down, (3) the chin is lowered.',
        zoom: 'The user should have moved their face closer to or farther from the camera. Verify: (1) a face is visible, (2) the face appears at a different distance than a standard frontal photo.',
      };

      const aiResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `You are an AI liveness detection system for VYRO Live Connect. Analyze this captured camera frame for face verification.

STEP BEING VERIFIED: ${step.instruction}
VERIFICATION REQUIREMENT: ${stepPrompts[step_key] || 'Verify a live human face is present.'}

You must also check for fraud indicators:
- Is this a real live person (not a printed photo, screen display, or mask)?
- Are there signs of a screenshot or screen recording (screen reflections, bezels, pixels)?
- Are there signs of a deepfake or AI-generated face (unnatural textures, blending artifacts)?
- Are there signs of a replay attack (video played on another screen)?
- Are there signs of screen injection (digital overlay, unnatural boundaries)?

Respond with strict JSON:`,
        file_urls: [frame_url],
        response_json_schema: {
          type: "object",
          properties: {
            face_detected: { type: "boolean", description: "true if a human face is visible in the frame" },
            step_passed: { type: "boolean", description: "true if the requested action/pose is correctly performed" },
            is_live_person: { type: "boolean", description: "true if this appears to be a real live person, not a photo/screen/mask" },
            anti_spoof_passed: { type: "boolean", description: "true if no spoofing indicators detected" },
            anti_replay_passed: { type: "boolean", description: "true if no replay/video attack indicators detected" },
            screen_injection_detected: { type: "boolean", description: "true if screen injection / digital overlay detected" },
            deepfake_detected: { type: "boolean", description: "true if deepfake or AI-generated face detected" },
            fake_photo_detected: { type: "boolean", description: "true if a printed photo or screen photo detected" },
            screenshot_detected: { type: "boolean", description: "true if screenshot/screen capture detected" },
            confidence: { type: "number", description: "0-100 confidence score" },
            risk_indicators: { type: "array", items: { type: "string" }, description: "list of detected risk indicators" },
            reason: { type: "string", description: "brief explanation of the analysis" }
          }
        }
      });

      const passed = aiResult.step_passed && aiResult.face_detected && aiResult.is_live_person;
      const fraudDetected = aiResult.fake_photo_detected || aiResult.deepfake_detected ||
        aiResult.screen_injection_detected || aiResult.screenshot_detected;

      // Update liveness checks
      const livenessChecks = verification.liveness_checks || {};
      livenessChecks[step_key] = {
        passed,
        confidence: aiResult.confidence || 0,
        reason: aiResult.reason || '',
        analyzed_at: new Date().toISOString(),
        frame_url,
      };

      // Update specific flags based on step
      const updates: any = { liveness_checks: livenessChecks };
      if (step_key === 'face_front') {
        updates.face_detection_passed = aiResult.face_detected || false;
        updates.anti_spoof_passed = aiResult.anti_spoof_passed || false;
        updates.anti_replay_passed = aiResult.anti_replay_passed || false;
        updates.ai_fraud_check_passed = !fraudDetected;
      }
      if (step_key === 'blink') {
        updates.eye_blink_verified = passed || false;
      }
      if (step_key === 'turn_left' || step_key === 'turn_right' || step_key === 'look_up' || step_key === 'look_down') {
        updates.head_movement_verified = passed || false;
      }

      // Calculate risk score
      let riskScore = verification.risk_score || 0;
      if (fraudDetected) riskScore += 50;
      if (!aiResult.is_live_person) riskScore += 30;
      if ((aiResult.confidence || 0) < 70) riskScore += 10;
      updates.risk_score = Math.min(riskScore, 100);

      await base44.asServiceRole.entities.VerificationRecord.update(verification_id, updates);

      // If fraud detected, immediately fail
      if (fraudDetected) {
        await base44.asServiceRole.entities.VerificationRecord.update(verification_id, {
          status: 'failed',
          failure_reason: `Fraud detected: ${aiResult.risk_indicators?.join(', ')}`,
        });

        await base44.asServiceRole.entities.SecurityEvent.create({
          user_id: user.id,
          event_type: 'fraud_detected',
          severity: 'critical',
          description: `Face verification fraud detected: ${aiResult.risk_indicators?.join(', ')}`,
          ip_address: clientIP,
          risk_level: 'critical',
          risk_score: 90,
          status: 'active',
          metadata: { verification_id, step_key, indicators: aiResult.risk_indicators },
        });

        await base44.asServiceRole.entities.SecurityAlert.create({
          alert_type: 'fraud_detection',
          severity: 'critical',
          target_user_id: user.id,
          title: 'Face verification fraud detected',
          description: `User attempted face verification with fraud indicators: ${aiResult.risk_indicators?.join(', ')}`,
          metadata: { verification_id, step_key, frame_url },
          status: 'active',
          priority: 'critical',
          notifications_sent: false,
        });

        return Response.json({
          passed: false,
          fraud_detected: true,
          step_key,
          confidence: aiResult.confidence || 0,
          reason: 'Fraud detected. Verification failed immediately.',
          risk_indicators: aiResult.risk_indicators,
        });
      }

      return Response.json({
        passed,
        step_key,
        confidence: aiResult.confidence || 0,
        reason: aiResult.reason || '',
        face_detected: aiResult.face_detected,
        is_live_person: aiResult.is_live_person,
        risk_score: updates.risk_score,
      });
    }

    // ============================================================
    // 3. COMPLETE VERIFICATION — finalize and activate account
    // ============================================================
    if (action === 'completeVerification') {
      const { verification_id } = body;
      if (!verification_id) return Response.json({ error: 'verification_id is required' }, { status: 400 });

      const verification = await base44.asServiceRole.entities.VerificationRecord.get(verification_id);
      if (!verification) return Response.json({ error: 'Verification record not found' }, { status: 404 });
      if (verification.user_id !== user.id && !isAdmin(userRole)) {
        return Response.json({ error: 'Access denied' }, { status: 403 });
      }

      const checks = verification.liveness_checks || {};
      const allStepsPassed = LIVENESS_STEPS.every(s => checks[s.key]?.passed);

      const allChecksPassed = verification.face_detection_passed &&
        verification.eye_blink_verified &&
        verification.head_movement_verified &&
        verification.anti_spoof_passed &&
        verification.anti_replay_passed &&
        verification.ai_fraud_check_passed &&
        allStepsPassed;

      if (allChecksPassed) {
        // SUCCESS — activate account
        const now = new Date().toISOString();
        await base44.asServiceRole.entities.VerificationRecord.update(verification_id, {
          status: 'verified',
          verified_by: 'ai_system',
          verified_date: now,
          expires_date: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
        });

        // Update user profile
        if (userProfile) {
          await base44.asServiceRole.entities.UserProfile.update(userProfile.id, {
            verification_status: 'verified',
            is_verified: true,
            safety_status: 'high',
            trust_score: Math.max(userProfile.trust_score || 0, 70),
          });
        }

        // Create security event
        await base44.asServiceRole.entities.SecurityEvent.create({
          user_id: user.id,
          event_type: 'face_verification',
          severity: 'low',
          description: 'Face verification completed successfully. Account activated.',
          ip_address: clientIP,
          risk_level: 'low',
          risk_score: 0,
          status: 'resolved',
          metadata: { verification_id, result: 'verified' },
        });

        // Audit log
        await base44.asServiceRole.entities.AuditLog.create({
          actor_id: user.id,
          actor_role: userRole,
          action: 'other',
          resource_type: 'VerificationRecord',
          resource_id: verification_id,
          details: { result: 'verified', method: 'ai_liveness_detection' },
          ip_address: clientIP,
          reason: 'Face verification passed — account activated',
          is_sensitive: true,
        });

        return Response.json({
          success: true,
          verified: true,
          message: 'Verification Successful. Your identity has been verified and your account is now active.',
          verification_id,
          verified_date: now,
        });
      } else {
        // FAIL — not all steps passed
        await base44.asServiceRole.entities.VerificationRecord.update(verification_id, {
          status: 'failed',
          failure_reason: 'Not all liveness checks passed',
        });

        // Count total failures
        const allRecords = await base44.asServiceRole.entities.VerificationRecord
          .filter({ user_id: user.id, verification_type: 'face' }, '-created_date', 50);
        const totalFails = (allRecords || []).filter(r => r.status === 'failed').length;

        // Create security event
        await base44.asServiceRole.entities.SecurityEvent.create({
          user_id: user.id,
          event_type: 'face_verification',
          severity: totalFails >= 3 ? 'high' : 'medium',
          description: `Face verification failed (attempt ${totalFails})`,
          ip_address: clientIP,
          risk_level: totalFails >= 3 ? 'high' : 'medium',
          risk_score: totalFails >= 3 ? 70 : 30,
          status: 'active',
          metadata: { verification_id, total_fails: totalFails },
        });

        // 3 failures → review required + alerts
        if (totalFails >= 3) {
          if (userProfile) {
            await base44.asServiceRole.entities.UserProfile.update(userProfile.id, {
              verification_status: 'pending',
              safety_status: 'low',
              trust_score: Math.min(userProfile.trust_score || 0, 20),
            });
          }

          // Create alerts for owner/admin/super_admin
          await base44.asServiceRole.entities.SecurityAlert.create({
            alert_type: 'account_takeover_risk',
            severity: 'high',
            target_user_id: user.id,
            title: `Face verification failed 3 times — account under review`,
            description: `User ${userProfile?.username || user.id} failed face verification ${totalFails} times. Account status set to REVIEW_REQUIRED.`,
            metadata: { verification_id, total_fails: totalFails, user_email: user.email },
            status: 'active',
            priority: 'high',
            notifications_sent: false,
          });

          // Create incident
          await base44.asServiceRole.entities.IncidentRecord.create({
            incident_id: `INC-FV-${Date.now()}`,
            title: `Repeated face verification failure: ${userProfile?.username || user.id}`,
            description: `User failed face verification ${totalFails} times. Possible fake account or identity fraud. Account under review.`,
            incident_type: 'fraud',
            severity: 'high',
            risk_classification: 'high',
            status: 'open',
            related_user_ids: [user.id],
            evidence: { verification_id, total_fails: totalFails, user_email: user.email },
            created_by: user.id,
            assigned_role: 'admin',
            is_legal_case: false,
          });

          return Response.json({
            success: false,
            verified: false,
            review_required: true,
            message: 'Verification Failed 3 times. Your account is now under review. Please contact support.',
            total_fails: totalFails,
          });
        }

        return Response.json({
          success: false,
          verified: false,
          message: 'Verification Failed. We could not verify that you are a live person. Please try again.',
          total_fails: totalFails,
          attempts_remaining: 3 - totalFails,
        });
      }
    }

    // ============================================================
    // 4. GET VERIFICATION STATUS
    // ============================================================
    if (action === 'getStatus') {
      if (!userProfile) return Response.json({ verification_status: 'unverified' });

      const records = await base44.asServiceRole.entities.VerificationRecord
        .filter({ user_id: user.id, verification_type: 'face' }, '-created_date', 10);

      const latest = records && records.length > 0 ? records[0] : null;
      const failedCount = (records || []).filter(r => r.status === 'failed').length;

      return Response.json({
        verification_status: userProfile.verification_status || 'unverified',
        is_verified: userProfile.is_verified || false,
        latest_verification: latest ? {
          id: latest.id,
          status: latest.status,
          attempt_count: latest.attempt_count,
          face_detection_passed: latest.face_detection_passed,
          eye_blink_verified: latest.eye_blink_verified,
          head_movement_verified: latest.head_movement_verified,
          anti_spoof_passed: latest.anti_spoof_passed,
          anti_replay_passed: latest.anti_replay_passed,
          ai_fraud_check_passed: latest.ai_fraud_check_passed,
          risk_score: latest.risk_score,
          verified_date: latest.verified_date,
          failure_reason: latest.failure_reason,
        } : null,
        failed_attempts: failedCount,
        review_required: failedCount >= 3,
      });
    }

    // ============================================================
    // 5. GET VERIFICATION DETAILS (admin/owner dashboard)
    // ============================================================
    if (action === 'getVerificationDetails') {
      const { target_user_id } = body;
      if (!isAdmin(userRole)) return Response.json({ error: 'Admin access required' }, { status: 403 });

      const targetId = target_user_id || user.id;

      // Get target user profile
      let targetProfiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: targetId });
      if (targetProfiles.length === 0) {
        targetProfiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: targetId });
      }
      const targetProfile = targetProfiles?.[0] || null;

      // Get verification records
      const verifications = await base44.asServiceRole.entities.VerificationRecord
        .filter({ user_id: targetId, verification_type: 'face' }, '-created_date', 20);

      // Get device records
      const devices = await base44.asServiceRole.entities.DeviceRecord
        .filter({ user_id: targetId }, '-created_date', 10);

      // Get login history (security events with type 'login')
      const loginEvents = await base44.asServiceRole.entities.SecurityEvent
        .filter({ user_id: targetId, event_type: 'login' }, '-created_date', 20);

      // Get security events
      const securityEvents = await base44.asServiceRole.entities.SecurityEvent
        .filter({ user_id: targetId }, '-created_date', 20);

      // Get enforcement actions
      const enforcement = await base44.asServiceRole.entities.EnforcementAction
        .filter({ user_id: targetId }, '-created_date', 10);

      // Calculate security risk score
      const riskScore = Math.min(
        (verifications || []).filter(v => v.status === 'failed').length * 15 +
        (securityEvents || []).filter(e => e.severity === 'critical').length * 25 +
        (securityEvents || []).filter(e => e.severity === 'high').length * 15 +
        (enforcement || []).filter(e => e.status === 'active').length * 10,
        100
      );

      // Latest device info
      const latestDevice = devices && devices.length > 0 ? devices[0] : null;
      const latestLogin = loginEvents && loginEvents.length > 0 ? loginEvents[0] : null;

      return Response.json({
        user_details: {
          user_id: targetId,
          username: targetProfile?.username || '',
          full_name: targetProfile?.full_name || '',
          avatar_url: targetProfile?.avatar_url || '',
          global_id: targetProfile?.global_id || '',
          country: targetProfile?.country || '',
          role: targetProfile?.role || 'user',
          created_date: targetProfile?.created_date || '',
          verification_status: targetProfile?.verification_status || 'unverified',
          is_verified: targetProfile?.is_verified || false,
          phone_verified: true, // Phone OTP was done during registration
          email_verified: !!userProfile?.user_id, // Email is set during auth
          trust_score: targetProfile?.trust_score || 0,
          safety_status: targetProfile?.safety_status || 'medium',
        },
        device_info: latestDevice ? {
          device_id: latestDevice.device_fingerprint || '',
          device_name: latestDevice.device_name || '',
          platform: latestDevice.platform || '',
          os: latestDevice.os || '',
          os_version: latestDevice.os_version || '',
          browser: latestDevice.browser || '',
          browser_version: latestDevice.browser_version || '',
          screen_resolution: latestDevice.screen_resolution || '',
          timezone: latestDevice.timezone || '',
          language: latestDevice.language || '',
          ip_address: latestDevice.ip_address || '',
          country: latestDevice.country || '',
          region: latestDevice.region || '',
          city: latestDevice.city || '',
          is_emulator: latestDevice.is_emulator || false,
          is_rooted: latestDevice.is_rooted || false,
          is_vpn: latestDevice.is_vpn || false,
          is_proxy: latestDevice.is_proxy || false,
          trust_score: latestDevice.trust_score || 0,
          first_seen: latestDevice.first_seen || '',
          last_seen: latestDevice.last_seen || '',
          last_active: latestDevice.last_active || '',
        } : null,
        login_history: (loginEvents || []).map(e => ({
          id: e.id,
          ip_address: e.ip_address,
          country: e.country,
          region: e.region,
          city: e.city,
          device_info: e.device_info,
          user_agent: e.user_agent,
          created_date: e.created_date,
          risk_level: e.risk_level,
        })),
        last_login: latestLogin ? {
          time: latestLogin.created_date,
          ip: latestLogin.ip_address,
          country: latestLogin.country,
          city: latestLogin.city,
          device: latestLogin.device_info,
        } : null,
        last_active: latestDevice?.last_active || latestDevice?.last_seen || targetProfile?.created_date || '',
        verification_records: (verifications || []).map(v => ({
          id: v.id,
          status: v.status,
          attempt_count: v.attempt_count,
          face_detection_passed: v.face_detection_passed,
          eye_blink_verified: v.eye_blink_verified,
          head_movement_verified: v.head_movement_verified,
          anti_spoof_passed: v.anti_spoof_passed,
          anti_replay_passed: v.anti_replay_passed,
          ai_fraud_check_passed: v.ai_fraud_check_passed,
          risk_score: v.risk_score,
          verified_date: v.verified_date,
          failure_reason: v.failure_reason,
          created_date: v.created_date,
          liveness_checks: v.liveness_checks,
        })),
        security_events: (securityEvents || []).map(e => ({
          id: e.id,
          event_type: e.event_type,
          severity: e.severity,
          description: e.description,
          ip_address: e.ip_address,
          risk_level: e.risk_level,
          risk_score: e.risk_score,
          status: e.status,
          created_date: e.created_date,
        })),
        enforcement_actions: (enforcement || []).map(e => ({
          id: e.id,
          action_type: e.action_type,
          reason: e.reason,
          severity: e.severity,
          status: e.status,
          start_date: e.start_date,
          end_date: e.end_date,
          issued_by: e.issued_by,
        })),
        security_risk_score: riskScore,
        account_created: targetProfile?.created_date || '',
      });
    }

    // ============================================================
    // 6. GET ALL PENDING VERIFICATIONS (admin dashboard)
    // ============================================================
    if (action === 'getPendingVerifications') {
      if (!isAdmin(userRole)) return Response.json({ error: 'Admin access required' }, { status: 403 });

      const { limit } = body;
      const searchLimit = limit || 100;

      // Get all verification records that are failed or in_progress
      const [failed, inProgress, reviewProfiles] = await Promise.all([
        base44.asServiceRole.entities.VerificationRecord.filter({ verification_type: 'face', status: 'failed' }, '-created_date', searchLimit).catch(() => []),
        base44.asServiceRole.entities.VerificationRecord.filter({ verification_type: 'face', status: 'in_progress' }, '-created_date', searchLimit).catch(() => []),
        base44.asServiceRole.entities.UserProfile.filter({ verification_status: 'pending' }, '-created_date', searchLimit).catch(() => []),
      ]);

      // Get user profiles for failed verifications
      const failedUserIds = [...new Set((failed || []).map(v => v.user_id))];
      const profilesForFailed = await Promise.all(
        failedUserIds.map(uid => base44.asServiceRole.entities.UserProfile.filter({ user_id: uid }).catch(() => []))
      );
      const profileMap: Record<string, any> = {};
      failedUserIds.forEach((uid, i) => {
        const p = profilesForFailed[i];
        if (p && p.length > 0) profileMap[uid] = p[0];
      });

      return Response.json({
        pending_verifications: {
          failed: (failed || []).map(v => ({
            verification_id: v.id,
            user_id: v.user_id,
            username: profileMap[v.user_id]?.username || '',
            avatar_url: profileMap[v.user_id]?.avatar_url || '',
            country: profileMap[v.user_id]?.country || '',
            attempt_count: v.attempt_count,
            risk_score: v.risk_score,
            failure_reason: v.failure_reason,
            created_date: v.created_date,
          })),
          in_progress: (inProgress || []).map(v => ({
            verification_id: v.id,
            user_id: v.user_id,
            attempt_count: v.attempt_count,
            created_date: v.created_date,
          })),
          review_required: (reviewProfiles || []).map(p => ({
            user_id: p.user_id,
            username: p.username,
            avatar_url: p.avatar_url,
            country: p.country,
            global_id: p.global_id,
            created_date: p.created_date,
            trust_score: p.trust_score,
          })),
        },
        counts: {
          failed: (failed || []).length,
          in_progress: (inProgress || []).length,
          review_required: (reviewProfiles || []).length,
        },
      });
    }

    // ============================================================
    // 7. REGISTER DEVICE (called on login/app load)
    // ============================================================
    if (action === 'registerDevice') {
      const { device_fingerprint, platform, os, os_version, browser, browser_version,
              screen_resolution, timezone, language, is_emulator, is_rooted, is_vpn, is_proxy } = body;

      if (!device_fingerprint) return Response.json({ error: 'device_fingerprint is required' }, { status: 400 });

      // Check if device already registered
      const existing = await base44.asServiceRole.entities.DeviceRecord
        .filter({ user_id: user.id, device_fingerprint });

      const now = new Date().toISOString();

      if (existing && existing.length > 0) {
        // Update existing device
        const device = existing[0];
        const wasTrusted = device.device_category === 'trusted';

        const updated = await base44.asServiceRole.entities.DeviceRecord.update(device.id, {
          last_seen: now,
          last_active: now,
          login_count: (device.login_count || 0) + 1,
          platform: platform || device.platform,
          os: os || device.os,
          os_version: os_version || device.os_version,
          browser: browser || device.browser,
          browser_version: browser_version || device.browser_version,
          screen_resolution: screen_resolution || device.screen_resolution,
          timezone: timezone || device.timezone,
          language: language || device.language,
          is_emulator: is_emulator || false,
          is_rooted: is_rooted || false,
          is_vpn: is_vpn || false,
          is_proxy: is_proxy || false,
          ip_address: clientIP,
        });

        // Device change alert if new device
        if (!wasTrusted && device.device_category === 'new') {
          await base44.asServiceRole.entities.SecurityEvent.create({
            user_id: user.id,
            event_type: 'device_change',
            severity: 'medium',
            description: `Login from ${is_emulator ? 'emulator' : 'new device'}: ${platform || 'Unknown'}`,
            ip_address: clientIP,
            device_fingerprint,
            device_info: `${os} ${os_version} / ${browser} ${browser_version}`,
            risk_level: is_emulator || is_vpn || is_proxy ? 'high' : 'medium',
            risk_score: is_emulator ? 60 : is_vpn || is_proxy ? 40 : 20,
            status: 'active',
            metadata: { device_id: device.id },
          });
        }

        return Response.json({ device: updated, is_new: false });
      }

      // Create new device record
      const isSuspicious = is_emulator || is_vpn || is_proxy || is_rooted;
      const device = await base44.asServiceRole.entities.DeviceRecord.create({
        user_id: user.id,
        device_fingerprint,
        device_name: `${platform || 'Device'} - ${browser || 'Browser'}`,
        device_category: isSuspicious ? 'suspicious' : 'new',
        platform: platform || '',
        os: os || '',
        os_version: os_version || '',
        browser: browser || '',
        browser_version: browser_version || '',
        ip_address: clientIP,
        country: userProfile?.country || '',
        first_seen: now,
        last_seen: now,
        last_active: now,
        trust_score: isSuspicious ? 20 : 50,
        login_count: 1,
        is_emulator: is_emulator || false,
        is_rooted: is_rooted || false,
        is_vpn: is_vpn || false,
        is_proxy: is_proxy || false,
        screen_resolution: screen_resolution || '',
        timezone: timezone || '',
        language: language || '',
      });

      // Create login security event
      await base44.asServiceRole.entities.SecurityEvent.create({
        user_id: user.id,
        event_type: 'login',
        severity: isSuspicious ? 'high' : 'low',
        description: `Login from new ${is_emulator ? 'emulator' : 'device'}: ${platform || 'Unknown'}`,
        ip_address: clientIP,
        device_fingerprint,
        device_info: `${os} ${os_version} / ${browser} ${browser_version}`,
        user_agent: browser ? `${browser}/${browser_version}` : '',
        risk_level: isSuspicious ? 'high' : 'low',
        risk_score: isSuspicious ? 50 : 10,
        status: 'active',
        metadata: { device_id: device.id, is_vpn, is_proxy, is_emulator },
      });

      // If suspicious, create alert
      if (isSuspicious) {
        await base44.asServiceRole.entities.SecurityAlert.create({
          alert_type: 'high_risk_activity',
          severity: 'high',
          target_user_id: user.id,
          title: `Suspicious login detected: ${is_emulator ? 'Emulator' : is_vpn ? 'VPN' : 'Proxy'}`,
          description: `User logged in from ${is_emulator ? 'an emulator' : is_vpn ? 'a VPN' : 'a proxy'}. IP: ${clientIP}`,
          metadata: { device_id: device.id, ip: clientIP, is_emulator, is_vpn, is_proxy },
          status: 'active',
          priority: 'high',
          notifications_sent: false,
        });
      }

      return Response.json({ device, is_new: true });
    }

    // ============================================================
    // 8. CHECK MULTIPLE ACCOUNTS (same device)
    // ============================================================
    if (action === 'checkMultipleAccounts') {
      const { device_fingerprint } = body;
      if (!device_fingerprint) return Response.json({ error: 'device_fingerprint is required' }, { status: 400 });

      // Find all users with this device
      const devices = await base44.asServiceRole.entities.DeviceRecord
        .filter({ device_fingerprint }, '-created_date', 50);

      const userIds = [...new Set((devices || []).map(d => d.user_id))];

      if (userIds.length > 1) {
        // Multiple accounts from same device
        await base44.asServiceRole.entities.SecurityEvent.create({
          user_id: user.id,
          event_type: 'multiple_accounts',
          severity: 'high',
          description: `Multiple accounts detected from same device: ${userIds.length} accounts`,
          ip_address: clientIP,
          device_fingerprint,
          risk_level: 'high',
          risk_score: 60,
          status: 'active',
          metadata: { account_count: userIds.length, user_ids: userIds },
        });

        // Create fraud detection record
        await base44.asServiceRole.entities.FraudDetection.create({
          user_id: user.id,
          fraud_type: 'multiple_account_abuse',
          risk_level: 'high',
          risk_score: 60,
          indicators: [`Multiple accounts from same device: ${userIds.length}`],
          detected_by: 'automated_rule',
          status: 'detected',
          device_fingerprint,
          ip_address: clientIP,
        });

        return Response.json({
          multiple_accounts: true,
          account_count: userIds.length,
          risk_level: 'high',
        });
      }

      return Response.json({ multiple_accounts: false, account_count: 1 });
    }

    return Response.json({
      error: 'Invalid action',
      available_actions: [
        'startVerification', 'verifyStep', 'completeVerification',
        'getStatus', 'getVerificationDetails', 'getPendingVerifications',
        'registerDevice', 'checkMultipleAccounts'
      ],
    }, { status: 400 });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});