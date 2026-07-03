/**
 * Shared Role Hierarchy & Dashboard Visibility Logic
 * 
 * Roles are cumulative — as a user progresses through the hierarchy,
 * they gain access to more dashboards.
 * 
 * Hierarchy: user → host → agent → agency → admin → owner
 * 
 * - user (0):   User Dashboard only
 * - host (1):   User + Host Dashboards
 * - agent (2):  User + Host + Agent Dashboards
 * - agency (3): User + Host + Agent + Agency Dashboards
 * - admin (4):  All Control Center + Creator Center admin dashboards
 * - owner (5):  Everything including Owner & SAM dashboards
 */

export const ROLE_LEVELS = {
  user: 0,
  host: 1,
  agent: 2,
  agency: 3,
  admin: 4,
  owner: 5,
};

/**
 * Control Center dashboards with minimum role level required.
 * Cumulative — a user at level N sees all dashboards with requiredLevel <= N.
 */
export const CONTROL_CENTER_DASHBOARDS = [
  {
    id: "user",
    title: "User Dashboard",
    description: "Manage your profile, wallet, VIP, rewards, social connections, live rooms, gifts, events, achievements, and activity",
    icon: "user",
    path: "/user-dashboard",
    gradient: "linear-gradient(135deg, #D4AF37, #F59E0B)",
    color: "#D4AF37",
    requiredLevel: 0,
    modules: ["Home", "Profile Center", "Wallet Center", "Reward Center", "VIP Center", "Social Center", "Live Center", "Gift Center", "Event Center", "Achievement Center", "Referral Center", "Notification Center", "Settings", "Safety Center", "Support Center", "User Activity"],
  },
  {
    id: "host",
    title: "Host Dashboard",
    description: "Streamers manage live performance, earnings, audience analytics, growth, achievements, and compliance",
    icon: "radio",
    path: "/host-dashboard",
    gradient: "linear-gradient(135deg, #DB2777, #EC4899)",
    color: "#EC4899",
    requiredLevel: 1,
    modules: ["Host Overview", "Live Streaming Center", "Earnings Center", "Audience Analytics", "Host Tasks & Rewards", "Content Management", "Host Ranking Center", "Support & Compliance"],
  },
  {
    id: "agent",
    title: "Agent Dashboard",
    description: "Agents recruit hosts, track targets, manage performance, and support agency growth",
    icon: "user",
    path: "/agent-dashboard",
    gradient: "linear-gradient(135deg, #2563EB, #3B82F6)",
    color: "#3B82F6",
    requiredLevel: 2,
    modules: ["Agent Overview", "Recruitment Management", "Host Support Center", "Target & KPI Center", "Earnings & Commission", "Analytics Center", "Tasks & Achievements", "Support & Compliance"],
  },
  {
    id: "agency",
    title: "Agency Dashboard",
    description: "Agency owners manage host networks, recruitment, revenue, compliance, and operations",
    icon: "building",
    path: "/agency-dashboard",
    gradient: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
    color: "#8B5CF6",
    requiredLevel: 3,
    modules: ["Agency Overview", "Host Management", "Recruitment Center", "Revenue Management", "Performance Analytics", "Events & Campaigns", "Compliance Center", "Agency Leaderboard"],
  },
];

/**
 * Creator Center dashboards — enterprise/admin level.
 * Only visible to admin (4) and owner (5) roles.
 */
export const CREATOR_CENTER_DASHBOARD_LEVELS = {
  owner: 5,        // Application Owner — only owner
  sam: 5,          // Super Admin Manager — only owner
  country: 4,      // Country Manager — admin+
  bdev: 4,         // Business Developer — admin+
  business: 4,     // Business Manager — admin+
  support: 4,      // Support Manager — admin+
  finance: 4,      // Finance Manager — admin+
  marketing: 4,    // Marketing Manager — admin+
  vip: 4,          // VIP Manager — admin+
  reward: 4,       // Reward Manager — admin+
  event: 4,        // Event Manager — admin+
  pkmanager: 4,    // PK Manager — admin+
  superadmin: 4,   // Super Admin — admin+
  admin: 4,        // Admin — admin+
  seller: 99,      // Coin Seller — requires approved coins_seller application (handled separately)
};

/**
 * Get the numeric level for a role string.
 */
export function getRoleLevel(role) {
  return ROLE_LEVELS[role] ?? 0;
}

/**
 * Filter Control Center dashboards visible to a user based on their role.
 * Returns { visible, locked } arrays.
 */
export function getControlCenterDashboards(role) {
  const level = getRoleLevel(role);
  const visible = CONTROL_CENTER_DASHBOARDS.filter((d) => level >= d.requiredLevel);
  const locked = CONTROL_CENTER_DASHBOARDS.filter((d) => level < d.requiredLevel);
  return { visible, locked };
}

/**
 * Filter Creator Center dashboards visible to a user based on their role.
 * Returns { visible, locked } arrays.
 */
export function getCreatorCenterDashboards(allDashboards, role) {
  const level = getRoleLevel(role);
  const visible = allDashboards.filter((d) => level >= (CREATOR_CENTER_DASHBOARD_LEVELS[d.id] ?? 4));
  const locked = allDashboards.filter((d) => level < (CREATOR_CENTER_DASHBOARD_LEVELS[d.id] ?? 4));
  return { visible, locked };
}