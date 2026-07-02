import React from "react";
import { COLORS, PARTY_ROOMS } from "./partyData";
import PartyRoomCard from "./PartyRoomCard";

export default function PopularTab({ onSelect }) {
  const recommended = PARTY_ROOMS.filter(r => r.recommended);
  const popular = [...PARTY_ROOMS].sort((a, b) => b.viewers - a.viewers);

  return (
    <div className="space-y-4">
      {/* Recommended */}
      <div>
        <h3 className="text-xs font-bold mb-2 px-1" style={{ color: COLORS.textPrimary }}>✨ Recommended For You</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {recommended.map((room) => (
            <PartyRoomCard key={room.id} room={room} onSelect={onSelect} />
          ))}
        </div>
      </div>

      {/* Popular */}
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