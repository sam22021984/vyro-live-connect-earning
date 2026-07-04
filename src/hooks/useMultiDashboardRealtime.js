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

        // Initial fetch for all tables
        const initialData = {};
        await Promise.all(
          tableNames.map(async (table) => {
            const { data: rows } = await supabase.from(table).select("*");
            initialData[table] = rows || [];
          })
        );
        if (active) setData(initialData);

        tableNames.forEach((table) => {
          const channel = supabase
            .channel(`live-dashboard-${table}`)
            .on(
              "postgres_changes",
              { event: "*", schema: "public", table },
              (payload) => {
                if (!active) return;
                const { eventType, new: newRow, old: oldRow } = payload;
                setData((prev) => {
                  const arr = prev[table] || [];
                  let next = arr;
                  if (eventType === "INSERT") next = [...arr, newRow];
                  else if (eventType === "UPDATE")
                    next = arr.map((r) => (r.id === newRow.id ? newRow : r));
                  else if (eventType === "DELETE")
                    next = arr.filter((r) => r.id !== oldRow.id);
                  return { ...prev, [table]: next };
                });
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