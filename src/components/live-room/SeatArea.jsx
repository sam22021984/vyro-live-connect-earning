import React from "react";
import { COLORS, SEAT_LAYOUT } from "./roomData";
import Seat from "./Seat";

export default function SeatArea() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Center glow */}
      <div
        className="absolute w-48 h-48 rounded-full"
        style={{
          background: `radial-gradient(circle, ${COLORS.royalPurple}20 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Seats */}
      {SEAT_LAYOUT.map((seat) => (
        <Seat key={seat.id} seat={seat} isHost={seat.role === "host"} />
      ))}
    </div>
  );
}