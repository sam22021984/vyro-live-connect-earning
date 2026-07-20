import React from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, ChevronRight } from "lucide-react";
import FinanceHeader from "@/components/finance/FinanceHeader";
import StatsCards from "@/components/finance/StatsCards";
import { FINANCE_COLORS } from "@/components/finance/financeData";
import { useFinanceData } from "@/hooks/useFinanceData";

// All rows map to a real, registered route. User-scoped only — no management actions.
const SECTIONS = [
  {
    title: "Wallet & Payments",
    items: [
      { label: "Wallet", subtitle: "Balance & breakdown", icon: "👛", route: "/finance/wallet" },
      { label: "Coins Recharge", subtitle: "Buy coins", icon: "⚡", route: "/coins-recharge" },
      { label: "Payment Methods", subtitle: "PayPal & cards", icon: "💳", route: "/finance/wallet" },
      { label: "Withdrawal Request", subtitle: "Cash out earnings", icon: "🏦", route: "/withdraw" },
      { label: "Withdrawal Status", subtitle: "Track requests", icon: "📋", route: "/finance/wallet" },
      { label: "Payout Status", subtitle: "Payout progress", icon: "💰", route: "/finance/wallet" },
      { label: "Earnings Summary", subtitle: "Revenue & growth", icon: "📈", route: "/finance/wallet" },
      { label: "Account Limits", subtitle: "Withdrawal caps", icon: "🛡️", route: "/finance/wallet" },
    ],
  },
  {
    title: "Transactions & Gifts",
    items: [
      { label: "Transaction History", subtitle: "All activity", icon: "🧾", route: "/finance/transactions" },
      { label: "Gifts Sent", subtitle: "Gifts you sent", icon: "🎁", route: "/finance/transactions" },
      { label: "Gifts Received", subtitle: "Gifts you received", icon: "🎀", route: "/finance/transactions" },
    ],
  },
  {
    title: "Verification & KYC",
    items: [
      { label: "KYC & Verification", subtitle: "All records", icon: "✅", route: "/finance/verification" },
      { label: "Identity Verification", subtitle: "Verify identity", icon: "🪪", route: "/face-verification" },
      { label: "Selfie Verification", subtitle: "Face liveness", icon: "🤳", route: "/face-verification" },
      { label: "Document Verification", subtitle: "ID / age docs", icon: "📄", route: "/face-verification" },
      { label: "Phone Verification", subtitle: "Phone status", icon: "📱", route: "/finance/verification" },
      { label: "Email Verification", subtitle: "Email status", icon: "📧", route: "/finance/verification" },
      { label: "Verification Status", subtitle: "Overall status", icon: "🔎", route: "/finance/verification" },
    ],
  },
  {
    title: "Account & Security",
    items: [
      { label: "Account Status", subtitle: "Standing", icon: "👤", route: "/finance/warnings" },
      { label: "Warnings", subtitle: "Active warnings", icon: "⚠️", route: "/finance/warnings" },
      { label: "Warning History", subtitle: "Past records", icon: "📜", route: "/finance/warnings" },
      { label: "Support and Appeal", subtitle: "Open a ticket", icon: "🛟", route: "/support-center" },
      { label: "Security Settings", subtitle: "Password & device", icon: "🔐", route: "/settings" },
      { label: "Notifications", subtitle: "Alerts & messages", icon: "🔔", route: "/message-center" },
    ],
  },
];

export default function Finance() {
  const navigate = useNavigate();
  const { statsCards, loading, hasRealData } = useFinanceData();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: FINANCE_COLORS.bg }}>
      <FinanceHeader title="Finance" subtitle="Wallet, transactions & verification" />

      <div className="px-4 pt-4 space-y-4">
        {/* Wallet snapshot */}
        {loading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: FINANCE_COLORS.royalBlue }} />
          </div>
        ) : hasRealData ? (
          <StatsCards stats={statsCards} />
        ) : (
          <div
            className="rounded-2xl p-4 text-center"
            style={{ background: FINANCE_COLORS.card, border: `1px solid ${FINANCE_COLORS.border}` }}
          >
            <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>Wallet data unavailable</p>
            <p className="text-[10px] mt-1" style={{ color: FINANCE_COLORS.textSecondary }}>Your balance will appear here once available.</p>
          </div>
        )}

        {/* Sections */}
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h3 className="text-[10px] font-bold uppercase tracking-wider px-1 mb-2" style={{ color: FINANCE_COLORS.textSecondary }}>
              {section.title}
            </h3>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: FINANCE_COLORS.card, border: `1px solid ${FINANCE_COLORS.border}`, boxShadow: "0 2px 12px rgba(15,27,61,0.05)" }}
            >
              {section.items.map((item, idx) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavigate(item.route)}
                  className="w-full text-left flex items-center gap-3 px-4 py-3 transition active:scale-[0.99]"
                  style={{ borderTop: idx === 0 ? "none" : `1px solid ${FINANCE_COLORS.border}` }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${FINANCE_COLORS.royalBlue}10` }}
                  >
                    <span className="text-base">{item.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>{item.label}</p>
                    <p className="text-[10px]" style={{ color: FINANCE_COLORS.textSecondary }}>{item.subtitle}</p>
                  </div>
                  <ChevronRight size={16} style={{ color: FINANCE_COLORS.textSecondary }} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}