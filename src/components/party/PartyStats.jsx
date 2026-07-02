import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { COLORS, STATS, formatNum } from "./partyData";

function StatCard({ stat }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 800;
    const steps = 25;
    const increment = stat.value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= stat.value) { setCount(stat.value); clearInterval(interval); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(interval);
  }, [stat.value]);

  return (
    <div className="rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: `${stat.color}15` }}>{stat.icon}</div>
        <span className="text-[8px] font-bold px-1 py-0.5 rounded-full" style={{ background: `${COLORS.emerald}15`, color: COLORS.emerald }}>
          <TrendingUp size={8} className="inline" /> Live
        </span>
      </div>
      <p className="text-sm font-bold" style={{ color: COLORS.textPrimary }}>{formatNum(count)}</p>
      <p className="text-[8px]" style={{ color: COLORS.textSecondary }}>{stat.label}</p>
    </div>
  );
}

export default function PartyStats() {
  return (
    <div>
      <h3 className="text-xs font-bold mb-2 px-1" style={{ color: COLORS.textPrimary }}>📊 Dashboard Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {STATS.map((s) => <StatCard key={s.label} stat={s} />)}
      </div>
    </div>
  );
}