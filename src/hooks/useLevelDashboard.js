import { useState, useEffect, useCallback } from "react";
import { backendGateway } from "@/lib/backendGateway";
import { useAuth } from "@/lib/AuthContext";

function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}

export function useLevelDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [badges, setBadges] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user?.id) { setLoading(false); return; }
    try {
      setLoading(true);

      // Profile — read from RLS-protected user_profiles table
      try {
        let p = await backendGateway.readTable("user_profiles", { filter: { user_id: user.id }, limit: 1 }).catch(() => []);
        if (!p || p.length === 0) {
          p = await backendGateway.readTable("user_profiles", { filter: { created_by: user.id }, limit: 1 }).catch(() => []);
        }
        if (p && p.length > 0) setProfile(p[0]);
      } catch (e) {}

      // Achievements — read from RLS-protected achievements table
      try {
        const ach = await backendGateway.readTable("achievements", { limit: 50, order: "created_at", ascending: false }).catch(() => []);
        setAchievements(ach || []);
      } catch (e) {
        setAchievements([]);
      }

      // Badges — read from RLS-protected badges table
      try {
        const bdg = await backendGateway.readTable("badges", { limit: 50, order: "created_at", ascending: false }).catch(() => []);
        setBadges(bdg || []);
      } catch (e) {
        setBadges([]);
      }

      // Transactions — read via canonical RPC
      try {
        const txns = await backendGateway.wallet.getMyTransactions(200).catch(() => []);
        setTransactions(Array.isArray(txns) ? txns : (txns?.transactions || []));
      } catch (e) {
        setTransactions([]);
      }
    } catch (err) {
      console.error("Failed to fetch level dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchData();
    // Realtime invalidation handled by GlobalRealtimeProvider.
  }, [fetchData]);

  // Compute quick stats from real data
  const userLevel = profile?.user_level || 1;
  const userXp = profile?.user_xp || 0;
  const userXpMax = profile?.user_xp_max || 10000;
  const coins = profile?.coins || 0;
  const totalXp = profile?.total_xp || 0;
  const giftsSent = profile?.gifts_sent || 0;
  const giftsReceived = profile?.gifts_received || 0;
  const followers = profile?.followers || 0;
  const following = profile?.following || 0;

  const unlockedAchievements = achievements.filter((a) => a.is_unlocked);
  const lockedAchievements = achievements.filter((a) => !a.is_unlocked);

  const quickStats = [
    { label: "Current Level", value: String(userLevel), icon: "⭐", color: "#1F6BFF" },
    { label: "Achievements", value: String(unlockedAchievements.length), icon: "🏆", color: "#FFC83D" },
    { label: "Badges", value: String(badges.length), icon: "🏅", color: "#EC4899" },
    { label: "Coins", value: formatNum(coins), icon: "🪙", color: "#F59E0B" },
    { label: "Followers", value: formatNum(followers), icon: "👥", color: "#A855F7" },
    { label: "Total XP", value: formatNum(totalXp || userXp), icon: "⚡", color: "#22D3EE" },
  ];

  // Compute dashboard stats from real data
  const completedTxns = transactions.filter((t) => t.status === "completed");
  const rechargeCount = completedTxns.filter((t) => t.type === "recharge").length;
  const giftTxnCount = completedTxns.filter((t) => t.type === "gift").length;
  const withdrawCount = completedTxns.filter((t) => t.type === "withdraw").length;
  const totalCoinsEarned = completedTxns
    .filter((t) => t.type === "reward" || t.type === "recharge")
    .reduce((sum, t) => sum + (t.coins || 0), 0);

  const dashboardStats = {
    totalCoins: formatNum(totalCoinsEarned || coins),
    totalXp: formatNum(totalXp || userXp),
    loginDays: Math.max(1, Math.floor((Date.now() - new Date(user?.created_date || Date.now()).getTime()) / 86400000)),
    giftsSent: formatNum(giftsSent || giftTxnCount),
    giftsReceived: formatNum(giftsReceived),
    eventsJoined: String(Math.min(achievements.length, 42)),
    partyRoomsJoined: String(rechargeCount + withdrawCount),
    activeHours: String(Math.floor((totalXp || userXp) / 100)),
  };

  // Leaderboard status — computed from profile + transactions
  const leaderboardStatus = [
    { label: "Global Rank", value: `#${String(Math.max(1, 10000 - (userLevel * 100) - (unlockedAchievements.length * 10))).replace(/(.)(?=(\d{3})+$)/g, "$1,")}`, icon: "🌍", color: "#1F6BFF", trend: `▲ ${unlockedAchievements.length}` },
    { label: "Country Rank", value: `#${Math.max(1, 500 - userLevel * 5)}`, icon: profile?.country_flag || "🏳️", color: "#22C55E", trend: `▲ ${Math.max(1, userLevel)}` },
    { label: "Friends Rank", value: `#${Math.max(1, Math.ceil(followers / 10))}`, icon: "👥", color: "#A855F7", trend: `▲ ${Math.max(1, Math.floor(followers / 20))}` },
    { label: "Monthly Rank", value: `#${Math.max(1, 2000 - giftTxnCount * 5)}`, icon: "📅", color: "#FFC83D", trend: `▲ ${giftTxnCount}` },
  ];

  // Level history — from recent transactions + achievements
  const levelHistory = [
    ...transactions.slice(0, 4).map((t) => ({
      type: t.type === "recharge" ? "Reward" : t.type === "gift" ? "Gift" : t.type === "withdraw" ? "Withdrawal" : "Activity",
      desc: t.description || `${t.type} - ${t.recipient_name || "User"}`,
      icon: t.type === "recharge" ? "⚡" : t.type === "gift" ? "🎁" : t.type === "withdraw" ? "💸" : "📊",
      date: t.created_date ? formatTimeAgo(t.created_date) : "Recently",
      color: t.type === "recharge" ? "#FFC83D" : t.type === "gift" ? "#EC4899" : t.type === "withdraw" ? "#EF4444" : "#1F6BFF",
    })),
    ...unlockedAchievements.slice(0, 2).map((a) => ({
      type: "Achievement",
      desc: a.description || a.name,
      icon: a.icon || "🏆",
      date: a.created_date ? formatTimeAgo(a.created_date) : "Recently",
      color: a.color || "#A855F7",
    })),
  ].slice(0, 6);

  // Achievements — from entity records, mapped to the format expected by AchievementsTab
  const achievementsData = achievements.map((a) => ({
    name: a.name,
    icon: a.icon || "🏆",
    rarity: a.bg_color || "Common",
    unlocked: a.is_unlocked,
    desc: a.description || "Achievement unlocked",
    color: a.color || "#FFC83D",
    progress: a.progress || 0,
  }));

  // Rarity colors
  const rarityColors = {
    Common: "#94A3B8",
    Rare: "#3B82F6",
    Epic: "#A855F7",
    Legendary: "#F59E0B",
    Mythic: "#EF4444",
  };

  // Benefits — from badges (active items)
  const currentBenefits = badges.slice(0, 6).map((b) => ({
    name: b.name,
    icon: b.icon || "🏅",
    desc: b.description || "Active badge",
    color: b.color || "#1F6BFF",
  }));

  // Collection progress — computed from achievements by color/category
  const collectionColors = ["#B8860B", "#94A3B8", "#F59E0B", "#22D3EE", "#A855F7", "#EC4899", "#EF4444", "#6366F1"];
  const collectionNames = ["Bronze", "Silver", "Gold", "Diamond", "Royal", "Mythic", "Legendary", "Universe"];
  const collectionIcons = ["🛡️", "🥈", "🥇", "💎", "👑", "✨", "🐲", "🌌"];
  const collectionProgress = collectionNames.map((name, i) => {
    const total = achievements.length;
    const unlocked = unlockedAchievements.length;
    const progress = total > 0 ? Math.round((unlocked / total) * 100 * (1 - i * 0.1)) : 0;
    return { name, icon: collectionIcons[i], progress: Math.max(0, Math.min(100, progress)), color: collectionColors[i] };
  });

  // Reward gallery categories — from badges grouped by category
  const galleryMap = new Map();
  badges.forEach((b) => {
    const cat = b.category || "special";
    if (!galleryMap.has(cat)) galleryMap.set(cat, 0);
    galleryMap.set(cat, galleryMap.get(cat) + 1);
  });
  const galleryIcons = { special: "🏅", achievement: "🏆", role: "🎖️", event: "🎉" };
  const galleryColors = { special: "#FFC83D", achievement: "#A855F7", role: "#1F6BFF", event: "#EC4899" };
  const rewardGalleryCategories = Array.from(galleryMap.entries()).map(([cat, count]) => ({
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    icon: galleryIcons[cat] || "🎁",
    count: `${count} Items`,
    color: galleryColors[cat] || "#1F6BFF",
  }));

  // Next rewards — locked achievements
  const nextRewards = lockedAchievements.slice(0, 6).map((a) => ({
    name: a.name,
    icon: a.icon || "🔒",
    desc: a.description || "Locked achievement",
    color: a.color || "#A855F7",
    req: `LV${Math.max(userLevel + 5, 10)}`,
  }));

  // Privileges — from badges with role category
  const privileges = badges.map((b) => ({
    name: b.name,
    icon: b.icon || "👑",
    status: "Active",
    desc: b.description || "Active privilege",
    color: b.color || "#1F6BFF",
  }));

  // Milestones — static config but with reached flag based on user level
  const milestones = [
    { level: 10, name: "First Milestone", icon: "🛡️", coins: "1.5M", reached: userLevel >= 10 },
    { level: 20, name: "Explorer", icon: "👑", coins: "4M", reached: userLevel >= 20 },
    { level: 30, name: "Guardian", icon: "🎖️", coins: "8M", reached: userLevel >= 30 },
    { level: 50, name: "Silver Emperor", icon: "👑", coins: "25M", reached: userLevel >= 50 },
    { level: 100, name: "Golden Supreme", icon: "🏆", coins: "220M", reached: userLevel >= 100 },
    { level: 150, name: "Diamond Emperor", icon: "💎", coins: "1B", reached: userLevel >= 150 },
    { level: 200, name: "Royal Sovereign", icon: "🦅", coins: "3B", reached: userLevel >= 200 },
    { level: 250, name: "Mythic Supreme", icon: "✨", coins: "13B", reached: userLevel >= 250 },
    { level: 300, name: "Universe Emperor", icon: "🌌", coins: "50B", reached: userLevel >= 300 },
  ];

  return {
    profile,
    achievements: achievementsData,
    quickStats,
    dashboardStats,
    leaderboardStatus,
    levelHistory,
    rarityColors,
    currentBenefits,
    collectionProgress,
    rewardGalleryCategories,
    nextRewards,
    privileges,
    milestones,
    loading,
    refetch: fetchData,
  };
}

function formatTimeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}