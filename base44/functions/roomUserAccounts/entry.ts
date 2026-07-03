import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // List all participants in a room
    if (action === 'list') {
      const { session_id, role, status } = body;
      if (!session_id) return Response.json({ error: 'session_id is required' }, { status: 400 });

      const filter = { session_id };
      if (role) filter.role = role;
      if (status) filter.status = status;

      const participants = await base44.asServiceRole.entities.RoomParticipant.filter(filter, '-joined_at', 200);

      return Response.json({
        participants: participants.map(p => ({
          id: p.id,
          user_id: p.user_id,
          username: p.username,
          avatar_url: p.avatar_url,
          global_id: p.global_id,
          role: p.role,
          status: p.status,
          joined_at: p.joined_at,
          left_at: p.left_at,
          duration_seconds: p.duration_seconds,
          gifts_sent: p.gifts_sent,
          coins_spent: p.coins_spent,
          messages_count: p.messages_count,
          is_banned: p.is_banned,
          is_muted: p.is_muted,
          muted_until: p.muted_until,
          is_vip: p.is_vip,
          country: p.country,
        })),
        count: participants.length,
        summary: {
          active: participants.filter(p => p.status === 'active').length,
          banned: participants.filter(p => p.is_banned).length,
          muted: participants.filter(p => p.is_muted).length,
          kicked: participants.filter(p => p.status === 'kicked').length,
          total_gifts: participants.reduce((s, p) => s + (p.gifts_sent || 0), 0),
          total_coins: participants.reduce((s, p) => s + (p.coins_spent || 0), 0),
        },
      });
    }

    // Join a room (register as participant)
    if (action === 'join') {
      const { session_id, room_id } = body;
      if (!session_id || !room_id) return Response.json({ error: 'session_id and room_id are required' }, { status: 400 });

      // Check if already a participant
      let existing = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id, user_id: user.id });

      // Get user profile
      let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length === 0) {
        profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
      }
      const profile = profiles[0] || {};

      if (existing.length > 0) {
        const p = existing[0];
        if (p.is_banned) {
          return Response.json({ error: 'You are banned from this room', ban_reason: p.ban_reason }, { status: 403 });
        }
        // Reactivate
        const updated = await base44.asServiceRole.entities.RoomParticipant.update(p.id, {
          status: 'active',
          joined_at: new Date().toISOString(),
          left_at: null,
        });
        return Response.json({ participant: updated, rejoined: true });
      }

      // Create new participant
      const participant = await base44.asServiceRole.entities.RoomParticipant.create({
        session_id,
        room_id,
        user_id: user.id,
        username: profile.username || user.full_name || user.email?.split('@')[0],
        avatar_url: profile.avatar_url,
        global_id: profile.global_id,
        role: 'viewer',
        status: 'active',
        joined_at: new Date().toISOString(),
        is_vip: profile.is_vip || false,
        country: profile.country || '',
      });

      // Increment viewer count
      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length > 0) {
        const session = sessions[0];
        await base44.asServiceRole.entities.RoomSession.update(session.id, {
          current_viewers: (session.current_viewers || 0) + 1,
          peak_viewers: Math.max(session.peak_viewers || 0, (session.current_viewers || 0) + 1),
        });
      }

      return Response.json({ participant, joined: true });
    }

    // Leave a room
    if (action === 'leave') {
      const { session_id } = body;
      if (!session_id) return Response.json({ error: 'session_id is required' }, { status: 400 });

      const participants = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id, user_id: user.id, status: 'active' });
      if (participants.length === 0) return Response.json({ error: 'Not an active participant' }, { status: 404 });

      const p = participants[0];
      const joinedTime = p.joined_at ? new Date(p.joined_at).getTime() : Date.now();
      const duration = Math.floor((Date.now() - joinedTime) / 1000);

      const updated = await base44.asServiceRole.entities.RoomParticipant.update(p.id, {
        status: 'left',
        left_at: new Date().toISOString(),
        duration_seconds: duration,
      });

      // Decrement viewer count
      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length > 0) {
        const session = sessions[0];
        await base44.asServiceRole.entities.RoomSession.update(session.id, {
          current_viewers: Math.max(0, (session.current_viewers || 1) - 1),
        });
      }

      return Response.json({ success: true, left: true, duration_seconds: duration });
    }

    // Kick a user from a room (host or admin)
    if (action === 'kick') {
      const { session_id, target_user_id } = body;
      if (!session_id || !target_user_id) return Response.json({ error: 'session_id and target_user_id are required' }, { status: 400 });

      // Verify permission: host or admin
      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      const isHost = session.host_id === user.id;
      const isAdmin = user.role === 'admin';
      if (!isHost && !isAdmin) {
        return Response.json({ error: 'Only host or admin can kick users' }, { status: 403 });
      }

      const participants = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id, user_id: target_user_id, status: 'active' });
      if (participants.length === 0) return Response.json({ error: 'Participant not found or not active' }, { status: 404 });

      const updated = await base44.asServiceRole.entities.RoomParticipant.update(participants[0].id, {
        status: 'kicked',
        left_at: new Date().toISOString(),
        kicked_by: user.id,
      });

      return Response.json({ success: true, kicked: true, participant: updated });
    }

    // Ban a user from a room
    if (action === 'ban') {
      const { session_id, target_user_id, reason } = body;
      if (!session_id || !target_user_id || !reason) return Response.json({ error: 'session_id, target_user_id, and reason are required' }, { status: 400 });

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      const isHost = session.host_id === user.id;
      const isAdmin = user.role === 'admin';
      if (!isHost && !isAdmin) {
        return Response.json({ error: 'Only host or admin can ban users' }, { status: 403 });
      }

      const participants = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id, user_id: target_user_id });
      if (participants.length === 0) return Response.json({ error: 'Participant not found' }, { status: 404 });

      const updated = await base44.asServiceRole.entities.RoomParticipant.update(participants[0].id, {
        is_banned: true,
        ban_reason: reason,
        banned_by: user.id,
        status: 'banned',
        left_at: new Date().toISOString(),
      });

      return Response.json({ success: true, banned: true, participant: updated });
    }

    // Unban a user
    if (action === 'unban') {
      const { session_id, target_user_id } = body;
      if (!session_id || !target_user_id) return Response.json({ error: 'session_id and target_user_id are required' }, { status: 400 });

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      const isHost = session.host_id === user.id;
      const isAdmin = user.role === 'admin';
      if (!isHost && !isAdmin) {
        return Response.json({ error: 'Only host or admin can unban users' }, { status: 403 });
      }

      const participants = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id, user_id: target_user_id, is_banned: true });
      if (participants.length === 0) return Response.json({ error: 'Banned participant not found' }, { status: 404 });

      const updated = await base44.asServiceRole.entities.RoomParticipant.update(participants[0].id, {
        is_banned: false,
        ban_reason: null,
        banned_by: null,
        status: 'left',
      });

      return Response.json({ success: true, unbanned: true, participant: updated });
    }

    // Mute a user
    if (action === 'mute') {
      const { session_id, target_user_id, duration_minutes = 30 } = body;
      if (!session_id || !target_user_id) return Response.json({ error: 'session_id and target_user_id are required' }, { status: 400 });

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      const isHost = session.host_id === user.id;
      const isAdmin = user.role === 'admin';
      if (!isHost && !isAdmin) {
        return Response.json({ error: 'Only host or admin can mute users' }, { status: 403 });
      }

      const mutedUntil = new Date(Date.now() + duration_minutes * 60000).toISOString();
      const participants = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id, user_id: target_user_id });
      if (participants.length === 0) return Response.json({ error: 'Participant not found' }, { status: 404 });

      const updated = await base44.asServiceRole.entities.RoomParticipant.update(participants[0].id, {
        is_muted: true,
        muted_until: mutedUntil,
      });

      return Response.json({ success: true, muted: true, muted_until: mutedUntil, participant: updated });
    }

    // Unmute a user
    if (action === 'unmute') {
      const { session_id, target_user_id } = body;
      if (!session_id || !target_user_id) return Response.json({ error: 'session_id and target_user_id are required' }, { status: 400 });

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      const isHost = session.host_id === user.id;
      const isAdmin = user.role === 'admin';
      if (!isHost && !isAdmin) {
        return Response.json({ error: 'Only host or admin can unmute users' }, { status: 403 });
      }

      const participants = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id, user_id: target_user_id });
      if (participants.length === 0) return Response.json({ error: 'Participant not found' }, { status: 404 });

      const updated = await base44.asServiceRole.entities.RoomParticipant.update(participants[0].id, {
        is_muted: false,
        muted_until: null,
      });

      return Response.json({ success: true, unmuted: true, participant: updated });
    }

    // Promote/demote user role in room
    if (action === 'setRole') {
      const { session_id, target_user_id, role } = body;
      if (!session_id || !target_user_id || !role) return Response.json({ error: 'session_id, target_user_id, and role are required' }, { status: 400 });

      const validRoles = ['viewer', 'guest', 'co_host', 'moderator', 'admin'];
      if (!validRoles.includes(role)) return Response.json({ error: `Invalid role. Valid: ${validRoles.join(', ')}` }, { status: 400 });

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      const isHost = session.host_id === user.id;
      const isAdmin = user.role === 'admin';
      if (!isHost && !isAdmin) {
        return Response.json({ error: 'Only host or admin can change roles' }, { status: 403 });
      }

      const participants = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id, user_id: target_user_id });
      if (participants.length === 0) return Response.json({ error: 'Participant not found' }, { status: 404 });

      const updated = await base44.asServiceRole.entities.RoomParticipant.update(participants[0].id, { role });

      return Response.json({ success: true, role_set: role, participant: updated });
    }

    // Get participant stats for a specific user in a room
    if (action === 'getParticipant') {
      const { session_id, target_user_id } = body;
      const lookupUserId = target_user_id || user.id;
      if (!session_id) return Response.json({ error: 'session_id is required' }, { status: 400 });

      const participants = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id, user_id: lookupUserId });
      if (participants.length === 0) return Response.json({ error: 'Participant not found' }, { status: 404 });

      return Response.json({ participant: participants[0] });
    }

    return Response.json({ error: 'Invalid action. Available: list, join, leave, kick, ban, unban, mute, unmute, setRole, getParticipant' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});