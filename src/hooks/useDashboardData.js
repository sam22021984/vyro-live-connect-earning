import { useState, useEffect, useCallback } from "react";
import { callDashboardAPI } from "@/lib/dashboardApi";

/**
 * Loads dashboard data (info, stats, modules) for the current user from the
 * Supabase-backed dashboard-api Edge Function (routed via dashboardApi).
 *
 * No mock/hardcoded fallback: when the backend returns an error or empty
 * result, the hook surfaces an error/empty state (hasRealData=false, error set)
 * instead of rendering fake defaults. Call refetch() to retry.
 *
 * @param {string} dashboardType - "agent" | "host" | "agency" | "user"
 */
export function useDashboardData(dashboardType) {
  const [info, setInfo] = useState(null);
  const [stats, setStats] = useState(null);
  const [modules, setModules] = useState(null);
  const [quickActions, setQuickActions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasRealData, setHasRealData] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stored = await callDashboardAPI("dashboard_get", {
        dashboard_type: dashboardType,
      });

      if (stored?.error) {
        // Backend returned an explicit error — surface it, never fake data.
        setInfo(null);
        setStats(null);
        setModules(null);
        setQuickActions(null);
        setHasRealData(false);
        setError(stored.error);
        return;
      }

      if (stored && typeof stored === "object" && Object.keys(stored).length > 0) {
        setInfo(stored.info ?? null);
        setStats(stored.stats ?? null);
        setModules(stored.modules ?? null);
        setQuickActions(stored.quickActions ?? null);
        setHasRealData(true);
      } else {
        // No stored data yet — empty state, not mock data.
        setInfo(null);
        setStats(null);
        setModules(null);
        setQuickActions(null);
        setHasRealData(false);
      }
    } catch (e) {
      setInfo(null);
      setStats(null);
      setModules(null);
      setQuickActions(null);
      setHasRealData(false);
      setError(e?.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, [dashboardType]);

  useEffect(() => {
    load();
  }, [load]);

  const refetch = useCallback(() => { load(); }, [load]);

  return { info, stats, modules, quickActions, hasRealData, loading, error, refetch };
}