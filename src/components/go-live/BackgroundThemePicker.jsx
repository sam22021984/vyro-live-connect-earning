import React from "react";
import { BACKGROUND_THEMES } from "./goLiveData";

export default function BackgroundThemePicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {BACKGROUND_THEMES.map((theme) => {
        const selected = value === theme.id;
        return (
          <button
            key={theme.id}
            onClick={() => onChange(theme.id)}
            className={`relative rounded-xl overflow-hidden transition active:scale-95 ${selected ? "ring-2 ring-purple-500" : ""}`}
            style={{ height: "56px", background: theme.gradient }}
          >
            <span className="absolute bottom-1 left-1.5 text-[8px] font-bold text-white/90">{theme.label}</span>
            {selected && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <span className="text-xs">✓</span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}