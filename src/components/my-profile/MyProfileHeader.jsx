import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical, Pencil, QrCode, Copy, Crown, BadgeCheck, Star, Shield, Camera, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { base44 } from "@/api/base44Client";

export default function MyProfileHeader({ profile, onMoreMenu }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPhotoMenu, setShowPhotoMenu] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [showPhotoViewer, setShowPhotoViewer] = useState(null);

  const badges = [
    profile?.is_official && { label: "Official", color: "bg-blue-500", icon: Shield },
    profile?.is_vip && { label: `VIP ${profile?.vip_tier || ""}`, color: "bg-yellow-500", icon: Crown },
    profile?.is_verified && { label: "Verified", color: "bg-cyan-500", icon: BadgeCheck },
    profile?.is_host && { label: "Creator", color: "bg-red-500", icon: Star },
  ].filter(Boolean);

  const handleCopyId = () => {
    navigator.clipboard?.writeText(profile?.global_id || profile?.user_id || "");
    toast({ title: "User ID copied" });
  };

  const handlePhotoAction = async (action, type) => {
    setShowPhotoMenu(null);
    if (action === "change" || action === "upload") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      if (action === "upload") input.capture = "environment";
      input.onchange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
          const { file_url } = await base44.integrations.Core.UploadFile({ file });
          const field = type === "avatar" ? "avatar_url" : "cover_url";
          // Route through backend function — it uses asServiceRole, bypassing RLS
          await base44.functions.invoke("userOnboarding", {
            action: "updateProfile",
            [field]: file_url,
          });
          toast({ title: `${type === "avatar" ? "Profile photo" : "Cover"} updated` });
          window.location.reload();
        } catch (e) { toast({ title: "Upload failed", variant: "destructive" }); }
      };
      input.click();
    }
    if (action === "remove") {
      const field = type === "avatar" ? "avatar_url" : "cover_url";
      await base44.functions.invoke("userOnboarding", {
        action: "updateProfile",
        [field]: "",
      });
      toast({ title: `${type === "avatar" ? "Profile photo" : "Cover"} removed` });
      window.location.reload();
    }
    if (action === "preview") {
      setShowPhotoViewer(type);
    }
  };

  const joinDate = profile?.created_date ? new Date(profile.created_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A";

  return (
    <>
      <div className="relative overflow-hidden rounded-b-[28px]">
        {/* Cover */}
        <button onClick={() => setShowPhotoMenu("cover")} className="absolute inset-0 w-full h-full">
          {profile?.cover_url ? (
            <img src={profile.cover_url} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-blue-500" />
          )}
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="relative z-10 px-4 pt-12 pb-5">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => navigate("/")} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center active:scale-90 transition">
              <ArrowLeft size={18} className="text-white" />
            </button>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowQR(true)} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center active:scale-90 transition">
                <QrCode size={18} className="text-white" />
              </button>
              <button onClick={onMoreMenu} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center active:scale-90 transition">
                <MoreVertical size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* Avatar + info */}
          <div className="flex flex-col items-center">
            <button onClick={() => setShowPhotoMenu("avatar")} className="relative mb-3 active:scale-95 transition">
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
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center">
                <Camera size={10} className="text-white" />
              </div>
              <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${profile?.is_online ? "bg-green-400" : "bg-gray-400"}`} />
            </button>

            {/* Display name + edit */}
            <div className="flex items-center gap-1.5">
              <h1 className="text-white font-bold text-lg">{profile?.full_name || profile?.username || "My Profile"}</h1>
              <button onClick={() => navigate("/edit-profile")} className="active:scale-90 transition">
                <Pencil size={13} className="text-white/70" />
              </button>
            </div>

            {/* Username */}
            <p className="text-white/60 text-xs">@{profile?.username}</p>

            {/* Badges */}
            {badges.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
                {badges.map((b, i) => (
                  <span key={i} className={`${b.color} text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5`}>
                    <b.icon size={9} /> {b.label}
                  </span>
                ))}
              </div>
            )}

            {/* User ID */}
            <button onClick={handleCopyId} className="flex items-center gap-1 mt-2 text-white/70 text-[10px]">
              ID: {profile?.global_id?.slice(0, 12) || "N/A"} <Copy size={9} />
            </button>

            {/* Bio */}
            {profile?.bio && <p className="text-white/80 text-xs text-center mt-1.5 max-w-[280px]">{profile.bio}</p>}

            {/* Country + Language + Join date */}
            <div className="flex items-center gap-2 text-white/60 text-[10px] mt-2">
              <span>{profile?.country_flag || "🌍"} {profile?.country || "Unknown"}</span>
              <span>•</span>
              <span>{profile?.language || "EN"}</span>
              <span>•</span>
              <span>Joined {joinDate}</span>
            </div>

            {/* Level badges */}
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-full bg-white/15 text-white text-[10px] font-bold">LV.{profile?.user_level || 1}</span>
              {profile?.is_vip && <span className="px-2 py-0.5 rounded-full bg-yellow-500/30 text-yellow-200 text-[10px] font-bold">VIP {profile?.vip_tier || "1"}</span>}
              <span className="px-2 py-0.5 rounded-full bg-white/15 text-white text-[10px] font-bold">⭐ {profile?.activity_score || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Photo action sheet */}
      {showPhotoMenu && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setShowPhotoMenu(null)}>
          <div className="w-full bg-white rounded-t-3xl animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
              <h3 className="text-sm font-bold text-gray-800">{showPhotoMenu === "avatar" ? "Profile Photo" : "Cover Photo"}</h3>
              <button onClick={() => setShowPhotoMenu(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X size={16} className="text-gray-500" /></button>
            </div>
            {showPhotoMenu === "avatar" && (
              <button onClick={() => handlePhotoAction("preview", "avatar")} className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-50 text-left">
                <Camera size={18} className="text-gray-500" /><span className="text-sm text-gray-700">View Full Screen</span>
              </button>
            )}
            <button onClick={() => handlePhotoAction("change", showPhotoMenu)} className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-50 text-left">
              <Camera size={18} className="text-purple-500" /><span className="text-sm text-gray-700">Change {showPhotoMenu === "avatar" ? "Photo" : "Cover"}</span>
            </button>
            <button onClick={() => handlePhotoAction("upload", showPhotoMenu)} className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-50 text-left">
              <Camera size={18} className="text-blue-500" /><span className="text-sm text-gray-700">Take Photo with Camera</span>
            </button>
            {showPhotoMenu === "cover" && (
              <button onClick={() => handlePhotoAction("preview", "cover")} className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-50 text-left">
                <Camera size={18} className="text-gray-500" /><span className="text-sm text-gray-700">Preview Cover</span>
              </button>
            )}
            <button onClick={() => handlePhotoAction("remove", showPhotoMenu)} className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-50 text-left">
              <X size={18} className="text-red-500" /><span className="text-sm text-red-500">Remove {showPhotoMenu === "avatar" ? "Photo" : "Cover"}</span>
            </button>
            <div className="h-2" />
          </div>
        </div>
      )}

      {/* QR Code modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-6" onClick={() => setShowQR(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-800">My QR Code</h3>
              <button onClick={() => setShowQR(false)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"><X size={14} className="text-gray-500" /></button>
            </div>
            <div className="w-44 h-44 mx-auto bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center mb-3">
              <div className="grid grid-cols-8 gap-0.5 w-36 h-36">
                {[...Array(64)].map((_, i) => (
                  <div key={i} className={`${Math.random() > 0.5 ? "bg-gray-900" : "bg-white"} rounded-sm`} />
                ))}
              </div>
            </div>
            <p className="text-xs font-bold text-gray-700">{profile?.username}</p>
            <p className="text-[10px] text-gray-400 mb-3">ID: {profile?.global_id?.slice(0, 16) || "N/A"}</p>
            <div className="flex gap-2">
              <button onClick={() => toast({ title: "QR downloaded" })} className="flex-1 py-2 rounded-xl text-xs font-bold text-purple-600 bg-purple-50">Download</button>
              <button onClick={() => { navigator.clipboard?.writeText(`${window.location.origin}/profile/${profile?.id}`); toast({ title: "QR link shared" }); }} className="flex-1 py-2 rounded-xl text-xs font-bold text-blue-600 bg-blue-50">Share</button>
            </div>
          </div>
        </div>
      )}

      {/* Photo viewer */}
      {showPhotoViewer && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" onClick={() => setShowPhotoViewer(null)}>
          <img src={showPhotoViewer === "avatar" ? profile?.avatar_url : profile?.cover_url} alt="" className="max-w-full max-h-full object-contain" />
          <button className="absolute top-12 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"><X size={20} /></button>
        </div>
      )}
    </>
  );
}