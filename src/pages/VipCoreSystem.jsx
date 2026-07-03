import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Crown, Calendar, Gift, TrendingUp, Star } from "lucide-react";
import { useVipProfile } from "@/hooks/useVipProfile";
import { vipCoreFeatures, vipSystemModules } from "@/components/vip-systems/vipSystemsData";
import { vipPricingTiers } from "@/components/vip/vipData";
import VipSystemHeader from "@/components/vip-systems/VipSystemHeader";
import VipSystemLoader from "@/components/vip-systems/VipSystemLoader";

export default function VipCoreSystem() {
  const { profile, loading } = useVipProfile();
  const navigate = useNavigate();

  if (loading) return <VipSystemLoader />;

  const isVip = profile?.is_vip;
  const currentTier = vipPricingTiers.find((t) => t.name === profile?.vip_tier) || vipPricingTiers[0];
  const coins = profile?.coins || 0;

  return (
    <div className="min-h-screen bg-[#0A0118]">
      <div className="max-w-md mx-auto">
        <VipSystemHeader title="VIP CORE SYSTEM" subtitle="Your VIP membership center" icon="👑" color="#FFD700" />

        <div className="pb-6 animate-fadeIn">
          {/* VIP Status Card */}
          <div className="px-4 pt-4">
            <div
              className="rounded-2xl p-5 shadow-2xl relative overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(135deg, ${currentTier.color}33, ${currentTier.color}08)`,
                border: `1px solid ${currentTier.color}44`,
              }}
            >
              <div className="absolute top-0 right-0 text-8xl opacity-5">{currentTier.icon}</div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">VIP Status</span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                    style={{ backgroundColor: `${currentTier.color}33`, color: currentTier.color }}
                  >
                    {isVip ? "ACTIVE" : "INACTIVE"}
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{currentTier.icon}</div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{currentTier.name}</h2>
                    <p className="text-xs text-gray-400">{currentTier.title || "VIP Member"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-black/20 rounded-xl p-2.5 text-center">
                    <p className="text-[9px] text-gray-500 font-medium">Coins</p>
                    <p className="text-sm font-bold text-amber-400">{coins.toLocaleString()}</p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-2.5 text-center">
                    <p className="text-[9px] text-gray-500 font-medium">Daily</p>
                    <p className="text-sm font-bold text-white">{currentTier.dailyCoins}</p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-2.5 text-center">
                    <p className="text-[9px] text-gray-500 font-medium">Expiry</p>
                    <p className="text-sm font-bold text-white">{profile?.vip_expiry || "—"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-4 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate("/vip-membership")}
                className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/20 active:scale-95 transition"
              >
                <Crown size={18} className="text-amber-400" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Upgrade VIP</p>
                  <p className="text-[9px] text-gray-500">Get more benefits</p>
                </div>
              </button>
              <button
                onClick={() => navigate("/vip-reward-system")}
                className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/20 active:scale-95 transition"
              >
                <Gift size={18} className="text-green-400" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Claim Rewards</p>
                  <p className="text-[9px] text-gray-500">Daily & monthly</p>
                </div>
              </button>
            </div>
          </div>

          {/* Core Features */}
          <div className="px-4 mt-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">VIP Core Features</h3>
            <div className="space-y-2">
              {vipCoreFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-xl flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{feature.title}</p>
                    <p className="text-[10px] text-gray-500">{feature.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-600" />
                </div>
              ))}
            </div>
          </div>

          {/* VIP Journey Timeline */}
          <div className="px-4 mt-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-amber-400" />
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">VIP Journey</h3>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-500">Current Tier</p>
                  <p className="text-sm font-bold text-amber-400">{currentTier.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Total Tiers</p>
                  <p className="text-sm font-bold text-white">{vipPricingTiers.length}</p>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500"
                  style={{ width: `${((vipPricingTiers.indexOf(currentTier) + 1) / vipPricingTiers.length) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-500 mt-2">
                {vipPricingTiers.length - vipPricingTiers.indexOf(currentTier) - 1} tiers remaining to ROYAL IMISSVIP
              </p>
            </div>
          </div>

          {/* Other VIP Systems */}
          <div className="px-4 mt-6">
            <div className="flex items-center gap-2 mb-3">
              <Star size={14} className="text-purple-400" />
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">VIP System Modules</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {vipSystemModules.filter((m) => m.id !== "vip-core-system").map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => navigate(mod.path)}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 text-left active:scale-95 transition"
                >
                  <div className="text-2xl mb-1">{mod.icon}</div>
                  <p className="text-xs font-bold text-white">{mod.name}</p>
                  <p className="text-[9px] text-gray-500 mt-0.5">{mod.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}