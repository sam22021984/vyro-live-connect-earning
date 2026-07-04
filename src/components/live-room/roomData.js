// Live Room UI configuration — static layout data only.
// Real data (seats, chat, participants, leaderboard) comes from
// useLiveRoomData + useLiveRoomApi hooks + backend entities.

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
  4: { cols: 4, rows: 1, label: "4 Seats" },
  6: { cols: 3, rows: 2, label: "6 Seats" },
  8: { cols: 4, rows: 2, label: "8 Seats" },
  10: { cols: 5, rows: 2, label: "10 Seats" },
  15: { cols: 5, rows: 3, label: "15 Seats" },
  20: { cols: 5, rows: 4, label: "20 Seats" },
};

// Function grid items
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

// Entertainment quick actions
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

// Gift catalog — used as fallback for audience gift simulation in live rooms
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

export const EMOJI_CATEGORIES = [
  { id: "basic", name: "Basic", icon: "😀", desc: "Available to all users" },
  { id: "vip", name: "VIP", icon: "👑", desc: "VIP members only" },
  { id: "premium", name: "Premium", icon: "💎", desc: "Premium & VIP users" },
  { id: "festival", name: "Festival", icon: "🎉", desc: "Special event emojis" },
  { id: "limited", name: "Limited", icon: "⭐", desc: "Time-limited collections" },
];

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

// Role permission matrix — maps each role to the admin control IDs it can use.
// owner = room creator; admin/co_host/moderator have progressively fewer powers.
export const ROLE_PERMISSIONS = {
  owner: [
    "mute", "unmute", "remove_seat", "move_seat", "kick_audience", "lock_seat", "unlock_seat",
    "kick_room", "ban_24h", "ban_7d", "ban_permanent", "block_speaking", "clear_messages",
    "promote_mod", "remove_mod", "promote_admin", "remove_admin", "promote_co_host", "assign_seat",
  ],
  admin: [
    "mute", "unmute", "remove_seat", "move_seat", "kick_audience", "lock_seat", "unlock_seat",
    "kick_room", "ban_24h", "ban_7d", "block_speaking", "clear_messages", "promote_mod", "remove_mod",
  ],
  co_host: [
    "mute", "unmute", "remove_seat", "move_seat", "kick_audience", "lock_seat", "unlock_seat",
    "kick_room", "ban_24h",
  ],
  moderator: [
    "mute", "unmute", "kick_audience", "kick_room", "ban_24h", "block_speaking", "clear_messages",
  ],
  speaker: [],
  viewer: [],
};

// Helper: filter ADMIN_CONTROLS sections by role permissions
export function getControlsForRole(role) {
  const allowed = ROLE_PERMISSIONS[role] || [];
  const filterControls = (controls) => controls.filter((c) => allowed.includes(c.id));
  return {
    seat_management: filterControls(ADMIN_CONTROLS.seat_management),
    room_moderation: filterControls(ADMIN_CONTROLS.room_moderation),
    role_management: filterControls(ADMIN_CONTROLS.role_management),
  };
}