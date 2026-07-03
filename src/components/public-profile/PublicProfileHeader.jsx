import React from "react";
import { ArrowLeft, Shield, CheckCircle, Star, UserPlus, MessageCircle, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PublicProfileHeader({ profile }) {
  const navigate = useNavigate();
  const [following, setFollowing] = React.useState(false);

  const roleBadges = [
    profile?.is_app_owner && { label: "App Owner", color: "bg-purple-600" },
    profile?.is_official && { label: "Official Host", color: "bg-blue-500" },
    profile?.is_vip && { label: "VIP", color: "bg-yellow-500" },
    profile?.is_verified && { label: "Verified", color: "bg-cyan-500" },
    profile?.is_host && { label: "Host", color: "bg-red-500" },
  ].filter(Boolean);

  return (
    <div className="relative overflow-hidden rounded-b-[30px]">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-purple-400 to-blue-400 opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent" />
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />

      <div className="relative z-10 px-5 pt-12 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center active:scale-90 transition mb-4"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>

        <div className="flex flex-col items-center mb-4">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-300 to-blue-300 p-[3px]">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full object-cover rounded-full" />
                ) : (
                  profile?.username?.[0]?.toUpperCase() || "?"
                )}
              </div>
            </div>
            {profile?.is_online && (
              <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-400 border-[3px] border-white" />
            )}
          </div>

          <div className="flex items-center gap-1.5 mb-1">
            {profile?.is_vip && <Star size={14} className="text-yellow-300 fill-yellow-300" />}
            <h1 className="text-white font-bold text-lg">{profile?.username || "Unknown User"}</h1>
            {profile?.is_vip && <Star size={14} className="text-yellow-300 fill-yellow-300" />}
          </div>

          <div className="flex items-center gap-1.5 mb-3">
            <Shield size={12} className="text-yellow-300" />
            <span className="text-white/90 text-xs font-medium tracking-wide uppercase">
              {profile?.title || profile?.role || "USER"}
            </span>
          </div>

          {roleBadges.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-2">
              {roleBadges.map((b, i) => (
                <span key={i} className={`${b.color} text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1`}>
                  <CheckCircle size={10} />
                  {b.label}
                </span>
              ))}
            </div>
          )}

          <div className="mt-1 flex items-center gap-2">
            <span className="text-white/70 text-[11px]">{profile?.country_flag || "🌍"} {profile?.country || "Unknown"}</span>
            <span className="text-white/50">•</span>
            <span className="text-white/70 text-[11px]">ID: {profile?.user_id?.slice(0, 8) || "N/A"}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => setFollowing(!following)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 ${
              following ? "bg-white/20 text-white" : "bg-white text-purple-600"
            }`}
          >
            <UserPlus size={14} />
            {following ? "Following" : "Follow"}
          </button>
          <button
            onClick={() => navigate(`/chat/${profile?.user_id}`)}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-white/20 backdrop-blur-sm flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <MessageCircle size={14} />
            Message
          </button>
          <button
            onClick={() => navigate(`/live-room/${profile?.user_id}`)}
            className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <Gift size={14} />
            Gift
          </button>
        </div>
      </div>
    </div>
  );
}