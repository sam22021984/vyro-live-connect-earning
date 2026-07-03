// Finance Manager Dashboard data — VYRO Live Connect Earning
// Enterprise International Level Revenue & Financial Control Center

export const FIN_SECTIONS = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard", color: "#F59E0B" },
  { id: "revenue", label: "Revenue", icon: "TrendingUp", color: "#27AE60" },
  { id: "withdrawals", label: "Withdrawals", icon: "Banknote", color: "#3B82F6" },
  { id: "payments", label: "Payments", icon: "CreditCard", color: "#8B5CF6" },
  { id: "wallets", label: "Wallets", icon: "Wallet", color: "#EC4899" },
  { id: "coins", label: "Coin Economy", icon: "Coins", color: "#F59E0B" },
  { id: "giftrevenue", label: "Gift Revenue", icon: "Gift", color: "#EC4899" },
  { id: "commissions", label: "Commissions", icon: "Handshake", color: "#2F80ED" },
  { id: "pnl", label: "Profit & Loss", icon: "BarChart3", color: "#27AE60" },
  { id: "reports", label: "Reports", icon: "FileText", color: "#F59E0B" },
  { id: "audit", label: "Audit", icon: "Search", color: "#8B5CF6" },
  { id: "fraud", label: "Fraud", icon: "AlertTriangle", color: "#EF4444" },
  { id: "analytics", label: "Analytics", icon: "LineChart", color: "#2F80ED" },
  { id: "country", label: "Country Rev", icon: "Globe", color: "#10B981" },
  { id: "topearners", label: "Top Earners", icon: "Trophy", color: "#F59E0B" },
  { id: "ai", label: "AI Intel", icon: "BrainCircuit", color: "#8B5CF6" },
  { id: "communication", label: "Comms", icon: "Mail", color: "#56CCF2" },
  { id: "team", label: "Team Mgmt", icon: "Users", color: "#2F80ED" },
  { id: "settings", label: "Settings", icon: "Settings", color: "#6B7280" },
  { id: "exclusive", label: "Exclusive Tools", icon: "Rocket", color: "#EC4899" },
  { id: "policy", label: "Policy", icon: "FileText", color: "#F59E0B" },
];

export const FIN_KPIS = [
  { label: "Total Revenue", value: "$84.2M", change: "+12.4%", trend: "up", icon: "DollarSign", color: "#27AE60" },
  { label: "Today's Revenue", value: "$847K", change: "+8.2%", trend: "up", icon: "Calendar", color: "#27AE60" },
  { label: "Weekly Revenue", value: "$5.8M", change: "+6.4%", trend: "up", icon: "CalendarDays", color: "#27AE60" },
  { label: "Monthly Revenue", value: "$28.4M", change: "+9.8%", trend: "up", icon: "CalendarRange", color: "#27AE60" },
  { label: "Yearly Revenue", value: "$84.2M", change: "+18.2%", trend: "up", icon: "TrendingUp", color: "#27AE60" },
  { label: "Total Withdrawals", value: "$32.8M", change: "+7.4%", trend: "up", icon: "Banknote", color: "#3B82F6" },
  { label: "Total Deposits", value: "$48.4M", change: "+14.2%", trend: "up", icon: "ArrowDownToLine", color: "#10B981" },
  { label: "Total Commissions", value: "$8.4M", change: "+5.8%", trend: "up", icon: "Handshake", color: "#2F80ED" },
  { label: "Active Wallets", value: "284K", change: "+12", trend: "up", icon: "Wallet", color: "#EC4899" },
  { label: "Pending Withdrawals", value: "1,847", change: "+47", trend: "up", icon: "Clock", color: "#F2994A" },
  { label: "Successful Transactions", value: "8.4M", change: "+9.4%", trend: "up", icon: "CheckCircle", color: "#27AE60" },
  { label: "Financial Growth Rate", value: "+18.2%", change: "+3.4%", trend: "up", icon: "TrendingUp", color: "#2F80ED" },
];

export const FIN_QUICK_ACTIONS = [
  { label: "Generate Report", icon: "FileText", color: "#F59E0B" },
  { label: "Review Withdrawals", icon: "Banknote", color: "#3B82F6" },
  { label: "Audit Wallets", icon: "Wallet", color: "#EC4899" },
  { label: "View Analytics", icon: "BarChart3", color: "#27AE60" },
];

export const FIN_REALTIME_COUNTERS = [
  { label: "Revenue Today", value: "$847K", icon: "DollarSign", color: "#27AE60" },
  { label: "Transactions", value: "48K", icon: "Activity", color: "#2F80ED" },
  { label: "Pending WD", value: "1,847", icon: "Clock", color: "#F2994A" },
  { label: "Active Wallets", value: "284K", icon: "Wallet", color: "#EC4899" },
  { label: "Commissions", value: "$8.4M", icon: "Handshake", color: "#2F80ED" },
  { label: "Flagged Txns", value: "47", icon: "AlertTriangle", color: "#EF4444" },
];

export const FIN_LIVE_STREAM = [
  { text: "Withdrawal approved — $12,847 to LunaStar", time: "now", status: "success" },
  { text: "Payment verified — $847 from user #VYR-2847", time: "12s", status: "success" },
  { text: "Coin purchase — 48,000 coins ($480)", time: "34s", status: "success" },
  { text: "Commission distributed — $1,284 to Global Talent", time: "48s", status: "success" },
  { text: "Daily revenue milestone — $847K reached", time: "1m", status: "success" },
  { text: "Suspicious transaction flagged — TXN-48201", time: "1m", status: "warning" },
  { text: "Wallet audit completed — Agency #AGY-005", time: "2m", status: "info" },
  { text: "Gift revenue recorded — $4,847 from PK battle", time: "2m", status: "success" },
  { text: "Withdrawal under review — $28,400 requested", time: "3m", status: "warning" },
  { text: "Monthly growth rate updated — +9.8%", time: "3m", status: "info" },
];

export const FIN_REVENUE_PERIODS = [
  { label: "Daily", value: "$847K", change: "+8.2%", color: "#27AE60" },
  { label: "Weekly", value: "$5.8M", change: "+6.4%", color: "#27AE60" },
  { label: "Monthly", value: "$28.4M", change: "+9.8%", color: "#27AE60" },
  { label: "Yearly", value: "$84.2M", change: "+18.2%", color: "#27AE60" },
];

export const FIN_REVENUE_SOURCES = [
  { source: "Coin Revenue", amount: "$38.4M", percent: "45.6%", color: "#F59E0B", icon: "Coins" },
  { source: "VIP Revenue", amount: "$18.2M", percent: "21.6%", color: "#8B5CF6", icon: "Crown" },
  { source: "Gift Revenue", amount: "$14.8M", percent: "17.6%", color: "#EC4899", icon: "Gift" },
  { source: "Recharge Revenue", amount: "$8.4M", percent: "10.0%", color: "#27AE60", icon: "ArrowDownToLine" },
  { source: "Ad Revenue", amount: "$4.4M", percent: "5.2%", color: "#3B82F6", icon: "Megaphone" },
];

export const FIN_WITHDRAWALS = [
  { id: "WD-4821", user: "LunaStar", amount: "$12,847", method: "Bank Transfer", status: "Approved", date: "2026-07-03", color: "#27AE60" },
  { id: "WD-4820", user: "DesertRose", amount: "$8,294", method: "PayPal", status: "Under Review", date: "2026-07-02", color: "#F2994A" },
  { id: "WD-4819", user: "Global Talent", amount: "$28,400", method: "Bank Transfer", status: "Pending", date: "2026-07-02", color: "#F2994A" },
  { id: "WD-4818", user: "OceanVoice", amount: "$4,128", method: "Crypto", status: "Paid", date: "2026-07-01", color: "#27AE60" },
  { id: "WD-4817", user: "MountainEcho", amount: "$6,847", method: "Bank Transfer", status: "Rejected", date: "2026-06-30", color: "#EB5757" },
  { id: "WD-4816", user: "Apex Agency", amount: "$18,294", method: "PayPal", status: "Approved", date: "2026-06-29", color: "#27AE60" },
];

export const FIN_PAYMENTS = [
  { id: "PAY-9482", user: "VYR-2847", method: "Visa Card", amount: "$480", status: "Verified", time: "12:34 PM", color: "#27AE60" },
  { id: "PAY-9481", user: "VYR-1928", method: "Mastercard", amount: "$120", status: "Verified", time: "12:18 PM", color: "#27AE60" },
  { id: "PAY-9480", user: "VYR-3847", method: "PayPal", amount: "$840", status: "Pending", time: "11:47 AM", color: "#F2994A" },
  { id: "PAY-9479", user: "VYR-4821", method: "Apple Pay", amount: "$240", status: "Verified", time: "11:22 AM", color: "#27AE60" },
  { id: "PAY-9478", user: "VYR-6284", method: "Google Pay", amount: "$1,200", status: "Rejected", time: "10:58 AM", color: "#EB5757" },
  { id: "PAY-9477", user: "VYR-8472", method: "Visa Card", amount: "$60", status: "Verified", time: "10:34 AM", color: "#27AE60" },
];

export const FIN_WALLETS = [
  { id: "WAL-001", owner: "LunaStar", type: "Host", balance: "$48,294", status: "Active", color: "#27AE60" },
  { id: "WAL-002", owner: "Global Talent", type: "Agency", balance: "$284,719", status: "Active", color: "#27AE60" },
  { id: "WAL-003", owner: "VYR-2847", type: "User", balance: "$1,847", status: "Active", color: "#27AE60" },
  { id: "WAL-004", owner: "Ocean Media", type: "Agency", balance: "$0", status: "Frozen", color: "#EB5757" },
  { id: "WAL-005", owner: "DesertRose", type: "Host", balance: "$18,294", status: "Active", color: "#27AE60" },
  { id: "WAL-006", owner: "TM-007", type: "Agent", balance: "$8,471", status: "Under Review", color: "#F2994A" },
];

export const FIN_COIN_STATS = [
  { metric: "Coins Purchased", value: "284.7M", revenue: "$38.4M", color: "#F59E0B", icon: "Coins" },
  { metric: "Coins Spent", value: "198.4M", revenue: "$26.8M", color: "#EF4444", icon: "ArrowUpFromLine" },
  { metric: "Coins Gifted", value: "84.2M", revenue: "$11.4M", color: "#EC4899", icon: "Gift" },
  { metric: "Coin Revenue", value: "$38.4M", revenue: "45.6%", color: "#27AE60", icon: "DollarSign" },
];

export const FIN_COIN_PACKAGES = [
  { id: "PKG-001", name: "Starter Pack", coins: "6,000", price: "$5.99", bonus: "0%", status: "Active", color: "#27AE60" },
  { id: "PKG-002", name: "Popular Pack", coins: "30,000", price: "$27.99", bonus: "10%", status: "Active", color: "#27AE60" },
  { id: "PKG-003", name: "VIP Pack", coins: "120,000", price: "$99.99", bonus: "20%", status: "Active", color: "#27AE60" },
  { id: "PKG-004", name: "Mega Pack", coins: "300,000", price: "$229.99", bonus: "30%", status: "Active", color: "#27AE60" },
  { id: "PKG-005", name: "Summer Special", coins: "60,000", price: "$39.99", bonus: "25%", status: "Promo", color: "#F2994A" },
];

export const FIN_GIFT_REVENUE = [
  { gift: "🌹 Rose", revenue: "$2.4M", count: "8.4M", color: "#EF4444" },
  { gift: "💎 Diamond", revenue: "$4.8M", count: "1.2M", color: "#3B82F6" },
  { gift: "👑 Crown", revenue: "$3.2M", count: "847K", color: "#F59E0B" },
  { gift: "🚗 Sports Car", revenue: "$2.8M", count: "128K", color: "#8B5CF6" },
  { gift: "🏰 Castle", revenue: "$1.6M", count: "47K", color: "#EC4899" },
];

export const FIN_TOP_GIFTERS = [
  { rank: 1, name: "VYR-8472", gifted: "$48K", gifts: "12,847", country: "🇸🇦", color: "#F59E0B" },
  { rank: 2, name: "VYR-2847", gifted: "$36K", gifts: "8,294", country: "🇪🇬", color: "#A78BFA" },
  { rank: 3, name: "VYR-1928", gifted: "$28K", gifts: "6,847", country: "🇮🇳", color: "#EB5757" },
  { rank: 4, name: "VYR-3847", gifted: "$24K", gifts: "5,128", country: "🇳🇬", color: "#6B7280" },
  { rank: 5, name: "VYR-4821", gifted: "$18K", gifts: "4,294", country: "🇮🇩", color: "#6B7280" },
];

export const FIN_COMMISSION_TYPES = [
  { type: "Host Commission", rate: "30%", total: "$4.2M", count: "12,847", color: "#EF4444", icon: "Mic" },
  { type: "Agent Commission", rate: "5%", total: "$840K", count: "847", color: "#3B82F6", icon: "User" },
  { type: "Agency Commission", rate: "10%", total: "$2.4M", count: "284", color: "#8B5CF6", icon: "Building2" },
  { type: "Referral Commission", rate: "3%", total: "$480K", count: "2,184", color: "#10B981", icon: "Share2" },
  { type: "Event Commission", rate: "8%", total: "$640K", count: "147", color: "#EC4899", icon: "PartyPopper" },
];

export const FIN_PNL_DATA = [
  { metric: "Gross Revenue", value: "$84.2M", color: "#27AE60", icon: "TrendingUp" },
  { metric: "Net Revenue", value: "$62.8M", color: "#2F80ED", icon: "DollarSign" },
  { metric: "Total Expenses", value: "$21.4M", color: "#EF4444", icon: "TrendingDown" },
  { metric: "Profit Margin", value: "74.6%", color: "#27AE60", icon: "Percent" },
];

export const FIN_REPORTS = {
  revenue: ["Daily Revenue Report", "Weekly Revenue Report", "Monthly Revenue Report", "Annual Revenue Report"],
  transactions: ["Deposit Report", "Withdrawal Report", "Payment Report", "Wallet Report"],
  business: ["Profit & Loss Report", "Revenue Forecast Report", "Commission Report", "Coin Economy Report", "Gift Revenue Report"],
  audit: ["Financial Audit Report", "Fraud Investigation Report", "Risk Analysis Report", "Compliance Report"],
};

export const FIN_AUDIT_LOGS = [
  { id: "AUD-4821", action: "Wallet Audit", target: "WAL-004 (Ocean Media)", result: "Flagged", date: "2026-07-03", color: "#EB5757" },
  { id: "AUD-4820", action: "Transaction Review", target: "TXN-48201", result: "Cleared", date: "2026-07-02", color: "#27AE60" },
  { id: "AUD-4819", action: "Payment Verification", target: "PAY-9478", result: "Rejected", date: "2026-07-02", color: "#EB5757" },
  { id: "AUD-4818", action: "Commission Audit", target: "AGY-005", result: "Cleared", date: "2026-07-01", color: "#27AE60" },
  { id: "AUD-4817", action: "Withdrawal Review", target: "WD-4817", result: "Rejected", date: "2026-06-30", color: "#EB5757" },
];

export const FIN_FRAUD_CASES = [
  { id: "FRD-247", type: "Fake Purchase", target: "VYR-8472", amount: "$4,847", severity: "High", status: "Investigating", date: "2026-07-02", color: "#EB5757" },
  { id: "FRD-246", type: "Money Laundering", target: "AGY-005", amount: "$28,400", severity: "Critical", status: "Escalated", date: "2026-07-01", color: "#EB5757" },
  { id: "FRD-245", type: "Coin Abuse", target: "VYR-6284", amount: "$1,200", severity: "Medium", status: "Warning Issued", date: "2026-07-01", color: "#F2994A" },
  { id: "FRD-244", type: "Fake Withdrawal", target: "VYR-3847", amount: "$840", severity: "Low", status: "Resolved", date: "2026-06-30", color: "#27AE60" },
  { id: "FRD-243", type: "Suspicious Transaction", target: "VYR-4821", amount: "$2,400", severity: "Medium", status: "Closed", date: "2026-06-29", color: "#6B7280" },
];

export const FIN_ANALYTICS = [
  { metric: "Revenue Growth", value: "+12.4%", change: "MTD", color: "#27AE60", icon: "TrendingUp" },
  { metric: "Transaction Volume", value: "8.4M", change: "+9.4%", color: "#2F80ED", icon: "Activity" },
  { metric: "Avg Transaction", value: "$10.04", change: "+2.8%", color: "#F59E0B", icon: "DollarSign" },
  { metric: "Deposit Rate", value: "84.7%", change: "+3.2%", color: "#10B981", icon: "ArrowDownToLine" },
  { metric: "Withdrawal Rate", value: "62.4%", change: "+1.8%", color: "#3B82F6", icon: "ArrowUpFromLine" },
  { metric: "Revenue per User", value: "$296", change: "+8.4%", color: "#8B5CF6", icon: "Users" },
];

export const FIN_COUNTRY_REVENUE = [
  { country: "Egypt", flag: "🇪🇬", revenue: "$18.4M", growth: "+14.2%", share: "21.9%", color: "#2F80ED" },
  { country: "India", flag: "🇮🇳", revenue: "$22.8M", growth: "+18.4%", share: "27.1%", color: "#27AE60" },
  { country: "Saudi Arabia", flag: "🇸🇦", revenue: "$14.2M", growth: "+12.8%", share: "16.9%", color: "#27AE60" },
  { country: "Nigeria", flag: "🇳🇬", revenue: "$8.4M", growth: "+9.4%", share: "10.0%", color: "#F59E0B" },
  { country: "Brazil", flag: "🇧🇷", revenue: "$6.2M", growth: "+7.8%", share: "7.4%", color: "#F59E0B" },
  { country: "Indonesia", flag: "🇮🇩", revenue: "$7.8M", growth: "+11.2%", share: "9.3%", color: "#27AE60" },
];

export const FIN_TOP_EARNERS = [
  { rank: 1, name: "LunaStar", type: "Host", earnings: "$48K", country: "🇪🇬", color: "#F59E0B" },
  { rank: 2, name: "Global Talent", type: "Agency", earnings: "$284K", country: "🇮🇳", color: "#A78BFA" },
  { rank: 3, name: "DesertRose", type: "Host", earnings: "$42K", country: "🇸🇦", color: "#EB5757" },
  { rank: 4, name: "OceanVoice", type: "Host", earnings: "$36K", country: "🇳🇬", color: "#EB5757" },
  { rank: 5, name: "Apex Agency", type: "Agency", earnings: "$62K", country: "🇮🇩", color: "#8B5CF6" },
  { rank: 6, name: "TM-007", type: "Agent", earnings: "$18K", country: "🇪🇬", color: "#3B82F6" },
];

export const FIN_AI_INSIGHTS = [
  { title: "Revenue Forecast", value: "$96.4M", detail: "Projected annual revenue", color: "#27AE60", icon: "TrendingUp" },
  { title: "Growth Forecast", value: "+22.4%", detail: "Next quarter projection", color: "#10B981", icon: "TrendingUp" },
  { title: "Risk Analysis", value: "Low", detail: "Financial risk: minimal", color: "#27AE60", icon: "ShieldCheck" },
  { title: "Profitability Forecast", value: "78.2%", detail: "Expected profit margin", color: "#27AE60", icon: "Percent" },
  { title: "Cash Flow Health", value: "Excellent", detail: "Strong liquidity position", color: "#2F80ED", icon: "Activity" },
  { title: "Budget Utilization", value: "68.4%", detail: "Of annual budget used", color: "#F59E0B", icon: "Wallet" },
];

export const FIN_COMM_TARGETS = [
  { label: "All Users", icon: "Users", color: "#2F80ED" },
  { label: "Hosts", icon: "Mic", color: "#EF4444" },
  { label: "Agencies", icon: "Building2", color: "#8B5CF6" },
  { label: "VIP Members", icon: "Crown", color: "#F59E0B" },
];

export const FIN_COMM_TYPES = [
  { label: "Push Notification", icon: "Bell", color: "#2F80ED" },
  { label: "In-App Message", icon: "MessageSquare", color: "#27AE60" },
  { label: "Email Notice", icon: "Mail", color: "#F59E0B" },
  { label: "Broadcast", icon: "Megaphone", color: "#EC4899" },
];

export const FIN_TEAM_MEMBERS = [
  { id: "TM-001", name: "Robert Chen", role: "Finance Lead", tasks: 47, score: "98%", status: "Active", color: "#2F80ED" },
  { id: "TM-002", name: "Aisha Khan", role: "Withdrawal Manager", tasks: 38, score: "95%", status: "Active", color: "#2F80ED" },
  { id: "TM-003", name: "David Park", role: "Audit Analyst", tasks: 42, score: "97%", status: "Active", color: "#2F80ED" },
  { id: "TM-004", name: "Maria Santos", role: "Commission Specialist", tasks: 35, score: "93%", status: "Active", color: "#2F80ED" },
  { id: "TM-005", name: "Omar Hassan", role: "Fraud Analyst", tasks: 29, score: "96%", status: "Active", color: "#2F80ED" },
];

export const FIN_SETTINGS_GROUPS = [
  { name: "Revenue Settings", icon: "TrendingUp", color: "#27AE60" },
  { name: "Withdrawal Settings", icon: "Banknote", color: "#3B82F6" },
  { name: "Coin Settings", icon: "Coins", color: "#F59E0B" },
  { name: "Commission Settings", icon: "Handshake", color: "#2F80ED" },
  { name: "Payment Settings", icon: "CreditCard", color: "#8B5CF6" },
  { name: "Tax Settings", icon: "Receipt", color: "#EF4444" },
  { name: "Currency Settings", icon: "DollarSign", color: "#10B981" },
  { name: "Approval Workflow", icon: "CheckCircle", color: "#2F80ED" },
];

export const FIN_EXCLUSIVE_TOOLS = [
  { label: "Emergency Wallet Freeze", icon: "Zap", color: "#EB5757" },
  { label: "Revenue Protection Mode", icon: "ShieldCheck", color: "#2F80ED" },
  { label: "Financial Audit Launch", icon: "Search", color: "#8B5CF6" },
  { label: "Commission Override Review", icon: "Handshake", color: "#2F80ED" },
  { label: "Risk Assessment", icon: "AlertTriangle", color: "#F2994A" },
  { label: "Profit Optimization", icon: "TrendingUp", color: "#27AE60" },
  { label: "Financial Compliance Review", icon: "FileCheck", color: "#3B82F6" },
];

export const FIN_REPORTING_STRUCTURE = { reportsTo: "Business Manager", icon: "Building2", color: "#475569" };