import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

import { backendGateway } from "@/lib/backendGateway";
export function useGifts() {
  const { user: authUser } = useAuth();
  const [gifts, setGifts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const loadGifts = useCallback(async () => {
    try {
      const [giftList, profiles] = await Promise.all([
        backendGateway.readTable("gifts", { limit: 100, order: "sort_order", ascending: true }),
        authUser?.id ? backendGateway.readTable("user_profiles", { filter: { user_id: authUser.id }, limit: 100, order: "created_at", ascending: true }) : Promise.resolve([]),
      ]);
      setGifts(giftList);
      if (profiles.length > 0) setProfile(profiles[0]);
      else if (authUser?.email) {
        const profilesByEmail = await backendGateway.readTable("user_profiles", { filter: { user_id: authUser.email }, limit: 100, order: "created_at", ascending: true }).catch(() => []);
        if (profilesByEmail.length > 0) setProfile(profilesByEmail[0]);
      }
    } catch (e) {
      console.error("Failed to load gifts:", e);
    } finally {
      setLoading(false);
    }
  }, [authUser?.id]);

  useEffect(() => {
    loadGifts();
  }, [loadGifts]);

  const sendGift = useCallback(async ({ recipient_id, recipient_name, gift_name, gift_icon, price_coins, quantity = 1 }) => {
    setSending(true);
    try {
      const res = await base44.functions.invoke("sendGift", {
        recipient_id,
        recipient_name,
        gift_name,
        gift_icon,
        price_coins,
        quantity,
      });
      const result = res.data || res;
      if (result.error) throw new Error(result.error);
      // Refresh profile to update coin balance
      await loadGifts();
      return result;
    } finally {
      setSending(false);
    }
  }, [loadGifts]);

  const coins = profile?.coins || 0;

  return { gifts, profile, coins, loading, sending, sendGift, refresh: loadGifts };
}