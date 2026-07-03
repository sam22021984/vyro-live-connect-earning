import React from "react";
import { Loader2 } from "lucide-react";
import { COLORS } from "./communityData";
import FeedPost from "./FeedPost";

export default function FeedTab({ posts = [], loading }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold" style={{ color: "#111827" }}>📰 Community Feed</h3>
        <span className="text-[10px]" style={{ color: "#6B7280" }}>{posts.length} posts</span>
      </div>
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: COLORS.royalBlue }} />
        </div>
      ) : posts.length === 0 ? (
        <p className="text-center text-xs py-12" style={{ color: COLORS.textSecondary }}>No posts yet</p>
      ) : (
        posts.map((post) => <FeedPost key={post.id} post={post} />)
      )}
    </div>
  );
}