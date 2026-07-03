import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Shield, MessageSquare, Phone, Gift, Users, Search, Trophy, Activity, Lock, CheckCircle2, Clock, UserX } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

export default function PrivacySettingsTab() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await base44.functions.invoke("privacySettings", { action: "get" });
      setSettings(res.data.settings);
      setProfile(res.data.profile);
    } catch (err) {
      toast({ title: "Failed to load settings", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleToggle = async (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    try {
      const res = await base44.functions.invoke("privacySettings", { action: "update", [key]: value });
      setSettings(res.data.settings);
    } catch (err) {
      setSettings((prev) => ({ ...prev, [key]: !value }));
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  const handleSelectChange = async (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    try {
      const res = await base44.functions.invoke("privacySettings", { action: "update", [key]: value });
      setSettings(res.data.settings);
    } catch (err) {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  const handleVerifyRequest = async () => {
    try {
      const res = await base44.functions.invoke("privacySettings", { action: "request_verification" });
      setProfile(res.data.profile);
      toast({ title: "✅ Verification request submitted", description: "Admin will review your request." });
    } catch (err) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  const ToggleRow = ({ icon: Icon, label, desc, fieldKey, value, color = "#8B5CF6" }) => (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {desc && <p className="text-[11px] text-gray-400 leading-tight">{desc}</p>}
      </div>
      <button
        onClick={() => handleToggle(fieldKey, !value)}
        className="relative w-11 h-6 rounded-full transition flex-shrink-0"
        style={{ background: value ? "#22C55E" : "#E5E7EB" }}
      >
        <div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
          style={{ transform: value ? "translateX(22px)" : "translateX(2px)" }}
        />
      </button>
    </div>
  );

  const SelectRow = ({ icon: Icon, label, fieldKey, value, options, color = "#3B82F6" }) => (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
      </div>
      <select
        value={value}
        onChange={(e) => handleSelectChange(fieldKey, e.target.value)}
        className="text-xs font-medium text-gray-600 bg-gray-50 rounded-lg px-2.5 py-1.5 outline-none border border-gray-100"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );

  const visibilityOptions = [
    { value: "everyone", label: "Everyone" },
    { value: "friends_only", label: "Friends Only" },
    { value: "no_one", label: "No One" },
  ];

  const verificationStatus = profile?.verification_status || "unverified";

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="text-base font-bold text-gray-800">Privacy Settings</h1>
        </div>

        <div className="p-4 space-y-4">
          {/* Verification Status Card */}
          <div className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: verificationStatus === "verified" ? "#22C55E15" : verificationStatus === "pending" ? "#F59E0B15" : "#EF444415" }}>
                {verificationStatus === "verified" ? (
                  <CheckCircle2 size={20} className="text-green-500" />
                ) : verificationStatus === "pending" ? (
                  <Clock size={20} className="text-amber-500" />
                ) : (
                  <Shield size={20} className="text-red-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800">Profile Verification</p>
                <p className="text-[11px] text-gray-400">
                  {verificationStatus === "verified" ? "Your profile is verified ✓" : verificationStatus === "pending" ? "Verification under review..." : "Get verified to build trust"}
                </p>
              </div>
              {verificationStatus !== "verified" && verificationStatus !== "pending" && (
                <button
                  onClick={handleVerifyRequest}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 active:scale-95 transition"
                >
                  Verify
                </button>
              )}
            </div>
          </div>

          {/* Profile Visibility Section */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide px-2 mb-2">👁️ Profile Visibility</p>
            <div className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
              <SelectRow icon={Eye} label="Who can view profile" fieldKey="who_can_view_profile" value={settings?.who_can_view_profile} options={visibilityOptions} color="#8B5CF6" />
              <div className="border-t border-gray-50" />
              <SelectRow icon={Users} label="Profile visibility" fieldKey="profile_visibility"
                value={settings?.profile_visibility}
                options={[
                  { value: "everyone", label: "Everyone" },
                  { value: "friends_only", label: "Friends Only" },
                  { value: "private", label: "Private" },
                ]}
                color="#8B5CF6" />
            </div>
          </div>

          {/* Show / Hide Profile Info Section */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide px-2 mb-2">🔒 Show / Hide Info</p>
            <div className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
              <ToggleRow icon={Eye} label="Show Coins" desc="Display coin balance" fieldKey="show_coins" value={settings?.show_coins} color="#F59E0B" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Trophy} label="Show Level" desc="Display user level" fieldKey="show_level" value={settings?.show_level} color="#3B82F6" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Users} label="Show Followers" desc="Display follower count" fieldKey="show_followers" value={settings?.show_followers} color="#8B5CF6" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Users} label="Show Following" desc="Display following count" fieldKey="show_following" value={settings?.show_following} color="#8B5CF6" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Users} label="Show Friends" desc="Display friends count" fieldKey="show_friends" value={settings?.show_friends} color="#8B5CF6" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Eye} label="Show Visitors" desc="Display visitor count" fieldKey="show_visitors" value={settings?.show_visitors} color="#06B6D4" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Gift} label="Show Gifts Received" desc="Display gifts received" fieldKey="show_gifts_received" value={settings?.show_gifts_received} color="#EC4899" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Gift} label="Show Gifts Sent" desc="Display gifts sent" fieldKey="show_gifts_sent" value={settings?.show_gifts_sent} color="#EC4899" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Eye} label="Show Bio" desc="Display bio text" fieldKey="show_bio" value={settings?.show_bio} color="#10B981" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Eye} label="Show Birthday" desc="Display birthday" fieldKey="show_birthday" value={settings?.show_birthday} color="#10B981" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Eye} label="Show Country" desc="Display country" fieldKey="show_country" value={settings?.show_country} color="#10B981" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Activity} label="Show Online Status" desc="Show when you're online" fieldKey="show_online_status" value={settings?.show_online_status} color="#22C55E" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Activity} label="Show Activity Score" desc="Display activity score" fieldKey="show_activity_score" value={settings?.show_activity_score} color="#F59E0B" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Shield} label="Show Trust Score" desc="Display trust score" fieldKey="show_trust_score" value={settings?.show_trust_score} color="#3B82F6" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Shield} label="Show Reputation" desc="Display reputation rating" fieldKey="show_reputation" value={settings?.show_reputation} color="#3B82F6" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Trophy} label="Show XP" desc="Display XP points" fieldKey="show_xp" value={settings?.show_xp} color="#8B5CF6" />
            </div>
          </div>

          {/* Interaction Control Section */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide px-2 mb-2">💬 Interaction Control</p>
            <div className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
              <SelectRow icon={MessageSquare} label="Who can message me" fieldKey="who_can_message" value={settings?.who_can_message} options={visibilityOptions} color="#06B6D4" />
              <div className="border-t border-gray-50" />
              <SelectRow icon={Phone} label="Who can call me" fieldKey="who_can_call" value={settings?.who_can_call} options={visibilityOptions} color="#06B6D4" />
              <div className="border-t border-gray-50" />
              <SelectRow icon={Gift} label="Who can send gifts" fieldKey="who_can_gift" value={settings?.who_can_gift} options={visibilityOptions} color="#06B6D4" />
            </div>
          </div>

          {/* Discovery Section */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide px-2 mb-2">🔍 Discovery</p>
            <div className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
              <ToggleRow icon={Search} label="Show in Search" desc="Others can find you by ID/name" fieldKey="show_in_search" value={settings?.show_in_search} color="#8B5CF6" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Trophy} label="Show in Rankings" desc="Appear on leaderboards" fieldKey="show_in_rankings" value={settings?.show_in_rankings} color="#8B5CF6" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Users} label="Allow Profile Visits" desc="Others can visit your profile" fieldKey="allow_profile_visits" value={settings?.allow_profile_visits} color="#8B5CF6" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={UserX} label="Allow Strangers" desc="Non-friends can interact" fieldKey="allow_strangers" value={settings?.allow_strangers} color="#EF4444" />
            </div>
          </div>

          {/* Blocked Users Count */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide px-2 mb-2">🚫 Blocked Users</p>
            <div className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#EF444415" }}>
                  <Lock size={18} className="text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">Blocked Users</p>
                  <p className="text-[11px] text-gray-400">{(settings?.blocked_users || []).length} user(s) blocked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}