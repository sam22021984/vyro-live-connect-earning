import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { X, Gift, Loader2 } from "lucide-react";
import { COLORS } from "./tasksData";
import AchievementCard from "./AchievementCard";
import { useTasksRewardsData } from "@/hooks/useTasksRewardsData";
import { useRewardClaim } from "@/hooks/useRewardClaim";

export default function AchievementTab() {
  const [detail, setDetail] = useState(null);
  const { toast } = useToast();
  const { achievements, loading, reload } = useTasksRewardsData();
  const { claim, claiming } = useRewardClaim();

  const unlocked = achievements.filter((a) => a.status === "unlocked");
  const inProgress = achievements.filter((a) => a.status === "in_progress");
  const locked = achievements.filter((a) => a.status === "locked");

  const handleClaim = async (ach) => {
    const result = await claim({
      reward_type: "Achievement",
      reward_amount: 0,
      reward_name: ach.name,
      source: "achievement",
      source_id: ach.id,
      icon: ach.badge,
    });
    if (result.success) reload();
  };

  const handleShare = (ach) => {
    toast({ title: "📢 Shared to Feed!", description: `${ach.name} achievement shared.` });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: COLORS.primary }} />
      </div>
    );
  }

  return (
    <div>
      {/* Stats summary */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        <div className="rounded-2xl p-2.5 text-center" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
          <p className="text-base font-bold" style={{ color: COLORS.navy }}>{achievements.length}</p>
          <p className="text-[8px]" style={{ color: COLORS.muted }}>Total</p>
        </div>
        <div className="rounded-2xl p-2.5 text-center" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
          <p className="text-base font-bold" style={{ color: COLORS.success }}>{unlocked.length}</p>
          <p className="text-[8px]" style={{ color: COLORS.muted }}>Unlocked</p>
        </div>
        <div className="rounded-2xl p-2.5 text-center" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
          <p className="text-base font-bold" style={{ color: COLORS.primary }}>{inProgress.length}</p>
          <p className="text-[8px]" style={{ color: COLORS.muted }}>In Progress</p>
        </div>
        <div className="rounded-2xl p-2.5 text-center" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
          <p className="text-base font-bold" style={{ color: COLORS.muted }}>{locked.length}</p>
          <p className="text-[8px]" style={{ color: COLORS.muted }}>Locked</p>
        </div>
      </div>

      {achievements.length === 0 ? (
        <div className="rounded-2xl p-8 text-center" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
          <span className="text-3xl block mb-2">🏆</span>
          <p className="text-xs font-bold" style={{ color: COLORS.navy }}>No Achievements Yet</p>
          <p className="text-[10px] mt-1" style={{ color: COLORS.muted }}>Complete tasks and activities to earn achievements</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {achievements.map((a) => (
            <AchievementCard key={a.id} achievement={a} onView={setDetail} onClaim={handleClaim} onShare={handleShare} />
          ))}
        </div>
      )}

      {detail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetail(null)} />
          <div className="relative w-full max-w-md bg-white rounded-t-3xl animate-fadeIn">
            <div className="sticky top-0 bg-white pt-3 pb-2 z-10">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
              <div className="flex items-center justify-between px-4">
                <h2 className="text-sm font-bold" style={{ color: COLORS.navy }}>Achievement</h2>
                <button onClick={() => setDetail(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="px-4 pb-6">
              <div className="flex flex-col items-center py-4">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-3"
                  style={{ background: detail.status === "locked" ? "#E5E7EB" : `${COLORS.primary}15`, border: `1px solid ${COLORS.primary}30`, opacity: detail.status === "locked" ? 0.6 : 1 }}>
                  {detail.badge}
                </div>
                <h3 className="text-base font-bold" style={{ color: COLORS.navy }}>{detail.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1.5 capitalize" style={{ background: COLORS.cardBg, color: COLORS.muted }}>{detail.status.replace("_", " ")}</span>
              </div>
              <div className="rounded-2xl p-3 mb-3" style={{ background: COLORS.cardBg }}>
                <p className="text-[11px] font-bold mb-1" style={{ color: COLORS.navy }}>Unlock Condition</p>
                <p className="text-xs" style={{ color: COLORS.muted }}>{detail.condition}</p>
              </div>
              <div className="rounded-2xl p-3" style={{ background: `${COLORS.gold}10`, border: `1px solid ${COLORS.gold}30` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Gift size={13} style={{ color: COLORS.gold }} />
                  <p className="text-[11px] font-bold" style={{ color: COLORS.gold }}>Reward</p>
                </div>
                <p className="text-xs" style={{ color: COLORS.navy }}>{detail.reward}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}