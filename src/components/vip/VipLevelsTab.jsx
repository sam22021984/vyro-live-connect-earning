import React, { useState } from "react";
import { vipLevels } from "@/components/vip/vipData";
import { Check } from "lucide-react";

export default function VipLevelsTab() {
  const [selected, setSelected] = useState(8);
  const level = vipLevels.find((l) => l.id === selected);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-amber-300 text-center">💎 VIP Level System</h2>

      {/* Level list */}
      <div className="space-y-2.5">
        {vipLevels.map((l) => {
          const isCurrent = l.id === 8;
          const isSelected = l.id === selected;
          return (
            <button
              key={l.id}
              onClick={() => setSelected(l.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 ${
                isSelected ? "bg-white/10 border border-amber-500/30" : "bg-white/5 border border-white/5"
              }`}
              style={isSelected ? { boxShadow: `0 4px 16px ${l.glow}30` } : {}}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${l.color}30, ${l.glow}20)`,
                  border: `1px solid ${l.color}40`,
                  boxShadow: `0 2px 8px ${l.glow}30`,
                }}
              >
                {l.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold" style={{ color: l.color }}>{l.name}</h3>
                  {isCurrent && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400">ACTIVE</span>
                  )}
                </div>
                <p className="text-[10px] text-gray-400">{l.title}</p>
                <p className="text-xs font-bold text-amber-300 mt-0.5">{l.coins.toLocaleString()} coins · ${l.cash}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected level benefits */}
      {level && (
        <div className="rounded-2xl p-4 bg-white/5 border border-amber-500/20" style={{ boxShadow: `0 4px 20px ${level.glow}20` }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{level.icon}</span>
            <div>
              <h3 className="text-sm font-bold" style={{ color: level.color }}>{level.name} Benefits</h3>
              <p className="text-[10px] text-gray-400">{level.title}</p>
            </div>
          </div>
          <div className="space-y-2">
            {level.benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Check size={10} className="text-green-400" />
                </div>
                <span className="text-xs text-gray-300">{b}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}