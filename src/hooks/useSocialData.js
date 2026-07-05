import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { callDashboardAPI } from "@/lib/dashboardApi";
import { buildModules } from "@/components/social/socialData";

export function useSocialData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasRealData, setHasRealData] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const result = await callDashboardAPI("social_feed", {});
      // Only accept real data — never fall back to static mock config
      if (result && typeof result === "object" && Object.keys(result).length > 0) {
        setData(result);
        setHasRealData(true);
      } else {
        setData(null);
        setHasRealData(false);
      }
    } catch (e) {
      console.error("Failed to load social data:", e);
      setData(null);
      setHasRealData(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Real-time subscriptions — refetch on any entity change
    let unsubscribes = [];
    try {
      unsubscribes = [
        base44.entities.Invite?.subscribe?.(() => fetchData()),
        base44.entities.FriendRequest?.subscribe?.(() => fetchData()),
        base44.entities.Relationship?.subscribe?.(() => fetchData()),
        base44.entities.CommunityGroup?.subscribe?.(() => fetchData()),
      ].filter(Boolean);
    } catch (e) {
      // subscriptions may not be available yet — polling fallback
    }

    return () => {
      unsubscribes.forEach((unsub) => {
        try { unsub?.(); } catch (e) { /* ignore */ }
      });
    };
  }, [fetchData]);

  const sendFriendRequest = useCallback(async (receiverId, receiverName, receiverAvatar) => {
    const result = await callDashboardAPI("social_post", {
      event: "sendFriendRequest",
      receiver_id: receiverId,
      receiver_name: receiverName,
      receiver_avatar: receiverAvatar,
    });
    fetchData();
    return result;
  }, [fetchData]);

  const acceptFriendRequest = useCallback(async (requestId) => {
    const result = await callDashboardAPI("social_post", {
      event: "acceptFriendRequest",
      request_id: requestId,
    });
    fetchData();
    return result;
  }, [fetchData]);

  const rejectFriendRequest = useCallback(async (requestId) => {
    const result = await callDashboardAPI("social_post", {
      event: "rejectFriendRequest",
      request_id: requestId,
    });
    fetchData();
    return result;
  }, [fetchData]);

  const removeFriend = useCallback(async (friendId) => {
    const result = await callDashboardAPI("social_post", {
      event: "removeFriend",
      friend_id: friendId,
    });
    fetchData();
    return result;
  }, [fetchData]);

  const createInvite = useCallback(async (invitedUserId, invitedUsername) => {
    const result = await callDashboardAPI("social_post", {
      event: "createInvite",
      invited_user_id: invitedUserId,
      invited_username: invitedUsername,
    });
    fetchData();
    return result;
  }, [fetchData]);

  // Only build modules from real data — no static fallback
  const modules = hasRealData && data ? buildModules(data) : [];

  return {
    modules,
    data,
    hasRealData,
    loading,
    refresh: fetchData,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    createInvite,
  };
}