import { useEffect, useState, useRef } from "react";
import { getSupabase } from "@/lib/supabaseClient";

export function useDashboardRealtime() {
  const [dashboardData, setDashboardData] = useState(null);
  const [status, setStatus] = useState("idle");
  const channelRef = useRef(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        setStatus("connecting");
        const supabase = await getSupabase();

        const channel = supabase
          .channel("live-dashboard")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "dashboard_data" },
            (payload) => {
              const newRow = payload.new;
              setDashboardData(newRow);
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
  }, []);

  return { dashboardData, status };
}