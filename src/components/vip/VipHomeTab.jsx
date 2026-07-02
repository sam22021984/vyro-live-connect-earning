import React from "react";
import { Crown, Star, Gift, Sparkles } from "lucide-react";
import { vipTabs } from "@/components/vip/vipData";

const menuGrid = vipTabs.filter((t) => t.key !== "home");

export default function VipHomeTab({ onNavigate }) {
  return (
    <div className="p-4 space-y-4">
      {/* Luxury Crown Card */}
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
                <h2 className="text-lg font-bold text-amber-300">MISSVIP</h2>
              </div>
            </div>
            <span className="text-3xl">👑</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {[
              { label: "Membership", value: "12 Months" },
              { label: "Expiry", value: "Apr 2026" },
              { label: "Coins Used", value: "6.0M" },
              { label: "Benefits Active", value: "8" },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                <p className="text-[10px] text-gray-400">{s.label}</p>
                <p className="text-sm font-bold text-amber-200">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Progress to next level */}
          <div className="bg-black/30 rounded-2xl p-3 border border-amber-500/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-300">Next: ULTRA MISSVIP</span>
              <span className="text-xs font-bold text-amber-400">6M / 10M</span>
            </div>
            <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" style={{ width: "60%" }} />
            </div>
            <p className="text-[10px] text-gray-500 mt-1.5">4,000,000 coins remaining</p>
          </div>

          <div className="flex gap-2 mt-4">
            <button onClick={() => onNavigate("upgrade")} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0A0118] text-xs font-bold active:scale-95 transition">
              Upgrade VIP
            </button>
            <button onClick={() => onNavigate("benefits")} className="flex-1 py-2.5 rounded-xl bg-white/10 text-amber-300 text-xs font-bold border border-amber-500/20 active:scale-95 transition">
              View Benefits
            </button>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
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