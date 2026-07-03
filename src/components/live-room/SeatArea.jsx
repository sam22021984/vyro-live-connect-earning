import React from "react";
import { SEATS } from "./roomData";
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

// Row-based layouts: each array defines seats per row.
//   4 seats  → [1, 3]          → 1 top + 3 bottom
//   6 seats  → [3, 3]          → 3 top + 3 bottom
//  10 seats  → [2, 4, 4]       → 2 top + two rows of 4
//  15 seats  → [5, 5, 5]       → three grids of 5
//  20 seats  → [5, 5, 5, 5]    → four grids of 5
const SEAT_LAYOUTS = {
  4: [1, 3],
  6: [3, 3],
  10: [2, 4, 4],
  15: [5, 5, 5],
  20: [5, 5, 5, 5],
};

function getLayout(count) {
  if (SEAT_LAYOUTS[count]) return SEAT_LAYOUTS[count];
  // Fallback for other counts: rows of 5 (first row gets remainder)
  if (count <= 4) return [1, 3];
  const rows = [];
  let remaining = count;
  while (remaining > 0) {
    const rowSize = Math.min(5, remaining);
    rows.push(rowSize);
    remaining -= rowSize;
  }
  return rows;
}

export default function SeatArea({ onSeatClick, seatEffects = [], seatCount = 10 }) {
  const count = Math.max(4, seatCount);
  const seats = generateSeats(count);
  const layout = getLayout(count);

  const getSeatEffects = (seatId) => seatEffects.filter((e) => e.seatId === seatId);
  const seatSize = count <= 6 ? 64 : count <= 10 ? 58 : count <= 15 ? 52 : 48;
  const gapVal = count <= 10 ? "1rem" : "0.7rem";

  // Split seats into rows based on layout
  let seatIndex = 0;
  const rows = layout.map((rowSize, rowIdx) => {
    const rowSeats = seats.slice(seatIndex, seatIndex + rowSize);
    seatIndex += rowSize;
    return rowSeats;
  });

  return (
    <div className="flex flex-col items-center w-full mx-auto" style={{ gap: gapVal, maxWidth: "420px" }}>
      {rows.map((rowSeats, rowIdx) => (
        <div
          key={rowIdx}
          className="flex justify-center items-center w-full"
          style={{ gap: count <= 6 ? "1.25rem" : count <= 10 ? "1rem" : "0.8rem" }}
        >
          {rowSeats.map((seat) => {
            const isHost = seat.id === 0;
            return (
              <Seat
                key={seat.id}
                seat={seat}
                size={isHost ? seatSize + 8 : seatSize}
                onClick={onSeatClick}
                effects={getSeatEffects(seat.id)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}