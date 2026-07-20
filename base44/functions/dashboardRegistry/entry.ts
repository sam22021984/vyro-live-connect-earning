import { createClientFromRequest } from "npm:@base44/sdk@0.8.31";

/**
 * Live dashboard registry reader.
 *
 * Returns, for the authenticated user, the full dynamic wiring needed by the
 * Creator Center and per-role dashboards — read directly from Supabase control
 * tables with the service role key (no mock data, no static fallback):
 *
 *   user_roles              → the user's role_code(s)
 *   creator_center_dashboards → the dashboard list (code, name, route)
 *   dashboard_registry      → master module → route_path + role_access
 *   dashboard_access_matrix → role → module_code (can_view/edit/delete)
 *   role_module_access      → role → module_code permissions
 *   dashboard_action_registry → dashboard_code → module_code, route,
 *                               realtime_sources[], allowed_actions[]
 *
 * The frontend joins these to decide which dashboards/modules to render and
 * which Supabase tables to subscribe to for realtime.
 */
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

    // 2. Creator Center dashboards (active)
    const creatorCenterDashboards = await get(
      "creator_center_dashboards",
      "is_active=eq.true&select=id,dashboard_name,dashboard_code,route"
    );

    // 3. Dashboard registry — master module → route + role_access
    const dashboardRegistry = await get(
      "dashboard_registry",
      "is_active=eq.true&select=module_code,module_name,route_path,role_access"
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

    // 6. Action registry — modules, routes, realtime sources, allowed actions
    const actionRegistry = await get(
      "dashboard_action_registry",
      "is_active=eq.true&select=dashboard_code,module_code,route,handler_function,allowed_actions,realtime_sources"
    );

    return Response.json({
      success: true,
      user_id: user.id,
      role_codes: roleCodes,
      creator_center_dashboards: creatorCenterDashboards,
      dashboard_registry: dashboardRegistry,
      access_matrix: accessMatrix,
      role_module_access: roleModuleAccess,
      action_registry: actionRegistry,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});