// PK Manager Dashboard data — VYRO Live Connect Earning
// Enterprise International Level PK Battle Management & Competition Control Center

export const PK_SECTIONS = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard", color: "#EF4444" },
  { id: "battles", label: "Battle Mgmt", icon: "Swords", color: "#EF4444" },
  { id: "tournaments", label: "Tournaments", icon: "Trophy", color: "#F59E0B" },
  { id: "events", label: "PK Events", icon: "PartyPopper", color: "#EC4899" },
  { id: "rewards", label: "PK Rewards", icon: "Gift", color: "#27AE60" },
  { id: "rankings", label: "Rankings", icon: "Award", color: "#F59E0B" },
  { id: "monitoring", label: "Live Monitor", icon: "Globe", color: "#2F80ED" },
  { id: "fairplay", label: "AI Fair Play", icon: "BrainCircuit", color: "#8B5CF6" },
  { id: "disputes", label: "Disputes", icon: "AlertTriangle", color: "#EB5757" },
  { id: "revenue", label: "Revenue", icon: "DollarSign", color: "#27AE60" },
  { id: "achievements", label: "Achievements", icon: "Medal", color: "#F59E0B" },
  { id: "hostperf", label: "Host Perf", icon: "Mic", color: "#EB5757" },
  { id: "agencyperf", label: "Agency Perf", icon: "Building2", color: "#8B5CF6" },
  { id: "countryperf", label: "Country Perf", icon: "Globe", color: "#2F80ED" },
  { id: "analytics", label: "Analytics", icon: "BarChart3", color: "#2F80ED" },
  { id: "communication", label: "Comms", icon: "Megaphone", color: "#56CCF2" },
  { id: "reports", label: "Reports", icon: "FileText", color: "#F59E0B" },
  { id: "team", label: "Team Mgmt", icon: "Users", color: "#2F80ED" },
  { id: "settings", label: "Settings", icon: "Settings", color: "#6B7280" },
  { id: "exclusive", label: "Exclusive Tools", icon: "Rocket", color: "#EC4899" },
  { id: "policy", label: "Policy", icon: "FileText", color: "#EF4444" },
];

export const PK_KPIS = [
  { label: "Total PK Battles", value: "48,294", change: "+12.4%", trend: "up", icon: "Swords", color: "#EF4444" },
  { label: "Active PK Battles", value: "342", change: "+18", trend: "up", icon: "Swords", color: "#EF4444" },
  { label: "Completed PK Battles", value: "47,952", change: "+8.2%", trend: "up", icon: "CheckCircle", color: "#27AE60" },
  { label: "Daily PK Revenue", value: "$84K", change: "+6.4%", trend: "up", icon: "DollarSign", color: "#27AE60" },
  { label: "Monthly PK Revenue", value: "$2.4M", change: "+9.8%", trend: "up", icon: "Calendar", color: "#27AE60" },
  { label: "PK Participants", value: "284,719", change: "+14.2%", trend: "up", icon: "Users", color: "#2F80ED" },
  { label: "Active PK Rooms", value: "1,847", change: "+47", trend: "up", icon: "Radio", color: "#EF4444" },
  { label: "Tournament Participants", value: "12,847", change: "+8.4%", trend: "up", icon: "Trophy", color: "#F59E0B" },
  { label: "PK Rewards Distributed", value: "$1.8M", change: "+7.2%", trend: "up", icon: "Gift", color: "#27AE60" },
  { label: "PK Reports", value: "247", change: "+12", trend: "up", icon: "FileText", color: "#F2994A" },
  { label: "Fair Play Score", value: "96.8%", change: "+1.4%", trend: "up", icon: "ShieldCheck", color: "#27AE60" },
  { label: "Global PK Growth Rate", value: "+18.2%", change: "+3.4%", trend: "up", icon: "TrendingUp", color: "#2F80ED" },
];

export const PK_QUICK_ACTIONS = [
  { label: "Create PK Event", icon: "Plus", color: "#EF4444" },
  { label: "Launch Tournament", icon: "Trophy", color: "#F59E0B" },
  { label: "Monitor Battles", icon: "Swords", color: "#2F80ED" },
  { label: "Generate Report", icon: "FileText", color: "#F59E0B" },
];

export const PK_REALTIME_COUNTERS = [
  { label: "Live Battles", value: "342", icon: "Swords", color: "#EF4444" },
  { label: "Participants", value: "8,471", icon: "Users", color: "#2F80ED" },
  { label: "Active Tournaments", value: "28", icon: "Trophy", color: "#F59E0B" },
  { label: "Gifts/min", value: "1,284", icon: "Gift", color: "#27AE60" },
  { label: "Revenue Today", value: "$84K", icon: "DollarSign", color: "#27AE60" },
  { label: "Open Disputes", value: "47", icon: "AlertTriangle", color: "#EB5757" },
];

export const PK_LIVE_STREAM = [
  { type: "battle", text: "PK battle started — LunaStar vs DesertRose", time: "now", status: "info" },
  { type: "gift", text: "Gift burst — 2,847 coins to LunaStar", time: "12s", status: "success" },
  { type: "tournament", text: "Tournament match completed — Bracket #4", time: "34s", status: "success" },
  { type: "revenue", text: "Daily PK revenue milestone — $84K reached", time: "48s", status: "success" },
  { type: "winner", text: "PK winner announced — OceanVoice (8,472 pts)", time: "1m", status: "info" },
  { type: "fairplay", text: "Suspicious activity flagged — Battle #PKB-4820", time: "1m", status: "warning" },
  { type: "dispute", text: "Dispute filed — Host #VYR-2918", time: "2m", status: "warning" },
  { type: "reward", text: "PK reward distributed — $500 to LunaStar", time: "2m", status: "success" },
  { type: "event", text: "PK event launched — Summer Championship", time: "3m", status: "info" },
  { type: "achievement", text: "PK achievement unlocked — 100 Battle Wins", time: "3m", status: "success" },
];

export const PK_BATTLES = [
  { id: "PKB-4821", hostA: "LunaStar", hostB: "DesertRose", duration: "8m 24s", gifts: "12,847", revenue: "$1,284", winner: "LunaStar", country: "🇪🇬", status: "Active", color: "#27AE60" },
  { id: "PKB-4820", hostA: "OceanVoice", hostB: "MountainEcho", duration: "6m 12s", gifts: "8,294", revenue: "$829", winner: "MountainEcho", country: "🇳🇬", status: "Active", color: "#27AE60" },
  { id: "PKB-4819", hostA: "SilverMoon", hostB: "GoldenDawn", duration: "10m 0s", gifts: "15,128", revenue: "$1,512", winner: "GoldenDawn", country: "🇸🇦", status: "Ended", color: "#6B7280" },
  { id: "PKB-4818", hostA: "LunaStar", hostB: "OceanVoice", duration: "9m 47s", gifts: "18,294", revenue: "$1,829", winner: "LunaStar", country: "🇪🇬", status: "Ended", color: "#6B7280" },
  { id: "PKB-4817", hostA: "DesertRose", hostB: "GoldenDawn", duration: "7m 33s", gifts: "10,847", revenue: "$1,085", winner: "DesertRose", country: "🇸🇦", status: "Cancelled", color: "#EB5757" },
  { id: "PKB-4816", hostA: "MountainEcho", hostB: "SilverMoon", duration: "5m 18s", gifts: "6,294", revenue: "$629", winner: "MountainEcho", country: "🇮🇩", status: "Ended", color: "#6B7280" },
];

export const PK_TOURNAMENTS = [
  { id: "TRN-001", name: "Summer Host Championship", participants: "2,847", prize: "$50K", status: "Active", color: "#27AE60" },
  { id: "TRN-002", name: "Agency League Cup", participants: "1,205", prize: "$30K", status: "Active", color: "#27AE60" },
  { id: "TRN-003", name: "Global PK Masters", participants: "4,128", prize: "$80K", status: "Scheduled", color: "#F2994A" },
  { id: "TRN-004", name: "Champions Trophy", participants: "512", prize: "$100K", status: "Planning", color: "#F2994A" },
  { id: "TRN-005", name: "Rising Stars Cup", participants: "3,847", prize: "$20K", status: "Active", color: "#27AE60" },
];

export const PK_EVENTS = [
  { id: "EVT-001", name: "Summer PK Festival", type: "Festival", participants: "12,847", status: "Active", color: "#27AE60" },
  { id: "EVT-002", name: "Weekend Battle Royale", type: "Competition", participants: "8,294", status: "Active", color: "#27AE60" },
  { id: "EVT-003", name: "Country Cup Challenge", type: "Tournament", participants: "6,128", status: "Scheduled", color: "#F2994A" },
  { id: "EVT-004", name: "VIP PK Invitational", type: "Invitational", participants: "1,284", status: "Planning", color: "#F2994A" },
  { id: "EVT-005", name: "New Year PK Bash", type: "Celebration", participants: "18,472", status: "Completed", color: "#6B7280" },
];

export const PK_REWARD_TYPES = [
  { type: "Coin Rewards", count: "12,847", distributed: "$420K", color: "#F2994A", icon: "Coins" },
  { type: "Cash Rewards", count: "8,294", distributed: "$840K", color: "#27AE60", icon: "DollarSign" },
  { type: "Trophy Rewards", count: "1,847", distributed: "$280K", color: "#F59E0B", icon: "Trophy" },
  { type: "Event Rewards", count: "3,472", distributed: "$180K", color: "#EC4899", icon: "PartyPopper" },
  { type: "Ranking Rewards", count: "2,184", distributed: "$120K", color: "#8B5CF6", icon: "Award" },
  { type: "VIP Rewards", count: "892", distributed: "$160K", color: "#8B5CF6", icon: "Crown" },
];

export const PK_RANKINGS = [
  { rank: 1, name: "LunaStar", type: "Host", wins: 284, revenue: "$48K", country: "🇪🇬", color: "#F59E0B" },
  { rank: 2, name: "DesertRose", type: "Host", wins: 247, revenue: "$42K", country: "🇸🇦", color: "#A78BFA" },
  { rank: 3, name: "Global Talent", type: "Agency", wins: 184, revenue: "$120K", country: "🇮🇳", color: "#8B5CF6" },
  { rank: 4, name: "OceanVoice", type: "Host", wins: 218, revenue: "$36K", country: "🇳🇬", color: "#EB5757" },
  { rank: 5, name: "MountainEcho", type: "Host", wins: 192, revenue: "$28K", country: "🇮🇩", color: "#EB5757" },
  { rank: 6, name: "Vyro Stars", type: "Agency", wins: 147, revenue: "$84K", country: "🇪🇬", color: "#8B5CF6" },
  { rank: 7, name: "GoldenDawn", type: "Host", wins: 168, revenue: "$18K", country: "🇸🇦", color: "#EB5757" },
  { rank: 8, name: "Apex Agency", type: "Agency", wins: 128, revenue: "$62K", country: "🇳🇬", color: "#8B5CF6" },
];

export const PK_GLOBAL_MONITORS = [
  { region: "Middle East", battles: "8,247", live: "84", revenue: "$840K", color: "#2F80ED" },
  { region: "South Asia", battles: "12,847", live: "128", revenue: "$1.2M", color: "#27AE60" },
  { region: "Africa", battles: "6,128", live: "47", revenue: "$420K", color: "#F59E0B" },
  { region: "Southeast Asia", battles: "4,847", live: "38", revenue: "$380K", color: "#A78BFA" },
  { region: "South America", battles: "3,294", live: "28", revenue: "$240K", color: "#EC4899" },
];

export const FAIR_PLAY_INSIGHTS = [
  { title: "Fake Gift Detection", value: "24 flagged", detail: "0.05% of total gifts", color: "#EB5757", icon: "AlertTriangle" },
  { title: "Bot Detection", value: "147 banned", detail: "0.3% of participants", color: "#EB5757", icon: "Bot" },
  { title: "Suspicious Activity", value: "8 cases", detail: "Under investigation", color: "#F2994A", icon: "Eye" },
  { title: "Manipulation Detection", value: "3 flagged", detail: "Manual review needed", color: "#F2994A", icon: "Unlink" },
  { title: "Multi-Account Detection", value: "29 blocked", detail: "Linked accounts found", color: "#EB5757", icon: "Users" },
  { title: "Fair Play Score", value: "96.8%", detail: "Platform integrity", color: "#27AE60", icon: "ShieldCheck" },
];

export const PK_DISPUTES = [
  { id: "DSP-247", complainant: "HST-005 (SilverMoon)", target: "PKB-4817", type: "Unfair Result", severity: "High", status: "Investigating", date: "2026-07-02", color: "#EB5757" },
  { id: "DSP-246", complainant: "AGY-005 (Ocean Media)", target: "PKB-4810", type: "Gift Manipulation", severity: "Critical", status: "Escalated", date: "2026-07-01", color: "#EB5757" },
  { id: "DSP-245", complainant: "VYR-8472", target: "PKB-4809", type: "Bot Usage", severity: "Medium", status: "Warning Issued", date: "2026-07-01", color: "#F2994A" },
  { id: "DSP-244", complainant: "HST-012", target: "PKB-4808", type: "Disconnect Dispute", severity: "Low", status: "Resolved", date: "2026-06-30", color: "#27AE60" },
  { id: "DSP-243", complainant: "AGT-007", target: "PKB-4807", type: "Score Discrepancy", severity: "Medium", status: "Closed", date: "2026-06-29", color: "#6B7280" },
];

export const PK_REVENUE_DATA = [
  { source: "Battle Revenue", amount: "$1.4M", percent: "58.3%", color: "#EF4444", icon: "Swords" },
  { source: "Tournament Revenue", amount: "$480K", percent: "20.0%", color: "#F59E0B", icon: "Trophy" },
  { source: "Event Revenue", amount: "$240K", percent: "10.0%", color: "#EC4899", icon: "PartyPopper" },
  { source: "Gift Revenue", amount: "$280K", percent: "11.7%", color: "#27AE60", icon: "Gift" },
];

export const PK_REVENUE_PERIODS = [
  { label: "Daily", value: "$84K" },
  { label: "Weekly", value: "$580K" },
  { label: "Monthly", value: "$2.4M" },
  { label: "Yearly", value: "$28.4M" },
];

export const PK_ACHIEVEMENTS = [
  { id: "ACH-001", name: "First PK Win", earners: "18,294", reward: "$20", status: "Active", color: "#27AE60" },
  { id: "ACH-002", name: "100 Battle Wins", earners: "1,847", reward: "$500", status: "Active", color: "#27AE60" },
  { id: "ACH-003", name: "Tournament Champion", earners: "247", reward: "$2,000", status: "Active", color: "#27AE60" },
  { id: "ACH-004", name: "Undefeated Streak (10)", earners: "384", reward: "$1,000", status: "Active", color: "#27AE60" },
  { id: "ACH-005", name: "Gift Champion", earners: "628", reward: "$800", status: "Active", color: "#27AE60" },
  { id: "ACH-006", name: "Global Top 10", earners: "10", reward: "$5,000", status: "Draft", color: "#F2994A" },
];

export const HOST_PK_PERFORMANCE = [
  { id: "HST-001", name: "LunaStar", wins: 284, losses: 47, winRate: "85.8%", revenue: "$48K", rating: "98", color: "#27AE60" },
  { id: "HST-002", name: "DesertRose", wins: 247, losses: 62, winRate: "79.9%", revenue: "$42K", rating: "96", color: "#27AE60" },
  { id: "HST-003", name: "OceanVoice", wins: 218, losses: 84, winRate: "72.2%", revenue: "$36K", rating: "94", color: "#27AE60" },
  { id: "HST-004", name: "MountainEcho", wins: 192, losses: 88, winRate: "68.6%", revenue: "$28K", rating: "92", color: "#27AE60" },
  { id: "HST-005", name: "SilverMoon", wins: 168, losses: 128, winRate: "56.8%", revenue: "$24K", rating: "89", color: "#F2994A" },
  { id: "HST-006", name: "GoldenDawn", wins: 168, losses: 92, winRate: "64.6%", revenue: "$18K", rating: "90", color: "#27AE60" },
];

export const AGENCY_PK_PERFORMANCE = [
  { id: "AGY-001", name: "Vyro Stars", wins: 147, winRate: "78.2%", revenue: "$84K", rank: 3, color: "#27AE60" },
  { id: "AGY-002", name: "Global Talent", wins: 184, winRate: "82.4%", revenue: "$120K", rank: 1, color: "#27AE60" },
  { id: "AGY-003", name: "Apex Agency", wins: 128, winRate: "72.6%", revenue: "$62K", rank: 4, color: "#27AE60" },
  { id: "AGY-004", name: "Desert Voices", wins: 162, winRate: "79.8%", revenue: "$98K", rank: 2, color: "#27AE60" },
  { id: "AGY-005", name: "Ocean Media", wins: 84, winRate: "58.4%", revenue: "$0", rank: 5, color: "#EB5757" },
];

export const COUNTRY_PK_PERFORMANCE = [
  { country: "Egypt", flag: "🇪🇬", battles: "8,247", wins: "4,128", revenue: "$840K", rate: "50.1%", color: "#2F80ED" },
  { country: "India", flag: "🇮🇳", battles: "12,847", wins: "6,847", revenue: "$1.2M", rate: "53.3%", color: "#27AE60" },
  { country: "Saudi Arabia", flag: "🇸🇦", battles: "6,128", wins: "3,294", revenue: "$680K", rate: "53.7%", color: "#27AE60" },
  { country: "Nigeria", flag: "🇳🇬", battles: "4,847", wins: "2,418", revenue: "$420K", rate: "49.9%", color: "#F2994A" },
  { country: "Brazil", flag: "🇧🇷", battles: "3,294", wins: "1,628", revenue: "$240K", rate: "49.4%", color: "#F2994A" },
  { country: "Indonesia", flag: "🇮🇩", battles: "4,128", wins: "2,184", revenue: "$380K", rate: "52.9%", color: "#27AE60" },
];

export const PK_ANALYTICS_DATA = [
  { metric: "Battle Growth", value: "+12.4%", change: "MTD", color: "#EF4444", icon: "Swords" },
  { metric: "Revenue Growth", value: "+9.8%", change: "MTD", color: "#27AE60", icon: "DollarSign" },
  { metric: "Participation Rate", value: "84.7%", change: "+3.2%", color: "#2F80ED", icon: "Users" },
  { metric: "Win Rate Avg", value: "68.4%", change: "+1.8%", color: "#F59E0B", icon: "Trophy" },
  { metric: "Fair Play Index", value: "96.8", change: "+1.4", color: "#27AE60", icon: "ShieldCheck" },
  { metric: "Engagement Rate", value: "91.2%", change: "+4.1%", color: "#56CCF2", icon: "Activity" },
];

export const PK_COMM_TARGETS = [
  { label: "PK Hosts", icon: "Mic", color: "#EB5757" },
  { label: "Agencies", icon: "Building2", color: "#8B5CF6" },
  { label: "Tournament Players", icon: "Trophy", color: "#F59E0B" },
  { label: "All Participants", icon: "Users", color: "#2F80ED" },
];

export const PK_COMM_TYPES = [
  { label: "Push Notification", icon: "Bell", color: "#2F80ED" },
  { label: "In-App Message", icon: "MessageSquare", color: "#27AE60" },
  { label: "Battle Alert", icon: "Swords", color: "#EF4444" },
  { label: "Broadcast", icon: "Megaphone", color: "#F2994A" },
];

export const PK_REPORTS = [
  "Daily PK Report", "Weekly PK Report", "Monthly PK Report",
  "PK Revenue Report", "PK Battle Report", "PK Tournament Report",
  "PK Event Report", "PK Rewards Report", "PK Ranking Report",
  "PK Fair Play Report", "Host PK Performance Report", "Agency PK Performance Report",
  "Country PK Performance Report", "PK Growth Report",
];

export const PK_TEAM_MEMBERS = [
  { id: "TM-001", name: "Marcus Chen", role: "PK Operations Lead", tasks: 47, score: "98%", status: "Active", color: "#2F80ED" },
  { id: "TM-002", name: "Sara Al-Amin", role: "Tournament Manager", tasks: 38, score: "94%", status: "Active", color: "#2F80ED" },
  { id: "TM-003", name: "Raj Patel", role: "Fair Play Analyst", tasks: 32, score: "96%", status: "Active", color: "#2F80ED" },
  { id: "TM-004", name: "Emily Cruz", role: "Dispute Resolution", tasks: 29, score: "92%", status: "Active", color: "#2F80ED" },
  { id: "TM-005", name: "Khaled Omar", role: "Event Coordinator", tasks: 35, score: "97%", status: "Active", color: "#2F80ED" },
];

export const PK_SETTINGS_GROUPS = [
  { name: "Battle Rules", icon: "Swords", color: "#EF4444" },
  { name: "Tournament Rules", icon: "Trophy", color: "#F59E0B" },
  { name: "Reward Rules", icon: "Gift", color: "#27AE60" },
  { name: "Ranking Rules", icon: "Award", color: "#8B5CF6" },
  { name: "Fair Play Rules", icon: "ShieldCheck", color: "#2F80ED" },
  { name: "Event Rules", icon: "PartyPopper", color: "#EC4899" },
  { name: "Duration Settings", icon: "Clock", color: "#F2994A" },
  { name: "Approval Workflow", icon: "CheckCircle", color: "#2F80ED" },
];

export const PK_EXCLUSIVE_TOOLS = [
  { label: "Emergency Battle Termination", icon: "Zap", color: "#EB5757" },
  { label: "Global Tournament Launch", icon: "Rocket", color: "#EC4899" },
  { label: "Reward Optimization", icon: "Gift", color: "#27AE60" },
  { label: "Fair Play Enforcement", icon: "ShieldCheck", color: "#2F80ED" },
  { label: "Revenue Optimization", icon: "DollarSign", color: "#27AE60" },
  { label: "Anti-Cheat Investigation", icon: "Search", color: "#EB5757" },
  { label: "Strategic PK Planning", icon: "BrainCircuit", color: "#8B5CF6" },
];

export const PK_PERMISSIONS_ALLOWED = [
  "Manage PK Battles", "Manage PK Tournaments", "Manage PK Events",
  "Manage PK Rankings", "Manage PK Rewards", "Monitor PK Revenue",
  "Resolve Disputes", "Generate Reports", "Monitor Fair Play", "Manage PK Teams",
];

export const PK_PERMISSIONS_RESTRICTED = [
  "Owner Dashboard Access", "Global Finance Controls", "Super Admin Controls",
  "Ownership Functions", "Security Administration Controls",
];

export const PK_REPORTING_STRUCTURE = { reportsTo: "Business Manager", icon: "Building2", color: "#475569" };