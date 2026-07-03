import React, { useState } from "react";
import { GlassCard, SectionHeader, TEXT_MUTED, GOLD, BLUE } from "../Shared";
import { SETTINGS_DATA } from "../userDashboardData";

function SettingsGroup({ title, icon, items }) {
  return (
    <GlassCard>
      <SectionHeader title={title} icon={icon} />
      <div className="space-y-0">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2">
              <span className="text-sm">{item.icon}</span>
              <span className="text-[11px] text-white">{item.label}</span>
            </div>
            {item.status && <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: TEXT_MUTED }}>{item.status}</span>}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export default function SettingsSection() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="space-y-4">
      <GlassCard className="flex items-center justify-between !p-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎨</span>
          <span className="text-[11px] font-bold text-white">Dark Mode</span>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-10 h-5 rounded-full transition relative"
          style={{ background: darkMode ? GOLD : "rgba(255,255,255,0.1)" }}
        >
          <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: darkMode ? "22px" : "2px" }} />
        </button>
      </GlassCard>

      <SettingsGroup title="Account" icon="👤" items={SETTINGS_DATA.account} />
      <SettingsGroup title="Privacy" icon="🔒" items={SETTINGS_DATA.privacy} />
      <SettingsGroup title="Security" icon="🛡️" items={SETTINGS_DATA.security} />
      <SettingsGroup title="App" icon="📱" items={SETTINGS_DATA.app} />
    </div>
  );
}