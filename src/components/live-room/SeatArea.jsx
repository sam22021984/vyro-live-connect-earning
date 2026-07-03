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
  const numRows = layout.length;
  const maxPerRow = Math.max(...layout);

  const getSeatEffects = (seatId) => seatEffects.filter((e) => e.seatId === seatId);
  // Gaps scale with seat density
  const rowGap = count <= 6 ? "0.6rem" : count <= 10 ? "0.5rem" : "0.4rem";
  const colGap = count <= 6 ? "0.6rem" : count <= 10 ? "0.5rem" : "0.35rem";

  // Split seats into rows based on layout
  let seatIndex = 0;
  const rows = layout.map((rowSize) => {
    const rowSeats = seats.slice(seatIndex, seatIndex + rowSize);
    seatIndex += rowSize;
    return rowSeats;
  });

  // Each seat takes equal share of the row width
  const seatFlex = `1 1 0`;

  return (
    <div className="flex flex-col justify-between w-full h-full">
      {rows.map((rowSeats, rowIdx) => (
        <div
          key={rowIdx}
          className="flex justify-center items-center w-full"
          style={{ gap: colGap }}
        >
          {rowSeats.map((seat) => (
            <div key={seat.id} style={{ flex: seatFlex, maxWidth: "80px" }} className="flex justify-center">
              <Seat
                seat={seat}
                fluid
                onClick={onSeatClick}
                effects={getSeatEffects(seat.id)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}