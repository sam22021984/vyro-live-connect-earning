import React from "react";
import { Smile, MessageSquare, Gamepad2, Gift, Volume2, LayoutGrid } from "lucide-react";
import { COLORS } from "./roomData";

// Reference-style bottom nav: Hi pill, Chat, Game, Gift (center), Speaker, Menu
export default function BottomNav({ muted, onChatClick, onGiftClick, onMicToggle, onMenuClick, onGameClick }) {
  const btnStyle = (color) => ({
    background: "#185B5D",
    border: `1px solid ${COLORS.gold}50`,
    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06)`,
  });

  return (
    <div className="flex items-center justify-between" style={{ gap: "6px", padding: "0 4px" }}>
      {/* 1. Hi pill — chat input trigger */}
      <button
        onClick={onChatClick}
        className="flex items-center gap-1 rounded-full transition active:scale-95"
        style={{
          background: "#185B5D",
          border: `1px solid ${COLORS.gold}50`,
          padding: "5px 10px",
        }}
      >
        <Smile size={14} style={{ color: COLORS.gold }} />
        <span className="text-[10px] font-medium" style={{ color: COLORS.softGray }}>Hi</span>
      </button>

      {/* 2. Chat */}
      <button onClick={onChatClick} className="flex items-center justify-center rounded-full transition active:scale-90" style={{ width: 36, height: 36, ...btnStyle() }}>
        <MessageSquare size={16} style={{ color: COLORS.gold }} />
      </button>

      {/* 3. Game */}
      <button onClick={onGameClick} className="flex items-center justify-center rounded-full transition active:scale-90" style={{ width: 36, height: 36, ...btnStyle() }}>
        <Gamepad2 size={16} style={{ color: COLORS.gold }} />
      </button>

      {/* 4. Gift — center, larger */}
      <button onClick={onGiftClick} className="flex items-center justify-center rounded-full transition active:scale-90" style={{ width: 42, height: 42, background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})`, border: `1px solid ${COLORS.goldLight}`, boxShadow: `0 0 10px ${COLORS.gold}40` }}>
        <Gift size={18} className="text-white" />
      </button>

      {/* 5. Speaker */}
      <button onClick={onMicToggle} className="flex items-center justify-center rounded-full transition active:scale-90" style={{ width: 36, height: 36, ...btnStyle(muted ? COLORS.crimson : undefined) }}>
        <Volume2 size={16} style={{ color: muted ? COLORS.crimson : COLORS.gold }} />
      </button>

      {/* 6. Menu */}
      <button onClick={onMenuClick} className="flex items-center justify-center rounded-full transition active:scale-90" style={{ width: 36, height: 36, ...btnStyle() }}>
        <LayoutGrid size={16} style={{ color: COLORS.gold }} />
      </button>
    </div>
  );
}