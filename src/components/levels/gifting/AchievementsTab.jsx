import React from "react";
import { giftingAchievements, giftingMilestones, rarityColors } from "@/components/levels/gifting/giftingData";
import { Lock, Trophy, Check, Crown } from "lucide-react";

export default function AchievementsTab() {
  const unlocked = giftingAchievements.filter(a => a.unlocked).length;
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Gifting Achievements</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">Supporter trophy showcase</p>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[{ l: "Total", v: giftingAchievements.length, i: "🏆", c: "#FFC83D" }, { l: "Unlocked", v: unlocked, i: "✅", c: "#22C55E" }, { l: "Locked", v: giftingAchievements.length - unlocked, i: "🔒", c: "#94A3B8" }, { l: "Rare+", v: giftingAchievements.filter(a => ["Legendary","Mythic"].includes(a.rarity)).length, i: "⭐", c: "#A855F7" }].map((s, i) => (
            <div key={i} className="rounded-xl p-2 text-center" style={{ background: `${s.c}10`, border: `1px solid ${s.c}20` }}>
              <div className="text-sm mb-0.5">{s.i}</div>
              <p className="text-sm font-bold" style={{ color: s.c }}>{s.v}</p>
              <p className="text-[8px] text-gray-400">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {giftingAchievements.map((a, i) => {
            const rc = rarityColors[a.rarity] || "#94A3B8";
            return (
              <div key={i} className="rounded-2xl p-3 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: `1px solid ${rc}30`, boxShadow: a.unlocked ? `0 4px 12px ${rc}20` : "none", opacity: a.unlocked ? 1 : 0.7 }}>
                <div className="absolute top-2 right-2 text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase" style={{ background: `${rc}15`, color: rc }}>{a.rarity}</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-2" style={{ background: `${rc}15`, border: `1px solid ${rc}25`, filter: a.unlocked ? "none" : "grayscale(1)" }}>
                  {a.unlocked ? <span style={{ filter: `drop-shadow(0 1px 2px ${rc}50)` }}>{a.icon}</span> : <Lock size={18} className="text-gray-400" />}
                </div>
                <p className="text-[10px] font-bold text-gray-800 truncate">{a.name}</p>
                <p className="text-[9px] text-gray-400 mb-2">{a.desc}</p>
                <button className="w-full text-[9px] font-bold py-1.5 rounded-lg active:scale-95 transition flex items-center justify-center gap-1" style={{ background: a.unlocked ? rc : `${rc}10`, color: a.unlocked ? "#fff" : rc }}>
                  {a.unlocked ? <><Trophy size={10} /> Claim Reward</> : "View Requirements"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Gifting Milestones</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">Reward unlock timeline</p>
        <div className="relative pl-6">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-200 via-yellow-200 to-purple-200" />
          {giftingMilestones.map((m, i) => {
            const color = m.reached ? "#22C55E" : "#94A3B8";
            return (
              <div key={i} className="relative mb-3">
                <div className="absolute -left-6 top-3 w-5 h-5 rounded-full flex items-center justify-center z-10" style={{ background: m.reached ? "#22C55E" : "#E5E7EB", border: "2px solid #fff", boxShadow: `0 2px 6px ${color}40` }}>
                  {m.reached ? <Check size={10} className="text-white" /> : <Lock size={9} className="text-gray-400" />}
                </div>
                <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: `1px solid ${m.reached ? "#22C55E" : "#E5E7EB"}30`, opacity: m.reached ? 1 : 0.8 }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg" style={{ background: `${m.reached ? "#FFC83D" : "#94A3B8"}15`, border: `1px solid ${m.reached ? "#FFC83D" : "#94A3B8"}25` }}>
                    <span style={{ filter: m.reached ? "none" : "grayscale(1)" }}>{m.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5"><span className="text-xs font-bold text-gray-800">LV{m.level}</span><Crown size={11} className="text-amber-500" /></div>
                    <p className="text-[10px] text-gray-500">{m.name}</p>
                    <p className="text-[9px] font-semibold text-amber-600">{m.coins} coins</p>
                  </div>
                  <button className="text-[9px] font-bold py-1.5 px-2.5 rounded-lg active:scale-95 transition" style={{ background: m.reached ? "#22C55E10" : "#F59E0B10", color: m.reached ? "#22C55E" : "#F59E0B" }}>{m.reached ? "Rewards" : "Preview"}</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}