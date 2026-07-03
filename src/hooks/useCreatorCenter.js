import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

export function useCreatorCenter() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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
      console.error("Failed to load profile:", e);
      return null;
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const [
        users,
        partyRooms,
        liveRooms,
        transactions,
        gifts,
        posts,
        groups,
        channels,
      ] = await Promise.all([
        base44.entities.UserProfile.list("-created_date", 500),
        base44.entities.PartyRoom.list("-created_date", 500),
        base44.entities.PartyRoom.filter({ status: "live" }, "-created_date", 200),
        base44.entities.Transaction.filter({ status: "completed" }, "-created_date", 500),
        base44.entities.Gift.list("-created_date", 200),
        base44.entities.CommunityPost.list("-created_date", 200),
        base44.entities.CommunityGroup.list("-created_date", 200),
        base44.entities.CommunityChannel.list("-created_date", 200),
      ]);

      const totalRevenue = transactions.reduce((sum, t) => sum + (t.amount_usd || 0), 0);
      const totalCoins = transactions.reduce((sum, t) => sum + (t.coins || 0), 0);
      const totalViewers = partyRooms.reduce((sum, r) => sum + (r.viewers || 0), 0);
      const totalMembers = partyRooms.reduce((sum, r) => sum + (r.members || 0), 0);
      const vipUsers = users.filter((u) => u.is_vip).length;
      const verifiedUsers = users.filter((u) => u.verification_status === "verified").length;
      const hosts = users.filter((u) => u.is_host).length;

      return {
        totalUsers: users.length,
        totalRooms: partyRooms.length,
        liveRooms: liveRooms.length,
        totalViewers,
        totalMembers,
        totalRevenue,
        totalCoins,
        totalTransactions: transactions.length,
        totalGifts: gifts.length,
        totalPosts: posts.length,
        totalGroups: groups.length,
        totalChannels: channels.length,
        vipUsers,
        verifiedUsers,
        hosts,
      };
    } catch (e) {
      console.error("Failed to load stats:", e);
      return null;
    }
  }, []);

  useEffect(() => {
    if (!authUser?.id) return;
    const init = async () => {
      setLoading(true);
      await loadProfile();
      const s = await loadStats();
      setStats(s);
      setLoading(false);
    };
    init();
  }, [authUser?.id, loadProfile, loadStats]);

  const refresh = useCallback(async () => {
    const s = await loadStats();
    setStats(s);
    return s;
  }, [loadStats]);

  const trackDashboardVisit = useCallback((dashboardId, dashboardTitle) => {
    try {
      base44.analytics.track({
        eventName: "creator_dashboard_visit",
        properties: { dashboard_id: dashboardId, dashboard_title: dashboardTitle },
      });
    } catch (e) {
      // analytics is non-critical
    }
  }, []);

  return { profile, user, stats, loading, refresh, trackDashboardVisit };
}