import React from "react";
import { COLORS, FRIENDS_ACTIVITY, formatNum } from "./partyData";
import { useToast } from "@/components/ui/use-toast";

export default function FriendsTab() {
  const { toast } = useToast();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>👥 Friends Activity</h3>
        <span className="text-[9px]" style={{ color: COLORS.textSecondary }}>{FRIENDS_ACTIVITY.length} active</span>
      </div>

      {FRIENDS_ACTIVITY.map((f, i) => (
        <div key={i} className="rounded-2xl p-3 flex items-center gap-2.5" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div className="relative flex-shrink-0">
            <img src={f.friend.avatar} className="w-11 h-11 rounded-full object-cover" alt="" />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white" style={{ background: COLORS.emerald }} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>{f.friend.name}</span>
            <p className="text-[10px]" style={{ color: COLORS.textSecondary }}>is in "{f.room}"</p>
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: f.status === "Hosting" ? `${COLORS.gold}15` : `${COLORS.emerald}15`, color: f.status === "Hosting" ? COLORS.gold : COLORS.emerald }}>
              {f.status}
            </span>
          </div>
          <button
            onClick={() => toast({ title: `Joining ${f.friend.name}...` })}
            className="px-3 py-1.5 rounded-xl text-[10px] font-bold text-white transition active:scale-95"
            style={{ background: `linear-gradient(135deg, ${COLORS.royalBlue}, ${COLORS.skyBlue})` }}
          >
            Join
          </button>
        </div>
      ))}
    </div>
  );
}