import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

export const DASHBOARD_REGISTRY_KEY = ["dashboard-registry"];

/**
 * Loads the live dashboard registry from Supabase control tables
 * (user_roles, creator_center_dashboards, dashboard_registry,
 * dashboard_access_matrix, role_module_access, dashboard_action_registry,
 * and all *_dashboard_modules tables — normalized into a canonical format)
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

/**
 * Returns the normalized live modules for a specific dashboard_code.
 * Each module is in canonical format:
 *   { dashboard_code, module_code, module_name, description, route,
 *     realtime_sources: string[], actions: string[], is_active, sort_order }
 *
 * Only active modules are returned, sorted by sort_order.
 */
export function selectNormalizedModules(data, dashboardCode) {
  if (!data?.normalized_modules || !data.normalized_modules[dashboardCode]) return [];
  return data.normalized_modules[dashboardCode]
    .filter((m) => m.is_active)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}

/**
 * Returns ALL realtime source tables for a dashboard_code (from both
 * the normalized module tables and the action_registry).
 */
export function selectRealtimeSources(data, dashboardCode) {
  const set = new Set();
  // From normalized modules
  const mods = data?.normalized_modules?.[dashboardCode] || [];
  for (const m of mods) {
    if (Array.isArray(m.realtime_sources)) {
      m.realtime_sources.forEach((s) => s && set.add(s));
    }
  }
  // From action_registry (legacy/finance)
  if (Array.isArray(data?.action_registry)) {
    for (const a of data.action_registry) {
      if (a.dashboard_code !== dashboardCode) continue;
      if (Array.isArray(a.realtime_sources)) {
        a.realtime_sources.forEach((s) => s && set.add(s));
      }
    }
  }
  return [...set];
}

/**
 * Convenience hook: returns live modules + realtime sources for a specific
 * dashboard, with loading/error states. Falls back to empty array when
 * no module table exists or the registry hasn't loaded yet.
 */
export function useLiveDashboardModules(dashboardCode) {
  const { data, isLoading, error } = useDashboardRegistry();
  const modules = selectNormalizedModules(data, dashboardCode);
  const realtimeSources = selectRealtimeSources(data, dashboardCode);
  return {
    modules,
    realtimeSources,
    hasLiveModules: modules.length > 0,
    loading: isLoading,
    error: error?.message || null,
  };
}