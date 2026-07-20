import { useState, useEffect, useCallback, useRef } from "react";
import { base44 } from "@/api/base44Client";

import { backendGateway } from "@/lib/backendGateway";
export function useHomeFeed() {
  const [liveRooms, setLiveRooms] = useState([]);
  const [partyRooms, setPartyRooms] = useState([]);
  const [creators, setCreators] = useState([]);
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [followingMap, setFollowingMap] = useState({});
  const reqId = useRef(0);

  const load = useCallback(async (isRefresh = false) => {
    const currentReq = ++reqId.current;
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const [live, parties, hosts, users, profileRes] = await Promise.all([
        backendGateway.readTable("room_sessions", { filter: { status: "live" }, limit: 20, order: "current_viewers", ascending: false }).catch(() => []),
        backendGateway.readTable("party_rooms", { limit: 20, order: "viewers", ascending: false }).catch(() => []),
        backendGateway.readTable("user_profiles", { filter: { is_host: true }, limit: 10, order: "followers", ascending: false }).catch(() => []),
        backendGateway.readTable("user_profiles", { limit: 10, order: "created_date", ascending: false }).catch(() => []),
        base44.functions.invoke("userOnboarding", { action: "getProfile" }).catch(() => null),
      ]);

      if (currentReq !== reqId.current) return;

      setLiveRooms(live || []);
      setPartyRooms(parties || []);
      setCreators(hosts || []);
      setFriendSuggestions((users || []).filter((u) => u.id !== profileRes?.data?.profile?.id));
      setProfile(profileRes?.data?.profile || null);

      // Check following status for creators + friends
      const allPeople = [...(hosts || []), ...(users || [])].filter((u) => u.id !== profileRes?.data?.profile?.id);
      const ids = allPeople.map((u) => u.id).filter(Boolean);
      if (ids.length > 0) {
        try {
          const followRes = await base44.functions.invoke("homeFeedActions", { action: "check_following", target_ids: ids });
          setFollowingMap(followRes?.data?.following || {});
        } catch {}
      }
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

  return { liveRooms, partyRooms, creators, friendSuggestions, profile, followingMap, loading, error, refreshing, refresh: () => load(true) };
}