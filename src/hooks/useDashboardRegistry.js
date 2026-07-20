import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

export const DASHBOARD_REGISTRY_KEY = ["dashboard-registry"];

/**
 * Loads the live dashboard registry from Supabase control tables
 * (user_roles, creator_center_dashboards, dashboard_registry,
 * dashboard_access_matrix, role_module_access, dashboard_action_registry)
 * via the authenticated `dashboardRegistry` backend function.
 *
 * No mock fallback: while loading, data is undefined; on error, the query
 * surfaces `error` and the UI shows an empty/error state. Realtime events on
 * any control table invalidate this query (see realtimeTableMap.js).
 */
export function useDashboardRegistry() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: DASHBOARD_REGISTRY_KEY,
    queryFn: async () => {
      const res = await base44.functions.invoke("dashboardRegistry", {});
      return res.data?.data ?? res.data ?? {};
    },
    enabled: !!isAuthenticated,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}

/** Set of module_codes the current user's role(s) can view. */
export function selectAccessibleModuleCodes(data) {
  if (!Array.isArray(data?.access_matrix)) return new Set();
  return new Set(data.access_matrix.map((r) => r.module_code).filter(Boolean));
}

/** Map of dashboard_code → array of action-registry module entries. */
export function selectModulesByDashboard(data) {
  const map = {};
  if (Array.isArray(data?.action_registry)) {
    for (const a of data.action_registry) {
      if (!a?.dashboard_code) continue;
      (map[a.dashboard_code] ||= []).push(a);
    }
  }
  return map;
}

/** Flat realtime source tables for a dashboard_code (for subscriptions). */
export function selectRealtimeSources(data, dashboardCode) {
  if (!Array.isArray(data?.action_registry)) return [];
  const set = new Set();
  for (const a of data.action_registry) {
    if (a.dashboard_code !== dashboardCode) continue;
    if (Array.isArray(a.realtime_sources)) {
      a.realtime_sources.forEach((s) => s && set.add(s));
    }
  }
  return [...set];
}