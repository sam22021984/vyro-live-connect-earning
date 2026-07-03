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
    const { file_base64, filename, content_type } = body;

    if (!file_base64) return Response.json({ error: 'file_base64 required' }, { status: 400 });

    // Convert base64 to binary
    const binaryString = atob(file_base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);

    const blob = new Blob([bytes], { type: content_type || 'image/jpeg' });
    const file = new File([blob], filename || 'upload.jpg', { type: content_type || 'image/jpeg' });

    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });
    return Response.json({ file_url: result.file_url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});