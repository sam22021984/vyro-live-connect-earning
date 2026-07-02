import React, { useState, useEffect, useRef } from "react";
import { COLORS, CHAT_MESSAGES } from "./roomData";

export default function ChatPanel({ messages }) {
  const [chat, setChat] = useState(messages || CHAT_MESSAGES);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  const send = () => {
    if (!input.trim()) return;
    setChat([...chat, { id: Date.now(), user: "You", color: COLORS.electricBlue, vip: false, text: input, time: "now" }]);
    setInput("");
  };

  return (
    <div className="absolute bottom-24 left-0 right-0 z-20 px-3">
      <div
        ref={scrollRef}
        className="max-h-32 overflow-y-auto scrollbar-hide space-y-1.5 mb-2"
        style={{ maskImage: "linear-gradient(to bottom, transparent, black 15%)" }}
      >
        {chat.map((msg) => (
          <div key={msg.id} className="flex items-start gap-1.5 animate-fadeIn">
            <div
              className="rounded-2xl px-2.5 py-1.5 max-w-[75%]"
              style={{
                background: msg.isSystem
                  ? `linear-gradient(135deg, ${COLORS.gold}20, ${COLORS.amber}20)`
                  : msg.isGift
                  ? `linear-gradient(135deg, ${COLORS.crimson}20, ${COLORS.gold}20)`
                  : "rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-bold" style={{ color: msg.color }}>
                  {msg.vip && "👑 "}{msg.user}
                </span>
                {msg.isGift && <span className="text-sm">{msg.gift}</span>}
              </div>
              <p className="text-[10px] text-white/90 leading-tight">{msg.text}</p>
            </div>
            <span className="text-[7px] text-white/40 mt-1">{msg.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}