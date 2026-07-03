// Support Manager Dashboard data — VYRO Live Connect Earning
// Enterprise International Level Customer Support & Service Control Center

export const SUPPORT_SECTIONS = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard", color: "#2F80ED" },
  { id: "tickets", label: "Tickets", icon: "Ticket", color: "#F2994A" },
  { id: "user_support", label: "Users", icon: "User", color: "#2F80ED" },
  { id: "host_support", label: "Hosts", icon: "Mic", color: "#EB5757" },
  { id: "agent_support", label: "Agents", icon: "Handshake", color: "#A78BFA" },
  { id: "agency_support", label: "Agencies", icon: "Building2", color: "#8B5CF6" },
  { id: "vip_support", label: "VIP", icon: "Crown", color: "#D4AF37" },
  { id: "recovery", label: "Recovery", icon: "Lock", color: "#EB5757" },
  { id: "appeals", label: "Appeals", icon: "Scale", color: "#F2994A" },
  { id: "fraud", label: "Fraud", icon: "ShieldAlert", color: "#EB5757" },
  { id: "payment", label: "Payment", icon: "CreditCard", color: "#27AE60" },
  { id: "withdrawal", label: "Withdrawal", icon: "Banknote", color: "#27AE60" },
  { id: "live", label: "Live Stream", icon: "Radio", color: "#EB5757" },
  { id: "technical", label: "Technical", icon: "Settings", color: "#6B7280" },
  { id: "knowledge", label: "Knowledge", icon: "BookOpen", color: "#2F80ED" },
  { id: "communication", label: "Comms", icon: "MessageSquare", color: "#56CCF2" },
  { id: "reports", label: "Reports", icon: "FileText", color: "#F2994A" },
  { id: "staff", label: "Staff", icon: "Users", color: "#56CCF2" },
  { id: "analytics", label: "Analytics", icon: "BarChart3", color: "#2F80ED" },
  { id: "tools", label: "Exclusive Tools", icon: "Rocket", color: "#D4AF37" },
];

export const SUPPORT_KPIS = [
  { label: "Total Open Tickets", value: "2,847", change: "+8.2%", trend: "up", icon: "Ticket", color: "#F2994A" },
  { label: "Total Closed Tickets", value: "18,294", change: "+12.4%", trend: "up", icon: "CheckCircle2", color: "#27AE60" },
  { label: "Pending Tickets", value: "847", change: "-4.1%", trend: "up", icon: "Clock", color: "#F2994A" },
  { label: "Escalated Cases", value: "128", change: "+6", trend: "up", icon: "AlertTriangle", color: "#EB5757" },
  { label: "VIP Support Requests", value: "247", change: "+3.2%", trend: "up", icon: "Crown", color: "#D4AF37" },
  { label: "Resolved Today", value: "482", change: "+14.8%", trend: "up", icon: "CheckCircle", color: "#27AE60" },
  { label: "Avg Response Time", value: "4.2 min", change: "-0.8 min", trend: "up", icon: "Timer", color: "#2F80ED" },
  { label: "Satisfaction Rate", value: "94.7%", change: "+1.8%", trend: "up", icon: "Smile", color: "#27AE60" },
  { label: "Fraud Reports", value: "147", change: "+12", trend: "up", icon: "ShieldAlert", color: "#EB5757" },
  { label: "Appeal Requests", value: "84", change: "+5", trend: "up", icon: "Scale", color: "#F2994A" },
  { label: "Active Support Staff", value: "34", change: "+2", trend: "up", icon: "Users", color: "#56CCF2" },
  { label: "Critical Cases", value: "18", change: "-3", trend: "up", icon: "AlertOctagon", color: "#EB5757" },
];

export const SUPPORT_QUICK_ACTIONS = [
  { label: "Create Ticket", icon: "PlusCircle", color: "#2F80ED" },
  { label: "Assign Tickets", icon: "UserPlus", color: "#F2994A" },
  { label: "Priority Escalate", icon: "ArrowUpCircle", color: "#EB5757" },
  { label: "Generate Report", icon: "FileText", color: "#27AE60" },
];

export const SUPPORT_REALTIME_COUNTERS = [
  { label: "New Tickets", value: "47", icon: "Ticket", color: "#F2994A" },
  { label: "Active Chats", value: "128", icon: "MessageCircle", color: "#2F80ED" },
  { label: "On Hold", value: "34", icon: "PauseCircle", color: "#F2994A" },
  { label: "Resolved Today", value: "482", icon: "CheckCircle", color: "#27AE60" },
  { label: "VIP Queue", value: "12", icon: "Crown", color: "#D4AF37" },
  { label: "Escalated", value: "8", icon: "AlertTriangle", color: "#EB5757" },
];

export const SUPPORT_LIVE_STREAM = [
  { type: "ticket", text: "New ticket — Payment issue #TKT-4821", time: "now", status: "info" },
  { type: "resolve", text: "Ticket #TKT-3829 resolved — Login problem", time: "12s", status: "success" },
  { type: "vip", text: "VIP support request — Crown member", time: "34s", status: "success" },
  { type: "escalate", text: "Ticket #TKT-2918 escalated to L3", time: "48s", status: "warning" },
  { type: "fraud", text: "Fraud report submitted — User #VYR-8472", time: "1m", status: "warning" },
  { type: "appeal", text: "Ban appeal filed — User #VYR-1928", time: "1m", status: "info" },
  { type: "recover", text: "Account recovered — Identity verified", time: "2m", status: "success" },
  { type: "ticket", text: "New ticket — Withdrawal delay #TKT-5829", time: "2m", status: "info" },
  { type: "resolve", text: "Host complaint resolved — Revenue issue", time: "3m", status: "success" },
  { type: "escalate", text: "Critical case — Technical outage report", time: "3m", status: "error" },
];

export const TICKET_CATEGORIES = [
  { category: "Account Issues", open: 247, resolved: 1820, color: "#2F80ED", icon: "User" },
  { category: "Login Problems", open: 184, resolved: 2847, color: "#56CCF2", icon: "LogIn" },
  { category: "Payment Issues", open: 328, resolved: 1947, color: "#27AE60", icon: "CreditCard" },
  { category: "Withdrawal Issues", open: 218, resolved: 1284, color: "#F2994A", icon: "Banknote" },
  { category: "Gift Issues", open: 147, resolved: 892, color: "#EB5757", icon: "Gift" },
  { category: "VIP Issues", open: 89, resolved: 647, color: "#D4AF37", icon: "Crown" },
  { category: "Agency Issues", open: 64, resolved: 384, color: "#8B5CF6", icon: "Building2" },
  { category: "Technical Issues", open: 128, resolved: 728, color: "#6B7280", icon: "Settings" },
];

export const TICKETS = [
  { id: "TKT-4821", user: "VYR-8472", category: "Payment Issues", priority: "High", status: "Open", assigned: "Sarah M.", created: "2m ago", color: "#EB5757" },
  { id: "TKT-4820", user: "VYR-1928", category: "Login Problems", priority: "Medium", status: "In Progress", assigned: "Ahmed K.", created: "8m ago", color: "#F2994A" },
  { id: "TKT-4819", user: "VYR-7382", category: "VIP Issues", priority: "Urgent", status: "Escalated", assigned: "Priya S.", created: "15m ago", color: "#D4AF37" },
  { id: "TKT-4818", user: "VYR-2918", category: "Withdrawal Issues", priority: "High", status: "Open", assigned: "David C.", created: "23m ago", color: "#27AE60" },
  { id: "TKT-4817", user: "VYR-5829", category: "Gift Issues", priority: "Low", status: "In Progress", assigned: "Fatima N.", created: "34m ago", color: "#EB5757" },
  { id: "TKT-4816", user: "VYR-3847", category: "Account Issues", priority: "Medium", status: "Resolved", assigned: "James W.", created: "42m ago", color: "#2F80ED" },
  { id: "TKT-4815", user: "VYR-9284", category: "Technical Issues", priority: "High", status: "In Progress", assigned: "Sarah M.", created: "1h ago", color: "#6B7280" },
  { id: "TKT-4814", user: "VYR-1284", category: "Agency Issues", priority: "Low", status: "Resolved", assigned: "Ahmed K.", created: "1h ago", color: "#8B5CF6" },
];

export const APPEALS = [
  { id: "APL-247", user: "VYR-8472", type: "Suspension Appeal", reason: "Account suspended for policy violation", status: "Pending", date: "2026-07-01", color: "#F2994A" },
  { id: "APL-246", user: "VYR-1928", type: "Ban Appeal", reason: "Permanent ban request review", status: "Under Review", date: "2026-06-30", color: "#2F80ED" },
  { id: "APL-245", user: "VYR-7382", type: "Warning Appeal", reason: "Unfair warning received", status: "Approved", date: "2026-06-29", color: "#27AE60" },
  { id: "APL-244", user: "VYR-2918", type: "Revenue Appeal", reason: "Commission calculation dispute", status: "Rejected", date: "2026-06-28", color: "#EB5757" },
  { id: "APL-243", user: "VYR-5829", type: "Suspension Appeal", reason: "Temporary suspension review", status: "Pending", date: "2026-06-27", color: "#F2994A" },
];

export const FRAUD_REPORTS = [
  { id: "FRD-147", reporter: "VYR-8472", target: "VYR-3847", type: "Scam Activity", severity: "High", status: "Investigating", date: "2026-07-02", color: "#EB5757" },
  { id: "FRD-146", reporter: "System AI", target: "VYR-5829", type: "Fake Account", severity: "Medium", status: "Under Review", date: "2026-07-02", color: "#F2994A" },
  { id: "FRD-145", reporter: "VYR-1928", target: "VYR-9284", type: "Gift Fraud", severity: "High", status: "Escalated", date: "2026-07-01", color: "#EB5757" },
  { id: "FRD-144", reporter: "VYR-7382", target: "VYR-1284", type: "Payment Fraud", severity: "Critical", status: "Investigating", date: "2026-07-01", color: "#EB5757" },
  { id: "FRD-143", reporter: "System AI", target: "VYR-4829", type: "Spam Activity", severity: "Low", status: "Resolved", date: "2026-06-30", color: "#27AE60" },
];

export const PAYMENT_ISSUES = [
  { id: "PAY-847", user: "VYR-8472", issue: "Recharge not credited", amount: "$50", status: "Investigating", date: "2026-07-02", color: "#F2994A" },
  { id: "PAY-846", user: "VYR-1928", issue: "Double charge", amount: "$100", status: "Resolved", date: "2026-07-01", color: "#27AE60" },
  { id: "PAY-845", user: "VYR-7382", issue: "Payment failed", amount: "$199", status: "In Progress", date: "2026-07-01", color: "#2F80ED" },
  { id: "PAY-844", user: "VYR-2918", issue: "VIP purchase error", amount: "$199", status: "Escalated", date: "2026-06-30", color: "#EB5757" },
];

export const WITHDRAWAL_ISSUES = [
  { id: "WDR-628", user: "VYR-8472", issue: "Withdrawal delayed", amount: "$1,200", status: "Processing", date: "2026-07-02", color: "#F2994A" },
  { id: "WDR-627", user: "VYR-1928", issue: "Bank verification failed", amount: "$840", status: "Pending", date: "2026-07-01", color: "#F2994A" },
  { id: "WDR-626", user: "VYR-7382", issue: "Wrong account", amount: "$2,400", status: "Escalated", date: "2026-07-01", color: "#EB5757" },
  { id: "WDR-625", user: "VYR-2918", issue: "Withdrawal blocked", amount: "$620", status: "Resolved", date: "2026-06-30", color: "#27AE60" },
];

export const RECOVERY_REQUESTS = [
  { id: "REC-347", user: "VYR-8472", type: "Password Reset", status: "Verified", date: "2026-07-02", color: "#27AE60" },
  { id: "REC-346", user: "VYR-1928", type: "Account Recovery", status: "Pending", date: "2026-07-01", color: "#F2994A" },
  { id: "REC-345", user: "VYR-7382", type: "Phone Change", status: "Under Review", date: "2026-07-01", color: "#2F80ED" },
  { id: "REC-344", user: "VYR-2918", type: "2FA Reset", status: "Verified", date: "2026-06-30", color: "#27AE60" },
  { id: "REC-343", user: "VYR-5829", type: "Email Change", status: "Pending", date: "2026-06-29", color: "#F2994A" },
];

export const LIVE_ISSUES = [
  { id: "LIV-128", host: "LunaStar", issue: "Audio lag during stream", severity: "Medium", status: "Investigating", color: "#F2994A" },
  { id: "LIV-127", host: "DesertRose", issue: "Gift animation not showing", severity: "Low", status: "Resolved", color: "#27AE60" },
  { id: "LIV-126", host: "OceanVoice", issue: "Stream disconnected", severity: "High", status: "Escalated", color: "#EB5757" },
  { id: "LIV-125", host: "SilverMoon", issue: "Mic not working", severity: "High", status: "In Progress", color: "#F2994A" },
];

export const TECHNICAL_ISSUES = [
  { id: "TEC-247", issue: "App crash on iOS 17.5", severity: "High", status: "In Progress", assigned: "Dev Team A", color: "#EB5757" },
  { id: "TEC-246", issue: "Chat messages delayed", severity: "Medium", status: "Investigating", assigned: "Dev Team B", color: "#F2994A" },
  { id: "TEC-245", issue: "Gift delivery failure", severity: "High", status: "Escalated", assigned: "Dev Team A", color: "#EB5757" },
  { id: "TEC-244", issue: "Login page loading slow", severity: "Low", status: "Resolved", assigned: "Dev Team C", color: "#27AE60" },
  { id: "TEC-243", issue: "Video playback stutter", severity: "Medium", status: "In Progress", assigned: "Dev Team B", color: "#F2994A" },
];

export const KNOWLEDGE_ARTICLES = [
  { title: "Getting Started Guide", category: "Onboarding", views: "48K", status: "Published", icon: "BookOpen", color: "#2F80ED" },
  { title: "How to Recharge Coins", category: "Payments", views: "32K", status: "Published", icon: "Coins", color: "#F2994A" },
  { title: "VIP Membership FAQ", category: "VIP", views: "28K", status: "Published", icon: "Crown", color: "#D4AF37" },
  { title: "Host Streaming Guide", category: "Hosting", views: "24K", status: "Published", icon: "Mic", color: "#EB5757" },
  { title: "Withdrawal Process", category: "Finance", views: "18K", status: "Published", icon: "Banknote", color: "#27AE60" },
  { title: "Account Security Tips", category: "Security", views: "16K", status: "Published", icon: "ShieldCheck", color: "#2F80ED" },
  { title: "PK Battle Rules", category: "Events", views: "12K", status: "Draft", icon: "Swords", color: "#A78BFA" },
  { title: "Gift System Guide", category: "Gifting", views: "10K", status: "Published", icon: "Gift", color: "#EB5757" },
];

export const SUPPORT_STAFF = [
  { name: "Sarah Mitchell", role: "Senior Support Agent", staff_id: "SSA-001", tickets: 47, rating: "98%", color: "#D4AF37" },
  { name: "Ahmed Khalil", role: "Support Agent", staff_id: "SSA-002", tickets: 38, rating: "94%", color: "#2F80ED" },
  { name: "Priya Sharma", role: "VIP Support Lead", staff_id: "SSA-003", tickets: 28, rating: "96%", color: "#A78BFA" },
  { name: "David Chen", role: "Technical Support", staff_id: "SSA-004", tickets: 32, rating: "92%", color: "#6B7280" },
  { name: "Fatima Noor", role: "Support Agent", staff_id: "SSA-005", tickets: 35, rating: "97%", color: "#27AE60" },
  { name: "James Wilson", role: "Support Agent", staff_id: "SSA-006", tickets: 29, rating: "95%", color: "#56CCF2" },
];

export const SUPPORT_ANALYTICS = [
  { metric: "Avg Resolution Time", value: "18.4 min", change: "-2.1 min", trend: "up", color: "#27AE60" },
  { metric: "Ticket Volume (Today)", value: "847", change: "+8.2%", trend: "up", color: "#2F80ED" },
  { metric: "Satisfaction Rate", value: "94.7%", change: "+1.8%", trend: "up", color: "#27AE60" },
  { metric: "Escalation Rate", value: "4.2%", change: "-0.8%", trend: "up", color: "#27AE60" },
  { metric: "First Response Time", value: "4.2 min", change: "-0.8 min", trend: "up", color: "#2F80ED" },
  { metric: "Reopen Rate", value: "2.1%", change: "-0.4%", trend: "up", color: "#27AE60" },
];

export const SUPPORT_REPORTS = [
  { name: "Daily Support Report", type: "Daily", icon: "Calendar", color: "#2F80ED" },
  { name: "Weekly Support Report", type: "Weekly", icon: "CalendarDays", color: "#56CCF2" },
  { name: "Monthly Support Report", type: "Monthly", icon: "CalendarRange", color: "#A78BFA" },
  { name: "Ticket Resolution Report", type: "Resolution", icon: "CheckCircle", color: "#27AE60" },
  { name: "VIP Support Report", type: "VIP", icon: "Crown", color: "#D4AF37" },
  { name: "Fraud Investigation Report", type: "Fraud", icon: "ShieldAlert", color: "#EB5757" },
  { name: "Staff Performance Report", type: "Staff", icon: "Users", color: "#56CCF2" },
  { name: "Satisfaction Report", type: "Satisfaction", icon: "Smile", color: "#27AE60" },
  { name: "Escalation Report", type: "Escalation", icon: "ArrowUpCircle", color: "#F2994A" },
  { name: "Technical Issue Report", type: "Technical", icon: "Settings", color: "#6B7280" },
];

export const SUPPORT_COMM_TYPES = [
  { label: "Send Message", icon: "MessageSquare", color: "#2F80ED" },
  { label: "Announcement", icon: "Megaphone", color: "#EC4899" },
  { label: "Notify Users", icon: "Bell", color: "#F2994A" },
  { label: "Broadcast", icon: "Radio", color: "#A78BFA" },
];

export const SUPPORT_EXCLUSIVE_TOOLS = [
  { name: "Priority Escalation", desc: "Instantly escalate any ticket to highest priority", icon: "ArrowUpCircle", color: "#EB5757", danger: false },
  { name: "Emergency Resolution", desc: "Force-resolve critical cases immediately", icon: "Zap", color: "#D4AF37", danger: false },
  { name: "Service Optimization", desc: "AI-driven support flow optimization", icon: "Cpu", color: "#A78BFA", danger: false },
  { name: "Staff Performance Review", desc: "Comprehensive team performance audit", icon: "Users", color: "#2F80ED", danger: false },
  { name: "Satisfaction Monitoring", desc: "Real-time CSAT tracking & alerts", icon: "Smile", color: "#27AE60", danger: false },
  { name: "Strategy Planning", desc: "Long-term support strategy builder", icon: "Rocket", color: "#8B5CF6", danger: false },
  { name: "Mass Ticket Action", desc: "Bulk resolve/reassign tickets", icon: "Layers", color: "#56CCF2", danger: false },
  { name: "Override Resolution", desc: "Manually override ticket resolution", icon: "AlertTriangle", color: "#EB5757", danger: true },
];

export const SUPPORT_PERMISSIONS_ALLOWED = [
  "Manage Support Tickets", "Resolve Complaints", "Handle Appeals", "Review Fraud Reports",
  "Manage Support Staff", "Generate Reports", "Access Support Analytics", "Manage Knowledge Base",
  "Escalate Critical Cases",
];

export const SUPPORT_PERMISSIONS_RESTRICTED = [
  "Owner Dashboard Access", "Global Finance Controls", "Super Admin Controls",
  "Country Manager Controls", "Revenue Modification Rights", "Platform Ownership Functions",
];