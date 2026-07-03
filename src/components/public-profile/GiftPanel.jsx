import React, { useState } from "react";
import { X, Coins, Check, AlertCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { useToast } from "@/components/ui/use-toast";

const GIFT_CATEGORIES = [
  {
    name: "Popular",
    gifts: [
      { name: "Rose", icon: "🌹", price: 10 },
      { name: "Heart", icon: "❤️", price: 50 },
      { name: "Kiss", icon: "💋", price: 99 },
      { name: "Teddy", icon: "🧸", price: 199 },
    ],
  },
  {
    name: "Luxury",
    gifts: [
      { name: "Ring", icon: "💍", price: 500 },
      { name: "Crown", icon: "👑", price: 999 },
      { name: "Car", icon: "🚗", price: 2999 },
      { name: "Castle", icon: "🏰", price: 9999 },
    ],
  },
  {
    name: "Fun",
    gifts: [
      { name: "Pizza", icon: "🍕", price: 30 },
      { name: "Coffee", icon: "☕", price: 20 },
      { name: "Ice Cream", icon: "🍦", price: 15 },
      { name: "Cake", icon: "🎂", price: 100 },
    ],
  },
  {
    name: "Special",
    gifts: [
      { name: "Rocket", icon: "🚀", price: 1500 },
      { name: "Firework", icon: "🎆", price: 2000 },
      { name: "Diamond", icon: "💎", price: 5000 },
      { name: "Unicorn", icon: "🦄", price: 3500 },
    ],
  },
];

export default function GiftPanel({ profile, myCoins, onClose }) {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedGift, setSelectedGift] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalCost = (selectedGift?.price || 0) * quantity;
  const canAfford = totalCost <= myCoins;

  const handleSend = async () => {
    if (!selectedGift) return;
    if (!canAfford) {
      toast({ title: "You do not have enough Coins.", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const me = await getCurrentUser();
      // Deduct coins from sender
      let myProfiles = await base44.entities.UserProfile.filter({ user_id: me.id });
      if (myProfiles.length > 0) {
        await base44.entities.UserProfile.update(myProfiles[0].id, {
          coins: (myProfiles[0].coins || 0) - totalCost,
          gifts_sent: (myProfiles[0].gifts_sent || 0) + quantity,
        });
      }
      // Add coins to receiver
      let theirProfiles = await base44.entities.UserProfile.filter({ user_id: profile.user_id || profile.id });
      if (theirProfiles.length === 0) {
        theirProfiles = await base44.entities.UserProfile.filter({ id: profile.id });
      }
      if (theirProfiles.length > 0) {
        await base44.entities.UserProfile.update(theirProfiles[0].id, {
          coins: (theirProfiles[0].coins || 0) + totalCost,
          gifts_received: (theirProfiles[0].gifts_received || 0) + quantity,
        });
      }
      // Record transaction
      await base44.entities.Transaction.create({
        user_id: me.id,
        type: "gift_sent",
        amount: -totalCost,
        description: `Sent ${quantity}x ${selectedGift.name} to ${profile.username}`,
        recipient_id: profile.user_id || profile.id,
        recipient_name: profile.username,
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (e) {
      toast({ title: "Failed to send gift", description: e.message, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={onClose}>
      <div className="w-full bg-white rounded-t-3xl max-h-[80vh] overflow-hidden animate-fadeIn" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-gray-800">Send Gift</h3>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold">
              <Coins size={10} /> {myCoins?.toLocaleString() || 0}
            </span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-90">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 px-3 py-2 overflow-x-auto scrollbar-hide border-b border-gray-50">
          {GIFT_CATEGORIES.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                activeCategory === i ? "bg-purple-500 text-white" : "bg-gray-50 text-gray-500"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gifts grid */}
        <div className="p-3 overflow-y-auto" style={{ maxHeight: "300px" }}>
          <div className="grid grid-cols-4 gap-2">
            {GIFT_CATEGORIES[activeCategory].gifts.map((gift) => (
              <button
                key={gift.name}
                onClick={() => { setSelectedGift(gift); setQuantity(1); }}
                className={`flex flex-col items-center gap-1 p-2 rounded-2xl border transition active:scale-95 ${
                  selectedGift?.name === gift.name ? "border-purple-400 bg-purple-50" : "border-gray-50 bg-gray-50"
                }`}
              >
                <span className="text-3xl">{gift.icon}</span>
                <span className="text-[10px] font-bold text-gray-700">{gift.name}</span>
                <span className="flex items-center gap-0.5 text-[9px] font-bold text-amber-600">
                  <Coins size={8} /> {gift.price}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected gift + quantity + send */}
        {selectedGift && (
          <div className="px-4 py-3 border-t border-gray-50 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedGift.icon}</span>
                <div>
                  <p className="text-xs font-bold text-gray-700">{selectedGift.name}</p>
                  <p className="text-[10px] text-gray-400">{selectedGift.price} coins each</p>
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
              disabled={sending}
              className="w-full py-3 rounded-2xl text-sm font-bold text-white transition active:scale-95 disabled:opacity-60"
              style={{ background: canAfford ? "linear-gradient(135deg, #F59E0B, #EF4444)" : "#9CA3AF" }}
            >
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