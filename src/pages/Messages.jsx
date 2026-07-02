import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Edit, X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ConversationItem from "@/components/chat/ConversationItem";
import LongPressMenu from "@/components/chat/LongPressMenu";
import { COLORS } from "@/components/chat/chatData";
import { useToast } from "@/components/ui/use-toast";

export default function Messages() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [longPressConv, setLongPressConv] = useState(null);

  useEffect(() => {
    loadConversations();
    const sub = base44.entities.ChatConversation.subscribe(() => loadConversations());
    return sub;
  }, []);

  const loadConversations = async () => {
    try {
      const list = await base44.entities.ChatConversation.list();
      const sorted = list.sort((a, b) => {
        if (a.is_pinned && !b.is_pinned) return -1;
        if (!a.is_pinned && b.is_pinned) return 1;
        return new Date(b.updated_date || 0) - new Date(a.updated_date || 0);
      });
      setConversations(sorted);
    } catch (e) {
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = conversations.filter((c) =>
    !search || c.participant_name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAction = async (key) => {
    const c = longPressConv;
    if (key === "pin") {
      await base44.entities.ChatConversation.update(c.id, { is_pinned: !c.is_pinned });
      toast({ title: c.is_pinned ? "Chat unpinned" : "Chat pinned" });
    } else if (key === "mute") {
      await base44.entities.ChatConversation.update(c.id, { is_muted: !c.is_muted });
      toast({ title: c.is_muted ? "Chat unmuted" : "Chat muted" });
    } else if (key === "block") {
      toast({ title: "User blocked" });
    } else if (key === "report") {
      toast({ title: "User reported" });
    } else if (key === "delete") {
      await base44.entities.ChatConversation.delete(c.id);
      await base44.entities.ChatMessage.deleteMany({ conversation_id: c.id });
      toast({ title: "Conversation deleted" });
    }
    setLongPressConv(null);
    loadConversations();
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="px-4 py-3 flex items-center gap-3">
            <button onClick={() => navigate("/")} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
              <ArrowLeft size={18} className="text-gray-700" />
            </button>
            <div className="flex-1">
              <h1 className="text-base font-bold text-gray-800">Messages</h1>
              <p className="text-[10px] text-gray-400">{conversations.length} conversations</p>
            </div>
            <button onClick={() => setSearchOpen(!searchOpen)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
              {searchOpen ? <X size={18} className="text-gray-700" /> : <Search size={18} className="text-gray-700" />}
            </button>
            <button onClick={() => toast({ title: "New chat coming soon" })} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: `${COLORS.primary}15` }}>
              <Edit size={17} style={{ color: COLORS.primary }} />
            </button>
          </div>
          {searchOpen && (
            <div className="px-4 pb-2">
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations..."
                className="w-full py-2.5 px-4 rounded-full text-sm bg-gray-100 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          )}
        </div>

        <div className="bg-white min-h-[calc(100vh-120px)]">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-8">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Search size={28} className="text-gray-300" />
              </div>
              <p className="text-sm font-semibold text-gray-500">{search ? "No conversations found" : "No messages yet"}</p>
              <p className="text-xs text-gray-400 mt-1 text-center">{search ? "Try a different search" : "Your inbox will appear here"}</p>
            </div>
          ) : (
            filtered.map((c) => (
              <ConversationItem
                key={c.id}
                conv={c}
                onClick={() => navigate(`/chat/${c.id}`, { state: { conv: c } })}
                onLongPress={(conv) => setLongPressConv(conv)}
              />
            ))
          )}
        </div>
      </div>

      <LongPressMenu
        open={!!longPressConv}
        onClose={() => setLongPressConv(null)}
        onAction={handleAction}
        isPinned={longPressConv?.is_pinned}
        isMuted={longPressConv?.is_muted}
      />
    </div>
  );
}