// ============= COLOR SYSTEM =============
export const COLORS = {
  primary: "#1F6BFF",
  navy: "#0D1B3E",
  gold: "#FFC83D",
  cardBg: "#F5F7FA",
  white: "#FFFFFF",
  success: "#10B981",
  danger: "#EF4444",
  muted: "#9CA3AF",
};

// ============= BADGE DATA =============
export const badgeCategories = [
  { key: "vip", label: "VIP", icon: "💎" },
  { key: "host", label: "Host", icon: "🎙️" },
  { key: "agency", label: "Agency", icon: "🏢" },
  { key: "achievement", label: "Achievement", icon: "🏆" },
  { key: "event", label: "Event", icon: "🎉" },
  { key: "special", label: "Special", icon: "⭐" },
];

export const badges = {
  vip: [
    { id: "b1", name: "VIP Diamond", level: "Gold", icon: "💎", description: "Premium VIP member badge", unlock_date: "Jun 15, 2026", status: "active", color: "#8B5CF6" },
    { id: "b2", name: "VIP Crown", level: "Platinum", icon: "👑", description: "Elite VIP tier badge", unlock_date: "May 20, 2026", status: "unlocked", color: "#EC4899" },
    { id: "b3", name: "VIP Star", level: "Silver", icon: "🌟", description: "VIP silver member", unlock_date: "Locked", status: "locked", color: "#9CA3AF" },
  ],
  host: [
    { id: "b4", name: "Star Host", level: "Gold", icon: "🎤", description: "Top performing host badge", unlock_date: "Jun 10, 2026", status: "unlocked", color: "#F59E0B" },
    { id: "b5", name: "Rising Host", level: "Bronze", icon: "📈", description: "Fast growing host", unlock_date: "Jun 28, 2026", status: "active", color: "#CD7F32" },
    { id: "b6", name: "Live Master", level: "Platinum", icon: "🎬", description: "1000+ live hours", unlock_date: "Locked", status: "locked", color: "#3B82F6" },
  ],
  agency: [
    { id: "b7", name: "Top Agency", level: "Gold", icon: "🏢", description: "Leading agency badge", unlock_date: "Jun 05, 2026", status: "unlocked", color: "#10B981" },
    { id: "b8", name: "Elite Agency", level: "Platinum", icon: "🏛️", description: "Top 10 agency", unlock_date: "Locked", status: "locked", color: "#6366F1" },
  ],
  achievement: [
    { id: "b9", name: "First Recharge", level: "Bronze", icon: "💳", description: "Completed first recharge", unlock_date: "Mar 12, 2026", status: "unlocked", color: "#CD7F32" },
    { id: "b10", name: "100 Followers", level: "Silver", icon: "👥", description: "Reached 100 followers", unlock_date: "Apr 18, 2026", status: "active", color: "#9CA3AF" },
    { id: "b11", name: "Top Gifter", level: "Gold", icon: "💝", description: "Top 100 gifters", unlock_date: "Jun 22, 2026", status: "unlocked", color: "#EC4899" },
  ],
  event: [
    { id: "b12", name: "Summer Champion", level: "Gold", icon: "🏖️", description: "Summer event winner", unlock_date: "Jun 30, 2026", status: "active", color: "#F59E0B" },
    { id: "b13", name: "PK Winner", level: "Silver", icon: "⚔️", description: "Won 5 PK battles", unlock_date: "May 15, 2026", status: "unlocked", color: "#EF4444" },
  ],
  special: [
    { id: "b14", name: "Founder", level: "Legendary", icon: "👑", description: "Early VYRO member", unlock_date: "Jan 01, 2026", status: "active", color: "#FFC83D" },
    { id: "b15", name: "Verified", level: "Special", icon: "✅", description: "Verified account", unlock_date: "Feb 10, 2026", status: "active", color: "#3B82F6" },
  ],
};

// ============= MEDAL DATA =============
export const medalCategories = [
  { key: "daily", label: "Daily", icon: "📅" },
  { key: "monthly", label: "Monthly", icon: "🗓️" },
  { key: "vip", label: "VIP", icon: "💎" },
  { key: "supporter", label: "Supporter", icon: "💝" },
  { key: "host", label: "Host", icon: "🎙️" },
  { key: "event", label: "Event", icon: "🎉" },
];

export const medals = {
  daily: [
    { id: "m1", name: "Daily Login Streak", rank: "#1", icon: "🥇", reward: "100 Coins", earned_date: "Jul 02, 2026", equipped: true },
    { id: "m2", name: "Daily Gifter", rank: "#2", icon: "🥈", reward: "50 Coins", earned_date: "Jul 01, 2026", equipped: false },
    { id: "m3", name: "Daily Streamer", rank: "#3", icon: "🥉", reward: "30 Coins", earned_date: "Jun 30, 2026", equipped: false },
  ],
  monthly: [
    { id: "m4", name: "Monthly Champion", rank: "#1", icon: "🏆", reward: "5000 Coins + VIP Frame", earned_date: "Jun 30, 2026", equipped: true },
    { id: "m5", name: "Monthly Star", rank: "#5", icon: "⭐", reward: "1000 Coins", earned_date: "Jun 28, 2026", equipped: false },
  ],
  vip: [
    { id: "m6", name: "VIP Elite", rank: "#1", icon: "💎", reward: "VIP 30 Days", earned_date: "Jun 15, 2026", equipped: false },
    { id: "m7", name: "VIP Gold", rank: "#3", icon: "🥇", reward: "2000 Coins", earned_date: "May 20, 2026", equipped: false },
  ],
  supporter: [
    { id: "m8", name: "Top Supporter", rank: "#1", icon: "💝", reward: "5000 Coins + Badge", earned_date: "Jun 25, 2026", equipped: true },
    { id: "m9", name: "Generous Heart", rank: "#2", icon: "❤️", reward: "2000 Coins", earned_date: "Jun 10, 2026", equipped: false },
  ],
  host: [
    { id: "m10", name: "Top Host", rank: "#1", icon: "👑", reward: "10000 Coins + Crown", earned_date: "Jun 20, 2026", equipped: false },
    { id: "m11", name: "Popular Host", rank: "#4", icon: "🎤", reward: "3000 Coins", earned_date: "Jun 05, 2026", equipped: false },
  ],
  event: [
    { id: "m12", name: "PK Champion", rank: "#1", icon: "⚔️", reward: "5000 Coins + PK Crown", earned_date: "May 28, 2026", equipped: false },
    { id: "m13", name: "Summer Winner", rank: "#1", icon: "🏖️", reward: "3000 Coins + Frame", earned_date: "Jun 30, 2026", equipped: false },
  ],
};

// ============= LEVEL & XP DATA =============
export const levelData = {
  current_level: 42,
  current_xp: 8450,
  required_xp: 10000,
  rank: "Diamond",
  xp_today: 320,
  xp_week: 1850,
  xp_month: 7200,
  next_level_rewards: [
    { type: "Coins", amount: "500", icon: "🪙" },
    { type: "Diamonds", amount: "50", icon: "💎" },
    { type: "VIP Frame", amount: "3 Days", icon: "🖼️" },
    { type: "Entry Effect", amount: "Special", icon: "✨" },
  ],
};

export const levelBenefits = [
  { name: "Exclusive Badge", icon: "🏅", desc: "Diamond level badge" },
  { name: "Profile Frame", icon: "🖼️", desc: "Premium profile frame" },
  { name: "Gift Discount", icon: "💰", desc: "10% off all gifts" },
  { name: "Coin Boost", icon: "⚡", desc: "1.5x coins on recharge" },
  { name: "Priority Support", icon: "🛟", desc: "Fast customer support" },
  { name: "Special Entry", icon: "✨", desc: "Room entry effect" },
];

export const xpHistory = [
  { id: "xp1", activity: "Daily Login", amount: 50, date: "Jul 02, 10:30 AM", icon: "📅" },
  { id: "xp2", activity: "Sent Gift to Host", amount: 80, date: "Jul 02, 09:15 AM", icon: "💝" },
  { id: "xp3", activity: "Watched Live Stream", amount: 120, date: "Jul 01, 08:00 PM", icon: "📺" },
  { id: "xp4", activity: "Completed Task", amount: 70, date: "Jul 01, 05:45 PM", icon: "✅" },
  { id: "xp5", activity: "Joined Party Room", amount: 40, date: "Jul 01, 03:20 PM", icon: "🎉" },
  { id: "xp6", activity: "Recharged Coins", amount: 200, date: "Jul 01, 01:10 PM", icon: "💳" },
];

// ============= HISTORY DATA =============
export const historyTypes = [
  { key: "login", label: "Login", icon: "🔑" },
  { key: "recharge", label: "Recharge", icon: "💳" },
  { key: "withdrawal", label: "Withdraw", icon: "💸" },
  { key: "gift", label: "Gifts", icon: "🎁" },
  { key: "live", label: "Live", icon: "📺" },
  { key: "pk", label: "PK Battle", icon: "⚔️" },
  { key: "task", label: "Tasks", icon: "📋" },
  { key: "reward", label: "Rewards", icon: "🏆" },
];

export const historyFilters = [
  { key: "today", label: "Today" },
  { key: "7days", label: "7 Days" },
  { key: "30days", label: "30 Days" },
  { key: "custom", label: "Custom" },
];

export const historyRecords = {
  login: [
    { id: "h1", activity: "Login from Doha, Qatar", amount: "—", status: "Success", date: "Jul 02, 10:30 AM", icon: "🟢" },
    { id: "h2", activity: "Login from Doha, Qatar", amount: "—", status: "Success", date: "Jul 01, 09:15 AM", icon: "🟢" },
    { id: "h3", activity: "Login attempt blocked", amount: "—", status: "Blocked", date: "Jun 30, 11:00 PM", icon: "🔴" },
  ],
  recharge: [
    { id: "h4", activity: "Coin Recharge", amount: "+1,000 🪙", status: "Completed", date: "Jul 01, 01:10 PM", icon: "💳" },
    { id: "h5", activity: "Coin Recharge", amount: "+5,000 🪙", status: "Completed", date: "Jun 28, 03:45 PM", icon: "💳" },
    { id: "h6", activity: "Coin Recharge", amount: "+500 🪙", status: "Failed", date: "Jun 25, 08:00 AM", icon: "⚠️" },
  ],
  withdrawal: [
    { id: "h7", activity: "Withdrawal to Bank", amount: "-2,000 🪙", status: "Processing", date: "Jun 29, 02:00 PM", icon: "💸" },
    { id: "h8", activity: "Withdrawal to Bank", amount: "-1,000 🪙", status: "Completed", date: "Jun 20, 10:00 AM", icon: "✅" },
  ],
  gift: [
    { id: "h9", activity: "Gift sent to StarHost_Alice", amount: "-100 🪙", status: "Sent", date: "Jul 02, 09:15 AM", icon: "💝" },
    { id: "h10", activity: "Gift received from Fan123", amount: "+50 🪙", status: "Received", date: "Jul 01, 08:00 PM", icon: "🎁" },
    { id: "h11", activity: "Gift sent to LiveStar_Dan", amount: "-200 🪙", status: "Sent", date: "Jul 01, 05:45 PM", icon: "💝" },
  ],
  live: [
    { id: "h12", activity: "Live Stream Session", amount: "2h 30m", status: "Ended", date: "Jul 01, 08:00 PM", icon: "📺" },
    { id: "h13", activity: "Watched Stream", amount: "1h 15m", status: "Completed", date: "Jul 01, 06:00 PM", icon: "👀" },
  ],
  pk: [
    { id: "h14", activity: "PK Battle vs HostTeam", amount: "Won", status: "Victory", date: "Jun 30, 09:00 PM", icon: "🏆" },
    { id: "h15", activity: "PK Battle vs AgencyPro", amount: "Lost", status: "Defeat", date: "Jun 28, 10:00 PM", icon: "💔" },
  ],
  task: [
    { id: "h16", activity: "Daily Login Task", amount: "+50 🪙", status: "Claimed", date: "Jul 02, 10:30 AM", icon: "✅" },
    { id: "h17", activity: "Watch Live Task", amount: "+30 🪙", status: "Completed", date: "Jul 01, 08:30 PM", icon: "✅" },
  ],
  reward: [
    { id: "h18", activity: "Daily Bonus Day 3", amount: "+300 🪙", status: "Claimed", date: "Jul 02, 10:31 AM", icon: "🎁" },
    { id: "h19", activity: "Achievement: 100 Followers", amount: "+500 XP", status: "Claimed", date: "Jun 28, 04:00 PM", icon: "🏆" },
  ],
};

// ============= LEADERBOARD DATA =============
export const leaderboardCategories = [
  { key: "users", label: "Top Users", icon: "👤" },
  { key: "gifters", label: "Top Gifters", icon: "💝" },
  { key: "hosts", label: "Top Hosts", icon: "🎙️" },
  { key: "agencies", label: "Top Agencies", icon: "🏢" },
  { key: "vip", label: "Top VIP", icon: "💎" },
  { key: "families", label: "Top Families", icon: "👨‍👩‍👧‍👦" },
  { key: "countries", label: "Top Countries", icon: "🌍" },
];

export const rankingPeriods = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "yearly", label: "Yearly" },
  { key: "alltime", label: "All Time" },
];

export const leaderboardData = {
  users: [
    { id: "u1", rank: 1, name: "StarUser_Alice", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", points: 125400, reward: "👑 Crown + 10000 Coins" },
    { id: "u2", rank: 2, name: "VyroKing_Bob", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", points: 98200, reward: "🥈 + 5000 Coins" },
    { id: "u3", rank: 3, name: "TopFan_Cara", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", points: 87500, reward: "🥉 + 3000 Coins" },
    { id: "u4", rank: 4, name: "You", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", points: 64100, reward: "⭐ + 1000 Coins" },
    { id: "u5", rank: 5, name: "LiveStar_Dan", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", points: 54300, reward: "+ 500 Coins" },
  ],
  gifters: [
    { id: "g1", rank: 1, name: "GiftMaster_Eve", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", points: 450000, reward: "💝 + 20000 Coins" },
    { id: "g2", rank: 2, name: "Generous_Frank", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100", points: 380000, reward: "🥈 + 10000 Coins" },
    { id: "g3", rank: 3, name: "You", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", points: 320000, reward: "🥉 + 5000 Coins" },
  ],
  hosts: [
    { id: "ho1", rank: 1, name: "StarHost_Alice", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", points: 890000, reward: "👑 + 50000 Coins" },
    { id: "ho2", rank: 2, name: "VoiceMaster_Bob", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", points: 750000, reward: "🥈 + 30000 Coins" },
    { id: "ho3", rank: 3, name: "LiveQueen_Cara", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", points: 620000, reward: "🥉 + 15000 Coins" },
  ],
  agencies: [
    { id: "a1", rank: 1, name: "Elite Agency", avatar: "🏢", points: 2500000, reward: "🏆 + 100000 Coins" },
    { id: "a2", rank: 2, name: "Pro Agency", avatar: "🏛️", points: 1800000, reward: "🥈 + 50000 Coins" },
    { id: "a3", rank: 3, name: "Star Agency", avatar: "⭐", points: 1200000, reward: "🥉 + 30000 Coins" },
  ],
  vip: [
    { id: "v1", rank: 1, name: "DiamondKing", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", points: 980000, reward: "💎 + 30000 Coins" },
    { id: "v2", rank: 2, name: "PlatinumQueen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", points: 850000, reward: "🥈 + 20000 Coins" },
    { id: "v3", rank: 3, name: "You", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", points: 720000, reward: "🥉 + 10000 Coins" },
  ],
  families: [
    { id: "f1", rank: 1, name: "Royal Family", avatar: "👨‍👩‍👧‍👦", points: 3200000, reward: "👑 + 150000 Coins" },
    { id: "f2", rank: 2, name: "Star Family", avatar: "🌟", points: 2800000, reward: "🥈 + 80000 Coins" },
    { id: "f3", rank: 3, name: "Unity Family", avatar: "🤝", points: 2100000, reward: "🥉 + 50000 Coins" },
  ],
  countries: [
    { id: "c1", rank: 1, name: "🇸🇦 Saudi Arabia", avatar: "🌍", points: 15000000, reward: "🏆 Global Champion" },
    { id: "c2", rank: 2, name: "🇦🇪 UAE", avatar: "🌍", points: 12000000, reward: "🥈 Runner Up" },
    { id: "c3", rank: 3, name: "🇶🇦 Qatar", avatar: "🌍", points: 8500000, reward: "🥉 Third Place" },
    { id: "c4", rank: 4, name: "🇪🇬 Egypt", avatar: "🌍", points: 7200000, reward: "Top 5" },
  ],
};

// ============= PROFILE STATISTICS =============
export const profileStats = [
  { label: "Followers", value: 12450, icon: "👥", color: "#3B82F6" },
  { label: "Following", value: 320, icon: "➡️", color: "#10B981" },
  { label: "Friends", value: 185, icon: "🤝", color: "#8B5CF6" },
  { label: "Visitors", value: 8900, icon: "👀", color: "#EC4899" },
  { label: "Gifts Received", value: 5420, icon: "🎁", color: "#F59E0B" },
  { label: "Gifts Sent", value: 3200, icon: "💝", color: "#EF4444" },
  { label: "Coins Spent", value: 45000, icon: "💸", color: "#6366F1" },
  { label: "Coins Earned", value: 78500, icon: "💰", color: "#FFC83D" },
];

export const achievementStats = [
  { label: "Completed Tasks", value: 248, icon: "✅", color: "#10B981" },
  { label: "Unlocked Achievements", value: 32, icon: "🏆", color: "#FFC83D" },
  { label: "Earned Badges", value: 18, icon: "🏅", color: "#3B82F6" },
  { label: "Earned Medals", value: 12, icon: "🎖️", color: "#EC4899" },
  { label: "Current Level", value: 42, icon: "📈", color: "#8B5CF6" },
  { label: "VIP Level", value: 3, icon: "💎", color: "#06B6D4" },
];