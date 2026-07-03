import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Sidebar from "@/components/community/Sidebar";
import TopBar from "@/components/community/TopBar";
import Footer from "@/components/community/Footer";
import OverviewTab from "@/components/community/OverviewTab";
import FeedTab from "@/components/community/FeedTab";
import GroupsTab from "@/components/community/GroupsTab";
import ChannelsTab from "@/components/community/ChannelsTab";
import MediaGalleryTab from "@/components/community/MediaGalleryTab";
import GiftingTab from "@/components/community/GiftingTab";
import ReportsTab from "@/components/community/ReportsTab";
import AnalyticsTab from "@/components/community/AnalyticsTab";
import SecurityTab from "@/components/community/SecurityTab";
import { COLORS } from "@/components/community/communityData";
import { useCommunityData } from "@/hooks/useCommunityData";
import { useToast } from "@/components/ui/use-toast";

export default function CommunityDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [coins] = useState(5000000);
  const { posts, groups, channels, media, reports, stats, loading } = useCommunityData();

  const renderContent = () => {
    switch (active) {
      case "overview": return <OverviewTab posts={posts} stats={stats} />;
      case "feed":
      case "posts":
      case "saved":
        return <FeedTab posts={posts} loading={loading} />;
      case "groups": return <GroupsTab groups={groups} loading={loading} />;
      case "channels":
      case "announcements":
        return <ChannelsTab channels={channels} loading={loading} />;
      case "media": return <MediaGalleryTab media={media} loading={loading} />;
      case "gifting": return <GiftingTab />;
      case "reports": return <ReportsTab reports={reports} loading={loading} />;
      case "admin":
        return <AnalyticsTab />;
      case "security":
      case "membership":
        return <SecurityTab />;
      default:
        return <OverviewTab posts={posts} stats={stats} />;
    }
  };

  const handleSelect = (key) => {
    if (key === "chat") {
      navigate("/messages");
      return;
    }
    if (key === "social") {
      navigate("/social");
      return;
    }
    setActive(key);
  };

  return (
    <div className="min-h-screen flex" style={{ background: COLORS.bgPrimary }}>
      <Sidebar active={active} onSelect={handleSelect} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 max-w-full">
        <div className="lg:hidden sticky top-0 z-20 px-4 py-2.5 flex items-center gap-2" style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${COLORS.border}` }}>
          <button onClick={() => navigate("/")} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: COLORS.bgPrimary }}>
            <ArrowLeft size={18} style={{ color: COLORS.textPrimary }} />
          </button>
          <h1 className="text-sm font-bold" style={{ color: COLORS.textPrimary }}>Community Dashboard</h1>
        </div>

        <TopBar onMenu={() => setSidebarOpen(true)} coins={coins} onSearch={() => toast({ title: "Searching..." })} />

        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
          <div className="max-w-5xl mx-auto">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}