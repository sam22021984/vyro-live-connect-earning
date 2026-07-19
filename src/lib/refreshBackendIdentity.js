import { base44 } from "@/api/base44Client";
import { queryClientInstance } from "@/lib/query-client";

/**
 * Canonical identity source for the authenticated user.
 *
 * Calls the Supabase RPC `vyro_refresh_my_backend` (via the refreshBackendIdentity
 * backend function) which runs as auth.uid() and returns:
 *   { global_id, profile: { identity: { global_id } } }
 *
 * The frontend never generates IDs and never falls back to the first user row.
 * A short in-memory cache prevents duplicate RPC calls within the same refresh
 * window (e.g. login -> profile query refetch).
 */

let _identityCache = { id: null, ts: 0 };
const FRESH_MS = 5000;

export function getCachedCanonicalId() {
  return _identityCache.id && Date.now() - _identityCache.ts < FRESH_MS
    ? _identityCache.id
    : null;
}

/**
 * Calls the RPC and returns the canonical global_id.
 * Uses the cache when fresh unless `force` is true.
 */
export async function fetchCanonicalIdentity(force = false) {
  if (!force && _identityCache.id && Date.now() - _identityCache.ts < FRESH_MS) {
    return { canonicalId: _identityCache.id, result: null, cached: true };
  }
  const access_token = localStorage.getItem("sb_access_token");
  try {
    const res = await base44.functions.invoke("refreshBackendIdentity", { access_token });
    const data = res.data?.data ?? res.data;
    const canonicalId =
      data?.global_id ||
      data?.result?.global_id ||
      data?.result?.profile?.identity?.global_id ||
      null;
    _identityCache = { id: canonicalId, ts: Date.now() };
    return { canonicalId, result: data?.result ?? data, cached: false };
  } catch {
    return { canonicalId: _identityCache.id, result: null, cached: true };
  }
}

/**
 * Refreshes the canonical backend identity (RPC) and invalidates all profile
 * and dashboard queries so the active screen refetches without a reload.
 * Call on login, app start, profile opening and reconnect.
 */
export async function refreshBackendIdentity() {
  const { canonicalId, result } = await fetchCanonicalIdentity(true);
  queryClientInstance.invalidateQueries({ queryKey: ["profile"] });
  queryClientInstance.invalidateQueries({ queryKey: ["dashboard"] });
  queryClientInstance.invalidateQueries({ queryKey: ["user"] });
  queryClientInstance.invalidateQueries({ queryKey: ["home"] });
  return { canonicalId, result };
}