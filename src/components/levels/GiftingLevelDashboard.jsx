import React, { useState } from "react";
import { giftingTabs } from "@/components/levels/gifting/giftingData";
import GifterProfileHeader from "@/components/levels/gifting/GifterProfileHeader";
import GiftingCurrentLevelCard from "@/components/levels/gifting/GiftingCurrentLevelCard";
import OverviewTab, { AnalyticsTab } from "@/components/levels/gifting/OverviewTab";
import RewardsTab from "@/components/levels/gifting/RewardsTab";
import AchievementsTab from "@/components/levels/gifting/AchievementsTab";
import CollectionsTab from "@/components/levels/gifting/CollectionsTab";
import PrivilegesTab from "@/components/levels/gifting/PrivilegesTab";
import LeaderboardTab from "@/components/levels/gifting/LeaderboardTab";
import GiftingBottomBar from "@/components/levels/gifting/GiftingBottomBar";

export default function GiftingLevelDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-4 pb-2">
      {/* SECTION 01 — Gifter Profile Header */}
      <GifterProfileHeader />

      {/* SECTION 02 — Current Gifting Level Card */}
      <GiftingCurrentLevelCard />

      {/* Top Navigation Tabs */}
      <div className="sticky top-0 z-10 -mx-4 px-4 py-2" style={{ background: "linear-gradient(to bottom, #F8F9FC, rgba(248,249,252,0.95))", backdropFilter: "blur(12px)" }}>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-1.5 min-w-max">
            {giftingTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.key ? "text-white shadow-md" : "bg-white text-gray-500 border border-gray-100"
                }`}
                style={activeTab === tab.key ? { background: "linear-gradient(135deg, #F59E0B, #0D1B3E)", boxShadow: "0 4px 12px rgba(245,158,11,0.3)" } : {}}
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
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
        {activeTab === "rewards" && <RewardsTab />}
        {activeTab === "achievements" && <AchievementsTab />}
        {activeTab === "collections" && <CollectionsTab />}
        {activeTab === "privileges" && <PrivilegesTab />}
        {activeTab === "leaderboard" && <LeaderboardTab />}
      </div>

      {/* Bottom Action Bar */}
      <GiftingBottomBar />
    </div>
  );
}