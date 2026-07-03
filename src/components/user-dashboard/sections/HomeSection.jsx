import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlassCard, StatCard, ActionButton, SectionHeader, ProgressBar, GOLD, BLUE, TEXT_MUTED } from "../Shared";
import { USER_HOME_CARDS, USER_HOME_ACTIONS } from "../userDashboardData";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

export default function HomeSection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      try {
        let p = await base44.entities.UserProfile.filter({ user_id: user.id });
        if (p.length === 0) p = await base44.entities.UserProfile.filter({ created_by_id: user.id });
        if (p.length > 0) setProfile(p[0]);
      } catch (e) {}
    })();
  }, [user?.id]);

  const username = profile?.username || user?.full_name || "User";
  const avatarUrl = profile?.avatar_url || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150";
  const userId = profile?.global_id || profile?.user_id || "N/A";
  const country = profile?.country || "Global";
  const vipLevel = profile?.is_vip ? profile?.vip_tier || "1" : "None";
  const level = profile?.user_level || 1;
  const xp = profile?.user_xp || 0;
  const xpMax = profile?.user_xp_max || 10000;

  const ACTION_ROUTES = {
    "Edit Profile": "/edit-profile",
    "View Wallet": "/finance",
    "Recharge Coins": "/coins-recharge",
    "Withdraw Rewards": "/withdraw",
    "Open Live Rooms": "/party-dashboard",
    "Search Users": "/social",
    "Notifications": "/message-center",
  };

  return (
    <div className="space-y-4">
      {/* Profile Banner */}
      <GlassCard className="!p-0 overflow-hidden">
        <div className="h-20 relative" style={{ background: "linear-gradient(135deg, #0F1B3D, #1A2952, #2D1B69)" }}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
        </div>
        <div className="px-4 pb-4 -mt-10">
          <div className="flex items-end gap-3 mb-3">
            <img src={avatarUrl} alt={username} className="w-16 h-16 rounded-2xl object-cover border-2" style={{ borderColor: GOLD }} />
            <div className="pb-1">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-white">{username}</h2>
                {profile?.is_verified && <span className="text-xs">✅</span>}
              </div>
              <p className="text-[10px]" style={{ color: TEXT_MUTED }}>{userId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            {profile?.is_vip && <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${GOLD}20`, color: GOLD }}>VIP {vipLevel}</span>}
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${BLUE}20`, color: BLUE }}>LEVEL {level}</span>
          </div>
          <div className="flex items-center justify-between text-[9px] mb-1">
            <span style={{ color: TEXT_MUTED }}>Level Progress</span>
            <span style={{ color: GOLD }}>{xp.toLocaleString()} / {xpMax.toLocaleString()} XP</span>
          </div>
          <ProgressBar value={xp} max={xpMax} color={GOLD} />
        </div>
      </GlassCard>

      {/* Dashboard Cards */}
      <div>
        <SectionHeader title="Dashboard Cards" icon="📊" />
        <div className="grid grid-cols-3 gap-2">
          {USER_HOME_CARDS.map((c, i) => (
            <StatCard key={i} label={c.label} value={c.value} icon={c.icon} color={c.color} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <SectionHeader title="Quick Actions" icon="⚡" />
        <div className="grid grid-cols-4 gap-2">
          {USER_HOME_ACTIONS.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} onClick={() => {
              const route = ACTION_ROUTES[a.label];
              if (route) navigate(route);
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}