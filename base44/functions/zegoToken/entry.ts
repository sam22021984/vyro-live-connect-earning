import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ZEGOCLOUD Token v3 — server-side token for ZEGO Express SDK authentication.
// Spec: https://github.com/zego/ZegoServerToken

const VERSION = 3;
const VERSION_FLAG = 128;

function toUInt32Buf(n) {
  const buf = new Uint8Array(4);
  buf[0] = (n >>> 24) & 0xff;
  buf[1] = (n >>> 16) & 0xff;
  buf[2] = (n >>> 8) & 0xff;
  buf[3] = n & 0xff;
  return buf;
}

function toUInt16Buf(n) {
  const buf = new Uint8Array(2);
  buf[0] = (n >>> 8) & 0xff;
  buf[1] = n & 0xff;
  return buf;
}

function concatBytes(arrays) {
  let total = 0;
  for (const a of arrays) total += a.length;
  const result = new Uint8Array(total);
  let offset = 0;
  for (const a of arrays) {
    result.set(a, offset);
    offset += a.length;
  }
  return result;
}

function base64Encode(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function strToBytes(str) {
  return new TextEncoder().encode(str);
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const appIdStr = Deno.env.get('ZEGO_APP_ID');
    const secret = Deno.env.get('ZEGO_SERVER_SECRET');
    if (!appIdStr || !secret) {
      return Response.json({ error: 'ZEGO credentials not configured' }, { status: 500 });
    }
    const appId = Number(appIdStr);
    if (!appId || isNaN(appId)) {
      return Response.json({ error: 'Invalid ZEGO_APP_ID — must be numeric' }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const { room_id, user_id } = body;

    const userId = user_id || user.id;
    if (!userId) return Response.json({ error: 'user_id is required' }, { status: 400 });

    // Resolve display name from profile (best-effort, non-blocking)
    let displayName = user.full_name || userId;
    try {
      const profiles = await base44.entities.UserProfile.filter({ user_id: userId });
      if (profiles?.[0]) {
        displayName = profiles[0].display_name || profiles[0].username || displayName;
      }
    } catch {}

    // Verify room exists if room_id provided (soft check)
    let room = null;
    if (room_id) {
      try { room = await base44.entities.PartyRoom.get(room_id); } catch {}
    }

    const expire = 3600; // 1 hour
    const now = Math.floor(Date.now() / 1000);
    const nonce = crypto.randomUUID().replace(/-/g, '');
    const nonceBytes = strToBytes(nonce);

    // header = appId(4) + created(4) + expire(4) + nonceLen(2) + nonce + version(1)
    const header = concatBytes([
      toUInt32Buf(appId),
      toUInt32Buf(now),
      toUInt32Buf(expire),
      toUInt16Buf(nonceBytes.length),
      nonceBytes,
      new Uint8Array([VERSION_FLAG | VERSION]),
    ]);

    // payload = userIdLen(2) + userId
    const userIdBytes = strToBytes(userId);
    const payload = concatBytes([
      toUInt16Buf(userIdBytes.length),
      userIdBytes,
    ]);

    // signature = HMAC-SHA256(header || payload, secret)
    const signContent = concatBytes([header, payload]);
    const signKey = await crypto.subtle.importKey(
      'raw', strToBytes(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const sigBuf = await crypto.subtle.sign('HMAC', signKey, signContent);
    const sigBytes = new Uint8Array(sigBuf);

    // token = base64(header || payload || signature)
    const token = base64Encode(concatBytes([header, payload, sigBytes]));

    return Response.json({
      token,
      app_id: appId,
      user_id: userId,
      user_name: displayName,
      room_id: room_id || null,
      room_name: room?.name || null,
      expires_in: expire,
      server_time: new Date().toISOString(),
    });
  } catch (error) {
    console.error('zegoToken error:', error?.message || error, error?.stack || '');
    return Response.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
});