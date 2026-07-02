import React from "react";
import { achievements, rarityColors } from "@/components/levels/dashboardData";
import { Lock, Trophy } from "lucide-react";

export default function AchievementsTab() {
  const unlocked = achievements.filter(a => a.unlocked).length;
  const locked = achievements.filter(a => !a.unlocked).length;

  return (
    <div>
      <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Achievement Collection</h3>
      <p className="text-[10px] text-gray-400 mb-3 px-1">Premium trophy showcase</p>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: "Total", value: achievements.length, icon: "🏆", color: "#FFC83D" },
          { label: "Unlocked", value: unlocked, icon: "✅", color: "#22C55E" },
          { label: "Locked", value: locked, icon: "🔒", color: "#94A3B8" },
          { label: "Rare+", value: achievements.filter(a => ["Legendary", "Mythic"].includes(a.rarity)).length, icon: "⭐", color: "#A855F7" },
        ].map((s, i) => (
          <div key={i} className="rounded-xl p-2 text-center" style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}>
            <div className="text-sm mb-0.5">{s.icon}</div>
            <p className="text-sm font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[8px] text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Achievement grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {achievements.map((a, i) => {
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
  );
}