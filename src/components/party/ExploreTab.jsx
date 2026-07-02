import React from "react";
import { COLORS, CATEGORIES, EXPLORE_COUNTRIES, PARTY_ROOMS } from "./partyData";
import PartyRoomCard from "./PartyRoomCard";
import { useToast } from "@/components/ui/use-toast";

export default function ExploreTab({ onSelect }) {
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold px-1" style={{ color: COLORS.textPrimary }}>🧭 Explore Party Rooms</h3>

      {/* By Country */}
      <div>
        <p className="text-[10px] font-bold mb-2 px-1" style={{ color: COLORS.textSecondary }}>🌍 By Country</p>
        <div className="grid grid-cols-4 gap-2">
          {EXPLORE_COUNTRIES.map((c, i) => (
            <button
              key={i}
              onClick={() => toast({ title: `Exploring ${c.name}...` })}
              className="rounded-xl p-2 flex flex-col items-center transition active:scale-95"
              style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}` }}
            >
              <span className="text-lg">{c.flag}</span>
              <span className="text-[8px] font-bold mt-0.5" style={{ color: COLORS.textPrimary }}>{c.name}</span>
              <span className="text-[7px]" style={{ color: COLORS.textSecondary }}>{c.rooms} rooms</span>
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <p className="text-[10px] font-bold mb-2 px-1" style={{ color: COLORS.textSecondary }}>📂 Party Categories</p>
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.map((c, i) => (
            <button
              key={i}
              onClick={() => toast({ title: `Browsing ${c.name}...` })}
              className="rounded-xl p-2 flex flex-col items-center transition active:scale-95"
              style={{ background: `${c.color}10`, border: `1px solid ${c.color}25` }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{ background: `${c.color}20` }}>{c.icon}</div>
              <span className="text-[8px] font-bold mt-1" style={{ color: COLORS.textPrimary }}>{c.name}</span>
              <span className="text-[7px]" style={{ color: COLORS.textSecondary }}>{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* All rooms */}
      <div>
        <p className="text-[10px] font-bold mb-2 px-1" style={{ color: COLORS.textSecondary }}>🎉 All Party Rooms</p>
        <div className="grid grid-cols-2 gap-2.5">
          {PARTY_ROOMS.map((room) => (
            <PartyRoomCard key={room.id} room={room} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  );
}