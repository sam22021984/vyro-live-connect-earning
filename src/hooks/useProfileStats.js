import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
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

      let profiles = await base44.entities.UserProfile.filter({ user_id: me.id });
      if (profiles.length === 0) {
        profiles = await base44.entities.UserProfile.filter({ created_by_id: me.id });
      }
      const currentProfile = profiles[0] || null;
      setProfile(currentProfile);

      const [badgeRecords, achRecords, txns, topUsers] = await Promise.all([
        base44.entities.Badge.list().catch(() => []),
        base44.entities.Achievement.filter({ created_by_id: me.id }).catch(() => []),
        base44.entities.Transaction.filter({ user_id: me.id }, "-created_date", 100).catch(() => []),
        base44.entities.UserProfile.list("-total_xp", 20).catch(() => []),
      ]);
      setBadges(badgeRecords);
      setAchievements(achRecords);
      setTransactions(txns);
      setLeaderboard(topUsers);
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