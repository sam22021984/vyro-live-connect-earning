import React, { useRef, useState } from "react";
import { COLORS, formatTime, formatDate } from "./chatData";
import { Pin, VolumeX, Check, CheckCheck } from "lucide-react";

export default function ConversationItem({ conv, onClick, onLongPress }) {
  const timerRef = useRef(null);
  const [held, setHeld] = useState(false);

  const startPress = () => {
    timerRef.current = setTimeout(() => {
      setHeld(true);
      onLongPress(conv);
    }, 600);
  };
  const cancelPress = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHeld(false);
  };

  return (
    <button
      onClick={onClick}
      onContextMenu={(e) => { e.preventDefault(); onLongPress(conv); }}
      onMouseDown={startPress}
      onMouseUp={cancelPress}
      onMouseLeave={cancelPress}
      onTouchStart={startPress}
      onTouchEnd={cancelPress}
      className={`w-full flex items-center gap-3 px-4 py-3 transition active:bg-gray-50 ${held ? "bg-gray-100" : ""} ${conv.is_pinned ? "bg-blue-50/40" : ""}`}
    >
      <div className="relative flex-shrink-0">
        <img src={conv.participant_avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
        {conv.is_online && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white" style={{ background: COLORS.online }} />
        )}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-gray-800 truncate">{conv.participant_name}</span>
          {conv.is_vip && (
            <span className="text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, #F59E0B)` }}>
              {conv.vip_badge || "VIP"}
            </span>
          )}
          {conv.is_pinned && <Pin size={11} className="text-gray-400 flex-shrink-0" fill="currentColor" />}
          {conv.is_muted && <VolumeX size={11} className="text-gray-400 flex-shrink-0" />}
        </div>
        <p className="text-xs text-gray-400 truncate mt-0.5">{conv.last_message || "No messages yet"}</p>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-[10px] text-gray-400">{conv.last_message_time || ""}</span>
        {conv.unread_count > 0 ? (
          <span className="min-w-[18px] h-[18px] px-1 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ background: COLORS.primary }}>
            {conv.unread_count}
          </span>
        ) : (
          <CheckCheck size={14} style={{ color: COLORS.blue }} />
        )}
      </div>
    </button>
  );
}