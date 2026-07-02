import React from "react";
import { COLORS, FOLLOWING_ACTIVITY } from "./partyData";
import { useToast } from "@/components/ui/use-toast";

export default function FollowingTab() {
  const { toast } = useToast();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>⭐ Following Activity</h3>
        <span className="text-[9px]" style={{ color: COLORS.textSecondary }}>{FOLLOWING_ACTIVITY.length} updates</span>
      </div>

      {FOLLOWING_ACTIVITY.map((f, i) => (
        <div key={i} className="rounded-2xl p-3 flex items-center gap-2.5" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <img src={f.user.avatar} className="w-11 h-11 rounded-full object-cover flex-shrink-0" alt="" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>{f.user.name}</span>
              <span className="text-[7px] font-bold text-white px-1 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})` }}>{f.user.vip}</span>
            </div>
            <p className="text-[10px]" style={{ color: COLORS.textSecondary }}>{f.live ? "is live now in" : "is in"} "{f.room}"</p>
            {f.live && (
              <span className="inline-flex items-center gap-0.5 text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${COLORS.crimson}15`, color: COLORS.crimson }}>
                ● LIVE
              </span>
            )}
          </div>
          <button
            onClick={() => toast({ title: `Joining ${f.user.name}...` })}
            className="px-3 py-1.5 rounded-xl text-[10px] font-bold text-white transition active:scale-95"
            style={{ background: f.live ? `linear-gradient(135deg, ${COLORS.crimson}, ${COLORS.amber})` : COLORS.textSecondary }}
          >
            {f.live ? "Join Live" : "Join"}
          </button>
        </div>
      ))}
    </div>
  );
}