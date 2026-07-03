import React from "react";
import { Heart, MessageCircle, Share2, Bookmark, ThumbsUp } from "lucide-react";

export default function SocialSection({ profile }) {
  const socials = [
    { icon: Heart, label: "Likes", value: profile?.gifts_received || 0, color: "text-red-500", bg: "bg-red-50" },
    { icon: MessageCircle, label: "Comments", value: profile?.friends || 0, color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Share2, label: "Shares", value: profile?.following || 0, color: "text-green-500", bg: "bg-green-50" },
    { icon: Bookmark, label: "Saved", value: profile?.followers || 0, color: "text-purple-500", bg: "bg-purple-50" },
    { icon: ThumbsUp, label: "Reactions", value: profile?.activity_score || 0, color: "text-yellow-500", bg: "bg-yellow-50" },
  ];

  return (
    <div className="px-4 mb-4">
      <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50">
        <div className="flex items-center gap-2 mb-4">
          <Heart size={16} className="text-red-500" />
          <h3 className="text-sm font-bold text-gray-800">Social</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {socials.map((s, i) => (
            <div key={i} className="flex flex-col items-center p-3 rounded-[14px] bg-gray-50/80 transition-all duration-300 hover:bg-gray-100/80">
              <div className={`w-9 h-9 rounded-full ${s.bg} flex items-center justify-center mb-1.5`}>
                <s.icon size={16} className={s.color} />
              </div>
              <span className="text-sm font-bold text-gray-800">{s.value}</span>
              <span className="text-[9px] text-gray-400 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}