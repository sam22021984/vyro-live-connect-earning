import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera } from "lucide-react";
import { COLORS, ROOM_TAGS } from "@/components/live-room/roomData";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

export default function GoLivePanel() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [starting, setStarting] = useState(false);

  const handleStart = async () => {
    if (!title.trim()) {
      toast({ title: "Please enter a room title", variant: "destructive" });
      return;
    }
    setStarting(true);
    try {
      const room = await base44.entities.PartyRoom.create({
        name: title.trim(),
        description: announcement.trim(),
        category: selectedTag,
        status: "live",
        viewers: 1,
        members: 1,
        cover: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&h=200&fit=crop",
        host: { name: "You", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", vip: "VIP 1" },
        language: "English",
        country: "🌍",
        country_name: "Global",
        trending: false,
        recommended: false,
        rank: 0,
      });
      toast({ title: "Going Live! 🎉" });
      navigate(`/live-room/${room.id}`);
    } catch (err) {
      toast({ title: "Failed to go live", description: err.message, variant: "destructive" });
      setStarting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#FFFFFF" }}>
      {/* Header */}
      <div className="sticky top-0 z-20 px-4 py-3 flex items-center gap-3 border-b" style={{ borderColor: "#E5E7EB", background: "#FFFFFF" }}>
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#F3F4F6" }}>
          <ArrowLeft size={18} style={{ color: "#111827" }} />
        </button>
        <h1 className="text-base font-bold" style={{ color: "#111827" }}>Go Live</h1>
      </div>

      <div className="p-4 space-y-5 max-w-md mx-auto">
        {/* Room Cover */}
        <div>
          <label className="text-xs font-bold mb-2 block" style={{ color: "#374151" }}>Room Cover</label>
          <button
            onClick={() => toast({ title: "Upload cover image" })}
            className="w-full aspect-[16/9] rounded-2xl flex flex-col items-center justify-center gap-2 transition active:scale-95"
            style={{ border: `2px dashed #D1D5DB`, background: "#F9FAFB" }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#E5E7EB" }}>
              <Camera size={22} style={{ color: "#6B7280" }} />
            </div>
            <span className="text-xs font-semibold" style={{ color: "#6B7280" }}>Edit Cover</span>
          </button>
        </div>

        {/* Room Title */}
        <div>
          <label className="text-xs font-bold mb-2 block" style={{ color: "#374151" }}>Room Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Landing to meet you"
            className="w-full py-3 px-4 rounded-xl text-sm outline-none"
            style={{ border: "1px solid #E5E7EB", color: "#111827", background: "#FFFFFF" }}
          />
        </div>

        {/* Room Announcement */}
        <div>
          <label className="text-xs font-bold mb-2 block" style={{ color: "#374151" }}>Room Announcement</label>
          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="Please enter room announcement"
            rows={3}
            className="w-full py-3 px-4 rounded-xl text-sm outline-none resize-none"
            style={{ border: "1px solid #E5E7EB", color: "#111827", background: "#FFFFFF" }}
          />
        </div>

        {/* Room Tags */}
        <div>
          <label className="text-xs font-bold mb-2 block" style={{ color: "#374151" }}>Room Tag</label>
          <div className="flex flex-wrap gap-2">
            {ROOM_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className="py-1.5 px-3.5 rounded-full text-xs font-semibold transition active:scale-95"
                style={selectedTag === tag
                  ? { background: COLORS.tealMid, color: "#FFFFFF", border: `1px solid ${COLORS.tealMid}` }
                  : { background: "#F3F4F6", color: "#6B7280", border: "1px solid #E5E7EB" }
                }
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={handleStart}
          disabled={starting}
          className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition active:scale-95 disabled:opacity-60"
          style={{
            background: `linear-gradient(135deg, ${COLORS.tealMid}, ${COLORS.tealLight})`,
            boxShadow: `0 4px 16px ${COLORS.tealMid}40`,
          }}
        >
          {starting ? "Starting..." : "Start"}
        </button>
      </div>
    </div>
  );
}