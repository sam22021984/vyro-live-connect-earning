import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

/**
 * Fetches real-time stats from the Supabase backend for a given dashboard type.
 * Auto-refreshes every 30 seconds and subscribes to entity changes.
 *
 * @param {string} dashboardType - "agency" | "agent" | "host" | "user"
 * @param {boolean} enabled - whether to fetch (use false to skip, e.g. when access is denied)
 */
export function useRealtimeStats(dashboardType, enabled = true) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    if (!enabled) return;
    try {
      const res = await base44.functions.invoke("dashboardData", {
        action: "getRealtimeStats",
        dashboard_type: dashboardType,
      });
      setStats(res.data?.stats || null);
      setError(null);
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  }, [dashboardType, enabled]);

  useEffect(() => {
    if (!enabled) { setLoading(false); return; }
    fetchStats();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);

    // Subscribe to real-time entity updates
    let unsubRoomSession, unsubUserProfile, unsubTransaction;
    try {
      unsubRoomSession = base44.entities.RoomSession?.subscribe?.(() => fetchStats());
      unsubUserProfile = base44.entities.UserProfile?.subscribe?.(() => fetchStats());
      unsubTransaction = base44.entities.Transaction?.subscribe?.(() => fetchStats());
    } catch {}

    return () => {
      clearInterval(interval);
      if (unsubRoomSession) unsubRoomSession();
      if (unsubUserProfile) unsubUserProfile();
      if (unsubTransaction) unsubTransaction();
    };
  }, [fetchStats, enabled]);

  return { stats, loading, error, refresh: fetchStats };
}