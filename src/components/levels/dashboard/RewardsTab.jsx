import React from "react";
import { currentBenefits, nextRewards, rewardGalleryCategories } from "@/components/levels/dashboardData";
import { Eye, Sparkles, Check } from "lucide-react";

export default function RewardsTab() {
  return (
    <div className="space-y-5">
      {/* SECTION 05 — Current Benefits */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Current Benefits</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">Active premium assets equipped</p>
        <div className="grid grid-cols-2 gap-2.5">
          {currentBenefits.map((b, i) => (
            <div key={i} className="rounded-2xl p-3" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: `0 4px 12px ${b.color}15` }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${b.color}15`, border: `1px solid ${b.color}25`, boxShadow: `0 2px 8px ${b.color}20` }}>
                  <span style={{ filter: `drop-shadow(0 1px 2px ${b.color}50)` }}>{b.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-gray-800 truncate">{b.name}</p>
                  <p className="text-[9px] text-gray-400 truncate">{b.desc}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {["Preview", "Equip", "Change"].map((a, j) => (
                  <button key={j} className="text-[8px] font-bold py-1 rounded-lg active:scale-95 transition" style={{ background: j === 1 ? b.color : `${b.color}10`, color: j === 1 ? "#fff" : b.color }}>{a}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 06 — Next Rewards */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Next Rewards</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">Upcoming unlockable items</p>
        <div className="grid grid-cols-2 gap-2.5">
          {nextRewards.map((r, i) => (
            <div key={i} className="rounded-2xl p-3 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: `1px solid ${r.color}30`, boxShadow: `0 4px 12px ${r.color}15` }}>
              <div className="absolute top-2 right-2 text-[8px] font-bold px-1.5 py-0.5 rounded-md" style={{ background: `${r.color}15`, color: r.color }}>🔒 {r.req}</div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-2" style={{ background: `${r.color}15`, border: `1px solid ${r.color}25`, filter: "grayscale(0.3)" }}>
                <span>{r.icon}</span>
              </div>
              <p className="text-[10px] font-bold text-gray-800 truncate">{r.name}</p>
              <p className="text-[9px] text-gray-400 truncate mb-2">{r.desc}</p>
              <div className="grid grid-cols-2 gap-1">
                <button className="text-[8px] font-bold py-1 rounded-lg flex items-center justify-center gap-0.5" style={{ background: `${r.color}10`, color: r.color }}><Eye size={9} /> Preview</button>
                <button className="text-[8px] font-bold py-1 rounded-lg" style={{ background: `${r.color}10`, color: r.color }}>Requirements</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 07 — Reward Gallery */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Reward Gallery</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">3D collection gallery</p>
        <div className="grid grid-cols-2 gap-2.5">
          {rewardGalleryCategories.map((c, i) => (
            <button key={i} className="rounded-2xl p-3 flex items-center gap-2.5 active:scale-95 transition text-left" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: `0 4px 12px ${c.color}15` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${c.color}15`, border: `1px solid ${c.color}25`, boxShadow: `0 2px 8px ${c.color}20` }}>
                <span style={{ filter: `drop-shadow(0 1px 2px ${c.color}50)` }}>{c.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-gray-800 truncate">{c.name}</p>
                <p className="text-[9px] text-gray-400">{c.count}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}