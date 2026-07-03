import React from "react";
import { Loader2 } from "lucide-react";
import { COLORS } from "./partyData";
import PartyRoomCard from "./PartyRoomCard";

export default function PopularTab({ rooms = [], recommended = [], popular = [], loading, onSelect }) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: COLORS.royalBlue }} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recommended.length > 0 && (
        <div>
          <h3 className="text-xs font-bold mb-2 px-1" style={{ color: COLORS.textPrimary }}>✨ Recommended For You</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {recommended.map((room) => (
              <PartyRoomCard key={room.id} room={room} onSelect={onSelect} />
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>🔥 Popular Party Rooms</h3>
          <span className="text-[9px]" style={{ color: COLORS.textSecondary }}>{popular.length} rooms</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {popular.map((room) => (
            <PartyRoomCard key={room.id} room={room} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  );
}