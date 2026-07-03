import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, UserCheck, MessageCircle, Phone, Video, Gift, Users, ChevronDown, Bell, Star } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

export default function ActionButtons({ profile, isFollowing, onFollowChange, onSendGift, myCoins }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showFollowingMenu, setShowFollowingMenu] = useState(false);
  const [showInviteMenu, setShowInviteMenu] = useState(false);
  const [notifOn, setNotifOn] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [calling, setCalling] = useState(false);

  const handleFollow = async () => {
    const newState = !isFollowing;
    onFollowChange(newState);
    try {
      if (newState) {
        await base44.entities.FriendRequest.create({
          sender_id: (await base44.auth.me()).id,
          receiver_id: profile.user_id || profile.id,
          sender_name: "You",
          receiver_name: profile.username,
          receiver_avatar: profile.avatar_url,
          status: "pending",
          request_date: new Date().toISOString(),
        });
      }
    } catch {}
  };

  const handleMessage = () => {
    const whoCanMessage = profile?.who_can_message || "everyone";
    if (whoCanMessage === "friends_only" && !isFollowing) {
      toast({ title: "This user only accepts messages from friends.", variant: "destructive" });
      return;
    }
    if (whoCanMessage === "no_one") {
      toast({ title: "This user doesn't accept messages.", variant: "destructive" });
      return;
    }
    navigate(`/chat/${profile.user_id || profile.id}`);
  };

  const handleCall = (type) => {
    if (!profile?.is_online) {
      toast({ title: "This user is currently unavailable.", variant: "destructive" });
      return;
    }
    setCalling(type);
    setTimeout(() => {
      setCalling(null);
      toast({ title: `${type === "voice" ? "Voice" : "Video"} call request sent` });
    }, 2000);
  };

  return (
    <div className="px-3 pt-3 space-y-2">
      {/* Primary actions */}
      <div className="flex items-center gap-2">
        {/* Follow / Following */}
        <div className="relative flex-1">
          <button
            onClick={() => isFollowing ? setShowFollowingMenu(!showFollowingMenu) : handleFollow()}
            className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 ${
              isFollowing ? "bg-gray-100 text-gray-600" : "bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white"
            }`}
          >
            {isFollowing ? <UserCheck size={14} /> : <UserPlus size={14} />}
            {isFollowing ? "Following" : "Follow"}
            {isFollowing && <ChevronDown size={12} />}
          </button>

          {/* Following dropdown */}
          {showFollowingMenu && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden">
              <button onClick={() => { handleFollow(); setShowFollowingMenu(false); }} className="w-full px-3 py-2 text-xs text-red-500 font-medium active:bg-gray-50 text-left">
                Unfollow
              </button>
              <button onClick={() => { setIsFavorite(!isFavorite); setShowFollowingMenu(false); toast({ title: isFavorite ? "Removed from favorites" : "Added to favorites" }); }} className="w-full px-3 py-2 text-xs text-gray-700 font-medium active:bg-gray-50 text-left flex items-center gap-2">
                <Star size={12} /> {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
              <button onClick={() => { setNotifOn(!notifOn); setShowFollowingMenu(false); toast({ title: notifOn ? "Notifications off" : "Notifications on" }); }} className="w-full px-3 py-2 text-xs text-gray-700 font-medium active:bg-gray-50 text-left flex items-center gap-2">
                <Bell size={12} /> {notifOn ? "Turn Notifications Off" : "Turn Notifications On"}
              </button>
            </div>
          )}
        </div>

        {/* Message */}
        <button onClick={handleMessage} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 flex items-center justify-center gap-1.5 transition active:scale-95">
          <MessageCircle size={14} /> Message
        </button>
      </div>

      {/* Secondary actions */}
      <div className="flex items-center gap-2">
        {/* Voice call */}
        <button onClick={() => handleCall("voice")} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 flex items-center justify-center gap-1.5 transition active:scale-95">
          <Phone size={13} /> Voice
        </button>
        {/* Video call */}
        <button onClick={() => handleCall("video")} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 flex items-center justify-center gap-1.5 transition active:scale-95">
          <Video size={13} /> Video
        </button>
        {/* Send gift */}
        <button onClick={onSendGift} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center gap-1.5 transition active:scale-95">
          <Gift size={13} /> Gift
        </button>
        {/* Invite */}
        <div className="relative">
          <button onClick={() => setShowInviteMenu(!showInviteMenu)} className="py-2.5 px-3 rounded-xl text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 flex items-center justify-center gap-1 transition active:scale-95">
            <Users size={13} /> Invite
          </button>
          {showInviteMenu && (
            <div className="absolute top-full mt-1 right-0 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden min-w-[140px]">
              {["Audio Room", "Party Room", "Video Live", "PK Invitation"].map((opt) => (
                <button key={opt} onClick={() => { setShowInviteMenu(false); toast({ title: `Invite sent: ${opt}` }); }} className="w-full px-3 py-2 text-xs text-gray-700 font-medium active:bg-gray-50 text-left">
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Calling overlay */}
      {calling && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center mb-4 animate-pulse">
            {calling === "voice" ? <Phone size={32} className="text-white" /> : <Video size={32} className="text-white" />}
          </div>
          <p className="text-white font-bold text-sm">Calling {profile?.username}...</p>
          <p className="text-white/60 text-xs mt-1">{calling === "voice" ? "Voice Call" : "Video Call"}</p>
        </div>
      )}
    </div>
  );
}