import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Gift, Crown, History } from "lucide-react";
import { levelBenefits, COLORS } from "./profileStatsData";

export default function LevelXPTab({ profile }) {
  const [view, setView] = useState("overview");
  const { toast } = useToast();

  const currentLevel = profile?.user_level || 1;
  const currentXp = profile?.user_xp || 0;
  const requiredXp = profile?.user_xp_max || 10000;
  const pct = requiredXp > 0 ? Math.round((currentXp / requiredXp) * 100) : 0;

  const xpStats = [
    { label: "Total XP", value: profile?.total_xp || 0, icon: "⚡", color: COLORS.primary },
    { label: "Host XP", value: profile?.host_xp || 0, icon: "🎤", color: COLORS.success },
    { label: "Gifting XP", value: profile?.gifting_xp || 0, icon: "💝", color: COLORS.gold },
  ];

  return (
    <div>
      {/* View switcher */}
      <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
        <button onClick={() => setView("overview")} className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap active:scale-95 transition ${view === "overview" ? "text-white" : ""}`}
          style={view === "overview" ? { background: COLORS.primary } : { background: COLORS.cardBg, color: COLORS.muted, border: "1px solid #EEF0F4" }}>Overview</button>
        <button onClick={() => setView("rewards")} className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap active:scale-95 transition flex items-center gap-1.5 ${view === "rewards" ? "text-white" : ""}`}
          style={view === "rewards" ? { background: COLORS.primary } : { background: COLORS.cardBg, color: COLORS.muted, border: "1px solid #EEF0F4" }}><Gift size={12} /> Rewards</button>
        <button onClick={() => setView("benefits")} className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap active:scale-95 transition flex items-center gap-1.5 ${view === "benefits" ? "text-white" : ""}`}
          style={view === "benefits" ? { background: COLORS.primary } : { background: COLORS.cardBg, color: COLORS.muted, border: "1px solid #EEF0F4" }}><Crown size={12} /> Benefits</button>
      </div>

      {view === "overview" && (
        <>
          {/* Level card */}
          <div className="rounded-2xl p-4 mb-3 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.navy})` }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-white/70">Current Level</p>
                <p className="text-3xl font-bold">LV.{currentLevel}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block" style={{ background: "rgba(255,200,61,0.25)", color: COLORS.gold }}>{profile?.vip_tier || "User"} Rank</span>
              </div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,200,61,0.4)" }}>📈</div>
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-white/70">XP Progress</span>
                <span className="text-[10px] font-bold">{currentXp.toLocaleString()} / {requiredXp.toLocaleString()}</span>
              </div>
              <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.2)" }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: `linear-gradient(to right, ${COLORS.gold}, #FFD966)` }} />
              </div>
              <p className="text-[10px] text-white/70 mt-1.5 text-center">{(requiredXp - currentXp).toLocaleString()} XP to LV.{currentLevel + 1}</p>
            </div>
          </div>

          {/* XP stats */}
          <div className="grid grid-cols-3 gap-2.5 mb-3">
            {xpStats.map((s) => (
              <div key={s.label} className="rounded-2xl p-3 text-center" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
                <span className="text-lg block mb-1">{s.icon}</span>
                <p className="text-base font-bold" style={{ color: s.color }}>{s.value.toLocaleString()}</p>
                <p className="text-[9px]" style={{ color: COLORS.muted }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* All levels overview */}
          <div className="rounded-2xl p-3 mb-3" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
            <h4 className="text-xs font-bold mb-2.5" style={{ color: COLORS.navy }}>All Levels</h4>
            <div className="space-y-2">
              {[
                { label: "User Level", level: profile?.user_level || 1, xp: profile?.user_xp || 0, max: profile?.user_xp_max || 10000, icon: "👤", color: COLORS.primary },
                { label: "Host Level", level: profile?.host_level || 1, xp: profile?.host_xp || 0, max: profile?.host_xp_max || 10000, icon: "🎤", color: COLORS.danger },
                { label: "Gifting Level", level: profile?.gifting_level || 1, xp: profile?.gifting_xp || 0, max: profile?.gifting_xp_max || 10000, icon: "💝", color: COLORS.gold },
                { label: "Streaming Level", level: profile?.streaming_level || 1, xp: profile?.streaming_xp || 0, max: profile?.streaming_xp_max || 10000, icon: "📺", color: COLORS.success },
              ].map((lv) => {
                const lvPct = lv.max > 0 ? Math.min((lv.xp / lv.max) * 100, 100) : 0;
                return (
                  <div key={lv.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold" style={{ color: COLORS.navy }}>{lv.icon} {lv.label}</span>
                      <span className="text-[10px] font-bold" style={{ color: lv.color }}>Lv.{lv.level}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "#E5E7EB" }}>
                      <div className="h-full rounded-full" style={{ width: `${lvPct}%`, background: lv.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {view === "benefits" && (
        <div className="grid grid-cols-2 gap-2.5">
          {levelBenefits.map((b, i) => (
            <div key={i} className="rounded-2xl p-3 flex flex-col items-center text-center" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-2" style={{ background: `${COLORS.primary}15`, border: `1px solid ${COLORS.primary}30` }}>{b.icon}</div>
              <h4 className="text-xs font-bold mb-0.5" style={{ color: COLORS.navy }}>{b.name}</h4>
              <p className="text-[9px]" style={{ color: COLORS.muted }}>{b.desc}</p>
            </div>
          ))}
        </div>
      )}

      {view === "rewards" && (
        <div className="rounded-2xl p-4 text-center" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
          <Gift size={32} style={{ color: COLORS.gold }} className="mx-auto mb-2" />
          <p className="text-xs font-bold" style={{ color: COLORS.navy }}>Level up to unlock rewards</p>
          <p className="text-[10px] mt-1" style={{ color: COLORS.muted }}>Reach LV.{currentLevel + 1} to earn coins, badges, and exclusive frames</p>
        </div>
      )}
    </div>
  );
}