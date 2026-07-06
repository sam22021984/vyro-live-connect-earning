import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { event_type, ...payload } = body;

    if (!event_type) {
      return Response.json({ error: 'event_type is required' }, { status: 400 });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    // Base44 user.id is a MongoDB ObjectId, but event-tracker's database tables
    // expect a Supabase UUID. Resolve it via Supabase auth API.
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();

    let supabaseUserId = null;

    // Primary: call Supabase /auth/v1/user with the user's JWT
    if (token) {
      try {
        const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
          headers: { 'apikey': anonKey, 'Authorization': `Bearer ${token}` },
        });
        const userData = await userRes.json();
        supabaseUserId = userData.id;
      } catch (_e) { /* fall through to email lookup */ }
    }

    // Fallback: look up by email using admin API
    if (!supabaseUserId && user.email) {
      const adminHeaders = { 'apikey': anonKey, 'Authorization': `Bearer ${serviceRoleKey}` };
      const listRes = await fetch(`${supabaseUrl}/auth/v1/admin/users?per_page=1000`, {
        headers: adminHeaders,
      });
      const listData = await listRes.json();
      const users = listData?.users || listData || [];
      const matched = users.find((u) => u.email === user.email);
      supabaseUserId = matched?.id;
    }

    if (!supabaseUserId) {
      return Response.json({ error: 'Could not resolve Supabase user UUID' }, { status: 400 });
    }

    // Forward to event-tracker Supabase Edge Function with service role key
    // to bypass RLS policies on user_presence, live_room_gifts, room_chats
    const res = await fetch(`${supabaseUrl}/functions/v1/event-tracker`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify({
        user_id: supabaseUserId,
        event_type,
        ...payload,
      }),
    });

    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});