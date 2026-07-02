export const MY_FAMILY = {
  family_name: "Royal Phoenix",
  family_id: "FAM-2026-0178",
  family_logo: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200",
  family_banner: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600",
  family_description: "A premier family of elite streamers and content creators. United by passion, driven by excellence.",
  family_country: "United States",
  family_country_flag: "🇺🇸",
  family_level: 18,
  family_rank: 4,
  total_members: 86,
  max_members: 100,
  creation_date: "2026-01-15",
  family_xp: 184500,
  family_xp_max: 250000,
  family_privacy: "Invite Only",
};

export const FAMILY_STATS = [
  { label: "Family Level", value: "18", icon: "Layers", color: "#D4AF37" },
  { label: "Family Rank", value: "#4", icon: "Trophy", color: "#C0C0C0" },
  { label: "Total Members", value: "86", icon: "Users", color: "#3B82F6" },
  { label: "Family XP", value: "184.5K", icon: "Zap", color: "#D4AF37" },
  { label: "Gifts Sent", value: "12.4K", icon: "Gift", color: "#EC4899" },
  { label: "Gifts Received", value: "18.2K", icon: "Heart", color: "#F43F5E" },
  { label: "Events Won", value: "24", icon: "Award", color: "#10B981" },
  { label: "Achievements", value: "32", icon: "Star", color: "#F59E0B" },
];

export const FAMILY_MODULES = [
  {
    id: "my_family",
    title: "My Family",
    icon: "Home",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #2563EB, #3B82F6)",
    description: "Your family overview and management",
  },
  {
    id: "create_family",
    title: "Create Family",
    icon: "Plus",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #059669, #10B981)",
    description: "Create your own family community",
  },
  {
    id: "discover_families",
    title: "Discover Families",
    icon: "Search",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
    description: "Find and join families",
  },
  {
    id: "family_members",
    title: "Family Members",
    icon: "Users",
    color: "#EC4899",
    gradient: "linear-gradient(135deg, #DB2777, #EC4899)",
    description: "Manage family member roles",
  },
  {
    id: "family_requests",
    title: "Family Requests",
    icon: "Inbox",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #D97706, #F59E0B)",
    description: "Join requests and invitations",
  },
  {
    id: "family_levels",
    title: "Family Levels",
    icon: "TrendingUp",
    color: "#D4AF37",
    gradient: "linear-gradient(135deg, #B8941E, #D4AF37)",
    description: "Family XP and ranking system",
  },
  {
    id: "family_achievements",
    title: "Achievements",
    icon: "Award",
    color: "#A855F7",
    gradient: "linear-gradient(135deg, #9333EA, #A855F7)",
    description: "Badges, milestones, and rewards",
  },
  {
    id: "family_events",
    title: "Family Events",
    icon: "Calendar",
    color: "#EF4444",
    gradient: "linear-gradient(135deg, #DC2626, #EF4444)",
    description: "Competitions, challenges, celebrations",
  },
  {
    id: "family_notifications",
    title: "Notifications",
    icon: "Bell",
    color: "#06B6D4",
    gradient: "linear-gradient(135deg, #0891B2, #06B6D4)",
    description: "Family activity and alerts",
  },
  {
    id: "family_safety",
    title: "Safety & Management",
    icon: "Shield",
    color: "#1D4ED8",
    gradient: "linear-gradient(135deg, #1E40AF, #1D4ED8)",
    description: "Reports, rules, and compliance",
  },
  {
    id: "management_panel",
    title: "Management Panel",
    icon: "Settings",
    color: "#6366F1",
    gradient: "linear-gradient(135deg, #4F46E5, #6366F1)",
    description: "Admin overview and analytics",
  },
];

export const FAMILY_MEMBERS = [
  { name: "Alexander K.", id: "USR-1024", role: "Founder", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", joined: "2026-01-15", contribution: 98 },
  { name: "Sofia Martinez", id: "USR-1031", role: "Co-Founder", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", joined: "2026-01-16", contribution: 94 },
  { name: "Jiwoo Park", id: "USR-1038", role: "Admin", avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=100", joined: "2026-01-20", contribution: 88 },
  { name: "Elena Ruiz", id: "USR-1045", role: "Elder", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", joined: "2026-02-01", contribution: 82 },
  { name: "Mei Wong", id: "USR-1052", role: "Member", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100", joined: "2026-02-10", contribution: 76 },
  { name: "Aria Chen", id: "USR-1059", role: "Member", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", joined: "2026-02-15", contribution: 71 },
];

export const ROLE_INFO = [
  { role: "Founder", icon: "Crown", color: "#D4AF37", desc: "Full control of family" },
  { role: "Co-Founder", icon: "Gem", color: "#C0C0C0", desc: "Manage members and settings" },
  { role: "Admin", icon: "Shield", color: "#3B82F6", desc: "Manage members" },
  { role: "Elder", icon: "Star", color: "#A855F7", desc: "Senior member privileges" },
  { role: "Member", icon: "User", color: "#6B7280", desc: "Standard member" },
];

export const DISCOVER_FAMILIES = [
  { name: "Golden Dragons", id: "FAM-2026-0042", logo: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200", members: 120, level: 24, country: "🇰🇷", country_name: "South Korea", rank: 1, privacy: "Open" },
  { name: "Silver Wolves", id: "FAM-2026-0089", logo: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200", members: 98, level: 21, country: "🇯🇵", country_name: "Japan", rank: 2, privacy: "Invite Only" },
  { name: "Crimson Eagles", id: "FAM-2026-0156", logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200", members: 110, level: 22, country: "🇧🇷", country_name: "Brazil", rank: 3, privacy: "Open" },
  { name: "Diamond Lions", id: "FAM-2026-0201", logo: "https://images.unsplash.com/photo-1558379850-32d57c5b6f9c?w=200", members: 88, level: 19, country: "🇬🇧", country_name: "United Kingdom", rank: 5, privacy: "Application" },
  { name: "Emerald Tigers", id: "FAM-2026-0234", logo: "https://images.unsplash.com/photo-1519181243204-879cbb259b56?w=200", members: 76, level: 17, country: "🇮🇳", country_name: "India", rank: 8, privacy: "Open" },
];

export const FAMILY_REQUESTS = {
  incoming: [
    { name: "Marcus Lin", id: "USR-1078", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", date: "2026-07-01", message: "I'd love to join your family!" },
    { name: "Yuki Tanaka", id: "USR-1082", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100", date: "2026-06-30", message: "Looking for an active family" },
  ],
  sent: [
    { name: "Golden Dragons", id: "FAM-2026-0042", avatar: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200", date: "2026-06-28", status: "pending" },
  ],
};

export const FAMILY_LEVELS_DATA = {
  currentLevel: 18,
  currentXP: 184500,
  nextLevelXP: 250000,
  rank: 4,
  xpSources: [
    { source: "Gifts Sent by Members", xp: 64200, icon: "Gift", color: "#EC4899" },
    { source: "Gifts Received by Members", xp: 72800, icon: "Heart", color: "#F43F5E" },
    { source: "Family Events", xp: 24300, icon: "Calendar", color: "#EF4444" },
    { source: "Family Tasks", xp: 15200, icon: "CheckSquare", color: "#10B981" },
    { source: "Family Activity", xp: 8000, icon: "Activity", color: "#3B82F6" },
  ],
  levelHistory: [
    { level: 18, xp: 184500, date: "2026-06-28" },
    { level: 17, xp: 168000, date: "2026-06-10" },
    { level: 16, xp: 152000, date: "2026-05-22" },
    { level: 15, xp: 138000, date: "2026-05-01" },
  ],
};

export const FAMILY_ACHIEVEMENTS = [
  { name: "First Steps", icon: "🎯", desc: "Reach Family Level 5", earned: true, color: "#10B981" },
  { name: "Rising Stars", icon: "⭐", desc: "Reach Family Level 10", earned: true, color: "#F59E0B" },
  { name: "Elite Family", icon: "💎", desc: "Reach Family Level 15", earned: true, color: "#3B82F6" },
  { name: "Top 10 Family", icon: "🏆", desc: "Rank in Top 10 globally", earned: true, color: "#D4AF37" },
  { name: "Gift Masters", icon: "🎁", desc: "Send 10,000 gifts", earned: true, color: "#EC4899" },
  { name: "Event Champions", icon: "👑", desc: "Win 20 family events", earned: true, color: "#A855F7" },
  { name: "Legendary", icon: "🔥", desc: "Reach Family Level 25", earned: false, color: "#EF4444" },
  { name: "Million Club", icon: "💰", desc: "Earn 1M family XP", earned: false, color: "#D4AF37" },
];

export const FAMILY_EVENTS = [
  { title: "Summer PK Tournament", type: "Competition", date: "2026-07-10", participants: 24, reward: "5,000 Coins + Badge", status: "upcoming", icon: "⚔️" },
  { title: "Weekly Gift Challenge", type: "Challenge", date: "2026-07-03", participants: 86, reward: "2,000 Coins", status: "active", icon: "🎁" },
  { title: "Family Anniversary", type: "Celebration", date: "2026-07-15", participants: 0, reward: "Special Badge", status: "upcoming", icon: "🎉" },
  { title: "Recruitment Drive", type: "Event", date: "2026-06-25", participants: 12, reward: "1,000 Coins", status: "completed", icon: "👥" },
];

export const FAMILY_NOTIFICATIONS = [
  { type: "member_joined", title: "New Member Joined", detail: "Aria Chen joined the family", time: "2h ago", icon: "UserPlus", color: "#10B981" },
  { type: "request_received", title: "Join Request Received", detail: "Marcus Lin requested to join", time: "5h ago", icon: "Inbox", color: "#F59E0B" },
  { type: "level_up", title: "Family Level Up!", detail: "Royal Phoenix reached Level 18", time: "1d ago", icon: "TrendingUp", color: "#D4AF37" },
  { type: "achievement", title: "Achievement Unlocked", detail: "Event Champions badge earned", time: "2d ago", icon: "Award", color: "#A855F7" },
  { type: "event_started", title: "Event Started", detail: "Weekly Gift Challenge is live", time: "2d ago", icon: "Calendar", color: "#EF4444" },
  { type: "reward", title: "Reward Received", detail: "1,000 coins from Recruitment Drive", time: "3d ago", icon: "Gift", color: "#EC4899" },
];

export const SYSTEM_RULES = [
  { rule: "One User Can Join Only One Family", icon: "User" },
  { rule: "Family Founder Has Full Control", icon: "Crown" },
  { rule: "Family Admin Can Manage Members", icon: "Shield" },
  { rule: "Blocked Users Cannot Join Family", icon: "Ban" },
  { rule: "Fake Families Are Not Allowed", icon: "AlertTriangle" },
  { rule: "Community Rules Must Be Followed", icon: "BookOpen" },
];

export const MANAGEMENT_DATA = {
  totalFamilies: 1248,
  activeFamilies: 1102,
  totalMembers: 86400,
  pendingReports: 14,
  topFamilies: [
    { name: "Golden Dragons", members: 120, level: 24, rank: 1 },
    { name: "Silver Wolves", members: 98, level: 21, rank: 2 },
    { name: "Crimson Eagles", members: 110, level: 22, rank: 3 },
    { name: "Royal Phoenix", members: 86, level: 18, rank: 4 },
    { name: "Diamond Lions", members: 88, level: 19, rank: 5 },
  ],
};