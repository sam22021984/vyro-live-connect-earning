import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action, dashboard_type, data } = body;

    if (!dashboard_type) {
      return Response.json({ error: 'dashboard_type is required' }, { status: 400 });
    }

    // load: return stored data for this user+dashboard, or null if none yet
    if (action === 'load') {
      const records = await base44.entities.DashboardProfile.filter({
        user_id: user.id,
        dashboard_type,
      });
      if (records.length > 0) {
        return Response.json({ data: records[0].data, exists: true });
      }
      return Response.json({ data: null, exists: false });
    }

    // save: upsert dashboard data for this user (seeds on first access)
    if (action === 'save') {
      if (!data) return Response.json({ error: 'data is required' }, { status: 400 });
      const records = await base44.entities.DashboardProfile.filter({
        user_id: user.id,
        dashboard_type,
      });
      if (records.length > 0) {
        const updated = await base44.entities.DashboardProfile.update(records[0].id, { data });
        return Response.json({ data: updated.data, exists: true });
      }
      const created = await base44.entities.DashboardProfile.create({
        user_id: user.id,
        dashboard_type,
        data,
      });
      return Response.json({ data: created.data, exists: true });
    }

    return Response.json({ error: 'Invalid action. Use "load" or "save".' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});