import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { callDashboardAPI } from "@/lib/dashboardApi";
import { useAuth } from "@/lib/AuthContext";

export function useCreatorCenter() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [approvedApplications, setApprovedApplications] = useState([]);

  const loadProfile = useCallback(async () => {
    try {
      const me = authUser;
      if (!me?.id) return null;
      setUser(me);
      // Route through dashboard-api proxy — server injects user context
      const profile = await callDashboardAPI("dashboard_get", { type: "profile" });
      if (profile) {
        setProfile(profile);
        return profile;
      }
      return null;
    } catch (e) {
      console.error("Failed to load profile:", e);
      return null;
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      return await callDashboardAPI("dashboard_get", { type: "platform_stats" });
    } catch (e) {
      console.error("Failed to load stats:", e);
      return null;
    }
  }, []);

  const loadApprovedApplications = useCallback(async (userId) => {
    try {
      const approved = await callDashboardAPI("dashboard_get", {
        type: "approved_applications",
        user_id: userId,
      });
      const list = Array.isArray(approved) ? approved : [];
      setApprovedApplications(list.map((a) => a.application_type));
      return list;
    } catch (e) {
      setApprovedApplications([]);
      return [];
    }
  }, []);

  useEffect(() => {
    if (!authUser?.id) return;
    const init = async () => {
      setLoading(true);
      const p = await loadProfile();
      await loadApprovedApplications(authUser.id);
      const s = await loadStats();
      setStats(s);
      setLoading(false);
    };
    init();
  }, [authUser?.id, loadProfile, loadStats, loadApprovedApplications]);

  const refresh = useCallback(async () => {
    const s = await loadStats();
    setStats(s);
    return s;
  }, [loadStats]);

  const trackDashboardVisit = useCallback((dashboardId, dashboardTitle) => {
    try {
      base44.analytics.track({
        eventName: "creator_dashboard_visit",
        properties: { dashboard_id: dashboardId, dashboard_title: dashboardTitle },
      });
    } catch (e) {
      // analytics is non-critical
    }
  }, []);

  return { profile, user, stats, loading, refresh, trackDashboardVisit, approvedApplications };
}