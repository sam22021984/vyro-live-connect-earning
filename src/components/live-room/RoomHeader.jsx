import React from "react";
import { ArrowLeft, MoreVertical, Users } from "lucide-react";
import { COLORS } from "./roomData";

export default function RoomHeader({ roomTitle, level, xp, xpMax, onlineCount, onBack }) {
  const xpPercent = Math.min((xp / xpMax) * 100, 100);

  return (
    <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-3 pb-2" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)" }}>
      <div className="flex items-center gap-2.5">
        <button onClick={onBack} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <ArrowLeft size={18} className="text-white" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm font-bold text-white truncate">{roomTitle}</h1>
            <span className="text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full flex items-center gap-0.5" style={{ background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.electricBlue})` }}>
              LV.{level}
            </span>
          </div>
          {/* XP bar */}
          <div className="mt-1 flex items-center gap-1.5">
            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${xpPercent}%`, background: `linear-gradient(to right, ${COLORS.gold}, ${COLORS.goldLight})`, boxShadow: `0 0 6px ${COLORS.gold}80` }} />
            </div>
            <span className="text-[8px] text-white/60 font-semibold">{xp.toLocaleString()}/{xpMax.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <Users size={12} className="text-white" />
          <span className="text-[10px] font-bold text-white">{onlineCount.toLocaleString()}</span>
        </div>

        <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <MoreVertical size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
}