import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { getCurrentUser } from "@/lib/getCurrentUser";
import OtherProfileHeader from "@/components/public-profile/OtherProfileHeader";
import RelationshipSection from "@/components/public-profile/RelationshipSection";
import OtherStatsGrid from "@/components/public-profile/OtherStatsGrid";
import ActionButtons from "@/components/public-profile/ActionButtons";
import GiftPanel from "@/components/public-profile/GiftPanel";
import MoreMenu from "@/components/public-profile/MoreMenu";
import LiveInfoCard from "@/components/public-profile/LiveInfoCard";
import MediaSection from "@/components/public-profile/MediaSection";
import AboutSection from "@/components/public-profile/AboutSection";
import AchievementsSection from "@/components/public-profile/AchievementsSection";
import DecorationsSection from "@/components/public-profile/DecorationsSection";
import ProfileSkeleton from "@/components/public-profile/ProfileSkeleton";

export default function PublicProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [myProfile, setMyProfile] = useState(null);
  const [liveRoom, setLiveRoom] = useState(null);
  const [partyRoom, setPartyRoom] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [mutualFriends, setMutualFriends] = useState(0);
  const [showGiftPanel, setShowGiftPanel] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [photoViewer, setPhotoViewer] = useState(null);

  useEffect(() => {
    if (!id) return;
    loadProfile();
  }, [id]);

  const loadProfile = async () => {
    try {
      // Load the target profile — try by id, user_id, or global_id
      let profiles = await base44.entities.UserProfile.filter({ user_id: id });
      if (profiles.length === 0) profiles = await base44.entities.UserProfile.filter({ id });
      if (profiles.length === 0) profiles = await base44.entities.UserProfile.filter({ global_id: id });
      if (profiles.length === 0) profiles = await base44.entities.UserProfile.list();

      const target = profiles.find((p) => p.user_id === id || p.id === id || p.global_id === id) || profiles[0];
      if (!target) { setLoading(false); return; }
      setProfile(target);

      // Load my profile for coins + relationship
      const me = await getCurrentUser();
      let myProfiles = await base44.entities.UserProfile.filter({ user_id: me.id });
      setMyProfile(myProfiles[0]);

      // Check relationship
      const friendReqs = await base44.entities.FriendRequest.filter({
        $or: [{ sender_id: me.id }, { receiver_id: me.id }],
      }).catch(() => []);
      const existingRel = friendReqs.find(
        (r) => (r.sender_id === me.id && r.receiver_id === target.user_id) || (r.receiver_id === me.id && r.sender_id === target.user_id)
      );
      if (existingRel?.status === "accepted") {
        setIsFriend(true);
        setIsFollowing(true);
      } else if (existingRel?.status === "pending") {
        setIsFollowing(true);
      }

      // Check if they follow me
      const reverseReqs = friendReqs.filter((r) => r.sender_id === target.user_id && r.receiver_id === me.id);
      setIsFollower(reverseReqs.length > 0);

      // Check live rooms
      const live = await base44.entities.RoomSession.filter({ host_id: target.user_id, status: "live" }).catch(() => []);
      if (live.length > 0) setLiveRoom(live[0]);

      const parties = await base44.entities.PartyRoom.filter({}).catch(() => []);
      const myParty = parties.find((p) => p.host?.name === target.username);
      if (myParty) setPartyRoom(myParty);

      // Load achievements
      const achs = await base44.entities.Achievement.filter({}).catch(() => []);
      setAchievements(achs);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  if (loading) return <ProfileSkeleton />;

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FC] px-6">
        <span className="text-5xl mb-3">🔍</span>
        <h2 className="text-base font-bold text-gray-700 mb-1">Profile Not Found</h2>
        <p className="text-xs text-gray-400 text-center">This user doesn't have a public profile yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] pb-20">
      <div className="max-w-md mx-auto">
        <OtherProfileHeader
          profile={profile}
          onMoreMenu={() => setShowMoreMenu(true)}
          onPhotoTap={(type) => setPhotoViewer(type)}
        />

        <RelationshipSection
          profile={profile}
          mutualFriends={mutualFriends}
          isFollowing={isFollowing}
          isFollower={isFollower}
          isFriend={isFriend}
        />

        <OtherStatsGrid profile={profile} />

        <ActionButtons
          profile={profile}
          isFollowing={isFollowing}
          onFollowChange={setIsFollowing}
          onSendGift={() => setShowGiftPanel(true)}
          myCoins={myProfile?.coins || 0}
        />

        <LiveInfoCard profile={profile} liveRoom={liveRoom} partyRoom={partyRoom} />

        <AboutSection profile={profile} />

        <MediaSection profile={profile} />

        <AchievementsSection achievements={achievements} />

        <DecorationsSection profile={profile} />

        {/* Gift panel */}
        {showGiftPanel && (
          <GiftPanel
            profile={profile}
            myCoins={myProfile?.coins || 0}
            onClose={() => { setShowGiftPanel(false); loadProfile(); }}
          />
        )}

        {/* More menu */}
        {showMoreMenu && (
          <MoreMenu profile={profile} onClose={() => setShowMoreMenu(false)} />
        )}

        {/* Photo viewer */}
        {photoViewer && (
          <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" onClick={() => setPhotoViewer(null)}>
            <img
              src={photoViewer === "cover" ? profile.cover_url : profile.avatar_url}
              alt=""
              className="max-w-full max-h-full object-contain"
            />
            <button className="absolute top-12 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-xl">✕</button>
          </div>
        )}
      </div>
    </div>
  );
}