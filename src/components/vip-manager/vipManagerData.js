// VIP Manager Dashboard data — VYRO Live Connect Earning
// Enterprise International Level VIP Membership & Premium Experience Control Center

export const VIP_SECTIONS = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard", color: "#D4AF37" },
  { id: "members", label: "Members", icon: "Crown", color: "#D4AF37" },
  { id: "levels", label: "Levels", icon: "Trophy", color: "#F59E0B" },
  { id: "rewards", label: "Rewards", icon: "Gift", color: "#EC4899" },
  { id: "events", label: "Events", icon: "PartyPopper", color: "#A78BFA" },
  { id: "host_engagement", label: "Hosts", icon: "Mic", color: "#EB5757" },
  { id: "revenue", label: "Revenue", icon: "DollarSign", color: "#27AE60" },
  { id: "retention", label: "Retention", icon: "Target", color: "#2F80ED" },
  { id: "growth", label: "Growth", icon: "TrendingUp", color: "#10B981" },
  { id: "communication", label: "Comms", icon: "MessageSquare", color: "#56CCF2" },
  { id: "benefits", label: "Benefits", icon: "Sparkles", color: "#EC4899" },
  { id: "partnerships", label: "Partners", icon: "Handshake", color: "#8B5CF6" },
  { id: "country", label: "Country", icon: "Globe", color: "#2F80ED" },
  { id: "rankings", label: "Rankings", icon: "Medal", color: "#D4AF37" },
  { id: "ai", label: "AI Center", icon: "Brain", color: "#A78BFA" },
  { id: "analytics", label: "Analytics", icon: "BarChart3", color: "#2F80ED" },
  { id: "reports", label: "Reports", icon: "FileText", color: "#F2994A" },
  { id: "team", label: "Team", icon: "Users", color: "#56CCF2" },
  { id: "settings", label: "Settings", icon: "Settings", color: "#6B7280" },
  { id: "tools", label: "Exclusive Tools", icon: "Rocket", color: "#D4AF37" },
  { id: "policy", label: "Policy", icon: "ScrollText", color: "#D4AF37" },
];

export const VIP_KPIS = [
  { label: "Total VIP Members", value: "48,294", change: "+8.2%", trend: "up", icon: "Crown", color: "#D4AF37" },
  { label: "Active VIP Members", value: "42,817", change: "+6.4%", trend: "up", icon: "UserCheck", color: "#27AE60" },
  { label: "New VIP Members", value: "1,284", change: "+12.1%", trend: "up", icon: "UserPlus", color: "#2F80ED" },
  { label: "VIP Revenue", value: "$8.4M", change: "+18.7%", trend: "up", icon: "DollarSign", color: "#27AE60" },
  { label: "VIP Coin Purchases", value: "284M", change: "+9.3%", trend: "up", icon: "Coins", color: "#F2994A" },
  { label: "VIP Gift Revenue", value: "$3.2M", change: "+14.8%", trend: "up", icon: "Gift", color: "#EB5757" },
  { label: "VIP Retention Rate", value: "87.4%", change: "+2.1%", trend: "up", icon: "Target", color: "#2F80ED" },
  { label: "VIP Renewal Rate", value: "82.9%", change: "+3.5%", trend: "up", icon: "RefreshCw", color: "#A78BFA" },
  { label: "VIP Event Participants", value: "18,472", change: "+7.2%", trend: "up", icon: "PartyPopper", color: "#A78BFA" },
  { label: "VIP Support Requests", value: "847", change: "-4.1%", trend: "up", icon: "Headphones", color: "#56CCF2" },
  { label: "Top VIP Users", value: "1,247", change: "+5.8%", trend: "up", icon: "Star", color: "#D4AF37" },
  { label: "VIP Growth Rate", value: "+14.2%", change: "+1.8%", trend: "up", icon: "TrendingUp", color: "#10B981" },
];

export const VIP_QUICK_ACTIONS = [
  { label: "View VIP Members", icon: "Crown", color: "#D4AF37" },
  { label: "Upgrade VIP User", icon: "ArrowUpCircle", color: "#27AE60" },
  { label: "Launch VIP Campaign", icon: "Megaphone", color: "#EC4899" },
  { label: "Generate VIP Report", icon: "FileText", color: "#2F80ED" },
];

export const VIP_REALTIME_COUNTERS = [
  { label: "Online VIPs", value: "12,847", icon: "Wifi", color: "#27AE60" },
  { label: "VIP Gifts Today", value: "47,283", icon: "Gift", color: "#EB5757" },
  { label: "VIP Revenue Today", value: "$284K", icon: "DollarSign", color: "#27AE60" },
  { label: "Active VIP Events", value: "34", icon: "PartyPopper", color: "#A78BFA" },
  { label: "VIP Support Tickets", value: "128", icon: "Headphones", color: "#56CCF2" },
  { label: "Pending Upgrades", value: "247", icon: "ArrowUpCircle", color: "#F2994A" },
];

export const VIP_LIVE_STREAM = [
  { type: "upgrade", text: "VIP Upgrade — VYR-4829 to VIP 7", time: "now", status: "success" },
  { type: "gift", text: "Luxury gift sent by VIP member — 10,000 coins", time: "12s", status: "success" },
  { type: "event", text: "VIP exclusive event launched — 342 participants", time: "34s", status: "info" },
  { type: "renewal", text: "VIP renewal processed — $199", time: "48s", status: "success" },
  { type: "reward", text: "VIP reward distributed — 500 coins x 1,247 users", time: "1m", status: "info" },
  { type: "support", text: "VIP support request — Priority handling", time: "1m", status: "warning" },
  { type: "partner", text: "New VIP partnership agreement signed", time: "2m", status: "success" },
  { type: "country", text: "VIP growth surge — Saudi Arabia +24%", time: "2m", status: "info" },
  { type: "churn", text: "VIP churn alert — 3 members at risk", time: "3m", status: "warning" },
  { type: "broadcast", text: "VIP broadcast sent — 42,817 recipients", time: "3m", status: "info" },
];

export const VIP_MEMBERS = [
  { vip_id: "VIP-10001", user_id: "VYR-4829", level: "VIP 10", join_date: "2023-04-12", expiry: "2026-04-12", spending: "$84,200", status: "Active" },
  { vip_id: "VIP-10002", user_id: "VYR-1928", level: "VIP 9", join_date: "2023-06-28", expiry: "2026-06-28", spending: "$62,400", status: "Active" },
  { vip_id: "VIP-10003", user_id: "VYR-7382", level: "VIP 8", join_date: "2023-08-15", expiry: "2026-08-15", spending: "$48,100", status: "Active" },
  { vip_id: "VIP-10004", user_id: "VYR-2918", level: "VIP 7", join_date: "2023-11-03", expiry: "2026-11-03", spending: "$34,800", status: "Active" },
  { vip_id: "VIP-10005", user_id: "VYR-8472", level: "VIP 6", join_date: "2024-01-19", expiry: "2026-07-19", spending: "$22,500", status: "Expiring" },
  { vip_id: "VIP-10006", user_id: "VYR-3847", level: "VIP 5", join_date: "2024-03-07", expiry: "2026-03-07", spending: "$18,200", status: "Active" },
  { vip_id: "VIP-10007", user_id: "VYR-5829", level: "VIP 4", join_date: "2024-05-22", expiry: "2026-05-22", spending: "$12,400", status: "Active" },
  { vip_id: "VIP-10008", user_id: "VYR-9284", level: "VIP 3", join_date: "2024-07-14", expiry: "2025-07-14", spending: "$8,100", status: "Expired" },
];

export const VIP_LEVELS = [
  { level: "VIP 1", members: "8,429", revenue: "$420K", color: "#A0AEC0" },
  { level: "VIP 2", members: "6,847", revenue: "$680K", color: "#94A3B8" },
  { level: "VIP 3", members: "5,247", revenue: "$840K", color: "#78716C" },
  { level: "VIP 4", members: "4,128", revenue: "$1.1M", color: "#A78BFA" },
  { level: "VIP 5", members: "3,294", revenue: "$1.4M", color: "#8B5CF6" },
  { level: "VIP 6", members: "2,481", revenue: "$1.6M", color: "#6366F1" },
  { level: "VIP 7", members: "1,847", revenue: "$1.8M", color: "#F59E0B" },
  { level: "VIP 8", members: "1,247", revenue: "$2.1M", color: "#D97706" },
  { level: "VIP 9", members: "847", revenue: "$2.4M", color: "#B45309" },
  { level: "VIP 10", members: "429", revenue: "$2.8M", color: "#D4AF37" },
];

export const VIP_REWARDS = [
  { name: "Monthly Coin Bonus", type: "Coins", value: "500 coins", recipients: "42,817", distributed: "Daily", icon: "Coins", color: "#F2994A" },
  { name: "VIP Exclusive Gift", type: "Exclusive Gifts", value: "Diamond Crown", recipients: "1,247", distributed: "Weekly", icon: "Gift", color: "#EB5757" },
  { name: "Loyalty Milestone", type: "Loyalty Rewards", value: "2,000 coins", recipients: "847", distributed: "Monthly", icon: "Award", color: "#A78BFA" },
  { name: "Event Champion", type: "Event Rewards", value: "5,000 coins", recipients: "34", distributed: "Per Event", icon: "Trophy", color: "#D4AF37" },
  { name: "VIP Renewal Bonus", type: "Bonus Rewards", value: "1,000 coins", recipients: "1,284", distributed: "On Renewal", icon: "RefreshCw", color: "#27AE60" },
  { name: "Top Spender Bonus", type: "Bonus Rewards", value: "10,000 coins", recipients: "100", distributed: "Monthly", icon: "Star", color: "#EC4899" },
];

export const VIP_EVENTS = [
  { name: "Diamond Gala Night", type: "Exclusive Live", date: "2026-07-15", participants: "2,847", status: "Scheduled", color: "#D4AF37" },
  { name: "VIP PK Championship", type: "Competition", date: "2026-07-20", participants: "1,247", status: "Active", color: "#EB5757" },
  { name: "Golden Meet & Greet", type: "Meet & Greet", date: "2026-07-25", participants: "847", status: "Scheduled", color: "#F59E0B" },
  { name: "VIP Loyalty Awards", type: "Awards Ceremony", date: "2026-08-01", participants: "1,847", status: "Planning", color: "#A78BFA" },
  { name: "Summer VIP Festival", type: "Festival", date: "2026-08-10", participants: "5,247", status: "Planning", color: "#EC4899" },
];

export const VIP_HOST_SESSIONS = [
  { host: "LunaStar", vip: "VIP-10001", type: "Private Session", date: "2026-07-05", duration: "30 min", status: "Completed", color: "#27AE60" },
  { host: "DesertRose", vip: "VIP-10002", type: "Meet & Greet", date: "2026-07-08", duration: "45 min", status: "Scheduled", color: "#2F80ED" },
  { host: "OceanVoice", vip: "VIP-10003", type: "Exclusive Live", date: "2026-07-12", duration: "60 min", status: "Scheduled", color: "#A78BFA" },
  { host: "SilverMoon", vip: "VIP-10004", type: "Private Session", date: "2026-07-14", duration: "30 min", status: "Scheduled", color: "#F2994A" },
];

export const VIP_REVENUE_DATA = [
  { source: "VIP Subscriptions", amount: "$3.8M", percent: "45.2%", color: "#D4AF37", icon: "Crown" },
  { source: "VIP Coin Purchases", amount: "$2.4M", percent: "28.6%", color: "#F2994A", icon: "Coins" },
  { source: "VIP Gift Revenue", amount: "$1.6M", percent: "19.0%", color: "#EB5757", icon: "Gift" },
  { source: "VIP Event Revenue", amount: "$420K", percent: "5.0%", color: "#A78BFA", icon: "PartyPopper" },
  { source: "VIP Exclusive Items", amount: "$180K", percent: "2.2%", color: "#EC4899", icon: "Sparkles" },
];

export const VIP_REVENUE_PERIODS = [
  { label: "Daily", value: "$48K" },
  { label: "Weekly", value: "$328K" },
  { label: "Monthly", value: "$1.4M" },
  { label: "Yearly", value: "$8.4M" },
  { label: "Lifetime", value: "$32M" },
];

export const VIP_RETENTION = [
  { label: "Renewal Rate", value: "82.9%", trend: "+3.5%", color: "#27AE60" },
  { label: "Churn Rate", value: "12.6%", trend: "-1.8%", color: "#EB5757" },
  { label: "At-Risk Members", value: "1,284", trend: "-247", color: "#F2994A" },
  { label: "Saved This Month", value: "847", trend: "+128", color: "#2F80ED" },
  { label: "Avg VIP Lifetime", value: "14.2 mo", trend: "+0.8", color: "#A78BFA" },
  { label: "Loyalty Score", value: "8.7/10", trend: "+0.3", color: "#D4AF37" },
];

export const VIP_GROWTH = [
  { month: "Jan", members: "38,200", growth: "+2.1%" },
  { month: "Feb", members: "39,847", growth: "+4.3%" },
  { month: "Mar", members: "41,294", growth: "+3.6%" },
  { month: "Apr", members: "42,817", growth: "+3.7%" },
  { month: "May", members: "44,528", growth: "+4.0%" },
  { month: "Jun", members: "46,284", growth: "+3.9%" },
  { month: "Jul", members: "48,294", growth: "+4.3%" },
];

export const VIP_BENEFITS = [
  { name: "Exclusive Diamond Badge", category: "Badges", active: true, icon: "Award", color: "#D4AF37" },
  { name: "VIP Golden Frame", category: "Frames", active: true, icon: "Square", color: "#F59E0B" },
  { name: "Diamond Entry Effect", category: "Entry Effects", active: true, icon: "Sparkles", color: "#A78BFA" },
  { name: "VIP Chat Bubbles", category: "Chat Features", active: true, icon: "MessageCircle", color: "#EC4899" },
  { name: "Priority Support", category: "Support", active: true, icon: "Headphones", color: "#2F80ED" },
  { name: "Exclusive Gift Set", category: "Gifts", active: true, icon: "Gift", color: "#EB5757" },
  { name: "VIP Profile Theme", category: "Themes", active: false, icon: "Palette", color: "#8B5CF6" },
  { name: "VIP Lucky Draw", category: "Events", active: true, icon: "Dice5", color: "#27AE60" },
];

export const VIP_PARTNERS = [
  { name: "Luxury Brand Co.", type: "Brand Partnership", tier: "Diamond", revenue: "$840K", status: "Active", color: "#D4AF37" },
  { name: "Global Telecom", type: "Telecom Partnership", tier: "Platinum", revenue: "$620K", status: "Active", color: "#A78BFA" },
  { name: "Premium Auto Group", type: "Sponsorship", tier: "Gold", revenue: "$480K", status: "Active", color: "#F59E0B" },
  { name: "Elite Travel Club", type: "Loyalty Exchange", tier: "Platinum", revenue: "$340K", status: "Active", color: "#2F80ED" },
  { name: "Fashion House X", type: "Brand Partnership", tier: "Gold", revenue: "$280K", status: "Pending", color: "#EC4899" },
];

export const VIP_COUNTRY_PERF = [
  { country: "Saudi Arabia", code: "SA", members: "8,247", revenue: "$1.8M", growth: "+24%", color: "#27AE60" },
  { country: "United States", code: "US", members: "7,128", revenue: "$1.6M", growth: "+12%", color: "#2F80ED" },
  { country: "India", code: "IN", members: "6,847", revenue: "$1.2M", growth: "+18%", color: "#A78BFA" },
  { country: "Egypt", code: "EG", members: "5,294", revenue: "$840K", growth: "+22%", color: "#F2994A" },
  { country: "UAE", code: "AE", members: "4,128", revenue: "$1.1M", growth: "+16%", color: "#D4AF37" },
  { country: "Nigeria", code: "NG", members: "3,847", revenue: "$620K", growth: "+15%", color: "#EB5757" },
  { country: "Brazil", code: "BR", members: "3,247", revenue: "$480K", growth: "+9%", color: "#10B981" },
  { country: "Pakistan", code: "PK", members: "2,894", revenue: "$420K", growth: "+14%", color: "#8B5CF6" },
];

export const VIP_RANKINGS = [
  { category: "Top Spenders", icon: "DollarSign", top: ["VIP-10001 ($84K)", "VIP-10002 ($62K)", "VIP-10003 ($48K)"], color: "#27AE60" },
  { category: "Top Gifters", icon: "Gift", top: ["VIP-10001", "VIP-10003", "VIP-10005"], color: "#EB5757" },
  { category: "Most Active VIPs", icon: "Activity", top: ["VIP-10002", "VIP-10004", "VIP-10006"], color: "#2F80ED" },
  { category: "Highest VIP Levels", icon: "Crown", top: ["VIP-10001 (VIP 10)", "VIP-10002 (VIP 9)", "VIP-10003 (VIP 8)"], color: "#D4AF37" },
  { category: "Top Countries", icon: "Globe", top: ["Saudi Arabia", "United States", "India"], color: "#A78BFA" },
  { category: "Most Loyal", icon: "Award", top: ["VIP-10001 (38 mo)", "VIP-10002 (36 mo)", "VIP-10003 (34 mo)"], color: "#EC4899" },
];

export const VIP_AI_INSIGHTS = [
  { label: "VIP Behavior Analysis", value: "Active", detail: "42,817 profiles analyzed", icon: "Brain", color: "#A78BFA" },
  { label: "Spending Forecast (Q3)", value: "$2.8M", detail: "+16% projected", icon: "TrendingUp", color: "#27AE60" },
  { label: "Retention Forecast", value: "84.2%", detail: "+1.8% improvement", icon: "Target", color: "#2F80ED" },
  { label: "Growth Prediction", value: "52,400", detail: "By end of 2026", icon: "Rocket", color: "#10B981" },
  { label: "Churn Risk Alert", value: "1,284", detail: "At-risk members identified", icon: "AlertTriangle", color: "#EB5757" },
  { label: "Upgrade Candidates", value: "2,847", detail: "Ready for next VIP level", icon: "ArrowUpCircle", color: "#D4AF37" },
];

export const VIP_ANALYTICS = [
  { metric: "Avg Revenue per VIP", value: "$174", change: "+8.2%", trend: "up", color: "#27AE60" },
  { metric: "VIP Engagement Rate", value: "78.4%", change: "+3.1%", trend: "up", color: "#2F80ED" },
  { metric: "VIP Session Duration", value: "42 min", change: "+5.2%", trend: "up", color: "#A78BFA" },
  { metric: "Gifts per VIP/Day", value: "3.4", change: "+0.8", trend: "up", color: "#EB5757" },
  { metric: "VIP Event Attendance", value: "64.2%", change: "+4.7%", trend: "up", color: "#EC4899" },
  { metric: "VIP Support Satisfaction", value: "9.2/10", change: "+0.3", trend: "up", color: "#D4AF37" },
];

export const VIP_REPORTS = [
  { name: "Daily VIP Report", type: "Daily", icon: "Calendar", color: "#2F80ED" },
  { name: "Weekly VIP Report", type: "Weekly", icon: "CalendarDays", color: "#56CCF2" },
  { name: "Monthly VIP Report", type: "Monthly", icon: "CalendarRange", color: "#A78BFA" },
  { name: "VIP Revenue Report", type: "Revenue", icon: "DollarSign", color: "#27AE60" },
  { name: "VIP Retention Report", type: "Retention", icon: "Target", color: "#2F80ED" },
  { name: "VIP Growth Report", type: "Growth", icon: "TrendingUp", color: "#10B981" },
  { name: "VIP Event Report", type: "Events", icon: "PartyPopper", color: "#EC4899" },
  { name: "VIP Reward Report", type: "Rewards", icon: "Gift", color: "#EB5757" },
  { name: "VIP Engagement Report", type: "Engagement", icon: "Activity", color: "#F2994A" },
  { name: "VIP Country Performance", type: "Country", icon: "Globe", color: "#8B5CF6" },
  { name: "VIP Ranking Report", type: "Rankings", icon: "Medal", color: "#D4AF37" },
  { name: "VIP Loyalty Report", type: "Loyalty", icon: "Award", color: "#EC4899" },
];

export const VIP_TEAM = [
  { name: "Sarah Mitchell", role: "VIP Manager Head", staff_id: "VVM-001", tasks: 24, performance: "98%", color: "#D4AF37" },
  { name: "Ahmed Khalil", role: "VIP Retention Lead", staff_id: "VVM-002", tasks: 18, performance: "94%", color: "#2F80ED" },
  { name: "Priya Sharma", role: "VIP Events Lead", staff_id: "VVM-003", tasks: 15, performance: "96%", color: "#A78BFA" },
  { name: "David Chen", role: "VIP Rewards Lead", staff_id: "VVM-004", tasks: 20, performance: "92%", color: "#EC4899" },
  { name: "Fatima Noor", role: "VIP Support Lead", staff_id: "VVM-005", tasks: 32, performance: "97%", color: "#27AE60" },
  { name: "James Wilson", role: "VIP Analytics Lead", staff_id: "VVM-006", tasks: 12, performance: "95%", color: "#56CCF2" },
];

export const VIP_SETTINGS_GROUPS = [
  { name: "VIP Levels Config", icon: "Trophy", color: "#D4AF37" },
  { name: "VIP Benefits Config", icon: "Sparkles", color: "#EC4899" },
  { name: "VIP Rewards Config", icon: "Gift", color: "#EB5757" },
  { name: "VIP Events Config", icon: "PartyPopper", color: "#A78BFA" },
  { name: "VIP Renewal Rules", icon: "RefreshCw", color: "#27AE60" },
  { name: "VIP Pricing Config", icon: "DollarSign", color: "#2F80ED" },
  { name: "VIP Communication", icon: "MessageSquare", color: "#56CCF2" },
  { name: "VIP Security", icon: "ShieldCheck", color: "#F2994A" },
];

export const VIP_EXCLUSIVE_TOOLS = [
  { name: "Emergency VIP Upgrade", desc: "Instantly upgrade any VIP member", icon: "Zap", color: "#D4AF37", danger: false },
  { name: "VIP Reward Distribution", desc: "Mass distribute rewards to VIPs", icon: "Gift", color: "#EC4899", danger: false },
  { name: "Global VIP Campaign Launch", desc: "Launch campaign to all VIPs", icon: "Megaphone", color: "#A78BFA", danger: false },
  { name: "VIP Retention Optimization", desc: "AI-driven retention boost", icon: "Target", color: "#2F80ED", danger: false },
  { name: "Premium User Recovery", desc: "Recover at-risk/churned VIPs", icon: "LifeBuoy", color: "#27AE60", danger: false },
  { name: "VIP Revenue Optimization", desc: "Optimize VIP revenue streams", icon: "TrendingUp", color: "#10B981", danger: false },
  { name: "Strategic VIP Planning", desc: "Long-term VIP strategy builder", icon: "Rocket", color: "#8B5CF6", danger: false },
  { name: "VIP Status Override", desc: "Manually override VIP status", icon: "Crown", color: "#EB5757", danger: true },
];

export const VIP_COMMUNICATION_TYPES = [
  { label: "VIP Message", icon: "MessageSquare", color: "#2F80ED" },
  { label: "Broadcast", icon: "Megaphone", color: "#EC4899" },
  { label: "Invitations", icon: "Mail", color: "#A78BFA" },
  { label: "Notifications", icon: "Bell", color: "#F2994A" },
];

export const VIP_PERMISSIONS_ALLOWED = [
  "Manage VIP Members", "Manage VIP Levels", "Manage VIP Rewards", "Manage VIP Events",
  "Manage VIP Benefits", "Generate VIP Reports", "Monitor VIP Revenue", "Analyze VIP Growth",
  "Launch VIP Campaigns", "Manage VIP Communications",
];

export const VIP_PERMISSIONS_RESTRICTED = [
  "Owner Dashboard Access", "Global Finance Controls", "Super Admin Controls",
  "Platform Ownership Functions", "Global Security Administration",
];

export const VIP_TIME_FILTERS = ["Daily", "Weekly", "Monthly", "Yearly", "Lifetime"];