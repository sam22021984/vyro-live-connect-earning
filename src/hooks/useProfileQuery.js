import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

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
    // fall through to direct query fallback
  }
  if (!profile) {
    const profiles = await base44.entities.UserProfile.filter({ user_id: me.id });
    profile = profiles[0] || null;
  }
  if (!profile) return null;
  // Override with the canonical global_id from user_identities (by auth.uid).
  try {
    const canon = await base44.functions.invoke("userOnboarding", { action: "getCanonicalId" });
    profile = { ...profile, global_id: canon.data?.global_id ?? null };
  } catch {
    // keep loaded profile on transient error
  }
  return profile;
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