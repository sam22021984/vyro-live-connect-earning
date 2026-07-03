import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { action, email, password, otp, type, access_token, provider, redirect_to } = body;

    const supabaseUrl = Deno.env.get('SUPABASE_URL')?.replace(/\/$/, '');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !anonKey) {
      return Response.json({ data: { error: 'Supabase not configured' }, ok: false, status: 500 });
    }

    const baseHeaders = {
      'apikey': anonKey,
      'Content-Type': 'application/json',
    };

    let endpoint = '';
    let method = 'POST';
    let reqBody: any = null;
    let extraHeaders: Record<string, string> = {};

    switch (action) {
      case 'signup':
        endpoint = '/auth/v1/signup';
        reqBody = { email, password };
        break;
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
      case 'reset':
        endpoint = '/auth/v1/user';
        method = 'PUT';
        reqBody = { password };
        extraHeaders['Authorization'] = `Bearer ${access_token}`;
        break;
      case 'oauth-url': {
        // Use the app's origin from the referer header, not the function's URL
        const referer = req.headers.get('referer') || req.headers.get('origin') || '';
        let appOrigin = '';
        try {
          if (referer) appOrigin = new URL(referer).origin;
        } catch {}
        // redirect_to from frontend may be a path like "/" — prepend the app origin
        let redirect = redirect_to || '/';
        if (redirect.startsWith('/') && appOrigin) {
          redirect = appOrigin + redirect;
        } else if (!redirect.startsWith('http') && appOrigin) {
          redirect = appOrigin + '/' + redirect;
        }
        const url = `${supabaseUrl}/auth/v1/authorize?provider=${encodeURIComponent(provider)}&redirect_to=${encodeURIComponent(redirect)}`;
        return Response.json({ data: { url }, ok: true, status: 200 });
      }
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