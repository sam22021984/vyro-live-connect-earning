import React, { useState, useMemo } from "react";
import { X, Gift, Smile } from "lucide-react";
import { COLORS, EMOJIS_3D, EMOJI_CATEGORIES, SEATS } from "./roomData";
import { useGifts } from "@/hooks/useGifts";

export default function InteractionPanel({ type, targetId, onSend, onClose }) {
  const { gifts, coins, loading } = useGifts();
  const [giftCat, setGiftCat] = useState("standard");
  const [emojiCat, setEmojiCat] = useState("basic");
  const [selectedTarget, setSelectedTarget] = useState(targetId);

  const occupiedSeats = SEATS.filter((s) => s.user && s.id !== 0);
  const targetSeat = SEATS.find((s) => s.id === selectedTarget);

  // Build categories from database gifts
  const giftCategories = useMemo(() => {
    const cats = [...new Set(gifts.map((g) => g.category).filter(Boolean))];
    if (cats.length === 0) return [{ id: "standard", name: "Standard", icon: "🌹" }];
    const icons = { standard: "🌹", luxury: "🚀", fun: "🎉", special: "💎", popular: "🔥" };
    return cats.map((c) => ({ id: c, name: c.charAt(0).toUpperCase() + c.slice(1), icon: icons[c] || "🎁" }));
  }, [gifts]);

  const activeGiftCat = giftCategories.some((c) => c.id === giftCat) ? giftCat : giftCategories[0]?.id;

  const giftItems = gifts.filter((g) => g.category === activeGiftCat && g.is_active !== false);
  const emojiItems = EMOJIS_3D.filter((e) => e.category === emojiCat);

  const items = type === "gift" ? giftItems : emojiItems;
  const categories = type === "gift" ? giftCategories : EMOJI_CATEGORIES;

  const handleGiftClick = (gift) => {
    if (!targetSeat) return;
    onSend({
      id: gift.id,
      name: gift.name,
      icon: gift.icon,
      price: gift.price_coins || gift.price || 0,
      category: gift.category,
      effect: "hearts",
      recipient_id: targetSeat.user?.vyro_id || targetSeat.id,
      recipient_name: targetSeat.user?.name,
    }, selectedTarget);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-t-3xl flex flex-col animate-fadeIn"
        style={{
          background: COLORS.tealDeep,
          border: `1px solid ${COLORS.gold}30`,
          boxShadow: "0 -8px 32px rgba(0,0,0,0.5)",
          maxHeight: "82vh",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Header — sticky */}
        <div className="sticky top-0 z-10 pt-3 pb-2 px-4 flex-shrink-0" style={{ background: COLORS.tealDeep }}>
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
            <div className="flex items-center justify-end gap-1 mb-1">
              <span className="text-[8px]" style={{ color: COLORS.gold }}>🪙</span>
              <span className="text-[10px] font-bold" style={{ color: COLORS.gold }}>{coins.toLocaleString()} coins</span>
            </div>
          )}
        </div>

        {/* Scrollable content */}
        <div className="px-4 pb-4 space-y-2.5 overflow-y-auto scrollbar-hide flex-1">
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
                style={(type === "gift" ? activeGiftCat : emojiCat) === c.id
                  ? { background: `${type === "gift" ? COLORS.gold : COLORS.pink}25`, color: type === "gift" ? COLORS.gold : COLORS.pink, border: `1px solid ${type === "gift" ? COLORS.gold : COLORS.pink}40` }
                  : { background: "rgba(255,255,255,0.04)", color: COLORS.softGray, border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span>{c.icon}</span>
                {c.name}
              </button>
            ))}
          </div>

          {/* Items grid */}
          {type === "gift" && loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-1">
              <span className="text-2xl">🎁</span>
              <p className="text-[10px]" style={{ color: COLORS.softGray }}>No gifts available</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {items.map((item) => {
                const price = type === "gift" ? (item.price_coins || item.price || 0) : 0;
                const canAfford = type !== "gift" || coins >= price;
                return (
                  <button
                    key={item.id}
                    onClick={() => type === "gift" ? handleGiftClick(item) : targetSeat && onSend(item, selectedTarget)}
                    disabled={!targetSeat || (type === "gift" && !canAfford)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl transition active:scale-90 disabled:opacity-40"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span className="text-2xl" style={{ filter: `drop-shadow(0 0 6px ${type === "gift" ? COLORS.gold : item.color || COLORS.pink})` }}>
                      {type === "gift" ? item.icon : item.emoji}
                    </span>
                    <span className="text-[7px] font-bold" style={{ color: COLORS.white }}>{item.name}</span>
                    {type === "gift" && (
                      <span className="text-[7px] font-bold" style={{ color: canAfford ? COLORS.gold : COLORS.crimson }}>
                        🪙 {price >= 1000 ? `${(price / 1000).toFixed(0)}K` : price}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Selected target info */}
          {targetSeat && (
            <div className="rounded-xl p-2 flex items-center gap-2" style={{ background: `${COLORS.gold}10`, border: `1px solid ${COLORS.gold}25` }}>
              <img src={targetSeat.user.avatar} alt="" className="w-7 h-7 rounded-full" />
              <span className="text-[10px] font-bold text-white">→ {targetSeat.user.name}</span>
              <span className="text-[8px] ml-auto" style={{ color: COLORS.softGray }}>Seat {targetSeat.id}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}