// Agency Dashboard Data — VYRO Live Connect Enterprise

export const AGENCY_INFO = {
  agency_name: "VYRO Elite Agency",
  agency_id: "AGY-2024-0012",
  logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150",
  registration_number: "REG-US-8847-2024",
  country: "United States",
  country_flag: "🇺🇸",
  contact: "contact@vyroelite.com",
  manager_name: "Robert Chen",
  verification_status: "Verified",
  join_date: "Jan 2024",
  rank: "#3",
  level: "Platinum",
  status: "Active",
  performance_score: 92,
};

export const AGENCY_HOME_CARDS = [
  { label: "Agency ID", value: "AGY-0012", icon: "🆔", color: "#3B82F6" },
  { label: "Agency Status", value: "Active", icon: "✅", color: "#10B981" },
  { label: "Verification", value: "Verified", icon: " BadgeCheck", color: "#D4AF37" },
  { label: "Total Agents", value: "24", icon: "👨‍💼", color: "#8B5CF6" },
  { label: "Active Agents", value: "22", icon: "✅", color: "#10B981" },
  { label: "Total Hosts", value: "186", icon: "🎤", color: "#EC4899" },
  { label: "Active Hosts", value: "172", icon: "🟢", color: "#10B981" },
  { label: "Online Hosts", value: "48", icon: "⚡", color: "#F59E0B" },
  { label: "Live Hosts", value: "24", icon: "🔴", color: "#EF4444" },
  { label: "Total Revenue", value: "$84.2K", icon: "💰", color: "#D4AF37" },
  { label: "Monthly Revenue", value: "$12.4K", icon: "📈", color: "#10B981" },
  { label: "Total Commission", value: "$18.6K", icon: "💎", color: "#3B82F6" },
  { label: "Pending Commission", value: "$2,340", icon: "⏳", color: "#F59E0B" },
  { label: "Wallet Balance", value: "$8,920", icon: "👛", color: "#D4AF37" },
  { label: "Performance Score", value: "92%", icon: "🎯", color: "#8B5CF6" },
  { label: "Agency Rank", value: "#3", icon: "🏆", color: "#D4AF37" },
];

export const AGENCY_HOME_ACTIONS = [
  { label: "Add Agent", icon: "➕", color: "#3B82F6" },
  { label: "Approve Host", icon: "✅", color: "#10B981" },
  { label: "Invite Host", icon: "📨", color: "#EC4899" },
  { label: "View Reports", icon: "📊", color: "#8B5CF6" },
  { label: "Wallet", icon: "💰", color: "#D4AF37" },
  { label: "Performance", icon: "🎯", color: "#F59E0B" },
  { label: "Notifications", icon: "🔔", color: "#EF4444" },
];

export const AGENCY_MODULES = [
  { id: "home", title: "Home", icon: "🏠", color: "#D4AF37", gradient: "linear-gradient(135deg, #D4AF37, #B8941E)" },
  { id: "profile", title: "Profile", icon: "🏢", color: "#3B82F6", gradient: "linear-gradient(135deg, #3B82F6, #2563EB)" },
  { id: "agents", title: "Agents", icon: "👨‍💼", color: "#8B5CF6", gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)" },
  { id: "hosts", title: "Hosts", icon: "🎤", color: "#EC4899", gradient: "linear-gradient(135deg, #EC4899, #DB2777)" },
  { id: "finance", title: "Finance", icon: "💰", color: "#10B981", gradient: "linear-gradient(135deg, #10B981, #059669)" },
  { id: "analytics", title: "Analytics", icon: "📊", color: "#06B6D4", gradient: "linear-gradient(135deg, #06B6D4, #0891B2)" },
  { id: "performance", title: "Performance", icon: "🎯", color: "#F59E0B", gradient: "linear-gradient(135deg, #F59E0B, #D97706)" },
  { id: "events", title: "Events", icon: "🎁", color: "#EC4899", gradient: "linear-gradient(135deg, #EC4899, #BE185D)" },
  { id: "recruitment", title: "Recruit", icon: "👥", color: "#3B82F6", gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)" },
  { id: "communication", title: "Comms", icon: "💬", color: "#06B6D4", gradient: "linear-gradient(135deg, #06B6D4, #0E7490)" },
  { id: "reports", title: "Reports", icon: "📄", color: "#64748B", gradient: "linear-gradient(135deg, #64748B, #475569)" },
  { id: "notifications", title: "Alerts", icon: "🔔", color: "#F59E0B", gradient: "linear-gradient(135deg, #F59E0B, #D97706)" },
  { id: "compliance", title: "Compliance", icon: "🛡️", color: "#10B981", gradient: "linear-gradient(135deg, #10B981, #047857)" },
  { id: "settings", title: "Settings", icon: "⚙️", color: "#64748B", gradient: "linear-gradient(135deg, #64748B, #475569)" },
  { id: "support", title: "Support", icon: "📞", color: "#06B6D4", gradient: "linear-gradient(135deg, #06B6D4, #0E7490)" },
];

export const AGENTS_DATA = {
  stats: [
    { label: "Total Agents", value: "24", icon: "👨‍💼", color: "#8B5CF6" },
    { label: "Active Agents", value: "22", icon: "✅", color: "#10B981" },
    { label: "Pending Agents", value: "1", icon: "⏳", color: "#F59E0B" },
    { label: "Suspended Agents", value: "1", icon: "🚫", color: "#EF4444" },
  ],
  topAgents: [
    { name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80", hosts: 18, revenue: "$8.2K", performance: 95, status: "active" },
    { name: "Mike Anderson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80", hosts: 15, revenue: "$6.8K", performance: 88, status: "active" },
    { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80", hosts: 12, revenue: "$5.4K", performance: 82, status: "active" },
    { name: "John Davis", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80", hosts: 10, revenue: "$4.1K", performance: 76, status: "pending" },
  ],
  actions: [
    { label: "Add Agent", icon: "➕", color: "#3B82F6" },
    { label: "Remove Agent", icon: "➖", color: "#EF4444" },
    { label: "Approve Agent", icon: "✅", color: "#10B981" },
    { label: "Suspend Agent", icon: "⏸️", color: "#F59E0B" },
    { label: "Search Agent", icon: "🔍", color: "#06B6D4" },
    { label: "View Performance", icon: "📊", color: "#8B5CF6" },
    { label: "Assign Hosts", icon: "👥", color: "#EC4899" },
    { label: "Transfer Hosts", icon: "🔄", color: "#D4AF37" },
  ],
};

export const HOSTS_DATA = {
  stats: [
    { label: "Total Hosts", value: "186", icon: "🎤", color: "#EC4899" },
    { label: "Online Hosts", value: "48", icon: "⚡", color: "#F59E0B" },
    { label: "Live Hosts", value: "24", icon: "🔴", color: "#EF4444" },
    { label: "Inactive Hosts", value: "14", icon: "💤", color: "#64748B" },
    { label: "Verified Hosts", value: "168", icon: "✅", color: "#10B981" },
    { label: "Pending Approval", value: "8", icon: "⏳", color: "#F59E0B" },
  ],
  hosts: [
    { name: "Sarah_K", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80", status: "live", viewers: "2.4K", earnings: "$1.2K", agent: "Sarah J." },
    { name: "Mike_Live", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80", status: "online", viewers: "0", earnings: "$890", agent: "Mike A." },
    { name: "Emma_Star", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80", status: "live", viewers: "3.1K", earnings: "$2.4K", agent: "Emma W." },
    { name: "John_Pro", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80", status: "offline", viewers: "0", earnings: "$670", agent: "John D." },
  ],
  actions: [
    { label: "Approve Host", icon: "✅", color: "#10B981" },
    { label: "Reject Application", icon: "❌", color: "#EF4444" },
    { label: "Suspend Host", icon: "⏸️", color: "#F59E0B" },
    { label: "Activate Host", icon: "▶️", color: "#10B981" },
    { label: "Search Host", icon: "🔍", color: "#06B6D4" },
    { label: "View Profile", icon: "👤", color: "#3B82F6" },
    { label: "View Earnings", icon: "💰", color: "#D4AF37" },
    { label: "Monitor Live", icon: "📺", color: "#8B5CF6" },
    { label: "Assign Agent", icon: "👨‍💼", color: "#EC4899" },
    { label: "Remove Host", icon: "🗑️", color: "#EF4444" },
  ],
};

export const FINANCE_DATA = {
  stats: [
    { label: "Total Revenue", value: "$84.2K", icon: "💰", color: "#D4AF37" },
    { label: "Agency Commission", value: "$18.6K", icon: "💎", color: "#3B82F6" },
    { label: "Pending Commission", value: "$2,340", icon: "⏳", color: "#F59E0B" },
    { label: "Monthly Income", value: "$12.4K", icon: "📈", color: "#10B981" },
    { label: "Wallet Balance", value: "$8,920", icon: "👛", color: "#D4AF37" },
    { label: "Bonus Earnings", value: "$1,580", icon: "🎁", color: "#EC4899" },
  ],
  revenueBreakdown: [
    { month: "Jan", value: 8.2 }, { month: "Feb", value: 9.4 }, { month: "Mar", value: 11.2 },
    { month: "Apr", value: 10.8 }, { month: "May", value: 12.4 }, { month: "Jun", value: 14.1 },
  ],
  withdrawal: { status: "Available", amount: "$8,920", nextDate: "Jul 5" },
  transactions: [
    { type: "Commission Received", detail: "From Host Sarah_K", amount: "+$1,240", date: "Today", color: "#10B981" },
    { type: "Withdrawal", detail: "Bank transfer", amount: "-$3,000", date: "Yesterday", color: "#EF4444" },
    { type: "Bonus Earned", detail: "Monthly performance", amount: "+$500", date: "3 days ago", color: "#10B981" },
  ],
  actions: [
    { label: "Withdraw Funds", icon: "💸", color: "#10B981" },
    { label: "Transactions", icon: "📋", color: "#3B82F6" },
    { label: "Commission Report", icon: "💎", color: "#D4AF37" },
    { label: "Earnings Report", icon: "📊", color: "#8B5CF6" },
    { label: "Payment History", icon: "💳", color: "#06B6D4" },
    { label: "Tax Report", icon: "🧾", color: "#EF4444" },
  ],
};

export const ANALYTICS_DATA = {
  stats: [
    { label: "Daily Revenue", value: "$420", icon: "📅", color: "#10B981" },
    { label: "Weekly Revenue", value: "$2.8K", icon: "📆", color: "#3B82F6" },
    { label: "Monthly Revenue", value: "$12.4K", icon: "📊", color: "#D4AF37" },
    { label: "Yearly Revenue", value: "$84.2K", icon: "📈", color: "#8B5CF6" },
    { label: "Live Hours", value: "1,847", icon: "⏱️", color: "#EC4899" },
    { label: "Viewer Count", value: "284K", icon: "👁️", color: "#06B6D4" },
    { label: "Gift Revenue", value: "$42.1K", icon: "🎁", color: "#EC4899" },
    { label: "PK Revenue", value: "$18.4K", icon: "⚔️", color: "#8B5CF6" },
    { label: "Growth Rate", value: "+18%", icon: "📈", color: "#10B981" },
    { label: "Retention Rate", value: "87%", icon: "🔄", color: "#F59E0B" },
  ],
  weekly: [
    { day: "Mon", value: 65 }, { day: "Tue", value: 80 }, { day: "Wed", value: 45 },
    { day: "Thu", value: 90 }, { day: "Fri", value: 100 }, { day: "Sat", value: 75 }, { day: "Sun", value: 60 },
  ],
  actions: [
    { label: "Export Reports", icon: "📤", color: "#3B82F6" },
    { label: "Download Analytics", icon: "📥", color: "#10B981" },
    { label: "Compare Performance", icon: "📊", color: "#8B5CF6" },
    { label: "View Trends", icon: "📈", color: "#D4AF37" },
  ],
};

export const PERFORMANCE_DATA = {
  ranking: "#3",
  monthlyTarget: "$15,000",
  completedTarget: "$12,400",
  targetPct: 83,
  bonusProgress: 72,
  activeCampaigns: 4,
  leaderboardPos: 3,
  leaderboard: [
    { name: "VYRO Prime", rank: 1, score: "98.5K", isYou: false },
    { name: "Elite Stars", rank: 2, score: "91.2K", isYou: false },
    { name: "VYRO Elite Agency", rank: 3, score: "84.2K", isYou: true },
    { name: "Golden Hosts", rank: 4, score: "78.9K", isYou: false },
    { name: "Diamond Crew", rank: 5, score: "72.1K", isYou: false },
  ],
  actions: [
    { label: "View Leaderboard", icon: "🏆", color: "#D4AF37" },
    { label: "Claim Bonus", icon: "🎁", color: "#EC4899" },
    { label: "Monitor Performance", icon: "📊", color: "#3B82F6" },
    { label: "Performance Reports", icon: "📄", color: "#64748B" },
  ],
};

export const EVENTS_DATA = {
  current: [
    { title: "Summer PK Cup", desc: "Agency PK championship", reward: "$5,000", daysLeft: "5 days", icon: "🏆", color: "#D4AF37" },
    { title: "Recruitment Drive", desc: "Recruit 10 new hosts", reward: "$2,000", daysLeft: "12 days", icon: "👥", color: "#3B82F6" },
  ],
  upcoming: [
    { title: "Anniversary Gala", desc: "Platform celebration", date: "Jul 15", icon: "🎉", color: "#EC4899" },
    { title: "Host Championship", desc: "Top host competition", date: "Jul 20", icon: "🎤", color: "#8B5CF6" },
  ],
  pkCompetitions: [
    { title: "Agency PK League", teams: 8, status: "active", icon: "⚔️", color: "#8B5CF6" },
    { title: "Summer Tournament", teams: 16, status: "upcoming", icon: "🏆", color: "#D4AF37" },
  ],
  actions: [
    { label: "Register Agency", icon: "🏢", color: "#3B82F6" },
    { label: "Register Hosts", icon: "🎤", color: "#EC4899" },
    { label: "Join Campaign", icon: "✅", color: "#10B981" },
    { label: "View Results", icon: "📊", color: "#06B6D4" },
    { label: "Claim Rewards", icon: "🎁", color: "#D4AF37" },
  ],
};

export const RECRUITMENT_DATA = {
  stats: [
    { label: "New Applications", value: "12", icon: "📋", color: "#3B82F6" },
    { label: "Pending Reviews", value: "5", icon: "⏳", color: "#F59E0B" },
    { label: "Approved Hosts", value: "8", icon: "✅", color: "#10B981" },
    { label: "Rejected", value: "2", icon: "❌", color: "#EF4444" },
  ],
  applicants: [
    { name: "Lisa_Star", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60", country: "🇺🇸", date: "Today", status: "pending" },
    { name: "Tom_Pro", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60", country: "🇬🇧", date: "Yesterday", status: "pending" },
    { name: "Anna_Live", avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=60", country: "🇨🇦", date: "2 days ago", status: "approved" },
  ],
  actions: [
    { label: "Invite Hosts", icon: "📨", color: "#3B82F6" },
    { label: "Review Applications", icon: "📋", color: "#F59E0B" },
    { label: "Schedule Interviews", icon: "📅", color: "#8B5CF6" },
    { label: "Approve Recruitment", icon: "✅", color: "#10B981" },
    { label: "Reject Applications", icon: "❌", color: "#EF4444" },
  ],
};

export const COMMUNICATION_DATA = {
  features: [
    { label: "Chat with Agents", icon: "👨‍💼", desc: "Message your agents", color: "#8B5CF6", count: 3 },
    { label: "Chat with Hosts", icon: "🎤", desc: "Message your hosts", color: "#EC4899", count: 8 },
    { label: "Broadcast Messages", icon: "📢", desc: "Send to all members", color: "#3B82F6" },
    { label: "Announcement Center", icon: "📋", desc: "Post announcements", color: "#F59E0B" },
    { label: "Notice Board", icon: "📌", desc: "Pin important notices", color: "#10B981" },
  ],
  actions: [
    { label: "Send Messages", icon: "💬", color: "#3B82F6" },
    { label: "Send Notifications", icon: "🔔", color: "#F59E0B" },
    { label: "Create Announcement", icon: "📢", color: "#EC4899" },
    { label: "Delete Messages", icon: "🗑️", color: "#EF4444" },
  ],
};

export const REPORTS_DATA = {
  reports: [
    { label: "Revenue Report", icon: "💰", color: "#D4AF37" },
    { label: "Commission Report", icon: "💎", color: "#3B82F6" },
    { label: "Agent Report", icon: "👨‍💼", color: "#8B5CF6" },
    { label: "Host Report", icon: "🎤", color: "#EC4899" },
    { label: "Activity Report", icon: "📊", color: "#06B6D4" },
    { label: "Violation Report", icon: "⚠️", color: "#EF4444" },
    { label: "Financial Report", icon: "📋", color: "#10B981" },
  ],
  actions: [
    { label: "Export PDF", icon: "📄", color: "#EF4444" },
    { label: "Export Excel", icon: "📗", color: "#10B981" },
    { label: "Print Report", icon: "🖨️", color: "#3B82F6" },
    { label: "Share Report", icon: "📤", color: "#06B6D4" },
  ],
};

export const AGENCY_NOTIFICATIONS_DATA = {
  categories: [
    { name: "Agency", count: 3, icon: "🏢", color: "#3B82F6" },
    { name: "Financial", count: 2, icon: "💰", color: "#D4AF37" },
    { name: "Host Alerts", count: 5, icon: "🎤", color: "#EC4899" },
    { name: "Agent Alerts", count: 1, icon: "👨‍💼", color: "#8B5CF6" },
    { name: "Events", count: 4, icon: "🎉", color: "#F59E0B" },
    { name: "Security", count: 1, icon: "🔒", color: "#EF4444" },
  ],
  recent: [
    { title: "New Host Application", desc: "Lisa_Star applied to join", time: "5m ago", icon: "📋", color: "#3B82F6", unread: true },
    { title: "Commission Received", desc: "+$1,240 from Sarah_K", time: "1h ago", icon: "💰", color: "#D4AF37", unread: true },
    { title: "Host Went Live", desc: "Emma_Star is now live", time: "2h ago", icon: "🔴", color: "#EF4444", unread: true },
    { title: "PK Battle Won", desc: "Your agency won the PK", time: "5h ago", icon: "🏆", color: "#F59E0B", unread: false },
    { title: "Security Alert", desc: "New login from admin", time: "8h ago", icon: "🔒", color: "#EF4444", unread: false },
  ],
};

export const COMPLIANCE_DATA = {
  features: [
    { label: "Policy Violations", icon: "⚠️", desc: "Review policy violations", count: 2, color: "#EF4444" },
    { label: "Fraud Detection", icon: "🔍", desc: "Monitor fraud alerts", count: 0, color: "#F59E0B" },
    { label: "KYC Verification", icon: "🪪", desc: "Verify host identities", count: 8, color: "#3B82F6" },
    { label: "Identity Verification", icon: "🆔", desc: "Host identity checks", count: 5, color: "#8B5CF6" },
    { label: "AML Monitoring", icon: "📊", desc: "Anti-money laundering", count: 0, color: "#10B981" },
    { label: "Audit Logs", icon: "📜", desc: "View activity logs", color: "#64748B" },
  ],
  actions: [
    { label: "Review Violations", icon: "📋", color: "#EF4444" },
    { label: "Submit Appeals", icon: "✋", color: "#F59E0B" },
    { label: "Verify Documents", icon: "📄", color: "#3B82F6" },
    { label: "Compliance Reports", icon: "📊", color: "#10B981" },
  ],
};

export const AGENCY_SETTINGS_DATA = {
  general: [
    { label: "General Settings", icon: "⚙️" }, { label: "Commission Settings", icon: "💎" },
    { label: "Payment Settings", icon: "💳" }, { label: "Security Settings", icon: "🔒" },
    { label: "Notification Settings", icon: "🔔" }, { label: "Language", icon: "🌐", status: "English" },
    { label: "Theme", icon: "🎨", status: "Dark" }, { label: "Time Zone", icon: "🕐", status: "UTC-5" },
  ],
  security: [
    { label: "Change Password", icon: "🔑" }, { label: "Two-Factor Auth", icon: "🔐", status: "On" },
    { label: "Login History", icon: "📋" }, { label: "Active Sessions", icon: "🔄", status: "2 active" },
    { label: "Device Management", icon: "💻", status: "3 devices" },
  ],
};

export const AGENCY_SUPPORT_DATA = {
  options: [
    { label: "Help Center", icon: "📚", desc: "Browse guides and tutorials", color: "#3B82F6" },
    { label: "Support Tickets", icon: "🎫", desc: "View and manage tickets", color: "#F59E0B" },
    { label: "Live Support Chat", icon: "💬", desc: "Chat with support agent", color: "#10B981" },
    { label: "FAQ", icon: "❓", desc: "Frequently asked questions", color: "#06B6D4" },
    { label: "Technical Support", icon: "🔧", desc: "Technical assistance", color: "#8B5CF6" },
    { label: "Financial Support", icon: "💰", desc: "Financial inquiries", color: "#D4AF37" },
    { label: "Compliance Support", icon: "🛡️", desc: "Compliance assistance", color: "#10B981" },
  ],
  actions: [
    { label: "Submit Ticket", icon: "🎫", color: "#F59E0B" },
    { label: "Contact Support", icon: "📞", color: "#3B82F6" },
    { label: "Report Bug", icon: "🐛", color: "#EF4444" },
    { label: "Send Feedback", icon: "💭", color: "#8B5CF6" },
  ],
};

export const AGENCY_QUICK_ACTIONS = [
  { label: "Dashboard", icon: "🏠", path: "home" },
  { label: "Agents", icon: "👨‍💼", path: "agents" },
  { label: "Hosts", icon: "🎤", path: "hosts" },
  { label: "Wallet", icon: "💰", path: "finance" },
  { label: "Analytics", icon: "📊", path: "analytics" },
  { label: "Performance", icon: "🎯", path: "performance" },
  { label: "Events", icon: "🎁", path: "events" },
  { label: "Reports", icon: "📄", path: "reports" },
  { label: "Alerts", icon: "🔔", path: "notifications" },
  { label: "Settings", icon: "⚙️", path: "settings" },
];