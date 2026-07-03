import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // Gracefully close a room (host or admin)
    if (action === 'close') {
      const { session_id } = body;
      if (!session_id) return Response.json({ error: 'session_id is required' }, { status: 400 });

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      // Only host or admin can close
      const isHost = session.host_id === user.id;
      const isAdmin = user.role === 'admin';
      if (!isHost && !isAdmin) {
        return Response.json({ error: 'Only the host or admin can close this room' }, { status: 403 });
      }

      if (session.status === 'closed' || session.status === 'shutdown') {
        return Response.json({ error: 'Room is already closed', status: session.status }, { status: 400 });
      }

      // Calculate final duration
      const startTime = session.started_at ? new Date(session.started_at).getTime() : Date.now();
      const durationSeconds = Math.floor((Date.now() - startTime) / 1000);

      // Mark all active participants as left
      const activeParticipants = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id, status: 'active' });
      const now = new Date().toISOString();
      for (const p of activeParticipants) {
        const joinedTime = p.joined_at ? new Date(p.joined_at).getTime() : Date.now();
        const participantDuration = Math.floor((Date.now() - joinedTime) / 1000);
        await base44.asServiceRole.entities.RoomParticipant.update(p.id, {
          status: 'left',
          left_at: now,
          duration_seconds: participantDuration,
        });
      }

      // Calculate final profit
      const grossCoins = session.gross_revenue_coins || 0;
      const hostEarnings = Math.round(grossCoins * (session.host_share_pct || 40) / 100);
      const platformFee = Math.round(grossCoins * (session.platform_share_pct || 30) / 100);
      const agencyFee = Math.round(grossCoins * (session.agency_share_pct || 20) / 100);
      const agentFee = Math.round(grossCoins * (session.agent_share_pct || 10) / 100);
      const profitUsd = grossCoins / 10000;

      // Update session to closed
      const updated = await base44.asServiceRole.entities.RoomSession.update(session.id, {
        status: 'closed',
        ended_at: now,
        duration_seconds: durationSeconds,
        current_viewers: 0,
        host_earnings_coins: hostEarnings,
        platform_fee_coins: platformFee,
        agency_fee_coins: agencyFee,
        agent_fee_coins: agentFee,
        profit_usd: profitUsd,
      });

      // Update party room status if exists
      const partyRooms = await base44.asServiceRole.entities.PartyRoom.filter({ id: session.room_id });
      if (partyRooms.length > 0) {
        await base44.asServiceRole.entities.PartyRoom.update(partyRooms[0].id, { status: 'scheduled' });
      }

      return Response.json({
        success: true,
        closed: true,
        session: updated,
        summary: {
          duration_seconds: durationSeconds,
          peak_viewers: session.peak_viewers,
          total_gifts: session.total_gifts,
          total_messages: session.total_messages,
          gross_revenue_coins: grossCoins,
          host_earnings_coins: hostEarnings,
          profit_usd: profitUsd,
          participants_dismissed: activeParticipants.length,
        },
      });
    }

    // Get close status for a room
    if (action === 'getStatus') {
      const { session_id } = body;
      if (!session_id) return Response.json({ error: 'session_id is required' }, { status: 400 });

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      return Response.json({
        session_id: session.id,
        room_id: session.room_id,
        status: session.status,
        is_closed: session.status === 'closed' || session.status === 'shutdown',
        started_at: session.started_at,
        ended_at: session.ended_at,
        duration_seconds: session.duration_seconds,
        final_profit_usd: session.profit_usd,
        host_earnings_coins: session.host_earnings_coins,
      });
    }

    // List recently closed rooms
    if (action === 'listClosed') {
      const { limit = 20 } = body;
      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ status: 'closed' }, '-ended_at', limit);
      return Response.json({
        closed_sessions: sessions.map(s => ({
          id: s.id,
          room_id: s.room_id,
          host_name: s.host_name,
          started_at: s.started_at,
          ended_at: s.ended_at,
          duration_seconds: s.duration_seconds,
          peak_viewers: s.peak_viewers,
          total_gifts: s.total_gifts,
          profit_usd: s.profit_usd,
          host_earnings_coins: s.host_earnings_coins,
        })),
        count: sessions.length,
      });
    }

    return Response.json({ error: 'Invalid action. Available: close, getStatus, listClosed' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});