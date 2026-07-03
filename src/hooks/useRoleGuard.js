import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

/**
 * Fetches the current user's profile + role from the Supabase-backed
 * dashboardData function. Returns { profile, role, loading, hasAccess }.
 *
 * @param {string} requiredRole - minimum role required (e.g. "agency", "agent")
 */
export function useRoleGuard(requiredRole) {
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const res = await base44.functions.invoke("dashboardData", {
          action: "getProfile",
        });
        if (cancelled) return;
        const p = res.data?.profile;
        if (p) {
          setProfile(p);
          setRole(p.role || "user");
        }
      } catch (e) {
        if (cancelled) return;
        setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    check();
    return () => { cancelled = true; };
  }, []);

  // Check access — always compute after role is set
  useEffect(() => {
    if (loading) return;
    const ROLE_LEVELS = { user: 0, host: 1, agent: 2, agency: 3, admin: 4, owner: 5 };
    const userLevel = ROLE_LEVELS[role] ?? 0;
    const requiredLevel = ROLE_LEVELS[requiredRole] ?? 99;
    setHasAccess(userLevel >= requiredLevel);
  }, [role, loading, requiredRole]);

  return { profile, role, loading, hasAccess, error };
}