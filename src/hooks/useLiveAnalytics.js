import { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * Polls the getSystemDashboard backend function (which calls live-analytics)
 * at a regular interval to reflect real-time data from the database.
 *
 * Data flow: event-tracker → Supabase tables → live-analytics → this hook → UI
 *
 * @param {number} intervalMs - Polling interval in milliseconds (default 15000)
 */
export function useLiveAnalytics(intervalMs = 15000) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await base44.functions.invoke('getSystemDashboard', {});
      const data = res.data?.data || res.data;
      if (data?.success) {
        setAnalytics(data);
        setError(null);
      } else {
        setError(data?.error || 'Failed to fetch analytics');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, intervalMs);
    return () => clearInterval(interval);
  }, [fetchAnalytics, intervalMs]);

  return { analytics, loading, error, refresh: fetchAnalytics };
}