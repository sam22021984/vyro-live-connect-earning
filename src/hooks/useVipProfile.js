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
      if (profiles.length === 0) {
        profiles = await base44.entities.UserProfile.filter({ created_by_id: me.id });
      }
      if (profiles.length > 0) {
        setProfile(profiles[0]);
        return profiles[0];
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

    const months = durationMonths || 1;
    const disc = discount || 0;
    const coinsCost = Math.round(tierCoins * months * (1 - disc / 100));
    const cashCost = Math.round(tierCash * months * (1 - disc / 100) * 100) / 100;

    if (paymentMethod === "coins" && (profile.coins || 0) < coinsCost) {
      throw new Error("Insufficient coins");
    }

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + Math.ceil(months));

    await base44.entities.Transaction.create({
      user_id: me.id,
      type: "recharge",
      amount_usd: paymentMethod === "cash" ? cashCost : 0,
      coins: coinsCost,
      status: paymentMethod === "coins" ? "completed" : "pending",
      tier_label: tierName,
      description: `VIP Purchase: ${tierName} - ${months} months (${paymentMethod})`,
    });

    const updates = {
      is_vip: true,
      vip_tier: tierName,
      vip_expiry: expiryDate.toISOString(),
    };
    if (paymentMethod === "coins") {
      updates.coins = (profile.coins || 0) - coinsCost;
      updates.total_xp = (profile.total_xp || 0) + coinsCost;
    }

    const updated = await base44.entities.UserProfile.update(profile.id, updates);
    setProfile(updated);
    await loadHistory(me.id);
    return { updated, coinsCost, cashCost };
  }, [profile, user, loadHistory]);

  const upgradeVip = useCallback(async (newTierName, coinsCost, cashCost, paymentMethod) => {
    if (!profile) throw new Error("Profile not loaded");
    const me = user || await base44.auth.me();

    if (paymentMethod === "coins" && (profile.coins || 0) < coinsCost) {
      throw new Error("Insufficient coins");
    }

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 12);

    await base44.entities.Transaction.create({
      user_id: me.id,
      type: "recharge",
      amount_usd: paymentMethod === "cash" ? cashCost : 0,
      coins: coinsCost,
      status: paymentMethod === "coins" ? "completed" : "pending",
      tier_label: newTierName,
      description: `VIP Upgrade → ${newTierName} (${paymentMethod})`,
    });

    const updates = {
      is_vip: true,
      vip_tier: newTierName,
      vip_expiry: expiryDate.toISOString(),
    };
    if (paymentMethod === "coins") {
      updates.coins = (profile.coins || 0) - coinsCost;
      updates.total_xp = (profile.total_xp || 0) + coinsCost;
    }

    const updated = await base44.entities.UserProfile.update(profile.id, updates);
    setProfile(updated);
    await loadHistory(me.id);
    return updated;
  }, [profile, user, loadHistory]);

  const claimReward = useCallback(async (rewardName, coins) => {
    if (!profile) throw new Error("Profile not loaded");
    const me = user || await base44.auth.me();

    await base44.entities.Transaction.create({
      user_id: me.id,
      type: "recharge",
      coins: coins,
      status: "completed",
      description: `VIP Reward: ${rewardName}`,
    });

    const updated = await base44.entities.UserProfile.update(profile.id, {
      coins: (profile.coins || 0) + coins,
      gifts_received: (profile.gifts_received || 0) + 1,
    });
    setProfile(updated);
    await loadHistory(me.id);
    return updated;
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