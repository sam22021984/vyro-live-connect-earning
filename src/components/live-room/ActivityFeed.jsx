import React from "react";
import { Gift, LogIn, Crown } from "lucide-react";
import { COLORS, ACTIVITY_FEED } from "./roomData";

const TYPE_CONFIG = {
  join: { icon: LogIn, color: COLORS.emerald, bg: `${COLORS.emerald}20` },
  gift: { icon: Gift, color: COLORS.gold, bg: `${COLORS.gold}20` },
  vip: { icon: Crown, color: COLORS.gold, bg: `${COLORS.gold}20` },
};

export default function ActivityFeed() {
  return (
    <div className="absolute top-16 left-2 z-20 w-36 space-y-1.5">
      {ACTIVITY_FEED.slice(0, 4).map((item, i) => {
        const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.join;
        return (
          <div
            key={i}
            className="flex items-center gap-1.5 rounded-full pl-1 pr-2 py-1 animate-fadeIn"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="relative flex-shrink-0">
              <img src={item.avatar} className="w-5 h-5 rounded-full object-cover" alt="" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: cfg.bg, border: "1px solid rgba(0,0,0,0.3)" }}>
                <cfg.icon size={7} style={{ color: cfg.color }} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[7px] font-bold text-white truncate">{item.user}</p>
              <p className="text-[6px] truncate" style={{ color: cfg.color }}>{item.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}