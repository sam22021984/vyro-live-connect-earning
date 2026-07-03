import React from "react";
import { GlassCard, StatCard, ActionButton, SectionHeader, ProgressBar, GOLD, BLUE, TEXT_MUTED } from "../Shared";
import { USER_INFO, USER_HOME_CARDS, USER_HOME_ACTIONS } from "../userDashboardData";

export default function HomeSection() {
  return (
    <div className="space-y-4">
      {/* Profile Banner */}
      <GlassCard className="!p-0 overflow-hidden">
        <div className="h-20 relative" style={{ background: "linear-gradient(135deg, #0F1B3D, #1A2952, #2D1B69)" }}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
        </div>
        <div className="px-4 pb-4 -mt-10">
          <div className="flex items-end gap-3 mb-3">
            <img src={USER_INFO.avatar} alt={USER_INFO.username} className="w-16 h-16 rounded-2xl object-cover border-2" style={{ borderColor: GOLD }} />
            <div className="pb-1">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-white">{USER_INFO.username}</h2>
                {USER_INFO.is_verified && <span className="text-xs">✅</span>}
              </div>
              <p className="text-[10px]" style={{ color: TEXT_MUTED }}>{USER_INFO.user_id} · {USER_INFO.country_flag}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${GOLD}20`, color: GOLD }}>VIP {USER_INFO.vip_level}</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${BLUE}20`, color: BLUE }}>LEVEL {USER_INFO.level}</span>
          </div>
          <div className="flex items-center justify-between text-[9px] mb-1">
            <span style={{ color: TEXT_MUTED }}>Level Progress</span>
            <span style={{ color: GOLD }}>{USER_INFO.xp.toLocaleString()} / {USER_INFO.xp_max.toLocaleString()} XP</span>
          </div>
          <ProgressBar value={USER_INFO.xp} max={USER_INFO.xp_max} color={GOLD} />
        </div>
      </GlassCard>

      {/* Dashboard Cards */}
      <div>
        <SectionHeader title="Dashboard Cards" icon="📊" />
        <div className="grid grid-cols-3 gap-2">
          {USER_HOME_CARDS.map((c, i) => (
            <StatCard key={i} label={c.label} value={c.value} icon={c.icon} color={c.color} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <SectionHeader title="Quick Actions" icon="⚡" />
        <div className="grid grid-cols-4 gap-2">
          {USER_HOME_ACTIONS.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}