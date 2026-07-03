import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

export function usePlatformStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await base44.functions.invoke("getPlatformStats", {});
      if (res.data?.stats) {
        setStats(res.data.stats);
      }
    } catch (e) {
      console.error("Failed to load platform stats:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { stats, loading, refresh: load };
}