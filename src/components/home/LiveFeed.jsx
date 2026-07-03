import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Gift, BadgeCheck, Crown, Users } from "lucide-react";
import { base44 } from "@/api/base44Client";

function formatDuration(seconds) {
  if (!seconds) return "0m";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function LiveFeed({ rooms }) {
  const navigate = useNavigate();

  const handleJoinRoom = async (room) => {
    try {
      await base44.functions.invoke("homeFeedActions", {
        action: "join_room",
        room_id: room.room_id || room.id,
        room_session_id: room.id,
      });
    } catch {}
    navigate(`/live-room/${room.id}`);
  };

  if (!rooms || rooms.length === 0) return null;

  return (
    <div className="pt-4">
      <div className="flex items-center justify-between px-3 mb-2">
        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Live Now
        </h2>
        <button className="text-[10px] font-semibold text-purple-500">See All</button>
      </div>

      <div className="flex gap-2.5 px-3 overflow-x-auto scrollbar-hide pb-1">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => handleJoinRoom(room)}
            className="flex-shrink-0 w-36 rounded-2xl overflow-hidden bg-white border border-gray-50 shadow-sm active:scale-95 transition text-left"
          >
            {/* Thumbnail */}
            <div className="relative h-44 bg-gradient-to-br from-purple-200 to-blue-200">
              {room.host_avatar ? (
                <img src={room.host_avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">🎙️</div>
              )}

              {/* Live badge */}
              <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-red-500 text-white text-[8px] font-bold flex items-center gap-0.5">
                <span className="w-1 h-1 rounded-full bg-white animate-pulse" /> LIVE
              </div>

              {/* Viewer count */}
              <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-black/50 text-white text-[8px] font-bold flex items-center gap-0.5">
                <Eye size={8} /> {room.current_viewers || 0}
              </div>

              {/* PK badge */}
              {room.security_flags?.includes?.("pk_active") && (
                <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-yellow-500 text-white text-[8px] font-bold">PK</div>
              )}

              {/* Multi-guest indicator */}
              {room.peak_viewers > 50 && (
                <div className="absolute bottom-1.5 left-1.5 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center">
                  <Users size={10} className="text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-2">
              <p className="text-xs font-bold text-gray-800 truncate">{room.party_name || room.room_id || "Party Room"}</p>
              <p className="text-[10px] text-gray-400 truncate">{room.category || "Live Stream"}</p>

              <div className="flex items-center gap-2 mt-1">
                {room.is_vip && <Crown size={10} className="text-yellow-500" />}
                <BadgeCheck size={10} className="text-blue-500" />
                <span className="text-[9px] text-gray-400 flex items-center gap-0.5">
                  <Gift size={8} /> {room.total_gifts || 0}
                </span>
                <span className="text-[9px] text-gray-400 ml-auto">{formatDuration(room.duration_seconds)}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}