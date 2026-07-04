import React from "react";
import { Loader2 } from "lucide-react";
import { COLORS, formatNum } from "./communityData";
import { useCommunityAnalytics } from "@/hooks/useCommunityAnalytics";

function Chart({ data, color, labels, height = 120 }) {
  const max = Math.max(...data, 1);
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
          <p className="text-base font-bold" style={{ color: COLORS.textPrimary }}>{typeof value === "string" ? value : formatNum(value)}</p>
        </div>
        {growth !== undefined && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${COLORS.emerald}15`, color: COLORS.emerald }}>
            {growth >= 0 ? "+" : ""}{growth}%
          </span>
        )}
      </div>
      <Chart data={data} color={color} labels={labels} height={80} />
    </div>
  );
}

function computeGrowth(arr) {
  if (!arr || arr.length < 2) return 0;
  const last = arr[arr.length - 1];
  const prev = arr[arr.length - 2];
  if (prev === 0) return last > 0 ? 100 : 0;
  return Math.round(((last - prev) / prev) * 1000) / 10;
}

export default function AnalyticsTab() {
  const { data: d, loading } = useCommunityAnalytics();

  if (loading || !d) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={24} className="animate-spin" style={{ color: COLORS.royalBlue }} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>📈 Community Analytics</h3>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLORS.emerald }} />
          <span className="text-[9px] font-semibold" style={{ color: COLORS.emerald }}>LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AnalyticsCard title="Daily Active Users" value={d.dailyActive[6]} growth={computeGrowth(d.dailyActive)} data={d.dailyActive} color={COLORS.royalBlue} labels={d.weeklyLabels} />
        <AnalyticsCard title="New Members" value={d.newMembers[6]} growth={computeGrowth(d.newMembers)} data={d.newMembers} color={COLORS.emerald} labels={d.weeklyLabels} />
        <AnalyticsCard title="Post Activity" value={d.postActivity[6]} growth={computeGrowth(d.postActivity)} data={d.postActivity} color={COLORS.skyBlue} labels={d.weeklyLabels} />
        <AnalyticsCard title="Engagement Rate" value={d.engagement[6] + "%"} growth={computeGrowth(d.engagement)} data={d.engagement} color={COLORS.gold} labels={d.weeklyLabels} />
        <AnalyticsCard title="Coin Transactions" value={d.coinTransactions[6]} growth={computeGrowth(d.coinTransactions)} data={d.coinTransactions} color={COLORS.amber} labels={d.weeklyLabels} />
        <AnalyticsCard title="Community Growth" value={d.totalCommunities} growth={computeGrowth(d.postActivity)} data={d.postActivity} color={COLORS.crimson} labels={d.weeklyLabels} />
      </div>

      {/* Summary metrics */}
      <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}` }}>
        <p className="text-[10px] font-bold mb-2" style={{ color: COLORS.textSecondary }}>📊 Weekly Summary</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "User Retention", value: `${d.userRetention}%`, color: COLORS.emerald },
            { label: "Group Performance", value: `${d.groupPerformance}`, color: COLORS.royalBlue },
            { label: "Gift Statistics", value: formatNum(d.giftStatistics), color: COLORS.amber },
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