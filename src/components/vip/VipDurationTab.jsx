import React from "react";
import { durationPlans } from "@/components/vip/vipData";

export default function VipDurationTab() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-amber-300 text-center">📅 VIP Duration Plans</h2>

      <div className="space-y-3">
        {durationPlans.map((plan) => (
          <div
            key={plan.id}
            className="relative rounded-2xl p-4 bg-white/5 border border-white/5 overflow-hidden"
          >
            {plan.discount > 0 && (
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold">
                {plan.discount}% OFF
              </span>
            )}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-600/10 flex items-center justify-center text-2xl flex-shrink-0">
                {plan.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-300">{plan.name}</h3>
                <p className="text-[10px] text-gray-400">{plan.desc}</p>
              </div>
            </div>
            <button className="w-full mt-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0A0118] text-xs font-bold active:scale-95 transition">
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}