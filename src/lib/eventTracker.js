import { supabaseAuth } from '@/lib/supabaseAuth';
import { getSupabase } from '@/lib/supabaseClient';

/**
 * Tracks a user event by calling the event-tracker Supabase Edge Function directly.
 * The user's Supabase JWT is used for authentication, so RLS policies on
 * user_presence, live_room_gifts, and room_chats allow the insert.
 *
 * Data flow: event-tracker → Supabase tables → live-analytics → UI
 *
 * @param {string} eventType - e.g. 'login', 'session_start', 'gift', 'message'
 * @param {object} payload - Additional event data
 */
let cachedUserId = null;
let cachedConfig = null;

async function getConfig() {
  if (cachedConfig) return cachedConfig;
  try {
    const supabase = await getSupabase();
    cachedConfig = { url: supabase.supabaseUrl, anonKey: supabase.supabaseKey };
  } catch {
    cachedConfig = null;
  }
  return cachedConfig;
}

async function getUserId() {
  if (cachedUserId) return cachedUserId;
  try {
    const user = await supabaseAuth.me();
    cachedUserId = user?.id || null;
  } catch {
    cachedUserId = null;
  }
  return cachedUserId;
}

export const trackEvent = async (eventType, payload = {}) => {
  try {
    const token = supabaseAuth.getToken();
    if (!token) return;

    const [userId, config] = await Promise.all([getUserId(), getConfig()]);
    if (!userId || !config) return;

    await fetch(`${config.url}/functions/v1/event-tracker`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': config.anonKey,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userId,
        event_type: eventType,
        ...payload,
      }),
    });
  } catch (_e) {
    // Silent fail — event tracking must never break the UI
  }
};