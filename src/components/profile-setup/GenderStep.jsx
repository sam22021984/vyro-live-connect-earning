import React, { useState } from "react";
import { User, ArrowRight, Check } from "lucide-react";

const OPTIONS = [
  { value: "Male", label: "Male", emoji: "👨", color: "#3B82F6", bg: "from-blue-100 to-blue-200" },
  { value: "Female", label: "Female", emoji: "👩", color: "#EC4899", bg: "from-pink-100 to-pink-200" },
  { value: "Other", label: "Prefer Not to Say", emoji: "✨", color: "#8B5CF6", bg: "from-purple-100 to-purple-200" },
];

export default function GenderStep({ data, updateData, onContinue }) {
  const [selected, setSelected] = useState(data.gender || "");

  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
          <User size={32} className="text-purple-500" />
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {OPTIONS.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl border-2 transition active:scale-[0.98] ${
                isSelected ? "border-purple-400 bg-purple-50" : "border-gray-100 bg-white"
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${opt.bg} flex items-center justify-center`}>
                <span className="text-2xl">{opt.emoji}</span>
              </div>
              <span className={`text-sm font-semibold flex-1 text-left ${isSelected ? "text-purple-700" : "text-gray-700"}`}>
                {opt.label}
              </span>
              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => { updateData({ gender: selected }); onContinue(); }}
        disabled={!selected}
        className="w-full rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-200 transition-all active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-2"
        style={{ height: "52px" }}
      >
        Continue <ArrowRight size={16} />
      </button>
    </div>
  );
}