import React, { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Gift, Flag, MoreHorizontal } from "lucide-react";
import { COLORS, formatNum } from "./communityData";
import { useToast } from "@/components/ui/use-toast";

export default function FeedPost({ post }) {
  const { toast } = useToast();
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(post.saved);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      {/* Header */}
      <div className="flex items-center gap-2.5 p-3">
        <img src={post.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold" style={{ color: COLORS.textPrimary }}>{post.username}</span>
            <span className="text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})` }}>{post.vip_level}</span>
            <span className="text-xs">{post.country_flag}</span>
          </div>
          <span className="text-[10px]" style={{ color: COLORS.textSecondary }}>{post.timestamp}</span>
        </div>
        <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.bgPrimary }}>
          <MoreHorizontal size={15} style={{ color: COLORS.textSecondary }} />
        </button>
      </div>

      {/* Content */}
      <div className="px-3 pb-2">
        <p className="text-sm leading-relaxed" style={{ color: COLORS.textPrimary }}>{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <img src={post.image} className="w-full max-h-72 object-cover" alt="" />
      )}

      {/* Actions */}
      <div className="flex items-center justify-around p-2.5 border-t" style={{ borderColor: COLORS.border }}>
        <button onClick={handleLike} className="flex items-center gap-1 px-2 py-1.5 rounded-lg transition active:scale-90">
          <Heart size={16} fill={liked ? COLORS.crimson : "none"} style={{ color: liked ? COLORS.crimson : COLORS.textSecondary }} />
          <span className="text-[11px] font-semibold" style={{ color: liked ? COLORS.crimson : COLORS.textSecondary }}>{formatNum(likes)}</span>
        </button>
        <button onClick={() => toast({ title: "Comments coming soon" })} className="flex items-center gap-1 px-2 py-1.5 rounded-lg transition active:scale-90">
          <MessageCircle size={16} style={{ color: COLORS.skyBlue }} />
          <span className="text-[11px] font-semibold" style={{ color: COLORS.textSecondary }}>{post.comments}</span>
        </button>
        <button onClick={() => toast({ title: "Shared!" })} className="flex items-center gap-1 px-2 py-1.5 rounded-lg transition active:scale-90">
          <Share2 size={16} style={{ color: COLORS.royalBlue }} />
          <span className="text-[11px] font-semibold" style={{ color: COLORS.textSecondary }}>{post.shares}</span>
        </button>
        <button onClick={() => { setSaved(!saved); toast({ title: saved ? "Removed from saved" : "Post saved!" }); }} className="flex items-center gap-1 px-2 py-1.5 rounded-lg transition active:scale-90">
          <Bookmark size={16} fill={saved ? COLORS.gold : "none"} style={{ color: saved ? COLORS.gold : COLORS.textSecondary }} />
        </button>
        <button onClick={() => toast({ title: "Gift gallery opened!" })} className="flex items-center gap-1 px-2 py-1.5 rounded-lg transition active:scale-90">
          <Gift size={16} style={{ color: COLORS.amber }} />
          <span className="text-[11px] font-semibold" style={{ color: COLORS.textSecondary }}>{post.gifts}</span>
        </button>
        <button onClick={() => toast({ title: "Report submitted" })} className="flex items-center gap-1 px-2 py-1.5 rounded-lg transition active:scale-90">
          <Flag size={15} style={{ color: COLORS.crimson }} />
        </button>
      </div>
    </div>
  );
}