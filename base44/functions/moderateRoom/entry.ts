import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Permission matrix — which roles can perform which moderation actions
const PERMISSION_MATRIX = {
  owner: ['mute', 'unmute', 'remove_seat', 'move_seat', 'kick_audience', 'lock_seat', 'unlock_seat',
    'kick_room', 'ban_24h', 'ban_7d', 'ban_permanent', 'block_speaking', 'clear_messages',
    'promote_mod', 'remove_mod', 'promote_admin', 'remove_admin', 'promote_co_host', 'assign_seat',
    'take_seat', 'leave_seat', 'reset_seats'],
  admin: ['mute', 'unmute', 'remove_seat', 'move_seat', 'kick_audience', 'lock_seat', 'unlock_seat',
    'kick_room', 'ban_24h', 'ban_7d', 'block_speaking', 'clear_messages', 'promote_mod', 'remove_mod',
    'take_seat', 'leave_seat'],
  moderator: ['mute', 'unmute', 'kick_audience', 'kick_room', 'ban_24h', 'block_speaking', 'clear_messages',
    'leave_seat'],
  co_host: ['mute', 'unmute', 'remove_seat', 'move_seat', 'kick_audience', 'lock_seat', 'unlock_seat', 'kick_room', 'ban_24h',
    'take_seat', 'leave_seat'],
  speaker: ['leave_seat'],
  viewer: ['leave_seat'],
};

// Actions where the actor operates on their own seat (no target_user_id needed)
const SELF_SEAT_ACTIONS = ['take_seat', 'leave_seat', 'reset_seats'];

const ACTION_DURATIONS = {
  ban_24h: 24,
  ban_7d: 24 * 7,
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { room_id, target_user_id, action, reason, target_seat_number } = body;
    if (!room_id || !action) {
      return Response.json({ error: 'room_id and action are required' }, { status: 400 });
    }
    if (!SELF_SEAT_ACTIONS.includes(action) && !target_user_id) {
      return Response.json({ error: 'target_user_id is required for this action' }, { status: 400 });
    }

    // Fetch room
    const room = await base44.asServiceRole.entities.PartyRoom.get(room_id);
    if (!room) return Response.json({ error: 'Room not found' }, { status: 404 });

    // Determine the acting user's role
    let actorRole = 'viewer';
    if (room.created_by_id === user.id || room.host_id === user.id) {
      actorRole = 'owner';
    } else {
      const actorParticipants = await base44.asServiceRole.entities.RoomParticipant.filter({
        room_id, user_id: user.id, status: 'active',
      });
      const ap = actorParticipants?.[0];
      if (ap?.role === 'admin') actorRole = 'admin';
      else if (ap?.role === 'moderator') actorRole = 'moderator';
      else if (ap?.role === 'co_host') actorRole = 'co_host';
      else if (ap?.role === 'guest') actorRole = 'speaker';
    }

    // Check permission
    const allowedActions = PERMISSION_MATRIX[actorRole] || [];
    if (!allowedActions.includes(action)) {
      return Response.json({ error: 'Only the Room Owner can perform this action.', forbidden: true }, { status: 403 });
    }

    // ── Self-seat management actions ──
    // These operate on the ACTOR, not a target user. Skip target validation.
    if (SELF_SEAT_ACTIONS.includes(action)) {
      const actorParticipants = await base44.asServiceRole.entities.RoomParticipant.filter({
        room_id, user_id: user.id,
      });
      const actorP = actorParticipants?.[0];
      if (!actorP) {
        return Response.json({ error: 'You are not in this room' }, { status: 404 });
      }

      if (action === 'take_seat') {
        if (target_seat_number === undefined || target_seat_number === null) {
          return Response.json({ error: 'target_seat_number is required for take_seat' }, { status: 400 });
        }
        // Displace current occupant of the target seat (if any, and not the actor)
        const occupants = await base44.asServiceRole.entities.RoomParticipant.filter({
          room_id, seat_number: target_seat_number, status: 'active',
        });
        for (const occ of (occupants || [])) {
          if (occ.user_id !== user.id) {
            await base44.asServiceRole.entities.RoomParticipant.update(occ.id, {
              seat_number: null, role: 'viewer',
            });
          }
        }
        // Move actor to the target seat
        await base44.asServiceRole.entities.RoomParticipant.update(actorP.id, {
          seat_number: target_seat_number,
          role: actorRole === 'owner' ? 'host' : 'guest',
          status: 'active',
        });
      } else if (action === 'leave_seat') {
        if (actorRole === 'owner') {
          return Response.json({ error: 'Host cannot leave their seat' }, { status: 403 });
        }
        await base44.asServiceRole.entities.RoomParticipant.update(actorP.id, {
          seat_number: null, role: 'viewer',
        });
      } else if (action === 'reset_seats') {
        if (actorRole !== 'owner') {
          return Response.json({ error: 'Only the Room Owner can reset seats' }, { status: 403 });
        }
        // Remove all seated non-host participants to audience
        const allActive = await base44.asServiceRole.entities.RoomParticipant.filter({
          room_id, status: 'active',
        });
        for (const p of (allActive || [])) {
          if (p.user_id !== user.id && p.seat_number !== null && p.seat_number !== undefined) {
            await base44.asServiceRole.entities.RoomParticipant.update(p.id, {
              seat_number: null, role: 'viewer',
            });
          }
        }
        // Ensure host is on seat 0
        if (actorP.seat_number !== 0) {
          await base44.asServiceRole.entities.RoomParticipant.update(actorP.id, {
            seat_number: 0, role: 'host',
          });
        }
      }

      // Audit log for self-seat actions
      await base44.asServiceRole.entities.AuditLog.create({
        actor_id: user.id,
        actor_role: actorRole,
        action: 'issue_enforcement',
        resource_type: 'RoomParticipant',
        resource_id: actorP.id,
        reason: reason || action,
        details: { room_id, action, target_seat_number },
      });

      return Response.json({ success: true, action, actor_role: actorRole });
    }

    // Can't moderate the host/owner
    if (target_user_id === room.created_by_id || target_user_id === room.host_id) {
      return Response.json({ error: 'Cannot moderate the room host' }, { status: 403 });
    }

    // Fetch target participant
    const targetParticipants = await base44.asServiceRole.entities.RoomParticipant.filter({
      room_id, user_id: target_user_id,
    });
    const target = targetParticipants?.[0];
    if (!target) return Response.json({ error: 'Target user is not in this room' }, { status: 404 });

    // Can't moderate someone of equal or higher role (unless owner)
    const roleRank = { viewer: 0, speaker: 1, moderator: 2, co_host: 3, admin: 4, host: 5 };
    if (actorRole !== 'owner' && (roleRank[target.role] || 0) >= (roleRank[actorRole] || 0)) {
      return Response.json({ error: 'Cannot moderate a user of equal or higher rank' }, { status: 403 });
    }

    const now = new Date();
    let updateData = {};
    let enforcementRecord = null;

    switch (action) {
      case 'mute':
        updateData = { is_muted: true, status: 'muted' };
        break;
      case 'unmute':
        updateData = { is_muted: false, status: 'active', muted_until: null };
        break;
      case 'remove_seat':
      case 'kick_audience':
        updateData = { seat_number: null, role: 'viewer' };
        break;
      case 'move_seat':
        updateData = { seat_number: target_seat_number || null };
        break;
      case 'lock_seat':
        // Lock is a room-level concern; just remove the user from the seat
        updateData = { seat_number: null, role: 'viewer' };
        break;
      case 'kick_room':
        updateData = { status: 'kicked', left_at: now.toISOString(), kicked_by: user.id };
        break;
      case 'ban_24h':
      case 'ban_7d': {
        const hours = ACTION_DURATIONS[action];
        const endDate = new Date(now.getTime() + hours * 60 * 60 * 1000);
        updateData = { status: 'banned', is_banned: true, left_at: now.toISOString(), banned_by: user.id, ban_reason: reason || 'Room ban' };
        enforcementRecord = {
          user_id: target_user_id,
          action_type: 'temporary_suspension',
          reason: reason || `Banned from room ${room.name}`,
          severity: hours >= 168 ? 'high' : 'medium',
          duration_hours: hours,
          start_date: now.toISOString(),
          end_date: endDate.toISOString(),
          status: 'active',
          issued_by: user.id,
          issued_by_role: actorRole,
          room_id,
        };
        break;
      }
      case 'ban_permanent': {
        updateData = { status: 'banned', is_banned: true, left_at: now.toISOString(), banned_by: user.id, ban_reason: reason || 'Permanent ban' };
        enforcementRecord = {
          user_id: target_user_id,
          action_type: 'permanent_ban',
          reason: reason || `Permanent ban from room ${room.name}`,
          severity: 'critical',
          duration_hours: 0,
          start_date: now.toISOString(),
          status: 'active',
          issued_by: user.id,
          issued_by_role: actorRole,
          room_id,
        };
        break;
      }
      case 'block_speaking':
        updateData = { is_muted: true, status: 'muted', muted_until: new Date(now.getTime() + 60 * 60 * 1000).toISOString() };
        break;
      case 'clear_messages':
        // Messages are in Supabase; just flag the participant
        updateData = { messages_count: 0 };
        break;
      case 'promote_mod':
        updateData = { role: 'moderator' };
        break;
      case 'remove_mod':
        updateData = { role: 'viewer' };
        break;
      case 'promote_admin':
        updateData = { role: 'admin' };
        break;
      case 'remove_admin':
        updateData = { role: 'viewer' };
        break;
      case 'promote_co_host':
        updateData = { role: 'co_host' };
        break;
      case 'assign_seat':
        updateData = { seat_number: target_seat_number || null, role: 'guest' };
        break;
      default:
        return Response.json({ error: 'Unknown action: ' + action }, { status: 400 });
    }

    // Apply the update
    const updated = await base44.asServiceRole.entities.RoomParticipant.update(target.id, updateData);

    // Create enforcement record if needed
    if (enforcementRecord) {
      await base44.asServiceRole.entities.EnforcementAction.create(enforcementRecord);
    }

    // Create audit log
    await base44.asServiceRole.entities.AuditLog.create({
      actor_id: user.id,
      actor_role: actorRole,
      action: action.startsWith('ban') ? 'ban_user' : 'issue_enforcement',
      resource_type: 'RoomParticipant',
      resource_id: target.id,
      target_user_id: target_user_id,
      reason: reason || action,
      details: { room_id, action, target_role: target.role },
    });

    // Create a security event for bans
    if (enforcementRecord) {
      await base44.asServiceRole.entities.SecurityEvent.create({
        user_id: target_user_id,
        event_type: 'session_suspended',
        severity: enforcementRecord.severity,
        description: `${action} by ${actorRole}: ${reason || 'Room moderation'}`,
        room_id,
        session_id: room_id,
        status: 'active',
      });
    }

    // Decrement viewer count if kicked/banned
    if (['kick_room', 'ban_24h', 'ban_7d', 'ban_permanent'].includes(action)) {
      const newViewers = Math.max(0, (room.viewers || 1) - 1);
      await base44.asServiceRole.entities.PartyRoom.update(room_id, { viewers: newViewers, members: newViewers });
    }

    return Response.json({
      success: true,
      action,
      target_user_id,
      target_role: updated.role,
      target_status: updated.status,
      actor_role: actorRole,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});