import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // Force shutdown a room (admin only)
    if (action === 'shutdown') {
      const { session_id, reason } = body;
      if (!session_id) return Response.json({ error: 'session_id is required' }, { status: 400 });
      if (!reason) return Response.json({ error: 'reason is required for force shutdown' }, { status: 400 });

      // Admin only
      if (user.role !== 'admin') {
        return Response.json({ error: 'Force shutdown requires admin privileges' }, { status: 403 });
      }

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: session_id });
      if (sessions.length === 0) return Response.json({ error: 'Session not found' }, { status: 404 });
      const session = sessions[0];

      if (session.status === 'closed' || session.status === 'shutdown') {
        return Response.json({ error: 'Room is already closed', status: session.status }, { status: 400 });
      }

      // Calculate duration up to shutdown
      const startTime = session.started_at ? new Date(session.started_at).getTime() : Date.now();
      const durationSeconds = Math.floor((Date.now() - startTime) / 1000);
      const now = new Date().toISOString();

      // Immediately mark all active participants as kicked
      const activeParticipants = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id, status: 'active' });
      for (const p of activeParticipants) {
        await base44.asServiceRole.entities.RoomParticipant.update(p.id, {
          status: 'kicked',
          left_at: now,
          kicked_by: user.id,
        });
      }

      // Force update session to shutdown
      const updated = await base44.asServiceRole.entities.RoomSession.update(session.id, {
        status: 'shutdown',
        ended_at: now,
        duration_seconds: durationSeconds,
        current_viewers: 0,
        is_force_closed: true,
        shutdown_reason: reason,
        shutdown_by: user.id,
      });

      // Update party room status
      const partyRooms = await base44.asServiceRole.entities.PartyRoom.filter({ id: session.room_id });
      if (partyRooms.length > 0) {
        await base44.asServiceRole.entities.PartyRoom.update(partyRooms[0].id, { status: 'scheduled' });
      }

      // Create a report for audit
      await base44.asServiceRole.entities.CommunityReport.create({
        reporter: user.email,
        reported: session.host_name || session.host_id,
        reason: `Force shutdown: ${reason}`,
        status: 'resolved',
        severity: 'critical',
        date: now,
        evidence: `Session ${session_id} shut down by admin ${user.id}`,
      });

      return Response.json({
        success: true,
        shutdown: true,
        session: updated,
        details: {
          reason,
          shut_down_by: user.id,
          shut_down_at: now,
          duration_before_shutdown: durationSeconds,
          participants_kicked: activeParticipants.length,
        },
      });
    }

    // Get shutdown log (admin audit trail)
    if (action === 'getLog') {
      const { limit = 20 } = body;

      // Admin only
      if (user.role !== 'admin') {
        return Response.json({ error: 'Admin privileges required' }, { status: 403 });
      }

      const sessions = await base44.asServiceRole.entities.RoomSession.filter({ is_force_closed: true }, '-ended_at', limit);
      return Response.json({
        shutdown_log: sessions.map(s => ({
          id: s.id,
          room_id: s.room_id,
          host_name: s.host_name,
          host_id: s.host_id,
          started_at: s.started_at,
          ended_at: s.ended_at,
          duration_seconds: s.duration_seconds,
          shutdown_reason: s.shutdown_reason,
          shutdown_by: s.shutdown_by,
          peak_viewers: s.peak_viewers,
          gross_revenue_coins: s.gross_revenue_coins,
          security_flags: s.security_flags,
        })),
        count: sessions.length,
      });
    }

    // Bulk shutdown multiple rooms (admin only — emergency)
    if (action === 'bulkShutdown') {
      const { session_ids, reason } = body;
      if (!session_ids || !Array.isArray(session_ids) || session_ids.length === 0) {
        return Response.json({ error: 'session_ids array is required' }, { status: 400 });
      }
      if (!reason) return Response.json({ error: 'reason is required' }, { status: 400 });

      if (user.role !== 'admin') {
        return Response.json({ error: 'Bulk shutdown requires admin privileges' }, { status: 403 });
      }

      const now = new Date().toISOString();
      const results = [];

      for (const sid of session_ids) {
        try {
          const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: sid });
          if (sessions.length === 0) {
            results.push({ session_id: sid, success: false, error: 'Not found' });
            continue;
          }
          const session = sessions[0];

          if (session.status === 'closed' || session.status === 'shutdown') {
            results.push({ session_id: sid, success: false, error: 'Already closed' });
            continue;
          }

          const startTime = session.started_at ? new Date(session.started_at).getTime() : Date.now();
          const durationSeconds = Math.floor((Date.now() - startTime) / 1000);

          // Kick all active participants
          const activeParticipants = await base44.asServiceRole.entities.RoomParticipant.filter({ session_id: sid, status: 'active' });
          for (const p of activeParticipants) {
            await base44.asServiceRole.entities.RoomParticipant.update(p.id, {
              status: 'kicked',
              left_at: now,
              kicked_by: user.id,
            });
          }

          await base44.asServiceRole.entities.RoomSession.update(sid, {
            status: 'shutdown',
            ended_at: now,
            duration_seconds: durationSeconds,
            current_viewers: 0,
            is_force_closed: true,
            shutdown_reason: reason,
            shutdown_by: user.id,
          });

          results.push({ session_id: sid, success: true, participants_kicked: activeParticipants.length });
        } catch (e) {
          results.push({ session_id: sid, success: false, error: e.message });
        }
      }

      return Response.json({
        success: true,
        bulk_result: results,
        total_shut_down: results.filter(r => r.success).length,
        total_failed: results.filter(r => !r.success).length,
      });
    }

    return Response.json({ error: 'Invalid action. Available: shutdown, getLog, bulkShutdown' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});