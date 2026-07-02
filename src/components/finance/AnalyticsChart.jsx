import React from "react";
import { FINANCE_COLORS, REVENUE_DATA } from "./financeData";

export default function AnalyticsChart() {
  const maxVal = Math.max(...REVENUE_DATA.map((d) => d.revenue));

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: FINANCE_COLORS.card,
        boxShadow: "0 2px 12px rgba(15,27,61,0.06), 0 1px 3px rgba(0,0,0,0.03)",
        border: `1px solid ${FINANCE_COLORS.border}`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>Revenue vs Expenses</h3>
          <p className="text-[9px]" style={{ color: FINANCE_COLORS.textSecondary }}>Last 12 months overview</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: FINANCE_COLORS.emerald }} />
            <span className="text-[8px] font-semibold" style={{ color: FINANCE_COLORS.textSecondary }}>Revenue</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: FINANCE_COLORS.royalBlue }} />
            <span className="text-[8px] font-semibold" style={{ color: FINANCE_COLORS.textSecondary }}>Expenses</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between gap-1 h-32">
        {REVENUE_DATA.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex items-end justify-center gap-0.5 h-24">
              <div
                className="rounded-t-sm transition-all"
                style={{
                  height: `${(d.revenue / maxVal) * 100}%`,
                  background: `linear-gradient(to top, ${FINANCE_COLORS.emeraldDark}, ${FINANCE_COLORS.emerald})`,
                  width: "45%",
                }}
              />
              <div
                className="rounded-t-sm transition-all"
                style={{
                  height: `${(d.expenses / maxVal) * 100}%`,
                  background: `linear-gradient(to top, ${FINANCE_COLORS.royalBlueDark}, ${FINANCE_COLORS.royalBlue})`,
                  width: "45%",
                }}
              />
            </div>
            <span className="text-[7px] font-medium" style={{ color: FINANCE_COLORS.textSecondary }}>{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}