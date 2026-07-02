import React from "react";
import { Lock, Share2, Gift, Eye } from "lucide-react";
import { COLORS } from "./tasksData";

export default function AchievementCard({ achievement, onView, onClaim, onShare }) {
  const statusConfig = {
    locked: { color: COLORS.muted, bg: "#E5E7EB" },
    in_progress: { color: COLORS.primary, bg: `${COLORS.primary}15` },
    unlocked: { color: COLORS.success, bg: `${COLORS.success}15` },
    claimed: { color: COLORS.gold, bg: `${COLORS.gold}15` },
  };
  const cfg = statusConfig[achievement.status] || statusConfig.locked;

  return (
    <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 relative"
        style={{ background: cfg.bg, border: `1px solid ${cfg.color}30`, opacity: achievement.status === "locked" ? 0.5 : 1 }}>
        {achievement.badge}
        {achievement.status === "locked" && <Lock size={12} className="absolute -bottom-1 -right-1 text-white rounded-full p-0.5" style={{ background: COLORS.muted }} />}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold truncate" style={{ color: COLORS.navy }}>{achievement.name}</h4>
        <p className="text-[10px] mb-1.5" style={{ color: COLORS.muted }}>{achievement.condition}</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#E5E7EB" }}>
            <div className="h-full rounded-full" style={{ width: `${achievement.progress}%`, background: cfg.color }} />
          </div>
          <span className="text-[9px] font-bold" style={{ color: cfg.color }}>{achievement.progress}%</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <button onClick={() => onView(achievement)} className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg text-[9px] font-bold active:scale-95 transition"
          style={{ background: COLORS.white, color: COLORS.navy, border: "1px solid #E5E7EB" }}>
          <Eye size={10} /> View
        </button>
        {achievement.status === "unlocked" ? (
          <button onClick={() => onClaim(achievement)} className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg text-[9px] font-bold text-white active:scale-95 transition"
            style={{ background: COLORS.success }}>
            <Gift size={10} /> Claim
          </button>
        ) : achievement.status === "claimed" ? (
          <button onClick={() => onShare(achievement)} className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg text-[9px] font-bold text-white active:scale-95 transition"
            style={{ background: COLORS.gold }}>
            <Share2 size={10} /> Share
          </button>
        ) : (
          <div className="py-1.5 px-2.5 rounded-lg text-[9px] font-bold text-center" style={{ background: "#E5E7EB", color: COLORS.muted }}>
            {achievement.status === "locked" ? "Locked" : "In Progress"}
          </div>
        )}
      </div>
    </div>
  );
}