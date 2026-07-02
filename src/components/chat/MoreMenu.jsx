import React from "react";
import { User, UserCheck, VolumeX, Ban, Flag, Search, X } from "lucide-react";

const OPTIONS = [
  { key: "profile", label: "View Profile", icon: User, color: "#1F6BFF" },
  { key: "follow", label: "Follow User", icon: UserCheck, color: "#22C55E" },
  { key: "mute", label: "Mute Notifications", icon: VolumeX, color: "#8A94A6" },
  { key: "block", label: "Block User", icon: Ban, color: "#EF4444" },
  { key: "report", label: "Report User", icon: Flag, color: "#F59E0B" },
  { key: "search", label: "Chat Search", icon: Search, color: "#8A94A6" },
];

export default function MoreMenu({ open, onClose, onAction, isFollowing }) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-12 right-3 z-50 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-1 animate-fadeIn">
        {OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onAction(opt.key)}
            className="w-full flex items-center gap-2.5 py-2.5 px-3 active:bg-gray-50 transition"
          >
            <opt.icon size={16} style={{ color: opt.color }} />
            <span className="text-xs font-semibold text-gray-700">
              {opt.key === "follow" && isFollowing ? "Unfollow User" : opt.label}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}