import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const supabaseUrl = Deno.env.get('SUPABASE_URL').replace(/\/$/, '');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    async function test(name, params) {
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/${name}`, {
        method: 'POST',
        headers: { 'apikey': serviceRoleKey, 'Authorization': `Bearer ${serviceRoleKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const text = await response.text();
      let data; try { data = JSON.parse(text); } catch { data = text?.slice(0, 150); }
      const isNotFound = response.status === 404 && data?.code === 'PGRST202';
      return { s: response.status, match: !isNotFound, c: data?.code, m: typeof data === 'string' ? data.slice(0, 100) : data?.message?.slice(0, 100) };
    }

    // For each unknown RPC, try calling with p_action ALONE to test optional params
    const actionFns = ['vyro_user_action','vyro_user_reward_action','vyro_user_safety_action',
      'vyro_user_settings_action','vyro_profile_stats_action','vyro_user_support_action',
      'vyro_wallet_apply','vyro_user_social_action','vyro_submit_role_application',
      'vyro_respond_friend_request','vyro_create_community_post','vyro_moderate_room_user',
      'vyro_manage_seat','vyro_get_or_create_private_chat','vyro_send_gift','vyro_user_has_role'];

    const results = {};

    // Test 1: p_action alone
    for (const fn of actionFns) {
      results[fn + '(p_action)'] = await test(fn, { p_action: 'x' });
    }

    // Test 2: p_action + p_data (instead of p_payload)
    for (const fn of actionFns) {
      results[fn + '(p_action,p_data)'] = await test(fn, { p_action: 'x', p_data: {} });
    }

    // Test 3: 3-param combos with p_action, p_payload, p_target_user_id
    for (const fn of ['vyro_user_action','vyro_user_social_action','vyro_wallet_apply','vyro_user_safety_action','vyro_profile_stats_action','vyro_user_support_action','vyro_user_reward_action','vyro_user_settings_action']) {
      results[fn + '(p_action,p_payload,p_target_user_id)'] = await test(fn, { p_action: 'x', p_payload: {}, p_target_user_id: 'x' });
    }

    // Test 4: vyro_send_gift — try many more combos
    const giftTests = [
      [{ p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_message: 'x', p_anonymous: false }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_is_anonymous: false }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_combo: false }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_note: 'x', p_anonymous: false }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_receiver_id: 'x' }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_target_id: 'x' }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_member_id: 'x' }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_participant_id: 'x' }],
      [{ p_room_id: 'x', p_gift_name: 'x', p_quantity: 1, p_recipient_id: 'x' }],
      [{ p_room_id: 'x', p_gift_code: 'x', p_quantity: 1, p_recipient_id: 'x' }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_amount: 1, p_recipient_id: 'x' }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_count: 1, p_recipient_id: 'x' }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_context_type: 'room' }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_reference_type: 'room' }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_reference: 'x' }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_sender_id: 'x', p_message: 'x', p_reference: 'x' }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_context: 'room', p_reference: 'x' }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_context_type: 'room', p_reference_id: 'x' }],
      [{ p_room_id: 'x', p_gift_id: 'x', p_quantity: 1, p_recipient_id: 'x', p_context: 'room', p_reference_id: 'x' }],
    ];
    for (const params of giftTests) {
      const key = 'vyro_send_gift(' + Object.keys(params).sort().join(',') + ')';
      results[key] = await test('vyro_send_gift', params);
    }

    // Test 5: other unknowns
    results['vyro_user_has_role(p_role_code,p_user_id,p_include_expired)'] = await test('vyro_user_has_role', { p_role_code: 'x', p_user_id: 'x', p_include_expired: false });
    results['vyro_submit_role_application(p_role_code,p_application_data,p_notes)'] = await test('vyro_submit_role_application', { p_role_code: 'x', p_application_data: {}, p_notes: 'x' });
    results['vyro_create_community_post(p_content,p_media_urls,p_group_id,p_tags)'] = await test('vyro_create_community_post', { p_content: 'x', p_media_urls: [], p_group_id: null, p_tags: [] });
    results['vyro_manage_seat(p_room_id,p_seat_number,p_action)'] = await test('vyro_manage_seat', { p_room_id: 'x', p_seat_number: 1, p_action: 'x' });
    results['vyro_manage_seat(p_room_id,p_seat_number,p_action,p_user_id,p_reason)'] = await test('vyro_manage_seat', { p_room_id: 'x', p_seat_number: 1, p_action: 'x', p_user_id: 'x', p_reason: 'x' });
    results['vyro_moderate_room_user(p_room_id,p_user_id,p_action,p_reason,p_duration)'] = await test('vyro_moderate_room_user', { p_room_id: 'x', p_user_id: 'x', p_action: 'x', p_reason: 'x', p_duration: 1 });
    results['vyro_get_or_create_private_chat(p_user_id,p_message)'] = await test('vyro_get_or_create_private_chat', { p_user_id: 'x', p_message: 'x' });

    // Return only matched
    const matched = {};
    for (const [key, val] of Object.entries(results)) {
      if (val.match) matched[key] = val;
    }
    return Response.json({ matchedCount: Object.keys(matched).length, matched });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});