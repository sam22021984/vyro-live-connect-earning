import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { USER_INFO as USER_INFO_D, USER_MODULES as USER_MODULES_D, QUICK_ACTIONS as QUICK_ACTIONS_D } from "@/components/user-dashboard/userDashboardData";
import { useDashboardData } from "@/hooks/useDashboardData";
import { GOLD, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import HomeSection from "@/components/user-dashboard/sections/HomeSection";
import ProfileSection from "@/components/user-dashboard/sections/ProfileSection";
import WalletSection from "@/components/user-dashboard/sections/WalletSection";
import RewardSection from "@/components/user-dashboard/sections/RewardSection";
import VipSection from "@/components/user-dashboard/sections/VipSection";
import SocialSection from "@/components/user-dashboard/sections/SocialSection";
import LiveSection from "@/components/user-dashboard/sections/LiveSection";
import GiftSection from "@/components/user-dashboard/sections/GiftSection";
import EventSection from "@/components/user-dashboard/sections/EventSection";
import AchievementSection from "@/components/user-dashboard/sections/AchievementSection";
import ReferralSection from "@/components/user-dashboard/sections/ReferralSection";
import NotificationSection from "@/components/user-dashboard/sections/NotificationSection";
import SettingsSection from "@/components/user-dashboard/sections/SettingsSection";
import SafetySection from "@/components/user-dashboard/sections/SafetySection";
import SupportSection from "@/components/user-dashboard/sections/SupportSection";
import ActivitySection from "@/components/user-dashboard/sections/ActivitySection";
import UserPolicyTab from "@/components/user-dashboard/UserPolicyTab";

const SECTIONS = {
  home: HomeSection, profile: ProfileSection, wallet: WalletSection, rewards: RewardSection,
  vip: VipSection, social: SocialSection, live: LiveSection, gifts: GiftSection,
  events: EventSection, achievements: AchievementSection, referral: ReferralSection,
  notifications: NotificationSection, settings: SettingsSection, safety: SafetySection,
  support: SupportSection, activity: ActivitySection, policy: UserPolicyTab,
};

export default function UserDashboard() {
  const navigate = useNavigate();
  const { info: USER_INFO, modules: USER_MODULES, quickActions: QUICK_ACTIONS, loading } = useDashboardData("user", { info: USER_INFO_D, modules: USER_MODULES_D, quickActions: QUICK_ACTIONS_D });
  const [activeModule, setActiveModule] = useState("home");
  const ActiveComponent = SECTIONS[activeModule] || HomeSection;
  const currentModule = USER_MODULES.find((m) => m.id === activeModule) || USER_MODULES[0];

  if (loading || !currentModule) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0E1A" }}>
        <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0A0E1A" }}>
      <div className="max-w-md mx-auto pb-20">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 100%)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <button onClick={() => navigate("/control-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">User Dashboard</h1>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>{USER_INFO.username} · VYRO Live Connect</p>
          </div>
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
            <Search size={18} className="text-white" />
          </button>
        </div>

        {/* Hero Banner */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #2D1B69 100%)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
            <div className="relative flex items-center gap-3">
              <img src={USER_INFO.avatar} alt={USER_INFO.username} className="w-12 h-12 rounded-2xl object-cover border-2" style={{ borderColor: GOLD }} />
              <div className="flex-1">
                <h2 className="text-sm font-bold">🌐 VYRO LIVE CONNECT</h2>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>Earning User Dashboard</p>
              </div>
              <div className="text-right">
                <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.5)" }}>Level</p>
                <p className="text-sm font-bold" style={{ color: GOLD }}>{USER_INFO.level}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Module Tabs */}
        <div className="sticky top-[57px] z-20 px-4 pt-4 pb-2" style={{ background: "#0A0E1A" }}>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {USER_MODULES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={`flex items-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-bold transition active:scale-95 whitespace-nowrap ${activeModule === m.id ? "text-white" : ""}`}
                  style={activeModule === m.id
                    ? { background: m.gradient, boxShadow: `0 3px 10px ${m.color}40` }
                    : { background: "rgba(255,255,255,0.04)", color: TEXT_MUTED, border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-sm">{m.icon}</span>
                  {m.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Module Content */}
        <div className="px-4 pt-2">
          <div className="rounded-2xl p-3 mb-3 flex items-center gap-2" style={{ background: `${currentModule.color}10`, border: `1px solid ${currentModule.color}25` }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: currentModule.gradient }}>
              {currentModule.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{currentModule.title} Center</h3>
              <p className="text-[10px]" style={{ color: TEXT_MUTED }}>Manage your {currentModule.title.toLowerCase()}</p>
            </div>
          </div>
          <ActiveComponent />
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-30" style={{ background: "rgba(10,14,26,0.95)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-md mx-auto px-2 py-2">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-1 min-w-max justify-center">
                {QUICK_ACTIONS.map((q) => {
                  const isActive = activeModule === q.path;
                  return (
                    <button
                      key={q.label}
                      onClick={() => SECTIONS[q.path] && setActiveModule(q.path)}
                      className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition ${isActive ? "" : "opacity-50"}`}
                      style={isActive ? { background: `${GOLD}15` } : {}}
                    >
                      <span className="text-base">{q.icon}</span>
                      <span className="text-[7px] font-medium text-white">{q.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}