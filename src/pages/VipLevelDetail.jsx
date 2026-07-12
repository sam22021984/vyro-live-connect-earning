import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Crown, Coins, Gift, Shield, Lock, Sparkles, Star, MessageCircle, Tag, Frame, ChevronLeft, ChevronRight, Trophy, Clock } from "lucide-react";
import { vipLevels, vipPricingTiers } from "@/components/vip/vipData";
import { getVipLevelDetail } from "@/components/vip/vipLevelDetails";
import { useBackNav } from "@/hooks/useBackNav";
import VipLevelDetailHero from "@/components/vip/VipLevelDetailHero";
import VipDetailSectionCard from "@/components/vip/VipDetailSectionCard";

const assetIcons = {
  avatarFrame: Frame,
  badge: Star,
  medal: Trophy,
  chatBubble: MessageCircle,
  entryEffect: Sparkles,
  namePlate: Tag,
};

const assetLabels = {
  avatarFrame: "Avatar Frame",
  badge: "Badge",
  medal: "Medal",
  chatBubble: "Chat Bubble",
  entryEffect: "Entry Effect",
  namePlate: "Name Plate",
};

export default function VipLevelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBack = useBackNav("/vip-membership?tab=levels");

  const level = useMemo(() => vipLevels.find((l) => l.id === Number(id)), [id]);
  const detail = useMemo(() => getVipLevelDetail(id), [id]);
  const pricingTier = useMemo(() => vipPricingTiers.find((t) => vipPricingTiers.indexOf(t) === Number(id) - 1), [id]);

  if (!level || !detail) {
    return (
      <div className="min-h-screen bg-[#0A0118] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">VIP level not found</p>
          <button onClick={handleBack} className="text-amber-400 text-sm font-bold">← Back to VIP Levels</button>
        </div>
      </div>
    );
  }

  const prevLevel = level.id > 1 ? vipLevels.find((l) => l.id === level.id - 1) : null;
  const nextLevel = level.id < 11 ? vipLevels.find((l) => l.id === level.id + 1) : null;

  return (
    <div className={`min-h-screen bg-gradient-to-b ${detail.bgGradient}`}>
      <div className="max-w-md mx-auto">
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-[#0A0118]/80 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 py-3 flex items-center gap-3">
            <button
              onClick={handleBack}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition"
            >
              <ArrowLeft size={18} className="text-amber-400" />
            </button>
            <div className="flex items-center gap-2 flex-1">
              <Crown size={16} style={{ color: level.color }} />
              <h1 className="text-sm font-bold" style={{ color: level.color }}>{level.name}</h1>
            </div>
          </div>
        </div>

        {/* Hero */}
        <VipLevelDetailHero level={level} detail={detail} pricingTier={pricingTier} />

        <div className="px-4 space-y-4 pb-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl p-3 bg-white/5 border border-white/10 text-center">
              <Coins size={16} className="mx-auto mb-1" style={{ color: level.color }} />
              <p className="text-[10px] text-gray-400">Total Coins</p>
              <p className="text-xs font-bold" style={{ color: level.color }}>{level.coins.toLocaleString()}</p>
            </div>
            <div className="rounded-xl p-3 bg-white/5 border border-white/10 text-center">
              <Gift size={16} className="mx-auto mb-1 text-amber-400" />
              <p className="text-[10px] text-gray-400">Daily Coins</p>
              <p className="text-xs font-bold text-amber-300">{level.dailyCoins.toLocaleString()}</p>
            </div>
            <div className="rounded-xl p-3 bg-white/5 border border-white/10 text-center">
              <Trophy size={16} className="mx-auto mb-1 text-green-400" />
              <p className="text-[10px] text-gray-400">Cash Value</p>
              <p className="text-xs font-bold text-green-400">${level.cash}</p>
            </div>
          </div>

          {/* Description */}
          <VipDetailSectionCard icon={Sparkles} title="VIP Description" color={level.color} glow={level.glow}>
            <p className="text-xs text-gray-300 leading-relaxed">{detail.description}</p>
          </VipDetailSectionCard>

          {/* Membership Benefits */}
          <VipDetailSectionCard icon={Gift} title="Membership Benefits" color={level.color} glow={level.glow}>
            <div className="grid grid-cols-1 gap-2">
              {level.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${level.color}20` }}>
                    <Check size={12} style={{ color: level.color }} />
                  </div>
                  <span className="text-xs text-gray-300">{b}</span>
                </div>
              ))}
            </div>
          </VipDetailSectionCard>

          {/* Daily Rewards */}
          <VipDetailSectionCard icon={Coins} title="Daily Rewards" color={level.color} glow={level.glow}>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <span className="text-xs text-gray-400">Daily Coin Reward</span>
                <span className="text-xs font-bold" style={{ color: level.color }}>{level.dailyCoins.toLocaleString()} coins</span>
              </div>
              {pricingTier?.rewardTime && Object.entries(pricingTier.rewardTime).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <span className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  <span className="text-xs font-bold text-amber-300">{val}</span>
                </div>
              ))}
            </div>
          </VipDetailSectionCard>

          {/* Exclusive Privileges */}
          {pricingTier?.authority && (
            <VipDetailSectionCard icon={Shield} title="Exclusive Privileges" color={level.color} glow={level.glow}>
              <div className="space-y-2">
                {pricingTier.authority.map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${level.color}20` }}>
                      <Shield size={10} style={{ color: level.color }} />
                    </div>
                    <span className="text-xs text-gray-300">{a}</span>
                  </div>
                ))}
              </div>
            </VipDetailSectionCard>
          )}

          {/* Exclusive Assets */}
          <VipDetailSectionCard icon={Star} title="Exclusive Assets" color={level.color} glow={level.glow}>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(detail.exclusiveAssets).map(([key, val]) => {
                const Icon = assetIcons[key] || Star;
                return (
                  <div key={key} className="rounded-xl p-3 bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                      style={{ background: `${level.color}20`, border: `1px solid ${level.color}30` }}>
                      <Icon size={14} style={{ color: level.color }} />
                    </div>
                    <p className="text-[10px] text-gray-500 mb-0.5">{assetLabels[key]}</p>
                    <p className="text-xs font-bold text-gray-200">{val}</p>
                  </div>
                );
              })}
            </div>
          </VipDetailSectionCard>

          {/* Unlock Requirements */}
          <VipDetailSectionCard icon={Lock} title="Unlock Requirements" color={level.color} glow={level.glow}>
            <div className="space-y-2">
              {detail.unlockRequirements.map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${level.color}20` }}>
                    <Lock size={9} style={{ color: level.color }} />
                  </div>
                  <span className="text-xs text-gray-300">{r}</span>
                </div>
              ))}
            </div>
          </VipDetailSectionCard>

          {/* Price & Duration */}
          <VipDetailSectionCard icon={Clock} title="Membership Price & Duration" color={level.color} glow={level.glow}>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg" style={{ background: `${level.color}10` }}>
                <span className="text-xs text-gray-400">One-time Coin Cost</span>
                <span className="text-sm font-bold" style={{ color: level.color }}>{level.coins.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5">
                <span className="text-xs text-gray-400">Cash Equivalent</span>
                <span className="text-sm font-bold text-amber-300">${level.cash}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5">
                <span className="text-xs text-gray-400">Daily Coin Payout</span>
                <span className="text-sm font-bold text-amber-300">{level.dailyCoins.toLocaleString()}</span>
              </div>
            </div>
          </VipDetailSectionCard>

          {/* Prev / Next Navigation */}
          <div className="flex items-center gap-2 pt-2">
            {prevLevel ? (
              <button
                onClick={() => navigate(`/vip-level/${prevLevel.id}`)}
                className="flex-1 flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition"
              >
                <ChevronLeft size={16} style={{ color: prevLevel.color }} />
                <div className="text-left">
                  <p className="text-[9px] text-gray-500">Previous</p>
                  <p className="text-xs font-bold" style={{ color: prevLevel.color }}>{prevLevel.name}</p>
                </div>
              </button>
            ) : <div className="flex-1" />}
            {nextLevel ? (
              <button
                onClick={() => navigate(`/vip-level/${nextLevel.id}`)}
                className="flex-1 flex items-center justify-end gap-2 p-3 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition"
              >
                <div className="text-right">
                  <p className="text-[9px] text-gray-500">Next</p>
                  <p className="text-xs font-bold" style={{ color: nextLevel.color }}>{nextLevel.name}</p>
                </div>
                <ChevronRight size={16} style={{ color: nextLevel.color }} />
              </button>
            ) : <div className="flex-1" />}
          </div>

          {/* View All Levels */}
          <button
            onClick={handleBack}
            className="w-full py-3 rounded-xl font-bold text-sm active:scale-95 transition"
            style={{ background: `linear-gradient(135deg, ${level.color}, ${level.glow})`, color: "#fff" }}
          >
            View All VIP Levels
          </button>
        </div>
      </div>
    </div>
  );
}