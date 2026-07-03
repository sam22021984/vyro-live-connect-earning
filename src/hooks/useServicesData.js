import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

export function useServicesData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await base44.functions.invoke("servicesData", { action: "getServicesData" });
      setData(res.data);
    } catch (e) {
      console.error("Failed to load services data:", e);
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
        base44.entities.Notification?.subscribe?.(() => fetchData()),
        base44.entities.SupportTicket?.subscribe?.(() => fetchData()),
        base44.entities.MallItem?.subscribe?.(() => fetchData()),
        base44.entities.UserProfile?.subscribe?.(() => fetchData()),
        base44.entities.Badge?.subscribe?.(() => fetchData()),
        base44.entities.Achievement?.subscribe?.(() => fetchData()),
      ].filter(Boolean);
    } catch (e) {
      // subscriptions may not be available
    }

    return () => {
      unsubscribes.forEach((unsub) => {
        try { unsub?.(); } catch (e) { /* ignore */ }
      });
    };
  }, [fetchData]);

  const markAsRead = useCallback(async (notificationId) => {
    const res = await base44.functions.invoke("servicesData", {
      action: "markAsRead",
      notification_id: notificationId,
    });
    fetchData();
    return res.data;
  }, [fetchData]);

  const markAllAsRead = useCallback(async () => {
    const res = await base44.functions.invoke("servicesData", { action: "markAllAsRead" });
    fetchData();
    return res.data;
  }, [fetchData]);

  const archiveNotification = useCallback(async (notificationId) => {
    const res = await base44.functions.invoke("servicesData", {
      action: "archiveNotification",
      notification_id: notificationId,
    });
    fetchData();
    return res.data;
  }, [fetchData]);

  const createSupportTicket = useCallback(async (subject, description, category, priority) => {
    const res = await base44.functions.invoke("servicesData", {
      action: "createSupportTicket",
      subject, description, category, priority,
    });
    fetchData();
    return res.data;
  }, [fetchData]);

  const updateSupportTicket = useCallback(async (ticketId, status, rating) => {
    const res = await base44.functions.invoke("servicesData", {
      action: "updateSupportTicket",
      ticket_id: ticketId, status, rating,
    });
    fetchData();
    return res.data;
  }, [fetchData]);

  const purchaseMallItem = useCallback(async (itemId) => {
    const res = await base44.functions.invoke("servicesData", {
      action: "purchaseMallItem",
      item_id: itemId,
    });
    fetchData();
    return res.data;
  }, [fetchData]);

  return {
    data,
    loading,
    refresh: fetchData,
    markAsRead,
    markAllAsRead,
    archiveNotification,
    createSupportTicket,
    updateSupportTicket,
    purchaseMallItem,
  };
}