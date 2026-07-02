import React from "react";
import { Zap, Coins, Crown, Eye, Gift } from "lucide-react";

export default function CurrentLevelCard({ user, tier, nextTier, config, formatNum }) {
  return (
    <div className="rounded-3xl overflow-hidden p-5" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: `0 12px 36px ${config.glow}, inset 0 1px 0 rgba(255,255,255,0.95)` }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Current Level</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold" style={{ color: config.color }}>LV{user.level}</h3>
            <span className="text-xs font-semibold text-gray-500">{tier.name}</span>
          </div>
        </div>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: `linear-gradient(135deg, ${config.color}25, ${config.color}08)`, border: `1px solid ${config.color}30`, boxShadow: `0 6px 20px ${config.glow}` }}>
          <span style={{ filter: `drop-shadow(0 2px 4px ${config.color}60)` }}>{tier.icon}</span>
        </div>
      </div>

      {/* XP Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1"><Zap size={12} style={{ color: config.color }} /><span className="text-[11px] font-bold text-gray-700">XP Progress</span></div>
          <span className="text-[11px] font-bold" style={{ color: config.color }}>{user.progress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${user.progress}%`, background: `linear-gradient(to right, ${config.color}, ${config.color}cc)`, boxShadow: `0 0 12px ${config.glow}` }} />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] text-gray-400">{formatNum(user.xp)} XP</span>
          <span className="text-[10px] text-gray-400">{formatNum(user.xpMax)} XP to next</span>
        </div>
      </div>

      {/* Coins Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1"><Coins size={12} className="text-amber-500" /><span className="text-[11px] font-bold text-gray-700">Coins Progress</span></div>
          <span className="text-[11px] font-bold text-amber-500">{tier.coins}</span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: "45%", background: "linear-gradient(to right, #FFC83D, #F59E0B)", boxShadow: "0 0 10px rgba(255,200,61,0.5)" }} />
        </div>
      </div>

      {/* Next level preview */}
      <div className="rounded-2xl p-3 flex items-center gap-3 mb-3" style={{ background: `${config.color}08`, border: `1px solid ${config.color}15` }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${config.color}15` }}>{nextTier?.icon || "👑"}</div>
        <div className="flex-1">
          <p className="text-[9px] text-gray-400">Next Level Preview</p>
          <p className="text-xs font-bold text-gray-700">{nextTier?.name || "Ultimate Emperor"}</p>
          <p className="text-[9px] text-gray-400">{nextTier?.levels || "LV300"} • {nextTier?.coins || "50B"} coins</p>
        </div>
        <Crown size={16} style={{ color: "#FFC83D" }} />
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Benefits", icon: Eye },
          { label: "Rewards", icon: Gift },
          { label: "Tier Details", icon: Crown },
        ].map((a, i) => (
          <button key={i} className="flex items-center justify-center gap-1 py-2 rounded-xl text-[10px] font-bold text-white active:scale-95 transition" style={{ background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`, boxShadow: `0 4px 12px ${config.glow}` }}>
            <a.icon size={11} /> {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}