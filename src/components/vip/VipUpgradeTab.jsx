import React, { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { vipPricingTiers } from "@/components/vip/vipData";
import { useVipProfile } from "@/hooks/useVipProfile";
import { useToast } from "@/components/ui/use-toast";

function formatCoins(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export default function VipUpgradeTab() {
  const { profile, loading, upgradeVip } = useVipProfile();
  const { toast } = useToast();
  const [showOptions, setShowOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [processing, setProcessing] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
      </div>
    );
  }

  const currentTierName = profile?.vip_tier || "VIP 1";
  const currentIndex = vipPricingTiers.findIndex((t) => t.name === currentTierName);
  const nextTier = currentIndex >= 0 && currentIndex < vipPricingTiers.length - 1 ? vipPricingTiers[currentIndex + 1] : null;

  if (!nextTier) {
    return (
      <div className="p-4">
        <div className="rounded-3xl p-8 bg-gradient-to-br from-purple-900/40 to-[#1a1033] border border-amber-500/20 text-center">
          <div className="text-5xl mb-3">👑</div>
          <h3 className="text-lg font-bold text-amber-300">Maximum Tier Reached</h3>
          <p className="text-xs text-gray-400 mt-2">You've achieved the highest VIP level. No further upgrades available.</p>
        </div>
      </div>
    );
  }

  const currentCoins = profile?.total_xp || 0;
  const requiredCoins = parseInt(nextTier.coins.replace(/,/g, ""));
  const remaining = Math.max(0, requiredCoins - currentCoins);
  const progress = Math.min(100, (currentCoins / requiredCoins) * 100);
  const cashCost = parseFloat(nextTier.cash.replace("$", ""));

  const handleConfirm = async () => {
    if (!paymentMethod) return;
    setProcessing(true);
    try {
      await upgradeVip(nextTier.name, requiredCoins, cashCost, paymentMethod);
      toast({ title: `Upgraded to ${nextTier.name}! 🎉`, description: paymentMethod === "coins" ? `${formatCoins(requiredCoins)} coins deducted` : "Complete payment to activate" });
      setShowOptions(false);
      setPaymentMethod(null);
    } catch (e) {
      toast({ title: "Upgrade failed", description: e.message, variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-amber-300 text-center">🚀 VIP Upgrade Center</h2>

      <div className="rounded-3xl p-5 bg-gradient-to-br from-purple-900/40 to-[#1a1033] border border-amber-500/20"
        style={{ boxShadow: "0 8px 32px rgba(255,215,0,0.1)" }}
      >
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">🚀</div>
          <h3 className="text-lg font-bold text-amber-300">VIP Growth Engine</h3>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase">Current</p>
            <p className="text-sm font-bold text-purple-300">{currentTierName}</p>
          </div>
          <div className="flex-1 mx-3 h-0.5 bg-gradient-to-r from-purple-500 to-amber-500" />
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase">Next</p>
            <p className="text-sm font-bold text-amber-300">{nextTier.name}</p>
          </div>
        </div>

        <div className="bg-black/30 rounded-2xl p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-300">Progress</span>
            <span className="text-xs font-bold text-amber-400">{formatCoins(currentCoins)} / {nextTier.coins}</span>
          </div>
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-[10px] text-gray-500 mt-1.5 text-center">Remaining: {formatCoins(remaining)} coins</p>
        </div>

        {!showOptions ? (
          <button
            onClick={() => setShowOptions(true)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0A0118] text-sm font-bold active:scale-95 transition shadow-lg shadow-amber-500/30"
          >
            Upgrade Now
          </button>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setPaymentMethod("coins")}
                className={`p-3 rounded-xl border transition ${paymentMethod === "coins" ? "bg-amber-500/20 border-amber-500/40" : "bg-white/5 border-white/10"}`}
              >
                <p className="text-xs font-bold text-amber-300">💰 Pay With Coins</p>
                <p className="text-[10px] text-gray-400 mt-1">{nextTier.coins} coins</p>
                <p className="text-[9px] text-gray-500 mt-0.5">Balance: {formatCoins(profile?.coins || 0)}</p>
              </button>
              <button
                onClick={() => setPaymentMethod("cash")}
                className={`p-3 rounded-xl border transition ${paymentMethod === "cash" ? "bg-amber-500/20 border-amber-500/40" : "bg-white/5 border-white/10"}`}
              >
                <p className="text-xs font-bold text-amber-300">💳 Pay With Cash</p>
                <p className="text-[10px] text-gray-400 mt-1">${cashCost}</p>
              </button>
            </div>
            <button
              disabled={!paymentMethod || processing}
              onClick={handleConfirm}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold active:scale-95 transition disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {processing ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
              Confirm Upgrade
            </button>
          </div>
        )}
      </div>

      {showOptions && (
        <div className="rounded-2xl p-4 bg-green-500/10 border border-green-500/20 text-center">
          <p className="text-xs text-green-300">After upgrade: New VIP Badge activated + New benefits unlocked</p>
        </div>
      )}
    </div>
  );
}