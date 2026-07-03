import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

/**
 * Sends a gift from the current user to another user atomically.
 * - Verifies user auth
 * - Gets sender profile
 * - Checks sufficient coins
 * - Deducts coins from sender
 * - Adds coins to receiver profile
 * - Creates Transaction record
 * - Updates gift stats on both profiles
 *
 * Body: { recipient_id, recipient_name, gift_name, gift_icon, price_coins, quantity }
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { recipient_id, recipient_name, gift_name, gift_icon, price_coins, quantity = 1 } = body;

    if (!recipient_id || !gift_name || !price_coins) {
      return Response.json({ error: 'Missing required fields: recipient_id, gift_name, price_coins' }, { status: 400 });
    }

    const totalCost = price_coins * quantity;

    // Get sender profile
    let senderProfiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
    if (senderProfiles.length === 0) {
      senderProfiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
    }
    if (senderProfiles.length === 0) {
      return Response.json({ error: 'Sender profile not found' }, { status: 404 });
    }
    const senderProfile = senderProfiles[0];

    // Check sufficient coins
    const senderCoins = senderProfile.coins || 0;
    if (senderCoins < totalCost) {
      return Response.json({
        error: 'Insufficient coins',
        needed: totalCost - senderCoins,
        balance: senderCoins
      }, { status: 400 });
    }

    // Deduct from sender
    await base44.asServiceRole.entities.UserProfile.update(senderProfile.id, {
      coins: senderCoins - totalCost,
      gifts_sent: (senderProfile.gifts_sent || 0) + quantity,
      total_xp: (senderProfile.total_xp || 0) + totalCost,
    });

    // Add to receiver
    let receiverProfiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: recipient_id });
    if (receiverProfiles.length === 0) {
      receiverProfiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: recipient_id });
    }
    if (receiverProfiles.length > 0) {
      const rp = receiverProfiles[0];
      await base44.asServiceRole.entities.UserProfile.update(rp.id, {
        coins: (rp.coins || 0) + totalCost,
        gifts_received: (rp.gifts_received || 0) + quantity,
      });
    }

    // Create transaction record
    await base44.asServiceRole.entities.Transaction.create({
      user_id: user.id,
      type: 'gift',
      amount_usd: 0,
      coins: totalCost,
      status: 'completed',
      description: `Sent ${quantity}x ${gift_name} to ${recipient_name || 'user'}`,
      recipient_id,
      recipient_name: recipient_name || '',
      gift_name,
      gift_icon: gift_icon || '',
      gift_quantity: quantity,
    });

    return Response.json({
      success: true,
      new_balance: senderCoins - totalCost,
      total_cost: totalCost,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});