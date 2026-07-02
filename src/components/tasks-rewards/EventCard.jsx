import React from "react";
import { Users, Clock, Trophy, BookOpen } from "lucide-react";
import { COLORS } from "./tasksData";

export default function EventCard({ event, status, onJoin, onViewRules, onViewRanking, onClaim }) {
  return (
    <div className="rounded-2xl overflow-hidden mb-3" style={{ background: COLORS.white, border: "1px solid #EEF0F4", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      {/* Banner */}
      <div className="h-24 flex items-center justify-center text-4xl relative" style={{ background: `linear-gradient(135deg, ${event.color}, ${event.color}cc)` }}>
        <span style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>{event.banner}</span>
        <span className="absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "rgba(0,0,0,0.3)" }}>{event.type}</span>
      </div>

      <div className="p-3.5">
        <h4 className="text-sm font-bold mb-2" style={{ color: COLORS.navy }}>{event.title}</h4>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Clock size={12} style={{ color: COLORS.muted }} />
            <span className="text-[10px] font-medium" style={{ color: COLORS.muted }}>{event.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={12} style={{ color: COLORS.muted }} />
            <span className="text-[10px] font-medium" style={{ color: COLORS.muted }}>{event.participants.toLocaleString()} joined</span>
          </div>
        </div>

        <div className="rounded-xl p-2.5 mb-3" style={{ background: COLORS.cardBg }}>
          <div className="flex items-center gap-1.5 mb-1">
            <Trophy size={12} style={{ color: COLORS.gold }} />
            <span className="text-[10px] font-bold" style={{ color: COLORS.gold }}>Rewards</span>
          </div>
          <p className="text-[11px]" style={{ color: COLORS.navy }}>{event.rewards}</p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => onViewRules(event)} className="flex items-center gap-1 py-2 px-3 rounded-xl text-[10px] font-bold active:scale-95 transition" style={{ background: COLORS.white, color: COLORS.navy, border: "1px solid #E5E7EB" }}>
            <BookOpen size={11} /> Rules
          </button>
          <button onClick={() => onViewRanking(event)} className="flex items-center gap-1 py-2 px-3 rounded-xl text-[10px] font-bold active:scale-95 transition" style={{ background: COLORS.white, color: COLORS.navy, border: "1px solid #E5E7EB" }}>
            <Trophy size={11} /> Ranking
          </button>
          {status === "active" && (
            <button onClick={() => onJoin(event)} className="flex-1 py-2 rounded-xl text-[10px] font-bold text-white active:scale-95 transition" style={{ background: COLORS.primary }}>
              Join Event
            </button>
          )}
          {status === "upcoming" && (
            <div className="flex-1 py-2 rounded-xl text-[10px] font-bold text-center" style={{ background: COLORS.cardBg, color: COLORS.muted }}>Coming Soon</div>
          )}
          {status === "completed" && (
            <button onClick={() => onClaim(event)} className="flex-1 py-2 rounded-xl text-[10px] font-bold text-white active:scale-95 transition" style={{ background: COLORS.success }}>
              Claim Reward
            </button>
          )}
        </div>
      </div>
    </div>
  );
}