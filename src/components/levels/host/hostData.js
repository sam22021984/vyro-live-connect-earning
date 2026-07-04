// Host Level Dashboard — static UI configuration only.
// Real data (performance, audience, achievements, collections, statistics, history, events)
// comes from the useLevelSubDashboard("host") hook + Achievement/Badge/Transaction/UserProfile entities.

export const hostTabs = [
  { key: "overview", label: "Overview", icon: "📊" },
  { key: "performance", label: "Performance", icon: "🚀" },
  { key: "audience", label: "Audience", icon: "👥" },
  { key: "rewards", label: "Rewards", icon: "🎁" },
  { key: "achievements", label: "Achievements", icon: "🏆" },
  { key: "collections", label: "Collections", icon: "💎" },
  { key: "statistics", label: "Statistics", icon: "📈" },
  { key: "events", label: "Events", icon: "🎪" },
];

export const hostConfig = {
  color: "#EF4444",
  glow: "rgba(239,68,68,0.45)",
  gradient: "from-red-400 to-orange-500",
};

export const hostTiers = [
  { tier: 1, levels: "LV1–LV10", coins: "3,000,000", name: "Rookie Host", icon: "🎤", collection: "bronze" },
  { tier: 2, levels: "LV11–LV20", coins: "8,000,000", name: "Rising Star Host", icon: "⭐", collection: "silver" },
  { tier: 3, levels: "LV21–LV30", coins: "20,000,000", name: "Pro Host", icon: "🎬", collection: "silver" },
  { tier: 4, levels: "LV31–LV40", coins: "50,000,000", name: "Master Host", icon: "🎙️", collection: "gold" },
  { tier: 5, levels: "LV41–LV50", coins: "100,000,000", name: "Champion Host", icon: "🏆", collection: "gold" },
  { tier: 6, levels: "LV51–LV60", coins: "250,000,000", name: "Elite Host", icon: "💎", collection: "gold" },
  { tier: 7, levels: "LV61–LV80", coins: "600,000,000", name: "Legend Host", icon: "👑", collection: "diamond" },
  { tier: 8, levels: "LV81–LV100", coins: "1,200,000,000", name: "Mythic Host", icon: "✨", collection: "diamond" },
  { tier: 9, levels: "LV101–LV120", coins: "2,500,000,000", name: "Sovereign Host", icon: "🐉", collection: "royal" },
  { tier: 10, levels: "LV121–LV140", coins: "5,000,000,000", name: "Overlord Host", icon: "🌋", collection: "royal" },
  { tier: 11, levels: "LV141–LV160", coins: "10,000,000,000", name: "Titan Host", icon: "⚡", collection: "mythic" },
  { tier: 12, levels: "LV161–LV180", coins: "18,000,000,000", name: "Universe Host", icon: "🌌", collection: "mythic" },
  { tier: 13, levels: "LV181–LV199", coins: "30,000,000,000", name: "Cosmic Host", icon: "🌠", collection: "legendary" },
  { tier: 14, levels: "LV200", coins: "40,000,000,000", name: "Universe Host Emperor", icon: "👑", collection: "ultimate" },
];

export const hostBottomActions = [
  { label: "Streams", icon: "📡", color: "#EF4444" },
  { label: "Earnings", icon: "💰", color: "#FFC83D" },
  { label: "Rewards", icon: "🎁", color: "#EC4899" },
  { label: "Achievements", icon: "🏆", color: "#A855F7" },
  { label: "Leaderboard", icon: "📈", color: "#3B82F6" },
];