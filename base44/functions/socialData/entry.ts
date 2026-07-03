import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const COLORS = ['#EC4899', '#EF4444', '#2F80ED', '#8B5CF6', '#D4AF37', '#10B981', '#F59E0B', '#06B6D4'];

function colorForName(name) {
  if (!name) return COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

function initials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function generateInviteCode(userId) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const seed = (userId || 'XXXX').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 4).padEnd(4, 'X');
  let random = '';
  for (let i = 0; i < 3; i++) random += chars[Math.floor(Math.random() * chars.length)];
  return `VYRO-${seed}-${random}`;
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const { action } = body;

    // Get user profile
    let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
    if (profiles.length === 0) {
      profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
    }
    const profile = profiles.length > 0 ? profiles[0] : null;

    // ===== GET SOCIAL DATA =====
    if (action === 'getSocialData') {
      const inviteCode = profile?.global_id || generateInviteCode(user.id);
      const inviteLink = `https://vyro.app/invite/${inviteCode}`;

      // Fetch all data in parallel
      const [invites, receivedPending, sentPending, acceptedAll, sentRelations, receivedRelations, families] = await Promise.all([
        base44.asServiceRole.entities.Invite.filter({ user_id: user.id }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.FriendRequest.filter({ receiver_id: user.id, status: 'pending' }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.FriendRequest.filter({ sender_id: user.id, status: 'pending' }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.FriendRequest.filter({ status: 'accepted' }, '-created_date', 200).catch(() => []),
        base44.asServiceRole.entities.Relationship.filter({ sender_id: user.id }).catch(() => []),
        base44.asServiceRole.entities.Relationship.filter({ receiver_id: user.id }).catch(() => []),
        base44.asServiceRole.entities.CommunityGroup.list('-created_date', 10).catch(() => []),
      ]);

      const myFriends = acceptedAll.filter(f => f.sender_id === user.id || f.receiver_id === user.id);

      // Look up friend profiles for role/level/vip data (limit 20 for performance)
      const friendUserIds = myFriends.slice(0, 20).map(f => f.sender_id === user.id ? f.receiver_id : f.sender_id);
      const friendProfiles = await Promise.all(
        friendUserIds.map(id =>
          base44.asServiceRole.entities.UserProfile.filter({ user_id: id })
            .then(r => r[0] || null)
            .catch(() => null)
        )
      );
      const profileMap = {};
      friendUserIds.forEach((id, i) => { if (friendProfiles[i]) profileMap[id] = friendProfiles[i]; });

      // Helper: build a friend entry from a FriendRequest record
      function buildFriendEntry(f) {
        const isSender = f.sender_id === user.id;
        const friendId = isSender ? f.receiver_id : f.sender_id;
        const name = isSender ? (f.receiver_name || 'User') : (f.sender_name || 'User');
        const avatarUrl = isSender ? f.receiver_avatar : f.sender_avatar;
        const fp = profileMap[friendId];
        return {
          id: f.id,
          name,
          avatar: avatarUrl || initials(name),
          avatarUrl,
          role: fp?.role ? (fp.role.charAt(0).toUpperCase() + fp.role.slice(1)) : 'User',
          level: `LV.${fp?.user_level || 1}`,
          status: fp?.is_online ? 'Online' : 'Offline',
          isOnline: fp?.is_online || false,
          isVip: fp?.is_vip || false,
          isBest: f.is_best || false,
          mutual: f.mutual_friends || 0,
          color: colorForName(name),
          userId: friendId,
        };
      }

      const peopleList = myFriends.map(buildFriendEntry);
      const friendList = myFriends.map(buildFriendEntry);
      const requestList = receivedPending.map(r => ({
        id: r.id,
        name: r.sender_name || 'User',
        avatar: r.sender_avatar || initials(r.sender_name || 'User'),
        avatarUrl: r.sender_avatar,
        mutual: r.mutual_friends || 0,
        date: r.request_date || (r.created_date ? new Date(r.created_date).toISOString().split('T')[0] : ''),
        color: colorForName(r.sender_name),
        userId: r.sender_id,
      }));

      // Build invite data
      const inviteStats = {
        totalInvited: invites.length,
        active: invites.filter(i => i.status === 'active' || i.status === 'verified').length,
        pending: invites.filter(i => i.status === 'pending' || i.status === 'registered').length,
        coinsEarned: invites.reduce((sum, i) => sum + (i.reward_coins || 0), 0),
      };
      const inviteHistory = invites.map(i => ({
        id: i.id,
        name: i.invited_username || 'Unknown User',
        status: i.status ? (i.status.charAt(0).toUpperCase() + i.status.slice(1)) : 'Pending',
        reward: i.reward_status === 'credited' ? `${i.reward_coins || 0} coins` : '—',
        date: i.invite_date || (i.created_date ? new Date(i.created_date).toISOString().split('T')[0] : ''),
        color: (i.status === 'active' || i.status === 'verified') ? '#27AE60' : (i.status === 'pending' || i.status === 'registered') ? '#F2994A' : '#EB5757',
      }));

      // Build people data
      const peopleStats = {
        followers: profile?.followers || 0,
        following: profile?.following || 0,
        referrals: invites.length,
        online: peopleList.filter(p => p.isOnline).length,
      };
      const categories = [
        { label: "All", count: String(peopleStats.followers + peopleStats.following), icon: "Users", color: "#6B7280" },
        { label: "Followers", count: String(peopleStats.followers), icon: "UserCheck", color: "#2F80ED" },
        { label: "Following", count: String(peopleStats.following), icon: "UserPlus", color: "#56CCF2" },
        { label: "Referrals", count: String(peopleStats.referrals), icon: "Ticket", color: "#EC4899" },
        { label: "Friends", count: String(myFriends.length), icon: "Handshake", color: "#27AE60" },
        { label: "Family", count: String(families.length > 0 ? (families[0].members || 0) : 0), icon: "Heart", color: "#EC4899" },
      ];

      // Build friends data
      const friendsStats = {
        total: myFriends.length,
        pending: receivedPending.length,
        sent: sentPending.length,
        online: friendList.filter(f => f.isOnline).length,
        best: myFriends.filter(f => f.is_best).length,
      };

      // Build relationship stats
      const allRelations = [...sentRelations, ...receivedRelations];
      const relationshipStats = {
        sent: sentRelations.filter(r => r.status === 'pending').length,
        received: receivedRelations.filter(r => r.status === 'pending').length,
        active: allRelations.filter(r => r.status === 'accepted').length,
        history: allRelations.length,
      };

      // Build family stats
      const myFamily = families.length > 0 ? families[0] : null;
      const familyStats = {
        members: myFamily?.members || 0,
        level: 0,
        rank: 0,
        treasury: 0,
      };

      return Response.json({
        invite: { code: inviteCode, link: inviteLink, stats: inviteStats, history: inviteHistory },
        people: { stats: peopleStats, categories, list: peopleList },
        friends: { stats: friendsStats, list: friendList, requests: requestList },
        relationship: { stats: relationshipStats },
        family: { stats: familyStats, info: myFamily },
        profile,
      });
    }

    // ===== SEND FRIEND REQUEST =====
    if (action === 'sendFriendRequest') {
      const { receiver_id, receiver_name, receiver_avatar } = body;
      if (!receiver_id) return Response.json({ error: 'receiver_id is required' }, { status: 400 });

      const existing1 = await base44.asServiceRole.entities.FriendRequest.filter({ sender_id: user.id, receiver_id }).catch(() => []);
      const existing2 = await base44.asServiceRole.entities.FriendRequest.filter({ sender_id: receiver_id, receiver_id: user.id }).catch(() => []);
      if (existing1.length > 0 || existing2.length > 0) {
        return Response.json({ error: 'Friend request already exists' }, { status: 400 });
      }

      const created = await base44.asServiceRole.entities.FriendRequest.create({
        sender_id: user.id,
        receiver_id,
        sender_name: user.full_name || profile?.username || 'User',
        sender_avatar: profile?.avatar_url || '',
        receiver_name: receiver_name || '',
        receiver_avatar: receiver_avatar || '',
        status: 'pending',
        mutual_friends: 0,
        request_date: todayStr(),
        is_best: false,
      });
      return Response.json({ success: true, request: created });
    }

    // ===== ACCEPT FRIEND REQUEST =====
    if (action === 'acceptFriendRequest') {
      const { request_id } = body;
      if (!request_id) return Response.json({ error: 'request_id is required' }, { status: 400 });

      const requests = await base44.asServiceRole.entities.FriendRequest.filter({ id: request_id }).catch(() => []);
      if (requests.length === 0) return Response.json({ error: 'Request not found' }, { status: 404 });
      if (requests[0].receiver_id !== user.id) return Response.json({ error: 'Not authorized' }, { status: 403 });

      const updated = await base44.asServiceRole.entities.FriendRequest.update(request_id, { status: 'accepted' });

      if (profile) {
        await base44.asServiceRole.entities.UserProfile.update(profile.id, {
          friends: (profile.friends || 0) + 1,
        });
      }
      return Response.json({ success: true, request: updated });
    }

    // ===== REJECT FRIEND REQUEST =====
    if (action === 'rejectFriendRequest') {
      const { request_id } = body;
      if (!request_id) return Response.json({ error: 'request_id is required' }, { status: 400 });

      const requests = await base44.asServiceRole.entities.FriendRequest.filter({ id: request_id }).catch(() => []);
      if (requests.length === 0) return Response.json({ error: 'Request not found' }, { status: 404 });
      if (requests[0].receiver_id !== user.id) return Response.json({ error: 'Not authorized' }, { status: 403 });

      await base44.asServiceRole.entities.FriendRequest.update(request_id, { status: 'rejected' });
      return Response.json({ success: true });
    }

    // ===== REMOVE FRIEND =====
    if (action === 'removeFriend') {
      const { friend_id } = body;
      if (!friend_id) return Response.json({ error: 'friend_id is required' }, { status: 400 });

      await base44.asServiceRole.entities.FriendRequest.delete(friend_id);
      if (profile) {
        await base44.asServiceRole.entities.UserProfile.update(profile.id, {
          friends: Math.max(0, (profile.friends || 0) - 1),
        });
      }
      return Response.json({ success: true });
    }

    // ===== CREATE INVITE =====
    if (action === 'createInvite') {
      const { invited_user_id, invited_username } = body;
      if (!invited_user_id) return Response.json({ error: 'invited_user_id is required' }, { status: 400 });

      const inviteCode = profile?.global_id || generateInviteCode(user.id);
      const created = await base44.asServiceRole.entities.Invite.create({
        user_id: user.id,
        invite_code: inviteCode,
        invited_user_id,
        invited_username: invited_username || '',
        status: 'registered',
        reward_coins: 50,
        reward_status: 'pending',
        invite_date: todayStr(),
      });
      return Response.json({ success: true, invite: created });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});