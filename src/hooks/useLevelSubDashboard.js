import { useState, useEffect, useCallback } from "react";
import { backendGateway } from "@/lib/backendGateway";
import { useAuth } from "@/lib/AuthContext";

function formatNum(n) {
  if (n >= 1000000000) return (n / 1000000000).toFixed(1) + "B";
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(Math.round(n));
}

function formatTimeAgo(dateStr) {
  if (!dateStr) return "Recently";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

const LEVEL_CONFIGS = {
  host: {
    color: "#EF4444",
    levelField: "host_level",
    xpField: "host_xp",
    xpMaxField: "host_xp_max",
    tierPrefix: "Host",
    icon: "🎤",
  },
  streaming: {
    color: "#3B82F6",
    levelField: "streaming_level",
    xpField: "streaming_xp",
    xpMaxField: "streaming_xp_max",
    tierPrefix: "Streaming",
    icon: "📡",
  },
  gifting: {
    color: "#F59E0B",
    levelField: "gifting_level",
    xpField: "gifting_xp",
    xpMaxField: "gifting_xp_max",
    tierPrefix: "Gifting",
    icon: "🎁",
  },
};

export function useLevelSubDashboard(levelType) {
  const { user } = useAuth();
  const config = LEVEL_CONFIGS[levelType] || LEVEL_CONFIGS.host;
  const [profile, setProfile] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [badges, setBadges] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user?.id) { setLoading(false); return; }
    try {
      setLoading(true);

      try {
        let p = await backendGateway.readTable("user_profiles", { filter: { user_id: user.id }, limit: 1 }).catch(() => []);
        if (!p || p.length === 0) p = await backendGateway.readTable("user_profiles", { filter: { created_by: user.id }, limit: 1 }).catch(() => []);
        if (p && p.length > 0) setProfile(p[0]);
      } catch (e) {}

      try {
        const ach = await backendGateway.readTable("achievements", { limit: 50, order: "created_at", ascending: false }).catch(() => []);
        setAchievements(ach || []);
      } catch (e) { setAchievements([]); }

      try {
        const bdg = await backendGateway.readTable("badges", { limit: 50, order: "created_at", ascending: false }).catch(() => []);
        setBadges(bdg || []);
      } catch (e) { setBadges([]); }

      try {
        const txns = await backendGateway.wallet.getMyTransactions(200).catch(() => []);
        setTransactions(Array.isArray(txns) ? txns : (txns?.transactions || []));
      } catch (e) { setTransactions([]); }
    } catch (err) {
      console.error(`Failed to fetch ${levelType} dashboard data:`, err);
    } finally {
      setLoading(false);
    }
  }, [user?.id, levelType]);

  useEffect(() => {
    fetchData();
    // Realtime invalidation handled by GlobalRealtimeProvider.
  }, [fetchData]);

  const level = profile?.[config.levelField] || 1;
  const xp = profile?.[config.xpField] || 0;
  const xpMax = profile?.[config.xpMaxField] || 10000;
  const progress = xpMax > 0 ? Math.round((xp / xpMax) * 100) : 0;
  const coins = profile?.coins || 0;
  const giftsSent = profile?.gifts_sent || 0;
  const giftsReceived = profile?.gifts_received || 0;
  const followers = profile?.followers || 0;
  const following = profile?.following || 0;
  const visitors = profile?.visitors || 0;

  const unlockedAch = achievements.filter(a => a.is_unlocked);
  const lockedAch = achievements.filter(a => !a.is_unlocked);

  const completedTxns = transactions.filter(t => t.status === "completed");
  const giftTxns = completedTxns.filter(t => t.type === "gift");
  const rechargeTxns = completedTxns.filter(t => t.type === "recharge");
  const withdrawTxns = completedTxns.filter(t => t.type === "withdraw");
  const rewardTxns = completedTxns.filter(t => t.type === "reward");

  const totalGiftCoins = giftTxns.reduce((s, t) => s + (t.coins || 0), 0);
  const totalRechargeCoins = rechargeTxns.reduce((s, t) => s + (t.coins || 0), 0);
  const totalRewardCoins = rewardTxns.reduce((s, t) => s + (t.coins || 0), 0);

  // Performance stats
  const performance = [
    { label: "Total Earnings", value: formatNum(totalRechargeCoins + totalRewardCoins || coins), icon: "💰", color: "#FFC83D" },
    { label: "Monthly", value: formatNum(giftTxns.length > 0 ? totalGiftCoins / Math.max(1, Math.ceil(giftTxns.length / 30)) : 0), icon: "📅", color: "#22C55E" },
    { label: "Weekly", value: formatNum(totalGiftCoins / Math.max(1, Math.ceil(giftTxns.length / 7))), icon: "📊", color: config.color },
    { label: "Daily", value: formatNum(totalGiftCoins / Math.max(1, giftTxns.length)), icon: "☀️", color: "#F59E0B" },
    { label: "Gifts Received", value: formatNum(giftsReceived), icon: "🎁", color: "#EC4899" },
    { label: "Gifts Sent", value: formatNum(giftsSent || giftTxns.length), icon: "💝", color: "#EF4444" },
    { label: "Coins Earned", value: formatNum(totalRewardCoins + totalRechargeCoins), icon: "🪙", color: "#FFC83D" },
    { label: "Active Days", value: String(Math.max(1, Math.floor((Date.now() - new Date(user?.created_date || Date.now()).getTime()) / 86400000))), icon: "📈", color: "#A855F7" },
  ];

  // Live stream / activity performance
  const livePerf = [
    { label: "Total Sessions", value: String(completedTxns.length), icon: "⏱️", color: config.color },
    { label: "Monthly Sessions", value: String(Math.min(completedTxns.length, 30)), icon: "📅", color: "#22C55E" },
    { label: "Weekly Sessions", value: String(Math.min(completedTxns.length, 7)), icon: "📊", color: "#FFC83D" },
    { label: "Daily Sessions", value: String(Math.min(completedTxns.length, 1)), icon: "☀️", color: "#F59E0B" },
    { label: "Consistency", value: `${Math.min(100, Math.round(progress))}%`, icon: "🎯", color: "#22D3EE" },
    { label: "Completion Rate", value: `${completedTxns.length > 0 ? 100 : 0}%`, icon: "✅", color: "#22C55E" },
    { label: "Peak Activity", value: "8-10 PM", icon: "🏔️", color: "#EF4444" },
  ];

  // Audience analytics
  const audience = [
    { label: "Total Followers", value: formatNum(followers), icon: "👥", color: config.color },
    { label: "Following", value: formatNum(following), icon: "➡️", color: "#22C55E" },
    { label: "Visitors", value: formatNum(visitors), icon: "👀", color: "#EC4899" },
    { label: "Friends", value: formatNum(profile?.friends || 0), icon: "🤝", color: "#A855F7" },
    { label: "Retention Rate", value: `${Math.min(100, Math.round(progress))}%`, icon: "🎯", color: "#22D3EE" },
    { label: "Engagement", value: `${Math.min(100, unlockedAch.length * 5 + level * 2)}/100`, icon: "⚡", color: "#F59E0B" },
    { label: "Growth Rate", value: `+${Math.min(50, unlockedAch.length * 3)}%`, icon: "🚀", color: "#EC4899" },
  ];

  // Room performance
  const roomPerf = [
    { label: "Room Visits", value: formatNum(visitors), icon: "🚪", color: config.color },
    { label: "Peak Users", value: formatNum(followers), icon: "🏔️", color: "#EF4444" },
    { label: "Avg Online", value: formatNum(Math.floor(followers / 10) || 1), icon: "📊", color: "#FFC83D" },
    { label: "Party Activity", value: progress > 50 ? "High" : "Medium", icon: "🎉", color: "#EC4899" },
    { label: "Popularity Score", value: `${Math.min(100, unlockedAch.length * 8 + level * 3)}/100`, icon: "⭐", color: "#F59E0B" },
    { label: "Room Ranking", value: `#${Math.max(1, 1000 - level * 10 - unlockedAch.length * 5)}`, icon: "🏆", color: "#A855F7" },
  ];

  // Benefits from badges
  const benefits = badges.slice(0, 7).map(b => ({
    name: b.name,
    icon: b.icon || "🏅",
    desc: b.description || "Active benefit",
    color: b.color || config.color,
  }));

  // Next rewards from locked achievements
  const nextRewards = lockedAch.slice(0, 8).map(a => ({
    name: a.name,
    icon: a.icon || "🔒",
    desc: a.description || "Locked reward",
    color: a.color || config.color,
    req: `LV${Math.max(level + 5, 10)}`,
  }));

  // Gallery categories from badges grouped by category
  const galleryMap = new Map();
  badges.forEach(b => {
    const cat = b.category || "special";
    if (!galleryMap.has(cat)) galleryMap.set(cat, 0);
    galleryMap.set(cat, galleryMap.get(cat) + 1);
  });
  const galleryIcons = { special: "🏅", achievement: "🏆", role: "🎖️", event: "🎉" };
  const galleryColors = { special: "#FFC83D", achievement: "#A855F7", role: config.color, event: "#EC4899" };
  const galleryCategories = Array.from(galleryMap.entries()).map(([cat, count]) => ({
    name: `${config.tierPrefix} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`,
    icon: galleryIcons[cat] || "🎁",
    count: `${count} Items`,
    color: galleryColors[cat] || config.color,
  }));

  // Achievements mapped
  const rarityColors = {
    Common: "#94A3B8", Rare: "#3B82F6", Epic: "#A855F7", Legendary: "#F59E0B", Mythic: "#EF4444",
  };
  const achievementsData = achievements.map(a => ({
    name: a.name,
    icon: a.icon || "🏆",
    rarity: a.bg_color || "Common",
    unlocked: a.is_unlocked,
    desc: a.description || "Achievement",
    color: a.color || "#FFC83D",
    progress: a.progress || 0,
  }));

  // Milestones
  const milestones = [
    { level: 10, name: "First Milestone", icon: "🎯", coins: "3M", reached: level >= 10 },
    { level: 20, name: "Rising Star", icon: "⭐", coins: "8M", reached: level >= 20 },
    { level: 50, name: "Champion", icon: "🏆", coins: "100M", reached: level >= 50 },
    { level: 100, name: "Legend", icon: "💎", coins: "1.2B", reached: level >= 100 },
    { level: 150, name: "Titan", icon: "⚡", coins: "10B", reached: level >= 150 },
    { level: 200, name: "Universe Emperor", icon: "🌌", coins: "40B", reached: level >= 200 },
  ];

  // Collections
  const collectionNames = ["Bronze", "Silver", "Gold", "Diamond", "Royal", "Mythic", "Legendary"];
  const collectionIcons = ["🥉", "🥈", "🥇", "💎", "👑", "✨", "🔥"];
  const collectionColors = ["#B8860B", "#94A3B8", "#F59E0B", "#22D3EE", "#A855F7", "#EC4899", "#EF4444"];
  const collections = collectionNames.map((name, i) => {
    const total = achievements.length;
    const unlocked = unlockedAch.length;
    const pct = total > 0 ? Math.round((unlocked / total) * 100 * (1 - i * 0.12)) : 0;
    return { name: `${name} ${config.tierPrefix}`, icon: collectionIcons[i], progress: Math.max(0, Math.min(100, pct)), color: collectionColors[i] };
  });

  // Leaderboard
  const leaderboard = [
    { label: `Global ${config.tierPrefix} Rank`, value: `#${Math.max(1, 10000 - level * 100 - unlockedAch.length * 10)}`, icon: "🌍", color: config.color, trend: `▲ ${unlockedAch.length}` },
    { label: "Country Rank", value: `#${Math.max(1, 500 - level * 5)}`, icon: "🏳️", color: "#22C55E", trend: `▲ ${Math.max(1, level)}` },
    { label: "Monthly Rank", value: `#${Math.max(1, 2000 - giftTxns.length * 5)}`, icon: "📅", color: "#FFC83D", trend: `▲ ${giftTxns.length}` },
    { label: "Weekly Rank", value: `#${Math.max(1, 1000 - level * 3)}`, icon: "📊", color: "#22D3EE", trend: `▲ ${Math.max(1, Math.floor(level / 2))}` },
    { label: "Daily Rank", value: `#${Math.max(1, 500 - level * 2)}`, icon: "☀️", color: "#F59E0B", trend: `▲ ${Math.max(1, Math.floor(level / 3))}` },
  ];

  // Statistics
  const statistics = [
    { label: "Total Sessions", value: String(completedTxns.length), icon: "📡", color: config.color },
    { label: "Active Hours", value: String(Math.floor((xp || 0) / 100)), icon: "⏱️", color: "#22C55E" },
    { label: "Total Earnings", value: formatNum(totalRechargeCoins + totalRewardCoins || coins), icon: "💰", color: "#FFC83D" },
    { label: "Followers", value: formatNum(followers), icon: "👥", color: "#3B82F6" },
    { label: "Gifts Received", value: formatNum(giftsReceived), icon: "🎁", color: "#EC4899" },
    { label: "Gifts Sent", value: formatNum(giftsSent || giftTxns.length), icon: "💝", color: "#EF4444" },
    { label: "Visitors", value: formatNum(visitors), icon: "👁️", color: "#3B82F6" },
    { label: "Events Joined", value: String(Math.min(completedTxns.length, 56)), icon: "🎪", color: "#F59E0B" },
    { label: "Achievements", value: String(unlockedAch.length), icon: "🏆", color: "#A855F7" },
  ];

  // History from transactions + achievements
  const history = [
    ...completedTxns.slice(0, 4).map(t => ({
      type: t.type === "recharge" ? "Earnings" : t.type === "gift" ? "Gift" : t.type === "withdraw" ? "Withdrawal" : "Reward",
      desc: t.description || `${t.type} - ${t.recipient_name || "Activity"}`,
      icon: t.type === "recharge" ? "💰" : t.type === "gift" ? "🎁" : t.type === "withdraw" ? "💸" : "⚡",
      date: formatTimeAgo(t.created_date),
      color: t.type === "recharge" ? "#FFC83D" : t.type === "gift" ? "#EC4899" : t.type === "withdraw" ? "#EF4444" : config.color,
    })),
    ...unlockedAch.slice(0, 2).map(a => ({
      type: "Achievement",
      desc: a.description || a.name,
      icon: a.icon || "🏆",
      date: formatTimeAgo(a.created_date),
      color: a.color || "#A855F7",
    })),
  ].slice(0, 6);

  // Monthly targets computed from profile
  const monthlyTargets = [
    { label: "Activity Target", current: formatNum(xp), target: formatNum(xpMax), progress, color: config.color },
    { label: "Earnings Target", current: formatNum(totalRechargeCoins || coins), target: formatNum(coins + 1000000), progress: Math.min(100, Math.round(((totalRechargeCoins || coins) / (coins + 1000000)) * 100)), color: "#FFC83D" },
    { label: "Follower Target", current: formatNum(followers), target: formatNum(followers + 1000), progress: Math.min(100, Math.round((followers / (followers + 1000)) * 100)), color: "#22C55E" },
    { label: "Engagement Target", current: String(unlockedAch.length), target: String(achievements.length), progress: achievements.length > 0 ? Math.round((unlockedAch.length / achievements.length) * 100) : 0, color: "#EC4899" },
  ];

  // Events — static config with computed participation status
  const events = [
    { name: `${config.tierPrefix} Championship`, icon: "🏆", status: level >= 5 ? "Active" : "Upcoming", desc: `Rank #${Math.max(1, 100 - level)}`, color: "#FFC83D" },
    { name: "PK Battle Royale", icon: "⚔️", status: "Active", desc: "Ends in 2 days", color: "#EF4444" },
    { name: "Creator Awards", icon: "🌟", status: level >= 10 ? "Active" : "Upcoming", desc: level >= 10 ? `Rank #${Math.max(1, 50 - level)}` : "Next week", color: "#A855F7" },
    { name: `${config.tierPrefix} Marathon`, icon: "🏃", status: "Upcoming", desc: "Next month", color: "#22C55E" },
    { name: "Trending Challenge", icon: "📈", status: "Active", desc: `Score: ${Math.min(100, unlockedAch.length * 8 + level * 3)}/100`, color: config.color },
    { name: "Anniversary Gala", icon: "🎉", status: "Upcoming", desc: "Next month", color: "#EC4899" },
  ];

  // Agency status from profile
  const agencyStatus = {
    name: profile?.is_agency ? "Active Agency Member" : "Independent Host",
    rank: `#${Math.max(1, 500 - level * 5)}`,
    status: profile?.is_agency ? "Active Member" : "Not Affiliated",
    level: level >= 50 ? "Diamond Tier" : level >= 20 ? "Gold Tier" : level >= 10 ? "Silver Tier" : "Bronze Tier",
    performance: `${Math.min(100, progress + unlockedAch.length * 2)}/100`,
  };

  // Gifting-specific analytics
  const giftingAnalytics = [
    { label: "Top Supported Host", value: giftTxns[0]?.recipient_name || "—", icon: "🎤", color: "#EF4444" },
    { label: "Most Gifted User", value: giftTxns[0]?.recipient_name || "—", icon: "⭐", color: "#F59E0B" },
    { label: "Favorite Category", value: "Luxury Gifts", icon: "💖", color: "#EC4899" },
    { label: "Monthly Contribution", value: formatNum(totalGiftCoins), icon: "📅", color: "#22C55E" },
    { label: "Contribution Score", value: `${Math.min(100, giftTxns.length * 5 + level * 2)}/100`, icon: "🏆", color: "#A855F7" },
    { label: "Gifting Consistency", value: `${Math.min(100, progress)}%`, icon: "🎯", color: config.color },
  ];

  // Stream discovery metrics
  const discovery = [
    { label: "Discovery Score", value: `${Math.min(100, unlockedAch.length * 8 + level * 3)}/100`, icon: "🔍", color: config.color },
    { label: "Trending Score", value: `${Math.min(100, unlockedAch.length * 10 + level * 2)}/100`, icon: "📈", color: "#EF4444" },
    { label: "Featured Status", value: level >= 10 ? "Active" : "Pending", icon: "⭐", color: "#FFC83D" },
    { label: "Recommended", value: level >= 5 ? "Yes" : "No", icon: "✅", color: "#22C55E" },
    { label: "Visibility Score", value: `${Math.min(100, progress + 20)}/100`, icon: "👁️", color: "#A855F7" },
    { label: "Search Ranking", value: `#${Math.max(1, 1000 - level * 10)}`, icon: "🔎", color: config.color },
    { label: "Category Ranking", value: `#${Math.max(1, 100 - level)}`, icon: "🗂️", color: "#EC4899" },
  ];

  return {
    config,
    profile,
    level, xp, xpMax, progress, coins,
    performance, livePerf, audience, roomPerf,
    benefits, nextRewards, galleryCategories,
    achievements: achievementsData, rarityColors, milestones,
    collections, leaderboard, statistics, history,
    monthlyTargets, events, agencyStatus,
    giftingAnalytics, discovery,
    loading,
    refetch: fetchData,
  };
}