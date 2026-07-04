import React from "react";
import { Armchair, Check } from "lucide-react";
import { COLORS, GRID_LAYOUTS } from "./roomData";

export default function SeatManagementSection({ seatCount, onSeatCountChange, readOnly = false }) {
  const seatOptions = [4, 6, 8, 10, 15, 20];

  return (
    <div>
      <p className="text-[10px] font-bold mb-2 px-1" style={{ color: COLORS.gold }}>🪑 Seat Management {readOnly && <span style={{ color: COLORS.softGray }}>(Owner only)</span>}</p>
      <p className="text-[9px] mb-2 px-1" style={{ color: COLORS.softGray }}>
        Choose how many seats your room has. Current: {seatCount} seats (1 host + {seatCount - 1} speakers).
      </p>
      <div className="grid grid-cols-3 gap-2">
        {seatOptions.map((count) => {
          const layout = GRID_LAYOUTS[count];
          const isActive = seatCount === count;
          return (
            <button
              key={count}
              onClick={() => onSeatCountChange(count)}
              disabled={readOnly}
              className={`flex flex-col items-center gap-1 py-2.5 rounded-xl transition relative ${readOnly ? "opacity-50" : "active:scale-95"}`}
              style={isActive
                ? { background: `${COLORS.gold}20`, border: `1px solid ${COLORS.gold}50`, boxShadow: `0 0 10px ${COLORS.gold}30` }
                : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {isActive && (
                <div className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: COLORS.gold }}>
                  <Check size={8} className="text-white" />
                </div>
              )}
              <Armchair size={14} style={{ color: isActive ? COLORS.gold : COLORS.softGray }} />
              <span className="text-[10px] font-bold" style={{ color: isActive ? COLORS.gold : COLORS.white }}>{count}</span>
              <span className="text-[7px]" style={{ color: COLORS.softGray }}>
                {count === 4 ? "Cozy" : count === 6 ? "Small" : count === 8 ? "Medium" : count === 10 ? "Standard" : count === 15 ? "Large" : "VIP"}
              </span>
            </button>
          );
        })}
      </div>
      {/* Preview grid */}
      <div className="mt-2 rounded-xl p-2.5" style={{ background: "rgba(14,69,72,0.3)", border: `1px solid ${COLORS.gold}20` }}>
        <p className="text-[8px] mb-1.5" style={{ color: COLORS.softGray }}>
          Layout Preview: {GRID_LAYOUTS[seatCount]?.label || `${seatCount} Seats`}
        </p>
        <div className="flex justify-center">
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${GRID_LAYOUTS[seatCount]?.cols || 5}, 1fr)` }}
          >
            {Array.from({ length: seatCount }).map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={i === 0
                  ? { background: `${COLORS.gold}30`, border: `1px solid ${COLORS.gold}60` }
                  : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {i === 0 && <span className="text-[7px]">👑</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}