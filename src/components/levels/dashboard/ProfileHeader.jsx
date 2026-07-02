import React from "react";
import { Crown, Sparkles, Edit2, Share2, Eye, CheckCircle } from "lucide-react";

export default function ProfileHeader({ user, tier, config }) {
  return (
    <div
      className="relative rounded-3xl overflow-hidden p-5"
      style={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%)",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow: `0 16px 48px ${config.glow}, 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95)`,
      }}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-3xl" style={{ background: `radial-gradient(circle, ${config.color}, transparent)` }} />

      <div className="relative">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full p-1" style={{ background: `linear-gradient(135deg, ${config.color}, ${config.color}80)`, boxShadow: `0 8px 24px ${config.glow}, inset 0 2px 4px rgba(255,255,255,0.5)` }}>
              <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full object-cover border-2 border-white" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white whitespace-nowrap" style={{ background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`, boxShadow: `0 2px 8px ${config.glow}`, border: "2px solid #fff" }}>LV {user.level}</div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h2 className="text-base font-bold text-gray-800 truncate">{user.username}</h2>
              <CheckCircle size={14} style={{ color: "#1F6BFF" }} />
              <Crown size={14} style={{ color: "#FFC83D" }} />
            </div>
            <p className="text-xs font-semibold mb-1" style={{ color: config.color }}>{user.tierName}</p>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md flex items-center gap-0.5" style={{ background: `${config.color}15`, color: config.color }}><Sparkles size={8} /> {tier.badge}</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-600 border border-amber-100">👑 VIP Elite</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-green-50 text-green-600 border border-green-100">🟢 Online</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Edit Profile", icon: Edit2, action: true },
            { label: "Share", icon: Share2, action: true },
            { label: "Full Profile", icon: Eye, action: true },
          ].map((a, i) => (
            <button key={i} className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white border border-gray-100 text-[10px] font-bold text-gray-700 active:scale-95 transition shadow-sm hover:shadow-md">
              <a.icon size={12} style={{ color: config.color }} /> {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}