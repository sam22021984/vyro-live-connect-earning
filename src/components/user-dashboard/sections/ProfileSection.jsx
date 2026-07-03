import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GlassCard, SectionHeader, InfoRow, ActionButton, GOLD, BLUE, TEXT_MUTED } from "../Shared";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export default function ProfileSection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }
    loadProfile();
  }, [user?.id]);

  const loadProfile = async () => {
    try {
      let profiles = await base44.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length === 0) profiles = await base44.entities.UserProfile.filter({ created_by_id: user.id });
      if (profiles.length > 0) setProfile(profiles[0]);
    } catch (e) {
      // profile may not exist yet
    }
    setLoading(false);
  };

  const handleEditProfile = () => navigate("/edit-profile");
  const handleUpdateBio = () => navigate("/edit-profile");
  const handlePrivacy = () => navigate("/settings");
  const handleAccount = () => navigate("/settings");

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    setUploadingAvatar(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await base44.entities.UserProfile.update(profile.id, { avatar_url: file_url });
      setProfile({ ...profile, avatar_url: file_url });
      toast({ title: "Avatar updated successfully!" });
    } catch (err) {
      toast({ title: "Failed to upload avatar", description: err.message, variant: "destructive" });
    }
    setUploadingAvatar(false);
    if (avatarInputRef.current) avatarInputRef.current.value = "";
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    setUploadingCover(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await base44.entities.UserProfile.update(profile.id, { cover_url: file_url });
      setProfile({ ...profile, cover_url: file_url });
      toast({ title: "Cover updated successfully!" });
    } catch (err) {
      toast({ title: "Failed to upload cover", description: err.message, variant: "destructive" });
    }
    setUploadingCover(false);
    if (coverInputRef.current) coverInputRef.current.value = "";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  const username = profile?.username || user?.full_name || user?.email || "User";
  const avatarUrl = profile?.avatar_url || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150";
  const coverUrl = profile?.cover_url || "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400";
  const bio = profile?.bio || "No bio yet. Edit your profile to add one.";
  const userId = profile?.global_id || profile?.user_id || user?.id?.substring(0, 12) || "N/A";
  const gender = profile?.gender || "Not set";
  const country = profile?.country || "Not set";
  const language = profile?.language || "English";
  const vipLevel = profile?.is_vip ? `VIP ${profile?.vip_tier || "1"}` : "None";
  const level = profile?.user_level || 1;
  const isVerified = profile?.is_verified;

  return (
    <div className="space-y-4">
      <GlassCard className="!p-0 overflow-hidden">
        {/* Cover */}
        <div className="h-28 relative" style={{ background: `linear-gradient(135deg, ${BLUE}, #1A2952)` }}>
          <img src={coverUrl} alt="cover" className="w-full h-full object-cover" />
          <button
            onClick={() => coverInputRef.current?.click()}
            disabled={uploadingCover || !profile}
            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white transition active:scale-90 disabled:opacity-50"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            {uploadingCover ? "⏳" : "🎨"}
          </button>
          <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
        </div>
        {/* Avatar */}
        <div className="px-4 pb-4 -mt-10 relative">
          <div className="relative inline-block mb-3">
            <img
              src={avatarUrl}
              alt={username}
              className="w-20 h-20 rounded-2xl object-cover border-2"
              style={{ borderColor: GOLD }}
            />
            <button
              onClick={() => avatarInputRef.current?.click()}
              disabled={uploadingAvatar || !profile}
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white transition active:scale-90 disabled:opacity-50"
              style={{ background: GOLD }}
            >
              {uploadingAvatar ? "⏳" : "📷"}
            </button>
            <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-base font-bold text-white">{username}</h2>
            {isVerified && <span className="text-xs">✅</span>}
          </div>
          <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>{bio}</p>
          <div className="flex flex-wrap gap-1.5">
            {profile?.is_vip && (
              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${GOLD}20`, color: GOLD }}>⭐ VIP {profile?.vip_tier || "1"}</span>
            )}
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${BLUE}20`, color: BLUE }}>Lv.{level}</span>
            {isVerified && <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: "#10B98120", color: "#10B981" }}>✅ Verified</span>}
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Profile Information" icon="📋" />
        <InfoRow label="User ID" value={userId} icon="🆔" />
        <InfoRow label="Username" value={username} icon="👤" />
        <InfoRow label="Gender" value={gender} icon="⚧" />
        <InfoRow label="Country" value={country} icon="🌍" />
        <InfoRow label="Language" value={language} icon="🌐" />
        <InfoRow label="VIP Badge" value={vipLevel} icon="⭐" color={GOLD} />
        <InfoRow label="Level Badge" value={`Level ${level}`} icon="🏆" color={BLUE} />
        <div className="py-2.5">
          <span className="text-[11px]" style={{ color: TEXT_MUTED }}>Bio</span>
          <p className="text-[11px] text-white mt-1">{bio}</p>
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-3 gap-2">
          <ActionButton label="Edit Profile" icon="✏️" color={BLUE} onClick={handleEditProfile} />
          <ActionButton label="Change Avatar" icon="🖼️" color={GOLD} onClick={() => avatarInputRef.current?.click()} />
          <ActionButton label="Change Cover" icon="🎨" color="#EC4899" onClick={() => coverInputRef.current?.click()} />
          <ActionButton label="Update Bio" icon="📝" color="#10B981" onClick={handleUpdateBio} />
          <ActionButton label="Privacy" icon="🔒" color="#EF4444" onClick={handlePrivacy} />
          <ActionButton label="Account" icon="⚙️" color="#64748B" onClick={handleAccount} />
        </div>
      </div>
    </div>
  );
}