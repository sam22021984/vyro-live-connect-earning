import React from "react";
import { useNavigate } from "react-router-dom";
import { vipLevels } from "@/components/vip/vipData";
import { ChevronRight } from "lucide-react";

export default function VipLevelsTab() {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-base font-bold text-amber-300 text-center">💎 VIP Level System</h2>
      <p className="text-xs text-gray-400 text-center -mt-2">Tap any tier to view full details</p>

      {/* Level list */}
      <div className="space-y-2.5">
        {vipLevels.map((l) => {
          return (
            <button
              key={l.id}
              onClick={() => navigate(`/vip-level/${l.id}`)}
              className="w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 bg-white/5 border border-white/5 active:scale-[0.98]"
              style={{ boxShadow: `0 2px 12px ${l.glow}15` }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${l.color}30, ${l.glow}20)`,
                  border: `1px solid ${l.color}40`,
                  boxShadow: `0 2px 8px ${l.glow}30`,
                }}
              >
                {l.iconImage ? (
                  <img src={l.iconImage} alt={l.name} className="w-full h-full object-cover" />
                ) : (
                  l.icon
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold" style={{ color: l.color }}>{l.name}</h3>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/10 text-gray-400">
                    TIER {l.id}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400">{l.title}</p>
                <p className="text-xs font-bold text-amber-300 mt-0.5">{l.coins.toLocaleString()} coins · ${l.cash}</p>
              </div>
              <ChevronRight size={18} className="text-gray-500 flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}