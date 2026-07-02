export const SAM_STATS = [
  { label: "Total Users", value: "2,847,392", icon: "Users", color: "#3B82F6", trend: "+1,240 today" },
  { label: "Active Users", value: "384,521", icon: "Activity", color: "#10B981", trend: "Live now" },
  { label: "New Users Today", value: "1,240", icon: "UserPlus", color: "#8B5CF6", trend: "+12% vs yesterday" },
  { label: "Active Hosts", value: "8,420", icon: "Mic", color: "#EC4899", trend: "Live streaming" },
  { label: "Active Agents", value: "1,250", icon: "Briefcase", color: "#F59E0B", trend: "Managing hosts" },
  { label: "Active Agencies", value: "342", icon: "Building2", color: "#06B6D4", trend: "Registered" },
  { label: "Coin Circulation", value: "845.2M", icon: "Coins", color: "#D4AF37", trend: "In circulation" },
  { label: "Total Revenue", value: "$4.82M", icon: "DollarSign", color: "#10B981", trend: "This month" },
  { label: "Pending Approvals", value: "47", icon: "Clock", color: "#F59E0B", trend: "Awaiting review" },
  { label: "Pending Withdrawals", value: "23", icon: "ArrowDownCircle", color: "#EF4444", trend: "Needs action" },
  { label: "Pending Seller Requests", value: "12", icon: "Store", color: "#8B5CF6", trend: "New applications" },
  { label: "System Alerts", value: "3", icon: "AlertTriangle", color: "#DC2626", trend: "2 critical" },
];

export const SAM_MODULES = [
  { id: "overview", title: "Dashboard Overview", icon: "LayoutDashboard", color: "#3B82F6", gradient: "linear-gradient(135deg, #2563EB, #3B82F6)", description: "Main home with all platform KPIs and system metrics" },
  { id: "user_management", title: "User Management", icon: "Users", color: "#8B5CF6", gradient: "linear-gradient(135deg, #7C3AED, #8B5CF6)", description: "View, search, suspend, activate users and check account status" },
  { id: "coin_management", title: "Coin Management", icon: "Coins", color: "#D4AF37", gradient: "linear-gradient(135deg, #B8941E, #D4AF37)", description: "Monitor coin price, supply, circulation, and transactions" },
  { id: "seller_management", title: "Coin Seller Management", icon: "Store", color: "#06B6D4", gradient: "linear-gradient(135deg, #0891B2, #06B6D4)", description: "Approve/reject sellers, monitor performance and security" },
  { id: "offline_recharge", title: "Offline Recharge", icon: "Smartphone", color: "#F59E0B", gradient: "linear-gradient(135deg, #D97706, #F59E0B)", description: "Approve or reject offline recharge requests from sellers" },
  { id: "wallet_control", title: "Wallet Control Center", icon: "Wallet", color: "#10B981", gradient: "linear-gradient(135deg, #059669, #10B981)", description: "Monitor all wallet types, balances, and suspicious activity" },
  { id: "withdrawal_management", title: "Withdrawal Management", icon: "ArrowDownCircle", color: "#EF4444", gradient: "linear-gradient(135deg, #DC2626, #EF4444)", description: "Approve or reject pending withdrawal requests" },
  { id: "agency_management", title: "Agency & Agent Management", icon: "Building2", color: "#6366F1", gradient: "linear-gradient(135deg, #4F46E5, #6366F1)", description: "Manage agencies, agents, performance, and commissions" },
  { id: "host_management", title: "Host & Streaming", icon: "Mic", color: "#EC4899", gradient: "linear-gradient(135deg, #DB2777, #EC4899)", description: "Monitor hosts, live rooms, gift earnings, and restrictions" },
  { id: "gift_revenue", title: "Gift & Revenue Management", icon: "Gift", color: "#D4AF37", gradient: "linear-gradient(135deg, #B8941E, #D4AF37)", description: "View gift transactions and revenue split across platform" },
  { id: "reports", title: "Reports & Analytics", icon: "BarChart3", color: "#3B82F6", gradient: "linear-gradient(135deg, #2563EB, #3B82F6)", description: "Daily/monthly revenue, coin sales, growth reports, exports" },
  { id: "security", title: "Security Center", icon: "ShieldCheck", color: "#DC2626", gradient: "linear-gradient(135deg, #B91C1C, #DC2626)", description: "Login activity, device monitoring, fraud detection, logs" },
  { id: "admin_control", title: "Admin Control", icon: "Crown", color: "#8B5CF6", gradient: "linear-gradient(135deg, #7C3AED, #8B5CF6)", description: "Manage admins, super admins, permissions, and audit logs" },
  { id: "system_health", title: "System Health", icon: "Server", color: "#10B981", gradient: "linear-gradient(135deg, #059669, #10B981)", description: "Wallet health, payment status, error logs, auto-repair" },
  { id: "sam_profile", title: "SAM Profile & Authority", icon: "UserCog", color: "#D4AF37", gradient: "linear-gradient(135deg, #B8941E, #D4AF37)", description: "SAM ID, role, permissions, and activity history" },
];

export const SAM_PERMISSIONS = [
  "User Management", "Coin Seller Management", "Recharge Approval", "Withdrawal Approval",
  "Wallet Monitoring", "Revenue Monitoring", "Reports", "Security Control", "Admin Management",
];

export const SAM_PROFILE = {
  sam_id: "SAM-001",
  name: "Super Admin Manager",
  role: "Super Admin Manager (SAM)",
  email: "sam@vyrolive.com",
  permissions: SAM_PERMISSIONS,
  activity_history: [
    { action: "Approved withdrawal of $2,500", time: "2h ago", type: "approval" },
    { action: "Suspended user account #VY10452", time: "5h ago", type: "action" },
    { action: "Approved seller application: GoldRecharge", time: "1d ago", type: "approval" },
    { action: "Reviewed security alert: VPN detection", time: "2d ago", type: "security" },
    { action: "Generated monthly revenue report", time: "3d ago", type: "report" },
  ],
};

export const SAM_USERS = [
  { id: "VY10001", name: "Ali Khan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", email: "ali@email.com", status: "active", coins: 125000, earnings: 4200, country: "🇦🇪", joined: "2024-01-15" },
  { id: "VY10002", name: "Sara Ahmed", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", email: "sara@email.com", status: "active", coins: 89000, earnings: 3100, country: "🇪🇬", joined: "2024-02-20" },
  { id: "VY10003", name: "David Kim", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop", email: "david@email.com", status: "suspended", coins: 54000, earnings: 1800, country: "🇰🇷", joined: "2024-03-10" },
  { id: "VY10004", name: "Fatima Noor", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop", email: "fatima@email.com", status: "blocked", coins: 0, earnings: 950, country: "🇲🇦", joined: "2024-04-05" },
  { id: "VY10005", name: "Omar Farooq", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop", email: "omar@email.com", status: "active", coins: 210000, earnings: 6800, country: "🇸🇦", joined: "2024-01-28" },
];

export const SAM_SELLERS = [
  { id: "SLR-001", name: "GoldRecharge Co.", avatar: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=80&h=80&fit=crop", status: "active", wallet: 450000, revenue: 125000, performance: 92, applications: 0 },
  { id: "SLR-002", name: "QuickCoins", avatar: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&fit=crop", status: "pending", wallet: 0, revenue: 0, performance: 0, applications: 1 },
  { id: "SLR-003", name: "FastPay Seller", avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=80&fit=crop", status: "active", wallet: 320000, revenue: 89000, performance: 85, applications: 0 },
  { id: "SLR-004", name: "PremiumRecharge", avatar: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=80&h=80&fit=crop", status: "pending", wallet: 0, revenue: 0, performance: 0, applications: 1 },
];

export const SAM_RECHARGES = [
  { id: "RCH-001", seller: "GoldRecharge Co.", customer: "Ali Khan", coins: 5000, bonus: 500, amount: "$50", status: "pending", date: "2026-07-02 14:30" },
  { id: "RCH-002", seller: "FastPay Seller", customer: "Sara Ahmed", coins: 10000, bonus: 1200, amount: "$100", status: "pending", date: "2026-07-02 13:15" },
  { id: "RCH-003", seller: "GoldRecharge Co.", customer: "Omar Farooq", coins: 20000, bonus: 3000, amount: "$200", status: "pending", date: "2026-07-02 11:45" },
  { id: "RCH-004", seller: "FastPay Seller", customer: "Layla Noor", coins: 5000, bonus: 500, amount: "$50", status: "approved", date: "2026-07-01 18:20", approvedBy: "SAM-001", notes: "Verified payment" },
  { id: "RCH-005", seller: "GoldRecharge Co.", customer: "David Kim", coins: 10000, bonus: 1000, amount: "$100", status: "rejected", date: "2026-07-01 10:00", approvedBy: "SAM-001", notes: "Payment not received" },
];

export const SAM_WITHDRAWALS = [
  { id: "WTH-001", user: "Ali Khan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", amount: "$2,500", method: "Bank Transfer", status: "pending", date: "2026-07-02 09:30" },
  { id: "WTH-002", user: "Fatima Noor", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop", amount: "$1,200", method: "PayPal", status: "pending", date: "2026-07-01 16:45" },
  { id: "WTH-003", user: "Omar Farooq", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop", amount: "$5,000", method: "Bank Transfer", status: "pending", date: "2026-07-01 14:20" },
  { id: "WTH-004", user: "Sara Ahmed", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", amount: "$800", method: "Crypto", status: "approved", date: "2026-06-30 11:00", approvedBy: "SAM-001" },
];

export const SAM_WALLETS = [
  { type: "User Wallets", count: "2.8M", balance: "$12.4M", icon: "Users", color: "#3B82F6", suspicious: 2 },
  { type: "Seller Wallets", count: "145", balance: "$2.1M", icon: "Store", color: "#06B6D4", suspicious: 0 },
  { type: "Agency Wallets", count: "342", balance: "$5.8M", icon: "Building2", color: "#6366F1", suspicious: 1 },
  { type: "Agent Wallets", count: "1,250", balance: "$1.9M", icon: "Briefcase", color: "#F59E0B", suspicious: 0 },
  { type: "Host Earnings", count: "8,420", balance: "$3.2M", icon: "Mic", color: "#EC4899", suspicious: 0 },
];

export const SAM_AGENCIES = [
  { id: "AG-001", name: "Golden Stars", owner: "Mohammed Ali", hosts: 120, revenue: "$420K", commission: "15%", performance: 94, status: "active" },
  { id: "AG-002", name: "Diamond Crew", owner: "Layla Noor", hosts: 85, revenue: "$310K", commission: "12%", performance: 88, status: "active" },
  { id: "AG-003", name: "Royal Agency", owner: "Ahmed Khan", hosts: 200, revenue: "$680K", commission: "18%", performance: 91, status: "active" },
];

export const SAM_HOSTS = [
  { id: "HST-001", name: "Aisha", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", room: "Arabian Nights Live", earnings: "$12,400", gifts: 8500, status: "live", verified: true },
  { id: "HST-002", name: "Fatima", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop", room: "Moroccan Lounge", earnings: "$8,900", gifts: 6200, status: "offline", verified: true },
  { id: "HST-003", name: "Sara", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", room: "Cairo Vibes", earnings: "$6,200", gifts: 4100, status: "live", verified: false },
];

export const SAM_GIFT_REVENUE = [
  { gift: "🌹 Rose", transactions: 125000, totalValue: "$125K", platform: "$37.5K", host: "$62.5K", agency: "$18.75K", agent: "$6.25K" },
  { gift: "💎 Diamond", transactions: 8500, totalValue: "$425K", platform: "$127.5K", host: "$212.5K", agency: "$63.75K", agent: "$21.25K" },
  { gift: "👑 Crown", transactions: 15000, totalValue: "$150K", platform: "$45K", host: "$75K", agency: "$22.5K", agent: "$7.5K" },
  { gift: "🚗 Luxury Car", transactions: 320, totalValue: "$320K", platform: "$96K", host: "$160K", agency: "$48K", agent: "$16K" },
  { gift: "🚀 Rocket", transactions: 120, totalValue: "$120K", platform: "$36K", host: "$60K", agency: "$18K", agent: "$6K" },
];

export const SAM_REPORTS = [
  { id: "RPT-001", title: "Daily Revenue Report", date: "2026-07-02", type: "daily", value: "$48,200" },
  { id: "RPT-002", title: "Monthly Revenue Report", date: "2026-06-30", type: "monthly", value: "$1,445,000" },
  { id: "RPT-003", title: "Coin Sales Report", date: "2026-07-02", type: "coins", value: "2.4M coins" },
  { id: "RPT-004", title: "Recharge Report", date: "2026-07-01", type: "recharge", value: "$85,000" },
  { id: "RPT-005", title: "Withdrawal Report", date: "2026-07-01", type: "withdrawal", value: "$32,000" },
  { id: "RPT-006", title: "User Growth Report", date: "2026-07-02", type: "growth", value: "+1,240 users" },
  { id: "RPT-007", title: "Seller Performance Report", date: "2026-06-30", type: "seller", value: "145 sellers" },
];

export const SAM_SECURITY = [
  { id: "SEC-001", event: "Multiple login attempts", user: "VY10042", ip: "192.168.1.1", severity: "high", time: "1h ago", type: "login" },
  { id: "SEC-002", event: "VPN detected", user: "VY10078", ip: "10.0.0.5", severity: "medium", time: "3h ago", type: "device" },
  { id: "SEC-003", event: "Suspicious transaction", user: "VY10023", ip: "172.16.0.3", severity: "high", time: "5h ago", type: "fraud" },
  { id: "SEC-004", event: "Device fingerprint mismatch", user: "VY10091", ip: "192.168.0.8", severity: "low", time: "8h ago", type: "device" },
  { id: "SEC-005", event: "Bulk coin transfer flagged", user: "VY10015", ip: "10.0.0.12", severity: "high", time: "12h ago", type: "fraud" },
];

export const SAM_ADMINS = [
  { id: "ADM-001", name: "John Manager", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop", role: "Super Admin", permissions: 15, status: "active", lastActive: "5m ago" },
  { id: "ADM-002", name: "Sarah Admin", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", role: "Admin", permissions: 10, status: "active", lastActive: "1h ago" },
  { id: "ADM-003", name: "Mike Moderator", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop", role: "Moderator", permissions: 6, status: "suspended", lastActive: "2d ago" },
  { id: "ADM-004", name: "Lisa Executive", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", role: "Admin", permissions: 12, status: "active", lastActive: "30m ago" },
];

export const SAM_SYSTEM_HEALTH = [
  { service: "Wallet Service", status: "operational", uptime: "99.98%", icon: "Wallet", color: "#10B981" },
  { service: "Payment Gateway", status: "operational", uptime: "99.95%", icon: "CreditCard", color: "#10B981" },
  { service: "Database", status: "operational", uptime: "99.99%", icon: "Database", color: "#10B981" },
  { service: "Real-Time Engine", status: "degraded", uptime: "97.82%", icon: "Radio", color: "#F59E0B" },
  { service: "Auto-Repair System", status: "operational", uptime: "100%", icon: "Wrench", color: "#10B981" },
  { service: "Error Logs", status: "warning", uptime: "—", icon: "AlertTriangle", color: "#F59E0B", errors: 23 },
];

export const SAM_COIN_DATA = {
  price_per_coin: "$0.01",
  total_supply: "1,000,000,000",
  circulation: "845,200,000",
  transactions_today: 125000,
  active_sellers: 145,
  recharge_activity: "$85,000",
};