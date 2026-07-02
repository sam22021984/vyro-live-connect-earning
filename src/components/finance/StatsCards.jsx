import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { FINANCE_COLORS, STATS_CARDS } from "./financeData";

const COLOR_MAP = {
  emerald: { bg: `${FINANCE_COLORS.emerald}10`, border: `${FINANCE_COLORS.emerald}30`, text: FINANCE_COLORS.emerald },
  royalBlue: { bg: `${FINANCE_COLORS.royalBlue}10`, border: `${FINANCE_COLORS.royalBlue}30`, text: FINANCE_COLORS.royalBlue },
  gold: { bg: `${FINANCE_COLORS.gold}10`, border: `${FINANCE_COLORS.gold}30`, text: FINANCE_COLORS.gold },
  error: { bg: `${FINANCE_COLORS.error}10`, border: `${FINANCE_COLORS.error}30`, text: FINANCE_COLORS.error },
};

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {STATS_CARDS.map((stat) => {
        const c = COLOR_MAP[stat.color] || COLOR_MAP.emerald;
        return (
          <div
            key={stat.id}
            className="rounded-2xl p-3.5"
            style={{
              background: FINANCE_COLORS.card,
              boxShadow: "0 2px 12px rgba(15,27,61,0.06), 0 1px 3px rgba(0,0,0,0.03)",
              border: `1px solid ${FINANCE_COLORS.border}`,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: c.bg, border: `1px solid ${c.border}` }}
              >
                <span className="text-base">{stat.icon}</span>
              </div>
              <div
                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full"
                style={{ background: stat.trend === "up" ? `${FINANCE_COLORS.success}15` : `${FINANCE_COLORS.error}15` }}
              >
                {stat.trend === "up" ? (
                  <TrendingUp size={10} style={{ color: FINANCE_COLORS.success }} />
                ) : (
                  <TrendingDown size={10} style={{ color: FINANCE_COLORS.error }} />
                )}
                <span className="text-[8px] font-bold" style={{ color: stat.trend === "up" ? FINANCE_COLORS.success : FINANCE_COLORS.error }}>
                  {stat.change}
                </span>
              </div>
            </div>
            <p className="text-[9px] font-semibold mb-0.5" style={{ color: FINANCE_COLORS.textSecondary }}>
              {stat.label}
            </p>
            <p className="text-lg font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}