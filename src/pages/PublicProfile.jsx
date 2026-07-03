import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import PublicProfileHeader from "@/components/public-profile/PublicProfileHeader";
import StatsGrid from "@/components/profile/StatsGrid";
import AboutMe from "@/components/profile/AboutMe";
import LevelCards from "@/components/profile/LevelCards";
import VipCard from "@/components/profile/VipCard";
import SpecialBadges from "@/components/profile/SpecialBadges";
import AchievementsGrid from "@/components/profile/AchievementsGrid";
import TopFansSection from "@/components/profile/TopFansSection";
import TrustReputation from "@/components/profile/TrustReputation";

export default function PublicProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [fans, setFans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    loadProfile();
  }, [id]);

  const loadProfile = async () => {
    try {
      const profiles = await base44.entities.UserProfile.filter({ user_id: id });
      if (profiles.length > 0) {
        setProfile(profiles[0]);
        const fanRecords = await base44.entities.TopFan.filter({ profile_id: id });
        setFans(fanRecords);
      }
    } catch (e) {
      // profile not found
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <span className="text-5xl mb-3">🔍</span>
        <h2 className="text-base font-bold text-gray-700 mb-1">Profile Not Found</h2>
        <p className="text-xs text-gray-400 text-center">This user doesn't have a public profile yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto pb-8">
        <PublicProfileHeader profile={profile} />
        <StatsGrid profile={profile} />
        <AboutMe profile={profile} />
        <LevelCards profile={profile} />
        {profile?.is_vip && <VipCard profile={profile} />}
        <SpecialBadges />
        <AchievementsGrid />
        <TopFansSection fans={fans} />
        <TrustReputation profile={profile} />
      </div>
    </div>
  );
}