import React from "react";

export default function RelationshipSection({ profile, mutualFriends, isFollowing, isFollower, isFriend }) {
  return (
    <div className="px-3 pt-3">
      <div className="bg-white rounded-2xl p-3 border border-gray-50 shadow-sm">
        <h3 className="text-xs font-bold text-gray-700 mb-2">Relationship</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className={`rounded-xl p-2.5 ${isFollowing ? "bg-purple-50" : "bg-gray-50"}`}>
            <p className="text-[10px] text-gray-400">Following</p>
            <p className="text-xs font-bold text-gray-700">{isFollowing ? "✓ Following" : "Not Following"}</p>
          </div>
          <div className={`rounded-xl p-2.5 ${isFollower ? "bg-blue-50" : "bg-gray-50"}`}>
            <p className="text-[10px] text-gray-400">Follower</p>
            <p className="text-xs font-bold text-gray-700">{isFollower ? "✓ Follows You" : "Not a Follower"}</p>
          </div>
          <div className={`rounded-xl p-2.5 ${isFriend ? "bg-green-50" : "bg-gray-50"}`}>
            <p className="text-[10px] text-gray-400">Friend</p>
            <p className="text-xs font-bold text-gray-700">{isFriend ? "✓ Friends" : "Not Friends"}</p>
          </div>
          <div className="rounded-xl p-2.5 bg-gray-50">
            <p className="text-[10px] text-gray-400">Mutual Friends</p>
            <p className="text-xs font-bold text-gray-700">{mutualFriends || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}