import React, { useState } from "react";
import { Loader2, Clock, Check, Gift } from "lucide-react";
import { useVipProfile } from "@/hooks/useVipProfile";
import { useToast } from "@/components/ui/use-toast";

const rewards = [
  { id: "daily", name: "Daily VIP Reward", icon: "🎁", desc: "500 coins + 1 VIP gift", coins: 500, requiresVip: true },
  { id: "monthly", name: "Monthly Reward", icon: "📅", desc: "5,000 coins + Premium frame", coins: 5000, requiresVip: true },
  { id: "upgrade", name: "Upgrade Reward", icon: "⬆️", desc: "10,000 coins + Exclusive badge", coins: 10000, requiresVip: true, requiresTier: "MSSVIP" },
  { id: "special", name: "Special VIP Gift", icon: "💝", desc: "Luxury gift chest (2,000 coins)", coins: 2000, requiresVip: true },
  { id: "anniversary", name: "Anniversary Bonus", icon: "🎉", desc: "50,000 coins + Legendary frame", coins: 50000, requiresVip: true, requiresTier: "MISVIP" },
];

export default function VipRewardsTab() {
  const { profile, loading, claimReward, isRewardClaimedToday } = useVipProfile();
  const { toast } = useToast();
  const [claiming, setClaiming] = useState(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
      </div>
    );
  }

  const isVip = profile?.is_vip;
  const userTier = profile?.vip_tier || "";

  const handleClaim = async (reward) => {
    setClaiming(reward.id);
    try {
      await claimReward(reward.name, reward.coins);
      toast({ title: `Claimed ${reward.name}! 🎉`, description: `+${reward.coins.toLocaleString()} coins added` });
    } catch (e) {
      toast({ title: "Claim failed", description: e.message, variant: "destructive" });
    } finally {
      setClaiming(null);
    }
  };

  const getRewardStatus = (reward) => {
    if (!isVip || (reward.requiresTier && !userTier)) return "locked";
    if (reward.requiresTier) {
      const tierOrder = ["VIP 1", "VVIP", "SVIP", "SSVIP", "MSVIP", "MSSVIP", "MISVIP", "MISSVIP", "ULTRA MISSVIP", "LEGEND IMISVIP", "ROYAL IMISSVIP"];
      const userIdx = tierOrder.indexOf(userTier);
      const reqIdx = tierOrder.indexOf(reward.requiresTier);
      if (userIdx < reqIdx) return "locked";
    }
    if (isRewardClaimedToday(reward.name)) return "claimed";
    return "available";
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-amber-300 text-center">🎁 VIP Reward Center</h2>

      <div className="text-center py-4">
        <div className="text-5xl mb-2">🎁</div>
        <h3 className="text-sm font-bold text-amber-300">Luxury Gift Chest</h3>
        <p className="text-xs text-gray-400 mt-1">{isVip ? `Claim your exclusive VIP rewards — ${userTier}` : "Become VIP to unlock rewards"}</p>
      </div>

      <div className="rounded-2xl p-3 bg-white/5 border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gift size={16} className="text-amber-400" />
          <span className="text-xs text-gray-300">Coin Balance</span>
        </div>
        <span className="text-sm font-bold text-amber-300">{(profile?.coins || 0).toLocaleString()}</span>
      </div>

      <div className="space-y-2.5">
        {rewards.map((r) => {
          const status = getRewardStatus(r);
          return (
            <div key={r.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-600/10 flex items-center justify-center text-2xl flex-shrink-0">
                {r.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-200">{r.name}</h4>
                <p className="text-[10px] text-gray-400">{r.desc}</p>
                {r.requiresTier && (
                  <p className="text-[9px] text-amber-400/70 mt-0.5">Requires {r.requiresTier}</p>
                )}
              </div>
              {status === "available" ? (
                <button
                  disabled={claiming === r.id}
                  onClick={() => handleClaim(r)}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0A0118] text-xs font-bold active:scale-95 transition disabled:opacity-50"
                >
                  {claiming === r.id ? <Loader2 size={12} className="animate-spin" /> : "Claim"}
                </button>
              ) : status === "claimed" ? (
                <span className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 text-xs font-bold flex items-center gap-1">
                  <Check size={12} /> Claimed
                </span>
              ) : (
                <span className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-500 text-xs font-bold flex items-center gap-1">
                  <Clock size={12} /> Locked
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}