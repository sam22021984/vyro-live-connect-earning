import React from "react";
import { giftingLeaderboard, giftingHistory } from "@/components/levels/gifting/giftingData";

export default function LeaderboardTab() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Gifting Leaderboard</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">Global & regional rankings</p>
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

      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Gifting History</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">Recent activity log</p>
        <div className="rounded-2xl p-3 space-y-2.5" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: "1px solid rgba(255,255,255,0.9)" }}>
          {giftingHistory.map((h, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{ background: `${h.color}15`, border: `1px solid ${h.color}25` }}>{h.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-gray-800 truncate">{h.desc}</p>
                <p className="text-[9px] text-gray-400">{h.type} • {h.date}</p>
              </div>
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-md" style={{ background: `${h.color}15`, color: h.color }}>{h.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}