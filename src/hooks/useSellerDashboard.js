import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

export function useSellerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recharging, setRecharging] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await base44.functions.invoke("sellerOperations", { action: "list" });
      setData(res.data);
    } catch (e) {
      console.error("Failed to load seller data:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const createRecharge = useCallback(async (targetUserId, amountUsd, coins) => {
    try {
      setRecharging(true);
      const res = await base44.functions.invoke("sellerOperations", {
        action: "recharge",
        targetUserId,
        amountUsd: Number(amountUsd),
        coins: Number(coins),
      });
      if (res.data?.success) {
        await loadData();
        return { success: true };
      }
      return { success: false, error: res.data?.error || "Unknown error" };
    } catch (e) {
      return { success: false, error: e.message };
    } finally {
      setRecharging(false);
    }
  }, [loadData]);

  return { data, loading, recharging, createRecharge, refresh: loadData };
}