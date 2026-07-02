export const COLORS = {
  primary: "#1F6BFF",
  navy: "#0D1B3E",
  gold: "#FFC83D",
  cardBg: "#F5F7FA",
  muted: "#8A94A6",
  online: "#22C55E",
  blue: "#3B82F6",
  border: "#EDF0F5",
};

export const STANDARD_EMOJIS = [
  "😀","😂","🥰","😍","😘","😎","🤩","😇",
  "🤗","🤔","😅","😭","😡","🥺","😱","🤯",
  "👍","👎","👏","🙌","🙏","💪","🔥","✨",
  "❤️","💜","💙","💚","💛","🧡","💔","💖",
  "🎉","🎊","🎁","👑","💎","🌟","⭐","🎈",
  "🥳","😴","🤤","😋","🤧","🤠","🥶","🤓",
];

export const PREMIUM_EMOJIS = [
  { emoji: "🌹", name: "Red Rose", price: 5000 },
  { emoji: "💝", name: "Love Box", price: 10000 },
  { emoji: "💌", name: "Love Letter", price: 8000 },
  { emoji: "🥂", name: "Cheers", price: 15000 },
  { emoji: "🎆", name: "Fireworks", price: 20000 },
  { emoji: "🏰", name: "Castle", price: 50000 },
  { emoji: "🛳️", name: "Yacht", price: 100000 },
  { emoji: "🏎️", name: "Sports Car", price: 200000 },
  { emoji: "✈️", name: "Private Jet", price: 500000 },
  { emoji: "🏝️", name: "Private Island", price: 1000000 },
];

export const GIFTS = [
  { id: "g1", name: "Rose", icon: "🌹", price: 10000, category: "standard" },
  { id: "g2", name: "Lollipop", icon: "🍭", price: 10000, category: "standard" },
  { id: "g3", name: "Ice Cream", icon: "🍦", price: 15000, category: "standard" },
  { id: "g4", name: "Cake", icon: "🎂", price: 20000, category: "standard" },
  { id: "g5", name: "Coffee", icon: "☕", price: 12000, category: "standard" },
  { id: "g6", name: "Pizza", icon: "🍕", price: 18000, category: "standard" },
  { id: "g7", name: "Taco", icon: "🌮", price: 14000, category: "standard" },
  { id: "g8", name: "Donut", icon: "🍩", price: 13000, category: "standard" },
  { id: "g9", name: "Crown", icon: "👑", price: 100000, category: "luxury" },
  { id: "g10", name: "Ring", icon: "💍", price: 200000, category: "luxury" },
  { id: "g11", name: "Necklace", icon: "📿", price: 150000, category: "luxury" },
  { id: "g12", name: "Diamond", icon: "💎", price: 500000, category: "luxury" },
  { id: "g13", name: "Trophy", icon: "🏆", price: 300000, category: "luxury" },
  { id: "g14", name: "Sports Car", icon: "🏎️", price: 800000, category: "luxury" },
  { id: "g15", name: "Mansion", icon: "🏰", price: 1000000, category: "luxury" },
  { id: "g16", name: "Yacht", icon: "🛳️", price: 1000000, category: "luxury" },
];

export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "ur", name: "Urdu", flag: "🇵🇰" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
];

export const formatTime = (d = new Date()) => {
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
};

export const formatDate = (d = new Date()) => {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export const formatDuration = (secs) => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const formatCoins = (n) => n.toLocaleString();