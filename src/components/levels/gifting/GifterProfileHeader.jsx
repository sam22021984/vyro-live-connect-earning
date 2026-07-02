import React from "react";
import { CheckCircle, Crown, Share2, Eye, Gift } from "lucide-react";
import { currentGifterUser, giftingConfig } from "@/components/levels/gifting/giftingData";

export default function GifterProfileHeader() {
  const u = currentGifterUser;
  const c = giftingConfig;
  return (
    <div className="relative rounded-3xl overflow-hidden p-5" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: `0 16px 48px ${c.glow}, inset 0 1px 0 rgba(255,255,255,0.95)` }}>
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-3xl" style={{ background: `radial-gradient(circle, ${c.color}, transparent)` }} />
      <div className="relative">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full p-1" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}80)`, boxShadow: `0 8px 24px ${c.glow}` }}>
              <img src={u.avatar} alt={u.username} className="w-full h-full rounded-full object-cover border-2 border-white" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white whitespace-nowrap" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)`, border: "2px solid #fff" }}>LV {u.level}</div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h2 className="text-base font-bold text-gray-800 truncate">{u.username}</h2>
              <CheckCircle size={14} style={{ color: "#1F6BFF" }} />
              <Crown size={14} style={{ color: "#FFC83D" }} />
            </div>
            <p className="text-[10px] font-mono text-gray-400 mb-1">{u.gifterId}</p>
            <p className="text-xs font-semibold mb-1" style={{ color: c.color }}>{u.tierName}</p>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-cyan-50 text-cyan-600 border border-cyan-100">🏅 {u.badge}</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-600 border border-amber-100">👑 {u.crown}</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-600 border border-purple-100">💎 {u.vipStatus}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-xl p-2 text-center" style={{ background: `${c.color}10`, border: `1px solid ${c.color}20` }}>
            <p className="text-[9px] text-gray-400">Gifting Rank</p>
            <p className="text-sm font-bold" style={{ color: c.color }}>{u.giftingRank}</p>
          </div>
          <div className="rounded-xl p-2 text-center" style={{ background: "#FFC83D10", border: "1px solid #FFC83D20" }}>
            <p className="text-[9px] text-gray-400">Total Coins Sent</p>
            <p className="text-sm font-bold text-amber-500">{u.totalCoinsSent}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{ label: "Profile", icon: Eye }, { label: "Share", icon: Share2 }, { label: "History", icon: Gift }].map((a, i) => (
            <button key={i} className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white border border-gray-100 text-[10px] font-bold text-gray-700 active:scale-95 transition shadow-sm">
              <a.icon size={12} style={{ color: c.color }} /> {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}