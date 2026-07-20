import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, TrendingUp, Hash, Users, Eye, X, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

import { backendGateway } from "@/lib/backendGateway";
const CATEGORIES = [
  { name: "Music", icon: "🎵", color: "#EC4899" },
  { name: "Gaming", icon: "🎮", color: "#8B5CF6" },
  { name: "Podcast", icon: "🎙️", color: "#10B981" },
  { name: "Comedy", icon: "😂", color: "#F59E0B" },
  { name: "Education", icon: "📚", color: "#3B82F6" },
  { name: "Sports", icon: "⚽", color: "#EF4444" },
  { name: "Travel", icon: "✈️", color: "#06B6D4" },
  { name: "Fashion", icon: "👗", color: "#D946EF" },
  { name: "Lifestyle", icon: "🌟", color: "#8B5CF6" },
  { name: "Technology", icon: "💻", color: "#6366F1" },
  { name: "Entertainment", icon: "🎬", color: "#F43F5E" },
  { name: "Dance", icon: "💃", color: "#F97316" },
];

const TRENDING_HASHTAGS = [
  { tag: "Music", posts: "12.5K" },
  { tag: "Gaming", posts: "8.3K" },
  { tag: "Funny", posts: "15.1K" },
  { tag: "Podcast", posts: "3.2K" },
  { tag: "LiveShow", posts: "6.7K" },
  { tag: "Dance", posts: "9.8K" },
  { tag: "PK", posts: "4.5K" },
  { tag: "NewCreators", posts: "2.1K" },
];

export default function Discover() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [liveRooms, setLiveRooms] = useState([]);
  const [topCreators, setTopCreators] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recent, setRecent] = useState(JSON.parse(localStorage.getItem("vyro_discover_recent") || "[]"));

  useEffect(() => {
    const load = async () => {
      try {
        const [live, creators, users] = await Promise.all([
          backendGateway.readTable("room_sessions", { filter: { status: "live" }, limit: 10, order: "current_viewers", ascending: false }).catch(() => []),
          backendGateway.readTable("user_profiles", { filter: { is_host: true }, limit: 10, order: "followers", ascending: false }).catch(() => []),
          backendGateway.readTable("user_profiles", { limit: 8, order: "created_date", ascending: false }).catch(() => []),
        ]);
        setLiveRooms(live || []);
        setTopCreators(creators || []);
        setNewUsers(users || []);
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  // Live search
  useEffect(() => {
    if (!search.trim()) { setSearchResults([]); return; }
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const users = await backendGateway.readTable("user_profiles", { filter: { username: search }, limit: 100, order: "created_at", ascending: true }).catch(() => []);
        setSearchResults(users.slice(0, 10));
      } catch { setSearchResults([]); }
      setSearching(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const saveRecent = (term) => {
    const updated = [term, ...recent.filter((r) => r !== term)].slice(0, 6);
    setRecent(updated);
    localStorage.setItem("vyro_discover_recent", JSON.stringify(updated));
  };

  const handleSearch = (term) => {
    if (!term.trim()) return;
    saveRecent(term);
    setSearch(term);
  };

  const filteredLive = activeCategory
    ? liveRooms.filter((r) => r.category?.toLowerCase() === activeCategory.toLowerCase())
    : liveRooms;

  return (
    <div className="min-h-screen bg-[#F8F9FC] pb-20">
      <div className="max-w-md mx-auto">
        {/* Search bar */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-50 px-3 pt-12 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search users, rooms, hashtags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(search)}
                className="w-full pl-10 pr-10 rounded-2xl bg-gray-50 text-sm outline-none"
                style={{ height: "44px" }}
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X size={16} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Search results dropdown */}
          {search && (
            <div className="mt-2">
              {searching && <p className="text-xs text-gray-400 px-2 py-1">Searching...</p>}
              {!searching && searchResults.length > 0 && (
                <div className="space-y-1">
                  {searchResults.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => navigate(`/profile/${u.id}`)}
                      className="w-full flex items-center gap-3 p-2 rounded-xl active:bg-gray-50 transition"
                    >
                      <img src={u.avatar_url || `https://ui-avatars.com/api/?name=${u.username}`} alt="" className="w-9 h-9 rounded-full object-cover bg-gray-100" />
                      <div className="text-left flex-1">
                        <p className="text-xs font-semibold text-gray-700">{u.username}</p>
                        <p className="text-[10px] text-gray-400">{u.followers || 0} followers · {u.country || "Unknown"}</p>
                      </div>
                      <ArrowRight size={14} className="text-gray-300" />
                    </button>
                  ))}
                </div>
              )}
              {!searching && searchResults.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-3">No results found for "{search}"</p>
              )}
            </div>
          )}
        </div>

        {!search && (
          <>
            {/* Recent searches */}
            {recent.length > 0 && (
              <div className="px-3 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-gray-500">Recent Searches</p>
                  <button onClick={() => { setRecent([]); localStorage.removeItem("vyro_discover_recent"); }} className="text-[10px] text-gray-400">Clear</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recent.map((r, i) => (
                    <button key={i} onClick={() => setSearch(r)} className="px-3 py-1.5 rounded-full bg-gray-50 text-xs font-medium text-gray-600 active:scale-95">
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="px-3 pt-3">
              <p className="text-xs font-bold text-gray-500 mb-2">Browse Categories</p>
              <div className="grid grid-cols-4 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                    className={`flex flex-col items-center gap-1 p-2.5 rounded-2xl transition active:scale-95 ${
                      activeCategory === cat.name ? "bg-purple-50 ring-2 ring-purple-300" : "bg-white border border-gray-50"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: `${cat.color}15` }}>
                      {cat.icon}
                    </div>
                    <span className="text-[10px] font-medium text-gray-600">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending hashtags */}
            <div className="px-3 pt-4">
              <p className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5"><TrendingUp size={12} /> Trending Hashtags</p>
              <div className="flex flex-wrap gap-2">
                {TRENDING_HASHTAGS.map((h) => (
                  <button
                    key={h.tag}
                    onClick={() => navigate("/community-dashboard")}
                    className="px-3 py-1.5 rounded-full bg-white border border-gray-50 shadow-sm text-xs font-medium text-purple-600 active:scale-95"
                  >
                    #{h.tag} <span className="text-gray-400">{h.posts}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular live rooms */}
            <div className="pt-4">
              <div className="flex items-center justify-between px-3 mb-2">
                <h2 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  {activeCategory ? `${activeCategory} Live` : "Popular Live Rooms"}
                </h2>
                {activeCategory && (
                  <button onClick={() => setActiveCategory(null)} className="text-[10px] font-semibold text-gray-400">Clear filter</button>
                )}
              </div>
              <div className="flex gap-2.5 px-3 overflow-x-auto scrollbar-hide pb-1">
                {filteredLive.length === 0 ? (
                  <p className="text-xs text-gray-400 px-1 py-4">{loading ? "Loading..." : "No live rooms in this category"}</p>
                ) : (
                  filteredLive.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => navigate(`/live-room/${room.id}`)}
                      className="flex-shrink-0 w-36 rounded-2xl overflow-hidden bg-white border border-gray-50 shadow-sm active:scale-95 transition text-left"
                    >
                      <div className="relative h-40 bg-gradient-to-br from-purple-200 to-blue-200">
                        {room.host_avatar && <img src={room.host_avatar} alt="" className="w-full h-full object-cover" />}
                        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-red-500 text-white text-[8px] font-bold">LIVE</div>
                        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-black/50 text-white text-[8px] font-bold flex items-center gap-0.5">
                          <Eye size={8} /> {room.current_viewers || 0}
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-bold text-gray-800 truncate">{room.host_name || "Host"}</p>
                        <p className="text-[10px] text-gray-400 truncate">{room.category || "Live"}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Top creators */}
            <div className="pt-4">
              <div className="flex items-center justify-between px-3 mb-2">
                <h2 className="text-sm font-bold text-gray-800 flex items-center gap-1.5"><Users size={14} className="text-blue-500" /> Top Creators</h2>
                <button className="text-[10px] font-semibold text-purple-500">See All</button>
              </div>
              <div className="flex gap-2.5 px-3 overflow-x-auto scrollbar-hide pb-1">
                {topCreators.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => navigate(`/profile/${c.id}`)}
                    className="flex-shrink-0 w-28 rounded-2xl bg-white border border-gray-50 shadow-sm active:scale-95 transition p-2 text-center"
                  >
                    <img
                      src={c.avatar_url || `https://ui-avatars.com/api/?name=${c.username}`}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover mx-auto bg-gray-100 mb-1.5"
                    />
                    <p className="text-xs font-bold text-gray-800 truncate">{c.username}</p>
                    <p className="text-[9px] text-gray-400">{c.followers || 0} followers</p>
                  </button>
                ))}
              </div>
            </div>

            {/* New users */}
            <div className="pt-4">
              <h2 className="text-sm font-bold text-gray-800 px-3 mb-2">✨ New Users</h2>
              <div className="flex gap-2.5 px-3 overflow-x-auto scrollbar-hide pb-1">
                {newUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => navigate(`/profile/${u.id}`)}
                    className="flex-shrink-0 w-24 rounded-2xl bg-white border border-gray-50 shadow-sm active:scale-95 transition p-2 text-center"
                  >
                    <img
                      src={u.avatar_url || `https://ui-avatars.com/api/?name=${u.username}`}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover mx-auto bg-gray-100 mb-1"
                    />
                    <p className="text-[10px] font-bold text-gray-700 truncate">{u.username}</p>
                    <p className="text-[8px] text-gray-400">{u.country || "New"}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Nearby users placeholder */}
            <div className="px-3 pt-4">
              <div className="rounded-2xl p-4 bg-gradient-to-r from-blue-400 to-cyan-500 text-white text-center active:scale-[0.98] transition"
                onClick={() => navigate("/social")}>
                <p className="text-sm font-bold">📍 Discover Nearby Users</p>
                <p className="text-[10px] text-white/80">Find people around you</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}