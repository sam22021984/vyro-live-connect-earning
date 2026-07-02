import React, { useState } from "react";
import PartyHeader from "@/components/party/PartyHeader";
import PartyStats from "@/components/party/PartyStats";
import FeaturedBanner from "@/components/party/FeaturedBanner";
import PopularTab from "@/components/party/PopularTab";
import FriendsTab from "@/components/party/FriendsTab";
import FollowingTab from "@/components/party/FollowingTab";
import RecentTab from "@/components/party/RecentTab";
import ExploreTab from "@/components/party/ExploreTab";
import PartyRankings from "@/components/party/PartyRankings";
import RoomDetailSheet from "@/components/party/RoomDetailSheet";
import { COLORS, TABS } from "@/components/party/partyData";
import { useToast } from "@/components/ui/use-toast";

export default function PartyDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("popular");
  const [selectedRoom, setSelectedRoom] = useState(null);

  const renderTab = () => {
    switch (activeTab) {
      case "popular": return <PopularTab onSelect={setSelectedRoom} />;
      case "friends": return <FriendsTab />;
      case "following": return <FollowingTab />;
      case "recent": return <RecentTab />;
      case "explore": return <ExploreTab onSelect={setSelectedRoom} />;
      default: return <PopularTab onSelect={setSelectedRoom} />;
    }
  };

  return (
    <div className="min-h-screen pb-20" style={{ background: COLORS.bgPrimary }}>
      <div className="max-w-md mx-auto">
        <PartyHeader onSearch={() => toast({ title: "Searching..." })} />

        <div className="p-4 space-y-4">
          {/* Stats */}
          <PartyStats />

          {/* Featured banner */}
          <FeaturedBanner onJoin={() => toast({ title: "Joining Champion Cup Party Night..." })} />

          {/* Quick nav tabs */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-2 min-w-max">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={"flex items-center gap-1 py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 " + (activeTab === tab.key ? "text-white" : "")}
                  style={activeTab === tab.key
                    ? { background: `linear-gradient(135deg, ${COLORS.royalBlue}, ${COLORS.skyBlue})`, boxShadow: `0 4px 12px ${COLORS.royalBlue}25` }
                    : { background: "rgba(255,255,255,0.7)", color: COLORS.textSecondary, border: `1px solid ${COLORS.border}` }
                  }
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          {renderTab()}

          {/* Rankings - always visible */}
          {activeTab === "popular" && <PartyRankings />}
        </div>
      </div>

      {/* Room detail sheet */}
      <RoomDetailSheet room={selectedRoom} onClose={() => setSelectedRoom(null)} />
    </div>
  );
}