import { useState, useEffect, useCallback } from "react";
import { backendGateway } from "@/lib/backendGateway";

export function useCommunityData() {
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [channels, setChannels] = useState([]);
  const [media, setMedia] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      // Read from RLS-protected Supabase tables via the backend gateway.
      // Realtime invalidation is handled globally by GlobalRealtimeProvider.
      const [p, g, c, m, r] = await Promise.all([
        backendGateway.readTable("community_posts", { limit: 50, order: "created_at", ascending: false }).catch(() => []),
        backendGateway.readTable("community_groups", { limit: 50, order: "member_count", ascending: false }).catch(() => []),
        backendGateway.readTable("community_channels", { limit: 50, order: "updated_at", ascending: false }).catch(() => []),
        backendGateway.readTable("community_media", { limit: 50, order: "created_at", ascending: false }).catch(() => []),
        backendGateway.readTable("community_reports", { limit: 50, order: "created_at", ascending: false }).catch(() => []),
      ]);
      setPosts(p || []);
      setGroups(g || []);
      setChannels(c || []);
      setMedia(m || []);
      setReports(r || []);
    } catch (err) {
      console.error("Failed to fetch community data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    // Realtime invalidation handled by GlobalRealtimeProvider (single global channel).
  }, [fetchAll]);

  const stats = {
    totalPosts: posts.length,
    totalGroups: groups.length,
    totalChannels: channels.length,
    totalMembers: groups.reduce((s, g) => s + (g.members || 0), 0),
    onlineMembers: groups.reduce((s, g) => s + (g.online || 0), 0),
    totalLikes: posts.reduce((s, p) => s + (p.likes || 0), 0),
    totalComments: posts.reduce((s, p) => s + (p.comments || 0), 0),
    totalShares: posts.reduce((s, p) => s + (p.shares || 0), 0),
    totalGifts: posts.reduce((s, p) => s + (p.gifts || 0), 0),
    pendingReports: reports.filter((r) => r.status !== "resolved").length,
    resolvedReports: reports.filter((r) => r.status === "resolved").length,
    mediaCount: media.length,
    totalInteractions: posts.reduce((s, p) => s + (p.likes || 0) + (p.comments || 0) + (p.shares || 0) + (p.gifts || 0), 0),
  };

  return { posts, groups, channels, media, reports, stats, loading, refetch: fetchAll };
}