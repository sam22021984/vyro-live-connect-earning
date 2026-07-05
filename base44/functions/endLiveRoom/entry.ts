import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { room_id } = body;
    if (!room_id) return Response.json({ error: 'room_id is required' }, { status: 400 });

    // Fetch room
    const room = await base44.entities.PartyRoom.get(room_id);
    if (!room) return Response.json({ error: 'Room not found' }, { status: 404 });

    // Only the room owner or a platform admin can end the room
    const isOwner = room.owner_id === user.id || room.host_id === user.id || room.created_by_id === user.id;
    const isAdmin = user.role === 'admin' || user.role === 'owner';
    if (!isOwner && !isAdmin) {
      return Response.json({ error: 'Only the host can end this room' }, { status: 403 });
    }

    const now = new Date().toISOString();

    // Fetch session
    let session = null;
    try {
      const sessions = await base44.entities.RoomSession.filter({ room_id, status: 'live' });
      session = sessions?.[0];
    } catch {}

    // Fetch participants
    const participants = await base44.entities.RoomParticipant.filter({ room_id, status: 'active' });
    const totalVisitors = participants?.length || 0;

    // Fetch transactions (gifts)
    let totalGifts = 0;
    let totalCoins = 0;
    let topGifters = [];
    try {
      const txns = await base44.entities.Transaction.filter({ recipient_id: user.id, type: 'gift', status: 'completed' });
      totalGifts = txns?.length || 0;
      totalCoins = txns?.reduce((sum, t) => sum + (t.coins || 0), 0) || 0;

      // Aggregate top gifters
      const gifterMap = {};
      (txns || []).forEach((t) => {
        const gid = t.user_id;
        if (!gifterMap[gid]) gifterMap[gid] = { user_id: gid, name: t.recipient_name || 'User', coins: 0, count: 0 };
        gifterMap[gid].coins += t.coins || 0;
        gifterMap[gid].count += 1;
      });
      topGifters = Object.values(gifterMap).sort((a, b) => b.coins - a.coins).slice(0, 5);
    } catch {}

    // Calculate duration
    let durationSeconds = 0;
    const startedAt = room.started_at || session?.started_at;
    if (startedAt) {
      durationSeconds = Math.floor((new Date(now).getTime() - new Date(startedAt).getTime()) / 1000);
    }

    const peakViewers = room.peak_viewers || session?.peak_viewers || totalVisitors;

    // Update room status
    await base44.entities.PartyRoom.update(room_id, {
      status: 'ended',
      ended_at: now,
      total_gifts: totalGifts,
      total_coins: totalCoins,
    });

    // Update session with final analytics
    if (session) {
      await base44.entities.RoomSession.update(session.id, {
        status: 'closed',
        ended_at: now,
        duration_seconds: durationSeconds,
        current_viewers: 0,
        peak_viewers: peakViewers,
        total_gifts: totalGifts,
        total_coins: totalCoins,
        host_earnings_coins: Math.floor(totalCoins * (session.host_share_pct || 40) / 100),
        platform_fee_coins: Math.floor(totalCoins * (session.platform_share_pct || 30) / 100),
        agency_fee_coins: Math.floor(totalCoins * (session.agency_share_pct || 20) / 100),
        agent_fee_coins: Math.floor(totalCoins * (session.agent_share_pct || 10) / 100),
      });
    }

    // Mark all participants as left
    if (participants && participants.length > 0) {
      await base44.entities.RoomParticipant.updateMany(
        { room_id, status: 'active' },
        { $set: { status: 'left', left_at: now } }
      );
    }

    // Generate summary
    const summary = {
      room_id,
      room_name: room.name,
      duration_seconds: durationSeconds,
      total_visitors: totalVisitors,
      peak_viewers: peakViewers,
      total_gifts: totalGifts,
      total_coins: totalCoins,
      host_earnings_coins: Math.floor(totalCoins * (session?.host_share_pct || 40) / 100),
      top_gifters: topGifters,
      ended_at: now,
    };

    return Response.json({ success: true, summary });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});