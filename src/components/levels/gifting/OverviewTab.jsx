import React from "react";
import { giftingPerformance, giftingAnalytics } from "@/components/levels/gifting/giftingData";

function StatGrid({ title, subtitle, data }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">{title}</h3>
      <p className="text-[10px] text-gray-400 mb-3 px-1">{subtitle}</p>
      <div className="grid grid-cols-3 gap-2.5">
        {data.map((s, i) => (
          <div key={i} className="rounded-2xl p-3 text-center" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: `0 4px 12px ${s.color}15` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mx-auto mb-1.5" style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
              <span style={{ filter: `drop-shadow(0 1px 2px ${s.color}50)` }}>{s.icon}</span>
            </div>
            <p className="text-xs font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[8px] text-gray-400 font-medium leading-tight">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OverviewTab() {
  return (
    <div className="space-y-5">
      <StatGrid title="Gifting Performance Overview" subtitle="Coins, gifts & spending metrics" data={giftingPerformance} />
      <StatGrid title="Gifting Analytics" subtitle="Support insights & contribution" data={giftingAnalytics} />
    </div>
  );
}

export function AnalyticsTab() {
  return <StatGrid title="Gifting Analytics" subtitle="Detailed contribution insights" data={giftingAnalytics} />;
}