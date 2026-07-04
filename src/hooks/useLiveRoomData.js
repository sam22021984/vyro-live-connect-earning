import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

export function useLiveRoomData(roomId, seatCount = 10, currentUserId = null) {
  const [room, setRoom] = useState(null);
  const [chat, setChat] = useState([]);
  const [seats, setSeats] = useState([]);
  const [audience, setAudience] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoom = useCallback(async () => {
    if (!roomId) return;
    try {
      const data = await base44.entities.PartyRoom.get(roomId);
      setRoom(data);
    } catch (err) {
      console.error("Failed to fetch live room:", err);
    }
  }, [roomId]);

  // Auto-join: when a user enters the room, create a viewer participant if they don't already exist
  const autoJoin = useCallback(async () => {
    if (!roomId || !currentUserId) return;
    try {
      const existing = await base44.entities.RoomParticipant.filter({
        room_id: roomId,
        user_id: currentUserId,
      });
      if (existing && existing.length > 0) return; // Already a participant

      // Fetch profile for display info
      let profile = null;
      try {
        const profiles = await base44.entities.UserProfile.filter({ user_id: currentUserId });
        profile = profiles?.[0];
      } catch {}

      await base44.entities.RoomParticipant.create({
        room_id: roomId,
        user_id: currentUserId,
        username: profile?.username || profile?.full_name || "User",
        avatar_url: profile?.avatar_url || "",
        global_id: profile?.global_id || "",
        role: "viewer",
        status: "active",
        joined_at: new Date().toISOString(),
        country: profile?.country || "",
        is_vip: profile?.is_vip || false,
      });
    } catch (err) {
      // Silently fail — non-critical
    }
  }, [roomId, currentUserId]);

  const fetchChat = useCallback(async () => {
    if (!roomId) return;
    try {
      const messages = await base44.entities.ChatMessage.filter({ conversation_id: roomId }, "-created_date", 50);
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
      const allParticipants = await base44.entities.RoomParticipant.filter(
        { room_id: roomId, status: "active" },
        "joined_at",
        100
      );

      const seated = (allParticipants || []).filter((p) => p.role !== "viewer");
      const audienceList = (allParticipants || []).filter((p) => p.role === "viewer");

      // Fetch user profiles for seated participants (batch)
      const userIds = [...new Set(seated.map((p) => p.user_id).filter(Boolean))];
      const profileResults = await Promise.all(
        userIds.map((uid) =>
          base44.entities.UserProfile.filter({ user_id: uid }).catch(() => [])
        )
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
        audienceUids.map((uid) =>
          base44.entities.UserProfile.filter({ user_id: uid }).catch(() => [])
        )
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

  // Room + chat subscriptions (stable — don't re-run on seatCount change)
  useEffect(() => {
    if (!roomId) return;
    setLoading(true);
    Promise.all([fetchRoom(), fetchChat(), autoJoin()]).finally(() => setLoading(false));

    const unsubRoom = base44.entities.PartyRoom.subscribe(fetchRoom);
    const unsubChat = base44.entities.ChatMessage.subscribe(fetchChat);
    return () => {
      unsubRoom && unsubRoom();
      unsubChat && unsubChat();
    };
  }, [roomId, fetchRoom, fetchChat, autoJoin]);

  // Participants subscription (separate — re-runs on seatCount change)
  useEffect(() => {
    if (!roomId) return;
    fetchParticipants();
    const unsubParticipants = base44.entities.RoomParticipant.subscribe(fetchParticipants);
    return () => {
      unsubParticipants && unsubParticipants();
    };
  }, [roomId, fetchParticipants]);

  const sendChatMessage = useCallback(
    async (text, user = "You") => {
      if (!roomId || !text.trim()) return;
      try {
        await base44.entities.ChatMessage.create({
          conversation_id: roomId,
          sender_id: user,
          text: text.trim(),
          type: "text",
          date: new Date().toISOString().split("T")[0],
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
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
        await base44.entities.PartyRoom.update(roomId, { viewers: count });
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