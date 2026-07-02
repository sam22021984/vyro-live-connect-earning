import React from "react";
import { COLORS, SEATS } from "./roomData";
import Seat from "./Seat";

export default function SeatArea() {
  const host = SEATS[0];
  const speakers = SEATS.slice(1);
  const cols = 5;

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      {/* Host seat - centered at top */}
      <Seat seat={host} size={64} />

      {/* Speaker grid */}
      <div
        className="grid gap-x-4 gap-y-3"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {speakers.map((seat) => (
          <Seat key={seat.id} seat={seat} size={52} />
        ))}
      </div>
    </div>
  );
}