import React from "react";

const DECORATIONS = [
  { name: "Avatar Frame", icon: "🖼️", value: "Golden Crown" },
  { name: "Profile Theme", icon: "🎨", value: "Purple Galaxy" },
  { name: "Name Color", icon: "✨", value: "Gradient" },
  { name: "Chat Bubble", icon: "💬", value: "Sparkle" },
  { name: "Entrance Effect", icon: "🚪", value: "Rose Petals" },
  { name: "Vehicle", icon: "🚗", value: "Sports Car" },
  { name: "Background", icon: "🏞️", value: "Sunset" },
  { name: "Special Title", icon: "🏷️", value: "Rising Star" },
];

export default function DecorationsSection({ profile }) {
  return (
    <div className="px-3 pt-4">
      <h2 className="text-sm font-bold text-gray-800 mb-2">🎨 Decorations</h2>
      <div className="grid grid-cols-4 gap-2">
        {DECORATIONS.map((dec) => (
          <button
            key={dec.name}
            className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-white border border-gray-50 shadow-sm active:scale-95 transition"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center text-lg">
              {dec.icon}
            </div>
            <span className="text-[8px] font-bold text-gray-600 text-center">{dec.name}</span>
            <span className="text-[7px] text-gray-400 text-center truncate w-full">{dec.value}</span>
          </button>
        ))}
      </div>
    </div>
  );
}