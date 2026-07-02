import React from "react";
import { Eye, Check, Sparkles } from "lucide-react";
import { COLORS } from "./tasksData";

export default function RewardCard({ reward, isClaimed, onClaim, onView, onUse }) {
  return (
    <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ background: `${reward.color}15`, border: `1px solid ${reward.color}30` }}>
        {reward.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold truncate" style={{ color: COLORS.navy }}>{reward.name}</h4>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${reward.color}20`, color: reward.color }}>{reward.type}</span>
          <span className="text-[9px] font-medium" style={{ color: COLORS.muted }}>{reward.rarity}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {isClaimed ? (
          <button onClick={() => onUse(reward)} className="flex items-center gap-1 py-1.5 px-3 rounded-lg text-[10px] font-bold active:scale-95 transition"
            style={{ background: COLORS.gold, color: COLORS.white }}>
            <Sparkles size={11} /> Use
          </button>
        ) : (
          <button onClick={() => onClaim(reward)} className="flex items-center gap-1 py-1.5 px-3 rounded-lg text-[10px] font-bold active:scale-95 transition"
            style={{ background: COLORS.primary, color: COLORS.white }}>
            <Check size={11} /> Claim
          </button>
        )}
        <button onClick={() => onView(reward)} className="flex items-center gap-1 py-1.5 px-3 rounded-lg text-[10px] font-bold active:scale-95 transition"
          style={{ background: COLORS.white, color: COLORS.navy, border: "1px solid #E5E7EB" }}>
          <Eye size={11} /> View
        </button>
      </div>
    </div>
  );
}