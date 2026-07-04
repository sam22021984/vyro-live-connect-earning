import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { room_id, password, skip_checks } = body;
    if (!room_id) return Response.json({ error: 'room_id is required' }, { status: 400 });

    // Fetch the room
    const room = await base44.asServiceRole.entities.PartyRoom.get(room_id);
    if (!room) return Response.json({ error: 'Room not found' }, { status: 404 });

    // Room must be live or scheduled
    if (room.status === 'ended' || room.status === 'closed') {
      return Response.json({ error: 'This live room has ended', room_status: room.status }, { status: 403 });
    }

    // Check if user is the host — host always passes
    const isHost = room.created_by_id === user.id || room.host_id === user.id;

    // Check for active bans / suspensions (EnforcementAction)
    if (!isHost) {
      const activeEnforcements = await base44.asServiceRole.entities.EnforcementAction.filter({
        user_id: user.id,
        status: 'active',
      });
      const now = new Date().toISOString();
      const hasActiveBan = activeEnforcements.some((e) => {
        if (e.action_type !== 'permanent_ban' && e.action_type !== 'temporary_suspension') return false;
        if (e.action_type === 'permanent_ban') return true;
        return e.end_date && e.end_date > now;
      });
      if (hasActiveBan) {
        return Response.json({ error: 'You are banned from joining live rooms', blocked: true }, { status: 403 });
      }
    }

    // Room-type access enforcement (host bypasses all)
    if (!isHost && !skip_checks) {
      const roomType = room.room_type || 'public';

      if (roomType === 'password') {
        if (password !== room.password) {
          return Response.json({ error: 'Incorrect room password', require_password: true }, { status: 403 });
        }
      }

      if (roomType === 'ticket') {
        // Check if user has a completed gift/purchase transaction for this room's ticket
        const ticketTx = await base44.asServiceRole.entities.Transaction.filter({
          user_id: user.id,
          status: 'completed',
        });
        const hasTicket = ticketTx.some((t) => t.description && t.description.includes(room_id));
        if (!hasTicket) {
          return Response.json({
            error: 'This is a ticketed room. Please purchase a ticket to join.',
            require_ticket: true,
            ticket_price: room.ticket_price_coins || 0,
          }, { status: 403 });
        }
      }

      if (roomType === 'vip') {
        // Check user profile for VIP status
        const profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
        const profile = profiles?.[0];
        if (!profile?.vip_level || profile.vip_level < 1) {
          return Response.json({ error: 'This room is for VIP members only', require_vip: true }, { status: 403 });
        }
      }

      if (roomType === 'followers') {
        // Only the host's followers can join
        const rel = await base44.asServiceRole.entities.Relationship.filter({
          user_id: user.id,
          target_user_id: room.created_by_id || room.host_id,
          type: 'follow',
        });
        if (!rel || rel.length === 0) {
          return Response.json({ error: 'This room is for followers only. Follow the host to join.', require_follow: true }, { status: 403 });
        }
      }

      if (roomType === 'friends') {
        const rel = await base44.asServiceRole.entities.Relationship.filter({
          user_id: user.id,
          target_user_id: room.created_by_id || room.host_id,
          type: 'friend',
        });
        if (!rel || rel.length === 0) {
          return Response.json({ error: 'This room is for friends only', require_friend: true }, { status: 403 });
        }
      }

      if (roomType === 'agency') {
        const profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
        const profile = profiles?.[0];
        if (!profile?.agency_id) {
          return Response.json({ error: 'This room is for agency members only', require_agency: true }, { status: 403 });
        }
      }
    }

    // Check for existing active participant record
    const existing = await base44.asServiceRole.entities.RoomParticipant.filter({
      room_id,
      user_id: user.id,
    });

    let participant;
    if (existing && existing.length > 0) {
      // Reactivate if previously left
      participant = existing[0];
      if (participant.status === 'left' || participant.status === 'inactive') {
        participant = await base44.asServiceRole.entities.RoomParticipant.update(participant.id, {
          status: 'active',
          joined_at: new Date().toISOString(),
          left_at: null,
        });
      }
    } else {
      // Create new participant
      const profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      const profile = profiles?.[0];
      participant = await base44.asServiceRole.entities.RoomParticipant.create({
        room_id,
        user_id: user.id,
        username: user.full_name || profile?.display_name || 'User',
        avatar_url: profile?.avatar || '',
        role: isHost ? 'host' : 'viewer',
        status: 'active',
        joined_at: new Date().toISOString(),
        is_vip: profile?.vip_level >= 1 || false,
        country: profile?.country || '',
      });
    }

    // Increment viewer count
    const newViewers = (room.viewers || 0) + 1;
    const newPeak = Math.max(room.peak_viewers || 0, newViewers);
    await base44.asServiceRole.entities.PartyRoom.update(room_id, {
      viewers: newViewers,
      peak_viewers: newPeak,
      members: newViewers,
    });

    return Response.json({
      success: true,
      participant,
      room: {
        id: room.id,
        name: room.name,
        room_type: room.room_type,
        status: room.status,
        seat_count: room.seat_count,
      },
      role: participant.role,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});