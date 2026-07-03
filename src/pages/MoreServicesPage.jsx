import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useBackNav } from "@/hooks/useBackNav";

// Only miscellaneous/admin services — profile, live, party, community items
// are accessed from their dedicated sections to avoid duplicates.
const services = [
  { name: "Settings", icon: "⚙️", gradient: "from-slate-400 to-gray-500", path: "/settings" },
  { name: "Support", icon: "🛟", gradient: "from-teal-400 to-cyan-500", path: "/support-center" },
  { name: "Apply Center", icon: "💼", gradient: "from-indigo-400 to-blue-500", path: "/apply-center" },
  { name: "Control Center", icon: "🎛️", gradient: "from-fuchsia-400 to-purple-500", path: "/control-center", highlight: true },
  { name: "VYRO Mall", icon: "🛒", gradient: "from-orange-400 to-red-500", path: "/vyro-mall", highlight: true },
  { name: "Creator Center", icon: "🎤", gradient: "from-rose-400 to-red-500", path: "/creator-center", highlight: true },
  { name: "Message Center", icon: "📨", gradient: "from-blue-400 to-sky-500", path: "/message-center" },
  { name: "Trust & Reputation", icon: "🛡️", gradient: "from-green-400 to-teal-500", path: "/trust-reputation" },
  { name: "Finance", icon: "💰", gradient: "from-amber-400 to-yellow-500", path: "/finance" },
  { name: "Tasks & Rewards", icon: "🎁", gradient: "from-teal-400 to-green-500", path: "/tasks-rewards" },
  { name: "Social", icon: "🤝", gradient: "from-purple-400 to-violet-500", path: "/social" },
  { name: "VIP Membership", icon: "👑", gradient: "from-yellow-400 to-amber-500", path: "/vip-membership", highlight: true },
  { name: "Level System", icon: "📊", gradient: "from-violet-400 to-purple-500", path: "/level-system", highlight: true },
];

export default function MoreServicesPage() {
  const navigate = useNavigate();
  const handleBack = useBackNav("/");

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition"
          >
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="text-base font-bold text-gray-800">More Services</h1>
        </div>

        {/* Services grid */}
        <div className="p-4">
          <div className="grid grid-cols-4 gap-2.5">
            {services.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => navigate(s.path)}
                className={`relative flex flex-col items-center justify-center gap-2 p-3 rounded-[20px] transition-all duration-200 active:scale-95 hover:scale-[1.05]
                  ${s.highlight
                    ? "bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/60"
                    : "bg-white/80 backdrop-blur-xl border border-white"
                  }`}
                style={{
                  boxShadow: s.highlight
                    ? "0 4px 12px rgba(245,158,11,0.15), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)"
                    : "0 4px 10px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                {s.highlight && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-300" />
                )}
                <div
                  className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center`}
                  style={{
                    boxShadow: "0 3px 8px rgba(0,0,0,0.18), inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -2px 4px rgba(0,0,0,0.12)",
                  }}
                >
                  <span className="text-xl" style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.2))" }}>{s.icon}</span>
                </div>
                <span className="text-[10px] font-semibold text-gray-700 text-center leading-tight">
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}