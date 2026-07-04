import { useEffect, useState, useRef } from "react";
import { getSupabase } from "@/lib/supabaseClient";

export function useDashboardRealtime(tableName = "dashboard_data") {
  const [dashboardData, setDashboardData] = useState([]);
  const [status, setStatus] = useState("idle");
  const channelRef = useRef(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        setStatus("connecting");
        const supabase = await getSupabase();

        // Initial fetch
        const { data: initial } = await supabase.from(tableName).select("*");
        if (active && initial) setDashboardData(initial);

        const channel = supabase
          .channel(`live-dashboard-${tableName}`)
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: tableName },
            (payload) => {
              if (!active) return;
              const { eventType, new: newRow, old: oldRow } = payload;
              setDashboardData((prev) => {
                if (eventType === "INSERT") return [...prev, newRow];
                if (eventType === "UPDATE")
                  return prev.map((r) => (r.id === newRow.id ? newRow : r));
                if (eventType === "DELETE")
                  return prev.filter((r) => r.id !== oldRow.id);
                return prev;
              });
            }
          )
          .subscribe((subStatus) => {
            if (active) setStatus(subStatus);
          });

        channelRef.current = channel;
      } catch {
        if (active) setStatus("error");
      }
    })();

    return () => {
      active = false;
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
    };
  }, [tableName]);

  return { dashboardData, status };
}