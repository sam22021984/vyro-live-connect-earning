import React from "react";
import { ArrowLeft, Phone, MoreVertical } from "lucide-react";
import { COLORS } from "./chatData";

export default function ChatHeader({ conv, onBack, onCall, onMore, online }) {
  return (
    <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-gray-100 px-3 py-2.5 flex items-center gap-2">
      <button onClick={onBack} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
        <ArrowLeft size={18} className="text-gray-700" />
      </button>
      <div className="relative flex-shrink-0">
        <img src={conv?.participant_avatar} className="w-9 h-9 rounded-full object-cover" alt="" />
        {online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ background: COLORS.online }} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-gray-800 truncate">{conv?.participant_name}</span>
          {conv?.is_vip && (
            <span className="text-[8px] font-bold text-white px-1 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, #F59E0B)` }}>
              {conv.vip_badge || "VIP"}
            </span>
          )}
        </div>
        <span className="text-[10px]" style={{ color: online ? COLORS.online : COLORS.muted }}>
          {online ? "Online" : (conv?.last_seen ? `Last seen ${conv.last_seen}` : "Offline")}
        </span>
      </div>
      <button onClick={onCall} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: `${COLORS.primary}15` }}>
        <Phone size={17} style={{ color: COLORS.primary }} />
      </button>
      <button onClick={onMore} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition relative">
        <MoreVertical size={18} className="text-gray-600" />
      </button>
    </div>
  );
}