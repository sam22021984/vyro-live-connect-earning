export const rechargeTiers = [
  // Starter Tiers ($1 - $5)
  { id: "t1", price: 1, coins: 20000, bonusPct: 5, bonusCoins: 1000, total: 21000, duration: "24 Hours", color: "#22C55E", tier: "STARTER", benefits: ["Basic Profile Frame (24h)", "Entry Light Effect (24h)", "Chat Color Unlock (24h)", "Basic VIP Badge (24h)", "Room Entry Priority (Low)"] },
  { id: "t2", price: 2, coins: 40000, bonusPct: 7, bonusCoins: 2800, total: 42800, duration: "48 Hours", color: "#3B82F6", tier: "STARTER", benefits: ["Animated Frame (48h)", "Chat Bubble Style (48h)", "Entry Effect Upgrade (48h)", "VIP Name Color (48h)", "Medium Room Priority"] },
  { id: "t3", price: 3, coins: 60000, bonusPct: 10, bonusCoins: 6000, total: 66000, duration: "2 Days", color: "#A855F7", tier: "STARTER", benefits: ["Premium Animated Frame (2 days)", "Entry Explosion Effect (2 days)", "VIP Chat Bubble (2 days)", "Emoji Pack Unlock (2 days)", "Higher Room Priority"] },
  { id: "t4", price: 4, coins: 80000, bonusPct: 12, bonusCoins: 9600, total: 89600, duration: "5 Days", color: "#EAB308", tier: "STARTER", benefits: ["Elite Frame (5 days)", "Vehicle Entry Effect (5 days)", "VIP Crown Light Effect (5 days)", "Profile Highlight Boost (5 days)", "High Room Priority"] },
  { id: "t5", price: 5, coins: 100000, bonusPct: 15, bonusCoins: 15000, total: 115000, duration: "5 Days", color: "#EF4444", tier: "STARTER", benefits: ["Premium Animated Frame (5 days)", "Special Entrance Animation (5 days)", "VIP Chat Bubble Pro (5 days)", "Exclusive Emoji Set (5 days)", "Profile Glow Effect (5 days)", "Highest Entry Priority"] },

  // Premium Tiers ($5 - $5000)
  { id: "p5", price: 5, coins: 100000, bonusPct: 5, bonusCoins: 5000, total: 105000, duration: "5 Days", color: "#22C55E", tier: "PREMIUM", benefits: ["Basic Animated Frame", "Entry Light Effect", "Chat Color Unlock", "VIP Badge (Temporary)", "Room Entry Priority (Low)"] },
  { id: "p10", price: 10, coins: 200000, bonusPct: 7, bonusCoins: 14000, total: 214000, duration: "7 Days", color: "#3B82F6", tier: "PREMIUM", benefits: ["Animated Frame Upgrade", "Chat Bubble Style", "Entry Effect (Medium)", "Profile Highlight", "Priority Room Entry"] },
  { id: "p20", price: 20, coins: 400000, bonusPct: 8, bonusCoins: 32000, total: 432000, duration: "7 Days", color: "#A855F7", tier: "PREMIUM", benefits: ["Premium Frame", "Entrance Explosion Effect", "VIP Chat Bubble", "Emoji Pack Unlock", "Higher Room Priority"] },
  { id: "p50", price: 50, coins: 1000000, bonusPct: 10, bonusCoins: 100000, total: 1100000, duration: "10 Days", color: "#EAB308", tier: "PREMIUM", benefits: ["Elite Animated Frame", "Vehicle Entry Effect", "VIP Crown Glow", "Profile Boost Highlight", "Advanced Room Priority"] },
  { id: "p100", price: 100, coins: 2000000, bonusPct: 12, bonusCoins: 240000, total: 2240000, duration: "15 Days", color: "#EF4444", tier: "PREMIUM", benefits: ["Premium Crown Frame", "Animated Entrance Effect", "VIP Chat Bubble Pro", "Exclusive Emoji Set", "High Room Priority"] },
  { id: "p200", price: 200, coins: 4000000, bonusPct: 13, bonusCoins: 520000, total: 4520000, duration: "20 Days", color: "#F97316", tier: "PREMIUM", benefits: ["Luxury Animated Frame", "Vehicle Effect Pro", "VIP Room Access Priority", "Profile Theme Glow", "Special Ranking Boost"] },
  { id: "p500", price: 500, coins: 10000000, bonusPct: 14, bonusCoins: 1400000, total: 11400000, duration: "30 Days", color: "#92400E", tier: "PREMIUM", benefits: ["Ultra Frame Crown", "Super Entrance Animation", "VIP Elite Chat Bubble", "Private Room Access", "High Ranking Boost"] },
  { id: "p1000", price: 1000, coins: 20000000, bonusPct: 15, bonusCoins: 3000000, total: 23000000, duration: "45 Days", color: "#1F2937", tier: "PREMIUM", benefits: ["Royal Frame System", "Custom Entrance Effect", "VIP Vehicle Effect", "Profile Theme Customization", "Priority Verification"] },
  { id: "p2000", price: 2000, coins: 40000000, bonusPct: 16, bonusCoins: 6400000, total: 46400000, duration: "60 Days", color: "#F59E0B", tier: "PREMIUM", benefits: ["Royal Crown Frame", "Custom Chat Style", "VIP Event Access", "High Priority Rooms", "Dedicated Support"] },
  { id: "p3000", price: 3000, coins: 60000000, bonusPct: 17, bonusCoins: 10200000, total: 70200000, duration: "60 Days", color: "#0EA5E9", tier: "PREMIUM", benefits: ["Elite Royal Frame", "Custom Profile Theme", "Exclusive Entrance Effects", "VIP Leaderboard Boost", "Premium Event Access"] },
  { id: "p3500", price: 3500, coins: 70000000, bonusPct: 18, bonusCoins: 12600000, total: 82600000, duration: "75 Days", color: "#0EA5E9", tier: "PREMIUM", benefits: ["Legendary Frame System", "Personal VIP Badge Style", "Special Room Access", "Custom Effects Unlock", "Priority Ranking System"] },
  { id: "p4000", price: 4000, coins: 80000000, bonusPct: 19, bonusCoins: 15200000, total: 95200000, duration: "90 Days", color: "#F59E0B", tier: "PREMIUM", benefits: ["Mythic Frame System", "Royal Entrance Effects", "VIP Private Rooms", "Custom Profile Theme", "Event Priority Access"] },
  { id: "p4500", price: 4500, coins: 90000000, bonusPct: 20, bonusCoins: 18000000, total: 108000000, duration: "90 Days", color: "#EF4444", tier: "PREMIUM", benefits: ["Ultra Royal Frame", "Exclusive Identity Badge", "Highest Room Priority", "VIP Global Ranking Boost", "Personal Account Manager"] },
  { id: "p5000", price: 5000, coins: 100000000, bonusPct: 22, bonusCoins: 22000000, total: 122000000, duration: "LIFETIME", color: "#F59E0B", tier: "MAX", benefits: ["Royal King Frame (Animated)", "Custom Profile Full Theme", "VIP Permanent Badge Style", "Highest Priority Everywhere", "Private VIP Events Access", "Dedicated Manager Support", "Early Feature Access", "Global Ranking Crown"] },
];

export const paymentMethods = [
  { id: "paypal", name: "PayPal", icon: "💙", desc: "Secure PayPal Payment · Instant Confirmation · Global Support" },
  { id: "credit", name: "Credit Card", icon: "💳", desc: "Visa · Mastercard · American Express · Instant Recharge" },
  { id: "debit", name: "Debit Card", icon: "💳", desc: "Visa Debit · Mastercard Debit · Local Bank Debit" },
];

export const formatNum = (n) => n.toLocaleString();