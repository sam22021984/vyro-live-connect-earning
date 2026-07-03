import React, { useState } from "react";
import {
  TrendingUp, TrendingDown, Sparkles, BadgeCheck, AlertTriangle,
  CheckCircle, ThumbsUp, Crown, Star, History as HistoryIcon, Download, Search,
} from "lucide-react";
import { TRUST_HISTORY } from "./trustData";

const ICONS = {
  TrendingUp, TrendingDown, Sparkles, BadgeCheck, AlertTriangle,
  CheckCircle, ThumbsUp, Crown, Star,
};

const WHITE = "#FFFFFF";
const DARK = "#1F2937";
const GRAY = "#6B7280";

const FILTERS = ["All", "Score Changes", "Badges", "Warnings", "Verification", "Reports"];

export default function HistoryTab({ onAction }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = TRUST_HISTORY.filter(h => {
    const matchesSearch = !search || h.title.toLowerCase().includes(search.toLowerCase()) || h.detail.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || h.type.toLowerCase().includes(filter.toLowerCase().slice(0, -1));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex gap-2">
        <button onClick={() => onAction("Export History")} className="flex-1 py-2.5 rounded-2xl text-[11px] font-bold active:scale-95 transition flex items-center justify-center gap-1.5" style={{ background: WHITE, border: "1px solid #F0F1F5", color: DARK }}>
          <Download size={14} /> Export
        </button>
        <button onClick={() => onAction("Search History")} className="flex-1 py-2.5 rounded-2xl text-[11px] font-bold active:scale-95 transition flex items-center justify-center gap-1.5" style={{ background: WHITE, border: "1px solid #F0F1F5", color: DARK }}>
          <Search size={14} /> Advanced Search
        </button>
      </div>

      {/* Search */}
      <div className="rounded-2xl p-2 flex items-center gap-2" style={{ background: WHITE, border: "1px solid #F0F1F5" }}>
        <Search size={16} style={{ color: GRAY }} className="ml-1" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search history..."
          className="flex-1 bg-transparent text-xs outline-none"
          style={{ color: DARK }}
        />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} className="flex-shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold active:scale-95 transition" style={{ background: filter === f ? "#2F80ED" : "#F9FAFB", color: filter === f ? "#FFF" : DARK, border: `1px solid ${filter === f ? "#2F80ED" : "#F0F1F5"}` }}>
            {f}
          </button>
        ))}
      </div>

      {/* History List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded-2xl p-8 text-center" style={{ background: WHITE, border: "1px solid #F0F1F5" }}>
            <HistoryIcon size={32} style={{ color: "#D1D5DB" }} className="mx-auto mb-2" />
            <p className="text-xs font-semibold" style={{ color: DARK }}>No history found</p>
            <p className="text-[10px]" style={{ color: GRAY }}>Try a different search or filter</p>
          </div>
        ) : (
          filtered.map((h, i) => {
            const Icon = ICONS[h.icon] || TrendingUp;
            return (
              <div key={i} className="rounded-2xl p-3 flex items-start gap-3" style={{ background: WHITE, border: "1px solid #F0F1F5", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${h.color}12` }}>
                  <Icon size={16} style={{ color: h.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${h.color}10`, color: h.color }}>{h.type}</span>
                  </div>
                  <p className="text-xs font-bold mt-1" style={{ color: DARK }}>{h.title}</p>
                  <p className="text-[10px]" style={{ color: GRAY }}>{h.detail}</p>
                  <p className="text-[9px] mt-1" style={{ color: GRAY }}>{h.date} • {h.time}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}