import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { fetchCanonicalIdentity } from "@/lib/refreshBackendIdentity";

/**
 * Canonical React Query for the current user's profile (incl. global_id).
 * Key ["profile","me"] is invalidated by GlobalRealtimeProvider when the
 * user_profiles / profiles / ApplicationId tables change, so the UI always
 * reflects the latest backend value without a manual refresh.
 */
export const PROFILE_QUERY_KEY = ["profile", "me"];

async function fetchProfile(me) {
  if (!me?.id) return null;
  let profile = null;
  try {
    const res = await base44.functions.invoke("userOnboarding", {
      action: "initProfile",
      role: "user",
      username: me.full_name || me.email?.split("@")[0] || "VYRO User",
    });
    profile = res.data?.profile || res.data;
  } catch {
    // initProfile unavailable — no fallback to the first user row.
  }
  if (!profile) return null;
  // Canonical global_id from the Supabase RPC vyro_refresh_my_backend
  // (runs as auth.uid). Never generated in the frontend.
  const { canonicalId } = await fetchCanonicalIdentity();
  return { ...profile, global_id: canonicalId ?? null };
}

export function useProfileQuery() {
  const { user: me } = useAuth();
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => fetchProfile(me),
    enabled: !!me?.id,
    staleTime: 0, // always refetch on invalidate (realtime) / mount
  });
}