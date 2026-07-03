import React from "react";
import { Crown, Check, Lock, ChevronRight } from "lucide-react";
import { TRUST_LEVELS } from "./trustData";

const WHITE = "#FFFFFF";
const DARK = "#1F2937";
const GRAY = "#6B7280";

export default function LevelsTab({ onAction }) {
  return (
    <div className="space-y-4">
      {/* Progress Journey */}
      <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #2F80ED, #56CCF2)", boxShadow: "0 8px 24px rgba(47,128,237,0.2)" }}>
        <div className="flex items-center gap-2 mb-2">
          <Crown size={16} className="text-white" />
          <h3 className="text-sm font-bold text-white">Trust Level Journey</h3>
        </div>
        <p className="text-[11px] text-white/90">Progress through trust levels by increasing your score and earning badges. Higher levels unlock exclusive rewards and privileges.</p>
      </div>

      {/* Levels List */}
      <div className="space-y-3">
        {TRUST_LEVELS.map((lvl, i) => {
          const isCurrent = lvl.current;
          const isUnlocked = TRUST_LEVELS.findIndex(l => l.current) >= i;
          return (
            <div key={i} className="rounded-2xl p-4 relative overflow-hidden" style={{ background: WHITE, border: isCurrent ? `2px solid ${lvl.color}` : "1px solid #F0F1F5", boxShadow: isCurrent ? `0 8px 24px ${lvl.color}20` : "0 2px 8px rgba(0,0,0,0.03)" }}>
              {isCurrent && (
                <span className="absolute top-3 right-3 text-[8px] px-2 py-0.5 rounded-full font-bold text-white" style={{ background: lvl.color }}>CURRENT</span>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: isUnlocked ? `linear-gradient(135deg, ${lvl.color}, ${lvl.color}cc)` : "#F3F4F6", boxShadow: isUnlocked ? `0 4px 12px ${lvl.color}30` : "none" }}>
                  {isUnlocked ? <Crown size={22} className="text-white" /> : <Lock size={18} style={{ color: GRAY }} />}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold" style={{ color: DARK }}>{lvl.name}</h3>
                  <p className="text-[10px]" style={{ color: GRAY }}>Score {lvl.score}+ • {lvl.badges} badges required</p>
                </div>
              </div>

              {/* Rewards */}
              <div>
                <p className="text-[9px] font-bold mb-1.5" style={{ color: GRAY }}>Rewards & Privileges</p>
                <div className="flex flex-wrap gap-1.5">
                  {lvl.rewards.map((r, j) => (
                    <span key={j} className="text-[9px] px-2 py-1 rounded-full font-medium flex items-center gap-1" style={{ background: isUnlocked ? `${lvl.color}08` : "#F9FAFB", color: isUnlocked ? lvl.color : GRAY }}>
                      {isUnlocked && <Check size={8} />}
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {!isUnlocked && (
                <button onClick={() => onAction(`Work toward ${lvl.name}`)} className="w-full mt-3 py-2 rounded-xl text-[11px] font-bold active:scale-95 transition flex items-center justify-center gap-1" style={{ background: "#F9FAFB", color: DARK }}>
                  View Requirements <ChevronRight size={12} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}