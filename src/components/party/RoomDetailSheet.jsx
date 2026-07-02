import React from "react";
import { X, Eye, Users, Radio, Calendar, Globe, Languages, Tag } from "lucide-react";
import { COLORS, formatNum } from "./partyData";
import { useToast } from "@/components/ui/use-toast";

export default function RoomDetailSheet({ room, onClose }) {
  const { toast } = useToast();
  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-fadeIn">
        {/* Cover */}
        <div className="relative h-40">
          <img src={room.cover} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))" }} />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
            <X size={16} className="text-white" />
          </button>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-1 mb-1">
              {room.status === "live" && (
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white" style={{ background: COLORS.crimson }}>
                  <Radio size={8} fill="white" /> LIVE
                </span>
              )}
              {room.trending && (
                <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.crimson})` }}>
                  🔥 Trending
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-white">{room.name}</h2>
            <div className="flex items-center gap-2 text-[10px] text-white/80">
              <span className="flex items-center gap-0.5"><Eye size={10} /> {formatNum(room.viewers)}</span>
              <span className="flex items-center gap-0.5"><Users size={10} /> {formatNum(room.members)}</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Host */}
          <div className="flex items-center gap-2 p-2 rounded-xl" style={{ background: COLORS.bgPrimary }}>
            <img src={room.host.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>{room.host.name}</span>
                <span className="text-[7px] font-bold text-white px-1 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})` }}>{room.host.vip}</span>
              </div>
              <p className="text-[9px]" style={{ color: COLORS.textSecondary }}>Party Host</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-[10px] font-bold mb-1" style={{ color: COLORS.textSecondary }}>About</p>
            <p className="text-xs leading-relaxed" style={{ color: COLORS.textPrimary }}>{room.description}</p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1.5 p-2 rounded-xl" style={{ background: COLORS.bgPrimary }}>
              <Tag size={12} style={{ color: COLORS.purple }} />
              <div>
                <p className="text-[8px]" style={{ color: COLORS.textSecondary }}>Category</p>
                <p className="text-[10px] font-bold" style={{ color: COLORS.textPrimary }}>{room.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-xl" style={{ background: COLORS.bgPrimary }}>
              <Languages size={12} style={{ color: COLORS.skyBlue }} />
              <div>
                <p className="text-[8px]" style={{ color: COLORS.textSecondary }}>Language</p>
                <p className="text-[10px] font-bold" style={{ color: COLORS.textPrimary }}>{room.language}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-xl" style={{ background: COLORS.bgPrimary }}>
              <Globe size={12} style={{ color: COLORS.emerald }} />
              <div>
                <p className="text-[8px]" style={{ color: COLORS.textSecondary }}>Country</p>
                <p className="text-[10px] font-bold" style={{ color: COLORS.textPrimary }}>{room.country} {room.country_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-xl" style={{ background: COLORS.bgPrimary }}>
              {room.status === "live" ? <Radio size={12} style={{ color: COLORS.crimson }} /> : <Calendar size={12} style={{ color: COLORS.skyBlue }} />}
              <div>
                <p className="text-[8px]" style={{ color: COLORS.textSecondary }}>Status</p>
                <p className="text-[10px] font-bold capitalize" style={{ color: room.status === "live" ? COLORS.crimson : COLORS.skyBlue }}>{room.status}</p>
              </div>
            </div>
          </div>

          {/* Members preview */}
          <div>
            <p className="text-[10px] font-bold mb-1.5" style={{ color: COLORS.textSecondary }}>Members in Room</p>
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                {["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop"].map((a, i) => (
                  <img key={i} src={a} className="w-7 h-7 rounded-full object-cover border-2 border-white" alt="" />
                ))}
              </div>
              <span className="text-[10px] font-bold" style={{ color: COLORS.textSecondary }}>+{formatNum(room.members - 4)} more</span>
            </div>
          </div>

          {/* Join button */}
          <button
            onClick={() => { toast({ title: `Joining "${room.name}"...` }); onClose(); }}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition active:scale-95"
            style={{ background: room.status === "live" ? `linear-gradient(135deg, ${COLORS.royalBlue}, ${COLORS.skyBlue})` : COLORS.textSecondary, boxShadow: room.status === "live" ? `0 4px 12px ${COLORS.royalBlue}30` : "none" }}
          >
            {room.status === "live" ? "Join Party Room" : "Set Reminder"}
          </button>
        </div>
      </div>
    </div>
  );
}