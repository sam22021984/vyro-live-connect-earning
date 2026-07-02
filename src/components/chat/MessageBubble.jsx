import React from "react";
import { Check, CheckCheck, Phone, PhoneMissed } from "lucide-react";
import { COLORS, formatCoins } from "./chatData";

export default function MessageBubble({ msg, onTranslate }) {
  const own = msg.is_own;

  if (msg.type === "call") {
    const missed = msg.call_type === "missed" || msg.call_type === "declined";
    return (
      <div className="flex justify-center my-1">
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100">
          {missed ? <PhoneMissed size={13} className="text-red-500" /> : <Phone size={13} style={{ color: COLORS.primary }} />}
          <span className="text-[11px] font-medium text-gray-500">
            {missed ? "Missed call" : `${msg.call_type === "incoming" ? "Incoming" : "Outgoing"} call · ${msg.call_duration || "00:00"}`}
          </span>
        </div>
      </div>
    );
  }

  if (msg.type === "gift") {
    return (
      <div className={`flex ${own ? "justify-end" : "justify-start"} my-1.5 px-3`}>
        <div className="max-w-[75%] rounded-2xl overflow-hidden" style={{ background: own ? `${COLORS.primary}10` : COLORS.cardBg, border: `1px solid ${own ? `${COLORS.primary}30` : COLORS.border}` }}>
          <div className="flex flex-col items-center py-4 px-6">
            <span className="text-5xl" style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))" }}>{msg.gift_icon}</span>
            <span className="text-xs font-bold mt-1" style={{ color: COLORS.gold }}>{formatCoins(msg.gift_price)} Coins</span>
            <span className="text-[10px] text-gray-400 mt-0.5">{own ? "Gift sent" : "Gift received"}</span>
          </div>
          <div className="text-center pb-1.5">
            <span className="text-[9px] text-gray-400">{msg.date} · {msg.time}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${own ? "justify-end" : "justify-start"} my-0.5 px-3`}>
      <div className={`max-w-[78%]`}>
        <div
          className="px-3.5 py-2 rounded-2xl"
          style={{
            background: own ? COLORS.primary : "#FFFFFF",
            color: own ? "#FFFFFF" : COLORS.navy,
            borderBottomRightRadius: own ? 4 : 16,
            borderBottomLeftRadius: own ? 16 : 4,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            border: own ? "none" : `1px solid ${COLORS.border}`,
          }}
        >
          <p className="text-sm leading-relaxed break-words">{msg.text}</p>
          {msg.translation && (
            <button onClick={() => onTranslate?.(msg)} className="block mt-1 text-left">
              <span className="text-[11px] italic opacity-70 block">{msg.translation}</span>
              <span className="text-[9px] underline opacity-60">Show original</span>
            </button>
          )}
          <div className="flex items-center justify-end gap-1 mt-0.5">
            <span className="text-[9px]" style={{ color: own ? "rgba(255,255,255,0.7)" : COLORS.muted }}>{msg.time}</span>
            {own && !msg.is_delivered && <Check size={13} className="text-white/70" />}
            {own && msg.is_delivered && !msg.is_read && <CheckCheck size={13} className="text-white/70" />}
            {own && msg.is_read && <CheckCheck size={13} style={{ color: "#7DD3FC" }} />}
          </div>
        </div>
        {!msg.translation && (
          <button onClick={() => onTranslate?.(msg)} className={`text-[9px] mt-0.5 ${own ? "text-right pr-1" : "pl-1"} text-gray-400`}>
            Translate
          </button>
        )}
      </div>
    </div>
  );
}