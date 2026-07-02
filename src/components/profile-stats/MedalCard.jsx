import React from "react";
import { Eye, Share2, Check } from "lucide-react";
import { COLORS } from "./profileStatsData";

export default function MedalCard({ medal, onView, onEquip, onShare }) {
  return (
    <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background: COLORS.cardBg, border: medal.equipped ? `1px solid ${COLORS.gold}40` : "1px solid #EEF0F4" }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 relative"
        style={{ background: `${COLORS.gold}15`, border: `1px solid ${COLORS.gold}30` }}>
        {medal.icon}
        {medal.equipped && <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: COLORS.gold }}><Check size={11} className="text-white" /></div>}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold truncate" style={{ color: COLORS.navy }}>{medal.name}</h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${COLORS.gold}20`, color: COLORS.gold }}>Rank {medal.rank}</span>
          <span className="text-[10px]" style={{ color: COLORS.muted }}>🎁 {medal.reward}</span>
        </div>
        <p className="text-[9px] mt-0.5" style={{ color: COLORS.muted }}>{medal.earned_date}</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <button onClick={() => onView(medal)} className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg text-[9px] font-bold active:scale-95 transition"
          style={{ background: COLORS.white, color: COLORS.navy, border: "1px solid #E5E7EB" }}>
          <Eye size={10} /> View
        </button>
        {medal.equipped ? (
          <div className="py-1.5 px-2.5 rounded-lg text-[9px] font-bold text-center" style={{ background: `${COLORS.gold}20`, color: COLORS.gold }}>
            Equipped
          </div>
        ) : (
          <button onClick={() => onEquip(medal)} className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg text-[9px] font-bold text-white active:scale-95 transition"
            style={{ background: COLORS.primary }}>
            <Check size={10} /> Equip
          </button>
        )}
        <button onClick={() => onShare(medal)} className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg text-[9px] font-bold active:scale-95 transition justify-center"
          style={{ background: `${COLORS.gold}20`, color: COLORS.gold }}>
          <Share2 size={10} />
        </button>
      </div>
    </div>
  );
}