import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useLiveRoomApi } from "@/hooks/useLiveRoomApi";
import { useLiveRoomData } from "@/hooks/useLiveRoomData";
import { useAuth } from "@/lib/AuthContext";
import { ArrowLeft, Settings, X, Power, Trophy, Users, Send } from "lucide-react";
import SeatArea from "@/components/live-room/SeatArea";
import SettingsPanel from "@/components/live-room/SettingsPanel";
import SeatProfilePopup from "@/components/live-room/SeatProfilePopup";
import GiftLeaderboard from "@/components/live-room/GiftLeaderboard";
import InteractionPanel from "@/components/live-room/InteractionPanel";
import AnimationLayer from "@/components/live-room/AnimationLayer";
import RoomUserList from "@/components/live-room/RoomUserList";
import MessageArea from "@/components/live-room/MessageArea";
import BottomNav from "@/components/live-room/BottomNav";
import { COLORS, ROOM_THEMES, WARNING_TEXT, SEAT_POSITIONS, GIFT_CATALOG, EMOJIS_3D } from "@/components/live-room/roomData";
import { useToast } from "@/components/ui/use-toast";

export default function LiveRoom() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const { id: urlRoomId } = useParams();
  const [sessionId] = useState(() => urlRoomId || (crypto?.randomUUID?.() || `room-${Date.now()}-${Math.random().toString(36).slice(2)}`));
  const roomId = sessionId;
  const { joined, joining, error: joinError, recommendations, aiStats, giftStats, roomScore, audioAction, publishEvent, archiveRoom, backupRoom, requestMic, verifyPayment, runScheduler } = useLiveRoomApi(roomId);
  const [seatCount, setSeatCount] = useState(10);
  const { room: liveRoom, chat: supabaseChat, seats, audience, sendChatMessage } = useLiveRoomData(roomId, seatCount, currentUser?.id);
  const [themeIndex, setThemeIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [muted, setMuted] = useState(false);
  const [locked, setLocked] = useState(false);

  // Interaction system state
  const [profileSeatId, setProfileSeatId] = useState(null);
  const [panelType, setPanelType] = useState(null);
  const [panelTargetId, setPanelTargetId] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [animations, setAnimations] = useState([]);
  const [seatEffects, setSeatEffects] = useState([]);
  const [chat, setChat] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [showChatInput, setShowChatInput] = useState(false);
  const [tempProfileUser, setTempProfileUser] = useState(null);
  const [lastSentGift, setLastSentGift] = useState(null);

  // Refs for dynamic seat positioning — replaces static SEAT_POSITIONS
  const containerRef = useRef(null);
  const seatRefs = useRef({});

  const registerSeatRef = useCallback((seatId, el) => {
    if (el) seatRefs.current[seatId] = el;
    else delete seatRefs.current[seatId];
  }, []);

  // Compute real seat position as {x, y} percentages relative to the room container
  const getSeatPosition = useCallback((seatId) => {
    if (seatId === "audience") return { x: 50, y: 92 };
    const el = seatRefs.current[seatId];
    const container = containerRef.current;
    if (!el || !container) return SEAT_POSITIONS[seatId] || { x: 50, y: 50 };
    const seatRect = el.getBoundingClientRect();
    const contRect = container.getBoundingClientRect();
    const x = ((seatRect.left + seatRect.width / 2 - contRect.left) / contRect.width) * 100;
    const y = ((seatRect.top + seatRect.height / 2 - contRect.top) / contRect.height) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  }, []);

  // Merge Supabase chat messages into local chat — keep local seed messages, add new supabase ones
  useEffect(() => {
    if (supabaseChat.length > 0) {
      setChat((prev) => {
        const localIds = new Set(prev.map((m) => m.id));
        const newMsgs = supabaseChat.filter((m) => !localIds.has(m.id));
        if (newMsgs.length === 0) return prev;
        return [...prev, ...newMsgs];
      });
    }
  }, [supabaseChat]);

  const roomTitle = liveRoom?.name || "Arabian Nights Live";
  const realMemberCount = seats.filter((s) => s.user).length + audience.length;
  const viewerCount = realMemberCount > 0 ? realMemberCount : (liveRoom?.viewers || 1);

  const theme = ROOM_THEMES[themeIndex];
  const currentUserSeatId = seats.find((s) => s.user?.user_id === currentUser?.id)?.id ?? 0;
  const hostUser = seats[0]?.user || (liveRoom?.host ? {
    name: liveRoom.host.name || "Host",
    avatar: liveRoom.host.avatar || "",
    vip: liveRoom.host.vip || null,
    level: 1, speaking: false, muted: false, country: "", vyro_id: "",
    agency: null, is_host: true, followers: 0, following: 0, is_online: true,
    user_id: liveRoom.created_by_id || "",
  } : { name: "Host", avatar: "", vip: null, level: 1, speaking: false, muted: false, country: "", vyro_id: "", agency: null, is_host: true, followers: 0, following: 0, is_online: true, user_id: "" });

  // Determine the current user's role in this room
  const [userRole, setUserRole] = useState("viewer");
  useEffect(() => {
    if (!liveRoom || !currentUser?.id) return;
    // Owner = room creator
    if (liveRoom.created_by_id === currentUser.id) {
      setUserRole("owner");
      return;
    }
    // Check RoomParticipant for host/admin/co_host role
    base44.entities.RoomParticipant.filter({ room_id: roomId, user_id: currentUser.id })
      .then((participants) => {
        const p = participants?.[0];
        if (p?.role === "host") {
          setUserRole("owner");
        } else if (p && (p.role === "admin" || p.role === "co_host" || p.role === "moderator")) {
          setUserRole("admin");
        } else {
          setUserRole("viewer");
        }
      })
      .catch(() => setUserRole("viewer"));
  }, [liveRoom?.id, liveRoom?.created_by_id, currentUser?.id, roomId]);

  const profileSeat = seats.find((s) => s.id === profileSeatId);

  useEffect(() => {
    if (recommendations.length > 0) {
      toast({ title: "💡 AI Tip", description: recommendations[0] });
    }
  }, [recommendations]);

  const handleSeatClick = (seatId) => {
    const seat = seats.find((s) => s.id === seatId);
    if (seat && seat.user) {
      setProfileSeatId(seatId);
    }
  };

  // Open profile for any user object (from user list)
  const handleUserProfile = (userObj) => {
    const seat = seats.find((s) => s.user?.name === userObj.name);
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
    const sender = senderName ? { name: senderName } : seats[senderSeatId]?.user || { name: "You" };
    const receiver = seats[targetSeatId]?.user;
    if (!receiver) return;

    const animId = Date.now() + Math.random();
    setAnimations((prev) => [...prev, {
      id: animId, type: "gift", icon: gift.icon,
      from: getSeatPosition(senderSeatId), to: getSeatPosition(targetSeatId), duration: 1500,
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
    const sender = senderName ? { name: senderName } : seats[senderSeatId]?.user || { name: "You" };
    const receiver = seats[targetSeatId]?.user;
    if (!receiver) return;

    const emojiObj = typeof emoji === "string" ? EMOJIS_3D.find((e) => e.emoji === emoji) || { emoji, name: "Emoji", color: COLORS.pink, animation: "fly", id: "custom" } : emoji;

    const animId = Date.now() + Math.random();
    setAnimations((prev) => [...prev, {
      id: animId, type: "emoji", icon: emojiObj.emoji, color: emojiObj.color, animation: emojiObj.animation,
      from: getSeatPosition(senderSeatId), to: getSeatPosition(targetSeatId), duration: 1200,
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

  const handlePanelSendGift = async (gift, targetId, quantity = 1) => {
    const receiver = seats[targetId]?.user;
    if (!receiver) return;
    try {
      const res = await base44.functions.invoke("sendGift", {
        recipient_id: gift.recipient_id || receiver.vyro_id || targetId,
        recipient_name: gift.recipient_name || receiver.name,
        gift_name: gift.name,
        gift_icon: gift.icon,
        price_coins: gift.price || 0,
        quantity,
      });
      const result = res.data || res;
      if (result.error) { toast({ title: result.error, variant: "destructive" }); return; }
    } catch (err) {
      // Fallback: still do animation if backend fails (demo mode)
    }
    sendGift(gift, targetId);
    setLastSentGift({ gift, targetId });
  };

  const handlePanelSendEmoji = (emoji, targetId) => {
    sendEmoji(emoji, targetId);
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
      const occupied = seats.filter((s) => s.user && s.id !== 0);
      if (!occupied.length) return;
      const target = occupied[Math.floor(Math.random() * occupied.length)];
      const gift = GIFT_CATALOG[Math.floor(Math.random() * 3)];
      sendGift(gift, target.id, "audience", "Audience Fan");
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleMicToggle = async () => {
    const newMuted = !muted;
    setMuted(newMuted);
    if (roomId) {
      const res = await audioAction(newMuted ? "mute" : "unmute");
      if (res?.success === false) { setMuted(!newMuted); toast({ title: "Audio action failed", variant: "destructive" }); return; }
    }
    toast({ title: newMuted ? "Mic Muted" : "Mic ON" });
  };

  const handleExit = () => {
    if (roomId) {
      publishEvent("user_left", {}).catch(() => {});
    }
    navigate(-1);
  };

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden flex flex-col" style={{ background: theme.bg }}>
      {/* Radial glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 35%, ${theme.glow}15 0%, transparent 60%)` }} />

      {/* Animation layer */}
      <AnimationLayer animations={animations} seatEffects={seatEffects} getSeatPosition={getSeatPosition} />

      {/* ===== Top Header — 56-64dp ===== */}
      <div className="relative z-30 flex-shrink-0" style={{ height: "60px", padding: "8px 16px" }}>
        <div className="flex items-center justify-between h-full">
          {/* Left: Profile pill */}
          <button
            onClick={() => setProfileSeatId(0)}
            className="flex items-center gap-2 rounded-full active:scale-95 transition"
            style={{
              background: "#0A2A2D",
              border: `1px solid ${COLORS.gold}40`,
              padding: "4px 10px 4px 4px",
            }}
          >
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.goldLight}, ${COLORS.goldDark})` }} />
              <img src={hostUser.avatar} className="relative w-7 h-7 rounded-full object-cover border" style={{ borderColor: COLORS.tealDeep }} alt={hostUser.name} />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-bold text-white leading-tight">{hostUser.name}</span>
              <span className="text-[7px]" style={{ color: COLORS.softGray }}>ID: 150077</span>
            </div>
          </button>

          {/* Right: Trophy + Members + Exit */}
          <div className="flex items-center" style={{ gap: "8px" }}>
            {/* Trophy */}
            <button onClick={() => setShowLeaderboard(true)} className="flex items-center gap-1 active:scale-95 transition">
              <Trophy size={16} style={{ color: COLORS.gold }} />
              <span className="text-[10px] font-bold" style={{ color: COLORS.gold }}>0</span>
            </button>

            {/* Members count */}
            <button onClick={() => setShowUserList(true)} className="flex items-center gap-1 active:scale-95 transition">
              <Users size={12} className="text-white" />
              <span className="text-[9px] font-bold text-white">{viewerCount.toLocaleString()}</span>
            </button>

            {/* Exit — power button */}
            <button onClick={handleExit} className="flex items-center justify-center active:scale-90 transition" style={{ width: 32, height: 32, borderRadius: "50%", background: "#0A2A2D", border: `1px solid ${COLORS.gold}40` }}>
              <Power size={14} style={{ color: "#4ADE80" }} />
            </button>
          </div>
        </div>
      </div>

      {/* ===== Seat Grid — upper-mid ===== */}
      <div className="relative z-10 flex-shrink-0 flex items-center justify-start" style={{ padding: "0 16px", flex: "0 0 auto" }}>
        <SeatArea seats={seats} onSeatClick={handleSeatClick} seatEffects={seatEffects} registerSeatRef={registerSeatRef} />
      </div>

      {/* ===== Message Area — tabs + warning + chat (flexible, moves with seat count) ===== */}
      <div className="relative z-20 flex-1 min-h-0 flex flex-col justify-end" style={{ padding: "0 16px" }}>
        <MessageArea
          chat={chat}
          showWarning={showWarning}
          onCloseWarning={() => setShowWarning(false)}
          onChatClick={() => setShowChatInput(!showChatInput)}
        />
      </div>

      {/* Chat input bar */}
      {showChatInput && (
        <div className="relative z-30 animate-fadeIn" style={{ padding: "6px 16px" }}>
          <div className="flex items-center gap-2 rounded-2xl px-3 py-2" style={{ background: "#0A2A2D", border: `1px solid ${COLORS.gold}40` }}>
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

      {/* ===== Bottom Nav — reference style 6 buttons ===== */}
      <div className="relative z-30 flex-shrink-0 safe-bottom" style={{ padding: "8px 16px" }}>
        <BottomNav
          muted={muted}
          onChatClick={() => setShowChatInput(!showChatInput)}
          onGiftClick={() => { setPanelType("gift"); setPanelTargetId(null); }}
          onEmojiClick={() => { setPanelType("emoji"); setPanelTargetId(null); }}
          onMicToggle={handleMicToggle}
          onMenuClick={() => setShowSettings(true)}
        />
      </div>

      {/* Profile popup */}
      {activeProfileSeat && (
        <SeatProfilePopup
          seat={activeProfileSeat}
          userRole={userRole === "owner" ? "owner" : userRole === "admin" ? "admin" : "audience"}
          onClose={() => { setProfileSeatId(null); setTempProfileUser(null); }}
          onSendGift={(seatId) => { setProfileSeatId(null); setTempProfileUser(null); setPanelTargetId(seatId); setPanelType("gift"); }}
          onSendEmoji={(seatId, emoji) => handleQuickEmoji(seatId, emoji)}
          onAction={(action) => { toast({ title: action }); setProfileSeatId(null); setTempProfileUser(null); }}
        />
      )}

      {/* Quick-resend button — shows after sending a gift, right side floating */}
      {lastSentGift && !panelType && (
        <button
          onClick={() => handlePanelSendGift(lastSentGift.gift, lastSentGift.targetId)}
          className="absolute right-3 z-40 w-11 h-11 rounded-full flex items-center justify-center active:scale-90 transition animate-fadeIn"
          style={{
            bottom: "80px",
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})`,
            boxShadow: `0 4px 16px ${COLORS.gold}50`,
            border: `1px solid ${COLORS.goldLight}60`,
          }}
        >
          <span className="text-lg">{lastSentGift.gift.icon}</span>
        </button>
      )}

      {/* Gift / Emoji panel */}
      {panelType && (
        <InteractionPanel
          type={panelType}
          targetId={panelTargetId}
          seats={seats}
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
          seats={seats}
          audience={audience}
          onClose={() => setShowUserList(false)}
          onUserClick={handleUserProfile}
        />
      )}

      {/* Settings */}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} onArchive={archiveRoom} onBackup={backupRoom} onScheduler={runScheduler} giftStats={giftStats} roomScore={roomScore} aiStats={aiStats} seatCount={seatCount} onSeatCountChange={setSeatCount} userRole={userRole} />}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}