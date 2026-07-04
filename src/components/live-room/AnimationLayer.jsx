import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { COLORS } from "./roomData";

function TravelAnim({ anim }) {
  const [phase, setPhase] = useState("start");

  useEffect(() => {
    const raf = requestAnimationFrame(() => setPhase("travel"));
    const impactTimer = setTimeout(() => setPhase("impact"), anim.duration - 200);
    return () => { cancelAnimationFrame(raf); clearTimeout(impactTimer); };
  }, [anim.duration]);

  const pos = phase === "start" ? anim.from : anim.to;
  const scale = phase === "start" ? 0.5 : phase === "travel" ? 1.2 : 2.8;
  const opacity = phase === "start" ? 0 : phase === "impact" ? 0 : 1;
  const transition = phase === "start" ? "none" : phase === "travel"
    ? `all ${anim.duration - 200}ms cubic-bezier(0.25, 0.45, 0.45, 0.95)`
    : "all 200ms ease-out";

  const rotate = anim.animation === "rotate" ? (phase === "travel" ? "rotate(360deg)" : "rotate(0deg)") : "";
  const dropY = anim.animation === "drop" && phase === "travel" ? "-20px" : "0px";

  return (
    <div
      style={{
        position: "absolute",
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: `translate(-50%, calc(-50% + ${dropY})) scale(${scale}) ${rotate}`,
        transition, opacity,
        fontSize: "2.5rem",
        zIndex: 50,
        filter: `drop-shadow(0 0 14px ${anim.type === "gift" ? COLORS.gold : anim.color || COLORS.pink})`,
        pointerEvents: "none",
      }}
    >
      {anim.icon}
    </div>
  );
}

function SeatEffect({ effect, pos }) {
  if (!pos) return null;
  const isPremium = ["gold_ring", "fireworks", "room_celebration", "screen_flash", "sparkle"].includes(effect);
  const isHammer = effect === "hammer";
  const baseColor = effect === "sparkle" ? "#3B82F6" : effect === "hearts" ? "#EC4899" : effect === "stars" ? "#F59E0B" : COLORS.gold;

  return (
    <>
      {/* Seat glow */}
      <div style={{
        position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
        transform: "translate(-50%, -50%)", width: 80, height: 80, borderRadius: "50%",
        background: `radial-gradient(circle, ${baseColor}50, transparent 70%)`,
        animation: "glowPulse 2s ease-out forwards", zIndex: 39, pointerEvents: "none",
      }} />

      {/* Name highlight */}
      <div style={{
        position: "absolute", left: `${pos.x}%`, top: `calc(${pos.y}% + 35px)`,
        transform: "translateX(-50%)", whiteSpace: "nowrap",
        padding: "2px 8px", borderRadius: "8px",
        background: `${baseColor}30`, border: `1px solid ${baseColor}50`,
        animation: "nameHighlight 2s ease-out forwards", zIndex: 40, pointerEvents: "none",
      }}>
        <span style={{ color: baseColor, fontSize: "8px", fontWeight: "bold" }}>✨ REceiving ✨</span>
      </div>

      {/* Particles for standard effects */}
      {(effect === "hearts" || effect === "stars") && Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
          transform: "translate(-50%, -50%)", fontSize: "1rem",
          animation: `floatUp 2s ease-out forwards`, animationDelay: `${i * 0.15}s`,
          zIndex: 40, pointerEvents: "none",
        }}>
          {effect === "hearts" ? "💖" : "⭐"}
        </div>
      ))}

      {/* Premium: gold ring expand */}
      {isPremium && (
        <div style={{
          position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
          transform: "translate(-50%, -50%)", width: 40, height: 40, borderRadius: "50%",
          border: `3px solid ${COLORS.gold}`, boxShadow: `0 0 20px ${COLORS.gold}`,
          animation: "ringExpand 1.5s ease-out forwards", zIndex: 40, pointerEvents: "none",
        }} />
      )}

      {/* Premium: particle burst */}
      {isPremium && Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        return (
          <div key={i} style={{
            position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
            width: 6, height: 6, borderRadius: "50%", background: COLORS.gold,
            boxShadow: `0 0 6px ${COLORS.gold}`,
            transform: "translate(-50%, -50%)",
            animation: `particleBurst 1.5s ease-out forwards`, animationDelay: `${i * 0.05}s`,
            "--tx": `${Math.cos(angle) * 70}px`, "--ty": `${Math.sin(angle) * 70}px`,
            zIndex: 41, pointerEvents: "none",
          }} />
        );
      })}

      {/* Sparkle particles */}
      {effect === "sparkle" && Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${pos.x + (Math.random() - 0.5) * 15}%`,
          top: `${pos.y + (Math.random() - 0.5) * 15}%`,
          width: 4, height: 4, borderRadius: "50%", background: "#3B82F6",
          boxShadow: "0 0 8px #3B82F6", transform: "translate(-50%, -50%)",
          animation: `sparkle 1.5s ease-out forwards`, animationDelay: `${i * 0.1}s`,
          zIndex: 40, pointerEvents: "none",
        }} />
      ))}

      {/* Screen flash for ultra premium */}
      {effect === "screen_flash" && (
        <div style={{
          position: "absolute", inset: 0, background: COLORS.gold,
          animation: "screenFlash 0.6s ease-out forwards",
          zIndex: 60, pointerEvents: "none",
        }} />
      )}

      {/* Hammer impact: BOOM / BANG / OUCH */}
      {isHammer && (
        <>
          <div style={{
            position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
            transform: "translate(-50%, -50%)",
            fontSize: "1.5rem", fontWeight: "900", color: "#EF4444",
            textShadow: "2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff",
            animation: "hammerText 1.5s ease-out forwards",
            zIndex: 42, pointerEvents: "none",
          }}>
            BOOM!
          </div>
          <div style={{
            position: "absolute", left: `calc(${pos.x}% + 30px)`, top: `calc(${pos.y}% - 20px)`,
            transform: "translate(-50%, -50%)",
            fontSize: "1rem", fontWeight: "900", color: "#F59E0B",
            textShadow: "1px 1px 0 #fff",
            animation: "hammerText 1.5s ease-out 0.2s forwards", opacity: 0,
            zIndex: 42, pointerEvents: "none",
          }}>
            BANG!
          </div>
          <div style={{
            position: "absolute", left: `calc(${pos.x}% - 25px)`, top: `calc(${pos.y}% + 20px)`,
            transform: "translate(-50%, -50%)",
            fontSize: "0.9rem", fontWeight: "900", color: "#8B5CF6",
            textShadow: "1px 1px 0 #fff",
            animation: "hammerText 1.5s ease-out 0.4s forwards", opacity: 0,
            zIndex: 42, pointerEvents: "none",
          }}>
            OUCH!
          </div>
          {/* Cartoon impact star */}
          <div style={{
            position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
            transform: "translate(-50%, -50%)", fontSize: "3rem",
            animation: "cartoonImpact 0.5s ease-out forwards",
            zIndex: 41, pointerEvents: "none",
          }}>
            💥
          </div>
        </>
      )}

      {/* Emoji burst */}
      {effect === "emoji_burst" && Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
          transform: "translate(-50%, -50%)", fontSize: "1.2rem",
          animation: `emojiBurst 1.5s ease-out forwards`, animationDelay: `${i * 0.1}s`,
          zIndex: 40, pointerEvents: "none",
        }}>
          {["✨", "⭐", "💫", "🌟", "✨"][i]}
        </div>
      ))}
    </>
  );
}

export default function AnimationLayer({ animations = [], seatEffects = [], getSeatPosition }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 25 }}>
      {animations.map((anim) => (
        <TravelAnim key={anim.id} anim={anim} />
      ))}
      {seatEffects.map((eff) => (
        <SeatEffect key={eff.id} effect={eff.effect} pos={getSeatPosition ? getSeatPosition(eff.seatId) : null} />
      ))}
      <style>{`
        @keyframes ringExpand {
          0% { width: 40px; height: 40px; opacity: 1; }
          100% { width: 130px; height: 130px; opacity: 0; }
        }
        @keyframes particleBurst {
          0% { transform: translate(-50%, -50%); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))); opacity: 0; }
        }
        @keyframes floatUp {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
          20% { transform: translate(-50%, -80%) scale(1.2); opacity: 1; }
          100% { transform: translate(-50%, -200%) scale(0.6); opacity: 0; }
        }
        @keyframes glowPulse {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          30% { opacity: 1; transform: translate(-50%, -50%) scale(1.3); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.6); }
        }
        @keyframes sparkle {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
        }
        @keyframes screenFlash {
          0% { opacity: 0; } 30% { opacity: 0.4; } 100% { opacity: 0; }
        }
        @keyframes nameHighlight {
          0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
          20% { opacity: 1; transform: translateX(-50%) translateY(0); }
          80% { opacity: 1; }
          100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        }
        @keyframes hammerText {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotate(-15deg); }
          30% { opacity: 1; transform: translate(-50%, -50%) scale(1.3) rotate(5deg); }
          60% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8) rotate(0deg); }
        }
        @keyframes cartoonImpact {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          40% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
        }
        @keyframes emojiBurst {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          40% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
          100% { opacity: 0; transform: translate(-50%, -150%) scale(0.5); }
        }
      `}</style>
    </div>
  );
}