import React from "react";
import { GlassCard, SectionHeader, ActionButton, ProgressBar, GOLD, BLUE, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import { PERFORMANCE_DATA } from "../../agency-dashboard/agencyDashboardData";

export default function PerformanceSection() {
  return (
    <div className="space-y-4">
      <GlassCard className="text-center !p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
        <div className="relative">
          <div className="text-4xl mb-1">🏆</div>
          <h2 className="text-xl font-bold" style={{ color: GOLD }}>Rank {PERFORMANCE_DATA.ranking}</h2>
          <p className="text-[10px] mt-1" style={{ color: TEXT_MUTED }}>Agency Leaderboard Position</p>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Monthly Target" icon="🎯" />
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-[10px] mb-1">
              <span style={{ color: TEXT_MUTED }}>Completed / Target</span>
              <span className="font-bold text-white">{PERFORMANCE_DATA.completedTarget} / {PERFORMANCE_DATA.monthlyTarget}</span>
            </div>
            <ProgressBar value={PERFORMANCE_DATA.targetPct} max={100} color={BLUE} />
            <p className="text-[9px] mt-1" style={{ color: BLUE }}>{PERFORMANCE_DATA.targetPct}% completed</p>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <div className="flex items-center justify-between text-[10px] mb-1">
              <span style={{ color: TEXT_MUTED }}>Bonus Progress</span>
              <span className="font-bold" style={{ color: GOLD }}>{PERFORMANCE_DATA.bonusProgress}%</span>
            </div>
            <ProgressBar value={PERFORMANCE_DATA.bonusProgress} max={100} color={GOLD} />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="text-center p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p className="text-[9px]" style={{ color: TEXT_MUTED }}>Active Campaigns</p>
              <p className="text-sm font-bold text-white">{PERFORMANCE_DATA.activeCampaigns}</p>
            </div>
            <div className="text-center p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p className="text-[9px]" style={{ color: TEXT_MUTED }}>Leaderboard</p>
              <p className="text-sm font-bold" style={{ color: GOLD }}>#{PERFORMANCE_DATA.leaderboardPos}</p>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Agency Leaderboard" icon="🏆" />
        <div className="space-y-2">
          {PERFORMANCE_DATA.leaderboard.map((l, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b" style={l.isYou ? { borderColor: `${GOLD}30`, background: `${GOLD}08`, borderRadius: "0.75rem", padding: "0.5rem" } : { borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0" style={{ background: l.rank <= 3 ? ["#D4AF37", "#C0C0C0", "#CD7F32"][l.rank - 1] : "rgba(255,255,255,0.1)", color: l.rank <= 3 ? "#0A0E1A" : "#fff" }}>
                {l.rank}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white">{l.name}{l.isYou && <span className="text-[9px] ml-1" style={{ color: GOLD }}>(You)</span>}</p>
              </div>
              <span className="text-[11px] font-bold" style={{ color: GOLD }}>{l.score}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-2 gap-2">
          {PERFORMANCE_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}