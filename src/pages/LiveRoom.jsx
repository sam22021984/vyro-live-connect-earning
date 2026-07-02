import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomHeader from "@/components/live-room/RoomHeader";
import SeatArea from "@/components/live-room/SeatArea";
import ChatPanel from "@/components/live-room/ChatPanel";
import ActivityFeed from "@/components/live-room/ActivityFeed";
import GiftAnimationLayer from "@/components/live-room/GiftAnimationLayer";
import BottomActionPanel from "@/components/live-room/BottomActionPanel";
import { COLORS, ROOM_THEMES } from "@/components/live-room/roomData";

export default function LiveRoom() {
  const navigate = useNavigate();
  const [themeIndex, setThemeIndex] = useState(0);
  const theme = ROOM_THEMES[themeIndex];

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: theme.bg }}>
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${theme.glow}30 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${COLORS.electricBlue}20 0%, transparent 50%)`,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: theme.glow,
              opacity: 0.3,
              animation: `particleFloat ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + "s",
            }}
          />
        ))}
        <style>{`
          @keyframes particleFloat {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
            50% { transform: translateY(-30px) translateX(15px); opacity: 0.5; }
          }
        `}</style>
      </div>

      {/* Header */}
      <RoomHeader
        roomTitle="Arabian Nights Live 🎵"
        level={42}
        xp={84500}
        xpMax={100000}
        onlineCount={12450}
        onBack={() => navigate(-1)}
      />

      {/* Activity feed */}
      <ActivityFeed />

      {/* Center stage - seats */}
      <SeatArea />

      {/* Gift animations */}
      <GiftAnimationLayer />

      {/* Chat */}
      <ChatPanel />

      {/* Bottom action panel */}
      <BottomActionPanel />

      {/* Theme switcher (hidden, tap center area) */}
      <button
        onClick={() => setThemeIndex((prev) => (prev + 1) % ROOM_THEMES.length)}
        className="absolute top-1/2 left-2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center opacity-40"
        style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
      >
        <span className="text-[8px] text-white">🎨</span>
      </button>
    </div>
  );
}