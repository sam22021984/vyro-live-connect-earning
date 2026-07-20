import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

// Static fallback — used until Supabase data loads
export const ROLE_HIERARCHY_FALLBACK = {
  "owner": {
    title: "Application Owner (AO)",
    icon: "👑",
    reportsTo: "None (Highest Authority)",
    positionLevel: "Founder & Chief Executive Authority",
    responsibilities: [],
    authority: [],
    reportsReceivedFrom: ["Super Admin Manager (SAM)", "Country Manager (CM)"],
  },
  "sam": {
    title: "Super Admin Manager (SAM)",
    icon: "👨‍💼",
    reportsTo: "Application Owner (AO)",
    positionLevel: "Executive Administration Head",
    responsibilities: [],
    authority: [],
    reportsReceivedFrom: ["Super Admin (SA)", "Offline Coin Seller (OCS)"],
  },
};

// Convert Supabase role record to frontend format
function dbRoleToFrontend(r) {
  return {
    title: r.title,
    icon: r.icon,
    reportsTo: r.reports_to_label || "None",
    reportsToNote: r.position_level ? `${r.position_level} — reports to ${r.reports_to_label || "None"}.` : "",
    positionLevel: r.position_level || "",
    responsibilities: r.responsibilities || [],
    authority: r.authority || [],
    reportsReceivedFrom: r.reports_received_from || [],
    dashboardPath: r.dashboard_path || "",
    roleKey: r.role_key,
    shortCode: r.short_code || "",
    hierarchyOrder: r.hierarchy_order || 0,
  };
}

// React hook for real-time enterprise roles from Supabase
export function useRoleHierarchy() {
  const [roles, setRoles] = useState(ROLE_HIERARCHY_FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await base44.functions.invoke("enterpriseHierarchy", { action: "getAll" });
        if (!mounted || !res.data?.roles) return;

        const map = {};
        res.data.roles.forEach((r) => {
          map[r.role_key] = dbRoleToFrontend(r);
        });
        setRoles(map);
      } catch {
        // keep fallback on error
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    // Realtime invalidation handled by GlobalRealtimeProvider.
  }, []);

  return { roles, loading };
}