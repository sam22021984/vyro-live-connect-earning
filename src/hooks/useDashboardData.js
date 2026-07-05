import { useState, useEffect } from "react";
import { callDashboardAPI } from "@/lib/dashboardApi";

/**
 * Loads dashboard data (info, stats, modules) for the current user from the
 * Supabase-backed DashboardProfile entity. If no data exists yet, seeds the
 * database with the provided defaults so subsequent loads are persistent.
 *
 * @param {string} dashboardType - "agent" | "host" | "agency" | "user"
 * @param {object} defaults - { info, stats, modules } fallback / seed data
 */
export function useDashboardData(dashboardType, defaults) {
  const [info, setInfo] = useState(null);
  const [stats, setStats] = useState(null);
  const [modules, setModules] = useState(null);
  const [quickActions, setQuickActions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasRealData, setHasRealData] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const stored = await callDashboardAPI("dashboard_get", {
          dashboard_type: dashboardType,
        });
        if (cancelled) return;

        if (stored && typeof stored === "object" && Object.keys(stored).length > 0) {
          setInfo(stored.info ?? null);
          setStats(stored.stats ?? null);
          setModules(stored.modules ?? null);
          setQuickActions(stored.quickActions ?? null);
          setHasRealData(true);
        } else {
          // first access — persist defaults then use the seeded response
          const seeded = await callDashboardAPI("dashboard_event", {
            event: "save",
            dashboard_type: dashboardType,
            data: defaults,
          });
          if (cancelled) return;
          if (seeded && typeof seeded === "object" && Object.keys(seeded).length > 0) {
            setInfo(seeded.info ?? null);
            setStats(seeded.stats ?? null);
            setModules(seeded.modules ?? null);
            setQuickActions(seeded.quickActions ?? null);
            setHasRealData(true);
          } else {
            setHasRealData(false);
          }
        }
      } catch (e) {
        console.error("useDashboardData error:", e);
        if (cancelled) return;
        setHasRealData(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardType]);

  return { info, stats, modules, quickActions, hasRealData, loading };
}