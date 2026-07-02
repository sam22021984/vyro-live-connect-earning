import React from "react";
import { hostCollections, hostLeaderboard, agencyStatus, monthlyTargets } from "@/components/levels/host/hostData";

export default function CollectionsTab() {
  return (
    <div className="space-y-5">
      {/* Host Collections */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Host Collections</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">Collection progress rings</p>
        <div className="grid grid-cols-2 gap-2.5">
          {hostCollections.map((c, i) => {
            const circumference = 2 * Math.PI * 28;
            const offset = circumference - (c.progress / 100) * circumference;
            return (
              <div key={i} className="rounded-2xl p-4 flex flex-col items-center" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: `1px solid ${c.color}25`, boxShadow: `0 4px 12px ${c.color}15` }}>
                <div className="relative w-20 h-20 mb-2">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#E5E7EB" strokeWidth="5" />
                    <circle cx="32" cy="32" r="28" fill="none" stroke={c.color} strokeWidth="5" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ filter: `drop-shadow(0 0 4px ${c.color}60)` }} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-2xl"><span style={{ filter: `drop-shadow(0 1px 2px ${c.color}50)` }}>{c.icon}</span></div>
                </div>
                <p className="text-xs font-bold text-gray-800">{c.name}</p>
                <p className="text-[10px] font-bold" style={{ color: c.color }}>{c.progress}%</p>
                <button className="mt-2 text-[9px] font-bold py-1 px-3 rounded-lg active:scale-95 transition" style={{ background: `${c.color}10`, color: c.color }}>View Collection</button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Host Leaderboard */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Host Leaderboard</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">Premium ranking overview</p>
        <div className="grid grid-cols-2 gap-2.5">
          {hostLeaderboard.map((l, i) => (
            <div key={i} className="rounded-2xl p-3" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: `1px solid ${l.color}30`, boxShadow: `0 4px 12px ${l.color}15` }}>
              <div className="flex items-center justify-between mb-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: `${l.color}15` }}>{l.icon}</div>
                <span className={`text-[9px] font-bold ${l.trend.startsWith("▲") ? "text-green-500" : "text-red-500"}`}>{l.trend}</span>
              </div>
              <p className="text-base font-bold" style={{ color: l.color }}>{l.value}</p>
              <p className="text-[9px] text-gray-400">{l.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Agency Status */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Agency Status</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">Current agency information</p>
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 4px 12px rgba(168,85,247,0.15)" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "#A855F715", border: "1px solid #A855F725" }}>🏢</div>
            <div>
              <p className="text-sm font-bold text-gray-800">{agencyStatus.name}</p>
              <p className="text-[10px] text-gray-400">{agencyStatus.status}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[{ l: "Rank", v: agencyStatus.rank, c: "#EF4444" }, { l: "Level", v: agencyStatus.level, c: "#FFC83D" }, { l: "Performance", v: agencyStatus.performance, c: "#22C55E" }].map((s, i) => (
              <div key={i} className="rounded-xl p-2 text-center" style={{ background: `${s.c}10`, border: `1px solid ${s.c}20` }}>
                <p className="text-[10px] font-bold" style={{ color: s.c }}>{s.v}</p>
                <p className="text-[8px] text-gray-400">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Target Center */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Monthly Target Center</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">Track your monthly goals</p>
        <div className="grid grid-cols-2 gap-2.5">
          {monthlyTargets.map((t, i) => (
            <div key={i} className="rounded-2xl p-3" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: `1px solid ${t.color}25` }}>
              <p className="text-[9px] text-gray-400 mb-1">{t.label}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-sm font-bold" style={{ color: t.color }}>{t.current}</span>
                <span className="text-[9px] text-gray-400">/ {t.target}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${t.progress}%`, background: t.color, boxShadow: `0 0 6px ${t.color}60` }} />
              </div>
              <p className="text-[9px] font-bold text-right mt-1" style={{ color: t.color }}>{t.progress}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}