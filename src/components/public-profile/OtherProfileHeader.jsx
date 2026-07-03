import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical, BadgeCheck, Crown, Star, Shield, Copy, X, ZoomIn, ZoomOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function OtherProfileHeader({ profile, onMoreMenu, onPhotoTap }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyUsername = () => {
    navigator.clipboard?.writeText(profile?.username || "");
    setCopied(true);
    toast({ title: "Username copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const badges = [
    profile?.is_official && { label: "Official", color: "bg-blue-500", icon: Shield },
    profile?.is_vip && { label: "VIP", color: "bg-yellow-500", icon: Crown },
    profile?.is_verified && { label: "Verified", color: "bg-cyan-500", icon: BadgeCheck },
    profile?.is_host && { label: "Creator", color: "bg-red-500", icon: Star },
  ].filter(Boolean);

  return (
    <div className="relative overflow-hidden rounded-b-[28px]">
      {/* Cover photo */}
      <button onClick={() => onPhotoTap?.("cover")} className="absolute inset-0 w-full h-full">
        {profile?.cover_url ? (
          <img src={profile.cover_url} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 via-purple-400 to-blue-400" />
        )}
      </button>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />

      <div className="relative z-10 px-4 pt-12 pb-5">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center active:scale-90 transition">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <button onClick={onMoreMenu} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center active:scale-90 transition">
            <MoreVertical size={18} className="text-white" />
          </button>
        </div>

        {/* Avatar + info */}
        <div className="flex flex-col items-center">
          {/* Avatar with frame */}
          <button onClick={() => onPhotoTap?.("avatar")} className="relative mb-3 active:scale-95 transition">
            <div className={`w-24 h-24 rounded-full p-[3px] ${profile?.is_vip ? "bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500" : "bg-gradient-to-br from-purple-300 to-blue-300"}`}>
              <div className="w-full h-full rounded-full bg-white overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                    {profile?.username?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
              </div>
            </div>
            {/* Online status */}
            <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-[3px] border-white ${profile?.is_online ? "bg-green-400" : "bg-gray-400"}`} />
          </button>

          {/* Username (long press to copy) */}
          <h1
            onContextMenu={handleCopyUsername}
            onTouchStart={(e) => { const t = setTimeout(handleCopyUsername, 800); e.target.ontouchend = () => clearTimeout(t); }}
            className="text-white font-bold text-lg flex items-center gap-1.5"
          >
            {profile?.username || "Unknown"}
            {copied && <Copy size={12} className="text-green-300" />}
          </h1>

          {/* Display name / title */}
          {profile?.full_name && profile.full_name !== profile.username && (
            <p className="text-white/70 text-xs mb-1">{profile.full_name}</p>
          )}

          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-2">
              {badges.map((b, i) => (
                <span key={i} className={`${b.color} text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5`}>
                  <b.icon size={9} /> {b.label}
                </span>
              ))}
            </div>
          )}

          {/* User ID + Country + Language */}
          <div className="flex items-center gap-2 text-white/70 text-[10px]">
            <button onClick={() => { navigator.clipboard?.writeText(profile?.global_id || ""); toast({ title: "User ID copied" }); }} className="flex items-center gap-0.5">
              ID: {profile?.global_id?.slice(0, 12) || "N/A"} <Copy size={9} />
            </button>
            <span>•</span>
            <span>{profile?.country || "🌍"}</span>
            <span>•</span>
            <span>{profile?.language || "EN"}</span>
          </div>

          {/* Bio */}
          {profile?.bio && (
            <p className="text-white/80 text-xs text-center mt-2 max-w-[280px]">{profile.bio}</p>
          )}

          {/* Interests */}
          {profile?.interests?.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
              {profile.interests.slice(0, 4).map((tag, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-white/10 text-white/80 text-[9px] font-medium">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}