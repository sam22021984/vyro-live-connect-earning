import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Check, Lock, Zap, Mic, Users, Music, Crown } from "lucide-react";
import { useVipProfile } from "@/hooks/useVipProfile";
import { vipAuthorityLevels } from "@/components/vip-systems/vipSystemsData";
import { vipPricingTiers } from "@/components/vip/vipData";
import VipSystemHeader from "@/components/vip-systems/VipSystemHeader";
import VipSystemLoader from "@/components/vip-systems/VipSystemLoader";

export default function VipAuthoritySystem() {
  const { profile, loading } = useVipProfile();
  const [selectedTier, setSelectedTier] = useState(null);
  const navigate = useNavigate();

  if (loading) return <VipSystemLoader />;

  const userTierName = profile?.vip_tier || "VIP 1";
  const userTierIndex = vipAuthorityLevels.findIndex((t) => userTierName.includes(t.tier) || t.tier.includes(userTierName));
  const currentAuthority = vipAuthorityLevels[userTierIndex >= 0 ? userTierIndex : 0];
  const isVip = profile?.is_vip;

  return (
    <div className="min-h-screen bg-[#0A0118]">
      <div className="max-w-md mx-auto">
        <VipSystemHeader title="VIP AUTHORITY SYSTEM" subtitle="Room authority & moderation powers" icon="⚡" color="#EF4444" />

        <div className="pb-6 animate-fadeIn">
          {/* Current Authority Card */}
          <div className="px-4 pt-4">
            <div
              className="rounded-2xl p-5 shadow-2xl"
              style={{
                backgroundImage: `linear-gradient(135deg, ${currentAuthority.color}33, ${currentAuthority.color}08)`,
                border: `1px solid ${currentAuthority.color}44`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{currentAuthority.icon}</div>
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Your Authority Level</p>
                  <h2 className="text-lg font-bold text-white">{currentAuthority.tier}</h2>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-2">Active Authorities</p>
                <div className="space-y-1.5">
                  {currentAuthority.authorities.map((auth, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check size={12} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-300">{auth}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Authority Icons Summary */}
          <div className="px-4 mt-4">
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: Mic, label: "Mic", unlocked: userTierIndex >= 3 },
                { icon: Users, label: "Seats", unlocked: userTierIndex >= 1 },
                { icon: Music, label: "Music", unlocked: userTierIndex >= 2 },
                { icon: Crown, label: "Admin", unlocked: userTierIndex >= 7 },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 border border-white/5">
                  <item.icon size={18} className={item.unlocked ? "text-red-400" : "text-gray-700"} />
                  <span className={`text-[9px] font-medium ${item.unlocked ? "text-gray-300" : "text-gray-700"}`}>
                    {item.label}
                  </span>
                  {item.unlocked ? (
                    <Check size={10} className="text-green-400" />
                  ) : (
                    <Lock size={10} className="text-gray-700" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* All Authority Tiers */}
          <div className="px-4 mt-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">All Authority Levels</h3>
            <p className="text-xs text-gray-600 mb-3">Tap to see what powers each VIP tier unlocks</p>
            <div className="space-y-2">
              {vipAuthorityLevels.map((tier, idx) => {
                const isUnlocked = idx <= (userTierIndex >= 0 ? userTierIndex : 0);
                const isSelected = selectedTier === tier.tier;
                return (
                  <div key={tier.tier}>
                    <button
                      onClick={() => setSelectedTier(isSelected ? null : tier.tier)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                        isSelected
                          ? "bg-white/10 border border-white/20"
                          : "bg-white/5 border border-white/5"
                      } ${!isUnlocked && !isSelected ? "opacity-50" : ""}`}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ backgroundColor: `${tier.color}22` }}
                      >
                        {tier.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <span className="text-sm font-bold text-white">{tier.tier}</span>
                        <p className="text-[10px] text-gray-500">{tier.authorities.length} authorities</p>
                      </div>
                      {isUnlocked ? (
                        <Shield size={14} className="text-green-400 flex-shrink-0" />
                      ) : (
                        <Lock size={14} className="text-gray-700 flex-shrink-0" />
                      )}
                    </button>
                    {isSelected && (
                      <div className="mt-1 mb-2 mx-2 p-4 rounded-xl bg-black/30 border border-white/5 animate-fadeIn">
                        <div className="space-y-1.5">
                          {tier.authorities.map((auth, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <Zap size={12} className="mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                              <span className="text-xs text-gray-300">{auth}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upgrade CTA */}
          {!isVip && (
            <div className="px-4 mt-6">
              <div className="rounded-2xl p-5 bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Crown size={16} className="text-red-400" />
                  <h3 className="text-sm font-bold text-white">Unlock VIP Authority</h3>
                </div>
                <p className="text-xs text-gray-400 mb-3">Become VIP to unlock room moderation powers and authority features.</p>
                <button
                  onClick={() => navigate("/vip-membership")}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 text-white text-xs font-bold active:scale-95 transition"
                >
                  Get VIP Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}