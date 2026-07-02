import React, { useState } from "react";
import { X, Gift, Smile } from "lucide-react";
import { COLORS, GIFT_CATALOG, EMOJIS_3D, EMOJI_CATEGORIES, SEATS } from "./roomData";

const GIFT_CATS = [
  { id: "standard", name: "Standard", icon: "🌹" },
  { id: "premium", name: "Premium", icon: "💎" },
  { id: "luxury", name: "Luxury", icon: "🚀" },
];

export default function InteractionPanel({ type, targetId, onSend, onClose }) {
  const [giftCat, setGiftCat] = useState("standard");
  const [emojiCat, setEmojiCat] = useState("basic");
  const [selectedTarget, setSelectedTarget] = useState(targetId);

  const occupiedSeats = SEATS.filter((s) => s.user && s.id !== 0);
  const targetSeat = SEATS.find((s) => s.id === selectedTarget);

  const items = type === "gift"
    ? GIFT_CATALOG.filter((g) => g.category === giftCat)
    : EMOJIS_3D.filter((e) => e.category === emojiCat);

  const categories = type === "gift" ? GIFT_CATS : EMOJI_CATEGORIES;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-t-3xl max-h-[75vh] overflow-y-auto scrollbar-hide animate-fadeIn"
        style={{ background: COLORS.tealDeep, border: `1px solid ${COLORS.gold}30`, boxShadow: "0 -8px 32px rgba(0,0,0,0.5)" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 pt-3 pb-2 px-4" style={{ background: COLORS.tealDeep }}>
          <div className="w-10 h-1 rounded-full mx-auto mb-2" style={{ background: `${COLORS.gold}40` }} />
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {type === "gift" ? <Gift size={16} style={{ color: COLORS.gold }} /> : <Smile size={16} style={{ color: COLORS.pink }} />}
              <h2 className="text-sm font-bold text-white">{type === "gift" ? "Send Gift" : "Send 3D Emoji"}</h2>
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
              <X size={14} style={{ color: COLORS.softGray }} />
            </button>
          </div>

          {/* Coin balance (gift mode only) */}
          {type === "gift" && (
            <div className="flex items-center justify-end gap-1 mb-2">
              <span className="text-[8px]" style={{ color: COLORS.gold }}>🪙</span>
              <span className="text-[10px] font-bold" style={{ color: COLORS.gold }}>5,000,000 coins</span>
            </div>
          )}
        </div>

        <div className="px-4 pb-6 space-y-3">
          {/* Target seat selector */}
          <div>
            <p className="text-[10px] font-bold mb-1.5 px-1" style={{ color: COLORS.gold }}>🎯 Select Target Seat</p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {occupiedSeats.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedTarget(s.id)}
                  className="flex-shrink-0 flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition active:scale-90"
                  style={selectedTarget === s.id
                    ? { background: `${COLORS.gold}20`, border: `1px solid ${COLORS.gold}50` }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <img src={s.user.avatar} alt={s.user.name} className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-[7px] font-bold" style={{ color: selectedTarget === s.id ? COLORS.gold : COLORS.softGray }}>
                    {s.user.name}
                  </span>
                  <span className="text-[6px]" style={{ color: COLORS.softGray }}>Seat {s.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => type === "gift" ? setGiftCat(c.id) : setEmojiCat(c.id)}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold transition active:scale-95"
                style={(type === "gift" ? giftCat : emojiCat) === c.id
                  ? { background: `${type === "gift" ? COLORS.gold : COLORS.pink}25`, color: type === "gift" ? COLORS.gold : COLORS.pink, border: `1px solid ${type === "gift" ? COLORS.gold : COLORS.pink}40` }
                  : { background: "rgba(255,255,255,0.04)", color: COLORS.softGray, border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span>{c.icon}</span>
                {c.name}
              </button>
            ))}
          </div>

          {/* Category description (emoji mode) */}
          {type === "emoji" && (
            <p className="text-[9px] text-center" style={{ color: COLORS.softGray }}>
              {EMOJI_CATEGORIES.find((c) => c.id === emojiCat)?.desc}
            </p>
          )}

          {/* Items grid */}
          <div className="grid grid-cols-4 gap-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => targetSeat && onSend(item, selectedTarget)}
                disabled={!targetSeat}
                className="flex flex-col items-center gap-1 p-2 rounded-xl transition active:scale-90 disabled:opacity-40"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="text-2xl" style={{ filter: `drop-shadow(0 0 6px ${type === "gift" ? COLORS.gold : item.color || COLORS.pink})` }}>
                  {type === "gift" ? item.icon : item.emoji}
                </span>
                <span className="text-[7px] font-bold" style={{ color: COLORS.white }}>{item.name}</span>
                {type === "gift" && (
                  <span className="text-[7px] font-bold" style={{ color: COLORS.gold }}>
                    🪙 {item.price >= 1000 ? `${(item.price / 1000).toFixed(0)}K` : item.price}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Selected target info */}
          {targetSeat && (
            <div className="rounded-xl p-2 flex items-center gap-2" style={{ background: `${COLORS.gold}10`, border: `1px solid ${COLORS.gold}25` }}>
              <img src={targetSeat.user.avatar} alt="" className="w-7 h-7 rounded-full" />
              <span className="text-[10px] font-bold text-white">→ {targetSeat.user.name}</span>
              <span className="text-[8px] ml-auto" style={{ color: COLORS.softGray }}>Seat {targetSeat.id}</span>
            </div>
          )}

          {/* VIP/Premium notice */}
          {type === "emoji" && (emojiCat === "vip" || emojiCat === "premium") && (
            <div className="rounded-xl p-2 flex items-center gap-1.5" style={{ background: `${COLORS.gold}10`, border: `1px solid ${COLORS.gold}20` }}>
              <span className="text-[9px]" style={{ color: COLORS.gold }}>👑 {emojiCat === "vip" ? "VIP members only" : "Premium & VIP users only"}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}