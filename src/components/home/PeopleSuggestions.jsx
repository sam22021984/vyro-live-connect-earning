import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, Crown, UserPlus, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";

function FollowButton({ userId, initialFollowed }) {
  const [followed, setFollowed] = useState(initialFollowed);
  const [loading, setLoading] = useState(false);

  const handleFollow = async (e) => {
    e.stopPropagation();
    setLoading(true);
    setFollowed(!followed);
    setLoading(false);
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`px-3 py-1 rounded-full text-[10px] font-bold transition active:scale-90 ${
        followed ? "bg-gray-100 text-gray-500" : "bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white"
      }`}
    >
      {followed ? <span className="flex items-center gap-0.5"><Check size={10} /> Following</span> : <span className="flex items-center gap-0.5"><UserPlus size={10} /> Follow</span>}
    </button>
  );
}

export function CreatorSuggestions({ creators }) {
  const navigate = useNavigate();
  if (!creators || creators.length === 0) return null;

  return (
    <div className="pt-4">
      <div className="flex items-center justify-between px-3 mb-2">
        <h2 className="text-sm font-bold text-gray-800">✨ Recommended Creators</h2>
        <button className="text-[10px] font-semibold text-purple-500">See All</button>
      </div>
      <div className="flex gap-2.5 px-3 overflow-x-auto scrollbar-hide pb-1">
        {creators.map((c) => (
          <div
            key={c.id}
            onClick={() => navigate(`/profile/${c.id}`)}
            className="flex-shrink-0 w-32 rounded-2xl overflow-hidden bg-white border border-gray-50 shadow-sm active:scale-95 transition cursor-pointer"
          >
            <div className="h-16 bg-gradient-to-br from-purple-300 to-blue-300 relative">
              {c.cover_url && <img src={c.cover_url} alt="" className="w-full h-full object-cover" />}
              <img
                src={c.avatar_url || `https://ui-avatars.com/api/?name=${c.username}`}
                alt=""
                className="absolute left-1/2 -translate-x-1/2 -bottom-5 w-10 h-10 rounded-full object-cover border-2 border-white bg-gray-100"
              />
            </div>
            <div className="pt-6 pb-2 px-2 text-center">
              <p className="text-xs font-bold text-gray-800 truncate flex items-center justify-center gap-0.5">
                {c.username}
                {c.is_verified && <BadgeCheck size={10} className="text-blue-500" />}
                {c.is_vip && <Crown size={10} className="text-yellow-500" />}
              </p>
              <p className="text-[9px] text-gray-400">{c.followers || 0} followers</p>
              <div className="mt-1.5">
                <FollowButton userId={c.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FriendSuggestions({ friends }) {
  const navigate = useNavigate();
  if (!friends || friends.length === 0) return null;

  return (
    <div className="pt-4">
      <div className="flex items-center justify-between px-3 mb-2">
        <h2 className="text-sm font-bold text-gray-800">👥 Friend Suggestions</h2>
        <button className="text-[10px] font-semibold text-purple-500">See All</button>
      </div>
      <div className="flex gap-2.5 px-3 overflow-x-auto scrollbar-hide pb-1">
        {friends.slice(0, 8).map((f) => (
          <div
            key={f.id}
            onClick={() => navigate(`/profile/${f.id}`)}
            className="flex-shrink-0 w-28 rounded-2xl bg-white border border-gray-50 shadow-sm active:scale-95 transition p-2 text-center cursor-pointer"
          >
            <img
              src={f.avatar_url || `https://ui-avatars.com/api/?name=${f.username}`}
              alt=""
              className="w-12 h-12 rounded-full object-cover mx-auto bg-gray-100 mb-1.5"
            />
            <p className="text-xs font-bold text-gray-800 truncate">{f.username}</p>
            <p className="text-[9px] text-gray-400 mb-1.5">{f.country || "Unknown"}</p>
            <FollowButton userId={f.id} />
          </div>
        ))}
      </div>
    </div>
  );
}