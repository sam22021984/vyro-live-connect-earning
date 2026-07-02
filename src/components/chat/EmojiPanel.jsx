import React, { useState } from "react";
import { X, Sparkles, Coins } from "lucide-react";
import { COLORS, STANDARD_EMOJIS, PREMIUM_EMOJIS, formatCoins } from "./chatData";

export default function EmojiPanel({ open, mode, onClose, onPick, onBuyPremium, coins }) {
  const [tab, setTab] = useState(mode === "premium" ? "premium" : "standard");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl max-h-[55vh] flex flex-col animate-fadeIn">
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-100">
          <div className="flex gap-2">
            <button onClick={() => setTab("standard")} className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${tab === "standard" ? "text-white" : "text-gray-500 bg-gray-100"}`} style={tab === "standard" ? { background: COLORS.primary } : {}}>
              😊 Standard
            </button>
            <button onClick={() => setTab("premium")} className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 ${tab === "premium" ? "text-white" : "text-gray-500 bg-gray-100"}`} style={tab === "premium" ? { background: `linear-gradient(135deg, ${COLORS.gold}, #F59E0B)` } : {}}>
              <Sparkles size={12} /> Premium
            </button>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X size={15} className="text-gray-500" /></button>
        </div>

        {tab === "premium" && (
          <div className="px-4 py-2 flex items-center justify-between bg-amber-50">
            <span className="text-[11px] font-semibold text-amber-700">Premium Coin Emojis</span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600"><Coins size={12} /> {formatCoins(coins)}</span>
          </div>
        )}

        <div className="overflow-y-auto p-3 grid grid-cols-6 gap-2">
          {tab === "standard"
            ? STANDARD_EMOJIS.map((e, i) => (
                <button key={i} onClick={() => onPick(e)} className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl active:scale-90 hover:bg-gray-100 transition">
                  {e}
                </button>
              ))
            : PREMIUM_EMOJIS.map((e, i) => (
                <button key={i} onClick={() => onBuyPremium(e)} className="relative w-full rounded-xl flex flex-col items-center justify-center py-2 active:scale-95 hover:bg-amber-50 transition border border-amber-100">
                  <span className="text-2xl">{e.emoji}</span>
                  <span className="flex items-center gap-0.5 text-[8px] font-bold text-amber-600 mt-0.5"><Coins size={9} /> {formatCoins(e.price)}</span>
                </button>
              ))}
        </div>
      </div>
    </div>
  );
}