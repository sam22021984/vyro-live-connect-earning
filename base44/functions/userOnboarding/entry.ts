import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Decode Supabase JWT from request to get user identity
// (Base44's built-in auth.me() doesn't recognize Supabase tokens)
function getSupabaseUser(req: Request): { id: string; email: string; full_name?: string } | null {
  try {
    const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
    if (!authHeader) return null;
    const token = authHeader.replace('Bearer ', '').trim();
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    // JWT payload is base64url — convert to base64, pad, decode
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
    { country_code: countryCode },
    '-serial_number',
    1
  );
  const maxSerial = existing.length > 0 ? (existing[0].serial_number || 0) : 0;
  let nextSerial = maxSerial + 1;

  // Format: COUNTRY-CALLING_CODE+10-digit serial
  let applicationId = `${countryCode}-${callingCode}${nextSerial.toString().padStart(10, '0')}`;

  // Verify uniqueness against ApplicationId and LuckyId tables
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

function getZodiac(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  return 'Capricorn';
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = getSupabaseUser(req);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // Initialize or fetch profile after signup/login
    if (action === 'initProfile') {
      const { role = 'user', username, country = 'QAT' } = body;
      const countryCode = (country || 'QAT').toUpperCase();
      const countryConfig = COUNTRY_CONFIG[countryCode] || COUNTRY_CONFIG.QAT;

      // Check if profile already exists for this user
      let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length === 0) {
        profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
      }

      if (profiles.length > 0) {
        // Profile exists — ensure global_id is set
        const existing = profiles[0];
        if (!existing.global_id) {
          // Generate country-based Application ID
          const { id: applicationId, serial } = await generateApplicationId(base44, countryCode);

          // Create ApplicationId record
          await base44.asServiceRole.entities.ApplicationId.create({
            application_id: applicationId,
            country_code: countryCode,
            calling_code: countryConfig.calling_code,
            serial_number: serial,
            user_id: user.id,
            username: existing.username || username || user.email?.split('@')[0],
            country_name: countryConfig.name,
            status: 'active',
          });

          // Create initial history entry
          await base44.asServiceRole.entities.IdHistory.create({
            user_id: user.id,
            username: existing.username || username,
            previous_id: '[none]',
            new_id: applicationId,
            change_reason: 'Initial Application ID generated during signup',
            admin_log: `Auto-generated for country ${countryCode}`,
            changed_by: user.id,
            change_type: 'initial',
          });

          const updated = await base44.asServiceRole.entities.UserProfile.update(existing.id, {
            global_id: applicationId,
            role: existing.role || role,
            country: countryConfig.name,
          });
          return Response.json({ profile: updated, isNew: false, global_id: applicationId });
        }
        return Response.json({ profile: existing, isNew: false, global_id: existing.global_id });
      }

      // Check if this is the first real user — if so, assign owner role
      const allProfiles = await base44.asServiceRole.entities.UserProfile.list('-created_date', 500);
      const isFirstUser = allProfiles.length === 0;
      const assignedRole = isFirstUser ? 'owner' : (role || 'user');
      const isAppOwner = isFirstUser;

      // Generate unique Application ID
      const { id: applicationId, serial } = await generateApplicationId(base44, countryCode);
      const finalUsername = username || user.full_name || user.email?.split('@')[0] || 'VYRO User';

      // Create ApplicationId record
      await base44.asServiceRole.entities.ApplicationId.create({
        application_id: applicationId,
        country_code: countryCode,
        calling_code: countryConfig.calling_code,
        serial_number: serial,
        user_id: user.id,
        username: finalUsername,
        country_name: countryConfig.name,
        status: 'active',
      });

      // Create initial history entry
      await base44.asServiceRole.entities.IdHistory.create({
        user_id: user.id,
        username: finalUsername,
        previous_id: '[none]',
        new_id: applicationId,
        change_reason: 'Initial Application ID generated during signup',
        admin_log: `Auto-generated for country ${countryCode}`,
        changed_by: user.id,
        change_type: 'initial',
      });

      // Create profile with application_id
      const profile = await base44.asServiceRole.entities.UserProfile.create({
        username: finalUsername,
        title: 'VYRO User',
        user_id: user.id,
        global_id: applicationId,
        role: assignedRole,
        country: countryConfig.name,
        is_app_owner: isAppOwner,
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
        trust_score: 0,
        reputation_rating: 0,
        profile_completion: 0,
        activity_score: 0,
        coins: 0,
        safety_status: 'medium',
      });

      return Response.json({ profile, isNew: true, global_id: applicationId });
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

    // Check username availability
    if (action === 'checkUsername') {
      const { username: uname } = body;
      if (!uname) return Response.json({ error: 'Username is required' }, { status: 400 });

      const RESTRICTED = ['admin', 'official', 'vyro', 'support', 'moderator', 'staff', 'root', 'system', 'help', 'security'];
      const lower = uname.toLowerCase();
      if (RESTRICTED.some((w) => lower.includes(w))) {
        return Response.json({ available: false, reason: 'restricted', suggestions: [] });
      }

      const existing = await base44.asServiceRole.entities.UserProfile.filter({ username: uname });
      if (existing.length > 0) {
        const suggestions = [`${uname}1`, `${uname}_live`, `${uname}_vyro`, `${uname}123`, `real_${uname}`].filter((s) => s !== uname);
        return Response.json({ available: false, reason: 'taken', suggestions });
      }

      return Response.json({ available: true, suggestions: [] });
    }

    // Update profile with onboarding data
    if (action === 'updateProfile') {
      const { username, full_name, bio, birthday, gender, avatar_url, interests } = body;

      let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length === 0) {
        profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
      }
      if (profiles.length === 0) {
        return Response.json({ error: 'Profile not found' }, { status: 404 });
      }

      const updates: any = {};
      if (username) updates.username = username;
      if (full_name) { updates.full_name = full_name; updates.title = full_name; }
      if (bio !== undefined) updates.bio = bio;
      if (birthday) { updates.birthday = birthday; updates.zodiac = getZodiac(birthday); }
      if (gender) updates.gender = gender;
      if (avatar_url) updates.avatar_url = avatar_url;
      if (interests) updates.interests = interests;

      const updated = await base44.asServiceRole.entities.UserProfile.update(profiles[0].id, updates);
      return Response.json({ profile: updated });
    }

    // Claim welcome bonus
    if (action === 'claimWelcomeBonus') {
      let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length === 0) {
        profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
      }
      if (profiles.length === 0) return Response.json({ error: 'Profile not found' }, { status: 404 });

      const p = profiles[0];
      if (p.welcome_bonus_claimed) return Response.json({ error: 'Already claimed' }, { status: 400 });

      const updated = await base44.asServiceRole.entities.UserProfile.update(p.id, {
        coins: (p.coins || 0) + 500,
        welcome_bonus_claimed: true,
      });
      return Response.json({ profile: updated, bonus: 500 });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});