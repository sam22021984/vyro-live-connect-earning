import React, { forwardRef } from "react";
import { Armchair, Mic, MicOff, Crown } from "lucide-react";
import { COLORS } from "./roomData";

// VYRO LIVE CONNECT seat sizes (in dp/px)
const SEAT_SIZES = {
  host: 72,       // Host / VIP
  standard: 64,   // Standard user
  small: 56,      // Small audience
};

const Seat = forwardRef(({ seat, size, onClick, effects = [], canSit = false, onSitClick }, ref) => {
  const { user, id, role } = seat;
  const isEmpty = !user;
  const isHost = role === "host";
  const isSmall = role === "audience";

  // Size by role: host 72, standard 64, small audience 56
  const seatSize = size || (isHost ? SEAT_SIZES.host : isSmall ? SEAT_SIZES.small : SEAT_SIZES.standard);

  const hasShake = effects.some((e) => e.effect === "hammer");
  const hasGlow = effects.length > 0 && !hasShake;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-1"
      style={{
        width: 80,
        animation: hasShake ? "seatShake 0.5s ease-in-out 3" : "none",
      }}
    >
      {/* Avatar + overlays — fixed size container */}
      <div className="relative flex items-center justify-center" style={{ width: seatSize, height: seatSize }}>
        {isEmpty ? (
          canSit ? (
            <button
              onClick={() => onSitClick && onSitClick(id)}
              className="w-full h-full rounded-full flex flex-col items-center justify-center active:scale-95 transition relative"
              style={{ background: `${COLORS.gold}10`, border: `2px dashed ${COLORS.gold}` }}
            >
              <Armchair size={18} style={{ color: COLORS.gold }} />
              <span className="text-[7px] font-bold mt-0.5" style={{ color: COLORS.gold }}>Sit</span>
            </button>
          ) : (
            <div
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.04)", border: `2px dashed ${COLORS.gold}40` }}
            >
              <Armchair size={18} style={{ color: `${COLORS.gold}50` }} />
            </div>
          )
        ) : (
          <button onClick={() => onClick && onClick(id)} className="w-full h-full block active:scale-95 transition relative" style={{ cursor: "pointer" }}>
            {/* Glow effect */}
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

            {/* VIP / Host gradient ring */}
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

            {/* Crown for host */}
            {isHost && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10" style={{ filter: `drop-shadow(0 0 3px ${COLORS.gold})` }}>
                <Crown size={15} fill={COLORS.gold} className="text-white" />
              </div>
            )}

            {/* Mic status badge */}
            <div
              className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center z-10"
              style={{
                background: user.muted ? COLORS.crimson : user.speaking ? COLORS.emerald : "rgba(6,35,37,0.95)",
                border: `1.5px solid ${COLORS.tealDeep}`,
              }}
            >
              {user.muted ? <MicOff size={9} className="text-white" /> : <Mic size={9} className="text-white" />}
            </div>
          </button>
        )}
      </div>

      {/* Level badge */}
      <span
        className="text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
        style={{ background: `${COLORS.gold}20`, color: COLORS.gold, border: `1px solid ${COLORS.gold}40` }}
      >
        {id}
      </span>

      {/* Display name */}
      {!isEmpty && (
        <span
          className="text-[8px] font-semibold max-w-[72px] truncate text-center leading-tight"
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
});

Seat.displayName = "Seat";
export default Seat;