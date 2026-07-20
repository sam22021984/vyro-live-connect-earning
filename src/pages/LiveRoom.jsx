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
import PostLiveSummary from "@/components/live-room/PostLiveSummary";
import { COLORS, ROOM_THEMES, WARNING_TEXT, SEAT_POSITIONS, GIFT_CATALOG, EMOJIS_3D } from "@/components/live-room/roomData";
import { useToast } from "@/components/ui/use-toast";

import { backendGateway } from "@/lib/backendGateway";
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
  const [summary, setSummary] = useState(null);
  const [endingRoom, setEndingRoom] = useState(false);
  const [joinBlock, setJoinBlock] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [joiningRoom, setJoiningRoom] = useState(true);

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

  // Join security check — call joinLiveRoom on mount
  useEffect(() => {
    if (!roomId || !currentUser?.id) return;
    let cancelled = false;
    setJoiningRoom(true);

    const attemptJoin = (pw) => {
      base44.functions.invoke("joinLiveRoom", { room_id: roomId, password: pw })
        .then((res) => {
          if (cancelled) return;
          const data = res.data || res;
          if (data.error) {
            if (data.require_password) {
              setJoinBlock({ type: 'password', message: data.error });
            } else if (data.require_ticket) {
              setJoinBlock({ type: 'ticket', message: data.error, price: data.ticket_price });
            } else if (data.require_vip) {
              setJoinBlock({ type: 'vip', message: data.error });
            } else if (data.require_follow) {
              setJoinBlock({ type: 'follow', message: data.error });
            } else if (data.require_friend) {
              setJoinBlock({ type: 'friend', message: data.error });
            } else if (data.require_agency) {
              setJoinBlock({ type: 'agency', message: data.error });
            } else if (data.blocked) {
              setJoinBlock({ type: 'banned', message: data.error });
            } else {
              setJoinBlock({ type: 'denied', message: data.error });
            }
            setJoiningRoom(false);
          } else {
            setJoinBlock(null);
            setJoiningRoom(false);
            // Backend confirms owner identity from authenticated user_id
            if (data.is_owner) {
              setUserRole("owner");
            }
          }
        })
        .catch(() => {
          if (cancelled) return;
          // Backend error — allow entry in demo mode
          setJoinBlock(null);
          setJoiningRoom(false);
        });
    };

    attemptJoin();
    // Store for password retry
    window.__retryJoin = attemptJoin;

    return () => { cancelled = true; };
  }, [roomId, currentUser?.id]);

  const handlePasswordSubmit = () => {
    if (window.__retryJoin) window.__retryJoin(passwordInput);
  };

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

  // Determine the current user's role in this room.
  // Owner identity is verified from the room's owner_id field (set
  // server-side from the authenticated user_id), NOT from frontend state.
  // Falls back to created_by_id / host_id for rooms created before owner_id.
  const [userRole, setUserRole] = useState("viewer");
  useEffect(() => {
    if (!liveRoom || !currentUser?.id) return;
    // Owner = room creator (checked first — authoritative source)
    const isOwner =
      liveRoom.owner_id === currentUser.id ||
      liveRoom.created_by_id === currentUser.id ||
      liveRoom.host_id === currentUser.id;
    if (isOwner) {
      setUserRole("owner");
      return;
    }
    // Check RoomParticipant for admin/co_host/moderator role
    backendGateway.readTable("room_participants", { filter: { room_id: roomId, user_id: currentUser.id }, limit: 100, order: "created_at", ascending: true })
      .then((participants) => {
        const p = participants?.[0];
        if (p && (p.role === "admin" || p.role === "co_host" || p.role === "moderator")) {
          setUserRole("admin");
        } else {
          setUserRole("viewer");
        }
      })
      .catch(() => setUserRole("viewer"));
  }, [liveRoom?.id, liveRoom?.owner_id, liveRoom?.created_by_id, liveRoom?.host_id, currentUser?.id, roomId]);

  const profileSeat = seats.find((s) => s.id === profileSeatId);

  // Room Owner: immediately show the Seat Control Panel (Settings) when
  // entering their own room, so they can manage seats without requesting one.
  const [ownerPanelShown, setOwnerPanelShown] = useState(false);
  useEffect(() => {
    if (userRole === "owner" && !ownerPanelShown && !joiningRoom && !joinBlock) {
      setShowSettings(true);
      setOwnerPanelShown(true);
    }
  }, [userRole, ownerPanelShown, joiningRoom, joinBlock]);

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

  // Host/Admin takes an empty seat instantly
  const handleTakeSeat = async (seatId) => {
    if (userRole !== "owner" && userRole !== "admin") {
      toast({ title: "You do not have permission to manage seats.", variant: "destructive" });
      return;
    }
    try {
      const res = await base44.functions.invoke("moderateRoom", {
        room_id: roomId,
        action: "take_seat",
        target_seat_number: seatId,
        reason: "Seat taken by " + userRole,
      });
      const data = res.data || res;
      if (data.error) {
        toast({ title: data.error, variant: "destructive" });
      } else {
        toast({ title: `Moved to seat ${seatId}` });
      }
    } catch (err) {
      toast({ title: "Failed to take seat", description: err.message, variant: "destructive" });
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

  const handleResetSeats = async () => {
    if (userRole !== "owner") {
      toast({ title: "Only the Room Owner can reset seats.", variant: "destructive" });
      return;
    }
    try {
      const res = await base44.functions.invoke("moderateRoom", {
        room_id: roomId,
        action: "reset_seats",
        reason: "Seats reset by owner",
      });
      const data = res.data || res;
      if (data.error) {
        toast({ title: data.error, variant: "destructive" });
      } else {
        toast({ title: "All seats reset" });
      }
    } catch (err) {
      toast({ title: "Failed to reset seats", description: err.message, variant: "destructive" });
    }
  };

  const handleEndRoom = async () => {
    if (userRole !== "owner") {
      toast({ title: "Only the host can end this room", variant: "destructive" });
      return;
    }
    setEndingRoom(true);
    try {
      const res = await base44.functions.invoke("endLiveRoom", { room_id: roomId });
      const data = res.data || res;
      if (data.error) {
        toast({ title: data.error, variant: "destructive" });
        setEndingRoom(false);
        return;
      }
      setSummary(data.summary);
    } catch (err) {
      toast({ title: "Failed to end room", description: err.message, variant: "destructive" });
      setEndingRoom(false);
    }
  };

  const handleCloseSummary = () => {
    setSummary(null);
    navigate("/");
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
        <SeatArea seats={seats} onSeatClick={handleSeatClick} seatEffects={seatEffects} registerSeatRef={registerSeatRef} canSit={userRole === "owner" || userRole === "admin"} onSitClick={handleTakeSeat} />
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
          seat={{ ...activeProfileSeat, room_id: roomId }}
          userRole={userRole}
          currentUserId={currentUser?.id}
          onClose={() => { setProfileSeatId(null); setTempProfileUser(null); }}
          onSendGift={(seatId) => { setProfileSeatId(null); setTempProfileUser(null); setPanelTargetId(seatId); setPanelType("gift"); }}
          onSendEmoji={(seatId, emoji) => handleQuickEmoji(seatId, emoji)}
          onAction={() => { setProfileSeatId(null); setTempProfileUser(null); }}
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
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} onArchive={archiveRoom} onBackup={backupRoom} onScheduler={runScheduler} onEndRoom={handleEndRoom} endingRoom={endingRoom} giftStats={giftStats} roomScore={roomScore} aiStats={aiStats} seatCount={seatCount} onSeatCountChange={setSeatCount} userRole={userRole} onResetSeats={handleResetSeats} />}

      {summary && <PostLiveSummary summary={summary} onClose={handleCloseSummary} />}

      {/* Join security overlay */}
      {joinBlock && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-6" style={{ background: theme.bg }}>
          <div className="max-w-sm w-full text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ background: `${COLORS.crimson}20`, border: `1px solid ${COLORS.crimson}40` }}>
              <X size={28} style={{ color: COLORS.crimson }} />
            </div>
            <p className="text-sm font-bold text-white">{joinBlock.message || 'Access denied'}</p>

            {joinBlock.type === 'password' && (
              <div className="space-y-2">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handlePasswordSubmit(); }}
                  placeholder="Enter room password"
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white text-center outline-none"
                  style={{ background: '#0A2A2D', border: `1px solid ${COLORS.gold}40` }}
                  autoFocus
                />
                <button
                  onClick={handlePasswordSubmit}
                  className="w-full py-2.5 rounded-xl text-sm font-bold text-black"
                  style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})` }}
                >
                  Join Room
                </button>
              </div>
            )}

            {joinBlock.type === 'ticket' && (
              <button
                onClick={() => navigate('/coins-recharge')}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-black"
                style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})` }}
              >
                Buy Ticket — {joinBlock.price} 🪙
              </button>
            )}

            {(joinBlock.type === 'vip') && (
              <button
                onClick={() => navigate('/vip-membership')}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-black"
                style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})` }}
              >
                Get VIP Membership
              </button>
            )}

            {joinBlock.type === 'follow' && (
              <button
                onClick={() => navigate(-1)}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: COLORS.electricBlue }}
              >
                Go Back & Follow Host
              </button>
            )}

            <button onClick={handleExit} className="w-full py-2 text-xs" style={{ color: COLORS.softGray }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Joining loading overlay */}
      {joiningRoom && !joinBlock && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center" style={{ background: theme.bg }}>
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs" style={{ color: COLORS.softGray }}>Joining room…</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}