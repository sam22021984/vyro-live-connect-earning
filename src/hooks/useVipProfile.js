import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

export function useVipProfile() {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        const profiles = await base44.entities.UserProfile.filter({ created_by_id: me.id });
        if (profiles.length > 0) {
          setProfile(profiles[0]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { profile, user, loading };
}