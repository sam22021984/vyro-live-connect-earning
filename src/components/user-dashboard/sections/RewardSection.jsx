import React from "react";
import { GlassCard, SectionHeader, ActionButton, TEXT_MUTED } from "../Shared";
import { REWARD_DATA } from "../userDashboardData";

export default function RewardSection() {
  return (
    <div className="space-y-4">
      <GlassCard className="text-center !p-4">
        <div className="text-3xl mb-1">🎁</div>
        <h2 className="text-base font-bold text-white">Reward Center</h2>
        <p className="text-[10px] mt-1" style={{ color: TEXT_MUTED }}>2 rewards ready to claim!</p>
      </GlassCard>

      <div>
        <SectionHeader title="Available Rewards" icon="🏆" />
        <div className="space-y-2">
          {REWARD_DATA.rewards.map((r, i) => {
            const isReady = r.status === "ready" || r.status === "active";
            return (
              <GlassCard key={i}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${r.color}15` }}>
                    {r.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-white">{r.label}</p>
                    <p className="text-[10px]" style={{ color: r.color }}>{r.value}</p>
                  </div>
                  <span className={`text-[9px] px-2 py-1 rounded-full font-bold ${isReady ? "animate-pulse" : ""}`} style={{ background: isReady ? "#10B98120" : "rgba(255,255,255,0.05)", color: isReady ? "#10B981" : TEXT_MUTED }}>
                    {r.status.toUpperCase()}
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-3 gap-2">
          {REWARD_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}