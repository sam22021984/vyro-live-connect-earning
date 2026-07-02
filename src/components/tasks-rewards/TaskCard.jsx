import React from "react";
import { Clock, ChevronRight } from "lucide-react";
import { COLORS } from "./tasksData";

const statusConfig = {
  not_started: { label: "Start Task", color: COLORS.primary, bg: COLORS.primary },
  in_progress: { label: "Go Complete", color: COLORS.white, bg: COLORS.gold },
  completed: { label: "Claim Reward", color: COLORS.white, bg: COLORS.success },
  claimed: { label: "Claimed", color: COLORS.muted, bg: "#E5E7EB" },
  expired: { label: "Expired", color: COLORS.white, bg: COLORS.danger },
};

export default function TaskCard({ task, onAction, onView }) {
  const cfg = statusConfig[task.status] || statusConfig.not_started;
  const pct = Math.min(100, Math.round((task.progress / task.target) * 100));

  return (
    <div className="rounded-2xl p-3.5 mb-3" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-base">{task.reward_icon}</span>
          <span className="text-xs font-bold" style={{ color: COLORS.gold }}>{task.reward_amount} {task.reward_type}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={11} style={{ color: COLORS.muted }} />
          <span className="text-[10px] font-medium" style={{ color: COLORS.muted }}>{task.time_left}</span>
        </div>
      </div>

      <h4 className="text-sm font-bold mb-0.5" style={{ color: COLORS.navy }}>{task.title}</h4>
      <p className="text-[11px] mb-2.5" style={{ color: COLORS.muted }}>{task.description}</p>

      <div className="mb-2.5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-medium" style={{ color: COLORS.muted }}>Progress</span>
          <span className="text-[10px] font-bold" style={{ color: COLORS.primary }}>
            {task.progress}/{task.target} • {pct}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#E5E7EB" }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.primary}cc)` }} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => onView(task)} className="flex items-center gap-1 py-2 px-3 rounded-xl text-[11px] font-bold active:scale-95 transition" style={{ background: COLORS.white, color: COLORS.navy, border: "1px solid #E5E7EB" }}>
          Details <ChevronRight size={12} />
        </button>
        {cfg.label !== "Claimed" && cfg.label !== "Expired" && (
          <button
            onClick={() => onAction(task)}
            className="flex-1 py-2 rounded-xl text-[11px] font-bold active:scale-95 transition"
            style={{ background: cfg.bg, color: cfg.color }}
          >
            {cfg.label}
          </button>
        )}
        {(cfg.label === "Claimed" || cfg.label === "Expired") && (
          <div className="flex-1 py-2 rounded-xl text-[11px] font-bold text-center" style={{ background: cfg.bg, color: cfg.color }}>
            {cfg.label}
          </div>
        )}
      </div>
    </div>
  );
}