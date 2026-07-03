import React, { useState, useEffect } from "react";
import { CheckCircle, Crown, Share2, Eye, Mic } from "lucide-react";
import { hostConfig } from "@/components/levels/host/hostData";
import { base44 } from "@/api/base44Client";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default function HostProfileHeader() {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const me = await getCurrentUser();
        let p = await base44.entities.UserProfile.filter({ user_id: me.id });
        if (p.length === 0) p = await base44.entities.UserProfile.filter({ created_by_id: me.id });
        if (p.length > 0) setProfile(p[0]);
      } catch (e) {}
    })();
  }, []);
  const u = {
    level: profile?.host_level || 1,
    username: profile?.username || "User",
    hostId: profile?.user_id || "—",
    tierName: profile?.vip_tier || "User",
    badge: "—",
    crown: "—",
    agencyStatus: profile?.is_agency ? "Agency Member" : "—",
    hostStatus: profile?.is_host ? "Active Host" : "Not a Host",
    totalHostCoins: (profile?.coins || 0).toLocaleString(),
    monthlyTarget: "—",
    xp: profile?.host_xp || 0,
    xpMax: profile?.host_xp_max || 10000,
    progress: profile?.host_xp_max > 0 ? Math.round(((profile?.host_xp || 0) / profile?.host_xp_max) * 100) : 0,
    ranking: "—",
    avatar: profile?.avatar_url || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop",
  };
  const c = hostConfig;
  return (
    <div className="relative rounded-3xl overflow-hidden p-5" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: `0 16px 48px ${c.glow}, inset 0 1px 0 rgba(255,255,255,0.95)` }}>
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-3xl" style={{ background: `radial-gradient(circle, ${c.color}, transparent)` }} />
      <div className="relative">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full p-1" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}80)`, boxShadow: `0 8px 24px ${c.glow}` }}>
              <img src={u.avatar} alt={u.username} className="w-full h-full rounded-full object-cover border-2 border-white" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white whitespace-nowrap" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)`, border: "2px solid #fff" }}>LV {u.level}</div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h2 className="text-base font-bold text-gray-800 truncate">{u.username}</h2>
              <CheckCircle size={14} style={{ color: "#1F6BFF" }} />
              <Crown size={14} style={{ color: "#FFC83D" }} />
            </div>
            <p className="text-[10px] font-mono text-gray-400 mb-1">{u.hostId}</p>
            <p className="text-xs font-semibold mb-1" style={{ color: c.color }}>{u.tierName}</p>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-100">🎤 {u.badge}</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-600 border border-amber-100">👑 {u.crown}</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-green-50 text-green-600 border border-green-100">🟢 {u.hostStatus}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-xl p-2 text-center" style={{ background: `${c.color}10`, border: `1px solid ${c.color}20` }}>
            <p className="text-[9px] text-gray-400">Agency Status</p>
            <p className="text-[10px] font-bold" style={{ color: c.color }}>{u.agencyStatus}</p>
          </div>
          <div className="rounded-xl p-2 text-center" style={{ background: "#FFC83D10", border: "1px solid #FFC83D20" }}>
            <p className="text-[9px] text-gray-400">Total Host Coins</p>
            <p className="text-sm font-bold text-amber-500">{u.totalHostCoins}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{ label: "Profile", icon: Eye }, { label: "Share", icon: Share2 }, { label: "Host Profile", icon: Mic }].map((a, i) => (
            <button key={i} className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white border border-gray-100 text-[10px] font-bold text-gray-700 active:scale-95 transition shadow-sm">
              <a.icon size={12} style={{ color: c.color }} /> {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}