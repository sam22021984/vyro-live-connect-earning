export const COLORS = {
  tealDeep: "#062325",
  tealMid: "#0B3537",
  tealLight: "#0E4548",
  glassOverlay: "rgba(10, 50, 53, 0.85)",
  gold: "#D4AF37",
  goldLight: "#E5C158",
  goldDark: "#B8941E",
  white: "#FFFFFF",
  softGray: "#9CA3AF",
  emerald: "#10B981",
  crimson: "#EF4444",
  purple: "#8B5CF6",
  pink: "#EC4899",
  electricBlue: "#3B82F6",
};

// Grid seat layouts - host at top center, speakers in rows below
export const GRID_LAYOUTS = {
  8: { cols: 4, rows: 2, label: "8 Seats" },
  10: { cols: 5, rows: 2, label: "10 Seats" },
  15: { cols: 5, rows: 3, label: "15 Seats" },
  20: { cols: 5, rows: 4, label: "20 Seats" },
};

// Current room seats (10-seat layout: 1 host + 9 speakers)
export const SEATS = [
  { id: 0, role: "host", user: { name: "Aisha", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", vip: "VIP 8", level: 42, speaking: true, muted: false, country: "🇦🇪" } },
  { id: 1, role: "speaker", user: { name: "Mohammed", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", vip: "VIP 6", level: 35, speaking: false, muted: false, country: "🇸🇦" } },
  { id: 2, role: "speaker", user: { name: "Sara", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", vip: "VIP 7", level: 38, speaking: true, muted: false, country: "🇪🇬" } },
  { id: 3, role: "speaker", user: { name: "David", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop", vip: "VIP 5", level: 28, speaking: false, muted: true, country: "🇰🇷" } },
  { id: 4, role: "speaker", user: null },
  { id: 5, role: "speaker", user: { name: "Layla", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop", vip: "VIP 6", level: 31, speaking: false, muted: false, country: "🇦🇪" } },
  { id: 6, role: "speaker", user: { name: "Ahmed", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", vip: "VIP 4", level: 25, speaking: false, muted: false, country: "🇶🇦" } },
  { id: 7, role: "speaker", user: null },
  { id: 8, role: "speaker", user: { name: "Fatima", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop", vip: "VIP 9", level: 45, speaking: false, muted: false, country: "🇲🇦" } },
  { id: 9, role: "speaker", user: null },
];

// Function grid items (5x3 = 15, but we use 14 as in image)
export const FUNCTION_ITEMS = [
  { icon: "🧧", label: "Red Packet" },
  { icon: "📻", label: "Radio" },
  { icon: "⚔️", label: "PK" },
  { icon: "🧹", label: "Clear Chat" },
  { icon: "🔒", label: "Seal Income" },
  { icon: "🎨", label: "Room Theme" },
  { icon: "🔊", label: "Sound Effect" },
  { icon: "✨", label: "Effects" },
  { icon: "▶️", label: "Start" },
  { icon: "🔇", label: "Room Mute" },
  { icon: "🔐", label: "Lock" },
  { icon: "📹", label: "Video" },
  { icon: "📋", label: "Apply" },
  { icon: "📸", label: "Photo" },
];

// Entertainment quick actions (top of settings)
export const ENTERTAINMENT_ITEMS = [
  { icon: "🎤", label: "Mic", gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)" },
  { icon: "🎂", label: "Birthday", gradient: "linear-gradient(135deg, #EC4899, #BE185D)" },
  { icon: "💖", label: "Hearts", gradient: "linear-gradient(135deg, #F43F5E, #E11D48)" },
];

// Room tags
export const ROOM_TAGS = ["All", "Chat", "Birthday", "Party", "Friend", "Game", "Music", "Emotion", "Social", "DJ"];

// Room themes for background
export const ROOM_THEMES = [
  { name: "Ballroom", bg: "linear-gradient(180deg, #062325 0%, #0B3537 40%, #062325 100%)", glow: "#D4AF37" },
  { name: "Luxury Purple", bg: "linear-gradient(180deg, #1A0B2E 0%, #2D1B4E 40%, #1A0B2E 100%)", glow: "#8B5CF6" },
  { name: "Ocean", bg: "linear-gradient(180deg, #0C1E3E 0%, #0E3A5E 40%, #0C1E3E 100%)", glow: "#0EA5E9" },
  { name: "Galaxy", bg: "linear-gradient(180deg, #0A0A1F 0%, #1A0B2E 40%, #0A0A1F 100%)", glow: "#8B5CF6" },
  { name: "Golden VIP", bg: "linear-gradient(180deg, #1A1407 0%, #2E2408 40%, #1A1407 100%)", glow: "#D4AF37" },
  { name: "Neon Cyber", bg: "linear-gradient(180deg, #0A0F1E 0%, #0D1B2A 40%, #0A0F1E 100%)", glow: "#3B82F6" },
  { name: "Aurora", bg: "linear-gradient(180deg, #0A1F1A 0%, #0D2E2A 40%, #0A1F1A 100%)", glow: "#10B981" },
  { name: "Royal Black", bg: "linear-gradient(180deg, #050505 0%, #14141F 40%, #050505 100%)", glow: "#8B5CF6" },
  { name: "Sunset", bg: "linear-gradient(180deg, #1E0A0A 0%, #2E0D0D 40%, #1E0A0A 100%)", glow: "#F59E0B" },
  { name: "Emerald", bg: "linear-gradient(180deg, #0A1E14 0%, #0D2E1B 40%, #0A1E14 100%)", glow: "#10B981" },
];

export const CHAT_MESSAGES = [
  { id: 1, user: "Sajid Aslam", color: COLORS.gold, vip: true, text: "joined the room", time: "20:14", isSystem: true },
  { id: 2, user: "Khalid", color: "#3B82F6", vip: false, text: "This room is amazing 🔥", time: "20:14" },
  { id: 3, user: "Nora", color: "#EC4899", vip: false, text: "Love the vibe here ❤️", time: "20:15" },
  { id: 4, user: "Omar", color: COLORS.gold, vip: true, text: "sent Diamond Crown 👑", time: "20:15", isGift: true },
  { id: 5, user: "Maya", color: "#8B5CF6", vip: false, text: "Can I speak? 🙏", time: "20:16" },
];

export const WARNING_TEXT = "Pornography, vulgarity, violence, minors and other related situations are strictly prohibited during the live broadcast. Violators will be permanently banned and reported to authorities.";