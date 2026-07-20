import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

/**
 * Unified hook for all Creator Center / admin dashboards.
 * Fetches comprehensive live platform stats from the getPlatformStats
 * backend function, which aggregates real data from all Supabase entities.
 *
 * Realtime invalidation is handled globally by GlobalRealtimeProvider
 * (single global channel) — no per-page subscriptions.
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
    // Realtime invalidation handled by GlobalRealtimeProvider.
  }, [load]);

  return { stats, loading, refresh: load };
}