import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timeout));
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { action, email, password, otp, type, access_token, provider, redirect_to, phone, country, username } = body;

    const supabaseUrl = Deno.env.get('SUPABASE_URL')?.replace(/\/$/, '');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !anonKey) {
      return Response.json({ data: { error: 'Supabase not configured' }, ok: false, status: 500 });
    }

    const baseHeaders = {
      'apikey': anonKey,
      'Content-Type': 'application/json',
    };

    // Custom signup: create user via admin API with email auto-confirmed (no email sent, no rate limit)
    if (action === 'signup') {
      if (!serviceRoleKey) {
        return Response.json({ data: { error: 'Service role not configured' }, ok: false, status: 500 });
      }
      const adminHeaders = { ...baseHeaders, 'Authorization': `Bearer ${serviceRoleKey}` };

      // Create user (email_confirm: true → no verification email needed)
      const createResponse = await fetchWithTimeout(`${supabaseUrl}/auth/v1/admin/users`, {
        method: 'POST',
        headers: adminHeaders,
        body: JSON.stringify({ email, password, email_confirm: true }),
      }, 15000);
      const createData = await createResponse.json();
      if (!createResponse.ok) {
        return Response.json({ data: createData, ok: false, status: createResponse.status });
      }

      // Immediately log in to get access token
      const loginResponse = await fetchWithTimeout(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: baseHeaders,
        body: JSON.stringify({ email, password }),
      }, 15000);
      const loginData = await loginResponse.json();
      if (!loginResponse.ok || !loginData.access_token) {
        return Response.json({ data: loginData, ok: false, status: loginResponse.status });
      }

      // Initialize profile internally — saves a frontend round trip
      try {
        const onboardingRes = await base44.asServiceRole.functions.invoke('userOnboarding', {
          action: 'initProfile',
          role: 'user',
          username: username || email.split('@')[0],
          country: country || 'QAT',
          _internal_user_id: loginData.user?.id || createData.id,
          _internal_user_email: loginData.user?.email || email,
        });
        loginData.onboarding = onboardingRes?.data || onboardingRes;
      } catch (_e) {
        // Fallback: frontend will call initProfile separately
      }

      return Response.json({ data: loginData, ok: true, status: 200 });
    }

    // OAuth URL — uses Supabase built-in OAuth for ALL providers (including Google)
    // This uses Supabase's fixed callback URL (already registered in Google Cloud Console)
    if (action === 'oauth-url') {
      const referer = req.headers.get('referer') || req.headers.get('origin') || '';
      let appOrigin = body.app_origin || '';
      if (!appOrigin) {
        try { if (referer) appOrigin = new URL(referer).origin; } catch {}
      }

      let redirect = redirect_to || '/';
      if (redirect.startsWith('/') && appOrigin) redirect = appOrigin + redirect;
      else if (!redirect.startsWith('http') && appOrigin) redirect = appOrigin + '/' + redirect;
      const url = `${supabaseUrl}/auth/v1/authorize?provider=${encodeURIComponent(provider)}&redirect_to=${encodeURIComponent(redirect)}`;
      return Response.json({ data: { url }, ok: true, status: 200 });
    }

    // Google OAuth callback — exchange code, get user info, create/login Supabase user
    if (action === 'oauth-callback') {
      const { code, redirect_origin } = body;
      const googleClientId = Deno.env.get('GOOGLE_CLIENT_ID');
      const googleClientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');

      if (!googleClientId || !googleClientSecret) {
        return Response.json({ data: { error: 'Google OAuth credentials not configured' }, ok: false, status: 500 });
      }
      if (!serviceRoleKey) {
        return Response.json({ data: { error: 'Supabase service role not configured' }, ok: false, status: 500 });
      }
      if (!code) {
        return Response.json({ data: { error: 'Authorization code is required' }, ok: false, status: 400 });
      }

      const appOrigin = redirect_origin || req.headers.get('referer') || req.headers.get('origin') || '';
      let origin = '';
      try { if (appOrigin) origin = new URL(appOrigin).origin; } catch {}
      if (!origin) {
        return Response.json({ data: { error: 'Cannot determine app origin' }, ok: false, status: 400 });
      }
      const redirectUri = `${origin}/login`;

      // Step 1: Exchange code for Google tokens
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: googleClientId,
          client_secret: googleClientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      });
      const tokenData = await tokenResponse.json();
      if (!tokenResponse.ok || !tokenData.access_token) {
        return Response.json({ data: { error: tokenData.error_description || tokenData.error || 'Failed to exchange code' }, ok: false, status: 400 });
      }

      // Step 2: Get user info from Google
      const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { 'Authorization': `Bearer ${tokenData.access_token}` },
      });
      const googleUser = await userResponse.json();
      if (!userResponse.ok || !googleUser.email) {
        return Response.json({ data: { error: 'Failed to get Google user info' }, ok: false, status: 400 });
      }

      const adminHeaders = { ...baseHeaders, 'Authorization': `Bearer ${serviceRoleKey}` };

      // Step 3: Check if user exists in Supabase
      const listResponse = await fetch(`${supabaseUrl}/auth/v1/admin/users?per_page=1000`, {
        method: 'GET',
        headers: adminHeaders,
      });
      const listData = await listResponse.json();
      const existingUser = (listData?.users || listData || []).find((u: any) => u.email === googleUser.email);

      let sessionTokens = null;

      if (existingUser) {
        // Step 4a: Existing user — generate magic link to get session
        const linkResponse = await fetch(`${supabaseUrl}/auth/v1/admin/generate_link`, {
          method: 'POST',
          headers: adminHeaders,
          body: JSON.stringify({
            type: 'magiclink',
            email: googleUser.email,
          }),
        });
        const linkData = await linkResponse.json();
        if (!linkResponse.ok || !linkData.hashed_token) {
          return Response.json({ data: { error: linkData.error_description || linkData.error || 'Failed to generate session' }, ok: false, status: 500 });
        }

        // Verify the magic link token to get session
        const verifyResponse = await fetch(`${supabaseUrl}/auth/v1/verify`, {
          method: 'POST',
          headers: baseHeaders,
          body: JSON.stringify({ token: linkData.hashed_token, type: 'magiclink' }),
        });
        sessionTokens = await verifyResponse.json();
        if (!verifyResponse.ok || !sessionTokens.access_token) {
          return Response.json({ data: { error: sessionTokens.error_description || sessionTokens.error || 'Failed to create session' }, ok: false, status: 500 });
        }
      } else {
        // Step 4b: New user — create via admin API with email_confirm: true
        const createResponse = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
          method: 'POST',
          headers: adminHeaders,
          body: JSON.stringify({
            email: googleUser.email,
            email_confirm: true,
            user_metadata: {
              full_name: googleUser.name || googleUser.email,
              avatar_url: googleUser.picture || '',
              provider: 'google',
              provider_id: googleUser.id,
            },
          }),
        });
        const createData = await createResponse.json();
        if (!createResponse.ok) {
          return Response.json({ data: { error: createData.error_description || createData.error || 'Failed to create user' }, ok: false, status: 500 });
        }

        // Generate magic link for the new user
        const linkResponse = await fetch(`${supabaseUrl}/auth/v1/admin/generate_link`, {
          method: 'POST',
          headers: adminHeaders,
          body: JSON.stringify({
            type: 'magiclink',
            email: googleUser.email,
          }),
        });
        const linkData = await linkResponse.json();
        if (!linkResponse.ok || !linkData.hashed_token) {
          return Response.json({ data: { error: linkData.error_description || linkData.error || 'Failed to generate session' }, ok: false, status: 500 });
        }

        const verifyResponse = await fetch(`${supabaseUrl}/auth/v1/verify`, {
          method: 'POST',
          headers: baseHeaders,
          body: JSON.stringify({ token: linkData.hashed_token, type: 'magiclink' }),
        });
        sessionTokens = await verifyResponse.json();
        if (!verifyResponse.ok || !sessionTokens.access_token) {
          return Response.json({ data: { error: sessionTokens.error_description || sessionTokens.error || 'Failed to create session' }, ok: false, status: 500 });
        }
      }

      return Response.json({ data: sessionTokens, ok: true, status: 200 });
    }

    // Phone OTP: send SMS code
    if (action === 'phone-otp') {
      const response = await fetch(`${supabaseUrl}/auth/v1/otp`, {
        method: 'POST',
        headers: baseHeaders,
        body: JSON.stringify({ phone }),
      });
      const text = await response.text();
      let data;
      try { data = JSON.parse(text); } catch { data = { raw: text }; }
      return Response.json({ data, ok: response.ok, status: response.status });
    }

    // Phone OTP: verify
    if (action === 'verify-phone') {
      const response = await fetch(`${supabaseUrl}/auth/v1/verify`, {
        method: 'POST',
        headers: baseHeaders,
        body: JSON.stringify({ token: otp, type: 'sms', phone }),
      });
      const text = await response.text();
      let data;
      try { data = JSON.parse(text); } catch { data = { raw: text }; }
      return Response.json({ data, ok: response.ok, status: response.status });
    }

    // Standard Supabase Auth endpoints for remaining actions
    let endpoint = '';
    let method = 'POST';
    let reqBody: any = null;
    let extraHeaders: Record<string, string> = {};

    switch (action) {
      case 'login':
        endpoint = '/auth/v1/token?grant_type=password';
        reqBody = { email, password };
        break;
      case 'verify':
        endpoint = '/auth/v1/verify';
        reqBody = { token: otp, type: type || 'signup' };
        break;
      case 'resend':
        endpoint = '/auth/v1/resend';
        reqBody = { email, type: type || 'signup' };
        break;
      case 'recover':
        endpoint = '/auth/v1/recover';
        reqBody = { email };
        break;
      case 'me':
        endpoint = '/auth/v1/user';
        method = 'GET';
        extraHeaders['Authorization'] = `Bearer ${access_token}`;
        break;
      case 'refresh':
        endpoint = '/auth/v1/token?grant_type=refresh_token';
        reqBody = { refresh_token: body.refresh_token };
        break;
      case 'reset':
        endpoint = '/auth/v1/user';
        method = 'PUT';
        reqBody = { password };
        extraHeaders['Authorization'] = `Bearer ${access_token}`;
        break;
      default:
        return Response.json({ data: { error: 'Invalid action' }, ok: false, status: 400 });
    }

    const response = await fetch(`${supabaseUrl}${endpoint}`, {
      method,
      headers: { ...baseHeaders, ...extraHeaders },
      body: method !== 'GET' && reqBody ? JSON.stringify(reqBody) : undefined,
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    return Response.json({ data, ok: response.ok, status: response.status });
  } catch (error) {
    return Response.json({ data: { error: error.message }, ok: false, status: 500 });
  }
});