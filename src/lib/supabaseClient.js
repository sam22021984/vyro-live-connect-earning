import { createClient } from "@supabase/supabase-js";
import { base44 } from "@/api/base44Client";

let supabaseInstance = null;

/**
 * Returns the single Supabase client instance.
 * The client is created once with the project URL and anon key.
 * Auth session is synced separately via syncSession().
 */
export async function getSupabase() {
  if (supabaseInstance) return supabaseInstance;

  const res = await base44.functions.invoke("supabaseConfig", {});
  const { supabase_url, supabase_anon_key } = res.data?.data || res.data || {};

  if (!supabase_url || !supabase_anon_key) {
    throw new Error("Failed to load Supabase config");
  }

  supabaseInstance = createClient(supabase_url, supabase_anon_key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    realtime: {
      params: { eventsPerSecond: 10 },
    },
  });
  return supabaseInstance;
}

/**
 * Syncs the Supabase client auth session with the Base44 access token.
 * Called after login/OTP verification to ensure the Supabase client has
 * the user's JWT for RLS-protected reads and RPC calls.
 *
 * @param {string} accessToken - Supabase JWT access token
 * @param {string} refreshToken - Supabase JWT refresh token
 */
export async function syncSession(accessToken, refreshToken) {
  const supabase = await getSupabase();
  if (accessToken && refreshToken) {
    const { error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    if (error) {
      console.warn("[supabaseClient] Session sync failed:", error.message);
    }
  }
}

/**
 * Clears the Supabase client auth session.
 * Called on logout to ensure no stale JWT remains.
 */
export async function clearSession() {
  const supabase = await getSupabase();
  await supabase.auth.signOut();
}

/**
 * Returns the current Supabase auth session token (if any).
 * Used by backendGateway RPC calls that need the JWT.
 */
export async function getAuthToken() {
  const supabase = await getSupabase();
  const { data } = await supabase.auth.getSession();
  return data?.session?.access_token || null;
}