import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, TrendingUp, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";

const TRENDING_SEARCHES = ["Live Music", "Gaming", "PK Battle", "Comedy", "New Creators", "Party Rooms"];
const SEARCH_CATEGORIES = [
  { label: "Users", icon: "👤" },
  { label: "Live Rooms", icon: "📺" },
  { label: "Audio Rooms", icon: "🎧" },
  { label: "Party Rooms", icon: "🎉" },
  { label: "Videos", icon: "🎬" },
  { label: "Posts", icon: "📝" },
  { label: "Hashtags", icon: "#" },
  { label: "Agencies", icon: "🏢" },
  { label: "Families", icon: "👨‍👩‍👧" },
  { label: "Events", icon: "🎪" },
];

export default function HomeSearchOverlay({ onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [recent, setRecent] = useState(JSON.parse(localStorage.getItem("vyro_recent_searches") || "[]"));

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const users = await base44.entities.UserProfile.filter({ username: query }).catch(() => []);
        setResults(users.slice(0, 8));
      } catch { setResults([]); }
      setSearching(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const saveRecent = (term) => {
    const updated = [term, ...recent.filter((r) => r !== term)].slice(0, 8);
    setRecent(updated);
    localStorage.setItem("vyro_recent_searches", JSON.stringify(updated));
  };

  const handleSearch = (term) => {
    if (!term.trim()) return;
    saveRecent(term);
    setQuery(term);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fadeIn">
      {/* Search bar */}
      <div className="flex items-center gap-2 px-3 pt-12 pb-3 border-b border-gray-50">
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-90">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users, rooms, hashtags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            className="w-full pl-11 pr-10 rounded-2xl bg-gray-50 text-sm outline-none"
            style={{ height: "44px" }}
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={16} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3">
        {/* Results */}
        {query && results.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-500 mb-2">Results</p>
            {results.map((u) => (
              <button
                key={u.id}
                onClick={() => navigate(`/profile/${u.id}`)}
                className="w-full flex items-center gap-3 py-2.5 active:bg-gray-50 rounded-xl transition"
              >
                <img src={u.avatar_url || `https://ui-avatars.com/api/?name=${u.username}`} alt="" className="w-10 h-10 rounded-full object-cover bg-gray-100" />
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold text-gray-700">{u.username}</p>
                  <p className="text-[10px] text-gray-400">{u.followers || 0} followers · {u.country || "Unknown"}</p>
                </div>
                <ArrowRight size={16} className="text-gray-300" />
              </button>
            ))}
          </div>
        )}

        {query && !searching && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400 mb-1">No Results Found</p>
            <p className="text-xs text-gray-300">Try a different search term</p>
          </div>
        )}

        {/* Recent searches */}
        {!query && recent.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><Clock size={12} /> Recent Searches</p>
              <button onClick={() => { setRecent([]); localStorage.removeItem("vyro_recent_searches"); }} className="text-[10px] text-gray-400">Clear</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recent.map((r, i) => (
                <button key={i} onClick={() => setQuery(r)} className="px-3 py-1.5 rounded-full bg-gray-50 text-xs font-medium text-gray-600 active:scale-95">
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trending searches */}
        {!query && (
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5"><TrendingUp size={12} /> Trending Searches</p>
            <div className="flex flex-wrap gap-2">
              {TRENDING_SEARCHES.map((t, i) => (
                <button key={i} onClick={() => setQuery(t)} className="px-3 py-1.5 rounded-full bg-purple-50 text-xs font-medium text-purple-600 active:scale-95">
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {!query && (
          <div>
            <p className="text-xs font-bold text-gray-500 mb-2">Browse Categories</p>
            <div className="grid grid-cols-2 gap-2">
              {SEARCH_CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  onClick={onClose}
                  className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 active:scale-95 transition"
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-xs font-medium text-gray-600">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}