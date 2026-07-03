import React from "react";
import { Check, X } from "lucide-react";

const CATEGORY_TAGS = [
  "Gaming", "Music", "Comedy", "Education", "Live Shows", "Audio Rooms",
  "Dance", "Cooking", "Art", "Fashion", "Travel", "Sports", "Tech", "News", "Beauty", "Fitness",
];

export default function CategoryTags({ selected, onChange }) {
  const toggle = (tag) => {
    if (selected.includes(tag)) onChange(selected.filter((t) => t !== tag));
    else onChange([...selected, tag]);
  };

  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Category Tags / Interests</label>
      <div className="flex flex-wrap gap-1.5">
        {CATEGORY_TAGS.map((tag) => {
          const active = selected.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggle(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition active:scale-95 ${active ? "bg-purple-500 text-white" : "bg-gray-50 text-gray-500 border border-gray-100"}`}
            >
              {active && <Check size={10} className="inline mr-0.5" />} {tag}
            </button>
          );
        })}
      </div>
      <p className="text-[9px] text-gray-300 mt-1">Selected: {selected.length}</p>
    </div>
  );
}