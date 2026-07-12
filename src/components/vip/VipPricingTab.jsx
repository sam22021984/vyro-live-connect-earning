import React, { useState } from "react";
import { Coins, TrendingUp, Crown, Check, Shield, Clock, Gift } from "lucide-react";
import { vipPricingTiers, globalVipBenefits } from "@/components/vip/vipData";
import VipIcon from "@/components/vip/VipIcon";

export default function VipPricingTab() {
  const [expandedTier, setExpandedTier] = useState(null);

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="text-center py-2">
        <div className="text-4xl mb-1">💰</div>
        <h2 className="text-base font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
          VIP Pricing & Benefits
        </h2>
        <p className="text-xs text-gray-400 mt-1">Complete VIP membership tiers with pricing, benefits & authority</p>
      </div>

      {/* Earning banner */}
      <div className="rounded-2xl p-4 bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-transparent border border-amber-500/20">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={16} className="text-amber-400" />
          <h3 className="text-sm font-bold text-amber-300">VYRO Live Connect Earning</h3>
        </div>
        <p className="text-xs text-gray-400">Unlock premium privileges, daily coin rewards, and exclusive authority across all live rooms.</p>
      </div>

      {/* Tier cards */}
      <div className="space-y-3">
        {vipPricingTiers.map((tier, idx) => {
          const isExpanded = expandedTier === tier.id;
          const isLast = idx === vipPricingTiers.length - 1;

          return (
            <div
              key={tier.id}
              className="rounded-3xl overflow-hidden border transition-all duration-300"
              style={{
                background: isExpanded
                  ? `linear-gradient(135deg, ${tier.color}15, rgba(255,255,255,0.03))`
                  : "rgba(255,255,255,0.03)",
                borderColor: isExpanded ? `${tier.color}50` : "rgba(255,255,255,0.08)",
                boxShadow: isExpanded ? `0 8px 32px ${tier.color}25` : "none",
              }}
            >
              {/* Top gradient bar */}
              <div className={`h-1.5 bg-gradient-to-r ${tier.gradient}`} />

              <button
                onClick={() => setExpandedTier(isExpanded ? null : tier.id)}
                className="w-full p-4 text-left active:scale-[0.99] transition"
              >
                {/* Top row: icon + name + price */}
                <div className="flex items-center gap-3">
                  {/* 3D badge circle */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${tier.color}30, ${tier.color}10)`,
                      border: `1px solid ${tier.color}40`,
                      boxShadow: `0 6px 16px ${tier.color}30, inset 0 2px 4px rgba(255,255,255,0.1)`,
                    }}
                  >
                    <VipIcon iconVideo={tier.iconVideo} iconImage={tier.iconImage} icon={tier.tierIcon} alt={tier.name} style={{ filter: `drop-shadow(0 2px 4px ${tier.color}80)` }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{tier.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                        style={{ background: `${tier.color}20`, color: tier.color }}
                      >
                        {tier.icon} TIER {idx + 1}
                      </span>
                      {isLast && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0A0118]">
                          👑 HIGHEST
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 justify-end">
                      <Coins size={12} className="text-amber-400" />
                      <span className="text-sm font-bold text-amber-300">{tier.coins}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-semibold">{tier.cash}</p>
                  </div>
                </div>

                {/* Daily coins mini stat */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/5">
                    <Gift size={12} className="text-amber-400" />
                    <span className="text-[11px] text-gray-300 font-medium">Daily</span>
                    <span className="text-[11px] font-bold text-amber-300">{tier.dailyCoins} Coins</span>
                  </div>
                  <span className="text-[10px] text-gray-500 ml-auto">{isExpanded ? "▲ Tap to collapse" : "▼ Tap for details"}</span>
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 animate-fadeIn">
                  {/* Benefits */}
                  <div className="rounded-2xl p-3 bg-white/5 border border-white/5">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Crown size={13} style={{ color: tier.color }} />
                      <h4 className="text-xs font-bold text-gray-200">VIP Benefits</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                      {tier.benefits.map((b, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${tier.color}25` }}>
                            <Check size={9} style={{ color: tier.color }} />
                          </div>
                          <span className="text-[11px] text-gray-300">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Authority */}
                  <div className="rounded-2xl p-3 bg-white/5 border border-white/5">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Shield size={13} style={{ color: tier.color }} />
                      <h4 className="text-xs font-bold text-gray-200">Room Authority</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                      {tier.authority.map((a, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${tier.color}25` }}>
                            <Shield size={8} style={{ color: tier.color }} />
                          </div>
                          <span className="text-[11px] text-gray-300">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reward time */}
                  <div className="rounded-2xl p-3 border" style={{ background: `${tier.color}10`, borderColor: `${tier.color}20` }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Clock size={13} style={{ color: tier.color }} />
                      <h4 className="text-xs font-bold" style={{ color: tier.color }}>Reward Duration</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(tier.rewardTime).map(([key, val]) => (
                        <div key={key} className="rounded-xl p-2 bg-white/5">
                          <p className="text-[9px] text-gray-400 uppercase tracking-wider font-medium">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </p>
                          <p className="text-[11px] font-bold text-gray-200 mt-0.5">{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Global VIP benefits */}
      <div className="rounded-3xl p-4 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-500/20">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
            <Crown size={16} className="text-[#0A0118]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-300">Global VIP Benefits</h3>
            <p className="text-[10px] text-gray-400">Available across ALL VIP levels</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {globalVipBenefits.map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Check size={9} className="text-amber-400" />
              </div>
              <span className="text-[11px] text-gray-300">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}