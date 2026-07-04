import React from "react";
import { Clock, RotateCcw, Loader2, History } from "lucide-react";
import { COLORS } from "./partyData";
import { usePartySocial } from "@/hooks/usePartySocial";
import { useToast } from "@/components/ui/use-toast";

export default function RecentTab() {
  const { toast } = useToast();
  const { recentRooms, loading } = usePartySocial();

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: COLORS.royalBlue }} />
      </div>
    );
  }

  if (recentRooms.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 gap-2">
        <History size={32} style={{ color: COLORS.textSecondary }} />
        <p className="text-xs" style={{ color: COLORS.textSecondary }}>No recent party rooms visited</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>🕐 Recent Party History</h3>
        <span className="text-[9px]" style={{ color: COLORS.textSecondary }}>{recentRooms.length} rooms</span>
      </div>

      {recentRooms.map((r, i) => (
        <div key={i} className="rounded-2xl overflow-hidden flex items-center gap-2.5" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          {r.cover ? (
            <img src={r.cover} className="w-20 h-16 object-cover flex-shrink-0" alt="" />
          ) : (
            <div className="w-20 h-16 flex-shrink-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${COLORS.royalBlue}20, ${COLORS.skyBlue}20)` }}>
              <span className="text-2xl">🎉</span>
            </div>
          )}
          <div className="flex-1 min-w-0 p-1">
            <span className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>{r.name}</span>
            <p className="text-[10px]" style={{ color: COLORS.textSecondary }}>Host: {r.host}</p>
            <p className="flex items-center gap-0.5 text-[9px]" style={{ color: COLORS.textSecondary }}>
              <Clock size={9} /> {r.lastVisit}
            </p>
          </div>
          <button
            onClick={() => toast({ title: `Rejoining "${r.name}"...` })}
            className="mr-2.5 flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-bold text-white transition active:scale-95"
            style={{ background: `linear-gradient(135deg, ${COLORS.royalBlue}, ${COLORS.skyBlue})` }}
          >
            <RotateCcw size={11} /> Rejoin
          </button>
        </div>
      ))}
    </div>
  );
}