import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

const EMPTY = { app: {}, notification: {}, security: {}, storage: {} };

export function useMobileSettings() {
  const [settings, setSettings] = useState(EMPTY);
  const [loading, setLoading] = useState(true);

  const loadAll = useCallback(async () => {
    try {
      const res = await base44.functions.invoke("mobileSettings", {
        action: "getAll",
        setting_type: "app",
      });
      setSettings(res.data?.settings || EMPTY);
    } catch (e) {
      // ignore — keep defaults
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Real-time: reload when any settings entity changes
  useEffect(() => {
    const unsubs = [];
    const entities = ["AppSetting", "NotificationSetting", "SecuritySetting", "AppStorage"];
    entities.forEach((name) => {
      try {
        const unsub = base44.entities[name]?.subscribe?.(() => loadAll());
        if (unsub) unsubs.push(unsub);
      } catch (e) { /* ignore */ }
    });
    return () => unsubs.forEach((u) => { try { u(); } catch (e) {} });
  }, [loadAll]);

  const updateSetting = useCallback(async (setting_type, updates) => {
    const res = await base44.functions.invoke("mobileSettings", {
      action: "update",
      setting_type,
      ...updates,
    });
    const updated = res.data?.settings;
    if (updated) {
      setSettings((prev) => ({ ...prev, [setting_type]: updated }));
    }
    return updated;
  }, []);

  const clearCache = useCallback(async () => {
    const res = await base44.functions.invoke("mobileSettings", {
      action: "clearCache",
      setting_type: "storage",
    });
    const updated = res.data?.settings;
    if (updated) setSettings((prev) => ({ ...prev, storage: updated }));
    return res.data;
  }, []);

  const clearAllData = useCallback(async () => {
    const res = await base44.functions.invoke("mobileSettings", {
      action: "clearAllData",
      setting_type: "storage",
    });
    const updated = res.data?.settings;
    if (updated) setSettings((prev) => ({ ...prev, storage: updated }));
    return res.data;
  }, []);

  const changePassword = useCallback(async (current_password, new_password) => {
    const res = await base44.functions.invoke("mobileSettings", {
      action: "changePassword",
      setting_type: "security",
      current_password,
      new_password,
    });
    return res.data;
  }, []);

  const deactivateAccount = useCallback(async () => {
    const res = await base44.functions.invoke("mobileSettings", {
      action: "deactivateAccount",
    });
    return res.data;
  }, []);

  const deleteAccount = useCallback(async () => {
    const res = await base44.functions.invoke("mobileSettings", {
      action: "deleteAccount",
    });
    return res.data;
  }, []);

  return {
    settings,
    loading,
    updateSetting,
    clearCache,
    clearAllData,
    changePassword,
    deactivateAccount,
    deleteAccount,
  };
}