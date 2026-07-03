import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

/**
 * Loads dashboard data (info, stats, modules) for the current user from the
 * Supabase-backed DashboardProfile entity. If no data exists yet, seeds the
 * database with the provided defaults so subsequent loads are persistent.
 *
 * @param {string} dashboardType - "agent" | "host" | "agency" | "user"
 * @param {object} defaults - { info, stats, modules } fallback / seed data
 */
export function useDashboardData(dashboardType, defaults) {
  const [info, setInfo] = useState(defaults.info || {});
  const [stats, setStats] = useState(defaults.stats || []);
  const [modules, setModules] = useState(defaults.modules || []);
  const [quickActions, setQuickActions] = useState(defaults.quickActions || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await base44.functions.invoke("dashboardData", {
          action: "load",
          dashboard_type: dashboardType,
        });
        const stored = res.data?.data;
        if (cancelled) return;
        if (res.data?.exists && stored) {
          setInfo(stored.info || defaults.info || {});
          setStats(stored.stats || defaults.stats || []);
          setModules(stored.modules || defaults.modules || []);
          setQuickActions(stored.quickActions || defaults.quickActions || []);
        } else {
          // first access — persist the defaults to the database
          const saveRes = await base44.functions.invoke("dashboardData", {
            action: "save",
            dashboard_type: dashboardType,
            data: defaults,
          });
          if (cancelled) return;
          const seeded = saveRes.data?.data;
          setInfo(seeded?.info || defaults.info || {});
          setStats(seeded?.stats || defaults.stats || []);
          setModules(seeded?.modules || defaults.modules || []);
          setQuickActions(seeded?.quickActions || defaults.quickActions || []);
        }
      } catch (e) {
        console.error("useDashboardData error:", e);
        if (cancelled) return;
        setInfo(defaults.info || {});
        setStats(defaults.stats || []);
        setModules(defaults.modules || []);
        setQuickActions(defaults.quickActions || []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardType]);

  return { info, stats, modules, quickActions, loading };
}