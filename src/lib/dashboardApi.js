import { base44 } from "@/api/base44Client";

/**
 * Single entry point for ALL dashboard API calls.
 * Frontend components must NEVER call the Supabase Edge Function directly.
 * This wrapper routes through the Base44 backend function (dashboardApi),
 * which injects the service-role token and user context server-side.
 *
 * @param {string} action - e.g. wallet_get, wallet_update, dashboard_get,
 *                          dashboard_event, social_post, social_feed
 * @param {object} payload - request payload forwarded to the Edge Function
 * @returns {Promise<any>} - the data returned by the Edge Function
 */
export async function callDashboardAPI(action, payload = {}) {
  const res = await base44.functions.invoke("dashboardApi", { action, payload });
  return res.data ?? res;
}