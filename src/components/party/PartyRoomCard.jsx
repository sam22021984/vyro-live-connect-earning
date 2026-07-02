import React from "react";
import { Eye, Users, Radio, Calendar } from "lucide-react";
import { COLORS, formatNum } from "./partyData";
import { useToast } from "@/components/ui/use-toast";

export default function PartyRoomCard({ room, onJoin, onSelect, compact }) {
  const { toast } = useToast();

  const handleJoin = (e) => {
    e.stopPropagation();
    if (onJoin) { onJoin(room); return; }
    toast({ title: `Joining "${room.name}"...` });
  };

  return (
    <div
      onClick={() => onSelect?.(room)}
      className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-95"
      style={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      <div className="relative h-28">
        <img src={room.cover} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%)" }} />

        {/* Top badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {room.status === "live" && (
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white" style={{ background: COLORS.crimson }}>
              <Radio size={8} fill="white" /> LIVE
            </span>
          )}
          {room.status === "scheduled" && (
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white" style={{ background: COLORS.skyBlue }}>
              <Calendar size={8} /> SOON
            </span>
          )}
          {room.trending && (
            <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.crimson})` }}>
              🔥 Trending
            </span>
          )}
        </div>

        {room.rank && (
          <span className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: room.rank <= 3 ? `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})` : COLORS.textSecondary }}>
            #{room.rank}
          </span>
        )}

        {/* Bottom info */}
        <div className="absolute bottom-2 left-2 right-2">
          <h4 className="text-sm font-bold text-white truncate">{room.name}</h4>
          <div className="flex items-center gap-2 text-[9px] text-white/80">
            <span className="flex items-center gap-0.5"><Eye size={9} /> {formatNum(room.viewers)}</span>
            <span className="flex items-center gap-0.5"><Users size={9} /> {formatNum(room.members)}</span>
            <span>{room.country}</span>
          </div>
        </div>
      </div>

      {!compact && (
        <div className="p-2.5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <img src={room.host.avatar} className="w-5 h-5 rounded-full object-cover" alt="" />
            <span className="text-[10px] font-semibold flex-1 truncate" style={{ color: COLORS.textPrimary }}>{room.host.name}</span>
            <span className="text-[7px] font-bold text-white px-1 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})` }}>{room.host.vip}</span>
          </div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-[8px] px-1.5 py-0.5 rounded-full" style={{ background: `${COLORS.purple}15`, color: COLORS.purple }}>{room.category}</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded-full" style={{ background: `${COLORS.skyBlue}15`, color: COLORS.skyBlue }}>{room.language}</span>
          </div>
          <button
            onClick={handleJoin}
            className="w-full py-1.5 rounded-lg text-[10px] font-bold text-white transition active:scale-95"
            style={{ background: room.status === "live" ? `linear-gradient(135deg, ${COLORS.royalBlue}, ${COLORS.skyBlue})` : COLORS.textSecondary }}
          >
            {room.status === "live" ? "Join Now" : "Set Reminder"}
          </button>
        </div>
      )}
    </div>
  );
}