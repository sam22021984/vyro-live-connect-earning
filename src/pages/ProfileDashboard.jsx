import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useProfileQuery } from "@/hooks/useProfileQuery";
import MyProfileHeader from "@/components/my-profile/MyProfileHeader";
import MyStatsDashboard from "@/components/my-profile/MyStatsDashboard";
import QuickActions from "@/components/my-profile/QuickActions";
import PartyCenter from "@/components/my-profile/PartyCenter";
import VipCenter from "@/components/my-profile/VipCenter";
import AnalyticsDashboard from "@/components/my-profile/AnalyticsDashboard";
import MyAchievements from "@/components/my-profile/MyAchievements";
import MyMoreMenu from "@/components/my-profile/MyMoreMenu";
import MoreServices from "@/components/profile/MoreServices";

export default function ProfileDashboard() {
  const { data: profile, isLoading: loading } = useProfileQuery();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    base44.entities.Achievement.filter({})
      .then(setAchievements)
      .catch(() => setAchievements([]));
  }, []);

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

        <PartyCenter profile={profile} />

        <VipCenter profile={profile} />

        <AnalyticsDashboard profile={profile} />

        <MyAchievements achievements={achievements} />

        <MoreServices />

        <div className="h-4" />

        {showMoreMenu && <MyMoreMenu onClose={() => setShowMoreMenu(false)} />}
      </div>
    </div>
  );
}