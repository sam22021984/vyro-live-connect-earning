import React, { useState } from "react";
import { LogOut, ChevronDown, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";

const services = [
  { name: "Finance", icon: "💰", gradient: "from-green-400 to-emerald-500", highlight: false },
  { name: "Tasks & Rewards", icon: "🎁", gradient: "from-pink-400 to-rose-500", highlight: false },
  { name: "Live & Audio", icon: "🎙️", gradient: "from-red-400 to-orange-500", highlight: false },
  { name: "Social", icon: "👥", gradient: "from-blue-400 to-cyan-500", highlight: false },
  { name: "Messages", icon: "💬", gradient: "from-sky-400 to-blue-500", highlight: false },
  { name: "Profile & Stats", icon: "📊", gradient: "from-violet-400 to-purple-500", highlight: false },
  { name: "Level System", icon: "⭐", gradient: "from-amber-400 to-yellow-500", highlight: false },
  { name: "Settings", icon: "⚙️", gradient: "from-slate-400 to-gray-500", highlight: false },
  { name: "Support", icon: "🛟", gradient: "from-teal-400 to-cyan-500", highlight: false },
  { name: "Apply Center", icon: "💼", gradient: "from-indigo-400 to-blue-500", highlight: false },
  { name: "Control Center", icon: "🎛️", gradient: "from-fuchsia-400 to-purple-500", highlight: true },
  { name: "Creator Center", icon: "🚀", gradient: "from-purple-400 to-violet-600", highlight: true },
  { name: "VIP Membership", icon: "💎", gradient: "from-amber-300 to-yellow-500", highlight: true },
  { name: "Mall", icon: "🏪", gradient: "from-orange-400 to-red-400", highlight: false },
  { name: "Trust & Reputation", icon: "🛡️", gradient: "from-green-400 to-teal-500", highlight: false },
  { name: "Lucky ID Store", icon: "🍀", gradient: "from-lime-400 to-green-500", highlight: false },
];

function ServiceCard({ service, onClick }) {
  const [tapped, setTapped] = useState(false);
  return (
    <button
      onClick={onClick}
      onPointerDown={() => setTapped(true)}
      onPointerUp={() => setTapped(false)}
      onPointerLeave={() => setTapped(false)}
      className={`relative flex flex-col items-center justify-center gap-2 p-3 rounded-[20px] transition-all duration-300
        ${tapped ? "scale-95" : "hover:scale-[1.05]"}
        ${service.highlight
          ? "bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/60"
          : "bg-white/80 backdrop-blur-xl border border-white"
        }`}
      style={{
        boxShadow: tapped
          ? "0 1px 2px rgba(0,0,0,0.08)"
          : service.highlight
          ? "0 4px 12px rgba(245,158,11,0.15), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)"
          : "0 4px 10px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      {service.highlight && (
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-300" />
      )}
      <div
        className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center transition-transform duration-300`}
        style={{
          boxShadow: tapped
            ? "0 1px 2px rgba(0,0,0,0.15)"
            : "0 3px 8px rgba(0,0,0,0.18), inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -2px 4px rgba(0,0,0,0.12)",
        }}
      >
        <span className="text-xl" style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.2))" }}>{service.icon}</span>
      </div>
      <span className="text-[10px] font-semibold text-gray-700 text-center leading-tight">
        {service.name}
      </span>
    </button>
  );
}

export default function MoreServices() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await base44.auth.logout("/login");
  };

  return (
    <div className="px-4 mb-8">
      {/* Collapsible More Services Card */}
      <div
        className="rounded-[24px] overflow-hidden transition-all duration-300"
        style={{
          background: open
            ? "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(253,250,240,0.85))"
            : "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(248,249,252,0.8))",
          boxShadow: open
            ? "0 8px 30px rgba(139,92,246,0.10), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)"
            : "0 6px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,1)",
          border: open ? "1px solid rgba(245,158,11,0.25)" : "1px solid rgba(255,255,255,0.9)",
        }}
      >
        {/* Header - tappable */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-4 transition-all duration-300 active:scale-[0.99]"
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 flex items-center justify-center"
              style={{
                boxShadow: "0 3px 8px rgba(245,158,11,0.3), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -2px 3px rgba(180,83,9,0.2)",
              }}
            >
              <Sparkles size={16} className="text-white" style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.2))" }} />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-gray-800">More Services</h3>
              <p className="text-[10px] text-gray-400 font-medium">{open ? "Tap to collapse" : "16 premium services"}</p>
            </div>
          </div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "bg-amber-100" : "bg-gray-50"}`}
          >
            <ChevronDown
              size={18}
              className={`text-amber-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {/* Expandable content */}
        <div
          className={`grid transition-all duration-300 ease-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-4 pb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent mb-3" />
              <div className="grid grid-cols-4 gap-2.5">
                {services.map((s, i) => (
                  <ServiceCard
                    key={i}
                    service={s}
                    onClick={s.name === "Settings" ? () => navigate("/settings") : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full mt-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-[18px] p-4 shadow-lg shadow-red-100 flex items-center justify-center gap-2.5 transition-all duration-300 hover:shadow-xl hover:shadow-red-200 active:scale-[0.98]"
      >
        <LogOut size={18} className="text-white" />
        <span className="text-sm font-bold text-white">Logout</span>
      </button>
    </div>
  );
}