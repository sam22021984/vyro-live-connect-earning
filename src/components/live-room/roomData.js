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
  { id: 0, role: "host", user: { name: "Aisha", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", vip: "VIP 8", level: 42, speaking: true, muted: false, country: "🇦🇪", vyro_id: "VY10042", agency: "Golden Stars", is_host: true, followers: 12500, following: 340, is_online: true } },
  { id: 1, role: "speaker", user: { name: "Mohammed", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", vip: "VIP 6", level: 35, speaking: false, muted: false, country: "🇸🇦", vyro_id: "VY10043", agency: "Golden Stars", is_host: false, followers: 8200, following: 210, is_online: true } },
  { id: 2, role: "speaker", user: { name: "Sara", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", vip: "VIP 7", level: 38, speaking: true, muted: false, country: "🇪🇬", vyro_id: "VY10044", agency: "Diamond Crew", is_host: false, followers: 9800, following: 180, is_online: true } },
  { id: 3, role: "speaker", user: { name: "David", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop", vip: "VIP 5", level: 28, speaking: false, muted: true, country: "🇰🇷", vyro_id: "VY10045", agency: null, is_host: false, followers: 5400, following: 420, is_online: true } },
  { id: 4, role: "speaker", user: null },
  { id: 5, role: "speaker", user: { name: "Layla", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop", vip: "VIP 6", level: 31, speaking: false, muted: false, country: "🇦🇪", vyro_id: "VY10046", agency: "Diamond Crew", is_host: false, followers: 7100, following: 290, is_online: true } },
  { id: 6, role: "speaker", user: { name: "Ahmed", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", vip: "VIP 4", level: 25, speaking: false, muted: false, country: "🇶🇦", vyro_id: "VY10047", agency: null, is_host: false, followers: 4300, following: 150, is_online: true } },
  { id: 7, role: "speaker", user: null },
  { id: 8, role: "speaker", user: { name: "Fatima", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop", vip: "VIP 9", level: 45, speaking: false, muted: false, country: "🇲🇦", vyro_id: "VY10048", agency: "Golden Stars", is_host: false, followers: 15600, following: 380, is_online: true } },
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

// Seat positions for animations (percentage of seat area container)
export const SEAT_POSITIONS = {
  0: { x: 50, y: 10 },
  1: { x: 10, y: 40 },
  2: { x: 30, y: 40 },
  3: { x: 50, y: 40 },
  4: { x: 70, y: 40 },
  5: { x: 90, y: 40 },
  6: { x: 20, y: 72 },
  7: { x: 40, y: 72 },
  8: { x: 60, y: 72 },
  9: { x: 80, y: 72 },
  audience: { x: 50, y: 95 },
};

// 3D Emoji system
export const EMOJIS_3D = [
  { id: "heart", emoji: "❤️", name: "Heart", category: "basic", animation: "fly", color: "#EF4444" },
  { id: "kiss", emoji: "😘", name: "Kiss", category: "basic", animation: "fly", color: "#EC4899" },
  { id: "applause", emoji: "👏", name: "Applause", category: "basic", animation: "fly", color: "#F59E0B" },
  { id: "fire", emoji: "🔥", name: "Fire", category: "basic", animation: "fly", color: "#EF4444" },
  { id: "rose", emoji: "🌹", name: "Rose", category: "basic", animation: "rotate", color: "#EC4899" },
  { id: "love_eyes", emoji: "😍", name: "Love Eyes", category: "basic", animation: "fly", color: "#EC4899" },
  { id: "celebration", emoji: "🎉", name: "Celebration", category: "basic", animation: "burst", color: "#8B5CF6" },
  { id: "crown", emoji: "👑", name: "Crown", category: "vip", animation: "drop", color: "#D4AF37" },
  { id: "star", emoji: "⭐", name: "Star", category: "vip", animation: "fly", color: "#F59E0B" },
  { id: "diamond", emoji: "💎", name: "Diamond", category: "premium", animation: "sparkle", color: "#3B82F6" },
  { id: "hammer", emoji: "🔨", name: "Hammer", category: "basic", animation: "smash", color: "#A78BFA" },
];

export const EMOJI_CATEGORIES = [
  { id: "basic", name: "Basic", icon: "😀", desc: "Available to all users" },
  { id: "vip", name: "VIP", icon: "👑", desc: "VIP members only" },
  { id: "premium", name: "Premium", icon: "💎", desc: "Premium & VIP users" },
  { id: "festival", name: "Festival", icon: "🎉", desc: "Special event emojis" },
  { id: "limited", name: "Limited", icon: "⭐", desc: "Time-limited collections" },
];

// Gift catalog with effect types
export const GIFT_CATALOG = [
  { id: "rose", name: "Rose", icon: "🌹", price: 100, category: "standard", effect: "hearts", tier: "standard" },
  { id: "heart", name: "Heart", icon: "💖", price: 200, category: "standard", effect: "hearts", tier: "standard" },
  { id: "star", name: "Star", icon: "⭐", price: 500, category: "standard", effect: "stars", tier: "standard" },
  { id: "crown", name: "Crown", icon: "👑", price: 1000, category: "premium", effect: "gold_ring", tier: "premium" },
  { id: "diamond", name: "Diamond", icon: "💎", price: 5000, category: "premium", effect: "sparkle", tier: "premium" },
  { id: "luxury_car", name: "Luxury Car", icon: "🚗", price: 10000, category: "luxury", effect: "fireworks", tier: "premium" },
  { id: "castle", name: "Castle", icon: "🏰", price: 50000, category: "luxury", effect: "room_celebration", tier: "premium" },
  { id: "rocket", name: "Rocket", icon: "🚀", price: 100000, category: "luxury", effect: "screen_flash", tier: "premium" },
];

// Gift leaderboard data
export const GIFT_LEADERBOARD_DATA = {
  top_gifters: [
    { name: "Ali Khan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", amount: 125000, rank: 1 },
    { name: "Sara Ahmed", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", amount: 98000, rank: 2 },
    { name: "Omar Farooq", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop", amount: 75000, rank: 3 },
    { name: "Layla Noor", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop", amount: 52000, rank: 4 },
    { name: "David Kim", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop", amount: 41000, rank: 5 },
  ],
  top_receivers: [
    { name: "Aisha", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", amount: 210000, rank: 1 },
    { name: "Fatima", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop", amount: 185000, rank: 2 },
    { name: "Sara", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", amount: 132000, rank: 3 },
    { name: "Layla", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop", amount: 98000, rank: 4 },
    { name: "Mohammed", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop", amount: 67000, rank: 5 },
  ],
};

// Admin & Owner seat action controls
export const ADMIN_CONTROLS = {
  seat_management: [
    { id: "mute", label: "Mute User", icon: "MicOff", color: "#EF4444" },
    { id: "unmute", label: "Unmute User", icon: "Mic", color: "#10B981" },
    { id: "remove_seat", label: "Remove From Seat", icon: "UserMinus", color: "#F59E0B" },
    { id: "move_seat", label: "Move To Another Seat", icon: "ArrowRightLeft", color: "#3B82F6" },
    { id: "kick_audience", label: "Kick To Audience", icon: "Users", color: "#F59E0B" },
    { id: "lock_seat", label: "Lock Seat", icon: "Lock", color: "#EF4444" },
    { id: "unlock_seat", label: "Unlock Seat", icon: "Unlock", color: "#10B981" },
  ],
  room_moderation: [
    { id: "kick_room", label: "Kick From Room", icon: "DoorOpen", color: "#EF4444" },
    { id: "ban_24h", label: "Ban 24 Hours", icon: "Clock", color: "#F59E0B" },
    { id: "ban_7d", label: "Ban 7 Days", icon: "Calendar", color: "#F59E0B" },
    { id: "ban_permanent", label: "Permanent Ban", icon: "Ban", color: "#DC2626" },
    { id: "block_speaking", label: "Block Speaking", icon: "MicOff", color: "#EF4444" },
    { id: "clear_messages", label: "Clear User Messages", icon: "Eraser", color: "#6B7280" },
  ],
  role_management: [
    { id: "promote_mod", label: "Promote To Moderator", icon: "Shield", color: "#10B981" },
    { id: "remove_mod", label: "Remove Moderator", icon: "ShieldOff", color: "#F59E0B" },
    { id: "promote_admin", label: "Promote To Admin", icon: "Crown", color: "#D4AF37" },
    { id: "remove_admin", label: "Remove Admin", icon: "Crown", color: "#F59E0B" },
  ],
};