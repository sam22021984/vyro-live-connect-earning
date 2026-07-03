import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, Gift, Eye } from "lucide-react";
import { leaderboardCategories, rankingPeriods, COLORS } from "./profileStatsData";

export default function LeaderboardTab({ leaderboard = [], currentUserId }) {
  const [cat, setCat] = useState("users");
  const [period, setPeriod] = useState("alltime");
  const [following, setFollowing] = useState([]);
  const { toast } = useToast();

  // Map backend UserProfile records to leaderboard entries
  const buildList = () => {
    const sortKey = {
      users: "total_xp",
      gifters: "gifts_sent",
      hosts: "host_xp",
      vip: "total_xp",
    }[cat] || "total_xp";

    const sorted = [...leaderboard].sort((a, b) => (b[sortKey] || 0) - (a[sortKey] || 0));
    return sorted.slice(0, 20).map((p, i) => ({
      id: p.id,
      rank: i + 1,
      name: p.username || "User",
      avatar: p.avatar_url || null,
      points: p[sortKey] || 0,
      isCurrentUser: p.user_id === currentUserId || p.created_by_id === currentUserId,
    }));
  };

  const list = buildList();

  const handleFollow = (user) => {
    if (following.includes(user.id)) {
      setFollowing(following.filter((id) => id !== user.id));
      toast({ title: "Unfollowed", description: user.name });
    } else {
      setFollowing([...following, user.id]);
      toast({ title: "✅ Following!", description: `You are now following ${user.name}.` });
    }
  };

  const handleGift = (user) => {
    toast({ title: "🎁 Gift Panel", description: `Opening gift panel for ${user.name}.` });
  };

  const handleProfile = (user) => {
    if (user.id) {
      window.location.href = `/profile/${user.id}`;
    }
  };

  const Avatar = ({ user, size = 9, border }) => (
    user.avatar ? (
      <img src={user.avatar} alt="" className={`w-${size} h-${size} rounded-full object-cover`} style={{ border }} onError={(e) => { e.target.style.display = "none"; }} />
    ) : (
      <div className={`w-${size} h-${size} rounded-full flex items-center justify-center text-sm font-bold`} style={{ background: `${COLORS.primary}20`, color: COLORS.primary, border }}>
        {user.name?.[0]?.toUpperCase() || "U"}
      </div>
    )
  );

  return (
    <div>
      {/* Category tabs */}
      <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
        {leaderboardCategories.filter(c => ["users", "gifters", "hosts", "vip"].includes(c.key)).map((c) => (
          <button key={c.key} onClick={() => setCat(c.key)}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap active:scale-95 transition flex items-center gap-1.5 ${cat === c.key ? "text-white" : ""}`}
            style={cat === c.key ? { background: COLORS.primary } : { background: COLORS.cardBg, color: COLORS.muted, border: "1px solid #EEF0F4" }}>
            <span>{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

      {/* Ranking period */}
      <div className="flex gap-1.5 mb-3 overflow-x-auto scrollbar-hide">
        {rankingPeriods.map((p) => (
          <button key={p.key} onClick={() => setPeriod(p.key)}
            className={`py-1.5 px-3 rounded-lg text-[10px] font-bold whitespace-nowrap active:scale-95 transition ${period === p.key ? "text-white" : ""}`}
            style={period === p.key ? { background: COLORS.navy } : { background: COLORS.cardBg, color: COLORS.muted }}>
            {p.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl p-8 text-center" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
          <span className="text-3xl block mb-2">🏆</span>
          <p className="text-xs font-bold" style={{ color: COLORS.navy }}>No Rankings Yet</p>
          <p className="text-[10px] mt-1" style={{ color: COLORS.muted }}>Leaderboard will populate as users join</p>
        </div>
      ) : (
        <>
          {/* Top 3 podium */}
          {list.length >= 3 && (
            <div className="flex items-end justify-center gap-2 mb-4">
              {/* 2nd place */}
              <button onClick={() => handleProfile(list[1])} className="flex flex-col items-center active:scale-95 transition" style={{ marginBottom: "8px" }}>
                <div className="w-12 h-12 rounded-full mb-1 flex items-center justify-center text-xl font-bold" style={{ background: `${COLORS.muted}20`, border: `2px solid ${COLORS.muted}`, color: COLORS.navy }}>
                  {list[1].name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-[10px] font-bold truncate max-w-[60px]" style={{ color: COLORS.navy }}>{list[1].name}</span>
                <span className="text-[9px]" style={{ color: COLORS.muted }}>{list[1].points.toLocaleString()}</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white mt-1" style={{ background: "#9CA3AF" }}>2</div>
              </button>
              {/* 1st place */}
              <button onClick={() => handleProfile(list[0])} className="flex flex-col items-center active:scale-95 transition">
                <span className="text-lg mb-0.5">👑</span>
                <div className="w-16 h-16 rounded-full mb-1 flex items-center justify-center text-2xl font-bold" style={{ background: `${COLORS.gold}20`, border: `3px solid ${COLORS.gold}`, color: COLORS.navy }}>
                  {list[0].name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-[11px] font-bold truncate max-w-[70px]" style={{ color: COLORS.navy }}>{list[0].name}</span>
                <span className="text-[9px]" style={{ color: COLORS.muted }}>{list[0].points.toLocaleString()}</span>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white mt-1" style={{ background: COLORS.gold }}>1</div>
              </button>
              {/* 3rd place */}
              <button onClick={() => handleProfile(list[2])} className="flex flex-col items-center active:scale-95 transition" style={{ marginBottom: "12px" }}>
                <div className="w-11 h-11 rounded-full mb-1 flex items-center justify-center text-lg font-bold" style={{ background: `#CD7F3220`, border: `2px solid #CD7F32`, color: COLORS.navy }}>
                  {list[2].name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-[10px] font-bold truncate max-w-[60px]" style={{ color: COLORS.navy }}>{list[2].name}</span>
                <span className="text-[9px]" style={{ color: COLORS.muted }}>{list[2].points.toLocaleString()}</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white mt-1" style={{ background: "#CD7F32" }}>3</div>
              </button>
            </div>
          )}

          {/* Rest of list */}
          <div className="space-y-2.5">
            {list.slice(3).map((u) => (
              <div key={u.id} className="rounded-2xl p-3 flex items-center gap-3"
                style={{ background: u.isCurrentUser ? `${COLORS.primary}10` : COLORS.cardBg, border: u.isCurrentUser ? `1px solid ${COLORS.primary}40` : "1px solid #EEF0F4" }}>
                <span className="text-sm font-bold w-6 text-center" style={{ color: COLORS.muted }}>#{u.rank}</span>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: `${COLORS.primary}20`, color: COLORS.primary, border: `2px solid ${u.isCurrentUser ? COLORS.primary : "#E5E7EB"}` }}>
                  {u.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold truncate" style={{ color: COLORS.navy }}>{u.name} {u.isCurrentUser && <span className="text-[9px]" style={{ color: COLORS.primary }}>(You)</span>}</h4>
                  <p className="text-[9px]" style={{ color: COLORS.muted }}>{u.points.toLocaleString()} pts</p>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => handleProfile(u)} className="w-7 h-7 rounded-lg flex items-center justify-center active:scale-95 transition" style={{ background: COLORS.white, border: "1px solid #E5E7EB" }}>
                    <Eye size={12} style={{ color: COLORS.navy }} />
                  </button>
                  <button onClick={() => handleFollow(u)} className="w-7 h-7 rounded-lg flex items-center justify-center active:scale-95 transition"
                    style={{ background: following.includes(u.id) ? `${COLORS.success}20` : COLORS.white, border: `1px solid ${following.includes(u.id) ? COLORS.success : "#E5E7EB"}` }}>
                    <UserPlus size={12} style={{ color: following.includes(u.id) ? COLORS.success : COLORS.muted }} />
                  </button>
                  <button onClick={() => handleGift(u)} className="w-7 h-7 rounded-lg flex items-center justify-center active:scale-95 transition" style={{ background: `${COLORS.gold}20` }}>
                    <Gift size={12} style={{ color: COLORS.gold }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}