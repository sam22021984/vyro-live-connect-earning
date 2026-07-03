import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, RefreshCw, BookOpen, Bell, Share2, HelpCircle,
  LayoutDashboard, Award, TrendingUp, History as HistoryIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { TRUST_TABS } from "@/components/trust-reputation/trustData";
import OverviewTab from "@/components/trust-reputation/OverviewTab";
import BadgesTab from "@/components/trust-reputation/BadgesTab";
import LevelsTab from "@/components/trust-reputation/LevelsTab";
import HistoryTab from "@/components/trust-reputation/HistoryTab";
import { useServicesData } from "@/hooks/useServicesData";
import { useBackNav } from "@/hooks/useBackNav";

const ICONS = {
  LayoutDashboard, Award, TrendingUp, History: HistoryIcon,
};

const SOFT_BG = "#F8F9FC";
const WHITE = "#FFFFFF";
const DARK = "#1F2937";
const GRAY = "#6B7280";
const PRIMARY = "#2F80ED";

export default function TrustReputation() {
  const navigate = useNavigate();
  const handleBack = useBackNav("/more-services");
  const { toast } = useToast();
  const { data } = useServicesData();
  const [activeTab, setActiveTab] = useState("overview");

  const trustData = data?.trust;
  const realTrustOverview = trustData ? {
    trustScore: trustData.trustScore,
    trustScoreMax: trustData.trustScoreMax,
    trustPercentage: trustData.trustPercentage,
    reputationLevel: trustData.reputationLevel,
    verificationStatus: trustData.verificationStatus,
    safetyStatus: trustData.safetyStatus,
    isVerified: trustData.isVerified,
    profileCompletion: trustData.profileCompletion,
    activityScore: trustData.activityScore,
  } : null;

  const handleAction = (action) => {
    toast({ title: action, description: "This feature will be available soon." });
  };

  const handleHeaderAction = (action) => {
    if (action === "Refresh Reputation") {
      toast({ title: "Refreshing Reputation", description: "Your latest reputation data is being loaded..." });
    } else if (action === "View Reputation Guide") {
      toast({ title: "Reputation Guide", description: "Opening the reputation guide..." });
    } else if (action === "Notification Center") {
      navigate("/message-hub");
    } else if (action === "Share Reputation Profile") {
      toast({ title: "Share Reputation", description: "Opening share options..." });
    } else if (action === "Help Center") {
      navigate("/support-center");
    }
  };

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid #F0F1F5" }}>
          <button onClick={handleBack} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "#F7F9FC" }}>
            <ArrowLeft size={18} style={{ color: DARK }} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold" style={{ color: DARK }}>Trust & Reputation</h1>
            <p className="text-[10px]" style={{ color: GRAY }}>Your Platform Standing & Credibility Score</p>
          </div>
          <button onClick={() => handleHeaderAction("Refresh Reputation")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "#F7F9FC" }}>
            <RefreshCw size={16} style={{ color: DARK }} />
          </button>
          <button onClick={() => handleHeaderAction("Help Center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "#F7F9FC" }}>
            <HelpCircle size={16} style={{ color: DARK }} />
          </button>
        </div>

        {/* Secondary Header Actions */}
        <div className="px-4 pt-3">
          <div className="grid grid-cols-4 gap-2">
            <button onClick={() => handleHeaderAction("View Reputation Guide")} className="rounded-2xl py-2.5 flex flex-col items-center gap-1 active:scale-95 transition" style={{ background: WHITE, border: "1px solid #F0F1F5" }}>
              <BookOpen size={16} style={{ color: PRIMARY }} />
              <span className="text-[8px] font-semibold" style={{ color: DARK }}>Guide</span>
            </button>
            <button onClick={() => handleHeaderAction("Notification Center")} className="rounded-2xl py-2.5 flex flex-col items-center gap-1 active:scale-95 transition" style={{ background: WHITE, border: "1px solid #F0F1F5" }}>
              <Bell size={16} style={{ color: "#EC4899" }} />
              <span className="text-[8px] font-semibold" style={{ color: DARK }}>Alerts</span>
            </button>
            <button onClick={() => handleHeaderAction("Share Reputation Profile")} className="rounded-2xl py-2.5 flex flex-col items-center gap-1 active:scale-95 transition" style={{ background: WHITE, border: "1px solid #F0F1F5" }}>
              <Share2 size={16} style={{ color: "#10B981" }} />
              <span className="text-[8px] font-semibold" style={{ color: DARK }}>Share</span>
            </button>
            <button onClick={() => handleHeaderAction("Help Center")} className="rounded-2xl py-2.5 flex flex-col items-center gap-1 active:scale-95 transition" style={{ background: WHITE, border: "1px solid #F0F1F5" }}>
              <HelpCircle size={16} style={{ color: "#F59E0B" }} />
              <span className="text-[8px] font-semibold" style={{ color: DARK }}>Help</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 pt-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {TRUST_TABS.map(t => {
              const Icon = ICONS[t.icon] || LayoutDashboard;
              const active = activeTab === t.id;
              return (
                <button key={t.id} onClick={() => setActiveTab(t.id)} className="flex-shrink-0 rounded-full px-4 py-2 flex items-center gap-1.5 active:scale-95 transition" style={{ background: active ? PRIMARY : WHITE, color: active ? "#FFF" : DARK, border: `1px solid ${active ? PRIMARY : "#F0F1F5"}`, boxShadow: active ? `0 4px 12px ${PRIMARY}30` : "none" }}>
                  <Icon size={14} />
                  <span className="text-[11px] font-semibold">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 pt-4">
          {activeTab === "overview" && <OverviewTab onAction={handleAction} realData={realTrustOverview} />}
          {activeTab === "badges" && <BadgesTab onAction={handleAction} />}
          {activeTab === "levels" && <LevelsTab onAction={handleAction} />}
          {activeTab === "history" && <HistoryTab onAction={handleAction} />}
        </div>
      </div>
    </div>
  );
}