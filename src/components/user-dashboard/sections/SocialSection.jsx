import React from "react";
import { GlassCard, SectionHeader, ActionButton, StatCard, TEXT_MUTED } from "../Shared";
import { SOCIAL_DATA } from "../userDashboardData";

export default function SocialSection() {
  return (
    <div className="space-y-4">
      <div>
        <SectionHeader title="Social Stats" icon="📊" />
        <div className="grid grid-cols-3 gap-2">
          {SOCIAL_DATA.stats.map((s, i) => (
            <StatCard key={i} label={s.label} value={s.value} icon={s.icon} color={s.color} />
          ))}
        </div>
      </div>

      <GlassCard>
        <SectionHeader title="Friends" icon="🤝" />
        <div className="space-y-2">
          {SOCIAL_DATA.friends.map((f, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="relative">
                <img src={f.avatar} alt={f.name} className="w-9 h-9 rounded-full object-cover" />
                {f.status === "online" && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ background: "#10B981", borderColor: "#0A0E1A" }} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white">{f.name}</p>
                <p className="text-[9px]" style={{ color: f.status === "online" ? "#10B981" : TEXT_MUTED }}>{f.status}</p>
              </div>
              <button className="text-[9px] px-2 py-1 rounded-full font-bold" style={{ background: "#3B82F620", color: "#3B82F6" }}>Message</button>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-3 gap-2">
          {SOCIAL_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}