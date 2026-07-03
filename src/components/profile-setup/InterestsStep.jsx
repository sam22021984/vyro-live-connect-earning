import React, { useState } from "react";
import {
  Music, Gamepad2, Plane, ShoppingBag, Trophy, GraduationCap,
  Smile, UtensilsCrossed, Film, Camera, Cpu, Mic, Headphones, Radio,
  ArrowRight, Check,
} from "lucide-react";

const CATEGORIES = [
  { name: "Music", icon: Music, color: "#EC4899" },
  { name: "Gaming", icon: Gamepad2, color: "#8B5CF6" },
  { name: "Travel", icon: Plane, color: "#3B82F6" },
  { name: "Fashion", icon: ShoppingBag, color: "#F59E0B" },
  { name: "Sports", icon: Trophy, color: "#10B981" },
  { name: "Education", icon: GraduationCap, color: "#6366F1" },
  { name: "Comedy", icon: Smile, color: "#EF4444" },
  { name: "Food", icon: UtensilsCrossed, color: "#F97316" },
  { name: "Movies", icon: Film, color: "#06B6D4" },
  { name: "Photography", icon: Camera, color: "#8B5CF6" },
  { name: "Technology", icon: Cpu, color: "#3B82F6" },
  { name: "Podcast", icon: Mic, color: "#14B8A6" },
  { name: "Audio Rooms", icon: Headphones, color: "#A855F7" },
  { name: "Live Streaming", icon: Radio, color: "#E11D48" },
];

export default function InterestsStep({ data, updateData, onContinue }) {
  const [selected, setSelected] = useState(data.interests || []);

  const toggle = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const canContinue = selected.length >= 3;

  return (
    <div>
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selected.includes(cat.name);
          return (
            <button
              key={cat.name}
              onClick={() => toggle(cat.name)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition active:scale-95 ${
                isSelected ? "border-purple-400 bg-purple-50" : "border-gray-100 bg-white"
              }`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center relative"
                style={{ background: isSelected ? cat.color : `${cat.color}15` }}
              >
                <cat.icon size={18} style={{ color: isSelected ? "#fff" : cat.color }} />
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center border border-white">
                    <Check size={8} className="text-white" />
                  </div>
                )}
              </div>
              <span className={`text-[10px] font-semibold text-center ${isSelected ? "text-purple-700" : "text-gray-600"}`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-400">{selected.length} selected</span>
        <span className={`text-xs font-semibold ${canContinue ? "text-green-500" : "text-gray-400"}`}>
          {canContinue ? "✓ Great choices!" : `Select ${3 - selected.length} more`}
        </span>
      </div>

      <p className="text-[10px] text-gray-300 mb-6">
        We'll use your interests to personalize content recommendations.
      </p>

      <button
        onClick={() => { updateData({ interests: selected }); onContinue(); }}
        disabled={!canContinue}
        className="w-full rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-200 transition-all active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-2"
        style={{ height: "52px" }}
      >
        Continue <ArrowRight size={16} />
      </button>
    </div>
  );
}