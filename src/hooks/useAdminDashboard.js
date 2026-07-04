import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

/**
 * Unified hook for all Creator Center / admin dashboards.
 * Fetches comprehensive live platform stats from the getPlatformStats
 * backend function, which aggregates real data from all Supabase entities.
 *
 * Also subscribes to real-time updates on key entities so dashboards
 * refresh automatically when data changes.
 */
export function useAdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await base44.functions.invoke("getPlatformStats", {});
      if (res.data?.stats) {
        setStats(res.data.stats);
      }
    } catch (e) {
      console.error("Failed to load admin dashboard stats:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();

    // Real-time: re-fetch when any key entity changes
    const subs = [
      base44.entities.UserProfile.subscribe(() => load()),
      base44.entities.Transaction.subscribe(() => load()),
      base44.entities.RoomSession.subscribe(() => load()),
      base44.entities.RoleApplication.subscribe(() => load()),
      base44.entities.SupportTicket.subscribe(() => load()),
      base44.entities.SecurityEvent.subscribe(() => load()),
      base44.entities.SecurityAlert.subscribe(() => load()),
    ];

    return () => subs.forEach((unsub) => unsub && unsub());
  }, [load]);

  return { stats, loading, refresh: load };
}