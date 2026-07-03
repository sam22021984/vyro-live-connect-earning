// Reward Manager Dashboard data — VYRO Live Connect Earning
// Enterprise International Level Rewards, Incentives & Achievement Control Center

export const REWARD_SECTIONS = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard", color: "#F59E0B" },
  { id: "management", label: "Reward Mgmt", icon: "Trophy", color: "#F59E0B" },
  { id: "achievements", label: "Achievements", icon: "Target", color: "#EF4444" },
  { id: "events", label: "Event Rewards", icon: "PartyPopper", color: "#EC4899" },
  { id: "vip", label: "VIP Rewards", icon: "Crown", color: "#8B5CF6" },
  { id: "agents", label: "Agent Rewards", icon: "Handshake", color: "#A78BFA" },
  { id: "agencies", label: "Agency Rewards", icon: "Building2", color: "#8B5CF6" },
  { id: "hosts", label: "Host Rewards", icon: "Mic", color: "#EB5757" },
  { id: "users", label: "User Rewards", icon: "User", color: "#2F80ED" },
  { id: "loyalty", label: "Loyalty", icon: "Medal", color: "#F59E0B" },
  { id: "bonus", label: "Bonus Mgmt", icon: "Gift", color: "#27AE60" },
  { id: "coins", label: "Coin Rewards", icon: "Coins", color: "#F2994A" },
  { id: "country", label: "Country Perf", icon: "Globe", color: "#2F80ED" },
  { id: "earners", label: "Top Earners", icon: "Award", color: "#F59E0B" },
  { id: "ai", label: "AI Intelligence", icon: "BrainCircuit", color: "#8B5CF6" },
  { id: "analytics", label: "Analytics", icon: "BarChart3", color: "#2F80ED" },
  { id: "reports", label: "Reports", icon: "FileText", color: "#F59E0B" },
  { id: "team", label: "Team Mgmt", icon: "Users", color: "#2F80ED" },
  { id: "settings", label: "Settings", icon: "Settings", color: "#6B7280" },
  { id: "exclusive", label: "Exclusive Tools", icon: "Rocket", color: "#EC4899" },
];

export const REWARD_KPIS = [
  { label: "Total Rewards Distributed", value: "$12.4M", change: "+8.2%", trend: "up", icon: "Gift", color: "#27AE60" },
  { label: "Active Reward Campaigns", value: "248", change: "+12", trend: "up", icon: "PartyPopper", color: "#EC4899" },
  { label: "Pending Reward Claims", value: "1,847", change: "+47", trend: "up", icon: "Clock", color: "#F2994A" },
  { label: "Approved Rewards", value: "8,294", change: "+5.4%", trend: "up", icon: "CheckCircle", color: "#27AE60" },
  { label: "Rejected Rewards", value: "218", change: "-8", trend: "down", icon: "XCircle", color: "#EB5757" },
  { label: "Event Rewards Issued", value: "3,472", change: "+18.2%", trend: "up", icon: "PartyPopper", color: "#EC4899" },
  { label: "Loyalty Rewards Issued", value: "5,128", change: "+6.4%", trend: "up", icon: "Medal", color: "#F59E0B" },
  { label: "Achievement Rewards Issued", value: "4,847", change: "+9.1%", trend: "up", icon: "Target", color: "#EF4444" },
  { label: "VIP Rewards Issued", value: "2,184", change: "+4.2%", trend: "up", icon: "Crown", color: "#8B5CF6" },
  { label: "Reward Budget Utilized", value: "78.4%", change: "+3.2%", trend: "up", icon: "Wallet", color: "#F2994A" },
  { label: "Top Reward Earners", value: "1,205", change: "+28", trend: "up", icon: "Award", color: "#F59E0B" },
  { label: "Reward Engagement Rate", value: "84.7%", change: "+2.8%", trend: "up", icon: "TrendingUp", color: "#2F80ED" },
];

export const REWARD_QUICK_ACTIONS = [
  { label: "Create Reward", icon: "Plus", color: "#27AE60" },
  { label: "Approve Rewards", icon: "CheckCircle", color: "#2F80ED" },
  { label: "Launch Campaign", icon: "Rocket", color: "#EC4899" },
  { label: "Generate Report", icon: "FileText", color: "#F59E0B" },
];

export const REWARD_REALTIME_COUNTERS = [
  { label: "Rewards Today", value: "2,847", icon: "Gift", color: "#27AE60" },
  { label: "Claims Today", value: "1,284", icon: "Clock", color: "#F2994A" },
  { label: "Active Campaigns", value: "248", icon: "PartyPopper", color: "#EC4899" },
  { label: "Pending Approvals", value: "1,847", icon: "FileText", color: "#F2994A" },
  { label: "VIP Rewards Today", value: "184", icon: "Crown", color: "#8B5CF6" },
  { label: "Budget Remaining", value: "$2.7M", icon: "Wallet", color: "#27AE60" },
];

export const REWARD_LIVE_STREAM = [
  { type: "reward", text: "Achievement reward distributed — $500 to LunaStar", time: "now", status: "success" },
  { type: "claim", text: "Loyalty reward claimed — User #VYR-4829", time: "12s", status: "info" },
  { type: "campaign", text: "New campaign launched — Summer Bonus Festival", time: "34s", status: "success" },
  { type: "vip", text: "VIP reward issued — $1,200 to Diamond VIP Member", time: "48s", status: "info" },
  { type: "event", text: "Event reward winners announced — PK Champions Cup", time: "1m", status: "success" },
  { type: "bonus", text: "Bonus approved — $2,400 to Agency Vyro Stars", time: "1m", status: "info" },
  { type: "rejection", text: "Reward claim rejected — User #VYR-8472 (fraud)", time: "2m", status: "warning" },
  { type: "achievement", text: "Achievement unlocked — Streaming Milestone (500h)", time: "2m", status: "info" },
  { type: "loyalty", text: "Loyalty tier upgrade — Silver to Gold Member", time: "3m", status: "success" },
  { type: "budget", text: "Budget milestone — 78% utilization reached", time: "3m", status: "info" },
];

export const REWARD_TYPES = [
  { type: "Coin Rewards", active: 1247, distributed: "$3.8M", color: "#F2994A", icon: "Coins" },
  { type: "Cash Rewards", active: 847, distributed: "$4.2M", color: "#27AE60", icon: "DollarSign" },
  { type: "Bonus Rewards", active: 628, distributed: "$1.6M", color: "#27AE60", icon: "Gift" },
  { type: "Achievement Rewards", active: 4847, distributed: "$1.2M", color: "#EF4444", icon: "Target" },
  { type: "Event Rewards", active: 3472, distributed: "$840K", color: "#EC4899", icon: "PartyPopper" },
  { type: "Loyalty Rewards", active: 5128, distributed: "$620K", color: "#F59E0B", icon: "Medal" },
  { type: "VIP Rewards", active: 2184, distributed: "$980K", color: "#8B5CF6", icon: "Crown" },
  { type: "Referral Rewards", active: 1284, distributed: "$240K", color: "#2F80ED", icon: "UserPlus" },
];

export const ACHIEVEMENT_TYPES = [
  { type: "Registration Achievement", count: 1247, reward: "$10", color: "#2F80ED", icon: "UserPlus" },
  { type: "Login Achievement", count: 4847, reward: "$5", color: "#27AE60", icon: "LogIn" },
  { type: "Streaming Achievement", count: 1847, reward: "$50", color: "#EB5757", icon: "Mic" },
  { type: "Revenue Achievement", count: 947, reward: "$200", color: "#27AE60", icon: "DollarSign" },
  { type: "Agency Achievement", count: 628, reward: "$500", color: "#8B5CF6", icon: "Building2" },
  { type: "VIP Achievement", count: 384, reward: "$1,000", color: "#8B5CF6", icon: "Crown" },
];

export const ACHIEVEMENT_LIST = [
  { id: "ACH-001", name: "Streaming Milestone (500h)", type: "Streaming", earners: 247, reward: "$500", status: "Active", color: "#27AE60" },
  { id: "ACH-002", name: "Revenue Champion ($10K)", type: "Revenue", earners: 184, reward: "$1,000", status: "Active", color: "#27AE60" },
  { id: "ACH-003", name: "Agency Builder (50 Hosts)", type: "Agency", earners: 92, reward: "$2,000", status: "Active", color: "#27AE60" },
  { id: "ACH-004", name: "VIP Premium Status", type: "VIP", earners: 184, reward: "$1,200", status: "Active", color: "#27AE60" },
  { id: "ACH-005", name: "Daily Login Streak (30d)", type: "Login", earners: 4847, reward: "$50", status: "Active", color: "#27AE60" },
  { id: "ACH-006", name: "Registration Welcome", type: "Registration", earners: 1247, reward: "$10", status: "Draft", color: "#F2994A" },
];

export const EVENT_REWARDS = [
  { id: "EVT-001", name: "Summer Host Championship", participants: "2,847", pool: "$50K", status: "Active", color: "#27AE60" },
  { id: "EVT-002", name: "Agency League Cup", participants: "1,205", pool: "$30K", status: "Active", color: "#27AE60" },
  { id: "EVT-003", name: "Top Agent Awards", participants: "3,847", pool: "$20K", status: "Scheduled", color: "#F2994A" },
  { id: "EVT-004", name: "Global PK Festival", participants: "12,847", pool: "$100K", status: "Planning", color: "#F2994A" },
  { id: "EVT-005", name: "VIP Exclusive Gala", participants: "2184", pool: "$80K", status: "Active", color: "#27AE60" },
];

export const VIP_REWARDS = [
  { tier: "Diamond VIP", members: 184, rewards: "$980K", avgPerUser: "$5,326", color: "#8B5CF6", icon: "Crown" },
  { tier: "Platinum VIP", members: 482, rewards: "$640K", avgPerUser: "$1,328", color: "#A78BFA", icon: "Gem" },
  { tier: "Gold VIP", members: 1284, rewards: "$420K", avgPerUser: "$327", color: "#F59E0B", icon: "Star" },
  { tier: "Silver VIP", members: 2484, rewards: "$180K", avgPerUser: "$72", color: "#6B7280", icon: "Award" },
];

export const AGENT_REWARDS = [
  { id: "AGT-001", name: "A. Patel", agency: "Global Talent", incentive: "$28K", performance: "98%", status: "Active", color: "#27AE60" },
  { id: "AGT-002", name: "M. Hassan", agency: "Vyro Stars", incentive: "$24K", performance: "96%", status: "Active", color: "#27AE60" },
  { id: "AGT-003", name: "C. Okafor", agency: "Apex Agency", incentive: "$19K", performance: "94%", status: "Active", color: "#27AE60" },
  { id: "AGT-004", name: "F. Al-Rashid", agency: "Desert Voices", incentive: "$31K", performance: "97%", status: "Active", color: "#27AE60" },
  { id: "AGT-005", name: "L. Silva", agency: "Ocean Media", incentive: "$0", performance: "89%", status: "Suspended", color: "#EB5757" },
];

export const AGENCY_REWARDS = [
  { id: "AGY-001", name: "Vyro Stars", reward: "$84K", performance: "94%", status: "Active", color: "#27AE60" },
  { id: "AGY-002", name: "Global Talent", reward: "$120K", performance: "96%", status: "Active", color: "#27AE60" },
  { id: "AGY-003", name: "Apex Agency", reward: "$62K", performance: "91%", status: "Active", color: "#27AE60" },
  { id: "AGY-004", name: "Desert Voices", reward: "$98K", performance: "93%", status: "Active", color: "#27AE60" },
  { id: "AGY-005", name: "Ocean Media", reward: "$0", performance: "85%", status: "Suspended", color: "#EB5757" },
];

export const HOST_REWARDS = [
  { id: "HST-001", name: "LunaStar", reward: "$48K", achievement: "Streaming Milestone", status: "Active", color: "#27AE60" },
  { id: "HST-002", name: "DesertRose", reward: "$42K", achievement: "Revenue Champion", status: "Active", color: "#27AE60" },
  { id: "HST-003", name: "OceanVoice", reward: "$36K", achievement: "Top Performer", status: "Active", color: "#27AE60" },
  { id: "HST-004", name: "MountainEcho", reward: "$28K", achievement: "Rising Star", status: "Active", color: "#27AE60" },
  { id: "HST-005", name: "SilverMoon", reward: "$0", achievement: "—", status: "Suspended", color: "#EB5757" },
  { id: "HST-006", name: "GoldenDawn", reward: "$18K", achievement: "New Host Bonus", status: "Active", color: "#27AE60" },
];

export const USER_REWARDS = [
  { tier: "Regular Users", count: "38,294", rewards: "$1.2M", engagement: "72%", color: "#2F80ED", icon: "User" },
  { tier: "Active Users", count: "18,472", rewards: "$840K", engagement: "84%", color: "#27AE60", icon: "UserCheck" },
  { tier: "VIP Users", count: "4,334", rewards: "$980K", engagement: "96%", color: "#8B5CF6", icon: "Crown" },
  { tier: "New Users", count: "2,847", rewards: "$28K", engagement: "48%", color: "#F2994A", icon: "UserPlus" },
];

export const LOYALTY_PROGRAMS = [
  { tier: "Bronze", members: "12,847", points: "1,000+", reward: "$10/mo", color: "#92400E", icon: "Award" },
  { tier: "Silver", members: "8,294", points: "5,000+", reward: "$25/mo", color: "#6B7280", icon: "Award" },
  { tier: "Gold", members: "4,128", points: "20,000+", reward: "$75/mo", color: "#F59E0B", icon: "Star" },
  { tier: "Platinum", members: "1,284", points: "50,000+", reward: "$200/mo", color: "#A78BFA", icon: "Gem" },
  { tier: "Diamond", members: "482", points: "100,000+", reward: "$500/mo", color: "#8B5CF6", icon: "Crown" },
];

export const BONUS_LIST = [
  { id: "BNS-001", name: "Summer Performance Bonus", recipient: "Top 100 Hosts", amount: "$50K", status: "Distributed", color: "#27AE60" },
  { id: "BNS-002", name: "Agency Growth Bonus", recipient: "Top 20 Agencies", amount: "$100K", status: "Approved", color: "#2F80ED" },
  { id: "BNS-003", name: "Agent Recruitment Bonus", recipient: "Active Agents", amount: "$30K", status: "Pending", color: "#F2994A" },
  { id: "BNS-004", name: "VIP Loyalty Bonus", recipient: "Diamond VIP", amount: "$80K", status: "Distributed", color: "#27AE60" },
  { id: "BNS-005", name: "New User Welcome Bonus", recipient: "New Registrations", amount: "$15K", status: "Approved", color: "#2F80ED" },
];

export const COIN_REWARDS = [
  { id: "COIN-001", name: "Daily Login Coins", amount: "100 coins", recipients: "38,294", distributed: "3.8M coins", color: "#F2994A" },
  { id: "COIN-002", name: "Streaming Milestone Coins", amount: "500 coins", recipients: "8,471", distributed: "4.2M coins", color: "#F2994A" },
  { id: "COIN-003", name: "Gift Sending Coins", amount: "50 coins", recipients: "18,472", distributed: "924K coins", color: "#F2994A" },
  { id: "COIN-004", name: "Achievement Coins", amount: "1,000 coins", recipients: "4,847", distributed: "4.8M coins", color: "#F2994A" },
];

export const COUNTRY_REWARDS = [
  { country: "Egypt", flag: "🇪🇬", rewards: "$2.4M", earners: "8,247", rate: "84%", color: "#2F80ED" },
  { country: "India", flag: "🇮🇳", rewards: "$3.2M", earners: "12,847", rate: "89%", color: "#27AE60" },
  { country: "Saudi Arabia", flag: "🇸🇦", rewards: "$2.8M", earners: "6,128", rate: "91%", color: "#27AE60" },
  { country: "Nigeria", flag: "🇳🇬", rewards: "$1.4M", earners: "4,847", rate: "76%", color: "#F2994A" },
  { country: "Brazil", flag: "🇧🇷", rewards: "$1.2M", earners: "3,294", rate: "72%", color: "#F2994A" },
  { country: "Indonesia", flag: "🇮🇩", rewards: "$1.4M", earners: "4,128", rate: "78%", color: "#F2994A" },
];

export const TOP_EARNERS = [
  { rank: 1, name: "LunaStar", type: "Host", earnings: "$48K", country: "🇪🇬", color: "#F59E0B" },
  { rank: 2, name: "A. Patel", type: "Agent", earnings: "$28K", country: "🇮🇳", color: "#A78BFA" },
  { rank: 3, name: "Global Talent", type: "Agency", earnings: "$120K", country: "🇮🇳", color: "#8B5CF6" },
  { rank: 4, name: "DesertRose", type: "Host", earnings: "$42K", country: "🇸🇦", color: "#F59E0B" },
  { rank: 5, name: "F. Al-Rashid", type: "Agent", earnings: "$31K", country: "🇸🇦", color: "#A78BFA" },
  { rank: 6, name: "VYR-Diamond", type: "VIP User", earnings: "$5,326", country: "🇧🇷", color: "#8B5CF6" },
  { rank: 7, name: "OceanVoice", type: "Host", earnings: "$36K", country: "🇳🇬", color: "#F59E0B" },
  { rank: 8, name: "C. Okafor", type: "Agent", earnings: "$19K", country: "🇳🇬", color: "#A78BFA" },
];

export const AI_INSIGHTS = [
  { title: "Reward Performance", value: "Optimal", detail: "84.7% engagement rate", color: "#27AE60", icon: "TrendingUp" },
  { title: "Engagement Forecast", value: "+12.4%", detail: "Next 30 days projected", color: "#2F80ED", icon: "BarChart3" },
  { title: "Retention Forecast", value: "+8.2%", detail: "Loyalty programs effective", color: "#27AE60", icon: "Users" },
  { title: "Optimization", value: "Recommended", detail: "Increase VIP rewards by 15%", color: "#F2994A", icon: "Sparkles" },
];

export const ANALYTICS_DATA = [
  { metric: "Reward Distribution", value: "$12.4M", change: "+8.2%", color: "#27AE60", icon: "Gift" },
  { metric: "Campaign Performance", value: "94.2%", change: "+4.8%", color: "#2F80ED", icon: "PartyPopper" },
  { metric: "Claim Rate", value: "78.4%", change: "+3.2%", color: "#27AE60", icon: "CheckCircle" },
  { metric: "Budget Efficiency", value: "87.6%", change: "+2.1%", color: "#F59E0B", icon: "Wallet" },
  { metric: "Engagement Boost", value: "+12.4%", change: "MTD", color: "#2F80ED", icon: "TrendingUp" },
  { metric: "Retention Impact", value: "+8.2%", change: "MTD", color: "#27AE60", icon: "Users" },
];

export const REWARD_REPORTS = [
  "Daily Reward Report", "Weekly Reward Report", "Monthly Reward Report",
  "Reward Distribution Report", "Reward Budget Report", "Loyalty Program Report",
  "Achievement Report", "Event Reward Report", "VIP Reward Report",
  "Agency Reward Report", "Host Reward Report", "User Reward Report",
  "Reward Performance Report", "Reward ROI Report",
];

export const TEAM_MEMBERS = [
  { id: "TM-001", name: "Rachel Green", role: "Senior Reward Analyst", tasks: 47, score: "98%", status: "Active", color: "#2F80ED" },
  { id: "TM-002", name: "Omar Faruk", role: "Campaign Manager", tasks: 38, score: "94%", status: "Active", color: "#2F80ED" },
  { id: "TM-003", name: "Lisa Wang", role: "Loyalty Specialist", tasks: 32, score: "96%", status: "Active", color: "#2F80ED" },
  { id: "TM-004", name: "David Kim", role: "Achievement Coordinator", tasks: 29, score: "92%", status: "Active", color: "#2F80ED" },
  { id: "TM-005", name: "Aisha Khan", role: "VIP Rewards Manager", tasks: 35, score: "97%", status: "Active", color: "#2F80ED" },
];

export const SETTINGS_GROUPS = [
  { name: "Reward Rules", icon: "ScrollText", color: "#F59E0B" },
  { name: "Reward Limits", icon: "Gauge", color: "#F2994A" },
  { name: "Achievement Rules", icon: "Target", color: "#EF4444" },
  { name: "Loyalty Settings", icon: "Medal", color: "#F59E0B" },
  { name: "Bonus Settings", icon: "Gift", color: "#27AE60" },
  { name: "Event Reward Settings", icon: "PartyPopper", color: "#EC4899" },
  { name: "VIP Reward Settings", icon: "Crown", color: "#8B5CF6" },
  { name: "Approval Workflow", icon: "CheckCircle", color: "#2F80ED" },
];

export const EXCLUSIVE_TOOLS = [
  { label: "Emergency Reward Distribution", icon: "Zap", color: "#EB5757" },
  { label: "Global Campaign Launch", icon: "Rocket", color: "#EC4899" },
  { label: "Budget Optimization", icon: "Wallet", color: "#27AE60" },
  { label: "Mass Reward Approval", icon: "CheckCircle", color: "#2F80ED" },
  { label: "Reward Recovery System", icon: "RefreshCw", color: "#F59E0B" },
  { label: "Reward Fraud Review", icon: "ShieldAlert", color: "#EB5757" },
  { label: "Strategic Incentive Planning", icon: "BrainCircuit", color: "#8B5CF6" },
];

export const REWARD_PERMISSIONS_ALLOWED = [
  "Manage Rewards", "Approve Reward Distribution", "Create Reward Campaigns",
  "Manage Loyalty Programs", "Manage Achievement Programs", "Manage Bonus Systems",
  "Generate Reports", "Monitor Performance", "Analyze Reward Effectiveness",
  "Manage Reward Teams",
];

export const REWARD_PERMISSIONS_RESTRICTED = [
  "Owner Dashboard Access", "Global Finance Controls", "Super Admin Controls",
  "Platform Ownership Functions", "Security Administration Controls",
];

export const REPORTING_STRUCTURE = { reportsTo: "Business Manager", icon: "Building2", color: "#475569" };