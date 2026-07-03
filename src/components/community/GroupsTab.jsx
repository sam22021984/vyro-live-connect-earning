import React from "react";
import { Loader2, Lock, Users, Circle, Crown } from "lucide-react";
import { COLORS, formatNum } from "./communityData";
import { useToast } from "@/components/ui/use-toast";

const ACTIVITY_COLORS = {
  High: COLORS.amber,
  "Very High": COLORS.royalBlue,
  Extreme: COLORS.crimson,
  Medium: COLORS.emerald,
};

export default function GroupsTab({ groups = [], loading }) {
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
      <h3 className="text-xs font-bold px-1" style={{ color: COLORS.textPrimary }}>👥 Community Groups</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {groups.map((g) => (
          <div key={g.id} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div className="relative h-24">
              <img src={g.cover} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
              <div className="absolute top-2 right-2 flex items-center gap-1">
                {g.is_private && (
                  <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white flex items-center gap-0.5" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <Lock size={8} /> Private
                  </span>
                )}
                <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white" style={{ background: ACTIVITY_COLORS[g.activity] }}>
                  {g.activity}
                </span>
              </div>
              {g.is_owner && (
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white flex items-center gap-0.5" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})` }}>
                  <Crown size={8} /> Owner
                </span>
              )}
            </div>
            <div className="p-3">
              <h4 className="text-sm font-bold" style={{ color: COLORS.textPrimary }}>{g.name}</h4>
              <p className="text-[10px]" style={{ color: COLORS.textSecondary }}>{g.category}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-[10px]" style={{ color: COLORS.textSecondary }}>
                  <Users size={11} /> {formatNum(g.members)}
                </span>
                <span className="flex items-center gap-1 text-[10px]" style={{ color: COLORS.emerald }}>
                  <Circle size={7} fill={COLORS.emerald} /> {formatNum(g.online)} online
                </span>
              </div>
              <button
                onClick={() => toast({ title: g.is_owner ? "Managing group..." : "Joining " + g.name })}
                className="w-full mt-2.5 py-2 rounded-xl text-xs font-bold text-white transition active:scale-95"
                style={{ background: g.is_owner ? COLORS.textSecondary : `linear-gradient(135deg, ${COLORS.royalBlue}, ${COLORS.skyBlue})` }}
              >
                {g.is_owner ? "Manage Group" : "Join Group"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}