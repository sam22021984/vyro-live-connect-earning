import React, { useState } from "react";

const settings = [
  { key: "auto_renewal", label: "Auto Renewal", desc: "Automatically renew VIP membership" },
  { key: "show_badge", label: "Show VIP Badge", desc: "Display VIP badge on profile" },
  { key: "show_frame", label: "Show Frame", desc: "Display VIP profile frame" },
  { key: "entry_effect", label: "Entry Effect", desc: "Show entry animation in rooms" },
  { key: "chat_effect", label: "Chat Effect", desc: "Enable VIP chat text effects" },
  { key: "privacy", label: "Privacy Settings", desc: "Control VIP visibility" },
];

export default function VipSettingsTab() {
  const [toggles, setToggles] = useState({
    auto_renewal: true,
    show_badge: true,
    show_frame: true,
    entry_effect: true,
    chat_effect: false,
    privacy: true,
  });

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-amber-300 text-center">⚙️ VIP Settings</h2>

      <div className="text-center py-2">
        <div className="text-4xl mb-1">⚙️</div>
        <h3 className="text-sm font-bold text-amber-300">VIP Control Panel</h3>
      </div>

      <div className="space-y-2.5">
        {settings.map((s) => (
          <div key={s.key} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex-1 mr-3">
              <h4 className="text-sm font-semibold text-gray-200">{s.label}</h4>
              <p className="text-[10px] text-gray-400">{s.desc}</p>
            </div>
            <button
              onClick={() => setToggles({ ...toggles, [s.key]: !toggles[s.key] })}
              className={`w-11 h-6 rounded-full transition-all duration-300 flex items-center ${
                toggles[s.key] ? "bg-gradient-to-r from-amber-400 to-yellow-500 justify-end" : "bg-white/10 justify-start"
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md mx-0.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}