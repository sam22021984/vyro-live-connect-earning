import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlassCard, SectionHeader, ActionButton, TEXT_MUTED } from "../Shared";
import { WALLET_DATA } from "../userDashboardData";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

export default function WalletSection() {
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

  const coins = profile?.coins || 0;
  const diamonds = Math.floor((profile?.coins || 0) / 10);

  const ACTION_ROUTES = {
    "Buy Coins": "/coins-recharge",
    "Gift History": "/finance",
    "Payment History": "/finance",
    "Reward History": "/tasks-rewards",
    "Wallet Records": "/finance",
    "Redeem Coupons": "/tasks-rewards",
  };

  return (
    <div className="space-y-4">
      <GlassCard className="text-center !p-4">
        <p className="text-[10px]" style={{ color: TEXT_MUTED }}>Total Balance</p>
        <h2 className="text-2xl font-bold text-white mt-1">{coins.toLocaleString()} 🪙</h2>
        <div className="flex justify-center gap-4 mt-3">
          <div>
            <p className="text-[9px]" style={{ color: TEXT_MUTED }}>Coins</p>
            <p className="text-sm font-bold" style={{ color: "#D4AF37" }}>{coins.toLocaleString()}</p>
          </div>
          <div className="w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div>
            <p className="text-[9px]" style={{ color: TEXT_MUTED }}>Diamonds</p>
            <p className="text-sm font-bold" style={{ color: "#3B82F6" }}>{diamonds.toLocaleString()}</p>
          </div>
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Balances" icon="💰" />
        <div className="grid grid-cols-2 gap-2">
          {WALLET_DATA.info.map((item, i) => (
            <GlassCard key={i}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{item.icon}</span>
              </div>
              <p className="text-sm font-bold text-white">{item.value}</p>
              <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{item.label}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <GlassCard>
        <SectionHeader title="Transaction History" icon="📋" />
        <div className="space-y-2">
          {WALLET_DATA.transactions.map((t, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-white">{t.type}</p>
                <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{t.detail} · {t.date}</p>
              </div>
              <span className="text-[11px] font-bold" style={{ color: t.color }}>{t.amount}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-3 gap-2">
          {WALLET_DATA.actions.map((a, i) => (
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