import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { X, TrendingUp, Gift, Crown, History } from "lucide-react";
import { levelData, levelBenefits, xpHistory, COLORS } from "./profileStatsData";

export default function LevelXPTab() {
  const [view, setView] = useState("overview");
  const { toast } = useToast();
  const pct = Math.round((levelData.current_xp / levelData.required_xp) * 100);

  const xpStats = [
    { label: "XP Today", value: levelData.xp_today, icon: "📅", color: COLORS.primary },
    { label: "XP This Week", value: levelData.xp_week, icon: "📆", color: COLORS.success },
    { label: "XP This Month", value: levelData.xp_month, icon: "🗓️", color: COLORS.gold },
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
        <button onClick={() => setView("history")} className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap active:scale-95 transition flex items-center gap-1.5 ${view === "history" ? "text-white" : ""}`}
          style={view === "history" ? { background: COLORS.primary } : { background: COLORS.cardBg, color: COLORS.muted, border: "1px solid #EEF0F4" }}><History size={12} /> XP History</button>
      </div>

      {view === "overview" && (
        <>
          {/* Level card */}
          <div className="rounded-2xl p-4 mb-3 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.navy})` }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-white/70">Current Level</p>
                <p className="text-3xl font-bold">LV.{levelData.current_level}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block" style={{ background: "rgba(255,200,61,0.25)", color: COLORS.gold }}>{levelData.rank} Rank</span>
              </div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,200,61,0.4)" }}>📈</div>
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-white/70">XP Progress</span>
                <span className="text-[10px] font-bold">{levelData.current_xp.toLocaleString()} / {levelData.required_xp.toLocaleString()}</span>
              </div>
              <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.2)" }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: `linear-gradient(to right, ${COLORS.gold}, #FFD966)` }} />
              </div>
              <p className="text-[10px] text-white/70 mt-1.5 text-center">{(levelData.required_xp - levelData.current_xp).toLocaleString()} XP to LV.{levelData.current_level + 1}</p>
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
        </>
      )}

      {view === "rewards" && (
        <div className="space-y-2.5">
          <div className="rounded-2xl p-3 mb-2" style={{ background: `${COLORS.gold}10`, border: `1px solid ${COLORS.gold}30` }}>
            <div className="flex items-center gap-2">
              <Gift size={16} style={{ color: COLORS.gold }} />
              <p className="text-xs font-bold" style={{ color: COLORS.gold }}>Next Level Rewards (LV.{levelData.current_level + 1})</p>
            </div>
          </div>
          {levelData.next_level_rewards.map((r, i) => (
            <div key={i} className="rounded-2xl p-3 flex items-center gap-3" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${COLORS.gold}15`, border: `1px solid ${COLORS.gold}30` }}>{r.icon}</div>
              <div className="flex-1">
                <h4 className="text-sm font-bold" style={{ color: COLORS.navy }}>{r.type}</h4>
                <p className="text-[10px]" style={{ color: COLORS.muted }}>Reward Amount</p>
              </div>
              <span className="text-sm font-bold" style={{ color: COLORS.gold }}>{r.amount}</span>
            </div>
          ))}
        </div>
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

      {view === "history" && (
        <div className="space-y-2.5">
          {xpHistory.map((h) => (
            <div key={h.id} className="rounded-2xl p-3 flex items-center gap-3" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${COLORS.primary}15` }}>{h.icon}</div>
              <div className="flex-1">
                <h4 className="text-xs font-bold" style={{ color: COLORS.navy }}>{h.activity}</h4>
                <p className="text-[9px]" style={{ color: COLORS.muted }}>{h.date}</p>
              </div>
              <span className="text-sm font-bold" style={{ color: COLORS.success }}>+{h.amount} XP</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}