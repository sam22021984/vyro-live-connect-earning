import React from "react";
import {
  Award, AlertTriangle, Crown, Calendar, ThumbsUp, ThumbsDown, Star,
  BadgeCheck, TrendingUp, ShieldCheck, Sparkles,
} from "lucide-react";
import { TRUST_OVERVIEW } from "./trustData";

const ICONS = {
  Award, AlertTriangle, Crown, Calendar, ThumbsUp, ThumbsDown, Star, BadgeCheck,
  TrendingUp, ShieldCheck, Sparkles,
};

const WHITE = "#FFFFFF";
const DARK = "#1F2937";
const GRAY = "#6B7280";

export default function OverviewTab({ onAction }) {
  const o = TRUST_OVERVIEW;
  const scoreColor = o.trustScore >= 85 ? "#10B981" : o.trustScore >= 60 ? "#F59E0B" : "#EF4444";

  return (
    <div className="space-y-4">
      {/* Trust Score Hero */}
      <div className="rounded-3xl p-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${scoreColor}, ${scoreColor}cc)`, boxShadow: `0 8px 24px ${scoreColor}30` }}>
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FFFFFF, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative flex items-center gap-4">
          {/* Circular Score */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 42 * (o.trustPercentage / 100)} ${2 * Math.PI * 42}`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">{o.trustScore}</span>
              <span className="text-[9px] text-white/80">/ {o.trustScoreMax}</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-white/80 uppercase tracking-wider">Trust Score</p>
            <h3 className="text-lg font-bold text-white">{o.reputationLevel}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(255,255,255,0.2)", color: "#FFF" }}>
                <Crown size={10} /> {o.trustTier}
              </span>
              <span className="text-[10px] text-white/80">Rank {o.reputationRank}</span>
            </div>
            <p className="text-[11px] text-white/90 mt-2">💬 {o.communityStatus}</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div>
        <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>Summary</h3>
        <div className="grid grid-cols-2 gap-2">
          {o.summary.map((s, i) => {
            const Icon = ICONS[s.icon] || Award;
            return (
              <div key={i} className="rounded-2xl p-3 flex items-center gap-2.5" style={{ background: WHITE, border: "1px solid #F0F1F5", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${s.color}12` }}>
                  <Icon size={16} style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: DARK }}>{s.value}</p>
                  <p className="text-[9px]" style={{ color: GRAY }}>{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Score Breakdown */}
      <div>
        <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>Score Breakdown</h3>
        <div className="space-y-2">
          {o.scoreBreakdown.map((b, i) => {
            const pct = (b.score / b.max) * 100;
            const isFull = b.score >= b.max;
            return (
              <div key={i} className="rounded-2xl p-3" style={{ background: WHITE, border: "1px solid #F0F1F5", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold" style={{ color: DARK }}>{b.label}</span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: "#2F80ED10", color: "#2F80ED" }}>{b.weight}%</span>
                  </div>
                  <span className="text-[10px] font-bold" style={{ color: isFull ? "#10B981" : DARK }}>{b.score}/{b.max}</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#F3F4F6" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: isFull ? "#10B981" : pct >= 70 ? "#2F80ED" : "#F59E0B" }} />
                </div>
                {!isFull && <p className="text-[9px] mt-1" style={{ color: GRAY }}>💡 {b.suggestion}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>Improve Your Reputation</h3>
        <div className="flex flex-wrap gap-2">
          {["Complete Verification", "Complete Profile", "Verify Identity", "View Community Feedback", "Read Guidelines", "Appeal Warning", "Download Certificate", "View Leaderboard"].map((a, i) => (
            <button key={i} onClick={() => onAction(a)} className="text-[10px] px-3 py-1.5 rounded-full font-semibold active:scale-95 transition" style={{ background: "#2F80ED10", color: "#2F80ED" }}>{a}</button>
          ))}
        </div>
      </div>
    </div>
  );
}