import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { RELATIONSHIP_COLORS, HISTORY_FILTERS, formatDate, formatTime } from "./relationshipData";

const STATUS_STYLES = {
  accepted: { bg: "rgba(34,197,94,0.15)", color: "#86EFAC", icon: "✅" },
  rejected: { bg: "rgba(239,68,68,0.15)", color: "#FCA5A5", icon: "❌" },
  cancelled: { bg: "rgba(138,139,166,0.15)", color: "#C4B5D9", icon: "🚫" },
  ended: { bg: "rgba(244,63,94,0.15)", color: "#FDA4AF", icon: "💔" },
  pending: { bg: "rgba(252,211,77,0.15)", color: "#FCD34D", icon: "⏳" },
};

export default function HistoryTab() {
  const [filter, setFilter] = useState("sent");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, [filter]);

  const loadHistory = async () => {
    try {
      const all = await base44.entities.Relationship.list();
      let filtered = [];
      if (filter === "sent") filtered = all.filter((r) => r.is_own);
      else if (filter === "received") filtered = all.filter((r) => !r.is_own);
      else if (filter === "accepted") filtered = all.filter((r) => r.status === "accepted");
      else if (filter === "rejected") filtered = all.filter((r) => r.status === "rejected");
      else if (filter === "ended") filtered = all.filter((r) => r.status === "ended");
      filtered.sort((a, b) => new Date(b.created_date || 0) - new Date(a.created_date || 0));
      setItems(filtered);
    } catch (e) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {HISTORY_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`py-2 px-3 rounded-full text-[11px] font-bold whitespace-nowrap transition active:scale-95 ${filter === f.key ? "text-white" : ""}`}
            style={filter === f.key
              ? { background: "linear-gradient(135deg, #EC4899, #A855F7)" }
              : { background: RELATIONSHIP_COLORS.glassBg, border: `1px solid ${RELATIONSHIP_COLORS.glassBorder}`, color: RELATIONSHIP_COLORS.textMuted }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-7 h-7 border-2 border-pink-300 border-t-pink-500 rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center py-10">
          <span className="text-4xl mb-2">📋</span>
          <p className="text-sm font-semibold" style={{ color: RELATIONSHIP_COLORS.textMuted }}>No history found</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {items.map((item) => {
            const name = item.is_own ? item.receiver_name : item.sender_name;
            const avatar = item.is_own ? item.receiver_avatar : item.sender_avatar;
            const style = STATUS_STYLES[item.status] || STATUS_STYLES.pending;
            return (
              <div key={item.id} className="rounded-2xl p-3 backdrop-blur-xl flex items-center gap-3" style={{ background: RELATIONSHIP_COLORS.glassBg, border: `1px solid ${RELATIONSHIP_COLORS.glassBorder}` }}>
                <img src={avatar} className="w-11 h-11 rounded-full object-cover" alt="" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold" style={{ color: RELATIONSHIP_COLORS.textLight }}>{name}</span>
                  <p className="text-[10px]" style={{ color: RELATIONSHIP_COLORS.textMuted }}>{item.request_date} · {item.request_time}</p>
                  {item.end_date && <p className="text-[10px]" style={{ color: "#FDA4AF" }}>Ended: {item.end_date}</p>}
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1" style={{ background: style.bg, color: style.color }}>
                  {style.icon} {item.status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}