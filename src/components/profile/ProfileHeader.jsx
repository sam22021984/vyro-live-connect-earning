import React from "react";
import { Search, Menu, Shield, CheckCircle, Star } from "lucide-react";

export default function ProfileHeader({ profile }) {
  const roleBadges = [
    profile?.is_app_owner && { label: "App Owner", color: "bg-purple-600" },
    profile?.is_official && { label: "Official Host", color: "bg-blue-500" },
    profile?.role === "owner" && { label: "Owner", color: "bg-amber-600" },
    profile?.is_agency && { label: "Agency", color: "bg-green-500" },
    profile?.is_vip && { label: "VIP", color: "bg-yellow-500" },
    profile?.is_verified && { label: "Verified", color: "bg-cyan-500" },
  ].filter(Boolean);

  const tagBadges = [
    { label: "Online", color: "bg-green-500" },
    { label: "Verified", color: "bg-blue-500" },
    { label: "ID: VYRO", color: "bg-purple-500" },
  ];

  return (
    <div className="relative overflow-hidden rounded-b-[30px]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-purple-400 to-blue-400 opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent" />
      
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
      <div className="absolute top-20 right-10 w-16 h-16 rounded-full bg-white/5" />

      <div className="relative z-10 px-5 pt-12 pb-6">
        {/* Top bar */}
        <div className="flex items-center justify-end gap-2 mb-6">
          <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/30">
            <Search size={18} className="text-white" />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/30">
            <Menu size={18} className="text-white" />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-300 to-blue-300 p-[3px]">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full object-cover rounded-full" />
                ) : (
                  profile?.username?.[0]?.toUpperCase() || "V"
                )}
              </div>
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-400 border-[3px] border-white" />
          </div>

          {/* Username */}
          <div className="flex items-center gap-1.5 mb-1">
            <Star size={14} className="text-yellow-300 fill-yellow-300" />
            <h1 className="text-white font-bold text-lg">{profile?.username || "vyro intel"}</h1>
            <Star size={14} className="text-yellow-300 fill-yellow-300" />
          </div>

          {/* Title */}
          <div className="flex items-center gap-1.5 mb-3">
            <Shield size={12} className="text-yellow-300" />
            <span className="text-white/90 text-xs font-medium tracking-wide uppercase">
              {profile?.title || "APPLICATION OWNER"}
            </span>
          </div>

          {/* Tag badges row */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-2">
            {tagBadges.map((b, i) => (
              <span key={i} className={`${b.color} text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full`}>
                {b.label}
              </span>
            ))}
          </div>

          {/* Role badges row */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {roleBadges.map((b, i) => (
              <span key={i} className={`${b.color} text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1`}>
                <CheckCircle size={10} />
                {b.label}
              </span>
            ))}
          </div>

          {/* ID */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-white/70 text-[11px]">🇵🇰 {profile?.country || "Pakistan"}</span>
            <span className="text-white/50">•</span>
            <span className="text-white/70 text-[11px]">ID: {profile?.user_id || "VY-000001"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}