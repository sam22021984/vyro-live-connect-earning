import { useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";

export function useDashboardApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const call = useCallback(async (action, dashboardType, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await base44.functions.invoke("dashboardApi", {
        action,
        dashboard_type: dashboardType,
        params,
      });
      const result = res.data || res;
      if (result?.data?.error) throw new Error(result.data.error);
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { call, loading, error };
}