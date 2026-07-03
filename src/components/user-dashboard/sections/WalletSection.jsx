import React from "react";
import { GlassCard, SectionHeader, ActionButton, TEXT_MUTED } from "../Shared";
import { WALLET_DATA } from "../userDashboardData";

export default function WalletSection() {
  return (
    <div className="space-y-4">
      <GlassCard className="text-center !p-4">
        <p className="text-[10px]" style={{ color: TEXT_MUTED }}>Total Balance</p>
        <h2 className="text-2xl font-bold text-white mt-1">$1,240.00</h2>
        <div className="flex justify-center gap-4 mt-3">
          <div>
            <p className="text-[9px]" style={{ color: TEXT_MUTED }}>Coins</p>
            <p className="text-sm font-bold" style={{ color: "#D4AF37" }}>12,450</p>
          </div>
          <div className="w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div>
            <p className="text-[9px]" style={{ color: TEXT_MUTED }}>Diamonds</p>
            <p className="text-sm font-bold" style={{ color: "#3B82F6" }}>8,920</p>
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
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}