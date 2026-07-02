import React from "react";

const historyItems = [
  { type: "Purchase", icon: "💳", desc: "MISSVIP - 12 Months", date: "Apr 15, 2025", amount: "$500" },
  { type: "Upgrade", icon: "⬆️", desc: "MISVIP → MISSVIP", date: "Mar 02, 2025", amount: "3M coins" },
  { type: "Reward", icon: "🎁", desc: "Monthly VIP Reward", date: "Apr 01, 2025", amount: "+5,000 coins" },
  { type: "Purchase", icon: "💳", desc: "MISVIP - 6 Months", date: "Sep 10, 2024", amount: "$250" },
  { type: "Upgrade", icon: "⬆️", desc: "MSSVIP → MISVIP", date: "Aug 05, 2024", amount: "1M coins" },
];

export default function VipHistoryTab() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-amber-300 text-center">📊 VIP History</h2>

      <div className="text-center py-2">
        <div className="text-4xl mb-1">📊</div>
        <h3 className="text-sm font-bold text-amber-300">VIP Analytics</h3>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-2.5">
        {[
          { label: "Total Purchases", value: "3" },
          { label: "Total Upgrades", value: "2" },
          { label: "Rewards Claimed", value: "12" },
          { label: "Active Benefits", value: "8" },
        ].map((s, i) => (
          <div key={i} className="rounded-xl p-3 bg-white/5 border border-white/5 text-center">
            <p className="text-lg font-bold text-amber-300">{s.value}</p>
            <p className="text-[10px] text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* History list */}
      <div className="space-y-2.5">
        {historyItems.map((h, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-600/10 flex items-center justify-center text-xl flex-shrink-0">
              {h.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-300">{h.type}</span>
                <span className="text-[10px] text-gray-500">{h.date}</span>
              </div>
              <p className="text-[11px] text-gray-300">{h.desc}</p>
            </div>
            <span className="text-xs font-bold text-gray-200">{h.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}