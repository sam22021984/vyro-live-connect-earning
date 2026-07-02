import React from "react";
import { Mic, MicOff, Crown } from "lucide-react";
import { COLORS } from "./roomData";

export default function Seat({ seat, isHost }) {
  const { user, angle, radius } = seat;

  // Position calculation
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  const isEmpty = !user;

  const seatSize = isHost ? 72 : 56;

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      }}
    >
      {/* Avatar frame */}
      <div className="relative" style={{ width: seatSize, height: seatSize }}>
        {isEmpty ? (
          // Empty seat
          <div
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: `2px dashed rgba(255,255,255,0.2)`,
            }}
          >
            <span className="text-white/30 text-lg">+</span>
          </div>
        ) : (
          <>
            {/* Speaking ring animation */}
            {user.speaking && (
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: `${COLORS.emerald}40`, animationDuration: "1.5s" }}
              />
            )}

            {/* VIP glow */}
            {user.vip && (
              <div
                className="absolute -inset-1 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})`,
                  boxShadow: `0 0 12px ${COLORS.gold}60`,
                }}
              />
            )}

            {/* Avatar */}
            <img
              src={user.avatar}
              className="relative w-full h-full rounded-full object-cover border-2"
              style={{
                borderColor: isHost ? COLORS.gold : user.vip ? "transparent" : "rgba(255,255,255,0.3)",
              }}
              alt={user.name}
            />

            {/* Host crown */}
            {isHost && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2" style={{ filter: `drop-shadow(0 0 4px ${COLORS.gold})` }}>
                <Crown size={16} className="text-white" fill={COLORS.gold} />
              </div>
            )}

            {/* Mic indicator */}
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                background: user.muted ? COLORS.crimson : user.speaking ? COLORS.emerald : "rgba(0,0,0,0.6)",
                border: "1.5px solid rgba(255,255,255,0.3)",
              }}
            >
              {user.muted ? <MicOff size={9} className="text-white" /> : <Mic size={9} className="text-white" />}
            </div>

            {/* VIP badge */}
            {user.vip && (
              <span
                className="absolute -top-1 -left-1 text-[6px] font-bold text-white px-1 py-0.5 rounded-full"
                style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})` }}
              >
                {user.vip}
              </span>
            )}
          </>
        )}
      </div>

      {/* Name */}
      {!isEmpty && (
        <div className="mt-1 flex flex-col items-center">
          <span
            className="text-[9px] font-bold max-w-[60px] truncate"
            style={{ color: user.vip ? COLORS.gold : COLORS.white }}
          >
            {user.name}
          </span>
          <div className="flex items-center gap-0.5">
            <span
              className="text-[7px] px-1 py-0.5 rounded-full font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${COLORS.royalPurple}, ${COLORS.electricBlue})` }}
            >
              LV.{user.level}
            </span>
            {user.country && <span className="text-[8px]">{user.country}</span>}
          </div>
        </div>
      )}

      {isEmpty && (
        <span className="text-[8px] text-white/30 mt-0.5">Empty</span>
      )}
    </div>
  );
}