import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const {
      title, description, category, language, cover, tags,
      live_type, room_type, password, ticket_price_coins,
      seat_count, background_theme, entry_effect, room_rules,
      gifts_enabled, chat_enabled, recording_enabled, age_restricted,
      country, host_name, host_avatar, host_vip, is_vip
    } = body;

    if (!title || !title.trim()) {
      return Response.json({ error: 'Room title is required' }, { status: 400 });
    }
    if (room_type === 'password' && !password) {
      return Response.json({ error: 'Password is required for password rooms' }, { status: 400 });
    }
    if (room_type === 'ticket' && (!ticket_price_coins || ticket_price_coins <= 0)) {
      return Response.json({ error: 'Ticket price is required for ticket rooms' }, { status: 400 });
    }

    // Step 2: System Validation
    let profile = null;
    try {
      const profiles = await base44.entities.UserProfile.filter({ user_id: user.id });
      profile = profiles?.[0];
    } catch {}

    // Check ban status
    if (profile?.is_banned || profile?.status === 'banned') {
      return Response.json({ error: 'Account is banned. Cannot go live.' }, { status: 403 });
    }

    // Check account status
    if (profile?.status === 'suspended') {
      return Response.json({ error: 'Account is suspended. Cannot go live.' }, { status: 403 });
    }

    // Check for existing live room by this host
    try {
      const existingRooms = await base44.entities.PartyRoom.filter({
        host_id: user.id,
        status: 'live'
      });
      if (existingRooms && existingRooms.length > 0) {
        return Response.json({
          error: 'You already have an active live room. End it first.',
          existing_room_id: existingRooms[0].id,
        }, { status: 409 });
      }
    } catch {}

    // Step 3: Room Server Creation
    const roomData = {
      name: title.trim(),
      description: description || (tags || []).join(', '),
      cover: cover || `https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400`,
      category: category || 'Music',
      language: language || 'English',
      country: country || profile?.country || 'Global',
      country_name: country || profile?.country || 'Global',
      host: {
        name: host_name || profile?.username || user.full_name || 'Host',
        avatar: host_avatar || profile?.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        vip: host_vip || (profile?.is_vip ? 'VIP' : ''),
      },
      owner_id: user.id,
      host_id: user.id,
      viewers: 1,
      members: 1,
      status: 'live',
      live_type: live_type || 'audio',
      room_type: room_type || 'public',
      password: room_type === 'password' ? password : undefined,
      ticket_price_coins: room_type === 'ticket' ? ticket_price_coins : 0,
      seat_count: seat_count || 10,
      background_theme: background_theme || 'teal_deep',
      entry_effect: entry_effect || 'none',
      room_rules: room_rules || 'Be respectful. No spam. No hate speech.',
      tags: tags || [],
      gifts_enabled: gifts_enabled !== false,
      chat_enabled: chat_enabled !== false,
      recording_enabled: recording_enabled === true,
      age_restricted: age_restricted === true,
      is_locked: false,
      started_at: new Date().toISOString(),
      peak_viewers: 1,
      total_gifts: 0,
      total_coins: 0,
    };

    const room = await base44.entities.PartyRoom.create(roomData);

    // Create analytics session
    const session = await base44.entities.RoomSession.create({
      room_id: room.id,
      party_name: room.name,
      host_id: user.id,
      host_name: room.host.name,
      host_avatar: room.host.avatar,
      status: 'live',
      started_at: new Date().toISOString(),
      current_viewers: 1,
      peak_viewers: 1,
      category: room.category,
      country: room.country,
      host_share_pct: 40,
      platform_share_pct: 30,
      agency_share_pct: 20,
      agent_share_pct: 10,
    });

    // Create host participant on seat 0
    await base44.entities.RoomParticipant.create({
      room_id: room.id,
      user_id: user.id,
      username: room.host.name,
      avatar_url: room.host.avatar,
      global_id: profile?.global_id || '',
      role: 'host',
      status: 'active',
      seat_number: 0,
      is_speaking: true,
      joined_at: new Date().toISOString(),
      country: profile?.country || '',
      is_vip: profile?.is_vip || false,
    });

    return Response.json({
      success: true,
      room_id: room.id,
      session_id: session.id,
      room,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});