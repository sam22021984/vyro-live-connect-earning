import React, { useState } from "react";
import {
  X, UserPlus, UserMinus, MessageCircle, Share2, AtSign, Gift, Mic, MicOff,
  Crown, Shield, ShieldOff, Ban, Lock, Unlock, Users, ArrowRightLeft,
  DoorOpen, Clock, Calendar, Eraser, ExternalLink, Sparkles, Circle,
} from "lucide-react";
import { COLORS, ADMIN_CONTROLS, getControlsForRole } from "./roomData";
import { useToast } from "@/components/ui/use-toast";
import { base44 } from "@/api/base44Client";

const ICONS = {
  MicOff, Mic, UserMinus, ArrowRightLeft, Users, Lock, Unlock, DoorOpen,
  Clock, Calendar, Ban, Eraser, Shield, ShieldOff, Crown, Circle,
};

function StatPill({ label, value, icon, color }) {
  return (
    <div className="flex items-center gap-1.5 rounded-xl px-2 py-1.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
      {React.createElement(icon, { size: 12, style: { color } })}
      <div>
        <p className="text-[8px]" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
        <p className="text-[10px] font-bold" style={{ color: COLORS.white }}>{value}</p>
      </div>
    </div>
  );
}

function ActionBtn({ label, icon, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 py-2 rounded-xl transition active:scale-90"
      style={{ background: `${color}12`, border: `1px solid ${color}25` }}
    >
      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
        {React.createElement(ICONS[icon] || Circle, { size: 14, style: { color } })}
      </div>
      <span className="text-[8px] font-bold" style={{ color }}>{label}</span>
    </button>
  );
}

function AdminSection({ title, controls, onAction }) {
  return (
    <div>
      <p className="text-[10px] font-bold mb-1.5 px-1" style={{ color: COLORS.gold }}>⚙️ {title}</p>
      <div className="grid grid-cols-3 gap-1.5">
        {controls.map((c) => (
          <ActionBtn key={c.id} label={c.label} icon={c.icon} color={c.color} onClick={() => onAction(c.label)} />
        ))}
      </div>
    </div>
  );
}

export default function SeatProfilePopup({ seat, userRole, onClose, onSendGift, onSendEmoji, onAction }) {
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [acting, setActing] = useState(false);
  const u = seat.user;
  if (!u) return null;

  const isAdmin = userRole === "admin" || userRole === "owner" || userRole === "moderator" || userRole === "co_host";
  const controls = getControlsForRole(userRole);

  const handleModeration = async (control) => {
    if (acting) return;
    setActing(true);
    try {
      const res = await base44.functions.invoke("moderateRoom", {
        room_id: seat.room_id,
        target_user_id: u.user_id,
        action: control.id,
        reason: control.label,
      });
      const data = res.data || res;
      if (data.error) {
        toast({ title: data.error, variant: "destructive" });
      } else {
        toast({ title: `${control.label} — done`, description: `Applied to ${u.name}` });
        onAction(control.label);
      }
    } catch (err) {
      toast({ title: "Action failed", description: err.message, variant: "destructive" });
    } finally {
      setActing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-[90%] max-w-md overflow-y-auto scrollbar-hide animate-fadeIn"
        style={{ background: COLORS.tealDeep, border: `1px solid ${COLORS.gold}30`, boxShadow: "0 -8px 32px rgba(0,0,0,0.5)", height: "60vh", maxHeight: "85vh", borderRadius: "26px 26px 0 0" }}
      >
        {/* Drag handle */}
        <div className="sticky top-0 z-10 pt-3 pb-2" style={{ background: COLORS.tealDeep }}>
          <div className="w-10 h-1 rounded-full mx-auto mb-2" style={{ background: `${COLORS.gold}40` }} />
          <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <X size={14} style={{ color: COLORS.softGray }} />
          </button>
        </div>

        <div className="px-4 pb-6 space-y-4">
          {/* Profile header */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})`, boxShadow: `0 0 12px ${COLORS.gold}60` }} />
              <img src={u.avatar} className="relative w-16 h-16 rounded-full object-cover border-2" style={{ borderColor: COLORS.tealDeep }} alt={u.name} />
              {u.is_online && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full" style={{ background: COLORS.emerald, border: `2px solid ${COLORS.tealDeep}` }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-sm font-bold text-white">{u.name}</h3>
                {u.vip && (
                  <span className="text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})` }}>
                    {u.vip}
                  </span>
                )}
                {u.is_host && (
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5" style={{ background: `${COLORS.purple}30`, color: COLORS.purple }}>
                    <Crown size={8} /> HOST
                  </span>
                )}
              </div>
              <p className="text-[10px]" style={{ color: COLORS.softGray }}>VYRO ID: {u.vyro_id}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${COLORS.electricBlue}20`, color: COLORS.electricBlue }}>
                  LV.{u.level}
                </span>
                <span className="text-[10px]">{u.country}</span>
                {u.agency && (
                  <span className="text-[9px] flex items-center gap-0.5" style={{ color: COLORS.gold }}>
                    <Sparkles size={8} /> {u.agency}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-2">
            <StatPill label="Followers" value={u.followers.toLocaleString()} icon={Users} color={COLORS.electricBlue} />
            <StatPill label="Following" value={u.following.toLocaleString()} icon={UserPlus} color={COLORS.pink} />
            <StatPill label="Status" value={u.is_online ? "Online" : "Offline"} icon={Circle} color={u.is_online ? COLORS.emerald : COLORS.softGray} />
          </div>

          {/* User actions */}
          <div>
            <p className="text-[10px] font-bold mb-1.5 px-1" style={{ color: COLORS.gold }}>👤 User Actions</p>
            <div className="grid grid-cols-3 gap-1.5">
              <ActionBtn label="Visit Profile" icon="ExternalLink" color={COLORS.electricBlue} onClick={() => onAction("Visit Profile")} />
              <ActionBtn label="Send Gift" icon="Gift" color={COLORS.gold} onClick={() => onSendGift(seat.id)} />
              <ActionBtn label={isFollowing ? "Unfollow" : "Follow"} icon={isFollowing ? "UserMinus" : "UserPlus"} color={isFollowing ? COLORS.crimson : COLORS.emerald} onClick={() => { setIsFollowing(!isFollowing); toast({ title: isFollowing ? "Unfollowed" : "Following " + u.name }); }} />
              <ActionBtn label="Message" icon="MessageCircle" color={COLORS.electricBlue} onClick={() => onAction("Private Message")} />
              <ActionBtn label="Mention" icon="AtSign" color={COLORS.purple} onClick={() => onAction("Mention User")} />
              <ActionBtn label="Share" icon="Share2" color={COLORS.pink} onClick={() => onAction("Share Profile")} />
            </div>
          </div>

          {/* Quick emoji send */}
          <div>
            <p className="text-[10px] font-bold mb-1.5 px-1" style={{ color: COLORS.gold }}>🎭 Quick Emoji</p>
            <div className="flex gap-2">
              {["❤️", "🌹", "👑", "💎", "🔥", "🔨"].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => onSendEmoji(seat.id, emoji)}
                  className="flex-1 py-2 rounded-xl text-lg transition active:scale-90"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Admin controls */}
          {isAdmin && (
            <>
              <div className="rounded-xl p-2.5" style={{ background: `${COLORS.crimson}10`, border: `1px solid ${COLORS.crimson}20` }}>
                <div className="flex items-center gap-1.5 mb-2">
                  <Shield size={12} style={{ color: COLORS.crimson }} />
                  <span className="text-[10px] font-bold" style={{ color: COLORS.crimson }}>Admin & Owner Controls</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded-full ml-auto" style={{ background: `${COLORS.gold}20`, color: COLORS.gold }}>
                    {userRole.toUpperCase()}
                  </span>
                </div>
              </div>
              {controls.seat_management.length > 0 && <AdminSection title="Seat Management" controls={controls.seat_management} onAction={(label) => { const c = ADMIN_CONTROLS.seat_management.find((x) => x.label === label); if (c) handleModeration(c); }} />}
              {controls.room_moderation.length > 0 && <AdminSection title="Room Moderation" controls={controls.room_moderation} onAction={(label) => { const c = ADMIN_CONTROLS.room_moderation.find((x) => x.label === label); if (c) handleModeration(c); }} />}
              {controls.role_management.length > 0 && <AdminSection title="Role Management" controls={controls.role_management} onAction={(label) => { const c = ADMIN_CONTROLS.role_management.find((x) => x.label === label); if (c) handleModeration(c); }} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}