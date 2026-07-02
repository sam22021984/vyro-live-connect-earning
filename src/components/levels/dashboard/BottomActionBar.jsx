import React from "react";
import { Layers, Gift, Trophy, Diamond, BarChart3 } from "lucide-react";

const actions = [
  { label: "All Levels", icon: Layers, color: "#1F6BFF" },
  { label: "Rewards", icon: Gift, color: "#FFC83D" },
  { label: "Achievements", icon: Trophy, color: "#A855F7" },
  { label: "Collections", icon: Diamond, color: "#22D3EE" },
  { label: "Leaderboard", icon: BarChart3, color: "#EC4899" },
];

export default function BottomActionBar() {
  return (
    <div className="sticky bottom-0 z-20 mt-4">
      <div className="rounded-2xl p-2 mx-4 mb-4" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 8px 32px rgba(13,27,62,0.12), inset 0 1px 0 rgba(255,255,255,0.95)" }}>
        <div className="grid grid-cols-5 gap-1">
          {actions.map((a, i) => (
            <button key={i} className="flex flex-col items-center gap-1 py-2 rounded-xl active:scale-95 transition hover:bg-gray-50">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${a.color}15`, border: `1px solid ${a.color}20` }}>
                <a.icon size={16} style={{ color: a.color }} />
              </div>
              <span className="text-[8px] font-bold text-gray-600">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}