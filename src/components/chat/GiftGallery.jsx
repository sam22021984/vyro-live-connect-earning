import React, { useState, useEffect } from "react";
import { X, Coins, Check, Loader2 } from "lucide-react";
import { COLORS, formatCoins } from "./chatData";
import { useGifts } from "@/hooks/useGifts";
import { useToast } from "@/components/ui/use-toast";

export default function GiftGallery({ open, onClose, onSend, coins: propCoins, recipientId, recipientName }) {
  const { toast } = useToast();
  const { gifts, coins: hookCoins, loading, sending, sendGift } = useGifts();
  const [tab, setTab] = useState("standard");
  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const coins = propCoins !== undefined ? propCoins : hookCoins;

  useEffect(() => {
    if (!open) {
      setSelected(null);
      setQuantity(1);
    }
  }, [open]);

  if (!open) return null;

  // Group gifts by category
  const categories = [...new Set(gifts.map((g) => g.category))];
  const activeTab = categories.includes(tab) ? tab : categories[0] || "standard";
  const filtered = gifts.filter((g) => g.category === activeTab);

  const totalCost = (selected?.price_coins || selected?.price || 0) * quantity;
  const canAfford = totalCost <= coins;

  const handleSend = async () => {
    if (!selected) return;
    const price = selected.price_coins || selected.price || 0;

    // If we have recipient info, send via backend
    if (recipientId) {
      try {
        await sendGift({
          recipient_id: recipientId,
          recipient_name: recipientName || "",
          gift_name: selected.name,
          gift_icon: selected.icon,
          price_coins: price,
          quantity,
        });
        toast({ title: "Gift Sent! 🎁", description: `${quantity}x ${selected.name} sent` });
        onSend?.(selected, quantity);
        setSelected(null);
        setQuantity(1);
        onClose();
      } catch (e) {
        toast({ title: "Failed to send gift", description: e.message, variant: "destructive" });
      }
    } else {
      // Fallback: just pass to parent handler
      onSend?.(selected, quantity);
      setSelected(null);
      setQuantity(1);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl max-h-[70vh] flex flex-col animate-fadeIn">
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Gift Gallery</h3>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs font-bold" style={{ color: COLORS.gold }}>
              <Coins size={14} /> {formatCoins(coins)}
            </span>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <X size={15} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Category tabs */}
        {categories.length > 0 && (
          <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setTab(cat); setSelected(null); }}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition capitalize whitespace-nowrap ${activeTab === cat ? "text-white" : "text-gray-500 bg-gray-100"}`}
                style={activeTab === cat ? { background: cat === "luxury" ? `linear-gradient(135deg, ${COLORS.gold}, #F59E0B)` : COLORS.primary } : {}}
              >
                {cat === "luxury" ? "💎 " : ""}{cat}
              </button>
            ))}
          </div>
        )}

        {/* Gifts grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm">No gifts available</p>
          </div>
        ) : (
          <div className="overflow-y-auto px-3 pb-3 grid grid-cols-4 gap-2">
            {filtered.map((g) => {
              const price = g.price_coins || g.price || 0;
              return (
                <button
                  key={g.id || g.name}
                  onClick={() => { setSelected(g); setQuantity(1); }}
                  className={`relative rounded-2xl flex flex-col items-center justify-center py-3 transition active:scale-95 border-2 ${selected?.id === g.id || selected?.name === g.name ? "border-blue-400 bg-blue-50" : "border-gray-100 bg-gray-50"}`}
                >
                  {selected?.id === g.id || selected?.name === g.name ? <div className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: COLORS.primary }}><Check size={10} className="text-white" /></div> : null}
                  <span className="text-3xl" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>{g.icon}</span>
                  <span className="text-[10px] font-medium text-gray-600 mt-1">{g.name}</span>
                  <span className="flex items-center gap-0.5 text-[9px] font-bold mt-0.5" style={{ color: COLORS.gold }}>
                    <Coins size={9} /> {formatCoins(price)}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Selected gift + quantity + send */}
        {selected && (
          <div className="px-4 py-3 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selected.icon}</span>
                <div>
                  <p className="text-xs font-bold text-gray-800">{selected.name}</p>
                  <p className="flex items-center gap-1 text-[11px] font-bold" style={{ color: COLORS.gold }}>
                    <Coins size={11} /> {formatCoins(selected.price_coins || selected.price || 0)}
                  </p>
                </div>
              </div>
              {/* Quantity selector */}
              <div className="flex items-center gap-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 font-bold active:scale-90">−</button>
                <span className="text-sm font-bold text-gray-700 w-6 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 font-bold active:scale-90">+</button>
              </div>
            </div>

            {!canAfford && (
              <p className="text-[10px] text-red-500 mb-2">Insufficient coins. You need {formatCoins(totalCost - coins)} more.</p>
            )}

            <button
              onClick={handleSend}
              disabled={sending || !canAfford}
              className="w-full py-3 rounded-xl text-white text-sm font-bold active:scale-95 transition disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: canAfford ? `linear-gradient(135deg, ${COLORS.primary}, #4F8BFF)` : "#9CA3AF", boxShadow: canAfford ? `0 4px 14px ${COLORS.primary}40` : "none" }}
            >
              {sending ? <Loader2 size={16} className="animate-spin" /> : null}
              {sending ? "Sending..." : !canAfford ? "Insufficient Coins" : `Send ${quantity}x · ${formatCoins(totalCost)} Coins`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}