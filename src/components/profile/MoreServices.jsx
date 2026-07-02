import React, { useState } from "react";
import { LogOut, ChevronRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

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

function ServiceCard({ service }) {
  const [tapped, setTapped] = useState(false);
  return (
    <button
      onPointerDown={() => setTapped(true)}
      onPointerUp={() => setTapped(false)}
      onPointerLeave={() => setTapped(false)}
      className={`relative flex flex-col items-center justify-center gap-2 p-3 rounded-[20px] transition-all duration-300
        ${tapped ? "scale-95" : "hover:scale-[1.03] hover:shadow-lg"}
        ${service.highlight
          ? "bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/60 shadow-sm shadow-amber-100/50"
          : "bg-white/70 backdrop-blur-xl border border-white/80 shadow-sm shadow-gray-100/50"
        }`}
    >
      {service.highlight && (
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
      )}
      <div
        className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-md transition-shadow duration-300 ${tapped ? "shadow-none" : "shadow-md"}`}
      >
        <span className="text-xl">{service.icon}</span>
      </div>
      <span className="text-[10px] font-semibold text-gray-700 text-center leading-tight">
        {service.name}
      </span>
    </button>
  );
}

export default function MoreServices() {
  const handleLogout = async () => {
    await base44.auth.logout("/login");
  };

  return (
    <div className="px-4 mb-8">
      {/* More Services Card */}
      <div className="bg-gradient-to-br from-white/80 to-amber-50/40 backdrop-blur-xl rounded-[24px] p-4 shadow-sm border border-amber-100/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-200 to-yellow-300 flex items-center justify-center">
              <span className="text-xs">✨</span>
            </div>
            <h3 className="text-sm font-bold text-gray-800">More Services</h3>
          </div>
          <ChevronRight size={16} className="text-amber-400" />
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} />
          ))}
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