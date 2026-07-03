import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // Run security scan on a room session
    if (action === 'scan') {
      const { session_id } = body;
      if (!session_id) return Response.json({ error: 'session_id is required' }, { status: 400 });

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      const flags = [];

      // Get all participants
      const participants = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id, status: 'active' });

      // Check for banned users trying to participate
      const bannedInRoom = participants.filter(p => p.is_banned);
      if (bannedInRoom.length > 0) {
        flags.push(`Banned users detected in room: ${bannedInRoom.length}`);
      }

      // Check for suspicious: multiple accounts from same IP
      const ipMap = {};
      for (const p of participants) {
        if (p.ip_address) {
          ipMap[p.ip_address] = (ipMap[p.ip_address] || 0) + 1;
        }
      }
      const multiAccountIps = Object.entries(ipMap).filter(([_, count]) => count > 2);
      if (multiAccountIps.length > 0) {
        flags.push(`Multiple accounts from same IP detected: ${multiAccountIps.length} IPs`);
      }

      // Check for unverified host
      let hostProfiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: session.host_id });
      if (hostProfiles.length === 0) {
        hostProfiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: session.host_id });
      }
      if (hostProfiles.length > 0) {
        const host = hostProfiles[0];
        if (host.verification_status !== 'verified') {
          flags.push('Host is not verified');
        }
        if (host.safety_status === 'low') {
          flags.push('Host has low safety status');
        }
        if (host.trust_score < 30) {
          flags.push(`Host trust score is low: ${host.trust_score}`);
        }
      }

      // Check message rate for spam
      const recentMessages = await base44.asServiceRole.entities.ChatMessage.filter({ conversation_id: session.room_id, type: 'text' }, '-created_date', 50);
      const now = Date.now();
      const lastMinMessages = recentMessages.filter(m => m.created_date && (now - new Date(m.created_date).getTime()) < 60000);
      if (lastMinMessages.length > 30) {
        flags.push(`High message rate detected: ${lastMinMessages.length}/min (possible spam)`);
      }

      // Check for excessive gifting (possible money laundering)
      const recentGifts = await base44.asServiceRole.entities.ChatMessage.filter({ conversation_id: session.room_id, type: 'gift' }, '-created_date', 50);
      const lastMinGifts = recentGifts.filter(g => g.created_date && (now - new Date(g.created_date).getTime()) < 60000);
      if (lastMinGifts.length > 20) {
        flags.push(`Unusual gift frequency: ${lastMinGifts.length}/min`);
      }

      // Update session with security flags
      const updated = await base44.asServiceRole.entities.RoomSession.update(session.id, {
        security_flags: flags,
      });

      return Response.json({
        session_id,
        scan_result: {
          is_secure: flags.length === 0,
          flags,
          flag_count: flags.length,
          participants_scanned: participants.length,
          scanned_at: new Date().toISOString(),
        },
      });
    }

    // Check if a specific user is banned/restricted in a room
    if (action === 'checkUser') {
      const { session_id, user_id } = body;
      if (!session_id || !user_id) return Response.json({ error: 'session_id and user_id are required' }, { status: 400 });

      const participants = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id, user_id });
      if (participants.length === 0) {
        return Response.json({ allowed: true, status: 'not_found', is_banned: false, is_muted: false });
      }

      const p = participants[0];
      const isMutedActive = p.is_muted && p.muted_until && new Date(p.muted_until) > new Date();

      return Response.json({
        allowed: !p.is_banned,
        status: p.status,
        is_banned: p.is_banned,
        ban_reason: p.ban_reason,
        is_muted: isMutedActive,
        muted_until: p.muted_until,
        role: p.role,
      });
    }

    // Get all banned users for a room
    if (action === 'getBanned') {
      const { session_id } = body;
      if (!session_id) return Response.json({ error: 'session_id is required' }, { status: 400 });

      const banned = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id, is_banned: true });
      return Response.json({
        banned_users: banned.map(p => ({
          id: p.id,
          user_id: p.user_id,
          username: p.username,
          avatar_url: p.avatar_url,
          ban_reason: p.ban_reason,
          banned_by: p.banned_by,
          joined_at: p.joined_at,
        })),
        count: banned.length,
      });
    }

    // Flag a suspicious user in a room
    if (action === 'flagUser') {
      const { session_id, user_id, reason, severity = 'medium' } = body;
      if (!session_id || !user_id || !reason) return Response.json({ error: 'session_id, user_id, and reason are required' }, { status: 400 });

      // Add security flag to session
      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      const existingFlags = session.security_flags || [];
      const newFlag = `[${severity}] User ${user_id}: ${reason}`;
      if (!existingFlags.includes(newFlag)) {
        existingFlags.push(newFlag);
        await base44.asServiceRole.entities.RoomSession.update(session.id, { security_flags: existingFlags });
      }

      return Response.json({ success: true, flag: newFlag, total_flags: existingFlags.length });
    }

    // Get security overview for all live rooms (admin)
    if (action === 'getOverview') {
      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ status: 'live' }, '-started_at', 100);

      const secured = sessions.filter(s => (s.security_flags || []).length === 0).length;
      const flagged = sessions.filter(s => (s.security_flags || []).length > 0).length;
      const allFlags = sessions.flatMap(s => (s.security_flags || []).map(f => ({ session_id: s.id, room_id: s.room_id, flag: f })));

      return Response.json({
        total_live: sessions.length,
        secured_rooms: secured,
        flagged_rooms: flagged,
        total_flags: allFlags.length,
        flags: allFlags,
      });
    }

    return Response.json({ error: 'Invalid action. Available: scan, checkUser, getBanned, flagUser, getOverview' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});