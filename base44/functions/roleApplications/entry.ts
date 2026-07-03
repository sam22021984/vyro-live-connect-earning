import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

function getSupabaseUser(req: Request): { id: string; email: string } | null {
  try {
    const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
    if (!authHeader) return null;
    const token = authHeader.replace('Bearer ', '').trim();
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    let b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const payload = JSON.parse(atob(b64));
    if (!payload.sub) return null;
    return { id: payload.sub, email: payload.email || '' };
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = getSupabaseUser(req);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // List current user's applications
    if (action === 'list') {
      const apps = await base44.asServiceRole.entities.RoleApplication.filter(
        { user_id: user.id },
        '-created_date',
        50
      );
      return Response.json({ applications: apps });
    }

    // Submit a new application
    if (action === 'submit') {
      const { application_type, application_type_name, form_data, document_urls, agency_id, agent_id, reviewing_authority } = body;
      if (!application_type) return Response.json({ error: 'application_type is required' }, { status: 400 });

      const created = await base44.asServiceRole.entities.RoleApplication.create({
        user_id: user.id,
        application_type,
        application_type_name: application_type_name || '',
        status: 'pending',
        form_data: form_data || {},
        document_urls: document_urls || [],
        agency_id: agency_id || undefined,
        agent_id: agent_id || undefined,
        reviewing_authority: reviewing_authority || '',
        submitted_date: new Date().toISOString(),
      });
      return Response.json({ success: true, application: created });
    }

    // Search approved agencies and agents for the Host application selection
    if (action === 'searchAgenciesAgents') {
      const { query } = body;
      const [agencies, agents] = await Promise.all([
        base44.asServiceRole.entities.UserProfile.filter({ is_agency: true, is_verified: true }, '-created_date', 50).catch(() => []),
        base44.asServiceRole.entities.UserProfile.filter({ role: 'agent', is_verified: true }, '-created_date', 50).catch(() => []),
      ]);

      const formatUser = (u) => ({
        id: u.id,
        name: u.username || u.full_name || 'User',
        global_id: u.global_id || '',
        role: u.is_agency ? 'agency' : 'agent',
        avatar: u.avatar_url || '',
      });

      let results = [...agencies.map(formatUser), ...agents.map(formatUser)];
      if (query) {
        const q = query.toLowerCase();
        results = results.filter(r =>
          r.name.toLowerCase().includes(q) ||
          r.global_id.toLowerCase().includes(q)
        );
      }
      return Response.json({ results });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});