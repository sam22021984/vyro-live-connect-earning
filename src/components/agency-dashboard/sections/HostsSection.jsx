import React from "react";
import { GlassCard, SectionHeader, ActionButton, StatCard, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import { HOSTS_DATA } from "../../agency-dashboard/agencyDashboardData";

export default function HostsSection() {
  return (
    <div className="space-y-4">
      <div>
        <SectionHeader title="Host Statistics" icon="📊" />
        <div className="grid grid-cols-3 gap-2">
          {HOSTS_DATA.stats.map((s, i) => (
            <StatCard key={i} label={s.label} value={s.value} icon={s.icon} color={s.color} />
          ))}
        </div>
      </div>

      <GlassCard>
        <SectionHeader title="Host List" icon="🎤" />
        <div className="space-y-2">
          {HOSTS_DATA.hosts.map((h, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="relative">
                <img src={h.avatar} alt={h.name} className="w-9 h-9 rounded-full object-cover" />
                {h.status === "live" && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 animate-pulse" style={{ background: "#EF4444", borderColor: "#0A0E1A" }} />}
                {h.status === "online" && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ background: "#10B981", borderColor: "#0A0E1A" }} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white">{h.name}</p>
                <p className="text-[9px]" style={{ color: TEXT_MUTED }}>Agent: {h.agent} · {h.earnings}</p>
              </div>
              {h.status === "live" && (
                <div className="text-right">
                  <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold animate-pulse" style={{ background: "#EF444420", color: "#EF4444" }}>● LIVE</span>
                  <p className="text-[9px] mt-0.5" style={{ color: TEXT_MUTED }}>{h.viewers}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-3 gap-2">
          {HOSTS_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}