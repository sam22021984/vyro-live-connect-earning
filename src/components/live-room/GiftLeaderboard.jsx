import React, { useState, useEffect } from "react";
import { X, Trophy, Crown, TrendingUp, Gift } from "lucide-react";
import { COLORS } from "./roomData";
import { base44 } from "@/api/base44Client";

const RANK_COLORS = ["#D4AF37", "#C0C0C0", "#CD7F32"];
const PERIODS = [
  { id: "daily", label: "Daily", desc: "Resets every 24 hours" },
  { id: "weekly", label: "Weekly", desc: "Resets every 7 days" },
  { id: "monthly", label: "Monthly", desc: "Resets every month" },
];

export default function GiftLeaderboard({ onClose }) {
  const [tab, setTab] = useState("top_gifters");
  const [period, setPeriod] = useState("daily");
  const [data, setData] = useState({ top_gifters: [], top_receivers: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const transactions = await base44.entities.Transaction.filter(
          { type: "gift", status: "completed" },
          "-created_date",
          500
        );

        // Aggregate by sender (gifters) and recipient (receivers)
        const gifters = {};
        const receivers = {};
        (transactions || []).forEach((t) => {
          if (t.user_id) {
            gifters[t.user_id] = (gifters[t.user_id] || 0) + (t.coins || 0);
          }
          if (t.recipient_id) {
            receivers[t.recipient_id] = (receivers[t.recipient_id] || 0) + (t.coins || 0);
          }
        });

        const topGifters = Object.entries(gifters)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([uid, amount], i) => ({ user_id: uid, amount, rank: i + 1 }));

        const topReceivers = Object.entries(receivers)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([uid, amount], i) => ({ user_id: uid, amount, rank: i + 1 }));

        // Fetch user profiles for names/avatars
        const allUids = [...new Set([...topGifters.map((g) => g.user_id), ...topReceivers.map((r) => r.user_id)])];
        const profiles = await Promise.all(
          allUids.map((uid) => base44.entities.UserProfile.filter({ user_id: uid }).catch(() => []))
        );
        const profileMap = {};
        profiles.forEach((pl, i) => {
          if (pl && pl[0]) profileMap[allUids[i]] = pl[0];
        });

        const enrich = (entry) => {
          const p = profileMap[entry.user_id];
          return {
            name: p?.username || p?.full_name || "User",
            avatar: p?.avatar_url || "",
            amount: entry.amount,
            rank: entry.rank,
          };
        };

        setData({
          top_gifters: topGifters.map(enrich),
          top_receivers: topReceivers.map(enrich),
        });
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();

    // Real-time: re-fetch on any Transaction change
    const unsub = base44.entities.Transaction.subscribe(fetchLeaderboard);
    return () => unsub && unsub();
  }, []);

  const list = data[tab] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-t-3xl max-h-[80vh] overflow-y-auto scrollbar-hide animate-fadeIn"
        style={{ background: COLORS.tealDeep, border: `1px solid ${COLORS.gold}30`, boxShadow: "0 -8px 32px rgba(0,0,0,0.5)" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 pt-3 pb-2 px-4" style={{ background: COLORS.tealDeep }}>
          <div className="w-10 h-1 rounded-full mx-auto mb-2" style={{ background: `${COLORS.gold}40` }} />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy size={16} style={{ color: COLORS.gold }} />
              <h2 className="text-sm font-bold text-white">Gift Leaderboard</h2>
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
              <X size={14} style={{ color: COLORS.softGray }} />
            </button>
          </div>
        </div>

        <div className="px-4 pb-6 space-y-3">
          {/* Tab switcher */}
          <div className="flex gap-1.5">
            {[
              { key: "top_gifters", label: "Top Gifters", icon: Gift },
              { key: "top_receivers", label: "Top Receivers", icon: Crown },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-[10px] font-bold transition active:scale-95"
                style={tab === t.key
                  ? { background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})`, color: "#fff" }
                  : { background: "rgba(255,255,255,0.05)", color: COLORS.softGray, border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <t.icon size={12} />
                {t.label}
              </button>
            ))}
          </div>

          {/* Period selector */}
          <div className="flex gap-1.5">
            {PERIODS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className="flex-1 py-1.5 rounded-lg text-[9px] font-bold transition active:scale-95"
                style={period === p.id
                  ? { background: `${COLORS.electricBlue}30`, color: COLORS.electricBlue, border: `1px solid ${COLORS.electricBlue}40` }
                  : { background: "rgba(255,255,255,0.04)", color: COLORS.softGray, border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Live indicator */}
          <div className="flex items-center justify-center gap-1.5 py-1">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLORS.emerald }} />
            <span className="text-[9px]" style={{ color: COLORS.emerald }}>Live · Updates in real-time</span>
          </div>

          {/* Rankings */}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-2xl">🏆</span>
              <p className="text-[10px] mt-1" style={{ color: COLORS.softGray }}>No gift data yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {list.map((user, i) => {
                const rankColor = i < 3 ? RANK_COLORS[i] : COLORS.softGray;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl p-2.5 transition"
                    style={{
                      background: i < 3 ? `${rankColor}10` : "rgba(255,255,255,0.03)",
                      border: i < 3 ? `1px solid ${rankColor}30` : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {/* Rank */}
                    <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold" style={{
                      background: i < 3 ? rankColor : "rgba(255,255,255,0.08)",
                      color: i < 3 ? COLORS.tealDeep : COLORS.softGray,
                    }}>
                      {i < 3 ? <Crown size={13} fill={rankColor} className="text-white" /> : user.rank}
                    </div>

                    {/* Avatar */}
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" style={{ border: `2px solid ${i < 3 ? rankColor : "rgba(255,255,255,0.1)"}` }} />
                    ) : (
                      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: COLORS.tealMid, border: `2px solid ${i < 3 ? rankColor : "rgba(255,255,255,0.1)"}` }}>
                        <span className="text-[10px] font-bold text-white">{(user.name || "U")[0]}</span>
                      </div>
                    )}

                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[9px]" style={{ color: COLORS.softGray }}>
                        {tab === "top_gifters" ? "Gifted" : "Received"} {user.amount.toLocaleString()} coins
                      </p>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <span className="text-[8px]" style={{ color: COLORS.gold }}>🪙</span>
                        <span className="text-xs font-bold" style={{ color: COLORS.gold }}>{(user.amount / 1000).toFixed(0)}K</span>
                      </div>
                      {i === 0 && <TrendingUp size={10} style={{ color: COLORS.emerald, marginLeft: "auto" }} />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Info */}
          <div className="rounded-xl p-2.5 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[9px]" style={{ color: COLORS.softGray }}>
              {PERIODS.find((p) => p.id === period)?.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}