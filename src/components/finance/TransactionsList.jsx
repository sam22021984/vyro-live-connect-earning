import React from "react";
import { Loader2 } from "lucide-react";
import { FINANCE_COLORS } from "./financeData";

const STATUS_CONFIG = {
  completed: { color: FINANCE_COLORS.success, bg: `${FINANCE_COLORS.success}15`, label: "Completed" },
  pending: { color: FINANCE_COLORS.warning, bg: `${FINANCE_COLORS.warning}15`, label: "Pending" },
  processing: { color: FINANCE_COLORS.info, bg: `${FINANCE_COLORS.info}15`, label: "Processing" },
  failed: { color: FINANCE_COLORS.error, bg: `${FINANCE_COLORS.error}15`, label: "Failed" },
  rejected: { color: FINANCE_COLORS.error, bg: `${FINANCE_COLORS.error}15`, label: "Rejected" },
};

export default function TransactionsList({ transactions, loading }) {
  const list = transactions || [];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: FINANCE_COLORS.card,
        boxShadow: "0 2px 12px rgba(15,27,61,0.06), 0 1px 3px rgba(0,0,0,0.03)",
        border: `1px solid ${FINANCE_COLORS.border}`,
      }}
    >
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${FINANCE_COLORS.border}` }}>
        <h3 className="text-sm font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>Recent Transactions</h3>
        <button className="text-[10px] font-bold" style={{ color: FINANCE_COLORS.royalBlue }}>View All</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: FINANCE_COLORS.royalBlue }} />
        </div>
      ) : list.length === 0 ? (
        <div className="text-center py-8">
          <span className="text-2xl">💳</span>
          <p className="text-[10px] mt-2" style={{ color: FINANCE_COLORS.textSecondary }}>No transactions yet</p>
        </div>
      ) : (
        <div className="divide-y" style={{ borderColor: FINANCE_COLORS.border }}>
          {list.map((tx) => {
            const status = STATUS_CONFIG[tx.status] || STATUS_CONFIG.pending;
            return (
              <div
                key={tx.id}
                className="flex items-center gap-3 px-4 py-3"
                style={{ background: "rgba(245,247,250,0.5)" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${FINANCE_COLORS.royalBlue}10`, border: `1px solid ${FINANCE_COLORS.royalBlue}20` }}
                >
                  <span className="text-xs">{tx.method}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate" style={{ color: FINANCE_COLORS.textPrimary }}>
                    {tx.user}
                  </p>
                  <p className="text-[9px]" style={{ color: FINANCE_COLORS.textSecondary }}>
                    {tx.type} · {tx.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>
                    ${tx.amount.toLocaleString()}
                  </p>
                  <span
                    className="inline-block px-1.5 py-0.5 rounded-full text-[8px] font-bold"
                    style={{ background: status.bg, color: status.color }}
                  >
                    {status.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}