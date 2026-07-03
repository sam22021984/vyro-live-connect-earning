// Social module UI configuration — static layout data only.
// Real data (stats, lists, history) comes from the useSocialData hook + backend.

export const SOCIAL_MODULE_CONFIG = [
  {
    id: "invite",
    title: "My Invite",
    subtitle: "Invite Friends & Earn Rewards",
    description: "My Invite is the official referral system that allows users to invite new members to join the platform using a personal invitation code or referral link. Users receive rewards when invited members register, verify their account, and complete eligible activities.",
    icon: "Ticket",
    color: "#EC4899",
    gradient: "linear-gradient(135deg, #EC4899, #BE185D)",
    stats: [],
    history: [],
    inviteCode: "",
    inviteLink: "",
    shareOptions: [
      { label: "WhatsApp", icon: "MessageCircle", color: "#25D366" },
      { label: "Telegram", icon: "Send", color: "#0088CC" },
      { label: "Facebook", icon: "Facebook", color: "#1877F2" },
      { label: "Instagram", icon: "Instagram", color: "#E4405F" },
      { label: "Messenger", icon: "MessageSquare", color: "#0084FF" },
      { label: "SMS", icon: "MessageCircle", color: "#27AE60" },
      { label: "Email", icon: "Mail", color: "#F2994A" },
      { label: "More", icon: "Share2", color: "#6B7280" },
    ],
    features: [
      "Personal Invite Code", "Referral Link", "QR Code Invitation", "Copy Invite Link",
      "Social Media Sharing", "Invite History", "Total Invited Users", "Active Invited Users",
      "Pending Invitations", "Referral Rewards", "Coins Earned", "Bonus History",
      "Daily Invite Statistics", "Monthly Invite Statistics", "Leaderboard Ranking",
      "Invite Campaigns", "Referral Levels", "Referral Progress", "Referral Achievements",
    ],
    actions: ["Copy Code", "Copy Link", "Generate QR", "Share", "View History", "Track Status", "Check Rewards", "Redeem Rewards", "View Ranking"],
  },
  {
    id: "people",
    title: "My People",
    subtitle: "All Your Connected Users",
    description: "My People is a complete relationship management system where users can organize everyone connected to their account. It displays followers, following, referrals, contacts, recent interactions, and community members.",
    icon: "Users",
    color: "#2F80ED",
    gradient: "linear-gradient(135deg, #2F80ED, #56CCF2)",
    stats: [],
    categories: [],
    people: [],
    features: [
      "Connected Users List", "Followers", "Following", "Referral Members", "VIP Members",
      "Hosts", "Agencies", "Family Members", "Friends", "Favorite Users", "Online Status",
      "Last Active Time", "User Level", "VIP Badge", "Profile Preview", "Search People",
      "Filter by Status", "Sort by Activity", "Mutual Connections", "Recently Connected", "Suggested People",
    ],
    actions: ["View Profile", "Follow", "Unfollow", "Send Request", "Remove", "Block", "Report", "Message", "Voice Call", "Video Call", "Invite to Party", "Invite to Live", "Add to Favorites", "Share Profile"],
  },
  {
    id: "friends",
    title: "Friends",
    subtitle: "Mutual Friendship System",
    description: "Friends is the official friendship management system where users can send, receive, and manage friend requests. Friends can communicate instantly, join rooms together, play games, exchange gifts, and interact across the platform.",
    icon: "Handshake",
    color: "#27AE60",
    gradient: "linear-gradient(135deg, #27AE60, #2ECC71)",
    stats: [],
    tabs: [],
    friends: [],
    requests: [],
    features: [
      "Friends List", "Friend Requests", "Pending Requests", "Sent Requests", "Mutual Friends",
      "Best Friends", "Close Friends", "Online Friends", "Offline Friends", "Recently Active Friends",
      "Birthday Reminder", "Friend Recommendations", "Search Friends", "Friend Categories",
      "Favorite Friends", "Friend Levels", "Friendship Anniversary", "Friendship Points",
      "Shared Interests", "Shared Groups",
    ],
    actions: ["Add Friend", "Accept", "Decline", "Cancel", "Remove", "Block", "Report", "Message", "Voice Call", "Video Call", "Invite to Party", "Invite to Live", "Send Gift", "Send Coins", "Share", "Pin Friend", "Mute", "Favorite"],
  },
  {
    id: "relationship",
    title: "Relationship",
    subtitle: "Find Your Special Someone",
    description: "Send relationship requests, manage your connections, and find your special someone. One active relationship per user — be genuine and committed.",
    icon: "Heart",
    color: "#EC4899",
    gradient: "linear-gradient(135deg, #EC4899, #A855F7)",
    path: "/relationship-center",
    stats: [],
    features: [
      "Discover Users", "Send Request", "Accept Request", "Pending Requests",
      "My Relationship", "Relationship History", "Safety Center", "Report User",
      "Block User", "Community Standards", "Verified Profiles",
    ],
    actions: ["Open Relationship Center", "Discover", "Requests", "History", "Safety"],
  },
  {
    id: "family",
    title: "Family",
    subtitle: "Build Your Community Family",
    description: "Create or join a Family to build community, compete in PK battles, earn rewards, and grow together. Families have levels, treasuries, missions, and rankings.",
    icon: "Heart",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981, #047857)",
    path: "/family-center",
    stats: [],
    features: [
      "Family Creation", "Family Management", "Family Levels", "Family Rankings",
      "Family PK Battles", "Family Treasury", "Family Contributions", "Family Missions",
      "Family Rewards", "Family Achievements", "Family Invitations", "Family Events",
      "Family Announcements", "Family Store", "Family Analytics",
    ],
    actions: ["Open Family Center", "Create Family", "Join Family", "View Rankings", "Family Treasury"],
  },
];

// Merge static config with real data from the backend
export function buildModules(data) {
  if (!data) return SOCIAL_MODULE_CONFIG;

  const { invite, people, friends, relationship, family } = data;

  return [
    {
      ...SOCIAL_MODULE_CONFIG[0],
      stats: [
        { label: "Total Invited", value: String(invite.stats.totalInvited), color: "#EC4899" },
        { label: "Active", value: String(invite.stats.active), color: "#10B981" },
        { label: "Pending", value: String(invite.stats.pending), color: "#F2994A" },
        { label: "Coins Earned", value: invite.stats.coinsEarned.toLocaleString(), color: "#F59E0B" },
      ],
      history: invite.history,
      inviteCode: invite.code,
      inviteLink: invite.link,
    },
    {
      ...SOCIAL_MODULE_CONFIG[1],
      stats: [
        { label: "Followers", value: String(people.stats.followers), color: "#2F80ED" },
        { label: "Following", value: String(people.stats.following), color: "#56CCF2" },
        { label: "Referrals", value: String(people.stats.referrals), color: "#EC4899" },
        { label: "Online", value: String(people.stats.online), color: "#10B981" },
      ],
      categories: people.categories,
      people: people.list,
    },
    {
      ...SOCIAL_MODULE_CONFIG[2],
      stats: [
        { label: "Friends", value: String(friends.stats.total), color: "#27AE60" },
        { label: "Requests", value: String(friends.stats.pending), color: "#F2994A" },
        { label: "Online", value: String(friends.stats.online), color: "#10B981" },
        { label: "Best Friends", value: String(friends.stats.best), color: "#D4AF37" },
      ],
      tabs: [
        { label: "Friends", count: String(friends.stats.total), icon: "Handshake", color: "#27AE60" },
        { label: "Requests", count: String(friends.stats.pending), icon: "Inbox", color: "#F2994A" },
        { label: "Sent", count: String(friends.stats.sent), icon: "Send", color: "#2F80ED" },
        { label: "Suggestions", count: "0", icon: "Sparkles", color: "#8B5CF6" },
      ],
      friends: friends.list,
      requests: friends.requests,
    },
    {
      ...SOCIAL_MODULE_CONFIG[3],
      stats: [
        { label: "Sent", value: String(relationship.stats.sent), color: "#EC4899" },
        { label: "Received", value: String(relationship.stats.received), color: "#A855F7" },
        { label: "Active", value: String(relationship.stats.active), color: "#27AE60" },
        { label: "History", value: String(relationship.stats.history), color: "#F59E0B" },
      ],
    },
    {
      ...SOCIAL_MODULE_CONFIG[4],
      stats: [
        { label: "Members", value: String(family.stats.members), color: "#10B981" },
        { label: "Level", value: family.stats.level ? `LV.${family.stats.level}` : "—", color: "#F59E0B" },
        { label: "Rank", value: family.stats.rank ? `#${family.stats.rank}` : "—", color: "#2F80ED" },
        { label: "Treasury", value: family.stats.treasury ? `${(family.stats.treasury / 1000).toFixed(1)}K` : "0", color: "#D4AF37" },
      ],
    },
  ];
}