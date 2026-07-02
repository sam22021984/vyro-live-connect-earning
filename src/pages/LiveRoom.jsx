import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical, Users, Lock, Settings, X, AlertTriangle } from "lucide-react";
import SeatArea from "@/components/live-room/SeatArea";
import SettingsPanel from "@/components/live-room/SettingsPanel";
import { COLORS, ROOM_THEMES, CHAT_MESSAGES, WARNING_TEXT } from "@/components/live-room/roomData";
import { useToast } from "@/components/ui/use-toast";

export default function LiveRoom() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [themeIndex, setThemeIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [muted, setMuted] = useState(false);
  const [locked, setLocked] = useState(false);
  const theme = ROOM_THEMES[themeIndex];

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: theme.bg }}>
      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${theme.glow}15 0%, transparent 60%)`,
        }}
      />

      {/* Top header */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-3 pb-2" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)" }}>
        <div className="flex items-center gap-2.5">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold text-white truncate">Arabian Nights Live</h1>
              <span className="text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})` }}>LV.42</span>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Users size={12} className="text-white" />
            <span className="text-[10px] font-bold text-white">12,450</span>
          </div>
          <button onClick={() => setShowSettings(true)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Settings size={16} style={{ color: COLORS.gold }} />
          </button>
          <button onClick={() => toast({ title: "More options" })} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <MoreVertical size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Seat area - centered */}
      <div className="absolute inset-0 flex items-center justify-center pt-16 pb-48">
        <SeatArea />
      </div>

      {/* Chat overlay - bottom left */}
      <div className="absolute bottom-20 left-3 right-3 z-20">
        {/* Warning notice */}
        {showWarning && (
          <div
            className="rounded-2xl p-2.5 mb-2 flex items-start gap-2 animate-fadeIn"
            style={{
              background: COLORS.glassOverlay,
              backdropFilter: "blur(12px)",
              border: `1px solid ${COLORS.gold}30`,
            }}
          >
            <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" style={{ color: COLORS.gold }} />
            <p className="text-[8px] leading-tight flex-1" style={{ color: "rgba(255,255,255,0.7)" }}>
              {WARNING_TEXT}
            </p>
            <button onClick={() => setShowWarning(false)} className="flex-shrink-0">
              <X size={12} style={{ color: COLORS.softGray }} />
            </button>
          </div>
        )}

        {/* Chat messages */}
        <div className="space-y-1 max-h-28 overflow-y-auto scrollbar-hide">
          {CHAT_MESSAGES.map((msg) => (
            <div key={msg.id} className="flex items-start gap-1.5 animate-fadeIn">
              <div
                className="rounded-2xl px-2.5 py-1 max-w-[75%]"
                style={{
                  background: msg.isSystem
                    ? `${COLORS.gold}15`
                    : msg.isGift
                    ? `${COLORS.gold}20`
                    : "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="text-[9px] font-bold" style={{ color: msg.color }}>
                  {msg.vip && "👑 "}{msg.user}
                </span>
                <span className="text-[9px] ml-1" style={{ color: "rgba(255,255,255,0.8)" }}>
                  {msg.isSystem ? "" : ": "}{msg.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom action panel - Request to speak + controls */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-3 pb-4 pt-2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}>
        {/* Request to speak bar */}
        <div
          className="flex items-center gap-2 rounded-2xl px-3 py-2 mb-2"
          style={{
            background: COLORS.glassOverlay,
            backdropFilter: "blur(20px)",
            border: `1px solid ${COLORS.gold}30`,
          }}
        >
          <span className="text-[10px] font-bold text-white flex-1">✋ Request to Speak</span>
          <button
            onClick={() => { setLocked(!locked); toast({ title: locked ? "Room unlocked" : "Room locked" }); }}
            className="flex items-center gap-1 px-2 py-1 rounded-lg transition active:scale-90"
            style={{ background: locked ? `${COLORS.gold}20` : "rgba(255,255,255,0.06)" }}
          >
            <Lock size={12} style={{ color: locked ? COLORS.gold : COLORS.softGray }} fill={locked ? COLORS.gold : "none"} />
            <span className="text-[9px] font-bold" style={{ color: locked ? COLORS.gold : COLORS.softGray }}>
              {locked ? "Locked" : "Open"}
            </span>
          </button>
        </div>

        {/* Action buttons row */}
        <div
          className="flex items-center justify-around gap-1 rounded-2xl px-2 py-2"
          style={{
            background: COLORS.glassOverlay,
            backdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {[
            { icon: "🎁", label: "Gift", color: COLORS.gold },
            { icon: muted ? "🔇" : "🎤", label: muted ? "Muted" : "Mic", color: muted ? COLORS.crimson : COLORS.gold },
            { icon: "💬", label: "Chat", color: "#3B82F6" },
            { icon: "😀", label: "Emoji", color: "#F59E0B" },
            { icon: "📤", label: "Share", color: "#0EA5E9" },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={() => {
                if (btn.label === "Mic" || btn.label === "Muted") { setMuted(!muted); toast({ title: muted ? "Mic ON" : "Mic Muted" }); }
                else toast({ title: btn.label });
              }}
              className="flex flex-col items-center gap-0.5 transition active:scale-90"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: `${btn.color}15`,
                  border: `1px solid ${btn.color}40`,
                }}
              >
                <span className="text-sm">{btn.icon}</span>
              </div>
              <span className="text-[7px] font-bold" style={{ color: btn.color }}>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Theme switcher */}
      <button
        onClick={() => setThemeIndex((prev) => (prev + 1) % ROOM_THEMES.length)}
        className="absolute top-16 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: COLORS.glassOverlay, backdropFilter: "blur(8px)", border: `1px solid ${COLORS.gold}30` }}
      >
        <span className="text-xs">🎨</span>
      </button>

      {/* Settings panel */}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}