import React from "react";
import { useNavigate } from "react-router-dom";

export default function OtherStatsGrid({ profile }) {
  const navigate = useNavigate();

  const stats = [
    { label: "Followers", value: profile?.followers || 0, key: "followers" },
    { label: "Following", value: profile?.following || 0, key: "following" },
    { label: "Friends", value: profile?.friends || 0, key: "friends" },
    { label: "Visitors", value: profile?.visitors || 0, key: "visitors" },
    { label: "Gifts Recv", value: profile?.gifts_received || 0, key: "gifts_received" },
    { label: "Gifts Sent", value: profile?.gifts_sent || 0, key: "gifts_sent" },
    { label: "Level", value: profile?.user_level || 1, key: "level" },
    { label: "Coins", value: profile?.coins || 0, key: "coins" },
  ];

  return (
    <div className="px-3 pt-3">
      <div className="bg-white rounded-2xl grid grid-cols-4 divide-x divide-gray-50 shadow-sm border border-gray-50">
        {stats.map((s, i) => (
          <button
            key={i}
            onClick={() => navigate(`/profile/${profile?.id}?tab=${s.key}`)}
            className="flex flex-col items-center py-3 active:bg-gray-50 transition"
          >
            <span className="text-sm font-bold text-gray-800">{s.value.toLocaleString()}</span>
            <span className="text-[9px] text-gray-400 font-medium">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}