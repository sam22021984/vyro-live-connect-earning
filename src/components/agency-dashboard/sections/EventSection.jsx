import React from "react";
import { GlassCard, SectionHeader, ActionButton, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import { EVENTS_DATA } from "../../agency-dashboard/agencyDashboardData";

export default function EventSection() {
  return (
    <div className="space-y-4">
      <GlassCard>
        <SectionHeader title="Current Events" icon="🎉" />
        <div className="space-y-2">
          {EVENTS_DATA.current.map((e, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: `${e.color}10`, border: `1px solid ${e.color}20` }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${e.color}20` }}>{e.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-white">{e.title}</p>
                  <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{e.desc}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold" style={{ color: e.color }}>🎁 {e.reward}</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: "#EF444420", color: "#EF4444" }}>⏰ {e.daysLeft}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="PK Competitions" icon="⚔️" />
        <div className="space-y-2">
          {EVENTS_DATA.pkCompetitions.map((p, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm" style={{ background: `${p.color}15` }}>{p.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white">{p.title}</p>
                <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{p.teams} teams</p>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: p.status === "active" ? "#10B98120" : "#F59E0B20", color: p.status === "active" ? "#10B981" : "#F59E0B" }}>
                {p.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Upcoming Events" icon="📅" />
        <div className="space-y-2">
          {EVENTS_DATA.upcoming.map((e, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm" style={{ background: `${e.color}15` }}>{e.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white">{e.title}</p>
                <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{e.desc}</p>
              </div>
              <span className="text-[9px] font-bold" style={{ color: e.color }}>{e.date}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-3 gap-2">
          {EVENTS_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}