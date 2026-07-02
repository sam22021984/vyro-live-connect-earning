import React from "react";
import { COLORS, ANALYTICS_DATA, formatNum } from "./communityData";

function Chart({ data, color, labels, height = 120 }) {
  const max = Math.max(...data);
  return (
    <div>
      <div className="flex items-end justify-between gap-1.5" style={{ height }}>
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
            <div
              className="w-full rounded-t-lg transition-all duration-500"
              style={{
                height: `${(v / max) * 100}%`,
                background: `linear-gradient(to top, ${color}, ${color}80)`,
                boxShadow: `0 0 8px ${color}40`,
              }}
            />
            <span className="text-[8px] mt-1" style={{ color: COLORS.textSecondary }}>{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsCard({ title, value, growth, data, color, labels }) {
  return (
    <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-[10px]" style={{ color: COLORS.textSecondary }}>{title}</p>
          <p className="text-base font-bold" style={{ color: COLORS.textPrimary }}>{formatNum(value)}</p>
        </div>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${COLORS.emerald}15`, color: COLORS.emerald }}>+{growth}%</span>
      </div>
      <Chart data={data} color={color} labels={ANALYTICS_DATA.weeklyLabels} height={80} />
    </div>
  );
}

export default function AnalyticsTab() {
  const d = ANALYTICS_DATA;
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold px-1" style={{ color: COLORS.textPrimary }}>📈 Community Analytics</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AnalyticsCard title="Daily Active Users" value={d.dailyActive[6]} growth={15.3} data={d.dailyActive} color={COLORS.royalBlue} />
        <AnalyticsCard title="New Members" value={d.newMembers[6]} growth={22.1} data={d.newMembers} color={COLORS.emerald} />
        <AnalyticsCard title="Post Activity" value={d.postActivity[6]} growth={18.5} data={d.postActivity} color={COLORS.skyBlue} />
        <AnalyticsCard title="Engagement Rate" value={d.engagement[6] + "%"} growth={7.8} data={d.engagement} color={COLORS.gold} />
        <AnalyticsCard title="Coin Transactions" value={d.coinTransactions[6]} growth={25.7} data={d.coinTransactions} color={COLORS.amber} />
        <AnalyticsCard title="Community Growth" value={1248} growth={12.5} data={[800, 900, 1000, 1050, 1100, 1200, 1248]} color={COLORS.crimson} />
      </div>

      {/* Summary metrics */}
      <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}` }}>
        <p className="text-[10px] font-bold mb-2" style={{ color: COLORS.textSecondary }}>📊 Weekly Summary</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "User Retention", value: "87.2%", color: COLORS.emerald },
            { label: "Group Performance", value: "92.5%", color: COLORS.royalBlue },
            { label: "Gift Statistics", value: "78K", color: COLORS.amber },
          ].map((m) => (
            <div key={m.label} className="text-center p-2 rounded-xl" style={{ background: COLORS.bgPrimary }}>
              <p className="text-sm font-bold" style={{ color: m.color }}>{m.value}</p>
              <p className="text-[8px]" style={{ color: COLORS.textSecondary }}>{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}