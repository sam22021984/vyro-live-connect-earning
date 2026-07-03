import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // Get profit summary for a room session
    if (action === 'getProfit') {
      const { session_id } = body;
      if (!session_id) return Response.json({ error: 'session_id is required' }, { status: 400 });

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      const grossCoins = session.gross_revenue_coins || 0;
      const hostEarnings = Math.round(grossCoins * (session.host_share_pct || 40) / 100);
      const platformFee = Math.round(grossCoins * (session.platform_share_pct || 30) / 100);
      const agencyFee = Math.round(grossCoins * (session.agency_share_pct || 20) / 100);
      const agentFee = Math.round(grossCoins * (session.agent_share_pct || 10) / 100);
      // 1 USD = 10000 coins (platform rate)
      const profitUsd = grossCoins / 10000;

      // Update session with computed values
      const updated = await base44.asServiceRole.entities.RoomSession.update(session.id, {
        host_earnings_coins: hostEarnings,
        platform_fee_coins: platformFee,
        agency_fee_coins: agencyFee,
        agent_fee_coins: agentFee,
        profit_usd: profitUsd,
      });

      return Response.json({
        session: updated,
        profit: {
          gross_revenue_coins: grossCoins,
          host_earnings_coins: hostEarnings,
          platform_fee_coins: platformFee,
          agency_fee_coins: agencyFee,
          agent_fee_coins: agentFee,
          profit_usd: profitUsd,
          total_gifts: session.total_gifts || 0,
          duration_seconds: session.duration_seconds || 0,
          shares: {
            host: `${session.host_share_pct || 40}%`,
            platform: `${session.platform_share_pct || 30}%`,
            agency: `${session.agency_share_pct || 20}%`,
            agent: `${session.agent_share_pct || 10}%`,
          },
        },
      });
    }

    // Get profit history across all sessions for a host
    if (action === 'getHistory') {
      const { host_id, limit = 20 } = body;
      const filter = host_id ? { host_id } : {};
      const sessions = await base44.asServiceRole.entities.RoomSession.filter(filter, '-started_at', limit);

      const totalProfit = sessions.reduce((s, sess) => s + (sess.profit_usd || 0), 0);
      const totalCoins = sessions.reduce((s, sess) => s + (sess.gross_revenue_coins || 0), 0);
      const totalGifts = sessions.reduce((s, sess) => s + (sess.total_gifts || 0), 0);
      const totalDuration = sessions.reduce((s, sess) => s + (sess.duration_seconds || 0), 0);

      return Response.json({
        sessions: sessions.map(s => ({
          id: s.id,
          room_id: s.room_id,
          host_name: s.host_name,
          status: s.status,
          started_at: s.started_at,
          duration_seconds: s.duration_seconds,
          gross_revenue_coins: s.gross_revenue_coins,
          profit_usd: s.profit_usd,
          total_gifts: s.total_gifts,
          peak_viewers: s.peak_viewers,
        })),
        summary: {
          total_sessions: sessions.length,
          total_profit_usd: totalProfit,
          total_coins: totalCoins,
          total_gifts: totalGifts,
          total_duration_seconds: totalDuration,
          avg_profit_per_session: sessions.length > 0 ? totalProfit / sessions.length : 0,
        },
      });
    }

    // Settle profit — distribute earnings (marks session as settled)
    if (action === 'settle') {
      const { session_id } = body;
      if (!session_id) return Response.json({ error: 'session_id is required' }, { status: 400 });

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      // Credit host earnings to their profile
      if (session.host_earnings_coins > 0) {
        let hostProfiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: session.host_id });
        if (hostProfiles.length === 0) {
          hostProfiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: session.host_id });
        }
        if (hostProfiles.length > 0) {
          const hostProfile = hostProfiles[0];
          await base44.asServiceRole.entities.UserProfile.update(hostProfile.id, {
            coins: (hostProfile.coins || 0) + session.host_earnings_coins,
          });
        }
      }

      // Create transaction record
      await base44.asServiceRole.entities.Transaction.create({
        user_id: session.host_id,
        type: 'recharge',
        amount_usd: session.profit_usd || 0,
        coins: session.host_earnings_coins || 0,
        status: 'completed',
        description: `Room profit settlement for session ${session.room_id}`,
        tier_label: 'room_profit',
      });

      return Response.json({
        success: true,
        settled_amount_coins: session.host_earnings_coins,
        settled_amount_usd: session.profit_usd,
        session_id,
      });
    }

    // List all live/profitable sessions
    if (action === 'listActive') {
      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ status: 'live' }, '-started_at', 50);
      return Response.json({
        active_sessions: sessions.map(s => ({
          id: s.id,
          room_id: s.room_id,
          host_name: s.host_name,
          current_viewers: s.current_viewers,
          gross_revenue_coins: s.gross_revenue_coins,
          total_gifts: s.total_gifts,
          started_at: s.started_at,
          health_score: s.health_score,
        })),
        count: sessions.length,
      });
    }

    return Response.json({ error: 'Invalid action. Available: getProfit, getHistory, settle, listActive' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});