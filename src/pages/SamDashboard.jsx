import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Circle, LayoutDashboard, Users, Coins, Store, Smartphone, Wallet, ArrowDownCircle, Building2, Mic, Gift, BarChart3, ShieldCheck, Crown, Server, UserCog } from "lucide-react";
import { SAM_MODULES } from "@/components/sam-dashboard/samData";
import OverviewModule from "@/components/sam-dashboard/OverviewModule";
import UserManagementModule from "@/components/sam-dashboard/UserManagementModule";
import CoinManagementModule from "@/components/sam-dashboard/CoinManagementModule";
import SellerManagementModule from "@/components/sam-dashboard/SellerManagementModule";
import OfflineRechargeModule from "@/components/sam-dashboard/OfflineRechargeModule";
import WalletControlModule from "@/components/sam-dashboard/WalletControlModule";
import WithdrawalModule from "@/components/sam-dashboard/WithdrawalModule";
import AgencyManagementModule from "@/components/sam-dashboard/AgencyManagementModule";
import HostManagementModule from "@/components/sam-dashboard/HostManagementModule";
import GiftRevenueModule from "@/components/sam-dashboard/GiftRevenueModule";
import ReportsModule from "@/components/sam-dashboard/ReportsModule";
import SecurityModule from "@/components/sam-dashboard/SecurityModule";
import AdminControlModule from "@/components/sam-dashboard/AdminControlModule";
import SystemHealthModule from "@/components/sam-dashboard/SystemHealthModule";
import SamProfileModule from "@/components/sam-dashboard/SamProfileModule";
import ReportToSection from "@/components/shared/ReportToSection";

const DARK_BG = "linear-gradient(160deg, #0A0F1E 0%, #131A2E 40%, #1A1240 100%)";
const SOFT_WHITE = "#F4F0FA";
const GOLD = "#D4AF37";
const GLASS = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" };

const ICON_MAP = {
  LayoutDashboard, Users, Coins, Store, Smartphone, Wallet, ArrowDownCircle,
  Building2, Mic, Gift, BarChart3, ShieldCheck, Crown, Server, UserCog,
};

function ModuleContent({ moduleId }) {
  switch (moduleId) {
    case "overview": return <OverviewModule />;
    case "user_management": return <UserManagementModule />;
    case "coin_management": return <CoinManagementModule />;
    case "seller_management": return <SellerManagementModule />;
    case "offline_recharge": return <OfflineRechargeModule />;
    case "wallet_control": return <WalletControlModule />;
    case "withdrawal_management": return <WithdrawalModule />;
    case "agency_management": return <AgencyManagementModule />;
    case "host_management": return <HostManagementModule />;
    case "gift_revenue": return <GiftRevenueModule />;
    case "reports": return <ReportsModule />;
    case "security": return <SecurityModule />;
    case "admin_control": return <AdminControlModule />;
    case "system_health": return <SystemHealthModule />;
    case "sam_profile": return <SamProfileModule />;
    default: return null;
  }
}

export default function SamDashboard() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState("overview");
  const currentModule = SAM_MODULES.find((m) => m.id === activeModule);
  const getIcon = (iconName) => ICON_MAP[iconName] || Circle;

  return (
    <div className="min-h-screen" style={{ background: DARK_BG }}>
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "rgba(10,15,30,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={() => navigate("/control-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.08)" }}>
            <ArrowLeft size={18} style={{ color: SOFT_WHITE }} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold" style={{ color: SOFT_WHITE }}>SAM Dashboard</h1>
            <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>🌐 VYRO Live Connect · Super Admin Manager</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${GOLD}, #B8941E)` }}>
            <Shield size={18} className="text-white" />
          </div>
        </div>

        {/* Hero Banner */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 relative overflow-hidden" style={{ ...GLASS, background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(59,130,246,0.1))" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <Shield size={16} style={{ color: GOLD }} />
                <h2 className="text-sm font-bold" style={{ color: SOFT_WHITE }}>Super Admin Manager</h2>
                <span className="text-[8px] px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(212,175,55,0.2)", color: GOLD }}>SAM-001</span>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "rgba(244,240,250,0.6)" }}>
                Master control center for platform governance, user management, coin economy, seller approval, withdrawals, security, and revenue monitoring.
              </p>
            </div>
          </div>
        </div>

        {/* Report To Section */}
        <div className="px-4 pt-3">
          <ReportToSection roleKey="sam" theme="dark" />
        </div>

        {/* Module Grid */}
        <div className="px-4 pt-4">
          <h3 className="text-xs font-bold mb-2 px-1" style={{ color: SOFT_WHITE }}>Dashboard Modules</h3>
          <div className="grid grid-cols-3 gap-2">
            {SAM_MODULES.map((m) => {
              const Icon = getIcon(m.icon);
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl transition active:scale-95"
                  style={activeModule === m.id
                    ? { background: m.gradient, boxShadow: `0 4px 12px ${m.color}40` }
                    : { ...GLASS }}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={activeModule === m.id ? { background: "rgba(255,255,255,0.2)" } : { background: `${m.color}20` }}>
                    <Icon size={15} style={{ color: activeModule === m.id ? "#fff" : m.color }} />
                  </div>
                  <span className="text-[8px] font-bold text-center leading-tight" style={activeModule === m.id ? { color: "#fff" } : { color: SOFT_WHITE }}>{m.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Module Content */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-3 mb-3" style={GLASS}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: currentModule.gradient }}>
                {React.createElement(getIcon(currentModule.icon), { size: 16, style: { color: "#fff" } })}
              </div>
              <div>
                <h3 className="text-sm font-bold" style={{ color: SOFT_WHITE }}>{currentModule.title}</h3>
                <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>{currentModule.description}</p>
              </div>
            </div>
          </div>
          <ModuleContent moduleId={activeModule} />
        </div>
      </div>
    </div>
  );
}