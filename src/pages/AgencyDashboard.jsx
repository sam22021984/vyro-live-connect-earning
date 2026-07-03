import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { AGENCY_INFO, AGENCY_MODULES, AGENCY_QUICK_ACTIONS } from "@/components/agency-dashboard/agencyDashboardData";
import { GOLD, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import HomeSection from "@/components/agency-dashboard/sections/HomeSection";
import ProfileSection from "@/components/agency-dashboard/sections/ProfileSection";
import AgentsSection from "@/components/agency-dashboard/sections/AgentsSection";
import HostsSection from "@/components/agency-dashboard/sections/HostsSection";
import FinanceSection from "@/components/agency-dashboard/sections/FinanceSection";
import AnalyticsSection from "@/components/agency-dashboard/sections/AnalyticsSection";
import PerformanceSection from "@/components/agency-dashboard/sections/PerformanceSection";
import EventSection from "@/components/agency-dashboard/sections/EventSection";
import RecruitmentSection from "@/components/agency-dashboard/sections/RecruitmentSection";
import CommunicationSection from "@/components/agency-dashboard/sections/CommunicationSection";
import ReportsSection from "@/components/agency-dashboard/sections/ReportsSection";
import NotificationSection from "@/components/agency-dashboard/sections/NotificationSection";
import ComplianceSection from "@/components/agency-dashboard/sections/ComplianceSection";
import SettingsSection from "@/components/agency-dashboard/sections/SettingsSection";
import SupportSection from "@/components/agency-dashboard/sections/SupportSection";
import AgencyPolicyTab from "@/components/agency-dashboard/AgencyPolicyTab";

const SECTIONS = {
  home: HomeSection, profile: ProfileSection, agents: AgentsSection, hosts: HostsSection,
  finance: FinanceSection, analytics: AnalyticsSection, performance: PerformanceSection,
  events: EventSection, recruitment: RecruitmentSection, communication: CommunicationSection,
  reports: ReportsSection, notifications: NotificationSection, compliance: ComplianceSection,
  settings: SettingsSection, support: SupportSection, policy: AgencyPolicyTab,
};

export default function AgencyDashboard() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState("home");
  const ActiveComponent = SECTIONS[activeModule] || HomeSection;
  const currentModule = AGENCY_MODULES.find((m) => m.id === activeModule) || AGENCY_MODULES[0];

  return (
    <div className="min-h-screen" style={{ background: "#0A0E1A" }}>
      <div className="max-w-md mx-auto pb-20">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 100%)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <button onClick={() => navigate("/control-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">Agency Dashboard</h1>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>{AGENCY_INFO.agency_name} · VYRO Enterprise</p>
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
              <img src={AGENCY_INFO.logo} alt={AGENCY_INFO.agency_name} className="w-12 h-12 rounded-2xl object-cover border-2" style={{ borderColor: GOLD }} />
              <div className="flex-1">
                <h2 className="text-sm font-bold">🌐 VYRO LIVE CONNECT</h2>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>Enterprise Agency Dashboard</p>
              </div>
              <div className="text-right">
                <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.5)" }}>Rank</p>
                <p className="text-sm font-bold" style={{ color: GOLD }}>{AGENCY_INFO.rank}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Module Tabs */}
        <div className="sticky top-[57px] z-20 px-4 pt-4 pb-2" style={{ background: "#0A0E1A" }}>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {AGENCY_MODULES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={`flex items-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-bold transition active:scale-95 whitespace-nowrap ${activeModule === m.id ? "text-white" : ""}`}
                  style={activeModule === m.id
                    ? { background: m.gradient, boxShadow: `0 3px 10px ${m.color}40` }
                    : { background: "rgba(255,255,255,0.04)", color: TEXT_MUTED, border: "1px solid rgba(255,255,255,0.06)" }
                  }
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
              <p className="text-[10px]" style={{ color: TEXT_MUTED }}>Manage your agency {currentModule.title.toLowerCase()}</p>
            </div>
          </div>
          <ActiveComponent />
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-30" style={{ background: "rgba(10,14,26,0.95)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-md mx-auto px-2 py-2">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-1 min-w-max justify-center">
                {AGENCY_QUICK_ACTIONS.map((q) => {
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