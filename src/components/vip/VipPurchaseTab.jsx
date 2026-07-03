import React, { useState } from "react";
import { Loader2, Check, Coins, CreditCard } from "lucide-react";
import { vipPricingTiers, durationPlans } from "@/components/vip/vipData";
import { useVipProfile } from "@/hooks/useVipProfile";
import { useToast } from "@/components/ui/use-toast";

function formatNum(n) {
  return n.toLocaleString();
}

export default function VipPurchaseTab({ selectedDurationId, onDurationSelected }) {
  const { profile, loading, purchaseVip } = useVipProfile();
  const { toast } = useToast();
  const [selectedTierId, setSelectedTierId] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(
    durationPlans.find((d) => d.id === selectedDurationId) || durationPlans[1]
  );
  const [paymentMethod, setPaymentMethod] = useState("coins");
  const [processing, setProcessing] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
      </div>
    );
  }

  const selectedTier = vipPricingTiers.find((t) => t.id === selectedTierId);
  const tierCoins = selectedTier ? parseInt(selectedTier.coins.replace(/,/g, "")) : 0;
  const tierCash = selectedTier ? parseFloat(selectedTier.cash.replace("$", "")) : 0;
  const months = selectedDuration.months;
  const discount = selectedDuration.discount;
  const finalCoins = Math.round(tierCoins * months * (1 - discount / 100));
  const finalCash = Math.round(tierCash * months * (1 - discount / 100) * 100) / 100;
  const coinBalance = profile?.coins || 0;
  const insufficientCoins = paymentMethod === "coins" && coinBalance < finalCoins;

  const handlePurchase = async () => {
    if (!selectedTier) {
      toast({ title: "Select a VIP tier", variant: "destructive" });
      return;
    }
    if (insufficientCoins) {
      toast({ title: "Insufficient coins", description: `You need ${formatNum(finalCoins - coinBalance)} more coins`, variant: "destructive" });
      return;
    }
    setProcessing(true);
    try {
      const result = await purchaseVip(
        selectedTier.name, tierCoins, tierCash, months, discount, paymentMethod
      );
      toast({
        title: `VIP ${selectedTier.name} Activated! 🎉`,
        description: paymentMethod === "coins"
          ? `${formatNum(result.coinsCost)} coins deducted`
          : `Complete $${result.cashCost} payment to activate`,
      });
      if (onDurationSelected) onDurationSelected(null);
    } catch (e) {
      toast({ title: "Purchase failed", description: e.message, variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-amber-300 text-center">💳 VIP Purchase Center</h2>

      {/* Coin balance */}
      <div className="rounded-2xl p-3 bg-white/5 border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins size={16} className="text-amber-400" />
          <span className="text-xs text-gray-300">Your Coins</span>
        </div>
        <span className="text-sm font-bold text-amber-300">{formatNum(coinBalance)}</span>
      </div>

      {/* Tier selection */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Select VIP Tier</h3>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {vipPricingTiers.map((tier) => {
            const isSelected = selectedTierId === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => setSelectedTierId(tier.id)}
                className={`flex-shrink-0 w-24 p-3 rounded-2xl border transition text-center ${isSelected ? "bg-amber-500/20 border-amber-500/50" : "bg-white/5 border-white/10"}`}
                style={isSelected ? { boxShadow: `0 4px 16px ${tier.color}30` } : {}}
              >
                <div className="text-2xl mb-1">{tier.tierIcon}</div>
                <p className="text-[10px] font-bold text-white truncate">{tier.name}</p>
                <p className="text-[9px] text-gray-400 mt-0.5">{tier.cash}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration selection */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Select Duration</h3>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {durationPlans.map((plan) => {
            const isSelected = selectedDuration.id === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => { setSelectedDuration(plan); if (onDurationSelected) onDurationSelected(plan.id); }}
                className={`flex-shrink-0 px-3 py-2 rounded-xl border transition text-center ${isSelected ? "bg-amber-500/20 border-amber-500/50" : "bg-white/5 border-white/10"}`}
              >
                <span className="text-sm mr-1">{plan.icon}</span>
                <span className="text-[10px] font-bold text-white">{plan.name}</span>
                {plan.discount > 0 && (
                  <span className="block text-[8px] font-bold text-green-400">{plan.discount}% OFF</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Payment method */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Payment Method</h3>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => setPaymentMethod("coins")}
            className={`p-3 rounded-2xl border transition ${paymentMethod === "coins" ? "bg-amber-500/20 border-amber-500/40" : "bg-white/5 border-white/10"}`}
          >
            <Coins size={20} className="text-amber-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-amber-300">Coins</p>
          </button>
          <button
            onClick={() => setPaymentMethod("cash")}
            className={`p-3 rounded-2xl border transition ${paymentMethod === "cash" ? "bg-amber-500/20 border-amber-500/40" : "bg-white/5 border-white/10"}`}
          >
            <CreditCard size={20} className="text-amber-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-amber-300">Cash</p>
          </button>
        </div>
      </div>

      {/* Price summary */}
      {selectedTier && (
        <div className="rounded-2xl p-4 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">VIP Tier</span>
            <span className="text-sm font-bold text-amber-300">{selectedTier.tierIcon} {selectedTier.name}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Duration</span>
            <span className="text-sm font-bold text-white">{selectedDuration.name}</span>
          </div>
          {discount > 0 && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Discount</span>
              <span className="text-sm font-bold text-green-400">{discount}% OFF</span>
            </div>
          )}
          <div className="border-t border-white/10 mt-2 pt-2 flex items-center justify-between">
            <span className="text-xs text-gray-300">Total ({paymentMethod === "coins" ? "Coins" : "USD"})</span>
            <span className="text-lg font-bold text-amber-300">
              {paymentMethod === "coins" ? `🪙 ${formatNum(finalCoins)}` : `$${finalCash}`}
            </span>
          </div>
          {insufficientCoins && (
            <p className="text-[10px] text-red-400 mt-2 text-center">Insufficient coins — you need {formatNum(finalCoins - coinBalance)} more</p>
          )}
        </div>
      )}

      <button
        disabled={!selectedTier || processing || insufficientCoins}
        onClick={handlePurchase}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0A0118] text-sm font-bold active:scale-95 transition disabled:opacity-40 flex items-center justify-center gap-2"
      >
        {processing ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
        {selectedTier ? `Purchase ${selectedTier.name}` : "Select a Tier"}
      </button>
    </div>
  );
}