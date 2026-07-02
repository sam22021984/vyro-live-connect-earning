import React from "react";
import { Trophy } from "lucide-react";
import { COLORS, RANKINGS, formatNum } from "./partyData";
import { useToast } from "@/components/ui/use-toast";

export default function PartyRankings() {
  const { toast } = useToast();

  return (
    <div>
      <h3 className="text-xs font-bold mb-2 px-1 flex items-center gap-1" style={{ color: COLORS.textPrimary }}>
        <Trophy size={14} style={{ color: COLORS.gold }} /> Party Rankings
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {RANKINGS.map((section, si) => (
          <div key={si} className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <p className="text-[10px] font-bold mb-2" style={{ color: COLORS.textSecondary }}>{section.type}</p>
            <div className="space-y-1.5">
              {section.data.map((room, i) => (
                <button
                  key={room.id}
                  onClick={() => toast({ title: `Joining "${room.name}"...` })}
                  className="w-full flex items-center gap-2 p-1.5 rounded-lg transition active:scale-95"
                  style={{ background: COLORS.bgPrimary }}
                >
                  <span className="text-[10px] font-bold w-4 text-center" style={{ color: i < 3 ? COLORS.gold : COLORS.textSecondary }}>{i + 1}</span>
                  <img src={room.cover} className="w-7 h-7 rounded-lg object-cover" alt="" />
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-[10px] font-bold truncate" style={{ color: COLORS.textPrimary }}>{room.name}</p>
                    <p className="text-[8px]" style={{ color: COLORS.textSecondary }}>{room.host.name}</p>
                  </div>
                  <span className="text-[8px] font-bold" style={{ color: COLORS.royalBlue }}>{formatNum(room.viewers)}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}