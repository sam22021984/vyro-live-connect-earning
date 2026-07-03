import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // Find existing privacy settings for this user
    let settings = await base44.asServiceRole.entities.PrivacySetting.filter({ user_id: user.id });

    // Also fetch the user's profile to return alongside
    let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
    if (profiles.length === 0) {
      profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
    }
    const profile = profiles.length > 0 ? profiles[0] : null;

    if (action === 'get') {
      // Auto-create default record if none exists
      if (settings.length === 0) {
        const created = await base44.asServiceRole.entities.PrivacySetting.create({
          user_id: user.id,
          profile_visibility: 'everyone',
          show_coins: true,
          show_level: true,
          show_followers: true,
          show_following: true,
          show_friends: true,
          show_visitors: true,
          show_gifts_received: true,
          show_gifts_sent: true,
          show_bio: true,
          show_birthday: true,
          show_country: true,
          show_age: true,
          show_online_status: true,
          show_activity_score: true,
          show_trust_score: true,
          show_reputation: true,
          show_xp: true,
          who_can_message: 'everyone',
          who_can_call: 'everyone',
          who_can_gift: 'everyone',
          who_can_view_profile: 'everyone',
          allow_strangers: true,
          show_in_search: true,
          show_in_rankings: true,
          allow_profile_visits: true,
          blocked_users: [],
        });
        return Response.json({ settings: created, profile });
      }
      return Response.json({ settings: settings[0], profile });
    }

    if (action === 'update') {
      const allowed = [
        'profile_visibility',
        'show_coins', 'show_level', 'show_followers', 'show_following',
        'show_friends', 'show_visitors', 'show_gifts_received', 'show_gifts_sent',
        'show_bio', 'show_birthday', 'show_country', 'show_age',
        'show_online_status', 'show_activity_score', 'show_trust_score',
        'show_reputation', 'show_xp',
        'who_can_message', 'who_can_call', 'who_can_gift', 'who_can_view_profile',
        'allow_strangers', 'show_in_search', 'show_in_rankings', 'allow_profile_visits',
        'blocked_users',
      ];
      const updates = {};
      for (const key of allowed) {
        if (key in body) updates[key] = body[key];
      }

      if (settings.length === 0) {
        // Create with provided values + defaults
        const created = await base44.asServiceRole.entities.PrivacySetting.create({
          user_id: user.id,
          ...updates,
        });
        return Response.json({ settings: created, profile });
      }

      const updated = await base44.asServiceRole.entities.PrivacySetting.update(
        settings[0].id, updates
      );
      return Response.json({ settings: updated, profile });
    }

    if (action === 'block_user') {
      const { block_user_id } = body;
      if (!block_user_id) return Response.json({ error: 'block_user_id is required' }, { status: 400 });

      let current = settings.length > 0 ? settings[0] : null;
      if (!current) {
        current = await base44.asServiceRole.entities.PrivacySetting.create({
          user_id: user.id,
          blocked_users: [block_user_id],
        });
        return Response.json({ settings: current, profile });
      }

      const blocked = current.blocked_users || [];
      if (!blocked.includes(block_user_id)) {
        blocked.push(block_user_id);
      }
      const updated = await base44.asServiceRole.entities.PrivacySetting.update(
        current.id, { blocked_users: blocked }
      );
      return Response.json({ settings: updated, profile });
    }

    if (action === 'unblock_user') {
      const { unblock_user_id } = body;
      if (!unblock_user_id) return Response.json({ error: 'unblock_user_id is required' }, { status: 400 });
      if (settings.length === 0) return Response.json({ settings: settings[0] || null, profile });

      const blocked = (settings[0].blocked_users || []).filter(id => id !== unblock_user_id);
      const updated = await base44.asServiceRole.entities.PrivacySetting.update(
        settings[0].id, { blocked_users: blocked }
      );
      return Response.json({ settings: updated, profile });
    }

    if (action === 'request_verification') {
      // Update profile verification_status to 'pending'
      if (!profile) return Response.json({ error: 'Profile not found' }, { status: 404 });
      if (profile.verification_status === 'verified') {
        return Response.json({ error: 'Already verified', profile });
      }
      const updatedProfile = await base44.asServiceRole.entities.UserProfile.update(profile.id, {
        verification_status: 'pending',
      });
      return Response.json({ profile: updatedProfile, message: 'Verification request submitted' });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});