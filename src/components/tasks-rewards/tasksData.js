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

// ============= TASK CENTER =============
export const taskCategories = [
  { key: "daily", label: "Daily", icon: "📅" },
  { key: "weekly", label: "Weekly", icon: "📆" },
  { key: "monthly", label: "Monthly", icon: "🗓️" },
];

export const tasks = {
  daily: [
    { id: "dt1", title: "Daily Login", description: "Log in to VYRO Live Connect", reward_type: "Coins", reward_amount: 50, reward_icon: "🪙", target: 1, progress: 1, status: "completed", time_left: "23h 45m", action_path: "/" },
    { id: "dt2", title: "Watch Live Stream", description: "Watch 30 minutes of live streaming", reward_type: "Coins", reward_amount: 30, reward_icon: "🪙", target: 30, progress: 15, status: "in_progress", time_left: "23h 45m", action_path: "/" },
    { id: "dt3", title: "Send Gifts", description: "Send 5 gifts to hosts", reward_type: "Coins", reward_amount: 50, reward_icon: "🪙", target: 5, progress: 2, status: "in_progress", time_left: "23h 45m", action_path: "/" },
    { id: "dt4", title: "Recharge Coins", description: "Recharge 100+ coins", reward_type: "Coins", reward_amount: 100, reward_icon: "🪙", target: 100, progress: 0, status: "not_started", time_left: "23h 45m", action_path: "/recharge" },
    { id: "dt5", title: "Follow Users", description: "Follow 3 new users", reward_type: "Coins", reward_amount: 20, reward_icon: "🪙", target: 3, progress: 1, status: "in_progress", time_left: "23h 45m", action_path: "/" },
    { id: "dt6", title: "Join Party Room", description: "Join any party room today", reward_type: "Coins", reward_amount: 40, reward_icon: "🪙", target: 1, progress: 0, status: "not_started", time_left: "23h 45m", action_path: "/" },
    { id: "dt7", title: "Share App", description: "Share VYRO with friends", reward_type: "Coins", reward_amount: 60, reward_icon: "🪙", target: 1, progress: 0, status: "not_started", time_left: "23h 45m", action_path: "/" },
    { id: "dt8", title: "Invite a Friend", description: "Invite a friend to join VYRO", reward_type: "Coins", reward_amount: 200, reward_icon: "🪙", target: 1, progress: 0, status: "not_started", time_left: "23h 45m", action_path: "/" },
  ],
  weekly: [
    { id: "wt1", title: "Complete Live Hours", description: "Complete 10 hours of live streaming", reward_type: "Coins", reward_amount: 500, reward_icon: "🪙", target: 10, progress: 4, status: "in_progress", time_left: "4d 12h", action_path: "/" },
    { id: "wt2", title: "Reach Gift Target", description: "Send 1000 coins in gifts", reward_type: "Coins", reward_amount: 800, reward_icon: "🪙", target: 1000, progress: 350, status: "in_progress", time_left: "4d 12h", action_path: "/" },
    { id: "wt3", title: "Gain New Followers", description: "Gain 50 new followers", reward_type: "Coins", reward_amount: 300, reward_icon: "🪙", target: 50, progress: 12, status: "in_progress", time_left: "4d 12h", action_path: "/" },
    { id: "wt4", title: "Join Events", description: "Join 3 events this week", reward_type: "Coins", reward_amount: 400, reward_icon: "🪙", target: 3, progress: 0, status: "not_started", time_left: "4d 12h", action_path: "/tasks-rewards" },
  ],
  monthly: [
    { id: "mt1", title: "Top Supporter", description: "Reach Top 100 supporters", reward_type: "Coins", reward_amount: 5000, reward_icon: "💎", target: 100, progress: 250, status: "in_progress", time_left: "18d", action_path: "/" },
    { id: "mt2", title: "Top Host", description: "Reach Top 50 hosts this month", reward_type: "Coins", reward_amount: 10000, reward_icon: "🏆", target: 50, progress: 120, status: "in_progress", time_left: "18d", action_path: "/" },
    { id: "mt3", title: "Top Agency", description: "Your agency reaches Top 10", reward_type: "Coins", reward_amount: 20000, reward_icon: "🏢", target: 10, progress: 15, status: "in_progress", time_left: "18d", action_path: "/" },
    { id: "mt4", title: "VIP Spending Goal", description: "Spend 10000 coins this month", reward_type: "Coins", reward_amount: 15000, reward_icon: "💎", target: 10000, progress: 3000, status: "in_progress", time_left: "18d", action_path: "/recharge" },
  ],
};

// ============= REWARD CENTER =============
export const rewardSections = [
  { key: "available", label: "Available", icon: "🎁" },
  { key: "claimed", label: "Claimed", icon: "✅" },
  { key: "expired", label: "Expired", icon: "⏰" },
  { key: "upcoming", label: "Upcoming", icon: "🔜" },
];

export const rewards = {
  available: [
    { id: "r1", name: "500 Coins", type: "Currency", icon: "🪙", rarity: "Common", color: "#FFC83D", description: "500 coins added to your wallet" },
    { id: "r2", name: "100 Diamonds", type: "Currency", icon: "💎", rarity: "Rare", color: "#3B82F6", description: "100 diamonds for premium gifts" },
    { id: "r3", name: "VIP Frame (3 Days)", type: "VIP", icon: "🖼️", rarity: "Epic", color: "#8B5CF6", description: "Exclusive VIP profile frame" },
    { id: "r4", name: "Entry Effect", type: "VIP", icon: "✨", rarity: "Epic", color: "#EC4899", description: "Special room entry animation" },
    { id: "r5", name: "Gold Badge", type: "Special", icon: "🏅", rarity: "Legendary", color: "#F59E0B", description: "Permanent gold profile badge" },
    { id: "r6", name: "Bubble Chat", type: "Special", icon: "💬", rarity: "Rare", color: "#06B6D4", description: "Custom chat bubble style" },
  ],
  claimed: [
    { id: "rc1", name: "50 Coins", type: "Currency", icon: "🪙", rarity: "Common", color: "#FFC83D", description: "Daily login reward" },
    { id: "rc2", name: "Bronze Medal", type: "Special", icon: "🥉", rarity: "Common", color: "#CD7F32", description: "First recharge achievement" },
  ],
  expired: [
    { id: "re1", name: "Summer VIP Pass", type: "VIP", icon: "🏖️", rarity: "Legendary", color: "#F59E0B", description: "Expired on Jun 30" },
  ],
  upcoming: [
    { id: "ru1", name: "Anniversary Frame", type: "VIP", icon: "🎉", rarity: "Legendary", color: "#8B5CF6", description: "Available in 5 days" },
    { id: "ru2", name: "2000 Coins", type: "Currency", icon: "🪙", rarity: "Epic", color: "#FFC83D", description: "Available in 5 days" },
  ],
};

// ============= DAILY BONUS =============
export const dailyBonusDays = [
  { day: 1, reward: "100 Coins", amount: "100", icon: "🪙", is_mega: false },
  { day: 2, reward: "200 Coins", amount: "200", icon: "🪙", is_mega: false },
  { day: 3, reward: "300 Coins + 5 💎", amount: "300", icon: "🪙", is_mega: false },
  { day: 4, reward: "400 Coins", amount: "400", icon: "🪙", is_mega: false },
  { day: 5, reward: "500 Coins + 10 💎", amount: "500", icon: "🪙", is_mega: false },
  { day: 6, reward: "600 Coins", amount: "600", icon: "🪙", is_mega: false },
  { day: 7, reward: "Mega: 2000 Coins + VIP Frame", amount: "2000", icon: "🎁", is_mega: true },
];

// ============= EVENTS =============
export const eventSections = [
  { key: "active", label: "Active", icon: "🔥" },
  { key: "upcoming", label: "Upcoming", icon: "🔜" },
  { key: "completed", label: "Completed", icon: "✅" },
];

export const events = {
  active: [
    { id: "e1", title: "Summer Recharge Festival", banner: "🏖️", type: "Recharge Event", rules: "Recharge 1000+ coins during the event period to win VIP rewards.", rewards: "VIP 7 Days + 2000 Coins", duration: "Ends in 3 days", participants: 15420, color: "#F59E0B" },
    { id: "e2", title: "Gift Galaxy", banner: "🌌", type: "Gift Event", rules: "Send 500+ coins in gifts to hosts. Top gifters win exclusive badges.", rewards: "Gold Badge + 1000 Coins", duration: "Ends in 5 days", participants: 8730, color: "#8B5CF6" },
    { id: "e3", title: "PK Championship", banner: "⚔️", type: "PK Event", rules: "Join PK battles and win 5 matches to qualify for rewards.", rewards: "PK Crown + 5000 Coins", duration: "Ends in 7 days", participants: 3210, color: "#EF4444" },
    { id: "e4", title: "Host Star Competition", banner: "🌟", type: "Host Event", rules: "Top 3 hosts by live hours and gift earnings win grand prizes.", rewards: "10000 Coins + VIP 30 Days", duration: "Ends in 10 days", participants: 540, color: "#3B82F6" },
  ],
  upcoming: [
    { id: "eu1", title: "Anniversary Celebration", banner: "🎉", type: "Festival Event", rules: "Celebrate VYRO anniversary with special rewards and lucky draws.", rewards: "Limited Edition Frame + 5000 Coins", duration: "Starts in 3 days", participants: 0, color: "#EC4899" },
    { id: "eu2", title: "Global Family League", banner: "👨‍👩‍👧‍👦", type: "Agency Event", rules: "Families compete in weekly PK battles for the championship cup.", rewards: "Family Crown + 20000 Coins", duration: "Starts in 7 days", participants: 0, color: "#10B981" },
  ],
  completed: [
    { id: "ec1", title: "Spring Festival", banner: "🌸", type: "Festival Event", rules: "Spring recharge and gifting event has ended.", rewards: "Spring Frame + 3000 Coins", duration: "Ended Jun 30", participants: 22100, color: "#F59E0B" },
  ],
};

// ============= ACHIEVEMENTS =============
export const achievementCategories = [
  { key: "user", label: "User", icon: "👤" },
  { key: "host", label: "Host", icon: "🎙️" },
  { key: "vip", label: "VIP", icon: "💎" },
  { key: "agency", label: "Agency", icon: "🏢" },
];

export const achievements = {
  user: [
    { id: "a1", name: "First Recharge", badge: "💳", progress: 100, status: "unlocked", condition: "Complete your first coin recharge", reward: "100 XP + Bronze Medal" },
    { id: "a2", name: "First Gift", badge: "🎁", progress: 100, status: "claimed", condition: "Send your first gift to a host", reward: "50 XP" },
    { id: "a3", name: "100 Followers", badge: "👥", progress: 72, status: "in_progress", condition: "Reach 100 followers", reward: "500 XP + Silver Badge" },
    { id: "a4", name: "1000 Followers", badge: "🌟", progress: 12, status: "in_progress", condition: "Reach 1000 followers", reward: "2000 XP + Gold Badge" },
    { id: "a5", name: "10000 Followers", badge: "👑", progress: 0, status: "locked", condition: "Reach 10000 followers", reward: "10000 XP + Crown Badge" },
  ],
  host: [
    { id: "h1", name: "First Live Stream", badge: "🎬", progress: 100, status: "claimed", condition: "Complete your first live stream", reward: "100 XP" },
    { id: "h2", name: "100 Live Hours", badge: "⏱️", progress: 45, status: "in_progress", condition: "Stream for 100 total hours", reward: "2000 XP + Host Badge" },
    { id: "h3", name: "Top Host", badge: "🏆", progress: 0, status: "locked", condition: "Become a Top 10 host", reward: "5000 XP + Legendary Badge" },
  ],
  vip: [
    { id: "v1", name: "VIP Member", badge: "💎", progress: 100, status: "claimed", condition: "Activate VIP membership", reward: "500 XP" },
    { id: "v2", name: "VIP Gold", badge: "🥇", progress: 60, status: "in_progress", condition: "Reach VIP Gold tier", reward: "2000 XP + Gold Frame" },
    { id: "v3", name: "Top Gifter", badge: "💝", progress: 30, status: "in_progress", condition: "Become a Top 100 gifter", reward: "3000 XP + Diamond Badge" },
  ],
  agency: [
    { id: "ag1", name: "Create Agency", badge: "🏢", progress: 0, status: "locked", condition: "Create your own agency", reward: "1000 XP" },
    { id: "ag2", name: "Top Agency", badge: "🎖️", progress: 15, status: "in_progress", condition: "Your agency reaches Top 10", reward: "10000 XP + Agency Crown" },
  ],
};