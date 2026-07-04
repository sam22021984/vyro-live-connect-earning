import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    // Fetch all real entity data in parallel
    const [
      users, hosts, agents, agencies, admins, superAdmins, owners,
      liveSessions, allSessions, transactions, partyRooms, communityPosts,
      supportTickets, roleApplications, gifts, mallItems,
      securityEvents, fraudDetections, violations, enforcementActions,
      auditLogs, contentModerationLogs, deviceRecords, securityAlerts,
      incidents, spamDetections, verificationRecords,
    ] = await Promise.all([
      base44.asServiceRole.entities.UserProfile.list('-created_date', 500),
      base44.asServiceRole.entities.UserProfile.filter({ is_host: true }, '-created_date', 500),
      base44.asServiceRole.entities.UserProfile.filter({ role: 'agent' }, '-created_date', 500),
      base44.asServiceRole.entities.UserProfile.filter({ is_agency: true }, '-created_date', 500),
      base44.asServiceRole.entities.UserProfile.filter({ role: 'admin' }, '-created_date', 500),
      base44.asServiceRole.entities.UserProfile.filter({ role: 'super_admin' }, '-created_date', 500),
      base44.asServiceRole.entities.UserProfile.filter({ role: 'owner' }, '-created_date', 500),
      base44.asServiceRole.entities.RoomSession.filter({ status: 'live' }, '-created_date', 500),
      base44.asServiceRole.entities.RoomSession.list('-created_date', 500),
      base44.asServiceRole.entities.Transaction.list('-created_date', 500),
      base44.asServiceRole.entities.PartyRoom.list('-created_date', 500),
      base44.asServiceRole.entities.CommunityPost.list('-created_date', 500),
      base44.asServiceRole.entities.SupportTicket.list('-created_date', 500),
      base44.asServiceRole.entities.RoleApplication.list('-created_date', 500),
      base44.asServiceRole.entities.Gift.list('-created_date', 500),
      base44.asServiceRole.entities.MallItem.list('-created_date', 500),
      base44.asServiceRole.entities.SecurityEvent.list('-created_date', 200),
      base44.asServiceRole.entities.FraudDetection.list('-created_date', 200),
      base44.asServiceRole.entities.ViolationRecord.list('-created_date', 200),
      base44.asServiceRole.entities.EnforcementAction.list('-created_date', 200),
      base44.asServiceRole.entities.AuditLog.list('-created_date', 200),
      base44.asServiceRole.entities.ContentModerationLog.list('-created_date', 200),
      base44.asServiceRole.entities.DeviceRecord.list('-created_date', 200),
      base44.asServiceRole.entities.SecurityAlert.list('-created_date', 100),
      base44.asServiceRole.entities.IncidentRecord.list('-created_date', 100),
      base44.asServiceRole.entities.SpamDetection.list('-created_date', 200),
      base44.asServiceRole.entities.VerificationRecord.list('-created_date', 200),
    ]);

    // --- Revenue calculations ---
    const totalRevenue = transactions.reduce((sum, t) => sum + (t.amount_usd || 0), 0);
    const today = new Date().toDateString();
    const todayTransactions = transactions.filter((t) => {
      try { return new Date(t.created_date).toDateString() === today; } catch { return false; }
    });
    const todayRevenue = todayTransactions.reduce((sum, t) => sum + (t.amount_usd || 0), 0);
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const monthlyTransactions = transactions.filter((t) => {
      try {
        const d = new Date(t.created_date);
        return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
      } catch { return false; }
    });
    const monthlyRevenue = monthlyTransactions.reduce((sum, t) => sum + (t.amount_usd || 0), 0);
    const weeklyStart = new Date(now);
    weeklyStart.setDate(weeklyStart.getDate() - 7);
    const weeklyTransactions = transactions.filter((t) => {
      try { return new Date(t.created_date) >= weeklyStart; } catch { return false; }
    });
    const weeklyRevenue = weeklyTransactions.reduce((sum, t) => sum + (t.amount_usd || 0), 0);

    // --- Transaction breakdown by type ---
    const giftTransactions = transactions.filter((t) => t.type === 'gift' && t.status === 'completed');
    const rechargeTransactions = transactions.filter((t) => t.type === 'recharge' && t.status === 'completed');
    const withdrawTransactions = transactions.filter((t) => t.type === 'withdraw' && t.status === 'completed');
    const rewardTransactions = transactions.filter((t) => t.type === 'reward' && t.status === 'completed');
    const purchaseTransactions = transactions.filter((t) => t.type === 'purchase' && t.status === 'completed');
    const pendingWithdrawals = transactions.filter((t) => t.type === 'withdraw' && t.status === 'pending');
    const pendingDeposits = transactions.filter((t) => t.type === 'recharge' && t.status === 'pending');

    const giftRevenue = giftTransactions.reduce((sum, t) => sum + (t.amount_usd || 0), 0);
    const coinRevenue = rechargeTransactions.reduce((sum, t) => sum + (t.amount_usd || 0), 0);
    const vipRevenue = purchaseTransactions.reduce((sum, t) => sum + (t.amount_usd || 0), 0);

    const totalCoins = transactions.reduce((sum, t) => sum + (t.coins || 0), 0);
    const coinsPurchased = rechargeTransactions.reduce((sum, t) => sum + (t.coins || 0), 0);
    const coinsSpent = (giftTransactions.concat(purchaseTransactions)).reduce((sum, t) => sum + (t.coins || 0), 0);
    const coinsGifted = giftTransactions.reduce((sum, t) => sum + (t.coins || 0), 0);
    const coinsRemaining = users.reduce((sum, u) => sum + (u.coins || 0), 0);

    // --- User stats ---
    const vipUsers = users.filter((u) => u.is_vip);
    const verifiedUsers = users.filter((u) => u.verification_status === 'verified' || u.is_verified);
    const onlineUsers = users.filter((u) => u.is_online);
    const todayUsers = users.filter((u) => {
      try { return new Date(u.created_date).toDateString() === today; } catch { return false; }
    });

    // --- Country data ---
    const countryMap = {};
    users.forEach((u) => {
      if (u.country) {
        if (!countryMap[u.country]) {
          countryMap[u.country] = { name: u.country, users: 0, hosts: 0, revenue: 0, flag: u.country_flag || '🌍' };
        }
        countryMap[u.country].users++;
        if (u.is_host) countryMap[u.country].hosts++;
      }
    });
    const countries = Object.values(countryMap).sort((a, b) => b.users - a.users);

    // --- Role application stats ---
    const appByType = {};
    roleApplications.forEach((a) => {
      const type = a.application_type || 'other';
      if (!appByType[type]) appByType[type] = { type, pending: 0, approved: 0, rejected: 0, total: 0 };
      appByType[type].total++;
      if (a.status === 'pending' || a.status === 'verification') appByType[type].pending++;
      else if (a.status === 'approved') appByType[type].approved++;
      else if (a.status === 'rejected') appByType[type].rejected++;
    });
    const applications = Object.values(appByType);

    // --- Live stream / room stats ---
    const totalViewers = liveSessions.reduce((sum, r) => sum + (r.current_viewers || 0), 0);
    const peakViewers = Math.max(...allSessions.map((r) => r.peak_viewers || 0), 0);
    const totalGiftsFromRooms = liveSessions.reduce((sum, r) => sum + (r.total_gifts || 0), 0);
    const totalCoinsFromRooms = liveSessions.reduce((sum, r) => sum + (r.total_coins || 0), 0);
    const totalMessages = liveSessions.reduce((sum, r) => sum + (r.total_messages || 0), 0);

    // --- Support stats ---
    const openTickets = supportTickets.filter((t) => t.status === 'open' || t.status === 'pending');
    const resolvedTickets = supportTickets.filter((t) => t.status === 'resolved' || t.status === 'closed');

    // --- Security stats ---
    const activeSecurityEvents = securityEvents.filter((e) => e.status === 'active' || e.status === 'investigating');
    const criticalAlerts = securityAlerts.filter((a) => a.status === 'active' && (a.severity === 'high' || a.severity === 'critical'));
    const openIncidents = incidents.filter((i) => i.status === 'open' || i.status === 'investigating' || i.status === 'escalated');
    const activeEnforcements = enforcementActions.filter((e) => e.status === 'active');
    const activeViolations = violations.filter((v) => v.status === 'active');
    const spamDetected = spamDetections.filter((s) => s.status === 'detected' || s.status === 'investigating');
    const fraudDetected = fraudDetections.filter((f) => f.status === 'detected' || f.status === 'investigating' || f.status === 'confirmed');
    const pendingVerifications = verificationRecords.filter((v) => v.status === 'pending' || v.status === 'in_progress');

    // --- PK battles (from room sessions with pk category or security flags) ---
    const pkBattles = allSessions.filter((r) => r.category === 'pk' || (r.security_flags && r.security_flags.includes('pk')));

    // --- Revenue breakdown ---
    const revenueBreakdown = [
      { source: 'Gift Revenue', amount: giftRevenue, percent: totalRevenue > 0 ? (giftRevenue / totalRevenue * 100) : 0, color: '#EB5757', icon: 'Gift' },
      { source: 'VIP Revenue', amount: vipRevenue, percent: totalRevenue > 0 ? (vipRevenue / totalRevenue * 100) : 0, color: '#D4AF37', icon: 'Crown' },
      { source: 'Coin Recharge', amount: coinRevenue, percent: totalRevenue > 0 ? (coinRevenue / totalRevenue * 100) : 0, color: '#F59E0B', icon: 'Coins' },
      { source: 'Event Revenue', amount: 0, percent: 0, color: '#A78BFA', icon: 'PartyPopper' },
      { source: 'Other', amount: totalRevenue - giftRevenue - vipRevenue - coinRevenue, percent: totalRevenue > 0 ? ((totalRevenue - giftRevenue - vipRevenue - coinRevenue) / totalRevenue * 100) : 0, color: '#6B7280', icon: 'DollarSign' },
    ].filter((r) => r.amount > 0 || r.source === 'Other');

    // --- Rankings: top gifters, top hosts by gifts received, top agencies ---
    const gifterMap = {};
    giftTransactions.forEach((t) => {
      const uid = t.user_id;
      if (uid) {
        if (!gifterMap[uid]) gifterMap[uid] = { user_id: uid, amount: 0, coins: 0 };
        gifterMap[uid].amount += (t.amount_usd || 0);
        gifterMap[uid].coins += (t.coins || 0);
      }
    });
    const topGifters = Object.values(gifterMap).sort((a, b) => b.coins - a.coins).slice(0, 5);

    const receiverMap = {};
    giftTransactions.forEach((t) => {
      const uid = t.recipient_id;
      if (uid) {
        if (!receiverMap[uid]) receiverMap[uid] = { user_id: uid, amount: 0, coins: 0 };
        receiverMap[uid].amount += (t.amount_usd || 0);
        receiverMap[uid].coins += (t.coins || 0);
      }
    });
    const topReceivers = Object.values(receiverMap).sort((a, b) => b.coins - a.coins).slice(0, 5);

    // Top hosts by gifts_received
    const topHosts = [...hosts].sort((a, b) => (b.gifts_received || 0) - (a.gifts_received || 0)).slice(0, 5);

    // --- Live activity stream (from recent transactions, applications, sessions) ---
    const liveActivity = [];
    const recentTx = transactions.slice(0, 5);
    recentTx.forEach((t) => {
      const type = t.type || 'transaction';
      const text = type === 'recharge' ? `User recharged $${t.amount_usd || 0}` :
                   type === 'withdraw' ? `Withdrawal request: $${t.amount_usd || 0}` :
                   type === 'gift' ? `Gift sent — ${t.gift_name || 'gift'} (${t.coins || 0} coins)` :
                   type === 'purchase' ? `Purchase — $${t.amount_usd || 0}` :
                   `Transaction: $${t.amount_usd || 0}`;
      liveActivity.push({
        text,
        time: formatTimeAgo(t.created_date),
        status: t.status === 'completed' ? 'success' : t.status === 'pending' ? 'info' : 'warning',
      });
    });
    const recentApps = roleApplications.slice(0, 3);
    recentApps.forEach((a) => {
      liveActivity.push({
        text: `New ${a.application_type || 'role'} application — ${a.application_type_name || 'pending'}`,
        time: formatTimeAgo(a.created_date),
        status: 'info',
      });
    });
    const recentSessions = liveSessions.slice(0, 3);
    recentSessions.forEach((s) => {
      liveActivity.push({
        text: `Host went live — ${s.host_name || 'Unknown'} (${s.current_viewers || 0} viewers)`,
        time: formatTimeAgo(s.started_at || s.created_date),
        status: 'success',
      });
    });
    const recentAlerts = securityAlerts.slice(0, 2);
    recentAlerts.forEach((a) => {
      liveActivity.push({
        text: `${a.title || 'Security alert'} — ${a.severity || 'low'}`,
        time: formatTimeAgo(a.created_date),
        status: a.severity === 'critical' || a.severity === 'high' ? 'error' : 'warning',
      });
    });

    // --- Audit logs ---
    const auditLogsFormatted = auditLogs.slice(0, 10).map((l) => ({
      actor: l.actor_id || 'System',
      role: l.actor_role || 'system',
      action: (l.action || 'action').replace(/_/g, ' '),
      target: l.target_user_id || l.resource_id || '—',
      device: l.user_agent || '—',
      ip: l.ip_address || '—',
      time: formatTimeAgo(l.created_date),
      color: l.is_sensitive ? '#EB5757' : '#2F80ED',
    }));

    // --- Countries formatted for Owner dashboard ---
    const countriesFormatted = countries.slice(0, 10).map((c) => ({
      name: c.name,
      code: c.name.slice(0, 2).toUpperCase(),
      manager: '—',
      users: formatStat(c.users),
      hosts: formatStat(c.hosts),
      revenue: '$' + formatStat(0),
      growth: 'live',
    }));

    // --- Roles formatted ---
    const rolesFormatted = [
      { name: 'Platform Users', count: formatStat(users.length), color: '#2F80ED' },
      { name: 'Host', count: formatStat(hosts.length), color: '#EB5757' },
      { name: 'Talent Agent', count: formatStat(agents.length), color: '#A78BFA' },
      { name: 'Agency Partner', count: formatStat(agencies.length), color: '#8B5CF6' },
      { name: 'Admin', count: formatStat(admins.length), color: '#F2994A' },
      { name: 'Super Admin', count: formatStat(superAdmins.length), color: '#D4AF37' },
      { name: 'Owner', count: formatStat(owners.length), color: '#D4AF37' },
    ];

    // --- Applications formatted ---
    const appTypes = ['host', 'agency', 'agent', 'admin', 'super_admin', 'business_manager', 'business_developer', 'country_manager', 'reward_manager', 'pk_manager', 'event_manager', 'vip_manager', 'finance_manager', 'support_manager', 'coins_seller'];
    const applicationsFormatted = appTypes.map((type) => {
      const found = appByType[type];
      const colors = {
        host: '#EB5757', agency: '#8B5CF6', agent: '#A78BFA', admin: '#F2994A',
        super_admin: '#D4AF37', coins_seller: '#27AE60',
      };
      return {
        type: type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + ' Applications',
        pending: found?.pending || 0,
        approved: found?.approved || 0,
        rejected: found?.rejected || 0,
        color: colors[type] || '#6B7280',
      };
    }).filter((a) => a.pending > 0 || a.approved > 0 || a.rejected > 0);

    // --- Recent applications list ---
    const applicationList = roleApplications.slice(0, 10).map((a) => ({
      id: a.id,
      applicant: a.application_type_name || a.user_id || 'Unknown',
      type: (a.application_type || 'application').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + ' Application',
      status: a.status ? a.status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Pending',
      date: a.submitted_date || (a.created_date ? a.created_date.split('T')[0] : ''),
      color: a.status === 'approved' ? '#27AE60' : a.status === 'rejected' ? '#EB5757' : a.status === 'pending' ? '#F2994A' : '#2F80ED',
    }));

    // --- Live streams formatted ---
    const liveStreamsFormatted = liveSessions.slice(0, 10).map((s) => ({
      id: s.id,
      host: s.host_name || 'Unknown',
      viewers: formatStat(s.current_viewers || 0),
      revenue: '$' + formatStat(s.gross_revenue_coins || 0),
      gifts: formatStat(s.total_gifts || 0),
      country: s.country || '—',
    }));

    // --- Security data formatted ---
    const securityDataFormatted = [
      { label: 'Security Events', value: formatStat(securityEvents.length), icon: 'ShieldCheck', color: '#2F80ED' },
      { label: 'Active Alerts', value: formatStat(criticalAlerts.length), icon: 'AlertTriangle', color: '#EB5757' },
      { label: 'Fraud Detected', value: formatStat(fraudDetected.length), icon: 'Bot', color: '#F2994A' },
      { label: 'Active Violations', value: formatStat(activeViolations.length), icon: 'AlertTriangle', color: '#EB5757' },
      { label: 'Spam Detected', value: formatStat(spamDetected.length), icon: 'MessageSquare', color: '#F2994A' },
      { label: 'Open Incidents', value: formatStat(openIncidents.length), icon: 'ShieldOff', color: '#EB5757' },
      { label: 'Pending Verifications', value: formatStat(pendingVerifications.length), icon: 'BadgeCheck', color: '#10B981' },
      { label: 'Active Enforcements', value: formatStat(activeEnforcements.length), icon: 'Lock', color: '#EB5757' },
    ];

    // --- Finance data formatted ---
    const financeDataFormatted = [
      { label: 'Pending Withdrawals', value: formatStat(pendingWithdrawals.length), amount: '$' + formatStat(pendingWithdrawals.reduce((s, t) => s + (t.amount_usd || 0), 0)), color: '#F2994A' },
      { label: 'Pending Deposits', value: formatStat(pendingDeposits.length), amount: '$' + formatStat(pendingDeposits.reduce((s, t) => s + (t.amount_usd || 0), 0)), color: '#27AE60' },
      { label: 'Total Wallet Balances', value: formatStat(users.length), amount: '$' + formatStat(coinsRemaining), color: '#2F80ED' },
      { label: "Today's Transactions", value: formatStat(todayTransactions.length), amount: '$' + formatStat(todayRevenue), color: '#A78BFA' },
    ];

    // --- Gift stats ---
    const totalGiftsSent = giftTransactions.length;
    const giftStatsFormatted = [
      { label: 'Total Gifts Sent', value: formatStat(totalGiftsSent), icon: 'Gift', color: '#EB5757' },
      { label: 'Total Gift Revenue', value: '$' + formatStat(giftRevenue), icon: 'DollarSign', color: '#27AE60' },
      { label: 'Active Gift Types', value: formatStat(gifts.filter((g) => g.is_active !== false).length), icon: 'Sparkles', color: '#A78BFA' },
      { label: 'Top Gifter', value: topGifters[0] ? topGifters[0].user_id.slice(0, 8) : '—', icon: 'Star', color: '#D4AF37' },
    ];

    // --- Coin stats ---
    const coinStatsFormatted = [
      { label: 'Total Coins Purchased', value: formatStat(coinsPurchased), icon: 'Coins', color: '#F59E0B' },
      { label: 'Total Coins Spent', value: formatStat(coinsSpent), icon: 'ArrowUpFromLine', color: '#EB5757' },
      { label: 'Total Coins Gifted', value: formatStat(coinsGifted), icon: 'Gift', color: '#A78BFA' },
      { label: 'Total Coins in Wallets', value: formatStat(coinsRemaining), icon: 'Wallet', color: '#27AE60' },
    ];

    // --- Violations/reports formatted ---
    const violationsFormatted = violations.slice(0, 10).map((v) => ({
      id: v.id,
      target: v.user_id || 'Unknown',
      type: (v.violation_type || 'violation').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      severity: (v.severity || 'low').replace(/\b\w/g, c => c.toUpperCase()),
      status: (v.status || 'active').replace(/\b\w/g, c => c.toUpperCase()),
      date: v.created_date ? v.created_date.split('T')[0] : '',
      color: v.severity === 'critical' || v.severity === 'high' ? '#EB5757' : v.severity === 'medium' ? '#F2994A' : '#6B7280',
    }));

    // --- Security logs formatted ---
    const securityLogsFormatted = securityEvents.slice(0, 10).map((s) => ({
      id: s.id,
      action: (s.event_type || 'event').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      target: s.user_id || 'Unknown',
      ip: s.ip_address || '—',
      severity: (s.severity || 'low').replace(/\b\w/g, c => c.toUpperCase()),
      date: s.created_date ? s.created_date.split('T')[0] : '',
      color: s.severity === 'critical' || s.severity === 'high' ? '#EB5757' : s.severity === 'medium' ? '#F2994A' : '#27AE60',
    }));

    // --- Support cases formatted ---
    const supportCasesFormatted = supportTickets.slice(0, 10).map((t) => ({
      id: t.id,
      category: t.category || 'Support',
      subject: t.title || t.body?.slice(0, 40) || 'No subject',
      priority: (t.priority || 'medium').replace(/\b\w/g, c => c.toUpperCase()),
      status: (t.status || 'open').replace(/\b\w/g, c => c.toUpperCase()),
      color: t.priority === 'critical' || t.priority === 'high' ? '#EB5757' : t.priority === 'medium' ? '#F2994A' : '#27AE60',
    }));

    // --- PK battles formatted ---
    const pkBattlesFormatted = pkBattles.slice(0, 10).map((p) => ({
      id: p.id,
      hostA: p.host_name || 'Host A',
      hostB: '—',
      viewers: formatStat(p.current_viewers || 0),
      revenue: '$' + formatStat(p.gross_revenue_coins || 0),
      status: p.status === 'live' ? 'Active' : (p.status || 'Ended').replace(/\b\w/g, c => c.toUpperCase()),
      color: p.status === 'live' ? '#27AE60' : '#6B7280',
    }));

    // --- Users list formatted (for admin dashboards) ---
    const usersListFormatted = users.slice(0, 20).map((u) => ({
      id: u.global_id || u.id,
      name: u.full_name || u.username || 'Unknown',
      joined: u.created_date ? u.created_date.split('T')[0] : '',
      device: u.device_info || '—',
      vip: u.is_vip ? (u.vip_tier || 'VIP') : 'None',
      status: u.is_online ? 'Active' : 'Offline',
      color: u.is_online ? '#27AE60' : '#6B7280',
      avatar: u.avatar_url || '',
      country: u.country || '—',
      country_flag: u.country_flag || '🌍',
    }));

    // --- Hosts list formatted ---
    const hostsListFormatted = hosts.slice(0, 20).map((h) => ({
      id: h.global_id || h.id,
      name: h.username || h.full_name || 'Unknown',
      level: `LV.${h.host_level || 1}`,
      followers: formatStat(h.followers || 0),
      revenue: '$' + formatStat(h.gifts_received || 0),
      agency: h.agency_id || 'Independent',
      status: h.is_online ? 'Live' : 'Offline',
      color: h.is_online ? '#27AE60' : '#6B7280',
      avatar: h.avatar_url || '',
    }));

    // --- Agents list formatted ---
    const agentsListFormatted = agents.slice(0, 20).map((a) => ({
      id: a.global_id || a.id,
      name: a.username || a.full_name || 'Unknown',
      hosts: 0,
      revenue: '$0',
      agency: a.agency_id || 'Independent',
      status: a.is_online ? 'Active' : 'Offline',
      color: a.is_online ? '#27AE60' : '#6B7280',
      avatar: a.avatar_url || '',
    }));

    // --- Agencies list formatted ---
    const agenciesListFormatted = agencies.slice(0, 20).map((a) => ({
      id: a.global_id || a.id,
      name: a.username || a.full_name || 'Unknown',
      owner: a.full_name || '—',
      hosts: 0,
      revenue: '$0',
      status: a.is_online ? 'Active' : 'Inactive',
      color: a.is_online ? '#27AE60' : '#6B7280',
      avatar: a.avatar_url || '',
      country: a.country || '—',
    }));

    // --- Admins list formatted ---
    const adminsListFormatted = admins.slice(0, 20).map((a) => ({
      id: a.global_id || a.id,
      name: a.username || a.full_name || 'Unknown',
      department: 'Operations',
      tasks: 0,
      score: '—',
      lastActive: a.is_online ? 'Now' : 'Offline',
      status: a.is_online ? 'Active' : 'Inactive',
      color: a.is_online ? '#2F80ED' : '#6B7280',
      avatar: a.avatar_url || '',
    }));

    const stats = {
      // Platform totals
      totalUsers: users.length,
      totalHosts: hosts.length,
      totalAgents: agents.length,
      totalAgencies: agencies.length,
      totalAdmins: admins.length,
      superAdmins: superAdmins.length,
      owners: owners.length,
      activeStreams: liveSessions.length,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      todayRevenue: Math.round(todayRevenue * 100) / 100,
      weeklyRevenue: Math.round(weeklyRevenue * 100) / 100,
      monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
      totalTransactions: transactions.length,
      todayTransactions: todayTransactions.length,
      totalCoins: totalCoins,
      coinsPurchased,
      coinsSpent,
      coinsGifted,
      coinsRemaining,
      vipUsers: vipUsers.length,
      verifiedUsers: verifiedUsers.length,
      onlineUsers: onlineUsers.length,
      newUsersToday: todayUsers.length,
      totalCountries: countries.length,
      totalPartyRooms: partyRooms.length,
      totalCommunityPosts: communityPosts.length,
      totalSupportTickets: supportTickets.length,
      pendingTickets: openTickets.length,
      resolvedTickets: resolvedTickets.length,
      totalGifts: gifts.length,
      totalMallItems: mallItems.length,
      totalRoomSessions: allSessions.length,
      peakViewers,
      totalViewers,
      totalGiftsFromRooms,
      totalCoinsFromRooms,
      totalMessages,

      // Security
      totalSecurityEvents: securityEvents.length,
      activeSecurityEvents: activeSecurityEvents.length,
      totalFraudDetections: fraudDetections.length,
      activeFraud: fraudDetected.length,
      totalViolations: violations.length,
      activeViolations: activeViolations.length,
      totalEnforcements: enforcementActions.length,
      activeEnforcements: activeEnforcements.length,
      totalIncidents: incidents.length,
      openIncidents: openIncidents.length,
      totalSpamDetections: spamDetections.length,
      activeSpam: spamDetected.length,
      totalSecurityAlerts: securityAlerts.length,
      criticalAlerts: criticalAlerts.length,
      pendingVerifications: pendingVerifications.length,
      totalContentModerationLogs: contentModerationLogs.length,
      totalDeviceRecords: deviceRecords.length,

      // Applications
      totalApplications: roleApplications.length,
      pendingApplications: roleApplications.filter((a) => a.status === 'pending' || a.status === 'verification').length,
      approvedApplications: roleApplications.filter((a) => a.status === 'approved').length,
      rejectedApplications: roleApplications.filter((a) => a.status === 'rejected').length,

      // PK
      totalPkBattles: pkBattles.length,

      // Revenue breakdown
      giftRevenue,
      coinRevenue,
      vipRevenue,
      revenueBreakdown,

      // Rankings
      topGifters,
      topReceivers,
      topHosts,

      // Formatted lists for dashboards
      countries: countriesFormatted,
      roles: rolesFormatted,
      applications: applicationsFormatted,
      applicationList,
      liveStreams: liveStreamsFormatted,
      securityData: securityDataFormatted,
      financeData: financeDataFormatted,
      giftStats: giftStatsFormatted,
      coinStats: coinStatsFormatted,
      violations: violationsFormatted,
      securityLogs: securityLogsFormatted,
      supportCases: supportCasesFormatted,
      pkBattles: pkBattlesFormatted,
      usersList: usersListFormatted,
      hostsList: hostsListFormatted,
      agentsList: agentsListFormatted,
      agenciesList: agenciesListFormatted,
      adminsList: adminsListFormatted,
      auditLogs: auditLogsFormatted,
      liveActivity: liveActivity.slice(0, 15),
    };

    return Response.json({ stats });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

function formatStat(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return String(Math.round(n));
}

function formatTimeAgo(dateStr) {
  if (!dateStr) return '—';
  try {
    const now = Date.now();
    const then = new Date(dateStr).getTime();
    const diff = Math.floor((now - then) / 1000);
    if (diff < 10) return 'now';
    if (diff < 60) return diff + 's';
    if (diff < 3600) return Math.floor(diff / 60) + 'm';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h';
    return Math.floor(diff / 86400) + 'd';
  } catch {
    return '—';
  }
}