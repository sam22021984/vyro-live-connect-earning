import React, { useState } from "react";
import { hostTabs } from "@/components/levels/host/hostData";
import HostProfileHeader from "@/components/levels/host/HostProfileHeader";
import HostCurrentLevelCard from "@/components/levels/host/HostCurrentLevelCard";
import PerformanceTab, { AudienceTab } from "@/components/levels/host/PerformanceTab";
import RewardsTab from "@/components/levels/host/RewardsTab";
import AchievementsTab from "@/components/levels/host/AchievementsTab";
import CollectionsTab from "@/components/levels/host/CollectionsTab";
import StatisticsTab from "@/components/levels/host/StatisticsTab";
import EventsTab from "@/components/levels/host/EventsTab";
import HostBottomBar from "@/components/levels/host/HostBottomBar";

export default function HostLevelDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-4 pb-2">
      {/* SECTION 01 — Host Profile Header */}
      <HostProfileHeader />

      {/* SECTION 02 — Current Host Level Card */}
      <HostCurrentLevelCard />

      {/* Top Navigation Tabs */}
      <div className="sticky top-0 z-10 -mx-4 px-4 py-2" style={{ background: "linear-gradient(to bottom, #F8F9FC, rgba(248,249,252,0.95))", backdropFilter: "blur(12px)" }}>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-1.5 min-w-max">
            {hostTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.key ? "text-white shadow-md" : "bg-white text-gray-500 border border-gray-100"
                }`}
                style={activeTab === tab.key ? { background: "linear-gradient(135deg, #EF4444, #0D1B3E)", boxShadow: "0 4px 12px rgba(239,68,68,0.3)" } : {}}
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
        {activeTab === "overview" && <PerformanceTab />}
        {activeTab === "performance" && <PerformanceTab />}
        {activeTab === "audience" && <AudienceTab />}
        {activeTab === "rewards" && <RewardsTab />}
        {activeTab === "achievements" && <AchievementsTab />}
        {activeTab === "collections" && <CollectionsTab />}
        {activeTab === "statistics" && <StatisticsTab />}
        {activeTab === "events" && <EventsTab />}
      </div>

      {/* Bottom Action Bar */}
      <HostBottomBar />
    </div>
  );
}