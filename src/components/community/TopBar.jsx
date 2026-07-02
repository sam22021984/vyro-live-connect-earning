import React from "react";
import { Menu, Search, Bell, MessageCircle, Megaphone, Settings, Coins } from "lucide-react";
import { COLORS } from "./communityData";

export default function TopBar({ onMenu, coins, onSearch }) {
  return (
    <div className="sticky top-0 z-20 px-4 py-2.5 flex items-center gap-2.5" style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${COLORS.border}` }}>
      <button onClick={onMenu} className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: COLORS.bgPrimary }}>
        <Menu size={18} style={{ color: COLORS.textPrimary }} />
      </button>

      <div className="hidden md:block">
        <h1 className="text-sm font-bold" style={{ color: COLORS.textPrimary }}>Community Dashboard</h1>
        <p className="text-[10px]" style={{ color: COLORS.textSecondary }}>Enterprise Overview</p>
      </div>

      <div className="flex-1 max-w-md mx-auto relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: COLORS.textSecondary }} />
        <input
          onChange={(e) => onSearch?.(e.target.value)}
          placeholder="Search communities, members, posts..."
          className="w-full py-2 pl-9 pr-4 rounded-xl text-xs outline-none"
          style={{ background: COLORS.bgPrimary, border: `1px solid ${COLORS.border}`, color: COLORS.textPrimary }}
        />
      </div>

      <div className="flex items-center gap-1.5">
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl" style={{ background: `${COLORS.gold}15`, border: `1px solid ${COLORS.gold}30` }}>
          <Coins size={14} style={{ color: COLORS.gold }} />
          <span className="text-[11px] font-bold" style={{ color: COLORS.gold }}>{(coins / 1000000).toFixed(1)}M</span>
        </div>

        <button className="w-9 h-9 rounded-xl flex items-center justify-center relative" style={{ background: COLORS.bgPrimary }}>
          <Megaphone size={16} style={{ color: COLORS.skyBlue }} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: COLORS.skyBlue }} />
        </button>

        <button className="w-9 h-9 rounded-xl flex items-center justify-center relative" style={{ background: COLORS.bgPrimary }}>
          <Bell size={16} style={{ color: COLORS.amber }} />
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full text-white text-[8px] font-bold flex items-center justify-center" style={{ background: COLORS.crimson }}>5</span>
        </button>

        <button className="w-9 h-9 rounded-xl flex items-center justify-center relative" style={{ background: COLORS.bgPrimary }}>
          <MessageCircle size={16} style={{ color: COLORS.royalBlue }} />
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full text-white text-[8px] font-bold flex items-center justify-center" style={{ background: COLORS.royalBlue }}>3</span>
        </button>

        <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: COLORS.bgPrimary }}>
          <Settings size={16} style={{ color: COLORS.textSecondary }} />
        </button>

        <div className="relative flex-shrink-0">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" className="w-9 h-9 rounded-xl object-cover" alt="" />
          <span className="absolute -top-1 -right-1 text-[7px] font-bold text-white px-1 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})` }}>VIP 7</span>
        </div>
      </div>
    </div>
  );
}