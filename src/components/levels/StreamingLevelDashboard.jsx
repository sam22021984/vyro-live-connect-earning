import React, { useState } from "react";
import { streamingTabs } from "@/components/levels/streaming/streamingData";
import StreamProfileHeader from "@/components/levels/streaming/StreamProfileHeader";
import StreamCurrentLevelCard from "@/components/levels/streaming/StreamCurrentLevelCard";
import PerformanceTab from "@/components/levels/streaming/PerformanceTab";
import RewardsTab from "@/components/levels/streaming/RewardsTab";
import AchievementsTab from "@/components/levels/streaming/AchievementsTab";
import CollectionsTab from "@/components/levels/streaming/CollectionsTab";
import EventsTab from "@/components/levels/streaming/EventsTab";
import StatisticsTab from "@/components/levels/streaming/StatisticsTab";
import StreamBottomBar from "@/components/levels/streaming/StreamBottomBar";

export default function StreamingLevelDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-4 pb-2">
      {/* SECTION 01 — Stream Profile Header */}
      <StreamProfileHeader />

      {/* SECTION 02 — Current Streaming Level Card */}
      <StreamCurrentLevelCard />

      {/* Top Navigation Tabs */}
      <div className="sticky top-0 z-10 -mx-4 px-4 py-2" style={{ background: "linear-gradient(to bottom, #F8F9FC, rgba(248,249,252,0.95))", backdropFilter: "blur(12px)" }}>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-1.5 min-w-max">
            {streamingTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.key ? "text-white shadow-md" : "bg-white text-gray-500 border border-gray-100"
                }`}
                style={activeTab === tab.key ? { background: "linear-gradient(135deg, #3B82F6, #0D1B3E)", boxShadow: "0 4px 12px rgba(59,130,246,0.3)" } : {}}
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
        {activeTab === "audience" && <PerformanceTab />}
        {activeTab === "discovery" && <PerformanceTab />}
        {activeTab === "rewards" && <RewardsTab />}
        {activeTab === "achievements" && <AchievementsTab />}
        {activeTab === "collections" && <CollectionsTab />}
        {activeTab === "events" && <EventsTab />}
        {activeTab === "statistics" && <StatisticsTab />}
        {activeTab === "history" && <StatisticsTab />}
      </div>

      {/* Bottom Action Bar */}
      <StreamBottomBar />
    </div>
  );
}