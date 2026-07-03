import React from "react";
import { useNavigate } from "react-router-dom";
import { Hash, Calendar, ChevronRight } from "lucide-react";

const HASHTAGS = [
  { tag: "Music", posts: "12.5K", color: "#EC4899" },
  { tag: "Gaming", posts: "8.3K", color: "#8B5CF6" },
  { tag: "Funny", posts: "15.1K", color: "#F59E0B" },
  { tag: "Podcast", posts: "3.2K", color: "#10B981" },
  { tag: "LiveShow", posts: "6.7K", color: "#3B82F6" },
  { tag: "Dance", posts: "9.8K", color: "#EF4444" },
];

const EVENTS = [
  { name: "Music Competition", desc: "Show your talent & win 10K coins", icon: "🎵", color: "from-purple-400 to-pink-500", countdown: "2d 4h" },
  { name: "PK Battle Championship", desc: "Ultimate streaming showdown", icon: "⚔️", color: "from-blue-400 to-cyan-500", countdown: "5h 30m" },
  { name: "Lucky Wheel", desc: "Spin & win daily prizes", icon: "🎡", color: "from-amber-400 to-orange-500", countdown: "Live Now" },
  { name: "Eid Festival", desc: "Special rewards & celebrations", icon: "🌙", color: "from-green-400 to-emerald-500", countdown: "3d 12h" },
];

export function TrendingHashtags() {
  const navigate = useNavigate();
  return (
    <div className="pt-4">
      <h2 className="text-sm font-bold text-gray-800 px-3 mb-2 flex items-center gap-1.5"><Hash size={14} className="text-purple-500" /> Trending Hashtags</h2>
      <div className="flex gap-2 px-3 overflow-x-auto scrollbar-hide pb-1">
        {HASHTAGS.map((h) => (
          <button
            key={h.tag}
            onClick={() => navigate("/community-dashboard")}
            className="flex-shrink-0 px-3 py-2 rounded-xl bg-white border border-gray-50 shadow-sm active:scale-95 transition text-left"
          >
            <p className="text-xs font-bold" style={{ color: h.color }}>#{h.tag}</p>
            <p className="text-[9px] text-gray-400">{h.posts} posts</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export function TrendingEvents() {
  const navigate = useNavigate();
  return (
    <div className="pt-4">
      <h2 className="text-sm font-bold text-gray-800 px-3 mb-2 flex items-center gap-1.5"><Calendar size={14} className="text-purple-500" /> Trending Events</h2>
      <div className="flex gap-2.5 px-3 overflow-x-auto scrollbar-hide pb-1">
        {EVENTS.map((e) => (
          <button
            key={e.name}
            onClick={() => navigate("/tasks-rewards")}
            className={`flex-shrink-0 w-44 rounded-2xl p-3 bg-gradient-to-br ${e.color} text-white text-left active:scale-95 transition relative overflow-hidden`}
          >
            <div className="absolute right-0 top-0 text-4xl opacity-20 -mr-1 -mt-1">{e.icon}</div>
            <div className="relative">
              <span className="text-2xl">{e.icon}</span>
              <h3 className="text-xs font-bold mt-1">{e.name}</h3>
              <p className="text-[9px] text-white/80">{e.desc}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="px-1.5 py-0.5 rounded-md bg-white/20 text-[8px] font-bold">{e.countdown}</span>
                <ChevronRight size={12} className="text-white/60" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}