import React from "react";
import { Gift, Clock, Check } from "lucide-react";

const rewards = [
  { name: "Daily VIP Reward", icon: "🎁", desc: "500 coins + 1 VIP gift", status: "available" },
  { name: "Monthly Reward", icon: "📅", desc: "5,000 coins + Premium frame", status: "available" },
  { name: "Upgrade Reward", icon: "⬆️", desc: "10,000 coins + Exclusive badge", status: "locked" },
  { name: "Special VIP Gift", icon: "💝", desc: "Luxury gift chest", status: "available" },
  { name: "Anniversary Bonus", icon: "🎉", desc: "50,000 coins + Legendary frame", status: "locked" },
];

export default function VipRewardsTab() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-amber-300 text-center">🎁 VIP Reward Center</h2>

      <div className="text-center py-4">
        <div className="text-5xl mb-2">🎁</div>
        <h3 className="text-sm font-bold text-amber-300">Luxury Gift Chest</h3>
        <p className="text-xs text-gray-400 mt-1">Claim your exclusive VIP rewards</p>
      </div>

      <div className="space-y-2.5">
        {rewards.map((r, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-600/10 flex items-center justify-center text-2xl flex-shrink-0">
              {r.icon}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-gray-200">{r.name}</h4>
              <p className="text-[10px] text-gray-400">{r.desc}</p>
            </div>
            {r.status === "available" ? (
              <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0A0118] text-xs font-bold active:scale-95 transition">
                Claim
              </button>
            ) : (
              <span className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-500 text-xs font-bold flex items-center gap-1">
                <Clock size={12} /> Locked
              </span>
            )}
          </div>
        ))}
      </div>

      <button className="w-full py-3 rounded-xl bg-white/5 border border-amber-500/20 text-amber-300 text-sm font-bold active:scale-95 transition">
        View Reward History
      </button>
    </div>
  );
}