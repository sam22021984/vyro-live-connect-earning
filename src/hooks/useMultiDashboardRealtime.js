import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabaseClient";

/**
 * Fetches initial data from RLS-protected Supabase tables.
 *
 * Realtime invalidation is handled globally by GlobalRealtimeProvider
 * (single authenticated channel at the app root). This hook no longer
 * creates per-page channels — it only does the initial fetch.
 */
export function useMultiDashboardRealtime(tableNames = []) {
  const [data, setData] = useState({});
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        setStatus("connecting");
        const supabase = await getSupabase();

        // Initial fetch for all tables
        const initialData = {};
        await Promise.all(
          tableNames.map(async (table) => {
            const { data: rows } = await supabase.from(table).select("*");
            initialData[table] = rows || [];
          })
        );
        if (active) {
          setData(initialData);
          setStatus("connected");
        }
      } catch {
        if (active) setStatus("error");
      }
    })();

    return () => {
      active = false;
    };
    // No per-page channel subscriptions — GlobalRealtimeProvider handles invalidation.
  }, [tableNames.join(",")]);

  return { data, status };
}