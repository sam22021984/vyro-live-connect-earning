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

function getRoleLevel(role: string): number {
  return ROLE_LEVEL[role] ?? 0;
}

function isAdmin(role: string): boolean {
  return getRoleLevel(role) >= 4;
}

function isOwner(role: string): boolean {
  return role === 'owner';
}

function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    'unknown';
}

function getUserAgent(req: Request): string {
  return req.headers.get('user-agent') || 'unknown';
}

// Calculate risk score based on indicators
function calculateRiskScore(indicators: string[], factors: Record<string, any>): number {
  let score = 0;
  if (factors.is_vpn) score += 20;
  if (factors.is_proxy) score += 20;
  if (factors.is_emulator) score += 30;
  if (factors.is_rooted) score += 15;
  if (factors.fake_gps) score += 25;
  if (factors.multiple_accounts) score += 25;
  if (factors.new_device) score += 10;
  if (factors.suspicious_network) score += 15;
  score += Math.min(indicators.length * 5, 30);
  return Math.min(score, 100);
}

function riskLevelFromScore(score: number): string {
  if (score >= 75) return 'critical';
  if (score >= 50) return 'high';
  if (score >= 25) return 'medium';
  return 'low';
}

// Progressive enforcement step mapping
const ENFORCEMENT_STEPS = [
  { type: 'warning', duration: 0 },
  { type: 'temporary_mute', duration: 1 },
  { type: 'temporary_restriction', duration: 24 },
  { type: 'temporary_suspension', duration: 168 },
  { type: 'permanent_ban', duration: 0 },
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = getSupabaseUser(req);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // Get user profile for role check
    const profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
    const userProfile = profiles && profiles.length > 0
      ? profiles.reduce((best: any, p: any) =>
          getRoleLevel(p.role || 'user') > getRoleLevel(best?.role || 'user') ? p : best, profiles[0])
      : null;
    const userRole = userProfile?.role || 'user';
    const clientIP = getClientIP(req);
    const userAgent = getUserAgent(req);

    // ============================================================
    // 1. LOG SECURITY EVENT
    // ============================================================
    if (action === 'logSecurityEvent') {
      const { event_type, severity, description, metadata, device_fingerprint, room_id, session_id, risk_factors } = body;

      if (!event_type) return Response.json({ error: 'event_type is required' }, { status: 400 });

      const riskScore = risk_factors ? calculateRiskScore(metadata?.indicators || [], risk_factors) : 0;
      const riskLevel = riskLevelFromScore(riskScore);

      const event = await base44.asServiceRole.entities.SecurityEvent.create({
        user_id: user.id,
        event_type,
        severity: severity || 'low',
        description: description || '',
        metadata: metadata || {},
        ip_address: clientIP,
        device_fingerprint: device_fingerprint || '',
        device_info: userAgent,
        user_agent: userAgent,
        risk_level: riskLevel,
        risk_score: riskScore,
        room_id: room_id || null,
        session_id: session_id || null,
        status: 'active',
      });

      // Auto-create alert for high/critical events
      if (riskScore >= 50) {
        await base44.asServiceRole.entities.SecurityAlert.create({
          alert_type: 'high_risk_activity',
          severity: riskLevel,
          target_user_id: user.id,
          title: `High-risk event: ${event_type}`,
          description: description || `Risk score ${riskScore} on ${event_type}`,
          metadata: { event_id: event.id, risk_score: riskScore },
          status: 'active',
          priority: riskLevel,
          notifications_sent: false,
        });
      }

      return Response.json({ success: true, event });
    }

    // ============================================================
    // 2. CREATE AUDIT LOG (immutable record)
    // ============================================================
    if (action === 'createAuditLog') {
      const { audit_action, resource_type, resource_id, target_user_id, details, reason } = body;

      if (!audit_action) return Response.json({ error: 'audit_action is required' }, { status: 400 });

      const log = await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: audit_action,
        resource_type: resource_type || '',
        resource_id: resource_id || '',
        target_user_id: target_user_id || '',
        details: details || {},
        ip_address: clientIP,
        user_agent: userAgent,
        reason: reason || '',
        is_sensitive: true,
      });

      return Response.json({ success: true, log });
    }

    // ============================================================
    // 3. RECORD VERIFICATION (face, phone, email, identity, age)
    // ============================================================
    if (action === 'recordVerification') {
      const { verification_type, status, method, liveness_checks, face_detection_passed,
              eye_blink_verified, head_movement_verified, anti_spoof_passed,
              anti_replay_passed, ai_fraud_check_passed, failure_reason, metadata, expires_days } = body;

      if (!verification_type) return Response.json({ error: 'verification_type is required' }, { status: 400 });

      // Count previous attempts
      const previous = await base44.asServiceRole.entities.VerificationRecord
        .filter({ user_id: user.id, verification_type }, '-created_date', 50);

      const attemptCount = (previous?.length || 0) + 1;

      // Calculate risk score based on verification results
      let riskScore = 0;
      if (status === 'failed') riskScore += 40;
      if (attemptCount > 3) riskScore += 20;
      if (face_detection_passed === false) riskScore += 15;
      if (anti_spoof_passed === false) riskScore += 20;
      if (ai_fraud_check_passed === false) riskScore += 25;

      const now = new Date();
      const expires = new Date(now);
      expires.setDate(expires.getDate() + (expires_days || 365));

      const record = await base44.asServiceRole.entities.VerificationRecord.create({
        user_id: user.id,
        verification_type,
        status: status || 'pending',
        method: method || '',
        liveness_checks: liveness_checks || {},
        face_detection_passed: face_detection_passed || false,
        eye_blink_verified: eye_blink_verified || false,
        head_movement_verified: head_movement_verified || false,
        anti_spoof_passed: anti_spoof_passed || false,
        anti_replay_passed: anti_replay_passed || false,
        ai_fraud_check_passed: ai_fraud_check_passed || false,
        risk_score: riskScore,
        verified_by: status === 'verified' ? user.id : '',
        verified_date: status === 'verified' ? now.toISOString() : '',
        expires_date: expires.toISOString(),
        failure_reason: failure_reason || '',
        metadata: metadata || {},
        attempt_count: attemptCount,
      });

      // Log security event
      await base44.asServiceRole.entities.SecurityEvent.create({
        user_id: user.id,
        event_type: 'face_verification',
        severity: status === 'failed' ? 'medium' : 'low',
        description: `Verification ${verification_type}: ${status} (attempt ${attemptCount})`,
        metadata: { verification_id: record.id, risk_score: riskScore },
        ip_address: clientIP,
        risk_level: riskLevelFromScore(riskScore),
        risk_score: riskScore,
        status: 'active',
      });

      // Update UserProfile verification status
      if (status === 'verified' && userProfile) {
        const updates: any = { verification_status: 'verified', is_verified: true };
        if (verification_type === 'age') {
          // Age verification - could update a flag
        }
        await base44.asServiceRole.entities.UserProfile.update(userProfile.id, updates);
      }

      return Response.json({ success: true, record, risk_score: riskScore });
    }

    // ============================================================
    // 4. GET VERIFICATION STATUS
    // ============================================================
    if (action === 'getVerificationStatus') {
      const { target_user_id } = body;
      const targetId = target_user_id || user.id;

      // If checking another user, require admin
      if (target_user_id && target_user_id !== user.id && !isAdmin(userRole)) {
        return Response.json({ error: 'Access denied' }, { status: 403 });
      }

      const records = await base44.asServiceRole.entities.VerificationRecord
        .filter({ user_id: targetId }, '-created_date', 50);

      // Build status summary
      const status: Record<string, any> = {};
      const types = ['phone', 'email', 'face', 'identity', 'age', 'device'];
      for (const t of types) {
        const latest = records?.find(r => r.verification_type === t);
        status[t] = latest ? {
          verified: latest.status === 'verified',
          status: latest.status,
          verified_date: latest.verified_date,
          expires_date: latest.expires_date,
          risk_score: latest.risk_score,
        } : { verified: false, status: 'pending' };
      }

      const allVerified = status.face.verified && (status.phone.verified || status.email.verified);

      return Response.json({
        user_id: targetId,
        overall_verified: allVerified,
        verifications: status,
      });
    }

    // ============================================================
    // 5. DETECT FRAUD (AI-powered fraud detection)
    // ============================================================
    if (action === 'detectFraud') {
      const { target_user_id, fraud_type, indicators, evidence, detected_by, risk_factors } = body;

      if (!isAdmin(userRole)) {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }

      const targetId = target_user_id || user.id;
      const riskScore = calculateRiskScore(indicators || [], risk_factors || {});
      const riskLevel = riskLevelFromScore(riskScore);

      const fraud = await base44.asServiceRole.entities.FraudDetection.create({
        user_id: targetId,
        fraud_type: fraud_type || 'other',
        risk_level: riskLevel,
        risk_score: riskScore,
        indicators: indicators || [],
        evidence: evidence || {},
        detected_by: detected_by || 'ai_system',
        status: 'detected',
        device_fingerprint: risk_factors?.device_fingerprint || '',
        ip_address: clientIP,
      });

      // Create security event
      await base44.asServiceRole.entities.SecurityEvent.create({
        user_id: targetId,
        event_type: 'fraud_detected',
        severity: riskLevel,
        description: `Fraud detected: ${fraud_type} (score: ${riskScore})`,
        metadata: { fraud_id: fraud.id, indicators },
        ip_address: clientIP,
        risk_level: riskLevel,
        risk_score: riskScore,
        status: 'active',
      });

      // Create critical alert for high/critical
      if (riskScore >= 50) {
        await base44.asServiceRole.entities.SecurityAlert.create({
          alert_type: 'fraud_detection',
          severity: riskLevel,
          target_user_id: targetId,
          title: `Fraud Alert: ${fraud_type}`,
          description: `Risk score ${riskScore}/100. Indicators: ${(indicators || []).join(', ')}`,
          metadata: { fraud_id: fraud.id, risk_score: riskScore, indicators },
          status: 'active',
          priority: riskLevel,
          notifications_sent: false,
        });
      }

      // Auto-issue enforcement for critical
      if (riskScore >= 75) {
        await base44.asServiceRole.entities.EnforcementAction.create({
          user_id: targetId,
          action_type: 'temporary_suspension',
          reason: `Automatic suspension: critical fraud risk (score ${riskScore})`,
          violation_type: fraud_type,
          severity: 'critical',
          step_number: 4,
          duration_hours: 168,
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 168 * 3600 * 1000).toISOString(),
          status: 'active',
          issued_by: user.id,
          issued_by_role: userRole,
          evidence: { fraud_id: fraud.id, risk_score: riskScore },
        });
      }

      // Audit log
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: 'other',
        resource_type: 'FraudDetection',
        resource_id: fraud.id,
        target_user_id: targetId,
        details: { fraud_type, risk_score: riskScore, indicators },
        ip_address: clientIP,
        user_agent: userAgent,
        reason: 'Fraud detection initiated',
        is_sensitive: true,
      });

      return Response.json({ success: true, fraud, risk_score: riskScore, risk_level: riskLevel });
    }

    // ============================================================
    // 6. REGISTER / VALIDATE DEVICE
    // ============================================================
    if (action === 'registerDevice') {
      const { device_fingerprint, device_name, platform, os, os_version, browser, browser_version,
              screen_resolution, timezone, language, is_emulator, is_rooted, is_vpn, is_proxy,
              country, region, city } = body;

      if (!device_fingerprint) return Response.json({ error: 'device_fingerprint is required' }, { status: 400 });

      // Check if device already exists
      const existing = await base44.asServiceRole.entities.DeviceRecord
        .filter({ user_id: user.id, device_fingerprint });

      const now = new Date().toISOString();

      // Calculate trust score
      let trustScore = 50;
      if (is_emulator) trustScore -= 30;
      if (is_rooted) trustScore -= 20;
      if (is_vpn) trustScore -= 15;
      if (is_proxy) trustScore -= 15;
      trustScore = Math.max(0, Math.min(100, trustScore));

      let deviceCategory = 'new';
      if (existing && existing.length > 0) {
        const rec = existing[0];
        if (rec.is_blocked) {
          // Log blocked device attempt
          await base44.asServiceRole.entities.SecurityEvent.create({
            user_id: user.id,
            event_type: 'suspicious_activity',
            severity: 'high',
            description: `Login attempt from blocked device: ${rec.block_reason}`,
            metadata: { device_id: rec.id },
            ip_address: clientIP,
            risk_level: 'high',
            risk_score: 80,
            status: 'active',
          });
          return Response.json({ error: 'Device is blocked', reason: rec.block_reason }, { status: 403 });
        }
        deviceCategory = rec.device_category === 'new' && rec.login_count > 3 ? 'trusted' : rec.device_category;
        const updated = await base44.asServiceRole.entities.DeviceRecord.update(rec.id, {
          device_category: deviceCategory,
          last_seen: now,
          last_active: now,
          login_count: (rec.login_count || 0) + 1,
          ip_address: clientIP,
          trust_score: trustScore,
          is_emulator: is_emulator || rec.is_emulator,
          is_rooted: is_rooted || rec.is_rooted,
          is_vpn: is_vpn || rec.is_vpn,
          is_proxy: is_proxy || rec.is_proxy,
        });

        // Log login event
        await base44.asServiceRole.entities.SecurityEvent.create({
          user_id: user.id,
          event_type: 'login',
          severity: deviceCategory === 'trusted' ? 'low' : 'medium',
          description: `Login from ${deviceCategory} device`,
          metadata: { device_id: rec.id, device_category: deviceCategory },
          ip_address: clientIP,
          device_fingerprint,
          risk_level: deviceCategory === 'trusted' ? 'low' : 'medium',
          risk_score: 100 - trustScore,
          status: 'active',
        });

        return Response.json({ success: true, device: updated, is_new: false });
      }

      // New device
      if (is_emulator || is_rooted) {
        deviceCategory = 'suspicious';
      }

      const device = await base44.asServiceRole.entities.DeviceRecord.create({
        user_id: user.id,
        device_fingerprint,
        device_name: device_name || '',
        device_category: deviceCategory,
        platform: platform || '',
        os: os || '',
        os_version: os_version || '',
        browser: browser || '',
        browser_version: browser_version || '',
        ip_address: clientIP,
        country: country || '',
        region: region || '',
        city: city || '',
        first_seen: now,
        last_seen: now,
        last_active: now,
        trust_score: trustScore,
        login_count: 1,
        is_emulator: is_emulator || false,
        is_rooted: is_rooted || false,
        is_vpn: is_vpn || false,
        is_proxy: is_proxy || false,
        screen_resolution: screen_resolution || '',
        timezone: timezone || '',
        language: language || '',
      });

      // Log new device event
      await base44.asServiceRole.entities.SecurityEvent.create({
        user_id: user.id,
        event_type: 'device_change',
        severity: deviceCategory === 'suspicious' ? 'high' : 'medium',
        description: `New device registered: ${device_name || 'Unknown'} (${deviceCategory})`,
        metadata: { device_id: device.id, device_category: deviceCategory, is_emulator, is_rooted, is_vpn },
        ip_address: clientIP,
        device_fingerprint,
        risk_level: deviceCategory === 'suspicious' ? 'high' : 'medium',
        risk_score: 100 - trustScore,
        status: 'active',
      });

      // Create alert for suspicious device
      if (deviceCategory === 'suspicious') {
        await base44.asServiceRole.entities.SecurityAlert.create({
          alert_type: 'high_risk_activity',
          severity: 'high',
          target_user_id: user.id,
          title: 'Suspicious device detected',
          description: `Device ${device_name || 'unknown'} flagged as suspicious (emulator: ${is_emulator}, rooted: ${is_rooted})`,
          metadata: { device_id: device.id },
          status: 'active',
          priority: 'high',
          notifications_sent: false,
        });
      }

      return Response.json({ success: true, device, is_new: true });
    }

    // ============================================================
    // 7. ISSUE ENFORCEMENT ACTION (progressive)
    // ============================================================
    if (action === 'issueEnforcement') {
      const { target_user_id, action_type, reason, violation_type, severity, duration_hours, room_id, session_id, evidence, step_override } = body;

      if (!isAdmin(userRole)) {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }
      if (!target_user_id) return Response.json({ error: 'target_user_id is required' }, { status: 400 });

      // Get previous enforcement count for progressive steps
      const previous = await base44.asServiceRole.entities.EnforcementAction
        .filter({ user_id: target_user_id }, '-created_date', 50);

      const stepNumber = step_override || Math.min((previous?.length || 0) + 1, 5);
      const stepConfig = ENFORCEMENT_STEPS[stepNumber - 1] || ENFORCEMENT_STEPS[4];
      const finalActionType = action_type || stepConfig.type;
      const finalDuration = duration_hours ?? stepConfig.duration;
      const finalSeverity = severity || (stepNumber >= 4 ? 'critical' : stepNumber >= 3 ? 'high' : stepNumber >= 2 ? 'medium' : 'low');

      const now = new Date();
      const endDate = finalDuration > 0 ? new Date(now.getTime() + finalDuration * 3600 * 1000).toISOString() : null;

      const enforcement = await base44.asServiceRole.entities.EnforcementAction.create({
        user_id: target_user_id,
        action_type: finalActionType,
        reason: reason || `Progressive enforcement step ${stepNumber}`,
        violation_type: violation_type || '',
        severity: finalSeverity,
        step_number: stepNumber,
        duration_hours: finalDuration,
        start_date: now.toISOString(),
        end_date: endDate,
        status: 'active',
        issued_by: user.id,
        issued_by_role: userRole,
        room_id: room_id || null,
        session_id: session_id || null,
        evidence: evidence || {},
        appeal_status: 'none',
      });

      // Log security event
      await base44.asServiceRole.entities.SecurityEvent.create({
        user_id: target_user_id,
        event_type: finalActionType === 'permanent_ban' ? 'account_banned' : 'session_suspended',
        severity: finalSeverity,
        description: `Enforcement step ${stepNumber}: ${finalActionType} - ${reason}`,
        metadata: { enforcement_id: enforcement.id, step: stepNumber, duration: finalDuration },
        ip_address: clientIP,
        risk_level: finalSeverity,
        risk_score: stepNumber * 20,
        room_id: room_id || null,
        session_id: session_id || null,
        status: 'active',
      });

      // Audit log
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: 'issue_enforcement',
        resource_type: 'EnforcementAction',
        resource_id: enforcement.id,
        target_user_id,
        details: { action_type: finalActionType, step: stepNumber, severity: finalSeverity, reason },
        ip_address: clientIP,
        user_agent: userAgent,
        reason: reason || '',
        is_sensitive: true,
      });

      return Response.json({ success: true, enforcement, step: stepNumber });
    }

    // ============================================================
    // 8. LIFT ENFORCEMENT ACTION
    // ============================================================
    if (action === 'liftEnforcement') {
      const { enforcement_id, lift_reason } = body;

      if (!isAdmin(userRole)) {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }
      if (!enforcement_id) return Response.json({ error: 'enforcement_id is required' }, { status: 400 });

      const enforcement = await base44.asServiceRole.entities.EnforcementAction.get(enforcement_id);
      if (!enforcement) return Response.json({ error: 'Not found' }, { status: 404 });

      const updated = await base44.asServiceRole.entities.EnforcementAction.update(enforcement_id, {
        status: 'lifted',
        lifted_by: user.id,
        lifted_date: new Date().toISOString(),
        lift_reason: lift_reason || '',
      });

      // Audit log
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: 'lift_enforcement',
        resource_type: 'EnforcementAction',
        resource_id: enforcement_id,
        target_user_id: enforcement.user_id,
        details: { lift_reason },
        ip_address: clientIP,
        user_agent: userAgent,
        reason: lift_reason || '',
        is_sensitive: true,
      });

      return Response.json({ success: true, enforcement: updated });
    }

    // ============================================================
    // 9. CREATE SECURITY ALERT
    // ============================================================
    if (action === 'createAlert') {
      const { alert_type, severity, target_user_id, title, description, metadata, room_id } = body;

      if (!isAdmin(userRole)) {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }
      if (!alert_type || !title) return Response.json({ error: 'alert_type and title required' }, { status: 400 });

      const alert = await base44.asServiceRole.entities.SecurityAlert.create({
        alert_type,
        severity: severity || 'medium',
        target_user_id: target_user_id || '',
        title,
        description: description || '',
        metadata: metadata || {},
        status: 'active',
        priority: severity || 'medium',
        room_id: room_id || null,
        notifications_sent: false,
      });

      return Response.json({ success: true, alert });
    }

    // ============================================================
    // 10. ACKNOWLEDGE / RESOLVE ALERT
    // ============================================================
    if (action === 'resolveAlert') {
      const { alert_id, resolution, status } = body;

      if (!isAdmin(userRole)) {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }
      if (!alert_id) return Response.json({ error: 'alert_id is required' }, { status: 400 });

      const alert = await base44.asServiceRole.entities.SecurityAlert.get(alert_id);
      if (!alert) return Response.json({ error: 'Not found' }, { status: 404 });

      const finalStatus = status || 'resolved';
      const updates: any = {
        status: finalStatus,
        resolved_by: user.id,
        resolved_date: new Date().toISOString(),
        resolution: resolution || '',
      };
      if (finalStatus === 'acknowledged') {
        updates.acknowledged_by = user.id;
        updates.acknowledged_date = new Date().toISOString();
        updates.status = 'acknowledged';
        delete updates.resolved_by;
        delete updates.resolved_date;
      }

      const updated = await base44.asServiceRole.entities.SecurityAlert.update(alert_id, updates);

      // Audit log
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: 'other',
        resource_type: 'SecurityAlert',
        resource_id: alert_id,
        target_user_id: alert.target_user_id || '',
        details: { status: finalStatus, resolution },
        ip_address: clientIP,
        user_agent: userAgent,
        reason: `Alert ${finalStatus}`,
        is_sensitive: true,
      });

      return Response.json({ success: true, alert: updated });
    }

    // ============================================================
    // 11. CREATE INCIDENT
    // ============================================================
    if (action === 'createIncident') {
      const { title, description, incident_type, severity, risk_classification, related_user_ids, evidence, room_id, is_legal_case, legal_reference } = body;

      if (!isAdmin(userRole)) {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }
      if (!title || !incident_type) return Response.json({ error: 'title and incident_type required' }, { status: 400 });

      const incidentId = `INC-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

      const incident = await base44.asServiceRole.entities.IncidentRecord.create({
        incident_id: incidentId,
        title,
        description: description || '',
        incident_type,
        severity: severity || 'medium',
        risk_classification: risk_classification || severity || 'medium',
        status: 'open',
        related_user_ids: related_user_ids || [],
        evidence: evidence || {},
        created_by: user.id,
        assigned_to: user.id,
        assigned_role: userRole,
        room_id: room_id || null,
        is_legal_case: is_legal_case || false,
        legal_reference: legal_reference || '',
      });

      // Audit log
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: 'other',
        resource_type: 'IncidentRecord',
        resource_id: incident.id,
        details: { incident_id: incidentId, type: incident_type, severity },
        ip_address: clientIP,
        user_agent: userAgent,
        reason: `Incident created: ${title}`,
        is_sensitive: true,
      });

      return Response.json({ success: true, incident });
    }

    // ============================================================
    // 12. ADD INVESTIGATION NOTE TO INCIDENT
    // ============================================================
    if (action === 'addInvestigationNote') {
      const { incident_id, note, evidence } = body;

      if (!isAdmin(userRole)) {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }
      if (!incident_id || !note) return Response.json({ error: 'incident_id and note required' }, { status: 400 });

      const incident = await base44.asServiceRole.entities.IncidentRecord.get(incident_id);
      if (!incident) return Response.json({ error: 'Not found' }, { status: 404 });

      const notes = incident.investigation_notes || [];
      notes.push({
        note,
        evidence: evidence || {},
        author_id: user.id,
        author_role: userRole,
        timestamp: new Date().toISOString(),
      });

      const updated = await base44.asServiceRole.entities.IncidentRecord.update(incident_id, {
        investigation_notes: notes,
        status: incident.status === 'open' ? 'investigating' : incident.status,
      });

      // Audit log
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: 'other',
        resource_type: 'IncidentRecord',
        resource_id: incident_id,
        target_user_id: '',
        details: { note },
        ip_address: clientIP,
        user_agent: userAgent,
        reason: 'Investigation note added',
        is_sensitive: true,
      });

      return Response.json({ success: true, incident: updated });
    }

    // ============================================================
    // 13. OWNER SECURITY ACCESS — full data access with audit
    // ============================================================
    if (action === 'ownerSecurityAccess') {
      const { target_user_id, access_type } = body;

      if (!isOwner(userRole)) {
        return Response.json({ error: 'Owner access required' }, { status: 403 });
      }
      if (!target_user_id) return Response.json({ error: 'target_user_id is required' }, { status: 400 });

      // Fetch all security data for the target user
      const [targetProfile, verifications, securityEvents, fraudRecords, devices,
             enforcementActions, alerts, incidents] = await Promise.all([
        base44.asServiceRole.entities.UserProfile.filter({ user_id: target_user_id }).catch(() => []),
        base44.asServiceRole.entities.VerificationRecord.filter({ user_id: target_user_id }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.SecurityEvent.filter({ user_id: target_user_id }, '-created_date', 100).catch(() => []),
        base44.asServiceRole.entities.FraudDetection.filter({ user_id: target_user_id }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.DeviceRecord.filter({ user_id: target_user_id }, '-created_date', 20).catch(() => []),
        base44.asServiceRole.entities.EnforcementAction.filter({ user_id: target_user_id }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.SecurityAlert.filter({ target_user_id }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.IncidentRecord.filter({}, '-created_date', 100).catch(() => []),
      ]);

      // Filter incidents that reference this user
      const relatedIncidents = (incidents || []).filter(i =>
        (i.related_user_ids || []).includes(target_user_id)
      );

      // Create immutable audit log for this access
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: access_type || 'view_account_activity',
        resource_type: 'UserSecurityData',
        resource_id: target_user_id,
        target_user_id,
        details: {
          profile_accessed: true,
          verifications_accessed: true,
          events_accessed: true,
          fraud_accessed: true,
          devices_accessed: true,
          enforcement_accessed: true,
          incidents_accessed: true,
        },
        ip_address: clientIP,
        user_agent: userAgent,
        reason: 'Owner security investigation access',
        is_sensitive: true,
      });

      const profile = targetProfile?.[0];
      return Response.json({
        target_user_id,
        profile: profile ? {
          id: profile.id,
          username: profile.username,
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          role: profile.role,
          is_verified: profile.is_verified,
          is_online: profile.is_online,
          trust_score: profile.trust_score,
          activity_score: profile.activity_score,
          safety_status: profile.safety_status,
          verification_status: profile.verification_status,
          country: profile.country,
          created_date: profile.created_date,
        } : null,
        verifications: verifications || [],
        security_events: securityEvents || [],
        fraud_records: fraudRecords || [],
        devices: devices || [],
        enforcement_actions: enforcementActions || [],
        alerts: alerts || [],
        related_incidents: relatedIncidents,
      });
    }

    // ============================================================
    // 14. GET SECURITY DASHBOARD (admin/owner overview)
    // ============================================================
    if (action === 'getSecurityDashboard') {
      if (!isAdmin(userRole)) {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }

      const [allEvents, allFraud, allAlerts, allEnforcement, allIncidents, allDevices, allVerifications] = await Promise.all([
        base44.asServiceRole.entities.SecurityEvent.filter({ status: 'active' }, '-created_date', 100).catch(() => []),
        base44.asServiceRole.entities.FraudDetection.filter({ status: 'detected' }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.SecurityAlert.filter({ status: 'active' }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.EnforcementAction.filter({ status: 'active' }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.IncidentRecord.filter({ status: 'open' }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.DeviceRecord.filter({ device_category: 'suspicious' }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.VerificationRecord.filter({ status: 'pending' }, '-created_date', 50).catch(() => []),
      ]);

      const criticalAlerts = (allAlerts || []).filter(a => a.severity === 'critical');
      const criticalFraud = (allFraud || []).filter(f => f.risk_level === 'critical');
      const banned = (allEnforcement || []).filter(e => e.action_type === 'permanent_ban');
      const suspended = (allEnforcement || []).filter(e => e.action_type === 'temporary_suspension');

      return Response.json({
        dashboard: {
          role: userRole,
          summary: {
            active_security_events: (allEvents || []).length,
            pending_fraud_cases: (allFraud || []).length,
            active_alerts: (allAlerts || []).length,
            critical_alerts: criticalAlerts.length,
            critical_fraud: criticalFraud.length,
            active_enforcement: (allEnforcement || []).length,
            banned_users: banned.length,
            suspended_users: suspended.length,
            open_incidents: (allIncidents || []).length,
            suspicious_devices: (allDevices || []).length,
            pending_verifications: (allVerifications || []).length,
          },
          recent_events: (allEvents || []).slice(0, 20),
          recent_fraud: (allFraud || []).slice(0, 10),
          active_alerts_list: (allAlerts || []).slice(0, 10),
          active_enforcement_list: (allEnforcement || []).slice(0, 10),
          open_incidents_list: (allIncidents || []).slice(0, 10),
        },
      });
    }

    // ============================================================
    // 15. CHECK USER RISK (for internal system calls)
    // ============================================================
    if (action === 'checkUserRisk') {
      const { target_user_id } = body;
      const targetId = target_user_id || user.id;

      if (target_user_id && target_user_id !== user.id && !isAdmin(userRole)) {
        return Response.json({ error: 'Access denied' }, { status: 403 });
      }

      const [fraudRecords, securityEvents, devices, enforcement, verifications] = await Promise.all([
        base44.asServiceRole.entities.FraudDetection.filter({ user_id: targetId }).catch(() => []),
        base44.asServiceRole.entities.SecurityEvent.filter({ user_id: targetId }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.DeviceRecord.filter({ user_id: targetId }).catch(() => []),
        base44.asServiceRole.entities.EnforcementAction.filter({ user_id: targetId, status: 'active' }).catch(() => []),
        base44.asServiceRole.entities.VerificationRecord.filter({ user_id: targetId }).catch(() => []),
      ]);

      // Calculate composite risk score
      let riskScore = 0;
      const fraudList = fraudRecords || [];
      const eventList = securityEvents || [];
      const deviceList = devices || [];
      const enforcementList = enforcement || [];

      // Fraud indicators
      riskScore += fraudList.filter(f => f.risk_level === 'critical').length * 30;
      riskScore += fraudList.filter(f => f.risk_level === 'high').length * 20;
      riskScore += fraudList.filter(f => f.risk_level === 'medium').length * 10;

      // Security events
      riskScore += eventList.filter(e => e.severity === 'critical').length * 15;
      riskScore += eventList.filter(e => e.severity === 'high').length * 8;
      riskScore += eventList.filter(e => e.severity === 'medium').length * 4;

      // Device risk
      riskScore += deviceList.filter(d => d.device_category === 'suspicious').length * 15;
      riskScore += deviceList.filter(d => d.is_emulator).length * 20;
      riskScore += deviceList.filter(d => d.is_vpn).length * 10;

      // Enforcement history
      riskScore += enforcementList.filter(e => e.action_type === 'permanent_ban').length * 40;
      riskScore += enforcementList.filter(e => e.action_type === 'temporary_suspension').length * 20;

      // Verification gaps
      const hasFaceVerification = (verifications || []).some(v => v.verification_type === 'face' && v.status === 'verified');
      if (!hasFaceVerification) riskScore += 15;

      riskScore = Math.min(riskScore, 100);

      return Response.json({
        user_id: targetId,
        risk_score: riskScore,
        risk_level: riskLevelFromScore(riskScore),
        factors: {
          fraud_cases: fraudList.length,
          security_events: eventList.length,
          suspicious_devices: deviceList.filter(d => d.device_category === 'suspicious').length,
          active_enforcement: enforcementList.length,
          face_verified: hasFaceVerification,
        },
      });
    }

    // ============================================================
    // 16. REVIEW FRAUD CASE
    // ============================================================
    if (action === 'reviewFraud') {
      const { fraud_id, review_status, action_taken, notes } = body;

      if (!isAdmin(userRole)) {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }
      if (!fraud_id) return Response.json({ error: 'fraud_id is required' }, { status: 400 });

      const fraud = await base44.asServiceRole.entities.FraudDetection.get(fraud_id);
      if (!fraud) return Response.json({ error: 'Not found' }, { status: 404 });

      const updated = await base44.asServiceRole.entities.FraudDetection.update(fraud_id, {
        status: review_status || 'investigating',
        reviewed_by: user.id,
        reviewed_date: new Date().toISOString(),
        action_taken: action_taken || notes || '',
      });

      // Audit log
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: 'other',
        resource_type: 'FraudDetection',
        resource_id: fraud_id,
        target_user_id: fraud.user_id,
        details: { review_status, action_taken },
        ip_address: clientIP,
        user_agent: userAgent,
        reason: `Fraud review: ${review_status}`,
        is_sensitive: true,
      });

      return Response.json({ success: true, fraud: updated });
    }

    // ============================================================
    // 17. BLOCK / UNBLOCK DEVICE
    // ============================================================
    if (action === 'blockDevice') {
      const { device_id, block_reason } = body;

      if (!isAdmin(userRole)) {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }
      if (!device_id) return Response.json({ error: 'device_id is required' }, { status: 400 });

      const device = await base44.asServiceRole.entities.DeviceRecord.get(device_id);
      if (!device) return Response.json({ error: 'Not found' }, { status: 404 });

      const updated = await base44.asServiceRole.entities.DeviceRecord.update(device_id, {
        is_blocked: true,
        block_reason: block_reason || 'Blocked by admin',
        blocked_by: user.id,
        blocked_date: new Date().toISOString(),
        device_category: 'blocked',
      });

      // Audit log
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: 'device_block',
        resource_type: 'DeviceRecord',
        resource_id: device_id,
        target_user_id: device.user_id,
        details: { block_reason },
        ip_address: clientIP,
        user_agent: userAgent,
        reason: block_reason || '',
        is_sensitive: true,
      });

      return Response.json({ success: true, device: updated });
    }

    if (action === 'unblockDevice') {
      const { device_id } = body;

      if (!isAdmin(userRole)) {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }
      if (!device_id) return Response.json({ error: 'device_id is required' }, { status: 400 });

      const updated = await base44.asServiceRole.entities.DeviceRecord.update(device_id, {
        is_blocked: false,
        block_reason: '',
        blocked_by: '',
        blocked_date: '',
        device_category: 'trusted',
        trust_score: 70,
      });

      // Audit log
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: 'device_unblock',
        resource_type: 'DeviceRecord',
        resource_id: device_id,
        details: {},
        ip_address: clientIP,
        user_agent: userAgent,
        reason: 'Device unblocked',
        is_sensitive: true,
      });

      return Response.json({ success: true, device: updated });
    }

    // ============================================================
    // 18. GET AUDIT LOGS (admin/owner only)
    // ============================================================
    if (action === 'getAuditLogs') {
      if (!isAdmin(userRole)) {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }

      const { target_user_id, actor_id, limit } = body;
      let query: any = {};
      if (target_user_id) query.target_user_id = target_user_id;
      if (actor_id) query.actor_id = actor_id;

      const logs = await base44.asServiceRole.entities.AuditLog.filter(query, '-created_date', limit || 100);

      return Response.json({ logs });
    }

    // ============================================================
    // 19. AI SAFETY MONITORING — log content violation
    // ============================================================
    if (action === 'logContentViolation') {
      const { violation_type, content, severity, room_id, session_id, target_user_id, metadata } = body;

      if (!isAdmin(userRole)) {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }

      const targetId = target_user_id || user.id;

      // Create security event
      const event = await base44.asServiceRole.entities.SecurityEvent.create({
        user_id: targetId,
        event_type: violation_type || 'content_violation',
        severity: severity || 'medium',
        description: `Content violation: ${violation_type}`,
        metadata: { content_snippet: (content || '').slice(0, 200), ...metadata },
        ip_address: clientIP,
        risk_level: severity || 'medium',
        risk_score: severity === 'critical' ? 80 : severity === 'high' ? 60 : 30,
        room_id: room_id || null,
        session_id: session_id || null,
        status: 'active',
      });

      // Auto-create incident for critical violations
      if (severity === 'critical') {
        await base44.asServiceRole.entities.IncidentRecord.create({
          incident_id: `INC-${Date.now()}`,
          title: `Critical content violation: ${violation_type}`,
          description: content?.slice(0, 500) || '',
          incident_type: violation_type?.includes('harassment') ? 'harassment' :
                         violation_type?.includes('hate') ? 'hate_speech' :
                         violation_type?.includes('child') ? 'child_safety' : 'policy_violation',
          severity: 'critical',
          risk_classification: 'critical',
          status: 'open',
          related_user_ids: [targetId],
          created_by: user.id,
          assigned_to: user.id,
          assigned_role: userRole,
          room_id: room_id || null,
          is_legal_case: violation_type?.includes('child') || false,
        });
      }

      return Response.json({ success: true, event });
    }

    // ============================================================
    // 20. RESOLVE INCIDENT
    // ============================================================
    if (action === 'resolveIncident') {
      const { incident_id, resolution, status } = body;

      if (!isAdmin(userRole)) {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }
      if (!incident_id) return Response.json({ error: 'incident_id is required' }, { status: 400 });

      const incident = await base44.asServiceRole.entities.IncidentRecord.get(incident_id);
      if (!incident) return Response.json({ error: 'Not found' }, { status: 404 });

      const updated = await base44.asServiceRole.entities.IncidentRecord.update(incident_id, {
        status: status || 'resolved',
        resolution: resolution || '',
        resolved_by: user.id,
        resolved_date: new Date().toISOString(),
      });

      // Audit log
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: 'resolve_incident',
        resource_type: 'IncidentRecord',
        resource_id: incident_id,
        details: { status, resolution },
        ip_address: clientIP,
        user_agent: userAgent,
        reason: resolution || '',
        is_sensitive: true,
      });

      return Response.json({ success: true, incident: updated });
    }

    return Response.json({
      error: 'Invalid action',
      available_actions: [
        'logSecurityEvent', 'createAuditLog', 'recordVerification', 'getVerificationStatus',
        'detectFraud', 'registerDevice', 'issueEnforcement', 'liftEnforcement',
        'createAlert', 'resolveAlert', 'createIncident', 'addInvestigationNote',
        'ownerSecurityAccess', 'getSecurityDashboard', 'checkUserRisk', 'reviewFraud',
        'blockDevice', 'unblockDevice', 'getAuditLogs', 'logContentViolation', 'resolveIncident'
      ],
    }, { status: 400 });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});