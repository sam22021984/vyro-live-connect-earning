import { useEffect, useState, useRef } from "react";
import { getSupabase } from "@/lib/supabaseClient";

export function useMultiDashboardRealtime(tableNames = []) {
  const [data, setData] = useState({});
  const [status, setStatus] = useState("idle");
  const channelsRef = useRef([]);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        setStatus("connecting");
        const supabase = await getSupabase();
        const channels = [];

        tableNames.forEach((table) => {
          const channel = supabase
            .channel(`live-dashboard-${table}`)
            .on(
              "postgres_changes",
              { event: "*", schema: "public", table },
              (payload) => {
                if (!active) return;
                setData((prev) => ({ ...prev, [table]: payload.new }));
              }
            )
            .subscribe((subStatus) => {
              if (active) setStatus(subStatus);
            });

          channels.push(channel);
        });

        channelsRef.current = channels;
      } catch {
        if (active) setStatus("error");
      }
    })();

    return () => {
      active = false;
      channelsRef.current.forEach((ch) => ch.unsubscribe());
      channelsRef.current = [];
    };
  }, [tableNames.join(",")]);

  return { data, status };
}