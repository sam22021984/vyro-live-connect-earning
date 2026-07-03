import { useState, useEffect, useCallback, useRef } from "react";
import { base44 } from "@/api/base44Client";

export function useHomeFeed() {
  const [liveRooms, setLiveRooms] = useState([]);
  const [partyRooms, setPartyRooms] = useState([]);
  const [creators, setCreators] = useState([]);
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState(null);
  const reqId = useRef(0);

  const load = useCallback(async (isRefresh = false) => {
    const currentReq = ++reqId.current;
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const [live, parties, hosts, users, profileRes] = await Promise.all([
        base44.entities.RoomSession.filter({ status: "live" }, "-current_viewers", 20).catch(() => []),
        base44.entities.PartyRoom.list("-viewers", 20).catch(() => []),
        base44.entities.UserProfile.filter({ is_host: true }, "-followers", 10).catch(() => []),
        base44.entities.UserProfile.list("-created_date", 10).catch(() => []),
        base44.functions.invoke("userOnboarding", { action: "getProfile" }).catch(() => null),
      ]);

      if (currentReq !== reqId.current) return;

      setLiveRooms(live || []);
      setPartyRooms(parties || []);
      setCreators(hosts || []);
      setFriendSuggestions((users || []).filter((u) => u.id !== profileRes?.data?.profile?.id));
      setProfile(profileRes?.data?.profile || null);
    } catch (e) {
      if (currentReq !== reqId.current) return;
      setError(e.message || "Failed to load feed");
    } finally {
      if (currentReq === reqId.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    load();

    // Realtime subscriptions
    const unsubLive = base44.entities.RoomSession?.subscribe?.(() => load(true)) || (() => {});
    const unsubParty = base44.entities.PartyRoom?.subscribe?.(() => load(true)) || (() => {});
    return () => { unsubLive(); unsubParty(); };
  }, [load]);

  return { liveRooms, partyRooms, creators, friendSuggestions, profile, loading, error, refreshing, refresh: () => load(true) };
}