import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

const settings = [
  { name: "App Settings", icon: "⚙️", color: "from-slate-400 to-gray-500" },
  { name: "Device Settings", icon: "📱", color: "from-blue-400 to-cyan-500" },
  { name: "Language Settings", icon: "🌐", color: "from-green-400 to-emerald-500" },
  { name: "Notification Settings", icon: "🔔", color: "from-red-400 to-orange-500" },
  { name: "Storage & Data", icon: "💾", color: "from-purple-400 to-violet-500" },
  { name: "About Application", icon: "ℹ️", color: "from-sky-400 to-blue-500" },
  { name: "Account Actions", icon: "👤", color: "from-indigo-400 to-blue-500" },
  { name: "Security Settings", icon: "🛡️", color: "from-green-400 to-teal-500" },
  { name: "Legal & Policies", icon: "📜", color: "from-amber-400 to-yellow-500" },
  { name: "Developer Options", icon: "🧪", color: "from-fuchsia-400 to-purple-500" },
];

export default function SettingsSection() {
  const [tapped, setTapped] = useState(null);

  return (
    <div className="px-4 mb-4">
      <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">⚙️</span>
          <h3 className="text-sm font-bold text-gray-800">Settings</h3>
        </div>

        <div className="space-y-1">
          {settings.map((s, i) => (
            <button
              key={i}
              onPointerDown={() => setTapped(i)}
              onPointerUp={() => setTapped(null)}
              onPointerLeave={() => setTapped(null)}
              className={`w-full flex items-center gap-3 p-3 rounded-[14px] transition-all duration-300
                ${tapped === i ? "scale-[0.98] bg-gray-100" : "hover:bg-gray-50"}`}
            >
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}
                style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.3)" }}
              >
                <span className="text-base">{s.icon}</span>
              </div>
              <span className="flex-1 text-left text-sm font-medium text-gray-700">{s.name}</span>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}