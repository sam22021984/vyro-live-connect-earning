import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

function getLast7DaysLabels() {
  const days = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toLocaleDateString("en", { weekday: "short" }));
  }
  return days;
}

function groupByDay(records, dateField = "created_date") {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 6);
  weekAgo.setHours(0, 0, 0, 0);

  const buckets = [0, 0, 0, 0, 0, 0, 0];
  for (const r of records || []) {
    const d = new Date(r[dateField] || r.created_date);
    if (d >= weekAgo && d <= today) {
      const dayDiff = Math.floor((d - weekAgo) / (1000 * 60 * 60 * 24));
      if (dayDiff >= 0 && dayDiff < 7) buckets[dayDiff]++;
    }
  }
  return buckets;
}

export function useCommunityAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    try {
      const [posts, profiles, transactions, rooms, groups] = await Promise.all([
        base44.entities.CommunityPost.list("-created_date", 500).catch(() => []),
        base44.entities.UserProfile.list("-created_date", 500).catch(() => []),
        base44.entities.Transaction.list("-created_date", 500).catch(() => []),
        base44.entities.RoomSession.list("-created_date", 500).catch(() => []),
        base44.entities.CommunityGroup.list("-members", 500).catch(() => []),
      ]);

      const postActivity = groupByDay(posts);
      const newMembers = groupByDay(profiles);
      const coinTx = groupByDay(transactions);

      // Daily active = unique host_ids per day from room sessions
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 6);
      weekAgo.setHours(0, 0, 0, 0);

      const dailyActive = [0, 0, 0, 0, 0, 0, 0];
      const seenByDay = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()];
      for (const r of rooms || []) {
        const d = new Date(r.created_date);
        if (d >= weekAgo && d <= today && r.host_id) {
          const dayDiff = Math.floor((d - weekAgo) / (1000 * 60 * 60 * 24));
          if (dayDiff >= 0 && dayDiff < 7) {
            seenByDay[dayDiff].add(r.host_id);
            dailyActive[dayDiff] = seenByDay[dayDiff].size;
          }
        }
      }

      // Engagement rate per day
      const engagement = [0, 0, 0, 0, 0, 0, 0];
      const postsByDay = [[], [], [], [], [], [], []];
      for (const p of posts || []) {
        const d = new Date(p.created_date);
        if (d >= weekAgo && d <= today) {
          const dayDiff = Math.floor((d - weekAgo) / (1000 * 60 * 60 * 24));
          if (dayDiff >= 0 && dayDiff < 7) postsByDay[dayDiff].push(p);
        }
      }
      postsByDay.forEach((dayPosts, i) => {
        if (dayPosts.length === 0) return;
        const interactions = dayPosts.reduce((s, p) => s + (p.likes || 0) + (p.comments || 0) + (p.shares || 0) + (p.gifts || 0), 0);
        engagement[i] = Math.min(100, Math.round((interactions / dayPosts.length) * 10) / 10);
      });

      const totalGifts = (transactions || []).filter((t) => t.type === "gift").length;
      const totalCommunities = (groups || []).length;

      // Retention = returning users / total (approx: users with >1 session)
      const hostSessionCounts = {};
      for (const r of rooms || []) {
        if (r.host_id) hostSessionCounts[r.host_id] = (hostSessionCounts[r.host_id] || 0) + 1;
      }
      const returning = Object.values(hostSessionCounts).filter((c) => c > 1).length;
      const totalHosts = Object.keys(hostSessionCounts).length;
      const retention = totalHosts > 0 ? Math.round((returning / totalHosts) * 1000) / 10 : 0;

      // Group performance = avg members across groups
      const groupPerf = totalCommunities > 0
        ? Math.min(100, Math.round((groups.reduce((s, g) => s + (g.members || 0), 0) / totalCommunities) * 10) / 10)
        : 0;

      setData({
        dailyActive,
        newMembers,
        postActivity,
        engagement,
        coinTransactions: coinTx,
        weeklyLabels: getLast7DaysLabels(),
        totalCommunities,
        totalGifts,
        userRetention: retention,
        groupPerformance: groupPerf,
        giftStatistics: totalGifts,
      });
    } catch (err) {
      console.error("Failed to fetch community analytics:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
    const unsubs = [
      base44.entities.CommunityPost?.subscribe?.(fetch),
      base44.entities.UserProfile?.subscribe?.(fetch),
      base44.entities.Transaction?.subscribe?.(fetch),
      base44.entities.RoomSession?.subscribe?.(fetch),
      base44.entities.CommunityGroup?.subscribe?.(fetch),
    ];
    return () => unsubs.forEach((u) => u && u());
  }, [fetch]);

  return { data, loading, refetch: fetch };
}