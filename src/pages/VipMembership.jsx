import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Crown } from "lucide-react";
import { vipTabs } from "@/components/vip/vipData";
import VipHomeTab from "@/components/vip/VipHomeTab";
import VipPricingTab from "@/components/vip/VipPricingTab";
import VipLevelsTab from "@/components/vip/VipLevelsTab";
import VipBenefitsTab from "@/components/vip/VipBenefitsTab";
import VipUpgradeTab from "@/components/vip/VipUpgradeTab";
import VipRewardsTab from "@/components/vip/VipRewardsTab";
import VipCustomizeTab from "@/components/vip/VipCustomizeTab";
import VipCollectionsTab from "@/components/vip/VipCollectionsTab";
import VipPurchaseTab from "@/components/vip/VipPurchaseTab";
import VipDurationTab from "@/components/vip/VipDurationTab";
import VipHistoryTab from "@/components/vip/VipHistoryTab";
import VipSettingsTab from "@/components/vip/VipSettingsTab";
import VipNotificationsTab from "@/components/vip/VipNotificationsTab";
import VipCoreSystem from "@/pages/VipCoreSystem";
import VipRewardSystem from "@/pages/VipRewardSystem";
import VipAuthoritySystem from "@/pages/VipAuthoritySystem";
import VipRoomManager from "@/pages/VipRoomManager";
import VipSecurityAdminSystem from "@/pages/VipSecurityAdminSystem";
import { useBackNav } from "@/hooks/useBackNav";

export default function VipMembership() {
  const navigate = useNavigate();
  const handleBack = useBackNav("/more-services");
  const [activeTab, setActiveTab] = useState("home");
  const [selectedDurationId, setSelectedDurationId] = useState(null);

  const handleSelectDuration = (planId) => {
    setSelectedDurationId(planId);
    setActiveTab("purchase");
  };

  const renderTab = () => {
    switch (activeTab) {
      case "home": return <VipHomeTab onNavigate={setActiveTab} />;
      case "pricing": return <VipPricingTab />;
      case "levels": return <VipLevelsTab />;
      case "benefits": return <VipBenefitsTab />;
      case "upgrade": return <VipUpgradeTab />;
      case "rewards": return <VipRewardsTab />;
      case "customize": return <VipCustomizeTab />;
      case "frames": return <VipCollectionsTab type="frames" />;
      case "badges": return <VipCollectionsTab type="badges" />;
      case "effects": return <VipCollectionsTab type="effects" />;
      case "purchase": return <VipPurchaseTab selectedDurationId={selectedDurationId} onDurationSelected={setSelectedDurationId} />;
      case "duration": return <VipDurationTab onSelectPlan={handleSelectDuration} selectedDurationId={selectedDurationId} />;
      case "history": return <VipHistoryTab />;
      case "settings": return <VipSettingsTab />;
      case "notifications": return <VipNotificationsTab />;
      case "vip-core": return <VipCoreSystem embedded />;
      case "vip-rewards": return <VipRewardSystem embedded />;
      case "vip-authority": return <VipAuthoritySystem embedded />;
      case "vip-rooms": return <VipRoomManager embedded />;
      case "vip-security": return <VipSecurityAdminSystem embedded />;
      default: return <VipHomeTab onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0118]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-[#0A0118]/90 backdrop-blur-xl border-b border-amber-500/20">
          <div className="px-4 py-3 flex items-center gap-3">
            <button
              onClick={handleBack}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition"
            >
              <ArrowLeft size={18} className="text-amber-400" />
            </button>
            <div className="flex items-center gap-2 flex-1">
              <Crown size={18} className="text-amber-400" />
              <h1 className="text-sm font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                VIP PREMIUM
              </h1>
            </div>
          </div>
          {/* Scrollable tab bar */}
          <div className="overflow-x-auto scrollbar-hide px-2 pb-2">
            <div className="flex gap-1.5 min-w-max">
              {vipTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.key
                      ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0A0118] shadow-lg shadow-amber-500/30"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab content */}
        <div className="pb-6 animate-fadeIn">{renderTab()}</div>
      </div>
    </div>
  );
}