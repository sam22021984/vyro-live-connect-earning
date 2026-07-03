import React from "react";
import { SEATS, GRID_LAYOUTS } from "./roomData";
import Seat from "./Seat";

// Generate seats for any count. Uses existing SEATS data for the first 10,
// then generates empty seats for counts > 10.
function generateSeats(count) {
  const seats = [];
  for (let i = 0; i < count; i++) {
    if (i < SEATS.length) {
      seats.push(SEATS[i]);
    } else {
      seats.push({ id: i, role: "speaker", user: null });
    }
  }
  return seats;
}

export default function SeatArea({ onSeatClick, seatEffects = [], seatCount = 10 }) {
  const count = Math.max(4, seatCount);
  const layout = GRID_LAYOUTS[count] || GRID_LAYOUTS[10];
  const seats = generateSeats(count);
  const host = seats[0];
  const speakers = seats.slice(1);
  const cols = layout.cols;

  const getSeatEffects = (seatId) => seatEffects.filter((e) => e.seatId === seatId);
  const seatSize = count <= 6 ? 56 : count <= 10 ? 52 : count <= 15 ? 46 : 42;
  const gapY = count <= 10 ? "gap-y-3" : "gap-y-2";

  return (
    <div className="flex flex-col items-center gap-3 py-1 w-full max-w-sm mx-auto">
      {/* Host seat - centered at top */}
      <Seat seat={host} size={seatSize + 8} onClick={onSeatClick} effects={getSeatEffects(host.id)} />

      {/* Speaker grid */}
      <div
        className={`grid gap-x-3 ${gapY} w-full`}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {speakers.map((seat) => (
          <Seat key={seat.id} seat={seat} size={seatSize} onClick={onSeatClick} effects={getSeatEffects(seat.id)} />
        ))}
      </div>
    </div>
  );
}