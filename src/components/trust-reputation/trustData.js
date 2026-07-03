export const TRUST_OVERVIEW = {
  trustScore: 84,
  trustScoreMax: 100,
  trustPercentage: 84,
  reputationLevel: "Silver Trusted",
  trustTier: "Gold Tier",
  communityStatus: "Trusted by the community",
  reputationRank: "#1,247",
  overallPerformance: "Excellent",
  summary: [
    { label: "Badges", value: "12", icon: "Award", color: "#F59E0B" },
    { label: "Warnings", value: "0", icon: "AlertTriangle", color: "#EF4444" },
    { label: "Trust Tier", value: "Gold", icon: "Crown", color: "#D4AF37" },
    { label: "Account Age", value: "247d", icon: "Calendar", color: "#2F80ED" },
    { label: "Positive Reviews", value: "186", icon: "ThumbsUp", color: "#10B981" },
    { label: "Negative Reports", value: "2", icon: "ThumbsDown", color: "#EF4444" },
    { label: "Community Rating", value: "4.8", icon: "Star", color: "#F59E0B" },
    { label: "Verification", value: "Verified", icon: "BadgeCheck", color: "#2F80ED" },
  ],
  scoreBreakdown: [
    { label: "Account Verification", weight: 20, score: 18, max: 20, suggestion: "Complete phone verification for full marks." },
    { label: "Identity Verification", weight: 20, score: 17, max: 20, suggestion: "Upload a government-issued ID." },
    { label: "Profile Completion", weight: 15, score: 13, max: 15, suggestion: "Add a bio and profile photo." },
    { label: "Activity & Engagement", weight: 15, score: 12, max: 15, suggestion: "Log in daily and join live rooms." },
    { label: "Community Behavior", weight: 10, score: 9, max: 10, suggestion: "Maintain your clean record!" },
    { label: "Content Quality", weight: 10, score: 7, max: 10, suggestion: "Host more quality live streams." },
    { label: "Payment Reliability", weight: 5, score: 5, max: 5, suggestion: "Perfect payment history." },
    { label: "Security Status", weight: 5, score: 5, max: 5, suggestion: "Enable 2FA to stay protected." },
  ],
};

export const TRUST_BADGES = [
  { name: "Verified Member", icon: "BadgeCheck", color: "#2F80ED", description: "Identity verified by VYRO.", requirement: "Complete identity verification.", date: "2025-09-12", benefits: "Verified checkmark on profile.", unlocked: true },
  { name: "Trusted User", icon: "ShieldCheck", color: "#10B981", description: "High trust score maintained.", requirement: "Reach a trust score of 70+.", date: "2025-10-04", benefits: "Priority in search results.", unlocked: true },
  { name: "Community Helper", icon: "HandHeart", color: "#EC4899", description: "Helped new users onboarding.", requirement: "Help 10+ new users.", date: "2025-11-20", benefits: "Helper badge on profile.", unlocked: true },
  { name: "Popular Host", icon: "Mic", color: "#F59E0B", description: "Consistently popular live host.", requirement: "Reach 500+ followers as host.", date: "2026-01-15", benefits: "Featured host placement.", unlocked: true },
  { name: "Top Contributor", icon: "TrendingUp", color: "#8B5CF6", description: "Active community contributor.", requirement: "100+ community posts.", date: "2026-02-08", benefits: "Contributor flair.", unlocked: true },
  { name: "Event Champion", icon: "Trophy", color: "#D4AF37", description: "Won a platform event.", requirement: "Win 1 official event.", date: "2026-03-01", benefits: "Champion frame.", unlocked: true },
  { name: "Top Gifter", icon: "Gift", color: "#EF4444", description: "Generous gift sender.", requirement: "Send 10,000+ coins in gifts.", date: "2026-03-22", benefits: "Top Gifter badge.", unlocked: true },
  { name: "Diamond Supporter", icon: "Gem", color: "#06B6D4", description: "Premium supporter of the platform.", requirement: "Purchase VIP Diamond.", date: "2026-04-10", benefits: "Exclusive diamond effects.", unlocked: true },
  { name: "Safe Community Member", icon: "Shield", color: "#3B82F6", description: "Zero violations for 90 days.", requirement: "90 days violation-free.", date: "2026-04-28", benefits: "Safety shield icon.", unlocked: true },
  { name: "VIP Trusted", icon: "Crown", color: "#D4AF37", description: "VIP-level trusted user.", requirement: "Reach VIP + Trust 80.", date: "2026-05-05", benefits: "VIP trusted frame.", unlocked: true },
  { name: "Agency Verified", icon: "Building2", color: "#6366F1", description: "Verified agency member.", requirement: "Join a verified agency.", date: "2026-05-19", benefits: "Agency badge.", unlocked: true },
  { name: "Elite Creator", icon: "Sparkles", color: "#8B5CF6", description: "Elite content creator.", requirement: "Reach Creator Level 10.", date: "2026-06-12", benefits: "Elite creator perks.", unlocked: true },
  { name: "Legend Trusted", icon: "Star", color: "#F59E0B", description: "Legendary community standing.", requirement: "Reach Trust Level Legend.", date: null, benefits: "Legendary crown frame.", unlocked: false },
  { name: "Royal Patron", icon: "Crown", color: "#D4AF37", description: "Royal-level supporter.", requirement: "Contribute 100K+ coins.", date: null, benefits: "Royal avatar frame.", unlocked: false },
];

export const TRUST_LEVELS = [
  { name: "Bronze Trusted", score: 0, color: "#CD7F32", badges: 0, rewards: ["Basic trust badge", "Standard support"], current: false },
  { name: "Silver Trusted", score: 60, color: "#9CA3AF", badges: 3, rewards: ["Silver badge", "Priority search", "Daily bonus coins"], current: true },
  { name: "Gold Trusted", score: 75, color: "#D4AF37", badges: 6, rewards: ["Gold badge", "Exclusive frame", "Higher daily limits", "Featured profile"], current: false },
  { name: "Platinum Trusted", score: 85, color: "#E5E4E2", badges: 9, rewards: ["Platinum badge", "Special chat bubble", "VIP events access", "Creator benefits"], current: false },
  { name: "Diamond Trusted", score: 92, color: "#06B6D4", badges: 12, rewards: ["Diamond badge", "Exclusive name color", "Agency priority", "Special reward coins"], current: false },
  { name: "Royal Trusted", score: 96, color: "#8B5CF6", badges: 15, rewards: ["Royal badge", "Royal frame", "Higher search ranking", "Community recognition"], current: false },
  { name: "Legend Trusted", score: 99, color: "#F59E0B", badges: 18, rewards: ["Legend crown", "All privileges", "Exclusive events", "Platform ambassador"], current: false },
];

export const TRUST_HISTORY = [
  { type: "Score Increased", title: "Trust score increased by +2", detail: "Received positive community rating.", date: "2026-07-02", time: "14:32", icon: "TrendingUp", color: "#10B981" },
  { type: "Badge Earned", title: "Elite Creator badge earned", detail: "Reached Creator Level 10.", date: "2026-06-12", time: "09:15", icon: "Sparkles", color: "#8B5CF6" },
  { type: "Verification Approved", title: "Identity verification approved", detail: "KYC verification completed.", date: "2026-05-03", time: "16:48", icon: "BadgeCheck", color: "#2F80ED" },
  { type: "Score Increased", title: "Trust score increased by +3", detail: "Completed 90 days violation-free.", date: "2026-04-28", time: "00:00", icon: "TrendingUp", color: "#10B981" },
  { type: "Badge Earned", title: "VIP Trusted badge earned", detail: "Reached VIP + Trust 80.", date: "2026-05-05", time: "11:20", icon: "Crown", color: "#D4AF37" },
  { type: "Reports Resolved", title: "Report resolved in your favor", detail: "False report dismissed.", date: "2026-04-15", time: "13:05", icon: "CheckCircle", color: "#10B981" },
  { type: "Community Votes", title: "Community upvote received", detail: "Voted as helpful by 5 users.", date: "2026-04-02", time: "18:40", icon: "ThumbsUp", color: "#EC4899" },
  { type: "Badge Earned", title: "Diamond Supporter badge earned", detail: "Purchased VIP Diamond.", date: "2026-04-10", time: "10:00", icon: "Gem", color: "#06B6D4" },
];

export const TRUST_TABS = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard" },
  { id: "badges", label: "Badges", icon: "Award" },
  { id: "levels", label: "Levels", icon: "TrendingUp" },
  { id: "history", label: "History", icon: "History" },
];