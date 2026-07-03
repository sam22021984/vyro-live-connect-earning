import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

export function useLiveRoomData(roomId) {
  const [room, setRoom] = useState(null);
  const [chat, setChat] = useState([]);
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

  useEffect(() => {
    if (!roomId) return;
    setLoading(true);
    Promise.all([fetchRoom(), fetchChat()]).finally(() => setLoading(false));

    const unsubRoom = base44.entities.PartyRoom.subscribe(fetchRoom);
    const unsubChat = base44.entities.ChatMessage.subscribe(fetchChat);
    return () => { unsubRoom && unsubRoom(); unsubChat && unsubChat(); };
  }, [roomId, fetchRoom, fetchChat]);

  const sendChatMessage = useCallback(async (text, user = "You") => {
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
  }, [roomId]);

  const updateViewers = useCallback(async (count) => {
    if (!roomId) return;
    try {
      await base44.entities.PartyRoom.update(roomId, { viewers: count });
    } catch (err) {
      console.error("Failed to update viewers:", err);
    }
  }, [roomId]);

  return { room, chat, loading, sendChatMessage, updateViewers, refetch: fetchRoom };
}