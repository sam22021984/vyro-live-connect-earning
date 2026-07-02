import React from "react";
import { User, Mic, Gift, Radio } from "lucide-react";

export default function LevelCards({ profile }) {
  const levels = [
    {
      icon: User, label: "User Level",
      level: profile?.user_level || 1,
      xp: profile?.user_xp || 0,
      xpMax: profile?.user_xp_max || 10000,
      color: "from-purple-500 to-purple-600",
      badgeColor: "bg-purple-500",
      barColor: "bg-purple-500",
      iconColor: "text-purple-500",
      bgIcon: "bg-purple-50",
    },
    {
      icon: Mic, label: "Host Level",
      level: profile?.host_level || 1,
      xp: profile?.host_xp || 0,
      xpMax: profile?.host_xp_max || 10000,
      color: "from-red-500 to-red-600",
      badgeColor: "bg-red-500",
      barColor: "bg-red-500",
      iconColor: "text-red-500",
      bgIcon: "bg-red-50",
    },
    {
      icon: Gift, label: "Gifting Level",
      level: profile?.gifting_level || 1,
      xp: profile?.gifting_xp || 0,
      xpMax: profile?.gifting_xp_max || 10000,
      color: "from-amber-500 to-amber-600",
      badgeColor: "bg-amber-500",
      barColor: "bg-amber-500",
      iconColor: "text-amber-500",
      bgIcon: "bg-amber-50",
    },
    {
      icon: Radio, label: "Streaming Level",
      level: profile?.streaming_level || 1,
      xp: profile?.streaming_xp || 0,
      xpMax: profile?.streaming_xp_max || 10000,
      color: "from-blue-500 to-blue-600",
      badgeColor: "bg-blue-500",
      barColor: "bg-blue-500",
      iconColor: "text-blue-500",
      bgIcon: "bg-blue-50",
    },
  ];

  return (
    <div className="px-4 mb-4">
      <div className="grid grid-cols-2 gap-3">
        {levels.map((lv, i) => {
          const pct = lv.xpMax > 0 ? Math.min((lv.xp / lv.xpMax) * 100, 100) : 0;
          return (
            <div key={i} className="bg-white rounded-[18px] p-4 shadow-sm border border-gray-50 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-full ${lv.bgIcon} flex items-center justify-center`}>
                  <lv.icon size={17} className={lv.iconColor} />
                </div>
                <span className={`${lv.badgeColor} text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full`}>
                  Lv.{lv.level}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-700 mb-2">{lv.label}</p>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                <div
                  className={`h-full ${lv.barColor} rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-gray-400 font-medium">{lv.xp.toLocaleString()} XP</span>
                <span className="text-[9px] text-gray-300">{lv.xpMax.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}