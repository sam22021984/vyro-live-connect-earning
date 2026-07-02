import React from "react";
import { Trophy } from "lucide-react";

const rankColors = [
  "from-yellow-400 to-amber-500",
  "from-gray-300 to-gray-400",
  "from-orange-400 to-amber-600",
];

const rankEmoji = ["🥇", "🥈", "🥉"];

export default function TopFansSection({ fans }) {
  const topFans = fans?.length > 0 ? fans : [
    { fan_name: "No fans yet", rank: 1, score: 0 },
    { fan_name: "No fans yet", rank: 2, score: 0 },
    { fan_name: "No fans yet", rank: 3, score: 0 },
  ];

  return (
    <div className="px-4 mb-4">
      <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-yellow-500" />
            <h3 className="text-sm font-bold text-gray-800">Top Fans</h3>
          </div>
          <span className="text-[10px] text-purple-500 font-semibold">See All</span>
        </div>

        <div className="space-y-2.5">
          {topFans.slice(0, 3).map((fan, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 rounded-[14px] bg-gray-50/80 transition-all duration-300 hover:bg-gray-100/80">
              <span className="text-lg">{rankEmoji[i] || "🏅"}</span>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center text-xs font-bold text-purple-600 overflow-hidden">
                {fan.avatar_url ? (
                  <img src={fan.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  fan.fan_name?.[0]?.toUpperCase() || "?"
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-700 truncate">{fan.fan_name}</p>
                <p className="text-[10px] text-gray-400">Score: {fan.score?.toLocaleString() || 0}</p>
              </div>
              <span className={`text-[10px] font-bold bg-gradient-to-r ${rankColors[i] || "from-gray-300 to-gray-400"} text-white px-2.5 py-0.5 rounded-full`}>
                Top {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}