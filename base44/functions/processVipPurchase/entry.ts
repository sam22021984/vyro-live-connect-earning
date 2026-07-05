import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

/**
 * Processes a VIP purchase/upgrade/reward atomically using the service role
 * (bypasses RLS — the frontend UserProfile.update call fails when the
 * profile's user_id doesn't match the authenticated user's id exactly).
 *
 * Body: {
 *   action: "purchase" | "upgrade" | "claim_reward",
 *   tier_name, tier_coins, tier_cash, months, discount, payment_method,
 *   reward_name, reward_coins
 * }
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const {
      action, tier_name, tier_coins, tier_cash,
      months, discount, payment_method,
      reward_name, reward_coins,
    } = body;

    if (!action) {
      return Response.json({ error: "Missing required field: action" }, { status: 400 });
    }

    // Get user profile (service role — bypasses RLS)
    let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
    if (profiles.length === 0) {
      profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
    }
    if (profiles.length === 0) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }
    const profile = profiles[0];

    const expiryDate = new Date();

    if (action === "purchase" || action === "upgrade") {
      if (!tier_name) {
        return Response.json({ error: "Missing required field: tier_name" }, { status: 400 });
      }
      const m = months || 1;
      const disc = discount || 0;
      const coinsCost = Math.round((tier_coins || 0) * m * (1 - disc / 100));
      const cashCost = Math.round((tier_cash || 0) * m * (1 - disc / 100) * 100) / 100;
      const pm = payment_method || "coins";

      if (pm === "coins" && (profile.coins || 0) < coinsCost) {
        return Response.json({ error: "Insufficient coins", needed: coinsCost - (profile.coins || 0) }, { status: 400 });
      }

      expiryDate.setMonth(expiryDate.getMonth() + (action === "upgrade" ? 12 : Math.ceil(m)));

      // Create transaction record
      await base44.asServiceRole.entities.Transaction.create({
        user_id: user.id,
        type: "recharge",
        amount_usd: pm === "cash" ? cashCost : 0,
        coins: coinsCost,
        status: pm === "coins" ? "completed" : "pending",
        tier_label: tier_name,
        description: `VIP ${action === "upgrade" ? "Upgrade" : "Purchase"}: ${tier_name} - ${m} months (${pm})`,
      });

      // Update profile
      const updates = {
        is_vip: true,
        vip_tier: tier_name,
        vip_expiry: expiryDate.toISOString(),
      };
      if (pm === "coins") {
        updates.coins = (profile.coins || 0) - coinsCost;
        updates.total_xp = (profile.total_xp || 0) + coinsCost;
      }

      const updated = await base44.asServiceRole.entities.UserProfile.update(profile.id, updates);

      return Response.json({
        success: true,
        updated,
        coinsCost,
        cashCost,
        new_balance: updates.coins ?? profile.coins,
      });
    }

    if (action === "claim_reward") {
      if (!reward_name) {
        return Response.json({ error: "Missing required field: reward_name" }, { status: 400 });
      }
      const coins = reward_coins || 0;

      await base44.asServiceRole.entities.Transaction.create({
        user_id: user.id,
        type: "reward",
        coins: coins,
        status: "completed",
        description: `VIP Reward: ${reward_name}`,
      });

      const updated = await base44.asServiceRole.entities.UserProfile.update(profile.id, {
        coins: (profile.coins || 0) + coins,
        gifts_received: (profile.gifts_received || 0) + 1,
      });

      return Response.json({
        success: true,
        updated,
        new_balance: (profile.coins || 0) + coins,
      });
    }

    return Response.json({ error: "Unknown action: " + action }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});