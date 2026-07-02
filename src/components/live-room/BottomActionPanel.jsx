import React, { useState } from "react";
import { COLORS, ROOM_TOOLS, QUICK_GIFTS } from "./roomData";
import { useToast } from "@/components/ui/use-toast";

export default function BottomActionPanel({ roomTitle }) {
  const { toast } = useToast();
  const [showGifts, setShowGifts] = useState(false);
  const [muted, setMuted] = useState(false);

  const handleTool = (tool) => {
    if (tool.label === "Gift") {
      setShowGifts(!showGifts);
    } else if (tool.label === "Mic") {
      setMuted(!muted);
      toast({ title: muted ? "Microphone ON" : "Microphone Muted" });
    } else {
      toast({ title: tool.label + " activated" });
    }
  };

  return (
    <>
      {/* Gift panel */}
      {showGifts && (
        <div className="absolute bottom-20 left-0 right-0 z-30 px-3 animate-fadeIn">
          <div className="rounded-2xl p-3" style={{ background: "rgba(20,20,31,0.9)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white">Quick Gifts</span>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: `${COLORS.gold}20` }}>
                <span className="text-[10px] font-bold" style={{ color: COLORS.gold }}>🪙 5,000,000</span>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {QUICK_GIFTS.map((g, i) => (
                <button
                  key={i}
                  onClick={() => { toast({ title: `Sent ${g.icon} ${g.name}!` }); setShowGifts(false); }}
                  className="flex flex-col items-center p-2 rounded-xl transition active:scale-90"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span className="text-xl">{g.icon}</span>
                  <span className="text-[7px] font-bold mt-0.5" style={{ color: COLORS.gold }}>{(g.price / 1000).toFixed(0)}K</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom action bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-3 pb-4 pt-2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}>
        <div
          className="flex items-center justify-around gap-1.5 rounded-2xl px-3 py-2.5"
          style={{
            background: "rgba(20,20,31,0.7)",
            backdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {ROOM_TOOLS.map((tool, i) => {
            const isMuted = tool.label === "Mic" && muted;
            const isActive = tool.label === "Gift" && showGifts;
            return (
              <button
                key={i}
                onClick={() => handleTool(tool)}
                className="flex flex-col items-center gap-0.5 transition active:scale-90"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition"
                  style={{
                    background: isMuted
                      ? `${COLORS.crimson}30`
                      : isActive
                      ? `${tool.color}30`
                      : "rgba(255,255,255,0.06)",
                    border: `1px solid ${isMuted ? COLORS.crimson + "40" : isActive ? tool.color + "40" : "rgba(255,255,255,0.1)"}`,
                    boxShadow: isActive ? `0 0 12px ${tool.color}40` : "none",
                  }}
                >
                  <span className="text-base">{tool.icon}</span>
                </div>
                <span className="text-[7px] font-bold" style={{ color: isMuted ? COLORS.crimson : isActive ? tool.color : COLORS.softGray }}>
                  {isMuted ? "Muted" : tool.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}