import React from "react";
import { ROOM_TYPES } from "./goLiveData";

export default function RoomTypeSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {ROOM_TYPES.map((rt) => {
        const selected = value === rt.id;
        const needsExtra = rt.id === "password" || rt.id === "ticket";
        return (
          <button
            key={rt.id}
            onClick={() => onChange(rt.id)}
            className={`flex items-center gap-2 p-2.5 rounded-xl border transition active:scale-95 text-left ${
              selected ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"
            }`}
          >
            <span className="text-lg flex-shrink-0">{rt.icon}</span>
            <div className="min-w-0">
              <p className={`text-xs font-bold ${selected ? "text-purple-700" : "text-gray-700"}`}>{rt.label}</p>
              <p className="text-[8px] text-gray-400 truncate">{rt.desc}</p>
            </div>
            {needsExtra && selected && (
              <span className="ml-auto text-[7px] font-bold text-orange-500 bg-orange-50 px-1 rounded">●</span>
            )}
          </button>
        );
      })}
    </div>
  );
}