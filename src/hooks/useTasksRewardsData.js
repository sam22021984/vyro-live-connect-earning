import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

export function useTasksRewardsData() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [rewardTxns, setRewardTxns] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user?.id) { setLoading(false); return; }
    try {
      const [ach, txns, userTasks] = await Promise.all([
        base44.entities.Achievement.filter({ created_by_id: user.id }).catch(() => []),
        base44.entities.Transaction.filter({ user_id: user.id, type: "reward" }, "-created_date", 50).catch(() => []),
        base44.entities.UserTask.filter({ user_id: user.id, status: "completed" }).catch(() => []),
      ]);
      setAchievements(ach || []);
      setRewardTxns(txns || []);
      setCompletedTasks(userTasks || []);
    } catch (e) {
      console.error("useTasksRewardsData error:", e);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    load();
    let unsubAch, unsubTxn, unsubTask;
    try { unsubAch = base44.entities.Achievement.subscribe(() => load()); } catch (e) {}
    try { unsubTxn = base44.entities.Transaction.subscribe(() => load()); } catch (e) {}
    try { unsubTask = base44.entities.UserTask.subscribe(() => load()); } catch (e) {}
    return () => {
      try { unsubAch?.(); } catch (e) {}
      try { unsubTxn?.(); } catch (e) {}
      try { unsubTask?.(); } catch (e) {}
    };
  }, [load]);

  // Map Achievement records to display format
  const achievementList = achievements.map((a) => ({
    id: a.id,
    name: a.name,
    badge: a.icon || "🏆",
    progress: a.progress || 0,
    status: a.is_unlocked ? "unlocked" : (a.progress > 0 ? "in_progress" : "locked"),
    condition: a.description || "Complete this achievement",
    reward: a.description || "Achievement reward",
    color: a.color || "#FFC83D",
  }));

  // Claimed rewards from Transaction records
  const claimedRewards = rewardTxns.map((t) => ({
    id: t.id,
    name: t.description || `${t.coins || 0} Coins`,
    type: "Reward",
    icon: t.gift_icon || "🎁",
    rarity: "Common",
    color: "#FFC83D",
    description: t.description || `Reward from ${t.type}`,
  }));

  // Available rewards from completed (unclaimed) UserTask records
  const availableRewards = completedTasks.map((t) => ({
    id: t.id,
    name: `${t.reward_amount} ${t.reward_type || "Coins"}`,
    type: t.reward_type || "Currency",
    icon: "🪙",
    rarity: "Common",
    color: "#1F6BFF",
    description: `Claim your ${t.reward_type || "Coins"} reward from ${t.category} task`,
    _task: t,
  }));

  return {
    achievements: achievementList,
    claimedRewards,
    availableRewards,
    loading,
    reload: load,
  };
}