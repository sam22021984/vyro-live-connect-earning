import React, { useState } from "react";
import { Coins, Check, Eye, Sparkles, Loader2, Lock } from "lucide-react";
import { rarityStyles } from "@/components/mall/mallData";
import { useToast } from "@/components/ui/use-toast";

export default function MallItemCard({ item, sectionColor, owned, equipped, onBuy, onEquip, onUnequip, processing }) {
  const [previewing, setPreviewing] = useState(false);
  const { toast } = useToast();
  const rarity = rarityStyles[item.rarity] || rarityStyles["—"];
  const price = item.price_coins || item.price || 0;
  const canAfford = true; // checked on backend

  const handleBuy = () => {
    if (price === 0 || item.price === "—") return;
    onBuy?.(item);
  };

  const handleEquip = () => {
    if (equipped) {
      onUnequip?.(item);
    } else {
      onEquip?.(item);
    }
  };

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

      {/* Owned badge */}
      {owned && (
        <div className="absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded-md bg-green-500/20 border border-green-500/30">
          <span className="text-[8px] font-bold text-green-400 flex items-center gap-0.5">
            <Check size={8} /> OWNED
          </span>
        </div>
      )}

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
          {item.rarity && item.rarity !== "—" && !owned && (
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
        <p className="text-[10px] text-gray-400 leading-tight mb-2 line-clamp-2">{item.description || item.desc}</p>

        {/* Price */}
        {price > 0 && (
          <div className="flex items-center gap-1 mb-2.5">
            <Coins size={11} className="text-amber-400" />
            <span className="text-xs font-bold text-amber-300">{price.toLocaleString()}</span>
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
          {owned ? (
            <button
              onClick={handleEquip}
              className="flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-bold active:scale-95 transition"
              style={{
                background: equipped ? `${sectionColor}20` : `${sectionColor}10`,
                color: sectionColor,
                border: `1px solid ${sectionColor}40`,
              }}
            >
              {equipped ? <><Check size={11} /> Equipped</> : <><Sparkles size={11} /> Equip</>}
            </button>
          ) : processing ? (
            <button
              disabled
              className="flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-bold text-white opacity-60"
              style={{ background: `linear-gradient(to right, ${sectionColor}, ${sectionColor}cc)` }}
            >
              <Loader2 size={11} className="animate-spin" /> Buying...
            </button>
          ) : (
            <button
              onClick={handleBuy}
              className="flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-bold text-white active:scale-95 transition"
              style={{ background: `linear-gradient(to right, ${sectionColor}, ${sectionColor}cc)`, boxShadow: `0 2px 6px ${sectionColor}40` }}
            >
              <Sparkles size={11} /> Buy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}