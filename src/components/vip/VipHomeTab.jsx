import React from "react";
import { Crown, Loader2 } from "lucide-react";
import { vipTabs } from "@/components/vip/vipData";
import { vipPricingTiers } from "@/components/vip/vipData";
import { useVipProfile } from "@/hooks/useVipProfile";

const menuGrid = vipTabs.filter((t) => t.key !== "home");

function formatExpiry(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatCoins(n) {
  if (!n) return "0";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export default function VipHomeTab({ onNavigate }) {
  const { profile, loading } = useVipProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
      </div>
    );
  }

  const isVip = profile?.is_vip;
  const tierName = profile?.vip_tier || "Not VIP";
  const tierIndex = vipPricingTiers.findIndex((t) => t.name === tierName);
  const nextTier = tierIndex >= 0 && tierIndex < vipPricingTiers.length - 1 ? vipPricingTiers[tierIndex + 1] : null;
  const coinsUsed = profile?.total_xp || 0;
  const coinsBalance = profile?.coins || 0;

  const nextTierCoins = nextTier ? parseInt(nextTier.coins.replace(/,/g, "")) : 0;
  const progress = nextTier ? Math.min(100, (coinsUsed / nextTierCoins) * 100) : 100;
  const remaining = nextTier ? Math.max(0, nextTierCoins - coinsUsed) : 0;
  const benefitsActive = tierIndex >= 0 ? (vipPricingTiers[tierIndex].benefits?.length || 0) : 0;

  const membershipLabel = (() => {
    if (!profile?.vip_expiry) return "—";
    const diffMs = new Date(profile.vip_expiry).getTime() - Date.now();
    const months = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24 * 30)));
    return `${months} Months`;
  })();

  const stats = [
    { label: "Membership", value: isVip ? membershipLabel : "Inactive" },
    { label: "Expiry", value: formatExpiry(profile?.vip_expiry) },
    { label: "Coins Used", value: formatCoins(coinsUsed) },
    { label: "Benefits Active", value: String(benefitsActive) },
  ];

  return (
    <div className="p-4 space-y-4">
      <div
        className="relative rounded-3xl p-5 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1033 0%, #2d1b4e 50%, #1a1033 100%)",
          boxShadow: "0 8px 32px rgba(255,215,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,215,0,0.2)",
        }}
      >
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-amber-500/20 blur-2xl" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-purple-500/20 blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-600 flex items-center justify-center"
                style={{ boxShadow: "0 4px 12px rgba(255,215,0,0.4), inset 0 1px 1px rgba(255,255,255,0.4)" }}
              >
                <Crown size={20} className="text-[#0A0118]" />
              </div>
              <div>
                <p className="text-[10px] text-amber-300/70 font-semibold uppercase tracking-wider">Current Level</p>
                <h2 className="text-lg font-bold text-amber-300">{tierName}</h2>
              </div>
            </div>
            <span className="text-3xl">{isVip ? "👑" : "🔒"}</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                <p className="text-[10px] text-gray-400">{s.label}</p>
                <p className="text-sm font-bold text-amber-200">{s.value}</p>
              </div>
            ))}
          </div>

          {isVip && nextTier ? (
            <div className="bg-black/30 rounded-2xl p-3 border border-amber-500/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-300">Next: {nextTier.name}</span>
                <span className="text-xs font-bold text-amber-400">{formatCoins(coinsUsed)} / {nextTier.coins}</span>
              </div>
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-[10px] text-gray-500 mt-1.5">{formatCoins(remaining)} coins remaining</p>
            </div>
          ) : !isVip ? (
            <div className="bg-black/30 rounded-2xl p-3 border border-amber-500/10 text-center">
              <p className="text-xs text-gray-400 mb-2">You are not a VIP member yet</p>
              <button onClick={() => onNavigate("purchase")} className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0A0118] text-xs font-bold active:scale-95 transition">
                Get VIP Now
              </button>
            </div>
          ) : (
            <div className="bg-black/30 rounded-2xl p-3 border border-amber-500/10 text-center">
              <p className="text-xs text-amber-300">👑 You've reached the highest VIP tier!</p>
            </div>
          )}

          {isVip && (
            <div className="flex gap-2 mt-4">
              <button onClick={() => onNavigate("upgrade")} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0A0118] text-xs font-bold active:scale-95 transition">
                Upgrade VIP
              </button>
              <button onClick={() => onNavigate("benefits")} className="flex-1 py-2.5 rounded-xl bg-white/10 text-amber-300 text-xs font-bold border border-amber-500/20 active:scale-95 transition">
                View Benefits
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl p-3 bg-white/5 border border-white/5 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-400">Coin Balance</p>
          <p className="text-lg font-bold text-amber-300">{formatCoins(coinsBalance)}</p>
        </div>
        <button onClick={() => onNavigate("rewards")} className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold active:scale-95 transition">
          Claim Rewards
        </button>
      </div>

      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">VIP Control Center</h3>
        <div className="grid grid-cols-4 gap-2.5">
          {menuGrid.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onNavigate(tab.key)}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-white/5 border border-white/5 active:scale-95 transition hover:border-amber-500/20"
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-[9px] font-semibold text-gray-300 text-center leading-tight">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}