import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSupabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { TABLE_QUERY_MAP } from "@/lib/realtimeTableMap";

const RealtimeContext = createContext({ status: "DISCONNECTED" });
export const useRealtimeStatus = () => useContext(RealtimeContext);

const CHANNEL_NAME = "vyro-global-realtime";
const FLUSH_MS = 300; // batch invalidations within this window
const DEDUP_TTL_MS = 2000; // ignore repeated identical events

/**
 * One global Supabase realtime channel at the app root.
 * Subscribes to INSERT/UPDATE/DELETE on the public schema, maps each table
 * to the React Query cache keys that depend on it, and invalidates them in
 * batches (debounced). Authenticated lifecycle: connects on login,
 * disconnects on logout, resyncs when the tab becomes visible / network
 * returns. Never creates per-page channels.
 */
export default function GlobalRealtimeProvider({ children }) {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const [status, setStatus] = useState("DISCONNECTED");

  const channelRef = useRef(null);
  const supabaseRef = useRef(null);
  const pendingTables = useRef(new Set());
  const flushTimer = useRef(null);
  const dedupRef = useRef(new Map());

  // Batch: collect affected tables, flush invalidations every FLUSH_MS.
  const flush = useCallback(() => {
    flushTimer.current = null;
    const keys = new Set();
    pendingTables.current.forEach((table) => {
      (TABLE_QUERY_MAP[table] || []).forEach((p) => keys.add(JSON.stringify(p)));
    });
    pendingTables.current.clear();
    keys.forEach((k) => {
      try {
        queryClient.invalidateQueries({ queryKey: JSON.parse(k) });
      } catch {
        /* ignore malformed keys */
      }
    });
  }, [queryClient]);

  const scheduleInvalidate = useCallback(
    (table) => {
      pendingTables.current.add(table);
      if (!flushTimer.current) {
        flushTimer.current = setTimeout(flush, FLUSH_MS);
      }
    },
    [flush]
  );

  // Single global event handler for every postgres_changes event.
  const handleDbChange = useCallback(
    (payload) => {
      const { table, eventType, new: newRec, old: oldRec } = payload || {};
      if (!table) return;
      const record = newRec || oldRec || {};
      const ts = record.updated_at || record.created_at || `${Date.now()}`;
      const eventKey = `${table}:${eventType}:${record.id ?? ""}:${ts}`;

      const now = Date.now();
      // Dedup identical events within the TTL window.
      if (dedupRef.current.has(eventKey)) return;
      dedupRef.current.set(eventKey, now);
      if (dedupRef.current.size > 500) {
        dedupRef.current.forEach((t, k) => {
          if (now - t > DEDUP_TTL_MS) dedupRef.current.delete(k);
        });
      }
      scheduleInvalidate(table);
    },
    [scheduleInvalidate]
  );

  const disconnect = useCallback(() => {
    const supabase = supabaseRef.current;
    const channel = channelRef.current;
    if (supabase && channel) {
      try {
        supabase.removeChannel(channel);
      } catch {
        /* ignore */
      }
    }
    channelRef.current = null;
    if (flushTimer.current) {
      clearTimeout(flushTimer.current);
      flushTimer.current = null;
    }
    pendingTables.current.clear();
    dedupRef.current.clear();
  }, []);

  const connect = useCallback(async () => {
    if (channelRef.current) return; // already subscribed — no duplicates
    setStatus("CONNECTING");
    try {
      const supabase = await getSupabase();
      supabaseRef.current = supabase;
      const channel = supabase
        .channel(CHANNEL_NAME)
        .on(
          "postgres_changes",
          { event: "*", schema: "public" },
          handleDbChange
        )
        .subscribe((state) => {
          if (state === "SUBSCRIBED") setStatus("CONNECTED");
          else if (state === "CHANNEL_ERROR" || state === "TIMED_OUT")
            setStatus("ERROR");
          else if (state === "CLOSED") setStatus("DISCONNECTED");
        });
      channelRef.current = channel;
    } catch {
      setStatus("ERROR");
    }
  }, [handleDbChange]);

  // Auth-driven lifecycle: one channel while authenticated, none otherwise.
  useEffect(() => {
    if (isAuthenticated) {
      connect();
    } else {
      disconnect();
      setStatus("DISCONNECTED");
    }
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Resync when the tab returns to foreground / network reconnects.
  // The database is the source of truth — refetch active queries.
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;
      if (isAuthenticated) {
        queryClient.invalidateQueries();
        if (!channelRef.current) connect();
      }
    };
    const onOnline = () => {
      if (!isAuthenticated) return;
      setStatus("RECONNECTING");
      if (!channelRef.current) connect();
    };
    const onOffline = () => setStatus("DISCONNECTED");

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, [isAuthenticated, connect, queryClient]);

  return (
    <RealtimeContext.Provider value={{ status }}>
      {children}
    </RealtimeContext.Provider>
  );
}