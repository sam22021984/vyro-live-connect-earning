export const RELATIONSHIP_COLORS = {
  pink: "#EC4899",
  purple: "#A855F7",
  softRed: "#F43F5E",
  dark: "#1A0B2E",
  darkCard: "#2D1B4E",
  glassBg: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(255,255,255,0.12)",
  textLight: "#F4F0FA",
  textMuted: "#A78BCC",
};

export const GRADIENT_PINK_PURPLE = "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)";
export const GRADIENT_DARK = "linear-gradient(160deg, #1A0B2E 0%, #2D1B4E 50%, #3B0764 100%)";

export const SOCIAL_MODULES = [
  { name: "Friends", icon: "👥", gradient: "from-blue-400 to-cyan-500", path: null },
  { name: "Family", icon: "🏠", gradient: "from-green-400 to-emerald-500", path: "/family-center" },
  { name: "My People", icon: "🌟", gradient: "from-amber-400 to-orange-500", path: null },
  { name: "Relationship", icon: "❤️", gradient: "from-pink-400 to-purple-500", path: "/relationship-center", highlight: true },
];

export const DISCOVER_FILTERS = [
  { key: "recommended", label: "Recommended", icon: "✨" },
  { key: "online", label: "Online", icon: "🟢" },
  { key: "active", label: "Active", icon: "🔥" },
];

export const HISTORY_FILTERS = [
  { key: "sent", label: "Sent Requests" },
  { key: "received", label: "Received Requests" },
  { key: "accepted", label: "Accepted" },
  { key: "rejected", label: "Rejected" },
  { key: "ended", label: "Ended" },
];

export const SAFETY_OPTIONS = [
  { key: "report", label: "Report User", icon: "🚩", color: "#F43F5E", desc: "Report inappropriate behavior" },
  { key: "block", label: "Block User", icon: "🚫", color: "#EF4444", desc: "Block a user from contacting you" },
  { key: "unblock", label: "Unblock User", icon: "✅", color: "#22C55E", desc: "Remove a user from block list" },
  { key: "guidelines", label: "Safety Guidelines", icon: "🛡️", color: "#3B82F6", desc: "Read community safety rules" },
  { key: "standards", label: "Community Standards", icon: "📜", color: "#A855F7", desc: "View platform community standards" },
];

export const SAFETY_GUIDELINES = [
  "Always respect other users and their boundaries.",
  "Never share personal information like passwords or financial details.",
  "Report any suspicious or fraudulent activity immediately.",
  "One active relationship per user — be genuine and committed.",
  "Fake accounts are strictly prohibited and will be removed.",
  "Blocked users cannot send you relationship requests.",
  "Consent is mandatory — always ask before sending a request.",
  "If you feel unsafe, end the relationship and report the user.",
];

export const COMMUNITY_STANDARDS = [
  "Be authentic — use your real identity and real photos.",
  "Treat all users with kindness, dignity, and respect.",
  "No harassment, hate speech, or bullying of any kind.",
  "No spam, scams, or fraudulent activities.",
  "No explicit or inappropriate content.",
  "Respect privacy — don't share others' information.",
  "Follow all platform rules and terms of service.",
  "Violations may result in account suspension or ban.",
];

export const formatDate = (d = new Date()) => {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export const formatTime = (d = new Date()) => {
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
};

export const daysSince = (dateStr) => {
  if (!dateStr) return 0;
  const diff = new Date() - new Date(dateStr);
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
};