import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { userLevelTiers, collectionConfig } from "@/components/levels/userLevelTiers";
import { dashboardTabs } from "@/components/levels/dashboardData";
import ProfileHeader from "@/components/levels/dashboard/ProfileHeader";
import CurrentLevelCard from "@/components/levels/dashboard/CurrentLevelCard";
import QuickStats from "@/components/levels/dashboard/QuickStats";
import LevelJourney from "@/components/levels/dashboard/LevelJourney";
import RewardsTab from "@/components/levels/dashboard/RewardsTab";
import AchievementsTab from "@/components/levels/dashboard/AchievementsTab";
import CollectionsTab from "@/components/levels/dashboard/CollectionsTab";
import PrivilegesTab from "@/components/levels/dashboard/PrivilegesTab";
import StatisticsTab from "@/components/levels/dashboard/StatisticsTab";
import BottomActionBar from "@/components/levels/dashboard/BottomActionBar";

export default function UserLevelDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await base44.auth.me();
        let profiles = await base44.entities.UserProfile.filter({ user_id: me.id });
        if (profiles.length === 0) {
          profiles = await base44.entities.UserProfile.filter({ created_by_id: me.id });
        }
        if (profiles.length > 0) setProfile(profiles[0]);
      } catch (e) { /* ignore */ }
    };
    load();
  }, []);

  const u = {
    level: profile?.user_level || 1,
    username: profile?.username || "User",
    tierName: profile?.vip_tier || "User",
    badge: "—",
    progress: profile?.user_xp_max > 0 ? Math.round(((profile?.user_xp || 0) / profile?.user_xp_max) * 100) : 0,
    xp: profile?.user_xp || 0,
    xpMax: profile?.user_xp_max || 10000,
    coins: profile?.coins || 0,
    rank: "—",
    avatar: profile?.avatar_url || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop",
  };
  const formatNum = (n) => n.toLocaleString();

  const currentTier = userLevelTiers.find((t) => {
    if (t.tier === 31) return false;
    const parts = t.levels.replace("LV", "").split("–");
    const min = parseInt(parts[0], 10);
    const max = parseInt(parts[1], 10);
    return u.level >= min && u.level <= max;
  }) || userLevelTiers[3];
  const nextTier = userLevelTiers[currentTier.tier] || userLevelTiers[userLevelTiers.length - 1];
  const config = collectionConfig[currentTier.collection];

  return (
    <div className="space-y-4 pb-2">
      {/* SECTION 01 — Profile Header (always visible) */}
      <ProfileHeader user={u} tier={currentTier} config={config} />

      {/* SECTION 02 — Current Level Card (always visible) */}
      <CurrentLevelCard user={u} tier={currentTier} nextTier={nextTier} config={config} formatNum={formatNum} />

      {/* SECTION 03 — Quick Stats (always visible) */}
      <QuickStats />

      {/* Top Navigation Tabs */}
      <div className="sticky top-0 z-10 -mx-4 px-4 py-2" style={{ background: "linear-gradient(to bottom, #F8F9FC, rgba(248,249,252,0.95))", backdropFilter: "blur(12px)" }}>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-1.5 min-w-max">
            {dashboardTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.key
                    ? "text-white shadow-md"
                    : "bg-white text-gray-500 border border-gray-100"
                }`}
                style={activeTab === tab.key ? { background: "linear-gradient(135deg, #1F6BFF, #0D1B3E)", boxShadow: "0 4px 12px rgba(31,107,255,0.3)" } : {}}
              >
                <span className="text-sm">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="animate-fadeIn">
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* Overview shows journey preview + current benefits preview + quick stats summary */}
            <LevelJourney currentLevel={u.level} />
          </div>
        )}
        {activeTab === "journey" && <LevelJourney currentLevel={u.level} />}
        {activeTab === "rewards" && <RewardsTab />}
        {activeTab === "achievements" && <AchievementsTab />}
        {activeTab === "collections" && <CollectionsTab />}
        {activeTab === "privileges" && <PrivilegesTab />}
        {activeTab === "statistics" && <StatisticsTab />}
      </div>

      {/* Bottom Action Bar */}
      <BottomActionBar />
    </div>
  );
}