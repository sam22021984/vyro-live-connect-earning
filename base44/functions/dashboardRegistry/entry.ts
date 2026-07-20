import { createClientFromRequest } from "npm:@base44/sdk@0.8.31";

/**
 * Live dashboard registry reader — Phase 2.
 *
 * Reads all control tables from Supabase and returns a SINGLE canonical,
 * normalized view of every dashboard's modules, routes, realtime sources,
 * and allowed actions — regardless of the source table's schema variant.
 *
 * Module tables have 8+ different schema variants (different column names
 * for the same concepts). This function normalizes them all into:
 *
 *   { dashboard_code, module_code, module_name, description, route,
 *     realtime_sources: string[], actions: string[], is_active, sort_order }
 *
 * Dashboard codes are normalized to a single canonical value (no aliases):
 *   FINANCE_MANAGER_DASHBOARD → FINANCE_DASHBOARD
 *
 * No mock data, no static fallback. The frontend uses this as the single
 * source of truth for sidebar sections, route connections, and realtime
 * subscriptions across all Creator Center dashboards.
 */

// Canonical dashboard code overrides (remove all alias fallbacks).
const CODE_NORMALIZE = {
  FINANCE_MANAGER_DASHBOARD: "FINANCE_DASHBOARD",
};

// Maps module table name → canonical dashboard_code.
const MODULE_TABLE_TO_CODE = {
  sam_dashboard_modules: "SAM_DASHBOARD",
  admin_dashboard_modules: "ADMIN_DASHBOARD",
  bd_dashboard_modules: "BD_DASHBOARD",
  bm_dashboard_modules: "BM_DASHBOARD",
  vip_manager_dashboard_modules: "VIP_MANAGER_DASHBOARD",
  reward_manager_dashboard_modules: "REWARD_DASHBOARD",
  support_manager_dashboard_modules: "SUPPORT_DASHBOARD",
  marketing_manager_dashboard_modules: "MARKETING_DASHBOARD",
  event_manager_dashboard_modules: "EVENT_DASHBOARD",
  pk_manager_dashboard_modules: "PK_DASHBOARD",
  finance_manager_dashboard_modules: "FINANCE_DASHBOARD",
  ao_dashboard_modules: "AO_DASHBOARD",
  super_admin_dashboard_modules: "SUPER_ADMIN_DASHBOARD",
  cm_dashboard_modules: "CM_DASHBOARD",
};

/**
 * Normalize a single module row from ANY schema variant into the canonical
 * format. Handles all 8+ column naming conventions found across the module
 * tables.
 */
function normalizeModule(row, dashboardCode) {
  const code = dashboardCode in CODE_NORMALIZE ? CODE_NORMALIZE[dashboardCode] : dashboardCode;

  // module_code: from module_code || module_key
  const moduleCode = row.module_code || row.module_key || "";

  // module_name: from module_name || title
  const moduleName = row.module_name || row.title || moduleCode;

  // is_active: from is_active || active
  const isActive = row.is_active === true || row.active === true;

  // sort_order: from sort_order || display_order
  const sortOrder = row.sort_order ?? row.display_order ?? 0;

  // realtime_sources: merge ALL possible source field names, but filter out
  // values that aren't valid table names (route paths, labels, etc.)
  const rt = new Set();
  const isTableName = (s) => typeof s === "string" && /^[a-z_][a-z0-9_]*$/.test(s) && !s.includes(":") && !s.includes("/");
  for (const key of ["realtime_tables", "realtime_sources", "source_tables", "data_sources"]) {
    if (Array.isArray(row[key])) {
      row[key].forEach((s) => { if (isTableName(s)) rt.add(s); });
    }
  }
  // Some tables use realtime_channel (single string)
  if (isTableName(row.realtime_channel)) rt.add(row.realtime_channel);

  // actions: from actions || []
  const actions = Array.isArray(row.actions) ? row.actions : [];

  return {
    dashboard_code: code,
    module_code: moduleCode,
    module_name: moduleName,
    description: row.description || "",
    route: row.route || null,
    realtime_sources: [...rt],
    actions,
    is_active: isActive,
    sort_order: sortOrder,
  };
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const supabaseUrl = Deno.env.get("SUPABASE_URL").replace(/\/$/, "");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const H = { apikey: key, Authorization: `Bearer ${key}`, Accept: "application/json" };

    const get = async (table, qs = "") => {
      const r = await fetch(`${supabaseUrl}/rest/v1/${table}?${qs}`, { headers: H });
      const t = await r.text();
      try { return JSON.parse(t); } catch { return t; }
    };

    // 1. User's role(s)
    const userRoles = await get(
      "user_roles",
      `user_id=eq.${user.id}&select=role_code,role_name,status`
    );
    const roleCodes = Array.isArray(userRoles)
      ? userRoles.map((r) => r.role_code).filter(Boolean)
      : [];

    // 2. Creator Center dashboards (all — including inactive for visibility)
    const creatorCenterDashboards = await get(
      "creator_center_dashboards",
      "select=id,dashboard_name,dashboard_code,route,is_active&order=dashboard_code.asc"
    );

    // 3. Dashboard registry — master module → route + role_access
    const dashboardRegistry = await get(
      "dashboard_registry",
      "select=module_code,module_name,route_path,role_access,is_active&order=module_code.asc"
    );

    // 4. Access matrix for the user's roles (can_view=true)
    const accessMatrix = [];
    for (const rc of roleCodes) {
      const rows = await get(
        "dashboard_access_matrix",
        `role_type=eq.${rc}&can_view=eq.true&select=role_type,module_code,can_view,can_edit,can_delete`
      );
      if (Array.isArray(rows)) accessMatrix.push(...rows);
    }

    // 5. Role → module permissions
    const roleModuleAccess = [];
    for (const rc of roleCodes) {
      const rows = await get(
        "role_module_access",
        `role_code=eq.${rc}&can_view=eq.true&select=role_code,module_code,can_view,can_edit,can_delete`
      );
      if (Array.isArray(rows)) roleModuleAccess.push(...rows);
    }

    // 6. Action registry — normalize dashboard_code (no aliases)
    const rawActionRegistry = await get(
      "dashboard_action_registry",
      "select=dashboard_code,module_code,route,handler_function,allowed_actions,realtime_sources,is_active&order=dashboard_code.asc,module_code.asc"
    );
    const actionRegistry = Array.isArray(rawActionRegistry)
      ? rawActionRegistry.map((r) => ({
          ...r,
          dashboard_code: r.dashboard_code in CODE_NORMALIZE
            ? CODE_NORMALIZE[r.dashboard_code]
            : r.dashboard_code,
        }))
      : [];

    // 7. Per-dashboard module tables → NORMALIZE into canonical format
    const moduleTableNames = Object.keys(MODULE_TABLE_TO_CODE);
    const normalizedModules = {};  // dashboard_code → [canonical module objects]
    const moduleTableErrors = {};

    for (const mt of moduleTableNames) {
      const dCode = MODULE_TABLE_TO_CODE[mt];
      try {
        // Don't order by sort_order — not all tables have that column.
        // Sort client-side after normalization.
        const rows = await get(mt, "select=*&limit=100");
        if (Array.isArray(rows)) {
          const mods = rows.map((r) => normalizeModule(r, dCode));
          mods.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
          normalizedModules[dCode] = mods;
        } else {
          // Table doesn't exist (PGRST205) or other error
          moduleTableErrors[mt] = typeof rows === "object" && rows?.message
            ? rows.message
            : JSON.stringify(rows).slice(0, 200);
        }
      } catch (e) {
        moduleTableErrors[mt] = e.message;
      }
    }

    // 8. Merge action_registry data into normalized modules (enriches modules
    //    that have action_registry entries with handler_function, etc.)
    const moduleIndex = {};  // dashboard_code:module_code → normalized module
    for (const [dCode, mods] of Object.entries(normalizedModules)) {
      for (const m of mods) {
        moduleIndex[`${dCode}:${m.module_code}`] = m;
      }
    }
    // Also index action_registry by module_code for cross-referencing
    const actionByModule = {};
    for (const a of actionRegistry) {
      if (a.module_code) {
        actionByModule[`${a.dashboard_code}:${a.module_code}`] = a;
      }
    }

    // 9. Collect ALL realtime sources across all dashboards (for the realtime table map)
    const allRealtimeSources = new Set();
    for (const mods of Object.values(normalizedModules)) {
      for (const m of mods) {
        m.realtime_sources.forEach((s) => allRealtimeSources.add(s));
      }
    }
    for (const a of actionRegistry) {
      if (Array.isArray(a.realtime_sources)) {
        a.realtime_sources.forEach((s) => allRealtimeSources.add(s));
      }
    }

    return Response.json({
      success: true,
      user_id: user.id,
      role_codes: roleCodes,
      creator_center_dashboards: creatorCenterDashboards,
      dashboard_registry: dashboardRegistry,
      access_matrix: accessMatrix,
      role_module_access: roleModuleAccess,
      action_registry: actionRegistry,
      // The single canonical source: dashboard_code → normalized module list
      normalized_modules: normalizedModules,
      // Tables that don't exist (yet) — dashboards with no module table
      module_table_errors: moduleTableErrors,
      // All realtime source tables discovered (for cache invalidation)
      all_realtime_sources: [...allRealtimeSources],
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});