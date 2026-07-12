import React from "react";
import VipIcon from "@/components/vip/VipIcon";

export default function VipLevelDetailHero({ level, detail, pricingTier }) {
  return (
    <div className="relative pt-8 pb-6 px-4 text-center overflow-hidden">
      {/* Glow background */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-30"
        style={{ background: `radial-gradient(circle, ${level.glow}, transparent 70%)` }}
      />

      {/* Tier number */}
      <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
        Tier {level.id} of 11
      </p>

      {/* Animated VIP Icon */}
      <div className="relative inline-block mb-3">
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-50 animate-pulse"
          style={{ background: `radial-gradient(circle, ${level.glow}, transparent)` }}
        />
        <div
          className="relative w-28 h-28 rounded-full flex items-center justify-center text-6xl overflow-hidden animate-fadeIn"
          style={{
            background: `linear-gradient(135deg, ${level.color}30, ${level.glow}20)`,
            border: `2px solid ${level.color}60`,
            boxShadow: `0 0 30px ${level.glow}50, inset 0 0 20px ${level.color}20`,
          }}
        >
          <VipIcon iconVideo={level.iconVideo} iconImage={level.iconImage} icon={level.icon} alt={level.name} round />
        </div>
      </div>

      {/* Name & Title */}
      <h1 className="text-xl font-extrabold mb-1" style={{ color: level.color }}>
        {level.name}
      </h1>
      <p className="text-xs text-gray-400 mb-3">{level.title}</p>

      {/* Price badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
        style={{ background: `${level.color}20`, border: `1px solid ${level.color}40` }}>
        <span className="text-sm font-bold" style={{ color: level.color }}>
          {level.coins.toLocaleString()} coins
        </span>
        <span className="text-gray-500 text-xs">·</span>
        <span className="text-sm font-bold text-amber-300">${level.cash}</span>
      </div>
    </div>
  );
}