// Admin Dashboard data — VYRO Live Connect Earning
// Agency, Talent Agent & Host Operations Support Center

export const ADMIN_SECTIONS = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard", color: "#64748B" },
  { id: "agencies", label: "Agencies", icon: "Building2", color: "#8B5CF6" },
  { id: "agents", label: "Agents", icon: "Handshake", color: "#3B82F6" },
  { id: "hosts", label: "Hosts", icon: "Mic", color: "#EF4444" },
  { id: "applications", label: "Applications", icon: "FileCheck", color: "#F59E0B" },
  { id: "verification", label: "Verification", icon: "BadgeCheck", color: "#10B981" },
  { id: "support", label: "Support", icon: "LifeBuoy", color: "#2F80ED" },
  { id: "compliance", label: "Compliance", icon: "AlertTriangle", color: "#EB5757" },
  { id: "events", label: "Events", icon: "PartyPopper", color: "#EC4899" },
  { id: "pk", label: "PK Support", icon: "Swords", color: "#EF4444" },
  { id: "communication", label: "Comms", icon: "Megaphone", color: "#56CCF2" },
  { id: "analytics", label: "Analytics", icon: "BarChart3", color: "#2F80ED" },
  { id: "audit", label: "Audit Logs", icon: "ScrollText", color: "#6B7280" },
  { id: "policy", label: "Policy", icon: "FileText", color: "#64748B" },
];

export const ADMIN_KPIS = [
  { label: "Total Assigned Agencies", value: "48", change: "+4", trend: "up", icon: "Building2", color: "#8B5CF6" },
  { label: "Active Agencies", value: "42", change: "+3", trend: "up", icon: "Building2", color: "#27AE60" },
  { label: "Suspended Agencies", value: "2", change: "0", trend: "flat", icon: "Building2", color: "#EB5757" },
  { label: "Total Assigned Agents", value: "184", change: "+12", trend: "up", icon: "Handshake", color: "#3B82F6" },
  { label: "Active Agents", value: "168", change: "+8", trend: "up", icon: "Handshake", color: "#27AE60" },
  { label: "Suspended Agents", value: "4", change: "+1", trend: "down", icon: "Handshake", color: "#EB5757" },
  { label: "Total Assigned Hosts", value: "1,247", change: "+84", trend: "up", icon: "Mic", color: "#EF4444" },
  { label: "Active Hosts", value: "1,148", change: "+62", trend: "up", icon: "Mic", color: "#27AE60" },
  { label: "Live Hosts", value: "284", change: "+18", trend: "up", icon: "Radio", color: "#27AE60" },
  { label: "Pending Applications", value: "47", change: "+6", trend: "up", icon: "FileCheck", color: "#F2994A" },
  { label: "Pending Verifications", value: "28", change: "+4", trend: "up", icon: "BadgeCheck", color: "#F2994A" },
  { label: "Open Support Cases", value: "18", change: "-3", trend: "up", icon: "LifeBuoy", color: "#2F80ED" },
  { label: "Active Reports", value: "8", change: "+1", trend: "down", icon: "AlertTriangle", color: "#EB5757" },
  { label: "Active PK Battles", value: "12", change: "+2", trend: "up", icon: "Swords", color: "#EF4444" },
];

export const ADMIN_QUICK_ACTIONS = [
  { label: "Review Applications", icon: "FileCheck", color: "#F59E0B" },
  { label: "Verify Documents", icon: "BadgeCheck", color: "#10B981" },
  { label: "Manage Agencies", icon: "Building2", color: "#8B5CF6" },
  { label: "Manage Agents", icon: "Handshake", color: "#3B82F6" },
  { label: "Manage Hosts", icon: "Mic", color: "#EF4444" },
  { label: "Resolve Cases", icon: "LifeBuoy", color: "#2F80ED" },
  { label: "Generate Reports", icon: "FileText", color: "#64748B" },
];

export const ADMIN_REALTIME_COUNTERS = [
  { label: "Live Hosts", value: "284", icon: "Radio", color: "#27AE60" },
  { label: "Open Cases", value: "18", icon: "LifeBuoy", color: "#2F80ED" },
  { label: "Pending Apps", value: "47", icon: "FileCheck", color: "#F2994A" },
  { label: "PK Battles", value: "12", icon: "Swords", color: "#EF4444" },
  { label: "Active Events", value: "6", icon: "PartyPopper", color: "#EC4899" },
  { label: "Verifications", value: "28", icon: "BadgeCheck", color: "#10B981" },
];

export const ADMIN_LIVE_STREAM = [
  { text: "Host went live — LunaStar (AGY-012)", time: "now", status: "success" },
  { text: "New application submitted — Host: OceanVoice", time: "22s", status: "info" },
  { text: "Support case resolved — CS-4821", time: "48s", status: "success" },
  { text: "Verification approved — Apex Agency", time: "1m", status: "success" },
  { text: "PK battle started — LunaStar vs DesertRose", time: "1m", status: "info" },
  { text: "Warning issued — Host: GoldenDawn", time: "2m", status: "warning" },
  { text: "Agency report generated — Vyro Stars", time: "2m", status: "info" },
  { text: "Case escalated to Super Admin — AGY-015", time: "3m", status: "warning" },
  { text: "Verification pending — Agent: TM-031", time: "3m", status: "info" },
  { text: "Event launched — Host Recognition Gala", time: "4m", status: "success" },
];

export const ADMIN_AGENCIES = [
  { id: "AGY-012", name: "Global Talent", owner: "Sarah Chen", country: "USA", hosts: 47, agents: 8, revenue: "$284K", status: "Active", color: "#27AE60", date: "2026-01-14" },
  { id: "AGY-013", name: "Vyro Stars", owner: "Marcus Reed", country: "UK", hosts: 32, agents: 6, revenue: "$198K", status: "Active", color: "#27AE60", date: "2026-02-08" },
  { id: "AGY-014", name: "Apex Agency", owner: "Aisha Patel", country: "UAE", hosts: 24, agents: 4, revenue: "$148K", status: "Active", color: "#27AE60", date: "2026-03-22" },
  { id: "AGY-015", name: "Desert Voices", owner: "Khalid Omar", country: "Egypt", hosts: 18, agents: 3, revenue: "$84K", status: "Suspended", color: "#EB5757", date: "2026-04-10" },
  { id: "AGY-016", name: "Ocean Media", owner: "Emily Cruz", country: "Brazil", hosts: 12, agents: 2, revenue: "$48K", status: "Active", color: "#27AE60", date: "2026-05-18" },
];

export const ADMIN_AGENTS = [
  { id: "AGT-047", name: "TM-007", agency: "Global Talent", hosts: 12, rating: "98%", status: "Active", color: "#27AE60" },
  { id: "AGT-048", name: "TM-012", agency: "Vyro Stars", hosts: 8, rating: "94%", status: "Active", color: "#27AE60" },
  { id: "AGT-049", name: "TM-024", agency: "Apex Agency", hosts: 6, rating: "91%", status: "Active", color: "#27AE60" },
  { id: "AGT-050", name: "TM-031", agency: "Desert Voices", hosts: 4, rating: "78%", status: "Under Review", color: "#F2994A" },
  { id: "AGT-051", name: "TM-044", agency: "Ocean Media", hosts: 3, rating: "85%", status: "Suspended", color: "#EB5757" },
];

export const ADMIN_HOSTS = [
  { id: "HST-2847", name: "LunaStar", agency: "Global Talent", agent: "TM-007", level: "LV.42", hours: "184h", revenue: "$48K", followers: "284K", status: "Live", color: "#27AE60" },
  { id: "HST-2848", name: "DesertRose", agency: "Apex Agency", agent: "TM-024", level: "LV.38", hours: "168h", revenue: "$42K", followers: "198K", status: "Live", color: "#27AE60" },
  { id: "HST-2849", name: "OceanVoice", agency: "Vyro Stars", agent: "TM-012", level: "LV.34", hours: "142h", revenue: "$36K", followers: "128K", status: "Active", color: "#3B82F6" },
  { id: "HST-2850", name: "MountainEcho", agency: "Desert Voices", agent: "TM-031", level: "LV.28", hours: "98h", revenue: "$24K", followers: "84K", status: "Active", color: "#3B82F6" },
  { id: "HST-2851", name: "GoldenDawn", agency: "Ocean Media", agent: "TM-044", level: "LV.22", hours: "62h", revenue: "$12K", followers: "48K", status: "Warned", color: "#F2994A" },
];

export const ADMIN_APPLICATIONS = [
  { id: "APP-4821", type: "Host Application", applicant: "Stella Streams", agency: "Global Talent", date: "2026-07-03", status: "Pending", color: "#F2994A" },
  { id: "APP-4820", type: "Agency Application", applicant: "Apex Agency", agency: "—", date: "2026-07-02", status: "Under Review", color: "#3B82F6" },
  { id: "APP-4819", type: "Agent Application", applicant: "TM-007", agency: "Global Talent", date: "2026-07-02", status: "Pending", color: "#F2994A" },
  { id: "APP-4818", type: "Host Application", applicant: "OceanVoice", agency: "Vyro Stars", date: "2026-07-01", status: "Approved", color: "#27AE60" },
  { id: "APP-4817", type: "Agency Application", applicant: "Ocean Media", agency: "—", date: "2026-06-30", status: "Rejected", color: "#EB5757" },
  { id: "APP-4816", type: "Agent Application", applicant: "TM-044", agency: "Ocean Media", date: "2026-06-29", status: "Under Review", color: "#3B82F6" },
];

export const ADMIN_VERIFICATIONS = [
  { id: "VER-021", type: "Agency Verification", entity: "Apex Agency", documents: "Complete", status: "Pending", color: "#F2994A" },
  { id: "VER-022", type: "Agent Verification", entity: "TM-031", documents: "Complete", status: "Pending", color: "#F2994A" },
  { id: "VER-023", type: "Host Verification", entity: "Stella Streams", documents: "Complete", status: "Under Review", color: "#3B82F6" },
  { id: "VER-024", type: "Agency Verification", entity: "Ocean Media", documents: "Incomplete", status: "Re-Submission", color: "#EB5757" },
  { id: "VER-025", type: "Host Verification", entity: "OceanVoice", documents: "Complete", status: "Approved", color: "#27AE60" },
];

export const ADMIN_SUPPORT_CASES = [
  { id: "CS-4821", category: "Host Support", subject: "Stream connection issue", priority: "High", status: "Open", color: "#EB5757" },
  { id: "CS-4822", category: "Agency Support", subject: "Commission inquiry", priority: "Medium", status: "In Progress", color: "#F2994A" },
  { id: "CS-4823", category: "Technical", subject: "Gift delivery delay", priority: "High", status: "Open", color: "#EB5757" },
  { id: "CS-4824", category: "Agent Support", subject: "Recruitment question", priority: "Low", status: "Resolved", color: "#27AE60" },
  { id: "CS-4825", category: "Account", subject: "Profile update request", priority: "Low", status: "Closed", color: "#6B7280" },
];

export const ADMIN_REPORTS = [
  { id: "RPT-012", type: "Harassment Report", reporter: "LunaStar", target: "User-3847", severity: "Medium", status: "Investigating", color: "#F2994A" },
  { id: "RPT-013", type: "Policy Violation", reporter: "System", target: "GoldenDawn", severity: "High", status: "Warning Issued", color: "#EB5757" },
  { id: "RPT-014", type: "Fraud Report", reporter: "Apex Agency", target: "User-2841", severity: "High", status: "Escalated", color: "#EB5757" },
  { id: "RPT-015", type: "Spam Report", reporter: "OceanVoice", target: "User-1923", severity: "Low", status: "Resolved", color: "#27AE60" },
];

export const ADMIN_EVENTS = [
  { id: "EVT-301", name: "Host Recognition Gala", type: "Recognition", participants: "847", status: "Active", color: "#27AE60" },
  { id: "EVT-302", name: "Agency Partner Meeting", type: "Partnership", participants: "48", status: "Active", color: "#27AE60" },
  { id: "EVT-303", name: "Host Star Competition", type: "Competition", participants: "284", status: "Scheduled", color: "#F2994A" },
  { id: "EVT-304", name: "Q3 Kickoff Event", type: "Business", participants: "147", status: "Completed", color: "#6B7280" },
];

export const ADMIN_PK_BATTLES = [
  { id: "PK-0847", match: "LunaStar vs DesertRose", score: "84K : 72K", status: "Live", color: "#27AE60" },
  { id: "PK-0848", match: "OceanVoice vs MountainEcho", score: "48K : 36K", status: "Live", color: "#27AE60" },
  { id: "PK-0849", match: "GoldenDawn vs NorthernLights", score: "12K : 24K", status: "Completed", color: "#6B7280" },
  { id: "PK-0850", match: "Stella vs AuroraVoice", score: "—", status: "Scheduled", color: "#F2994A" },
];

export const ADMIN_COMM_TARGETS = [
  { label: "Assigned Agencies", icon: "Building2", color: "#8B5CF6" },
  { label: "Assigned Agents", icon: "Handshake", color: "#3B82F6" },
  { label: "Assigned Hosts", icon: "Mic", color: "#EF4444" },
];

export const ADMIN_COMM_TYPES = [
  { label: "Push Notification", icon: "Bell", color: "#F2994A" },
  { label: "In-App Message", icon: "MessageSquare", color: "#27AE60" },
  { label: "Broadcast", icon: "Megaphone", color: "#3B82F6" },
  { label: "Performance Alert", icon: "TrendingUp", color: "#10B981" },
  { label: "Compliance Notice", icon: "AlertTriangle", color: "#EB5757" },
  { label: "Event Notification", icon: "PartyPopper", color: "#EC4899" },
];

export const ADMIN_ANALYTICS = [
  { metric: "Agency Performance", value: "94.2%", change: "+2.4%", color: "#8B5CF6", icon: "Building2" },
  { metric: "Agent Performance", value: "91.8%", change: "+1.8%", color: "#3B82F6", icon: "Handshake" },
  { metric: "Host Performance", value: "88.4%", change: "+3.2%", color: "#EF4444", icon: "Mic" },
  { metric: "Applications Processed", value: "482", change: "+38", color: "#F59E0B", icon: "FileCheck" },
  { metric: "Verifications Done", value: "284", change: "+24", color: "#10B981", icon: "BadgeCheck" },
  { metric: "Cases Resolved", value: "168", change: "+18", color: "#2F80ED", icon: "LifeBuoy" },
  { metric: "Reports Closed", value: "47", change: "+6", color: "#EB5757", icon: "AlertTriangle" },
  { metric: "Event Reports", value: "12", change: "+2", color: "#EC4899", icon: "PartyPopper" },
];

export const ADMIN_AUDIT_LOGS = [
  { action: "Application Approved", entity: "OceanVoice", admin: "Admin-012", time: "2m ago", color: "#27AE60" },
  { action: "Verification Completed", entity: "Apex Agency", admin: "Admin-012", time: "12m ago", color: "#27AE60" },
  { action: "Warning Issued", entity: "GoldenDawn", admin: "Admin-012", time: "34m ago", color: "#F2994A" },
  { action: "Case Resolved", entity: "CS-4824", admin: "Admin-012", time: "1h ago", color: "#27AE60" },
  { action: "Case Escalated", entity: "AGY-015", admin: "Admin-012", time: "2h ago", color: "#EB5757" },
  { action: "Report Generated", entity: "Vyro Stars", admin: "Admin-012", time: "2h ago", color: "#3B82F6" },
  { action: "Notice Sent", entity: "TM-031", admin: "Admin-012", time: "3h ago", color: "#3B82F6" },
  { action: "PK Result Verified", entity: "PK-0849", admin: "Admin-012", time: "4h ago", color: "#27AE60" },
];

export const ADMIN_REPORTING_STRUCTURE = { reportsTo: "Super Admin", icon: "Shield", color: "#475569", manages: ["Assigned Agencies", "Assigned Talent Agents", "Assigned Hosts"] };