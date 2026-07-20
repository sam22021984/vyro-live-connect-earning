import { useState, useEffect, useCallback } from "react";
import { backendGateway } from "@/lib/backendGateway";
import { getSupabase } from "@/lib/supabaseClient";

export function useLiveRoomData(roomId, seatCount = 10, currentUserId = null) {
  const [room, setRoom] = useState(null);
  const [chat, setChat] = useState([]);
  const [seats, setSeats] = useState([]);
  const [audience, setAudience] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoom = useCallback(async () => {
    if (!roomId) return;
    try {
      const data = await backendGateway.readTable("party_rooms", { filter: { id: roomId }, single: true }).catch(() => null);
      setRoom(data);
    } catch (err) {
      console.error("Failed to fetch live room:", err);
    }
  }, [roomId]);

  // Auto-join: when a user enters the room, join via canonical RPC.
  // The room OWNER is skipped — createLiveRoom already created their host participant.
  const autoJoin = useCallback(async () => {
    if (!roomId || !currentUserId) return;
    try {
      const roomData = await backendGateway.readTable("party_rooms", { filter: { id: roomId }, single: true }).catch(() => null);
      if (!roomData) return;
      const isOwner =
        roomData.owner_id === currentUserId ||
        roomData.created_by === currentUserId ||
        roomData.host_id === currentUserId;
      if (isOwner) return;

      const existing = await backendGateway.readTable("room_participants", { filter: { room_id: roomId, user_id: currentUserId }, limit: 1 }).catch(() => []);
      if (existing && existing.length > 0) return;

      // Join via canonical RPC
      await backendGateway.rooms.join(roomId).catch(() => {});
    } catch (err) {
      // Silently fail — non-critical
    }
  }, [roomId, currentUserId]);

  const fetchChat = useCallback(async () => {
    if (!roomId) return;
    try {
      const messages = await backendGateway.readTable("room_messages", { filter: { conversation_id: roomId }, limit: 50, order: "created_at", ascending: false }).catch(() => []);
      setChat((messages || []).map((m) => ({
        id: m.id,
        user: m.sender_id || "User",
        color: "#3B82F6",
        vip: false,
        text: m.text || "",
        time: m.time || "now",
        isSystem: m.type === "call",
        isGift: m.type === "gift",
        gift: m.gift_icon,
      })));
    } catch (err) {
      console.error("Failed to fetch chat:", err);
    }
  }, [roomId]);

  const fetchParticipants = useCallback(async () => {
    if (!roomId) return;
    try {
      const allParticipants = await backendGateway.readTable("room_participants", { filter: { room_id: roomId, status: "active" }, limit: 100, order: "joined_at" }).catch(() => []);

      const seated = (allParticipants || []).filter((p) => p.role !== "viewer");
      const audienceList = (allParticipants || []).filter((p) => p.role === "viewer");

      // Fetch user profiles for seated participants (batch)
      const userIds = [...new Set(seated.map((p) => p.user_id).filter(Boolean))];
      const profileResults = await Promise.all(
        userIds.map((uid) => backendGateway.readTable("user_profiles", { filter: { user_id: uid }, limit: 1 }).catch(() => []))
      );
      const profileMap = {};
      profileResults.forEach((pl, i) => {
        if (pl && pl[0]) profileMap[userIds[i]] = pl[0];
      });

      // Build seats array
      const newSeats = [];
      for (let i = 0; i < seatCount; i++) {
        const p =
          seated.find((s) => s.seat_number === i) ||
          (i === 0 ? seated.find((s) => s.role === "host") : null);
        if (p) {
          const profile = profileMap[p.user_id];
          newSeats.push({
            id: i,
            role: p.role === "host" ? "host" : "speaker",
            user: {
              user_id: p.user_id,
              name: p.username || profile?.username || profile?.full_name || "User",
              avatar: p.avatar_url || profile?.avatar_url || "",
              vip: p.is_vip ? `VIP ${profile?.vip_tier || ""}`.trim() : null,
              level: profile?.user_level || 1,
              speaking: p.is_speaking || false,
              muted: p.is_muted || false,
              country: p.country || profile?.country_flag || "",
              vyro_id: p.global_id || profile?.global_id || "",
              agency: null,
              is_host: p.role === "host",
              followers: profile?.followers || 0,
              following: profile?.following || 0,
              is_online: p.status === "active",
            },
          });
        } else {
          newSeats.push({ id: i, role: i === 0 ? "host" : "speaker", user: null });
        }
      }
      setSeats(newSeats);

      // Map audience (enrich with profile for level/followers)
      const audienceUids = [...new Set(audienceList.map((p) => p.user_id).filter(Boolean))];
      const audienceProfiles = await Promise.all(
        audienceUids.map((uid) => backendGateway.readTable("user_profiles", { filter: { user_id: uid }, limit: 1 }).catch(() => []))
      );
      const audienceProfileMap = {};
      audienceProfiles.forEach((pl, i) => {
        if (pl && pl[0]) audienceProfileMap[audienceUids[i]] = pl[0];
      });

      setAudience(
        audienceList.map((p) => {
          const profile = audienceProfileMap[p.user_id];
          return {
            user_id: p.user_id,
            name: p.username || profile?.username || "User",
            avatar: p.avatar_url || profile?.avatar_url || "",
            vip: p.is_vip ? `VIP ${profile?.vip_tier || ""}`.trim() : null,
            level: profile?.user_level || 1,
            country: p.country || profile?.country_flag || "",
            vyro_id: p.global_id || profile?.global_id || "",
            agency: null,
            followers: profile?.followers || 0,
            following: profile?.following || 0,
            is_online: p.status === "active",
            is_host: false,
            muted: p.is_muted || false,
          };
        })
      );
    } catch (err) {
      console.error("Failed to fetch participants:", err);
    }
  }, [roomId, seatCount]);

  // Room + chat fetch (stable — don't re-run on seatCount change)
  useEffect(() => {
    if (!roomId) return;
    setLoading(true);
    Promise.all([fetchRoom(), fetchChat(), autoJoin()]).finally(() => setLoading(false));
    // Realtime invalidation handled by GlobalRealtimeProvider.
  }, [roomId, fetchRoom, fetchChat, autoJoin]);

  // Participants fetch (separate — re-runs on seatCount change)
  useEffect(() => {
    if (!roomId) return;
    fetchParticipants();
    // Realtime invalidation handled by GlobalRealtimeProvider.
  }, [roomId, fetchParticipants]);

  const sendChatMessage = useCallback(
    async (text, user = "You") => {
      if (!roomId || !text.trim()) return;
      try {
        await backendGateway.rooms.sendMessage(roomId, text.trim());
      } catch (err) {
        console.error("Failed to send chat message:", err);
      }
    },
    [roomId]
  );

  const updateViewers = useCallback(
    async (count) => {
      if (!roomId) return;
      try {
        // Use canonical RPC to update room state
        const supabase = await getSupabase();
        await supabase.from("party_rooms").update({ viewers: count }).eq("id", roomId);
      } catch (err) {
        console.error("Failed to update viewers:", err);
      }
    },
    [roomId]
  );

  return {
    room,
    chat,
    seats,
    audience,
    loading,
    sendChatMessage,
    updateViewers,
    refetch: fetchRoom,
  };
}