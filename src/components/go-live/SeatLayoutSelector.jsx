import React from "react";
import { SEAT_LAYOUTS } from "./goLiveData";

export default function SeatLayoutSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {SEAT_LAYOUTS.map((sl) => {
        const selected = value === sl.id;
        return (
          <button
            key={sl.id}
            onClick={() => onChange(sl.id)}
            className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border transition active:scale-95 ${
              selected ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"
            }`}
          >
            <span className="text-lg">{sl.icon}</span>
            <span className={`text-[10px] font-bold ${selected ? "text-purple-700" : "text-gray-600"}`}>{sl.label}</span>
            <span className="text-[7px] text-gray-400">{sl.desc}</span>
          </button>
        );
      })}
    </div>
  );
}