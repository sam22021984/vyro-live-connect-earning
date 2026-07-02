import React from "react";
import { SEATS } from "./roomData";
import Seat from "./Seat";

export default function SeatArea({ onSeatClick, seatEffects = [] }) {
  const host = SEATS[0];
  const speakers = SEATS.slice(1);
  const cols = 5;

  const getSeatEffects = (seatId) => seatEffects.filter((e) => e.seatId === seatId);

  return (
    <div className="flex flex-col items-center gap-4 py-2 w-full max-w-sm mx-auto">
      {/* Host seat - centered at top */}
      <Seat seat={host} size={64} onClick={onSeatClick} effects={getSeatEffects(host.id)} />

      {/* Speaker grid */}
      <div
        className="grid gap-x-4 gap-y-3 w-full"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {speakers.map((seat) => (
          <Seat key={seat.id} seat={seat} size={52} onClick={onSeatClick} effects={getSeatEffects(seat.id)} />
        ))}
      </div>
    </div>
  );
}