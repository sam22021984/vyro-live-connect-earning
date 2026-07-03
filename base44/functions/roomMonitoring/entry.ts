import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // Get real-time monitoring stats for a room
    if (action === 'getStats') {
      const { session_id } = body;
      if (!session_id) return Response.json({ error: 'session_id is required' }, { status: 400 });

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      // Get active participants count
      const participants = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id, status: 'active' });
      const activeViewers = participants.filter(p => p.role === 'viewer').length;
      const coHosts = participants.filter(p => p.role === 'co_host').length;
      const moderators = participants.filter(p => p.role === 'moderator' || p.role === 'admin').length;

      // Get recent gifts
      const gifts = await base44.asServiceRole.entities.ChatMessage.filter({ conversation_id: session.room_id, type: 'gift' }, '-created_date', 20);

      // Get recent messages
      const messages = await base44.asServiceRole.entities.ChatMessage.filter({ conversation_id: session.room_id, type: 'text' }, '-created_date', 10);

      // Calculate engagement rate
      const totalActivity = (session.total_gifts || 0) + (session.total_messages || 0);
      const engagementRate = session.current_viewers > 0 ? (totalActivity / session.current_viewers) : 0;

      // Calculate duration
      const startTime = session.started_at ? new Date(session.started_at).getTime() : Date.now();
      const durationSeconds = session.status === 'live' ? Math.floor((Date.now() - startTime) / 1000) : (session.duration_seconds || 0);

      // Compute health score
      let healthScore = 100;
      if (engagementRate < 0.5) healthScore -= 20;
      if (session.current_viewers < 5) healthScore -= 15;
      if ((session.security_flags || []).length > 0) healthScore -= 25;
      if (session.current_viewers > session.peak_viewers * 0.3) healthScore += 10;
      healthScore = Math.max(0, Math.min(100, healthScore));

      // Update session with current stats
      const updated = await base44.asServiceRole.entities.RoomSession.update(session.id, {
        current_viewers: activeViewers + coHosts + moderators + 1, // +1 for host
        duration_seconds: durationSeconds,
        total_messages: session.total_messages || messages.length,
        health_score: healthScore,
        peak_viewers: Math.max(session.peak_viewers || 0, activeViewers + coHosts + moderators + 1),
      });

      return Response.json({
        monitoring: {
          session_id: session.id,
          room_id: session.room_id,
          status: session.status,
          host_name: session.host_name,
          duration_seconds: durationSeconds,
          current_viewers: activeViewers + coHosts + moderators + 1,
          peak_viewers: Math.max(session.peak_viewers || 0, activeViewers + coHosts + moderators + 1),
          active_participants: participants.length,
          viewer_count: activeViewers,
          co_host_count: coHosts,
          moderator_count: moderators,
          total_gifts: session.total_gifts || 0,
          total_coins: session.total_coins || 0,
          total_messages: session.total_messages || 0,
          engagement_rate: Math.round(engagementRate * 100) / 100,
          health_score: healthScore,
          security_flags: session.security_flags || [],
          recent_gifts: gifts.length,
          recent_messages: messages.length,
        },
      });
    }

    // Get activity feed for a room
    if (action === 'getActivity') {
      const { session_id, limit = 30 } = body;
      if (!session_id) return Response.json({ error: 'session_id is required' }, { status: 400 });

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      // Fetch recent gifts and messages
      const [gifts, messages] = await Promise.all([
        base44.asServiceRole.entities.ChatMessage.filter({ conversation_id: session.room_id, type: 'gift' }, '-created_date', limit),
        base44.asServiceRole.entities.ChatMessage.filter({ conversation_id: session.room_id, type: 'text' }, '-created_date', limit),
      ]);

      // Merge and sort by time
      const activity = [
        ...gifts.map(g => ({ type: 'gift', id: g.id, sender_id: g.sender_id, gift_name: g.gift_name, gift_price: g.gift_price, time: g.created_date })),
        ...messages.map(m => ({ type: 'message', id: m.id, sender_id: m.sender_id, text: m.text?.substring(0, 100), time: m.created_date })),
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, limit);

      return Response.json({ activity, count: activity.length });
    }

    // Get health/alerts for all live rooms (admin dashboard)
    if (action === 'getHealth') {
      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ status: 'live' }, '-started_at', 100);

      const alerts = [];
      for (const s of sessions) {
        if ((s.security_flags || []).length > 0) {
          alerts.push({ session_id: s.id, room_id: s.room_id, type: 'security', flags: s.security_flags, severity: 'high' });
        }
        if (s.health_score < 50) {
          alerts.push({ session_id: s.id, room_id: s.room_id, type: 'low_health', score: s.health_score, severity: 'medium' });
        }
        if (s.current_viewers === 0) {
          alerts.push({ session_id: s.id, room_id: s.room_id, type: 'empty_room', severity: 'low' });
        }
      }

      return Response.json({
        total_live: sessions.length,
        total_viewers: sessions.reduce((s, sess) => s + (sess.current_viewers || 0), 0),
        total_coins_flow: sessions.reduce((s, sess) => s + (sess.gross_revenue_coins || 0), 0),
        avg_health_score: sessions.length > 0 ? sessions.reduce((s, sess) => s + (sess.health_score || 100), 0) / sessions.length : 100,
        alerts,
        alert_count: alerts.length,
      });
    }

    // Update viewer count (called periodically from client)
    if (action === 'updateViewers') {
      const { session_id, viewer_count } = body;
      if (!session_id) return Response.json({ error: 'session_id is required' }, { status: 400 });

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      const updated = await base44.asServiceRole.entities.RoomSession.update(session.id, {
        current_viewers: viewer_count,
        peak_viewers: Math.max(session.peak_viewers || 0, viewer_count),
      });

      return Response.json({ success: true, current_viewers: viewer_count, peak_viewers: updated.peak_viewers });
    }

    return Response.json({ error: 'Invalid action. Available: getStats, getActivity, getHealth, updateViewers' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});