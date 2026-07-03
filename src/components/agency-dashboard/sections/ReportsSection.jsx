import React from "react";
import { GlassCard, SectionHeader, ActionButton, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import { REPORTS_DATA } from "../../agency-dashboard/agencyDashboardData";

export default function ReportsSection() {
  return (
    <div className="space-y-4">
      <GlassCard>
        <SectionHeader title="Available Reports" icon="📄" />
        <div className="grid grid-cols-2 gap-2">
          {REPORTS_DATA.reports.map((r, i) => (
            <div key={i} className="flex items-center gap-2 p-3 rounded-xl" style={{ background: `${r.color}08`, border: `1px solid ${r.color}15` }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: `${r.color}15` }}>{r.icon}</div>
              <span className="text-[10px] font-bold text-white">{r.label}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Export Actions" icon="📤" />
        <div className="grid grid-cols-2 gap-2">
          {REPORTS_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}