// Finance module UI configuration — static layout data only.
// Real data (stats, transactions, wallet, withdrawals, reports, notifications)
// comes from the useFinanceData hook + Transaction/Notification/UserProfile entities.

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