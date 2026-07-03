import React from "react";
import { GlassCard, SectionHeader, ActionButton, StatCard, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import { RECRUITMENT_DATA } from "../../agency-dashboard/agencyDashboardData";

export default function RecruitmentSection() {
  return (
    <div className="space-y-4">
      <div>
        <SectionHeader title="Recruitment Statistics" icon="📊" />
        <div className="grid grid-cols-2 gap-2">
          {RECRUITMENT_DATA.stats.map((s, i) => (
            <StatCard key={i} label={s.label} value={s.value} icon={s.icon} color={s.color} />
          ))}
        </div>
      </div>

      <GlassCard>
        <SectionHeader title="Recent Applicants" icon="📋" />
        <div className="space-y-2">
          {RECRUITMENT_DATA.applicants.map((a, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <img src={a.avatar} alt={a.name} className="w-9 h-9 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white">{a.name}</p>
                <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{a.country} · {a.date}</p>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: a.status === "pending" ? "#F59E0B20" : "#10B98120", color: a.status === "pending" ? "#F59E0B" : "#10B981" }}>
                {a.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-3 gap-2">
          {RECRUITMENT_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}