import React from "react";
import { Trophy, Crown, Star, Award, Swords, Radio, Mic, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ACHIEVEMENTS = [
  { name: "Level Badge", icon: "🏅", color: "#8B5CF6", unlocked: true },
  { name: "Event Medal", icon: "🥇", color: "#F59E0B", unlocked: true },
  { name: "Creator Award", icon: "🎬", color: "#EF4444", unlocked: false },
  { name: "PK Award", icon: "⚔️", color: "#DC2626", unlocked: false },
  { name: "Live Award", icon: "📡", color: "#3B82F6", unlocked: true },
  { name: "Audio Award", icon: "🎤", color: "#6366F1", unlocked: false },
  { name: "VIP Milestone", icon: "👑", color: "#F59E0B", unlocked: false },
  { name: "Login Streak", icon: "📅", color: "#06B6D4", unlocked: true },
];

export default function MyAchievements({ achievements }) {
  const { toast } = useToast();
  const display = achievements?.length > 0 ? achievements : ACHIEVEMENTS;

  return (
    <div className="px-3 pt-4">
      <h2 className="text-sm font-bold text-gray-800 mb-2 px-1 flex items-center gap-1.5"><Trophy size={14} className="text-amber-500" /> Achievements</h2>
      <div className="grid grid-cols-4 gap-2">
        {display.map((ach, i) => {
          const unlocked = ach.unlocked !== false;
          return (
            <button
              key={i}
              onClick={() => toast({ title: unlocked ? `${ach.name} - Tap to view details` : `${ach.name} - Locked` })}
              className={`flex flex-col items-center gap-1 p-2 rounded-2xl border shadow-sm active:scale-95 transition ${unlocked ? "bg-white border-gray-50" : "bg-gray-50 border-gray-50 opacity-50"}`}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: `${ach.color || "#8B5CF6"}15` }}>
                {unlocked ? ach.icon : "🔒"}
              </div>
              <span className="text-[8px] font-bold text-gray-600 text-center">{ach.name || ach.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}