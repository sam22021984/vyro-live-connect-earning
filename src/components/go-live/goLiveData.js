export const ROOM_TYPES = [
  { id: "public", label: "Public", desc: "Visible to everyone", icon: "🌍" },
  { id: "followers", label: "Followers", desc: "Your followers only", icon: "👥" },
  { id: "friends", label: "Friends", desc: "Friends only", icon: "💬" },
  { id: "agency", label: "Agency", desc: "Agency members only", icon: "🏢" },
  { id: "vip", label: "VIP Room", desc: "Eligible VIP members", icon: "👑" },
  { id: "password", label: "Password", desc: "Password required", icon: "🔒" },
  { id: "ticket", label: "Ticket", desc: "Ticket purchase required", icon: "🎫" },
];

export const SEAT_LAYOUTS = [
  { id: 2, label: "1-on-1", desc: "2 seats", icon: "👥" },
  { id: 4, label: "Small", desc: "4 seats", icon: "👨‍👩‍👧" },
  { id: 6, label: "Medium", desc: "6 seats", icon: "🎭" },
  { id: 8, label: "Large", desc: "8 seats", icon: "🎪" },
  { id: 10, label: "Party", desc: "10 seats", icon: "🎉" },
  { id: 12, label: "Mega", desc: "12 seats", icon: "🏰" },
];

export const BACKGROUND_THEMES = [
  { id: "teal_deep", label: "Teal Deep", gradient: "linear-gradient(135deg, #062325, #0E4548)" },
  { id: "royal_purple", label: "Royal Purple", gradient: "linear-gradient(135deg, #1A0B2E, #4C1D95)" },
  { id: "midnight_blue", label: "Midnight", gradient: "linear-gradient(135deg, #0C1426, #1E3A5F)" },
  { id: "sunset_gold", label: "Sunset", gradient: "linear-gradient(135deg, #2D1B00, #7C2D12)" },
  { id: "forest_green", label: "Forest", gradient: "linear-gradient(135deg, #0A1F0A, #14532D)" },
  { id: "crimson_rose", label: "Crimson", gradient: "linear-gradient(135deg, #2A0A0A, #831843)" },
];

export const ENTRY_EFFECTS = [
  { id: "none", label: "None", icon: "🚫" },
  { id: "sparkle", label: "Sparkle", icon: "✨" },
  { id: "fireworks", label: "Fireworks", icon: "🎆" },
  { id: "confetti", label: "Confetti", icon: "🎊" },
  { id: "royal", label: "Royal", icon: "👑" },
  { id: "vip_glow", label: "VIP Glow", icon: "💫" },
];

export const ROOM_TAGS = ["Music", "Gaming", "Chat", "Funny", "Trending", "New", "Education", "Storytelling"];

export const LANGUAGES = ["English", "Arabic", "Urdu", "Hindi", "Turkish", "Bengali", "Indonesian", "Malay"];

export const TAG_OPTIONS = ["Music", "Gaming", "Chat", "Funny", "Trending", "New", "Education", "Storytelling"];

export const LIVE_TYPES = [
  { id: "audio", label: "Audio Live", desc: "Start a voice chat room", icon: "Mic", color: "#3B82F6" },
  { id: "party", label: "Party Room", desc: "Multi-guest party room", icon: "PartyPopper", color: "#EC4899" },
  { id: "multi", label: "Multi-Guest", desc: "Invite multiple guests", icon: "Users", color: "#10B981" },
  { id: "pk", label: "PK Live", desc: "Battle another host live", icon: "Swords", color: "#F59E0B" },
  { id: "schedule", label: "Schedule Live", desc: "Plan a future session", icon: "Calendar", color: "#06B6D4" },
  { id: "practice", label: "Practice Live", desc: "Practice mode (hosts only)", icon: "Dumbbell", color: "#6366F1" },
];

export const DEFAULT_RULES = "Be respectful. No spam. No hate speech. Follow community guidelines.";