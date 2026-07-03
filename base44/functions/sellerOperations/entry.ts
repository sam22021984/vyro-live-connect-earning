import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // Get seller profile
    let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
    if (profiles.length === 0) {
      profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
    }
    const sellerProfile = profiles[0];

    if (action === 'list') {
      // Fetch all transactions created by this seller (filter by tier_label = seller user_id)
      const transactions = await base44.asServiceRole.entities.Transaction.filter(
        { tier_label: user.id, type: 'recharge' },
        '-created_date',
        500
      );

      // Build customer list from transactions
      const customerMap = {};
      for (const t of transactions) {
        const key = t.user_id || 'unknown';
        if (!customerMap[key]) {
          customerMap[key] = {
            id: key,
            name: t.description?.split(' for ')[1] || t.paypal_email || key,
            totalRecharges: 0,
            totalSpent: 0,
            lastRecharge: t.created_date,
            status: t.status,
          };
        }
        customerMap[key].totalRecharges += 1;
        customerMap[key].totalSpent += t.amount_usd || 0;
      }
      const customers = Object.values(customerMap).sort((a, b) => b.totalSpent - a.totalSpent);

      // Compute stats
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthTransactions = transactions.filter((t) => new Date(t.created_date) >= monthStart);
      const monthlyRecharge = monthTransactions.reduce((s, t) => s + (t.amount_usd || 0), 0);
      const totalCoins = transactions.reduce((s, t) => s + (t.coins || 0), 0);
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayRecharges = transactions.filter((t) => new Date(t.created_date) >= todayStart).length;
      const pendingWithdrawals = 0; // seller withdrawals tracked separately
      const earnings = Math.round(monthlyRecharge * 0.15); // 15% commission

      // Determine seller level
      const sellerLevels = [
        { id: 4, name: 'Diamond Seller', icon: '💎', color: '#B9F2FF', reqNum: 10000, commission: '20%' },
        { id: 3, name: 'Gold Seller', icon: '🥇', color: '#FFD700', reqNum: 5000, commission: '15%' },
        { id: 2, name: 'Silver Seller', icon: '🥈', color: '#C0C0C0', reqNum: 2000, commission: '10%' },
        { id: 1, name: 'Bronze Seller', icon: '🥉', color: '#CD7F32', reqNum: 500, commission: '5%' },
      ];
      const currentLevel = sellerLevels.find((l) => monthlyRecharge >= l.reqNum) || { id: 0, name: 'Starter', icon: '🎯', color: '#22D3EE', commission: '0%' };
      const nextLevel = [...sellerLevels].reverse().find((l) => l.id > currentLevel.id);
      const monthlyTarget = nextLevel ? nextLevel.reqNum : currentLevel.reqNum;

      return Response.json({
        sellerProfile,
        transactions,
        customers,
        stats: {
          totalRecharges: transactions.length,
          monthlyRecharge,
          totalCustomers: customers.length,
          todayRecharges,
          totalCoins,
          earnings,
          pendingWithdrawals,
        },
        level: { ...currentLevel, monthlyRecharge, monthlyTarget, nextLevel: nextLevel?.name || 'MAX' },
      });
    }

    if (action === 'recharge') {
      const { targetUserId, amountUsd, coins } = body;
      if (!targetUserId || !amountUsd || !coins) {
        return Response.json({ error: 'Missing targetUserId, amountUsd, or coins' }, { status: 400 });
      }

      // Create transaction record
      const transaction = await base44.asServiceRole.entities.Transaction.create({
        user_id: targetUserId,
        type: 'recharge',
        amount_usd: Number(amountUsd),
        coins: Number(coins),
        status: 'completed',
        description: `Offline recharge by ${sellerProfile?.username || user.email} for ${targetUserId}`,
        tier_label: user.id,
      });

      // Credit coins to target user's profile
      let targetProfiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: targetUserId });
      if (targetProfiles.length === 0) {
        targetProfiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: targetUserId });
      }
      if (targetProfiles.length > 0) {
        const target = targetProfiles[0];
        await base44.asServiceRole.entities.Transaction.update(transaction.id, {
          // already created, just update target profile below
        });
        await base44.asServiceRole.entities.UserProfile.update(target.id, {
          coins: (target.coins || 0) + Number(coins),
        });
      }

      return Response.json({ success: true, transaction });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});