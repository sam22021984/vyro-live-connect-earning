import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const LANGUAGES = ["English", "Arabic", "Hindi", "Urdu", "French", "Spanish", "Portuguese", "Turkish", "Indonesian", "Malay", "Russian", "German", "Chinese", "Japanese", "Korean"];

export default function LanguageSelector({ selected, onChange }) {
  const [showList, setShowList] = React.useState(false);
  const available = LANGUAGES.filter((l) => !selected.includes(l));

  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Languages</label>
      <div className="flex flex-wrap gap-1.5 mb-1.5">
        {selected.map((lang) => (
          <span key={lang} className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center gap-1">
            {lang}
            <button onClick={() => onChange(selected.filter((l) => l !== lang))}><X size={10} /></button>
          </span>
        ))}
        <button onClick={() => setShowList(!showList)} className="px-3 py-1.5 rounded-full bg-gray-50 text-gray-500 text-xs font-bold border border-gray-100 flex items-center gap-1">
          <Plus size={10} /> Add
        </button>
      </div>
      {showList && (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-2 flex flex-wrap gap-1.5">
          {available.length === 0 ? <p className="text-[10px] text-gray-400 p-1">All languages added</p> : available.map((lang) => (
            <button key={lang} onClick={() => { onChange([...selected, lang]); }} className="px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 text-[11px] font-medium active:scale-95">
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}