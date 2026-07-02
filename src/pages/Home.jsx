import React, { useState, useEffect } from "react";
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

export default function Home() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        const profiles = await base44.entities.UserProfile.filter({ created_by_id: me.id });
        if (profiles.length > 0) {
          setProfile(profiles[0]);
        } else {
          // Create default profile
          const newProfile = await base44.entities.UserProfile.create({
            username: me.full_name || "VYRO User",
            title: "APPLICATION OWNER",
            country: "Pakistan",
            language: "Urdu • English",
            birthday: "April 15",
            zodiac: "Aries",
            gender: "Male",
            bio: "Live music, PK battles, and real connections. Join my room for an unforgettable experience! 🎵✨",
            signature: "Music is the language of the soul 🎵",
            user_id: "VY-" + String(Math.floor(Math.random() * 999999)).padStart(6, "0"),
            is_app_owner: true,
            is_verified: true,
            is_official: true,
            is_vip: true,
            is_agency: true,
            role: "owner",
            vip_tier: "Elite",
            vip_expiry: "Apr 2025",
            user_level: 1,
            host_level: 1,
            gifting_level: 1,
            streaming_level: 1,
            trust_score: 94,
            reputation_rating: 4.8,
            profile_completion: 88,
            verification_status: "verified",
            safety_status: "high",
            activity_score: 76,
          });
          setProfile(newProfile);
        }
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
        <ProfileHeader profile={profile} />
        
        {/* Quick Stats Row */}
        <div className="px-4 -mt-1">
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

        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "profile" && (
          <div className="animate-fadeIn">
            <VipCard profile={profile} />
            <LevelCards profile={profile} />
            <TopFansSection />
            <SpecialBadges />
            <TrustReputation profile={profile} />
            <AchievementsGrid />
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

        {activeTab === "settings" && (
          <div className="animate-fadeIn px-4 mb-4">
            <div className="bg-white rounded-[20px] p-8 shadow-sm border border-gray-50 flex flex-col items-center">
              <span className="text-4xl mb-3">⚙️</span>
              <h3 className="text-sm font-bold text-gray-700 mb-1">Settings</h3>
              <p className="text-xs text-gray-400 text-center">Account settings and preferences</p>
            </div>
          </div>
        )}

        {/* Bottom safe area */}
        <div className="h-6" />
      </div>
    </div>
  );
}