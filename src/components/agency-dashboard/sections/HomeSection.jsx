import React from "react";
import { GlassCard, SectionHeader, ActionButton, StatCard, ProgressBar, GOLD, BLUE, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import { AGENCY_INFO, AGENCY_HOME_CARDS, AGENCY_HOME_ACTIONS } from "../../agency-dashboard/agencyDashboardData";
import { useRealtimeStats } from "@/hooks/useRealtimeStats";
import { Loader2 } from "lucide-react";

export default function HomeSection() {
  const { stats, loading } = useRealtimeStats("agency");

  // Build real-time stat cards from live data, fall back to defaults
  const realTimeCards = stats?.agency ? [
    { label: "Agency Status", value: "Active", icon: "✅", color: "#10B981" },
    { label: "Total Agents", value: String(stats.agency.total_agents), icon: "👨‍💼", color: "#8B5CF6" },
    { label: "Active Agents", value: String(stats.agency.active_agents), icon: "✅", color: "#10B981" },
    { label: "Total Hosts", value: String(stats.agency.total_hosts), icon: "🎤", color: "#EC4899" },
    { label: "Online Hosts", value: String(stats.agency.online_hosts), icon: "⚡", color: "#F59E0B" },
    { label: "Live Hosts", value: String(stats.agency.live_hosts), icon: "🔴", color: "#EF4444" },
    { label: "Verified Hosts", value: String(stats.agency.verified_hosts), icon: " BadgeCheck", color: "#D4AF37" },
    { label: "Active Rooms", value: String(stats.agency.active_rooms), icon: "📺", color: "#3B82F6" },
    { label: "Pending Apps", value: String(stats.agency.pending_applications), icon: "⏳", color: "#F59E0B" },
    { label: "Total Gifts", value: String(stats.agency.total_gifts), icon: "🎁", color: "#EC4899" },
    { label: "Total Viewers", value: String(stats.agency.total_viewers), icon: "👁️", color: "#06B6D4" },
    { label: "Revenue (Coins)", value: String(stats.agency.total_revenue_coins), icon: "💰", color: "#D4AF37" },
  ] : AGENCY_HOME_CARDS;

  return (
    <div className="space-y-4">
      <GlassCard className="!p-0 overflow-hidden">
        <div className="h-20 relative" style={{ background: "linear-gradient(135deg, #0F1B3D, #1A2952, #2D1B69)" }}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
          {loading && (
            <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] text-white/60">
              <Loader2 size={10} className="animate-spin" /> Live
            </div>
          )}
        </div>
        <div className="px-4 pb-4 -mt-10">
          <div className="flex items-end gap-3 mb-3">
            <img src={AGENCY_INFO.logo} alt={AGENCY_INFO.agency_name} className="w-16 h-16 rounded-2xl object-cover border-2" style={{ borderColor: GOLD }} />
            <div className="pb-1">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-white">{stats?.profile?.full_name || AGENCY_INFO.agency_name}</h2>
                <span className="text-xs">✅</span>
              </div>
              <p className="text-[10px]" style={{ color: TEXT_MUTED }}>{stats?.profile?.global_id || AGENCY_INFO.agency_id} · {AGENCY_INFO.country_flag}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${GOLD}20`, color: GOLD }}>{AGENCY_INFO.level}</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${BLUE}20`, color: BLUE }}>RANK {AGENCY_INFO.rank}</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: "#10B98120", color: "#10B981" }}>{AGENCY_INFO.status}</span>
          </div>
          <div className="flex items-center justify-between text-[9px] mb-1">
            <span style={{ color: TEXT_MUTED }}>Performance Score</span>
            <span style={{ color: GOLD }}>{AGENCY_INFO.performance_score}%</span>
          </div>
          <ProgressBar value={AGENCY_INFO.performance_score} max={100} color={GOLD} />
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Dashboard Overview" icon="📊" />
        <div className="grid grid-cols-3 gap-2">
          {realTimeCards.map((c, i) => (
            <StatCard key={i} label={c.label} value={c.value} icon={c.icon} color={c.color} />
          ))}
        </div>
      </div>

      <div>
        <SectionHeader title="Quick Actions" icon="⚡" />
        <div className="grid grid-cols-4 gap-2">
          {AGENCY_HOME_ACTIONS.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}