import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

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
      const [p, g, c, m, r] = await Promise.all([
        base44.entities.CommunityPost.list("-created_date", 50).catch(() => []),
        base44.entities.CommunityGroup.list("-members", 50).catch(() => []),
        base44.entities.CommunityChannel.list("-updated_date", 50).catch(() => []),
        base44.entities.CommunityMedia.list("-created_date", 50).catch(() => []),
        base44.entities.CommunityReport.list("-created_date", 50).catch(() => []),
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
    const unsubs = [
      base44.entities.CommunityPost.subscribe(fetchAll),
      base44.entities.CommunityGroup.subscribe(fetchAll),
      base44.entities.CommunityChannel.subscribe(fetchAll),
      base44.entities.CommunityMedia.subscribe(fetchAll),
      base44.entities.CommunityReport.subscribe(fetchAll),
    ];
    return () => unsubs.forEach((u) => u && u());
  }, [fetchAll]);

  const stats = {
    totalPosts: posts.reduce((s, p) => s + (p.likes || 0), 0) > 0 ? posts.length : 0,
    totalGroups: groups.length,
    totalMembers: groups.reduce((s, g) => s + (g.members || 0), 0),
    onlineMembers: groups.reduce((s, g) => s + (g.online || 0), 0),
    totalLikes: posts.reduce((s, p) => s + (p.likes || 0), 0),
    totalComments: posts.reduce((s, p) => s + (p.comments || 0), 0),
    totalShares: posts.reduce((s, p) => s + (p.shares || 0), 0),
    totalGifts: posts.reduce((s, p) => s + (p.gifts || 0), 0),
    pendingReports: reports.filter((r) => r.status !== "resolved").length,
    mediaCount: media.length,
  };

  return { posts, groups, channels, media, reports, stats, loading, refetch: fetchAll };
}