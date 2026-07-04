import React from "react";
import { Loader2 } from "lucide-react";
import { FINANCE_COLORS } from "./financeData";

const COLOR_MAP = {
  emerald: { bg: `${FINANCE_COLORS.emerald}10`, text: FINANCE_COLORS.emerald },
  royalBlue: { bg: `${FINANCE_COLORS.royalBlue}10`, text: FINANCE_COLORS.royalBlue },
  gold: { bg: `${FINANCE_COLORS.gold}10`, text: FINANCE_COLORS.gold },
  warning: { bg: `${FINANCE_COLORS.warning}10`, text: FINANCE_COLORS.warning },
  error: { bg: `${FINANCE_COLORS.error}10`, text: FINANCE_COLORS.error },
  info: { bg: `${FINANCE_COLORS.info}10`, text: FINANCE_COLORS.info },
};

export default function WalletOverview({ walletSummary, withdrawals, loading }) {
  const summary = walletSummary || [];
  const wdList = withdrawals || [];

  return (
    <div className="space-y-4">
      {/* Wallet summary cards */}
      <div className="grid grid-cols-2 gap-3">
        {summary.map((item, i) => {
          const c = COLOR_MAP[item.color] || COLOR_MAP.emerald;
          return (
            <div
              key={i}
              className="rounded-2xl p-3.5"
              style={{
                background: FINANCE_COLORS.card,
                boxShadow: "0 2px 12px rgba(15,27,61,0.06)",
                border: `1px solid ${FINANCE_COLORS.border}`,
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                style={{ background: c.bg }}
              >
                <span className="text-base">{item.icon}</span>
              </div>
              <p className="text-[9px] font-semibold mb-0.5" style={{ color: FINANCE_COLORS.textSecondary }}>
                {item.label}
              </p>
              <p className="text-base font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Withdrawals list */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: FINANCE_COLORS.card,
          boxShadow: "0 2px 12px rgba(15,27,61,0.06)",
          border: `1px solid ${FINANCE_COLORS.border}`,
        }}
      >
        <div className="px-4 py-3" style={{ borderBottom: `1px solid ${FINANCE_COLORS.border}` }}>
          <h3 className="text-sm font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>Withdrawal History</h3>
        </div>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: FINANCE_COLORS.royalBlue }} />
          </div>
        ) : wdList.length === 0 ? (
          <div className="text-center py-8">
            <span className="text-2xl">🏦</span>
            <p className="text-[10px] mt-2" style={{ color: FINANCE_COLORS.textSecondary }}>No withdrawals yet</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: FINANCE_COLORS.border }}>
            {wdList.map((wd) => {
              const status = wd.status;
              const statusColor = status === "completed" ? FINANCE_COLORS.success : status === "pending" ? FINANCE_COLORS.warning : status === "processing" ? FINANCE_COLORS.info : FINANCE_COLORS.error;
              return (
                <div key={wd.id} className="px-4 py-3" style={{ background: "rgba(245,247,250,0.5)" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>{wd.id}</span>
                    <span className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>${wd.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px]" style={{ color: FINANCE_COLORS.textSecondary }}>
                      {wd.user} · {wd.method} · {wd.account}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold" style={{ background: `${statusColor}15`, color: statusColor }}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
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