import React from "react";
import { FINANCE_COLORS, REPORT_CATEGORIES, NOTIFICATIONS } from "./financeData";

const COLOR_MAP = {
  emerald: { bg: `${FINANCE_COLORS.emerald}10`, border: `${FINANCE_COLORS.emerald}30`, text: FINANCE_COLORS.emerald },
  royalBlue: { bg: `${FINANCE_COLORS.royalBlue}10`, border: `${FINANCE_COLORS.royalBlue}30`, text: FINANCE_COLORS.royalBlue },
  gold: { bg: `${FINANCE_COLORS.gold}10`, border: `${FINANCE_COLORS.gold}30`, text: FINANCE_COLORS.gold },
  error: { bg: `${FINANCE_COLORS.error}10`, border: `${FINANCE_COLORS.error}30`, text: FINANCE_COLORS.error },
  info: { bg: `${FINANCE_COLORS.info}10`, border: `${FINANCE_COLORS.info}30`, text: FINANCE_COLORS.info },
};

export default function ReportsView() {
  return (
    <div className="space-y-4">
      {/* Report categories */}
      <div className="grid grid-cols-2 gap-3">
        {REPORT_CATEGORIES.map((cat, i) => {
          const c = COLOR_MAP[cat.color] || COLOR_MAP.emerald;
          return (
            <div
              key={i}
              className="rounded-2xl p-3.5"
              style={{
                background: FINANCE_COLORS.card,
                boxShadow: "0 2px 12px rgba(15,27,61,0.06)",
                border: `1px solid ${FINANCE_COLORS.border}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                  <span className="text-sm">{cat.icon}</span>
                </div>
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: c.bg, color: c.text }}>
                  {cat.change}
                </span>
              </div>
              <p className="text-[9px] font-semibold" style={{ color: FINANCE_COLORS.textSecondary }}>{cat.label}</p>
              <p className="text-base font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>{cat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Notifications */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: FINANCE_COLORS.card,
          boxShadow: "0 2px 12px rgba(15,27,61,0.06)",
          border: `1px solid ${FINANCE_COLORS.border}`,
        }}
      >
        <div className="px-4 py-3" style={{ borderBottom: `1px solid ${FINANCE_COLORS.border}` }}>
          <h3 className="text-sm font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>🔔 Finance Notifications</h3>
        </div>
        <div className="divide-y" style={{ borderColor: FINANCE_COLORS.border }}>
          {NOTIFICATIONS.map((n, i) => {
            const nColor = n.status === "success" ? FINANCE_COLORS.success : n.status === "warning" ? FINANCE_COLORS.warning : n.status === "error" ? FINANCE_COLORS.error : FINANCE_COLORS.info;
            return (
              <div key={i} className="flex items-start gap-3 px-4 py-3" style={{ background: "rgba(245,247,250,0.5)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${nColor}15` }}>
                  <span className="text-sm">{n.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: nColor }} />
                    <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>{n.title}</p>
                  </div>
                  <p className="text-[9px] mt-0.5" style={{ color: FINANCE_COLORS.textSecondary }}>{n.desc}</p>
                  <p className="text-[8px] mt-1" style={{ color: FINANCE_COLORS.textSecondary }}>{n.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}