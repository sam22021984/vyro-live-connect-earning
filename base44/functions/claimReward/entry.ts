import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Decode Supabase JWT from request to get user identity
function getSupabaseUser(req: Request): { id: string; email: string; full_name?: string } | null {
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
    return {
      id: payload.sub,
      email: payload.email || '',
      full_name: payload.user_metadata?.full_name || payload.user_metadata?.name || undefined,
    };
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = getSupabaseUser(req);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // ===== CLAIM REWARD =====
    // Atomically: credits coins/XP to UserProfile, creates Transaction, creates Notification
    if (action === 'claim') {
      const {
        reward_type,      // "Coins" | "Diamonds" | "VIP" | "Special" | "Gift"
        reward_amount,    // numeric amount (coins/diamonds)
        reward_name,      // human-readable name e.g. "500 Coins" or "VIP Frame (3 Days)"
        source,           // "task" | "daily_bonus" | "reward_center" | "daily_login" | "recharge" | "room" | "family" | "event" | "achievement"
        task_id,          // optional: task ID if source is task
        source_id,        // optional: generic source ID (event ID, reward ID, etc.)
        icon,             // optional: emoji icon for notification
      } = body;

      if (!reward_type || !source) {
        return Response.json({ error: 'reward_type and source are required' }, { status: 400 });
      }

      // Find user's profile
      let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length === 0) {
        profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
      }
      if (profiles.length === 0) {
        return Response.json({ error: 'UserProfile not found' }, { status: 404 });
      }
      const profile = profiles[0];

      // Calculate coin and XP increments
      const coinAdd = reward_type === 'Coins' ? (reward_amount || 0) : 0;
      const xpAdd = Math.floor((reward_amount || 0) / 10);

      // Update UserProfile atomically
      const updatedProfile = await base44.asServiceRole.entities.UserProfile.update(profile.id, {
        coins: (profile.coins || 0) + coinAdd,
        user_xp: (profile.user_xp || 0) + xpAdd,
        total_xp: (profile.total_xp || 0) + xpAdd,
        activity_score: (profile.activity_score || 0) + 1,
      });

      // Create Transaction record (audit trail)
      const transaction = await base44.asServiceRole.entities.Transaction.create({
        user_id: user.id,
        type: 'reward',
        amount_usd: 0,
        coins: coinAdd,
        status: 'completed',
        description: `${reward_name || reward_type} — Source: ${source}`,
        tier_label: source,
      });

      // Create Notification (real-time message to user)
      const notifIcon = icon || '🎁';
      const notification = await base44.asServiceRole.entities.Notification.create({
        user_id: user.id,
        type: 'wallet',
        title: `${notifIcon} Reward Claimed!`,
        body: `${reward_name || (reward_amount + ' ' + reward_type)} has been added to your wallet.`,
        category: source,
        priority: 'medium',
        is_read: false,
        status: 'active',
        action_url: '/tasks-rewards',
        metadata: {
          reward_type,
          reward_amount: reward_amount || 0,
          source,
          task_id: task_id || null,
          source_id: source_id || null,
          transaction_id: transaction.id,
        },
      });

      return Response.json({
        success: true,
        profile: updatedProfile,
        transaction,
        notification,
        credited: { coins: coinAdd, xp: xpAdd },
      });
    }

    // ===== CLAIM DAILY BONUS =====
    // Handles 7-day streak logic server-side (not localStorage)
    if (action === 'claimDaily') {
      const { day, reward_amount, reward_name, is_mega } = body;

      if (!reward_amount || !day) {
        return Response.json({ error: 'day and reward_amount are required' }, { status: 400 });
      }

      // Find user's profile
      let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length === 0) {
        profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
      }
      if (profiles.length === 0) {
        return Response.json({ error: 'UserProfile not found' }, { status: 404 });
      }
      const profile = profiles[0];

      // Check if already claimed today via Transaction records
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayStr = todayStart.toISOString();
      const existingClaims = await base44.asServiceRole.entities.Transaction.filter({
        user_id: user.id,
        type: 'reward',
        tier_label: 'daily_bonus',
      });
      const alreadyClaimedToday = existingClaims.some((t: any) =>
        t.created_date && new Date(t.created_date) >= todayStart
      );
      if (alreadyClaimedToday) {
        return Response.json({ error: 'Already claimed today', already_claimed: true }, { status: 400 });
      }

      const coinAdd = reward_amount || 0;
      const xpAdd = Math.floor(coinAdd / 10);

      // Update UserProfile
      const updatedProfile = await base44.asServiceRole.entities.UserProfile.update(profile.id, {
        coins: (profile.coins || 0) + coinAdd,
        user_xp: (profile.user_xp || 0) + xpAdd,
        total_xp: (profile.total_xp || 0) + xpAdd,
        activity_score: (profile.activity_score || 0) + 1,
      });

      // Create Transaction
      const transaction = await base44.asServiceRole.entities.Transaction.create({
        user_id: user.id,
        type: 'reward',
        amount_usd: 0,
        coins: coinAdd,
        status: 'completed',
        description: `${reward_name || 'Daily Bonus Day ' + day} — Day ${day}`,
        tier_label: 'daily_bonus',
      });

      // Create Notification
      const notification = await base44.asServiceRole.entities.Notification.create({
        user_id: user.id,
        type: 'wallet',
        title: is_mega ? '🎁 Mega Daily Bonus Claimed!' : '✅ Daily Bonus Claimed!',
        body: `${reward_name || coinAdd + ' coins'} added to your wallet. Day ${day} streak!`,
        category: 'daily_bonus',
        priority: is_mega ? 'high' : 'medium',
        is_read: false,
        status: 'active',
        action_url: '/tasks-rewards',
        metadata: { day, reward_amount: coinAdd, is_mega, transaction_id: transaction.id },
      });

      return Response.json({
        success: true,
        profile: updatedProfile,
        transaction,
        notification,
        credited: { coins: coinAdd, xp: xpAdd },
      });
    }

    // ===== GET DAILY STREAK STATUS =====
    if (action === 'getDailyStatus') {
      const claims = await base44.asServiceRole.entities.Transaction.filter({
        user_id: user.id,
        tier_label: 'daily_bonus',
      });

      // Calculate streak from claim history
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toDateString();

      const claimedToday = claims.some((t: any) =>
        t.created_date && new Date(t.created_date).toDateString() === todayStr
      );

      // Count consecutive days ending today or yesterday
      let streak = 0;
      const checkDate = new Date(today);
      if (!claimedToday) checkDate.setDate(checkDate.getDate() - 1);
      while (true) {
        const dayStr = checkDate.toDateString();
        const found = claims.some((t: any) =>
          t.created_date && new Date(t.created_date).toDateString() === dayStr
        );
        if (!found) break;
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }

      return Response.json({ streak, claimedToday, total_claims: claims.length });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});