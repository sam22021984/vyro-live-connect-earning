import React from "react";
import { Loader2 } from "lucide-react";
import { COLORS } from "./partyData";
import { usePartySocial } from "@/hooks/usePartySocial";
import PartyRoomCard from "./PartyRoomCard";
import { useToast } from "@/components/ui/use-toast";

export default function ExploreTab({ rooms = [], loading, onSelect }) {
  const { toast } = useToast();
  const { exploreCountries, categories } = usePartySocial();

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold px-1" style={{ color: COLORS.textPrimary }}>🧭 Explore Party Rooms</h3>

      <div>
        <p className="text-[10px] font-bold mb-2 px-1" style={{ color: COLORS.textSecondary }}>🌍 By Country</p>
        {exploreCountries.length === 0 ? (
          <p className="text-[10px] text-center py-2" style={{ color: COLORS.textSecondary }}>No country data yet</p>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {exploreCountries.map((c, i) => (
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
        )}
      </div>

      <div>
        <p className="text-[10px] font-bold mb-2 px-1" style={{ color: COLORS.textSecondary }}>📂 Party Categories</p>
        {categories.length === 0 ? (
          <p className="text-[10px] text-center py-2" style={{ color: COLORS.textSecondary }}>No categories yet</p>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {categories.map((c, i) => (
              <button
                key={i}
                onClick={() => toast({ title: `Browsing ${c.name}...` })}
                className="rounded-xl p-2 flex flex-col items-center transition active:scale-95"
                style={{ background: `${COLORS.royalBlue}10`, border: `1px solid ${COLORS.royalBlue}25` }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{ background: `${COLORS.royalBlue}20` }}>{c.icon}</div>
                <span className="text-[8px] font-bold mt-1" style={{ color: COLORS.textPrimary }}>{c.name}</span>
                <span className="text-[7px]" style={{ color: COLORS.textSecondary }}>{c.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-[10px] font-bold mb-2 px-1" style={{ color: COLORS.textSecondary }}>🎉 All Party Rooms</p>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: COLORS.royalBlue }} />
          </div>
        ) : rooms.length === 0 ? (
          <p className="text-center text-xs py-8" style={{ color: COLORS.textSecondary }}>No rooms available</p>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {rooms.map((room) => (
              <PartyRoomCard key={room.id} room={room} onSelect={onSelect} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}