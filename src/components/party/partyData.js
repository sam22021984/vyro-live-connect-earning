export const COLORS = {
  bgPrimary: "#F8F9FC",
  bgSecondary: "#FFFFFF",
  gold: "#D4AF37",
  royalBlue: "#2563EB",
  emerald: "#10B981",
  amber: "#F59E0B",
  crimson: "#EF4444",
  skyBlue: "#0EA5E9",
  purple: "#8B5CF6",
  pink: "#EC4899",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
};

export const TABS = [
  { key: "popular", label: "Popular", icon: "🔥" },
  { key: "friends", label: "Friends", icon: "👥" },
  { key: "following", label: "Following", icon: "⭐" },
  { key: "recent", label: "Recent", icon: "🕐" },
  { key: "explore", label: "Explore", icon: "🧭" },
];

export const CATEGORIES = [
  { name: "Music", icon: "🎵", color: COLORS.purple, count: 842 },
  { name: "Gaming", icon: "🎮", color: COLORS.royalBlue, count: 1240 },
  { name: "Entertainment", icon: "🎭", color: COLORS.pink, count: 680 },
  { name: "Friendship", icon: "💕", color: COLORS.crimson, count: 920 },
  { name: "Education", icon: "📚", color: COLORS.emerald, count: 340 },
  { name: "Sports", icon: "⚽", color: COLORS.skyBlue, count: 510 },
  { name: "Technology", icon: "💻", color: COLORS.royalBlue, count: 420 },
  { name: "Lifestyle", icon: "🌟", color: COLORS.amber, count: 380 },
];

export const FRIENDS_ACTIVITY = [
  { friend: { name: "Aisha Khan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }, room: "Arabian Nights Live", roomId: 1, status: "In Room" },
  { friend: { name: "Mohammed Ali", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }, room: "Gaming Arena Pro", roomId: 2, status: "Hosting" },
  { friend: { name: "Sara Ahmed", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" }, room: "K-Pop Party Central", roomId: 3, status: "In Room" },
  { friend: { name: "David Lee", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }, room: "Tech Talk Tuesday", roomId: 4, status: "In Room" },
  { friend: { name: "Layla Rose", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop" }, room: "Romantic Evenings", roomId: 5, status: "Hosting" },
];

export const FOLLOWING_ACTIVITY = [
  { user: { name: "Fatima Noor", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", vip: "VIP 9" }, room: "Bollywood Beats", roomId: 7, live: true },
  { user: { name: "Ahmed Hassan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", vip: "VIP 4" }, room: "Sports Fan Zone", roomId: 6, live: false },
  { user: { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", vip: "VIP 3" }, room: "Book Club Lounge", roomId: 8, live: true },
];

export const RECENT_ROOMS = [
  { name: "Arabian Nights Live", host: "Aisha Khan", lastVisit: "2 hours ago", roomId: 1, cover: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=200&h=100&fit=crop" },
  { name: "Bollywood Beats", host: "Fatima Noor", lastVisit: "5 hours ago", roomId: 7, cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=100&fit=crop" },
  { name: "Gaming Arena Pro", host: "David Lee", lastVisit: "Yesterday", roomId: 2, cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=100&fit=crop" },
  { name: "K-Pop Party Central", host: "Sara Ahmed", lastVisit: "2 days ago", roomId: 3, cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=100&fit=crop" },
];

export const EXPLORE_COUNTRIES = [
  { name: "UAE", flag: "🇦🇪", rooms: 420 },
  { name: "Saudi Arabia", flag: "🇸🇦", rooms: 680 },
  { name: "Egypt", flag: "🇪🇬", rooms: 520 },
  { name: "India", flag: "🇮🇳", rooms: 890 },
  { name: "Korea", flag: "🇰🇷", rooms: 340 },
  { name: "USA", flag: "🇺🇸", rooms: 750 },
  { name: "UK", flag: "🇬🇧", rooms: 280 },
  { name: "Canada", flag: "🇨🇦", rooms: 190 },
];

export const formatNum = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toLocaleString();
};