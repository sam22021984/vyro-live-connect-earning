// Event Manager Dashboard data — VYRO Live Connect Earning
// Enterprise International Level Event Management & Competition Control Center

export const EVT_SECTIONS = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard", color: "#EC4899" },
  { id: "management", label: "Event Mgmt", icon: "Calendar", color: "#3B82F6" },
  { id: "competition", label: "Competitions", icon: "Trophy", color: "#F59E0B" },
  { id: "rewards", label: "Rewards", icon: "Gift", color: "#EC4899" },
  { id: "participation", label: "Participation", icon: "Users", color: "#10B981" },
  { id: "global", label: "Global Monitor", icon: "Globe", color: "#2F80ED" },
  { id: "host", label: "Host Events", icon: "Mic", color: "#EF4444" },
  { id: "agency", label: "Agency Events", icon: "Building2", color: "#8B5CF6" },
  { id: "vip", label: "VIP Events", icon: "Crown", color: "#F59E0B" },
  { id: "revenue", label: "Revenue", icon: "TrendingUp", color: "#27AE60" },
  { id: "rankings", label: "Rankings", icon: "Medal", color: "#F59E0B" },
  { id: "communication", label: "Comms", icon: "Mail", color: "#56CCF2" },
  { id: "festival", label: "Festivals", icon: "PartyPopper", color: "#EC4899" },
  { id: "country", label: "Country Perf", icon: "Globe", color: "#10B981" },
  { id: "ai", label: "AI Intel", icon: "BrainCircuit", color: "#8B5CF6" },
  { id: "analytics", label: "Analytics", icon: "BarChart3", color: "#2F80ED" },
  { id: "reports", label: "Reports", icon: "FileText", color: "#F59E0B" },
  { id: "team", label: "Team Mgmt", icon: "Users", color: "#2F80ED" },
  { id: "settings", label: "Settings", icon: "Settings", color: "#6B7280" },
  { id: "exclusive", label: "Exclusive Tools", icon: "Rocket", color: "#EC4899" },
  { id: "policy", label: "Policy", icon: "FileText", color: "#EC4899" },
];

export const EVT_KPIS = [
  { label: "Total Events", value: "2,847", change: "+8.4%", trend: "up", icon: "PartyPopper", color: "#EC4899" },
  { label: "Active Events", value: "184", change: "+12", trend: "up", icon: "Zap", color: "#EC4899" },
  { label: "Upcoming Events", value: "247", change: "+8", trend: "up", icon: "Clock", color: "#F2994A" },
  { label: "Completed Events", value: "2,416", change: "+47", trend: "up", icon: "CheckCircle", color: "#27AE60" },
  { label: "Event Participants", value: "1.8M", change: "+14.2%", trend: "up", icon: "Users", color: "#2F80ED" },
  { label: "Event Revenue", value: "$12.4M", change: "+18.4%", trend: "up", icon: "DollarSign", color: "#27AE60" },
  { label: "Rewards Distributed", value: "$4.8M", change: "+9.8%", trend: "up", icon: "Gift", color: "#EC4899" },
  { label: "Event Registrations", value: "284K", change: "+12.4%", trend: "up", icon: "UserPlus", color: "#10B981" },
  { label: "Engagement Rate", value: "84.7%", change: "+3.4%", trend: "up", icon: "Heart", color: "#EC4899" },
  { label: "Event Winners", value: "12,847", change: "+284", trend: "up", icon: "Trophy", color: "#F59E0B" },
  { label: "Event Countries", value: "84", change: "+4", trend: "up", icon: "Globe", color: "#2F80ED" },
  { label: "Global Growth Rate", value: "+22.4%", change: "+4.8%", trend: "up", icon: "TrendingUp", color: "#27AE60" },
];

export const EVT_QUICK_ACTIONS = [
  { label: "Create Event", icon: "Plus", color: "#EC4899" },
  { label: "Launch Event", icon: "Rocket", color: "#3B82F6" },
  { label: "Manage Rewards", icon: "Gift", color: "#F59E0B" },
  { label: "Generate Report", icon: "FileText", color: "#10B981" },
];

export const EVT_REALTIME_COUNTERS = [
  { label: "Active Events", value: "184", icon: "Zap", color: "#EC4899" },
  { label: "Live Participants", value: "284K", icon: "Users", color: "#2F80ED" },
  { label: "Rewards Today", value: "$48K", icon: "Gift", color: "#EC4899" },
  { label: "Revenue Today", value: "$124K", icon: "DollarSign", color: "#27AE60" },
  { label: "Registrations", value: "8,471", icon: "UserPlus", color: "#10B981" },
  { label: "Winners Today", value: "847", icon: "Trophy", color: "#F59E0B" },
];

export const EVT_LIVE_STREAM = [
  { text: "Event launched — Summer Festival 2026", time: "now", status: "info" },
  { text: "1,284 participants registered for PK Tournament", time: "12s", status: "success" },
  { text: "Reward distributed — $12,847 to LunaStar", time: "34s", status: "success" },
  { text: "Competition winner announced — DesertRose", time: "48s", status: "success" },
  { text: "VIP Event opened — Diamond Invitational", time: "1m", status: "info" },
  { text: "Event revenue milestone — $124K reached today", time: "1m", status: "success" },
  { text: "Country event completed — India Festival", time: "2m", status: "info" },
  { text: "Registration surge — +847 in 10 minutes", time: "2m", status: "success" },
  { text: "Agency competition started — Global Talent Cup", time: "3m", status: "info" },
  { text: "Engagement rate increased — 84.7% (+3.4%)", time: "3m", status: "success" },
];

export const EVT_EVENT_TYPES = [
  { type: "Seasonal Events", count: "247", participants: "284K", color: "#EC4899", icon: "Calendar" },
  { type: "Festival Events", count: "184", participants: "198K", color: "#F59E0B", icon: "PartyPopper" },
  { type: "PK Events", count: "428", participants: "847K", color: "#EF4444", icon: "Swords" },
  { type: "Host Events", count: "384", participants: "628K", color: "#EF4444", icon: "Mic" },
  { type: "Agency Events", count: "128", participants: "284K", color: "#8B5CF6", icon: "Building2" },
  { type: "VIP Events", count: "84", participants: "48K", color: "#F59E0B", icon: "Crown" },
  { type: "Community Events", count: "628", participants: "1.2M", color: "#10B981", icon: "Users" },
  { type: "Promotional Events", count: "147", participants: "384K", color: "#3B82F6", icon: "Megaphone" },
];

export const EVT_EVENTS = [
  { id: "EVT-001", name: "Summer Festival 2026", type: "Seasonal", participants: "284K", revenue: "$847K", status: "Active", color: "#27AE60" },
  { id: "EVT-002", name: "Weekend PK Tournament", type: "PK Event", participants: "128K", revenue: "$284K", status: "Active", color: "#27AE60" },
  { id: "EVT-003", name: "Eid Celebration 2026", type: "Festival", participants: "847K", revenue: "$1.2M", status: "Scheduled", color: "#F2994A" },
  { id: "EVT-004", name: "Host Star Competition", type: "Host Event", participants: "48K", revenue: "$184K", status: "Active", color: "#27AE60" },
  { id: "EVT-005", name: "Agency Cup Challenge", type: "Agency Event", participants: "28K", revenue: "$128K", status: "Completed", color: "#6B7280" },
  { id: "EVT-006", name: "Diamond VIP Invitational", type: "VIP Event", participants: "8K", revenue: "$248K", status: "Active", color: "#27AE60" },
];

export const EVT_COMPETITIONS = [
  { id: "CMP-001", name: "Summer PK Championship", type: "PK Competition", participants: "1,284", status: "Active", winner: "TBD", color: "#27AE60" },
  { id: "CMP-002", name: "Host Talent Show", type: "Talent Competition", participants: "847", status: "Active", winner: "TBD", color: "#27AE60" },
  { id: "CMP-003", name: "Agency Recruitment Drive", type: "Recruitment", participants: "284", status: "Completed", winner: "Global Talent", color: "#6B7280" },
  { id: "CMP-004", name: "Gifting Champion Cup", type: "Gifting Competition", participants: "2,847", status: "Active", winner: "TBD", color: "#27AE60" },
  { id: "CMP-005", name: "Country Battle Royale", type: "Country Competition", participants: "84", status: "Scheduled", winner: "TBD", color: "#F2994A" },
];

export const EVT_REWARD_TYPES = [
  { type: "Coin Rewards", total: "$2.4M", count: "847K", color: "#F59E0B", icon: "Coins" },
  { type: "Cash Rewards", total: "$847K", count: "12,847", color: "#27AE60", icon: "DollarSign" },
  { type: "Gift Rewards", total: "$628K", count: "284K", color: "#EC4899", icon: "Gift" },
  { type: "VIP Rewards", total: "$480K", count: "8,471", color: "#8B5CF6", icon: "Crown" },
  { type: "Achievement Rewards", total: "$284K", count: "48K", color: "#3B82F6", icon: "Award" },
  { type: "Trophy Rewards", total: "$184K", count: "12,847", color: "#F59E0B", icon: "Trophy" },
];

export const EVT_PARTICIPANTS = [
  { id: "PRT-001", name: "LunaStar", event: "Summer Festival", status: "Registered", date: "2026-07-03", color: "#27AE60" },
  { id: "PRT-002", name: "DesertRose", event: "PK Tournament", status: "Approved", date: "2026-07-02", color: "#27AE60" },
  { id: "PRT-003", name: "OceanVoice", event: "Host Star Competition", status: "Pending", date: "2026-07-02", color: "#F2994A" },
  { id: "PRT-004", name: "Global Talent", event: "Agency Cup", status: "Registered", date: "2026-07-01", color: "#27AE60" },
  { id: "PRT-005", name: "MountainEcho", event: "VIP Invitational", status: "Rejected", date: "2026-06-30", color: "#EB5757" },
];

export const EVT_GLOBAL_MONITORING = [
  { region: "Middle East", active: 47, participants: "384K", revenue: "$2.4M", color: "#2F80ED" },
  { region: "South Asia", active: 38, participants: "628K", revenue: "$3.8M", color: "#27AE60" },
  { region: "Africa", active: 24, participants: "248K", revenue: "$1.2M", color: "#F59E0B" },
  { region: "Southeast Asia", active: 32, participants: "428K", revenue: "$2.1M", color: "#10B981" },
  { region: "South America", active: 18, participants: "148K", revenue: "$847K", color: "#EC4899" },
  { region: "Europe", active: 12, participants: "84K", revenue: "$628K", color: "#8B5CF6" },
];

export const EVT_HOST_EVENTS = [
  { event: "Host Star Competition", host: "LunaStar", participants: "48K", engagement: "8.4%", status: "Active", color: "#27AE60" },
  { event: "Voice Talent Show", host: "DesertRose", participants: "28K", engagement: "7.2%", status: "Active", color: "#27AE60" },
  { event: "Music Battle Night", host: "OceanVoice", participants: "18K", engagement: "6.8%", status: "Completed", color: "#6B7280" },
  { event: "Comedy Live Fest", host: "MountainEcho", participants: "12K", engagement: "5.4%", status: "Scheduled", color: "#F2994A" },
];

export const EVT_AGENCY_EVENTS = [
  { event: "Agency Cup Challenge", agency: "Global Talent", participants: "28K", revenue: "$128K", status: "Completed", color: "#6B7280" },
  { event: "Recruitment Drive", agency: "Vyro Stars", participants: "18K", revenue: "$84K", status: "Active", color: "#27AE60" },
  { event: "Talent Showcase", agency: "Apex Agency", participants: "12K", revenue: "$48K", status: "Active", color: "#27AE60" },
  { event: "Growth Competition", agency: "Desert Voices", participants: "8K", revenue: "$28K", status: "Scheduled", color: "#F2994A" },
];

export const EVT_VIP_EVENTS = [
  { event: "Diamond Invitational", tier: "Diamond", participants: "8K", revenue: "$248K", status: "Active", color: "#27AE60" },
  { event: "Platinum Party", tier: "Platinum", participants: "12K", revenue: "$184K", status: "Active", color: "#27AE60" },
  { event: "Gold Gala", tier: "Gold", participants: "18K", revenue: "$128K", status: "Scheduled", color: "#F2994A" },
  { event: "Silver Soiree", tier: "Silver", participants: "24K", revenue: "$84K", status: "Completed", color: "#6B7280" },
];

export const EVT_REVENUE_SOURCES = [
  { source: "Event Revenue", amount: "$4.8M", percent: "38.7%", color: "#27AE60", icon: "DollarSign" },
  { source: "Registration Revenue", amount: "$2.4M", percent: "19.4%", color: "#2F80ED", icon: "UserPlus" },
  { source: "Gift Revenue", amount: "$3.2M", percent: "25.8%", color: "#EC4899", icon: "Gift" },
  { source: "Sponsorship Revenue", amount: "$2.0M", percent: "16.1%", color: "#F59E0B", icon: "Handshake" },
];

export const EVT_REVENUE_PERIODS = [
  { label: "Daily", value: "$124K", change: "+8.2%", color: "#27AE60" },
  { label: "Weekly", value: "$847K", change: "+6.4%", color: "#27AE60" },
  { label: "Monthly", value: "$4.2M", change: "+12.4%", color: "#27AE60" },
  { label: "Yearly", value: "$12.4M", change: "+18.4%", color: "#27AE60" },
];

export const EVT_RANKINGS = [
  { rank: 1, name: "LunaStar", category: "Top Host", score: "94.8K", country: "🇪🇬", color: "#F59E0B" },
  { rank: 2, name: "VYR-8472", category: "Top User", score: "84.2K", country: "🇸🇦", color: "#A78BFA" },
  { rank: 3, name: "Global Talent", category: "Top Agency", score: "248K", country: "🇮🇳", color: "#EB5757" },
  { rank: 4, name: "India", category: "Top Country", score: "628K", country: "🇮🇳", color: "#6B7280" },
  { rank: 5, name: "VYR-2847", category: "Top VIP", score: "48K", country: "🇸🇦", color: "#6B7280" },
  { rank: 6, name: "DesertRose", category: "Top Host", score: "68.4K", country: "🇸🇦", color: "#6B7280" },
];

export const EVT_COMM_TARGETS = [
  { label: "All Participants", icon: "Users", color: "#2F80ED" },
  { label: "Event Winners", icon: "Trophy", color: "#F59E0B" },
  { label: "Hosts", icon: "Mic", color: "#EF4444" },
  { label: "VIP Members", icon: "Crown", color: "#8B5CF6" },
];

export const EVT_COMM_TYPES = [
  { label: "Push Notification", icon: "Bell", color: "#2F80ED" },
  { label: "In-App Message", icon: "MessageSquare", color: "#27AE60" },
  { label: "Email Notice", icon: "Mail", color: "#F59E0B" },
  { label: "Broadcast", icon: "Megaphone", color: "#EC4899" },
];

export const EVT_FESTIVAL_EVENTS = [
  { name: "Ramadan Festival", type: "Religious", participants: "847K", revenue: "$2.4M", status: "Completed", color: "#6B7280" },
  { name: "Eid Celebration 2026", type: "Religious", participants: "847K", revenue: "$1.2M", status: "Scheduled", color: "#F2994A" },
  { name: "New Year Bash 2026", type: "New Year", participants: "1.2M", revenue: "$2.8M", status: "Completed", color: "#6B7280" },
  { name: "National Day", type: "National", participants: "384K", revenue: "$847K", status: "Scheduled", color: "#F2994A" },
  { name: "Platform Anniversary", type: "Anniversary", participants: "628K", revenue: "$1.4M", status: "Active", color: "#27AE60" },
  { name: "Global Summer Campaign", type: "Global", participants: "284K", revenue: "$847K", status: "Active", color: "#27AE60" },
];

export const EVT_COUNTRY_PERFORMANCE = [
  { country: "India", flag: "🇮🇳", events: "484", participants: "628K", revenue: "$3.8M", color: "#27AE60" },
  { country: "Egypt", flag: "🇪🇬", events: "284", participants: "384K", revenue: "$2.4M", color: "#2F80ED" },
  { country: "Saudi Arabia", flag: "🇸🇦", events: "147", participants: "248K", revenue: "$1.8M", color: "#10B981" },
  { country: "Nigeria", flag: "🇳🇬", events: "128", participants: "148K", revenue: "$847K", color: "#F59E0B" },
  { country: "Indonesia", flag: "🇮🇩", events: "184", participants: "228K", revenue: "$1.2M", color: "#27AE60" },
  { country: "Brazil", flag: "🇧🇷", events: "84", participants: "84K", revenue: "$628K", color: "#F59E0B" },
];

export const EVT_AI_INSIGHTS = [
  { title: "Success Prediction", value: "92.4%", detail: "Summer Festival predicted success rate", color: "#27AE60", icon: "TrendingUp" },
  { title: "Participation Forecast", value: "1.2M", detail: "Expected participants next month", color: "#2F80ED", icon: "Users" },
  { title: "Revenue Forecast", value: "$16.8M", detail: "Projected annual event revenue", color: "#27AE60", icon: "DollarSign" },
  { title: "Engagement Analysis", value: "84.7%", detail: "Average event engagement rate", color: "#EC4899", icon: "Heart" },
  { title: "Trend Detection", value: "Rising", detail: "PK competition trending up", color: "#27AE60", icon: "TrendingUp" },
  { title: "Optimal Timing", value: "7-11 PM", detail: "Peak event participation window", color: "#F59E0B", icon: "Clock" },
];

export const EVT_ANALYTICS = [
  { metric: "Participation Growth", value: "+14.2%", change: "MTD", color: "#10B981", icon: "Users" },
  { metric: "Revenue Growth", value: "+18.4%", change: "MTD", color: "#27AE60", icon: "DollarSign" },
  { metric: "Engagement Growth", value: "+9.8%", change: "MTD", color: "#EC4899", icon: "Heart" },
  { metric: "Event Success Rate", value: "94.8%", change: "+2.4%", color: "#27AE60", icon: "CheckCircle" },
  { metric: "Avg Participants", value: "628", change: "+8.4%", color: "#2F80ED", icon: "Users" },
  { metric: "Reward ROI", value: "384%", change: "+12.4%", color: "#F59E0B", icon: "TrendingUp" },
];

export const EVT_REPORTS = [
  "Daily Event Report", "Weekly Event Report", "Monthly Event Report", "Event Revenue Report",
  "Event Participation Report", "Competition Report", "Event Rewards Report", "Event Ranking Report",
  "Host Event Report", "Agency Event Report", "VIP Event Report", "Country Event Performance Report",
  "Event Growth Report", "Event ROI Report",
];

export const EVT_TEAM_MEMBERS = [
  { id: "TM-001", name: "Sophia Martinez", role: "Event Lead", tasks: 47, score: "98%", status: "Active", color: "#2F80ED" },
  { id: "TM-002", name: "Ahmed Ali", role: "Competition Manager", tasks: 38, score: "95%", status: "Active", color: "#2F80ED" },
  { id: "TM-003", name: "Lisa Wang", role: "Rewards Coordinator", tasks: 42, score: "96%", status: "Active", color: "#2F80ED" },
  { id: "TM-004", name: "Carlos Rivera", role: "Analytics Specialist", tasks: 35, score: "93%", status: "Active", color: "#2F80ED" },
  { id: "TM-005", name: "Nadia Hassan", role: "Participant Manager", tasks: 29, score: "95%", status: "Active", color: "#2F80ED" },
];

export const EVT_SETTINGS_GROUPS = [
  { name: "Event Rules", icon: "Calendar", color: "#3B82F6" },
  { name: "Reward Rules", icon: "Gift", color: "#EC4899" },
  { name: "Competition Rules", icon: "Trophy", color: "#F59E0B" },
  { name: "Registration Rules", icon: "UserPlus", color: "#10B981" },
  { name: "Ranking Rules", icon: "Medal", color: "#8B5CF6" },
  { name: "Participation Rules", icon: "Users", color: "#2F80ED" },
  { name: "Notification Settings", icon: "Bell", color: "#F2994A" },
  { name: "Approval Workflow", icon: "CheckCircle", color: "#2F80ED" },
];

export const EVT_EXCLUSIVE_TOOLS = [
  { label: "Emergency Event Termination", icon: "Zap", color: "#EB5757" },
  { label: "Global Event Launch", icon: "Rocket", color: "#3B82F6" },
  { label: "Mass Reward Distribution", icon: "Gift", color: "#EC4899" },
  { label: "Event Optimization", icon: "TrendingUp", color: "#27AE60" },
  { label: "Revenue Optimization", icon: "DollarSign", color: "#27AE60" },
  { label: "Strategic Event Planning", icon: "BrainCircuit", color: "#8B5CF6" },
  { label: "Event Recovery Management", icon: "LifeBuoy", color: "#2F80ED" },
];

export const EVT_REPORTING_STRUCTURE = { reportsTo: "Business Manager", icon: "Building2", color: "#475569" };