import React from "react";
import { supporterCollections, giftingLeaderboard } from "@/components/levels/gifting/giftingData";

export default function CollectionsTab() {
  return (
    <div className="space-y-5">
      {/* Top Supporter Collection */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Top Supporter Collection</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">Supporter tier progress rings</p>
        <div className="grid grid-cols-2 gap-2.5">
          {supporterCollections.map((c, i) => {
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

      {/* Gifting Leaderboard */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Gifting Leaderboard</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">Premium ranking overview</p>
        <div className="grid grid-cols-2 gap-2.5">
          {giftingLeaderboard.map((l, i) => (
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
    </div>
  );
}