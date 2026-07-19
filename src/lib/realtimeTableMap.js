/**
 * Maps Supabase public-schema tables to React Query key prefixes.
 * When a realtime event arrives for a table, all queries whose key
 * starts with one of the listed prefixes are invalidated (and refetched
 * only if currently observed / active).
 *
 * Only add prefixes that actually match query keys used by the app's hooks
 * (useHomeFeed, useDashboardData, useVipProfile, useSellerDashboard, ...).
 */
export const TABLE_QUERY_MAP = {
  // ── Profiles & users ───────────────────────────────────────────────
  profiles: [["profile"], ["user"], ["dashboard"], ["home"]],
  users: [["user"], ["dashboard"]],
  app_users: [["user"], ["dashboard"]],
  user_profiles: [["profile"], ["user"]],
  UserProfile: [["profile"], ["user"]],
  ApplicationId: [["profile"], ["verification"], ["application-id"]],
  application_ids: [["profile"], ["verification"], ["application-id"]],
  user_presence: [["user"], ["social"]],
  user_roles: [["user"], ["dashboard"]],
  user_verifications: [["user"], ["profile"], ["verification"]],
  verification_center: [["verification"], ["user"]],

  // ── Level system ───────────────────────────────────────────────────
  user_levels: [["levels"], ["level"], ["profile-stats"]],
  user_xp: [["levels"], ["profile-stats"]],
  user_rewards: [["rewards"], ["levels"]],
  user_badges: [["badges"], ["profile-stats"], ["achievements"]],
  user_achievements: [["achievements"], ["profile-stats"]],
  user_collections: [["collections"], ["levels"]],
  user_level_equipment: [["levels"], ["equipment"]],
  level_transactions: [["levels"], ["history"]],
  level_reward_claims: [["rewards"], ["levels"]],
  host_levels: [["levels"], ["host"], ["level"]],
  host_level_stats: [["levels"], ["host"]],
  host_rewards: [["rewards"], ["host"]],
  host_achievements: [["achievements"], ["host"]],
  host_level_equipment: [["levels"], ["host"]],
  gifting_levels: [["levels"], ["gifting"]],
  gifting_rewards: [["rewards"], ["gifting"]],
  gifting_achievements: [["achievements"], ["gifting"]],
  gifting_level_equipment: [["levels"], ["gifting"]],
  stream_levels: [["levels"], ["streaming"]],
  streaming_level_stats: [["levels"], ["streaming"]],
  stream_rewards: [["rewards"], ["streaming"]],
  stream_achievements: [["achievements"], ["streaming"]],
  streaming_level_equipment: [["levels"], ["streaming"]],
  level_guides: [["levels"], ["level-guide"]],

  // ── Wallet & coins ─────────────────────────────────────────────────
  wallet: [["wallet"], ["finance"], ["coins"]],
  wallets: [["wallet"], ["finance"]],
  user_wallets: [["wallet"], ["finance"]],
  coin_wallets: [["coins"], ["wallet"]],
  wallet_accounts: [["wallet"], ["finance"]],
  wallet_ledger: [["wallet"], ["finance"], ["transactions"]],
  wallet_transactions: [["transactions"], ["wallet"], ["finance"]],
  coin_ledger: [["coins"], ["transactions"]],
  coin_purchases: [["coins"], ["transactions"]],
  coin_transfers: [["coins"], ["transactions"]],
  seller_recharges: [["seller"], ["ocs"], ["transactions"]],

  // ── VIP ────────────────────────────────────────────────────────────
  vip_memberships: [["vip"]],
  user_vip_memberships: [["vip"]],
  user_vip_status: [["vip"]],
  vip_profiles: [["vip"]],
  vip_levels: [["vip"]],
  vip_tiers: [["vip"]],
  vip_plans: [["vip"]],
  vip_rewards: [["vip"], ["rewards"]],
  vip_daily_rewards: [["vip"], ["rewards"]],
  vip_transactions: [["vip"], ["transactions"]],
  vip_membership_changes: [["vip"]],

  // ── Rooms & streaming ─────────────────────────────────────────────
  rooms: [["rooms"], ["party"], ["live"], ["home"]],
  live_rooms: [["live"], ["live-room"], ["liveRoom"], ["rooms"]],
  voice_rooms: [["rooms"], ["live"]],
  party_rooms: [["party"], ["rooms"], ["home"]],
  room_participants: [["live-room"], ["liveRoom"], ["rooms"]],
  room_members: [["live-room"], ["rooms"]],
  room_seats: [["live-room"], ["liveRoom"], ["rooms"]],
  room_mic_requests: [["live-room"], ["liveRoom"]],
  room_speak_requests: [["live-room"], ["liveRoom"]],
  room_voice_status: [["live-room"], ["liveRoom"]],
  active_speakers: [["live-room"], ["liveRoom"]],
  room_messages: [["live-room"], ["liveRoom"], ["messages"]],
  room_gifts: [["live-room"], ["liveRoom"], ["gifts"]],
  room_settings: [["live-room"], ["liveRoom"], ["rooms"]],
  live_sessions: [["live"], ["live-room"], ["liveRoom"]],

  // ── Messages & social ──────────────────────────────────────────────
  messages: [["messages"], ["chat"]],
  chats: [["messages"], ["chat"]],
  group_messages: [["messages"], ["chat"]],
  follows: [["social"]],
  friends: [["social"]],
  relationships: [["social"]],
  relationship_requests: [["social"]],
  blocked_users: [["social"]],
  blocks: [["social"]],
  post_comments: [["community"]],
  post_likes: [["community"]],
  post_shares: [["community"]],
  community_posts: [["community"]],

  // ── Notifications ──────────────────────────────────────────────────
  notifications: [["notifications"], ["notification"]],
  message_notifications: [["notifications"], ["messages"]],
  application_notifications: [["notifications"]],
  relationship_notifications: [["notifications"], ["social"]],
  room_notifications: [["notifications"], ["live-room"]],
  seller_notifications: [["notifications"], ["seller"]],
  notification_delivery_queue: [["notifications"]],

  // ── Gifts, events, PK, leaderboards ───────────────────────────────
  gift_transactions: [["gifts"], ["transactions"], ["wallet"]],
  global_gift_announcements: [["gifts"]],
  events: [["events"]],
  event_participants: [["events"]],
  event_rankings: [["events"], ["leaderboard"]],
  pk_battles: [["pk"]],
  pk_requests: [["pk"]],
  pk_tournaments: [["pk"]],
  leaderboards: [["leaderboard"], ["leaderboards"]],
  user_leaderboard: [["leaderboard"], ["leaderboards"]],
  host_leaderboard: [["leaderboard"], ["leaderboards"]],
  gifting_leaderboard: [["leaderboard"], ["leaderboards"]],
  stream_leaderboard: [["leaderboard"], ["leaderboards"]],

  // ── Tasks & rewards ───────────────────────────────────────────────
  tasks: [["tasks"], ["tasks-rewards"]],
  rewards: [["rewards"], ["tasks-rewards"]],

  // ── Mall & purchases ──────────────────────────────────────────────
  mall_items: [["mall"], ["mall-items"]],
  user_purchases: [["mall"], ["purchases"]],

  // ── Seller / OCS ──────────────────────────────────────────────────
  seller_applications: [["seller"], ["ocs"]],
  seller_packages: [["seller"], ["ocs"]],
  seller_earnings: [["seller"], ["ocs"]],
  seller_analytics: [["seller"], ["ocs"]],
  seller_customers: [["seller"], ["ocs"]],

  // ── Agencies / agents / hosts ──────────────────────────────────────
  agencies: [["agency"]],
  agents: [["agent"]],
  hosts: [["host"]],

  // ── Trust & reputation ────────────────────────────────────────────
  warnings: [["trust"], ["reputation"], ["trust-reputation"]],
  appeals: [["trust"], ["reputation"], ["trust-reputation"]],
  reports: [["trust"], ["reputation"], ["reports"], ["support"]],
  reputation_history: [["trust"], ["reputation"], ["trust-reputation"]],

  // ── Verification ──────────────────────────────────────────────────
  verification_records: [["verification"]],

  // ── Security / moderation ────────────────────────────────────────
  security_events: [["security"], ["dashboard"]],
  spam_detections: [["security"], ["spam"]],
  violation_records: [["security"], ["violation"]],
  enforcement_actions: [["security"], ["enforcement"]],
  content_moderation_logs: [["security"], ["content-moderation"]],
  fraud_detections: [["security"], ["fraud"]],
  incidents: [["security"], ["incident"]],
  audit_logs: [["audit"], ["security"]],
  device_records: [["security"], ["device"]],

  // ── Invites / friends / support / settings ────────────────────────
  invites: [["social"]],
  friend_requests: [["social"]],
  support_tickets: [["support"]],
  app_settings: [["settings"]],
  notification_settings: [["settings"], ["notifications"]],
  privacy_settings: [["settings"], ["privacy"]],
  security_settings: [["settings"], ["security"]],
  device_settings: [["settings"], ["device"]],
};