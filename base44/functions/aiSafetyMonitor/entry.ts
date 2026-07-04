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

// Severity to enforcement level mapping
const SEVERITY_TO_LEVEL: Record<string, number> = {
  safe: 0, low: 1, medium: 2, high: 3, critical: 5,
};

// Progressive enforcement steps
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
    const clientIP = getClientIP(req);

    // Get user profile
    const profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
    const userProfile = profiles && profiles.length > 0
      ? profiles.reduce((best: any, p: any) =>
          (ROLE_LEVEL[p.role || 'user'] ?? 0) > (ROLE_LEVEL[best?.role || 'user'] ?? 0) ? p : best, profiles[0])
      : null;
    const userRole = userProfile?.role || 'user';

    // ============================================================
    // 1. REAL-TIME TEXT CONTENT ANALYSIS (AI-powered)
    // Analyzes text messages, chat, comments for violations
    // ============================================================
    if (action === 'analyzeText') {
      const { content, content_type, room_id, session_id, message_id, language_hint } = body;
      if (!content) return Response.json({ approved: true, severity: 'safe' });

      // Use InvokeLLM for real-time multilingual content analysis
      const llmResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `You are a real-time AI safety monitor for VYRO Live Connect, a global social live-streaming platform.
Analyze the following user content for policy violations. You must detect issues in ANY language (English, Arabic, Urdu, Hindi, Bengali, Tagalog, Turkish, Persian, French, etc.).

CONTENT TO ANALYZE: "${content}"
CONTENT TYPE: ${content_type || 'chat_message'}
${language_hint ? `LANGUAGE HINT: ${language_hint}` : ''}

Detect these violation categories:
1. Abusive language / swearing / profanity
2. Harassment / bullying / targeted attacks
3. Threats / violence / harm promotion
4. Sexual harassment / explicit content
5. Racism / racial slurs
6. Hate speech / discrimination
7. Religious insults / attacks on religion
8. Community attacks / ethnic/national attacks
9. Incitement to violence
10. Extremist content / terrorism promotion
11. Spam / promotional content / mass messaging
12. Scam / fraud / phishing attempts
13. Personal information sharing (PII)
14. Child safety concerns
15. Dangerous content / self-harm
16. Impersonation attempts
17. Bot-like / automated behavior indicators

Severity levels:
- safe: No violations
- low: Minor issue (mild profanity, borderline)
- medium: Clear violation (harassment, spam, abusive language)
- high: Serious violation (threats, hate speech, racism)
- critical: Severe violation (child safety, extremism, incitement to violence, sexual exploitation)

Respond with strict JSON:`,
        response_json_schema: {
          type: "object",
          properties: {
            severity: { type: "string", enum: ["safe", "low", "medium", "high", "critical"] },
            violations: { type: "array", items: { type: "string" }, description: "list of detected violation categories" },
            language_detected: { type: "string", description: "ISO language code detected" },
            confidence: { type: "number", description: "0-100 confidence score" },
            action_required: { type: "string", enum: ["none", "warn", "hide", "mute", "block", "pause_session", "end_session", "escalate"], description: "recommended enforcement action" },
            reason: { type: "string", description: "brief explanation" },
            filtered_content: { type: "string", description: "content with violations masked/replaced, or empty if safe" }
          }
        }
      });

      const severity = llmResult.severity || 'safe';
      const violations = llmResult.violations || [];
      const actionRequired = llmResult.action_required || 'none';
      const confidence = llmResult.confidence || 0;

      // Log the moderation result
      const modLog = await base44.asServiceRole.entities.ContentModerationLog.create({
        user_id: user.id,
        content_type: content_type || 'chat_message',
        original_content: content,
        language_detected: llmResult.language_detected || 'unknown',
        violations,
        severity,
        action_taken: severity === 'safe' ? 'approved' : actionRequired,
        ai_analysis: llmResult,
        ai_confidence: confidence,
        room_id: room_id || null,
        session_id: session_id || null,
        message_id: message_id || null,
        is_auto_action: true,
        review_status: severity === 'safe' ? 'auto' : (severity === 'high' || severity === 'critical' ? 'pending_review' : 'auto'),
      });

      // If violations detected, auto-issue enforcement
      if (severity !== 'safe' && violations.length > 0) {
        // Determine violation type from first violation
        const violationType = violations[0].toLowerCase().includes('harass') ? 'harassment' :
          violations[0].toLowerCase().includes('threat') ? 'threats' :
          violations[0].toLowerCase().includes('spam') ? 'spam' :
          violations[0].toLowerCase().includes('rac') ? 'racism' :
          violations[0].toLowerCase().includes('hate') ? 'hate_speech' :
          violations[0].toLowerCase().includes('relig') ? 'religious_insult' :
          violations[0].toLowerCase().includes('communit') ? 'community_attack' :
          violations[0].toLowerCase().includes('sexual') ? 'sexual_harassment' :
          violations[0].toLowerCase().includes('child') ? 'child_safety' :
          violations[0].toLowerCase().includes('scam') || violations[0].toLowerCase().includes('fraud') ? 'fraud_attempt' :
          violations[0].toLowerCase().includes('extrem') ? 'extremist_content' :
          violations[0].toLowerCase().includes('incit') ? 'incitement' :
          violations[0].toLowerCase().includes('violence') ? 'violence' :
          violations[0].toLowerCase().includes('abusive') || violations[0].toLowerCase().includes('swear') ? 'abusive_language' :
          violations[0].toLowerCase().includes('bully') ? 'bullying' :
          violations[0].toLowerCase().includes('toxic') ? 'toxic_behavior' :
          violations[0].toLowerCase().includes('discrimin') ? 'discrimination' :
          violations[0].toLowerCase().includes('imperson') ? 'impersonation' :
          'other';

        // Get previous violation count for this user
        const prevViolations = await base44.asServiceRole.entities.ViolationRecord
          .filter({ user_id: user.id, status: 'active' }, '-created_date', 50);
        const violationCount = (prevViolations?.length || 0) + 1;

        // Create violation record
        const violation = await base44.asServiceRole.entities.ViolationRecord.create({
          user_id: user.id,
          violation_type: violationType,
          violation_level: SEVERITY_TO_LEVEL[severity] || 1,
          severity,
          description: llmResult.reason || `AI detected: ${violations.join(', ')}`,
          evidence: { moderation_log_id: modLog.id, ai_analysis: llmResult },
          content_snippet: content.slice(0, 500),
          language_detected: llmResult.language_detected || 'unknown',
          source: 'ai_system',
          enforcement_issued: false,
          room_id: room_id || null,
          session_id: session_id || null,
          moderation_log_id: modLog.id,
          status: 'active',
        });

        // Auto-issue enforcement based on severity and history
        let enforcementIssued = false;
        let enforcementResult = null;

        if (severity === 'medium' || severity === 'high' || severity === 'critical') {
          const stepNumber = Math.min(violationCount, 5);
          const stepConfig = ENFORCEMENT_STEPS[stepNumber - 1] || ENFORCEMENT_STEPS[4];
          const finalDuration = severity === 'critical' ? 0 : stepConfig.duration;
          const now = new Date();
          const endDate = finalDuration > 0 ? new Date(now.getTime() + finalDuration * 3600 * 1000).toISOString() : null;

          // For critical: immediate ban/suspension
          const finalActionType = severity === 'critical' ? 'temporary_suspension' : stepConfig.type;
          const finalDurationCritical = severity === 'critical' ? 720 : finalDuration; // 30 days for critical
          const endDateCritical = severity === 'critical' ? new Date(now.getTime() + finalDurationCritical * 3600 * 1000).toISOString() : endDate;

          const enforcement = await base44.asServiceRole.entities.EnforcementAction.create({
            user_id: user.id,
            action_type: finalActionType,
            reason: `Auto-enforcement: ${violations.join(', ')} (${severity})`,
            violation_type: violationType,
            severity,
            step_number: stepNumber,
            duration_hours: severity === 'critical' ? finalDurationCritical : finalDuration,
            start_date: now.toISOString(),
            end_date: severity === 'critical' ? endDateCritical : endDate,
            status: 'active',
            issued_by: user.id,
            issued_by_role: 'admin',
            room_id: room_id || null,
            session_id: session_id || null,
            evidence: { violation_id: violation.id, moderation_log_id: modLog.id, ai_confidence: confidence },
          });

          enforcementIssued = true;
          enforcementResult = enforcement;

          // Update violation record
          await base44.asServiceRole.entities.ViolationRecord.update(violation.id, {
            enforcement_issued: true,
            enforcement_action: finalActionType,
            enforcement_id: enforcement.id,
          });

          // Create security event
          await base44.asServiceRole.entities.SecurityEvent.create({
            user_id: user.id,
            event_type: 'policy_violation',
            severity,
            description: `Auto-enforcement: ${finalActionType} for ${violationType} (${severity})`,
            metadata: { violation_id: violation.id, enforcement_id: enforcement.id, violations, ai_confidence: confidence },
            ip_address: clientIP,
            risk_level: severity,
            risk_score: SEVERITY_TO_LEVEL[severity] * 20,
            room_id: room_id || null,
            session_id: session_id || null,
            status: 'active',
          });

          // Create emergency alert for critical/high
          if (severity === 'critical' || severity === 'high') {
            await base44.asServiceRole.entities.SecurityAlert.create({
              alert_type: 'critical_abuse_event',
              severity,
              target_user_id: user.id,
              title: `Auto-detected ${severity} violation: ${violationType}`,
              description: `AI detected: ${violations.join(', ')}. Action: ${finalActionType}. Confidence: ${confidence}%`,
              metadata: { violation_id: violation.id, enforcement_id: enforcement?.id, moderation_log_id: modLog.id, content: content.slice(0, 200) },
              status: 'active',
              priority: severity,
              room_id: room_id || null,
              notifications_sent: false,
            });
          }
        }

        // Live stream protection: auto-pause/end for critical in live session
        if (severity === 'critical' && session_id && (actionRequired === 'pause_session' || actionRequired === 'end_session')) {
          // Update room session
          const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
          if (sessions.length > 0) {
            const session = sessions[0];
            const newStatus = actionRequired === 'end_session' ? 'closed' : 'paused';
            await base44.asServiceRole.entities.RoomSession.update(session.id, {
              status: newStatus,
              is_force_closed: actionRequired === 'end_session',
              shutdown_reason: `Auto-closed by AI safety system: ${violations.join(', ')}`,
              shutdown_by: 'ai_safety_system',
            });

            // Create incident report
            await base44.asServiceRole.entities.IncidentRecord.create({
              incident_id: `INC-${Date.now()}`,
              title: `Live session ${actionRequired === 'end_session' ? 'ended' : 'paused'} by AI: ${violationType}`,
              description: `AI detected critical violation. Session ${session_id} was automatically ${newStatus}. Content: ${content.slice(0, 500)}`,
              incident_type: violationType === 'child_safety' ? 'child_safety' :
                violationType.includes('hate') || violationType.includes('religious') ? 'hate_speech' :
                'policy_violation',
              severity: 'critical',
              risk_classification: 'critical',
              status: 'open',
              related_user_ids: [user.id],
              evidence: { moderation_log_id: modLog.id, ai_analysis: llmResult, session_id },
              created_by: user.id,
              assigned_to: user.id,
              assigned_role: 'admin',
              room_id: room_id || null,
              is_legal_case: violationType === 'child_safety',
            });
          }
        }

        return Response.json({
          approved: false,
          severity,
          violations,
          action_taken: actionRequired,
          filtered_content: llmResult.filtered_content || '',
          moderation_log_id: modLog.id,
          violation_id: violation.id,
          enforcement: enforcementResult,
          confidence,
          language_detected: llmResult.language_detected,
        });
      }

      return Response.json({
        approved: true,
        severity: 'safe',
        violations: [],
        moderation_log_id: modLog.id,
        confidence,
        language_detected: llmResult.language_detected,
      });
    }

    // ============================================================
    // 2. ANALYZE VOICE/AUDIO CONTENT (AI-powered)
    // For voice messages and live audio monitoring
    // ============================================================
    if (action === 'analyzeVoice') {
      const { audio_url, room_id, session_id, language_hint } = body;
      if (!audio_url) return Response.json({ error: 'audio_url is required' }, { status: 400 });

      // First transcribe the audio
      const transcription = await base44.asServiceRole.integrations.Core.TranscribeAudio({ audio_url });
      const transcript = typeof transcription === 'string' ? transcription : (transcription.text || '');

      if (!transcript || transcript.trim().length === 0) {
        return Response.json({ approved: true, transcript: '', severity: 'safe' });
      }

      // Now analyze the transcript
      const llmResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `You are an AI safety monitor for VYRO Live Connect. Analyze this transcribed voice/audio content for policy violations. Detect issues in ANY language.

TRANSCRIBED VOICE CONTENT: "${transcript}"
${language_hint ? `LANGUAGE HINT: ${language_hint}` : ''}

Check for: abusive language, harassment, threats, hate speech, religious insults, racism, sexual content, fraud, spam, child safety, extremism, incitement to violence.

Respond with strict JSON:`,
        response_json_schema: {
          type: "object",
          properties: {
            severity: { type: "string", enum: ["safe", "low", "medium", "high", "critical"] },
            violations: { type: "array", items: { type: "string" } },
            language_detected: { type: "string" },
            confidence: { type: "number" },
            action_required: { type: "string", enum: ["none", "warn", "mute", "block", "pause_session", "end_session", "escalate"] },
            reason: { type: "string" }
          }
        }
      });

      const severity = llmResult.severity || 'safe';
      const violations = llmResult.violations || [];

      // Log the moderation
      const modLog = await base44.asServiceRole.entities.ContentModerationLog.create({
        user_id: user.id,
        content_type: 'voice_audio',
        original_content: transcript.slice(0, 1000),
        language_detected: llmResult.language_detected || 'unknown',
        violations,
        severity,
        action_taken: severity === 'safe' ? 'approved' : (llmResult.action_required || 'warned'),
        ai_analysis: { ...llmResult, audio_url, transcript },
        ai_confidence: llmResult.confidence || 0,
        room_id: room_id || null,
        session_id: session_id || null,
        evidence_url: audio_url,
        is_auto_action: true,
        review_status: severity === 'high' || severity === 'critical' ? 'pending_review' : 'auto',
      });

      // Auto-mute user for high/critical voice violations in live session
      if (severity === 'high' || severity === 'critical') {
        if (session_id) {
          // Mute participant in room
          const participants = await base44.asServiceRole.entities.RoomParticipant
            .filter({ session_id, user_id: user.id, status: 'active' });
          if (participants.length > 0) {
            const muteDuration = severity === 'critical' ? 72 : 24; // hours
            await base44.asServiceRole.entities.RoomParticipant.update(participants[0].id, {
              is_muted: true,
              muted_until: new Date(Date.now() + muteDuration * 3600 * 1000).toISOString(),
              status: 'muted',
            });
          }
        }

        // Create security alert
        await base44.asServiceRole.entities.SecurityAlert.create({
          alert_type: 'critical_abuse_event',
          severity,
          target_user_id: user.id,
          title: `Voice content violation: ${severity}`,
          description: `AI detected in voice: ${violations.join(', ')}. User auto-muted.`,
          metadata: { moderation_log_id: modLog.id, transcript: transcript.slice(0, 200) },
          status: 'active',
          priority: severity,
          room_id: room_id || null,
          notifications_sent: false,
        });
      }

      return Response.json({
        transcript,
        severity,
        violations,
        action_taken: severity === 'safe' ? 'approved' : llmResult.action_required,
        moderation_log_id: modLog.id,
        confidence: llmResult.confidence || 0,
      });
    }

    // ============================================================
    // 3. SPAM DETECTION & ANTI-BOT
    // ============================================================
    if (action === 'checkSpam') {
      const { content, room_id, device_fingerprint } = body;

      // Rate limiting: check recent messages from this user
      const recentLogs = await base44.asServiceRole.entities.ContentModerationLog
        .filter({ user_id: user.id }, '-created_date', 50);

      const now = Date.now();
      const lastMinute = (recentLogs || []).filter(l => l.created_date && (now - new Date(l.created_date).getTime()) < 60000);
      const last5Min = (recentLogs || []).filter(l => l.created_date && (now - new Date(l.created_date).getTime()) < 300000);

      const indicators: string[] = [];
      let spamScore = 0;

      // Rate-based detection
      if (lastMinute.length > 10) {
        indicators.push('high_message_rate');
        spamScore += 30;
      }
      if (last5Min.length > 30) {
        indicators.push('mass_messaging');
        spamScore += 25;
      }

      // Repeated content detection
      if (content) {
        const recentContent = (recentLogs || []).slice(0, 20).map(l => l.original_content);
        const similar = recentContent.filter(c => c && c === content);
        if (similar.length > 3) {
          indicators.push('repeated_content');
          spamScore += 25;
        }

        // Link spam detection
        const urlCount = (content.match(/https?:\/\/[^\s]+/g) || []).length;
        if (urlCount > 2) {
          indicators.push('link_spam');
          spamScore += 20;
        }

        // AI spam detection
        if (spamScore < 50 && content.length > 10) {
          const aiSpamResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
            prompt: `Analyze this message for spam/bot characteristics. Is this automated spam, promotional spam, or bot-generated content?

CONTENT: "${content}"

Respond with JSON:`,
            response_json_schema: {
              type: "object",
              properties: {
                is_spam: { type: "boolean" },
                confidence: { type: "number" },
                spam_type: { type: "string", enum: ["none", "promotional", "automated", "phishing", "fake_engagement", "mass_messaging"] },
                reason: { type: "string" }
              }
            }
          });

          if (aiSpamResult.is_spam) {
            indicators.push(aiSpamResult.spam_type || 'spam_message');
            spamScore += Math.round((aiSpamResult.confidence || 50) / 2);
          }
        }
      }

      const isSpam = spamScore >= 40;
      const severity = spamScore >= 70 ? 'critical' : spamScore >= 50 ? 'high' : spamScore >= 30 ? 'medium' : 'low';

      if (isSpam) {
        const spamRecord = await base44.asServiceRole.entities.SpamDetection.create({
          user_id: user.id,
          spam_type: indicators.includes('mass_messaging') ? 'mass_messaging' :
            indicators.includes('repeated_content') ? 'repeated_content' :
            indicators.includes('link_spam') ? 'link_spam' :
            indicators.includes('promotional') ? 'promotional_spam' :
            indicators.includes('automated') ? 'bot_activity' : 'spam_message',
          severity,
          confidence_score: spamScore,
          indicators,
          content_sample: content?.slice(0, 500) || '',
          message_count: lastMinute.length,
          time_window_seconds: 60,
          detected_by: indicators.includes('high_message_rate') ? 'rate_limit' : 'ai_detection',
          action_taken: severity === 'critical' ? 'blocked' : severity === 'high' ? 'muted' : 'rate_limited',
          status: 'detected',
          room_id: room_id || null,
          device_fingerprint: device_fingerprint || '',
          ip_address: clientIP,
        });

        // Auto-mute for high/critical spam
        if (severity === 'high' || severity === 'critical') {
          const stepNumber = severity === 'critical' ? 3 : 2;
          const stepConfig = ENFORCEMENT_STEPS[stepNumber - 1];
          const now = new Date();
          const endDate = new Date(now.getTime() + stepConfig.duration * 3600 * 1000).toISOString();

          await base44.asServiceRole.entities.EnforcementAction.create({
            user_id: user.id,
            action_type: stepConfig.type,
            reason: `Auto-enforcement: spam detected (${severity}, score ${spamScore})`,
            violation_type: 'spam',
            severity,
            step_number: stepNumber,
            duration_hours: stepConfig.duration,
            start_date: now.toISOString(),
            end_date: endDate,
            status: 'active',
            issued_by: user.id,
            issued_by_role: 'admin',
            room_id: room_id || null,
            evidence: { spam_id: spamRecord.id, indicators, spam_score: spamScore },
          });
        }

        return Response.json({
          is_spam: true,
          severity,
          spam_score: spamScore,
          indicators,
          spam_id: spamRecord.id,
          action_taken: severity === 'critical' ? 'blocked' : severity === 'high' ? 'muted' : 'rate_limited',
        });
      }

      return Response.json({ is_spam: false, spam_score: spamScore, indicators });
    }

    // ============================================================
    // 4. LIVE STREAM PROTECTION — auto actions
    // ============================================================
    if (action === 'protectLiveSession') {
      const { session_id, action_type, reason, target_user_id, room_id } = body;

      if (!isAdmin(userRole)) {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }
      if (!session_id) return Response.json({ error: 'session_id is required' }, { status: 400 });

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      let updateData: any = {};
      let incidentType = 'policy_violation';

      if (action_type === 'mute_user' && target_user_id) {
        const participants = await base44.asServiceRole.entities.RoomParticipant
          .filter({ session_id, user_id: target_user_id });
        if (participants.length > 0) {
          await base44.asServiceRole.entities.RoomParticipant.update(participants[0].id, {
            is_muted: true,
            muted_until: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
            status: 'muted',
          });
        }
      } else if (action_type === 'pause_session') {
        updateData = { status: 'paused' };
      } else if (action_type === 'end_session') {
        updateData = {
          status: 'closed',
          is_force_closed: true,
          shutdown_reason: reason || 'Closed by admin/security',
          shutdown_by: user.id,
          ended_at: new Date().toISOString(),
        };
        incidentType = 'policy_violation';
      } else if (action_type === 'hide_comments') {
        updateData = { security_flags: [...(session.security_flags || []), 'comments_hidden'] };
      }

      if (Object.keys(updateData).length > 0) {
        await base44.asServiceRole.entities.RoomSession.update(session.id, updateData);
      }

      // Create incident
      const incident = await base44.asServiceRole.entities.IncidentRecord.create({
        incident_id: `INC-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        title: `Live session ${action_type}: ${reason || 'Security action'}`,
        description: `Session ${session_id} action: ${action_type}. Reason: ${reason || 'N/A'}`,
        incident_type: incidentType,
        severity: action_type === 'end_session' ? 'critical' : 'high',
        risk_classification: action_type === 'end_session' ? 'critical' : 'high',
        status: 'open',
        related_user_ids: target_user_id ? [target_user_id] : [],
        evidence: { session_id, action_type, reason, room_id },
        created_by: user.id,
        assigned_to: user.id,
        assigned_role: userRole,
        room_id: room_id || session.room_id,
      });

      // Create security alert to notify owner/admin/agents
      await base44.asServiceRole.entities.SecurityAlert.create({
        alert_type: 'critical_abuse_event',
        severity: action_type === 'end_session' ? 'critical' : 'high',
        target_user_id: target_user_id || session.host_id,
        title: `Live session ${action_type} by ${userRole}`,
        description: `Session ${session_id} (${session.party_name || 'Unknown'}) was ${action_type}. Reason: ${reason}`,
        metadata: { incident_id: incident.id, session_id, action_type },
        status: 'active',
        priority: action_type === 'end_session' ? 'critical' : 'high',
        room_id: room_id || session.room_id,
        notifications_sent: false,
      });

      // Audit log
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: 'other',
        resource_type: 'RoomSession',
        resource_id: session.id,
        target_user_id: target_user_id || session.host_id,
        details: { action_type, reason, session_id },
        ip_address: clientIP,
        reason: reason || '',
        is_sensitive: true,
      });

      return Response.json({ success: true, incident, action_taken: action_type });
    }

    // ============================================================
    // 5. CHILD SAFETY & AGE VERIFICATION
    // ============================================================
    if (action === 'verifyAge') {
      const { date_of_birth, face_image_url, declared_age } = body;

      if (!date_of_birth && !face_image_url) {
        return Response.json({ error: 'date_of_birth or face_image_url required' }, { status: 400 });
      }

      let calculatedAge = declared_age;
      if (date_of_birth) {
        const dob = new Date(date_of_birth);
        const today = new Date();
        calculatedAge = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) calculatedAge--;
      }

      let aiAgeEstimate = null;
      let riskScore = 0;

      // AI face age estimation if image provided
      if (face_image_url) {
        const aiResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
          prompt: `You are an AI age estimation system for VYRO Live Connect child safety. Analyze this face image and estimate the person's age range. This is for child safety protection only.

Respond with strict JSON:`,
          file_urls: [face_image_url],
          response_json_schema: {
            type: "object",
            properties: {
              estimated_age_min: { type: "number" },
              estimated_age_max: { type: "number" },
              confidence: { type: "number" },
              risk_indicators: { type: "array", items: { type: "string" } },
              recommendation: { type: "string", enum: ["allow", "restrict", "verify", "block"] }
            }
          }
        });
        aiAgeEstimate = aiResult;

        // If AI estimates younger than declared, increase risk
        if (aiResult.estimated_age_max && aiResult.estimated_age_max < 18) {
          riskScore += 50;
        }
        if (aiResult.recommendation === 'block') {
          riskScore += 40;
        }
        if (aiResult.recommendation === 'verify') {
          riskScore += 20;
        }
      }

      const isUnderage = calculatedAge < 13;
      const isMinor = calculatedAge >= 13 && calculatedAge < 18;

      if (isUnderage) riskScore += 60;
      if (isMinor) riskScore += 15;

      const severity = riskScore >= 70 ? 'critical' : riskScore >= 40 ? 'high' : riskScore >= 20 ? 'medium' : 'low';

      // Create verification record
      const verification = await base44.asServiceRole.entities.VerificationRecord.create({
        user_id: user.id,
        verification_type: 'age',
        status: isUnderage ? 'failed' : 'verified',
        method: face_image_url ? 'ai_age_estimation' : 'date_of_birth',
        liveness_checks: {},
        face_detection_passed: !!face_image_url,
        risk_score: riskScore,
        verified_date: !isUnderage ? new Date().toISOString() : '',
        expires_date: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
        failure_reason: isUnderage ? 'User is under minimum age (13)' : '',
        metadata: { declared_age: calculatedAge, ai_age_estimate: aiAgeEstimate },
        attempt_count: 1,
      });

      // If underage, block and create incident
      if (isUnderage) {
        await base44.asServiceRole.entities.EnforcementAction.create({
          user_id: user.id,
          action_type: 'permanent_ban',
          reason: 'Underage user detected (child safety protection)',
          violation_type: 'child_safety',
          severity: 'critical',
          step_number: 5,
          duration_hours: 0,
          start_date: new Date().toISOString(),
          status: 'active',
          issued_by: user.id,
          issued_by_role: 'admin',
          evidence: { verification_id: verification.id, declared_age: calculatedAge },
        });

        await base44.asServiceRole.entities.IncidentRecord.create({
          incident_id: `INC-${Date.now()}`,
          title: 'Underage user detected — account banned',
          description: `User declared age ${calculatedAge}. Account auto-banned for child safety.`,
          incident_type: 'child_safety',
          severity: 'critical',
          risk_classification: 'critical',
          status: 'open',
          related_user_ids: [user.id],
          evidence: { verification_id: verification.id, declared_age: calculatedAge, ai_estimate: aiAgeEstimate },
          created_by: user.id,
          is_legal_case: true,
          legal_reference: 'Child Safety Policy — COPPA/GDPR-K',
        });

        await base44.asServiceRole.entities.SecurityAlert.create({
          alert_type: 'critical_abuse_event',
          severity: 'critical',
          target_user_id: user.id,
          title: 'Child safety: Underage user banned',
          description: `User declared age ${calculatedAge}. Account auto-banned.`,
          metadata: { verification_id: verification.id },
          status: 'active',
          priority: 'critical',
          notifications_sent: false,
        });
      }

      return Response.json({
        verified: !isUnderage,
        declared_age: calculatedAge,
        is_minor: isMinor,
        is_underage: isUnderage,
        ai_age_estimate: aiAgeEstimate,
        risk_score: riskScore,
        severity,
        restricted_features: isMinor ? ['live_streaming', 'private_messaging', 'gifting', 'wallet'] : [],
        verification_id: verification.id,
      });
    }

    // ============================================================
    // 6. ACCOUNT RECOVERY
    // ============================================================
    if (action === 'initiateRecovery') {
      const { recovery_type, recovery_email, recovery_phone, device_fingerprint, face_verification_id } = body;

      if (!recovery_type) return Response.json({ error: 'recovery_type is required' }, { status: 400 });

      const recovery = await base44.asServiceRole.entities.AccountRecovery.create({
        user_id: user.id,
        recovery_type,
        status: 'initiated',
        initiated_by: user.id,
        verification_method: recovery_type,
        recovery_email: recovery_email || '',
        recovery_phone: recovery_phone || '',
        device_fingerprint: device_fingerprint || '',
        face_verification_id: face_verification_id || '',
        ip_address: clientIP,
        risk_score: 0,
      });

      // Auto-approve for trusted methods (phone/email with verification)
      if (recovery_type === 'phone' || recovery_type === 'email') {
        // In production, this would send OTP
        await base44.asServiceRole.entities.AccountRecovery.update(recovery.id, {
          status: 'verifying',
        });
      } else if (recovery_type === 'admin_review') {
        await base44.asServiceRole.entities.AccountRecovery.update(recovery.id, {
          status: 'verifying',
        });

        // Create alert for admin review
        await base44.asServiceRole.entities.SecurityAlert.create({
          alert_type: 'security_breach_attempt',
          severity: 'medium',
          target_user_id: user.id,
          title: 'Account recovery request — admin review required',
          description: `User ${user.id} requested account recovery via admin review.`,
          metadata: { recovery_id: recovery.id },
          status: 'active',
          priority: 'medium',
          notifications_sent: false,
        });
      }

      // Audit log
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: 'other',
        resource_type: 'AccountRecovery',
        resource_id: recovery.id,
        details: { recovery_type },
        ip_address: clientIP,
        reason: 'Account recovery initiated',
        is_sensitive: true,
      });

      return Response.json({ success: true, recovery });
    }

    // ============================================================
    // 7. GET VIOLATION HISTORY (for user or admin)
    // ============================================================
    if (action === 'getViolationHistory') {
      const { target_user_id, limit } = body;
      const targetId = target_user_id || user.id;

      if (target_user_id && target_user_id !== user.id && !isAdmin(userRole)) {
        return Response.json({ error: 'Access denied' }, { status: 403 });
      }

      const [violations, enforcement, modLogs, spamRecords] = await Promise.all([
        base44.asServiceRole.entities.ViolationRecord.filter({ user_id: targetId }, '-created_date', limit || 50).catch(() => []),
        base44.asServiceRole.entities.EnforcementAction.filter({ user_id: targetId }, '-created_date', limit || 50).catch(() => []),
        base44.asServiceRole.entities.ContentModerationLog.filter({ user_id: targetId }, '-created_date', limit || 50).catch(() => []),
        base44.asServiceRole.entities.SpamDetection.filter({ user_id: targetId }, '-created_date', limit || 50).catch(() => []),
      ]);

      const violationList = violations || [];
      const activeViolations = violationList.filter(v => v.status === 'active');
      const activeEnforcement = (enforcement || []).filter(e => e.status === 'active');

      return Response.json({
        user_id: targetId,
        summary: {
          total_violations: violationList.length,
          active_violations: activeViolations.length,
          total_enforcement: (enforcement || []).length,
          active_enforcement: activeEnforcement.length,
          moderation_logs: (modLogs || []).length,
          spam_records: (spamRecords || []).length,
          current_level: Math.min(violationList.length + 1, 5),
          is_banned: activeEnforcement.some(e => e.action_type === 'permanent_ban'),
          is_suspended: activeEnforcement.some(e => e.action_type === 'temporary_suspension'),
        },
        violations: violationList,
        enforcement_actions: enforcement || [],
        moderation_logs: modLogs || [],
        spam_records: spamRecords || [],
      });
    }

    // ============================================================
    // 8. APPEAL VIOLATION
    // ============================================================
    if (action === 'appealViolation') {
      const { violation_id, appeal_notes } = body;
      if (!violation_id) return Response.json({ error: 'violation_id is required' }, { status: 400 });

      const violation = await base44.asServiceRole.entities.ViolationRecord.get(violation_id);
      if (!violation) return Response.json({ error: 'Not found' }, { status: 404 });
      if (violation.user_id !== user.id && !isAdmin(userRole)) {
        return Response.json({ error: 'Access denied' }, { status: 403 });
      }

      const updated = await base44.asServiceRole.entities.ViolationRecord.update(violation_id, {
        appeal_status: 'pending',
        appeal_notes: appeal_notes || '',
        appeal_date: new Date().toISOString(),
      });

      // Audit log
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: 'other',
        resource_type: 'ViolationRecord',
        resource_id: violation_id,
        target_user_id: violation.user_id,
        details: { appeal_notes },
        ip_address: clientIP,
        reason: 'Violation appeal submitted',
        is_sensitive: true,
      });

      return Response.json({ success: true, violation: updated });
    }

    // ============================================================
    // 9. REVIEW APPEAL (admin)
    // ============================================================
    if (action === 'reviewAppeal') {
      const { violation_id, decision, notes } = body;
      if (!isAdmin(userRole)) return Response.json({ error: 'Admin access required' }, { status: 403 });
      if (!violation_id || !decision) return Response.json({ error: 'violation_id and decision required' }, { status: 400 });

      const violation = await base44.asServiceRole.entities.ViolationRecord.get(violation_id);
      if (!violation) return Response.json({ error: 'Not found' }, { status: 404 });

      const updated = await base44.asServiceRole.entities.ViolationRecord.update(violation_id, {
        appeal_status: decision, // approved or rejected
        review_notes: notes || '',
      });

      // If appeal approved, overturn violation and lift enforcement
      if (decision === 'approved') {
        await base44.asServiceRole.entities.ViolationRecord.update(violation_id, { status: 'overturned' });
        if (violation.enforcement_id) {
          await base44.asServiceRole.entities.EnforcementAction.update(violation.enforcement_id, {
            status: 'lifted',
            lifted_by: user.id,
            lifted_date: new Date().toISOString(),
            lift_reason: `Appeal approved: ${notes || ''}`,
          });
        }
      }

      // Audit log
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: userRole,
        action: 'lift_enforcement',
        resource_type: 'ViolationRecord',
        resource_id: violation_id,
        target_user_id: violation.user_id,
        details: { decision, notes },
        ip_address: clientIP,
        reason: `Appeal ${decision}`,
        is_sensitive: true,
      });

      return Response.json({ success: true, violation: updated });
    }

    // ============================================================
    // 10. SCREENSHOT/RECORDING DETECTION LOG
    // ============================================================
    if (action === 'logScreenshotAttempt') {
      const { room_id, session_id, content_area, is_recording } = body;

      await base44.asServiceRole.entities.SecurityEvent.create({
        user_id: user.id,
        event_type: 'suspicious_activity',
        severity: 'low',
        description: `Screenshot${is_recording ? '/screen recording' : ''} attempt in ${content_area || 'sensitive area'}`,
        metadata: { content_area, is_recording, room_id, session_id },
        ip_address: clientIP,
        risk_level: 'low',
        risk_score: 10,
        room_id: room_id || null,
        session_id: session_id || null,
        status: 'active',
      });

      return Response.json({ success: true, message: 'Screenshot attempt logged' });
    }

    // ============================================================
    // 11. SEARCH INCIDENTS / LOGS (admin dashboard)
    // ============================================================
    if (action === 'searchLogs') {
      if (!isAdmin(userRole)) return Response.json({ error: 'Admin access required' }, { status: 403 });

      const { query, log_type, severity, status_filter, limit } = body;
      const searchLimit = limit || 100;

      let results: any = {};

      if (!log_type || log_type === 'violations') {
        const violations = await base44.asServiceRole.entities.ViolationRecord.filter({}, '-created_date', searchLimit).catch(() => []);
        results.violations = (violations || []).filter(v => {
          if (severity && v.severity !== severity) return false;
          if (status_filter && v.status !== status_filter) return false;
          if (query && !v.description?.toLowerCase().includes(query.toLowerCase()) && !v.content_snippet?.toLowerCase().includes(query.toLowerCase())) return false;
          return true;
        });
      }

      if (!log_type || log_type === 'moderation') {
        const modLogs = await base44.asServiceRole.entities.ContentModerationLog.filter({}, '-created_date', searchLimit).catch(() => []);
        results.moderation_logs = (modLogs || []).filter(l => {
          if (severity && l.severity !== severity) return false;
          if (status_filter && l.review_status !== status_filter) return false;
          if (query && !l.original_content?.toLowerCase().includes(query.toLowerCase())) return false;
          return true;
        });
      }

      if (!log_type || log_type === 'incidents') {
        const incidents = await base44.asServiceRole.entities.IncidentRecord.filter({}, '-created_date', searchLimit).catch(() => []);
        results.incidents = (incidents || []).filter(i => {
          if (severity && i.severity !== severity) return false;
          if (status_filter && i.status !== status_filter) return false;
          if (query && !i.title?.toLowerCase().includes(query.toLowerCase()) && !i.description?.toLowerCase().includes(query.toLowerCase())) return false;
          return true;
        });
      }

      if (!log_type || log_type === 'spam') {
        const spam = await base44.asServiceRole.entities.SpamDetection.filter({}, '-created_date', searchLimit).catch(() => []);
        results.spam_records = (spam || []).filter(s => {
          if (severity && s.severity !== severity) return false;
          if (status_filter && s.status !== status_filter) return false;
          if (query && !s.content_sample?.toLowerCase().includes(query.toLowerCase())) return false;
          return true;
        });
      }

      return Response.json({ results });
    }

    // ============================================================
    // 12. GET AI SAFETY DASHBOARD (admin overview)
    // ============================================================
    if (action === 'getSafetyDashboard') {
      if (!isAdmin(userRole)) return Response.json({ error: 'Admin access required' }, { status: 403 });

      const [modLogs, violations, spamRecords, incidents, alerts, enforcement] = await Promise.all([
        base44.asServiceRole.entities.ContentModerationLog.filter({}, '-created_date', 100).catch(() => []),
        base44.asServiceRole.entities.ViolationRecord.filter({ status: 'active' }, '-created_date', 100).catch(() => []),
        base44.asServiceRole.entities.SpamDetection.filter({ status: 'detected' }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.IncidentRecord.filter({ status: 'open' }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.SecurityAlert.filter({ status: 'active' }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.EnforcementAction.filter({ status: 'active' }, '-created_date', 50).catch(() => []),
      ]);

      const modLogList = modLogs || [];
      const violationList = violations || [];

      return Response.json({
        dashboard: {
          role: userRole,
          summary: {
            total_moderation_logs: modLogList.length,
            auto_blocked: modLogList.filter(l => l.action_taken === 'blocked').length,
            auto_hidden: modLogList.filter(l => l.action_taken === 'hidden').length,
            auto_muted: modLogList.filter(l => l.action_taken === 'muted').length,
            sessions_paused: modLogList.filter(l => l.action_taken === 'session_paused').length,
            sessions_ended: modLogList.filter(l => l.action_taken === 'session_ended').length,
            active_violations: violationList.length,
            critical_violations: violationList.filter(v => v.severity === 'critical').length,
            high_violations: violationList.filter(v => v.severity === 'high').length,
            pending_appeals: violationList.filter(v => v.appeal_status === 'pending').length,
            spam_cases: (spamRecords || []).length,
            open_incidents: (incidents || []).length,
            active_alerts: (alerts || []).length,
            active_enforcement: (enforcement || []).length,
            banned_users: (enforcement || []).filter(e => e.action_type === 'permanent_ban').length,
            suspended_users: (enforcement || []).filter(e => e.action_type === 'temporary_suspension').length,
          },
          recent_moderation: modLogList.slice(0, 20),
          recent_violations: violationList.slice(0, 20),
          recent_spam: (spamRecords || []).slice(0, 10),
          open_incidents_list: (incidents || []).slice(0, 10),
          active_alerts_list: (alerts || []).slice(0, 10),
        },
      });
    }

    return Response.json({
      error: 'Invalid action',
      available_actions: [
        'analyzeText', 'analyzeVoice', 'checkSpam', 'protectLiveSession',
        'verifyAge', 'initiateRecovery', 'getViolationHistory', 'appealViolation',
        'reviewAppeal', 'logScreenshotAttempt', 'searchLogs', 'getSafetyDashboard'
      ],
    }, { status: 400 });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});