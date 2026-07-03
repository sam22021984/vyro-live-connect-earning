import React from "react";
import { GlassCard, SectionHeader, StatCard, TEXT_MUTED } from "../Shared";
import { ACTIVITY_DATA } from "../userDashboardData";

export default function ActivitySection() {
  const maxVal = Math.max(...ACTIVITY_DATA.weekly.map((w) => w.value));

  return (
    <div className="space-y-4">
      <div>
        <SectionHeader title="Statistics" icon="📊" />
        <div className="grid grid-cols-2 gap-2">
          {ACTIVITY_DATA.stats.map((s, i) => (
            <StatCard key={i} label={s.label} value={s.value} icon={s.icon} color={s.color} />
          ))}
        </div>
      </div>

      <GlassCard>
        <SectionHeader title="Weekly Activity" icon="📈" />
        <div className="flex items-end gap-2 h-32">
          {ACTIVITY_DATA.weekly.map((w, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[8px] font-bold text-white">{w.value}%</span>
              <div className="w-full rounded-t-lg transition-all" style={{ height: `${(w.value / maxVal) * 100}%`, background: "linear-gradient(to top, #8B5CF6, #8B5CF6aa)" }} />
              <span className="text-[8px]" style={{ color: TEXT_MUTED }}>{w.day}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}