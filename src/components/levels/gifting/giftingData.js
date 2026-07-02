// Gifting Level Dashboard data
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

export const currentGifterUser = {
  level: 40,
  username: "VYRO Owner",
  gifterId: "VY-GIFTER-847291",
  tierName: "Diamond Gifter",
  badge: "Diamond Gift Box",
  crown: "Royal Gift Crown",
  giftingRank: "#45",
  vipStatus: "VIP Diamond",
  totalCoinsSent: "75,000,000",
  monthlyTarget: "100,000,000",
  xp: 68000,
  xpMax: 100000,
  progress: 68,
  ranking: "#45",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop",
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

export const giftingPerformance = [
  { label: "Total Coins Sent", value: "75M", icon: "🪙", color: "#F59E0B" },
  { label: "Gifts Sent", value: "12,847", icon: "🎁", color: "#EC4899" },
  { label: "Event Gifts", value: "2,340", icon: "🎉", color: "#A855F7" },
  { label: "Party Gifts", value: "3,892", icon: "🎊", color: "#22C55E" },
  { label: "Stream Gifts", value: "5,128", icon: "📡", color: "#3B82F6" },
  { label: "Premium Gifts", value: "1,487", icon: "💎", color: "#22D3EE" },
  { label: "Monthly Spending", value: "8.5M", icon: "📅", color: "#EF4444" },
  { label: "Weekly Spending", value: "2.1M", icon: "📊", color: "#1F6BFF" },
];

export const giftingAnalytics = [
  { label: "Top Supported Host", value: "@StarHost", icon: "🎤", color: "#EF4444" },
  { label: "Most Gifted User", value: "@TopCreator", icon: "⭐", color: "#F59E0B" },
  { label: "Favorite Category", value: "Luxury Gifts", icon: "💖", color: "#EC4899" },
  { label: "Monthly Contribution", value: "8.5M", icon: "📅", color: "#22C55E" },
  { label: "Contribution Score", value: "94/100", icon: "🏆", color: "#A855F7" },
  { label: "Gifting Consistency", value: "92%", icon: "🎯", color: "#3B82F6" },
];

export const giftingBenefits = [
  { name: "Gifter Badge", icon: "🏅", desc: "Diamond Gift Box", color: "#22D3EE" },
  { name: "Gifter Crown", icon: "👑", desc: "Royal Gift Crown", color: "#FFC83D" },
  { name: "Active Nameplate", icon: "🏷️", desc: "Diamond Supporter", color: "#1F6BFF" },
  { name: "Active Frame", icon: "🖼️", desc: "Crystal Gift Frame", color: "#A855F7" },
  { name: "Entrance Effect", icon: "✨", desc: "Diamond Entry Burst", color: "#3B82F6" },
  { name: "Chat Bubble", icon: "💬", desc: "Gold Gift Bubble", color: "#F59E0B" },
];

export const nextGiftingRewards = [
  { name: "Upcoming Badge", icon: "🏅", desc: "Royal Gift Badge", color: "#FFC83D", req: "LV41" },
  { name: "Upcoming Crown", icon: "👑", desc: "Mythic Gift Crown", color: "#A855F7", req: "LV41" },
  { name: "Upcoming Frame", icon: "🖼️", desc: "Royal Gift Frame", color: "#EC4899", req: "LV41" },
  { name: "Upcoming Nameplate", icon: "🏷️", desc: "Royal Supporter", color: "#3B82F6", req: "LV41" },
  { name: "Upcoming Entrance", icon: "🚀", desc: "Royal Gift Entry", color: "#22D3EE", req: "LV45" },
  { name: "Upcoming Gift Effect", icon: "🎆", desc: "Diamond Burst FX", color: "#F59E0B", req: "LV45" },
];

export const giftingGalleryCategories = [
  { name: "Gifter Badges", icon: "🏅", count: "14 Items", color: "#FFC83D" },
  { name: "Gifter Crowns", icon: "👑", count: "12 Items", color: "#A855F7" },
  { name: "Gifter Frames", icon: "🖼️", count: "18 Items", color: "#EC4899" },
  { name: "Gifter Nameplates", icon: "🏷️", count: "16 Items", color: "#1F6BFF" },
  { name: "Gifter Bubbles", icon: "💬", count: "20 Items", color: "#22D3EE" },
  { name: "Gift Effects", icon: "🎆", count: "24 Items", color: "#F59E0B" },
  { name: "Entrance Effects", icon: "✨", count: "12 Items", color: "#3B82F6" },
];

export const supporterCollections = [
  { name: "Bronze Supporter", icon: "🥉", progress: 100, color: "#B8860B" },
  { name: "Silver Supporter", icon: "🥈", progress: 100, color: "#94A3B8" },
  { name: "Gold Supporter", icon: "🥇", progress: 100, color: "#F59E0B" },
  { name: "Diamond Supporter", icon: "💎", progress: 75, color: "#22D3EE" },
  { name: "Royal Supporter", icon: "👑", progress: 0, color: "#A855F7" },
  { name: "Mythic Supporter", icon: "✨", progress: 0, color: "#EC4899" },
  { name: "Legendary Supporter", icon: "🔥", progress: 0, color: "#EF4444" },
  { name: "Universe Supporter", icon: "🌌", progress: 0, color: "#3B82F6" },
];

export const giftingAchievements = [
  { name: "First Gift Sent", icon: "🎁", rarity: "Common", unlocked: true, desc: "Send your first gift" },
  { name: "First Million Sent", icon: "💰", rarity: "Rare", unlocked: true, desc: "Send 1M coins in gifts" },
  { name: "Top Supporter", icon: "🤝", rarity: "Epic", unlocked: true, desc: "Become a top supporter" },
  { name: "Event Supporter", icon: "🎉", rarity: "Epic", unlocked: true, desc: "Support 10 events" },
  { name: "Elite Gifter", icon: "💎", rarity: "Legendary", unlocked: true, desc: "Reach Diamond tier" },
  { name: "Legendary Gifter", icon: "🔥", rarity: "Mythic", unlocked: false, desc: "Reach LV100" },
  { name: "Universe Gifter", icon: "🌌", rarity: "Mythic", unlocked: false, desc: "Reach LV150" },
  { name: "Supreme Gifter", icon: "👑", rarity: "Mythic", unlocked: false, desc: "Reach LV200" },
];

export const giftingMilestones = [
  { level: 10, name: "Rookie Milestone", icon: "🎁", coins: "5M", reached: true },
  { level: 20, name: "Bronze Milestone", icon: "🥉", coins: "15M", reached: true },
  { level: 30, name: "Silver Milestone", icon: "🥈", coins: "35M", reached: true },
  { level: 40, name: "Diamond Milestone", icon: "💎", coins: "75M", reached: true },
  { level: 50, name: "Royal Milestone", icon: "👑", coins: "150M", reached: false },
  { level: 100, name: "Legendary Milestone", icon: "🔥", coins: "1.5B", reached: false },
  { level: 150, name: "Universe Milestone", icon: "🌌", coins: "12B", reached: false },
  { level: 200, name: "Supreme Milestone", icon: "👑", coins: "50B", reached: false },
];

export const giftingLeaderboard = [
  { label: "Global Gifting Rank", value: "#45", icon: "🌍", color: "#1F6BFF", trend: "▲ 12" },
  { label: "Country Rank", value: "#8", icon: "🇵🇰", color: "#22C55E", trend: "▲ 3" },
  { label: "Monthly Rank", value: "#67", icon: "📅", color: "#FFC83D", trend: "▲ 18" },
  { label: "Weekly Rank", value: "#32", icon: "📊", color: "#22D3EE", trend: "▲ 7" },
  { label: "Daily Rank", value: "#15", icon: "☀️", color: "#F59E0B", trend: "▲ 4" },
];

export const giftingPrivileges = [
  { name: "VIP Supporter Status", icon: "💎", desc: "Premium VIP recognition", color: "#22D3EE" },
  { name: "Priority Recognition", icon: "⭐", desc: "Featured in supporter feeds", color: "#FFC83D" },
  { name: "Special Profile Effects", icon: "✨", desc: "Exclusive profile animations", color: "#A855F7" },
  { name: "Premium Nameplate", icon: "🏷️", desc: "Diamond nameplate display", color: "#1F6BFF" },
  { name: "Exclusive Gift Effects", icon: "🎆", desc: "Unique gift animations", color: "#EC4899" },
  { name: "Special Event Access", icon: "🎟️", desc: "VIP event invitations", color: "#22C55E" },
];

export const giftingHistory = [
  { type: "Gift Sent", desc: "Sent Diamond Ring to @StarHost", icon: "💎", date: "2 hours ago", color: "#22D3EE" },
  { type: "Milestone", desc: "Reached 75M coins sent", icon: "🏆", date: "2 hours ago", color: "#FFC83D" },
  { type: "Reward", desc: "Unlocked Royal Gift Crown", icon: "👑", date: "5 hours ago", color: "#A855F7" },
  { type: "Achievement", desc: "Earned Elite Gifter badge", icon: "💎", date: "1 day ago", color: "#22D3EE" },
  { type: "Gift Sent", desc: "Sent Luxury Car to @TopCreator", icon: "🚗", date: "1 day ago", color: "#EC4899" },
  { type: "Event", desc: "Supported Festival Gala event", icon: "🎉", date: "2 days ago", color: "#22C55E" },
];

export const rarityColors = {
  Common: "#94A3B8",
  Rare: "#3B82F6",
  Epic: "#A855F7",
  Legendary: "#F59E0B",
  Mythic: "#EF4444",
};

export const giftingBottomActions = [
  { label: "My Gifts", icon: "🎁", color: "#F59E0B" },
  { label: "Rewards", icon: "💎", color: "#EC4899" },
  { label: "Achievements", icon: "🏆", color: "#A855F7" },
  { label: "Collections", icon: "💎", color: "#22D3EE" },
  { label: "Leaderboard", icon: "🥇", color: "#1F6BFF" },
];