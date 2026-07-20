import { useState, useEffect, useCallback } from "react";
import { backendGateway } from "@/lib/backendGateway";
import { useAuth } from "@/lib/AuthContext";

const COUNTRY_FLAGS = {
  AE: "🇦🇪", SA: "🇸🇦", EG: "🇪🇬", IN: "🇮🇳", KR: "🇰🇷", US: "🇺🇸", GB: "🇬🇧", CA: "🇨🇦",
  QA: "🇶🇦", KW: "🇰🇼", BH: "🇧🇭", OM: "🇴🇲", JO: "🇯🇴", LB: "🇱🇧", IQ: "🇮🇶", SY: "🇸🇾",
  YE: "🇾🇪", PS: "🇵🇸", SD: "🇸🇩", LY: "🇱🇾", TN: "🇹🇳", MA: "🇲🇦", DZ: "🇩🇿", MR: "🇲🇷",
  PK: "🇵🇰", BD: "🇧🇩", ID: "🇮🇩", MY: "🇲🇾", TR: "🇹🇷", IR: "🇮🇷", NG: "🇳🇬", KE: "🇰🇪",
  PH: "🇵🇭", VN: "🇻🇳", TH: "🇹🇭", CN: "🇨🇳", JP: "🇯🇵", DE: "🇩🇪", FR: "🇫🇷", IT: "🇮🇹",
  ES: "🇪🇸", NL: "🇳🇱", BE: "🇧🇪", CH: "🇨🇭", SE: "🇸🇪", NO: "🇳🇴", DK: "🇩🇰", FI: "🇫🇮",
  AU: "🇦🇺", NZ: "🇳🇿", BR: "🇧🇷", AR: "🇦🇷", MX: "🇲🇽", CL: "🇨🇱", CO: "🇨🇴", PE: "🇵🇪",
};

const CATEGORY_ICONS = {
  music: "🎵", gaming: "🎮", entertainment: "🎭", friendship: "💕",
  education: "📚", sports: "⚽", technology: "💻", lifestyle: "🌟",
};

function getFlag(country) {
  if (!country) return "🌍";
  const code = country.toUpperCase().slice(0, 2);
  return COUNTRY_FLAGS[code] || "🌍";
}

function getCategoryIcon(category) {
  if (!category) return "🎉";
  return CATEGORY_ICONS[category.toLowerCase()] || "🎉";
}

export function usePartySocial() {
  const { user } = useAuth();
  const [friendsActivity, setFriendsActivity] = useState([]);
  const [followingActivity, setFollowingActivity] = useState([]);
  const [recentRooms, setRecentRooms] = useState([]);
  const [exploreCountries, setExploreCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user?.id) { setLoading(false); return; }
    try {
      setLoading(true);

      // 1. Fetch accepted friend requests for current user (RLS tables)
      const [sent, received] = await Promise.all([
        backendGateway.readTable("friend_requests", { filter: { sender_id: user.id, status: "accepted" } }).catch(() => []),
        backendGateway.readTable("friend_requests", { filter: { receiver_id: user.id, status: "accepted" } }).catch(() => []),
      ]);
      const friendProfiles = [
        ...sent.map((r) => ({ id: r.receiver_id, name: r.receiver_name, avatar: r.receiver_avatar })),
        ...received.map((r) => ({ id: r.sender_id, name: r.sender_name, avatar: r.sender_avatar })),
      ];

      // 2. Fetch chat conversations (RLS table)
      const conversations = await backendGateway.readTable("chat_conversations", { limit: 50, order: "updated_at", ascending: false }).catch(() => []);

      // 3. Fetch active room participants (RLS table)
      const activeParticipants = await backendGateway.readTable("room_participants", { filter: { status: "active" } }).catch(() => []);

      // 4. Fetch party rooms for enrichment (RLS table)
      const partyRooms = await backendGateway.readTable("party_rooms", { limit: 100, order: "viewers", ascending: false }).catch(() => []);
      const roomMap = new Map(partyRooms.map((r) => [r.id, r]));

      // Build friends activity: friends who are currently in active rooms
      const friendsInRooms = [];
      friendProfiles.forEach((fp) => {
        const participation = activeParticipants.find((p) => p.user_id === fp.id);
        if (participation) {
          const room = roomMap.get(participation.room_id);
          if (room) {
            friendsInRooms.push({
              friend: { name: fp.name, avatar: fp.avatar },
              room: room.name,
              roomId: room.id,
              status: participation.role === "host" || participation.role === "co_host" ? "Hosting" : "In Room",
            });
          }
        }
      });
      setFriendsActivity(friendsInRooms);

      // Build following activity: chat conversation participants who are in rooms
      const followingInRooms = [];
      conversations.forEach((c) => {
        if (!c.participant_id) return;
        const participation = activeParticipants.find((p) => p.user_id === c.participant_id);
        if (participation) {
          const room = roomMap.get(participation.room_id);
          if (room) {
            followingInRooms.push({
              user: {
                name: c.participant_name,
                avatar: c.participant_avatar,
                vip: c.vip_badge || (c.is_vip ? "VIP" : null),
              },
              room: room.name,
              roomId: room.id,
              live: room.status === "live",
            });
          }
        }
      });
      setFollowingActivity(followingInRooms);

      // Build recent rooms: user's own past room participations
      const myParticipation = await backendGateway.readTable("room_participants", { filter: { user_id: user.id } }).catch(() => []);
      const recent = myParticipation
        .filter((p) => p.left_at || p.status === "left" || p.status === "inactive")
        .sort((a, b) => new Date(b.left_at || b.joined_at || 0) - new Date(a.left_at || a.joined_at || 0))
        .slice(0, 10)
        .map((p) => {
          const room = roomMap.get(p.room_id);
          return room ? {
            name: room.name,
            host: room.host?.name || "Unknown",
            lastVisit: p.left_at ? formatTimeAgo(p.left_at) : "Recently",
            roomId: room.id,
            cover: room.cover || "",
          } : null;
        })
        .filter(Boolean);
      setRecentRooms(recent);

      // Build explore countries: group party rooms by country
      const countryMap = new Map();
      partyRooms.forEach((r) => {
        const country = r.country || r.country_name || "Other";
        if (!countryMap.has(country)) countryMap.set(country, 0);
        countryMap.set(country, countryMap.get(country) + 1);
      });
      const countries = Array.from(countryMap.entries())
        .map(([name, count]) => ({ name, flag: getFlag(name), rooms: count }))
        .sort((a, b) => b.rooms - a.rooms)
        .slice(0, 12);
      setExploreCountries(countries);

      // Build categories: group party rooms by category
      const catMap = new Map();
      partyRooms.forEach((r) => {
        const cat = r.category || "Other";
        if (!catMap.has(cat)) catMap.set(cat, 0);
        catMap.set(cat, catMap.get(cat) + 1);
      });
      const cats = Array.from(catMap.entries())
        .map(([name, count]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          icon: getCategoryIcon(name),
          count,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);
      setCategories(cats);
    } catch (err) {
      console.error("Failed to fetch party social data:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchData();
    // Realtime invalidation handled by GlobalRealtimeProvider.
  }, [fetchData]);

  return {
    friendsActivity,
    followingActivity,
    recentRooms,
    exploreCountries,
    categories,
    loading,
    refetch: fetchData,
  };
}

function formatTimeAgo(dateStr) {
  if (!dateStr) return "Recently";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}