import React from "react";
import { Smile, Sparkles, Gift, Send } from "lucide-react";
import { COLORS } from "./chatData";

export default function MessageComposer({ value, onChange, onSend, onEmoji, onPremiumEmoji, onGift, charLimit = 500 }) {
  return (
    <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-2 py-2">
      <div className="flex items-center gap-1">
        <button onClick={onEmoji} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition flex-shrink-0" style={{ background: `${COLORS.gold}15` }}>
          <Smile size={19} style={{ color: COLORS.gold }} />
        </button>
        <button onClick={onPremiumEmoji} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition flex-shrink-0" style={{ background: `${COLORS.primary}15` }}>
          <Sparkles size={18} style={{ color: COLORS.primary }} />
        </button>
        <button onClick={onGift} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition flex-shrink-0" style={{ background: `#EF444415` }}>
          <Gift size={18} className="text-red-500" />
        </button>
        <div className="flex-1 relative">
          <input
            value={value}
            onChange={onChange}
            maxLength={charLimit}
            placeholder="Type a message..."
            className="w-full py-2.5 px-4 rounded-full text-sm bg-gray-100 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-200 transition"
          />
          {value.length > 0 && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-gray-400">{value.length}/{charLimit}</span>
          )}
        </div>
        <button
          onClick={onSend}
          disabled={!value.trim()}
          className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition flex-shrink-0 disabled:opacity-40"
          style={{ background: `linear-gradient(135deg, ${COLORS.primary}, #4F8BFF)`, boxShadow: `0 3px 10px ${COLORS.primary}40` }}
        >
          <Send size={17} className="text-white" />
        </button>
      </div>
    </div>
  );
}