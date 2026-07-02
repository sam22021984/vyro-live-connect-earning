import React from "react";
import { Coins, TrendingUp, Trophy, Zap, Crown, Sparkles } from "lucide-react";
import { userLevelTiers, currentUserLevel } from "@/components/levels/userLevelTiers";
import { collectionConfig } from "@/components/levels/userLevelTiers";
import TierCard from "@/components/levels/TierCard";

export default function UserLevelDashboard() {
  const u = currentUserLevel;
  const formatNum = (n) => n.toLocaleString();

  // Find current tier
  const currentTier = userLevelTiers.find((t) => {
    if (t.tier === 31) return false;
    const parts = t.levels.replace("LV", "").split("–");
    const min = parseInt(parts[0], 10);
    const max = parseInt(parts[1], 10);
    return u.level >= min && u.level <= max;
  }) || userLevelTiers[3];
  const config = collectionConfig[currentTier.collection];

  return (
    <div className="space-y-4">
      {/* User Profile Summary - Glassmorphism 3D */}
      <div
        className="relative rounded-3xl overflow-hidden p-5"
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: `0 16px 48px ${config.glow}, 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95)`,
        }}
      >
        {/* Decorative gradient blob */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${config.color}, transparent)` }}
        />

        <div className="relative">
          {/* Avatar + Level */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              {/* 3D ring */}
              <div
                className="w-20 h-20 rounded-full p-1"
                style={{
                  background: `linear-gradient(135deg, ${config.color}, ${config.color}80)`,
                  boxShadow: `0 8px 24px ${config.glow}, inset 0 2px 4px rgba(255,255,255,0.5)`,
                }}
              >
                <img
                  src={u.avatar}
                  alt={u.username}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
              {/* Level badge */}
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white whitespace-nowrap"
                style={{
                  background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`,
                  boxShadow: `0 2px 8px ${config.glow}`,
                  border: "2px solid #fff",
                }}
              >
                LV {u.level}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h2 className="text-base font-bold text-gray-800 truncate">{u.username}</h2>
                <Crown size={14} style={{ color: "#FFC83D" }} />
              </div>
              <p className="text-xs font-semibold mb-1" style={{ color: config.color }}>
                {u.tierName}
              </p>
              <div className="flex items-center gap-1.5">
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md flex items-center gap-0.5"
                  style={{ background: `${config.color}15`, color: config.color }}
                >
                  <Sparkles size={8} /> {currentTier.badge}
                </span>
              </div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1">
                <Zap size={12} style={{ color: config.color }} />
                <span className="text-[11px] font-bold text-gray-700">XP Progress</span>
              </div>
              <span className="text-[11px] font-bold" style={{ color: config.color }}>
                {u.progress}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${u.progress}%`,
                  background: `linear-gradient(to right, ${config.color}, ${config.color}cc)`,
                  boxShadow: `0 0 12px ${config.glow}`,
                }}
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[10px] text-gray-400">{formatNum(u.xp)} XP</span>
              <span className="text-[10px] text-gray-400">{formatNum(u.xpMax)} XP to next tier</span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl p-2.5 text-center" style={{ background: "rgba(255,200,61,0.1)", border: "1px solid rgba(255,200,61,0.2)" }}>
              <Coins size={14} className="text-amber-500 mx-auto mb-0.5" />
              <p className="text-xs font-bold text-gray-800">{formatNum(u.coins)}</p>
              <p className="text-[9px] text-gray-400 font-medium">Coins</p>
            </div>
            <div className="rounded-xl p-2.5 text-center" style={{ background: `${config.color}10`, border: `1px solid ${config.color}20` }}>
              <TrendingUp size={14} className="mx-auto mb-0.5" style={{ color: config.color }} />
              <p className="text-xs font-bold text-gray-800">{u.rank}</p>
              <p className="text-[9px] text-gray-400 font-medium">Global Rank</p>
            </div>
            <div className="rounded-xl p-2.5 text-center" style={{ background: "rgba(13,27,62,0.05)", border: "1px solid rgba(13,27,62,0.1)" }}>
              <Trophy size={14} className="mx-auto mb-0.5" style={{ color: "#0D1B3E" }} />
              <p className="text-xs font-bold text-gray-800">Tier {currentTier.tier}/31</p>
              <p className="text-[9px] text-gray-400 font-medium">Journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Next tier progress hint */}
      <div
        className="rounded-2xl p-3 flex items-center gap-3"
        style={{ background: `${config.color}08`, border: `1px solid ${config.color}15` }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${config.color}15` }}
        >
          <Sparkles size={18} style={{ color: config.color }} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-gray-400 font-medium">Next Tier</p>
          <p className="text-xs font-bold text-gray-700">
            {userLevelTiers[currentTier.tier]?.name || "Ultimate Universe Emperor"}
          </p>
        </div>
        <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: config.color, color: "#fff" }}>
          {userLevelTiers[currentTier.tier]?.levels || "LV300"}
        </span>
      </div>

      {/* Level Journey Header */}
      <div className="flex items-center justify-between px-1 pt-2">
        <div>
          <h3 className="text-sm font-bold text-gray-800">Level Journey</h3>
          <p className="text-[10px] text-gray-400">LV1 → LV300 Progression Timeline</p>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
          <Crown size={12} className="text-amber-500" />
          31 Tiers
        </div>
      </div>

      {/* Tier cards - vertical scroll journey */}
      <div className="space-y-3">
        {userLevelTiers.map((tier) => (
          <TierCard key={tier.tier} tier={tier} currentLevel={u.level} />
        ))}
      </div>

      {/* Footer note */}
      <div className="text-center py-4">
        <p className="text-[10px] text-gray-400 font-medium">
          🏆 VYRO Live Connect — User Level System
        </p>
        <p className="text-[9px] text-gray-300 mt-0.5">Premium 3D Gamification Experience</p>
      </div>
    </div>
  );
}