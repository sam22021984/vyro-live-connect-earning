import React from "react";
import { Users, UserPlus, Heart, Eye, Zap, Gift, Send, Coins, Activity } from "lucide-react";

export default function StatsGrid({ profile }) {
  const stats = [
    { icon: Users, label: "Followers", value: profile?.followers || 0, color: "text-purple-500", bg: "bg-purple-50" },
    { icon: UserPlus, label: "Following", value: profile?.following || 0, color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Heart, label: "Friends", value: profile?.friends || 0, color: "text-pink-500", bg: "bg-pink-50" },
    { icon: Eye, label: "Visitors", value: profile?.visitors || 0, color: "text-cyan-500", bg: "bg-cyan-50" },
    { icon: Zap, label: "Total XP", value: profile?.total_xp || 0, color: "text-yellow-500", bg: "bg-yellow-50" },
    { icon: Gift, label: "Gifts Received", value: profile?.gifts_received || 0, color: "text-green-500", bg: "bg-green-50" },
    { icon: Send, label: "Gifts Sent", value: profile?.gifts_sent || 0, color: "text-orange-500", bg: "bg-orange-50" },
    { icon: Coins, label: "Coins", value: profile?.coins || 0, color: "text-amber-500", bg: "bg-amber-50" },
    { icon: Activity, label: "Activity Score", value: profile?.activity_score || 0, color: "text-red-500", bg: "bg-red-50" },
  ];

  return (
    <div className="px-4 mb-4">
      <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">📊</span>
          <h3 className="text-sm font-bold text-gray-800">Statistics</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center p-3 rounded-[16px] bg-gray-50/80 hover:bg-gray-100/80 transition-all duration-300">
              <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mb-2`}>
                <stat.icon size={18} className={stat.color} />
              </div>
              <span className="text-base font-bold text-gray-800">{stat.value.toLocaleString()}</span>
              <span className="text-[10px] text-gray-400 font-medium text-center leading-tight mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}