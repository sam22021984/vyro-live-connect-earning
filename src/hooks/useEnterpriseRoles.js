import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

export function useEnterpriseRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRoles = useCallback(async () => {
    try {
      const res = await base44.functions.invoke("enterpriseHierarchy", { action: "getAll" });
      setRoles(res.data.roles);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRoles();
    const unsubscribe = base44.entities.EnterpriseRole.subscribe(() => {
      loadRoles();
    });
    return () => unsubscribe();
  }, [loadRoles]);

  // Build a lookup map by role_key
  const roleMap = {};
  roles.forEach((r) => { roleMap[r.role_key] = r; });

  return { roles, roleMap, loading, error, reload: loadRoles };
}

export function useRoleChain(roleKey) {
  const [chain, setChain] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadChain = useCallback(async () => {
    if (!roleKey) { setLoading(false); return; }
    try {
      const res = await base44.functions.invoke("enterpriseHierarchy", {
        action: "getChain",
        role_key: roleKey,
      });
      setChain(res.data.chain);
    } catch {
      setChain([]);
    } finally {
      setLoading(false);
    }
  }, [roleKey]);

  useEffect(() => {
    loadChain();
  }, [loadChain]);

  return { chain, loading, reload: loadChain };
}

export function useSubordinates(roleKey) {
  const [subordinates, setSubordinates] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!roleKey) { setLoading(false); return; }
    try {
      const res = await base44.functions.invoke("enterpriseHierarchy", {
        action: "getSubordinates",
        role_key: roleKey,
      });
      setSubordinates(res.data.subordinates);
    } catch {
      setSubordinates([]);
    } finally {
      setLoading(false);
    }
  }, [roleKey]);

  useEffect(() => {
    load();
  }, [load]);

  return { subordinates, loading, reload: load };
}