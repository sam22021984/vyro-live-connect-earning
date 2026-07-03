import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play, History, Clock, RefreshCw } from "lucide-react";

export function ContinueWatching() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("vyro_continue_watching") || "[]");
    setItems(saved);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="pt-4">
      <h2 className="text-sm font-bold text-gray-800 px-3 mb-2 flex items-center gap-1.5"><Play size={14} className="text-purple-500" /> Continue Watching</h2>
      <div className="flex gap-2.5 px-3 overflow-x-auto scrollbar-hide pb-1">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(`/live-room/${item.roomId}`)}
            className="flex-shrink-0 w-40 rounded-2xl overflow-hidden bg-white border border-gray-50 shadow-sm active:scale-95 transition text-left"
          >
            <div className="relative h-20 bg-gradient-to-br from-purple-200 to-blue-200">
              {item.thumbnail && <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                  <Play size={14} className="text-purple-600 ml-0.5" fill="currentColor" />
                </div>
              </div>
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                <div className="h-full bg-purple-500" style={{ width: `${item.progress || 50}%` }} />
              </div>
            </div>
            <div className="p-2">
              <p className="text-xs font-bold text-gray-800 truncate">{item.title}</p>
              <p className="text-[9px] text-gray-400 flex items-center gap-0.5"><Clock size={8} /> {item.host}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function RecentlyVisited() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("vyro_recent_rooms") || "[]");
    setRooms(saved);
  }, []);

  if (rooms.length === 0) return null;

  return (
    <div className="pt-4">
      <h2 className="text-sm font-bold text-gray-800 px-3 mb-2 flex items-center gap-1.5"><History size={14} className="text-purple-500" /> Recently Visited</h2>
      <div className="flex gap-2 px-3 overflow-x-auto scrollbar-hide pb-1">
        {rooms.map((room, i) => (
          <button
            key={i}
            onClick={() => navigate(`/live-room/${room.id}`)}
            className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-50 shadow-sm active:scale-95 transition"
          >
            {room.avatar ? (
              <img src={room.avatar} alt="" className="w-8 h-8 rounded-full object-cover bg-gray-100" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center text-sm">🎙️</div>
            )}
            <div className="text-left">
              <p className="text-xs font-bold text-gray-700 truncate max-w-[80px]">{room.name}</p>
              <p className="text-[9px] text-gray-400">{room.active ? "Still live" : "Ended"}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}