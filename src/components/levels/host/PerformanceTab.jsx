import React from "react";
import { useLevelSubDashboard } from "@/hooks/useLevelSubDashboard";
import { Loader2 } from "lucide-react";

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

function LoadingState() {
  return (
    <div className="flex justify-center py-12">
      <Loader2 className="w-6 h-6 animate-spin text-red-500" />
    </div>
  );
}

export default function PerformanceTab() {
  const { performance, livePerf, roomPerf, loading } = useLevelSubDashboard("host");

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-5">
      <StatGrid title="Host Performance Overview" subtitle="Live earnings & revenue metrics" data={performance} />
      <StatGrid title="Live Stream Performance" subtitle="Streaming hours & consistency" data={livePerf} />
      <StatGrid title="Room Performance" subtitle="Room visits & popularity" data={roomPerf} />
    </div>
  );
}

export function AudienceTab() {
  const { audience, loading } = useLevelSubDashboard("host");
  if (loading) return <LoadingState />;
  return <StatGrid title="Audience Analytics" subtitle="Live follower & viewer insights" data={audience} />;
}