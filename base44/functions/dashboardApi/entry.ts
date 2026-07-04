import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action, dashboard_type, params } = body;

    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const edgeUrl = 'https://zohtjywggezadhqwfzrh.supabase.co/functions/v1/dashboard-api';

    const response = await fetch(edgeUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        dashboard_type,
        params: params || {},
        user_id: user.id,
        _base44_user_email: user.email,
      }),
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }

    return Response.json({ data, status: response.status });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});