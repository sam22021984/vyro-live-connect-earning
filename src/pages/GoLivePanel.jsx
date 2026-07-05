import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, PartyPopper, Users, Swords, Calendar, Dumbbell, Camera, X, ChevronRight, Loader2 } from "lucide-react";
import { ROOM_TAGS, LANGUAGES, TAG_OPTIONS, LIVE_TYPES, DEFAULT_RULES } from "@/components/go-live/goLiveData";
import RoomTypeSelector from "@/components/go-live/RoomTypeSelector";
import SeatLayoutSelector from "@/components/go-live/SeatLayoutSelector";
import BackgroundThemePicker from "@/components/go-live/BackgroundThemePicker";
import EntryEffectPicker from "@/components/go-live/EntryEffectPicker";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const ICON_MAP = { Mic, PartyPopper, Users, Swords, Calendar, Dumbbell };

export default function GoLivePanel() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user: me } = useAuth();
  const [selectedType, setSelectedType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [starting, setStarting] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Music");
  const [language, setLanguage] = useState("English");
  const [tags, setTags] = useState([]);
  const [coverUrl, setCoverUrl] = useState("");
  const [roomType, setRoomType] = useState("public");
  const [password, setPassword] = useState("");
  const [ticketPrice, setTicketPrice] = useState(50);
  const [seatCount, setSeatCount] = useState(10);
  const [bgTheme, setBgTheme] = useState("teal_deep");
  const [entryEffect, setEntryEffect] = useState("none");
  const [roomRules, setRoomRules] = useState(DEFAULT_RULES);
  const [giftsOn, setGiftsOn] = useState(true);
  const [chatOn, setChatOn] = useState(true);
  const [recordingOn, setRecordingOn] = useState(false);
  const [ageRestricted, setAgeRestricted] = useState(false);

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

  const toggleTag = (tag) => setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);

  const handleStart = async () => {
    if (!title.trim()) return toast({ title: "Please enter a room title", variant: "destructive" });
    if (roomType === "password" && !password.trim()) return toast({ title: "Please set a password", variant: "destructive" });
    if (roomType === "ticket" && (!ticketPrice || ticketPrice <= 0)) return toast({ title: "Please set a ticket price", variant: "destructive" });

    setStarting(true);
    try {
      let profile = null;
      try {
        const profiles = await base44.entities.UserProfile.filter({ user_id: me.id });
        profile = profiles[0];
      } catch {}

      const res = await base44.functions.invoke("createLiveRoom", {
        title: title.trim(),
        description: description.trim(),
        category,
        language,
        cover: coverUrl,
        tags,
        live_type: selectedType,
        room_type: roomType,
        password: roomType === "password" ? password : undefined,
        ticket_price_coins: roomType === "ticket" ? ticketPrice : 0,
        seat_count: seatCount,
        background_theme: bgTheme,
        entry_effect: entryEffect,
        room_rules: roomRules.trim(),
        gifts_enabled: giftsOn,
        chat_enabled: chatOn,
        recording_enabled: recordingOn,
        age_restricted: ageRestricted,
        country: profile?.country || "Global",
        host_name: profile?.username || me?.full_name || "Host",
        host_avatar: profile?.avatar_url || "",
        host_vip: profile?.is_vip ? "VIP" : "",
      });

      if (res?.data?.error) throw new Error(res.data.error);

      toast({ title: "Going Live! 🎉" });
      navigate(`/live-room/${res.data.room_id}`);
    } catch (err) {
      const backendError = err.response?.data?.error || err.message;
      const existingRoomId = err.response?.data?.existing_room_id;
      if (existingRoomId) {
        toast({
          title: "You already have a live room",
          description: "Rejoining your active room…",
        });
        navigate(`/live-room/${existingRoomId}`);
      } else {
        toast({ title: "Failed to go live", description: backendError, variant: "destructive" });
      }
      setStarting(false);
    }
  };

  const Toggle = ({ on, onClick }) => (
    <button onClick={onClick} className={`w-11 h-6 rounded-full transition relative ${on ? "bg-purple-500" : "bg-gray-200"}`}>
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );

  const Label = ({ children }) => <label className="text-xs font-bold text-gray-600 mb-2 block">{children}</label>;

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
          <h1 className="text-base font-bold text-gray-800">{showForm ? "Create Live Room" : "Go Live"}</h1>
        </div>

        {!showForm ? (
          <div className="p-4 space-y-3">
            <p className="text-xs font-medium text-gray-500 mb-1">Choose a live type</p>
            {LIVE_TYPES.map((type) => {
              const Icon = ICON_MAP[type.icon] || Mic;
              return (
                <button key={type.id} onClick={() => { setSelectedType(type.id); setShowForm(true); }}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white border border-gray-50 shadow-sm active:scale-[0.98] transition text-left">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${type.color}15` }}>
                    <Icon size={22} style={{ color: type.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">{type.label}</p>
                    <p className="text-[10px] text-gray-400">{type.desc}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-4 space-y-5 pb-24">
            {/* Selected type */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-50">
              {(() => { const t = LIVE_TYPES.find((x) => x.id === selectedType); const Icon = ICON_MAP[t.icon] || Mic; return (<><Icon size={18} style={{ color: t.color }} /><span className="text-xs font-bold text-purple-700">{t.label}</span></>); })()}
            </div>

            {/* Cover */}
            <div>
              <Label>Cover Image</Label>
              <label className="w-full aspect-[16/9] rounded-2xl flex flex-col items-center justify-center gap-2 transition active:scale-95 cursor-pointer border-2 border-dashed border-gray-200 bg-gray-50">
                {coverUrl ? <img src={coverUrl} alt="" className="w-full h-full rounded-2xl object-cover" /> : (
                  <><div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><Camera size={22} className="text-gray-500" /></div><span className="text-xs font-semibold text-gray-500">Upload Cover</span></>
                )}
                <input type="file" accept="image/*" onChange={handleUploadCover} className="hidden" />
              </label>
            </div>

            {/* Title */}
            <div>
              <Label>Room Title *</Label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter room title" className="w-full py-3 px-4 rounded-xl text-sm outline-none border border-gray-200 bg-white text-gray-800" />
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your room..." rows={2} className="w-full py-3 px-4 rounded-xl text-sm outline-none border border-gray-200 bg-white text-gray-800 resize-none" />
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <div className="flex flex-wrap gap-2">
                {ROOM_TAGS.map((tag) => (
                  <button key={tag} onClick={() => setCategory(tag)} className={`py-1.5 px-3.5 rounded-full text-xs font-semibold transition active:scale-95 ${category === tag ? "bg-purple-500 text-white border border-purple-500" : "bg-gray-50 text-gray-500 border border-gray-200"}`}>{tag}</button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <Label>Language</Label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full py-3 px-4 rounded-xl text-sm outline-none border border-gray-200 bg-white text-gray-800">
                {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            {/* Tags */}
            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {TAG_OPTIONS.map((tag) => (
                  <button key={tag} onClick={() => toggleTag(tag)} className={`py-1.5 px-3.5 rounded-full text-xs font-semibold transition active:scale-95 ${tags.includes(tag) ? "bg-blue-500 text-white border border-blue-500" : "bg-gray-50 text-gray-500 border border-gray-200"}`}>#{tag}</button>
                ))}
              </div>
            </div>

            {/* Room Type */}
            <div>
              <Label>Room Type</Label>
              <RoomTypeSelector value={roomType} onChange={setRoomType} />
            </div>

            {/* Conditional fields */}
            {roomType === "password" && (
              <div>
                <Label>Room Password *</Label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Set a password" className="w-full py-3 px-4 rounded-xl text-sm outline-none border border-gray-200 bg-white text-gray-800" />
              </div>
            )}
            {roomType === "ticket" && (
              <div>
                <Label>Ticket Price (coins) *</Label>
                <input type="number" value={ticketPrice} onChange={(e) => setTicketPrice(Number(e.target.value))} min="1" className="w-full py-3 px-4 rounded-xl text-sm outline-none border border-gray-200 bg-white text-gray-800" />
              </div>
            )}

            {/* Seat Layout */}
            <div>
              <Label>Seat Layout</Label>
              <SeatLayoutSelector value={seatCount} onChange={setSeatCount} />
            </div>

            {/* Background Theme */}
            <div>
              <Label>Background Theme</Label>
              <BackgroundThemePicker value={bgTheme} onChange={setBgTheme} />
            </div>

            {/* Entry Effect */}
            <div>
              <Label>Entry Effects</Label>
              <EntryEffectPicker value={entryEffect} onChange={setEntryEffect} />
            </div>

            {/* Room Rules */}
            <div>
              <Label>Room Rules</Label>
              <textarea value={roomRules} onChange={(e) => setRoomRules(e.target.value)} rows={2} className="w-full py-3 px-4 rounded-xl text-sm outline-none border border-gray-200 bg-white text-gray-800 resize-none" />
            </div>

            {/* Settings */}
            <div className="rounded-2xl bg-white border border-gray-50 shadow-sm divide-y divide-gray-50">
              <div className="flex items-center justify-between p-3"><span className="text-xs font-medium text-gray-700">Age Restriction (18+)</span><Toggle on={ageRestricted} onClick={() => setAgeRestricted(!ageRestricted)} /></div>
              <div className="flex items-center justify-between p-3"><span className="text-xs font-medium text-gray-700">Gifts Enabled</span><Toggle on={giftsOn} onClick={() => setGiftsOn(!giftsOn)} /></div>
              <div className="flex items-center justify-between p-3"><span className="text-xs font-medium text-gray-700">Chat Enabled</span><Toggle on={chatOn} onClick={() => setChatOn(!chatOn)} /></div>
              <div className="flex items-center justify-between p-3"><span className="text-xs font-medium text-gray-700">Recording</span><Toggle on={recordingOn} onClick={() => setRecordingOn(!recordingOn)} /></div>
            </div>

            {/* Start button */}
            <button onClick={handleStart} disabled={starting} className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2" style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)", boxShadow: "0 4px 16px rgba(139,92,246,0.4)" }}>
              {starting ? <><Loader2 size={16} className="animate-spin" /> Validating & Creating…</> : "Go Live"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}