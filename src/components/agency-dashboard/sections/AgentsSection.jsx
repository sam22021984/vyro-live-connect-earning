import React from "react";
import { GlassCard, SectionHeader, ActionButton, StatCard, ProgressBar, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import { AGENTS_DATA } from "../../agency-dashboard/agencyDashboardData";

export default function AgentsSection() {
  return (
    <div className="space-y-4">
      <div>
        <SectionHeader title="Agent Statistics" icon="📊" />
        <div className="grid grid-cols-2 gap-2">
          {AGENTS_DATA.stats.map((s, i) => (
            <StatCard key={i} label={s.label} value={s.value} icon={s.icon} color={s.color} />
          ))}
        </div>
      </div>

      <GlassCard>
        <SectionHeader title="Top Performing Agents" icon="🏆" />
        <div className="space-y-2">
          {AGENTS_DATA.topAgents.map((a, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <img src={a.avatar} alt={a.name} className="w-9 h-9 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white">{a.name}</p>
                <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{a.hosts} hosts · {a.revenue}</p>
                <div className="mt-1"><ProgressBar value={a.performance} max={100} color="#8B5CF6" /></div>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: a.status === "active" ? "#10B98120" : "#F59E0B20", color: a.status === "active" ? "#10B981" : "#F59E0B" }}>
                {a.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-4 gap-2">
          {AGENTS_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}