import React from "react";
import { MessageCircle, Gift, Heart, UserPlus, Eye } from "lucide-react";
import { RELATIONSHIP_COLORS, GRADIENT_PINK_PURPLE } from "./relationshipData";

export default function UserCard({ user, onAction, relationshipStatus }) {
  return (
    <div
      className="rounded-2xl p-3 backdrop-blur-xl"
      style={{
        background: RELATIONSHIP_COLORS.glassBg,
        border: `1px solid ${RELATIONSHIP_COLORS.glassBorder}`,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <img src={user.avatar_url} className="w-14 h-14 rounded-full object-cover" alt="" />
          {user.is_online && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#2D1B4E]" style={{ background: "#22C55E" }} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold truncate" style={{ color: RELATIONSHIP_COLORS.textLight }}>{user.username}</span>
            {user.is_vip && <span className="text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: GRADIENT_PINK_PURPLE }}>VIP</span>}
          </div>
          <p className="text-[10px]" style={{ color: RELATIONSHIP_COLORS.textMuted }}>ID: {user.user_id || "—"}</p>
          <p className="text-[10px] flex items-center gap-1" style={{ color: RELATIONSHIP_COLORS.textMuted }}>
            {user.country_flag} {user.country}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-3">
        <button onClick={() => onAction("view", user)} className="flex-1 py-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 transition active:scale-95" style={{ background: "rgba(255,255,255,0.08)", color: RELATIONSHIP_COLORS.textLight }}>
          <Eye size={12} /> Profile
        </button>
        <button onClick={() => onAction("message", user)} className="flex-1 py-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 transition active:scale-95" style={{ background: "rgba(59,130,246,0.2)", color: "#93C5FD" }}>
          <MessageCircle size={12} /> Chat
        </button>
        <button onClick={() => onAction("gift", user)} className="flex-1 py-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 transition active:scale-95" style={{ background: "rgba(245,158,11,0.2)", color: "#FCD34D" }}>
          <Gift size={12} /> Gift
        </button>
      </div>
      <button
        onClick={() => onAction("request", user)}
        disabled={relationshipStatus === "pending" || relationshipStatus === "accepted"}
        className="w-full mt-2 py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 transition active:scale-95 disabled:opacity-50"
        style={{ background: GRADIENT_PINK_PURPLE, boxShadow: "0 4px 14px rgba(236,72,153,0.4)" }}
      >
        {relationshipStatus === "pending" ? (
          "❤️ Request Sent"
        ) : relationshipStatus === "accepted" ? (
          "❤️ In Relationship"
        ) : (
          <><Heart size={13} fill="white" /> Send Relationship Request</>
        )}
      </button>
    </div>
  );
}