import React from "react";
import Seat from "./Seat";

// VYRO LIVE CONNECT grid layouts
const SEAT_LAYOUTS = {
  2: [2],
  3: [3],
  6: [1, 5],
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

export default function SeatArea({ seats = [], onSeatClick, seatEffects = [], registerSeatRef }) {
  const count = Math.max(2, seats.length);
  const layout = getLayout(count);

  const getSeatEffects = (seatId) => seatEffects.filter((e) => e.seatId === seatId);

  let seatIndex = 0;
  const rows = layout.map((rowSize) => {
    const rowSeats = seats.slice(seatIndex, seatIndex + rowSize);
    seatIndex += rowSize;
    return rowSeats;
  });

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
              ref={(el) => registerSeatRef?.(seat.id, el)}
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