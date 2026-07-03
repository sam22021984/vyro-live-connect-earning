import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

function getSupabaseUser(req: Request): { id: string; email: string } | null {
  try {
    const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
    if (!authHeader) return null;
    const token = authHeader.replace('Bearer ', '').trim();
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    let b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const payload = JSON.parse(atob(b64));
    if (!payload.sub) return null;
    return { id: payload.sub, email: payload.email || '' };
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = getSupabaseUser(req);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { query, action, target_user_id } = body;

    // --- Search users by username, global_id, or full_name (partial match) ---
    if (action === 'search' || (!action && query)) {
      const q = (query || '').trim();
      if (!q) return Response.json({ users: [] });

      // Fetch a larger pool and filter client-side for partial matching
      const allUsers = await base44.asServiceRole.entities.UserProfile.list('-created_date', 200);

      const lowerQ = q.toLowerCase();
      const matched = (allUsers || []).filter((u) => {
        const username = (u.username || '').toLowerCase();
        const globalId = (u.global_id || '').toLowerCase();
        const fullName = (u.full_name || '').toLowerCase();
        return username.includes(lowerQ) || globalId.includes(lowerQ) || fullName.includes(lowerQ);
      });

      // Get my profile to check following status and exclude self
      const myProfiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      const myProfile = myProfiles?.[0];
      const myId = myProfile?.id;

      const results = [];
      for (const u of matched.slice(0, 20)) {
        if (u.id === myId) continue;
        // Check if already following
        let isFollowing = false;
        if (myId) {
          const existing = await base44.asServiceRole.entities.FriendRequest.filter({
            sender_id: myId,
            receiver_id: u.id,
            status: 'accepted',
          });
          isFollowing = existing && existing.length > 0;
        }
        results.push({
          id: u.id,
          username: u.username,
          full_name: u.full_name,
          global_id: u.global_id,
          avatar_url: u.avatar_url,
          followers: u.followers || 0,
          country: u.country || '',
          is_verified: u.is_verified || false,
          is_vip: u.is_vip || false,
          is_following: isFollowing,
        });
      }

      return Response.json({ users: results });
    }

    // --- Follow a user ---
    if (action === 'follow') {
      if (!target_user_id) return Response.json({ error: 'target_user_id required' }, { status: 400 });

      const myProfiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      const myProfile = myProfiles?.[0];
      if (!myProfile) return Response.json({ error: 'Profile not found' }, { status: 404 });
      if (target_user_id === myProfile.id) return Response.json({ error: 'Cannot follow yourself' }, { status: 400 });

      const existing = await base44.asServiceRole.entities.FriendRequest.filter({
        sender_id: myProfile.id,
        receiver_id: target_user_id,
      });

      if (existing && existing.length > 0) {
        if (existing[0].status === 'accepted') return Response.json({ success: true, status: 'already_following' });
        await base44.asServiceRole.entities.FriendRequest.update(existing[0].id, { status: 'accepted' });
      } else {
        const targetProfiles = await base44.asServiceRole.entities.UserProfile.filter({ id: target_user_id });
        const target = targetProfiles?.[0];
        if (!target) return Response.json({ error: 'Target user not found' }, { status: 404 });

        await base44.asServiceRole.entities.FriendRequest.create({
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

      // Update follower/following counts
      const targetProfiles2 = await base44.asServiceRole.entities.UserProfile.filter({ id: target_user_id });
      if (targetProfiles2?.[0]) {
        const t = targetProfiles2[0];
        await base44.asServiceRole.entities.UserProfile.update(t.id, { followers: (t.followers || 0) + 1 });
      }
      await base44.asServiceRole.entities.UserProfile.update(myProfile.id, { following: (myProfile.following || 0) + 1 });

      return Response.json({ success: true, status: 'following' });
    }

    // --- Unfollow a user ---
    if (action === 'unfollow') {
      if (!target_user_id) return Response.json({ error: 'target_user_id required' }, { status: 400 });

      const myProfiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      const myProfile = myProfiles?.[0];
      if (!myProfile) return Response.json({ error: 'Profile not found' }, { status: 404 });

      const existing = await base44.asServiceRole.entities.FriendRequest.filter({
        sender_id: myProfile.id,
        receiver_id: target_user_id,
      });

      if (existing && existing.length > 0) {
        await base44.asServiceRole.entities.FriendRequest.delete(existing[0].id);
      }

      const targetProfiles = await base44.asServiceRole.entities.UserProfile.filter({ id: target_user_id });
      if (targetProfiles?.[0]) {
        const t = targetProfiles[0];
        await base44.asServiceRole.entities.UserProfile.update(t.id, { followers: Math.max(0, (t.followers || 0) - 1) });
      }
      await base44.asServiceRole.entities.UserProfile.update(myProfile.id, { following: Math.max(0, (myProfile.following || 0) - 1) });

      return Response.json({ success: true, status: 'unfollowed' });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});