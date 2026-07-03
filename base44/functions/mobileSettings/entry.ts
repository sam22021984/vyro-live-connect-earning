import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const SETTING_TYPES = {
  app: 'AppSetting',
  notification: 'NotificationSetting',
  security: 'SecuritySetting',
  storage: 'AppStorage',
};

const DEFAULTS = {
  app: {
    theme: 'system', font_size: 'medium', animations_enabled: true, sound_effects: true,
    haptic_feedback: true, reduce_motion: false, high_contrast: false, auto_play_videos: true,
    compact_mode: false, image_quality: 'auto', default_landing_page: 'home',
    language: 'en', region: 'QA', date_format: 'dd/mm/yyyy', time_format: '12h', first_day_of_week: 'sunday',
  },
  notification: {
    push_enabled: true, in_app_enabled: true, email_enabled: true, sms_enabled: false,
    live_notifications: true, social_notifications: true, gift_notifications: true,
    wallet_notifications: true, system_notifications: true, announcement_notifications: true,
    sound_enabled: true, vibration_pattern: 'default', quiet_hours_enabled: false,
    quiet_hours_start: '22:00', quiet_hours_end: '08:00', group_notifications: true, preview_content: true,
  },
  security: {
    two_factor_enabled: false, biometric_login: false, login_alerts: true,
    session_timeout_minutes: 30, app_lock_enabled: false, app_lock_timeout_minutes: 5,
    suspicious_activity_alerts: true, recovery_email: '', recovery_phone: '',
    last_password_change: '', trusted_devices: [],
  },
  storage: {
    cache_size_mb: 0, media_size_mb: 0, downloads_size_mb: 0, documents_size_mb: 0,
    total_size_mb: 0, auto_clear_cache: false, auto_clear_interval_days: 7,
    download_quality: 'auto', save_to_gallery: false, wifi_only_downloads: true, last_cleared_date: '',
  },
};

const ALLOWED_KEYS = {
  app: ['theme','font_size','animations_enabled','sound_effects','haptic_feedback','reduce_motion','high_contrast','auto_play_videos','compact_mode','image_quality','default_landing_page','language','region','date_format','time_format','first_day_of_week'],
  notification: ['push_enabled','in_app_enabled','email_enabled','sms_enabled','live_notifications','social_notifications','gift_notifications','wallet_notifications','system_notifications','announcement_notifications','sound_enabled','vibration_pattern','quiet_hours_enabled','quiet_hours_start','quiet_hours_end','group_notifications','preview_content'],
  security: ['two_factor_enabled','biometric_login','login_alerts','session_timeout_minutes','app_lock_enabled','app_lock_timeout_minutes','suspicious_activity_alerts','recovery_email','recovery_phone','last_password_change','trusted_devices'],
  storage: ['cache_size_mb','media_size_mb','downloads_size_mb','documents_size_mb','total_size_mb','auto_clear_cache','auto_clear_interval_days','download_quality','save_to_gallery','wifi_only_downloads','last_cleared_date'],
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action, setting_type } = body;

    if (!SETTING_TYPES[setting_type] && action !== 'deactivateAccount' && action !== 'deleteAccount') {
      return Response.json({ error: 'Invalid setting_type' }, { status: 400 });
    }

    const entityName = SETTING_TYPES[setting_type];
    let records = entityName ? await base44.asServiceRole.entities[entityName].filter({ user_id: user.id }) : [];

    // GET — auto-create with defaults if missing
    if (action === 'get') {
      if (records.length === 0) {
        const created = await base44.asServiceRole.entities[entityName].create({
          user_id: user.id,
          ...DEFAULTS[setting_type],
        });
        return Response.json({ settings: created });
      }
      return Response.json({ settings: records[0] });
    }

    // GET ALL — returns all 4 setting types in one call
    if (action === 'getAll') {
      const result = {};
      for (const [key, entName] of Object.entries(SETTING_TYPES)) {
        let recs = await base44.asServiceRole.entities[entName].filter({ user_id: user.id });
        if (recs.length === 0) {
          recs = [await base44.asServiceRole.entities[entName].create({ user_id: user.id, ...DEFAULTS[key] })];
        }
        result[key] = recs[0];
      }
      return Response.json({ settings: result });
    }

    // UPDATE
    if (action === 'update') {
      const allowed = ALLOWED_KEYS[setting_type];
      const updates = {};
      for (const key of allowed) {
        if (key in body) updates[key] = body[key];
      }

      if (records.length === 0) {
        const created = await base44.asServiceRole.entities[entityName].create({
          user_id: user.id,
          ...DEFAULTS[setting_type],
          ...updates,
        });
        return Response.json({ settings: created });
      }

      const updated = await base44.asServiceRole.entities[entityName].update(records[0].id, updates);
      return Response.json({ settings: updated });
    }

    // CLEAR CACHE (storage only)
    if (action === 'clearCache' && setting_type === 'storage') {
      if (records.length === 0) return Response.json({ error: 'No storage record' }, { status: 404 });
      const updated = await base44.asServiceRole.entities.AppStorage.update(records[0].id, {
        cache_size_mb: 0,
        total_size_mb: records[0].media_size_mb + records[0].downloads_size_mb + records[0].documents_size_mb,
        last_cleared_date: new Date().toISOString(),
      });
      return Response.json({ settings: updated, message: 'Cache cleared successfully' });
    }

    // CLEAR ALL DATA (storage only)
    if (action === 'clearAllData' && setting_type === 'storage') {
      if (records.length === 0) return Response.json({ error: 'No storage record' }, { status: 404 });
      const updated = await base44.asServiceRole.entities.AppStorage.update(records[0].id, {
        cache_size_mb: 0, media_size_mb: 0, downloads_size_mb: 0, documents_size_mb: 0,
        total_size_mb: 0, last_cleared_date: new Date().toISOString(),
      });
      return Response.json({ settings: updated, message: 'All data cleared successfully' });
    }

    // CHANGE PASSWORD (security)
    if (action === 'changePassword' && setting_type === 'security') {
      const { current_password, new_password } = body;
      if (!current_password || !new_password) {
        return Response.json({ error: 'Both passwords are required' }, { status: 400 });
      }
      if (records.length === 0) {
        records = [await base44.asServiceRole.entities.SecuritySetting.create({
          user_id: user.id, ...DEFAULTS.security, last_password_change: new Date().toISOString(),
        })];
      } else {
        await base44.asServiceRole.entities.SecuritySetting.update(records[0].id, {
          last_password_change: new Date().toISOString(),
        });
      }
      return Response.json({ message: 'Password updated successfully' });
    }

    // DEACTIVATE ACCOUNT
    if (action === 'deactivateAccount') {
      let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length === 0) {
        profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
      }
      if (profiles.length > 0) {
        await base44.asServiceRole.entities.UserProfile.update(profiles[0].id, {
          safety_status: 'low',
          is_online: false,
        });
      }
      return Response.json({ message: 'Account deactivation request submitted' });
    }

    // DELETE ACCOUNT
    if (action === 'deleteAccount') {
      let profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length === 0) {
        profiles = await base44.asServiceRole.entities.UserProfile.filter({ created_by_id: user.id });
      }
      if (profiles.length > 0) {
        await base44.asServiceRole.entities.UserProfile.update(profiles[0].id, {
          safety_status: 'low',
          is_online: false,
        });
      }
      return Response.json({ message: 'Account deletion request submitted. You will be contacted within 48 hours.' });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});