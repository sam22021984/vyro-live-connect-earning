// Owner Dashboard data — VYRO Live Connect Earning

export const OWNER_SECTIONS = [
  { id: "home", label: "Dashboard", icon: "LayoutDashboard", color: "#2F80ED" },
  { id: "search", label: "Search", icon: "Search", color: "#56CCF2" },
  { id: "countries", label: "Countries", icon: "Globe", color: "#27AE60" },
  { id: "roles", label: "Roles", icon: "Users", color: "#8B5CF6" },
  { id: "applications", label: "Applications", icon: "FileText", color: "#F2994A" },
  { id: "revenue", label: "Revenue", icon: "DollarSign", color: "#27AE60" },
  { id: "gifts", label: "Gifts", icon: "Gift", color: "#EB5757" },
  { id: "coins", label: "Coins", icon: "Coins", color: "#F2994A" },
  { id: "rankings", label: "Rankings", icon: "Trophy", color: "#D4AF37" },
  { id: "live", label: "Live Monitor", icon: "Radio", color: "#EB5757" },
  { id: "ai", label: "AI Monitor", icon: "Bot", color: "#A78BFA" },
  { id: "security", label: "Security", icon: "ShieldCheck", color: "#2F80ED" },
  { id: "finance", label: "Finance", icon: "CreditCard", color: "#27AE60" },
  { id: "audit", label: "Audit", icon: "ScrollText", color: "#8B5CF6" },
  { id: "broadcast", label: "Broadcast", icon: "Megaphone", color: "#F2994A" },
  { id: "automation", label: "Automation", icon: "Cpu", color: "#A78BFA" },
  { id: "bi", label: "BI Center", icon: "TrendingUp", color: "#2F80ED" },
  { id: "userdata", label: "User Data", icon: "Smartphone", color: "#2F80ED" },
  { id: "settings", label: "Settings", icon: "Settings", color: "#6B7280" },
  { id: "powers", label: "Owner Powers", icon: "Crown", color: "#D4AF37" },
];

export const SUMMARY_KPIS = [
  { label: "Total Countries", value: "195", change: "+2", trend: "up", icon: "Globe", color: "#27AE60" },
  { label: "Total Users", value: "8.4M", change: "+12.5%", trend: "up", icon: "Users", color: "#2F80ED" },
  { label: "Total Hosts", value: "42,318", change: "+8.2%", trend: "up", icon: "Mic", color: "#EB5757" },
  { label: "Talent Agents", value: "3,847", change: "+5.1%", trend: "up", icon: "UserCheck", color: "#A78BFA" },
  { label: "Agencies", value: "1,205", change: "+3.4%", trend: "up", icon: "Building2", color: "#8B5CF6" },
  { label: "Admins", value: "89", change: "+1", trend: "up", icon: "Shield", color: "#F2994A" },
  { label: "Super Admins", value: "24", change: "0", trend: "flat", icon: "Crown", color: "#D4AF37" },
  { label: "Managers", value: "156", change: "+4", trend: "up", icon: "Briefcase", color: "#56CCF2" },
  { label: "Active Streams", value: "12,847", change: "+15.3%", trend: "up", icon: "Radio", color: "#EB5757" },
  { label: "Total Revenue", value: "$48.2M", change: "+18.7%", trend: "up", icon: "DollarSign", color: "#27AE60" },
  { label: "Today's Revenue", value: "$284K", change: "+6.2%", trend: "up", icon: "TrendingUp", color: "#27AE60" },
  { label: "Monthly Revenue", value: "$8.4M", change: "+9.1%", trend: "up", icon: "Calendar", color: "#27AE60" },
];

export const REALTIME_COUNTERS = [
  { label: "Online Users", value: "1,284,392", icon: "Wifi", color: "#27AE60" },
  { label: "Live Hosts", value: "8,471", icon: "Mic", color: "#EB5757" },
  { label: "Active PK Battles", value: "342", icon: "Swords", color: "#F2994A" },
  { label: "Active Voice Rooms", value: "5,128", icon: "Headphones", color: "#2F80ED" },
  { label: "Active Party Rooms", value: "2,847", icon: "PartyPopper", color: "#A78BFA" },
  { label: "Active Gifts", value: "47,283", icon: "Gift", color: "#EB5757" },
  { label: "Current Revenue", value: "$2,847/min", icon: "DollarSign", color: "#27AE60" },
];

export const LIVE_DATA_STREAM = [
  { type: "transaction", text: "User #VYR-8472 recharged $50", time: "now", status: "success" },
  { type: "user", text: "New host verified in Egypt", time: "12s", status: "info" },
  { type: "alert", text: "VPN detected — User #VYR-2918", time: "34s", status: "warning" },
  { type: "gift", text: "Luxury gift sent — 5,000 coins", time: "48s", status: "success" },
  { type: "transaction", text: "Withdrawal request: $1,200", time: "1m", status: "info" },
  { type: "alert", text: "Multi-account flagged — 3 accounts", time: "1m", status: "error" },
  { type: "user", text: "Agency approved — Nigeria", time: "2m", status: "success" },
  { type: "gift", text: "PK battle gift surge — Room #4821", time: "2m", status: "info" },
  { type: "transaction", text: "VIP purchase — $199", time: "3m", status: "success" },
  { type: "alert", text: "Spam activity — 5 messages blocked", time: "3m", status: "warning" },
];

export const COUNTRIES = [
  { name: "United States", code: "US", manager: "J. Carter", users: "1.2M", hosts: "4,820", revenue: "$8.4M", growth: "+12%" },
  { name: "India", code: "IN", manager: "A. Patel", users: "2.1M", hosts: "8,471", revenue: "$6.2M", growth: "+18%" },
  { name: "Egypt", code: "EG", manager: "M. Hassan", users: "847K", hosts: "3,128", revenue: "$3.8M", growth: "+22%" },
  { name: "Nigeria", code: "NG", manager: "C. Okafor", users: "628K", hosts: "2,847", revenue: "$2.9M", growth: "+15%" },
  { name: "Brazil", code: "BR", manager: "L. Silva", users: "514K", hosts: "1,928", revenue: "$2.4M", growth: "+9%" },
  { name: "Indonesia", code: "ID", manager: "R. Pratama", users: "482K", hosts: "1,712", revenue: "$2.1M", growth: "+14%" },
  { name: "Pakistan", code: "PK", manager: "S. Khan", users: "389K", hosts: "1,284", revenue: "$1.8M", growth: "+11%" },
  { name: "Saudi Arabia", code: "SA", manager: "F. Al-Rashid", users: "247K", hosts: "892", revenue: "$3.2M", growth: "+8%" },
];

export const ROLES = [
  { name: "Platform Users", count: "8.4M", color: "#2F80ED" },
  { name: "Host", count: "42,318", color: "#EB5757" },
  { name: "Talent Agent", count: "3,847", color: "#A78BFA" },
  { name: "Agency Partner", count: "1,205", color: "#8B5CF6" },
  { name: "Admin", count: "89", color: "#F2994A" },
  { name: "Super Admin", count: "24", color: "#D4AF37" },
  { name: "Reward Manager", count: "18", color: "#27AE60" },
  { name: "PK Manager", count: "22", color: "#EB5757" },
  { name: "Event Manager", count: "15", color: "#56CCF2" },
  { name: "VIP Manager", count: "28", color: "#A78BFA" },
  { name: "Finance Manager", count: "12", color: "#27AE60" },
  { name: "Support Manager", count: "34", color: "#2F80ED" },
  { name: "Business Manager", count: "19", color: "#F2994A" },
  { name: "Business Developer", count: "8", color: "#8B5CF6" },
  { name: "Country Manager", count: "42", color: "#56CCF2" },
  { name: "Super Admin Manager", count: "6", color: "#D4AF37" },
];

export const APPLICATIONS = [
  { type: "Host Applications", pending: 847, approved: 3829, rejected: 218, color: "#EB5757" },
  { type: "Talent Agent Applications", pending: 124, approved: 3847, rejected: 47, color: "#A78BFA" },
  { type: "Agency Applications", pending: 38, approved: 1205, rejected: 19, color: "#8B5CF6" },
  { type: "Admin Applications", pending: 8, approved: 89, rejected: 3, color: "#F2994A" },
  { type: "Super Admin Applications", pending: 2, approved: 24, rejected: 1, color: "#D4AF37" },
  { type: "Reward Manager", pending: 4, approved: 18, rejected: 0, color: "#27AE60" },
  { type: "PK Manager", pending: 3, approved: 22, rejected: 1, color: "#EB5757" },
  { type: "Event Manager", pending: 2, approved: 15, rejected: 0, color: "#56CCF2" },
  { type: "VIP Manager", pending: 5, approved: 28, rejected: 1, color: "#A78BFA" },
  { type: "Finance Manager", pending: 1, approved: 12, rejected: 0, color: "#27AE60" },
  { type: "Support Manager", pending: 6, approved: 34, rejected: 2, color: "#2F80ED" },
  { type: "Business Manager", pending: 3, approved: 19, rejected: 1, color: "#F2994A" },
  { type: "Business Developer", pending: 1, approved: 8, rejected: 0, color: "#8B5CF6" },
  { type: "Country Manager", pending: 4, approved: 42, rejected: 1, color: "#56CCF2" },
];

export const REVENUE_BREAKDOWN = [
  { source: "Gift Revenue", amount: "$24.8M", percent: "51.5%", color: "#EB5757" },
  { source: "VIP Revenue", amount: "$8.4M", percent: "17.4%", color: "#D4AF37" },
  { source: "Coin Recharge", amount: "$6.2M", percent: "12.9%", color: "#F2994A" },
  { source: "Official Seller", amount: "$4.8M", percent: "10.0%", color: "#27AE60" },
  { source: "Event Revenue", amount: "$2.4M", percent: "5.0%", color: "#A78BFA" },
  { source: "Other", amount: "$1.6M", percent: "3.2%", color: "#6B7280" },
];

export const REVENUE_PERIODS = [
  { label: "Daily", value: "$284K" },
  { label: "Weekly", value: "$1.9M" },
  { label: "Monthly", value: "$8.4M" },
  { label: "Yearly", value: "$48.2M" },
  { label: "Lifetime", value: "$184M" },
];

export const GIFT_STATS = [
  { label: "Total Gifts Sent", value: "18.4M", icon: "Gift", color: "#EB5757" },
  { label: "Total Gift Revenue", value: "$24.8M", icon: "DollarSign", color: "#27AE60" },
  { label: "Top Gift", value: "Golden Crown", icon: "Crown", color: "#D4AF37" },
  { label: "Top Gifter", value: "VYR-4829", icon: "Star", color: "#A78BFA" },
];

export const COIN_STATS = [
  { label: "Total Coins Purchased", value: "482M", icon: "Coins", color: "#F2994A" },
  { label: "Total Coins Spent", value: "384M", icon: "TrendingDown", color: "#EB5757" },
  { label: "Total Coins Gifted", value: "298M", icon: "Gift", color: "#A78BFA" },
  { label: "Total Coins Remaining", value: "98M", icon: "Wallet", color: "#27AE60" },
];

export const RANKINGS = [
  { category: "Top Countries", icon: "Globe", top: ["India", "United States", "Egypt"] },
  { category: "Top Agencies", icon: "Building2", top: ["Vyro Stars", "Global Talent", "Apex Agency"] },
  { category: "Top Talent Agents", icon: "UserCheck", top: ["A. Patel", "M. Hassan", "C. Okafor"] },
  { category: "Top Hosts", icon: "Mic", top: ["LunaStar", "DesertRose", "OceanVoice"] },
  { category: "Top Users", icon: "Users", top: ["VYR-4829", "VYR-1928", "VYR-7382"] },
  { category: "Top Gifters", icon: "Gift", top: ["VYR-4829", "VYR-2918", "VYR-8472"] },
  { category: "Top VIP Users", icon: "Crown", top: ["VYR-1001", "VYR-2002", "VYR-3003"] },
];

export const LIVE_STREAMS = [
  { id: "STR-4821", host: "LunaStar", viewers: "12,847", revenue: "$2,847", gifts: "1,284", country: "US" },
  { id: "STR-3829", host: "DesertRose", viewers: "8,392", revenue: "$1,928", gifts: "892", country: "EG" },
  { id: "STR-2847", host: "OceanVoice", viewers: "6,128", revenue: "$1,284", gifts: "647", country: "BR" },
  { id: "STR-1928", host: "MountainEcho", viewers: "4,847", revenue: "$847", gifts: "382", country: "IN" },
  { id: "STR-7382", host: "SilverMoon", viewers: "3,294", revenue: "$628", gifts: "247", country: "PK" },
];

export const AI_DETECTIONS = [
  { type: "Fake Users Detected", count: "2,847", risk: "high", icon: "UserX", color: "#EB5757" },
  { type: "Fake Gifting Activity", count: "384", risk: "high", icon: "Gift", color: "#EB5757" },
  { type: "Spam Activity", count: "8,294", risk: "medium", icon: "MessageSquare", color: "#F2994A" },
  { type: "Fraudulent Transactions", count: "147", risk: "high", icon: "CreditCard", color: "#EB5757" },
  { type: "Bot Activity", count: "1,284", risk: "medium", icon: "Bot", color: "#F2994A" },
  { type: "Suspicious Behavior", count: "472", risk: "low", icon: "AlertTriangle", color: "#F2994A" },
];

export const SECURITY_DATA = [
  { label: "Login Logs", value: "2.4M today", icon: "LogIn", color: "#2F80ED" },
  { label: "Device Logs", value: "1.8M today", icon: "Smartphone", color: "#56CCF2" },
  { label: "IP Logs", value: "4.2M today", icon: "Globe", color: "#A78BFA" },
  { label: "VPN Detected", value: "847 today", icon: "ShieldOff", color: "#F2994A" },
  { label: "Multi-Account", value: "128 today", icon: "Users", color: "#EB5757" },
];

export const SECURITY_ACTIONS = [
  { label: "Freeze Account", icon: "Snowflake", color: "#2F80ED" },
  { label: "Lock Account", icon: "Lock", color: "#EB5757" },
  { label: "Force Logout", icon: "LogOut", color: "#F2994A" },
  { label: "Reset Access", icon: "KeyRound", color: "#A78BFA" },
];

export const FINANCE_DATA = [
  { label: "Pending Withdrawals", value: "847", amount: "$284K", color: "#F2994A" },
  { label: "Pending Deposits", value: "1,284", amount: "$628K", color: "#27AE60" },
  { label: "Total Wallet Balances", value: "8.4M", amount: "$48.2M", color: "#2F80ED" },
  { label: "Today's Transactions", value: "284K", amount: "$1.9M", color: "#A78BFA" },
  { label: "Pending Commissions", value: "2,847", amount: "$48K", color: "#D4AF37" },
];

export const FINANCE_ACTIONS = [
  { label: "Freeze Wallet", icon: "Snowflake", color: "#EB5757" },
  { label: "Unfreeze Wallet", icon: "Unlock", color: "#27AE60" },
  { label: "Audit Wallet", icon: "Search", color: "#2F80ED" },
  { label: "Review Transactions", icon: "Receipt", color: "#A78BFA" },
];

export const AUDIT_LOGS = [
  { user: "Owner", role: "Owner", action: "Approved Super Admin", device: "iPhone 15 Pro", ip: "192.168.1.1", time: "2m ago" },
  { user: "S. Mitchell", role: "Super Admin", action: "Froze wallet VYR-2918", device: "MacBook Pro", ip: "10.0.0.48", time: "8m ago" },
  { user: "J. Carter", role: "Country Manager", action: "Approved agency — Nigeria", device: "Pixel 8", ip: "172.16.0.12", time: "15m ago" },
  { user: "A. Patel", role: "Country Manager", action: "Reviewed host application", device: "iPad Pro", ip: "192.168.2.84", time: "23m ago" },
  { user: "System", role: "AI Engine", action: "Flagged multi-account — 3 users", device: "Server", ip: "10.0.1.1", time: "31m ago" },
  { user: "M. Hassan", role: "Country Manager", action: "Approved host verification", device: "Samsung S24", ip: "172.16.1.38", time: "42m ago" },
];

export const AUTOMATION_RULES = [
  { name: "Auto Host Approval", enabled: true, desc: "Automatically approve verified hosts", icon: "UserCheck" },
  { name: "Auto Reward Distribution", enabled: true, desc: "Distribute rewards on schedule", icon: "Gift" },
  { name: "Auto VIP Upgrades", enabled: true, desc: "Upgrade VIP when threshold reached", icon: "Crown" },
  { name: "Auto Commission Distribution", enabled: false, desc: "Distribute commissions monthly", icon: "DollarSign" },
  { name: "Auto Notifications", enabled: true, desc: "Send automated notifications", icon: "Bell" },
  { name: "Auto Report Generation", enabled: true, desc: "Generate reports daily", icon: "FileText" },
];

export const BI_INSIGHTS = [
  { label: "Revenue Forecast (Q3)", value: "$14.2M", trend: "+16%", color: "#27AE60" },
  { label: "User Growth Forecast", value: "9.8M", trend: "+14%", color: "#2F80ED" },
  { label: "Country Growth — Egypt", value: "+28%", trend: "Accelerating", color: "#A78BFA" },
  { label: "Top Market", value: "India", trend: "+18% MoM", color: "#D4AF37" },
  { label: "Underperforming", value: "Brazil", trend: "-3% MoM", color: "#EB5757" },
  { label: "Expansion Opportunity", value: "Vietnam", trend: "High potential", color: "#27AE60" },
];

export const SETTINGS_GROUPS = [
  { name: "Coin Settings", icon: "Coins", color: "#F2994A" },
  { name: "Gift Settings", icon: "Gift", color: "#EB5757" },
  { name: "VIP Settings", icon: "Crown", color: "#D4AF37" },
  { name: "Reward Settings", icon: "Trophy", color: "#A78BFA" },
  { name: "Commission Settings", icon: "Percent", color: "#27AE60" },
  { name: "Security Settings", icon: "ShieldCheck", color: "#2F80ED" },
  { name: "Payment Settings", icon: "CreditCard", color: "#56CCF2" },
];

export const OWNER_POWERS = [
  { name: "Full Platform Access", desc: "Complete visibility over all systems", icon: "Globe", color: "#2F80ED", danger: false },
  { name: "Approve Any Role", desc: "Override any role approval", icon: "UserCheck", color: "#27AE60", danger: false },
  { name: "Remove Any Role", desc: "Revoke any user's role", icon: "UserX", color: "#EB5757", danger: true },
  { name: "Promote Any Role", desc: "Elevate any user", icon: "TrendingUp", color: "#27AE60", danger: false },
  { name: "Demote Any Role", desc: "Lower any user's role", icon: "TrendingDown", color: "#F2994A", danger: true },
  { name: "Global Revenue Lock", desc: "Lock all financial operations", icon: "Lock", color: "#EB5757", danger: true },
  { name: "Emergency Maintenance", desc: "Enter maintenance mode", icon: "Wrench", color: "#F2994A", danger: true },
  { name: "Emergency Shutdown", desc: "Shut down entire platform", icon: "Power", color: "#EB5757", danger: true },
  { name: "Ownership Transfer", desc: "Transfer platform ownership", icon: "ArrowRightLeft", color: "#8B5CF6", danger: true },
  { name: "Complete System Control", desc: "Full administrative override", icon: "Crown", color: "#D4AF37", danger: false },
];

export const BROADCAST_TARGETS = [
  "All Users", "All Hosts", "All Talent Agents", "All Agencies", "All Admins", "Specific Countries", "Specific Roles",
];
export const BROADCAST_TYPES = [
  { label: "Push Notification", icon: "Bell", color: "#2F80ED" },
  { label: "In-App Message", icon: "MessageSquare", color: "#27AE60" },
  { label: "Email Notification", icon: "Mail", color: "#A78BFA" },
];

export const TIME_FILTERS = ["Daily", "Weekly", "Monthly", "Yearly", "Lifetime"];