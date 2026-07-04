import React, { useState, useMemo } from "react";
import { X, Gift, Smile, Send } from "lucide-react";
import { COLORS, EMOJIS_3D, EMOJI_CATEGORIES } from "./roomData";
import { useGifts } from "@/hooks/useGifts";

export default function InteractionPanel({ type, targetId, seats = [], onSend, onClose }) {
  const { gifts, coins, loading } = useGifts();
  const [giftCat, setGiftCat] = useState("standard");
  const [emojiCat, setEmojiCat] = useState("basic");
  const [selectedTarget, setSelectedTarget] = useState(targetId);
  const [selectedGift, setSelectedGift] = useState(null);

  const occupiedSeats = seats.filter((s) => s.user && s.id !== 0);
  const targetSeat = seats.find((s) => s.id === selectedTarget);

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

  const giftPrice = selectedGift ? (selectedGift.price_coins || selectedGift.price || 0) : 0;
  const totalCost = type === "gift" ? giftPrice : 0;
  const canAfford = type !== "gift" || coins >= totalCost;
  const canSend = type === "emoji"
    ? !!targetSeat
    : selectedGift && targetSeat && canAfford;

  const handleSelectGift = (gift) => {
    setSelectedGift(gift);
  };

  const handleSend = () => {
    if (!canSend || !targetSeat) return;
    if (type === "gift") {
      onSend({
        id: selectedGift.id,
        name: selectedGift.name,
        icon: selectedGift.icon,
        price: selectedGift.price_coins || selectedGift.price || 0,
        category: selectedGift.category,
        effect: "hearts",
        recipient_id: targetSeat.user?.vyro_id || targetSeat.id,
        recipient_name: targetSeat.user?.name,
        quantity: 1,
      }, targetSeat.id, 1);
    } else {
      onSend(selectedGift || items[0], targetSeat.id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-[90%] max-w-md flex flex-col animate-fadeIn"
        style={{
          background: COLORS.tealDeep,
          border: `1px solid ${COLORS.gold}30`,
          boxShadow: "0 -8px 32px rgba(0,0,0,0.5)",
          height: "60vh",
          maxHeight: "85vh",
          borderRadius: "26px 26px 0 0",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 pt-2 pb-1.5 px-3 flex-shrink-0" style={{ background: COLORS.tealDeep }}>
          <div className="w-8 h-1 rounded-full mx-auto mb-1.5" style={{ background: `${COLORS.gold}40` }} />
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              {type === "gift" ? <Gift size={14} style={{ color: COLORS.gold }} /> : <Smile size={14} style={{ color: COLORS.pink }} />}
              <h2 className="text-xs font-bold text-white">{type === "gift" ? "Send Gift" : "Send 3D Emoji"}</h2>
            </div>
            <button onClick={onClose} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
              <X size={12} style={{ color: COLORS.softGray }} />
            </button>
          </div>

          {type === "gift" && (
            <div className="flex items-center justify-end gap-1 mb-0.5">
              <span className="text-[8px]" style={{ color: COLORS.gold }}>🪙</span>
              <span className="text-[9px] font-bold" style={{ color: COLORS.gold }}>{coins.toLocaleString()} coins</span>
            </div>
          )}
        </div>

        {/* Scrollable content */}
        <div className="px-3 pb-1.5 space-y-2 overflow-y-auto scrollbar-hide flex-1">
          {/* Target seat selector */}
          <div>
            <p className="text-[9px] font-bold mb-1 px-0.5" style={{ color: COLORS.gold }}>🎯 Select Target</p>
            {occupiedSeats.length === 0 ? (
              <div className="text-center py-2">
                <p className="text-[9px]" style={{ color: COLORS.softGray }}>No seated users available</p>
              </div>
            ) : (
              <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
                {occupiedSeats.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedTarget(s.id)}
                    className="flex-shrink-0 flex flex-col items-center gap-0.5 p-1 rounded-lg transition active:scale-90"
                    style={selectedTarget === s.id
                      ? { background: `${COLORS.gold}20`, border: `1px solid ${COLORS.gold}50` }
                      : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {s.user.avatar ? (
                      <img src={s.user.avatar} alt={s.user.name} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: COLORS.tealMid }}>
                        <span className="text-[8px] font-bold text-white">{(s.user.name || "U")[0]}</span>
                      </div>
                    )}
                    <span className="text-[6px] font-bold" style={{ color: selectedTarget === s.id ? COLORS.gold : COLORS.softGray }}>
                      {s.user.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => type === "gift" ? setGiftCat(c.id) : setEmojiCat(c.id)}
                className="flex-shrink-0 flex items-center justify-center gap-0.5 px-2 py-1 rounded-lg text-[8px] font-bold transition active:scale-95"
                style={(type === "gift" ? activeGiftCat : emojiCat) === c.id
                  ? { background: `${type === "gift" ? COLORS.gold : COLORS.pink}25`, color: type === "gift" ? COLORS.gold : COLORS.pink, border: `1px solid ${type === "gift" ? COLORS.gold : COLORS.pink}40` }
                  : { background: "rgba(255,255,255,0.04)", color: COLORS.softGray, border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span>{c.icon}</span>
                {c.name}
              </button>
            ))}
          </div>

          {/* Items grid — 5 cols, compact */}
          {type === "gift" && loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-4 gap-1">
              <span className="text-xl">🎁</span>
              <p className="text-[9px]" style={{ color: COLORS.softGray }}>No gifts available</p>
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-1.5">
              {items.map((item) => {
                const price = type === "gift" ? (item.price_coins || item.price || 0) : 0;
                const isSelected = type === "gift" && selectedGift?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectGift(item)}
                    className="flex flex-col items-center gap-0.5 p-1 rounded-lg transition active:scale-90"
                    style={isSelected
                      ? { background: `${COLORS.gold}20`, border: `1px solid ${COLORS.gold}60`, boxShadow: `0 0 6px ${COLORS.gold}30` }
                      : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span className="text-base" style={{ filter: `drop-shadow(0 0 4px ${type === "gift" ? COLORS.gold : item.color || COLORS.pink})` }}>
                      {type === "gift" ? item.icon : item.emoji}
                    </span>
                    <span className="text-[6px] font-bold leading-tight text-center" style={{ color: COLORS.white }}>{item.name}</span>
                    {type === "gift" && (
                      <span className="text-[6px] font-bold" style={{ color: COLORS.gold }}>
                        🪙 {price >= 1000 ? `${(price / 1000).toFixed(0)}K` : price}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer — sticky send bar */}
        <div className="sticky bottom-0 z-10 px-3 py-1.5 flex-shrink-0" style={{ background: COLORS.tealDeep, borderTop: `1px solid ${COLORS.gold}20` }}>
          {type === "gift" && selectedGift ? (
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <span className="text-sm">{selectedGift.icon}</span>
                <span className="text-[8px] font-bold text-white">{selectedGift.name}</span>
              </div>
              <span className="text-[8px] font-bold" style={{ color: canAfford ? COLORS.gold : COLORS.crimson }}>
                🪙 {totalCost >= 1000 ? `${(totalCost / 1000).toFixed(1)}K` : totalCost}
              </span>
            </div>
          ) : type === "gift" ? (
            <p className="text-[8px] text-center mb-1" style={{ color: COLORS.softGray }}>Select a gift to send</p>
          ) : null}

          <button
            onClick={handleSend}
            disabled={!canSend}
            className="w-full py-1.5 rounded-lg flex items-center justify-center gap-1.5 font-bold transition active:scale-95 disabled:opacity-40"
            style={{
              background: canSend ? `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})` : "rgba(255,255,255,0.08)",
              color: canSend ? "#000" : COLORS.softGray,
            }}
          >
            <Send size={12} />
            <span className="text-[10px]">{type === "gift" ? "Send Gift" : "Send Emoji"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}