import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { backendGateway } from "@/lib/backendGateway";
import { useAuth } from "@/lib/AuthContext";
import { fetchCanonicalIdentity } from "@/lib/refreshBackendIdentity";

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
      let profiles = await backendGateway.readTable("user_profiles", { filter: { user_id: me.id }, limit: 1 }).catch(() => []);
      if (!profiles || profiles.length === 0) {
        profiles = await backendGateway.readTable("user_profiles", { filter: { created_by: me.id }, limit: 1 }).catch(() => []);
      }
      if (profiles && profiles.length > 0) {
        let p = profiles[0];
        try {
          const { canonicalId } = await fetchCanonicalIdentity();
          p = { ...p, global_id: canonicalId ?? null };
        } catch {}
        setProfile(p);
        return p;
      }
      // No profile found — do not create directly; let backend provisioning handle it
      return null;
    } catch (e) {
      console.error("Failed to load VIP profile:", e);
      return null;
    }
  }, []);

  const loadHistory = useCallback(async (userId) => {
    try {
      const txns = await backendGateway.readTable("wallet_transactions", {
        filter: { user_id: userId, type: "recharge" },
        limit: 50,
        order: "created_at",
        ascending: false,
      }).catch(() => []);
      setHistory(txns || []);
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
      const d = new Date(h.created_date || h.created_at).toDateString();
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