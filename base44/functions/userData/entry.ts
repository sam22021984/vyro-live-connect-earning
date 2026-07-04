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

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const caller = getSupabaseUser(req);
    if (!caller) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    // Verify caller is admin or owner
    const callerProfiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: caller.id });
    let callerProfile = callerProfiles?.[0];
    if (!callerProfile && caller.email) {
      const byEmail = await base44.asServiceRole.entities.UserProfile.filter({ user_id: caller.email });
      callerProfile = byEmail?.[0];
    }
    const callerRole = callerProfile?.role || 'user';
    if (callerRole !== 'admin' && callerRole !== 'owner') {
      return Response.json({ error: 'Access denied — admin/owner only' }, { status: 403 });
    }

    const body = await req.json();
    const { action } = body;

    // --- List all users (paginated) ---
    if (action === 'listUsers') {
      const { limit = 50, skip = 0, search = '' } = body;
      let users = await base44.asServiceRole.entities.UserProfile.list('-created_date', 500);
      let filtered = users || [];
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter((u) =>
          (u.username || '').toLowerCase().includes(q) ||
          (u.full_name || '').toLowerCase().includes(q) ||
          (u.user_id || '').toLowerCase().includes(q) ||
          (u.global_id || '').toLowerCase().includes(q) ||
          (u.country || '').toLowerCase().includes(q)
        );
      }
      const total = filtered.length;
      const paged = filtered.slice(skip, skip + limit);
      return Response.json({
        users: paged.map((u) => ({
          id: u.id,
          user_id: u.user_id,
          username: u.username,
          full_name: u.full_name,
          avatar_url: u.avatar_url,
          country: u.country,
          role: u.role,
          is_verified: u.is_verified,
          is_online: u.is_online,
          verification_status: u.verification_status,
          created_date: u.created_date,
          global_id: u.global_id,
        })),
        total,
      });
    }

    // --- Get full detection data for a specific user ---
    if (action === 'getDetection') {
      const { target_user_id } = body;
      if (!target_user_id) return Response.json({ error: 'target_user_id is required' }, { status: 400 });

      // The target_user_id can be the UserProfile.id, user_id (UUID or email), or global_id
      // First, find the profile
      let profile = null;
      // Try by entity id
      try {
        profile = await base44.asServiceRole.entities.UserProfile.get(target_user_id);
      } catch {
        // not an entity id
      }

      // If not found by entity id, try by user_id field (UUID, email) or global_id
      if (!profile) {
        const byUserId = await base44.asServiceRole.entities.UserProfile.filter({ user_id: target_user_id });
        profile = byUserId?.[0];
      }
      if (!profile) {
        const byGlobalId = await base44.asServiceRole.entities.UserProfile.filter({ global_id: target_user_id });
        profile = byGlobalId?.[0];
      }
      if (!profile) {
        return Response.json({ error: 'User not found' }, { status: 404 });
      }

      // The user_id stored in detection entities may be UUID or email
      const userIds = [profile.user_id, target_user_id].filter(Boolean);
      const userEmail = profile.user_id && profile.user_id.includes('@') ? profile.user_id : null;

      // Helper: query an entity for any matching user_id
      const fetchByUserIds = async (entityName, extraFilter = {}) => {
        const results = [];
        for (const uid of userIds) {
          try {
            const records = await base44.asServiceRole.entities[entityName].filter({ user_id: uid, ...extraFilter });
            results.push(...(records || []));
          } catch {}
        }
        // Deduplicate by id
        const seen = new Set();
        return results.filter((r) => {
          if (seen.has(r.id)) return false;
          seen.add(r.id);
          return true;
        });
      };

      // Fetch all detection data in parallel
      const [devices, securityEvents, verifications, fraudRecords, spamRecords, enforcement, transactions, roomSessions] = await Promise.all([
        fetchByUserIds('DeviceRecord'),
        fetchByUserIds('SecurityEvent'),
        fetchByUserIds('VerificationRecord'),
        fetchByUserIds('FraudDetection'),
        fetchByUserIds('SpamDetection'),
        fetchByUserIds('EnforcementAction'),
        fetchByUserIds('Transaction'),
        // Room sessions use host_id
        (async () => {
          const results = [];
          for (const uid of userIds) {
            try {
              const records = await base44.asServiceRole.entities.RoomSession.filter({ host_id: uid });
              results.push(...(records || []));
            } catch {}
          }
          const seen = new Set();
          return results.filter((r) => {
            if (seen.has(r.id)) return false;
            seen.add(r.id);
            return true;
          });
        })(),
      ]);

      // Sort records by created_date descending
      const sortByDate = (arr) => (arr || []).sort((a, b) => new Date(b.created_date || 0) - new Date(a.created_date || 0));

      return Response.json({
        profile: {
          id: profile.id,
          user_id: profile.user_id,
          username: profile.username,
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          cover_url: profile.cover_url,
          country: profile.country,
          country_flag: profile.country_flag,
          language: profile.language,
          gender: profile.gender,
          birthday: profile.birthday,
          role: profile.role,
          is_verified: profile.is_verified,
          is_online: profile.is_online,
          is_vip: profile.is_vip,
          is_host: profile.is_host,
          verification_status: profile.verification_status,
          safety_status: profile.safety_status,
          trust_score: profile.trust_score,
          activity_score: profile.activity_score,
          reputation_rating: profile.reputation_rating,
          coins: profile.coins,
          followers: profile.followers,
          following: profile.following,
          user_level: profile.user_level,
          global_id: profile.global_id,
          created_date: profile.created_date,
        },
        devices: sortByDate(devices),
        security_events: sortByDate(securityEvents),
        verifications: sortByDate(verifications),
        fraud_records: sortByDate(fraudRecords),
        spam_records: sortByDate(spamRecords),
        enforcement: sortByDate(enforcement),
        transactions: sortByDate(transactions),
        room_sessions: sortByDate(roomSessions),
      });
    }

    return Response.json({ error: 'Invalid action. Use "listUsers" or "getDetection".' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});