import React from "react";
import { Award } from "lucide-react";

const defaultAchievements = [
  { name: "First Recharge", icon: "💰", bg: "bg-green-50", unlocked: true },
  { name: "First Live", icon: "🎤", bg: "bg-red-50", unlocked: true },
  { name: "First PK Win", icon: "⚔️", bg: "bg-blue-50", unlocked: false },
  { name: "Top Host", icon: "🌟", bg: "bg-yellow-50", unlocked: true },
  { name: "Gift Master", icon: "🎁", bg: "bg-pink-50", unlocked: true },
  { name: "PK King", icon: "👑", bg: "bg-purple-50", unlocked: false },
  { name: "VIP Legend", icon: "💎", bg: "bg-cyan-50", unlocked: true },
  { name: "Elite User", icon: "🏆", bg: "bg-amber-50", unlocked: true },
  { name: "Million Club", icon: "🎯", bg: "bg-orange-50", unlocked: false },
];

export default function AchievementsGrid({ achievements }) {
  const displayAchievements = achievements?.length > 0 ? achievements : defaultAchievements;

  return (
    <div className="px-4 mb-4">
      <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award size={16} className="text-amber-500" />
            <h3 className="text-sm font-bold text-gray-800">Achievements</h3>
          </div>
          <span className="bg-amber-100 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {displayAchievements.filter(a => a.unlocked || a.is_unlocked).length}/{displayAchievements.length} Unlocked
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {displayAchievements.map((ach, i) => {
            const unlocked = ach.unlocked || ach.is_unlocked;
            return (
              <div key={i} className={`flex flex-col items-center p-3 rounded-[16px] transition-all duration-300 hover:scale-105 ${unlocked ? ach.bg || "bg-gray-50" : "bg-gray-50 opacity-50"}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${unlocked ? "bg-white shadow-sm" : "bg-gray-100"}`}>
                  <span className={`text-xl ${!unlocked ? "grayscale" : ""}`}>{ach.icon || "🏅"}</span>
                </div>
                <span className="text-[9px] text-gray-600 font-medium text-center leading-tight">{ach.name}</span>
                {!unlocked && (
                  <span className="text-[8px] text-gray-400 mt-0.5">🔒 Locked</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}