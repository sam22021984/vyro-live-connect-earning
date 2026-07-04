import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useSecuritySystem } from "./useSecuritySystem";

/**
 * Real-time security monitoring hook.
 * Subscribes to SecurityEvent and SecurityAlert entities for live updates.
 * Used by admin/owner dashboards to receive instant alerts.
 */
export function useSecurityMonitor() {
  const { getSecurityDashboard } = useSecuritySystem();
  const [dashboard, setDashboard] = useState(null);
  const [liveAlerts, setLiveAlerts] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial dashboard data
  const refresh = useCallback(async () => {
    const data = await getSecurityDashboard();
    if (data?.dashboard) {
      setDashboard(data.dashboard);
      setLiveAlerts(data.dashboard.active_alerts_list || []);
      setLiveEvents(data.dashboard.recent_events || []);
    }
    setLoading(false);
  }, [getSecurityDashboard]);

  useEffect(() => {
    refresh();

    // Subscribe to real-time SecurityAlert changes
    const unsubAlerts = base44.entities.SecurityAlert.subscribe((event) => {
      if (event.type === "create") {
        setLiveAlerts((prev) => [event.data, ...prev].slice(0, 50));
      } else if (event.type === "update") {
        setLiveAlerts((prev) =>
          prev.map((a) => (a.id === event.data.id ? event.data : a))
        );
      } else if (event.type === "delete") {
        setLiveAlerts((prev) => prev.filter((a) => a.id !== event.data.id));
      }
    });

    // Subscribe to real-time SecurityEvent changes
    const unsubEvents = base44.entities.SecurityEvent.subscribe((event) => {
      if (event.type === "create") {
        setLiveEvents((prev) => [event.data, ...prev].slice(0, 100));
      }
    });

    // Auto-refresh every 30 seconds
    const interval = setInterval(refresh, 30000);

    return () => {
      unsubAlerts();
      unsubEvents();
      clearInterval(interval);
    };
  }, [refresh]);

  return {
    dashboard,
    liveAlerts,
    liveEvents,
    loading,
    refresh,
    criticalAlerts: liveAlerts.filter((a) => a.severity === "critical"),
    unresolvedAlerts: liveAlerts.filter((a) => a.status === "active"),
  };
}