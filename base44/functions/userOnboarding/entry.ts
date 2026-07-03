import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const ROLE_PREFIXES: Record<string, string> = {
  user: 'U',
  host: 'H',
  agent: 'A',
  agency: 'AG',
  admin: 'AD',
  owner: 'OW',
};

// Exclude confusing chars: O, 0, I, 1, L
const ID_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function generateId(role: string): string {
  const prefix = ROLE_PREFIXES[role] || 'U';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)];
  }
  return `VY-${prefix}-${code}`;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // Initialize or fetch profile after signup/login
    if (action === 'initProfile') {
      const { role = 'user', username } = body;

      // Check if profile already exists for this user
      let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length === 0) {
        profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
      }

      if (profiles.length > 0) {
        // Profile exists — ensure global_id is set
        const existing = profiles[0];
        if (!existing.global_id) {
          let gid = generateId(role);
          let attempts = 0;
          let conflict = await base44.asServiceRole.entities.UserProfile.filter({ global_id: gid });
          while (conflict.length > 0 && attempts < 10) {
            gid = generateId(role);
            conflict = await base44.asServiceRole.entities.UserProfile.filter({ global_id: gid });
            attempts++;
          }
          const updated = await base44.asServiceRole.entities.UserProfile.update(existing.id, {
            global_id: gid,
            role: existing.role || role,
          });
          return Response.json({ profile: updated, isNew: false, global_id: gid });
        }
        return Response.json({ profile: existing, isNew: false, global_id: existing.global_id });
      }

      // Generate unique global_id
      let globalId = generateId(role);
      let attempts = 0;
      let conflict = await base44.asServiceRole.entities.UserProfile.filter({ global_id: globalId });
      while (conflict.length > 0 && attempts < 10) {
        globalId = generateId(role);
        conflict = await base44.asServiceRole.entities.UserProfile.filter({ global_id: globalId });
        attempts++;
      }

      // Determine username
      const finalUsername = username || user.full_name || user.email?.split('@')[0] || 'VYRO User';

      // Create profile with global_id
      const profile = await base44.asServiceRole.entities.UserProfile.create({
        username: finalUsername,
        title: 'VYRO User',
        user_id: user.id,
        global_id: globalId,
        role: role,
        is_app_owner: false,
        is_verified: false,
        is_official: false,
        is_vip: false,
        is_agency: false,
        verification_status: 'unverified',
        safety_status: 'high',
        user_level: 1,
        host_level: 1,
        gifting_level: 1,
        streaming_level: 1,
        trust_score: 50,
        reputation_rating: 0,
        profile_completion: 20,
        activity_score: 0,
        coins: 0,
      });

      return Response.json({ profile, isNew: true, global_id: globalId });
    }

    // Get current user's profile + global_id
    if (action === 'getProfile') {
      let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length === 0) {
        profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
      }
      if (profiles.length === 0) {
        return Response.json({ error: 'Profile not found', profile: null }, { status: 200 });
      }
      return Response.json({ profile: profiles[0], global_id: profiles[0].global_id });
    }

    // Look up a user by their global_id
    if (action === 'findByGlobalId') {
      const { global_id } = body;
      if (!global_id) return Response.json({ error: 'global_id is required' }, { status: 400 });
      const profiles = await base44.asServiceRole.entities.UserProfile.filter({ global_id: global_id.toUpperCase() });
      if (profiles.length === 0) {
        return Response.json({ error: 'User not found' }, { status: 404 });
      }
      const p = profiles[0];
      return Response.json({
        profile: {
          id: p.id,
          username: p.username,
          avatar_url: p.avatar_url,
          global_id: p.global_id,
          role: p.role,
          is_vip: p.is_vip,
          is_verified: p.is_verified,
          is_online: p.is_online,
          user_level: p.user_level,
        },
      });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});