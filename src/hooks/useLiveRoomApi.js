import { useState, useEffect, useRef, useCallback } from "react";
import { base44 } from "@/api/base44Client";

const invoke = (function_name, payload) =>
  base44.functions.invoke("supabaseProxy", { function_name, payload });

/**
 * Wires the Supabase Edge Functions for live room lifecycle:
 * - join-live-room  → called on mount
 * - leave-live-room → called on unmount
 * - live-audio-manager → mute / unmute / speaking / subscribe
 * - live-room-ai-engine → periodic health poll
 */
export function useLiveRoomApi(roomId) {
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState(null);
  const [aiStats, setAiStats] = useState(null);
  const joinedRef = useRef(false);

  // Join on mount, leave on unmount
  useEffect(() => {
    if (!roomId) return;

    let cancelled = false;
    setJoining(true);

    invoke("join-live-room", { room_id: roomId })
      .then((res) => {
        if (cancelled) return;
        if (res?.data?.success !== false) {
          setJoined(true);
          joinedRef.current = true;
        } else {
          setError(res?.data?.error || "Failed to join room");
        }
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setJoining(false));

    return () => {
      cancelled = true;
      if (joinedRef.current) {
        invoke("leave-live-room", { room_id: roomId }).catch(() => {});
        joinedRef.current = false;
      }
    };
  }, [roomId]);

  // AI engine health poll (every 30s while joined)
  useEffect(() => {
    if (!roomId || !joined) return;
    let active = true;

    const poll = () =>
      invoke("live-room-ai-engine", { room_id: roomId })
        .then((res) => active && res?.data?.success && setAiStats(res.data))
        .catch(() => {});

    poll();
    const interval = setInterval(poll, 30000);
    return () => { active = false; clearInterval(interval); };
  }, [roomId, joined]);

  // Audio manager actions
  const audioAction = useCallback(
    (action) => {
      if (!roomId) return Promise.resolve();
      return invoke("live-audio-manager", { room_id: roomId, action })
        .then((res) => res?.data)
        .catch((e) => ({ success: false, error: e.message }));
    },
    [roomId]
  );

  return { joined, joining, error, aiStats, audioAction };
}