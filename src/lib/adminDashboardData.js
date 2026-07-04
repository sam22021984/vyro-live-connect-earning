/**
 * Maps live platform stats from useAdminDashboard() into the format
 * each admin dashboard expects (matching the old static data file shapes).
 * This lets dashboards swap from hardcoded mock data to live data with
 * minimal UI changes.
 */
export function mapCountryManagerData(s) {
  if (!s) return null;
  const fmt = (n) => n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? (n / 1e3).toFixed(1) + "K" : String(n);

  return {
    KPIS: [
      { label: "Total Users", value: fmt(s.totalUsers), change: "live", trend: "up", icon: "Users", color: "#3B82F6" },
      { label: "Total Hosts", value: fmt(s.totalHosts), change: "live", trend: "up", icon: "Mic", color: "#EF4444" },
      { label: "Total Talent Agents", value: fmt(s.totalAgents), change: "live", trend: "up", icon: "User", color: "#8B5CF6" },
      { label: "Total Agencies", value: fmt(s.totalAgencies), change: "live", trend: "up", icon: "Building2", color: "#8B5CF6" },
      { label: "Active Live Streams", value: fmt(s.activeStreams), change: "live", trend: "up", icon: "Radio", color: "#EF4444" },
      { label: "Party Rooms", value: fmt(s.totalPartyRooms), change: "live", trend: "up", icon: "AudioLines", color: "#3B82F6" },
      { label: "Total Revenue", value: "$" + fmt(s.totalRevenue), change: "live", trend: "up", icon: "DollarSign", color: "#27AE60" },
      { label: "Today's Revenue", value: "$" + fmt(s.todayRevenue), change: "live", trend: "up", icon: "Calendar", color: "#27AE60" },
      { label: "Monthly Revenue", value: "$" + fmt(s.monthlyRevenue), change: "live", trend: "up", icon: "CalendarRange", color: "#27AE60" },
      { label: "New Users Today", value: fmt(s.newUsersToday), change: "live", trend: "up", icon: "UserPlus", color: "#10B981" },
      { label: "Active VIP Users", value: fmt(s.vipUsers), change: "live", trend: "up", icon: "Crown", color: "#F59E0B" },
      { label: "Countries", value: fmt(s.totalCountries), change: "live", trend: "up", icon: "Globe", color: "#10B981" },
    ],
    REALTIME_COUNTERS: [
      { label: "Active Streams", value: fmt(s.activeStreams), icon: "Radio", color: "#EF4444" },
      { label: "Online Users", value: fmt(s.onlineUsers), icon: "Users", color: "#3B82F6" },
      { label: "Revenue Today", value: "$" + fmt(s.todayRevenue), icon: "DollarSign", color: "#27AE60" },
      { label: "Party Rooms", value: fmt(s.totalPartyRooms), icon: "PartyPopper", color: "#EC4899" },
      { label: "Gifts", value: fmt(s.totalGifts), icon: "Gift", color: "#EC4899" },
      { label: "New Users", value: fmt(s.newUsersToday), icon: "UserPlus", color: "#10B981" },
    ],
    LIVE_STREAM: s.liveActivity || [],
    USERS: s.usersList || [],
    HOSTS: s.hostsList || [],
    AGENTS: s.agentsList || [],
    AGENCIES: s.agenciesList || [],
    APPLICATIONS: s.applicationList || [],
    REVENUE_PERIODS: [
      { label: "Daily", value: "$" + fmt(s.todayRevenue), change: "live", color: "#27AE60" },
      { label: "Weekly", value: "$" + fmt(s.weeklyRevenue), change: "live", color: "#27AE60" },
      { label: "Monthly", value: "$" + fmt(s.monthlyRevenue), change: "live", color: "#27AE60" },
      { label: "Yearly", value: "$" + fmt(s.totalRevenue), change: "live", color: "#27AE60" },
    ],
    REVENUE_SOURCES: (s.revenueBreakdown || []).map((r) => ({
      source: r.source, amount: "$" + fmt(r.amount), percent: r.percent.toFixed(1) + "%", color: r.color, icon: r.icon,
    })),
    GIFT_STATS: s.giftStats || [],
    COIN_STATS: [
      { metric: "Coins Purchased", value: fmt(s.coinsPurchased), revenue: "$" + fmt(s.coinRevenue), color: "#F59E0B", icon: "Coins" },
      { metric: "Coins Spent", value: fmt(s.coinsSpent), revenue: "$" + fmt(s.totalRevenue), color: "#EF4444", icon: "ArrowUpFromLine" },
      { metric: "Coins Gifted", value: fmt(s.coinsGifted), revenue: "$" + fmt(s.giftRevenue), color: "#EC4899", icon: "Gift" },
    ],
    LIVE_STREAMS: s.liveStreams || [],
    PK_BATTLES: s.pkBattles || [],
    REPORTS: s.violations || [],
    SECURITY_LOGS: s.securityLogs || [],
    ANALYTICS: [
      { metric: "Total Users", value: fmt(s.totalUsers), change: "live", color: "#10B981", icon: "Users" },
      { metric: "Total Hosts", value: fmt(s.totalHosts), change: "live", color: "#27AE60", icon: "Mic" },
      { metric: "Total Revenue", value: "$" + fmt(s.totalRevenue), change: "live", color: "#27AE60", icon: "DollarSign" },
      { metric: "Agencies", value: fmt(s.totalAgencies), change: "live", color: "#10B981", icon: "Building2" },
      { metric: "Online Users", value: fmt(s.onlineUsers), change: "live", color: "#EC4899", icon: "Heart" },
      { metric: "VIP Users", value: fmt(s.vipUsers), change: "live", color: "#3B82F6", icon: "Crown" },
    ],
    VIP_STATS: [
      { metric: "VIP Users", value: fmt(s.vipUsers), detail: "Active VIP members", color: "#F59E0B", icon: "Crown" },
      { metric: "VIP Revenue", value: "$" + fmt(s.vipRevenue), detail: "Total VIP revenue", color: "#27AE60", icon: "DollarSign" },
      { metric: "Verified Users", value: fmt(s.verifiedUsers), detail: "Verified accounts", color: "#3B82F6", icon: "Gem" },
      { metric: "Total Gifts", value: fmt(s.totalGifts), detail: "Gift types available", color: "#8B5CF6", icon: "Award" },
    ],
  };
}

export function mapSuperAdminData(s) {
  if (!s) return null;
  const fmt = (n) => n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? (n / 1e3).toFixed(1) + "K" : String(n);

  return {
    KPIS: [
      { label: "Total Agencies", value: fmt(s.totalAgencies), change: "live", trend: "up", icon: "Building2", color: "#8B5CF6" },
      { label: "Total Talent Agents", value: fmt(s.totalAgents), change: "live", trend: "up", icon: "Handshake", color: "#A78BFA" },
      { label: "Total Hosts", value: fmt(s.totalHosts), change: "live", trend: "up", icon: "Mic", color: "#EB5757" },
      { label: "Online Hosts", value: fmt(s.onlineUsers), change: "live", trend: "up", icon: "Radio", color: "#EB5757" },
      { label: "Total Admins", value: fmt(s.totalAdmins), change: "live", trend: "up", icon: "UserCog", color: "#2F80ED" },
      { label: "Pending Applications", value: fmt(s.pendingApplications), change: "live", trend: "up", icon: "FileText", color: "#F2994A" },
      { label: "Active Live Streams", value: fmt(s.activeStreams), change: "live", trend: "up", icon: "Radio", color: "#EB5757" },
      { label: "Daily Revenue", value: "$" + fmt(s.todayRevenue), change: "live", trend: "up", icon: "DollarSign", color: "#27AE60" },
      { label: "Monthly Revenue", value: "$" + fmt(s.monthlyRevenue), change: "live", trend: "up", icon: "Calendar", color: "#27AE60" },
      { label: "Active PK Battles", value: fmt(s.totalPkBattles), change: "live", trend: "up", icon: "Swords", color: "#F2994A" },
      { label: "Support Tickets", value: fmt(s.pendingTickets), change: "live", trend: "up", icon: "LifeBuoy", color: "#F2994A" },
      { label: "Security Events", value: fmt(s.activeSecurityEvents), change: "live", trend: "up", icon: "ShieldCheck", color: "#2F80ED" },
    ],
    REALTIME_COUNTERS: [
      { label: "Online Users", value: fmt(s.onlineUsers), icon: "Users", color: "#3B82F6" },
      { label: "Live Hosts", value: fmt(s.activeStreams), icon: "Mic", color: "#EB5757" },
      { label: "Pending Apps", value: fmt(s.pendingApplications), icon: "FileText", color: "#F2994A" },
      { label: "Open Tickets", value: fmt(s.pendingTickets), icon: "AlertTriangle", color: "#EB5757" },
      { label: "Active Alerts", value: fmt(s.criticalAlerts), icon: "ShieldOff", color: "#EB5757" },
      { label: "Violations", value: fmt(s.activeViolations), icon: "AlertTriangle", color: "#F2994A" },
    ],
    LIVE_STREAM: s.liveActivity || [],
    AGENCIES: s.agenciesList || [],
    AGENTS: s.agentsList || [],
    HOSTS: s.hostsList || [],
    ADMINS: s.adminsList || [],
    APPLICATIONS: (s.applications || []).map((a) => ({ ...a, icon: "FileText" })),
    APPLICATION_LIST: s.applicationList || [],
    REVENUE_PERIODS: [
      { label: "Daily", value: "$" + fmt(s.todayRevenue) },
      { label: "Weekly", value: "$" + fmt(s.weeklyRevenue) },
      { label: "Monthly", value: "$" + fmt(s.monthlyRevenue) },
      { label: "Yearly", value: "$" + fmt(s.totalRevenue) },
    ],
    REVENUE_DATA: (s.revenueBreakdown || []).map((r) => ({
      source: r.source, amount: "$" + fmt(r.amount), percent: r.percent.toFixed(1) + "%", color: r.color, icon: r.icon,
    })),
    VIOLATIONS: s.violations || [],
    SECURITY_DATA: s.securityData || [],
    AUDIT_LOGS: s.auditLogs || [],
    PK_BATTLES: s.pkBattles || [],
    ANALYTICS_DATA: [
      { metric: "Host Growth", value: fmt(s.totalHosts), change: "live", color: "#EB5757", icon: "Mic" },
      { metric: "Agency Growth", value: fmt(s.totalAgencies), change: "live", color: "#8B5CF6", icon: "Building2" },
      { metric: "Agent Growth", value: fmt(s.totalAgents), change: "live", color: "#A78BFA", icon: "Handshake" },
      { metric: "Revenue Growth", value: "$" + fmt(s.totalRevenue), change: "live", color: "#27AE60", icon: "DollarSign" },
      { metric: "Online Now", value: fmt(s.onlineUsers), change: "live", color: "#2F80ED", icon: "Activity" },
      { metric: "VIP Users", value: fmt(s.vipUsers), change: "live", color: "#56CCF2", icon: "Heart" },
    ],
    PERFORMANCE_DATA: [
      { category: "Platform Activity", value: fmt(s.onlineUsers) + " online", change: "live", color: "#27AE60", icon: "Activity" },
      { category: "Revenue", value: "$" + fmt(s.todayRevenue), change: "live", color: "#27AE60", icon: "TrendingUp" },
      { category: "Engagement", value: fmt(s.totalGifts) + " gifts", change: "live", color: "#EB5757", icon: "Gift" },
      { category: "Growth", value: fmt(s.newUsersToday) + " today", change: "live", color: "#2F80ED", icon: "UserCog" },
    ],
    EVENTS: [],
  };
}

export function mapAdminData(s) {
  if (!s) return null;
  const fmt = (n) => n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? (n / 1e3).toFixed(1) + "K" : String(n);

  return {
    KPIS: [
      { label: "Assigned Agencies", value: fmt(s.totalAgencies), change: "live", trend: "up", icon: "Building2", color: "#8B5CF6" },
      { label: "Assigned Agents", value: fmt(s.totalAgents), change: "live", trend: "up", icon: "Handshake", color: "#3B82F6" },
      { label: "Assigned Hosts", value: fmt(s.totalHosts), change: "live", trend: "up", icon: "Mic", color: "#EF4444" },
      { label: "Live Hosts", value: fmt(s.activeStreams), change: "live", trend: "up", icon: "Radio", color: "#27AE60" },
      { label: "Pending Applications", value: fmt(s.pendingApplications), change: "live", trend: "up", icon: "FileCheck", color: "#F2994A" },
      { label: "Pending Verifications", value: fmt(s.pendingVerifications), change: "live", trend: "up", icon: "BadgeCheck", color: "#F2994A" },
      { label: "Open Support Cases", value: fmt(s.pendingTickets), change: "live", trend: "up", icon: "LifeBuoy", color: "#2F80ED" },
      { label: "Active Reports", value: fmt(s.activeViolations), change: "live", trend: "up", icon: "AlertTriangle", color: "#EB5757" },
      { label: "Active PK Battles", value: fmt(s.totalPkBattles), change: "live", trend: "up", icon: "Swords", color: "#EF4444" },
      { label: "Daily Revenue", value: "$" + fmt(s.todayRevenue), change: "live", trend: "up", icon: "DollarSign", color: "#27AE60" },
    ],
    REALTIME_COUNTERS: [
      { label: "Live Hosts", value: fmt(s.activeStreams), icon: "Radio", color: "#27AE60" },
      { label: "Open Cases", value: fmt(s.pendingTickets), icon: "LifeBuoy", color: "#2F80ED" },
      { label: "Pending Apps", value: fmt(s.pendingApplications), icon: "FileCheck", color: "#F2994A" },
      { label: "PK Battles", value: fmt(s.totalPkBattles), icon: "Swords", color: "#EF4444" },
      { label: "Verifications", value: fmt(s.pendingVerifications), icon: "BadgeCheck", color: "#10B981" },
      { label: "Violations", value: fmt(s.activeViolations), icon: "AlertTriangle", color: "#EB5757" },
    ],
    LIVE_STREAM: s.liveActivity || [],
    AGENCIES: s.agenciesList || [],
    AGENTS: s.agentsList || [],
    HOSTS: s.hostsList || [],
    APPLICATIONS: s.applicationList || [],
    SUPPORT_CASES: s.supportCases || [],
    REPORTS: s.violations || [],
    PK_BATTLES: s.pkBattles || [],
    AUDIT_LOGS: s.auditLogs || [],
    ANALYTICS: [
      { metric: "Agency Performance", value: fmt(s.totalAgencies), change: "live", color: "#8B5CF6", icon: "Building2" },
      { metric: "Agent Performance", value: fmt(s.totalAgents), change: "live", color: "#3B82F6", icon: "Handshake" },
      { metric: "Host Performance", value: fmt(s.totalHosts), change: "live", color: "#EF4444", icon: "Mic" },
      { metric: "Applications", value: fmt(s.totalApplications), change: "live", color: "#F59E0B", icon: "FileCheck" },
      { metric: "Cases Resolved", value: fmt(s.resolvedTickets), change: "live", color: "#2F80ED", icon: "LifeBuoy" },
      { metric: "Reports Closed", value: fmt(s.activeViolations), change: "live", color: "#EB5757", icon: "AlertTriangle" },
    ],
    VERIFICATIONS: (verificationRecords) => verificationRecords.map((v) => ({
      id: v.id,
      type: (v.verification_type || 'verification').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + ' Verification',
      entity: v.user_id || 'Unknown',
      documents: v.status === 'verified' ? 'Complete' : 'Pending',
      status: (v.status || 'pending').replace(/\b\w/g, c => c.toUpperCase()),
      color: v.status === 'verified' ? '#27AE60' : v.status === 'failed' ? '#EB5757' : '#F2994A',
    })),
    EVENTS: [],
  };
}

export function mapOwnerData(s) {
  if (!s) return null;
  const fmt = (n) => n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? (n / 1e3).toFixed(1) + "K" : String(n);

  return {
    COUNTRIES: s.countries || [],
    ROLES: s.roles || [],
    APPLICATIONS: (s.applications || []).map((a) => ({ ...a })),
    REVENUE_BREAKDOWN: (s.revenueBreakdown || []).map((r) => ({
      source: r.source, amount: "$" + fmt(r.amount), percent: r.percent.toFixed(1) + "%", color: r.color,
    })),
    REVENUE_PERIODS: [
      { label: "Daily", value: "$" + fmt(s.todayRevenue) },
      { label: "Weekly", value: "$" + fmt(s.weeklyRevenue) },
      { label: "Monthly", value: "$" + fmt(s.monthlyRevenue) },
      { label: "Yearly", value: "$" + fmt(s.totalRevenue) },
      { label: "Lifetime", value: "$" + fmt(s.totalRevenue) },
    ],
    GIFT_STATS: s.giftStats || [],
    COIN_STATS: s.coinStats || [],
    LIVE_STREAMS: s.liveStreams || [],
    AI_DETECTIONS: [
      { type: "Fraud Detected", count: fmt(s.activeFraud), risk: s.activeFraud > 0 ? "high" : "low", icon: "UserX", color: "#EB5757" },
      { type: "Spam Activity", count: fmt(s.activeSpam), risk: s.activeSpam > 5 ? "medium" : "low", icon: "MessageSquare", color: "#F2994A" },
      { type: "Active Violations", count: fmt(s.activeViolations), risk: s.activeViolations > 0 ? "high" : "low", icon: "AlertTriangle", color: "#EB5757" },
      { type: "Security Alerts", count: fmt(s.criticalAlerts), risk: s.criticalAlerts > 0 ? "high" : "low", icon: "CreditCard", color: "#EB5757" },
      { type: "Open Incidents", count: fmt(s.openIncidents), risk: s.openIncidents > 0 ? "medium" : "low", icon: "Bot", color: "#F2994A" },
    ],
    SECURITY_DATA: s.securityData || [],
    FINANCE_DATA: s.financeData || [],
    AUDIT_LOGS: s.auditLogs || [],
    LIVE_DATA_STREAM: s.liveActivity || [],
    RANKINGS: [
      { category: "Top Countries", icon: "Globe", top: (s.countries || []).slice(0, 3).map((c) => c.name) },
      { category: "Top Hosts", icon: "Mic", top: (s.topHosts || []).slice(0, 3).map((h) => h.username || h.full_name || 'Unknown') },
      { category: "Top Gifters", icon: "Gift", top: (s.topGifters || []).slice(0, 3).map((g) => g.user_id?.slice(0, 8) || 'Unknown') },
      { category: "Top Receivers", icon: "Star", top: (s.topReceivers || []).slice(0, 3).map((r) => r.user_id?.slice(0, 8) || 'Unknown') },
    ],
    BI_INSIGHTS: [
      { label: "Total Revenue", value: "$" + fmt(s.totalRevenue), trend: "live", color: "#27AE60" },
      { label: "Total Users", value: fmt(s.totalUsers), trend: "live", color: "#2F80ED" },
      { label: "Active Streams", value: fmt(s.activeStreams), trend: "live", color: "#A78BFA" },
      { label: "VIP Users", value: fmt(s.vipUsers), trend: "live", color: "#D4AF37" },
      { label: "Online Now", value: fmt(s.onlineUsers), trend: "live", color: "#27AE60" },
      { label: "Countries", value: fmt(s.totalCountries), trend: "live", color: "#EB5757" },
    ],
  };
}