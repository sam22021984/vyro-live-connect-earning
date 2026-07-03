import React, { useState } from "react";
import { X, Coins, Check, AlertCircle, Loader2 } from "lucide-react";
import { useGifts } from "@/hooks/useGifts";
import { useToast } from "@/components/ui/use-toast";

export default function GiftPanel({ profile, myCoins, onClose }) {
  const { toast } = useToast();
  const { gifts, coins: hookCoins, loading, sending: hookSending, sendGift } = useGifts();
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedGift, setSelectedGift] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const coins = myCoins !== undefined ? myCoins : hookCoins;
  const categories = [...new Set(gifts.map((g) => g.category))];
  const activeCat = categories[activeCategory] || categories[0];
  const filtered = gifts.filter((g) => g.category === activeCat);

  const totalCost = (selectedGift?.price_coins || selectedGift?.price || 0) * quantity;
  const canAfford = totalCost <= coins;

  const handleSend = async () => {
    if (!selectedGift) return;
    if (!canAfford) {
      toast({ title: "You do not have enough Coins.", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      await sendGift({

        recipient_id: profile.user_id || profile.id,
        recipient_name: profile.username || profile.full_name || "",
        gift_name: selectedGift.name,
        gift_icon: selectedGift.icon,
        price_coins: selectedGift.price_coins || selectedGift.price || 0,
        quantity,
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (e) {
      toast({ title: "Failed to send gift", description: e.message, variant: "destructive" });
    }
  };

  // Fallback static categories if no gifts loaded yet
  const displayCategories = categories.length > 0 ? categories : ["Popular", "Luxury", "Fun", "Special"];
  const displayGifts = filtered.length > 0 ? filtered : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={onClose}>
      <div className="w-full bg-white rounded-t-3xl max-h-[80vh] overflow-hidden animate-fadeIn" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-gray-800">Send Gift</h3>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold">
              <Coins size={10} /> {coins?.toLocaleString() || 0}
            </span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-90">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 px-3 py-2 overflow-x-auto scrollbar-hide border-b border-gray-50">
          {displayCategories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition capitalize ${
                activeCategory === i ? "bg-purple-500 text-white" : "bg-gray-50 text-gray-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gifts grid */}
        <div className="p-3 overflow-y-auto" style={{ maxHeight: "300px" }}>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : displayGifts.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">No gifts available</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {displayGifts.map((gift) => {
                const price = gift.price_coins || gift.price || 0;
                return (
                  <button
                    key={gift.id || gift.name}
                    onClick={() => { setSelectedGift(gift); setQuantity(1); }}
                    className={`flex flex-col items-center gap-1 p-2 rounded-2xl border transition active:scale-95 ${
                      selectedGift?.id === gift.id || selectedGift?.name === gift.name ? "border-purple-400 bg-purple-50" : "border-gray-50 bg-gray-50"
                    }`}
                  >
                    <span className="text-3xl">{gift.icon}</span>
                    <span className="text-[10px] font-bold text-gray-700">{gift.name}</span>
                    <span className="flex items-center gap-0.5 text-[9px] font-bold text-amber-600">
                      <Coins size={8} /> {price}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected gift + quantity + send */}
        {selectedGift && (
          <div className="px-4 py-3 border-t border-gray-50 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedGift.icon}</span>
                <div>
                  <p className="text-xs font-bold text-gray-700">{selectedGift.name}</p>
                  <p className="text-[10px] text-gray-400">{(selectedGift.price_coins || selectedGift.price || 0)} coins each</p>
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
              <div className="flex items-center gap-1.5 mb-2 px-2 py-1.5 rounded-lg bg-red-50 text-red-500 text-[10px] font-medium">
                <AlertCircle size={12} /> You do not have enough Coins. Total: {totalCost}
              </div>
            )}

            <button
              onClick={handleSend}
              disabled={sending || hookSending}
              className="w-full py-3 rounded-2xl text-sm font-bold text-white transition active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: canAfford ? "linear-gradient(135deg, #F59E0B, #EF4444)" : "#9CA3AF" }}
            >
              {sending ? <Loader2 size={16} className="animate-spin" /> : null}
              {sending ? "Sending..." : `Send ${quantity}x ${selectedGift.name} (${totalCost} coins)`}
            </button>
            {!canAfford && (
              <button onClick={() => window.location.href = "/coins-recharge"} className="w-full py-2 mt-1.5 rounded-xl text-xs font-bold text-amber-600 bg-amber-50 active:scale-95">
                Recharge Coins
              </button>
            )}
          </div>
        )}

        {/* Success animation */}
        {showSuccess && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-6 text-center animate-fadeIn">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-3">
                <Check size={32} className="text-white" />
              </div>
              <h3 className="text-sm font-bold text-gray-800">Gift Sent!</h3>
              <p className="text-xs text-gray-400">{quantity}x {selectedGift.icon} {selectedGift.name} sent to {profile?.username}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}