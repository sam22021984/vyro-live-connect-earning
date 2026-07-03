import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Lock, Headphones, Mic, Crown } from "lucide-react";
import { base44 } from "@/api/base44Client";

const joinRoom = async (room) => {
  try {
    await base44.functions.invoke("homeFeedActions", {
      action: "join_room",
      room_id: room.id,
    });
  } catch {}
};

export function AudioRoomFeed({ rooms }) {
  const navigate = useNavigate();
  if (!rooms || rooms.length === 0) return null;
  const audioRooms = rooms.filter((r) => r.category?.toLowerCase?.().includes("audio") || r.category?.toLowerCase?.().includes("music"));

  if (audioRooms.length === 0) return null;

  return (
    <div className="pt-4">
      <div className="flex items-center justify-between px-3 mb-2">
        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-1.5"><Headphones size={14} className="text-blue-500" /> Audio Rooms</h2>
        <button className="text-[10px] font-semibold text-purple-500">See All</button>
      </div>
      <div className="flex gap-2.5 px-3 overflow-x-auto scrollbar-hide pb-1">
        {audioRooms.map((room) => (
          <button
            key={room.id}
            onClick={() => { joinRoom(room); navigate(`/live-room/${room.id}`); }}
            className="flex-shrink-0 w-40 rounded-2xl overflow-hidden bg-white border border-gray-50 shadow-sm active:scale-95 transition text-left"
          >
            <div className="relative h-20 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
              <Headphones size={28} className="text-white/80" />
              <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-black/40 text-white text-[8px] font-bold flex items-center gap-0.5">
                <Users size={8} /> {room.viewers || room.members || 0}
              </div>
              {room.locked && <Lock size={12} className="absolute top-1.5 right-1.5 text-white/80" />}
            </div>
            <div className="p-2">
              <p className="text-xs font-bold text-gray-800 truncate">{room.name}</p>
              <p className="text-[10px] text-gray-400 truncate">{room.host?.name || "Host"}</p>
              <div className="flex items-center gap-1 mt-1">
                <Mic size={9} className="text-green-500" />
                <span className="text-[9px] text-gray-400">{room.language || "Multi"}</span>
                <span className="text-[9px] text-gray-400 ml-auto">{room.country || ""}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function PartyRoomFeed({ rooms }) {
  const navigate = useNavigate();
  if (!rooms || rooms.length === 0) return null;

  const partyRooms = rooms.filter((r) => !r.category?.toLowerCase?.().includes("audio") && !r.category?.toLowerCase?.().includes("music"));

  if (partyRooms.length === 0) return null;

  return (
    <div className="pt-4">
      <div className="flex items-center justify-between px-3 mb-2">
        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">🎉 Party Rooms</h2>
        <button onClick={() => navigate("/party-dashboard")} className="text-[10px] font-semibold text-purple-500">See All</button>
      </div>
      <div className="flex gap-2.5 px-3 overflow-x-auto scrollbar-hide pb-1">
        {partyRooms.slice(0, 10).map((room) => (
          <button
            key={room.id}
            onClick={() => { joinRoom(room); navigate(`/live-room/${room.id}`); }}
            className="flex-shrink-0 w-40 rounded-2xl overflow-hidden bg-white border border-gray-50 shadow-sm active:scale-95 transition text-left"
          >
            <div className="relative h-24 bg-gradient-to-br from-pink-400 to-rose-500">
              {room.cover ? (
                <img src={room.cover} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">🎉</div>
              )}
              <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/40 text-white text-[8px] font-bold">
                {room.status === "live" ? "LIVE" : "SCHEDULED"}
              </div>
              <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-black/40 text-white text-[8px] font-bold flex items-center gap-0.5">
                <Users size={8} /> {room.members || room.viewers || 0}
              </div>
            </div>
            <div className="p-2">
              <p className="text-xs font-bold text-gray-800 truncate">{room.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                {room.host?.vip && <Crown size={9} className="text-yellow-500" />}
                <span className="text-[10px] text-gray-400 truncate">{room.host?.name || "Host"}</span>
              </div>
              <p className="text-[9px] text-gray-300">{room.country_name || room.country || ""}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}