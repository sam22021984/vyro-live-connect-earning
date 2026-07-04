// Gifting Level Dashboard — static UI configuration only.
// Real data (performance, analytics, achievements, collections, privileges, leaderboard, history)
// comes from the useLevelSubDashboard("gifting") hook + Achievement/Badge/Transaction/UserProfile entities.

export const giftingTabs = [
  { key: "overview", label: "Overview", icon: "📊" },
  { key: "analytics", label: "Analytics", icon: "📈" },
  { key: "rewards", label: "Rewards", icon: "🎁" },
  { key: "achievements", label: "Achievements", icon: "🏆" },
  { key: "collections", label: "Collections", icon: "💎" },
  { key: "privileges", label: "Privileges", icon: "👑" },
  { key: "leaderboard", label: "Leaderboard", icon: "🥇" },
];

export const giftingConfig = {
  color: "#F59E0B",
  glow: "rgba(245,158,11,0.45)",
  gradient: "from-amber-400 to-yellow-500",
};

export const giftingTiers = [
  { tier: 1, levels: "LV1–LV10", coins: "5,000,000", name: "Rookie Gifter", icon: "🎁", collection: "bronze" },
  { tier: 2, levels: "LV11–LV20", coins: "15,000,000", name: "Bronze Gifter", icon: "🥉", collection: "bronze" },
  { tier: 3, levels: "LV21–LV30", coins: "35,000,000", name: "Silver Gifter", icon: "🥈", collection: "silver" },
  { tier: 4, levels: "LV31–LV40", coins: "75,000,000", name: "Diamond Gifter", icon: "💎", collection: "diamond" },
  { tier: 5, levels: "LV41–LV50", coins: "150,000,000", name: "Royal Gifter", icon: "👑", collection: "royal" },
  { tier: 6, levels: "LV51–LV60", coins: "300,000,000", name: "Mythic Gifter", icon: "✨", collection: "mythic" },
  { tier: 7, levels: "LV61–LV80", coins: "700,000,000", name: "Legendary Gifter", icon: "🔥", collection: "legendary" },
  { tier: 8, levels: "LV81–LV100", coins: "1,500,000,000", name: "Cosmic Gifter", icon: "🌟", collection: "legendary" },
  { tier: 9, levels: "LV101–LV120", coins: "3,000,000,000", name: "Galaxy Gifter", icon: "🌌", collection: "ultimate" },
  { tier: 10, levels: "LV121–LV140", coins: "6,000,000,000", name: "Titan Gifter", icon: "⚡", collection: "ultimate" },
  { tier: 11, levels: "LV141–LV160", coins: "12,000,000,000", name: "Universe Gifter", icon: "🌠", collection: "ultimate" },
  { tier: 12, levels: "LV161–LV180", coins: "20,000,000,000", name: "Eternal Gifter", icon: "💫", collection: "ultimate" },
  { tier: 13, levels: "LV181–LV199", coins: "35,000,000,000", name: "Immortal Gifter", icon: "🔱", collection: "ultimate" },
  { tier: 14, levels: "LV200", coins: "50,000,000,000", name: "Supreme Gifter Emperor", icon: "👑", collection: "ultimate" },
];

export const giftingBottomActions = [
  { label: "My Gifts", icon: "🎁", color: "#F59E0B" },
  { label: "Rewards", icon: "💎", color: "#EC4899" },
  { label: "Achievements", icon: "🏆", color: "#A855F7" },
  { label: "Collections", icon: "💎", color: "#22D3EE" },
  { label: "Leaderboard", icon: "🥇", color: "#1F6BFF" },
];