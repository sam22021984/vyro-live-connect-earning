import React from "react";
import { COLORS } from "./partyData";
import { usePartySocial } from "@/hooks/usePartySocial";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Star } from "lucide-react";

export default function FollowingTab() {
  const { toast } = useToast();
  const { followingActivity, loading } = usePartySocial();

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: COLORS.royalBlue }} />
      </div>
    );
  }

  if (followingActivity.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 gap-2">
        <Star size={32} style={{ color: COLORS.textSecondary }} />
        <p className="text-xs" style={{ color: COLORS.textSecondary }}>No followed users in rooms right now</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>⭐ Following Activity</h3>
        <span className="text-[9px]" style={{ color: COLORS.textSecondary }}>{followingActivity.length} updates</span>
      </div>

      {followingActivity.map((f, i) => (
        <div key={i} className="rounded-2xl p-3 flex items-center gap-2.5" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          {f.user.avatar ? (
            <img src={f.user.avatar} className="w-11 h-11 rounded-full object-cover flex-shrink-0" alt="" />
          ) : (
            <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: COLORS.gold + "20" }}>
              <span className="text-sm font-bold" style={{ color: COLORS.gold }}>{(f.user.name || "U")[0]}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>{f.user.name}</span>
              {f.user.vip && (
                <span className="text-[7px] font-bold text-white px-1 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})` }}>{f.user.vip}</span>
              )}
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