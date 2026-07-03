import React, { useState, useEffect } from "react";
import { Zap, Coins, Crown, Eye, Gift } from "lucide-react";
import { streamingTiers, streamingConfig } from "@/components/levels/streaming/streamingData";
import { base44 } from "@/api/base44Client";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default function StreamCurrentLevelCard() {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const me = await getCurrentUser();
        let p = await base44.entities.UserProfile.filter({ user_id: me.id });
        if (p.length === 0) p = await base44.entities.UserProfile.filter({ created_by_id: me.id });
        if (p.length > 0) setProfile(p[0]);
      } catch (e) {}
    })();
  }, []);
  const u = {
    level: profile?.streaming_level || 1,
    username: profile?.username || "User",
    xp: profile?.streaming_xp || 0,
    xpMax: profile?.streaming_xp_max || 10000,
    progress: profile?.streaming_xp_max > 0 ? Math.round(((profile?.streaming_xp || 0) / profile?.streaming_xp_max) * 100) : 0,
    totalStreamCoins: (profile?.coins || 0).toLocaleString(),
    popularityRank: "—",
  };
  const c = streamingConfig;
  const formatNum = (n) => n.toLocaleString();
  const currentTier = streamingTiers.find((t) => { const parts = t.levels.replace("LV","").split("–"); const min = parseInt(parts[0]); const max = parseInt(parts[parts.length-1]); return u.level >= min && u.level <= max; }) || streamingTiers[2];
  const nextTier = streamingTiers[currentTier.tier] || streamingTiers[streamingTiers.length - 1];

  return (
    <div className="rounded-3xl overflow-hidden p-5" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: `0 12px 36px ${c.glow}` }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Streaming Level</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold" style={{ color: c.color }}>LV{u.level}</h3>
            <span className="text-xs font-semibold text-gray-500">{currentTier.name}</span>
          </div>
        </div>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: `${c.color}25`, border: `1px solid ${c.color}30`, boxShadow: `0 6px 20px ${c.glow}` }}>
          <span style={{ filter: `drop-shadow(0 2px 4px ${c.color}60)` }}>{currentTier.icon}</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1"><Zap size={12} style={{ color: c.color }} /><span className="text-[11px] font-bold text-gray-700">Streaming XP</span></div>
          <span className="text-[11px] font-bold" style={{ color: c.color }}>{u.progress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${u.progress}%`, background: `linear-gradient(to right, ${c.color}, ${c.color}cc)`, boxShadow: `0 0 12px ${c.glow}` }} />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] text-gray-400">{formatNum(u.xp)} XP</span>
          <span className="text-[10px] text-gray-400">{formatNum(u.xpMax)} XP to next</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1"><Coins size={12} className="text-amber-500" /><span className="text-[11px] font-bold text-gray-700">Stream Coins Progress</span></div>
          <span className="text-[11px] font-bold text-amber-500">{currentTier.coins}</span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: "65%", background: "linear-gradient(to right, #FFC83D, #F59E0B)", boxShadow: "0 0 10px rgba(255,200,61,0.5)" }} />
        </div>
      </div>

      <div className="rounded-2xl p-3 flex items-center gap-3 mb-3" style={{ background: `${c.color}08`, border: `1px solid ${c.color}15` }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${c.color}15` }}>{nextTier?.icon || "👑"}</div>
        <div className="flex-1">
          <p className="text-[9px] text-gray-400">Next Streaming Level</p>
          <p className="text-xs font-bold text-gray-700">{nextTier?.name || "Universe Emperor"}</p>
          <p className="text-[9px] text-gray-400">{nextTier?.levels || "LV200"} • {nextTier?.coins || "40B"} coins</p>
        </div>
        <Crown size={16} style={{ color: "#FFC83D" }} />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[{ label: "Benefits", icon: Eye }, { label: "Rewards", icon: Gift }, { label: "Tier Details", icon: Crown }].map((a, i) => (
          <button key={i} className="flex items-center justify-center gap-1 py-2 rounded-xl text-[10px] font-bold text-white active:scale-95 transition" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)`, boxShadow: `0 4px 12px ${c.glow}` }}>
            <a.icon size={11} /> {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}