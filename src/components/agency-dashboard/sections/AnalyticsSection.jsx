import React from "react";
import { GlassCard, SectionHeader, ActionButton, StatCard, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import { ANALYTICS_DATA } from "../../agency-dashboard/agencyDashboardData";

export default function AnalyticsSection() {
  const maxVal = Math.max(...ANALYTICS_DATA.weekly.map((w) => w.value));

  return (
    <div className="space-y-4">
      <div>
        <SectionHeader title="Statistics" icon="📊" />
        <div className="grid grid-cols-2 gap-2">
          {ANALYTICS_DATA.stats.map((s, i) => (
            <StatCard key={i} label={s.label} value={s.value} icon={s.icon} color={s.color} />
          ))}
        </div>
      </div>

      <GlassCard>
        <SectionHeader title="Weekly Activity" icon="📈" />
        <div className="flex items-end gap-2 h-32">
          {ANALYTICS_DATA.weekly.map((w, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[8px] font-bold text-white">{w.value}%</span>
              <div className="w-full rounded-t-lg transition-all" style={{ height: `${(w.value / maxVal) * 100}%`, background: "linear-gradient(to top, #06B6D4, #06B6D4aa)" }} />
              <span className="text-[8px]" style={{ color: TEXT_MUTED }}>{w.day}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-2 gap-2">
          {ANALYTICS_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}