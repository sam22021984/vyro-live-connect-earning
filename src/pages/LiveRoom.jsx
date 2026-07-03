import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLiveRoomApi } from "@/hooks/useLiveRoomApi";
import { ArrowLeft, MoreVertical, Users, Lock, Settings, X, AlertTriangle, Trophy } from "lucide-react";
import SeatArea from "@/components/live-room/SeatArea";
import SettingsPanel from "@/components/live-room/SettingsPanel";
import SeatProfilePopup from "@/components/live-room/SeatProfilePopup";
import GiftLeaderboard from "@/components/live-room/GiftLeaderboard";
import InteractionPanel from "@/components/live-room/InteractionPanel";
import AnimationLayer from "@/components/live-room/AnimationLayer";
import { COLORS, ROOM_THEMES, CHAT_MESSAGES, WARNING_TEXT, SEATS, SEAT_POSITIONS, GIFT_CATALOG, EMOJIS_3D } from "@/components/live-room/roomData";
import { useToast } from "@/components/ui/use-toast";

export default function LiveRoom() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id: roomId } = useParams();
  const { joined, joining, error: joinError, recommendations, giftStats, roomScore, audioAction, publishEvent, archiveRoom, backupRoom, requestMic, verifyPayment, runScheduler } = useLiveRoomApi(roomId);
  const [themeIndex, setThemeIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [muted, setMuted] = useState(false);
  const [locked, setLocked] = useState(false);

  // Interaction system state
  const [profileSeatId, setProfileSeatId] = useState(null);
  const [panelType, setPanelType] = useState(null); // null | "gift" | "emoji"
  const [panelTargetId, setPanelTargetId] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [animations, setAnimations] = useState([]);
  const [seatEffects, setSeatEffects] = useState([]);
  const [chat, setChat] = useState(CHAT_MESSAGES);

  const theme = ROOM_THEMES[themeIndex];
  const currentUserSeatId = 0; // Host
  const userRole = "owner";

  const profileSeat = SEATS.find((s) => s.id === profileSeatId);

  // Show AI recommendations as they arrive
  useEffect(() => {
    if (recommendations.length > 0) {
      toast({ title: "💡 AI Tip", description: recommendations[0] });
    }
  }, [recommendations]);

  // Handle seat tap → profile popup
  const handleSeatClick = (seatId) => {
    const seat = SEATS.find((s) => s.id === seatId);
    if (seat && seat.user) {
      setProfileSeatId(seatId);
    }
  };

  // Send gift from sender to target
  const sendGift = (gift, targetSeatId, senderSeatId = currentUserSeatId, senderName = null) => {
    const sender = senderName ? { name: senderName } : SEATS[senderSeatId].user;
    const receiver = SEATS[targetSeatId].user;
    if (!receiver) return;

    const animId = Date.now() + Math.random();
    setAnimations((prev) => [...prev, {
      id: animId, type: "gift", icon: gift.icon,
      from: SEAT_POSITIONS[senderSeatId], to: SEAT_POSITIONS[targetSeatId], duration: 1500,
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

    if (roomId) publishEvent("gift_sent", { gift: gift.name, target: receiver.name });
  };

  // Send emoji from sender to target
  const sendEmoji = (emoji, targetSeatId, senderSeatId = currentUserSeatId, senderName = null) => {
    const sender = senderName ? { name: senderName } : SEATS[senderSeatId].user;
    const receiver = SEATS[targetSeatId].user;
    if (!receiver) return;

    const emojiObj = typeof emoji === "string" ? EMOJIS_3D.find((e) => e.emoji === emoji) || { emoji, name: "Emoji", color: COLORS.pink, animation: "fly", id: "custom" } : emoji;

    const animId = Date.now() + Math.random();
    setAnimations((prev) => [...prev, {
      id: animId, type: "emoji", icon: emojiObj.emoji, color: emojiObj.color, animation: emojiObj.animation,
      from: SEAT_POSITIONS[senderSeatId], to: SEAT_POSITIONS[targetSeatId], duration: 1200,
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

    if (roomId) publishEvent("emoji_sent", { emoji: emojiObj.emoji, target: receiver.name });
  };

  // Handle gift send from panel
  const handlePanelSendGift = async (gift, targetId) => {
    if (roomId) {
      const payRes = await verifyPayment(gift.price || 0);
      if (payRes?.success === false) { toast({ title: "Payment verification failed", variant: "destructive" }); return; }
    }
    sendGift(gift, targetId);
    setPanelType(null);
    setPanelTargetId(null);
    toast({ title: `Sent ${gift.name} to ${SEATS[targetId].user.name}! 🎁` });
  };

  // Handle emoji send from panel
  const handlePanelSendEmoji = (emoji, targetId) => {
    sendEmoji(emoji, targetId);
    setPanelType(null);
    setPanelTargetId(null);
  };

  // Handle emoji send from profile popup quick emoji
  const handleQuickEmoji = (seatId, emojiChar) => {
    setProfileSeatId(null);
    sendEmoji(emojiChar, seatId);
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

  // Bottom panel buttons
  const bottomButtons = [
    { icon: "🎁", label: "Gift", color: COLORS.gold, action: () => { setPanelType("gift"); setPanelTargetId(null); } },
    { icon: muted ? "🔇" : "🎤", label: muted ? "Muted" : "Mic", color: muted ? COLORS.crimson : COLORS.gold, action: async () => {
      const newMuted = !muted;
      setMuted(newMuted);
      if (roomId) {
        const res = await audioAction(newMuted ? "mute" : "unmute");
        if (res?.success === false) { setMuted(!newMuted); toast({ title: "Audio action failed", variant: "destructive" }); return; }
      }
      toast({ title: newMuted ? "Mic Muted" : "Mic ON" });
    } },
    { icon: "💬", label: "Chat", color: "#3B82F6", action: () => toast({ title: "Chat" }) },
    { icon: "😀", label: "Emoji", color: "#F59E0B", action: () => { setPanelType("emoji"); setPanelTargetId(null); } },
    { icon: "🏆", label: "Ranks", color: COLORS.purple, action: () => setShowLeaderboard(true) },
    { icon: "📤", label: "Share", color: "#0EA5E9", action: () => toast({ title: "Share Room" }) },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: theme.bg }}>
      {/* Radial glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 35%, ${theme.glow}15 0%, transparent 60%)` }} />

      {/* Top header */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-3 pb-2" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)" }}>
        <div className="flex items-center gap-2.5">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold text-white truncate">Arabian Nights Live</h1>
              <span className="text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})` }}>LV.42</span>
            </div>
          </div>
          <button onClick={() => setShowLeaderboard(true)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Trophy size={15} style={{ color: COLORS.gold }} />
          </button>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Users size={12} className="text-white" />
            <span className="text-[10px] font-bold text-white">12,450</span>
          </div>
          <button onClick={() => setShowSettings(true)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Settings size={16} style={{ color: COLORS.gold }} />
          </button>
        </div>
      </div>

      {/* Animation layer (gifts, emojis, effects) */}
      <AnimationLayer animations={animations} seatEffects={seatEffects} />

      {/* Seat area */}
      <div className="absolute inset-0 flex items-center justify-center pt-16 pb-52 px-2">
        <SeatArea onSeatClick={handleSeatClick} seatEffects={seatEffects} />
      </div>

      {/* Chat overlay */}
      <div className="absolute bottom-20 left-3 right-3 z-20">
        {showWarning && (
          <div className="rounded-2xl p-2.5 mb-2 flex items-start gap-2 animate-fadeIn" style={{ background: COLORS.glassOverlay, backdropFilter: "blur(12px)", border: `1px solid ${COLORS.gold}30` }}>
            <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" style={{ color: COLORS.gold }} />
            <p className="text-[8px] leading-tight flex-1" style={{ color: "rgba(255,255,255,0.7)" }}>{WARNING_TEXT}</p>
            <button onClick={() => setShowWarning(false)} className="flex-shrink-0"><X size={12} style={{ color: COLORS.softGray }} /></button>
          </div>
        )}
        <div className="space-y-1 max-h-28 overflow-y-auto scrollbar-hide">
          {chat.slice(-8).map((msg) => (
            <div key={msg.id} className="flex items-start gap-1.5 animate-fadeIn">
              <div className="rounded-2xl px-2.5 py-1 max-w-[75%]" style={{ background: msg.isSystem ? `${COLORS.gold}15` : msg.isGift ? `${COLORS.gold}20` : "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}>
                <span className="text-[9px] font-bold" style={{ color: msg.color }}>{msg.vip && "👑 "}{msg.user}</span>
                <span className="text-[9px] ml-1" style={{ color: "rgba(255,255,255,0.8)" }}>{msg.isSystem ? "" : ": "}{msg.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom action panel */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-3 pb-4 pt-2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}>
        <div className="flex items-center gap-2 rounded-2xl px-3 py-2 mb-2" style={{ background: COLORS.glassOverlay, backdropFilter: "blur(20px)", border: `1px solid ${COLORS.gold}30` }}>
          <span className="text-[10px] font-bold text-white flex-1">✋ Request to Speak</span>
          <button onClick={async () => { if (roomId) { const res = await requestMic(); toast({ title: res?.success ? "Mic request sent ✓" : "Request failed", variant: res?.success ? "default" : "destructive" }); } else { toast({ title: "Mic request sent" }); } }} className="px-2 py-1 rounded-lg text-[9px] font-bold text-white transition active:scale-90" style={{ background: COLORS.gold }}>Request</button>
          <button onClick={() => { setLocked(!locked); toast({ title: locked ? "Room unlocked" : "Room locked" }); }} className="flex items-center gap-1 px-2 py-1 rounded-lg transition active:scale-90" style={{ background: locked ? `${COLORS.gold}20` : "rgba(255,255,255,0.06)" }}>
            <Lock size={12} style={{ color: locked ? COLORS.gold : COLORS.softGray }} fill={locked ? COLORS.gold : "none"} />
            <span className="text-[9px] font-bold" style={{ color: locked ? COLORS.gold : COLORS.softGray }}>{locked ? "Locked" : "Open"}</span>
          </button>
        </div>
        <div className="flex items-center justify-around gap-1 rounded-2xl px-2 py-2" style={{ background: COLORS.glassOverlay, backdropFilter: "blur(24px) saturate(180%)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
          {bottomButtons.map((btn, i) => (
            <button key={i} onClick={btn.action} className="flex flex-col items-center gap-0.5 transition active:scale-90">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${btn.color}15`, border: `1px solid ${btn.color}40` }}>
                <span className="text-sm">{btn.icon}</span>
              </div>
              <span className="text-[7px] font-bold" style={{ color: btn.color }}>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Theme switcher */}
      <button onClick={() => setThemeIndex((prev) => (prev + 1) % ROOM_THEMES.length)} className="absolute top-16 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.glassOverlay, backdropFilter: "blur(8px)", border: `1px solid ${COLORS.gold}30` }}>
        <span className="text-xs">🎨</span>
      </button>

      {/* Profile popup */}
      {profileSeat && (
        <SeatProfilePopup
          seat={profileSeat}
          userRole={userRole}
          onClose={() => setProfileSeatId(null)}
          onSendGift={(seatId) => { setProfileSeatId(null); setPanelTargetId(seatId); setPanelType("gift"); }}
          onSendEmoji={(seatId, emoji) => handleQuickEmoji(seatId, emoji)}
          onAction={(action) => { toast({ title: action }); setProfileSeatId(null); }}
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

      {/* Settings */}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} onArchive={archiveRoom} onBackup={backupRoom} onScheduler={runScheduler} giftStats={giftStats} roomScore={roomScore} />}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}