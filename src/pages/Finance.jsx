import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import FinanceHeader from "@/components/finance/FinanceHeader";
import StatsCards from "@/components/finance/StatsCards";
import AnalyticsChart from "@/components/finance/AnalyticsChart";
import TransactionsList from "@/components/finance/TransactionsList";
import WalletOverview from "@/components/finance/WalletOverview";
import ReportsView from "@/components/finance/ReportsView";
import { FINANCE_COLORS, FINANCE_TABS } from "@/components/finance/financeData";
import { useFinanceData } from "@/hooks/useFinanceData";

export default function Finance() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const { statsCards, revenueData, recentTransactions, walletSummary, withdrawals, reportCategories, financeNotifications, heroStats, loading } = useFinanceData();

  return (
    <div className="min-h-screen" style={{ background: FINANCE_COLORS.bg }}>
      <FinanceHeader title="Finance Dashboard" subtitle="VYRO Live Connect Financial Center" />

      {/* Search + Filter */}
      <div className="sticky top-[60px] z-20 px-4 py-3" style={{ background: FINANCE_COLORS.bg }}>
        <div className="flex items-center gap-2">
          <div
            className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2"
            style={{ background: FINANCE_COLORS.card, border: `1px solid ${FINANCE_COLORS.border}` }}
          >
            <Search size={15} style={{ color: FINANCE_COLORS.textSecondary }} />
            <input
              placeholder="Search transactions, users, reports..."
              className="flex-1 text-xs outline-none bg-transparent"
              style={{ color: FINANCE_COLORS.textPrimary }}
            />
          </div>
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center active:scale-95 transition"
            style={{ background: FINANCE_COLORS.navyGradient, boxShadow: "0 2px 8px rgba(15,27,61,0.2)" }}
          >
            <SlidersHorizontal size={15} className="text-white" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[116px] z-10 px-4 pb-2" style={{ background: FINANCE_COLORS.bg }}>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {FINANCE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="py-2 px-4 rounded-full text-xs font-bold transition active:scale-95 whitespace-nowrap"
                style={activeTab === tab.id
                  ? { background: FINANCE_COLORS.navyGradient, color: "#FFFFFF", boxShadow: "0 2px 8px rgba(15,27,61,0.25)" }
                  : { background: FINANCE_COLORS.card, color: FINANCE_COLORS.textSecondary, border: `1px solid ${FINANCE_COLORS.border}` }
                }
              >
                <span className="mr-1">{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-24 space-y-4">
        {/* Overview tab */}
        {activeTab === "overview" && (
          <>
            {/* Hero summary banner */}
            <div
              className="rounded-2xl p-4 text-white"
              style={{
                background: FINANCE_COLORS.navyGradient,
                boxShadow: "0 4px 20px rgba(15,27,61,0.25)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[10px] text-white/60">Total Financial Overview</p>
                  <h2 className="text-xl font-bold">{heroStats.totalOverview}</h2>
                </div>
                <div
                  className="px-3 py-1.5 rounded-full"
                  style={{ background: `${FINANCE_COLORS.gold}20`, border: `1px solid ${FINANCE_COLORS.gold}40` }}
                >
                  <span className="text-xs font-bold" style={{ color: FINANCE_COLORS.goldLight }}>🏆 Premium</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-[8px] text-white/50">Monthly Growth</p>
                  <p className="text-sm font-bold" style={{ color: FINANCE_COLORS.emerald }}>{heroStats.monthlyGrowth > 0 ? "+" : ""}{heroStats.monthlyGrowth}% ↑</p>
                </div>
                <div className="flex-1">
                  <p className="text-[8px] text-white/50">Active Accounts</p>
                  <p className="text-sm font-bold">{heroStats.activeAccounts.toLocaleString()}</p>
                </div>
                <div className="flex-1">
                  <p className="text-[8px] text-white/50">Pending</p>
                  <p className="text-sm font-bold" style={{ color: FINANCE_COLORS.warning }}>{heroStats.pendingCount}</p>
                </div>
              </div>
            </div>

            {/* Finance Module is accessible only from Creator Center */}

            {/* Coins Recharge Access Button */}
            <button
              onClick={() => navigate("/coins-recharge")}
              className="w-full rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition"
              style={{
                background: "linear-gradient(135deg, #B8941E 0%, #D4AF37 50%, #E5C158 100%)",
                boxShadow: "0 4px 16px rgba(212,175,55,0.3)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}
              >
                <span className="text-xl">⚡</span>
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-sm font-bold text-white">Coins Recharge Wallet</h3>
                <p className="text-[10px] text-white/80">20 tiers · $1 → $5000 · Up to 22% bonus</p>
              </div>
              <div className="px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}>
                <span className="text-xs font-bold text-white">Recharge →</span>
              </div>
            </button>

            <StatsCards stats={statsCards} />
            <AnalyticsChart revenueData={revenueData} />
            <TransactionsList transactions={recentTransactions} loading={loading} />
          </>
        )}

        {/* Transactions tab */}
        {activeTab === "transactions" && (
          <>
            <StatsCards stats={statsCards} />
            <TransactionsList transactions={recentTransactions} loading={loading} />
          </>
        )}

        {/* Wallet tab */}
        {activeTab === "wallet" && <WalletOverview walletSummary={walletSummary} withdrawals={withdrawals} loading={loading} />}

        {/* Withdrawals tab */}
        {activeTab === "withdrawals" && <WalletOverview walletSummary={walletSummary} withdrawals={withdrawals} loading={loading} />}

        {/* Reports tab */}
        {activeTab === "reports" && <ReportsView reportCategories={reportCategories} notifications={financeNotifications} />}
      </div>
    </div>
  );
}