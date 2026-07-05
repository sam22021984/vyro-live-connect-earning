import React from "react";
import { Users, Radio, DollarSign, Coins, Crown, Shield } from "lucide-react";

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-xl p-3 flex flex-col items-center justify-center" style={{ background: `${color}08`, border: `1px solid ${color}15` }}>
      <Icon size={16} style={{ color }} />
      <p className="text-base font-bold mt-1" style={{ color: "#0F1B3D" }}>{value}</p>
      <p className="text-[9px] text-center" style={{ color: "#9CA3AF" }}>{label}</p>
    </div>
  );
}

export default function CreatorStatsBanner({ stats, loading, hasRealStats }) {
  if (loading) {
    return (
      <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #EEF2F7 100%)", border: "1px solid #E5E7EB" }}>
        <div className="flex items-center justify-center py-4">
          <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // No real data — show empty state, never render mock/fake stats
  if (!stats || !hasRealStats) {
    return (
      <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #EEF2F7 100%)", border: "1px solid #E5E7EB" }}>
        <div className="flex flex-col items-center justify-center py-6">
          <p className="text-xs font-semibold" style={{ color: "#9CA3AF" }}>No Real Data Available</p>
        </div>
      </div>
    );
  }

  const statItems = [
    { icon: Users, label: "Total Users", value: stats.totalUsers != null ? stats.totalUsers.toLocaleString() : "—", color: "#2F80ED" },
    { icon: Radio, label: "Live Rooms", value: stats.liveRooms != null ? String(stats.liveRooms) : "—", color: "#EF4444" },
    { icon: DollarSign, label: "Revenue", value: stats.totalRevenue != null ? `$${stats.totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "—", color: "#10B981" },
    { icon: Coins, label: "Coins Flow", value: stats.totalCoins != null ? stats.totalCoins.toLocaleString() : "—", color: "#F59E0B" },
    { icon: Crown, label: "VIP Users", value: stats.vipUsers != null ? String(stats.vipUsers) : "—", color: "#D4AF37" },
    { icon: Shield, label: "Verified", value: stats.verifiedUsers != null ? String(stats.verifiedUsers) : "—", color: "#6366F1" },
  ];

  return (
    <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #EEF2F7 100%)", border: "1px solid #E5E7EB", boxShadow: "0 8px 24px rgba(47,128,237,0.08)" }}>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #2F80ED, transparent 70%)", transform: "translate(30%, -30%)" }} />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>Platform Overview</p>
            <h3 className="text-sm font-bold" style={{ color: "#0F1B3D" }}>Live Ecosystem Stats</h3>
          </div>
          <span className="text-[9px] px-2 py-1 rounded-full font-bold" style={{ background: "#10B98110", color: "#10B981" }}>● LIVE</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {statItems.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>
      </div>
    </div>
  );
}