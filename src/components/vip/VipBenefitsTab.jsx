import React from "react";
import { vipLevels } from "@/components/vip/vipData";
import { Check, Star, Crown, Gift, Shield } from "lucide-react";

const benefitCategories = [
  { icon: Crown, title: "Profile Identity", color: "text-amber-400", items: ["Luxury Profile Frame", "VIP Badge Display", "Name Color Effect", "Custom Profile Theme"] },
  { icon: Star, title: "Entry & Effects", color: "text-purple-400", items: ["Premium Entry Animation", "Chat Text Effects", "VIP Room Entrance", "Special Visual Effects"] },
  { icon: Gift, title: "Exclusive Rewards", color: "text-pink-400", items: ["Daily VIP Rewards", "Monthly Bonus Gifts", "Upgrade Rewards", "Special VIP Gifts"] },
  { icon: Shield, title: "Access & Priority", color: "text-cyan-400", items: ["VIP Lounge Access", "Priority Support", "VIP Events Access", "Ranking Boost"] },
];

export default function VipBenefitsTab() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-amber-300 text-center">🎁 VIP Benefits</h2>

      <div className="rounded-2xl p-4 bg-gradient-to-br from-amber-500/10 to-yellow-600/5 border border-amber-500/20">
        <p className="text-xs text-gray-300 text-center">
          Unlock exclusive premium benefits across all VIP levels. Higher levels unlock more luxurious privileges.
        </p>
      </div>

      {benefitCategories.map((cat, i) => (
        <div key={i} className="rounded-2xl p-4 bg-white/5 border border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <cat.icon size={16} className={cat.color} />
            <h3 className="text-sm font-bold text-gray-200">{cat.title}</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {cat.items.map((item, j) => (
              <div key={j} className="flex items-center gap-1.5 bg-black/20 rounded-lg p-2">
                <Check size={12} className="text-green-400 flex-shrink-0" />
                <span className="text-[11px] text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Level benefit summary */}
      <div className="rounded-2xl p-4 bg-white/5 border border-white/5">
        <h3 className="text-sm font-bold text-amber-300 mb-3">Benefits by Level</h3>
        <div className="space-y-2">
          {vipLevels.slice(0, 5).map((l) => (
            <div key={l.id} className="flex items-center gap-2">
              <span className="text-lg">{l.icon}</span>
              <span className="text-xs font-bold flex-shrink-0" style={{ color: l.color }}>{l.name}</span>
              <span className="text-[10px] text-gray-400 truncate">{l.benefits[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}