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
  { key: "social", label: "Social Hub", icon: "🤝" },
  { key: "media", label: "Media Gallery", icon: "🖼️" },
  { key: "gifting", label: "Gifting", icon: "🎁" },
  { key: "reports", label: "Reports", icon: "🚩" },
  { key: "announcements", label: "Announcements", icon: "🔔" },
  { key: "saved", label: "Saved Posts", icon: "🔖" },
  { key: "membership", label: "Membership", icon: "💎" },
  { key: "admin", label: "Admin Panel", icon: "⚡" },
  { key: "security", label: "Security Center", icon: "🛡️" },
];

export const formatNum = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toLocaleString();
};