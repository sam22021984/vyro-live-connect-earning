import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action, target_user_id, room_id, room_session_id } = body;

    // Get current user's profile
    const profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
    const myProfile = profiles?.[0];
    if (!myProfile) return Response.json({ error: 'Profile not found' }, { status: 404 });

    if (action === 'follow') {
      if (!target_user_id) return Response.json({ error: 'target_user_id required' }, { status: 400 });
      if (target_user_id === myProfile.id) return Response.json({ error: 'Cannot follow yourself' }, { status: 400 });

      // Check existing
      const existing = await base44.entities.FriendRequest.filter({
        sender_id: myProfile.id,
        receiver_id: target_user_id,
      });

      if (existing && existing.length > 0) {
        const req0 = existing[0];
        if (req0.status === 'accepted') return Response.json({ success: true, status: 'already_following' });
        // Update to accepted (auto-accept for public profiles)
        await base44.entities.FriendRequest.update(req0.id, { status: 'accepted' });
      } else {
        // Get target profile
        const targetProfiles = await base44.asServiceRole.entities.UserProfile.filter({ id: target_user_id });
        const target = targetProfiles?.[0];
        if (!target) return Response.json({ error: 'Target user not found' }, { status: 404 });

        await base44.entities.FriendRequest.create({
          sender_id: myProfile.id,
          receiver_id: target_user_id,
          sender_name: myProfile.username || myProfile.full_name || 'User',
          receiver_name: target.username || target.full_name || 'User',
          sender_avatar: myProfile.avatar_url || '',
          receiver_avatar: target.avatar_url || '',
          status: 'accepted',
          request_date: new Date().toISOString().split('T')[0],
        });
      }

      // Increment follower count on target
      const targetProfiles2 = await base44.asServiceRole.entities.UserProfile.filter({ id: target_user_id });
      if (targetProfiles2?.[0]) {
        const t = targetProfiles2[0];
        await base44.asServiceRole.entities.UserProfile.update(t.id, { followers: (t.followers || 0) + 1 });
      }
      // Increment following count on self
      await base44.asServiceRole.entities.UserProfile.update(myProfile.id, { following: (myProfile.following || 0) + 1 });

      return Response.json({ success: true, status: 'following' });
    }

    if (action === 'unfollow') {
      if (!target_user_id) return Response.json({ error: 'target_user_id required' }, { status: 400 });

      const existing = await base44.entities.FriendRequest.filter({
        sender_id: myProfile.id,
        receiver_id: target_user_id,
      });

      if (existing && existing.length > 0) {
        await base44.entities.FriendRequest.delete(existing[0].id);
      }

      // Decrement counts
      const targetProfiles = await base44.asServiceRole.entities.UserProfile.filter({ id: target_user_id });
      if (targetProfiles?.[0]) {
        const t = targetProfiles[0];
        await base44.asServiceRole.entities.UserProfile.update(t.id, { followers: Math.max(0, (t.followers || 0) - 1) });
      }
      await base44.asServiceRole.entities.UserProfile.update(myProfile.id, { following: Math.max(0, (myProfile.following || 0) - 1) });

      return Response.json({ success: true, status: 'unfollowed' });
    }

    if (action === 'check_following') {
      const targets = body.target_ids || [];
      if (!targets.length) return Response.json({ following: {} });

      const result = {};
      for (const tid of targets) {
        const existing = await base44.entities.FriendRequest.filter({
          sender_id: myProfile.id,
          receiver_id: tid,
          status: 'accepted',
        });
        result[tid] = existing && existing.length > 0;
      }
      return Response.json({ following: result });
    }

    if (action === 'join_room') {
      if (!room_id) return Response.json({ error: 'room_id required' }, { status: 400 });

      // Check if already a participant
      const existing = await base44.asServiceRole.entities.RoomParticipant.filter({
        room_id,
        user_id: myProfile.id,
        status: 'active',
      });

      if (!existing || existing.length === 0) {
        await base44.asServiceRole.entities.RoomParticipant.create({
          room_id,
          user_id: myProfile.id,
          username: myProfile.username || 'User',
          avatar_url: myProfile.avatar_url || '',
          global_id: myProfile.global_id || '',
          role: 'viewer',
          status: 'active',
          joined_at: new Date().toISOString(),
          country: myProfile.country || '',
          is_vip: myProfile.is_vip || false,
        });

        // Increment viewer count on room session
        if (room_session_id) {
          const sessions = await base44.asServiceRole.entities.RoomSession.filter({ id: room_session_id });
          if (sessions?.[0]) {
            const s = sessions[0];
            await base44.asServiceRole.entities.RoomSession.update(s.id, {
              current_viewers: (s.current_viewers || 0) + 1,
              peak_viewers: Math.max(s.peak_viewers || 0, (s.current_viewers || 0) + 1),
            });
          }
        }
      }

      return Response.json({ success: true, status: 'joined' });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});