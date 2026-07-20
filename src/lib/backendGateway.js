import { getSupabase } from "@/lib/supabaseClient";

/**
 * Centralized gateway for all Supabase RPC calls and RLS table reads.
 *
 * All authenticated writes go through canonical SECURITY DEFINER/INVOKER RPCs
 * with the signed-in Supabase JWT. No service-role credentials are exposed
 * to the browser.
 *
 * Reads use RLS-protected tables or canonical read RPCs.
 * Sensitive finance, owner, transfer, moderation, and role data uses RPCs only.
 */

let _supabase = null;

async function getClient() {
  if (!_supabase) _supabase = await getSupabase();
  return _supabase;
}

// ─── RPC Helper ────────────────────────────────────────────────────────────

async function rpc(name, params = {}) {
  const supabase = await getClient();
  const { data, error } = await supabase.rpc(name, params);
  if (error) throw error;
  return data;
}

// ─── RLS Table Update Helper ─────────────────────────────────────────────────

async function updateTable(table, filter, updates) {
  const supabase = await getClient();
  let query = supabase.from(table).update(updates);
  for (const [key, value] of Object.entries(filter)) {
    if (value !== undefined && value !== null) {
      query = query.eq(key, value);
    }
  }
  const { data, error } = await query.select();
  if (error) throw error;
  return data;
}

// ─── RLS Table Read Helper ──────────────────────────────────────────────────

async function readTable(table, { select = "*", filter = {}, limit = 100, order, ascending = false, single = false } = {}) {
  const supabase = await getClient();
  let query = supabase.from(table).select(select);

  for (const [key, value] of Object.entries(filter)) {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        query = query.in(key, value);
      } else {
        query = query.eq(key, value);
      }
    }
  }

  if (order) query = query.order(order, { ascending });
  if (limit) query = query.limit(limit);
  if (single) query = query.single();

  const { data, error } = await query;
  if (error) throw error;
  return single ? data : data;
}

// ─── Identity & Auth ────────────────────────────────────────────────────────

export const identity = {
  refreshBackend: () => rpc("vyro_refresh_my_backend", {}),
  getMyIdentity: () => rpc("vyro_get_my_identity", {}),
  getMyProfileIdentity: () => rpc("vyro_get_my_profile_identity", {}),
  syncIdentity: () => rpc("vyro_sync_identity", {}),
};

// ─── Profile ─────────────────────────────────────────────────────────────────

export const profile = {
  getMyProfileHome: () => rpc("vyro_get_my_profile_home", {}),
  getPublicProfile: (userId) => rpc("vyro_get_public_profile", { target_user_id: userId }),
  getUserProfilePosts: (userId, limit = 20) => rpc("vyro_get_user_profile_posts", { user_id: userId, limit }),
  updateMyProfile: (updates) => rpc("vyro_update_my_profile", updates),
  profileAction: (action, payload) => rpc("vyro_user_profile_action", { action, ...payload }),
  profileStatsAction: (action, payload) => rpc("vyro_profile_stats_action", { action, ...payload }),
};

// ─── Wallet & Finance ─────────────────────────────────────────────────────────

export const wallet = {
  getMyTransactions: (limit = 50, offset = 0) =>
    rpc("vyro_get_my_wallet_transactions", { limit, offset }),
  createRechargeIntent: (amount, paymentMethod, packageId) =>
    rpc("vyro_create_recharge_intent", { amount, payment_method: paymentMethod, package_id: packageId }),
  completeRechargePayment: (intentId, paymentId) =>
    rpc("vyro_complete_recharge_payment", { intent_id: intentId, payment_id: paymentId }),
  requestWithdrawal: (amount, method, destination) =>
    rpc("vyro_request_withdrawal", { amount, method, destination }),
  reviewWithdrawal: (withdrawalId, status, notes) =>
    rpc("vyro_review_withdrawal", { withdrawal_id: withdrawalId, status, notes }),
  transferCoins: (toUserId, amount, reason) =>
    rpc("vyro_transfer_coins", { to_user_id: toUserId, amount, reason }),
  walletApply: (action, payload) =>
    rpc("vyro_wallet_apply", { action, ...payload }),
};

// ─── Rooms & Live ─────────────────────────────────────────────────────────────

export const rooms = {
  create: (params) => rpc("vyro_create_live_room", params),
  join: (roomId) => rpc("vyro_join_live_room", { room_id: roomId }),
  leave: (roomId) => rpc("vyro_leave_live_room", { room_id: roomId }),
  start: (roomId) => rpc("vyro_start_live_room", { room_id: roomId }),
  close: (roomId) => rpc("vyro_close_live_room", { room_id: roomId }),
  sendMessage: (roomId, message, messageType = "text") =>
    rpc("vyro_send_room_message", { room_id: roomId, message, message_type: messageType }),
  deleteMessage: (messageId) => rpc("vyro_delete_room_message", { message_id: messageId }),
  manageSeat: (roomId, seatNumber, action, userId) =>
    rpc("vyro_manage_seat", { room_id: roomId, seat_number: seatNumber, action, user_id: userId }),
  inviteToSeat: (roomId, seatNumber, userId) =>
    rpc("vyro_invite_to_seat", { room_id: roomId, seat_number: seatNumber, user_id: userId }),
  refreshState: (roomId) => rpc("vyro_refresh_live_room_state", { room_id: roomId }),
  getFinanceRealtime: (roomId) => rpc("vyro_get_room_finance_realtime", { room_id: roomId }),
  saveDraft: (params) => rpc("vyro_save_live_room_draft", params),
  getOrCreatePrivateChat: (userId) => rpc("vyro_get_or_create_private_chat", { user_id: userId }),
  getPartyCenterRooms: (limit = 20) => rpc("vyro_get_party_center_rooms", { limit }),
  getPartyCenterLiveRooms: (limit = 20) => rpc("vyro_get_party_center_live_rooms", { limit }),
  getPartyRoomRankings: (limit = 20) => rpc("vyro_get_party_room_rankings", { limit }),
  inviteUser: (roomId, userId) => rpc("vyro_invite_live_room_user", { room_id: roomId, user_id: userId }),
  isMember: (roomId) => rpc("vyro_is_live_room_member", { room_id: roomId }),
  isStaff: (roomId) => rpc("vyro_is_room_staff", { room_id: roomId }),
  moderateUser: (roomId, userId, action, reason) =>
    rpc("vyro_moderate_room_user", { room_id: roomId, user_id: userId, action, reason }),
};

// ─── Social ──────────────────────────────────────────────────────────────────

export const social = {
  action: (action, targetUserId, extra = {}) =>
    rpc("vyro_user_social_action", { action, target_user_id: targetUserId, ...extra }),
  respondFriendRequest: (requestId, status) =>
    rpc("vyro_respond_friend_request", { request_id: requestId, status }),
  blockUser: (userId) => rpc("vyro_block_user", { user_id: userId }),
  isBlocked: (userId) => rpc("vyro_is_blocked_between", { other_user_id: userId }),
  // RLS table reads
  getFollowers: (userId, limit = 50) => readTable("follows", { filter: { following_id: userId }, limit, order: "created_at" }),
  getFollowing: (userId, limit = 50) => readTable("follows", { filter: { follower_id: userId }, limit, order: "created_at" }),
  getFriendRequests: (userId) => readTable("friend_requests", { filter: { to_user_id: userId, status: "pending" }, order: "created_at" }),
  getRelationships: (userId) => readTable("relationships", { filter: { user_id: userId } }),
};

// ─── Community ────────────────────────────────────────────────────────────────

export const community = {
  getFeed: (cursor, limit = 20) => rpc("vyro_get_community_feed", { cursor, limit }),
  getFeedCursor: (cursor, limit = 20) => rpc("vyro_get_community_feed_cursor", { cursor, limit }),
  getHome: () => rpc("vyro_get_community_home", {}),
  createPost: (content, mediaUrls, groupId) =>
    rpc("vyro_create_community_post", { content, media_urls: mediaUrls, group_id: groupId }),
  editPost: (postId, content) => rpc("vyro_edit_community_post", { post_id: postId, content }),
  deletePost: (postId) => rpc("vyro_delete_community_post", { post_id: postId }),
  restorePost: (postId) => rpc("vyro_restore_community_post", { post_id: postId }),
  toggleLike: (postId) => rpc("vyro_toggle_post_like", { post_id: postId }),
  toggleSave: (postId) => rpc("vyro_toggle_saved_post", { post_id: postId }),
  reportPost: (postId, reason) => rpc("vyro_report_community_post", { post_id: postId, reason }),
  getComments: (postId, limit = 50) => rpc("vyro_get_post_comments", { post_id: postId, limit }),
  createComment: (postId, content) => rpc("vyro_create_post_comment", { post_id: postId, content }),
  deleteComment: (commentId) => rpc("vyro_delete_post_comment", { comment_id: commentId }),
  sendGift: (postId, giftId, quantity) => rpc("vyro_send_post_gift", { post_id: postId, gift_id: giftId, quantity }),
  sharePost: (postId) => rpc("vyro_share_post", { post_id: postId }),
  createGroup: (name, description) => rpc("vyro_create_community_group", { name, description }),
  joinGroup: (groupId) => rpc("vyro_join_community_group", { group_id: groupId }),
  leaveGroup: (groupId) => rpc("vyro_leave_community_group", { group_id: groupId }),
  searchPosts: (query, limit = 20) => rpc("vyro_search_community_posts", { query, limit }),
  getHashtagPosts: (hashtag, limit = 20) => rpc("vyro_get_hashtag_posts", { hashtag, limit }),
};

// ─── VIP ──────────────────────────────────────────────────────────────────────

export const vip = {
  getMyContext: () => rpc("vyro_get_my_vip_context", {}),
  membershipAction: (action, params) => rpc("vyro_vip_membership_action", { action, ...params }),
  membershipHome: () => rpc("vyro_vip_membership_home", {}),
  membershipManifest: () => rpc("vyro_vip_membership_manifest", {}),
  claimDailyReward: () => rpc("vyro_claim_vip_daily_reward", {}),
  claimMonthlyBonus: () => rpc("vyro_claim_vip_monthly_bonus", {}),
  hasActiveVip: (userId) => rpc("vyro_user_has_active_vip", { user_id: userId }),
  managerAction: (action, params) => rpc("vyro_vip_manager_action", { action, ...params }),
  managerHome: () => rpc("vyro_vip_manager_dashboard_home", {}),
  managerManifest: () => rpc("vyro_vip_manager_dashboard_manifest", {}),
};

// ─── Gifts ────────────────────────────────────────────────────────────────────

export const gifts = {
  send: (roomId, giftId, quantity, recipientId) =>
    rpc("vyro_send_gift", { room_id: roomId, gift_id: giftId, quantity, recipient_id: recipientId }),
  // RLS table reads
  list: (category) => readTable("gifts", { filter: category ? { category, is_active: true } : { is_active: true }, order: "sort_order", ascending: true, limit: 200 }),
};

// ─── Role Applications ─────────────────────────────────────────────────────────

export const roles = {
  submit: (roleCode, applicationData) =>
    rpc("vyro_submit_role_application", { role_code: roleCode, application_data: applicationData }),
  resubmit: (applicationId) => rpc("vyro_resubmit_role_application", { application_id: applicationId }),
  review: (applicationId, status, notes) =>
    rpc("vyro_review_role_application", { application_id: applicationId, status, notes }),
  hasRole: (roleCode) => rpc("vyro_user_has_role", { role_code: roleCode }),
  resolve: () => rpc("vyro_resolve_role", {}),
  applyCenterHome: () => rpc("vyro_apply_center_home", {}),
  applyCenterSubmit: (roleCode, data) => rpc("vyro_apply_center_submit", { role_code: roleCode, ...data }),
  getHistory: () => rpc("vyro_get_enterprise_role_history", {}),
};

// ─── Dashboard ─────────────────────────────────────────────────────────────────

export const dashboard = {
  userHome: () => rpc("vyro_user_dashboard_home", {}),
  userManifest: () => rpc("vyro_user_dashboard_manifest", {}),
  syncAccess: () => rpc("vyro_sync_dashboard_access_for_user", {}),
  codeForRole: (roleCode) => rpc("vyro_dashboard_code_for_role", { role_code: roleCode }),
};

// ─── Notifications ─────────────────────────────────────────────────────────────

export const notifications = {
  action: (action, payload) => rpc("vyro_user_notification_action", { action, ...payload }),
  list: (userId, limit = 50) => readTable("notifications", { filter: { user_id: userId }, limit, order: "created_at" }),
};

// ─── Tasks & Rewards ───────────────────────────────────────────────────────────

export const tasks = {
  rewardAction: (action, payload) => rpc("vyro_user_reward_action", { action, ...payload }),
  claimLevelReward: (rewardId) => rpc("vyro_claim_user_level_reward", { reward_id: rewardId }),
  levelAction: (action, payload) => rpc("vyro_user_level_action", { action, ...payload }),
  // RLS table reads
  list: (category) => readTable("tasks", { filter: category ? { category } : {}, limit: 100 }),
  userTasks: (userId) => readTable("user_tasks", { filter: { user_id: userId }, limit: 100 }),
};

// ─── Mall & Purchases ───────────────────────────────────────────────────────────

export const mall = {
  userAction: (action, payload) => rpc("vyro_user_action", { action, ...payload }),
  listItems: (category) => readTable("mall_items", { filter: category ? { category, is_active: true } : { is_active: true }, limit: 200, order: "sort_order", ascending: true }),
  getUserPurchases: (userId) => readTable("user_purchases", { filter: { user_id: userId }, limit: 100, order: "created_at" }),
};

// ─── Verification & Security ───────────────────────────────────────────────────

export const security = {
  safetyAction: (action, payload) => rpc("vyro_user_safety_action", { action, ...payload }),
  settingsAction: (action, payload) => rpc("vyro_user_settings_action", { action, ...payload }),
  // RLS table reads
  getVerificationRecords: (userId) => readTable("verification_records", { filter: { user_id: userId }, limit: 50 }),
  getSecurityEvents: (userId) => readTable("security_events", { filter: { user_id: userId }, limit: 50 }),
  getDeviceRecords: (userId) => readTable("device_records", { filter: { user_id: userId }, limit: 50 }),
};

// ─── Support ───────────────────────────────────────────────────────────────────

export const support = {
  action: (action, payload) => rpc("vyro_user_support_action", { action, ...payload }),
  listTickets: (userId) => readTable("support_tickets", { filter: { user_id: userId }, limit: 50, order: "created_at" }),
};

// ─── Enterprise Roles (RLS read) ────────────────────────────────────────────────

export const enterprise = {
  listRoles: () => readTable("enterprise_roles", { limit: 100 }),
  getRoleHistory: () => rpc("vyro_get_enterprise_role_history", {}),
};

// ─── Generic RPC (for manager dashboards) ────────────────────────────────────────

export const managerRpc = {
  call: (rpcName, action, payload) => rpc(rpcName, { action, ...payload }),
};

// ─── Default export ─────────────────────────────────────────────────────────────

export const backendGateway = {
  identity,
  profile,
  wallet,
  rooms,
  social,
  community,
  vip,
  gifts,
  roles,
  dashboard,
  notifications,
  tasks,
  mall,
  security,
  support,
  enterprise,
  managerRpc,
  rpc,
  readTable,
  updateTable,
};

export default backendGateway;