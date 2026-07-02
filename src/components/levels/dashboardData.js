// Shared design tokens for User Level Dashboard
export const dashboardTheme = {
  white: "#FFFFFF",
  lightCard: "#F5F7FA",
  blue: "#1F6BFF",
  navy: "#0D1B3E",
  gold: "#FFC83D",
};

export const dashboardStats = {
  totalCoins: "12,500,000",
  totalXp: "176,000",
  loginDays: 247,
  giftsSent: 1850,
  giftsReceived: 3240,
  eventsJoined: 42,
  partyRoomsJoined: 128,
  activeHours: 1856,
  achievementsEarned: 24,
  rewardsUnlocked: 18,
  badgesCollected: 31,
  collectionCompletion: 68,
};

export const quickStats = [
  { label: "Current Level", value: "35", icon: "⭐", color: "#1F6BFF" },
  { label: "Current Tier", value: "4/31", icon: "🎖️", color: "#0D1B3E" },
  { label: "Achievements", value: "24", icon: "🏆", color: "#FFC83D" },
  { label: "Rewards", value: "18", icon: "🎁", color: "#A855F7" },
  { label: "Badges", value: "31", icon: "🏅", color: "#EC4899" },
  { label: "Collection", value: "68%", icon: "💎", color: "#22D3EE" },
];

export const currentBenefits = [
  { name: "Active Badge", icon: "🎖️", desc: "Royal Silver Crest", color: "#94A3B8" },
  { name: "Active Crown", icon: "👑", desc: "Silver Imperial Crown", color: "#FFC83D" },
  { name: "Active Frame", icon: "🖼️", desc: "Silver Premium Frame", color: "#22D3EE" },
  { name: "Active Nameplate", icon: "🏷️", desc: "Silver Commander Plate", color: "#1F6BFF" },
  { name: "Active Bubble", icon: "💬", desc: "Premium Chat Bubble", color: "#EC4899" },
  { name: "Active Entrance", icon: "✨", desc: "VIP Entry Animation", color: "#A855F7" },
];

export const nextRewards = [
  { name: "Upcoming Badge", icon: "🏅", desc: "Golden Knight Crest", color: "#F59E0B", req: "LV51" },
  { name: "Upcoming Crown", icon: "👑", desc: "Gold Champion Crown", color: "#FFC83D", req: "LV61" },
  { name: "Upcoming Frame", icon: "🖼️", desc: "Gold Premium Frame", color: "#F59E0B", req: "LV51" },
  { name: "Upcoming Nameplate", icon: "🏷️", desc: "Knight Nameplate", color: "#1F6BFF", req: "LV51" },
  { name: "Upcoming Entrance", icon: "🚀", desc: "Knight Valor Effect", color: "#A855F7", req: "LV51" },
  { name: "Upcoming Achievement", icon: "🏆", desc: "Golden Knight Trophy", color: "#FFC83D", req: "LV55" },
];

export const rewardGalleryCategories = [
  { name: "Badges", icon: "🏅", count: "31 Items", color: "#FFC83D" },
  { name: "Crowns", icon: "👑", count: "24 Items", color: "#F59E0B" },
  { name: "Frames", icon: "🖼️", count: "28 Items", color: "#22D3EE" },
  { name: "Nameplates", icon: "🏷️", count: "20 Items", color: "#1F6BFF" },
  { name: "Chat Bubbles", icon: "💬", count: "16 Items", color: "#EC4899" },
  { name: "Entrance Effects", icon: "✨", count: "14 Items", color: "#A855F7" },
  { name: "Gift Effects", icon: "🎁", count: "22 Items", color: "#EF4444" },
];

export const achievements = [
  { name: "First Steps", icon: "👣", rarity: "Common", unlocked: true, desc: "Reach LV1" },
  { name: "Social Butterfly", icon: "🦋", rarity: "Rare", unlocked: true, desc: "Get 100 followers" },
  { name: "Gift Master", icon: "🎁", rarity: "Epic", unlocked: true, desc: "Send 1000 gifts" },
  { name: "Rising Star", icon: "⭐", rarity: "Epic", unlocked: true, desc: "Reach LV25" },
  { name: "Party Animal", icon: "🎉", rarity: "Rare", unlocked: true, desc: "Join 50 party rooms" },
  { name: "Silver Commander", icon: "🎖️", rarity: "Epic", unlocked: true, desc: "Reach LV31" },
  { name: "Diamond Elite", icon: "💎", rarity: "Legendary", unlocked: false, desc: "Reach LV101" },
  { name: "Royal Emperor", icon: "👑", rarity: "Legendary", unlocked: false, desc: "Reach LV181" },
  { name: "Mythic Supreme", icon: "✨", rarity: "Mythic", unlocked: false, desc: "Reach LV241" },
  { name: "Universe Emperor", icon: "🌌", rarity: "Mythic", unlocked: false, desc: "Reach LV300" },
];

export const privileges = [
  { name: "Premium Chat Bubble", icon: "💬", status: "Active", desc: "Exclusive chat styling", color: "#EC4899" },
  { name: "VIP Entry Animation", icon: "✨", status: "Active", desc: "Special room entrance", color: "#A855F7" },
  { name: "Username Highlight", icon: "💡", status: "Active", desc: "Glowing username", color: "#FFC83D" },
  { name: "Daily Reward Boost", icon: "📈", status: "Active", desc: "Enhanced daily rewards", color: "#22D3EE" },
  { name: "Diamond Frame", icon: "💎", status: "Upcoming", desc: "Unlocks at LV101", color: "#22D3EE" },
  { name: "Royal Entrance", icon: "🐉", status: "Upcoming", desc: "Unlocks at LV171", color: "#A855F7" },
  { name: "Exclusive Events", icon: "🎪", status: "Upcoming", desc: "Unlocks at LV61", color: "#F59E0B" },
  { name: "Global Recognition", icon: "🌍", status: "Upcoming", desc: "Unlocks at LV201", color: "#1F6BFF" },
];

export const milestones = [
  { level: 10, name: "First Milestone", icon: "🛡️", coins: "1.5M", reached: true },
  { level: 20, name: "Explorer", icon: "👑", coins: "4M", reached: true },
  { level: 30, name: "Guardian", icon: "🎖️", coins: "8M", reached: true },
  { level: 50, name: "Silver Emperor", icon: "👑", coins: "25M", reached: false },
  { level: 100, name: "Golden Supreme", icon: "🏆", coins: "220M", reached: false },
  { level: 150, name: "Diamond Emperor", icon: "💎", coins: "1B", reached: false },
  { level: 200, name: "Royal Sovereign", icon: "🦅", coins: "3B", reached: false },
  { level: 250, name: "Mythic Supreme", icon: "✨", coins: "13B", reached: false },
  { level: 300, name: "Universe Emperor", icon: "🌌", coins: "50B", reached: false },
];

export const collectionProgress = [
  { name: "Bronze", icon: "🛡️", progress: 100, color: "#B8860B" },
  { name: "Silver", icon: "🥈", progress: 80, color: "#94A3B8" },
  { name: "Gold", icon: "🥇", progress: 0, color: "#F59E0B" },
  { name: "Diamond", icon: "💎", progress: 0, color: "#22D3EE" },
  { name: "Royal", icon: "👑", progress: 0, color: "#A855F7" },
  { name: "Mythic", icon: "✨", progress: 0, color: "#EC4899" },
  { name: "Legendary", icon: "🐲", progress: 0, color: "#EF4444" },
  { name: "Universe", icon: "🌌", progress: 0, color: "#6366F1" },
];

export const leaderboardStatus = [
  { label: "Global Rank", value: "#1,247", icon: "🌍", color: "#1F6BFF", trend: "▲ 12" },
  { label: "Country Rank", value: "#89", icon: "🇵🇰", color: "#22C55E", trend: "▲ 5" },
  { label: "Friends Rank", value: "#3", icon: "👥", color: "#A855F7", trend: "▲ 1" },
  { label: "Monthly Rank", value: "#456", icon: "📅", color: "#FFC83D", trend: "▼ 8" },
];

export const levelHistory = [
  { type: "Level Up", desc: "Reached LV35", icon: "⬆️", date: "2 hours ago", color: "#1F6BFF" },
  { type: "Reward", desc: "Unlocked Silver Frame", icon: "🖼️", date: "2 hours ago", color: "#22D3EE" },
  { type: "Achievement", desc: "Earned Silver Commander", icon: "🎖️", date: "1 day ago", color: "#94A3B8" },
  { type: "Level Up", desc: "Reached LV34", icon: "⬆️", date: "3 days ago", color: "#1F6BFF" },
  { type: "Reward", desc: "Unlocked Daily Boost", icon: "📈", date: "3 days ago", color: "#22C55E" },
  { type: "Achievement", desc: "Earned Rising Star", icon: "⭐", date: "1 week ago", color: "#FFC83D" },
];

export const dashboardTabs = [
  { key: "overview", label: "Overview", icon: "📊" },
  { key: "journey", label: "Journey", icon: "🛤️" },
  { key: "rewards", label: "Rewards", icon: "🎁" },
  { key: "achievements", label: "Achievements", icon: "🏆" },
  { key: "collections", label: "Collections", icon: "💎" },
  { key: "privileges", label: "Privileges", icon: "👑" },
  { key: "statistics", label: "Statistics", icon: "📈" },
];

export const rarityColors = {
  Common: "#94A3B8",
  Rare: "#3B82F6",
  Epic: "#A855F7",
  Legendary: "#F59E0B",
  Mythic: "#EF4444",
};