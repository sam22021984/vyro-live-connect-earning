export const roleHierarchy = [
  {
    id: "user", name: "VYRO User", icon: "👤", color: "#64748B", gradient: "from-slate-500 to-slate-600",
    description: "Standard member access with basic features and community interaction.",
    permissions: ["Create profile", "Join live rooms", "Send messages", "Send gifts", "Daily check-in", "Friend requests", "Follow users"],
    requirements: "Free account",
  },
  {
    id: "host", name: "VYRO Host", icon: "🎙️", color: "#3B82F6", gradient: "from-blue-500 to-indigo-600",
    description: "Verified streamer who can go live, host rooms, and earn from gifts.",
    permissions: ["All User permissions", "Go live", "Create rooms", "Host PK battles", "Manage room seats", "Receive gifts", "Host dashboard access", "Withdraw earnings"],
    requirements: "Host application approved",
  },
  {
    id: "agent", name: "VYRO Agent", icon: "🤝", color: "#10B981", gradient: "from-emerald-500 to-teal-600",
    description: "Recruits and manages hosts, earns commission from host earnings.",
    permissions: ["All Host permissions", "Recruit hosts", "Manage assigned hosts", "Commission tracking", "Agent dashboard", "Host performance reports", "Withdraw commission"],
    requirements: "Agent application approved + 5+ active hosts",
  },
  {
    id: "agency", name: "VYRO Agency", icon: "🏢", color: "#8B5CF6", gradient: "from-purple-500 to-violet-600",
    description: "Top-tier agency that manages agents and hosts at scale.",
    permissions: ["All Agent permissions", "Recruit agents", "Manage agency network", "Agency dashboard", "Bulk host management", "Revenue sharing", "Custom commission rates", "Agency analytics"],
    requirements: "Agency application approved + 50+ hosts",
  },
  {
    id: "admin", name: "VYRO Admin", icon: "🛡️", color: "#F59E0B", gradient: "from-amber-500 to-orange-600",
    description: "Platform administrator with moderation and management tools.",
    permissions: ["All Agency permissions", "User management", "Content moderation", "Room moderation", "Coin management", "Support tickets", "Reports & analytics", "Ban/suspend users"],
    requirements: "Owner appointment + admin training",
  },
  {
    id: "owner", name: "VYRO Owner", icon: "👑", color: "#EC4899", gradient: "from-pink-500 to-rose-600",
    description: "Supreme authority with full platform control and system access.",
    permissions: ["All Admin permissions", "Full system control", "Global settings", "All dashboards access", "Financial control", "Feature toggles", "Staff management", "Platform analytics"],
    requirements: "Platform creator",
  },
];

export const vipCoreFeatures = [
  { id: "status", icon: "👑", title: "VIP Status", desc: "View your current VIP tier and membership status" },
  { id: "card", icon: "💳", title: "VIP Card", desc: "Your digital VIP membership card with QR code" },
  { id: "journey", icon: "🗺️", title: "VIP Journey", desc: "Track your VIP progression timeline" },
  { id: "benefits", icon: "🎁", title: "Active Benefits", desc: "See all benefits currently active on your account" },
  { id: "stats", icon: "📊", title: "VIP Statistics", desc: "Your VIP spending, rewards, and activity data" },
  { id: "membership", icon: "📅", title: "Membership Info", desc: "Duration, expiry, and renewal options" },
];

export const vipRewardTypes = [
  { id: "daily_coins", icon: "💰", title: "Daily VIP Coins", desc: "Claim free coins every 24 hours based on your tier", frequency: "Every 24h" },
  { id: "monthly_bonus", icon: "📦", title: "Monthly Bonus Coins", desc: "Large coin bonus credited monthly for high tiers", frequency: "Monthly" },
  { id: "cashback", icon: "💸", title: "Gift Cashback", desc: "Get a percentage back on all gifts you send", frequency: "Per gift" },
  { id: "lucky_draw", icon: "🎰", title: "VIP Lucky Draw", desc: "Exclusive lottery tickets for VIP-only prizes", frequency: "Weekly" },
  { id: "checkin_bonus", icon: "✅", title: "Double Check-in", desc: "VIP members get 2x daily check-in rewards", frequency: "Daily" },
  { id: "seasonal", icon: "🎄", title: "Seasonal Rewards", desc: "Special holiday and event-exclusive rewards", frequency: "Seasonal" },
  { id: "exclusive_tasks", icon: "📋", title: "VIP Tasks", desc: "Higher-reward tasks available only to VIPs", frequency: "Daily" },
  { id: "shop_discount", icon: "🛍️", title: "VIP Shop Discounts", desc: "Reduced prices in the VIP shop", frequency: "Always" },
];

export const vipAuthorityLevels = [
  { tier: "VIP 1", icon: "🥉", color: "#CD7F32", authorities: ["Basic restriction only", "Warning (if room admin)"] },
  { tier: "VVIP", icon: "🥈", color: "#C0C0C0", authorities: ["Seat access allowed", "Mute/warning (if admin)", "Seat reservation (admin only)"] },
  { tier: "SVIP", icon: "🥇", color: "#FFD700", authorities: ["Mute users (admin only)", "Seat invite control", "Music play control", "PM friends only"] },
  { tier: "SSVIP", icon: "💠", color: "#22D3EE", authorities: ["Mute/warning", "Seat reservation", "Mic on/off control", "Invite/remove from mic"] },
  { tier: "MSVIP", icon: "🥇", color: "#A855F7", authorities: ["Full seat control", "Mute/kick (admin only)", "Music control", "PM friends only"] },
  { tier: "MSSVIP", icon: "👑", color: "#EC4899", authorities: ["Advanced moderation", "Seat lock/unlock", "Mic remove control", "Full room control tools"] },
  { tier: "MISVIP", icon: "💎", color: "#3B82F6", authorities: ["Highlight comments", "Topic change", "Full moderation tools", "Mic + seat full control"] },
  { tier: "MISSVIP", icon: "👑", color: "#9932CC", authorities: ["Kick/mute/ban", "Room topic + cover change", "Full admin control"] },
  { tier: "ULTRA", icon: "🔥", color: "#EF4444", authorities: ["Full admin system control", "Advanced moderation", "Room priority control"] },
  { tier: "LEGEND", icon: "👑", color: "#6366F1", authorities: ["Super admin level control", "Feature testing access", "Full room governance"] },
  { tier: "ROYAL", icon: "🌌", color: "#FFD700", authorities: ["Absolute room authority", "Global room control", "System-level permissions"] },
];

export const vipRoomThemes = [
  { id: "gold", name: "Golden Hall", icon: "🥇", color: "#FFD700", desc: "Luxurious golden room theme", minTier: "VIP 1" },
  { id: "silver", name: "Silver Lounge", icon: "🥈", color: "#C0C0C0", desc: "Elegant silver ambiance", minTier: "VVIP" },
  { id: "sapphire", name: "Sapphire Suite", icon: "💎", color: "#3B82F6", desc: "Deep blue premium room", minTier: "SVIP" },
  { id: "diamond", name: "Diamond Palace", icon: "💠", color: "#22D3EE", desc: "Crystal clear diamond theme", minTier: "SSVIP" },
  { id: "royal", name: "Royal Court", icon: "👑", color: "#A855F7", desc: "Royal purple throne room", minTier: "MSVIP" },
  { id: "phoenix", name: "Phoenix Nest", icon: "🔥", color: "#EF4444", desc: "Ultra legendary fire theme", minTier: "ULTRA" },
  { id: "galaxy", name: "Galaxy Throne", icon: "🌌", color: "#6366F1", desc: "Cosmic legend exclusive room", minTier: "LEGEND" },
  { id: "emperor", name: "Emperor's Domain", icon: "🏰", color: "#FFD700", desc: "The ultimate royal room", minTier: "ROYAL" },
];

export const vipSecurityFeatures = [
  { id: "login_alerts", icon: "🔔", title: "VIP Login Alerts", desc: "Instant notifications for every login attempt on your account", status: "active" },
  { id: "device_mgmt", icon: "📱", title: "Device Management", desc: "View and manage all devices logged into your account", status: "active" },
  { id: "account_guard", icon: "🛡️", title: "Account Guard Pro", desc: "Enhanced protection against unauthorized access and hacking", status: "active" },
  { id: "two_factor", icon: "🔐", title: "Two-Factor Authentication", desc: "Extra security layer with OTP verification on login", status: "inactive" },
  { id: "withdrawal_lock", icon: "🔒", title: "Withdrawal Protection", desc: "Additional verification required before any withdrawal", status: "active" },
  { id: "identity_verify", icon: "✅", title: "Identity Verification", desc: "Verified VIP badge with priority verification processing", status: "active" },
  { id: "anti_scam", icon: "🚫", title: "Anti-Scam Shield", desc: "AI-powered scam detection and automatic suspicious message filtering", status: "active" },
  { id: "priority_support", icon: "⚡", title: "Priority Security Support", desc: "24/7 dedicated security team for VIP members", status: "active" },
];

export const vipSystemModules = [
  { id: "vyro-role-control", name: "Role Control", icon: "🎭", path: "/vyro-role-control", color: "#6366F1", desc: "Manage your VYRO role and permissions" },
  { id: "vip-core-system", name: "VIP Core", icon: "👑", path: "/vip-core-system", color: "#FFD700", desc: "Your VIP membership center" },
  { id: "vip-reward-system", name: "VIP Rewards", icon: "🎁", path: "/vip-reward-system", color: "#10B981", desc: "Exclusive VIP rewards and bonuses" },
  { id: "vip-authority-system", name: "VIP Authority", icon: "⚡", path: "/vip-authority-system", color: "#EF4444", desc: "Room authority and moderation powers" },
  { id: "vip-room-manager", name: "VIP Room Manager", icon: "🏠", path: "/vip-room-manager", color: "#8B5CF6", desc: "Create and manage VIP rooms" },
  { id: "vip-security-admin", name: "VIP Security", icon: "🛡️", path: "/vip-security-admin", color: "#3B82F6", desc: "Account security and protection" },
];