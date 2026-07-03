import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

function getSupabaseUser(req: Request): { id: string; email: string } | null {
  try {
    const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
    if (!authHeader) return null;
    const token = authHeader.replace('Bearer ', '').trim();
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    let b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const payload = JSON.parse(atob(b64));
    if (!payload.sub) return null;
    return { id: payload.sub, email: payload.email || '' };
  } catch {
    return null;
  }
}

const DASHBOARD_MIN_ROLE = {
  user: 0,
  host: 1,
  agent: 2,
  agency: 3,
  admin: 4,
  owner: 5,
};

function getRoleLevel(role: string): number {
  return DASHBOARD_MIN_ROLE[role] ?? 0;
}

function hasDashboardAccess(userRole: string, dashboardType: string): boolean {
  const requiredLevel = DASHBOARD_MIN_ROLE[dashboardType] ?? 99;
  return getRoleLevel(userRole) >= requiredLevel;
}

function pickHighestRoleProfile(profiles: any[]): any | null {
  if (!profiles || profiles.length === 0) return null;
  return profiles.reduce((best, p) => {
    if (!best) return p;
    return getRoleLevel(p.role || 'user') > getRoleLevel(best.role || 'user') ? p : best;
  }, null);
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = getSupabaseUser(req);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action, dashboard_type, data } = body;

    // --- Get user profile + role (for Control Center access check) ---
    if (action === 'getProfile') {
      const profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      const profile = pickHighestRoleProfile(profiles);
      return Response.json({
        profile: profile ? {
          id: profile.id,
          username: profile.username,
          full_name: profile.full_name,
          role: profile.role || 'user',
          is_host: profile.is_host || false,
          is_agency: profile.is_agency || false,
          is_admin: profile.is_admin || false,
          is_verified: profile.is_verified || false,
          avatar_url: profile.avatar_url || '',
          global_id: profile.global_id || '',
        } : null,
      });
    }

    if (!dashboard_type) {
      return Response.json({ error: 'dashboard_type is required' }, { status: 400 });
    }

    // --- Fetch user's profile to verify role ---
    const profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
    const userProfile = pickHighestRoleProfile(profiles);
    const userRole = userProfile?.role || 'user';

    // --- Role guard: deny if user doesn't have required role ---
    if (!hasDashboardAccess(userRole, dashboard_type)) {
      return Response.json({
        error: 'Access denied',
        message: `Your role (${userRole}) does not have access to the ${dashboard_type} dashboard`,
        user_role: userRole,
        required_role: dashboard_type,
      }, { status: 403 });
    }

    // --- Load: return stored dashboard config data ---
    if (action === 'load') {
      const records = await base44.asServiceRole.entities.DashboardProfile.filter({
        user_id: user.id,
        dashboard_type,
      });
      if (records.length > 0) {
        return Response.json({ data: records[0].data, exists: true });
      }
      return Response.json({ data: null, exists: false });
    }

    // --- Save: upsert dashboard config data ---
    if (action === 'save') {
      if (!data) return Response.json({ error: 'data is required' }, { status: 400 });
      const records = await base44.asServiceRole.entities.DashboardProfile.filter({
        user_id: user.id,
        dashboard_type,
      });
      if (records.length > 0) {
        const updated = await base44.asServiceRole.entities.DashboardProfile.update(records[0].id, { data });
        return Response.json({ data: updated.data, exists: true });
      }
      const created = await base44.asServiceRole.entities.DashboardProfile.create({
        user_id: user.id,
        dashboard_type,
        data,
      });
      return Response.json({ data: created.data, exists: true });
    }

    // --- Get real-time stats from actual entities ---
    if (action === 'getRealtimeStats') {
      const stats: Record<string, any> = {
        user_role: userRole,
        user_id: user.id,
        profile: userProfile ? {
          id: userProfile.id,
          username: userProfile.username,
          full_name: userProfile.full_name,
          global_id: userProfile.global_id,
          avatar_url: userProfile.avatar_url,
          role: userProfile.role,
          is_verified: userProfile.is_verified,
          is_online: userProfile.is_online,
          coins: userProfile.coins || 0,
          followers: userProfile.followers || 0,
          following: userProfile.following || 0,
        } : null,
      };

      if (dashboard_type === 'agency') {
        // Fetch real agency stats
        const [allAgents, allHosts, liveRooms, agencyProfile] = await Promise.all([
          base44.asServiceRole.entities.UserProfile.filter({ role: 'agent' }).catch(() => []),
          base44.asServiceRole.entities.UserProfile.filter({ role: 'host' }).catch(() => []),
          base44.asServiceRole.entities.RoomSession.filter({ status: 'live' }).catch(() => []),
          Promise.resolve(userProfile),
        ]);

        const onlineHosts = (allHosts || []).filter(h => h.is_online);
        const verifiedHosts = (allHosts || []).filter(h => h.is_verified);

        // Calculate revenue from live rooms
        const totalRevenueCoins = (liveRooms || []).reduce((sum, r) => sum + (r.total_coins || 0), 0);
        const totalGifts = (liveRooms || []).reduce((sum, r) => sum + (r.total_gifts || 0), 0);
        const totalViewers = (liveRooms || []).reduce((sum, r) => sum + (r.current_viewers || 0), 0);

        // Fetch recent transactions
        const recentTransactions = await base44.asServiceRole.entities.Transaction
          .filter({ type: 'gift' }, '-created_date', 10)
          .catch(() => []);

        // Fetch pending host applications
        const pendingApps = await base44.asServiceRole.entities.RoleApplication
          .filter({ application_type: 'host', status: 'pending' })
          .catch(() => []);

        stats.agency = {
          total_agents: (allAgents || []).length,
          active_agents: (allAgents || []).filter(a => a.is_online).length,
          total_hosts: (allHosts || []).length,
          online_hosts: onlineHosts.length,
          live_hosts: (liveRooms || []).length,
          verified_hosts: verifiedHosts.length,
          pending_applications: (pendingApps || []).length,
          total_revenue_coins: totalRevenueCoins,
          total_gifts: totalGifts,
          total_viewers: totalViewers,
          active_rooms: (liveRooms || []).length,
          recent_transactions: (recentTransactions || []).map(t => ({
            id: t.id,
            type: t.type,
            amount_usd: t.amount_usd,
            coins: t.coins,
            status: t.status,
            gift_name: t.gift_name,
            recipient_name: t.recipient_name,
            created_date: t.created_date,
          })),
        };
      }

      if (dashboard_type === 'agent') {
        // Fetch real agent stats
        const [hosts, myRecruits, liveRooms] = await Promise.all([
          base44.asServiceRole.entities.UserProfile.filter({ role: 'host' }).catch(() => []),
          base44.asServiceRole.entities.RoleApplication
            .filter({ application_type: 'host', reviewing_authority: 'agent' })
            .catch(() => []),
          base44.asServiceRole.entities.RoomSession.filter({ status: 'live' }).catch(() => []),
        ]);

        stats.agent = {
          total_hosts: (hosts || []).length,
          online_hosts: (hosts || []).filter(h => h.is_online).length,
          my_recruits: (myRecruits || []).length,
          pending_applications: (myRecruits || []).filter(a => a.status === 'pending').length,
          approved_applications: (myRecruits || []).filter(a => a.status === 'approved').length,
          active_live_rooms: (liveRooms || []).length,
        };
      }

      if (dashboard_type === 'host') {
        // Fetch real host stats
        const myRooms = await base44.asServiceRole.entities.RoomSession
          .filter({ host_id: user.id })
          .catch(() => []);
        const liveRoom = myRooms?.find(r => r.status === 'live');

        stats.host = {
          total_sessions: (myRooms || []).length,
          is_live: !!liveRoom,
          current_viewers: liveRoom?.current_viewers || 0,
          peak_viewers: Math.max(...(myRooms || []).map(r => r.peak_viewers || 0), 0),
          total_coins_earned: (myRooms || []).reduce((sum, r) => sum + (r.host_earnings_coins || 0), 0),
          total_gifts_received: (myRooms || []).reduce((sum, r) => sum + (r.total_gifts || 0), 0),
          total_stream_time: (myRooms || []).reduce((sum, r) => sum + (r.duration_seconds || 0), 0),
        };
      }

      if (dashboard_type === 'user') {
        stats.user = {
          coins: userProfile?.coins || 0,
          followers: userProfile?.followers || 0,
          following: userProfile?.following || 0,
          gifts_received: userProfile?.gifts_received || 0,
          gifts_sent: userProfile?.gifts_sent || 0,
          user_level: userProfile?.user_level || 1,
          user_xp: userProfile?.user_xp || 0,
        };
      }

      return Response.json({ stats });
    }

    return Response.json({ error: 'Invalid action. Use "load", "save", "getProfile", or "getRealtimeStats".' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});