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

export const STATS = [
  { label: "Active Party Rooms", value: 3420, icon: "🎉", color: COLORS.royalBlue },
  { label: "Online Users", value: 86420, icon: "🟢", color: COLORS.emerald },
  { label: "Party Members", value: 245000, icon: "👥", color: COLORS.purple },
  { label: "Trending Rooms", value: 128, icon: "📈", color: COLORS.crimson },
  { label: "Recommended", value: 56, icon: "✨", color: COLORS.gold },
  { label: "Friends Online", value: 42, icon: "💚", color: COLORS.emerald },
  { label: "Following Online", value: 18, icon: "🌟", color: COLORS.skyBlue },
  { label: "Categories", value: 12, icon: "📂", color: COLORS.amber },
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

export const PARTY_ROOMS = [
  {
    id: 1, name: "Arabian Nights Live", cover: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&h=200&fit=crop",
    category: "Music", language: "Arabic", country: "🇦🇪", country_name: "UAE",
    host: { name: "Aisha Khan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", vip: "VIP 8" },
    viewers: 12450, members: 8200, status: "live", rank: 1, trending: true, recommended: true,
    description: "Join the most magical Arabian Nights experience! Live music, poetry, and cultural discussions every evening.",
  },
  {
    id: 2, name: "Gaming Arena Pro", cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
    category: "Gaming", language: "English", country: "🇺🇸", country_name: "USA",
    host: { name: "David Lee", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", vip: "VIP 6" },
    viewers: 8900, members: 5400, status: "live", rank: 2, trending: true, recommended: true,
    description: "Pro gaming tournaments, live commentary, and community matches. Join the ultimate gaming experience!",
  },
  {
    id: 3, name: "K-Pop Party Central", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=200&fit=crop",
    category: "Music", language: "Korean", country: "🇰🇷", country_name: "Korea",
    host: { name: "Sara Ahmed", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", vip: "VIP 7" },
    viewers: 15600, members: 9800, status: "live", rank: 3, trending: true, recommended: false,
    description: "The hottest K-Pop party room! Music, dance battles, and fan discussions. All are welcome!",
  },
  {
    id: 4, name: "Tech Talk Tuesday", cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop",
    category: "Technology", language: "English", country: "🇬🇧", country_name: "UK",
    host: { name: "Mohammed Ali", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", vip: "VIP 5" },
    viewers: 3400, members: 2100, status: "live", rank: 4, trending: false, recommended: true,
    description: "Weekly tech discussions covering AI, blockchain, startups, and the future of technology.",
  },
  {
    id: 5, name: "Romantic Evenings", cover: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop",
    category: "Friendship", language: "Arabic", country: "🇪🇬", country_name: "Egypt",
    host: { name: "Layla Rose", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop", vip: "VIP 6" },
    viewers: 6700, members: 4200, status: "live", rank: 5, trending: true, recommended: true,
    description: "Meet new friends, share stories, and enjoy warm conversations in a cozy atmosphere.",
  },
  {
    id: 6, name: "Sports Fan Zone", cover: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=200&fit=crop",
    category: "Sports", language: "English", country: "🇸🇦", country_name: "KSA",
    host: { name: "Ahmed Hassan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", vip: "VIP 4" },
    viewers: 5200, members: 3800, status: "scheduled", rank: 6, trending: false, recommended: false,
    description: "Live sports commentary, match discussions, and fan debates. All sports welcome!",
  },
  {
    id: 7, name: "Bollywood Beats", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=200&fit=crop",
    category: "Entertainment", language: "Hindi", country: "🇮🇳", country_name: "India",
    host: { name: "Fatima Noor", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", vip: "VIP 9" },
    viewers: 18200, members: 12000, status: "live", rank: 7, trending: true, recommended: true,
    description: "The biggest Bollywood party on VYRO! Music, movies, and celebrity gossip.",
  },
  {
    id: 8, name: "Book Club Lounge", cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop",
    category: "Education", language: "English", country: "🇨🇦", country_name: "Canada",
    host: { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", vip: "VIP 3" },
    viewers: 1800, members: 1200, status: "live", rank: 8, trending: false, recommended: true,
    description: "Weekly book discussions, author interviews, and reading recommendations.",
  },
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

export const RANKINGS = [
  { type: "Top Rooms", data: PARTY_ROOMS.slice(0, 5) },
  { type: "Most Active", data: [...PARTY_ROOMS].sort((a, b) => b.members - a.members).slice(0, 5) },
  { type: "Highest Viewers", data: [...PARTY_ROOMS].sort((a, b) => b.viewers - a.viewers).slice(0, 5) },
  { type: "Trending", data: PARTY_ROOMS.filter(r => r.trending).slice(0, 5) },
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