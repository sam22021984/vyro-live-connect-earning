import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const supabaseUrl = Deno.env.get('SUPABASE_URL').replace(/\/$/, '');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    async function test(name, params) {
      const r = await fetch(`${supabaseUrl}/rest/v1/rpc/${name}`, {
        method: 'POST',
        headers: { 'apikey': serviceRoleKey, 'Authorization': `Bearer ${serviceRoleKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const text = await r.text();
      let data; try { data = JSON.parse(text); } catch { data = null; }
      const isNotFound = r.status === 404 && data?.code === 'PGRST202';
      return { match: !isNotFound, s: r.status, c: data?.code, m: data?.message?.slice(0, 80) };
    }

    const tests = [
      // 3-param combos with p_action + p_target_user_id + p_payload
      ['vyro_user_social_action', { p_action: 'x', p_target_user_id: 'x', p_payload: {} }],
      ['vyro_user_social_action', { p_action: 'x', p_target_user_id: 'x', p_extra: {} }],
      ['vyro_user_social_action', { p_action: 'x', p_target_user_id: 'x', p_data: {} }],
      ['vyro_user_social_action', { p_action: 'x', p_target_user_id: 'x', p_context: {} }],
      // wallet_apply — try various 3-param combos
      ['vyro_wallet_apply', { p_action: 'x', p_amount: 1, p_reason: 'x' }],
      ['vyro_wallet_apply', { p_action: 'x', p_amount_coins: 1, p_reason: 'x' }],
      ['vyro_wallet_apply', { p_action: 'x', p_coins: 1, p_reason: 'x' }],
      ['vyro_wallet_apply', { p_action: 'x', p_amount: 1, p_reference: 'x' }],
      ['vyro_wallet_apply', { p_action: 'x', p_amount_coins: 1, p_reference: 'x' }],
      ['vyro_wallet_apply', { p_action: 'x', p_amount: 1, p_notes: 'x' }],
      // user_action (mall) — try 3-param combos
      ['vyro_user_action', { p_action: 'x', p_item_id: 'x', p_quantity: 1 }],
      ['vyro_user_action', { p_action: 'x', p_mall_item_id: 'x', p_quantity: 1 }],
      ['vyro_user_action', { p_action: 'x', p_item_id: 'x', p_quantity: 1, p_gift_message: 'x' }],
      ['vyro_user_action', { p_action: 'x', p_mall_item_id: 'x', p_quantity: 1, p_gift_message: 'x' }],
      ['vyro_user_action', { p_action: 'x', p_item_id: 'x', p_quantity: 1, p_message: 'x' }],
      ['vyro_user_action', { p_action: 'x', p_mall_item_id: 'x', p_quantity: 1, p_message: 'x' }],
      // safety/settings/support/stats — try p_action + p_payload + something
      ['vyro_user_safety_action', { p_action: 'x', p_payload: {}, p_target_user_id: 'x' }],
      ['vyro_user_safety_action', { p_action: 'x', p_data: {}, p_target_user_id: 'x' }],
      ['vyro_user_settings_action', { p_action: 'x', p_payload: {}, p_category: 'x' }],
      ['vyro_user_settings_action', { p_action: 'x', p_data: {}, p_category: 'x' }],
      ['vyro_profile_stats_action', { p_action: 'x', p_payload: {}, p_target_user_id: 'x' }],
      ['vyro_profile_stats_action', { p_action: 'x', p_data: {}, p_stat_type: 'x' }],
      ['vyro_user_support_action', { p_action: 'x', p_payload: {}, p_ticket_id: 'x' }],
      ['vyro_user_support_action', { p_action: 'x', p_data: {}, p_ticket_id: 'x' }],
      // respond_friend_request — try 3-param
      ['vyro_respond_friend_request', { p_request_id: 'x', p_action: 'x', p_notes: 'x' }],
      ['vyro_respond_friend_request', { p_friend_request_id: 'x', p_action: 'x', p_notes: 'x' }],
      ['vyro_respond_friend_request', { p_id: 'x', p_action: 'x', p_notes: 'x' }],
      ['vyro_respond_friend_request', { p_request_id: 'x', p_status: 'x', p_notes: 'x' }],
      // create_community_post — try 3-param and 4-param
      ['vyro_create_community_post', { p_content: 'x', p_media_urls: [], p_group_id: null }],
      ['vyro_create_community_post', { p_content: 'x', p_media_urls: [], p_visibility: 'public' }],
      ['vyro_create_community_post', { p_content: 'x', p_media_urls: [], p_tags: [] }],
      ['vyro_create_community_post', { p_content: 'x', p_media: [], p_group_id: null }],
      ['vyro_create_community_post', { p_content: 'x', p_media_urls: [], p_group_id: null, p_tags: [] }],
      ['vyro_create_community_post', { p_content: 'x', p_media_urls: [], p_group_id: null, p_visibility: 'public' }],
      // moderate_room_user — try 4-param and 5-param
      ['vyro_moderate_room_user', { p_room_id: 'x', p_user_id: 'x', p_action: 'x', p_reason: 'x' }],
      ['vyro_moderate_room_user', { p_room_id: 'x', p_target_user_id: 'x', p_action: 'x', p_reason: 'x' }],
      ['vyro_moderate_room_user', { p_room_id: 'x', p_user_id: 'x', p_action: 'x', p_reason: 'x', p_duration: 1 }],
      ['vyro_moderate_room_user', { p_room_id: 'x', p_user_id: 'x', p_action: 'x', p_reason: 'x', p_duration_hours: 1 }],
      ['vyro_moderate_room_user', { p_room_id: 'x', p_target_user_id: 'x', p_action: 'x', p_reason: 'x', p_duration: 1 }],
      // get_or_create_private_chat — try 2-param
      ['vyro_get_or_create_private_chat', { p_user_id: 'x', p_initial_message: 'x' }],
      ['vyro_get_or_create_private_chat', { p_target_user_id: 'x', p_initial_message: 'x' }],
      ['vyro_get_or_create_private_chat', { p_other_user_id: 'x', p_initial_message: 'x' }],
      ['vyro_get_or_create_private_chat', { p_peer_id: 'x', p_initial_message: 'x' }],
      // user_has_role — try 2-param and 3-param
      ['vyro_user_has_role', { p_role_code: 'x', p_user_id: 'x' }],
      ['vyro_user_has_role', { p_role_code: 'x', p_include_expired: false }],
      ['vyro_user_has_role', { p_role_code: 'x', p_user_id: 'x', p_include_expired: false }],
      ['vyro_user_has_role', { p_role: 'x', p_user_id: 'x' }],
      // submit_role_application — try 3-param and 4-param
      ['vyro_submit_role_application', { p_role_code: 'x', p_application_data: {}, p_notes: 'x' }],
      ['vyro_submit_role_application', { p_role_code: 'x', p_application_data: {}, p_user_id: 'x' }],
      ['vyro_submit_role_application', { p_role_code: 'x', p_application_data: {}, p_notes: 'x', p_user_id: 'x' }],
      // send_gift — try 5-param and 6-param with p_ prefix
      ['vyro_send_gift', { p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_message: 'x' }],
      ['vyro_send_gift', { p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_anonymous: false }],
      ['vyro_send_gift', { p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_sender_id: 'x' }],
      ['vyro_send_gift', { p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_message: 'x', p_anonymous: false }],
      ['vyro_send_gift', { p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_message: 'x', p_sender_id: 'x' }],
    ];

    const matched = {};
    for (const [name, params] of tests) {
      const paramList = Object.keys(params).sort().join(',');
      const key = `${name}(${paramList})`;
      const res = await test(name, params);
      if (res.match) {
        matched[key] = res;
      }
    }

    return Response.json({ matchedCount: Object.keys(matched).length, matched, totalTests: tests.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});