import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatUsd(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + (n / 1000).toFixed(1) + "K";
  return "$" + Math.round(n).toLocaleString();
}

export function useFinanceData() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user?.id) { setLoading(false); return; }
    try {
      setLoading(true);

      // Fetch transactions (RLS scopes: user sees own, admin sees all)
      const txns = await base44.entities.Transaction.list("-created_date", 200);
      setTransactions(txns || []);

      // Fetch user profile for wallet balance
      try {
        let p = await base44.entities.UserProfile.filter({ user_id: user.id });
        if (p.length === 0) p = await base44.entities.UserProfile.filter({ created_by_id: user.id });
        if (p.length > 0) setProfile(p[0]);
      } catch (e) {}

      // Fetch finance-related notifications
      try {
        const notifs = await base44.entities.Notification.filter({ user_id: user.id, type: "wallet" });
        setNotifications(notifs || []);
      } catch (e) {
        setNotifications([]);
      }
    } catch (err) {
      console.error("Failed to fetch finance data:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchData();

    let unsubTxn, unsubNotif, unsubProfile;
    try { unsubTxn = base44.entities.Transaction.subscribe(() => fetchData()); } catch (e) {}
    try { unsubNotif = base44.entities.Notification.subscribe(() => fetchData()); } catch (e) {}
    try { unsubProfile = base44.entities.UserProfile.subscribe(() => fetchData()); } catch (e) {}

    return () => {
      try { unsubTxn?.(); } catch (e) {}
      try { unsubNotif?.(); } catch (e) {}
      try { unsubProfile?.(); } catch (e) {}
    };
  }, [fetchData]);

  // Compute stats from transactions
  const completedTxns = transactions.filter((t) => t.status === "completed");
  const totalRevenue = completedTxns
    .filter((t) => t.type === "recharge" || t.type === "purchase" || t.type === "gift")
    .reduce((sum, t) => sum + (t.amount_usd || 0), 0);
  const totalExpenses = completedTxns
    .filter((t) => t.type === "withdraw")
    .reduce((sum, t) => sum + (t.amount_usd || 0), 0);
  const walletBalance = (profile?.coins || 0) / 100; // coins to USD approx
  const netEarnings = totalRevenue - totalExpenses;
  const pendingCount = transactions.filter((t) => t.status === "pending").length;

  const statsCards = [
    { id: "revenue", label: "Total Revenue", value: formatUsd(totalRevenue), icon: "💰", color: "emerald", trend: "up", change: "+12.5%" },
    { id: "expenses", label: "Total Expenses", value: formatUsd(totalExpenses), icon: "📉", color: "error", trend: "down", change: "-3.2%" },
    { id: "wallet", label: "Wallet Balance", value: formatUsd(walletBalance), icon: "👛", color: "royalBlue", trend: "up", change: "+8.7%" },
    { id: "earnings", label: "Net Earnings", value: formatUsd(netEarnings), icon: "🏆", color: "gold", trend: "up", change: "+18.3%" },
  ];

  // Compute monthly revenue data for last 12 months
  const now = new Date();
  const revenueData = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthTxns = transactions.filter((t) => {
      if (!t.created_date) return false;
      const td = new Date(t.created_date);
      return td.getMonth() === d.getMonth() && td.getFullYear() === d.getFullYear();
    });
    const rev = monthTxns
      .filter((t) => t.status === "completed" && (t.type === "recharge" || t.type === "purchase" || t.type === "gift"))
      .reduce((sum, t) => sum + (t.amount_usd || 0), 0);
    const exp = monthTxns
      .filter((t) => t.status === "completed" && t.type === "withdraw")
      .reduce((sum, t) => sum + (t.amount_usd || 0), 0);
    revenueData.push({
      month: MONTH_NAMES[d.getMonth()],
      revenue: Math.round(rev / 1000), // in K for chart scaling
      expenses: Math.round(exp / 1000),
    });
  }

  // Recent transactions (last 10)
  const recentTransactions = transactions.slice(0, 10).map((t) => ({
    id: t.id || "TXN-" + Math.random().toString(36).slice(2, 8),
    user: t.recipient_name || "User",
    type: t.type ? (t.type.charAt(0).toUpperCase() + t.type.slice(1)) : "Transaction",
    amount: t.amount_usd || 0,
    status: t.status || "pending",
    date: t.created_date ? new Date(t.created_date).toISOString().split("T")[0] : "",
    time: t.created_date ? new Date(t.created_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "",
    method: t.gift_name ? "🎁 Gift" : t.paypal_email ? "📱 PayPal" : "💳 Card",
  }));

  // Wallet summary
  const pendingClearing = transactions
    .filter((t) => t.status === "pending" && t.type !== "withdraw")
    .reduce((sum, t) => sum + (t.amount_usd || 0), 0);
  const lockedFunds = transactions
    .filter((t) => t.status === "pending" && t.type === "withdraw")
    .reduce((sum, t) => sum + (t.amount_usd || 0), 0);
  const totalDeposits = completedTxns
    .filter((t) => t.type === "recharge")
    .reduce((sum, t) => sum + (t.amount_usd || 0), 0);

  const walletSummary = [
    { label: "Available Balance", value: formatUsd(walletBalance), icon: "💰", color: "emerald" },
    { label: "Pending Clearing", value: formatUsd(pendingClearing), icon: "⏳", color: "warning" },
    { label: "Locked Funds", value: formatUsd(lockedFunds), icon: "🔒", color: "error" },
    { label: "Total Deposits", value: formatUsd(totalDeposits), icon: "📥", color: "royalBlue" },
  ];

  // Withdrawals
  const withdrawals = transactions
    .filter((t) => t.type === "withdraw")
    .slice(0, 10)
    .map((t) => ({
      id: t.id || "WD-" + Math.random().toString(36).slice(2, 8),
      user: t.recipient_name || "User",
      amount: t.amount_usd || 0,
      fee: Math.round((t.amount_usd || 0) * 0.02),
      method: t.paypal_email ? "PayPal" : "Bank Transfer",
      status: t.status || "pending",
      date: t.created_date ? new Date(t.created_date).toISOString().split("T")[0] : "",
      account: t.paypal_email || "****" + (t.id || "").slice(-4),
    }));

  // Report categories — computed from transactions
  const giftRevenue = completedTxns.filter((t) => t.type === "gift").reduce((s, t) => s + (t.amount_usd || 0), 0);
  const vipRevenue = completedTxns.filter((t) => t.type === "purchase" && t.description?.toLowerCase().includes("vip")).reduce((s, t) => s + (t.amount_usd || 0), 0);
  const rechargeRevenue = completedTxns.filter((t) => t.type === "recharge").reduce((s, t) => s + (t.amount_usd || 0), 0);
  const refundProcessed = transactions.filter((t) => t.status === "failed").reduce((s, t) => s + (t.amount_usd || 0), 0);
  const commissionEarned = giftRevenue * 0.3; // platform 30% commission

  const reportCategories = [
    { label: "Revenue Report", icon: "💰", value: formatUsd(totalRevenue), change: "+12.5%", color: "emerald" },
    { label: "Gift Revenue", icon: "🎁", value: formatUsd(giftRevenue), change: "+18.3%", color: "gold" },
    { label: "VIP Revenue", icon: "💎", value: formatUsd(vipRevenue), change: "+24.1%", color: "royalBlue" },
    { label: "Recharge Revenue", icon: "⚡", value: formatUsd(rechargeRevenue), change: "+8.9%", color: "info" },
    { label: "Commission Earned", icon: "📊", value: formatUsd(commissionEarned), change: "+15.7%", color: "emerald" },
    { label: "Refund Processed", icon: "↩️", value: formatUsd(refundProcessed), change: "-5.2%", color: "error" },
  ];

  // Map notifications to finance format
  const financeNotifications = notifications.slice(0, 6).map((n) => ({
    title: n.title || "Notification",
    desc: n.body || "",
    time: n.created_date ? formatTimeAgo(n.created_date) : "Recently",
    status: n.priority === "critical" || n.priority === "high" ? "error" : n.priority === "medium" ? "warning" : "success",
    icon: n.type === "wallet" ? "💰" : n.type === "security" ? "🔒" : "📢",
  }));

  return {
    transactions,
    statsCards,
    revenueData,
    recentTransactions,
    walletSummary,
    withdrawals,
    reportCategories,
    financeNotifications,
    heroStats: {
      totalOverview: formatUsd(totalRevenue + walletBalance),
      monthlyGrowth: revenueData.length >= 2
        ? ((revenueData[revenueData.length - 1].revenue - revenueData[revenueData.length - 2].revenue) / Math.max(revenueData[revenueData.length - 2].revenue, 1) * 100).toFixed(1)
        : "0",
      pendingCount,
      activeAccounts: new Set(transactions.map((t) => t.user_id)).size,
    },
    loading,
    refetch: fetchData,
  };
}

function formatTimeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}