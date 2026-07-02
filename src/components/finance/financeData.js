export const FINANCE_COLORS = {
  navy: "#0F1B3D",
  navyLight: "#1A2952",
  navyGradient: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 100%)",
  emerald: "#10B981",
  emeraldDark: "#059669",
  royalBlue: "#2563EB",
  royalBlueDark: "#1D4ED8",
  gold: "#D4AF37",
  goldLight: "#E5C158",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
  bg: "#F5F7FA",
  card: "#FFFFFF",
  textPrimary: "#0F1B3D",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
};

export const FINANCE_TABS = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "transactions", label: "Transactions", icon: "💳" },
  { id: "wallet", label: "Wallet", icon: "👛" },
  { id: "withdrawals", label: "Withdrawals", icon: "🏦" },
  { id: "reports", label: "Reports", icon: "📈" },
];

export const STATS_CARDS = [
  { id: "revenue", label: "Total Revenue", value: "$2,847,920", change: "+12.5%", trend: "up", icon: "💰", color: "emerald" },
  { id: "expenses", label: "Total Expenses", value: "$1,203,450", change: "-3.2%", trend: "down", icon: "📉", color: "error" },
  { id: "wallet", label: "Wallet Balance", value: "$845,600", change: "+8.7%", trend: "up", icon: "👛", color: "royalBlue" },
  { id: "earnings", label: "Net Earnings", value: "$1,644,470", change: "+18.3%", trend: "up", icon: "🏆", color: "gold" },
];

export const REVENUE_DATA = [
  { month: "Jan", revenue: 180, expenses: 95 },
  { month: "Feb", revenue: 210, expenses: 110 },
  { month: "Mar", revenue: 195, expenses: 105 },
  { month: "Apr", revenue: 240, expenses: 120 },
  { month: "May", revenue: 285, expenses: 130 },
  { month: "Jun", revenue: 260, expenses: 125 },
  { month: "Jul", revenue: 310, expenses: 140 },
  { month: "Aug", revenue: 335, expenses: 150 },
  { month: "Sep", revenue: 300, expenses: 135 },
  { month: "Oct", revenue: 360, expenses: 160 },
  { month: "Nov", revenue: 390, expenses: 170 },
  { month: "Dec", revenue: 420, expenses: 180 },
];

export const TRANSACTIONS = [
  { id: "TXN-001", user: "Aisha Al-Rashid", type: "Gift Purchase", amount: 4500, status: "completed", date: "2026-07-02", time: "14:32", method: "💎 Coins" },
  { id: "TXN-002", user: "Mohammed Saeed", type: "VIP Subscription", amount: 9900, status: "completed", date: "2026-07-02", time: "13:15", method: "💳 Card" },
  { id: "TXN-003", user: "Sara Khalil", type: "Withdrawal", amount: 25000, status: "pending", date: "2026-07-02", time: "12:48", method: "🏦 Bank" },
  { id: "TXN-004", user: "David Chen", type: "Recharge", amount: 15000, status: "completed", date: "2026-07-01", time: "18:22", method: "💳 Card" },
  { id: "TXN-005", user: "Layla Hassan", type: "Gift Purchase", amount: 3200, status: "completed", date: "2026-07-01", time: "16:05", method: "💎 Coins" },
  { id: "TXN-006", user: "Omar Farouk", type: "Withdrawal", amount: 50000, status: "rejected", date: "2026-07-01", time: "14:10", method: "🏦 Bank" },
  { id: "TXN-007", user: "Fatima Noor", type: "VIP Subscription", amount: 24900, status: "completed", date: "2026-06-30", time: "11:33", method: "💳 Card" },
  { id: "TXN-008", user: "Ahmed Ali", type: "Recharge", amount: 7500, status: "processing", date: "2026-06-30", time: "09:18", method: "📱 PayPal" },
];

export const WALLET_SUMMARY = [
  { label: "Available Balance", value: "$845,600", icon: "💰", color: "emerald" },
  { label: "Pending Clearing", value: "$32,450", icon: "⏳", color: "warning" },
  { label: "Locked Funds", value: "$5,000", icon: "🔒", color: "error" },
  { label: "Total Deposits", value: "$1,290,000", icon: "📥", color: "royalBlue" },
];

export const WITHDRAWALS = [
  { id: "WD-001", user: "Sara Khalil", amount: 25000, fee: 500, method: "Bank Transfer", status: "pending", date: "2026-07-02", account: "****4521" },
  { id: "WD-002", user: "Omar Farouk", amount: 50000, fee: 1000, method: "Bank Transfer", status: "rejected", date: "2026-07-01", account: "****8830" },
  { id: "WD-003", user: "Aisha Al-Rashid", amount: 15000, fee: 300, method: "PayPal", status: "completed", date: "2026-06-30", account: "aisha@email.com" },
  { id: "WD-004", user: "Mohammed Saeed", amount: 80000, fee: 1600, method: "Bank Transfer", status: "completed", date: "2026-06-29", account: "****1290" },
  { id: "WD-005", user: "Fatima Noor", amount: 12000, fee: 240, method: "PayPal", status: "processing", date: "2026-06-29", account: "fatima@email.com" },
];

export const REPORT_CATEGORIES = [
  { label: "Revenue Report", icon: "💰", value: "$2.8M", change: "+12.5%", color: "emerald" },
  { label: "Gift Revenue", icon: "🎁", value: "$1.2M", change: "+18.3%", color: "gold" },
  { label: "VIP Revenue", icon: "💎", value: "$890K", change: "+24.1%", color: "royalBlue" },
  { label: "Recharge Revenue", icon: "⚡", value: "$756K", change: "+8.9%", color: "info" },
  { label: "Commission Earned", icon: "📊", value: "$284K", change: "+15.7%", color: "emerald" },
  { label: "Refund Processed", icon: "↩️", value: "$45K", change: "-5.2%", color: "error" },
];

export const NOTIFICATIONS = [
  { title: "Large Withdrawal Request", desc: "Sara Khalil requested $25,000", time: "5 min ago", status: "warning", icon: "🏦" },
  { title: "Revenue Milestone Reached", desc: "Monthly revenue exceeded $2.8M", time: "1 hour ago", status: "success", icon: "🎉" },
  { title: "Transaction Rejected", desc: "Omar Farouk's withdrawal declined", time: "3 hours ago", status: "error", icon: "⚠️" },
  { title: "New VIP Subscriber", desc: "Fatima Noor upgraded to VIP 9", time: "5 hours ago", status: "info", icon: "💎" },
];