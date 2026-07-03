import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const COUNTRY_CONFIG: Record<string, { name: string; calling_code: string }> = {
  PAK: { name: 'Pakistan', calling_code: '92' },
  UAE: { name: 'United Arab Emirates', calling_code: '971' },
  IND: { name: 'India', calling_code: '91' },
  TUR: { name: 'Turkey', calling_code: '90' },
  QAT: { name: 'Qatar', calling_code: '974' },
  SAU: { name: 'Saudi Arabia', calling_code: '966' },
  BGD: { name: 'Bangladesh', calling_code: '880' },
  NPL: { name: 'Nepal', calling_code: '977' },
  OMN: { name: 'Oman', calling_code: '968' },
  KWT: { name: 'Kuwait', calling_code: '965' },
  BHR: { name: 'Bahrain', calling_code: '973' },
  AFG: { name: 'Afghanistan', calling_code: '93' },
  GBR: { name: 'United Kingdom', calling_code: '44' },
  USA: { name: 'United States', calling_code: '1' },
  CAN: { name: 'Canada', calling_code: '1' },
  AUS: { name: 'Australia', calling_code: '61' },
  MYS: { name: 'Malaysia', calling_code: '60' },
  IDN: { name: 'Indonesia', calling_code: '62' },
};

// Generate the next available Application ID for a country
async function generateApplicationId(base44: any, countryCode: string): Promise<{ id: string; serial: number }> {
  const config = COUNTRY_CONFIG[countryCode] || COUNTRY_CONFIG.QAT;
  const callingCode = config.calling_code;

  // Find max serial for this country
  const existing = await base44.asServiceRole.entities.ApplicationId.filter(
    { country_code: countryCode, status: { $in: ['active', 'locked', 'replaced'] } },
    '-serial_number',
    1
  );
  const maxSerial = existing.length > 0 ? (existing[0].serial_number || 0) : 0;
  let nextSerial = maxSerial + 1;

  // Format: COUNTRY-CALLING_CODE+10-digit serial
  let applicationId = `${countryCode}-${callingCode}${nextSerial.toString().padStart(10, '0')}`;

  // Verify uniqueness (also check LuckyId reserved IDs)
  let conflict = await base44.asServiceRole.entities.ApplicationId.filter({ application_id: applicationId });
  let luckyConflict = await base44.asServiceRole.entities.LuckyId.filter({ application_id: applicationId });
  let attempts = 0;
  while ((conflict.length > 0 || luckyConflict.length > 0) && attempts < 100) {
    nextSerial++;
    applicationId = `${countryCode}-${callingCode}${nextSerial.toString().padStart(10, '0')}`;
    conflict = await base44.asServiceRole.entities.ApplicationId.filter({ application_id: applicationId });
    luckyConflict = await base44.asServiceRole.entities.LuckyId.filter({ application_id: applicationId });
    attempts++;
  }

  return { id: applicationId, serial: nextSerial };
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // ─── USER ACTIONS ───

    // Get current user's Application ID
    if (action === 'getMyId') {
      let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length === 0) {
        profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
      }
      if (profiles.length === 0) return Response.json({ error: 'Profile not found' }, { status: 404 });

      const profile = profiles[0];
      const appIds = await base44.asServiceRole.entities.ApplicationId.filter({ user_id: user.id, status: 'active' });
      return Response.json({
        application_id: profile.global_id,
        profile,
        id_record: appIds[0] || null,
      });
    }

    // Get user's ID history
    if (action === 'getMyHistory') {
      const history = await base44.asServiceRole.entities.IdHistory.filter({ user_id: user.id }, '-created_date', 50);
      return Response.json({ history, count: history.length });
    }

    // List available Lucky IDs for purchase
    if (action === 'listLuckyIds') {
      const { country_code } = body;
      const filter: any = { status: 'available' };
      if (country_code) filter.country_code = country_code;
      const luckyIds = await base44.asServiceRole.entities.LuckyId.filter(filter, 'price_coins', 100);
      return Response.json({ lucky_ids: luckyIds, count: luckyIds.length });
    }

    // Purchase a Lucky ID (replaces current ID, preserves all data)
    if (action === 'purchaseLuckyId') {
      const { lucky_id_id } = body;
      if (!lucky_id_id) return Response.json({ error: 'lucky_id_id is required' }, { status: 400 });

      // Get the Lucky ID
      const luckyIds = await base44.asServiceRole.entities.LuckyId.filter({ id: lucky_id_id });
      if (luckyIds.length === 0) return Response.json({ error: 'Lucky ID not found' }, { status: 404 });
      const luckyId = luckyIds[0];
      if (luckyId.status !== 'available') return Response.json({ error: 'This ID is no longer available' }, { status: 400 });

      // Get user profile
      let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length === 0) {
        profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
      }
      if (profiles.length === 0) return Response.json({ error: 'Profile not found' }, { status: 404 });
      const profile = profiles[0];

      // Check coin balance
      if ((profile.coins || 0) < (luckyId.price_coins || 0)) {
        return Response.json({ error: 'Insufficient coins', required: luckyId.price_coins, balance: profile.coins || 0 }, { status: 400 });
      }

      // Get current active ApplicationId record
      const currentAppIds = await base44.asServiceRole.entities.ApplicationId.filter({ user_id: user.id, status: 'active' });
      const currentAppId = currentAppIds[0];
      const previousId = profile.global_id;

      // 1. Mark Lucky ID as sold
      await base44.asServiceRole.entities.LuckyId.update(luckyId.id, {
        status: 'sold',
        purchased_by: user.id,
        purchase_date: new Date().toISOString(),
      });

      // 2. Mark old ApplicationId as replaced
      if (currentAppId) {
        await base44.asServiceRole.entities.ApplicationId.update(currentAppId.id, { status: 'replaced' });
      }

      // 3. Create new ApplicationId record
      await base44.asServiceRole.entities.ApplicationId.create({
        application_id: luckyId.application_id,
        country_code: luckyId.country_code,
        calling_code: luckyId.calling_code,
        serial_number: luckyId.serial_number,
        user_id: user.id,
        username: profile.username,
        country_name: luckyId.country_name,
        status: 'active',
        is_lucky: true,
        is_premium: luckyId.category === 'premium' || luckyId.category === 'vip',
        previous_id: previousId,
      });

      // 4. Create ID History record
      await base44.asServiceRole.entities.IdHistory.create({
        user_id: user.id,
        username: profile.username,
        previous_id: previousId,
        new_id: luckyId.application_id,
        change_reason: `Purchased Lucky ID for ${luckyId.price_coins} coins`,
        admin_log: `User purchased ${luckyId.category} ID: ${luckyId.application_id}`,
        changed_by: user.id,
        change_type: 'lucky_purchase',
      });

      // 5. Update UserProfile global_id (preserves all other data — only global_id changes)
      await base44.asServiceRole.entities.UserProfile.update(profile.id, {
        global_id: luckyId.application_id,
        coins: (profile.coins || 0) - (luckyId.price_coins || 0),
      });

      // 6. Create transaction record
      await base44.asServiceRole.entities.Transaction.create({
        user_id: user.id,
        type: 'withdraw',
        amount_usd: luckyId.price_usd || 0,
        coins: luckyId.price_coins || 0,
        status: 'completed',
        description: `Purchased Lucky ID: ${luckyId.application_id}`,
        tier_label: 'lucky_id_purchase',
      });

      return Response.json({
        success: true,
        new_application_id: luckyId.application_id,
        previous_id: previousId,
        coins_remaining: (profile.coins || 0) - (luckyId.price_coins || 0),
        message: 'Your Application ID has been updated. All your data, wallet, VIP, and rankings are preserved.',
      });
    }

    // ─── OWNER/ADMIN ACTIONS ───

    const isAdmin = user.role === 'admin';

    // Get system stats
    if (action === 'getStats') {
      if (!isAdmin) return Response.json({ error: 'Admin only' }, { status: 403 });
      const [allIds, activeIds, luckyIds, history] = await Promise.all([
        base44.asServiceRole.entities.ApplicationId.list('-created_date', 1000000),
        base44.asServiceRole.entities.ApplicationId.filter({ status: 'active' }),
        base44.asServiceRole.entities.LuckyId.list('-created_date', 1000000),
        base44.asServiceRole.entities.IdHistory.list('-created_date', 1000000),
      ]);

      const byCountry = {};
      for (const id of activeIds) {
        byCountry[id.country_code] = (byCountry[id.country_code] || 0) + 1;
      }

      return Response.json({
        total_ids: allIds.length,
        active_ids: activeIds.length,
        lucky_ids_total: luckyIds.length,
        lucky_available: luckyIds.filter(l => l.status === 'available').length,
        lucky_sold: luckyIds.filter(l => l.status === 'sold').length,
        lucky_reserved: luckyIds.filter(l => l.status === 'reserved').length,
        total_changes: history.length,
        by_country: byCountry,
      });
    }

    // Get all IDs (paginated, searchable)
    if (action === 'getAllIds') {
      if (!isAdmin) return Response.json({ error: 'Admin only' }, { status: 403 });
      const { search, status, country_code, limit = 50, skip = 0 } = body;
      const filter: any = {};
      if (status) filter.status = status;
      if (country_code) filter.country_code = country_code;

      let ids;
      if (search) {
        // Search by application_id pattern
        ids = await base44.asServiceRole.entities.ApplicationId.filter(filter, '-created_date', 500);
        ids = ids.filter(id => id.application_id?.toLowerCase().includes(search.toLowerCase()) || id.username?.toLowerCase().includes(search.toLowerCase()));
      } else {
        ids = await base44.asServiceRole.entities.ApplicationId.filter(filter, '-created_date', limit + skip);
        ids = ids.slice(skip, skip + limit);
      }

      return Response.json({ ids, count: ids.length });
    }

    // Search IDs
    if (action === 'searchById') {
      if (!isAdmin) return Response.json({ error: 'Admin only' }, { status: 403 });
      const { query } = body;
      if (!query) return Response.json({ error: 'query is required' }, { status: 400 });
      const allIds = await base44.asServiceRole.entities.ApplicationId.list('-created_date', 1000000);
      const results = allIds.filter(id =>
        id.application_id?.toLowerCase().includes(query.toLowerCase()) ||
        id.username?.toLowerCase().includes(query.toLowerCase()) ||
        id.user_id?.toLowerCase().includes(query.toLowerCase())
      );
      return Response.json({ results, count: results.length });
    }

    // Lock an ID
    if (action === 'lockId') {
      if (!isAdmin) return Response.json({ error: 'Admin only' }, { status: 403 });
      const { application_id, lock_reason } = body;
      if (!application_id) return Response.json({ error: 'application_id is required' }, { status: 400 });

      const ids = await base44.asServiceRole.entities.ApplicationId.filter({ application_id, status: 'active' });
      if (ids.length === 0) return Response.json({ error: 'Active ID not found' }, { status: 404 });

      const updated = await base44.asServiceRole.entities.ApplicationId.update(ids[0].id, {
        status: 'locked',
        locked_reason: lock_reason || 'Locked by admin',
        locked_by: user.id,
      });

      // Create history entry
      if (ids[0].user_id) {
        await base44.asServiceRole.entities.IdHistory.create({
          user_id: ids[0].user_id,
          username: ids[0].username,
          previous_id: application_id,
          new_id: application_id,
          change_reason: `ID locked: ${lock_reason || 'Admin action'}`,
          admin_log: `Locked by ${user.email}`,
          changed_by: user.id,
          change_type: 'admin_lock',
        });
      }

      return Response.json({ success: true, locked: true, application_id });
    }

    // Disable a fraudulent ID
    if (action === 'disableId') {
      if (!isAdmin) return Response.json({ error: 'Admin only' }, { status: 403 });
      const { application_id, disable_reason } = body;
      if (!application_id || !disable_reason) return Response.json({ error: 'application_id and disable_reason are required' }, { status: 400 });

      const ids = await base44.asServiceRole.entities.ApplicationId.filter({ application_id });
      if (ids.length === 0) return Response.json({ error: 'ID not found' }, { status: 404 });

      const updated = await base44.asServiceRole.entities.ApplicationId.update(ids[0].id, {
        status: 'disabled',
        disabled_reason: disable_reason,
        disabled_by: user.id,
      });

      // Create history entry
      if (ids[0].user_id) {
        await base44.asServiceRole.entities.IdHistory.create({
          user_id: ids[0].user_id,
          username: ids[0].username,
          previous_id: application_id,
          new_id: '[DISABLED]',
          change_reason: `ID disabled: ${disable_reason}`,
          admin_log: `Disabled by ${user.email}`,
          changed_by: user.id,
          change_type: 'admin_disable',
        });
      }

      return Response.json({ success: true, disabled: true, application_id });
    }

    // Create a Premium/Lucky ID
    if (action === 'createPremiumId') {
      if (!isAdmin) return Response.json({ error: 'Admin only' }, { status: 403 });
      const { country_code, serial_number, price_coins, price_usd, category = 'lucky', display_name } = body;
      if (!country_code || serial_number === undefined) return Response.json({ error: 'country_code and serial_number are required' }, { status: 400 });

      const config = COUNTRY_CONFIG[country_code.toUpperCase()];
      if (!config) return Response.json({ error: 'Invalid country code' }, { status: 400 });

      const applicationId = `${country_code.toUpperCase()}-${config.calling_code}${serial_number.toString().padStart(10, '0')}`;

      // Check uniqueness
      const existing = await base44.asServiceRole.entities.ApplicationId.filter({ application_id: applicationId });
      if (existing.length > 0) return Response.json({ error: 'ID already exists' }, { status: 400 });
      const existingLucky = await base44.asServiceRole.entities.LuckyId.filter({ application_id: applicationId });
      if (existingLucky.length > 0) return Response.json({ error: 'Lucky ID already exists' }, { status: 400 });

      const luckyId = await base44.asServiceRole.entities.LuckyId.create({
        application_id: applicationId,
        country_code: country_code.toUpperCase(),
        calling_code: config.calling_code,
        serial_number: serial_number,
        price_coins: price_coins || 5000,
        price_usd: price_usd || 5,
        status: 'available',
        category,
        display_name: display_name || applicationId,
        country_name: config.name,
      });

      return Response.json({ success: true, lucky_id: luckyId });
    }

    // Reserve a Lucky ID for a specific user
    if (action === 'reserveLuckyId') {
      if (!isAdmin) return Response.json({ error: 'Admin only' }, { status: 403 });
      const { lucky_id_id, reserved_for } = body;
      if (!lucky_id_id) return Response.json({ error: 'lucky_id_id is required' }, { status: 400 });

      const luckyIds = await base44.asServiceRole.entities.LuckyId.filter({ id: lucky_id_id });
      if (luckyIds.length === 0) return Response.json({ error: 'Lucky ID not found' }, { status: 404 });
      if (luckyIds[0].status !== 'available') return Response.json({ error: 'Lucky ID is not available' }, { status: 400 });

      const updated = await base44.asServiceRole.entities.LuckyId.update(luckyId.id, {
        status: 'reserved',
        reserved_for: reserved_for || null,
      });

      return Response.json({ success: true, reserved: true, lucky_id: updated });
    }

    // Transfer a reserved Lucky ID to a user (no coin charge)
    if (action === 'transferReservedId') {
      if (!isAdmin) return Response.json({ error: 'Admin only' }, { status: 403 });
      const { lucky_id_id, target_user_id } = body;
      if (!lucky_id_id || !target_user_id) return Response.json({ error: 'lucky_id_id and target_user_id are required' }, { status: 400 });

      const luckyIds = await base44.asServiceRole.entities.LuckyId.filter({ id: lucky_id_id });
      if (luckyIds.length === 0) return Response.json({ error: 'Lucky ID not found' }, { status: 404 });
      const luckyId = luckyIds[0];
      if (luckyId.status === 'sold') return Response.json({ error: 'Lucky ID already sold' }, { status: 400 });

      // Get target user's profile
      let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: target_user_id });
      if (profiles.length === 0) {
        profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: target_user_id });
      }
      if (profiles.length === 0) return Response.json({ error: 'Target user profile not found' }, { status: 404 });
      const profile = profiles[0];
      const previousId = profile.global_id;

      // Mark Lucky ID as sold (transferred)
      await base44.asServiceRole.entities.LuckyId.update(luckyId.id, {
        status: 'sold',
        purchased_by: target_user_id,
        purchase_date: new Date().toISOString(),
      });

      // Mark old ApplicationId as replaced
      const currentAppIds = await base44.asServiceRole.entities.ApplicationId.filter({ user_id: target_user_id, status: 'active' });
      if (currentAppIds.length > 0) {
        await base44.asServiceRole.entities.ApplicationId.update(currentAppIds[0].id, { status: 'replaced' });
      }

      // Create new ApplicationId
      await base44.asServiceRole.entities.ApplicationId.create({
        application_id: luckyId.application_id,
        country_code: luckyId.country_code,
        calling_code: luckyId.calling_code,
        serial_number: luckyId.serial_number,
        user_id: target_user_id,
        username: profile.username,
        country_name: luckyId.country_name,
        status: 'active',
        is_lucky: true,
        is_premium: luckyId.category === 'premium' || luckyId.category === 'vip',
        previous_id: previousId,
      });

      // Create history
      await base44.asServiceRole.entities.IdHistory.create({
        user_id: target_user_id,
        username: profile.username,
        previous_id: previousId,
        new_id: luckyId.application_id,
        change_reason: 'Admin transferred reserved Lucky ID',
        admin_log: `Transferred by ${user.email}`,
        changed_by: user.id,
        change_type: 'admin_transfer',
      });

      // Update profile
      await base44.asServiceRole.entities.UserProfile.update(profile.id, {
        global_id: luckyId.application_id,
      });

      return Response.json({
        success: true,
        transferred: true,
        new_application_id: luckyId.application_id,
        previous_id: previousId,
        target_user_id,
      });
    }

    // Get all ID change history (admin)
    if (action === 'getHistory') {
      if (!isAdmin) return Response.json({ error: 'Admin only' }, { status: 403 });
      const { limit = 50 } = body;
      const history = await base44.asServiceRole.entities.IdHistory.list('-created_date', limit);
      return Response.json({ history, count: history.length });
    }

    // Get all Lucky IDs (admin)
    if (action === 'getAllLuckyIds') {
      if (!isAdmin) return Response.json({ error: 'Admin only' }, { status: 403 });
      const { status } = body;
      const filter: any = {};
      if (status) filter.status = status;
      const luckyIds = await base44.asServiceRole.entities.LuckyId.filter(filter, '-created_date', 200);
      return Response.json({ lucky_ids: luckyIds, count: luckyIds.length });
    }

    // List all countries
    if (action === 'getCountries') {
      return Response.json({
        countries: Object.entries(COUNTRY_CONFIG).map(([code, config]) => ({
          code,
          name: config.name,
          calling_code: config.calling_code,
        })),
      });
    }

    return Response.json({ error: 'Invalid action. Available: getMyId, getMyHistory, listLuckyIds, purchaseLuckyId, getStats, getAllIds, searchById, lockId, disableId, createPremiumId, reserveLuckyId, transferReservedId, getHistory, getAllLuckyIds, getCountries' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});