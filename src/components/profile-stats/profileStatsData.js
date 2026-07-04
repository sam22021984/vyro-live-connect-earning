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

// ============= BADGE CONFIG =============
export const badgeCategories = [
  { key: "vip", label: "VIP", icon: "💎" },
  { key: "host", label: "Host", icon: "🎙️" },
  { key: "agency", label: "Agency", icon: "🏢" },
  { key: "achievement", label: "Achievement", icon: "🏆" },
  { key: "event", label: "Event", icon: "🎉" },
  { key: "special", label: "Special", icon: "⭐" },
];

// ============= LEVEL BENEFITS CONFIG =============
export const levelBenefits = [
  { name: "Exclusive Badge", icon: "🏅", desc: "Diamond level badge" },
  { name: "Profile Frame", icon: "🖼️", desc: "Premium profile frame" },
  { name: "Gift Discount", icon: "💰", desc: "10% off all gifts" },
  { name: "Coin Boost", icon: "⚡", desc: "1.5x coins on recharge" },
  { name: "Priority Support", icon: "🛟", desc: "Fast customer support" },
  { name: "Special Entry", icon: "✨", desc: "Room entry effect" },
];

// ============= HISTORY CONFIG =============
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

// ============= LEADERBOARD CONFIG =============
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