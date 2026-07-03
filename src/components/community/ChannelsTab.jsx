import React from "react";
import { Loader2, BadgeCheck, Bell, BellOff, Plus } from "lucide-react";
import { COLORS } from "./communityData";
import { useToast } from "@/components/ui/use-toast";

export default function ChannelsTab({ channels = [], loading }) {
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: COLORS.royalBlue }} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>📢 Official Channels</h3>
        <button onClick={() => toast({ title: "Create channel" })} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold text-white" style={{ background: COLORS.royalBlue }}>
          <Plus size={11} /> Follow
        </button>
      </div>
      <div className="space-y-2.5">
        {channels.map((ch) => (
          <div key={ch.id} className="rounded-2xl p-3 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${COLORS.royalBlue}10` }}>
              {ch.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold truncate" style={{ color: COLORS.textPrimary }}>{ch.name}</span>
                {ch.verified && <BadgeCheck size={14} style={{ color: COLORS.skyBlue }} fill={COLORS.skyBlue} />}
              </div>
              <p className="text-[10px] truncate" style={{ color: COLORS.textSecondary }}>{ch.announcement}</p>
              <p className="text-[9px] mt-0.5" style={{ color: COLORS.textSecondary }}>Updated {ch.updated}</p>
            </div>
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              <button
                onClick={() => toast({ title: ch.following ? "Unfollowed" : "Following " + ch.name })}
                className="px-3 py-1.5 rounded-lg text-[10px] font-bold transition active:scale-95"
                style={ch.following
                  ? { background: COLORS.bgPrimary, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}` }
                  : { background: COLORS.royalBlue, color: "#fff" }
                }
              >
                {ch.following ? "Following" : "Follow"}
              </button>
              <button
                onClick={() => toast({ title: ch.notifications ? "Notifications off" : "Notifications on" })}
                className="flex items-center justify-center w-full py-1 rounded-lg transition active:scale-95"
                style={{ background: ch.notifications ? `${COLORS.amber}15` : COLORS.bgPrimary }}
              >
                {ch.notifications ? <Bell size={12} style={{ color: COLORS.amber }} /> : <BellOff size={12} style={{ color: COLORS.textSecondary }} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}