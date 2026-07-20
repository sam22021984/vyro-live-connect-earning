import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle, Inbox } from "lucide-react";
import { FINANCE_COLORS } from "@/components/finance/financeData";
import FinanceSubHeader from "@/components/finance/FinanceSubHeader";
import { useFinanceData } from "@/hooks/useFinanceData";
import { useAuth } from "@/lib/AuthContext";

const STATUS_CONFIG = {
  completed: { color: FINANCE_COLORS.success, label: "Completed" },
  pending: { color: FINANCE_COLORS.warning, label: "Pending" },
  processing: { color: FINANCE_COLORS.info, label: "Processing" },
  failed: { color: FINANCE_COLORS.error, label: "Failed" },
  rejected: { color: FINANCE_COLORS.error, label: "Rejected" },
};

const TABS = [
  { id: "all", label: "All" },
  { id: "recharge", label: "Recharges" },
  { id: "withdraw", label: "Withdrawals" },
  { id: "gifts_sent", label: "Gifts Sent" },
  { id: "gifts_received", label: "Gifts Received" },
];

export default function UserTransactions() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { transactions, loading, hasRealData } = useFinanceData();
  const [activeTab, setActiveTab] = useState("all");
  const [error, setError] = useState(null);

  const txns = useMemo(() => {
    const list = Array.isArray(transactions) ? transactions : [];
    switch (activeTab) {
      case "recharge": return list.filter((t) => t.type === "recharge");
      case "withdraw": return list.filter((t) => t.type === "withdraw");
      case "gifts_sent": return list.filter((t) => t.type === "gift" && t.user_id === user?.id);
      case "gifts_received": return list.filter((t) => t.type === "gift" && t.recipient_id === user?.id);
      default: return list;
    }
  }, [transactions, activeTab, user?.id]);

  return (
    <div className="min-h-screen pb-24" style={{ background: FINANCE_COLORS.bg }}>
      <FinanceSubHeader title="Transaction History" subtitle="All your activity" />

      {/* Tabs */}
      <div className="sticky top-[56px] z-20 px-4 py-3" style={{ background: FINANCE_COLORS.bg }}>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="py-2 px-3.5 rounded-full text-xs font-bold whitespace-nowrap transition active:scale-95"
              style={activeTab === tab.id
                ? { background: FINANCE_COLORS.navyGradient, color: "#FFFFFF", boxShadow: "0 2px 8px rgba(15,27,61,0.25)" }
                : { background: FINANCE_COLORS.card, color: FINANCE_COLORS.textSecondary, border: `1px solid ${FINANCE_COLORS.border}` }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-2">
        {error && (
          <div className="rounded-2xl p-4 mb-3 flex items-start gap-2" style={{ background: `${FINANCE_COLORS.error}10`, border: `1px solid ${FINANCE_COLORS.error}30` }}>
            <AlertCircle size={16} style={{ color: FINANCE_COLORS.error }} className="mt-0.5 flex-shrink-0" />
            <p className="text-xs font-medium" style={{ color: FINANCE_COLORS.error }}>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center py-16">
            <Loader2 className="w-7 h-7 animate-spin" style={{ color: FINANCE_COLORS.royalBlue }} />
            <p className="text-xs mt-3" style={{ color: FINANCE_COLORS.textSecondary }}>Loading transactions…</p>
          </div>
        ) : !hasRealData ? (
          <div className="flex flex-col items-center py-16">
            <AlertCircle size={28} style={{ color: FINANCE_COLORS.warning }} />
            <p className="text-sm font-bold mt-2" style={{ color: FINANCE_COLORS.textPrimary }}>Unable to load</p>
            <p className="text-[11px] mt-1" style={{ color: FINANCE_COLORS.textSecondary }}>Transaction data is unavailable right now.</p>
          </div>
        ) : txns.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <Inbox size={28} style={{ color: FINANCE_COLORS.textSecondary }} />
            <p className="text-sm font-bold mt-2" style={{ color: FINANCE_COLORS.textPrimary }}>No transactions</p>
            <p className="text-[11px] mt-1" style={{ color: FINANCE_COLORS.textSecondary }}>Nothing here yet for this filter.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {txns.map((tx) => {
              const status = STATUS_CONFIG[tx.status] || STATUS_CONFIG.pending;
              const isReceived = tx.type === "gift" && tx.recipient_id === user?.id;
              const amount = tx.amount_usd || 0;
              return (
                <div
                  key={tx.id}
                  className="rounded-2xl p-3.5 flex items-center gap-3"
                  style={{ background: FINANCE_COLORS.card, border: `1px solid ${FINANCE_COLORS.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${FINANCE_COLORS.royalBlue}10`, border: `1px solid ${FINANCE_COLORS.royalBlue}20` }}
                  >
                    <span className="text-sm">{tx.gift_name ? "🎁" : tx.type === "recharge" ? "⚡" : tx.type === "withdraw" ? "🏦" : "💳"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: FINANCE_COLORS.textPrimary }}>
                      {tx.recipient_name || tx.gift_name || (tx.type ? tx.type.charAt(0).toUpperCase() + tx.type.slice(1) : "Transaction")}
                    </p>
                    <p className="text-[9px]" style={{ color: FINANCE_COLORS.textSecondary }}>
                      {tx.created_date ? new Date(tx.created_date).toLocaleString() : ""} · {tx.paypal_email ? "PayPal" : tx.gift_name ? "Gift" : "Card"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold" style={{ color: isReceived ? FINANCE_COLORS.success : FINANCE_COLORS.textPrimary }}>
                      {isReceived ? "+" : "-"}${amount.toLocaleString()}
                    </p>
                    <span className="inline-block px-1.5 py-0.5 rounded-full text-[8px] font-bold" style={{ background: `${status.color}15`, color: status.color }}>
                      {status.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}