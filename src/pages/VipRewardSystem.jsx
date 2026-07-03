import React, { useState } from "react";
import { Gift, Check, Clock, ChevronRight, Sparkles } from "lucide-react";
import { useVipProfile } from "@/hooks/useVipProfile";
import { vipRewardTypes } from "@/components/vip-systems/vipSystemsData";
import { vipPricingTiers } from "@/components/vip/vipData";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import VipSystemHeader from "@/components/vip-systems/VipSystemHeader";
import VipSystemLoader from "@/components/vip-systems/VipSystemLoader";

export default function VipRewardSystem() {
  const { profile, loading } = useVipProfile();
  const { toast } = useToast();
  const [claiming, setClaiming] = useState(null);
  const [claimedToday, setClaimedToday] = useState(false);

  if (loading) return <VipSystemLoader />;

  const currentTier = vipPricingTiers.find((t) => t.name === profile?.vip_tier) || vipPricingTiers[0];
  const isVip = profile?.is_vip;
  const coins = profile?.coins || 0;

  const claimReward = async (rewardId) => {
    if (!isVip) {
      toast({ title: "VIP Required", description: "Upgrade to VIP to claim rewards", variant: "destructive" });
      return;
    }
    setClaiming(rewardId);
    try {
      let rewardCoins = 0;
      if (rewardId === "daily_coins") {
        rewardCoins = parseInt(currentTier.dailyCoins?.replace(/,/g, "")) || 300;
        setClaimedToday(true);
      } else if (rewardId === "checkin_bonus") {
        rewardCoins = 200;
      } else if (rewardId === "lucky_draw") {
        rewardCoins = Math.floor(Math.random() * 5000) + 500;
      } else {
        rewardCoins = 1000;
      }

      await base44.entities.UserProfile.update(profile.id, {
        coins: coins + rewardCoins,
      });

      toast({
        title: "Reward Claimed! 🎉",
        description: `You received ${rewardCoins.toLocaleString()} coins!`,
      });
    } catch (e) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setClaiming(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0118]">
      <div className="max-w-md mx-auto">
        <VipSystemHeader title="VIP REWARD SYSTEM" subtitle="Exclusive VIP rewards & bonuses" icon="🎁" color="#10B981" />

        <div className="pb-6 animate-fadeIn">
          {/* Balance Card */}
          <div className="px-4 pt-4">
            <div className="rounded-2xl p-5 bg-gradient-to-br from-green-500/20 to-emerald-500/5 border border-green-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Your Balance</p>
                  <h2 className="text-2xl font-bold text-white mt-1">{coins.toLocaleString()}</h2>
                  <p className="text-xs text-green-400 mt-0.5">coins available</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
                  <Gift size={28} className="text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Daily Claim Banner */}
          <div className="px-4 mt-4">
            <div className="rounded-2xl p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/20">
              <div className="flex items-center gap-3">
                <div className="text-3xl">💰</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">Daily VIP Coins</p>
                  <p className="text-xs text-gray-400">
                    {isVip ? `${currentTier.dailyCoins} coins available` : "Upgrade to VIP to claim"}
                  </p>
                </div>
                <button
                  onClick={() => claimReward("daily_coins")}
                  disabled={!isVip || claiming === "daily_coins" || claimedToday}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0A0118] text-xs font-bold disabled:opacity-40 active:scale-95 transition"
                >
                  {claimedToday ? <Check size={14} /> : claiming === "daily_coins" ? "..." : "Claim"}
                </button>
              </div>
              {claimedToday && (
                <p className="text-[10px] text-green-400 mt-2 flex items-center gap-1">
                  <Check size={10} /> Claimed! Come back in 24 hours.
                </p>
              )}
            </div>
          </div>

          {/* All Reward Types */}
          <div className="px-4 mt-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">All VIP Rewards</h3>
            <div className="space-y-2">
              {vipRewardTypes.map((reward) => (
                <div key={reward.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center text-xl flex-shrink-0">
                    {reward.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{reward.title}</p>
                    <p className="text-[10px] text-gray-500">{reward.desc}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock size={10} className="text-gray-600" />
                      <span className="text-[9px] text-gray-600">{reward.frequency}</span>
                    </div>
                  </div>
                  {reward.id === "daily_coins" || reward.id === "checkin_bonus" || reward.id === "lucky_draw" ? (
                    <button
                      onClick={() => claimReward(reward.id)}
                      disabled={!isVip || claiming === reward.id}
                      className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 text-[10px] font-bold disabled:opacity-40 active:scale-95 transition"
                    >
                      {claiming === reward.id ? "..." : "Claim"}
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-[10px] text-gray-600">
                      <Sparkles size={10} />
                      Auto
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cashback Info */}
          <div className="px-4 mt-6">
            <div className="rounded-2xl p-4 bg-gradient-to-br from-purple-500/15 to-pink-500/5 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">💸</span>
                <h3 className="text-sm font-bold text-white">Gift Cashback Active</h3>
              </div>
              <p className="text-xs text-gray-400">
                You earn cashback on every gift you send based on your tier level.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="bg-black/20 rounded-lg p-2 text-center">
                  <p className="text-[9px] text-gray-500">Current Rate</p>
                  <p className="text-sm font-bold text-purple-400">
                    {currentTier.benefits?.find((b) => b.includes("Cashback"))?.match(/\d+/)?.[0] || 0}%
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-2 text-center">
                  <p className="text-[9px] text-gray-500">Gifts Sent</p>
                  <p className="text-sm font-bold text-white">{profile?.gifts_sent || 0}</p>
                </div>
                <div className="bg-black/20 rounded-lg p-2 text-center">
                  <p className="text-[9px] text-gray-500">Received</p>
                  <p className="text-sm font-bold text-white">{profile?.gifts_received || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}