import { useState, useEffect, useCallback } from "react";
import { callDashboardAPI } from "@/lib/dashboardApi";
import { buildModules, SOCIAL_MODULE_CONFIG } from "@/components/social/socialData";

export function useSocialData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasRealData, setHasRealData] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const result = await callDashboardAPI("social_feed", {});
      // Only accept real data with the expected module shape — otherwise fall
      // back to the static config so the page still renders.
      const hasModules = result && result.invite && result.people && result.friends && result.relationship && result.family;
      if (hasModules) {
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
    // Realtime invalidation handled by GlobalRealtimeProvider (single global channel).
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

  // Use real data when available; otherwise fall back to static config so the
  // page still renders module cards.
  const modules = hasRealData && data ? buildModules(data) : SOCIAL_MODULE_CONFIG;

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