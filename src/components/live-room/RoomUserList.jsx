import React, { useState } from "react";
import { X, Search, Crown, Mic, MicOff, Users } from "lucide-react";
import { COLORS } from "./roomData";

export default function RoomUserList({ viewerCount, seats = [], audience = [], onClose, onUserClick }) {
  const [tab, setTab] = useState("seated");
  const [search, setSearch] = useState("");

  const seatedUsers = seats.filter((s) => s.user).map((s) => ({ ...s.user, seatId: s.id, role: s.role }));
  const allUsers = [...seatedUsers, ...audience];
  const filtered = allUsers.filter((u) => (u.name || "").toLowerCase().includes(search.toLowerCase()));

  const displayUsers = tab === "seated" ? seatedUsers : filtered;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-t-3xl max-h-[80vh] overflow-hidden animate-fadeIn flex flex-col"
        style={{ background: COLORS.tealDeep, border: `1px solid ${COLORS.gold}30`, boxShadow: "0 -8px 32px rgba(0,0,0,0.5)" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 pt-3 pb-2 px-4" style={{ background: COLORS.tealDeep }}>
          <div className="w-10 h-1 rounded-full mx-auto mb-2" style={{ background: `${COLORS.gold}40` }} />
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users size={16} style={{ color: COLORS.gold }} />
              <h2 className="text-sm font-bold text-white">Room Members</h2>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${COLORS.gold}20`, color: COLORS.gold }}>
                {viewerCount.toLocaleString()}
              </span>
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
              <X size={14} style={{ color: COLORS.softGray }} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1.5 mb-2">
            <button
              onClick={() => setTab("seated")}
              className="flex-1 py-1.5 rounded-lg text-[10px] font-bold transition active:scale-95"
              style={tab === "seated"
                ? { background: `${COLORS.gold}25`, color: COLORS.gold, border: `1px solid ${COLORS.gold}40` }
                : { background: "rgba(255,255,255,0.04)", color: COLORS.softGray, border: "1px solid rgba(255,255,255,0.06)" }}
            >
              🎙️ On Seats ({seatedUsers.length})
            </button>
            <button
              onClick={() => setTab("all")}
              className="flex-1 py-1.5 rounded-lg text-[10px] font-bold transition active:scale-95"
              style={tab === "all"
                ? { background: `${COLORS.gold}25`, color: COLORS.gold, border: `1px solid ${COLORS.gold}40` }
                : { background: "rgba(255,255,255,0.04)", color: COLORS.softGray, border: "1px solid rgba(255,255,255,0.06)" }}
            >
              👥 All ({viewerCount.toLocaleString()})
            </button>
          </div>

          {/* Search (all tab only) */}
          {tab === "all" && (
            <div className="relative mb-1">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: COLORS.softGray }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search members..."
                className="w-full pl-7 pr-3 py-1.5 rounded-lg text-[10px] text-white placeholder:text-white/30"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            </div>
          )}
        </div>

        {/* User list */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-6 space-y-1.5">
          {displayUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[10px]" style={{ color: COLORS.softGray }}>No members found</p>
            </div>
          )}
          {displayUsers.map((u, i) => (
            <button
              key={u.user_id || i}
              onClick={() => onUserClick(u)}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl transition active:scale-[0.98]"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-0.5 rounded-full" style={{ background: u.is_host || u.vip ? `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})` : "transparent" }} />
                {u.avatar ? (
                  <img src={u.avatar} className="relative w-9 h-9 rounded-full object-cover" alt={u.name} />
                ) : (
                  <div className="relative w-9 h-9 rounded-full flex items-center justify-center" style={{ background: COLORS.tealMid }}>
                    <span className="text-[10px] font-bold text-white">{(u.name || "U")[0]}</span>
                  </div>
                )}
                {u.is_online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full" style={{ background: COLORS.emerald, border: `1.5px solid ${COLORS.tealDeep}` }} />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-1">
                  {u.is_host && <Crown size={10} style={{ color: COLORS.gold }} fill={COLORS.gold} />}
                  <span className="text-[11px] font-bold text-white truncate">{u.name}</span>
                  {u.vip && (
                    <span className="text-[7px] font-bold text-white px-1 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})` }}>
                      {u.vip}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[8px] font-bold px-1 py-0.5 rounded-full" style={{ background: `${COLORS.electricBlue}20`, color: COLORS.electricBlue }}>
                    LV.{u.level}
                  </span>
                  {u.country && <span className="text-[9px]">{u.country}</span>}
                  {u.vyro_id && <span className="text-[8px]" style={{ color: COLORS.softGray }}>ID: {u.vyro_id}</span>}
                </div>
              </div>
              {u.seatId !== undefined && (
                <div className="flex items-center gap-1">
                  {u.muted ? <MicOff size={11} style={{ color: COLORS.crimson }} /> : <Mic size={11} style={{ color: COLORS.emerald }} />}
                  <span className="text-[8px] font-bold" style={{ color: COLORS.gold }}>Seat {u.seatId}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}