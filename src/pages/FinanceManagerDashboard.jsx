import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ChevronRight, ChevronDown, Search, DollarSign, Shield,
  LayoutDashboard, TrendingUp, Banknote, CreditCard, Wallet, Coins,
  Gift, Handshake, BarChart3, FileText, AlertTriangle, LineChart,
  Globe, Trophy, BrainCircuit, Mail, Users, Settings, Rocket,
  CheckCircle, Calendar, CalendarDays, CalendarRange, Clock, Activity,
  ArrowDownToLine, ArrowUpFromLine, Crown, Megaphone, Bell, MessageSquare,
  Mic, User, Building2, Share2, PartyPopper, Percent, TrendingDown,
  Receipt, FileCheck, Zap,
} from "lucide-react";
import {
  FIN_SECTIONS, FIN_KPIS, FIN_QUICK_ACTIONS, FIN_REALTIME_COUNTERS,
  FIN_LIVE_STREAM, FIN_REVENUE_PERIODS, FIN_REVENUE_SOURCES, FIN_WITHDRAWALS,
  FIN_PAYMENTS, FIN_WALLETS, FIN_COIN_STATS, FIN_COIN_PACKAGES, FIN_GIFT_REVENUE,
  FIN_TOP_GIFTERS, FIN_COMMISSION_TYPES, FIN_PNL_DATA, FIN_REPORTS, FIN_AUDIT_LOGS,
  FIN_FRAUD_CASES, FIN_ANALYTICS, FIN_COUNTRY_REVENUE, FIN_TOP_EARNERS,
  FIN_AI_INSIGHTS, FIN_COMM_TARGETS, FIN_COMM_TYPES, FIN_TEAM_MEMBERS,
  FIN_SETTINGS_GROUPS, FIN_EXCLUSIVE_TOOLS, FIN_REPORTING_STRUCTURE,
} from "@/components/finance-manager/financeManagerData";
import ReportToSection from "@/components/shared/ReportToSection";

const ICONS = {
  LayoutDashboard, TrendingUp, Banknote, CreditCard, Wallet, Coins, Gift,
  Handshake, BarChart3, FileText, AlertTriangle, LineChart, Globe, Trophy,
  BrainCircuit, Mail, Users, Settings, Rocket, CheckCircle, Calendar,
  CalendarDays, CalendarRange, Clock, Activity, ArrowDownToLine, ArrowUpFromLine,
  Crown, Megaphone, Bell, MessageSquare, Mic, User, Building2, Share2,
  PartyPopper, Percent, TrendingDown, Receipt, FileCheck, Zap, DollarSign,
  Search, ChevronDown, ArrowLeft, ChevronRight, Shield,
};

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";
const SLATE = "#475569";
const FIN_GOLD = "#F59E0B";

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl p-3 ${className}`} style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>{children}</div>;
}
function StatusBadge({ status, color }) {
  return <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: `${color}15`, color }}>{status}</span>;
}
function SectionHeader({ title, subtitle }) {
  return <div className="mb-3"><h3 className="text-base font-bold" style={{ color: DARK }}>{title}</h3>{subtitle && <p className="text-[11px]" style={{ color: GRAY }}>{subtitle}</p>}</div>;
}

function HomeSection({ onNavigate }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #78350F 100%)", boxShadow: "0 8px 24px rgba(15,27,61,0.2)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #F59E0B, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)", boxShadow: "0 4px 16px rgba(245,158,11,0.4)" }}>💰</div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white">Financial Command Center</h2>
            <p className="text-[10px] text-white/60">Global Revenue & Financial Control</p>
          </div>
        </div>
      </div>

      <Card className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${FIN_REPORTING_STRUCTURE.color}10` }}>
          <Building2 size={18} style={{ color: FIN_REPORTING_STRUCTURE.color }} />
        </div>
        <div>
          <p className="text-[10px]" style={{ color: GRAY }}>Reports To</p>
          <p className="text-sm font-bold" style={{ color: DARK }}>🏢 {FIN_REPORTING_STRUCTURE.reportsTo}</p>
        </div>
      </Card>

      <div>
        <SectionHeader title="Real-Time Counters" subtitle="Live financial activity" />
        <div className="grid grid-cols-3 gap-2">
          {FIN_REALTIME_COUNTERS.map((c, i) => {
            const Icon = ICONS[c.icon] || DollarSign;
            return (
              <Card key={i} className="text-center">
                <div className="w-9 h-9 rounded-xl mx-auto mb-1.5 flex items-center justify-center" style={{ background: `${c.color}10` }}>
                  <Icon size={16} style={{ color: c.color }} />
                </div>
                <p className="text-sm font-bold" style={{ color: DARK }}>{c.value}</p>
                <p className="text-[8px]" style={{ color: GRAY }}>{c.label}</p>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <SectionHeader title="Executive KPIs" subtitle="Financial overview metrics" />
        <div className="grid grid-cols-2 gap-2">
          {FIN_KPIS.map((k, i) => {
            const Icon = ICONS[k.icon] || BarChart3;
            return (
              <Card key={i}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${k.color}10` }}>
                    <Icon size={14} style={{ color: k.color }} />
                  </div>
                  <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{k.label}</span>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-base font-bold" style={{ color: DARK }}>{k.value}</p>
                  <span className="text-[9px] font-bold" style={{ color: k.trend === "up" ? "#27AE60" : "#EB5757" }}>{k.change}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <SectionHeader title="Quick Actions" />
        <div className="grid grid-cols-2 gap-2">
          {FIN_QUICK_ACTIONS.map((a, i) => {
            const Icon = ICONS[a.icon] || FileText;
            return (
              <button key={i} className="rounded-xl p-3 flex items-center gap-2 active:scale-95 transition" style={{ background: `${a.color}08`, border: `1px solid ${a.color}20` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${a.color}15` }}>
                  <Icon size={14} style={{ color: a.color }} />
                </div>
                <span className="text-[11px] font-semibold flex-1 text-left" style={{ color: DARK }}>{a.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <SectionHeader title="Live Financial Activity" subtitle="Real-time transaction stream" />
        <Card>
          <div className="space-y-2">
            {FIN_LIVE_STREAM.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.status === "success" ? "#27AE60" : item.status === "warning" ? "#F2994A" : item.status === "error" ? "#EB5757" : "#2F80ED" }} />
                <p className="text-[11px] flex-1" style={{ color: DARK }}>{item.text}</p>
                <span className="text-[9px]" style={{ color: GRAY }}>{item.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <SectionHeader title="All Modules" subtitle="20 financial management centers" />
        <div className="grid grid-cols-3 gap-2">
          {FIN_SECTIONS.map((s, i) => {
            const Icon = ICONS[s.icon] || BarChart3;
            return (
              <button key={i} onClick={() => onNavigate(s.id)} className="rounded-xl p-2.5 flex flex-col items-center gap-1.5 active:scale-95 transition" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}10` }}>
                  <Icon size={18} style={{ color: s.color }} />
                </div>
                <span className="text-[9px] font-semibold text-center" style={{ color: DARK }}>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RevenueSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="💵 Revenue Management" subtitle="Monitor and manage platform revenue" />
      <div className="grid grid-cols-2 gap-2">
        {FIN_REVENUE_PERIODS.map((p, i) => (
          <Card key={i}>
            <p className="text-[9px]" style={{ color: GRAY }}>{p.label} Revenue</p>
            <p className="text-lg font-bold" style={{ color: p.color }}>{p.value}</p>
            <p className="text-[9px] font-bold" style={{ color: "#27AE60" }}>{p.change}</p>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        {FIN_REVENUE_SOURCES.map((r, i) => {
          const Icon = ICONS[r.icon] || DollarSign;
          return (
            <Card key={i}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${r.color}10` }}>
                  <Icon size={16} style={{ color: r.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: DARK }}>{r.source}</p>
                  <div className="w-full h-1.5 rounded-full mt-1" style={{ background: "#F3F4F6" }}>
                    <div className="h-full rounded-full" style={{ width: r.percent, background: r.color }} />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold" style={{ color: r.color }}>{r.amount}</p>
                  <p className="text-[9px]" style={{ color: GRAY }}>{r.percent}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Revenue", "Revenue Analysis", "Forecast", "Export Report", "Comparison"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function WithdrawalsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏦 Withdrawal Management" subtitle="Manage host, agency, and user withdrawals" />
      <div className="space-y-2">
        {FIN_WITHDRAWALS.map((w, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${w.color}10` }}>
                <Banknote size={16} style={{ color: w.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{w.id} — {w.user}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{w.method} • {w.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: DARK }}>{w.amount}</p>
                <StatusBadge status={w.status} color={w.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Review", "Approve", "Reject", "Hold", "Process Payment", "Export"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function PaymentsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="💳 Payment Management" subtitle="Manage all incoming platform payments" />
      <div className="space-y-2">
        {FIN_PAYMENTS.map((p, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${p.color}10` }}>
                <CreditCard size={16} style={{ color: p.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{p.id} — {p.user}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{p.method} • {p.time}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: DARK }}>{p.amount}</p>
                <StatusBadge status={p.status} color={p.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Verify Payment", "Approve", "Reject", "Review Transaction", "Export Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function WalletsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="👛 Wallet Management" subtitle="Manage all user, host, agent, and agency wallets" />
      <div className="space-y-2">
        {FIN_WALLETS.map((w, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${w.color}10` }}>
                <Wallet size={16} style={{ color: w.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{w.owner}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{w.id} • {w.type}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: DARK }}>{w.balance}</p>
                <StatusBadge status={w.status} color={w.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Wallet", "Audit", "Freeze", "Unfreeze", "Review Transactions", "Generate Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CoinsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🪙 Coin Economy Center" subtitle="Manage virtual currency ecosystem" />
      <div className="grid grid-cols-2 gap-2">
        {FIN_COIN_STATS.map((c, i) => {
          const Icon = ICONS[c.icon] || Coins;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${c.color}10` }}>
                  <Icon size={14} style={{ color: c.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{c.metric}</span>
              </div>
              <p className="text-lg font-bold" style={{ color: c.color }}>{c.value}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{c.revenue}</p>
            </Card>
          );
        })}
      </div>
      <SectionHeader title="Coin Packages" />
      <div className="space-y-2">
        {FIN_COIN_PACKAGES.map((p, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${p.color}10` }}>
                <Coins size={16} style={{ color: p.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{p.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{p.coins} coins • {p.bonus} bonus</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: DARK }}>{p.price}</p>
                <StatusBadge status={p.status} color={p.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Package", "Edit Package", "Disable Package", "Launch Promotion", "Analyze Sales"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function GiftRevenueSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎁 Gift Revenue Center" subtitle="Track revenue from virtual gifts" />
      <div className="space-y-2">
        {FIN_GIFT_REVENUE.map((g, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{g.gift.split(" ")[0]}</span>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{g.gift}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{g.count} gifts sent</p>
              </div>
              <p className="text-sm font-bold" style={{ color: g.color }}>{g.revenue}</p>
            </div>
          </Card>
        ))}
      </div>
      <SectionHeader title="Top Gifters" />
      <div className="space-y-2">
        {FIN_TOP_GIFTERS.map((g, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: g.rank <= 3 ? `linear-gradient(135deg, ${g.color}, ${g.color}cc)` : `${SLATE}20`, color: g.rank <= 3 ? WHITE : SLATE }}>
                {g.rank}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{g.name} {g.country}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{g.gifts} gifts</p>
              </div>
              <p className="text-sm font-bold" style={{ color: "#27AE60" }}>{g.gifted}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Analyze Revenue", "View Reports", "Compare Trends"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CommissionsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🤝 Commission Management" subtitle="Manage commission structures and payouts" />
      <div className="space-y-2">
        {FIN_COMMISSION_TYPES.map((c, i) => {
          const Icon = ICONS[c.icon] || Handshake;
          return (
            <Card key={i}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${c.color}10` }}>
                  <Icon size={16} style={{ color: c.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: DARK }}>{c.type}</p>
                  <p className="text-[10px]" style={{ color: GRAY }}>{c.count} payouts • Rate: {c.rate}</p>
                </div>
                <p className="text-sm font-bold" style={{ color: c.color }}>{c.total}</p>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Rule", "Edit Commission", "Approve", "Generate Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function PnLSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📊 Profit & Loss Center" subtitle="Analyze profitability and expenses" />
      <div className="grid grid-cols-2 gap-2">
        {FIN_PNL_DATA.map((p, i) => {
          const Icon = ICONS[p.icon] || BarChart3;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${p.color}10` }}>
                  <Icon size={14} style={{ color: p.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{p.metric}</span>
              </div>
              <p className="text-lg font-bold" style={{ color: p.color }}>{p.value}</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View P&L Statement", "Analyze Profitability", "Export P&L Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ReportsSection() {
  const categories = [
    { title: "Revenue Reports", items: FIN_REPORTS.revenue, color: "#27AE60" },
    { title: "Transaction Reports", items: FIN_REPORTS.transactions, color: "#3B82F6" },
    { title: "Business Reports", items: FIN_REPORTS.business, color: "#8B5CF6" },
    { title: "Audit Reports", items: FIN_REPORTS.audit, color: "#EF4444" },
  ];
  return (
    <div className="space-y-3">
      <SectionHeader title="📑 Financial Report Center" subtitle="Generate and manage financial reports" />
      {categories.map((cat, i) => (
        <div key={i}>
          <p className="text-[10px] font-bold mb-2" style={{ color: cat.color }}>{cat.title}</p>
          <div className="space-y-2">
            {cat.items.map((r, j) => (
              <Card key={j}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${cat.color}10` }}>
                    <FileText size={16} style={{ color: cat.color }} />
                  </div>
                  <span className="text-xs font-semibold flex-1" style={{ color: DARK }}>{r}</span>
                  <ChevronRight size={16} style={{ color: GRAY }} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-wrap gap-2">
        {["Generate Report", "Schedule Report", "Export Report", "Archive Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AuditSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🔍 Transaction Audit Center" subtitle="Audit all platform transactions" />
      <div className="space-y-2">
        {FIN_AUDIT_LOGS.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Search size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{a.id} — {a.action}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.target} • {a.date}</p>
              </div>
              <StatusBadge status={a.result} color={a.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Review Transaction", "Audit Transaction", "Flag Suspicious", "Export Audit Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function FraudSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🚨 Fraud Detection Center" subtitle="Detect fraudulent financial activities" />
      <div className="space-y-2">
        {FIN_FRAUD_CASES.map((f, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${f.color}10` }}>
                <AlertTriangle size={16} style={{ color: f.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{f.id} — {f.type}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{f.target} • {f.amount} • {f.date}</p>
              </div>
              <div className="text-right">
                <StatusBadge status={f.severity} color={f.color} />
                <p className="text-[9px] mt-1" style={{ color: f.color }}>{f.status}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Investigate Case", "Freeze Wallet", "Escalate Case", "Submit Findings"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📈 Revenue Analytics Center" subtitle="Advanced revenue performance analysis" />
      <div className="grid grid-cols-2 gap-2">
        {FIN_ANALYTICS.map((a, i) => {
          const Icon = ICONS[a.icon] || LineChart;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${a.color}10` }}>
                  <Icon size={14} style={{ color: a.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{a.metric}</span>
              </div>
              <p className="text-lg font-bold" style={{ color: a.color }}>{a.value}</p>
              <p className="text-[9px] font-bold" style={{ color: "#27AE60" }}>{a.change}</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Analytics", "Compare Revenue", "Export Analytics"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CountrySection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🌎 Country Revenue Center" subtitle="Monitor revenue performance by country" />
      <div className="space-y-2">
        {FIN_COUNTRY_REVENUE.map((c, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <span className="text-xl">{c.flag}</span>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{c.country}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>Share: {c.share} • Growth: {c.growth}</p>
              </div>
              <p className="text-sm font-bold" style={{ color: "#27AE60" }}>{c.revenue}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Country Revenue", "Compare Countries", "Export Report", "Analyze Growth"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function TopEarnersSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏆 Top Earners Center" subtitle="Track top earning users, hosts, agents, and agencies" />
      <div className="space-y-2">
        {FIN_TOP_EARNERS.map((e, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: e.rank <= 3 ? `linear-gradient(135deg, ${e.color}, ${e.color}cc)` : `${SLATE}20`, color: e.rank <= 3 ? WHITE : SLATE }}>
                {e.rank}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{e.name} {e.country}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{e.type}</p>
              </div>
              <p className="text-sm font-bold" style={{ color: "#27AE60" }}>{e.earnings}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Rankings", "Export Rankings", "Compare Earnings"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AISection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🧠 Financial Intelligence Center" subtitle="AI-powered financial forecasting and insights" />
      <div className="grid grid-cols-2 gap-2">
        {FIN_AI_INSIGHTS.map((a, i) => {
          const Icon = ICONS[a.icon] || BrainCircuit;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${a.color}10` }}>
                  <Icon size={14} style={{ color: a.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{a.title}</span>
              </div>
              <p className="text-sm font-bold" style={{ color: a.color }}>{a.value}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{a.detail}</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Generate Forecast", "Analyze Risks", "View Insights"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CommunicationSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📨 Financial Communication" subtitle="Send financial announcements and notifications" />
      <div>
        <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>Send To</p>
        <div className="grid grid-cols-2 gap-2">
          {FIN_COMM_TARGETS.map((c, i) => {
            const Icon = ICONS[c.icon] || Mail;
            return (
              <button key={i} className="rounded-xl p-3 flex items-center gap-2 active:scale-95 transition" style={{ background: `${c.color}08`, border: `1px solid ${c.color}20` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${c.color}15` }}>
                  <Icon size={14} style={{ color: c.color }} />
                </div>
                <span className="text-[11px] font-semibold" style={{ color: DARK }}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>Method</p>
        <div className="grid grid-cols-2 gap-2">
          {FIN_COMM_TYPES.map((c, i) => {
            const Icon = ICONS[c.icon] || Mail;
            return (
              <button key={i} className="rounded-xl p-3 flex items-center gap-2 active:scale-95 transition" style={{ background: `${c.color}08`, border: `1px solid ${c.color}20` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${c.color}15` }}>
                  <Icon size={14} style={{ color: c.color }} />
                </div>
                <span className="text-[11px] font-semibold" style={{ color: DARK }}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TeamSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="👥 Finance Staff Management" subtitle="Manage finance department staff" />
      <div className="space-y-2">
        {FIN_TEAM_MEMBERS.map((t, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)` }}>
                {t.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{t.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{t.role} • {t.tasks} tasks</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: t.color }}>{t.score}</p>
                <StatusBadge status={t.status} color={t.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Add Staff", "Assign Tasks", "Monitor Performance", "Review Productivity"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="⚙️ Financial Settings" subtitle="Manage financial system settings" />
      <div className="grid grid-cols-2 gap-2">
        {FIN_SETTINGS_GROUPS.map((s, i) => {
          const Icon = ICONS[s.icon] || Settings;
          return (
            <button key={i} className="rounded-xl p-3 flex items-center gap-2 active:scale-95 transition text-left" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${s.color}10` }}>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <span className="text-[11px] font-semibold flex-1" style={{ color: DARK }}>{s.name}</span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Update Settings", "Save Configuration", "Reset Settings"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ExclusiveSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🚀 Exclusive Tools" subtitle="Executive financial tools for Finance Managers only" />
      <div className="grid grid-cols-1 gap-2">
        {FIN_EXCLUSIVE_TOOLS.map((t, i) => {
          const Icon = ICONS[t.icon] || Rocket;
          return (
            <button key={i} className="rounded-xl p-3 flex items-center gap-3 active:scale-95 transition text-left" style={{ background: `${t.color}08`, border: `1px solid ${t.color}20` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${t.color}15` }}>
                <Icon size={18} style={{ color: t.color }} />
              </div>
              <span className="text-xs font-bold flex-1" style={{ color: DARK }}>{t.label}</span>
              <ChevronRight size={16} style={{ color: t.color }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

const SECTIONS = {
  overview: HomeSection, revenue: RevenueSection, withdrawals: WithdrawalsSection,
  payments: PaymentsSection, wallets: WalletsSection, coins: CoinsSection,
  giftrevenue: GiftRevenueSection, commissions: CommissionsSection, pnl: PnLSection,
  reports: ReportsSection, audit: AuditSection, fraud: FraudSection,
  analytics: AnalyticsSection, country: CountrySection, topearners: TopEarnersSection,
  ai: AISection, communication: CommunicationSection, team: TeamSection,
  settings: SettingsSection, exclusive: ExclusiveSection,
};

export default function FinanceManagerDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);

  const ActiveComponent = SECTIONS[activeSection] || HomeSection;
  const activeSectionData = FIN_SECTIONS.find(s => s.id === activeSection) || FIN_SECTIONS[0];

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #78350F 100%)", boxShadow: "0 4px 16px rgba(15,27,61,0.15)" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              <DollarSign size={16} /> Finance Manager
            </h1>
            <p className="text-[10px] text-white/60">Global Revenue & Financial Control</p>
          </div>
          <button onClick={() => setShowSidebar(!showSidebar)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(245,158,11,0.2)" }}>
            <LayoutDashboard size={16} style={{ color: "#FCD34D" }} />
          </button>
        </div>

        <div className="px-4 pt-3">
          <button onClick={() => setShowSidebar(!showSidebar)} className="w-full rounded-xl p-2.5 flex items-center gap-2 active:scale-95 transition" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${activeSectionData.color}10` }}>
              {(() => { const Icon = ICONS[activeSectionData.icon] || LayoutDashboard; return <Icon size={14} style={{ color: activeSectionData.color }} />; })()}
            </div>
            <span className="text-xs font-bold flex-1 text-left" style={{ color: DARK }}>{activeSectionData.label}</span>
            <ChevronDown size={16} style={{ color: GRAY }} className={showSidebar ? "rotate-180 transition" : "transition"} />
          </button>
        </div>

        {showSidebar && (
          <div className="px-4 pt-2 animate-fadeIn">
            <div className="rounded-2xl p-3" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
              <div className="grid grid-cols-4 gap-2">
                {FIN_SECTIONS.map((s, i) => {
                  const Icon = ICONS[s.icon] || BarChart3;
                  const isActive = s.id === activeSection;
                  return (
                    <button key={i} onClick={() => { setActiveSection(s.id); setShowSidebar(false); }} className="rounded-xl p-2 flex flex-col items-center gap-1 active:scale-95 transition" style={{ background: isActive ? `${s.color}10` : "#F7F9FC", border: isActive ? `1px solid ${s.color}30` : "1px solid transparent" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}10` }}>
                        <Icon size={14} style={{ color: s.color }} />
                      </div>
                      <span className="text-[8px] font-semibold text-center" style={{ color: isActive ? s.color : DARK }}>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="px-4 pt-3">
          <ReportToSection roleKey="finance-manager" theme="light" />
        </div>

        <div className="px-4 pt-3">
          <ActiveComponent onNavigate={(id) => { setActiveSection(id); setShowSidebar(false); }} />
        </div>
      </div>
    </div>
  );
}