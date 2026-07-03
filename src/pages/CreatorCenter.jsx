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

const ICON_MAP = {
  Crown, Shield, LifeBuoy, Gift, Swords, Megaphone, DollarSign, PartyPopper,
  Globe, Briefcase, Compass, UserCog, Store,
};

const ROLE_HIERARCHY = {
  user: 0, host: 1, agent: 2, agency: 3, admin: 4, owner: 5,
};

const DASHBOARD_ROLE_LEVEL = {
  owner: 5, sam: 5, vip: 4, support: 4, superadmin: 4, reward: 4,
  pkmanager: 4, marketing: 4, finance: 4, event: 4, country: 4,
  business: 4, bdev: 4, admin: 4,
};

export default function CreatorCenter() {
  const navigate = useNavigate();
  const { profile, stats, loading } = useCreatorCenter();

  const userRole = profile?.role || "user";
  const userLevel = ROLE_HIERARCHY[userRole] ?? 0;

  const visibleDashboards = dashboards.filter((d) => userLevel >= (DASHBOARD_ROLE_LEVEL[d.id] ?? 4));
  const lockedDashboards = dashboards.filter((d) => userLevel < (DASHBOARD_ROLE_LEVEL[d.id] ?? 4));

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
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "#F7F9FC" }}>
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
          <CreatorStatsBanner stats={stats} loading={loading} />
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
                    <span className="text-[10px] text-gray-300">{visibleDashboards.length} accessible</span>
                  </div>
                  {lockedDashboards.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Lock size={12} className="text-gray-500" />
                      <span className="text-[10px] text-gray-500">{lockedDashboards.length} locked</span>
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
          {visibleDashboards.map((d) => (
            <DashboardCard key={d.id} d={d} onNavigate={handleNavigate} stats={stats} />
          ))}

          {lockedDashboards.length > 0 && (
            <>
              <h3 className="text-xs font-bold uppercase tracking-wider px-1 pt-2" style={{ color: "#9CA3AF" }}>Locked Dashboards</h3>
              {lockedDashboards.map((d) => (
                <DashboardCard key={d.id} d={d} onNavigate={() => {}} stats={stats} locked />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ d, onNavigate, stats, locked }) {
  const Icon = ICON_MAP[d.icon] || Crown;

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
          </div>
          <p className="text-[10px]" style={{ color: "#9CA3AF" }}>{d.modules.length} modules available</p>
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
        {d.modules.slice(0, 8).map((m, i) => (
          <span key={i} className="text-[9px] px-2 py-1 rounded-full font-medium" style={{ background: `${d.color}08`, color: d.color }}>
            {m}
          </span>
        ))}
        {d.modules.length > 8 && (
          <span className="text-[9px] px-2 py-1 rounded-full font-medium" style={{ background: `${d.color}08`, color: d.color }}>
            +{d.modules.length - 8} more
          </span>
        )}
      </div>
    </button>
  );
}