import React, { useState, useMemo } from "react";
import { X, Gift, Smile, Send } from "lucide-react";
import { COLORS, EMOJIS_3D, EMOJI_CATEGORIES, SEATS } from "./roomData";
import { useGifts } from "@/hooks/useGifts";

const QUICK_QTY = [1, 2, 5, 10, 20, 50, 99, 188, 520, 1314];

export default function InteractionPanel({ type, targetId, onSend, onClose }) {
  const { gifts, coins, loading } = useGifts();
  const [giftCat, setGiftCat] = useState("standard");
  const [emojiCat, setEmojiCat] = useState("basic");
  const [selectedTarget, setSelectedTarget] = useState(targetId);
  // sendMode: "one" = 1 gift to 1 target, "multi" = N quantity to 1 target, "all" = 1 gift to every seat
  const [sendMode, setSendMode] = useState("one");
  const [qty, setQty] = useState(1);
  const [selectedGift, setSelectedGift] = useState(null);

  const occupiedSeats = SEATS.filter((s) => s.user && s.id !== 0);
  const targetSeat = SEATS.find((s) => s.id === selectedTarget);

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

  // Effective quantity based on mode
  const effectiveQty = sendMode === "one" ? 1 : sendMode === "multi" ? qty : 1;
  // Effective targets
  const effectiveTargets = sendMode === "all" ? occupiedSeats : (targetSeat ? [targetSeat] : []);

  const giftPrice = selectedGift ? (selectedGift.price_coins || selectedGift.price || 0) : 0;
  const totalCost = type === "gift" ? giftPrice * effectiveQty * effectiveTargets.length : 0;
  const canAfford = type !== "gift" || coins >= totalCost;
  const canSend = type === "emoji"
    ? (sendMode === "all" ? effectiveTargets.length > 0 : !!targetSeat)
    : selectedGift && (effectiveTargets.length > 0) && canAfford;

  const handleSelectGift = (gift) => {
    setSelectedGift(gift);
  };

  const handleSend = () => {
    if (!canSend) return;
    if (type === "gift") {
      // Send to each target with quantity
      effectiveTargets.forEach((seat) => {
        onSend({
          id: selectedGift.id,
          name: selectedGift.name,
          icon: selectedGift.icon,
          price: selectedGift.price_coins || selectedGift.price || 0,
          category: selectedGift.category,
          effect: "hearts",
          recipient_id: seat.user?.vyro_id || seat.id,
          recipient_name: seat.user?.name,
          quantity: effectiveQty,
        }, seat.id, effectiveQty);
      });
    } else {
      // Emoji
      effectiveTargets.forEach((seat) => {
        onSend(selectedGift || items[0], seat.id);
      });
    }
    // Reset
    setSelectedGift(null);
    setQty(1);
    setSendMode("one");
  };

  const sendModes = [
    { id: "one", label: "1", desc: "Send 1", icon: "✋" },
    { id: "multi", label: "Multi", desc: "Quantity", icon: "🔢" },
    { id: "all", label: "All", desc: "All Seats", icon: "👥" },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-t-3xl flex flex-col animate-fadeIn"
        style={{
          background: COLORS.tealDeep,
          border: `1px solid ${COLORS.gold}30`,
          boxShadow: "0 -8px 32px rgba(0,0,0,0.5)",
          maxHeight: "85vh",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Header */}
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

          {type === "gift" && (
            <div className="flex items-center justify-end gap-1 mb-1">
              <span className="text-[8px]" style={{ color: COLORS.gold }}>🪙</span>
              <span className="text-[10px] font-bold" style={{ color: COLORS.gold }}>{coins.toLocaleString()} coins</span>
            </div>
          )}
        </div>

        {/* Scrollable content */}
        <div className="px-4 pb-2 space-y-2.5 overflow-y-auto scrollbar-hide flex-1">
          {/* Send mode selector — 1 / Multi / All */}
          <div>
            <p className="text-[10px] font-bold mb-1.5 px-1" style={{ color: COLORS.gold }}>⚡ Send Mode</p>
            <div className="flex gap-1.5">
              {sendModes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSendMode(m.id)}
                  className="flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-lg transition active:scale-95"
                  style={sendMode === m.id
                    ? { background: `${COLORS.gold}25`, border: `1px solid ${COLORS.gold}50` }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-sm">{m.icon}</span>
                  <span className="text-[8px] font-bold" style={{ color: sendMode === m.id ? COLORS.gold : COLORS.softGray }}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Multi quantity picker */}
          {sendMode === "multi" && (
            <div>
              <p className="text-[10px] font-bold mb-1.5 px-1" style={{ color: COLORS.gold }}>🔢 Quantity: {qty}</p>
              <div className="flex gap-1 flex-wrap">
                {QUICK_QTY.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQty(q)}
                    className="px-2 py-1 rounded-lg text-[9px] font-bold transition active:scale-90"
                    style={qty === q
                      ? { background: COLORS.gold, color: "#000" }
                      : { background: "rgba(255,255,255,0.06)", color: COLORS.softGray, border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {q >= 1000 ? `${q / 1000}K` : q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Target seat selector — hidden in "all" mode */}
          {sendMode !== "all" && (
            <div>
              <p className="text-[10px] font-bold mb-1.5 px-1" style={{ color: COLORS.gold }}>🎯 Select Target</p>
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
          )}

          {sendMode === "all" && (
            <div className="rounded-xl p-2 flex items-center gap-2" style={{ background: `${COLORS.gold}10`, border: `1px solid ${COLORS.gold}25` }}>
              <span className="text-sm">👥</span>
              <span className="text-[10px] font-bold text-white">Sending to all {occupiedSeats.length} seats</span>
            </div>
          )}

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
                const isSelected = type === "gift" && selectedGift?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => type === "gift" ? handleSelectGift(item) : handleSelectGift(item)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl transition active:scale-90"
                    style={isSelected
                      ? { background: `${COLORS.gold}20`, border: `1px solid ${COLORS.gold}60`, boxShadow: `0 0 8px ${COLORS.gold}30` }
                      : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span className="text-2xl" style={{ filter: `drop-shadow(0 0 6px ${type === "gift" ? COLORS.gold : item.color || COLORS.pink})` }}>
                      {type === "gift" ? item.icon : item.emoji}
                    </span>
                    <span className="text-[7px] font-bold" style={{ color: COLORS.white }}>{item.name}</span>
                    {type === "gift" && (
                      <span className="text-[7px] font-bold" style={{ color: COLORS.gold }}>
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
        <div className="sticky bottom-0 z-10 px-4 py-2 flex-shrink-0" style={{ background: COLORS.tealDeep, borderTop: `1px solid ${COLORS.gold}20` }}>
          {/* Summary */}
          {type === "gift" && selectedGift ? (
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-lg">{selectedGift.icon}</span>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-white">{selectedGift.name}</span>
                  <span className="text-[7px]" style={{ color: COLORS.softGray }}>
                    {effectiveQty} × {effectiveTargets.length} {sendMode === "all" ? "seats" : "seat"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-bold" style={{ color: canAfford ? COLORS.gold : COLORS.crimson }}>
                  🪙 {totalCost >= 1000 ? `${(totalCost / 1000).toFixed(1)}K` : totalCost}
                </span>
                <span className="text-[7px] ml-1" style={{ color: COLORS.softGray }}>total</span>
              </div>
            </div>
          ) : type === "gift" ? (
            <p className="text-[9px] text-center mb-1.5" style={{ color: COLORS.softGray }}>Select a gift to send</p>
          ) : null}

          <button
            onClick={handleSend}
            disabled={!canSend}
            className="w-full py-2 rounded-xl flex items-center justify-center gap-2 font-bold transition active:scale-95 disabled:opacity-40"
            style={{
              background: canSend ? `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})` : "rgba(255,255,255,0.08)",
              color: canSend ? "#000" : COLORS.softGray,
            }}
          >
            <Send size={14} />
            <span className="text-xs">
              {type === "gift" ? "Send Gift" : "Send Emoji"}
              {sendMode === "all" && effectiveTargets.length > 0 && ` to ${effectiveTargets.length}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}