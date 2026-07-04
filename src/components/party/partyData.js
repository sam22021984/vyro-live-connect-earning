// Party module UI configuration — static layout data only.
// Real data (rooms, friends activity, following, recent, explore) comes from
// usePartyRooms + usePartySocial hooks + backend entities.

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

export const formatNum = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toLocaleString();
};