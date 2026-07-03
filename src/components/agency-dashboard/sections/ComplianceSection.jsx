import React from "react";
import { GlassCard, SectionHeader, ActionButton, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import { COMPLIANCE_DATA } from "../../agency-dashboard/agencyDashboardData";

export default function ComplianceSection() {
  return (
    <div className="space-y-4">
      <GlassCard className="text-center !p-4">
        <div className="text-3xl mb-1">🛡️</div>
        <h2 className="text-base font-bold text-white">Compliance Center</h2>
        <p className="text-[10px] mt-1" style={{ color: TEXT_MUTED }}>Monitor and maintain regulatory compliance</p>
      </GlassCard>

      <div>
        <SectionHeader title="Compliance Features" icon="🛡️" />
        <div className="space-y-2">
          {COMPLIANCE_DATA.features.map((f, i) => (
            <GlassCard key={i}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${f.color}15` }}>{f.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-white">{f.label}</p>
                  <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{f.desc}</p>
                </div>
                {f.count !== undefined && f.count > 0 && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold animate-pulse" style={{ background: `${f.color}20`, color: f.color }}>{f.count}</span>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-2 gap-2">
          {COMPLIANCE_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}