// User Dashboard Data — VYRO Live Connect Earning

export const USER_INFO = {
  username: "Alex_Star",
  user_id: "VYR-2024-08847",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150",
  cover: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400",
  bio: "Living life to the fullest ✨ | Live stream enthusiast",
  gender: "Male",
  country: "United States",
  country_flag: "🇺🇸",
  language: "English",
  join_date: "Jan 2024",
  vip_level: "VIP 5",
  vip_expiry: "Dec 31, 2026",
  level: 42,
  xp: 48500,
  xp_max: 60000,
  is_verified: true,
  is_official: false,
  followers: 3200,
  following: 184,
  friends: 92,
};

export const USER_HOME_CARDS = [
  { label: "Coin Balance", value: "12,450", icon: "🪙", color: "#D4AF37" },
  { label: "Diamond Balance", value: "8,920", icon: "💎", color: "#3B82F6" },
  { label: "Wallet Balance", value: "$1,240", icon: "💰", color: "#10B981" },
  { label: "Daily Reward", value: "Ready", icon: "🎁", color: "#EC4899" },
  { label: "Current Level", value: "Lv.42", icon: "⭐", color: "#D4AF37" },
  { label: "Followers", value: "3.2K", icon: "👥", color: "#8B5CF6" },
  { label: "Following", value: "184", icon: "❤️", color: "#EF4444" },
  { label: "Friends", value: "92", icon: "🤝", color: "#06B6D4" },
  { label: "Today's Activity", value: "87%", icon: "📊", color: "#F59E0B" },
  { label: "Achievement", value: "68%", icon: "🏆", color: "#D4AF37" },
  { label: "Total XP", value: "48.5K", icon: "⚡", color: "#3B82F6" },
  { label: "Gifts Sent", value: "1,247", icon: "🎀", color: "#EC4899" },
];

export const USER_HOME_ACTIONS = [
  { label: "Edit Profile", icon: "👤", color: "#3B82F6" },
  { label: "View Wallet", icon: "💰", color: "#10B981" },
  { label: "Recharge Coins", icon: "🪙", color: "#D4AF37" },
  { label: "Withdraw Rewards", icon: "💸", color: "#EC4899" },
  { label: "Open Live Rooms", icon: "🎤", color: "#8B5CF6" },
  { label: "Search Users", icon: "🔍", color: "#06B6D4" },
  { label: "Notifications", icon: "🔔", color: "#F59E0B" },
];

export const USER_MODULES = [
  { id: "home", title: "Home", icon: "🏠", color: "#D4AF37", gradient: "linear-gradient(135deg, #D4AF37, #B8941E)" },
  { id: "profile", title: "Profile", icon: "👤", color: "#3B82F6", gradient: "linear-gradient(135deg, #3B82F6, #2563EB)" },
  { id: "wallet", title: "Wallet", icon: "💰", color: "#10B981", gradient: "linear-gradient(135deg, #10B981, #059669)" },
  { id: "rewards", title: "Rewards", icon: "🎁", color: "#EC4899", gradient: "linear-gradient(135deg, #EC4899, #DB2777)" },
  { id: "vip", title: "VIP", icon: "⭐", color: "#D4AF37", gradient: "linear-gradient(135deg, #D4AF37, #F59E0B)" },
  { id: "social", title: "Social", icon: "❤️", color: "#EF4444", gradient: "linear-gradient(135deg, #EF4444, #DC2626)" },
  { id: "live", title: "Live", icon: "🎤", color: "#8B5CF6", gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)" },
  { id: "gifts", title: "Gifts", icon: "🎀", color: "#EC4899", gradient: "linear-gradient(135deg, #EC4899, #BE185D)" },
  { id: "events", title: "Events", icon: "📅", color: "#06B6D4", gradient: "linear-gradient(135deg, #06B6D4, #0891B2)" },
  { id: "achievements", title: "Trophies", icon: "🏆", color: "#D4AF37", gradient: "linear-gradient(135deg, #D4AF37, #D97706)" },
  { id: "referral", title: "Referral", icon: "👥", color: "#3B82F6", gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)" },
  { id: "notifications", title: "Alerts", icon: "🔔", color: "#F59E0B", gradient: "linear-gradient(135deg, #F59E0B, #D97706)" },
  { id: "settings", title: "Settings", icon: "⚙️", color: "#64748B", gradient: "linear-gradient(135deg, #64748B, #475569)" },
  { id: "safety", title: "Safety", icon: "🛡️", color: "#10B981", gradient: "linear-gradient(135deg, #10B981, #047857)" },
  { id: "support", title: "Support", icon: "📞", color: "#06B6D4", gradient: "linear-gradient(135deg, #06B6D4, #0E7490)" },
  { id: "activity", title: "Activity", icon: "📊", color: "#8B5CF6", gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)" },
  { id: "policy", title: "Policy", icon: "📜", color: "#64748B", gradient: "linear-gradient(135deg, #64748B, #475569)" },
];

export const WALLET_DATA = {
  info: [
    { label: "Coin Balance", value: "12,450", icon: "🪙", color: "#D4AF37" },
    { label: "Diamond Balance", value: "8,920", icon: "💎", color: "#3B82F6" },
    { label: "Gift Balance", value: "2,340", icon: "🎁", color: "#EC4899" },
    { label: "Reward Balance", value: "1,580", icon: "🏆", color: "#D4AF37" },
    { label: "Bonus Balance", value: "640", icon: "✨", color: "#8B5CF6" },
    { label: "Total Spending", value: "$3,420", icon: "💸", color: "#EF4444" },
    { label: "Total Earnings", value: "$5,890", icon: "💎", color: "#10B981" },
  ],
  transactions: [
    { type: "Coin Recharge", detail: "500 coins", amount: "+500", date: "Today", color: "#10B981" },
    { type: "Gift Sent", detail: "To Sarah_K", amount: "-50", date: "Today", color: "#EF4444" },
    { type: "Reward Claim", detail: "Daily bonus", amount: "+100", date: "Yesterday", color: "#10B981" },
    { type: "VIP Purchase", detail: "VIP 5 upgrade", amount: "-2,000", date: "3 days ago", color: "#EF4444" },
  ],
  actions: [
    { label: "Buy Coins", icon: "🪙", color: "#D4AF37" },
    { label: "Gift History", icon: "🎁", color: "#EC4899" },
    { label: "Payment History", icon: "💳", color: "#3B82F6" },
    { label: "Reward History", icon: "🏆", color: "#D4AF37" },
    { label: "Wallet Records", icon: "📋", color: "#64748B" },
    { label: "Redeem Coupons", icon: "🎟️", color: "#10B981" },
  ],
};

export const REWARD_DATA = {
  rewards: [
    { label: "Daily Reward", value: "100 coins", status: "ready", icon: "🎁", color: "#EC4899" },
    { label: "Weekly Reward", value: "500 coins", status: "2 days", icon: "📅", color: "#3B82F6" },
    { label: "Monthly Reward", value: "2,000 coins", status: "12 days", icon: "📆", color: "#8B5CF6" },
    { label: "Login Reward", value: "50 coins", status: "ready", icon: "🔑", color: "#10B981" },
    { label: "Event Reward", value: "1,000 coins", status: "active", icon: "🎉", color: "#D4AF37" },
    { label: "Achievement Reward", value: "750 coins", status: "3 left", icon: "🏆", color: "#D4AF37" },
    { label: "Referral Reward", value: "300 coins", status: "2 invites", icon: "👥", color: "#3B82F6" },
  ],
  actions: [
    { label: "Claim Rewards", icon: "✅", color: "#10B981" },
    { label: "Reward History", icon: "📋", color: "#64748B" },
    { label: "Check Eligibility", icon: "🔍", color: "#3B82F6" },
  ],
};

export const VIP_DATA = {
  level: 5,
  expiry: "Dec 31, 2026",
  progress: 72,
  benefits: [
    "Exclusive VIP Badge", "Premium Profile Frame", "Daily 200 Coins Bonus",
    "Gift Multiplier x1.5", "Priority Customer Support", "Exclusive VIP Rooms",
    "Special Animation Effects", "VIP-Only Events Access",
  ],
  privileges: [
    { label: "Coin Boost", value: "+20%", icon: "🪙", color: "#D4AF37" },
    { label: "Gift Discount", value: "15%", icon: "🎁", color: "#EC4899" },
    { label: "XP Boost", value: "+50%", icon: "⚡", color: "#3B82F6" },
    { label: "Daily Bonus", value: "200", icon: "💎", color: "#8B5CF6" },
  ],
  actions: [
    { label: "Upgrade VIP", icon: "⬆️", color: "#D4AF37" },
    { label: "Renew VIP", icon: "🔄", color: "#3B82F6" },
    { label: "View Benefits", icon: "📋", color: "#EC4899" },
  ],
};

export const SOCIAL_DATA = {
  stats: [
    { label: "Followers", value: "3,200", icon: "👥", color: "#8B5CF6" },
    { label: "Following", value: "184", icon: "➡️", color: "#3B82F6" },
    { label: "Friends", value: "92", icon: "🤝", color: "#10B981" },
    { label: "Block List", value: "3", icon: "🚫", color: "#EF4444" },
    { label: "Visitors", value: "247", icon: "👁️", color: "#06B6D4" },
    { label: "Fans Ranking", value: "#15", icon: "📊", color: "#D4AF37" },
  ],
  friends: [
    { name: "Sarah_K", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80", status: "online" },
    { name: "Mike_Live", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80", status: "online" },
    { name: "Emma_Star", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80", status: "offline" },
    { name: "John_Pro", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80", status: "online" },
  ],
  actions: [
    { label: "Follow Users", icon: "➕", color: "#3B82F6" },
    { label: "Unfollow Users", icon: "➖", color: "#64748B" },
    { label: "Block Users", icon: "🚫", color: "#EF4444" },
    { label: "Unblock Users", icon: "✅", color: "#10B981" },
    { label: "Send Messages", icon: "💬", color: "#EC4899" },
  ],
};

export const LIVE_DATA = {
  categories: ["Trending", "Music", "Chat", "Gaming", "PK Battle", "Official"],
  recentlyWatched: [
    { name: "Sarah_K", title: "Late Night Vibes", viewers: "2.4K", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80", live: true },
    { name: "Mike_Live", title: "Gaming Session", viewers: "1.8K", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80", live: true },
    { name: "Emma_Star", title: "Music Night", viewers: "3.1K", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80", live: false },
  ],
  favoriteHosts: [
    { name: "Sarah_K", followers: "12K", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80", live: true },
    { name: "John_Pro", followers: "8.5K", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80", live: false },
  ],
  trending: [
    { name: "PK Championship", viewers: "15.2K", live: true },
    { name: "Music Festival", viewers: "8.7K", live: true },
    { name: "Official Event", viewers: "22.1K", live: true },
  ],
  actions: [
    { label: "Watch Live", icon: "▶️", color: "#EF4444" },
    { label: "Send Gifts", icon: "🎁", color: "#EC4899" },
    { label: "Join PK", icon: "⚔️", color: "#8B5CF6" },
    { label: "Follow Host", icon: "➕", color: "#3B82F6" },
    { label: "Share Room", icon: "📤", color: "#06B6D4" },
    { label: "Report Live", icon: "🚩", color: "#EF4444" },
  ],
};

export const GIFT_DATA = {
  collection: [
    { name: "Rose", icon: "🌹", price: "10", owned: 45 },
    { name: "Teddy Bear", icon: "🧸", price: "99", owned: 12 },
    { name: "Diamond Ring", icon: "💍", price: "999", owned: 3 },
    { name: "Sports Car", icon: "🏎️", price: "5000", owned: 1 },
    { name: "Crown", icon: "👑", price: "2000", owned: 5 },
    { name: "Rocket", icon: "🚀", price: "1500", owned: 8 },
  ],
  history: [
    { type: "Sent", gift: "🌹 Rose", to: "Sarah_K", date: "Today", amount: "-10" },
    { type: "Received", gift: "🎁 Gift Box", to: "From Mike", date: "Today", amount: "+50" },
    { type: "Sent", gift: "👑 Crown", to: "Emma_Star", date: "Yesterday", amount: "-2000" },
  ],
  actions: [
    { label: "Send Gifts", icon: "📤", color: "#EC4899" },
    { label: "Buy Gifts", icon: "🛒", color: "#D4AF37" },
    { label: "Gift Records", icon: "📋", color: "#64748B" },
  ],
};

export const EVENT_DATA = {
  active: [
    { title: "Summer PK Cup", desc: "Join the ultimate PK battle", reward: "10,000 coins", daysLeft: "5 days", icon: "🏆", color: "#D4AF37" },
    { title: "Daily Login Rush", desc: "Login 7 days for rewards", reward: "500 coins", daysLeft: "3 days", icon: "📅", color: "#3B82F6" },
  ],
  upcoming: [
    { title: "Anniversary Gala", desc: "Platform celebration event", date: "Jul 15", icon: "🎉", color: "#EC4899" },
    { title: "Host Championship", desc: "Top host competition", date: "Jul 20", icon: "🎤", color: "#8B5CF6" },
  ],
  completed: [
    { title: "Spring Festival", reward: "Earned 2,500 coins", icon: "🌸", color: "#10B981" },
    { title: "Egg Hunt Event", reward: "Earned 800 coins", icon: "🥚", color: "#F59E0B" },
  ],
  actions: [
    { label: "Join Event", icon: "✅", color: "#10B981" },
    { label: "View Rules", icon: "📋", color: "#3B82F6" },
    { label: "Claim Rewards", icon: "🎁", color: "#D4AF37" },
  ],
};

export const ACHIEVEMENT_DATA = {
  level: 42,
  xp: 48500,
  xp_max: 60000,
  score: 68,
  badges: [
    { name: "First Live", icon: "🎤", earned: true, color: "#8B5CF6" },
    { name: "100 Followers", icon: "👥", earned: true, color: "#3B82F6" },
    { name: "Gift Master", icon: "🎁", earned: true, color: "#EC4899" },
    { name: "PK Champion", icon: "🏆", earned: true, color: "#D4AF37" },
    { name: "Diamond VIP", icon: "💎", earned: true, color: "#06B6D4" },
    { name: "Social Star", icon: "⭐", earned: true, color: "#F59E0B" },
    { name: "Millionaire", icon: "💰", earned: false, color: "#10B981" },
    { name: "Legend", icon: "👑", earned: false, color: "#D4AF37" },
  ],
  milestones: [
    { label: "Days Active", value: "186", target: "365", pct: 51, color: "#3B82F6" },
    { label: "Gifts Sent", value: "1,247", target: "2,000", pct: 62, color: "#EC4899" },
    { label: "Rooms Joined", value: "342", target: "500", pct: 68, color: "#8B5CF6" },
  ],
  actions: [
    { label: "Claim Achievement", icon: "✅", color: "#10B981" },
    { label: "View Progress", icon: "📊", color: "#3B82F6" },
    { label: "Complete Missions", icon: "🎯", color: "#D4AF37" },
  ],
};

export const REFERRAL_DATA = {
  code: "ALEXSTAR2024",
  totalInvites: 24,
  successful: 18,
  rewards: "5,400 coins",
  link: "vyro.live/r/ALEXSTAR2024",
  recent: [
    { name: "Friend_01", date: "Today", reward: "+300", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60" },
    { name: "Friend_02", date: "Yesterday", reward: "+300", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60" },
    { name: "Friend_03", date: "3 days ago", reward: "+300", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60" },
  ],
  actions: [
    { label: "Invite Friends", icon: "👥", color: "#3B82F6" },
    { label: "Share Link", icon: "📤", color: "#06B6D4" },
    { label: "Claim Bonus", icon: "🎁", color: "#D4AF37" },
  ],
};

export const NOTIFICATION_DATA = {
  categories: [
    { name: "System", count: 3, icon: "⚙️", color: "#64748B" },
    { name: "Rewards", count: 5, icon: "🎁", color: "#EC4899" },
    { name: "Events", count: 2, icon: "🎉", color: "#D4AF37" },
    { name: "Messages", count: 8, icon: "💬", color: "#3B82F6" },
    { name: "Promotions", count: 4, icon: "📢", color: "#F59E0B" },
    { name: "Security", count: 1, icon: "🔒", color: "#EF4444" },
  ],
  recent: [
    { title: "Daily Reward Ready", desc: "Claim your 100 coins now", time: "5m ago", icon: "🎁", color: "#EC4899", unread: true },
    { title: "New Follower", desc: "Sarah_K started following you", time: "1h ago", icon: "👥", color: "#8B5CF6", unread: true },
    { title: "PK Battle Result", desc: "You won the PK battle!", time: "3h ago", icon: "🏆", color: "#D4AF37", unread: true },
    { title: "Security Alert", desc: "New login from Chrome", time: "5h ago", icon: "🔒", color: "#EF4444", unread: false },
    { title: "Event Reminder", desc: "Summer PK Cup starts soon", time: "8h ago", icon: "🎉", color: "#06B6D4", unread: false },
  ],
};

export const SETTINGS_DATA = {
  account: [
    { label: "Edit Profile", icon: "👤" },
    { label: "Change Password", icon: "🔑" },
    { label: "Email Verification", icon: "📧", status: "Verified" },
    { label: "Phone Verification", icon: "📱", status: "Verified" },
    { label: "Two-Factor Auth", icon: "🔐", status: "On" },
  ],
  privacy: [
    { label: "Profile Visibility", icon: "👁️", status: "Public" },
    { label: "Friend Requests", icon: "🤝", status: "Everyone" },
    { label: "Message Permissions", icon: "💬", status: "Friends" },
    { label: "Block List", icon: "🚫", status: "3 users" },
  ],
  security: [
    { label: "Login Devices", icon: "💻", status: "3 active" },
    { label: "Login History", icon: "📋" },
    { label: "Active Sessions", icon: "🔄", status: "2 sessions" },
    { label: "Security Verification", icon: "🛡️", status: "Enabled" },
  ],
  app: [
    { label: "Language", icon: "🌐", status: "English" },
    { label: "Theme", icon: "🎨", status: "Dark" },
    { label: "Notifications", icon: "🔔", status: "On" },
    { label: "Sound", icon: "🔊", status: "On" },
    { label: "Cache Management", icon: "🗂️", status: "48 MB" },
  ],
};

export const SAFETY_DATA = {
  features: [
    { label: "Report User", icon: "🚩", desc: "Report inappropriate user behavior", color: "#EF4444" },
    { label: "Report Host", icon: "🎤", desc: "Report a host for violations", color: "#F59E0B" },
    { label: "Report Content", icon: "📸", desc: "Report inappropriate content", color: "#EC4899" },
    { label: "Block User", icon: "🚫", desc: "Block a user from contacting you", color: "#64748B" },
    { label: "Privacy Controls", icon: "🔒", desc: "Manage your privacy settings", color: "#3B82F6" },
    { label: "Community Guidelines", icon: "📜", desc: "Read platform rules", color: "#10B981" },
    { label: "Safety Tips", icon: "💡", desc: "Learn how to stay safe", color: "#D4AF37" },
  ],
};

export const SUPPORT_DATA = {
  options: [
    { label: "Help Center", icon: "📚", desc: "Browse guides and tutorials", color: "#3B82F6" },
    { label: "FAQ", icon: "❓", desc: "Frequently asked questions", color: "#06B6D4" },
    { label: "Submit Ticket", icon: "🎫", desc: "Create a support ticket", color: "#F59E0B" },
    { label: "Live Chat", icon: "💬", desc: "Chat with support agent", color: "#10B981" },
    { label: "Contact Support", icon: "📞", desc: "Direct contact options", color: "#EC4899" },
    { label: "Feedback", icon: "💭", desc: "Share your suggestions", color: "#8B5CF6" },
    { label: "Bug Report", icon: "🐛", desc: "Report a technical issue", color: "#EF4444" },
  ],
};

export const ACTIVITY_DATA = {
  stats: [
    { label: "Total Login Days", value: "186", icon: "📅", color: "#3B82F6" },
    { label: "Total Gifts Sent", value: "1,247", icon: "🎁", color: "#EC4899" },
    { label: "Coins Purchased", value: "24,500", icon: "🪙", color: "#D4AF37" },
    { label: "Live Rooms Joined", value: "342", icon: "🎤", color: "#8B5CF6" },
    { label: "Events Participated", value: "28", icon: "🎉", color: "#06B6D4" },
    { label: "Achievement Score", value: "68%", icon: "🏆", color: "#D4AF37" },
    { label: "Activity Level", value: "Expert", icon: "⚡", color: "#F59E0B" },
    { label: "Community Rank", value: "#15", icon: "📊", color: "#10B981" },
  ],
  weekly: [
    { day: "Mon", value: 65 },
    { day: "Tue", value: 80 },
    { day: "Wed", value: 45 },
    { day: "Thu", value: 90 },
    { day: "Fri", value: 100 },
    { day: "Sat", value: 75 },
    { day: "Sun", value: 60 },
  ],
};

export const QUICK_ACTIONS = [
  { label: "Home", icon: "🏠", path: "home" },
  { label: "Search", icon: "🔍", path: "search" },
  { label: "Live", icon: "🎤", path: "live" },
  { label: "Gifts", icon: "🎁", path: "gifts" },
  { label: "Messages", icon: "💬", path: "messages" },
  { label: "Following", icon: "❤️", path: "social" },
  { label: "Profile", icon: "👤", path: "profile" },
  { label: "Wallet", icon: "💰", path: "wallet" },
  { label: "VIP", icon: "⭐", path: "vip" },
  { label: "Settings", icon: "⚙️", path: "settings" },
];