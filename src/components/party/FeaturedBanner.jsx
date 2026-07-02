import React from "react";
import { COLORS } from "./partyData";

export default function FeaturedBanner({ onJoin }) {
  return (
    <div className="rounded-2xl overflow-hidden relative" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <div className="relative h-36" style={{ background: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.pink} 50%, ${COLORS.gold} 100%)` }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)" }} />
        <div className="relative h-full p-4 flex flex-col justify-between">
          <div>
            <span className="text-[8px] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(4px)" }}>
              ✨ Featured Event
            </span>
            <h2 className="text-base font-bold text-white mt-1.5">Champion Cup Party Night</h2>
            <p className="text-[10px] text-white/80">Join the biggest party event of the week! Live music, PK battles & mega gifts!</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1.5">
                {["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop"].map((a, i) => (
                  <img key={i} src={a} className="w-6 h-6 rounded-full object-cover border-2 border-white" alt="" />
                ))}
              </div>
              <span className="text-[9px] text-white/90 font-semibold">12.4K joining</span>
            </div>
            <button
              onClick={() => onJoin?.()}
              className="px-3 py-1.5 rounded-xl text-[10px] font-bold text-white transition active:scale-95"
              style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              Join Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}