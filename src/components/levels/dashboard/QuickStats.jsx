import React from "react";
import { useLevelDashboard } from "@/hooks/useLevelDashboard";

export default function QuickStats() {
  const { quickStats, loading } = useLevelDashboard();

  if (loading && quickStats.length === 0) {
    return (
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Quick Stats</h3>
        <div className="grid grid-cols-3 gap-2.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl p-3 text-center animate-pulse" style={{ background: "#F5F7FA" }}>
              <div className="w-10 h-10 rounded-xl mx-auto mb-1.5 bg-gray-200" />
              <div className="h-4 w-12 mx-auto bg-gray-200 rounded mb-1" />
              <div className="h-2 w-16 mx-auto bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Quick Stats</h3>
      <p className="text-[10px] text-gray-400 mb-3 px-1">Live statistics overview</p>
      <div className="grid grid-cols-3 gap-2.5">
        {quickStats.map((s, i) => (
          <div key={i} className="rounded-2xl p-3 text-center" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: `0 4px 12px ${s.color}20, inset 0 1px 0 rgba(255,255,255,0.9)` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mx-auto mb-1.5" style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
              <span style={{ filter: `drop-shadow(0 1px 2px ${s.color}50)` }}>{s.icon}</span>
            </div>
            <p className="text-base font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[9px] text-gray-400 font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}