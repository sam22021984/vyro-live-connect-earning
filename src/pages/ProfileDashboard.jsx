import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import MyProfileHeader from "@/components/my-profile/MyProfileHeader";
import MyStatsDashboard from "@/components/my-profile/MyStatsDashboard";
import QuickActions from "@/components/my-profile/QuickActions";
import WalletSummary from "@/components/my-profile/WalletSummary";
import CreatorControl from "@/components/my-profile/CreatorControl";
import LiveCenter from "@/components/my-profile/LiveCenter";
import AudioRoomCenter from "@/components/my-profile/AudioRoomCenter";
import PartyCenter from "@/components/my-profile/PartyCenter";
import TasksCenter from "@/components/my-profile/TasksCenter";
import VipCenter from "@/components/my-profile/VipCenter";
import FamilyCenter from "@/components/my-profile/FamilyCenter";
import AgencyCenter from "@/components/my-profile/AgencyCenter";
import AnalyticsDashboard from "@/components/my-profile/AnalyticsDashboard";
import MyContent from "@/components/my-profile/MyContent";
import MyAchievements from "@/components/my-profile/MyAchievements";
import MyDecorations from "@/components/my-profile/MyDecorations";
import MyMoreMenu from "@/components/my-profile/MyMoreMenu";
import MoreServices from "@/components/profile/MoreServices";

export default function ProfileDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const { user: me } = useAuth();

  useEffect(() => {
    if (!me?.id) return;
    const load = async () => {
      try {
        const res = await base44.functions.invoke("userOnboarding", {
          action: "initProfile",
          role: "user",
          username: me.full_name || me.email?.split("@")[0] || "VYRO User",
        });
        setProfile(res.data?.profile || res.data);

        const achs = await base44.entities.Achievement.filter({}).catch(() => []);
        setAchievements(achs);
      } catch (e) {
        // fallback — try direct query
        try {
          const profiles = await base44.entities.UserProfile.filter({ user_id: me.id });
          if (profiles.length > 0) setProfile(profiles[0]);
        } catch {}
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [me?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex flex-col items-center justify-center px-6">
        <span className="text-5xl mb-3">👤</span>
        <h2 className="text-base font-bold text-gray-700 mb-1">Profile Not Found</h2>
        <p className="text-xs text-gray-400 text-center mb-4">Unable to load your profile. Please try again.</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-500 active:scale-95">Retry</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] pb-20">
      <div className="max-w-md mx-auto">
        <MyProfileHeader profile={profile} onMoreMenu={() => setShowMoreMenu(true)} />

        <MyStatsDashboard profile={profile} />

        <QuickActions profile={profile} />

        <WalletSummary profile={profile} />

        <CreatorControl profile={profile} />

        <LiveCenter profile={profile} />

        <AudioRoomCenter profile={profile} />

        <PartyCenter profile={profile} />

        <TasksCenter profile={profile} />

        <VipCenter profile={profile} />

        <FamilyCenter profile={profile} />

        <AgencyCenter profile={profile} />

        <AnalyticsDashboard profile={profile} />

        <MyContent profile={profile} />

        <MyAchievements achievements={achievements} />

        <MyDecorations profile={profile} />

        <MoreServices />

        <div className="h-4" />

        {showMoreMenu && <MyMoreMenu onClose={() => setShowMoreMenu(false)} />}
      </div>
    </div>
  );
}