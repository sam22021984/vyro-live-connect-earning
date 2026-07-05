import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin' && user.role !== 'owner') {
      return Response.json({ error: 'Forbidden — admin only' }, { status: 403 });
    }

    const body = await req.json();
    const { emails } = body;
    if (!Array.isArray(emails) || emails.length === 0) {
      return Response.json({ error: 'emails array is required' }, { status: 400 });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')?.replace(/\/$/, '');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
    if (!supabaseUrl || !serviceRoleKey) {
      return Response.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const adminHeaders = {
      'apikey': anonKey,
      'Authorization': `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
    };

    // Paginate through all users and collect matching IDs
    const targetEmails = new Set(emails.map((e) => e.toLowerCase().trim()));
    const matched = [];
    let page = 1;
    const perPage = 1000;

    while (true) {
      const listRes = await fetch(
        `${supabaseUrl}/auth/v1/admin/users?page=${page}&per_page=${perPage}`,
        { method: 'GET', headers: adminHeaders }
      );
      const listData = await listRes.json();
      const users = listData?.users || listData || [];
      if (!Array.isArray(users) || users.length === 0) break;

      for (const u of users) {
        if (u.email && targetEmails.has(u.email.toLowerCase())) {
          matched.push({ id: u.id, email: u.email });
        }
      }

      if (users.length < perPage) break;
      page++;
      if (page > 50) break;
    }

    // Clean up related records in public tables that have FK to auth.users
    // Use Base44 SDK to delete entity records matching user_id
    const db = base44.asServiceRole;
    const entitiesWithUserId = [
      'UserProfile', 'RoomParticipant', 'Transaction', 'UserTask',
      'Notification', 'SecurityEvent', 'VerificationRecord', 'DeviceRecord',
      'FraudDetection', 'EnforcementAction', 'ContentModerationLog',
      'ViolationRecord', 'SpamDetection', 'AccountRecovery', 'AiOrchestratorLog',
      'SupportTicket', 'FriendRequest', 'Relationship', 'ChatMessage',
      'ChatConversation', 'TopFan', 'RoleApplication', 'UserPurchase',
      'NotificationSetting', 'PrivacySetting', 'SecuritySetting',
      'DeviceSetting', 'AppStorage', 'AppSetting', 'DashboardProfile',
      'CommunityPost', 'CommunityReport', 'CommunityMedia',
    ];

    const cleanupResults = {};
    for (const m of matched) {
      cleanupResults[m.email] = {};
      for (const entityName of entitiesWithUserId) {
        try {
          await db.entities[entityName].deleteMany({ user_id: m.id });
          cleanupResults[m.email][entityName] = 'ok';
        } catch (_e) {
          // Entity might not exist or no matching records — skip
        }
      }
    }

    // Delete from custom Supabase tables (FK constraints → auth.users)
    // via PostgREST, since they're not Base44 entities
    const customTables = ['wallets', 'user_xp', 'user_levels', 'user_stats', 'user_coins', 'user_follows', 'user_blocks', 'room_bans', 'gift_transactions', 'coin_transactions', 'sessions', 'vip_profiles', 'user_devices', 'user_settings', 'user_notifications', 'referrals', 'withdrawals', 'deposits', 'subscriptions', 'badges_earned', 'achievements_earned', 'login_history', 'audit_logs', 'security_events', 'friend_requests', 'messages', 'chat_messages', 'community_posts', 'community_reports'];
    for (const m of matched) {
      for (const table of customTables) {
        try {
          await fetch(
            `${supabaseUrl}/rest/v1/${table}?user_id=eq.${encodeURIComponent(m.id)}`,
            { method: 'DELETE', headers: adminHeaders }
          );
        } catch (_e) {
          // table might not exist — continue
        }
      }
      // Also try deleting by host_id / owner_id for room-related tables
      for (const table of ['party_rooms', 'room_sessions']) {
        try {
          await fetch(
            `${supabaseUrl}/rest/v1/${table}?host_id=eq.${encodeURIComponent(m.id)}`,
            { method: 'DELETE', headers: adminHeaders }
          );
        } catch (_e) {}
      }
    }

    // Delete each matched user from auth.users
    const results = [];
    for (const m of matched) {
      const delRes = await fetch(`${supabaseUrl}/auth/v1/admin/users/${m.id}`, {
        method: 'DELETE',
        headers: adminHeaders,
      });
      let errorDetail = null;
      if (!delRes.ok) {
        try {
          const errBody = await delRes.json();
          errorDetail = errBody?.msg || errBody?.error || errBody?.message || JSON.stringify(errBody);
        } catch {
          errorDetail = await delRes.text().catch(() => 'unknown');
        }
      }
      results.push({
        email: m.email,
        id: m.id,
        status: delRes.status,
        ok: delRes.ok,
        error: errorDetail,
      });
    }

    const notFound = emails.filter(
      (e) => !matched.some((m) => m.email.toLowerCase() === e.toLowerCase().trim())
    );

    return Response.json({
      success: true,
      deleted: results.filter((r) => r.ok),
      failed: results.filter((r) => !r.ok),
      not_found: notFound,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});