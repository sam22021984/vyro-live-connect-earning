import { useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

/**
 * Centralized reward claiming hook.
 * Every reward flow (tasks, daily bonus, reward center, daily login, recharge, room, family)
 * calls this to ensure:
 *   1. Coins/XP credited to UserProfile
 *   2. Transaction record created (audit trail)
 *   3. Notification sent to user
 *   4. All done atomically on the backend
 */
export function useRewardClaim() {
  const [claiming, setClaiming] = useState(false);
  const { toast } = useToast();

  const claim = useCallback(async (params) => {
    const {
      reward_type = "Coins",
      reward_amount = 0,
      reward_name,
      source,
      task_id,
      source_id,
      icon,
    } = params;

    setClaiming(true);
    try {
      const res = await base44.functions.invoke("claimReward", {
        action: "claim",
        reward_type,
        reward_amount,
        reward_name,
        source,
        task_id,
        source_id,
        icon,
      });

      if (res.data?.success) {
        const credited = res.data.credited || {};
        toast({
          title: "🎉 Reward Claimed!",
          description: `${reward_name || (reward_amount + " " + reward_type)} added to your wallet.`,
        });
        return {
          success: true,
          profile: res.data.profile,
          transaction: res.data.transaction,
          notification: res.data.notification,
          credited,
        };
      }
      throw new Error(res.data?.error || "Failed to claim reward");
    } catch (e) {
      toast({ title: "Failed to claim", description: e.message, variant: "destructive" });
      return { success: false, error: e.message };
    } finally {
      setClaiming(false);
    }
  }, [toast]);

  const claimDaily = useCallback(async (params) => {
    const { day, reward_amount, reward_name, is_mega } = params;
    setClaiming(true);
    try {
      const res = await base44.functions.invoke("claimReward", {
        action: "claimDaily",
        day,
        reward_amount,
        reward_name,
        is_mega,
      });

      if (res.data?.success) {
        toast({
          title: is_mega ? "🎁 Mega Reward Claimed!" : "✅ Daily Bonus Claimed!",
          description: `${reward_name || reward_amount + " coins"} added to your wallet.`,
        });
        return {
          success: true,
          profile: res.data.profile,
          transaction: res.data.transaction,
          notification: res.data.notification,
        };
      }
      if (res.data?.already_claimed) {
        toast({ title: "Already claimed today!", description: "Come back tomorrow." });
        return { success: false, already_claimed: true };
      }
      throw new Error(res.data?.error || "Failed to claim daily bonus");
    } catch (e) {
      toast({ title: "Failed to claim", description: e.message, variant: "destructive" });
      return { success: false, error: e.message };
    } finally {
      setClaiming(false);
    }
  }, [toast]);

  const getDailyStatus = useCallback(async () => {
    try {
      const res = await base44.functions.invoke("claimReward", { action: "getDailyStatus" });
      return res.data || { streak: 0, claimedToday: false };
    } catch {
      return { streak: 0, claimedToday: false };
    }
  }, []);

  return { claim, claimDaily, getDailyStatus, claiming };
}