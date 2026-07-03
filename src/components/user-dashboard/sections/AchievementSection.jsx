import React from "react";
import { GlassCard, SectionHeader, ActionButton, ProgressBar, GOLD, BLUE, TEXT_MUTED } from "../Shared";
import { ACHIEVEMENT_DATA } from "../userDashboardData";

export default function AchievementSection() {
  return (
    <div className="space-y-4">
      <GlassCard className="text-center !p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
        <div className="relative">
          <div className="text-4xl mb-1">🏆</div>
          <h2 className="text-xl font-bold" style={{ color: GOLD }}>Level {ACHIEVEMENT_DATA.level}</h2>
          <p className="text-[10px] mt-1" style={{ color: TEXT_MUTED }}>{ACHIEVEMENT_DATA.xp.toLocaleString()} / {ACHIEVEMENT_DATA.xp_max.toLocaleString()} XP</p>
          <div className="mt-2"><ProgressBar value={ACHIEVEMENT_DATA.xp} max={ACHIEVEMENT_DATA.xp_max} color={GOLD} /></div>
          <p className="text-[10px] mt-2" style={{ color: BLUE }}>Achievement Score: {ACHIEVEMENT_DATA.score}%</p>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Badges" icon="🎖️" />
        <div className="grid grid-cols-4 gap-2">
          {ACHIEVEMENT_DATA.badges.map((b, i) => (
            <div key={i} className={`flex flex-col items-center gap-1 p-2 rounded-xl ${b.earned ? "" : "opacity-30"}`} style={{ background: `${b.color}10` }}>
              <span className="text-2xl">{b.icon}</span>
              <span className="text-[7px] font-medium text-white text-center leading-tight">{b.name}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Milestones" icon="🎯" />
        <div className="space-y-3">
          {ACHIEVEMENT_DATA.milestones.map((m, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px]" style={{ color: TEXT_MUTED }}>{m.label}</span>
                <span className="text-[10px] font-bold text-white">{m.value} / {m.target}</span>
              </div>
              <ProgressBar value={m.value} max={m.target} color={m.color} />
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-3 gap-2">
          {ACHIEVEMENT_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}