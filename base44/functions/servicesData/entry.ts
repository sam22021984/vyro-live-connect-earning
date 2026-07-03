import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

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

    // ===== GET ALL SERVICES DATA =====
    if (action === 'getServicesData') {
      const [notifications, supportTickets, mallItems, badges, achievements] = await Promise.all([
        base44.asServiceRole.entities.Notification.filter({ user_id: user.id }, '-created_date', 100).catch(() => []),
        base44.asServiceRole.entities.SupportTicket.filter({ user_id: user.id }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.MallItem.filter({ is_active: true }, 'sort_order', 100).catch(() => []),
        base44.asServiceRole.entities.Badge.list().catch(() => []),
        base44.asServiceRole.entities.Achievement.filter({ created_by_id: user.id }).catch(() => []),
      ]);

      // Message Center stats
      const unreadCount = notifications.filter(n => !n.is_read).length;
      const alertCount = notifications.filter(n => n.priority === 'high' || n.priority === 'critical').length;
      const announcementCount = notifications.filter(n => n.type === 'announcement').length;
      const ticketCount = supportTickets.filter(t => t.status === 'open' || t.status === 'pending').length;

      // Group notifications by type
      const notificationsByType = {
        official_announcements: notifications.filter(n => n.type === 'announcement'),
        customer_support: notifications.filter(n => n.type === 'support'),
        verification_center: notifications.filter(n => n.type === 'verification'),
        reports_violations: notifications.filter(n => n.type === 'report'),
        system_messages: notifications.filter(n => n.type === 'system' || n.type === 'security' || n.type === 'wallet'),
      };

      // Trust & Reputation data from real profile
      const trustScore = profile?.trust_score || 0;
      const trustData = {
        trustScore,
        trustScoreMax: 100,
        trustPercentage: trustScore,
        reputationLevel: getTrustLevel(trustScore),
        verificationStatus: profile?.verification_status || 'unverified',
        safetyStatus: profile?.safety_status || 'medium',
        reputationRating: profile?.reputation_rating || 0,
        profileCompletion: profile?.profile_completion || 0,
        activityScore: profile?.activity_score || 0,
        isVerified: profile?.is_verified || false,
        badges: badges.slice(0, 20),
        achievements: achievements,
      };

      // Level System data from real profile
      const levelData = {
        userLevel: profile?.user_level || 1,
        userXp: profile?.user_xp || 0,
        userXpMax: profile?.user_xp_max || 10000,
        hostLevel: profile?.host_level || 1,
        hostXp: profile?.host_xp || 0,
        hostXpMax: profile?.host_xp_max || 10000,
        giftingLevel: profile?.gifting_level || 1,
        giftingXp: profile?.gifting_xp || 0,
        giftingXpMax: profile?.gifting_xp_max || 10000,
        streamingLevel: profile?.streaming_level || 1,
        streamingXp: profile?.streaming_xp || 0,
        streamingXpMax: profile?.streaming_xp_max || 10000,
        totalXp: profile?.total_xp || 0,
        coins: profile?.coins || 0,
        followers: profile?.followers || 0,
        following: profile?.following || 0,
        giftsReceived: profile?.gifts_received || 0,
        giftsSent: profile?.gifts_sent || 0,
        visitors: profile?.visitors || 0,
        friends: profile?.friends || 0,
      };

      return Response.json({
        messageCenter: {
          stats: {
            unread: unreadCount,
            alerts: alertCount,
            announcements: announcementCount,
            tickets: ticketCount,
            total: notifications.length,
          },
          notifications,
          notificationsByType,
        },
        support: {
          tickets: supportTickets,
          stats: {
            total: supportTickets.length,
            open: supportTickets.filter(t => t.status === 'open').length,
            pending: supportTickets.filter(t => t.status === 'pending').length,
            resolved: supportTickets.filter(t => t.status === 'resolved').length,
            closed: supportTickets.filter(t => t.status === 'closed').length,
          },
        },
        mall: {
          items: mallItems,
          coins: profile?.coins || 0,
        },
        trust: trustData,
        levels: levelData,
        profile,
      });
    }

    // ===== CREATE NOTIFICATION =====
    if (action === 'createNotification') {
      const { title, body, type, category, priority } = body;
      const created = await base44.asServiceRole.entities.Notification.create({
        user_id: user.id,
        title,
        body: body || '',
        type: type || 'system',
        category: category || '',
        priority: priority || 'medium',
        is_read: false,
        is_pinned: false,
        is_archived: false,
        status: 'active',
      });
      return Response.json({ success: true, notification: created });
    }

    // ===== MARK NOTIFICATION AS READ =====
    if (action === 'markAsRead') {
      const { notification_id } = body;
      if (!notification_id) return Response.json({ error: 'notification_id is required' }, { status: 400 });
      const updated = await base44.asServiceRole.entities.Notification.update(notification_id, { is_read: true });
      return Response.json({ success: true, notification: updated });
    }

    // ===== MARK ALL AS READ =====
    if (action === 'markAllAsRead') {
      await base44.asServiceRole.entities.Notification.updateMany(
        { user_id: user.id, is_read: false },
        { $set: { is_read: true } }
      );
      return Response.json({ success: true });
    }

    // ===== ARCHIVE NOTIFICATION =====
    if (action === 'archiveNotification') {
      const { notification_id } = body;
      if (!notification_id) return Response.json({ error: 'notification_id is required' }, { status: 400 });
      const updated = await base44.asServiceRole.entities.Notification.update(notification_id, { is_archived: true });
      return Response.json({ success: true, notification: updated });
    }

    // ===== CREATE SUPPORT TICKET =====
    if (action === 'createSupportTicket') {
      const { subject, description, category, priority } = body;
      if (!subject || !category) return Response.json({ error: 'subject and category are required' }, { status: 400 });

      const created = await base44.asServiceRole.entities.SupportTicket.create({
        user_id: user.id,
        username: profile?.username || user.full_name || user.email?.split('@')[0] || 'User',
        subject,
        description: description || '',
        category,
        status: 'open',
        priority: priority || 'medium',
        messages_count: 1,
        attachments: [],
      });
      return Response.json({ success: true, ticket: created });
    }

    // ===== UPDATE SUPPORT TICKET =====
    if (action === 'updateSupportTicket') {
      const { ticket_id, status, rating } = body;
      if (!ticket_id) return Response.json({ error: 'ticket_id is required' }, { status: 400 });

      const tickets = await base44.asServiceRole.entities.SupportTicket.filter({ id: ticket_id }).catch(() => []);
      if (tickets.length === 0) return Response.json({ error: 'Ticket not found' }, { status: 404 });
      if (tickets[0].user_id !== user.id) return Response.json({ error: 'Not authorized' }, { status: 403 });

      const updateData = {};
      if (status) updateData.status = status;
      if (rating !== undefined) updateData.rating = rating;
      if (status === 'resolved' || status === 'closed') {
        updateData.resolved_date = new Date().toISOString();
      }

      const updated = await base44.asServiceRole.entities.SupportTicket.update(ticket_id, updateData);
      return Response.json({ success: true, ticket: updated });
    }

    // ===== PURCHASE MALL ITEM =====
    if (action === 'purchaseMallItem') {
      const { item_id } = body;
      if (!item_id) return Response.json({ error: 'item_id is required' }, { status: 400 });

      const items = await base44.asServiceRole.entities.MallItem.filter({ id: item_id }).catch(() => []);
      if (items.length === 0) return Response.json({ error: 'Item not found' }, { status: 404 });
      const item = items[0];

      if (!profile) return Response.json({ error: 'Profile not found' }, { status: 404 });

      const userCoins = profile.coins || 0;
      if (userCoins < item.price_coins) {
        return Response.json({ error: 'Insufficient coins', required: item.price_coins, available: userCoins }, { status: 400 });
      }

      // Deduct coins from profile
      await base44.asServiceRole.entities.UserProfile.update(profile.id, {
        coins: userCoins - item.price_coins,
        activity_score: (profile.activity_score || 0) + 10,
      });

      // Create a notification about the purchase
      await base44.asServiceRole.entities.Notification.create({
        user_id: user.id,
        title: `Purchase Successful: ${item.name}`,
        body: `You purchased ${item.name} for ${item.price_coins} coins.`,
        type: 'wallet',
        category: 'Purchase',
        priority: 'medium',
        is_read: false,
        status: 'active',
      });

      return Response.json({ success: true, item: item.name, coinsRemaining: userCoins - item.price_coins });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

function getTrustLevel(score) {
  if (score >= 99) return 'Legend Trusted';
  if (score >= 96) return 'Royal Trusted';
  if (score >= 92) return 'Diamond Trusted';
  if (score >= 85) return 'Platinum Trusted';
  if (score >= 75) return 'Gold Trusted';
  if (score >= 60) return 'Silver Trusted';
  return 'Bronze Trusted';
}