import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

export function usePartyRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      const data = await base44.entities.PartyRoom.list("-viewers", 100);
      setRooms(data || []);
    } catch (err) {
      console.error("Failed to fetch party rooms:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
    const unsubscribe = base44.entities.PartyRoom.subscribe(() => {
      fetchRooms();
    });
    return unsubscribe;
  }, [fetchRooms]);

  const recommended = rooms.filter((r) => r.recommended);
  const popular = [...rooms].sort((a, b) => (b.viewers || 0) - (a.viewers || 0));
  const trending = rooms.filter((r) => r.trending);

  const stats = {
    activeRooms: rooms.filter((r) => r.status === "live").length,
    totalViewers: rooms.reduce((sum, r) => sum + (r.viewers || 0), 0),
    totalMembers: rooms.reduce((sum, r) => sum + (r.members || 0), 0),
    trendingCount: trending.length,
    recommendedCount: recommended.length,
  };

  const rankings = [
    { type: "Top Rooms", data: [...rooms].sort((a, b) => (a.rank || 999) - (b.rank || 999)).slice(0, 5) },
    { type: "Most Active", data: [...rooms].sort((a, b) => (b.members || 0) - (a.members || 0)).slice(0, 5) },
    { type: "Highest Viewers", data: popular.slice(0, 5) },
    { type: "Trending", data: trending.slice(0, 5) },
  ];

  const createRoom = async (roomData) => await base44.entities.PartyRoom.create(roomData);
  const updateRoom = async (id, roomData) => await base44.entities.PartyRoom.update(id, roomData);
  const deleteRoom = async (id) => await base44.entities.PartyRoom.delete(id);

  return {
    rooms, loading, recommended, popular, trending, stats, rankings,
    refetch: fetchRooms, createRoom, updateRoom, deleteRoom,
  };
}