import React from "react";
import { GlassCard, SectionHeader, TEXT_MUTED } from "../Shared";
import { SAFETY_DATA } from "../userDashboardData";

export default function SafetySection() {
  return (
    <div className="space-y-4">
      <GlassCard className="text-center !p-4">
        <div className="text-3xl mb-1">🛡️</div>
        <h2 className="text-base font-bold text-white">Safety Center</h2>
        <p className="text-[10px] mt-1" style={{ color: TEXT_MUTED }}>Your safety is our priority</p>
      </GlassCard>

      <div>
        <SectionHeader title="Safety Features" icon="🛡️" />
        <div className="space-y-2">
          {SAFETY_DATA.features.map((f, i) => (
            <GlassCard key={i} onClick={() => {}}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${f.color}15` }}>
                  {f.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-white">{f.label}</p>
                  <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{f.desc}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}