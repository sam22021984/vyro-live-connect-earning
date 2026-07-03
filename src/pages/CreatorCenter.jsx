import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Crown, ChevronRight, Rocket, Shield } from "lucide-react";

const dashboards = [
  {
    id: "owner",
    title: "Owner Dashboard",
    description: "Master control center — global control, analytics, finance, security, approvals, and monitoring across the entire VYRO ecosystem",
    icon: Crown,
    path: "/owner-dashboard",
    gradient: "linear-gradient(135deg, #2F80ED, #56CCF2)",
    color: "#2F80ED",
    badge: "HIGHEST AUTHORITY",
    modules: ["Dashboard Home", "Global Search", "Country Control", "Role Management", "Applications", "Revenue Center", "Gift Center", "Coin Economy", "Rankings", "Live Monitoring", "AI Monitoring", "Security Command", "Finance Center", "Audit Center", "Broadcast", "Automation", "Business Intelligence", "Settings", "Owner Powers"],
  },
  {
    id: "sam",
    title: "SAM Dashboard",
    description: "Super Admin Manager controls users, coins, sellers, recharges, withdrawals, wallets, revenue, security, and system health",
    icon: Shield,
    path: "/sam-dashboard",
    gradient: "linear-gradient(135deg, #D4AF37, #B8941E)",
    color: "#D4AF37",
    badge: "SUPER ADMIN",
    modules: ["Dashboard Overview", "User Management", "Coin Management", "Coin Seller Management", "Offline Recharge", "Wallet Control Center", "Withdrawal Management", "Agency & Agent Management", "Host & Streaming", "Gift & Revenue", "Reports & Analytics", "Security Center", "Admin Control", "System Health", "SAM Profile"],
  },
  {
    id: "vip",
    title: "VIP Manager Dashboard",
    description: "Enterprise VIP membership management, premium user services, VIP rewards distribution, loyalty operations, VIP engagement monitoring, exclusive events, VIP revenue analysis, and premium customer experience control center",
    icon: Crown,
    path: "/vip-manager-dashboard",
    gradient: "linear-gradient(135deg, #D4AF37, #F59E0B)",
    color: "#D4AF37",
    badge: "VIP MANAGER",
    modules: ["Dashboard Home", "VIP Overview", "Member Management", "Level Management", "Rewards Center", "Event Management", "Host Engagement", "Revenue Center", "Retention Center", "Growth Center", "Communication", "Exclusive Benefits", "Partnerships", "Country Performance", "Top Rankings", "AI Intelligence", "Analytics", "Reports", "Team Management", "Settings", "Exclusive Tools"],
  },
];

export default function CreatorCenter() {
  const navigate = useNavigate();

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
            <p className="text-[10px]" style={{ color: "#6B7280" }}>Earning & Enterprise Dashboards</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2F80ED, #56CCF2)" }}>
            <Rocket size={16} className="text-white" />
          </div>
        </div>

        {/* Banner */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #EEF2F7 100%)", border: "1px solid #E5E7EB", boxShadow: "0 8px 24px rgba(47,128,237,0.08)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #2F80ED, transparent 70%)", transform: "translate(30%, -30%)" }} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <Rocket size={16} style={{ color: "#2F80ED" }} />
                <h2 className="text-sm font-bold" style={{ color: "#0F1B3D" }}>VYRO Live Connect Earning</h2>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "#6B7280" }}>
                Enterprise-level dashboards for platform governance, global analytics, finance, security, and complete system control.
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="px-4 pt-4 space-y-3">
          {dashboards.map((d) => (
            <button
              key={d.id}
              onClick={() => navigate(d.path)}
              className="w-full text-left rounded-2xl p-4 active:scale-[0.98] transition relative overflow-hidden"
              style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5" style={{ background: `radial-gradient(circle, ${d.color}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: d.gradient, boxShadow: `0 4px 12px ${d.color}30` }}>
                  <d.icon size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold" style={{ color: "#0F1B3D" }}>{d.title}</h3>
                    <span className="text-[7px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${d.color}10`, color: d.color }}>{d.badge}</span>
                  </div>
                  <p className="text-[10px]" style={{ color: "#9CA3AF" }}>{d.modules.length} modules available</p>
                </div>
                <ChevronRight size={20} style={{ color: "#D1D5DB" }} />
              </div>
              <p className="text-[11px] mb-3 leading-relaxed" style={{ color: "#6B7280" }}>{d.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {d.modules.map((m, i) => (
                  <span key={i} className="text-[9px] px-2 py-1 rounded-full font-medium" style={{ background: `${d.color}08`, color: d.color }}>
                    {m}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}