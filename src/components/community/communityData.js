export const COLORS = {
  bgPrimary: "#F8F9FC",
  bgSecondary: "#FFFFFF",
  gold: "#D4AF37",
  royalBlue: "#2563EB",
  emerald: "#10B981",
  amber: "#F59E0B",
  crimson: "#EF4444",
  skyBlue: "#0EA5E9",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
};

export const SIDEBAR_ITEMS = [
  { key: "overview", label: "Overview", icon: "📊" },
  { key: "feed", label: "Community Feed", icon: "📰" },
  { key: "posts", label: "Posts", icon: "📝" },
  { key: "groups", label: "Groups", icon: "👥" },
  { key: "channels", label: "Channels", icon: "📢" },
  { key: "chat", label: "Chat", icon: "💬" },
  { key: "media", label: "Media Gallery", icon: "🖼️" },
  { key: "gifting", label: "Gifting", icon: "🎁" },
  { key: "reports", label: "Reports", icon: "🚩" },
  { key: "announcements", label: "Announcements", icon: "🔔" },
  { key: "saved", label: "Saved Posts", icon: "🔖" },
  { key: "membership", label: "Membership", icon: "💎" },
  { key: "admin", label: "Admin Panel", icon: "⚡" },
  { key: "security", label: "Security Center", icon: "🛡️" },
];

export const STATS = [
  { label: "Total Communities", value: 1248, growth: 12.5, icon: "🌍", color: COLORS.royalBlue, trend: [40, 55, 48, 65, 72, 80, 95] },
  { label: "Total Members", value: 485000, growth: 8.2, icon: "👥", color: COLORS.emerald, trend: [30, 45, 52, 60, 68, 75, 88] },
  { label: "Online Members", value: 38420, growth: 15.3, icon: "🟢", color: COLORS.emerald, trend: [20, 35, 40, 55, 60, 70, 85] },
  { label: "Active Groups", value: 3420, growth: 6.8, icon: "👥", color: COLORS.skyBlue, trend: [25, 30, 42, 48, 55, 62, 70] },
  { label: "Total Posts", value: 1280000, growth: 22.1, icon: "📝", color: COLORS.royalBlue, trend: [50, 60, 55, 70, 78, 85, 92] },
  { label: "Photos Shared", value: 458000, growth: 18.5, icon: "📸", color: COLORS.amber, trend: [35, 42, 50, 58, 65, 72, 80] },
  { label: "Videos Shared", value: 125000, growth: 28.3, icon: "🎬", color: COLORS.crimson, trend: [20, 30, 45, 50, 60, 70, 82] },
  { label: "Comments", value: 3200000, growth: 14.7, icon: "💬", color: COLORS.skyBlue, trend: [40, 50, 55, 62, 70, 78, 85] },
  { label: "Likes", value: 8500000, growth: 19.2, icon: "❤️", color: COLORS.crimson, trend: [45, 55, 60, 68, 75, 82, 90] },
  { label: "Shares", value: 950000, growth: 11.4, icon: "🔁", color: COLORS.royalBlue, trend: [30, 38, 45, 52, 58, 65, 72] },
  { label: "Saved Posts", value: 420000, growth: 9.6, icon: "🔖", color: COLORS.gold, trend: [25, 32, 38, 45, 50, 58, 65] },
  { label: "Gifts Sent", value: 78000, growth: 25.7, icon: "🎁", color: COLORS.amber, trend: [20, 35, 42, 55, 62, 70, 82] },
  { label: "Coins Earned", value: 12500000, growth: 32.1, icon: "🪙", color: COLORS.gold, trend: [30, 45, 55, 65, 72, 80, 95] },
  { label: "Reports Pending", value: 142, growth: -5.2, icon: "🚩", color: COLORS.crimson, trend: [60, 55, 50, 48, 45, 42, 38] },
  { label: "Moderators Online", value: 86, growth: 4.3, icon: "🛡️", color: COLORS.emerald, trend: [50, 55, 58, 62, 65, 70, 75] },
  { label: "Engagement Rate", value: 78.5, growth: 7.8, suffix: "%", icon: "📈", color: COLORS.royalBlue, trend: [55, 60, 63, 68, 72, 75, 78] },
];

export const FEED_POSTS = [
  {
    id: 1, username: "Aisha Khan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    vip_level: "VIP 6", country_flag: "🇦🇪", timestamp: "2 min ago",
    content: "Just hit VIP 6! 🎉 Thank you all for the amazing support in the community! Let's keep growing together! ❤️🔥",
    image: "https://images.unsplash.com/photo-1533167649158-613dfb92e9ad?w=600&h=400&fit=crop",
    likes: 1240, comments: 89, shares: 45, gifts: 12, saved: false, liked: false,
  },
  {
    id: 2, username: "Mohammed Ali", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    vip_level: "VIP 4", country_flag: "🇸🇦", timestamp: "15 min ago",
    content: "Amazing PK Battle tonight! 🔥 The energy was unreal! Who's ready for the next one? 💪",
    likes: 856, comments: 124, shares: 67, gifts: 8, saved: false, liked: true,
  },
  {
    id: 3, username: "Sara Ahmed", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    vip_level: "VIP 8", country_flag: "🇪🇬", timestamp: "1 hour ago",
    content: "New family event coming this weekend! Join 'Royal Eagles' family for exciting rewards and competitions! 🦅✨",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
    likes: 2100, comments: 245, shares: 180, gifts: 25, saved: true, liked: false,
  },
  {
    id: 4, username: "David Lee", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    vip_level: "VIP 3", country_flag: "🇰🇷", timestamp: "2 hours ago",
    content: "Thank you everyone for 10K followers! 🎉 This community is incredible! Special thanks to all my gifters! 🎁💕",
    likes: 3200, comments: 312, shares: 95, gifts: 45, saved: false, liked: true,
  },
];

export const GROUPS = [
  { id: 1, name: "Royal Eagles", category: "Family", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=200&fit=crop", members: 4520, online: 320, is_private: false, is_owner: true, activity: "High" },
  { id: 2, name: "Global VIP Lounge", category: "VIP", cover: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=400&h=200&fit=crop", members: 8900, online: 1240, is_private: true, is_owner: false, activity: "Very High" },
  { id: 3, name: "PK Battle Arena", category: "Gaming", cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop", members: 12300, online: 890, is_private: false, is_owner: false, activity: "Extreme" },
  { id: 4, name: "Music Lovers Club", category: "Music", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=200&fit=crop", members: 6700, online: 450, is_private: false, is_owner: false, activity: "Medium" },
  { id: 5, name: "Arabian Nights", category: "Cultural", cover: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&h=200&fit=crop", members: 3200, online: 210, is_private: true, is_owner: false, activity: "High" },
  { id: 6, name: "Gift Masters", category: "Gifting", cover: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=200&fit=crop", members: 5400, online: 680, is_private: false, is_owner: true, activity: "Very High" },
];

export const CHANNELS = [
  { id: 1, name: "VYRO Official", logo: "🚀", verified: true, announcement: "New VIP levels launched! Check the VIP center for details.", updated: "5 min ago", following: true, notifications: true },
  { id: 2, name: "Event Center", logo: "🎪", verified: true, announcement: "Champion Cup starts this Friday! Register your team now.", updated: "1 hour ago", following: true, notifications: false },
  { id: 3, name: "Gift Store Updates", logo: "🎁", verified: true, announcement: "New luxury gifts available! Diamond Crown & Golden Mansion.", updated: "3 hours ago", following: false, notifications: true },
  { id: 4, name: "Community Guidelines", logo: "📜", verified: true, announcement: "Updated safety policies effective immediately. Please review.", updated: "1 day ago", following: true, notifications: false },
  { id: 5, name: "Host Spotlight", logo: "🎙️", verified: true, announcement: "Featured host of the week: Aisha Khan! Congratulations!", updated: "2 days ago", following: false, notifications: false },
];

export const MEDIA_ITEMS = [
  { id: 1, type: "photo", url: "https://images.unsplash.com/photo-1533167649158-613dfb92e9ad?w=300&h=300&fit=crop", date: "02 July 2026", category: "Events" },
  { id: 2, type: "video", url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=300&fit=crop", date: "02 July 2026", category: "PK Battles" },
  { id: 3, type: "photo", url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=300&fit=crop", date: "01 July 2026", category: "Events" },
  { id: 4, type: "photo", url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", date: "01 July 2026", category: "Music" },
  { id: 5, type: "video", url: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=300&h=300&fit=crop", date: "30 June 2026", category: "VIP" },
  { id: 6, type: "photo", url: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=300&h=300&fit=crop", date: "30 June 2026", category: "Cultural" },
  { id: 7, type: "photo", url: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=300&h=300&fit=crop", date: "29 June 2026", category: "Gifting" },
  { id: 8, type: "video", url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=300&fit=crop", date: "29 June 2026", category: "PK Battles" },
  { id: 9, type: "photo", url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=300&fit=crop", date: "28 June 2026", category: "Events" },
];

export const GIFTS_DATA = [
  { id: 1, name: "Rose", icon: "🌹", price: 10000, category: "Standard" },
  { id: 2, name: "Crown", icon: "👑", price: 100000, category: "Luxury" },
  { id: 3, name: "Diamond", icon: "💎", price: 500000, category: "Luxury" },
  { id: 4, name: "Sports Car", icon: "🏎️", price: 800000, category: "Luxury" },
  { id: 5, name: "Mansion", icon: "🏰", price: 1000000, category: "Luxury" },
  { id: 6, name: "Cake", icon: "🎂", price: 20000, category: "Standard" },
  { id: 7, name: "Trophy", icon: "🏆", price: 300000, category: "Luxury" },
  { id: 8, name: "Ring", icon: "💍", price: 200000, category: "Luxury" },
];

export const TOP_GIFTERS = [
  { name: "Fatima Noor", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", gifts: 1250, coins: 8500000 },
  { name: "Ahmed Hassan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", gifts: 980, coins: 6200000 },
  { name: "Layla Rose", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop", gifts: 845, coins: 5100000 },
];

export const REPORTS = [
  { id: 1, reporter: "User #VY10042", reported: "Spam Account #VY10099", reason: "Spam Messages", status: "pending", severity: "medium", date: "02 July 2026", evidence: "Chat screenshots" },
  { id: 2, reporter: "User #VY10051", reported: "Fake Profile #VY10102", reason: "Impersonation", status: "investigating", severity: "high", date: "02 July 2026", evidence: "Profile comparison" },
  { id: 3, reporter: "User #VY10044", reported: "Harasser #VY10088", reason: "Harassment", status: "pending", severity: "high", date: "01 July 2026", evidence: "Message logs" },
  { id: 4, reporter: "User #VY10046", reported: "Scammer #VY10115", reason: "Fraud/Scam", status: "reviewing", severity: "critical", date: "01 July 2026", evidence: "Transaction records" },
  { id: 5, reporter: "User #VY10050", reported: "Inappropriate #VY10077", reason: "Inappropriate Content", status: "resolved", severity: "low", date: "30 June 2026", evidence: "Post screenshot" },
];

export const ANALYTICS_DATA = {
  dailyActive: [12000, 13500, 14000, 12800, 15500, 16800, 18420],
  newMembers: [320, 450, 380, 520, 610, 680, 750],
  postActivity: [2400, 2800, 2600, 3200, 3500, 3800, 4200],
  engagement: [65, 68, 72, 70, 75, 78, 78.5],
  coinTransactions: [45000, 52000, 48000, 61000, 68000, 75000, 82000],
  weeklyLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

export const SECURITY_ITEMS = [
  { label: "User Authentication", status: "active", icon: "🔐", detail: "OAuth 2.0 + 2FA Enabled" },
  { label: "Row-Level Security (RLS)", status: "active", icon: "🛡️", detail: "All tables protected" },
  { label: "Role Permissions", status: "active", icon: "👤", detail: "RBAC enforced" },
  { label: "Access Control", status: "active", icon: "🔑", detail: "12 roles configured" },
  { label: "Moderation Logs", status: "warning", icon: "📋", detail: "3 pending reviews" },
  { label: "Audit Logs", status: "active", icon: "📜", detail: "Real-time tracking" },
  { label: "Security Alerts", status: "warning", icon: "⚠️", detail: "2 recent alerts" },
  { label: "Login Activity", status: "active", icon: "📊", detail: "No anomalies detected" },
  { label: "Device Sessions", status: "active", icon: "📱", detail: "1,240 active sessions" },
  { label: "Privacy Controls", status: "active", icon: "🔒", detail: "GDPR compliant" },
];

export const formatNum = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toLocaleString();
};