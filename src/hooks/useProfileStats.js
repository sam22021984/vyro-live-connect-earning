import { useState, useEffect, useCallback } from "react";
import { backendGateway } from "@/lib/backendGateway";
import { useAuth } from "@/lib/AuthContext";

export function useProfileStats() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [badges, setBadges] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const me = authUser;
      if (!me?.id) return;
      setUser(me);

      // Read profile from RLS-protected user_profiles table
      let profiles = await backendGateway.readTable("user_profiles", { filter: { user_id: me.id }, limit: 1 }).catch(() => []);
      if (!profiles || profiles.length === 0) {
        profiles = await backendGateway.readTable("user_profiles", { filter: { created_by: me.id }, limit: 1 }).catch(() => []);
      }
      const currentProfile = profiles?.[0] || null;
      setProfile(currentProfile);

      const [badgeRecords, achRecords, txns, topUsers] = await Promise.all([
        backendGateway.readTable("badges", { limit: 100 }).catch(() => []),
        backendGateway.readTable("achievements", { filter: { created_by: me.id }, limit: 100 }).catch(() => []),
        backendGateway.wallet.getMyTransactions(100).catch(() => []),
        backendGateway.readTable("user_profiles", { limit: 20, order: "total_xp", ascending: false }).catch(() => []),
      ]);
      setBadges(badgeRecords || []);
      setAchievements(achRecords || []);
      setTransactions(Array.isArray(txns) ? txns : (txns?.transactions || []));
      setLeaderboard(topUsers || []);
    } catch (e) {
      console.error("useProfileStats error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authUser?.id) load();
  }, [load, authUser?.id]);

  return { profile, user, badges, achievements, transactions, leaderboard, loading, reload: load };
}