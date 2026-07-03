import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const settingsList = [
  { name: "App Settings", icon: "⚙️", color: "from-slate-400 to-gray-500" },
  { name: "Device Settings", icon: "📱", color: "from-blue-400 to-cyan-500" },
  { name: "Privacy Settings", icon: "🔒", color: "from-purple-400 to-pink-500" },
  { name: "Language Settings", icon: "🌐", color: "from-green-400 to-emerald-500" },
  { name: "Notification Settings", icon: "🔔", color: "from-red-400 to-orange-500" },
  { name: "Storage & Data", icon: "💾", color: "from-purple-400 to-violet-500" },
  { name: "About Application", icon: "ℹ️", color: "from-sky-400 to-blue-500" },
  { name: "Account Actions", icon: "👤", color: "from-indigo-400 to-blue-500" },
  { name: "Security Settings", icon: "🛡️", color: "from-green-400 to-teal-500" },
  { name: "Legal & Policies", icon: "📜", color: "from-amber-400 to-yellow-500" },
  { name: "Developer Options", icon: "🧪", color: "from-fuchsia-400 to-purple-500" },
];

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition"
          >
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="text-base font-bold text-gray-800">Settings</h1>
        </div>

        {/* 3-column grid */}
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3">
            {settingsList.map((s, i) => (
              <button
                key={i}
                onClick={() => navigate(`/settings/${i}`, { state: { name: s.name, icon: s.icon } })}
                className="flex flex-col items-center gap-2.5 p-4 rounded-[20px] bg-white border border-gray-50 active:scale-95 transition shadow-sm hover:shadow-md"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center`}
                  style={{ boxShadow: "0 3px 8px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.3)" }}
                >
                  <span className="text-xl">{s.icon}</span>
                </div>
                <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight">
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