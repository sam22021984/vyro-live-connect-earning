import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const supabaseUrl = (Deno.env.get('SUPABASE_URL') || '').replace(/\/$/, '');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    // Fetch the PostgREST OpenAPI spec which lists all tables and RPCs
    const res = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
      }
    });
    const spec = await res.json();

    const paths = Object.keys(spec?.paths || {});
    const tables = paths
      .filter(p => !p.startsWith('/rpc/') && p !== '/' && !p.includes('{'))
      .map(p => p.replace(/^\//, ''));
    const rpcs = paths
      .filter(p => p.startsWith('/rpc/'))
      .map(p => p.replace(/^\/rpc\//, ''));

    return Response.json({
      tables: tables.sort(),
      rpcs: rpcs.sort(),
      vyroRpcs: rpcs.filter(r => r.startsWith('vyro_')).sort(),
      tableCount: tables.length,
      rpcCount: rpcs.length,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});