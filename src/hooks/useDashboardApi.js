import { useState, useCallback } from "react";
import { callDashboardAPI } from "@/lib/dashboardApi";

export function useDashboardApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const call = useCallback(async (action, dashboardType, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      return await callDashboardAPI(action, {
        ...params,
        dashboard_type: dashboardType,
      });
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { call, loading, error };
}