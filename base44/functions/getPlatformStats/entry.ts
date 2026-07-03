import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    // Fetch all real entity counts in parallel
    const [
      users, hosts, agents, agencies, admins, superAdmins,
      liveSessions, transactions, partyRooms, communityPosts,
      supportTickets, pendingApplications, gifts, mallItems,
    ] = await Promise.all([
      base44.asServiceRole.entities.UserProfile.list('-created_date', 500),
      base44.asServiceRole.entities.UserProfile.filter({ is_host: true }, '-created_date', 500),
      base44.asServiceRole.entities.UserProfile.filter({ role: 'agent' }, '-created_date', 500),
      base44.asServiceRole.entities.UserProfile.filter({ is_agency: true }, '-created_date', 500),
      base44.asServiceRole.entities.UserProfile.filter({ role: 'admin' }, '-created_date', 500),
      base44.asServiceRole.entities.UserProfile.filter({ role: 'owner' }, '-created_date', 500),
      base44.asServiceRole.entities.RoomSession.filter({ status: 'live' }, '-created_date', 500),
      base44.asServiceRole.entities.Transaction.filter({ status: 'completed' }, '-created_date', 500),
      base44.asServiceRole.entities.PartyRoom.list('-created_date', 500),
      base44.asServiceRole.entities.CommunityPost.list('-created_date', 500),
      base44.asServiceRole.entities.SupportTicket.list('-created_date', 500),
      base44.asServiceRole.entities.SupportTicket.filter({ status: 'open' }, '-created_date', 500),
      base44.asServiceRole.entities.Gift.list('-created_date', 500),
      base44.asServiceRole.entities.MallItem.list('-created_date', 500),
    ]);

    const totalRevenue = transactions.reduce((sum, t) => sum + (t.amount_usd || 0), 0);
    const today = new Date().toDateString();
    const todayTransactions = transactions.filter((t) => {
      try { return new Date(t.created_date).toDateString() === today; } catch { return false; }
    });
    const todayRevenue = todayTransactions.reduce((sum, t) => sum + (t.amount_usd || 0), 0);
    const thisMonth = new Date().getMonth();
    const monthlyTransactions = transactions.filter((t) => {
      try { return new Date(t.created_date).getMonth() === thisMonth; } catch { return false; }
    });
    const monthlyRevenue = monthlyTransactions.reduce((sum, t) => sum + (t.amount_usd || 0), 0);
    const totalCoins = transactions.reduce((sum, t) => sum + (t.coins || 0), 0);
    const vipUsers = users.filter((u) => u.is_vip).length;
    const verifiedUsers = users.filter((u) => u.verification_status === 'verified').length;
    const onlineUsers = users.filter((u) => u.is_online).length;

    // Unique countries from user profiles
    const countrySet = new Set();
    users.forEach((u) => { if (u.country) countrySet.add(u.country); });

    const stats = {
      totalUsers: users.length,
      totalHosts: hosts.length,
      totalAgents: agents.length,
      totalAgencies: agencies.length,
      totalAdmins: admins.length,
      superAdmins: superAdmins.length,
      activeStreams: liveSessions.length,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      todayRevenue: Math.round(todayRevenue * 100) / 100,
      monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
      totalTransactions: transactions.length,
      totalCoins: totalCoins,
      vipUsers: vipUsers,
      verifiedUsers: verifiedUsers,
      onlineUsers: onlineUsers,
      totalCountries: countrySet.size,
      totalPartyRooms: partyRooms.length,
      totalCommunityPosts: communityPosts.length,
      totalSupportTickets: supportTickets.length,
      pendingTickets: pendingApplications.length,
      totalGifts: gifts.length,
      totalMallItems: mallItems.length,
      todayTransactions: todayTransactions.length,
    };

    return Response.json({ stats });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});