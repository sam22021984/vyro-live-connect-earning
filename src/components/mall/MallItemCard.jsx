import React, { useState } from "react";
import { Coins, Check, Eye, Sparkles } from "lucide-react";
import { rarityStyles } from "@/components/mall/mallData";

export default function MallItemCard({ item, sectionColor }) {
  const [equipped, setEquipped] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const rarity = rarityStyles[item.rarity] || rarityStyles["—"];

  return (
    <div
      className="relative rounded-2xl overflow-hidden border transition-all duration-200"
      style={{
        background: `linear-gradient(135deg, ${rarity.bg}, rgba(255,255,255,0.02))`,
        borderColor: rarity.border,
        boxShadow: previewing ? `0 8px 24px ${sectionColor}30` : "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      {/* Rarity top bar */}
      <div className="h-1" style={{ background: `linear-gradient(to right, ${rarity.color}, ${rarity.color}80)` }} />

      <div className="p-3">
        {/* Item icon + rarity badge */}
        <div className="flex items-start justify-between mb-2">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{
              background: `linear-gradient(135deg, ${sectionColor}25, ${sectionColor}08)`,
              border: `1px solid ${sectionColor}30`,
              boxShadow: `0 4px 12px ${sectionColor}20, inset 0 1px 3px rgba(255,255,255,0.1)`,
            }}
          >
            <span style={{ filter: `drop-shadow(0 2px 3px ${sectionColor}60)` }}>{item.icon}</span>
          </div>
          {item.rarity !== "—" && (
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider"
              style={{ background: rarity.bg, color: rarity.color, border: `1px solid ${rarity.border}` }}
            >
              {item.rarity}
            </span>
          )}
        </div>

        {/* Name + desc */}
        <h4 className="text-xs font-bold text-white mb-0.5 truncate">{item.name}</h4>
        <p className="text-[10px] text-gray-400 leading-tight mb-2 line-clamp-2">{item.desc}</p>

        {/* Price */}
        {item.price !== "—" && (
          <div className="flex items-center gap-1 mb-2.5">
            <Coins size={11} className="text-amber-400" />
            <span className="text-xs font-bold text-amber-300">{item.price}</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => setPreviewing(!previewing)}
            className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-semibold text-gray-300 active:scale-95 transition hover:bg-white/10"
          >
            <Eye size={11} /> Preview
          </button>
          {equipped ? (
            <button
              onClick={() => setEquipped(false)}
              className="flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-bold active:scale-95 transition"
              style={{ background: `${sectionColor}20`, color: sectionColor, border: `1px solid ${sectionColor}40` }}
            >
              <Check size={11} /> Equipped
            </button>
          ) : (
            <button
              onClick={() => setEquipped(true)}
              className="flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-bold text-white active:scale-95 transition"
              style={{ background: `linear-gradient(to right, ${sectionColor}, ${sectionColor}cc)`, boxShadow: `0 2px 6px ${sectionColor}40` }}
            >
              <Sparkles size={11} /> {item.price === "—" ? "View" : "Buy"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}