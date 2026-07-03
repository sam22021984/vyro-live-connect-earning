import React from "react";
import { Loader2 } from "lucide-react";
import { useVipProfile } from "@/hooks/useVipProfile";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getHistoryIcon(desc) {
  if (!desc) return "📋";
  if (desc.includes("Purchase")) return "💳";
  if (desc.includes("Upgrade")) return "⬆️";
  if (desc.includes("Reward")) return "🎁";
  return "📋";
}

export default function VipHistoryTab() {
  const { history, loading } = useVipProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
      </div>
    );
  }

  const purchases = history.filter((h) => h.description?.includes("Purchase")).length;
  const upgrades = history.filter((h) => h.description?.includes("Upgrade")).length;
  const rewardsClaimed = history.filter((h) => h.description?.includes("Reward")).length;
  const activeBenefits = history.filter((h) => h.status === "completed" && h.tier_label).length;

  const summary = [
    { label: "Total Purchases", value: String(purchases) },
    { label: "Total Upgrades", value: String(upgrades) },
    { label: "Rewards Claimed", value: String(rewardsClaimed) },
    { label: "Active Benefits", value: String(activeBenefits) },
  ];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-amber-300 text-center">📊 VIP History</h2>

      <div className="text-center py-2">
        <div className="text-4xl mb-1">📊</div>
        <h3 className="text-sm font-bold text-amber-300">VIP Analytics</h3>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {summary.map((s, i) => (
          <div key={i} className="rounded-xl p-3 bg-white/5 border border-white/5 text-center">
            <p className="text-lg font-bold text-amber-300">{s.value}</p>
            <p className="text-[10px] text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {history.length === 0 ? (
        <div className="rounded-2xl p-8 bg-white/5 border border-white/5 text-center">
          <div className="text-3xl mb-2">📭</div>
          <p className="text-xs text-gray-400">No VIP history yet</p>
          <p className="text-[10px] text-gray-500 mt-1">Purchase or upgrade VIP to see your history here</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {history.map((h, i) => {
            const type = h.description?.includes("Purchase") ? "Purchase"
              : h.description?.includes("Upgrade") ? "Upgrade"
              : h.description?.includes("Reward") ? "Reward"
              : "Transaction";
            const amount = h.coins > 0
              ? `${h.coins.toLocaleString()} coins`
              : h.amount_usd > 0
                ? `$${h.amount_usd}`
                : "—";
            return (
              <div key={h.id || i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-600/10 flex items-center justify-center text-xl flex-shrink-0">
                  {getHistoryIcon(h.description)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-300">{type}</span>
                    {h.tier_label && <span className="text-[9px] text-amber-400/70">{h.tier_label}</span>}
                    <span className="text-[10px] text-gray-500">{formatDate(h.created_date)}</span>
                  </div>
                  <p className="text-[11px] text-gray-300">{h.description || "VIP transaction"}</p>
                  {h.status !== "completed" && (
                    <span className="text-[9px] text-yellow-400 capitalize">{h.status}</span>
                  )}
                </div>
                <span className="text-xs font-bold text-gray-200">{amount}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}