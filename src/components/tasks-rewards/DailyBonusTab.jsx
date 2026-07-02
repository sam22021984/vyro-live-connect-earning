import React, { useState } from "react";
import { Flame, Check, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { dailyBonusDays, COLORS } from "./tasksData";

export default function DailyBonusTab() {
  const [currentDay, setCurrentDay] = useState(4);
  const [streak, setStreak] = useState(3);
  const { toast } = useToast();

  const handleCheckIn = () => {
    if (currentDay > 7) return;
    const day = dailyBonusDays[currentDay - 1];
    setCurrentDay((d) => d + 1);
    setStreak((s) => s + 1);
    toast({ title: day.is_mega ? "🎁 Mega Reward Claimed!" : "✅ Daily Bonus Claimed!", description: day.reward });
  };

  return (
    <div>
      {/* Streak banner */}
      <div className="rounded-2xl p-4 mb-4 text-white" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.navy})` }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame size={18} style={{ color: COLORS.gold }} />
              <h3 className="text-sm font-bold">Daily Streak</h3>
            </div>
            <p className="text-xs text-white/70">Check in daily for bigger rewards!</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold" style={{ color: COLORS.gold }}>{streak}</p>
            <p className="text-[10px] text-white/70">Day Streak</p>
          </div>
        </div>
      </div>

      {/* 7-day calendar */}
      <div className="grid grid-cols-4 gap-2.5 mb-4">
        {dailyBonusDays.map((d) => {
          const isClaimed = d.day < currentDay;
          const isToday = d.day === currentDay;
          const isLocked = d.day > currentDay;
          return (
            <div key={d.day} className={`rounded-2xl p-2.5 flex flex-col items-center text-center transition ${d.is_mega ? "col-span-2" : ""}`}
              style={{
                background: isClaimed ? `${COLORS.success}15` : isToday ? `${COLORS.primary}15` : COLORS.cardBg,
                border: isToday ? `2px solid ${COLORS.primary}` : isClaimed ? `1px solid ${COLORS.success}40` : "1px solid #EEF0F4",
              }}>
              <span className="text-[9px] font-bold mb-1" style={{ color: isClaimed ? COLORS.success : isToday ? COLORS.primary : COLORS.muted }}>
                Day {d.day}{d.is_mega ? " 🔥" : ""}
              </span>
              <div className="text-2xl mb-1">{d.is_mega ? "🎁" : d.icon}</div>
              <span className="text-[8px] font-medium leading-tight" style={{ color: COLORS.navy }}>{d.reward}</span>
              {isClaimed && <Check size={14} className="mt-1" style={{ color: COLORS.success }} />}
              {isToday && <span className="text-[8px] font-bold mt-1 px-2 py-0.5 rounded-full text-white" style={{ background: COLORS.primary }}>Today</span>}
              {isLocked && <Lock size={12} className="mt-1" style={{ color: COLORS.muted }} />}
            </div>
          );
        })}
      </div>

      {/* Check in button */}
      <button onClick={handleCheckIn} disabled={currentDay > 7}
        className="w-full py-3.5 rounded-2xl text-sm font-bold text-white active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-50"
        style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.navy})`, boxShadow: `0 4px 12px ${COLORS.primary}40` }}>
        {currentDay > 7 ? "All Rewards Claimed 🎉" : `Check In - Day ${currentDay}`}
      </button>

      <div className="mt-4 rounded-2xl p-3 flex items-center gap-3" style={{ background: `${COLORS.gold}10`, border: `1px solid ${COLORS.gold}30` }}>
        <span className="text-xl">⚡</span>
        <div>
          <p className="text-[11px] font-bold" style={{ color: COLORS.navy }}>Double Reward Event Active!</p>
          <p className="text-[10px]" style={{ color: COLORS.muted }}>All daily bonus rewards are doubled today.</p>
        </div>
      </div>
    </div>
  );
}