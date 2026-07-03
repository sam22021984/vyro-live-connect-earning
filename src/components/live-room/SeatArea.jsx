import React from "react";
import { SEATS } from "./roomData";
import Seat from "./Seat";

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

// VYRO LIVE CONNECT grid layouts
const SEAT_LAYOUTS = {
  2: [2],        // 1 × 2 — center aligned
  3: [3],        // 1 × 3 — center aligned
  6: [1, 5],    // 1 top, 5 bottom
  8: [4, 4],     // 4 × 2
  10: [5, 5],    // 5 × 2
  15: [5, 5, 5], // 5 × 3
  20: [5, 5, 5, 5], // 5 × 4
};

function getLayout(count) {
  if (SEAT_LAYOUTS[count]) return SEAT_LAYOUTS[count];
  // Fallback: dynamic grid with max 5 per row
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
  const count = Math.max(2, seatCount);
  const seats = generateSeats(count);
  const layout = getLayout(count);

  const getSeatEffects = (seatId) => seatEffects.filter((e) => e.seatId === seatId);

  let seatIndex = 0;
  const rows = layout.map((rowSize) => {
    const rowSeats = seats.slice(seatIndex, seatIndex + rowSize);
    seatIndex += rowSize;
    return rowSeats;
  });

  // 16dp seat-to-seat spacing, centered alignment
  return (
    <div className="w-full h-full flex flex-col justify-start items-center pt-2" style={{ gap: "16px" }}>
      {rows.map((rowSeats, rowIdx) => (
        <div
          key={rowIdx}
          className="flex justify-center items-center w-full"
          style={{ gap: "16px" }}
        >
          {rowSeats.map((seat) => (
            <Seat
              key={seat.id}
              seat={seat}
              onClick={onSeatClick}
              effects={getSeatEffects(seat.id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}