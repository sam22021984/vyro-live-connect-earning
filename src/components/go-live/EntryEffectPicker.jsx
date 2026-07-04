import React from "react";
import { ENTRY_EFFECTS } from "./goLiveData";

export default function EntryEffectPicker({ value, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {ENTRY_EFFECTS.map((eff) => {
        const selected = value === eff.id;
        return (
          <button
            key={eff.id}
            onClick={() => onChange(eff.id)}
            className={`flex-shrink-0 flex flex-col items-center gap-1 w-14 py-2 rounded-xl border transition active:scale-95 ${
              selected ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"
            }`}
          >
            <span className="text-lg">{eff.icon}</span>
            <span className={`text-[8px] font-semibold ${selected ? "text-purple-700" : "text-gray-500"}`}>{eff.label}</span>
          </button>
        );
      })}
    </div>
  );
}