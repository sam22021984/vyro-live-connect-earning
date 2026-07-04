import React from "react";
import { Users, Activity, UserPlus, Mic, Briefcase, Building2, Coins, DollarSign, Clock, ArrowDownCircle, Store, AlertTriangle, Circle, Loader2 } from "lucide-react";
import { usePlatformStats } from "@/hooks/usePlatformStats";

const ICON_MAP = { Users, Activity, UserPlus, Mic, Briefcase, Building2, Coins, DollarSign, Clock, ArrowDownCircle, Store, AlertTriangle };

function formatNum(n) {
  if (n === undefined || n === null) return "0";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return String(Math.round(n));
}

function StatCard({ stat }) {
  const Icon = ICON_MAP[stat.icon] || Circle;
  return (
    <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}20` }}>
          <Icon size={14} style={{ color: stat.color }} />
        </div>
        <span className="text-[8px] flex-1" style={{ color: "rgba(244,240,250,0.4)" }}>{stat.label}</span>
      </div>
      <p className="text-lg font-bold" style={{ color: "#F4F0FA" }}>{stat.value}</p>
      <p className="text-[8px] mt-0.5" style={{ color: stat.color }}>{stat.trend}</p>
    </div>
  );
}

export default function OverviewModule() {
  const { stats, loading } = usePlatformStats();

  const kpis = stats ? [
    { label: "Total Users", value: formatNum(stats.totalUsers), icon: "Users", color: "#3B82F6", trend: `+${stats.newUsersToday || 0} today` },
    { label: "Active Users", value: formatNum(stats.onlineUsers), icon: "Activity", color: "#10B981", trend: "Online now" },
    { label: "New Users Today", value: formatNum(stats.newUsersToday), icon: "UserPlus", color: "#8B5CF6", trend: "Today" },
    { label: "Active Hosts", value: formatNum(stats.totalHosts), icon: "Mic", color: "#EC4899", trend: `${stats.activeStreams} live now` },
    { label: "Active Agents", value: formatNum(stats.totalAgents), icon: "Briefcase", color: "#F59E0B", trend: "Managing hosts" },
    { label: "Active Agencies", value: formatNum(stats.totalAgencies), icon: "Building2", color: "#06B6D4", trend: "Registered" },
    { label: "Coin Circulation", value: formatNum(stats.coinsRemaining), icon: "Coins", color: "#D4AF37", trend: "In wallets" },
    { label: "Total Revenue", value: "$" + formatNum(stats.totalRevenue), icon: "DollarSign", color: "#10B981", trend: "All time" },
    { label: "Pending Approvals", value: formatNum(stats.pendingApplications), icon: "Clock", color: "#F59E0B", trend: "Awaiting review" },
    { label: "Pending Withdrawals", value: formatNum(stats.financeData?.find(f => f.label === "Pending Withdrawals")?.value || 0), icon: "ArrowDownCircle", color: "#EF4444", trend: "Needs action" },
    { label: "Pending Seller Requests", value: formatNum(stats.applications?.find(a => a.type.includes("Seller"))?.pending || 0), icon: "Store", color: "#8B5CF6", trend: "New applications" },
    { label: "System Alerts", value: formatNum(stats.criticalAlerts), icon: "AlertTriangle", color: "#DC2626", trend: "Active alerts" },
  ] : [];

  return (
    <div className="space-y-3">
      <div className="rounded-2xl p-3 text-center" style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(59,130,246,0.1))", border: "1px solid rgba(212,175,55,0.2)" }}>
        <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.5)" }}>🌐 VYRO Live Connect</p>
        <h3 className="text-sm font-bold mt-0.5" style={{ color: "#D4AF37" }}>Super Admin Manager Dashboard</h3>
        <p className="text-[9px] mt-1" style={{ color: "rgba(244,240,250,0.4)" }}>
          {loading ? "Loading real-time data…" : "Real-time platform overview · Last updated: just now"}
        </p>
      </div>
      <h4 className="text-xs font-bold px-1" style={{ color: "#F4F0FA" }}>Platform KPIs</h4>
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={20} className="animate-spin" style={{ color: "#D4AF37" }} />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {kpis.map((s, i) => <StatCard key={i} stat={s} />)}
        </div>
      )}
    </div>
  );
}