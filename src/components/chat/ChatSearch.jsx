import React, { useState } from "react";
import { ArrowLeft, Search, X } from "lucide-react";
import { COLORS } from "./chatData";

export default function ChatSearch({ open, onClose, messages }) {
  const [query, setQuery] = useState("");
  if (!open) return null;

  const results = query.trim()
    ? messages.filter((m) => {
        const q = query.toLowerCase();
        return (m.text && m.text.toLowerCase().includes(q)) ||
               (m.date && m.date.toLowerCase().includes(q)) ||
               (m.gift_name && m.gift_name.toLowerCase().includes(q));
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fadeIn">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-3 py-2.5 flex items-center gap-2">
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search words, dates, gifts..."
            className="w-full py-2.5 pl-9 pr-8 rounded-full text-sm bg-gray-100 outline-none focus:ring-2 focus:ring-blue-200"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
              <X size={12} className="text-white" />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {query && results.length === 0 && <p className="text-center text-sm text-gray-400 mt-10">No results found</p>}
        {results.map((m, i) => (
          <div key={i} className="px-3 py-2.5 rounded-xl mb-1.5" style={{ background: m.is_own ? `${COLORS.primary}08` : COLORS.cardBg }}>
            <p className="text-sm text-gray-700">{m.type === "gift" ? `🎁 ${m.gift_name} (${m.gift_price} coins)` : m.text}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{m.date} · {m.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}