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

// VYRO LIVE CONNECT grid layouts — columns per row
const SEAT_LAYOUTS = {
  2: [2],
  3: [3],
  8: [4, 4],
  10: [5, 5],
  15: [5, 5, 5],
  20: [5, 5, 5, 5],
};

function getLayout(count) {
  if (SEAT_LAYOUTS[count]) return SEAT_LAYOUTS[count];
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

  const maxCols = Math.max(...layout);

  return (
    <div
      className="w-full h-full grid"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, 1fr)`,
        gridTemplateRows: `repeat(${rows.length}, 1fr)`,
        gap: "12px",
        justifyItems: "center",
        alignItems: "center",
        padding: "4px",
      }}
    >
      {rows.flatMap((rowSeats, rowIdx) =>
        rowSeats.map((seat) => (
          <Seat
            key={seat.id}
            seat={seat}
            onClick={onSeatClick}
            effects={getSeatEffects(seat.id)}
          />
        ))
      )}
    </div>
  );
}