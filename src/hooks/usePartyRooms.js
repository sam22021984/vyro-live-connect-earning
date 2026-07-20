import { useState, useEffect, useCallback } from "react";
import { backendGateway } from "@/lib/backendGateway";
import { getSupabase as getSupabaseClient } from "@/lib/supabaseClient";

export function usePartyRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      const data = await backendGateway.readTable("party_rooms", { limit: 100, order: "viewers", ascending: false }).catch(() => []);
      setRooms(data || []);
    } catch (err) {
      console.error("Failed to fetch party rooms:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
    // Realtime invalidation handled by GlobalRealtimeProvider.
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

  const createRoom = async (roomData) => {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.from("party_rooms").insert(roomData).select().single();
    if (error) throw error;
    return data;
  };
  const updateRoom = async (id, roomData) => backendGateway.updateTable("party_rooms", { id }, roomData);
  const deleteRoom = async (id) => {
    const supabase = await getSupabaseClient();
    const { error } = await supabase.from("party_rooms").delete().eq("id", id);
    if (error) throw error;
  };

  return {
    rooms, loading, recommended, popular, trending, stats, rankings,
    refetch: fetchRooms, createRoom, updateRoom, deleteRoom,
  };
}