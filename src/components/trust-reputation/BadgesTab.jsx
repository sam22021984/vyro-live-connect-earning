import React, { useState } from "react";
import {
  Award, BadgeCheck, ShieldCheck, HandHeart, Mic, TrendingUp, Trophy,
  Gift, Gem, Shield, Crown, Building2, Sparkles, Star, Lock, X,
} from "lucide-react";
import { TRUST_BADGES } from "./trustData";

const ICONS = {
  Award, BadgeCheck, ShieldCheck, HandHeart, Mic, TrendingUp, Trophy,
  Gift, Gem, Shield, Crown, Building2, Sparkles, Star,
};

const WHITE = "#FFFFFF";
const DARK = "#1F2937";
const GRAY = "#6B7280";

export default function BadgesTab({ onAction }) {
  const [selected, setSelected] = useState(null);
  const earned = TRUST_BADGES.filter(b => b.unlocked);
  const locked = TRUST_BADGES.filter(b => !b.unlocked);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-2xl p-3 text-center" style={{ background: WHITE, border: "1px solid #F0F1F5" }}>
          <p className="text-lg font-bold" style={{ color: "#10B981" }}>{earned.length}</p>
          <p className="text-[9px]" style={{ color: GRAY }}>Earned</p>
        </div>
        <div className="rounded-2xl p-3 text-center" style={{ background: WHITE, border: "1px solid #F0F1F5" }}>
          <p className="text-lg font-bold" style={{ color: "#9CA3AF" }}>{locked.length}</p>
          <p className="text-[9px]" style={{ color: GRAY }}>Locked</p>
        </div>
        <div className="rounded-2xl p-3 text-center" style={{ background: WHITE, border: "1px solid #F0F1F5" }}>
          <p className="text-lg font-bold" style={{ color: "#2F80ED" }}>{TRUST_BADGES.length}</p>
          <p className="text-[9px]" style={{ color: GRAY }}>Total</p>
        </div>
      </div>

      {/* Earned Badges */}
      <div>
        <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>Earned Badges ({earned.length})</h3>
        <div className="grid grid-cols-3 gap-2">
          {earned.map((b, i) => {
            const Icon = ICONS[b.icon] || Award;
            return (
              <button key={i} onClick={() => setSelected(b)} className="rounded-2xl p-3 flex flex-col items-center gap-1.5 active:scale-95 transition" style={{ background: WHITE, border: "1px solid #F0F1F5", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${b.color}, ${b.color}cc)`, boxShadow: `0 4px 12px ${b.color}30` }}>
                  <Icon size={22} className="text-white" />
                </div>
                <span className="text-[9px] font-semibold text-center leading-tight" style={{ color: DARK }}>{b.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Locked Badges */}
      <div>
        <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>Locked ({locked.length})</h3>
        <div className="grid grid-cols-3 gap-2">
          {locked.map((b, i) => {
            const Icon = ICONS[b.icon] || Award;
            return (
              <button key={i} onClick={() => setSelected(b)} className="rounded-2xl p-3 flex flex-col items-center gap-1.5 active:scale-95 transition relative overflow-hidden" style={{ background: "#F9FAFB", border: "1px solid #F0F1F5" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center relative" style={{ background: "#E5E7EB" }}>
                  <Icon size={22} style={{ color: "#9CA3AF" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock size={12} style={{ color: "#6B7280" }} />
                  </div>
                </div>
                <span className="text-[9px] font-semibold text-center leading-tight" style={{ color: GRAY }}>{b.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Badge Detail Sheet */}
      {selected && (
        <BadgeDetailSheet badge={selected} onClose={() => setSelected(null)} onAction={onAction} />
      )}
    </div>
  );
}

function BadgeDetailSheet({ badge, onClose, onAction }) {
  const Icon = ICONS[badge.icon] || Award;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto animate-fadeIn">
        <div className="sticky top-0 bg-white pt-3 pb-2 z-10">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
          <div className="flex items-center justify-between px-4">
            <h2 className="text-base font-bold" style={{ color: DARK }}>Badge Details</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="px-4 pb-6 space-y-4">
          <div className="flex flex-col items-center py-3">
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-2 ${badge.unlocked ? "" : "grayscale"}`} style={{ background: `linear-gradient(135deg, ${badge.color}, ${badge.color}cc)`, boxShadow: badge.unlocked ? `0 6px 20px ${badge.color}30` : "none", opacity: badge.unlocked ? 1 : 0.5 }}>
              <Icon size={36} className="text-white" />
            </div>
            <h3 className="text-sm font-bold" style={{ color: DARK }}>{badge.name}</h3>
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold mt-1 ${badge.unlocked ? "" : ""}`} style={{ background: badge.unlocked ? "#10B98110" : "#F3F4F6", color: badge.unlocked ? "#10B981" : GRAY }}>
              {badge.unlocked ? "✓ Earned" : "🔒 Locked"}
            </span>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl p-3" style={{ background: "#F9FAFB", border: "1px solid #F0F1F5" }}>
              <p className="text-[10px] font-bold mb-1" style={{ color: GRAY }}>Description</p>
              <p className="text-xs" style={{ color: DARK }}>{badge.description}</p>
            </div>
            <div className="rounded-2xl p-3" style={{ background: "#F9FAFB", border: "1px solid #F0F1F5" }}>
              <p className="text-[10px] font-bold mb-1" style={{ color: GRAY }}>Unlock Requirements</p>
              <p className="text-xs" style={{ color: DARK }}>{badge.requirement}</p>
            </div>
            <div className="rounded-2xl p-3" style={{ background: "#F9FAFB", border: "1px solid #F0F1F5" }}>
              <p className="text-[10px] font-bold mb-1" style={{ color: GRAY }}>Benefits</p>
              <p className="text-xs" style={{ color: DARK }}>{badge.benefits}</p>
            </div>
            {badge.date && (
              <div className="rounded-2xl p-3" style={{ background: "#F9FAFB", border: "1px solid #F0F1F5" }}>
                <p className="text-[10px] font-bold mb-1" style={{ color: GRAY }}>Earned Date</p>
                <p className="text-xs" style={{ color: DARK }}>{badge.date}</p>
              </div>
            )}
          </div>
          {!badge.unlocked && (
            <button onClick={() => onAction(`Work toward ${badge.name}`)} className="w-full py-3 rounded-2xl text-xs font-bold text-white active:scale-95 transition" style={{ background: badge.color }}>
              Learn How to Earn
            </button>
          )}
        </div>
      </div>
    </div>
  );
}