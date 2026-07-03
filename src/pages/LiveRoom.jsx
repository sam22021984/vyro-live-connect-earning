import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLiveRoomApi } from "@/hooks/useLiveRoomApi";
import { useLiveRoomData } from "@/hooks/useLiveRoomData";
import { ArrowLeft, Settings, X, AlertTriangle, Trophy, Users, Minimize2, LogOut, Send } from "lucide-react";
import SeatArea from "@/components/live-room/SeatArea";
import SettingsPanel from "@/components/live-room/SettingsPanel";
import SeatProfilePopup from "@/components/live-room/SeatProfilePopup";
import GiftLeaderboard from "@/components/live-room/GiftLeaderboard";
import InteractionPanel from "@/components/live-room/InteractionPanel";
import AnimationLayer from "@/components/live-room/AnimationLayer";
import RoomUserList from "@/components/live-room/RoomUserList";
import { COLORS, ROOM_THEMES, CHAT_MESSAGES, WARNING_TEXT, SEATS, SEAT_POSITIONS, GIFT_CATALOG, EMOJIS_3D } from "@/components/live-room/roomData";
import { useToast } from "@/components/ui/use-toast";

export default function LiveRoom() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id: urlRoomId } = useParams();
  const [sessionId] = useState(() => urlRoomId || (crypto?.randomUUID?.() || `room-${Date.now()}-${Math.random().toString(36).slice(2)}`));
  const roomId = sessionId;
  const { joined, joining, error: joinError, recommendations, aiStats, giftStats, roomScore, audioAction, publishEvent, archiveRoom, backupRoom, requestMic, verifyPayment, runScheduler } = useLiveRoomApi(roomId);
  const { room: liveRoom, chat: supabaseChat, sendChatMessage } = useLiveRoomData(roomId);
  const [themeIndex, setThemeIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [muted, setMuted] = useState(false);
  const [locked, setLocked] = useState(false);
  const [seatCount, setSeatCount] = useState(10);

  // Interaction system state
  const [profileSeatId, setProfileSeatId] = useState(null);
  const [panelType, setPanelType] = useState(null);
  const [panelTargetId, setPanelTargetId] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [animations, setAnimations] = useState([]);
  const [seatEffects, setSeatEffects] = useState([]);
  const [chat, setChat] = useState(CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState("");
  const [showChatInput, setShowChatInput] = useState(false);
  const [tempProfileUser, setTempProfileUser] = useState(null);

  // Sync Supabase chat messages into local chat state
  useEffect(() => {
    if (supabaseChat.length > 0) {
      setChat(supabaseChat);
    }
  }, [supabaseChat]);

  const roomTitle = liveRoom?.name || "Arabian Nights Live";
  const viewerCount = liveRoom?.viewers || 12450;

  const theme = ROOM_THEMES[themeIndex];
  const currentUserSeatId = 0;
  const userRole = "owner";
  const hostUser = SEATS[0].user;

  const profileSeat = SEATS.find((s) => s.id === profileSeatId);

  useEffect(() => {
    if (recommendations.length > 0) {
      toast({ title: "💡 AI Tip", description: recommendations[0] });
    }
  }, [recommendations]);

  const handleSeatClick = (seatId) => {
    const seat = SEATS.find((s) => s.id === seatId);
    if (seat && seat.user) {
      setProfileSeatId(seatId);
    }
  };

  // Open profile for any user object (from user list)
  const handleUserProfile = (userObj) => {
    const seat = SEATS.find((s) => s.user?.name === userObj.name);
    if (seat) {
      setProfileSeatId(seat.id);
      setTempProfileUser(null);
    } else {
      setTempProfileUser(userObj);
      setProfileSeatId(null);
    }
    setShowUserList(false);
  };

  // Use temp user profile or seat-based profile
  const activeProfileSeat = tempProfileUser
    ? { id: 999, role: "audience", user: tempProfileUser }
    : profileSeat;

  const sendGift = (gift, targetSeatId, senderSeatId = currentUserSeatId, senderName = null) => {
    const sender = senderName ? { name: senderName } : SEATS[senderSeatId]?.user || { name: "You" };
    const receiver = SEATS[targetSeatId]?.user;
    if (!receiver) return;

    const animId = Date.now() + Math.random();
    setAnimations((prev) => [...prev, {
      id: animId, type: "gift", icon: gift.icon,
      from: SEAT_POSITIONS[senderSeatId] || SEAT_POSITIONS.audience, to: SEAT_POSITIONS[targetSeatId], duration: 1500,
    }]);

    setTimeout(() => {
      setSeatEffects((prev) => [...prev, { id: Date.now() + Math.random(), seatId: targetSeatId, effect: gift.effect }]);
      setTimeout(() => setSeatEffects((prev) => prev.filter((e) => e.seatId !== targetSeatId)), 2500);
    }, 1300);

    setTimeout(() => setAnimations((prev) => prev.filter((a) => a.id !== animId)), 1500);

    setChat((prev) => [...prev, {
      id: Date.now(), user: sender.name, color: COLORS.gold, vip: true,
      text: `sent ${gift.icon} ${gift.name} ×1 to ${receiver.name}`, time: "now", isGift: true, gift: gift.icon,
    }]);

    if (roomId) {
      publishEvent("gift_sent", { gift: gift.name, target: receiver.name });
      sendChatMessage(`${gift.icon} ${gift.name} ×1 to ${receiver.name}`, sender.name);
    }
  };

  const sendEmoji = (emoji, targetSeatId, senderSeatId = currentUserSeatId, senderName = null) => {
    const sender = senderName ? { name: senderName } : SEATS[senderSeatId]?.user || { name: "You" };
    const receiver = SEATS[targetSeatId]?.user;
    if (!receiver) return;

    const emojiObj = typeof emoji === "string" ? EMOJIS_3D.find((e) => e.emoji === emoji) || { emoji, name: "Emoji", color: COLORS.pink, animation: "fly", id: "custom" } : emoji;

    const animId = Date.now() + Math.random();
    setAnimations((prev) => [...prev, {
      id: animId, type: "emoji", icon: emojiObj.emoji, color: emojiObj.color, animation: emojiObj.animation,
      from: SEAT_POSITIONS[senderSeatId] || SEAT_POSITIONS.audience, to: SEAT_POSITIONS[targetSeatId], duration: 1200,
    }]);

    setTimeout(() => {
      setSeatEffects((prev) => [...prev, { id: Date.now() + Math.random(), seatId: targetSeatId, effect: emojiObj.id === "hammer" ? "hammer" : "emoji_burst" }]);
      setTimeout(() => setSeatEffects((prev) => prev.filter((e) => e.seatId !== targetSeatId)), 2000);
    }, 1000);

    setTimeout(() => setAnimations((prev) => prev.filter((a) => a.id !== animId)), 1200);

    setChat((prev) => [...prev, {
      id: Date.now(), user: sender.name, color: COLORS.pink, vip: false,
      text: `sent ${emojiObj.emoji} ${emojiObj.name} to ${receiver.name}`, time: "now",
    }]);

    if (roomId) {
      publishEvent("emoji_sent", { emoji: emojiObj.emoji, target: receiver.name });
      sendChatMessage(`${emojiObj.emoji} ${emojiObj.name} to ${receiver.name}`, sender.name);
    }
  };

  const handlePanelSendGift = async (gift, targetId) => {
    if (roomId) {
      const payRes = await verifyPayment(gift.price || 0);
      if (payRes?.success === false) { toast({ title: "Payment verification failed", variant: "destructive" }); return; }
    }
    sendGift(gift, targetId);
    setPanelType(null);
    setPanelTargetId(null);
    toast({ title: `Sent ${gift.name} to ${SEATS[targetId]?.user?.name || "user"}! 🎁` });
  };

  const handlePanelSendEmoji = (emoji, targetId) => {
    sendEmoji(emoji, targetId);
    setPanelType(null);
    setPanelTargetId(null);
  };

  const handleQuickEmoji = (seatId, emojiChar) => {
    setProfileSeatId(null);
    sendEmoji(emojiChar, seatId);
  };

  // Handle chat send from inline input
  const handleSendChat = async () => {
    const text = chatInput.trim();
    if (!text) return;
    setChat((prev) => [...prev, {
      id: Date.now(), user: "You", color: COLORS.electricBlue, vip: false, text, time: "now",
    }]);
    await sendChatMessage(text);
    setChatInput("");
    setShowChatInput(false);
  };

  // Simulate audience-to-seat gifts periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const occupied = SEATS.filter((s) => s.user && s.id !== 0);
      if (!occupied.length) return;
      const target = occupied[Math.floor(Math.random() * occupied.length)];
      const gift = GIFT_CATALOG[Math.floor(Math.random() * 3)];
      sendGift(gift, target.id, "audience", "Audience Fan");
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Bottom panel buttons — reordered: Gift, Emoji, Mic, Chat, Ranks, Share
  const bottomButtons = [
    { icon: "🎁", label: "Gift", color: COLORS.gold, action: () => { setPanelType("gift"); setPanelTargetId(null); } },
    { icon: "😀", label: "Emoji", color: "#F59E0B", action: () => { setPanelType("emoji"); setPanelTargetId(null); } },
    { icon: muted ? "🔇" : "🎤", label: muted ? "Muted" : "Mic", color: muted ? COLORS.crimson : COLORS.gold, action: async () => {
      const newMuted = !muted;
      setMuted(newMuted);
      if (roomId) {
        const res = await audioAction(newMuted ? "mute" : "unmute");
        if (res?.success === false) { setMuted(!newMuted); toast({ title: "Audio action failed", variant: "destructive" }); return; }
      }
      toast({ title: newMuted ? "Mic Muted" : "Mic ON" });
    } },
    { icon: "💬", label: "Chat", color: "#3B82F6", action: () => { setShowChatInput(!showChatInput); } },
    { icon: "🏆", label: "Ranks", color: COLORS.purple, action: () => setShowLeaderboard(true) },
    { icon: "📤", label: "Share", color: "#0EA5E9", action: () => toast({ title: "Share Room" }) },
  ];

  const handleExit = () => {
    if (roomId) {
      publishEvent("user_left", {}).catch(() => {});
    }
    navigate(-1);
  };

  const handleMinimize = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: theme.bg }}>
      {/* Radial glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 35%, ${theme.glow}15 0%, transparent 60%)` }} />

      {/* Top header */}
      <div className="absolute top-0 left-0 right-0 z-30 px-3 pt-3 pb-2" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)" }}>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>

          {/* Host avatar — small, clickable to profile */}
          <button onClick={() => setProfileSeatId(0)} className="relative flex-shrink-0 active:scale-95 transition">
            <div className="absolute -inset-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.goldLight}, ${COLORS.goldDark})`, boxShadow: `0 0 8px ${COLORS.gold}60` }} />
            <img src={hostUser.avatar} className="relative w-8 h-8 rounded-full object-cover border-2" style={{ borderColor: COLORS.tealDeep }} alt={hostUser.name} />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
              <span className="text-[8px]">👑</span>
            </div>
          </button>

          {/* Room title */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h1 className="text-xs font-bold text-white truncate">{roomTitle}</h1>
              <span className="text-[7px] font-bold text-white px-1 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})` }}>LV.42</span>
            </div>
            <button onClick={() => setShowUserList(true)} className="flex items-center gap-1 mt-0.5 active:scale-95 transition">
              <Users size={10} className="text-white" />
              <span className="text-[9px] font-bold text-white">{viewerCount.toLocaleString()}</span>
              <span className="text-[8px]" style={{ color: COLORS.softGray }}>members →</span>
            </button>
          </div>

          {/* Trophy */}
          <button onClick={() => setShowLeaderboard(true)} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Trophy size={14} style={{ color: COLORS.gold }} />
          </button>

          {/* Minimize */}
          <button onClick={handleMinimize} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Minimize2 size={14} className="text-white" />
          </button>

          {/* Exit */}
          <button onClick={handleExit} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${COLORS.crimson}20`, backdropFilter: "blur(12px)", border: `1px solid ${COLORS.crimson}40` }}>
            <LogOut size={14} style={{ color: COLORS.crimson }} />
          </button>
        </div>
      </div>

      {/* Animation layer */}
      <AnimationLayer animations={animations} seatEffects={seatEffects} />

      {/* Seat area — pushed up, with proper spacing */}
      <div className="absolute inset-0 flex items-start justify-center pt-14 pb-44 px-2 overflow-y-auto scrollbar-hide">
        <SeatArea onSeatClick={handleSeatClick} seatEffects={seatEffects} seatCount={seatCount} />
      </div>

      {/* Chat overlay */}
      <div className="absolute left-3 right-3 z-20" style={{ bottom: "150px" }}>
        {showWarning && (
          <div className="rounded-2xl p-2.5 mb-2 flex items-start gap-2 animate-fadeIn" style={{ background: COLORS.glassOverlay, backdropFilter: "blur(12px)", border: `1px solid ${COLORS.gold}30` }}>
            <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" style={{ color: COLORS.gold }} />
            <p className="text-[8px] leading-tight flex-1" style={{ color: "rgba(255,255,255,0.7)" }}>{WARNING_TEXT}</p>
            <button onClick={() => setShowWarning(false)} className="flex-shrink-0"><X size={12} style={{ color: COLORS.softGray }} /></button>
          </div>
        )}
        <div className="space-y-1 max-h-24 overflow-y-auto scrollbar-hide">
          {chat.slice(-6).map((msg) => (
            <div key={msg.id} className="flex items-start gap-1.5 animate-fadeIn">
              <div className="rounded-2xl px-2.5 py-1 max-w-[75%]" style={{ background: msg.isSystem ? `${COLORS.gold}15` : msg.isGift ? `${COLORS.gold}20` : "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}>
                <span className="text-[9px] font-bold" style={{ color: msg.color }}>{msg.vip && "👑 "}{msg.user}</span>
                <span className="text-[9px] ml-1" style={{ color: "rgba(255,255,255,0.8)" }}>{msg.isSystem ? "" : ": "}{msg.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat input bar — replaces window.prompt */}
      {showChatInput && (
        <div className="absolute left-3 right-3 z-30 animate-fadeIn" style={{ bottom: "150px" }}>
          <div className="flex items-center gap-2 rounded-2xl px-3 py-2" style={{ background: COLORS.glassOverlay, backdropFilter: "blur(20px)", border: `1px solid ${COLORS.gold}30` }}>
            <input
              autoFocus
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSendChat(); }}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-[11px] text-white placeholder:text-white/40 outline-none"
            />
            <button onClick={handleSendChat} className="w-7 h-7 rounded-full flex items-center justify-center active:scale-90 transition" style={{ background: COLORS.gold }}>
              <Send size={12} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom action panel — positioned above the nav bar */}
      <div className="absolute left-0 right-0 z-30 px-3 pb-2 pt-2" style={{ bottom: "56px", background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}>
        <div className="flex items-center gap-2 rounded-2xl px-3 py-2 mb-2" style={{ background: COLORS.glassOverlay, backdropFilter: "blur(20px)", border: `1px solid ${COLORS.gold}30` }}>
          <span className="text-[10px] font-bold text-white flex-1">✋ Request to Speak</span>
          <button onClick={async () => { if (roomId) { const res = await requestMic(); toast({ title: res?.success ? "Mic request sent ✓" : "Request failed", variant: res?.success ? "default" : "destructive" }); } else { toast({ title: "Mic request sent" }); } }} className="px-2 py-1 rounded-lg text-[9px] font-bold text-white transition active:scale-90" style={{ background: COLORS.gold }}>Request</button>
          <button onClick={() => { setLocked(!locked); toast({ title: locked ? "Room unlocked" : "Room locked" }); }} className="flex items-center gap-1 px-2 py-1 rounded-lg transition active:scale-90" style={{ background: locked ? `${COLORS.gold}20` : "rgba(255,255,255,0.06)" }}>
            <span className="text-[9px] font-bold" style={{ color: locked ? COLORS.gold : COLORS.softGray }}>{locked ? "🔒 Locked" : "🔓 Open"}</span>
          </button>
        </div>

        {/* Bottom bar + Settings button on the right */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center justify-around gap-1 rounded-2xl px-2 py-2" style={{ background: COLORS.glassOverlay, backdropFilter: "blur(24px) saturate(180%)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
            {bottomButtons.map((btn, i) => (
              <button key={i} onClick={btn.action} className="flex flex-col items-center gap-0.5 transition active:scale-90">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${btn.color}15`, border: `1px solid ${btn.color}40` }}>
                  <span className="text-sm">{btn.icon}</span>
                </div>
                <span className="text-[7px] font-bold" style={{ color: btn.color }}>{btn.label}</span>
              </button>
            ))}
          </div>

          {/* Settings button — bottom right */}
          <button onClick={() => setShowSettings(true)} className="flex flex-col items-center gap-0.5 transition active:scale-90 flex-shrink-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${COLORS.gold}20`, border: `1px solid ${COLORS.gold}50`, boxShadow: `0 0 12px ${COLORS.gold}30` }}>
              <Settings size={18} style={{ color: COLORS.gold }} />
            </div>
            <span className="text-[7px] font-bold" style={{ color: COLORS.gold }}>Settings</span>
          </button>
        </div>
      </div>

      {/* Theme switcher */}
      <button onClick={() => setThemeIndex((prev) => (prev + 1) % ROOM_THEMES.length)} className="absolute top-14 right-3 z-20 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: COLORS.glassOverlay, backdropFilter: "blur(8px)", border: `1px solid ${COLORS.gold}30` }}>
        <span className="text-[10px]">🎨</span>
      </button>

      {/* Profile popup */}
      {activeProfileSeat && (
        <SeatProfilePopup
          seat={activeProfileSeat}
          userRole={userRole}
          onClose={() => { setProfileSeatId(null); setTempProfileUser(null); }}
          onSendGift={(seatId) => { setProfileSeatId(null); setTempProfileUser(null); setPanelTargetId(seatId); setPanelType("gift"); }}
          onSendEmoji={(seatId, emoji) => handleQuickEmoji(seatId, emoji)}
          onAction={(action) => { toast({ title: action }); setProfileSeatId(null); setTempProfileUser(null); }}
        />
      )}

      {/* Gift / Emoji panel */}
      {panelType && (
        <InteractionPanel
          type={panelType}
          targetId={panelTargetId}
          onSend={panelType === "gift" ? handlePanelSendGift : handlePanelSendEmoji}
          onClose={() => { setPanelType(null); setPanelTargetId(null); }}
        />
      )}

      {/* Leaderboard */}
      {showLeaderboard && <GiftLeaderboard onClose={() => setShowLeaderboard(false)} />}

      {/* User list */}
      {showUserList && (
        <RoomUserList
          viewerCount={viewerCount}
          onClose={() => setShowUserList(false)}
          onUserClick={handleUserProfile}
        />
      )}

      {/* Settings */}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} onArchive={archiveRoom} onBackup={backupRoom} onScheduler={runScheduler} giftStats={giftStats} roomScore={roomScore} aiStats={aiStats} seatCount={seatCount} onSeatCountChange={setSeatCount} />}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}