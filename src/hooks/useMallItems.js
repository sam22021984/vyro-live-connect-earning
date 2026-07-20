import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { backendGateway } from "@/lib/backendGateway";
import { useAuth } from "@/lib/AuthContext";

export function useMallItems() {
  const { user: authUser } = useAuth();
  const [items, setItems] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [itemList, myProfile] = await Promise.all([
        backendGateway.mall.listItems().catch(() => []),
        authUser?.id ? backendGateway.readTable("user_profiles", { filter: { user_id: authUser.id }, limit: 1 }).catch(() => []) : Promise.resolve([]),
      ]);
      setItems(itemList || []);
      if (myProfile && myProfile.length > 0) {
        setProfile(myProfile[0]);
        const myPurchases = await backendGateway.mall.getUserPurchases(authUser.id).catch(() => []);
        setPurchases(myPurchases || []);
      }
    } catch (e) {
      console.error("Failed to load mall data:", e);
    } finally {
      setLoading(false);
    }
  }, [authUser?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const purchaseItem = useCallback(async (item) => {
    setProcessing(true);
    try {
      const res = await base44.functions.invoke("processPurchase", {
        item_id: item.id,
        item_name: item.name,
        section: item.section,
        icon: item.icon,
        rarity: item.rarity,
        price_coins: item.price_coins,
      });
      const result = res.data || res;
      if (result.error) throw new Error(result.error);
      await loadData();
      return result;
    } finally {
      setProcessing(false);
    }
  }, [loadData]);

  const equipItem = useCallback(async (purchaseId) => {
    try {
      const purchase = purchases.find((p) => p.id === purchaseId);
      if (purchase) {
        const sameSection = purchases.filter((p) => p.section === purchase.section && p.status === "equipped");
        for (const p of sameSection) {
          await backendGateway.updateTable("user_purchases", { id: p.id }, { status: "owned" });
        }
      }
      await backendGateway.updateTable("user_purchases", { id: purchaseId }, { status: "equipped" });
      await loadData();
    } catch (e) {
      console.error("Failed to equip item:", e);
    }
  }, [purchases, loadData]);

  const unequipItem = useCallback(async (purchaseId) => {
    try {
      await backendGateway.updateTable("user_purchases", { id: purchaseId }, { status: "owned" });
      await loadData();
    } catch (e) {
      console.error("Failed to unequip item:", e);
    }
  }, [loadData]);

  const isOwned = useCallback((itemId) => {
    return purchases.some((p) => p.item_id === itemId && (p.status === "owned" || p.status === "equipped"));
  }, [purchases]);

  const isEquipped = useCallback((itemId) => {
    return purchases.some((p) => p.item_id === itemId && p.status === "equipped");
  }, [purchases]);

  const coins = profile?.coins || 0;

  return {
    items,
    purchases,
    profile,
    coins,
    loading,
    processing,
    purchaseItem,
    equipItem,
    unequipItem,
    isOwned,
    isEquipped,
    refresh: loadData,
  };
}