import React from "react";
import { Trophy } from "lucide-react";

const ACHIEVEMENTS = [
  { name: "Top Host", icon: "🏆", color: "#F59E0B" },
  { name: "Rising Creator", icon: "⭐", color: "#8B5CF6" },
  { name: "Music Champion", icon: "🎵", color: "#EC4899" },
  { name: "PK Winner", icon: "⚔️", color: "#EF4444" },
  { name: "Event Winner", icon: "🎁", color: "#10B981" },
  { name: "Community Star", icon: "🌟", color: "#3B82F6" },
  { name: "VIP Milestone", icon: "👑", color: "#F59E0B" },
  { name: "Daily Login", icon: "📅", color: "#06B6D4" },
];

export default function AchievementsSection({ achievements }) {
  const display = achievements?.length > 0 ? achievements : ACHIEVEMENTS.slice(0, 4);

  return (
    <div className="px-3 pt-4">
      <h2 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1.5"><Trophy size={14} className="text-amber-500" /> Achievements</h2>
      <div className="grid grid-cols-4 gap-2">
        {display.map((ach, i) => (
          <button
            key={i}
            className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-white border border-gray-50 shadow-sm active:scale-95 transition"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: `${ach.color || "#8B5CF6"}15` }}>
              {ach.icon || "🏅"}
            </div>
            <span className="text-[8px] font-bold text-gray-600 text-center">{ach.name || ach.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}