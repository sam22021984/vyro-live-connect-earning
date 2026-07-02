import React, { useState } from "react";

const sections = [
  {
    title: "Profile Frame",
    icon: "🖼️",
    options: ["Preview", "Apply", "Remove", "Change"],
  },
  {
    title: "VIP Badge",
    icon: "🏆",
    options: ["Activate", "Hide", "Change Style"],
  },
  {
    title: "Entry Animation",
    icon: "✨",
    options: ["Preview", "Activate", "Change"],
  },
  {
    title: "Chat Effect",
    icon: "💬",
    options: ["Enable", "Disable"],
  },
  {
    title: "Profile Theme",
    icon: "🎨",
    options: ["Change", "Save", "Reset"],
  },
];

export default function VipCustomizeTab() {
  const [actions, setActions] = useState({});

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-amber-300 text-center">🎨 VIP Customization</h2>

      <div className="text-center py-2">
        <div className="text-4xl mb-1">🎨</div>
        <h3 className="text-sm font-bold text-amber-300">VIP Design Studio</h3>
        <p className="text-xs text-gray-400">Customize your VIP experience</p>
      </div>

      {sections.map((sec, i) => (
        <div key={i} className="rounded-2xl p-4 bg-white/5 border border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{sec.icon}</span>
            <h3 className="text-sm font-bold text-gray-200">{sec.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {sec.options.map((opt, j) => {
              const key = `${i}-${j}`;
              const isActive = actions[key];
              return (
                <button
                  key={j}
                  onClick={() => setActions({ ...actions, [key]: !isActive })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition active:scale-95 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0A0118]"
                      : "bg-white/5 text-gray-300 border border-white/10"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}