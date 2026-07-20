import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ChevronRight, Rocket, Crown, Shield, LifeBuoy, Gift, Swords,
  Megaphone, DollarSign, PartyPopper, Globe, Briefcase, Compass, UserCog, Store, Lock
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { dashboards } from "@/components/creator/creatorData";
import CreatorStatsBanner from "@/components/creator/CreatorStatsBanner";
import { useCreatorCenter } from "@/hooks/useCreatorCenter";
import { useDashboardRegistry, selectNormalizedModules } from "@/hooks/useDashboardRegistry";
import { useBackNav } from "@/hooks/useBackNav";

// Maps static dashboard id → registry dashboard_code (creator_center_dashboards).
// Used to enrich cards with live module counts from dashboard_action_registry.
const DASHBOARD_CODE_MAP = {
  owner: ["AO_DASHBOARD"],
  sam: ["SAM_DASHBOARD"],
  country: ["CM_DASHBOARD"],
  bdev: ["BD_DASHBOARD"],
  business: ["BM_DASHBOARD"],
  support: ["SUPPORT_DASHBOARD"],
  finance: ["FINANCE_DASHBOARD"],
  marketing: ["MARKETING_DASHBOARD"],
  vip: ["VIP_MANAGER_DASHBOARD"],
  reward: ["REWARD_DASHBOARD"],
  event: ["EVENT_DASHBOARD"],
  pkmanager: ["PK_DASHBOARD"],
  superadmin: ["SUPER_ADMIN_DASHBOARD"],
  admin: ["ADMIN_DASHBOARD"],
};

const ICON_MAP = {
  Crown, Shield, LifeBuoy, Gift, Swords, Megaphone, DollarSign, PartyPopper,
  Globe, Briefcase, Compass, UserCog, Store, Rocket,
};

import { getRoleLevel, getCreatorCenterDashboards } from "@/lib/roleUtils";

export default function CreatorCenter() {
  const navigate = useNavigate();
  const handleBack = useBackNav("/more-services");
  const { profile, stats, hasRealStats, loading, approvedApplications } = useCreatorCenter();
  const { data: registry } = useDashboardRegistry();

  const liveModulesFor = (id) => {
    const codes = DASHBOARD_CODE_MAP[id];
    if (!codes) return null;
    for (const c of codes) {
      const mods = selectNormalizedModules(registry, c);
      if (mods?.length) return mods;
    }
    return null;
  };

  const userRole = profile?.role || "user";
  const { visible: visibleDashboards, locked: lockedDashboards } = getCreatorCenterDashboards(dashboards, userRole);

  // Seller dashboard: accessible to the App Owner OR users with an approved coins_seller application
  const isAppOwner = profile?.is_app_owner === true || profile?.role === "owner";
  const isApprovedSeller = approvedApplications.includes("coins_seller");
  const canAccessSeller = isAppOwner || isApprovedSeller;
  const finalVisible = canAccessSeller
    ? [...visibleDashboards, ...lockedDashboards.filter((d) => d.id === "seller")]
    : visibleDashboards;
  const finalLocked = canAccessSeller
    ? lockedDashboards.filter((d) => d.id !== "seller")
    : lockedDashboards;

  const handleNavigate = (d) => {
    try {
      base44.analytics.track({
        eventName: "creator_dashboard_visit",
        properties: { dashboard_id: d.id, dashboard_title: d.title },
      });
    } catch (e) { /* non-critical */ }
    navigate(d.path);
  };

  return (
    <div className="min-h-screen" style={{ background: "#F7F9FC" }}>
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid #E5E7EB" }}>
          <button onClick={handleBack} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "#F7F9FC" }}>
            <ArrowLeft size={18} style={{ color: "#0F1B3D" }} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold" style={{ color: "#0F1B3D" }}>Creator Center</h1>
            <p className="text-[10px]" style={{ color: "#6B7280" }}>
              {profile?.username ? `${profile.username} · ` : ""}Role: {userRole}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2F80ED, #56CCF2)" }}>
            <Rocket size={16} className="text-white" />
          </div>
        </div>

        {/* Stats Banner */}
        <div className="px-4 pt-4">
          <CreatorStatsBanner stats={stats} loading={loading} hasRealStats={hasRealStats} />
        </div>

        {/* Earning Banner */}
        <div className="px-4 pt-3">
          <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1033 0%, #2d1b4e 100%)", boxShadow: "0 8px 24px rgba(47,128,237,0.15)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FFD700, transparent 70%)", transform: "translate(30%, -30%)" }} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <Rocket size={16} className="text-amber-400" />
                <h2 className="text-sm font-bold text-amber-300">VYRO Live Connect Earning</h2>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-300">
                Enterprise-level dashboards for platform governance, global analytics, finance, security, and complete system control.
              </p>
              {stats && (
                <div className="flex gap-3 mt-3">
                  <div className="flex items-center gap-1">
                    <Crown size={12} className="text-amber-400" />
                    <span className="text-[10px] text-gray-300">{finalVisible.length} accessible</span>
                  </div>
                  {finalLocked.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Lock size={12} className="text-gray-500" />
                      <span className="text-[10px] text-gray-500">{finalLocked.length} locked</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Accessible Dashboard Cards */}
        <div className="px-4 pt-4 space-y-3">
          {visibleDashboards.length > 0 && (
            <h3 className="text-xs font-bold uppercase tracking-wider px-1" style={{ color: "#9CA3AF" }}>Your Dashboards</h3>
          )}
          {finalVisible.map((d) => (
            <DashboardCard key={d.id} d={d} onNavigate={handleNavigate} stats={stats} liveModules={liveModulesFor(d.id)} />
          ))}

          {finalLocked.length > 0 && (
            <>
              <h3 className="text-xs font-bold uppercase tracking-wider px-1 pt-2" style={{ color: "#9CA3AF" }}>Locked Dashboards</h3>
              {finalLocked.map((d) => (
                <DashboardCard key={d.id} d={d} onNavigate={() => {}} stats={stats} locked />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ d, onNavigate, stats, locked, liveModules }) {
  const Icon = ICON_MAP[d.icon] || Crown;
  const moduleCount = liveModules?.length ?? d.modules.length;

  const liveStat = (() => {
    if (!stats || locked) return null;
    switch (d.id) {
      case "finance": return `Managing $${stats.totalRevenue?.toLocaleString(undefined, { maximumFractionDigits: 0 })} revenue`;
      case "sam": return `Overseeing ${stats.totalUsers} users · ${stats.totalCoins?.toLocaleString()} coins`;
      case "vip": return `${stats.vipUsers} VIP members active`;
      case "owner": return `${stats.totalRooms} rooms · ${stats.liveRooms} live · ${stats.totalUsers} users`;
      case "superadmin": return `${stats.hosts} hosts · ${stats.totalGroups} groups`;
      case "marketing": return `${stats.totalPosts} posts · ${stats.totalChannels} channels`;
      case "reward": return `${stats.totalTransactions} reward transactions`;
      case "event": return `${stats.totalRooms} active rooms`;
      case "country": return `${stats.totalUsers} users globally`;
      default: return null;
    }
  })();

  return (
    <button
      onClick={() => !locked && onNavigate(d)}
      disabled={locked}
      className="w-full text-left rounded-2xl p-4 active:scale-[0.98] transition relative overflow-hidden disabled:opacity-50"
      style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", boxShadow: locked ? "none" : "0 8px 24px rgba(0,0,0,0.06)" }}
    >
      {locked && (
        <div className="absolute top-3 right-3 text-[8px] px-1.5 py-0.5 rounded-full font-bold bg-gray-100 text-gray-500 flex items-center gap-1">
          <Lock size={8} /> LOCKED
        </div>
      )}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5" style={{ background: `radial-gradient(circle, ${d.color}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: d.gradient, boxShadow: `0 4px 12px ${d.color}30` }}>
          <Icon size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold" style={{ color: "#0F1B3D" }}>{d.title}</h3>
            <span className="text-[7px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${d.color}10`, color: d.color }}>{d.badge}</span>
            {liveModules && (
              <span className="text-[7px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5" style={{ background: "#10B98115", color: "#059669" }}>
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> LIVE
              </span>
            )}
          </div>
          <p className="text-[10px]" style={{ color: "#9CA3AF" }}>{moduleCount} modules available</p>
        </div>
        {!locked && <ChevronRight size={20} style={{ color: "#D1D5DB" }} />}
      </div>
      <p className="text-[11px] mb-3 leading-relaxed" style={{ color: "#6B7280" }}>{d.description}</p>
      {liveStat && (
        <div className="mb-2 text-[9px] font-semibold" style={{ color: d.color }}>
          {liveStat}
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {(liveModules ? liveModules.slice(0, 8).map((m) => m.module_code) : d.modules.slice(0, 8)).map((m, i) => (
          <span key={i} className="text-[9px] px-2 py-1 rounded-full font-medium" style={{ background: `${d.color}08`, color: d.color }}>
            {m}
          </span>
        ))}
        {moduleCount > 8 && (
          <span className="text-[9px] px-2 py-1 rounded-full font-medium" style={{ background: `${d.color}08`, color: d.color }}>
            +{moduleCount - 8} more
          </span>
        )}
      </div>
    </button>
  );
}