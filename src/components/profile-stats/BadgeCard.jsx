import React from "react";
import { Lock, Share2, Check, X } from "lucide-react";
import { COLORS } from "./profileStatsData";

const statusConfig = {
  locked: { color: COLORS.muted, bg: "#E5E7EB", label: "Locked" },
  unlocked: { color: COLORS.primary, bg: `${COLORS.primary}15`, label: "Unlocked" },
  active: { color: COLORS.success, bg: `${COLORS.success}15`, label: "Active" },
  expired: { color: COLORS.danger, bg: `${COLORS.danger}15`, label: "Expired" },
};

export default function BadgeCard({ badge, onView, onEquip, onRemove, onShare }) {
  const cfg = statusConfig[badge.status] || statusConfig.locked;
  const isLocked = badge.status === "locked";
  const isActive = badge.status === "active";

  return (
    <div className="rounded-2xl p-3 flex flex-col items-center text-center" style={{ background: COLORS.cardBg, border: `1px solid ${isActive ? `${COLORS.success}40` : "#EEF0F4"}` }}>
      <div className="relative mb-2">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: `${badge.color}15`, border: `1px solid ${badge.color}30`, opacity: isLocked ? 0.4 : 1 }}>
          {badge.icon}
        </div>
        {isLocked && <div className="absolute inset-0 flex items-center justify-center"><Lock size={16} style={{ color: COLORS.muted }} /></div>}
        {isActive && <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: COLORS.success }}><Check size={11} className="text-white" /></div>}
      </div>
      <h4 className="text-xs font-bold mb-0.5" style={{ color: COLORS.navy }}>{badge.name}</h4>
      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full mb-1.5" style={{ background: `${badge.color}20`, color: badge.color }}>{badge.level}</span>
      <span className="text-[9px] font-medium px-2 py-0.5 rounded-full mb-2" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
      <p className="text-[9px] mb-2" style={{ color: COLORS.muted }}>{badge.unlock_date}</p>
      <div className="flex gap-1.5 w-full">
        <button onClick={() => onView(badge)} disabled={isLocked}
          className="flex-1 py-1.5 rounded-lg text-[9px] font-bold active:scale-95 transition disabled:opacity-40"
          style={{ background: COLORS.white, color: COLORS.navy, border: "1px solid #E5E7EB" }}>
          View
        </button>
        {isActive ? (
          <button onClick={() => onRemove(badge)} className="flex-1 py-1.5 rounded-lg text-[9px] font-bold text-white active:scale-95 transition flex items-center justify-center gap-0.5" style={{ background: COLORS.danger }}>
            <X size={10} /> Remove
          </button>
        ) : (
          <button onClick={() => onEquip(badge)} disabled={isLocked}
            className="flex-1 py-1.5 rounded-lg text-[9px] font-bold text-white active:scale-95 transition disabled:opacity-40 flex items-center justify-center gap-0.5"
            style={{ background: COLORS.primary }}>
            <Check size={10} /> Equip
          </button>
        )}
        <button onClick={() => onShare(badge)} disabled={isLocked}
          className="py-1.5 px-2 rounded-lg text-[9px] font-bold active:scale-95 transition disabled:opacity-40"
          style={{ background: `${COLORS.gold}20`, color: COLORS.gold }}>
          <Share2 size={11} />
        </button>
      </div>
    </div>
  );
}