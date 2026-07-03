import React from "react";
import { GlassCard, SectionHeader, ActionButton, ProgressBar, GOLD, TEXT_MUTED } from "../Shared";
import { VIP_DATA } from "../userDashboardData";

export default function VipSection() {
  return (
    <div className="space-y-4">
      <GlassCard className="text-center !p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
        <div className="relative">
          <div className="text-4xl mb-2">👑</div>
          <h2 className="text-xl font-bold" style={{ color: GOLD }}>VIP {VIP_DATA.level}</h2>
          <p className="text-[10px] mt-1" style={{ color: TEXT_MUTED }}>Expires: {VIP_DATA.expiry}</p>
          <div className="mt-3">
            <div className="flex items-center justify-between text-[9px] mb-1">
              <span style={{ color: TEXT_MUTED }}>Next Level Progress</span>
              <span style={{ color: GOLD }}>{VIP_DATA.progress}%</span>
            </div>
            <ProgressBar value={VIP_DATA.progress} max={100} color={GOLD} />
          </div>
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="VIP Privileges" icon="💎" />
        <div className="grid grid-cols-2 gap-2">
          {VIP_DATA.privileges.map((p, i) => (
            <GlassCard key={i}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{p.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{p.value}</p>
                  <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{p.label}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <GlassCard>
        <SectionHeader title="VIP Benefits" icon="⭐" />
        <div className="space-y-2">
          {VIP_DATA.benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs" style={{ color: GOLD }}>✦</span>
              <span className="text-[11px] text-white">{b}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-3 gap-2">
          {VIP_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}