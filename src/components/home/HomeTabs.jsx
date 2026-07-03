import React from "react";

const TABS = ["Following", "Friends", "Recommended", "Trending", "Nearby", "New", "Popular", "Video Live", "Audio Live", "Party Rooms"];

export default function HomeTabs({ active, onChange }) {
  return (
    <div className="sticky top-[53px] z-20 bg-white/90 backdrop-blur-xl border-b border-gray-50">
      <div className="flex gap-1 px-3 py-2 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition active:scale-95 ${
              active === tab
                ? "bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white shadow-sm"
                : "bg-gray-50 text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}