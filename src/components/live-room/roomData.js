export const COLORS = {
  deepBlack: "#0A0A0F",
  darkCharcoal: "#14141F",
  midnight: "#1A1B2E",
  royalPurple: "#8B5CF6",
  electricBlue: "#3B82F6",
  gold: "#D4AF37",
  emerald: "#10B981",
  amber: "#F59E0B",
  crimson: "#EF4444",
  skyBlue: "#0EA5E9",
  white: "#FFFFFF",
  softGray: "#9CA3AF",
  lightSilver: "#D1D5DB",
};

export const ROOM_THEMES = [
  { name: "Luxury Purple", bg: "linear-gradient(135deg, #1A0B2E 0%, #2D1B4E 50%, #1A0B2E 100%)", glow: "#8B5CF6" },
  { name: "Ocean Blue", bg: "linear-gradient(135deg, #0C1E3E 0%, #0E3A5E 50%, #0C1E3E 100%)", glow: "#0EA5E9" },
  { name: "Galaxy Space", bg: "linear-gradient(135deg, #0A0A1F 0%, #1A0B2E 50%, #0A0A1F 100%)", glow: "#8B5CF6" },
  { name: "Golden VIP", bg: "linear-gradient(135deg, #1A1407 0%, #2E2408 50%, #1A1407 100%)", glow: "#D4AF37" },
  { name: "Neon Cyber", bg: "linear-gradient(135deg, #0A0F1E 0%, #0D1B2A 50%, #0A0F1E 100%)", glow: "#3B82F6" },
  { name: "Aurora Lights", bg: "linear-gradient(135deg, #0A1F1A 0%, #0D2E2A 50%, #0A1F1A 100%)", glow: "#10B981" },
  { name: "Royal Black", bg: "linear-gradient(135deg, #050505 0%, #14141F 50%, #050505 100%)", glow: "#8B5CF6" },
  { name: "Sunset Orange", bg: "linear-gradient(135deg, #1E0A0A 0%, #2E0D0D 50%, #1E0A0A 100%)", glow: "#F59E0B" },
  { name: "Emerald Green", bg: "linear-gradient(135deg, #0A1E14 0%, #0D2E1B 50%, #0A1E14 100%)", glow: "#10B981" },
  { name: "Crystal White", bg: "linear-gradient(135deg, #1A1A2E 0%, #2E2E4E 50%, #1A1A2E 100%)", glow: "#D1D5DB" },
];

export const SEAT_LAYOUT = [
  // Host seat
  { id: "host", role: "host", angle: 270, radius: 0,
    user: { name: "Aisha Khan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", vip: "VIP 8", level: 42, speaking: true, muted: false, country: "🇦🇪" } },
  // Speaker seats (circle around host)
  { id: "s1", role: "speaker", angle: 200, radius: 130,
    user: { name: "Mohammed", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", vip: "VIP 6", level: 35, speaking: false, muted: false, country: "🇸🇦" } },
  { id: "s2", role: "speaker", angle: 250, radius: 130,
    user: { name: "Sara", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", vip: "VIP 7", level: 38, speaking: true, muted: false, country: "🇪🇬" } },
  { id: "s3", role: "speaker", angle: 300, radius: 130,
    user: { name: "David", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop", vip: "VIP 5", level: 28, speaking: false, muted: true, country: "🇰🇷" } },
  { id: "s4", role: "speaker", angle: 0, radius: 130,
    user: { name: "Layla", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop", vip: "VIP 6", level: 31, speaking: false, muted: false, country: "🇦🇪" } },
  { id: "s5", role: "speaker", angle: 50, radius: 130,
    user: { name: "Ahmed", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", vip: "VIP 4", level: 25, speaking: false, muted: false, country: "🇶🇦" } },
  { id: "s6", role: "speaker", angle: 110, radius: 130,
    user: null },
  { id: "s7", role: "speaker", angle: 160, radius: 130,
    user: null },
];

export const CHAT_MESSAGES = [
  { id: 1, user: "Fatima", color: "#D4AF37", vip: true, text: "Welcome everyone to the room! 🎉", time: "20:14" },
  { id: 2, user: "Khalid", color: "#3B82F6", vip: false, text: "This room is amazing 🔥", time: "20:14" },
  { id: 3, user: "Nora", color: "#EC4899", vip: false, text: "Love the vibe here ❤️", time: "20:15" },
  { id: 4, user: "Omar", color: "#10B981", vip: true, text: "🎁 sent a Diamond Crown to Aisha!", time: "20:15", isGift: true, gift: "👑" },
  { id: 5, user: "Maya", color: "#8B5CF6", vip: false, text: "Can I get a turn to speak? 🙏", time: "20:16" },
  { id: 6, user: "Yusuf", color: "#D4AF37", vip: true, text: "👑 VIP entered the room!", time: "20:16", isSystem: true },
  { id: 7, user: "Zara", color: "#0EA5E9", vip: false, text: "The music is so good 🎵", time: "20:17" },
  { id: 8, user: "Hassan", color: "#F59E0B", vip: false, text: "Greetings from Morocco! 🇲🇦", time: "20:17" },
];

export const ACTIVITY_FEED = [
  { type: "join", user: "Yusuf", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop", text: "joined the room", time: "now" },
  { type: "gift", user: "Omar", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop", text: "sent Diamond Crown 👑", time: "1m" },
  { type: "vip", user: "Layla", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=50&h=50&fit=crop", text: "VIP entered", time: "2m" },
  { type: "join", user: "Maya", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop", text: "joined the room", time: "3m" },
  { type: "gift", user: "Fatima", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop", text: "sent Rose 🌹 x10", time: "5m" },
];

export const AUDIENCE_MEMBERS = [
  { name: "Khalid", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop" },
  { name: "Nora", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" },
  { name: "Maya", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop" },
  { name: "Zara", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=50&h=50&fit=crop" },
  { name: "Hassan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" },
];

export const ROOM_TOOLS = [
  { icon: "🎤", label: "Mic", color: COLORS.royalPurple },
  { icon: "🎁", label: "Gift", color: COLORS.gold },
  { icon: "💬", label: "Chat", color: COLORS.electricBlue },
  { icon: "✋", label: "Raise", color: COLORS.emerald },
  { icon: "😀", label: "Emoji", color: COLORS.amber },
  { icon: "📤", label: "Share", color: COLORS.skyBlue },
  { icon: "⚙️", label: "More", color: COLORS.softGray },
];

export const QUICK_GIFTS = [
  { icon: "🌹", name: "Rose", price: 1000 },
  { icon: "💋", name: "Kiss", price: 5000 },
  { icon: "🎂", name: "Cake", price: 20000 },
  { icon: "👑", name: "Crown", price: 100000 },
  { icon: "💎", name: "Diamond", price: 500000 },
  { icon: "🏎️", name: "Car", price: 800000 },
];