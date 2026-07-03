import React from "react";
import { GlassCard, SectionHeader, ActionButton, StatCard, InfoRow, ProgressBar, GOLD, BLUE, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import { AGENCY_INFO, AGENCY_HOME_CARDS, AGENCY_HOME_ACTIONS } from "../../agency-dashboard/agencyDashboardData";

export default function HomeSection() {
  return (
    <div className="space-y-4">
      <GlassCard className="!p-0 overflow-hidden">
        <div className="h-20 relative" style={{ background: "linear-gradient(135deg, #0F1B3D, #1A2952, #2D1B69)" }}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
        </div>
        <div className="px-4 pb-4 -mt-10">
          <div className="flex items-end gap-3 mb-3">
            <img src={AGENCY_INFO.logo} alt={AGENCY_INFO.agency_name} className="w-16 h-16 rounded-2xl object-cover border-2" style={{ borderColor: GOLD }} />
            <div className="pb-1">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-white">{AGENCY_INFO.agency_name}</h2>
                <span className="text-xs">✅</span>
              </div>
              <p className="text-[10px]" style={{ color: TEXT_MUTED }}>{AGENCY_INFO.agency_id} · {AGENCY_INFO.country_flag}</p>
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
          {AGENCY_HOME_CARDS.map((c, i) => (
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