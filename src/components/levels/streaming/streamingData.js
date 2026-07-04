// Streaming Level Dashboard — static UI configuration only.
// Real data (performance, audience, discovery, achievements, collections, statistics, history, events)
// comes from the useLevelSubDashboard("streaming") hook + Achievement/Badge/Transaction/UserProfile entities.

export const streamingTabs = [
  { key: "overview", label: "Overview", icon: "📊" },
  { key: "performance", label: "Performance", icon: "🚀" },
  { key: "audience", label: "Audience", icon: "👥" },
  { key: "discovery", label: "Discovery", icon: "🔍" },
  { key: "rewards", label: "Rewards", icon: "🎁" },
  { key: "achievements", label: "Achievements", icon: "🏆" },
  { key: "collections", label: "Collections", icon: "💎" },
  { key: "events", label: "Events", icon: "🎪" },
  { key: "statistics", label: "Statistics", icon: "📈" },
  { key: "history", label: "History", icon: "📜" },
];

export const streamingConfig = {
  color: "#3B82F6",
  glow: "rgba(59,130,246,0.45)",
  gradient: "from-blue-400 to-cyan-500",
};

export const streamingTiers = [
  { tier: 1, levels: "LV1–LV10", coins: "3,000,000", name: "Streaming Spark", icon: "📡", collection: "bronze" },
  { tier: 2, levels: "LV11–LV20", coins: "8,000,000", name: "Streaming Explorer", icon: "🗼", collection: "silver" },
  { tier: 3, levels: "LV21–LV30", coins: "20,000,000", name: "Streaming Rising Star", icon: "⭐", collection: "silver" },
  { tier: 4, levels: "LV31–LV40", coins: "50,000,000", name: "Streaming Pro", icon: "🎬", collection: "gold" },
  { tier: 5, levels: "LV41–LV50", coins: "100,000,000", name: "Streaming Master", icon: "🎤", collection: "gold" },
  { tier: 6, levels: "LV51–LV60", coins: "250,000,000", name: "Streaming Champion", icon: "🏆", collection: "gold" },
  { tier: 7, levels: "LV61–LV80", coins: "600,000,000", name: "Streaming Elite", icon: "💎", collection: "diamond" },
  { tier: 8, levels: "LV81–LV100", coins: "1,200,000,000", name: "Streaming Legend", icon: "👑", collection: "diamond" },
  { tier: 9, levels: "LV101–LV120", coins: "2,500,000,000", name: "Streaming Mythic", icon: "✨", collection: "royal" },
  { tier: 10, levels: "LV121–LV140", coins: "5,000,000,000", name: "Streaming Sovereign", icon: "🐉", collection: "royal" },
  { tier: 11, levels: "LV141–LV160", coins: "10,000,000,000", name: "Streaming Overlord", icon: "🌋", collection: "mythic" },
  { tier: 12, levels: "LV161–LV180", coins: "18,000,000,000", name: "Streaming Titan", icon: "⚡", collection: "mythic" },
  { tier: 13, levels: "LV181–LV199", coins: "30,000,000,000", name: "Streaming Universe King", icon: "🌌", collection: "legendary" },
  { tier: 14, levels: "LV200", coins: "40,000,000,000", name: "Streaming Universe Emperor", icon: "🌠", collection: "ultimate" },
];

export const streamBottomActions = [
  { label: "My Streams", icon: "📡", color: "#3B82F6" },
  { label: "Analytics", icon: "📊", color: "#22D3EE" },
  { label: "Rewards", icon: "🎁", color: "#FFC83D" },
  { label: "Achievements", icon: "🏆", color: "#A855F7" },
  { label: "Collections", icon: "💎", color: "#EC4899" },
  { label: "Leaderboard", icon: "📈", color: "#EF4444" },
];