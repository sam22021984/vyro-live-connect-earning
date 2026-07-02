import React from "react";
import { Award } from "lucide-react";

const defaultBadges = [
  { name: "VIP", icon: "👑", bg: "bg-yellow-50", border: "border-yellow-200" },
  { name: "Host", icon: "🎤", bg: "bg-red-50", border: "border-red-200" },
  { name: "Agency", icon: "🏢", bg: "bg-blue-50", border: "border-blue-200" },
  { name: "Event Badge", icon: "🎯", bg: "bg-green-50", border: "border-green-200" },
  { name: "Founder", icon: "⭐", bg: "bg-purple-50", border: "border-purple-200" },
  { name: "Birthday", icon: "🎂", bg: "bg-pink-50", border: "border-pink-200" },
  { name: "Elite", icon: "💎", bg: "bg-cyan-50", border: "border-cyan-200" },
  { name: "Star Badge", icon: "🌟", bg: "bg-amber-50", border: "border-amber-200" },
];

export default function SpecialBadges({ badges }) {
  const displayBadges = badges?.length > 0 ? badges : defaultBadges;

  return (
    <div className="px-4 mb-4">
      <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award size={16} className="text-purple-500" />
            <h3 className="text-sm font-bold text-gray-800">Special Badges</h3>
          </div>
          <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {displayBadges.length} Earned
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {displayBadges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center transition-all duration-300 hover:scale-105">
              <div className={`w-14 h-14 rounded-full ${badge.bg || "bg-gray-50"} border ${badge.border || "border-gray-200"} flex items-center justify-center mb-1.5 shadow-sm`}>
                <span className="text-2xl">{badge.icon || "🏅"}</span>
              </div>
              <span className="text-[9px] text-gray-500 font-medium text-center leading-tight">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}