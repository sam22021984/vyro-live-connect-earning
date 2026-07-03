import React from "react";
import { GlassCard, SectionHeader, ActionButton, StatCard, ProgressBar, GOLD, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import { FINANCE_DATA } from "../../agency-dashboard/agencyDashboardData";

export default function FinanceSection() {
  const maxVal = Math.max(...FINANCE_DATA.revenueBreakdown.map((d) => d.value));

  return (
    <div className="space-y-4">
      <GlassCard className="text-center !p-4">
        <p className="text-[10px]" style={{ color: TEXT_MUTED }}>Total Revenue</p>
        <h2 className="text-2xl font-bold mt-1" style={{ color: GOLD }}>$84,200</h2>
        <div className="flex justify-center gap-4 mt-3">
          <div><p className="text-[9px]" style={{ color: TEXT_MUTED }}>Commission</p><p className="text-sm font-bold" style={{ color: "#3B82F6" }}>$18.6K</p></div>
          <div className="w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div><p className="text-[9px]" style={{ color: TEXT_MUTED }}>Wallet</p><p className="text-sm font-bold" style={{ color: "#10B981" }}>$8,920</p></div>
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Financial Overview" icon="💰" />
        <div className="grid grid-cols-2 gap-2">
          {FINANCE_DATA.stats.map((s, i) => (
            <StatCard key={i} label={s.label} value={s.value} icon={s.icon} color={s.color} />
          ))}
        </div>
      </div>

      <GlassCard>
        <SectionHeader title="Revenue Trend (6 Months)" icon="📈" />
        <div className="flex items-end gap-3 h-32">
          {FINANCE_DATA.revenueBreakdown.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] font-bold text-white">${d.value}K</span>
              <div className="w-full rounded-t-lg transition-all" style={{ height: `${(d.value / maxVal) * 100}%`, background: "linear-gradient(to top, #D4AF37, #D4AF37aa)" }} />
              <span className="text-[9px]" style={{ color: TEXT_MUTED }}>{d.month}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Withdrawal Status" icon="💸" />
        <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "#10B98108", border: "1px solid #10B98115" }}>
          <div>
            <p className="text-[10px]" style={{ color: TEXT_MUTED }}>Available Balance</p>
            <p className="text-lg font-bold" style={{ color: "#10B981" }}>{FINANCE_DATA.withdrawal.amount}</p>
          </div>
          <div className="text-right">
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: "#10B98120", color: "#10B981" }}>{FINANCE_DATA.withdrawal.status}</span>
            <p className="text-[9px] mt-1" style={{ color: TEXT_MUTED }}>Next: {FINANCE_DATA.withdrawal.nextDate}</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Recent Transactions" icon="📋" />
        <div className="space-y-2">
          {FINANCE_DATA.transactions.map((t, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white">{t.type}</p>
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
          {FINANCE_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}