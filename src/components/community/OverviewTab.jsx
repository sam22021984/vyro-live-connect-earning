import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { COLORS, STATS, formatNum } from "./communityData";
import FeedPost from "./FeedPost";

function MiniGraph({ data, color }) {
  const max = Math.max(...data);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${30 - (v / max) * 28}`).join(" ");
  return (
    <svg viewBox="0 0 100 30" className="w-full h-8" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`0,30 ${points} 100,30`} fill={color} opacity="0.1" />
    </svg>
  );
}

function StatCard({ stat }) {
  const [count, setCount] = useState(0);
  const isNegative = stat.growth < 0;

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = stat.value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [stat.value]);

  return (
    <div
      className="rounded-2xl p-3.5 transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: `${stat.color}15` }}>
          {stat.icon}
        </div>
        <div className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isNegative ? "" : ""}`} style={{ background: isNegative ? `${COLORS.crimson}15` : `${COLORS.emerald}15`, color: isNegative ? COLORS.crimson : COLORS.emerald }}>
          {isNegative ? <TrendingDown size={10} /> : <TrendingUp size={10} />}
          {Math.abs(stat.growth)}%
        </div>
      </div>
      <p className="text-lg font-bold" style={{ color: COLORS.textPrimary }}>
        {formatNum(count)}{stat.suffix || ""}
      </p>
      <p className="text-[10px] mb-1.5" style={{ color: COLORS.textSecondary }}>{stat.label}</p>
      <MiniGraph data={stat.trend} color={stat.color} />
    </div>
  );
}

export default function OverviewTab({ posts = [], stats = {} }) {
  const liveStats = STATS.map((s) => {
    const liveValue = {
      "Total Posts": stats.totalPosts || 0,
      "Total Members": stats.totalMembers || 0,
      "Online Members": stats.onlineMembers || 0,
      "Active Groups": stats.totalGroups || 0,
      "Likes": stats.totalLikes || 0,
      "Comments": stats.totalComments || 0,
      "Shares": stats.totalShares || 0,
      "Gifts Sent": stats.totalGifts || 0,
      "Reports Pending": stats.pendingReports || 0,
    }[s.label];
    return liveValue !== undefined ? { ...s, value: liveValue } : s;
  });

  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.royalBlue} 0%, ${COLORS.skyBlue} 100%)` }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)" }} />
        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Welcome back! 👋</h2>
            <p className="text-xs text-white/80 mt-0.5">Your community grew 12.5% this week</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">78.5%</p>
            <p className="text-[10px] text-white/70">Engagement Rate</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold mb-2 px-1" style={{ color: COLORS.textPrimary }}>📊 Live Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {liveStats.map((s) => <StatCard key={s.label} stat={s} />)}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold mb-2 px-1" style={{ color: COLORS.textPrimary }}>📰 Recent Community Posts</h3>
        <div className="space-y-3">
          {posts.slice(0, 2).map((post) => <FeedPost key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
}