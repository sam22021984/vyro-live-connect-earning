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

const SEAT_LAYOUTS = {
  4: [1, 3],
  6: [3, 3],
  10: [2, 4, 4],
  15: [5, 5, 5],
  20: [5, 5, 5, 5],
};

function getLayout(count) {
  if (SEAT_LAYOUTS[count]) return SEAT_LAYOUTS[count];
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

  let seatIndex = 0;
  const rows = layout.map((rowSize) => {
    const rowSeats = seats.slice(seatIndex, seatIndex + rowSize);
    seatIndex += rowSize;
    return rowSeats;
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center" style={{ gap: "0.6rem" }}>
      {rows.map((rowSeats, rowIdx) => (
        <div
          key={rowIdx}
          className="flex justify-center items-center w-full"
          style={{ gap: "0.5rem" }}
        >
          {rowSeats.map((seat) => (
            <Seat
              key={seat.id}
              seat={seat}
              size={50}
              onClick={onSeatClick}
              effects={getSeatEffects(seat.id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}