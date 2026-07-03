import React from "react";
import { useNavigate } from "react-router-dom";
import { Radio, Clock, Eye, Gift, Trophy, Play, Calendar, Settings } from "lucide-react";

export default function LiveCenter({ profile }) {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Hours", value: profile?.host_level * 10 || 0, icon: Clock, color: "text-red-500" },
    { label: "Today", value: 0, icon: Clock, color: "text-orange-500" },
    { label: "Avg Viewers", value: 0, icon: Eye, color: "text-blue-500" },
    { label: "Peak Viewers", value: 0, icon: Eye, color: "text-purple-500" },
    { label: "Total Gifts", value: profile?.gifts_received || 0, icon: Gift, color: "text-amber-500" },
    { label: "Ranking", value: "#—", icon: Trophy, color: "text-yellow-500" },
  ];

  return (
    <div className="px-3 pt-4">
      <h2 className="text-sm font-bold text-gray-800 mb-2 px-1 flex items-center gap-1.5"><Radio size={14} className="text-red-500" /> Live Center</h2>
      <div className="bg-white rounded-2xl border border-gray-50 shadow-sm p-3">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center py-2">
              <s.icon size={14} className={s.color} />
              <span className={`text-sm font-bold ${s.color} mt-0.5`}>{typeof s.value === "number" ? s.value.toLocaleString() : s.value}</span>
              <span className="text-[9px] text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate("/go-live")} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition">
            <Play size={13} /> Start Live
          </button>
          <button onClick={() => navigate("/go-live")} className="flex-1 py-2.5 rounded-xl bg-gray-50 text-gray-600 text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition border border-gray-100">
            <Calendar size={13} /> Schedule
          </button>
          <button onClick={() => navigate("/room-management")} className="py-2.5 px-4 rounded-xl bg-gray-50 text-gray-600 text-xs font-bold flex items-center justify-center active:scale-95 transition border border-gray-100">
            <Settings size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}