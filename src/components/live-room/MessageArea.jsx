import React, { useState, useRef, useEffect } from "react";
import { X, Megaphone } from "lucide-react";
import { COLORS, WARNING_TEXT } from "./roomData";

export default function MessageArea({ chat, showWarning, onCloseWarning, onChatClick }) {
  const [activeTab, setActiveTab] = useState("all");
  const scrollRef = useRef(null);

  // Filter messages by tab
  const filteredChat = chat.filter((msg) => {
    if (activeTab === "all") return true;
    if (activeTab === "message") return !msg.isGift && !msg.isSystem;
    if (activeTab === "gift") return msg.isGift;
    return true;
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [filteredChat]);

  const tabs = [
    { id: "all", label: "All" },
    { id: "message", label: "Message" },
    { id: "gift", label: "Gift" },
  ];

  return (
    <div className="flex flex-col" style={{ gap: "6px" }}>
      {/* Tabs: All / Message / Gift */}
      <div className="flex items-center" style={{ gap: "12px", paddingLeft: "4px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="text-[10px] font-bold transition active:scale-95"
            style={{
              color: activeTab === tab.id ? COLORS.gold : COLORS.softGray,
              borderBottom: activeTab === tab.id ? `1.5px solid ${COLORS.gold}` : "1.5px solid transparent",
              paddingBottom: "2px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Warning box */}
      {showWarning && (
        <div
          className="rounded-xl p-2 flex items-start animate-fadeIn"
          style={{
            background: "#0A2A2D",
            border: `1px solid ${COLORS.gold}25`,
            gap: "6px",
          }}
        >
          <Megaphone size={12} className="flex-shrink-0 mt-0.5" style={{ color: COLORS.gold }} />
          <p className="text-[8px] leading-tight flex-1" style={{ color: "rgba(255,255,255,0.65)" }}>
            {WARNING_TEXT}
          </p>
          <button onClick={onCloseWarning} className="flex-shrink-0">
            <X size={10} style={{ color: COLORS.softGray }} />
          </button>
        </div>
      )}

      {/* Chat message stream */}
      <div
        ref={scrollRef}
        className="space-y-1 overflow-y-auto scrollbar-hide"
        style={{ maxHeight: "90px" }}
      >
        {filteredChat.slice(-8).map((msg) => (
          <div key={msg.id} className="flex items-start animate-fadeIn" style={{ gap: "4px" }}>
            <div
              className="rounded-xl px-2 py-1 max-w-[80%]"
              style={{
                background: msg.isSystem
                  ? `${COLORS.gold}15`
                  : msg.isGift
                  ? `${COLORS.gold}20`
                  : "#0A2A2D",
                gap: "2px",
              }}
            >
              <span className="text-[9px] font-bold" style={{ color: msg.color }}>
                {msg.vip && "👑 "}
                {msg.user}
              </span>
              <span className="text-[9px] ml-1" style={{ color: "rgba(255,255,255,0.75)" }}>
                {msg.isSystem ? "" : ": "}
                {msg.text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}