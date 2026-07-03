import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Video, Mic, PartyPopper, Users, Swords, Calendar, Dumbbell, Camera, X, ChevronRight } from "lucide-react";
import { COLORS, ROOM_TAGS } from "@/components/live-room/roomData";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

const LIVE_TYPES = [
  { id: "video", label: "Video Live", desc: "Go live with your camera", icon: Video, color: "#8B5CF6" },
  { id: "audio", label: "Audio Live", desc: "Start a voice chat room", icon: Mic, color: "#3B82F6" },
  { id: "party", label: "Party Room", desc: "Multi-guest party room", icon: PartyPopper, color: "#EC4899" },
  { id: "multi", label: "Multi-Guest", desc: "Invite multiple guests on screen", icon: Users, color: "#10B981" },
  { id: "pk", label: "PK Live", desc: "Battle another host live", icon: Swords, color: "#F59E0B" },
  { id: "schedule", label: "Schedule Live", desc: "Plan a future live session", icon: Calendar, color: "#06B6D4" },
  { id: "practice", label: "Practice Live", desc: "Practice mode (hosts only)", icon: Dumbbell, color: "#6366F1" },
];

const LANGUAGES = ["English", "Arabic", "Urdu", "Hindi", "Turkish", "Bengali", "Indonesian", "Malay"];

export default function GoLivePanel() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Music");
  const [language, setLanguage] = useState("English");
  const [tags, setTags] = useState([]);
  const [audience, setAudience] = useState("Public");
  const [password, setPassword] = useState("");
  const [ageRestricted, setAgeRestricted] = useState(false);
  const [commentsOn, setCommentsOn] = useState(true);
  const [giftsOn, setGiftsOn] = useState(true);
  const [recordingOn, setRecordingOn] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [coverUrl, setCoverUrl] = useState("");
  const [starting, setStarting] = useState(false);

  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId);
    setShowForm(true);
  };

  const handleUploadCover = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setCoverUrl(file_url);
    } catch {
      toast({ title: "Upload failed", variant: "destructive" });
    }
  };

  const toggleTag = (tag) => {
    setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const handleStart = async () => {
    if (!title.trim()) {
      toast({ title: "Please enter a live title", variant: "destructive" });
      return;
    }
    if (audience === "Private" && !password.trim()) {
      toast({ title: "Please set a password for private room", variant: "destructive" });
      return;
    }

    setStarting(true);
    try {
      const me = await base44.auth.me();
      let profile = null;
      try {
        const profiles = await base44.entities.UserProfile.filter({ user_id: me.id });
        profile = profiles[0];
      } catch {}

      const typeMeta = LIVE_TYPES.find((t) => t.id === selectedType);
      const roomCategory = selectedType === "audio" ? "Audio" : selectedType === "party" ? "Party" : category;

      const room = await base44.entities.PartyRoom.create({
        name: title.trim(),
        description: tags.join(", "),
        category: roomCategory,
        language,
        country: profile?.country || "Global",
        country_name: profile?.country || "Global",
        host: {
          name: profile?.username || me.full_name || "You",
          avatar: profile?.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
          vip: profile?.is_vip ? "VIP" : "",
        },
        viewers: 1,
        members: 1,
        status: "live",
        cover: coverUrl || `https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400`,
        trending: false,
        recommended: false,
        rank: 0,
      });

      // Also create a RoomSession for the live session
      try {
        await base44.entities.RoomSession.create({
          room_id: room.id,
          host_id: me.id,
          host_name: profile?.username || me.full_name || "You",
          host_avatar: profile?.avatar_url,
          status: "live",
          started_at: new Date().toISOString(),
          current_viewers: 1,
          peak_viewers: 1,
          category: roomCategory,
          country: profile?.country,
          host_share_pct: 40,
          platform_share_pct: 30,
          agency_share_pct: 20,
          agent_share_pct: 10,
        });
      } catch {}

      toast({ title: "Going Live! 🎉" });
      navigate(`/live-room/${room.id}`);
    } catch (err) {
      toast({ title: "Failed to go live", description: err.message, variant: "destructive" });
      setStarting(false);
    }
  };

  const Toggle = ({ on, onClick }) => (
    <button
      onClick={onClick}
      className={`w-11 h-6 rounded-full transition relative ${on ? "bg-purple-500" : "bg-gray-200"}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-gray-50 px-4 pt-12 pb-3 flex items-center gap-3">
          {showForm ? (
            <button onClick={() => { setShowForm(false); setSelectedType(null); }} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-90">
              <ArrowLeft size={18} className="text-gray-700" />
            </button>
          ) : (
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-90">
              <X size={18} className="text-gray-700" />
            </button>
          )}
          <h1 className="text-base font-bold text-gray-800">{showForm ? "Create Live" : "Go Live"}</h1>
        </div>

        {!showForm ? (
          /* Live type selection */
          <div className="p-4 space-y-3">
            <p className="text-xs font-medium text-gray-500 mb-1">Choose a live type</p>
            {LIVE_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white border border-gray-50 shadow-sm active:scale-[0.98] transition text-left"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${type.color}15` }}>
                  <type.icon size={22} style={{ color: type.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">{type.label}</p>
                  <p className="text-[10px] text-gray-400">{type.desc}</p>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            ))}
          </div>
        ) : (
          /* Live creation form */
          <div className="p-4 space-y-5">
            {/* Selected type indicator */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-50">
              {(() => {
                const t = LIVE_TYPES.find((x) => x.id === selectedType);
                return (
                  <>
                    <t.icon size={18} style={{ color: t.color }} />
                    <span className="text-xs font-bold text-purple-700">{t.label}</span>
                  </>
                );
              })()}
            </div>

            {/* Cover image */}
            <div>
              <label className="text-xs font-bold text-gray-600 mb-2 block">Cover Image</label>
              <label className="w-full aspect-[16/9] rounded-2xl flex flex-col items-center justify-center gap-2 transition active:scale-95 cursor-pointer border-2 border-dashed border-gray-200 bg-gray-50">
                {coverUrl ? (
                  <img src={coverUrl} alt="" className="w-full h-full rounded-2xl object-cover" />
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <Camera size={22} className="text-gray-500" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500">Upload Cover</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleUploadCover} className="hidden" />
              </label>
            </div>

            {/* Title */}
            <div>
              <label className="text-xs font-bold text-gray-600 mb-2 block">Live Title *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your live title"
                className="w-full py-3 px-4 rounded-xl text-sm outline-none border border-gray-200 bg-white text-gray-800"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-bold text-gray-600 mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {ROOM_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setCategory(tag)}
                    className={`py-1.5 px-3.5 rounded-full text-xs font-semibold transition active:scale-95 ${
                      category === tag ? "bg-purple-500 text-white border border-purple-500" : "bg-gray-50 text-gray-500 border border-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="text-xs font-bold text-gray-600 mb-2 block">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full py-3 px-4 rounded-xl text-sm outline-none border border-gray-200 bg-white text-gray-800"
              >
                {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="text-xs font-bold text-gray-600 mb-2 block">Tags</label>
              <div className="flex flex-wrap gap-2">
                {["Music", "Gaming", "Chat", "Funny", "Trending", "New"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`py-1.5 px-3.5 rounded-full text-xs font-semibold transition active:scale-95 ${
                      tags.includes(tag) ? "bg-blue-500 text-white border border-blue-500" : "bg-gray-50 text-gray-500 border border-gray-200"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Audience type */}
            <div>
              <label className="text-xs font-bold text-gray-600 mb-2 block">Audience Type</label>
              <div className="flex gap-2">
                {["Public", "Friends", "Private"].map((a) => (
                  <button
                    key={a}
                    onClick={() => setAudience(a)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition active:scale-95 ${
                      audience === a ? "bg-purple-500 text-white" : "bg-gray-50 text-gray-500"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Password (if private) */}
            {audience === "Private" && (
              <div>
                <label className="text-xs font-bold text-gray-600 mb-2 block">Room Password *</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Set a password"
                  className="w-full py-3 px-4 rounded-xl text-sm outline-none border border-gray-200 bg-white text-gray-800"
                />
              </div>
            )}

            {/* Settings toggles */}
            <div className="rounded-2xl bg-white border border-gray-50 shadow-sm divide-y divide-gray-50">
              <div className="flex items-center justify-between p-3">
                <span className="text-xs font-medium text-gray-700">Age Restriction (18+)</span>
                <Toggle on={ageRestricted} onClick={() => setAgeRestricted(!ageRestricted)} />
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-xs font-medium text-gray-700">Comments</span>
                <Toggle on={commentsOn} onClick={() => setCommentsOn(!commentsOn)} />
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-xs font-medium text-gray-700">Gifts</span>
                <Toggle on={giftsOn} onClick={() => setGiftsOn(!giftsOn)} />
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-xs font-medium text-gray-700">Recording</span>
                <Toggle on={recordingOn} onClick={() => setRecordingOn(!recordingOn)} />
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-xs font-medium text-gray-700">Show Location</span>
                <Toggle on={showLocation} onClick={() => setShowLocation(!showLocation)} />
              </div>
            </div>

            {/* Start button */}
            <button
              onClick={handleStart}
              disabled={starting}
              className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition active:scale-95 disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                boxShadow: "0 4px 16px rgba(139,92,246,0.4)",
              }}
            >
              {starting ? "Starting..." : "Start Live"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}