// Business Manager Dashboard data — VYRO Live Connect Earning
// Enterprise International Level Business Operations Control Center

export const BIZ_SECTIONS = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard", color: "#F59E0B" },
  { id: "team", label: "Team Mgmt", icon: "Users", color: "#2F80ED" },
  { id: "hosts", label: "Host Perf", icon: "Mic", color: "#EF4444" },
  { id: "agents", label: "Agents", icon: "Handshake", color: "#8B5CF6" },
  { id: "agencies", label: "Agencies", icon: "Building2", color: "#8B5CF6" },
  { id: "growth", label: "Growth", icon: "TrendingUp", color: "#10B981" },
  { id: "targets", label: "Targets", icon: "Target", color: "#EC4899" },
  { id: "revenue", label: "Revenue", icon: "DollarSign", color: "#27AE60" },
  { id: "campaigns", label: "Campaigns", icon: "Megaphone", color: "#3B82F6" },
  { id: "events", label: "Events", icon: "PartyPopper", color: "#EC4899" },
  { id: "applications", label: "Applications", icon: "FileCheck", color: "#F59E0B" },
  { id: "communication", label: "Comms", icon: "Mail", color: "#56CCF2" },
  { id: "analytics", label: "Analytics", icon: "BarChart3", color: "#2F80ED" },
  { id: "ai", label: "BI Intel", icon: "BrainCircuit", color: "#8B5CF6" },
  { id: "performance", label: "Performance", icon: "Trophy", color: "#F59E0B" },
  { id: "reports", label: "Reports", icon: "FileText", color: "#F59E0B" },
  { id: "documents", label: "Documents", icon: "FolderOpen", color: "#3B82F6" },
  { id: "operations", label: "Operations", icon: "Settings", color: "#6B7280" },
  { id: "notifications", label: "Notifications", icon: "Bell", color: "#F2994A" },
  { id: "exclusive", label: "Exclusive Tools", icon: "Rocket", color: "#EC4899" },
];

export const BIZ_KPIS = [
  { label: "Total Active Hosts", value: "12,847", change: "+8.4%", trend: "up", icon: "Mic", color: "#EF4444" },
  { label: "Total Active Agents", value: "847", change: "+4.8%", trend: "up", icon: "Handshake", color: "#8B5CF6" },
  { label: "Total Agencies", value: "184", change: "+6.2%", trend: "up", icon: "Building2", color: "#8B5CF6" },
  { label: "Daily Revenue", value: "$184K", change: "+8.4%", trend: "up", icon: "DollarSign", color: "#27AE60" },
  { label: "Monthly Revenue", value: "$5.8M", change: "+9.8%", trend: "up", icon: "CalendarRange", color: "#27AE60" },
  { label: "Business Growth Rate", value: "+18.2%", change: "+3.4%", trend: "up", icon: "TrendingUp", color: "#10B981" },
  { label: "Active Campaigns", value: "284", change: "+12", trend: "up", icon: "Megaphone", color: "#3B82F6" },
  { label: "Business Targets", value: "94.8%", change: "+2.4%", trend: "up", icon: "Target", color: "#EC4899" },
  { label: "Team Performance", value: "96.4%", change: "+1.8%", trend: "up", icon: "Users", color: "#2F80ED" },
  { label: "Conversion Rate", value: "8.4%", change: "+1.2%", trend: "up", icon: "Percent", color: "#F59E0B" },
];

export const BIZ_QUICK_ACTIONS = [
  { label: "Create Campaign", icon: "Megaphone", color: "#3B82F6" },
  { label: "Review Targets", icon: "Target", color: "#EC4899" },
  { label: "Generate Report", icon: "FileText", color: "#F59E0B" },
  { label: "View Analytics", icon: "BarChart3", color: "#27AE60" },
];

export const BIZ_REALTIME_COUNTERS = [
  { label: "Revenue Today", value: "$184K", icon: "DollarSign", color: "#27AE60" },
  { label: "Active Hosts", value: "2,847", icon: "Mic", color: "#EF4444" },
  { label: "Active Agencies", value: "147", icon: "Building2", color: "#8B5CF6" },
  { label: "Campaigns", value: "284", icon: "Megaphone", color: "#3B82F6" },
  { label: "Targets Hit", value: "94.8%", icon: "Target", color: "#EC4899" },
  { label: "Open Apps", value: "1,847", icon: "FileCheck", color: "#F59E0B" },
];

export const BIZ_LIVE_STREAM = [
  { text: "Revenue milestone — $184K reached today", time: "now", status: "success" },
  { text: "New host onboarded — LunaStar approved", time: "12s", status: "success" },
  { text: "Campaign launched — Summer Recruitment Drive", time: "34s", status: "info" },
  { text: "Agency performance reviewed — Global Talent", time: "48s", status: "info" },
  { text: "Monthly target 94.8% achieved", time: "1m", status: "success" },
  { text: "Agent target assigned — TM-007: $50K", time: "1m", status: "info" },
  { text: "Team performance update — 96.4%", time: "2m", status: "success" },
  { text: "Application submitted — Apex Agency", time: "2m", status: "info" },
  { text: "Growth rate improved — +18.2% (+3.4%)", time: "3m", status: "success" },
  { text: "Event scheduled — Business Strategy Summit", time: "3m", status: "info" },
];

export const BIZ_TEAM_MEMBERS = [
  { id: "TM-001", name: "Olivia Park", role: "Business Lead", tasks: 47, rating: "98%", status: "Active", color: "#2F80ED" },
  { id: "TM-002", name: "James Lee", role: "Agency Manager", tasks: 38, rating: "94%", status: "Active", color: "#2F80ED" },
  { id: "TM-003", name: "Priya Sharma", role: "Host Coordinator", tasks: 42, rating: "96%", status: "Active", color: "#2F80ED" },
  { id: "TM-004", name: "Daniel Kim", role: "Campaign Manager", tasks: 35, rating: "92%", status: "Active", color: "#2F80ED" },
  { id: "TM-005", name: "Fatima Hassan", role: "Analytics Lead", tasks: 29, rating: "95%", status: "Active", color: "#2F80ED" },
];

export const BIZ_HOST_PERF = [
  { name: "LunaStar", revenue: "$48K", followers: "284K", hours: "184h", gifts: "$12K", status: "Top Performer", color: "#27AE60" },
  { name: "DesertRose", revenue: "$42K", followers: "198K", hours: "168h", gifts: "$10K", status: "Top Performer", color: "#27AE60" },
  { name: "OceanVoice", revenue: "$36K", followers: "128K", hours: "142h", gifts: "$8K", status: "Good", color: "#3B82F6" },
  { name: "MountainEcho", revenue: "$24K", followers: "84K", hours: "98h", gifts: "$5K", status: "Average", color: "#F2994A" },
  { name: "GoldenDawn", revenue: "$12K", followers: "48K", hours: "62h", gifts: "$2K", status: "Needs Improvement", color: "#EB5757" },
];

export const BIZ_AGENTS = [
  { id: "AGT-047", name: "TM-007", hosts: 12, revenue: "$18K", agency: "Global Talent", status: "Active", color: "#27AE60" },
  { id: "AGT-048", name: "TM-012", hosts: 8, revenue: "$14K", agency: "Vyro Stars", status: "Active", color: "#27AE60" },
  { id: "AGT-049", name: "TM-024", hosts: 6, revenue: "$8K", agency: "Apex Agency", status: "Active", color: "#27AE60" },
  { id: "AGT-050", name: "TM-031", hosts: 4, revenue: "$6K", agency: "Desert Voices", status: "Under Review", color: "#F2994A" },
];

export const BIZ_AGENCIES = [
  { id: "AGY-005", name: "Global Talent", owner: "Sarah Chen", hosts: 47, revenue: "$284K", growth: "+24.8%", status: "Active", color: "#27AE60" },
  { id: "AGY-006", name: "Vyro Stars", owner: "Marcus Reed", hosts: 32, revenue: "$198K", growth: "+18.4%", status: "Active", color: "#27AE60" },
  { id: "AGY-007", name: "Apex Agency", owner: "Aisha Patel", hosts: 24, revenue: "$148K", growth: "+14.2%", status: "Active", color: "#27AE60" },
  { id: "AGY-008", name: "Desert Voices", owner: "Khalid Omar", hosts: 18, revenue: "$84K", growth: "+12.8%", status: "Active", color: "#27AE60" },
  { id: "AGY-009", name: "Ocean Media", owner: "Emily Cruz", hosts: 12, revenue: "$48K", growth: "+8.4%", status: "Suspended", color: "#EB5757" },
];

export const BIZ_GROWTH_METRICS = [
  { metric: "Revenue Growth", value: "+18.2%", change: "MTD", color: "#27AE60", icon: "DollarSign" },
  { metric: "Host Growth", value: "+12.4%", change: "MTD", color: "#EF4444", icon: "Mic" },
  { metric: "Agency Growth", value: "+6.2%", change: "MTD", color: "#8B5CF6", icon: "Building2" },
  { metric: "User Growth", value: "+14.2%", change: "MTD", color: "#10B981", icon: "Users" },
  { metric: "Market Share", value: "+3.8%", change: "QTD", color: "#2F80ED", icon: "Globe" },
  { metric: "Profit Growth", value: "+9.8%", change: "MTD", color: "#27AE60", icon: "TrendingUp" },
];

export const BIZ_TARGETS = [
  { name: "Monthly Revenue", target: "$6M", achieved: "$5.8M", rate: "96.7%", status: "On Track", color: "#27AE60" },
  { name: "Host Recruitment", target: "500", achieved: "484", rate: "96.8%", status: "On Track", color: "#27AE60" },
  { name: "Agency Onboarding", target: "20", achieved: "18", rate: "90.0%", status: "On Track", color: "#27AE60" },
  { name: "Campaign Launches", target: "30", achieved: "28", rate: "93.3%", status: "On Track", color: "#27AE60" },
  { name: "Quarterly Revenue", target: "$18M", achieved: "$14.2M", rate: "78.9%", status: "Behind", color: "#F2994A" },
];

export const BIZ_REVENUE_PERIODS = [
  { label: "Daily", value: "$184K", change: "+8.4%", color: "#27AE60" },
  { label: "Weekly", value: "$1.2M", change: "+6.4%", color: "#27AE60" },
  { label: "Monthly", value: "$5.8M", change: "+9.8%", color: "#27AE60" },
  { label: "Forecast", value: "$6.4M", change: "+10.2%", color: "#10B981" },
];

export const BIZ_CAMPAIGNS = [
  { id: "CMP-001", name: "Summer Recruitment Drive", type: "Recruitment", reach: "1.2M", status: "Active", color: "#27AE60" },
  { id: "CMP-002", name: "Agency Growth Program", type: "Growth", reach: "847K", status: "Active", color: "#27AE60" },
  { id: "CMP-003", name: "Host Star Competition", type: "Competition", reach: "628K", status: "Active", color: "#27AE60" },
  { id: "CMP-004", name: "Q3 Revenue Push", type: "Revenue", reach: "384K", status: "Scheduled", color: "#F2994A" },
  { id: "CMP-005", name: "Spring Festival 2026", type: "Seasonal", reach: "2.4M", status: "Completed", color: "#6B7280" },
];

export const BIZ_EVENTS = [
  { id: "EVT-001", name: "Business Strategy Summit", type: "Business", participants: "284", status: "Scheduled", color: "#F2994A" },
  { id: "EVT-002", name: "Host Recognition Gala", type: "Recognition", participants: "847", status: "Active", color: "#27AE60" },
  { id: "EVT-003", name: "Agency Partner Meeting", type: "Partnership", participants: "147", status: "Active", color: "#27AE60" },
  { id: "EVT-004", name: "Q3 Kickoff Event", type: "Business", participants: "1,284", status: "Completed", color: "#6B7280" },
];

export const BIZ_APPLICATIONS = [
  { id: "APP-4821", type: "Host Application", applicant: "LunaStar", date: "2026-07-03", status: "Pending", color: "#F2994A" },
  { id: "APP-4820", type: "Agency Application", applicant: "Apex Agency", date: "2026-07-02", status: "Approved", color: "#27AE60" },
  { id: "APP-4819", type: "Agent Application", applicant: "TM-007", date: "2026-07-02", status: "Pending", color: "#F2994A" },
  { id: "APP-4818", type: "Host Application", applicant: "OceanVoice", date: "2026-07-01", status: "Rejected", color: "#EB5757" },
  { id: "APP-4817", type: "Agency Application", applicant: "Ocean Media", date: "2026-06-30", status: "Hold", color: "#F2994A" },
];

export const BIZ_COMM_TARGETS = [
  { label: "Team Members", icon: "Users", color: "#2F80ED" },
  { label: "All Hosts", icon: "Mic", color: "#EF4444" },
  { label: "All Agents", icon: "Handshake", color: "#8B5CF6" },
  { label: "All Agencies", icon: "Building2", color: "#8B5CF6" },
];

export const BIZ_COMM_TYPES = [
  { label: "Internal Message", icon: "MessageSquare", color: "#27AE60" },
  { label: "Announcement", icon: "Megaphone", color: "#3B82F6" },
  { label: "Schedule Meeting", icon: "Calendar", color: "#F59E0B" },
  { label: "Broadcast", icon: "Bell", color: "#EC4899" },
];

export const BIZ_ANALYTICS = [
  { metric: "Revenue Analytics", value: "$5.8M", change: "+9.8%", color: "#27AE60", icon: "DollarSign" },
  { metric: "Host Analytics", value: "12,847", change: "+8.4%", color: "#EF4444", icon: "Mic" },
  { metric: "Agency Analytics", value: "184", change: "+6.2%", color: "#8B5CF6", icon: "Building2" },
  { metric: "Growth Analytics", value: "+18.2%", change: "+3.4%", color: "#10B981", icon: "TrendingUp" },
  { metric: "Team Productivity", value: "96.4%", change: "+1.8%", color: "#2F80ED", icon: "Users" },
  { metric: "Campaign Performance", value: "84.7%", change: "+4.2%", color: "#3B82F6", icon: "Megaphone" },
];

export const BIZ_AI_INSIGHTS = [
  { title: "Revenue Forecast", value: "$6.4M", detail: "Projected monthly revenue", color: "#27AE60", icon: "TrendingUp" },
  { title: "Growth Prediction", value: "+22.4%", detail: "Next quarter projection", color: "#10B981", icon: "TrendingUp" },
  { title: "Risk Analysis", value: "Low", detail: "Business risk: minimal", color: "#27AE60", icon: "ShieldCheck" },
  { title: "Opportunity Detection", value: "8 found", detail: "Growth opportunities identified", color: "#3B82F6", icon: "Lightbulb" },
  { title: "Host Performance Forecast", value: "94.8%", detail: "Expected host target achievement", color: "#EF4444", icon: "Mic" },
  { title: "Market Expansion", value: "4 regions", detail: "Recommended expansion areas", color: "#8B5CF6", icon: "Globe" },
];

export const BIZ_PERFORMANCE = [
  { metric: "Overall Score", value: "96.4%", change: "+1.8%", color: "#27AE60", icon: "Trophy" },
  { metric: "Target Achievement", value: "94.8%", change: "+2.4%", color: "#27AE60", icon: "Target" },
  { metric: "Team Score", value: "98%", change: "+1.2%", color: "#2F80ED", icon: "Users" },
  { metric: "Revenue Score", value: "92%", change: "+3.4%", color: "#27AE60", icon: "DollarSign" },
];

export const BIZ_REPORTS = [
  "Daily Business Report", "Weekly Business Report", "Monthly Business Report",
  "Revenue Report", "Host Performance Report", "Agency Performance Report",
  "Agent Performance Report", "Campaign Report", "Growth Report",
  "Target Achievement Report", "Team Productivity Report", "Business Analytics Report",
  "Business Forecast Report", "Business Intelligence Report",
];

export const BIZ_DOCUMENTS = [
  { name: "Host Contracts", count: "1,847", type: "Contracts", color: "#3B82F6", icon: "FileText" },
  { name: "Agency Agreements", count: "184", type: "Agreements", color: "#8B5CF6", icon: "FileSignature" },
  { name: "Business Plans", count: "47", type: "Plans", color: "#27AE60", icon: "ClipboardList" },
  { name: "Performance Reviews", count: "847", type: "Reviews", color: "#F59E0B", icon: "FileBarChart" },
  { name: "Campaign Reports", count: "284", type: "Reports", color: "#EC4899", icon: "FileSpreadsheet" },
  { name: "Strategy Documents", count: "128", type: "Strategy", color: "#2F80ED", icon: "Lightbulb" },
];

export const BIZ_OPERATIONS = [
  { name: "Monitor Operations", icon: "Activity", color: "#2F80ED" },
  { name: "Assign Operations", icon: "ClipboardList", color: "#3B82F6" },
  { name: "Review Activities", icon: "CheckCircle", color: "#27AE60" },
  { name: "Optimize Workflow", icon: "Zap", color: "#F59E0B" },
  { name: "Process Management", icon: "Settings", color: "#6B7280" },
  { name: "Quality Control", icon: "ShieldCheck", color: "#8B5CF6" },
];

export const BIZ_NOTIFICATION_LOGS = [
  { title: "Revenue Alert", message: "Daily revenue target 96.7% achieved", time: "2m ago", type: "success", color: "#27AE60" },
  { title: "Target Update", message: "Monthly revenue target approaching", time: "12m ago", type: "info", color: "#3B82F6" },
  { title: "Performance Review", message: "Team performance improved to 96.4%", time: "34m ago", type: "success", color: "#27AE60" },
  { title: "Campaign Alert", message: "Summer Recruitment Drive launched", time: "1h ago", type: "info", color: "#3B82F6" },
  { title: "Growth Milestone", message: "Business growth rate +18.2% achieved", time: "2h ago", type: "success", color: "#27AE60" },
];

export const BIZ_SETTINGS_GROUPS = [
  { name: "Team Settings", icon: "Users", color: "#2F80ED" },
  { name: "Host Settings", icon: "Mic", color: "#EF4444" },
  { name: "Agency Settings", icon: "Building2", color: "#8B5CF6" },
  { name: "Campaign Settings", icon: "Megaphone", color: "#3B82F6" },
  { name: "Revenue Settings", icon: "DollarSign", color: "#27AE60" },
  { name: "Target Settings", icon: "Target", color: "#EC4899" },
  { name: "Notification Settings", icon: "Bell", color: "#F2994A" },
  { name: "Approval Workflow", icon: "CheckCircle", color: "#2F80ED" },
];

export const BIZ_EXCLUSIVE_TOOLS = [
  { label: "Business Planning", icon: "ClipboardList", color: "#3B82F6" },
  { label: "Team Optimization", icon: "Users", color: "#2F80ED" },
  { label: "Revenue Optimization", icon: "DollarSign", color: "#27AE60" },
  { label: "Growth Strategy Development", icon: "TrendingUp", color: "#10B981" },
  { label: "Performance Optimization", icon: "Trophy", color: "#F59E0B" },
  { label: "Operational Forecasting", icon: "BrainCircuit", color: "#8B5CF6" },
];

export const BIZ_REPORTING_STRUCTURE = { reportsTo: "Global Operations Manager", icon: "Building2", color: "#475569" };