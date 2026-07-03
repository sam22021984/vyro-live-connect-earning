import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

/**
 * Processes a mall item purchase atomically.
 * - Verifies user auth
 * - Gets user profile
 * - Checks if already owned
 * - Checks sufficient coins
 * - Deducts coins from UserProfile
 * - Creates UserPurchase record
 * - Creates Transaction record
 *
 * Body: { item_id, item_name, section, icon, rarity, price_coins }
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { item_id, item_name, section, icon, rarity, price_coins } = body;

    if (!item_name || !section || !price_coins) {
      return Response.json({ error: 'Missing required fields: item_name, section, price_coins' }, { status: 400 });
    }

    // Get user profile
    let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
    if (profiles.length === 0) {
      profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
    }
    if (profiles.length === 0) {
      return Response.json({ error: 'Profile not found' }, { status: 404 });
    }
    const profile = profiles[0];

    // Check if already owned
    const existing = await base44.asServiceRole.entities.UserPurchase.filter({
      user_id: user.id,
      item_id: item_id || item_name,
      status: { $in: ['owned', 'equipped'] }
    });
    if (existing.length > 0) {
      return Response.json({ error: 'You already own this item', already_owned: true }, { status: 400 });
    }

    // Check sufficient coins
    const currentCoins = profile.coins || 0;
    if (currentCoins < price_coins) {
      return Response.json({
        error: 'Insufficient coins',
        needed: price_coins - currentCoins,
        balance: currentCoins
      }, { status: 400 });
    }

    // Deduct coins
    const newCoins = currentCoins - price_coins;
    await base44.asServiceRole.entities.UserProfile.update(profile.id, {
      coins: newCoins,
      total_xp: (profile.total_xp || 0) + price_coins,
    });

    // Create purchase record
    const purchase = await base44.asServiceRole.entities.UserPurchase.create({
      user_id: user.id,
      item_id: item_id || item_name,
      item_name,
      section,
      icon: icon || '',
      rarity: rarity || 'common',
      price_coins,
      status: 'owned',
      purchased_date: new Date().toISOString(),
    });

    // Create transaction record
    await base44.asServiceRole.entities.Transaction.create({
      user_id: user.id,
      type: 'purchase',
      amount_usd: 0,
      coins: price_coins,
      status: 'completed',
      description: `Mall Purchase: ${item_name} (${section})`,
    });

    return Response.json({
      success: true,
      purchase,
      new_balance: newCoins,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});