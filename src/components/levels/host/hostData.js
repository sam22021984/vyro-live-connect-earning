// Host Level Dashboard data
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

export const currentHostUser = {
  level: 18,
  username: "VYRO Owner",
  hostId: "VY-HOST-283947",
  tierName: "Rising Star Host",
  badge: "Silver Microphone",
  crown: "Crystal Host Crown",
  agencyStatus: "Elite Agency Member",
  hostStatus: "Active Host",
  totalHostCoins: "8,450,000",
  monthlyTarget: "12,000,000",
  xp: 18800,
  xpMax: 25000,
  progress: 62,
  ranking: "#234",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop",
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

export const hostPerformance = [
  { label: "Total Earnings", value: "8.45M", icon: "💰", color: "#FFC83D" },
  { label: "Monthly", value: "1.2M", icon: "📅", color: "#22C55E" },
  { label: "Weekly", value: "320K", icon: "📊", color: "#1F6BFF" },
  { label: "Daily", value: "45K", icon: "☀️", color: "#F59E0B" },
  { label: "Gifts Received", value: "5,820", icon: "🎁", color: "#EC4899" },
  { label: "Diamonds", value: "2.1M", icon: "💎", color: "#22D3EE" },
  { label: "Coins Earned", value: "8.45M", icon: "🪙", color: "#FFC83D" },
  { label: "Revenue Stats", value: "92%", icon: "📈", color: "#A855F7" },
];

export const liveStreamPerf = [
  { label: "Total Live Hours", value: "1,247", icon: "⏱️", color: "#1F6BFF" },
  { label: "Monthly Hours", value: "186", icon: "📅", color: "#22C55E" },
  { label: "Weekly Hours", value: "42", icon: "📊", color: "#FFC83D" },
  { label: "Daily Hours", value: "6.2", icon: "☀️", color: "#F59E0B" },
  { label: "Consistency", value: "94%", icon: "🎯", color: "#22D3EE" },
  { label: "Completion Rate", value: "88%", icon: "✅", color: "#22C55E" },
  { label: "Peak Hours", value: "8-10 PM", icon: "🏔️", color: "#EF4444" },
];

export const audienceAnalytics = [
  { label: "Total Followers", value: "24.8K", icon: "👥", color: "#1F6BFF" },
  { label: "New Followers", value: "+890", icon: "📈", color: "#22C55E" },
  { label: "Active Followers", value: "16.2K", icon: "🟢", color: "#22C55E" },
  { label: "Returning Viewers", value: "8.4K", icon: "🔁", color: "#A855F7" },
  { label: "Retention Rate", value: "82%", icon: "🎯", color: "#22D3EE" },
  { label: "Viewer Growth", value: "+18%", icon: "🚀", color: "#EC4899" },
  { label: "Engagement", value: "91/100", icon: "⚡", color: "#F59E0B" },
];

export const roomPerformance = [
  { label: "Room Visits", value: "45.2K", icon: "🚪", color: "#1F6BFF" },
  { label: "Peak Users", value: "2,840", icon: "🏔️", color: "#EF4444" },
  { label: "Avg Online", value: "420", icon: "📊", color: "#FFC83D" },
  { label: "Party Activity", value: "High", icon: "🎉", color: "#EC4899" },
  { label: "Popularity Score", value: "89/100", icon: "⭐", color: "#F59E0B" },
  { label: "Room Ranking", value: "#12", icon: "🏆", color: "#A855F7" },
];

export const hostBenefits = [
  { name: "Host Badge", icon: "🏅", desc: "Silver Microphone", color: "#94A3B8" },
  { name: "Host Crown", icon: "👑", desc: "Crystal Host Crown", color: "#FFC83D" },
  { name: "Host Frame", icon: "🖼️", desc: "Silver Host Frame", color: "#22D3EE" },
  { name: "Host Privileges", icon: "⭐", desc: "Priority Hosting", color: "#A855F7" },
  { name: "Host Features", icon: "✨", desc: "Premium Tools", color: "#3B82F6" },
  { name: "Host Rewards", icon: "🎁", desc: "Monthly Bonus Pack", color: "#EC4899" },
];

export const nextHostRewards = [
  { name: "Upcoming Badge", icon: "🏅", desc: "Gold Microphone", color: "#F59E0B", req: "LV21" },
  { name: "Upcoming Crown", icon: "👑", desc: "Gold Host Crown", color: "#FFC83D", req: "LV21" },
  { name: "Upcoming Frame", icon: "🖼️", desc: "Gold Host Frame", color: "#F59E0B", req: "LV21" },
  { name: "Upcoming Entrance", icon: "🚀", desc: "Pro Host Entry", color: "#3B82F6", req: "LV21" },
  { name: "Upcoming Privileges", icon: "⭐", desc: "VIP Host Access", color: "#A855F7", req: "LV21" },
  { name: "Upcoming Achievement", icon: "🏆", desc: "Pro Host Trophy", color: "#FFC83D", req: "LV25" },
];

export const hostGalleryCategories = [
  { name: "Host Badges", icon: "🏅", count: "14 Items", color: "#FFC83D" },
  { name: "Host Crowns", icon: "👑", count: "12 Items", color: "#F59E0B" },
  { name: "Host Frames", icon: "🖼️", count: "18 Items", color: "#22D3EE" },
  { name: "Host Nameplates", icon: "🏷️", count: "16 Items", color: "#1F6BFF" },
  { name: "Entrance Effects", icon: "✨", count: "12 Items", color: "#3B82F6" },
  { name: "Host Room Effects", icon: "🎭", count: "20 Items", color: "#A855F7" },
  { name: "Achievement Trophies", icon: "🏆", count: "10 Items", color: "#EF4444" },
];

export const hostAchievements = [
  { name: "First Live Stream", icon: "🔴", rarity: "Common", unlocked: true, desc: "Go live for the first time" },
  { name: "First 100 Followers", icon: "💯", rarity: "Common", unlocked: true, desc: "Reach 100 followers" },
  { name: "First 1K Followers", icon: "🎉", rarity: "Rare", unlocked: true, desc: "Reach 1,000 followers" },
  { name: "First Revenue", icon: "💰", rarity: "Rare", unlocked: true, desc: "Earn first coins" },
  { name: "Top Ranking", icon: "⭐", rarity: "Epic", unlocked: true, desc: "Reach top 500 hosts" },
  { name: "Featured Host", icon: "🌟", rarity: "Epic", unlocked: true, desc: "Get featured on homepage" },
  { name: "Elite Host", icon: "💎", rarity: "Legendary", unlocked: false, desc: "Reach LV50" },
  { name: "Global Host", icon: "🌍", rarity: "Mythic", unlocked: false, desc: "Reach LV100" },
];

export const hostMilestones = [
  { level: 10, name: "First Live Stream", icon: "🔴", coins: "3M", reached: true },
  { level: 20, name: "Rising Star", icon: "⭐", coins: "8M", reached: true },
  { level: 50, name: "Champion Host", icon: "🏆", coins: "100M", reached: false },
  { level: 100, name: "Legend Host", icon: "💎", coins: "1.2B", reached: false },
  { level: 150, name: "Titan Host", icon: "⚡", coins: "10B", reached: false },
  { level: 200, name: "Universe Emperor", icon: "🌌", coins: "40B", reached: false },
];

export const hostCollections = [
  { name: "Bronze Host", icon: "🥉", progress: 100, color: "#B8860B" },
  { name: "Silver Host", icon: "🥈", progress: 75, color: "#94A3B8" },
  { name: "Gold Host", icon: "🥇", progress: 0, color: "#F59E0B" },
  { name: "Diamond Host", icon: "💎", progress: 0, color: "#22D3EE" },
  { name: "Royal Host", icon: "👑", progress: 0, color: "#A855F7" },
  { name: "Mythic Host", icon: "✨", progress: 0, color: "#EC4899" },
  { name: "Legendary Host", icon: "🐲", progress: 0, color: "#EF4444" },
];

export const hostLeaderboard = [
  { label: "Global Host Rank", value: "#234", icon: "🌍", color: "#1F6BFF", trend: "▲ 15" },
  { label: "Country Rank", value: "#12", icon: "🇵🇰", color: "#22C55E", trend: "▲ 3" },
  { label: "Agency Rank", value: "#4", icon: "🏢", color: "#A855F7", trend: "▲ 1" },
  { label: "Monthly Rank", value: "#89", icon: "📅", color: "#FFC83D", trend: "▲ 22" },
  { label: "Weekly Rank", value: "#45", icon: "📊", color: "#22D3EE", trend: "▼ 5" },
  { label: "Daily Rank", value: "#18", icon: "☀️", color: "#F59E0B", trend: "▲ 7" },
];

export const hostStatistics = [
  { label: "Total Streams", value: "412", icon: "📡", color: "#EF4444" },
  { label: "Streaming Hours", value: "1,247", icon: "⏱️", color: "#22C55E" },
  { label: "Total Earnings", value: "8.45M", icon: "💰", color: "#FFC83D" },
  { label: "Followers", value: "24.8K", icon: "👥", color: "#1F6BFF" },
  { label: "Total Likes", value: "18.2K", icon: "❤️", color: "#EF4444" },
  { label: "Gifts Received", value: "5,820", icon: "🎁", color: "#EC4899" },
  { label: "Visitors", value: "45.2K", icon: "👁️", color: "#3B82F6" },
  { label: "Events Joined", value: "56", icon: "🎪", color: "#F59E0B" },
  { label: "Events Won", value: "12", icon: "🏆", color: "#A855F7" },
];

export const hostHistory = [
  { type: "Level Up", desc: "Reached Host LV18", icon: "⬆️", date: "3 hours ago", color: "#EF4444" },
  { type: "Reward", desc: "Unlocked Crystal Host Crown", icon: "👑", date: "3 hours ago", color: "#FFC83D" },
  { type: "Earnings", desc: "Earned 45K coins today", icon: "💰", date: "5 hours ago", color: "#22C55E" },
  { type: "Achievement", desc: "Earned Featured Host badge", icon: "🌟", date: "1 day ago", color: "#F59E0B" },
  { type: "Event", desc: "Won PK Battle Royale", icon: "⚔️", date: "2 days ago", color: "#EF4444" },
  { type: "Milestone", desc: "Reached 1,000 followers", icon: "🎉", date: "3 days ago", color: "#EC4899" },
];

export const agencyStatus = {
  name: "Elite Broadcasting Agency",
  rank: "#4 Global",
  status: "Active Member",
  level: "Gold Tier Agency",
  performance: "94/100",
};

export const monthlyTargets = [
  { label: "Streaming Target", current: "186 hrs", target: "200 hrs", progress: 93, color: "#1F6BFF" },
  { label: "Earnings Target", current: "1.2M", target: "1.5M", progress: 80, color: "#FFC83D" },
  { label: "Viewer Target", current: "12K", target: "15K", progress: 80, color: "#22C55E" },
  { label: "Follower Target", current: "+890", target: "+1,000", progress: 89, color: "#EC4899" },
];

export const hostEvents = [
  { name: "Host Championship", icon: "🏆", status: "Active", desc: "Rank #4", color: "#FFC83D" },
  { name: "PK Battle Royale", icon: "⚔️", status: "Active", desc: "Ends in 2 days", color: "#EF4444" },
  { name: "Creator Awards", icon: "🌟", status: "Upcoming", desc: "Next week", color: "#A855F7" },
  { name: "Streaming Marathon", icon: "🏃", status: "Upcoming", desc: "Next month", color: "#22C55E" },
  { name: "Trending Host Challenge", icon: "📈", status: "Active", desc: "Score: 89/100", color: "#3B82F6" },
  { name: "Anniversary Gala", icon: "🎉", status: "Upcoming", desc: "Next month", color: "#EC4899" },
];

export const rarityColors = {
  Common: "#94A3B8",
  Rare: "#3B82F6",
  Epic: "#A855F7",
  Legendary: "#F59E0B",
  Mythic: "#EF4444",
};

export const hostBottomActions = [
  { label: "Streams", icon: "📡", color: "#EF4444" },
  { label: "Earnings", icon: "💰", color: "#FFC83D" },
  { label: "Rewards", icon: "🎁", color: "#EC4899" },
  { label: "Achievements", icon: "🏆", color: "#A855F7" },
  { label: "Leaderboard", icon: "📈", color: "#3B82F6" },
];