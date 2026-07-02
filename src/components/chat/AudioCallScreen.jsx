import React, { useState, useEffect, useRef } from "react";
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, Coins } from "lucide-react";
import { COLORS, formatDuration, formatCoins } from "./chatData";

const COIN_RATE = 100; // coins per second

export default function AudioCallScreen({ conv, state, onAccept, onReject, onEnd }) {
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (state === "active") {
      intervalRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
      setDuration(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [state]);

  if (!state) return null;

  const isOutgoing = state === "outgoing";
  const isIncoming = state === "incoming";
  const isActive = state === "active";

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-between py-16 px-6" style={{ background: `linear-gradient(160deg, ${COLORS.navy} 0%, #1a2a5c 50%, ${COLORS.primary} 100%)` }}>
      <div className="flex flex-col items-center gap-3 mt-8">
        <div className="relative">
          {isActive && (
            <div className="absolute inset-0 rounded-full animate-ping" style={{ background: `${COLORS.primary}40`, animationDuration: "2s" }} />
          )}
          <img src={conv?.participant_avatar} className="w-28 h-28 rounded-full object-cover border-4 border-white/20 relative" alt="" />
          {conv?.is_vip && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, #F59E0B)` }}>
              {conv.vip_badge || "VIP"}
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold text-white mt-2">{conv?.participant_name}</h2>
        <p className="text-sm text-white/60">
          {isActive ? formatDuration(duration) : isIncoming ? "Incoming call..." : "Calling..."}
        </p>
      </div>

      {isActive && (
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
          <Coins size={14} style={{ color: COLORS.gold }} />
          <span className="text-xs font-bold text-white">{formatCoins(duration * COIN_RATE)}</span>
          <span className="text-[10px] text-white/50">coins deducted</span>
        </div>
      )}

      <div className="flex flex-col items-center gap-6">
        {isActive && (
          <div className="flex gap-4">
            <button onClick={() => setMuted(!muted)} className="w-14 h-14 rounded-full flex items-center justify-center active:scale-90 transition" style={{ background: muted ? "#EF4444" : "rgba(255,255,255,0.15)" }}>
              {muted ? <MicOff size={22} className="text-white" /> : <Mic size={22} className="text-white" />}
            </button>
            <button onClick={() => setSpeaker(!speaker)} className="w-14 h-14 rounded-full flex items-center justify-center active:scale-90 transition" style={{ background: speaker ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)" }}>
              {speaker ? <Volume2 size={22} className="text-white" /> : <VolumeX size={22} className="text-white/50" />}
            </button>
          </div>
        )}

        <div className="flex gap-6">
          {(isIncoming) && (
            <button onClick={onReject} className="flex flex-col items-center gap-1.5 active:scale-90 transition">
              <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/40">
                <PhoneOff size={26} className="text-white" />
              </div>
              <span className="text-[10px] text-white/60">Reject</span>
            </button>
          )}
          {(isIncoming) && (
            <button onClick={onAccept} className="flex flex-col items-center gap-1.5 active:scale-90 transition">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/40 animate-bounce">
                <Phone size={26} className="text-white" />
              </div>
              <span className="text-[10px] text-white/60">Accept</span>
            </button>
          )}
          {(isOutgoing || isActive) && (
            <button onClick={onEnd} className="flex flex-col items-center gap-1.5 active:scale-90 transition">
              <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/40">
                <PhoneOff size={26} className="text-white" />
              </div>
              <span className="text-[10px] text-white/60">End Call</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}