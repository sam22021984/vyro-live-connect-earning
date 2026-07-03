import React, { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Eye, MoreHorizontal, Edit, Trash2, Pin, Archive, BarChart3 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TABS = ["Posts", "Videos", "Photos", "Albums", "Drafts", "Scheduled", "Saved"];

const SAMPLE_POSTS = [
  { id: 1, caption: "Amazing live session today! 💕", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400", likes: 234, comments: 45, shares: 12, views: 1200, date: "2h ago" },
  { id: 2, caption: "New cover coming soon! 🎵", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400", likes: 567, comments: 89, shares: 34, views: 2300, date: "1d ago" },
];

export default function MyContent({ profile }) {
  const [activeTab, setActiveTab] = useState("Posts");
  const [showActions, setShowActions] = useState(null);
  const { toast } = useToast();

  const renderEmpty = (label) => (
    <div className="flex flex-col items-center justify-center py-10 px-6">
      <span className="text-3xl mb-2">📭</span>
      <p className="text-xs text-gray-400">No {label.toLowerCase()} yet.</p>
    </div>
  );

  return (
    <div className="pt-4">
      <h2 className="text-sm font-bold text-gray-800 mb-2 px-4">📝 My Content</h2>
      {/* Tabs */}
      <div className="flex gap-1 px-3 overflow-x-auto scrollbar-hide border-b border-gray-50">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-2 text-xs font-bold whitespace-nowrap transition border-b-2 ${activeTab === tab ? "text-purple-600 border-purple-600" : "text-gray-400 border-transparent"}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="px-3 pt-3">
        {activeTab === "Posts" && (
          SAMPLE_POSTS.length === 0 ? renderEmpty("Posts") : (
            <div className="space-y-3">
              {SAMPLE_POSTS.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl overflow-hidden border border-gray-50 shadow-sm">
                  <div className="flex items-center gap-2 p-3">
                    <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}`} alt="" className="w-8 h-8 rounded-full object-cover bg-gray-100" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-700">{profile?.username}</p>
                      <p className="text-[9px] text-gray-400">{post.date}</p>
                    </div>
                    <button onClick={() => setShowActions(showActions === post.id ? null : post.id)} className="w-7 h-7 rounded-full flex items-center justify-center">
                      <MoreHorizontal size={16} className="text-gray-400" />
                    </button>
                  </div>

                  {/* Action dropdown */}
                  {showActions === post.id && (
                    <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
                      {[
                        { label: "Edit", icon: Edit },
                        { label: "Delete", icon: Trash2, color: "text-red-500" },
                        { label: "Pin", icon: Pin },
                        { label: "Archive", icon: Archive },
                        { label: "Insights", icon: BarChart3 },
                        { label: "Share", icon: Share2 },
                      ].map((a) => (
                        <button key={a.label} onClick={() => { setShowActions(null); toast({ title: `${a.label} - ${a.label === "Delete" ? "Deleted" : "Done"}` }); }} className={`px-2.5 py-1.5 rounded-lg bg-gray-50 text-[10px] font-bold flex items-center gap-1 ${a.color || "text-gray-600"} active:scale-95`}>
                          <a.icon size={10} /> {a.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {post.caption && <p className="px-3 pb-2 text-xs text-gray-600">{post.caption}</p>}
                  {post.image && <img src={post.image} alt="" className="w-full max-h-64 object-cover" />}

                  <div className="flex items-center gap-4 px-3 py-2">
                    <button className="flex items-center gap-1 active:scale-90 transition">
                      <Heart size={16} className="text-gray-400" /><span className="text-[10px] text-gray-500">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 active:scale-90 transition">
                      <MessageCircle size={16} className="text-gray-400" /><span className="text-[10px] text-gray-500">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1 active:scale-90 transition">
                      <Share2 size={16} className="text-gray-400" /><span className="text-[10px] text-gray-500">{post.shares}</span>
                    </button>
                    <div className="flex-1" />
                    <button className="active:scale-90 transition"><Bookmark size={16} className="text-gray-400" /></button>
                    <span className="flex items-center gap-0.5 text-[10px] text-gray-400"><Eye size={12} /> {post.views}</span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
        {activeTab === "Videos" && renderEmpty("Videos")}
        {activeTab === "Photos" && renderEmpty("Photos")}
        {activeTab === "Albums" && renderEmpty("Albums")}
        {activeTab === "Drafts" && renderEmpty("Drafts")}
        {activeTab === "Scheduled" && renderEmpty("Scheduled Posts")}
        {activeTab === "Saved" && renderEmpty("Saved Content")}
      </div>
    </div>
  );
}