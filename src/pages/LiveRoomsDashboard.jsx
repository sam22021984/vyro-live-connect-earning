import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Radio, Loader2, RefreshCw, Crown, Eye, Search } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function LiveRoomsDashboard() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const activeRooms = await base44.entities.PartyRoom.filter(
        { status: "live", live_type: "audio" },
        "-started_at",
        100
      );
      const list = activeRooms || [];

      // Fetch participant counts per room in parallel
      const enriched = await Promise.all(
        list.map(async (room) => {
          try {
            const participants = await base44.entities.RoomParticipant.filter({
              room_id: room.id,
              status: "active",
            });
            const seated = (participants || []).filter(
              (p) => p.role !== "viewer"
            ).length;
            return {
              ...room,
              participant_count: participants?.length || 0,
              seated_count: seated,
            };
          } catch {
            return { ...room, participant_count: 0, seated_count: 0 };
          }
        })
      );
      setRooms(enriched);
    } catch (e) {
      setError(e.response?.data?.error || e.message || "Failed to load rooms");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
    const unsub = base44.entities.PartyRoom.subscribe(fetchRooms);
    return () => unsub && unsub();
  }, [fetchRooms]);

  const filtered = rooms.filter((r) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      r.name?.toLowerCase().includes(q) ||
      r.host?.name?.toLowerCase().includes(q) ||
      r.category?.toLowerCase().includes(q)
    );
  });

  const totalParticipants = rooms.reduce(
    (sum, r) => sum + (r.participant_count || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#0B0F1A]/95 backdrop-blur border-b border-white/10">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-90 transition"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold flex items-center gap-2">
              <Radio size={16} className="text-rose-500 animate-pulse" />
              Live Audio Rooms
            </h1>
            <p className="text-[11px] text-white/50">
              {rooms.length} active • {totalParticipants} participants
            </p>
          </div>
          <button
            onClick={fetchRooms}
            disabled={loading}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-90 transition disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/10">
            <Search size={14} className="text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search rooms, hosts, categories..."
              className="flex-1 bg-transparent text-xs outline-none placeholder:text-white/30"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-3">
        {loading && rooms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <Loader2 size={28} className="animate-spin text-rose-500" />
            <p className="text-xs text-white/50">Loading live rooms…</p>
          </div>
        )}

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 text-center">
            <p className="text-xs text-rose-300">{error}</p>
            <button
              onClick={fetchRooms}
              className="mt-2 text-xs text-rose-400 underline"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-2 text-center">
            <Radio size={32} className="text-white/20" />
            <p className="text-sm font-medium text-white/60">No live rooms</p>
            <p className="text-xs text-white/40">
              {search ? "No rooms match your search." : "Be the first to go live!"}
            </p>
          </div>
        )}

        {filtered.map((room) => (
          <RoomCard key={room.id} room={room} onJoin={() => navigate(`/live-room/${room.id}`)} />
        ))}
      </div>
    </div>
  );
}

function RoomCard({ room, onJoin }) {
  return (
    <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-2xl p-3 active:scale-[0.99] transition">
      <div className="flex items-start gap-3">
        {/* Cover */}
        <div className="relative flex-shrink-0">
          <img
            src={room.cover || "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=120"}
            alt={room.name}
            className="w-14 h-14 rounded-xl object-cover"
          />
          <span className="absolute -top-1 -right-1 flex items-center gap-0.5 bg-rose-500 rounded-full px-1.5 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[8px] font-bold text-white">LIVE</span>
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold truncate">{room.name}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Crown size={11} className="text-amber-400 flex-shrink-0" />
            <span className="text-[11px] text-white/70 truncate">
              {room.host?.name || "Unknown Host"}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {room.category && (
              <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded-full text-white/60">
                {room.category}
              </span>
            )}
            {room.country && (
              <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded-full text-white/60">
                {room.country}
              </span>
            )}
            {room.room_type !== "public" && (
              <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-full">
                {room.room_type}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Users size={12} className="text-sky-400" />
            <span className="text-[11px] font-semibold">
              {room.seated_count || 0}
            </span>
            <span className="text-[9px] text-white/40">seated</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={12} className="text-white/50" />
            <span className="text-[11px] font-semibold">
              {room.viewers || 0}
            </span>
            <span className="text-[9px] text-white/40">viewers</span>
          </div>
        </div>
        <button
          onClick={onJoin}
          className="bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[11px] font-bold px-4 py-1.5 rounded-full active:scale-95 transition"
        >
          Join
        </button>
      </div>
    </div>
  );
}