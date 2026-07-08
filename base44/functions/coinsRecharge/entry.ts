import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const { action, payload = {} } = body;

    const supabaseUrl = Deno.env.get('SUPABASE_URL').replace(/\/$/, '');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    const edgeUrl = `${supabaseUrl}/functions/v1/coins-recharge`;
    const response = await fetch(edgeUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, ...payload, user_id: user.id, _base44_user_email: user.email }),
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }

    return Response.json({ data, status: response.status });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});