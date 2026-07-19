import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

export function useVipProfile() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  const loadProfile = useCallback(async () => {
    try {
      const me = authUser;
      if (!me?.id) return null;
      setUser(me);
      let profiles = await base44.entities.UserProfile.filter({ user_id: me.id });
      if (profiles.length === 0 && me.email) {
        profiles = await base44.entities.UserProfile.filter({ user_id: me.email });
      }
      if (profiles.length === 0) {
        profiles = await base44.entities.UserProfile.filter({ created_by_id: me.id });
      }
      if (profiles.length > 0) {
        let p = profiles[0];
        // Use canonical global_id from user_identities (by auth.uid), not the
        // stored profile value, which may be stale.
        try {
          const canon = await base44.functions.invoke("userOnboarding", { action: "getCanonicalId" });
          p = { ...p, global_id: canon.data?.global_id ?? null };
        } catch {}
        setProfile(p);
        return p;
      }
      const newProfile = await base44.entities.UserProfile.create({
        username: me.full_name || me.email?.split("@")[0] || "User",
        user_id: me.id,
        is_vip: false,
        coins: 0,
        role: "user",
      });
      setProfile(newProfile);
      return newProfile;
    } catch (e) {
      console.error("Failed to load VIP profile:", e);
      return null;
    }
  }, []);

  const loadHistory = useCallback(async (userId) => {
    try {
      const txns = await base44.entities.Transaction.filter(
        { user_id: userId, type: "recharge" },
        "-created_date",
        50
      );
      setHistory(txns);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (!authUser?.id) return;
    const init = async () => {
      setLoading(true);
      const p = await loadProfile();
      if (p?.user_id) await loadHistory(p.user_id);
      setLoading(false);
    };
    init();
  }, [authUser?.id]);

  const refresh = useCallback(async () => {
    const p = await loadProfile();
    if (p?.user_id) await loadHistory(p.user_id);
    return p;
  }, [loadProfile, loadHistory]);

  const purchaseVip = useCallback(async (tierName, tierCoins, tierCash, durationMonths, discount, paymentMethod) => {
    const me = user || await base44.auth.me();
    if (!profile) throw new Error("Profile not loaded");

    const res = await base44.functions.invoke("processVipPurchase", {
      action: "purchase",
      tier_name: tierName,
      tier_coins: tierCoins,
      tier_cash: tierCash,
      months: durationMonths,
      discount,
      payment_method: paymentMethod,
    });
    const result = res.data || res;
    if (result.error) throw new Error(result.error);
    if (result.updated) setProfile(result.updated);
    await loadHistory(me.id);
    return { updated: result.updated, coinsCost: result.coinsCost, cashCost: result.cashCost };
  }, [profile, user, loadHistory]);

  const upgradeVip = useCallback(async (newTierName, coinsCost, cashCost, paymentMethod) => {
    if (!profile) throw new Error("Profile not loaded");
    const me = user || await base44.auth.me();

    const res = await base44.functions.invoke("processVipPurchase", {
      action: "upgrade",
      tier_name: newTierName,
      tier_coins: coinsCost,
      tier_cash: cashCost,
      payment_method: paymentMethod,
    });
    const result = res.data || res;
    if (result.error) throw new Error(result.error);
    if (result.updated) setProfile(result.updated);
    await loadHistory(me.id);
    return result.updated;
  }, [profile, user, loadHistory]);

  const claimReward = useCallback(async (rewardName, coins) => {
    if (!profile) throw new Error("Profile not loaded");
    const me = user || await base44.auth.me();

    const res = await base44.functions.invoke("processVipPurchase", {
      action: "claim_reward",
      reward_name: rewardName,
      reward_coins: coins,
    });
    const result = res.data || res;
    if (result.error) throw new Error(result.error);
    if (result.updated) setProfile(result.updated);
    await loadHistory(me.id);
    return result.updated;
  }, [profile, user, loadHistory]);

  const isRewardClaimedToday = useCallback((rewardName) => {
    const today = new Date().toDateString();
    return history.some((h) => {
      const d = new Date(h.created_date).toDateString();
      return d === today && h.description?.includes(rewardName);
    });
  }, [history]);

  return {
    profile,
    user,
    loading,
    history,
    refresh,
    purchaseVip,
    upgradeVip,
    claimReward,
    isRewardClaimedToday,
  };
}