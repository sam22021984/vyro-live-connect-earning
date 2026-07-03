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
 * - live-room-ai-recommendation → periodic engagement recommendations
 * - live-room-archive-manager → archive room (exposed as action)
 * - live-room-backup-sync → backup room data (exposed as action)
 * - live-room-cleanup-manager → called on unmount alongside leave
 * - live-room-event-bus → publish events (gifts, emojis, joins, etc.)
 * - live-room-router → routes user on join
 * - live-room-gift-analytics → periodic gift coin total
 * - live-room-ranking-engine → periodic room score
 * - live-room-scheduler → exposed as action
 * - mic-request-manager → request to speak (exposed as action)
 * - live-room-payment-security → verify gift payments (exposed as action)
 *
 * Non-functional (require Supabase DB schema fixes):
 * - live-room-export-report (missing table 'room_reports_archive')
 * - live-room-presence (missing column 'room_participants.is_active')
 * - live-room-final-controller (unknown action values)
 * - live-room-security-gateway (unknown required parameters)
 * - live-room-status (returns array — not coercible to single object)
 */
export function useLiveRoomApi(roomId) {
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState(null);
  const [aiStats, setAiStats] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [giftStats, setGiftStats] = useState(null);
  const [roomScore, setRoomScore] = useState(null);
  const joinedRef = useRef(false);

  // Join on mount, leave + cleanup on unmount
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
          invoke("live-room-event-bus", { room_id: roomId, event: "user_joined" }).catch(() => {});
          invoke("live-room-router", { room_id: roomId, action: "route" }).catch(() => {});
        } else {
          setError(res?.data?.error || "Failed to join room");
        }
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setJoining(false));

    return () => {
      cancelled = true;
      if (joinedRef.current) {
        invoke("live-room-event-bus", { room_id: roomId, event: "user_left" }).catch(() => {});
        invoke("leave-live-room", { room_id: roomId }).catch(() => {});
        invoke("live-room-cleanup-manager", { room_id: roomId }).catch(() => {});
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

  // AI recommendation poll (every 60s while joined)
  useEffect(() => {
    if (!roomId || !joined) return;
    let active = true;

    const poll = () =>
      invoke("live-room-ai-recommendation", { room_id: roomId })
        .then((res) => active && res?.data?.success && setRecommendations(res.data.recommendations || []))
        .catch(() => {});

    poll();
    const interval = setInterval(poll, 60000);
    return () => { active = false; clearInterval(interval); };
  }, [roomId, joined]);

  // Gift analytics poll (every 45s while joined)
  useEffect(() => {
    if (!roomId || !joined) return;
    let active = true;

    const poll = () =>
      invoke("live-room-gift-analytics", { room_id: roomId })
        .then((res) => active && res?.data?.success && setGiftStats(res.data))
        .catch(() => {});

    poll();
    const interval = setInterval(poll, 45000);
    return () => { active = false; clearInterval(interval); };
  }, [roomId, joined]);

  // Ranking engine poll (every 45s while joined)
  useEffect(() => {
    if (!roomId || !joined) return;
    let active = true;

    const poll = () =>
      invoke("live-room-ranking-engine", { room_id: roomId })
        .then((res) => active && res?.data?.success && setRoomScore(res.data.score))
        .catch(() => {});

    poll();
    const interval = setInterval(poll, 45000);
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

  // Event bus: publish an event
  const publishEvent = useCallback(
    (event, data = {}) => {
      if (!roomId) return Promise.resolve();
      return invoke("live-room-event-bus", { room_id: roomId, event, data })
        .then((res) => res?.data)
        .catch(() => {});
    },
    [roomId]
  );

  // Archive manager
  const archiveRoom = useCallback(() => {
    if (!roomId) return Promise.resolve();
    return invoke("live-room-archive-manager", { room_id: roomId, action: "archive" })
      .then((res) => res?.data)
      .catch((e) => ({ success: false, error: e.message }));
  }, [roomId]);

  // Backup sync
  const backupRoom = useCallback(() => {
    if (!roomId) return Promise.resolve();
    return invoke("live-room-backup-sync", { room_id: roomId, action: "backup" })
      .then((res) => res?.data)
      .catch((e) => ({ success: false, error: e.message }));
  }, [roomId]);

  // Mic request manager — request to speak
  const requestMic = useCallback(() => {
    if (!roomId) return Promise.resolve();
    return invoke("mic-request-manager", { room_id: roomId, action: "request" })
      .then((res) => res?.data)
      .catch((e) => ({ success: false, error: e.message }));
  }, [roomId]);

  // Payment security — verify a gift/payment transaction
  const verifyPayment = useCallback(
    (amount) => {
      if (!roomId) return Promise.resolve();
      return invoke("live-room-payment-security", { room_id: roomId, action: "verify", amount })
        .then((res) => res?.data)
        .catch((e) => ({ success: false, error: e.message }));
    },
    [roomId]
  );

  // Scheduler — process scheduled room tasks
  const runScheduler = useCallback(() => {
    return invoke("live-room-scheduler", {})
      .then((res) => res?.data)
      .catch((e) => ({ success: false, error: e.message }));
  }, []);

  return {
    joined, joining, error, aiStats, recommendations, giftStats, roomScore,
    audioAction, publishEvent, archiveRoom, backupRoom, requestMic, verifyPayment, runScheduler,
  };
}