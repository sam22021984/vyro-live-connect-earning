import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { SOCIAL_MODULE_CONFIG, buildModules } from "@/components/social/socialData";

export function useSocialData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await base44.functions.invoke("socialData", { action: "getSocialData" });
      setData(res.data);
    } catch (e) {
      console.error("Failed to load social data:", e);
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
    const res = await base44.functions.invoke("socialData", {
      action: "sendFriendRequest",
      receiver_id: receiverId,
      receiver_name: receiverName,
      receiver_avatar: receiverAvatar,
    });
    fetchData();
    return res.data;
  }, [fetchData]);

  const acceptFriendRequest = useCallback(async (requestId) => {
    const res = await base44.functions.invoke("socialData", {
      action: "acceptFriendRequest",
      request_id: requestId,
    });
    fetchData();
    return res.data;
  }, [fetchData]);

  const rejectFriendRequest = useCallback(async (requestId) => {
    const res = await base44.functions.invoke("socialData", {
      action: "rejectFriendRequest",
      request_id: requestId,
    });
    fetchData();
    return res.data;
  }, [fetchData]);

  const removeFriend = useCallback(async (friendId) => {
    const res = await base44.functions.invoke("socialData", {
      action: "removeFriend",
      friend_id: friendId,
    });
    fetchData();
    return res.data;
  }, [fetchData]);

  const createInvite = useCallback(async (invitedUserId, invitedUsername) => {
    const res = await base44.functions.invoke("socialData", {
      action: "createInvite",
      invited_user_id: invitedUserId,
      invited_username: invitedUsername,
    });
    fetchData();
    return res.data;
  }, [fetchData]);

  const modules = data ? buildModules(data) : SOCIAL_MODULE_CONFIG;

  return {
    modules,
    data,
    loading,
    refresh: fetchData,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    createInvite,
  };
}