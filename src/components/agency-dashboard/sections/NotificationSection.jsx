import React from "react";
import { GlassCard, SectionHeader, ActionButton, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import { AGENCY_NOTIFICATIONS_DATA } from "../../agency-dashboard/agencyDashboardData";

export default function NotificationSection() {
  return (
    <div className="space-y-4">
      <div>
        <SectionHeader title="Categories" icon="📂" />
        <div className="grid grid-cols-3 gap-2">
          {AGENCY_NOTIFICATIONS_DATA.categories.map((c, i) => (
            <GlassCard key={i} className="text-center">
              <div className="text-xl mb-1">{c.icon}</div>
              <p className="text-[10px] font-bold text-white">{c.name}</p>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold inline-block mt-1" style={{ background: `${c.color}20`, color: c.color }}>{c.count} new</span>
            </GlassCard>
          ))}
        </div>
      </div>

      <GlassCard>
        <SectionHeader title="Recent Notifications" icon="🔔" />
        <div className="space-y-2">
          {AGENCY_NOTIFICATIONS_DATA.recent.map((n, i) => (
            <div key={i} className="flex items-start gap-3 py-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0" style={{ background: `${n.color}15` }}>{n.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-[11px] font-bold text-white">{n.title}</p>
                  {n.unread && <div className="w-1.5 h-1.5 rounded-full" style={{ background: n.color }} />}
                </div>
                <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{n.desc}</p>
                <p className="text-[8px] mt-0.5" style={{ color: TEXT_MUTED }}>{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-3 gap-2">
          <ActionButton label="Mark Read" icon="✅" color="#10B981" />
          <ActionButton label="Delete" icon="🗑️" color="#EF4444" />
          <ActionButton label="Settings" icon="⚙️" color="#64748B" />
        </div>
      </div>
    </div>
  );
}