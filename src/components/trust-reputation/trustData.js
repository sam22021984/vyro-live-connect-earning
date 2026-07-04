export const TRUST_TABS = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard" },
  { id: "badges", label: "Badges", icon: "Award" },
  { id: "levels", label: "Levels", icon: "TrendingUp" },
  { id: "history", label: "History", icon: "History" },
];

export const TRUST_LEVELS = [
  { name: "Bronze Trusted", score: 0, color: "#CD7F32", badges: 0, rewards: ["Basic trust badge", "Standard support"], current: false },
  { name: "Silver Trusted", score: 60, color: "#9CA3AF", badges: 3, rewards: ["Silver badge", "Priority search", "Daily bonus coins"], current: false },
  { name: "Gold Trusted", score: 75, color: "#D4AF37", badges: 6, rewards: ["Gold badge", "Exclusive frame", "Higher daily limits", "Featured profile"], current: false },
  { name: "Platinum Trusted", score: 85, color: "#E5E4E2", badges: 9, rewards: ["Platinum badge", "Special chat bubble", "VIP events access", "Creator benefits"], current: false },
  { name: "Diamond Trusted", score: 92, color: "#06B6D4", badges: 12, rewards: ["Diamond badge", "Exclusive name color", "Agency priority", "Special reward coins"], current: false },
  { name: "Royal Trusted", score: 96, color: "#8B5CF6", badges: 15, rewards: ["Royal badge", "Royal frame", "Higher search ranking", "Community recognition"], current: false },
  { name: "Legend Trusted", score: 99, color: "#F59E0B", badges: 18, rewards: ["Legend crown", "All privileges", "Exclusive events", "Platform ambassador"], current: false },
];