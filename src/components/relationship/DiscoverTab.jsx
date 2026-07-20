import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { base44 } from "@/api/base44Client";
import UserCard from "./UserCard";
import { RELATIONSHIP_COLORS, DISCOVER_FILTERS } from "./relationshipData";
import { useToast } from "@/components/ui/use-toast";

import { backendGateway } from "@/lib/backendGateway";
export default function DiscoverTab({ onSendRequest, existingRelations }) {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("recommended");

  useEffect(() => {
    loadUsers();
  }, [filter]);

  const loadUsers = async () => {
    try {
      let list = await backendGateway.readTable("user_profiles", { limit: 100, order: "created_at", ascending: true });
      if (!list) list = [];
      if (search.trim()) {
        const q = search.toLowerCase();
        list = list.filter((u) =>
          (u.username && u.username.toLowerCase().includes(q)) ||
          (u.user_id && u.user_id.toLowerCase().includes(q)) ||
          (u.country && u.country.toLowerCase().includes(q))
        );
      }
      if (filter === "online") list = list.filter((u) => u.is_online);
      if (filter === "active") list = list.filter((u) => (u.activity_score || 0) > 50);
      if (filter === "recommended") list = list.sort((a, b) => (b.activity_score || 0) - (a.activity_score || 0));
      setUsers(list.slice(0, 20));
    } catch (e) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setTimeout(loadUsers, 300);
  };

  const handleAction = (type, user) => {
    if (type === "request") {
      onSendRequest(user);
    } else if (type === "view") {
      toast({ title: "Viewing " + user.username + "'s profile" });
    } else if (type === "message") {
      toast({ title: "Opening chat with " + user.username });
    } else if (type === "gift") {
      toast({ title: "Opening gift gallery for " + user.username });
    }
  };

  const getRelStatus = (user) => {
    if (!existingRelations) return null;
    const rel = existingRelations.find(function (r) {
      return (r.receiver_id === user.id || r.sender_id === user.id) &&
             (r.status === "pending" || r.status === "accepted");
    });
    return rel ? rel.status : null;
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: RELATIONSHIP_COLORS.textMuted }} />
        <input
          value={search}
          onChange={handleSearch}
          placeholder="Search by User ID, Username, or Country..."
          className="w-full py-2.5 pl-9 pr-4 rounded-xl text-sm outline-none backdrop-blur-xl"
          style={{ background: RELATIONSHIP_COLORS.glassBg, border: "1px solid " + RELATIONSHIP_COLORS.glassBorder, color: RELATIONSHIP_COLORS.textLight }}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {DISCOVER_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={"py-2 px-3 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1 transition active:scale-95 " + (filter === f.key ? "text-white" : "")}
            style={filter === f.key
              ? { background: "linear-gradient(135deg, #EC4899, #A855F7)" }
              : { background: RELATIONSHIP_COLORS.glassBg, border: "1px solid " + RELATIONSHIP_COLORS.glassBorder, color: RELATIONSHIP_COLORS.textMuted }
            }
          >
            <span>{f.icon}</span> {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-7 h-7 border-2 border-pink-300 border-t-pink-500 rounded-full animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center py-10">
          <span className="text-4xl mb-2">🔍</span>
          <p className="text-sm font-semibold" style={{ color: RELATIONSHIP_COLORS.textMuted }}>No users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2.5">
          {users.map((u) => (
            <UserCard key={u.id} user={u} onAction={handleAction} relationshipStatus={getRelStatus(u)} />
          ))}
        </div>
      )}
    </div>
  );
}