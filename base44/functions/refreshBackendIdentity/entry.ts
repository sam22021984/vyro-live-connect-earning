import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

/**
 * Calls the Supabase RPC `vyro_refresh_my_backend` as the authenticated user
 * (using their own JWT so auth.uid() is correct inside the RPC) and returns
 * the canonical global_id. The frontend uses this as the single source of
 * truth for the logged-in user's ID.
 *
 * No ID is ever generated here — the RPC is the only authority.
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    // The RPC relies on auth.uid(), so it must run with the user's own JWT.
    const userToken =
      body.access_token ||
      (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');

    const supabaseUrl = (Deno.env.get('SUPABASE_URL') || '').replace(/\/$/, '');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');

    const headers = {
      'Content-Type': 'application/json',
      apikey: anonKey,
    };
    if (userToken) headers['Authorization'] = `Bearer ${userToken}`;

    const r = await fetch(`${supabaseUrl}/rest/v1/rpc/vyro_refresh_my_backend`, {
      method: 'POST',
      headers,
      body: JSON.stringify({}),
    });
    const text = await r.text();
    let result;
    try { result = JSON.parse(text); } catch { result = text; }

    const globalId =
      result?.global_id ||
      result?.profile?.identity?.global_id ||
      null;

    return Response.json({ ok: true, global_id: globalId, result });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
});