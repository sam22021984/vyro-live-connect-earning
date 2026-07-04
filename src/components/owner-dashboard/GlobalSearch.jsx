import React, { useState } from "react";
import { Search, UserX, UserCheck, Shield, MessageSquare, ChevronRight, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { base44 } from "@/api/base44Client";

export default function GlobalSearch() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResults(null);
    try {
      const res = await base44.functions.invoke("userSearch", {
        action: "search",
        query: query.trim(),
      });
      const users = res.data?.users || [];
      if (users.length === 0) {
        setResults({ empty: true });
      } else {
        setResults({ users });
      }
    } catch (e) {
      toast({ title: "Search failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { label: "View Profile", icon: ChevronRight, color: "#2F80ED" },
    { label: "Suspend", icon: UserX, color: "#EB5757" },
    { label: "Reactivate", icon: UserCheck, color: "#27AE60" },
    { label: "Promote", icon: Shield, color: "#A78BFA" },
    { label: "Message", icon: MessageSquare, color: "#56CCF2" },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-2">
        <h3 className="text-base font-bold" style={{ color: "#0F1B3D" }}>Global Search Center</h3>
        <p className="text-[11px]" style={{ color: "#6B7280" }}>Search any entity across the platform</p>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="User ID, VYRO ID, email, phone..."
            className="w-full py-2.5 pl-9 pr-3 rounded-xl text-xs outline-none"
            style={{ border: "1px solid #E5E7EB", background: "#FFFFFF", color: "#0F1B3D" }}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 rounded-xl text-xs font-bold text-white active:scale-95 transition disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #2F80ED, #56CCF2)" }}
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {results?.empty && (
        <div className="text-center py-12 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
          <Search size={32} className="mx-auto mb-2" style={{ color: "#9CA3AF" }} />
          <p className="text-[11px]" style={{ color: "#6B7280" }}>No users found for "{query}"</p>
        </div>
      )}

      {results?.users && (
        <div className="space-y-3">
          <p className="text-[10px] px-1" style={{ color: "#6B7280" }}>{results.users.length} user{results.users.length !== 1 ? "s" : ""} found</p>
          {results.users.map((u) => (
            <div key={u.id} className="rounded-2xl p-4" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {u.avatar_url ? (
                    <img src={u.avatar_url} alt={u.username} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#2F80ED15" }}>
                      <User size={18} style={{ color: "#2F80ED" }} />
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold" style={{ color: "#0F1B3D" }}>{u.username || u.full_name || "Unknown"}</h4>
                    <p className="text-[10px]" style={{ color: "#9CA3AF" }}>{u.global_id || "—"} · {u.country || "—"}</p>
                  </div>
                </div>
                <span className="text-[9px] px-2 py-1 rounded-full font-bold" style={{ background: "#27AE6015", color: "#27AE60" }}>
                  {u.is_verified ? "Verified" : "Active"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: "Followers", value: (u.followers || 0).toLocaleString() },
                  { label: "Country", value: u.country || "—" },
                  { label: "VIP", value: u.is_vip ? "Yes" : "No" },
                  { label: "Verified", value: u.is_verified ? "Yes" : "No" },
                ].map((f, i) => (
                  <div key={i} className="rounded-lg p-2" style={{ background: "#F7F9FC" }}>
                    <p className="text-[8px]" style={{ color: "#9CA3AF" }}>{f.label}</p>
                    <p className="text-xs font-bold" style={{ color: "#0F1B3D" }}>{f.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickActions.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => toast({ title: a.label + " — " + (u.username || u.full_name || "User") })}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-bold active:scale-95 transition"
                    style={{ background: `${a.color}10`, color: a.color, border: `1px solid ${a.color}20` }}
                  >
                    <a.icon size={11} /> {a.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}