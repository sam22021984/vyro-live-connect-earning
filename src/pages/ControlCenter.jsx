import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, User, ChevronRight, Shield } from "lucide-react";

const dashboards = [
  {
    id: "agency",
    title: "Agency Dashboard",
    description: "Agency owners manage host networks, recruitment, revenue, compliance, and operations",
    icon: Building2,
    path: "/agency-dashboard",
    gradient: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
    color: "#8B5CF6",
    modules: ["Agency Overview", "Host Management", "Recruitment Center", "Revenue Management", "Performance Analytics", "Events & Campaigns", "Compliance Center", "Agency Leaderboard"],
  },
  {
    id: "agent",
    title: "Agent Dashboard",
    description: "Agents recruit hosts, track targets, manage performance, and support agency growth",
    icon: User,
    path: "/agent-dashboard",
    gradient: "linear-gradient(135deg, #2563EB, #3B82F6)",
    color: "#3B82F6",
    modules: ["Agent Overview", "Recruitment Management", "Host Support Center", "Target & KPI Center", "Earnings & Commission", "Analytics Center", "Tasks & Achievements", "Support & Compliance"],
  },
];

export default function ControlCenter() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 100%)" }}>
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">Control Center</h1>
            <p className="text-[10px] text-white/60">Enterprise Operations Hub</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <Shield size={18} className="text-white" />
          </div>
        </div>

        {/* Banner */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 60%, #2D1B69 100%)", boxShadow: "0 8px 24px rgba(15,27,61,0.25)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)", transform: "translate(30%, -30%)" }} />
            <div className="relative">
              <h2 className="text-sm font-bold mb-1">Enterprise Operations</h2>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Centralized management for agency owners and agents. Select your dashboard to manage recruitment, hosts, revenue, compliance, and performance.
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
              className="w-full text-left rounded-2xl p-4 bg-white border border-gray-100 active:scale-[0.98] transition"
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: d.gradient }}>
                  <d.icon size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-800">{d.title}</h3>
                  <p className="text-[10px] text-gray-400">{d.modules.length} modules available</p>
                </div>
                <ChevronRight size={20} className="text-gray-300" />
              </div>
              <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">{d.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {d.modules.map((m, i) => (
                  <span key={i} className="text-[9px] px-2 py-1 rounded-full font-medium" style={{ background: `${d.color}10`, color: d.color }}>
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