import React from "react";
import { Loader2, AlertCircle, Wallet as WalletIcon, CreditCard, ShieldCheck, TrendingUp } from "lucide-react";
import { FINANCE_COLORS } from "@/components/finance/financeData";
import FinanceSubHeader from "@/components/finance/FinanceSubHeader";
import StatsCards from "@/components/finance/StatsCards";
import WalletOverview from "@/components/finance/WalletOverview";
import { useFinanceData } from "@/hooks/useFinanceData";
import { useAuth } from "@/lib/AuthContext";

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: FINANCE_COLORS.card,
        boxShadow: "0 2px 12px rgba(15,27,61,0.06)",
        border: `1px solid ${FINANCE_COLORS.border}`,
      }}
    >
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${FINANCE_COLORS.border}` }}>
        <Icon size={15} style={{ color: FINANCE_COLORS.royalBlue }} />
        <h3 className="text-sm font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Row({ label, value, color }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-xs" style={{ color: FINANCE_COLORS.textSecondary }}>{label}</span>
      <span className="text-xs font-bold" style={{ color: color || FINANCE_COLORS.textPrimary }}>{value}</span>
    </div>
  );
}

export default function UserWallet() {
  const { user } = useAuth();
  const { statsCards, walletSummary, withdrawals, heroStats, loading, hasRealData } = useFinanceData();

  // Derive the user's payment method (most recent PayPal email used) from withdrawals
  const paymentMethod = (withdrawals || []).find((w) => w.account && w.account !== "****");

  // Account limits derived from profile role (read-only, derived locally)
  const isVip = user?.role === "owner" || user?.role === "admin";
  const dailyWithdrawLimit = isVip ? "$5,000" : "$1,000";
  const monthlyWithdrawLimit = isVip ? "$50,000" : "$10,000";

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: FINANCE_COLORS.bg }}>
        <FinanceSubHeader title="Wallet" subtitle="Balance, payments & limits" />
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-7 h-7 animate-spin" style={{ color: FINANCE_COLORS.royalBlue }} />
          <p className="text-xs mt-3" style={{ color: FINANCE_COLORS.textSecondary }}>Loading your wallet…</p>
        </div>
      </div>
    );
  }

  if (!hasRealData) {
    return (
      <div className="min-h-screen" style={{ background: FINANCE_COLORS.bg }}>
        <FinanceSubHeader title="Wallet" subtitle="Balance, payments & limits" />
        <div className="p-4">
          <div
            className="rounded-2xl p-5 flex flex-col items-center text-center"
            style={{ background: FINANCE_COLORS.card, border: `1px solid ${FINANCE_COLORS.border}` }}
          >
            <AlertCircle size={28} style={{ color: FINANCE_COLORS.warning }} />
            <p className="text-sm font-bold mt-2" style={{ color: FINANCE_COLORS.textPrimary }}>Wallet unavailable</p>
            <p className="text-[11px] mt-1" style={{ color: FINANCE_COLORS.textSecondary }}>
              We couldn't load your wallet data right now. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: FINANCE_COLORS.bg }}>
      <FinanceSubHeader title="Wallet" subtitle="Balance, payments & limits" />
      <div className="px-4 pt-4 space-y-4">
        {/* Balance summary */}
        <StatsCards stats={statsCards} />

        {/* Wallet breakdown (available / pending / locked / deposits) */}
        <SectionCard title="Wallet Breakdown" icon={WalletIcon}>
          <div className="grid grid-cols-2 gap-2.5">
            {(walletSummary || []).map((item, i) => (
              <div key={i} className="rounded-xl p-3" style={{ background: FINANCE_COLORS.bg }}>
                <p className="text-[9px] font-semibold" style={{ color: FINANCE_COLORS.textSecondary }}>{item.label}</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: FINANCE_COLORS.textPrimary }}>{item.value}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Earnings summary */}
        <SectionCard title="Earnings Summary" icon={TrendingUp}>
          <Row label="Total Overview" value={heroStats?.totalOverview || "$0"} color={FINANCE_COLORS.emerald} />
          <Row label="Monthly Growth" value={`${heroStats?.monthlyGrowth || 0}%`} color={FINANCE_COLORS.success} />
          <Row label="Pending Transactions" value={heroStats?.pendingCount || 0} color={FINANCE_COLORS.warning} />
          <Row label="Active Accounts" value={heroStats?.activeAccounts || 0} />
        </SectionCard>

        {/* Payment method */}
        <SectionCard title="Payment Method" icon={CreditCard}>
          {paymentMethod ? (
            <>
              <Row label="PayPal Email" value={paymentMethod.account} color={FINANCE_COLORS.royalBlue} />
              <Row label="Method" value={paymentMethod.method} />
            </>
          ) : (
            <div className="text-center py-2">
              <p className="text-[11px]" style={{ color: FINANCE_COLORS.textSecondary }}>No payment method on file.</p>
              <p className="text-[10px] mt-1" style={{ color: FINANCE_COLORS.textSecondary }}>
                Add one when you create a withdrawal request.
              </p>
            </div>
          )}
        </SectionCard>

        {/* Withdrawal / payout status */}
        <SectionCard title="Withdrawal & Payout Status" icon={ShieldCheck}>
          <WalletOverview walletSummary={[]} withdrawals={withdrawals} loading={false} />
        </SectionCard>

        {/* Account limits */}
        <SectionCard title="Account Limits" icon={ShieldCheck}>
          <Row label="Daily Withdrawal Limit" value={dailyWithdrawLimit} color={FINANCE_COLORS.gold} />
          <Row label="Monthly Withdrawal Limit" value={monthlyWithdrawLimit} color={FINANCE_COLORS.gold} />
          <Row label="Account Tier" value={isVip ? "Premium" : "Standard"} color={FINANCE_COLORS.royalBlue} />
        </SectionCard>
      </div>
    </div>
  );
}