import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyStatsDashboard({ profile }) {
  const navigate = useNavigate();

  const stats = [
    { label: "Followers", value: profile?.followers || 0, color: "text-purple-600" },
    { label: "Following", value: profile?.following || 0, color: "text-blue-600" },
    { label: "Friends", value: profile?.friends || 0, color: "text-green-600" },
    { label: "Visitors", value: profile?.visitors || 0, color: "text-orange-600" },
    { label: "Profile Views", value: Math.floor((profile?.visitors || 0) * 1.5), color: "text-cyan-600" },
    { label: "Likes", value: Math.floor((profile?.activity_score || 0) * 0.3), color: "text-red-600" },
    { label: "Posts", value: 0, color: "text-gray-600" },
    { label: "Videos", value: 0, color: "text-gray-600" },
    { label: "Photos", value: 0, color: "text-gray-600" },
    { label: "Albums", value: 0, color: "text-gray-600" },
    { label: "Live Sessions", value: 0, color: "text-red-600" },
    { label: "Gifts Sent", value: profile?.gifts_sent || 0, color: "text-amber-600" },
    { label: "Gifts Recv", value: profile?.gifts_received || 0, color: "text-pink-600" },
    { label: "Coins", value: profile?.coins || 0, color: "text-yellow-600" },
    { label: "Total XP", value: profile?.total_xp || 0, color: "text-indigo-600" },
    { label: "Activity", value: profile?.activity_score || 0, color: "text-purple-600" },
  ];

  return (
    <div className="px-3 pt-4">
      <h2 className="text-sm font-bold text-gray-800 mb-2 px-1">📊 Statistics</h2>
      <div className="bg-white rounded-2xl grid grid-cols-4 divide-x divide-y divide-gray-50 shadow-sm border border-gray-50 overflow-hidden">
        {stats.map((s, i) => (
          <button key={i} onClick={() => navigate(`/profile-stats?tab=${s.label}`)} className="flex flex-col items-center py-3 active:bg-gray-50 transition">
            <span className={`text-sm font-bold ${s.color}`}>{s.value.toLocaleString()}</span>
            <span className="text-[8px] text-gray-400 font-medium">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}