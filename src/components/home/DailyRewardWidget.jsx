import React, { useState, useEffect } from "react";
import { Gift, Flame, Coins, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";

const DAILY_REWARDS = [50, 100, 150, 200, 300, 500, 1000];

export default function DailyRewardWidget() {
  const [streak, setStreak] = useState(0);
  const [claimedToday, setClaimedToday] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("vyro_daily_reward") || "{}");
    const today = new Date().toDateString();
    if (data.lastClaimDate === today) {
      setClaimedToday(true);
      setStreak(data.streak || 0);
    } else {
      setStreak(data.streak || 0);
    }
  }, []);

  const handleClaim = async () => {
    if (claimedToday || claiming) return;
    setClaiming(true);
    try {
      const newStreak = streak >= 7 ? 1 : streak + 1;
      const reward = DAILY_REWARDS[newStreak - 1] || 50;

      // Credit coins
      try {
        const me = await base44.auth.me();
        let profiles = await base44.entities.UserProfile.filter({ user_id: me.id });
        if (profiles.length > 0) {
          await base44.entities.UserProfile.update(profiles[0].id, {
            coins: (profiles[0].coins || 0) + reward,
          });
        }
      } catch {}

      localStorage.setItem("vyro_daily_reward", JSON.stringify({
        streak: newStreak,
        lastClaimDate: new Date().toDateString(),
      }));
      setStreak(newStreak);
      setClaimedToday(true);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (e) {
      // Still mark as claimed locally
      localStorage.setItem("vyro_daily_reward", JSON.stringify({
        streak: 1,
        lastClaimDate: new Date().toDateString(),
      }));
      setClaimedToday(true);
    } finally {
      setClaiming(false);
    }
  };

  const todayReward = DAILY_REWARDS[claimedToday ? streak - 1 : streak] || DAILY_REWARDS[0];

  return (
    <div className="px-3 pt-3">
      <div className="rounded-2xl p-4 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 text-6xl opacity-15 -mr-2 -mt-2">🎁</div>
        <div className="relative flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
            <Gift size={22} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold">Daily Reward</h3>
            <p className="text-[10px] text-white/80">
              {claimedToday ? "Come back tomorrow!" : `Claim ${todayReward} coins now!`}
            </p>
          </div>
          <button
            onClick={handleClaim}
            disabled={claimedToday || claiming}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition active:scale-95 ${
              claimedToday ? "bg-white/20 text-white/60" : "bg-white text-orange-500"
            }`}
          >
            {claiming ? "..." : claimedToday ? <span className="flex items-center gap-0.5"><Check size={12} /> Claimed</span> : "Claim"}
          </button>
        </div>

        {/* Streak progress */}
        <div className="relative flex items-center gap-1.5 mt-3">
          {DAILY_REWARDS.map((reward, i) => (
            <div key={i} className={`flex-1 flex flex-col items-center gap-0.5`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold transition ${
                i < streak ? "bg-white text-orange-500" : i === streak && !claimedToday ? "bg-white/30 text-white ring-2 ring-white" : "bg-white/10 text-white/40"
              }`}>
                {i < streak ? <Check size={10} /> : i + 1}
              </div>
              <span className="text-[7px] font-bold flex items-center gap-0.5"><Coins size={6} />{reward}</span>
            </div>
          ))}
        </div>

        <div className="relative flex items-center gap-1 mt-2">
          <Flame size={12} className="text-white" />
          <span className="text-[10px] font-semibold">{streak} day streak</span>
        </div>
      </div>

      {/* Success animation */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-3xl p-6 text-center animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-3">
              <Coins size={32} className="text-white" />
            </div>
            <h3 className="text-base font-bold text-gray-800">Reward Claimed!</h3>
            <p className="text-sm text-gray-400">+{todayReward} coins added to your wallet</p>
          </div>
        </div>
      )}
    </div>
  );
}