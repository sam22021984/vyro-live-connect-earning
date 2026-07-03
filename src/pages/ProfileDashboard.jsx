import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import StatsGrid from "@/components/profile/StatsGrid";
import LevelCards from "@/components/profile/LevelCards";
import VipCard from "@/components/profile/VipCard";
import TopFansSection from "@/components/profile/TopFansSection";
import SpecialBadges from "@/components/profile/SpecialBadges";
import TrustReputation from "@/components/profile/TrustReputation";
import AchievementsGrid from "@/components/profile/AchievementsGrid";
import SocialSection from "@/components/profile/SocialSection";
import AboutMe from "@/components/profile/AboutMe";
import MoreServices from "@/components/profile/MoreServices";

export default function ProfileDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [fans, setFans] = useState([]);
  const [badges, setBadges] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        const res = await base44.functions.invoke("userOnboarding", {
          action: "initProfile",
          role: "user",
          username: me.full_name || me.email?.split("@")[0] || "VYRO User",
        });
        setProfile(res.data.profile);

        const [fanRecords, badgeRecords, achRecords] = await Promise.all([
          base44.entities.TopFan.filter({ profile_id: me.id }, "-score", 5).catch(() => []),
          base44.entities.Badge.list().catch(() => []),
          base44.entities.Achievement.filter({ created_by_id: me.id }).catch(() => []),
        ]);
        setFans(fanRecords);
        setBadges(badgeRecords);
        setAchievements(achRecords);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
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

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/")} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="text-base font-bold text-gray-800">My Profile</h1>
        </div>

        <ProfileHeader profile={profile} />

        <div className="px-4 -mt-1 relative z-10">
          <div className="bg-white rounded-[18px] grid grid-cols-4 divide-x divide-gray-100 shadow-sm border border-gray-50">
            {[
              { label: "Followers", value: profile?.followers || 0 },
              { label: "Following", value: profile?.following || 0 },
              { label: "Friends", value: profile?.friends || 0 },
              { label: "Visitors", value: profile?.visitors || 0 },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center py-3">
                <span className="text-base font-bold text-gray-800">{s.value}</span>
                <span className="text-[10px] text-gray-400 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {activeTab === "profile" && (
          <div className="animate-fadeIn">
            {profile?.is_vip && <VipCard profile={profile} />}
            <LevelCards profile={profile} />
            <TopFansSection fans={fans} />
            <SpecialBadges badges={badges} />
            <TrustReputation profile={profile} />
            <AchievementsGrid achievements={achievements} />
            <SocialSection profile={profile} />
            <AboutMe profile={profile} />
            <MoreServices />
          </div>
        )}

        {activeTab === "stats" && (
          <div className="animate-fadeIn">
            <StatsGrid profile={profile} />
            <LevelCards profile={profile} />
            <TrustReputation profile={profile} />
          </div>
        )}

        {activeTab === "history" && (
          <div className="animate-fadeIn px-4 mb-4">
            <div className="bg-white rounded-[20px] p-8 shadow-sm border border-gray-50 flex flex-col items-center">
              <span className="text-4xl mb-3">📜</span>
              <h3 className="text-sm font-bold text-gray-700 mb-1">Activity History</h3>
              <p className="text-xs text-gray-400 text-center">Your recent activities will appear here</p>
            </div>
          </div>
        )}

        <div className="h-6" />
      </div>
    </div>
  );
}