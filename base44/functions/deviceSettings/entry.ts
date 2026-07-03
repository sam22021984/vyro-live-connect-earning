import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // Find or create the device settings record for this user
    let settings = await base44.asServiceRole.entities.DeviceSetting.filter({ user_id: user.id });

    if (action === 'get') {
      // Auto-create default record if none exists
      if (settings.length === 0) {
        const created = await base44.asServiceRole.entities.DeviceSetting.create({
          user_id: user.id,
          phone_number: '',
          phone_verified: false,
          sms_2fa_enabled: false,
          device_name: 'My Device',
          device_model: '',
          os_version: '',
          sim_carrier: '',
          auto_fill_otp: true,
          sms_notifications: true,
          ringtone_enabled: true,
          vibration_enabled: true,
          low_data_mode: false,
          background_app_refresh: true,
        });
        return Response.json({ settings: created });
      }
      return Response.json({ settings: settings[0] });
    }

    if (action === 'update') {
      const allowed = [
        'phone_number', 'phone_verified', 'sms_2fa_enabled',
        'device_name', 'device_model', 'os_version', 'sim_carrier',
        'auto_fill_otp', 'sms_notifications', 'ringtone_enabled',
        'vibration_enabled', 'low_data_mode', 'background_app_refresh',
      ];
      const updates = {};
      for (const key of allowed) {
        if (key in body) updates[key] = body[key];
      }

      if (settings.length === 0) {
        // Create with provided values
        const created = await base44.asServiceRole.entities.DeviceSetting.create({
          user_id: user.id,
          ...updates,
        });
        return Response.json({ settings: created });
      }

      const updated = await base44.asServiceRole.entities.DeviceSetting.update(
        settings[0].id, updates
      );
      return Response.json({ settings: updated });
    }

    if (action === 'send_otp') {
      const { phone_number } = body;
      if (!phone_number) {
        return Response.json({ error: 'phone_number is required' }, { status: 400 });
      }
      // Generate a 6-digit OTP
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      // In production this would send via SMS gateway; here we return it for dev
      return Response.json({
        success: true,
        otp,
        message: `OTP sent to ${phone_number}`,
      });
    }

    if (action === 'verify_otp') {
      const { phone_number, otp } = body;
      // For demo: accept any 6-digit code; in production verify against stored OTP
      if (!otp || otp.length !== 6) {
        return Response.json({ error: 'Invalid OTP' }, { status: 400 });
      }
      // Mark phone as verified
      if (settings.length > 0) {
        const updated = await base44.asServiceRole.entities.DeviceSetting.update(
          settings[0].id,
          { phone_number, phone_verified: true }
        );
        return Response.json({ settings: updated });
      }
      const created = await base44.asServiceRole.entities.DeviceSetting.create({
        user_id: user.id,
        phone_number,
        phone_verified: true,
      });
      return Response.json({ settings: created });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});