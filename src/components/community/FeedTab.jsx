import React from "react";
import { FEED_POSTS } from "./communityData";
import FeedPost from "./FeedPost";

export default function FeedTab() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold" style={{ color: "#111827" }}>📰 Community Feed</h3>
        <span className="text-[10px]" style={{ color: "#6B7280" }}>{FEED_POSTS.length} posts</span>
      </div>
      {FEED_POSTS.map((post) => <FeedPost key={post.id} post={post} />)}
    </div>
  );
}