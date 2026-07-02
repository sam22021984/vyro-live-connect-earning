import React, { useState } from "react";
import { X, Coins, Check } from "lucide-react";
import { COLORS, GIFTS, formatCoins } from "./chatData";

export default function GiftGallery({ open, onClose, onSend, coins }) {
  const [tab, setTab] = useState("standard");
  const [selected, setSelected] = useState(null);
  const [sending, setSending] = useState(false);
  if (!open) return null;

  const filtered = GIFTS.filter((g) => g.category === tab);

  const handleSend = () => {
    if (!selected) return;
    setSending(true);
    setTimeout(() => {
      onSend(selected);
      setSelected(null);
      setSending(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl max-h-[70vh] flex flex-col animate-fadeIn">
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Gift Gallery</h3>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs font-bold" style={{ color: COLORS.gold }}><Coins size={14} /> {formatCoins(coins)}</span>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X size={15} className="text-gray-500" /></button>
          </div>
        </div>

        <div className="flex gap-2 px-4 py-2">
          <button onClick={() => { setTab("standard"); setSelected(null); }} className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${tab === "standard" ? "text-white" : "text-gray-500 bg-gray-100"}`} style={tab === "standard" ? { background: COLORS.primary } : {}}>
            Standard Gifts
          </button>
          <button onClick={() => { setTab("luxury"); setSelected(null); }} className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${tab === "luxury" ? "text-white" : "text-gray-500 bg-gray-100"}`} style={tab === "luxury" ? { background: `linear-gradient(135deg, ${COLORS.gold}, #F59E0B)` } : {}}>
            💎 Luxury Gifts
          </button>
        </div>

        <div className="overflow-y-auto px-3 pb-3 grid grid-cols-4 gap-2">
          {filtered.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelected(g)}
              className={`relative rounded-2xl flex flex-col items-center justify-center py-3 transition active:scale-95 border-2 ${selected?.id === g.id ? "border-blue-400 bg-blue-50" : "border-gray-100 bg-gray-50"}`}
            >
              {selected?.id === g.id && <div className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: COLORS.primary }}><Check size={10} className="text-white" /></div>}
              <span className="text-3xl" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>{g.icon}</span>
              <span className="text-[10px] font-medium text-gray-600 mt-1">{g.name}</span>
              <span className="flex items-center gap-0.5 text-[9px] font-bold mt-0.5" style={{ color: COLORS.gold }}><Coins size={9} /> {formatCoins(g.price)}</span>
            </button>
          ))}
        </div>

        {selected && (
          <div className="px-4 py-3 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selected.icon}</span>
                <div>
                  <p className="text-xs font-bold text-gray-800">{selected.name}</p>
                  <p className="flex items-center gap-1 text-[11px] font-bold" style={{ color: COLORS.gold }}><Coins size={11} /> {formatCoins(selected.price)}</p>
                </div>
              </div>
              <span className="text-[10px] text-gray-400">Balance: {formatCoins(coins)}</span>
            </div>
            <button
              onClick={handleSend}
              disabled={sending || coins < selected.price}
              className="w-full py-3 rounded-xl text-white text-sm font-bold active:scale-95 transition disabled:opacity-50"
              style={{ background: `linear-gradient(135deg, ${COLORS.primary}, #4F8BFF)`, boxShadow: `0 4px 14px ${COLORS.primary}40` }}
            >
              {sending ? "Sending..." : coins < selected.price ? "Insufficient Coins" : `Send Gift · ${formatCoins(selected.price)} Coins`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}