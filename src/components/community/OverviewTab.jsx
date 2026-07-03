import React, { useState, useEffect } from "react";
import { COLORS, formatNum } from "./communityData";
import FeedPost from "./FeedPost";

function StatCard({ label, value, icon, color, suffix }) {
  const [count, setCount] = useState(0);
  const target = value || 0;

  useEffect(() => {
    if (count === target) return;
    const diff = target - count;
    const steps = 20;
    const increment = diff / steps;
    let current = count;
    const interval = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.round(current));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div
      className="rounded-2xl p-3.5 transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: `${color}15` }}>
          {icon}
        </div>
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLORS.emerald }} />
      </div>
      <p className="text-lg font-bold" style={{ color: COLORS.textPrimary }}>
        {formatNum(count)}{suffix || ""}
      </p>
      <p className="text-[10px]" style={{ color: COLORS.textSecondary }}>{label}</p>
    </div>
  );
}

export default function OverviewTab({ posts = [], stats = {} }) {
  const engagementRate = stats.totalPosts > 0
    ? Math.min(100, Math.round((stats.totalInteractions / stats.totalPosts) * 10) / 10)
    : 0;

  const liveStats = [
    { label: "Community Posts", value: stats.totalPosts, icon: "📝", color: COLORS.royalBlue },
    { label: "Active Groups", value: stats.totalGroups, icon: "👥", color: COLORS.skyBlue },
    { label: "Channels", value: stats.totalChannels, icon: "📢", color: COLORS.amber },
    { label: "Group Members", value: stats.totalMembers, icon: "👥", color: COLORS.emerald },
    { label: "Online Now", value: stats.onlineMembers, icon: "🟢", color: COLORS.emerald },
    { label: "Total Likes", value: stats.totalLikes, icon: "❤️", color: COLORS.crimson },
    { label: "Comments", value: stats.totalComments, icon: "💬", color: COLORS.skyBlue },
    { label: "Shares", value: stats.totalShares, icon: "🔁", color: COLORS.royalBlue },
    { label: "Gifts Sent", value: stats.totalGifts, icon: "🎁", color: COLORS.amber },
    { label: "Media Shared", value: stats.mediaCount, icon: "📸", color: COLORS.gold },
    { label: "Pending Reports", value: stats.pendingReports, icon: "🚩", color: COLORS.crimson },
    { label: "Engagement Rate", value: engagementRate, icon: "📈", color: COLORS.royalBlue, suffix: "%" },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.royalBlue} 0%, ${COLORS.skyBlue} 100%)` }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)" }} />
        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Welcome back! 👋</h2>
            <p className="text-xs text-white/80 mt-0.5">{stats.totalPosts} posts • {stats.totalGroups} groups active</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{engagementRate}%</p>
            <p className="text-[10px] text-white/70">Engagement Rate</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-xs font-bold flex items-center gap-1.5" style={{ color: COLORS.textPrimary }}>
            📊 Live Statistics
          </h3>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLORS.emerald }} />
            <span className="text-[9px] font-semibold" style={{ color: COLORS.emerald }}>LIVE</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {liveStats.map((s) => <StatCard key={s.label} {...s} />)}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold mb-2 px-1" style={{ color: COLORS.textPrimary }}>📰 Recent Community Posts</h3>
        <div className="space-y-3">
          {posts.length === 0 ? (
            <p className="text-center text-xs py-8" style={{ color: COLORS.textSecondary }}>No posts yet</p>
          ) : (
            posts.slice(0, 2).map((post) => <FeedPost key={post.id} post={post} />)
          )}
        </div>
      </div>
    </div>
  );
}