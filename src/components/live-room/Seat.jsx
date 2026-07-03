import React from "react";
import { Armchair, Mic, MicOff, Crown } from "lucide-react";
import { COLORS } from "./roomData";

export default function Seat({ seat, size = 56, onClick, effects = [], fluid = false }) {
  const { user, id, role } = seat;
  const isEmpty = !user;
  const isHost = role === "host";
  const hasShake = effects.some((e) => e.effect === "hammer");
  const hasGlow = effects.length > 0 && !hasShake;
  const seatStyle = fluid ? { width: "100%", aspectRatio: "1 / 1" } : { width: size, height: size };

  return (
    <div className="flex flex-col items-center gap-1 w-full" style={{ animation: hasShake ? "seatShake 0.5s ease-in-out 3" : "none" }}>
      <div className="relative w-full" style={seatStyle}>
        {isEmpty ? (
          <div
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.04)", border: `2px dashed ${COLORS.gold}40` }}
          >
            <Armchair size={18} style={{ color: `${COLORS.gold}50` }} />
          </div>
        ) : (
          <button onClick={() => onClick && onClick(id)} className="w-full h-full block active:scale-95 transition" style={{ cursor: "pointer" }}>
            {/* Seat glow effect from gifts/emojis */}
            {hasGlow && (
              <div
                className="absolute -inset-2 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${COLORS.gold}40, transparent 70%)`,
                  animation: "seatGlow 1.5s ease-in-out infinite",
                }}
              />
            )}

            {/* Speaking ring */}
            {user.speaking && (
              <div
                className="absolute -inset-1 rounded-full"
                style={{
                  border: `2px solid ${COLORS.emerald}`,
                  boxShadow: `0 0 12px ${COLORS.emerald}80`,
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            )}

            {/* VIP / Host gold frame */}
            <div
              className="absolute -inset-0.5 rounded-full"
              style={{
                background: isHost
                  ? `linear-gradient(135deg, ${COLORS.goldLight}, ${COLORS.goldDark})`
                  : user.vip
                  ? `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})`
                  : "transparent",
                boxShadow: isHost || user.vip ? `0 0 10px ${COLORS.gold}60` : "none",
              }}
            />

            {/* Avatar */}
            <img
              src={user.avatar}
              className="relative w-full h-full rounded-full object-cover border-2"
              style={{ borderColor: isHost || user.vip ? "transparent" : `${COLORS.gold}40` }}
              alt={user.name}
            />

            {/* Host crown */}
            {isHost && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10" style={{ filter: `drop-shadow(0 0 3px ${COLORS.gold})` }}>
                <Crown size={15} fill={COLORS.gold} className="text-white" />
              </div>
            )}

            {/* Mic status badge */}
            <div
              className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center z-10"
              style={{
                background: user.muted ? COLORS.crimson : user.speaking ? COLORS.emerald : "rgba(6,35,37,0.9)",
                border: `1.5px solid ${COLORS.tealDeep}`,
              }}
            >
              {user.muted ? <MicOff size={9} className="text-white" /> : <Mic size={9} className="text-white" />}
            </div>
          </button>
        )}
      </div>

      {/* Number label */}
      <span
        className="text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
        style={{ background: `${COLORS.gold}20`, color: COLORS.gold, border: `1px solid ${COLORS.gold}40` }}
      >
        {id}
      </span>

      {/* Name */}
      {!isEmpty && (
        <span
          className="text-[8px] font-semibold max-w-[60px] truncate"
          style={{ color: user.vip ? COLORS.gold : COLORS.white }}
        >
          {user.name}
        </span>
      )}

      <style>{`
        @keyframes seatShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px) rotate(-1deg); }
          75% { transform: translateX(3px) rotate(1deg); }
        }
        @keyframes seatGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}