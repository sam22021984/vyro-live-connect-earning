import React from "react";
import { Check, Lock, Coins, Sparkles, Crown } from "lucide-react";
import { collectionConfig } from "@/components/levels/userLevelTiers";

export default function TierCard({ tier, currentLevel }) {
  const config = collectionConfig[tier.collection];
  const isFinal = tier.tier === 31;

  // Determine status
  let status = "locked";
  if (isFinal) {
    status = currentLevel >= 300 ? "unlocked" : "locked";
  } else {
    const [minStr] = tier.levels.replace("LV", "").split("–");
    const min = parseInt(minStr, 10);
    const max = isFinal ? 300 : parseInt(tier.levels.split("–")[1].replace("LV", ""), 10);
    if (currentLevel >= max) status = "unlocked";
    else if (currentLevel >= min) status = "current";
    else status = "locked";
  }

  const statusConfig = {
    unlocked: { label: "Unlocked", color: "#22C55E", bg: "rgba(34,197,94,0.1)" },
    current: { label: "Current Tier", color: config.color, bg: `${config.color}15` },
    locked: { label: "Locked", color: "#94A3B8", bg: "rgba(148,163,184,0.1)" },
  };
  const sc = statusConfig[status];

  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: status === "locked" ? "rgba(245,247,250,0.6)" : "rgba(255,255,255,0.8)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${status === "current" ? `${config.color}40` : "rgba(255,255,255,0.8)"}`,
        boxShadow: status === "current"
          ? `0 12px 40px ${config.glow}, 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)`
          : `0 8px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.9)`,
      }}
    >
      {/* Top collection bar */}
      <div className={`h-2 bg-gradient-to-r ${config.gradient}`} />

      {status === "current" && (
        <div className="absolute top-3 right-3 z-10">
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold"
            style={{ background: config.color, color: "#fff", boxShadow: `0 2px 8px ${config.glow}` }}
          >
            <Sparkles size={9} /> CURRENT
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Tier number + 3D badge */}
        <div className="flex items-center gap-3 mb-3">
          {/* 3D Badge circle */}
          <div className="relative flex-shrink-0">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{
                background: status === "locked"
                  ? "linear-gradient(135deg, #E5E7EB, #D1D5DB)"
                  : `linear-gradient(135deg, ${config.color}30, ${config.color}10)`,
                border: `1px solid ${status === "locked" ? "#D1D5DB" : `${config.color}50`}`,
                boxShadow: status === "locked"
                  ? "inset 0 2px 4px rgba(255,255,255,0.5)"
                  : `0 8px 20px ${config.glow}, inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -3px 6px ${config.color}20`,
              }}
            >
              <span
                style={{
                  filter: status === "locked"
                    ? "grayscale(1) opacity(0.5)"
                    : `drop-shadow(0 3px 6px ${config.color}80)`,
                }}
              >
                {status === "locked" ? "🔒" : tier.icon}
              </span>
            </div>
            {/* Tier number badge */}
            <div
              className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`,
                boxShadow: `0 2px 6px ${config.glow}`,
                border: "2px solid #fff",
              }}
            >
              {tier.tier}
            </div>
          </div>

          {/* Name + collection */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md"
                style={{ background: `${config.color}15`, color: config.color }}
              >
                {config.name}
              </span>
              {isFinal && (
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-yellow-500 text-white flex items-center gap-0.5">
                  <Crown size={8} /> FINAL
                </span>
              )}
            </div>
            <h3 className="text-sm font-bold text-gray-800 leading-tight truncate">{tier.name}</h3>
            <p className="text-[11px] font-semibold mt-0.5" style={{ color: config.color }}>
              {tier.levels}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">{tier.description}</p>

        {/* Coins + Badge */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div
            className="rounded-xl p-2.5"
            style={{ background: `${config.color}08`, border: `1px solid ${config.color}15` }}
          >
            <div className="flex items-center gap-1 mb-0.5">
              <Coins size={11} style={{ color: config.color }} />
              <span className="text-[9px] text-gray-400 font-medium">Coins Required</span>
            </div>
            <p className="text-[11px] font-bold text-gray-800">{tier.coins}</p>
          </div>
          <div
            className="rounded-xl p-2.5"
            style={{ background: `${config.color}08`, border: `1px solid ${config.color}15` }}
          >
            <div className="flex items-center gap-1 mb-0.5">
              <Crown size={11} style={{ color: config.color }} />
              <span className="text-[9px] text-gray-400 font-medium">3D Badge</span>
            </div>
            <p className="text-[11px] font-bold text-gray-800 truncate">{tier.badge}</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-3">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Benefits</h4>
          <div className="grid grid-cols-2 gap-1.5">
            {tier.benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: status === "locked" ? "#E5E7EB" : `${config.color}20` }}
                >
                  {status === "locked"
                    ? <Lock size={8} className="text-gray-400" />
                    : <Check size={9} style={{ color: config.color }} />}
                </div>
                <span className={`text-[10px] leading-tight ${status === "locked" ? "text-gray-400" : "text-gray-600"}`}>
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards preview */}
        <div className="mb-3">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">3D Rewards Preview</h4>
          <div className="flex flex-wrap gap-1.5">
            {tier.rewards.map((r, i) => (
              <span
                key={i}
                className="text-[9px] font-semibold px-2 py-1 rounded-lg"
                style={{
                  background: status === "locked" ? "#F3F4F6" : `${config.color}10`,
                  color: status === "locked" ? "#9CA3AF" : config.color,
                  border: `1px solid ${status === "locked" ? "#E5E7EB" : `${config.color}20`}`,
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Unlock animation + status */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <Sparkles size={11} style={{ color: config.color }} />
            <div>
              <p className="text-[8px] text-gray-400 font-medium uppercase tracking-wider">Unlock Effect</p>
              <p className="text-[10px] font-bold text-gray-700">{tier.unlock}</p>
            </div>
          </div>
          <span
            className="text-[9px] font-bold px-2 py-1 rounded-full"
            style={{ background: sc.bg, color: sc.color }}
          >
            {sc.label}
          </span>
        </div>
      </div>
    </div>
  );
}