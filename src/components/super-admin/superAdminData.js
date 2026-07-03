// Super Admin Dashboard data — VYRO Live Connect Earning
// Agency, Host, Agent & Admin Operations Control Center

export const SUPERADMIN_SECTIONS = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard", color: "#475569" },
  { id: "agencies", label: "Agencies", icon: "Building2", color: "#8B5CF6" },
  { id: "agents", label: "Agents", icon: "Handshake", color: "#A78BFA" },
  { id: "hosts", label: "Hosts", icon: "Mic", color: "#EB5757" },
  { id: "admins", label: "Admins", icon: "UserCog", color: "#2F80ED" },
  { id: "applications", label: "Applications", icon: "FileText", color: "#F2994A" },
  { id: "performance", label: "Performance", icon: "TrendingUp", color: "#27AE60" },
  { id: "revenue", label: "Revenue", icon: "DollarSign", color: "#27AE60" },
  { id: "events", label: "Events", icon: "PartyPopper", color: "#EC4899" },
  { id: "pk", label: "PK Battles", icon: "Swords", color: "#F2994A" },
  { id: "violations", label: "Violations", icon: "AlertTriangle", color: "#EB5757" },
  { id: "security", label: "Security", icon: "ShieldCheck", color: "#2F80ED" },
  { id: "communication", label: "Comms", icon: "Megaphone", color: "#56CCF2" },
  { id: "analytics", label: "Analytics", icon: "BarChart3", color: "#2F80ED" },
  { id: "audit", label: "Audit Logs", icon: "ScrollText", color: "#8B5CF6" },
  { id: "settings", label: "Settings", icon: "Settings", color: "#6B7280" },
  { id: "policy", label: "Policy", icon: "FileText", color: "#475569" },
];

export const SUPERADMIN_KPIS = [
  { label: "Total Agencies", value: "1,205", change: "+3.4%", trend: "up", icon: "Building2", color: "#8B5CF6" },
  { label: "Active Agencies", value: "1,142", change: "+2.8%", trend: "up", icon: "Building2", color: "#8B5CF6" },
  { label: "Total Talent Agents", value: "3,847", change: "+5.1%", trend: "up", icon: "Handshake", color: "#A78BFA" },
  { label: "Active Talent Agents", value: "3,628", change: "+4.2%", trend: "up", icon: "Handshake", color: "#A78BFA" },
  { label: "Total Hosts", value: "42,318", change: "+8.2%", trend: "up", icon: "Mic", color: "#EB5757" },
  { label: "Active Hosts", value: "38,294", change: "+6.4%", trend: "up", icon: "Mic", color: "#EB5757" },
  { label: "Online Hosts", value: "8,471", change: "+12.3%", trend: "up", icon: "Radio", color: "#EB5757" },
  { label: "Total Admins", value: "89", change: "+1", trend: "up", icon: "UserCog", color: "#2F80ED" },
  { label: "Active Admins", value: "84", change: "+2", trend: "up", icon: "UserCog", color: "#2F80ED" },
  { label: "Pending Applications", value: "929", change: "+47", trend: "up", icon: "FileText", color: "#F2994A" },
  { label: "Active Live Streams", value: "12,847", change: "+15.3%", trend: "up", icon: "Radio", color: "#EB5757" },
  { label: "Daily Revenue", value: "$284K", change: "+6.2%", trend: "up", icon: "DollarSign", color: "#27AE60" },
  { label: "Monthly Revenue", value: "$8.4M", change: "+9.1%", trend: "up", icon: "Calendar", color: "#27AE60" },
  { label: "Active PK Battles", value: "342", change: "+18", trend: "up", icon: "Swords", color: "#F2994A" },
  { label: "Active Events", value: "28", change: "+4", trend: "up", icon: "PartyPopper", color: "#EC4899" },
];

export const SUPERADMIN_QUICK_ACTIONS = [
  { label: "Global Search", icon: "Search", color: "#2F80ED" },
  { label: "Approve Applications", icon: "FileCheck", color: "#27AE60" },
  { label: "Monitor Hosts", icon: "Mic", color: "#EB5757" },
  { label: "Review Agencies", icon: "Building2", color: "#8B5CF6" },
  { label: "Manage Agents", icon: "Handshake", color: "#A78BFA" },
  { label: "Generate Reports", icon: "FileText", color: "#F2994A" },
];

export const SUPERADMIN_REALTIME_COUNTERS = [
  { label: "Online Agencies", value: "847", icon: "Building2", color: "#8B5CF6" },
  { label: "Online Agents", value: "2,184", icon: "Handshake", color: "#A78BFA" },
  { label: "Live Hosts", value: "8,471", icon: "Mic", color: "#EB5757" },
  { label: "Active Admins", value: "34", icon: "UserCog", color: "#2F80ED" },
  { label: "Pending Approvals", value: "929", icon: "FileText", color: "#F2994A" },
  { label: "Open Violations", value: "147", icon: "AlertTriangle", color: "#EB5757" },
];

export const SUPERADMIN_LIVE_STREAM = [
  { type: "agency", text: "New agency approved — Apex Agency, Egypt", time: "now", status: "success" },
  { type: "agent", text: "Agent recruited 3 new hosts — A. Patel", time: "12s", status: "info" },
  { type: "host", text: "Host went live — LunaStar (12,847 viewers)", time: "34s", status: "success" },
  { type: "application", text: "Host application pending review — VYR-4829", time: "48s", status: "info" },
  { type: "revenue", text: "Daily revenue milestone — $284K reached", time: "1m", status: "success" },
  { type: "pk", text: "PK battle started — Room #4821", time: "1m", status: "info" },
  { type: "violation", text: "Violation reported — Host #VYR-2918", time: "2m", status: "warning" },
  { type: "admin", text: "Admin completed 24 tasks — Sarah M.", time: "2m", status: "info" },
  { type: "security", text: "VPN detected — User #VYR-8472", time: "3m", status: "warning" },
  { type: "event", text: "Event launched — Summer VIP Festival", time: "3m", status: "info" },
];

export const AGENCIES = [
  { id: "AGY-001", name: "Vyro Stars", owner: "M. Hassan", country: "Egypt", hosts: 847, agents: 24, revenue: "$840K", status: "Active", color: "#8B5CF6" },
  { id: "AGY-002", name: "Global Talent", owner: "A. Patel", country: "India", hosts: 1284, agents: 38, revenue: "$1.2M", status: "Active", color: "#8B5CF6" },
  { id: "AGY-003", name: "Apex Agency", owner: "C. Okafor", country: "Nigeria", hosts: 628, agents: 18, revenue: "$620K", status: "Active", color: "#8B5CF6" },
  { id: "AGY-004", name: "Desert Voices", owner: "F. Al-Rashid", country: "Saudi Arabia", hosts: 482, agents: 15, revenue: "$980K", status: "Active", color: "#8B5CF6" },
  { id: "AGY-005", name: "Ocean Media", owner: "L. Silva", country: "Brazil", hosts: 347, agents: 12, revenue: "$420K", status: "Suspended", color: "#EB5757" },
  { id: "AGY-006", name: "Mountain Echo", owner: "R. Pratama", country: "Indonesia", hosts: 284, agents: 9, revenue: "$380K", status: "Active", color: "#8B5CF6" },
];

export const AGENTS = [
  { id: "AGT-001", name: "A. Patel", agency: "Global Talent", hosts: 48, revenue: "$284K", rating: "98%", status: "Active", color: "#A78BFA" },
  { id: "AGT-002", name: "M. Hassan", agency: "Vyro Stars", hosts: 42, revenue: "$248K", rating: "96%", status: "Active", color: "#A78BFA" },
  { id: "AGT-003", name: "C. Okafor", agency: "Apex Agency", hosts: 38, revenue: "$192K", rating: "94%", status: "Active", color: "#A78BFA" },
  { id: "AGT-004", name: "F. Al-Rashid", agency: "Desert Voices", hosts: 34, revenue: "$318K", rating: "97%", status: "Active", color: "#A78BFA" },
  { id: "AGT-005", name: "L. Silva", agency: "Ocean Media", hosts: 28, revenue: "$148K", rating: "89%", status: "Suspended", color: "#EB5757" },
  { id: "AGT-006", name: "R. Pratama", agency: "Mountain Echo", hosts: 22, revenue: "$128K", rating: "92%", status: "Active", color: "#A78BFA" },
];

export const HOSTS = [
  { id: "HST-001", name: "LunaStar", agency: "Vyro Stars", agent: "M. Hassan", level: "LV.42", revenue: "$48K", followers: "1.2M", liveHours: "284h", status: "Live", color: "#27AE60" },
  { id: "HST-002", name: "DesertRose", agency: "Desert Voices", agent: "F. Al-Rashid", level: "LV.38", revenue: "$42K", followers: "984K", liveHours: "247h", status: "Live", color: "#27AE60" },
  { id: "HST-003", name: "OceanVoice", agency: "Apex Agency", agent: "C. Okafor", level: "LV.35", revenue: "$36K", followers: "748K", liveHours: "218h", status: "Offline", color: "#6B7280" },
  { id: "HST-004", name: "MountainEcho", agency: "Global Talent", agent: "A. Patel", level: "LV.33", revenue: "$28K", followers: "612K", liveHours: "192h", status: "Offline", color: "#6B7280" },
  { id: "HST-005", name: "SilverMoon", agency: "Vyro Stars", agent: "M. Hassan", level: "LV.30", revenue: "$24K", followers: "484K", liveHours: "168h", status: "Suspended", color: "#EB5757" },
  { id: "HST-006", name: "GoldenDawn", agency: "Desert Voices", agent: "F. Al-Rashid", level: "LV.28", revenue: "$18K", followers: "347K", liveHours: "142h", status: "Live", color: "#27AE60" },
];

export const ADMINS = [
  { id: "ADM-001", name: "Sarah Mitchell", department: "Operations", tasks: 47, score: "98%", lastActive: "2m ago", status: "Active", color: "#2F80ED" },
  { id: "ADM-002", name: "Ahmed Khalil", department: "Support", tasks: 38, score: "94%", lastActive: "8m ago", status: "Active", color: "#2F80ED" },
  { id: "ADM-003", name: "Priya Sharma", department: "Compliance", tasks: 32, score: "96%", lastActive: "15m ago", status: "Active", color: "#2F80ED" },
  { id: "ADM-004", name: "David Chen", department: "Technical", tasks: 29, score: "92%", lastActive: "23m ago", status: "Active", color: "#2F80ED" },
  { id: "ADM-005", name: "Fatima Noor", department: "Operations", tasks: 35, score: "97%", lastActive: "42m ago", status: "Inactive", color: "#6B7280" },
  { id: "ADM-006", name: "James Wilson", department: "Support", tasks: 24, score: "95%", lastActive: "1h ago", status: "Active", color: "#2F80ED" },
];

export const APPLICATIONS = [
  { type: "Host Applications", pending: 847, approved: 3829, rejected: 218, color: "#EB5757", icon: "Mic" },
  { type: "Agent Applications", pending: 124, approved: 3847, rejected: 47, color: "#A78BFA", icon: "Handshake" },
  { type: "Agency Applications", pending: 38, approved: 1205, rejected: 19, color: "#8B5CF6", icon: "Building2" },
];

export const APPLICATION_LIST = [
  { id: "APP-4821", applicant: "VYR-8472", type: "Host Application", status: "Pending", date: "2026-07-02", color: "#F2994A" },
  { id: "APP-4820", applicant: "VYR-1928", type: "Agent Application", status: "Pending", date: "2026-07-01", color: "#F2994A" },
  { id: "APP-4819", applicant: "VYR-7382", type: "Agency Application", status: "Under Review", date: "2026-07-01", color: "#2F80ED" },
  { id: "APP-4818", applicant: "VYR-2918", type: "Host Application", status: "Approved", date: "2026-06-30", color: "#27AE60" },
  { id: "APP-4817", applicant: "VYR-5829", type: "Agent Application", status: "Rejected", date: "2026-06-30", color: "#EB5757" },
  { id: "APP-4816", applicant: "VYR-3847", type: "Host Application", status: "Delayed", date: "2026-06-29", color: "#F2994A" },
];

export const PERFORMANCE_DATA = [
  { category: "Agency Performance", value: "94.2%", change: "+3.8%", color: "#8B5CF6", icon: "Building2" },
  { category: "Agent Performance", value: "91.8%", change: "+2.4%", color: "#A78BFA", icon: "Handshake" },
  { category: "Host Performance", value: "88.4%", change: "+4.2%", color: "#EB5757", icon: "Mic" },
  { category: "Admin Performance", value: "95.7%", change: "+1.8%", color: "#2F80ED", icon: "UserCog" },
];

export const REVENUE_DATA = [
  { source: "Agency Revenue", amount: "$3.8M", percent: "45.2%", color: "#8B5CF6", icon: "Building2" },
  { source: "Agent Revenue", amount: "$1.6M", percent: "19.0%", color: "#A78BFA", icon: "Handshake" },
  { source: "Host Revenue", amount: "$2.4M", percent: "28.6%", color: "#EB5757", icon: "Mic" },
  { source: "Other Revenue", amount: "$600K", percent: "7.2%", color: "#6B7280", icon: "DollarSign" },
];

export const REVENUE_PERIODS = [
  { label: "Daily", value: "$284K" },
  { label: "Weekly", value: "$1.9M" },
  { label: "Monthly", value: "$8.4M" },
  { label: "Yearly", value: "$48.2M" },
];

export const PK_BATTLES = [
  { id: "PKB-4821", hostA: "LunaStar", hostB: "DesertRose", scoreA: "8,472", scoreB: "7,284", status: "Active", color: "#27AE60" },
  { id: "PKB-4820", hostA: "OceanVoice", hostB: "MountainEcho", scoreA: "5,128", scoreB: "6,847", status: "Active", color: "#27AE60" },
  { id: "PKB-4819", hostA: "SilverMoon", hostB: "GoldenDawn", scoreA: "3,294", scoreB: "4,128", status: "Ended", color: "#6B7280" },
  { id: "PKB-4818", hostA: "LunaStar", hostB: "OceanVoice", scoreA: "9,847", scoreB: "8,128", status: "Ended", color: "#6B7280" },
];

export const VIOLATIONS = [
  { id: "VIO-247", target: "HST-005 (SilverMoon)", type: "Policy Violation", severity: "High", status: "Investigating", date: "2026-07-02", color: "#EB5757" },
  { id: "VIO-246", target: "AGY-005 (Ocean Media)", type: "Revenue Manipulation", severity: "Critical", status: "Escalated", date: "2026-07-01", color: "#EB5757" },
  { id: "VIO-245", target: "AGT-005 (L. Silva)", type: "Spam Recruitment", severity: "Medium", status: "Warning Issued", date: "2026-07-01", color: "#F2994A" },
  { id: "VIO-244", target: "HST-012", type: "Inappropriate Content", severity: "High", status: "Resolved", date: "2026-06-30", color: "#27AE60" },
  { id: "VIO-243", target: "ADM-007", type: "Access Violation", severity: "Low", status: "Closed", date: "2026-06-29", color: "#6B7280" },
];

export const SECURITY_DATA = [
  { label: "Login Logs", value: "2.4M today", icon: "LogIn", color: "#2F80ED" },
  { label: "Device Logs", value: "1.8M today", icon: "Smartphone", color: "#56CCF2" },
  { label: "IP Monitoring", value: "4.2M today", icon: "Globe", color: "#A78BFA" },
  { label: "VPN Detected", value: "847 today", icon: "ShieldOff", color: "#F2994A" },
  { label: "Fraud Detected", value: "128 today", icon: "AlertTriangle", color: "#EB5757" },
  { label: "Blocked Access", value: "47 today", icon: "Lock", color: "#EB5757" },
];

export const SECURITY_ACTIONS = [
  { label: "Force Logout", icon: "LogOut", color: "#F2994A" },
  { label: "Lock Account", icon: "Lock", color: "#EB5757" },
  { label: "Freeze Access", icon: "Snowflake", color: "#2F80ED" },
  { label: "Investigate", icon: "Search", color: "#A78BFA" },
];

export const COMM_TARGETS = [
  { label: "Agencies", icon: "Building2", color: "#8B5CF6" },
  { label: "Agents", icon: "Handshake", color: "#A78BFA" },
  { label: "Hosts", icon: "Mic", color: "#EB5757" },
  { label: "Admins", icon: "UserCog", color: "#2F80ED" },
];

export const COMM_TYPES = [
  { label: "Push Notification", icon: "Bell", color: "#2F80ED" },
  { label: "In-App Message", icon: "MessageSquare", color: "#27AE60" },
  { label: "Email Notice", icon: "Mail", color: "#A78BFA" },
  { label: "Broadcast", icon: "Megaphone", color: "#F2994A" },
];

export const ANALYTICS_DATA = [
  { metric: "Host Growth", value: "+8.2%", change: "MTD", color: "#EB5757", icon: "Mic" },
  { metric: "Agency Growth", value: "+3.4%", change: "MTD", color: "#8B5CF6", icon: "Building2" },
  { metric: "Agent Growth", value: "+5.1%", change: "MTD", color: "#A78BFA", icon: "Handshake" },
  { metric: "Revenue Growth", value: "+9.1%", change: "MTD", color: "#27AE60", icon: "DollarSign" },
  { metric: "Activity Index", value: "87.4", change: "+2.1", color: "#2F80ED", icon: "Activity" },
  { metric: "Engagement Rate", value: "78.4%", change: "+3.2%", color: "#56CCF2", icon: "Heart" },
];

export const AUDIT_LOGS = [
  { actor: "Super Admin", action: "Approved agency — Apex Agency", target: "AGY-003", time: "2m ago", color: "#27AE60" },
  { actor: "Admin — Sarah M.", action: "Suspended host — SilverMoon", target: "HST-005", time: "8m ago", color: "#EB5757" },
  { actor: "Super Admin", action: "Approved host application", target: "APP-4818", time: "15m ago", color: "#27AE60" },
  { actor: "System", action: "VPN detected — auto-flagged", target: "VYR-8472", time: "23m ago", color: "#F2994A" },
  { actor: "Admin — Ahmed K.", action: "Issued warning — L. Silva", target: "AGT-005", time: "31m ago", color: "#F2994A" },
  { actor: "Super Admin", action: "Generated performance report", target: "Q2-2026", time: "42m ago", color: "#2F80ED" },
];

export const SETTINGS_GROUPS = [
  { name: "Agency Rules", icon: "Building2", color: "#8B5CF6" },
  { name: "Host Rules", icon: "Mic", color: "#EB5757" },
  { name: "Agent Rules", icon: "Handshake", color: "#A78BFA" },
  { name: "Admin Rules", icon: "UserCog", color: "#2F80ED" },
  { name: "Notification Rules", icon: "Bell", color: "#F2994A" },
  { name: "PK Rules", icon: "Swords", color: "#F2994A" },
  { name: "Event Rules", icon: "PartyPopper", color: "#EC4899" },
  { name: "Security Rules", icon: "ShieldCheck", color: "#2F80ED" },
];

export const EVENTS = [
  { id: "EVT-001", name: "Summer Host Championship", type: "Competition", participants: "2,847", status: "Active", color: "#EB5757" },
  { id: "EVT-002", name: "Agency League Cup", type: "Tournament", participants: "1,205", status: "Active", color: "#8B5CF6" },
  { id: "EVT-003", name: "Top Agent Awards", type: "Awards", participants: "3,847", status: "Scheduled", color: "#A78BFA" },
  { id: "EVT-004", name: "Global PK Festival", type: "Festival", participants: "12,847", status: "Planning", color: "#F2994A" },
];

export const SUPERADMIN_PERMISSIONS_ALLOWED = [
  "Manage Agencies", "Manage Talent Agents", "Manage Hosts", "Manage Admins",
  "Approve Applications", "Review Reports", "Monitor Revenue", "Monitor Events",
  "Monitor PK Activities", "Generate Reports", "Manage Operations",
];

export const SUPERADMIN_PERMISSIONS_RESTRICTED = [
  "Business Manager Controls", "Business Development Controls", "Country Management Controls",
  "Finance Management Controls", "Global Settings Controls", "Owner Functions",
];