import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Users, Clock, Headphones, Lock } from "lucide-react";

export default function LiveInfoCard({ profile, liveRoom, partyRoom }) {
  const navigate = useNavigate();
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState("");

  const room = liveRoom || partyRoom;
  if (!room) return null;

  const isLive = liveRoom?.status === "live" || partyRoom?.status === "live";
  if (!isLive) return null;

  const handleJoin = () => {
    if (room.locked) {
      setShowPasswordPrompt(true);
      return;
    }
    navigate(`/live-room/${room.id}`);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0m";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div className="px-3 pt-3">
      <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-red-500 to-pink-500 p-4 text-white relative">
        <div className="absolute right-0 top-0 text-6xl opacity-15 -mr-2 -mt-2">📡</div>
        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <Headphones size={24} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="px-1.5 py-0.5 rounded bg-white/30 text-[8px] font-bold">LIVE</span>
              {liveRoom && (
                <span className="text-[10px] text-white/80 flex items-center gap-0.5">
                  <Eye size={9} /> {liveRoom.current_viewers || 0}
                </span>
              )}
              {partyRoom && (
                <span className="text-[10px] text-white/80 flex items-center gap-0.5">
                  <Users size={9} /> {partyRoom.members || partyRoom.viewers || 0}
                </span>
              )}
            </div>
            <h3 className="text-sm font-bold truncate">{room.name || room.room_id || "Live Room"}</h3>
            <p className="text-[10px] text-white/70">
              {liveRoom ? `Live for ${formatDuration(liveRoom.duration_seconds)}` : `${partyRoom.category || "Party"}`}
            </p>
          </div>
          <button onClick={handleJoin} className="px-4 py-2 rounded-xl bg-white text-red-500 text-xs font-bold active:scale-95 transition">
            Join
          </button>
        </div>
      </div>

      {/* Password prompt */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-6" onClick={() => setShowPasswordPrompt(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Lock size={22} className="text-gray-500" />
            </div>
            <h3 className="text-sm font-bold text-gray-800 text-center mb-1">Password Required</h3>
            <p className="text-xs text-gray-400 text-center mb-3">This room is password protected</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full py-2.5 px-3 rounded-xl text-sm border border-gray-200 outline-none mb-3"
            />
            <div className="flex gap-2">
              <button onClick={() => setShowPasswordPrompt(false)} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-100">Cancel</button>
              <button onClick={() => { setShowPasswordPrompt(false); navigate(`/live-room/${room.id}`); }} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-500">Join</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}