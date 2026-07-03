import React from "react";
import { GlassCard, SectionHeader, ActionButton, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import { AGENCY_SUPPORT_DATA } from "../../agency-dashboard/agencyDashboardData";

export default function SupportSection() {
  return (
    <div className="space-y-4">
      <GlassCard className="text-center !p-4">
        <div className="text-3xl mb-1">📞</div>
        <h2 className="text-base font-bold text-white">Support Center</h2>
        <p className="text-[10px] mt-1" style={{ color: TEXT_MUTED }}>Enterprise support 24/7</p>
      </GlassCard>

      <div>
        <SectionHeader title="Support Options" icon="🛎️" />
        <div className="space-y-2">
          {AGENCY_SUPPORT_DATA.options.map((o, i) => (
            <GlassCard key={i}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${o.color}15` }}>{o.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-white">{o.label}</p>
                  <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{o.desc}</p>
                </div>
                <span className="text-[10px]" style={{ color: TEXT_MUTED }}>›</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader title="Quick Actions" icon="⚡" />
        <div className="grid grid-cols-2 gap-2">
          {AGENCY_SUPPORT_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}