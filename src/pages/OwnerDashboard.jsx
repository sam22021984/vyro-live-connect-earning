import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Crown, Search as SearchIcon, Bell, ChevronRight,
  LayoutDashboard, Globe, Users, FileText, DollarSign, Gift, Coins,
  Trophy, Radio, Bot, ShieldCheck, CreditCard, ScrollText, Megaphone,
  Cpu, TrendingUp, Settings as SettingsIcon,
  Mic, UserCheck, Building2, Shield, Briefcase, Calendar, Wifi, Headphones,
  PartyPopper, Swords, Star, Wallet, Smartphone, ShieldOff, LogIn, LogOut,
  Lock, KeyRound, Snowflake, Unlock, Receipt, AlertTriangle, UserX,
  MessageSquare, Bell as BellIcon, Mail, Send, Percent, Power, Wrench,
  ArrowRightLeft, MapPin, Activity, Zap, Eye, Clock,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import OwnerGlobe from "@/components/owner-dashboard/OwnerGlobe";
import GlobalSearch from "@/components/owner-dashboard/GlobalSearch";
import BroadcastCenter from "@/components/owner-dashboard/BroadcastCenter";
import {
  OWNER_SECTIONS, SUMMARY_KPIS, REALTIME_COUNTERS, LIVE_DATA_STREAM,
  COUNTRIES, ROLES, APPLICATIONS, REVENUE_BREAKDOWN, REVENUE_PERIODS,
  GIFT_STATS, COIN_STATS, RANKINGS, LIVE_STREAMS, AI_DETECTIONS,
  SECURITY_DATA, SECURITY_ACTIONS, FINANCE_DATA, FINANCE_ACTIONS,
  AUDIT_LOGS, AUTOMATION_RULES, BI_INSIGHTS, SETTINGS_GROUPS,
  OWNER_POWERS, TIME_FILTERS,
} from "@/components/owner-dashboard/ownerData";
import ReportToSection from "@/components/shared/ReportToSection";

const ICONS = {
  LayoutDashboard, Globe, Users, FileText, DollarSign, Gift, Coins, Trophy,
  Radio, Bot, ShieldCheck, CreditCard, ScrollText, Megaphone, Cpu, TrendingUp,
  Settings: SettingsIcon, Crown, Search: SearchIcon, Mic, UserCheck, Building2,
  Shield, Briefcase, Calendar, Wifi, Headphones, PartyPopper, Swords, Star,
  Wallet, Smartphone, ShieldOff, LogIn, LogOut, Lock, KeyRound, Snowflake,
  Unlock, Receipt, AlertTriangle, UserX, MessageSquare, Bell: BellIcon, Mail,
  Send, Percent, Power, Wrench, ArrowRightLeft, MapPin, Activity, Zap, Eye, Clock, Bell,
};

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const PANEL = "#EEF2F7";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl p-3 ${className}`} style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
      {children}
    </div>
  );
}

function KpiCard({ kpi }) {
  const Icon = ICONS[kpi.icon] || Activity;
  return (
    <Card>
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${kpi.color}10` }}>
          <Icon size={14} style={{ color: kpi.color }} />
        </div>
        <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{kpi.label}</span>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-base font-bold" style={{ color: DARK }}>{kpi.value}</p>
        <span className="text-[9px] font-bold" style={{ color: kpi.trend === "up" ? "#27AE60" : GRAY }}>{kpi.change}</span>
      </div>
    </Card>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-3">
      <h3 className="text-base font-bold" style={{ color: DARK }}>{title}</h3>
      {subtitle && <p className="text-[11px]" style={{ color: GRAY }}>{subtitle}</p>}
    </div>
  );
}

function HomeSection() {
  return (
    <div className="space-y-4">
      <OwnerGlobe />
      <div>
        <h4 className="text-xs font-bold mb-2 px-1" style={{ color: DARK }}>Platform Summary</h4>
        <div className="grid grid-cols-2 gap-2">
          {SUMMARY_KPIS.map((k, i) => <KpiCard key={i} kpi={k} />)}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-bold mb-2 px-1" style={{ color: DARK }}>Real-Time Counters</h4>
        <div className="grid grid-cols-2 gap-2">
          {REALTIME_COUNTERS.map((c, i) => {
            const Icon = ICONS[c.icon] || Activity;
            return (
              <Card key={i}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${c.color}10` }}>
                    <Icon size={12} style={{ color: c.color }} />
                  </div>
                  <div>
                    <p className="text-[8px]" style={{ color: GRAY }}>{c.label}</p>
                    <p className="text-xs font-bold" style={{ color: DARK }}>{c.value}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <LiveDataStream />
    </div>
  );
}

function LiveDataStream() {
  const statusColors = { success: "#27AE60", info: "#2F80ED", warning: "#F2994A", error: "#EB5757" };
  return (
    <div>
      <h4 className="text-xs font-bold mb-2 px-1" style={{ color: DARK }}>Live Data Stream</h4>
      <Card className="space-y-2">
        {LIVE_DATA_STREAM.map((item, i) => (
          <div key={i} className="flex items-center gap-2 pb-2 border-b last:border-0 last:pb-0" style={{ borderColor: "#F0F0F0" }}>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: statusColors[item.status] }} />
            <p className="text-[10px] flex-1" style={{ color: DARK }}>{item.text}</p>
            <span className="text-[8px]" style={{ color: GRAY }}>{item.time}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

function CountriesSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="Global Country Control" subtitle="Complete country-level monitoring" />
      {COUNTRIES.map((c, i) => (
        <Card key={i}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #2F80ED, #56CCF2)", color: "#fff" }}>
              {c.code}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold" style={{ color: DARK }}>{c.name}</h4>
              <p className="text-[9px]" style={{ color: GRAY }}>Manager: {c.manager}</p>
            </div>
            <span className="text-[9px] font-bold" style={{ color: "#27AE60" }}>{c.growth}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center rounded-lg p-1.5" style={{ background: SOFT_BG }}>
              <p className="text-[8px]" style={{ color: GRAY }}>Users</p>
              <p className="text-xs font-bold" style={{ color: DARK }}>{c.users}</p>
            </div>
            <div className="text-center rounded-lg p-1.5" style={{ background: SOFT_BG }}>
              <p className="text-[8px]" style={{ color: GRAY }}>Hosts</p>
              <p className="text-xs font-bold" style={{ color: DARK }}>{c.hosts}</p>
            </div>
            <div className="text-center rounded-lg p-1.5" style={{ background: SOFT_BG }}>
              <p className="text-[8px]" style={{ color: GRAY }}>Revenue</p>
              <p className="text-xs font-bold" style={{ color: DARK }}>{c.revenue}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function RolesSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="Global Role Management" subtitle="Manage every role within the platform" />
      <div className="grid grid-cols-2 gap-2">
        {ROLES.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold" style={{ color: DARK }}>{r.name}</p>
                <p className="text-sm font-bold" style={{ color: r.color }}>{r.count}</p>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${r.color}10` }}>
                <Users size={14} style={{ color: r.color }} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ApplicationsSection() {
  const { toast } = useToast();
  return (
    <div className="space-y-3">
      <SectionHeader title="Global Applications Center" subtitle="All role applications and requests" />
      {APPLICATIONS.map((a, i) => (
        <Card key={i}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold" style={{ color: DARK }}>{a.type}</h4>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${a.color}10`, color: a.color }}>{a.pending} pending</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="text-center rounded-lg p-1.5" style={{ background: "#F2994A10" }}>
              <p className="text-[8px]" style={{ color: GRAY }}>Pending</p>
              <p className="text-xs font-bold" style={{ color: "#F2994A" }}>{a.pending}</p>
            </div>
            <div className="text-center rounded-lg p-1.5" style={{ background: "#27AE6010" }}>
              <p className="text-[8px]" style={{ color: GRAY }}>Approved</p>
              <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{a.approved}</p>
            </div>
            <div className="text-center rounded-lg p-1.5" style={{ background: "#EB575710" }}>
              <p className="text-[8px]" style={{ color: GRAY }}>Rejected</p>
              <p className="text-xs font-bold" style={{ color: "#EB5757" }}>{a.rejected}</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            {["Approve", "Reject", "Delay"].map((act) => (
              <button key={act} onClick={() => toast({ title: act + " — " + a.type })} className="flex-1 py-1.5 rounded-lg text-[9px] font-bold active:scale-95 transition" style={{ background: SOFT_BG, color: DARK, border: "1px solid #E5E7EB" }}>
                {act}
              </button>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function RevenueSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="Global Revenue Center" subtitle="Complete financial visibility" />
      <div className="grid grid-cols-3 gap-2">
        {REVENUE_PERIODS.map((p, i) => (
          <Card key={i} className="text-center">
            <p className="text-[8px]" style={{ color: GRAY }}>{p.label}</p>
            <p className="text-sm font-bold" style={{ color: "#27AE60" }}>{p.value}</p>
          </Card>
        ))}
      </div>
      <div>
        <h4 className="text-xs font-bold mb-2 px-1" style={{ color: DARK }}>Revenue Breakdown</h4>
        {REVENUE_BREAKDOWN.map((r, i) => (
          <Card key={i} className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold" style={{ color: DARK }}>{r.source}</span>
              <span className="text-xs font-bold" style={{ color: r.color }}>{r.amount}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: SOFT_BG }}>
              <div className="h-full rounded-full" style={{ width: r.percent, background: r.color }} />
            </div>
            <p className="text-[8px] mt-1 text-right" style={{ color: GRAY }}>{r.percent}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GiftSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="Global Gift Center" subtitle="Gift system management and analytics" />
      <div className="grid grid-cols-2 gap-2">
        {GIFT_STATS.map((g, i) => {
          const Icon = ICONS[g.icon] || Gift;
          return (
            <Card key={i}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1.5" style={{ background: `${g.color}10` }}>
                <Icon size={14} style={{ color: g.color }} />
              </div>
              <p className="text-[8px]" style={{ color: GRAY }}>{g.label}</p>
              <p className="text-sm font-bold" style={{ color: DARK }}>{g.value}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function CoinSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="Coin Economy Center" subtitle="Virtual currency management" />
      <div className="grid grid-cols-2 gap-2">
        {COIN_STATS.map((c, i) => {
          const Icon = ICONS[c.icon] || Coins;
          return (
            <Card key={i}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1.5" style={{ background: `${c.color}10` }}>
                <Icon size={14} style={{ color: c.color }} />
              </div>
              <p className="text-[8px]" style={{ color: GRAY }}>{c.label}</p>
              <p className="text-sm font-bold" style={{ color: DARK }}>{c.value}</p>
            </Card>
          );
        })}
      </div>
      <Card className="space-y-2">
        {["Create Coin Packages", "Edit Coin Packages", "Disable Packages", "Launch Promotions", "Create Discounts"].map((a, i) => (
          <button key={i} className="w-full text-left py-2 px-3 rounded-lg text-[10px] font-bold flex items-center justify-between active:scale-95 transition" style={{ background: SOFT_BG, color: DARK }}>
            {a} <ChevronRight size={14} style={{ color: GRAY }} />
          </button>
        ))}
      </Card>
    </div>
  );
}

function RankingsSection() {
  const [filter, setFilter] = useState("Daily");
  return (
    <div className="space-y-3">
      <SectionHeader title="Global Rankings Center" subtitle="Top performers across the platform" />
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
        {TIME_FILTERS.map((t) => (
          <button key={t} onClick={() => setFilter(t)} className="px-3 py-1.5 rounded-lg text-[9px] font-bold whitespace-nowrap transition active:scale-95" style={filter === t ? { background: "#2F80ED", color: "#fff" } : { background: SOFT_BG, color: GRAY, border: "1px solid #E5E7EB" }}>
            {t}
          </button>
        ))}
      </div>
      {RANKINGS.map((r, i) => {
        const Icon = ICONS[r.icon] || Trophy;
        return (
          <Card key={i}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#D4AF3710" }}>
                <Icon size={14} style={{ color: "#D4AF37" }} />
              </div>
              <h4 className="text-xs font-bold" style={{ color: DARK }}>{r.category}</h4>
            </div>
            <div className="space-y-1">
              {r.top.map((name, idx) => (
                <div key={idx} className="flex items-center gap-2 py-1">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: idx === 0 ? "#D4AF37" : idx === 1 ? "#C0C0C0" : "#CD7F32", color: "#fff" }}>{idx + 1}</span>
                  <span className="text-[10px] font-bold" style={{ color: DARK }}>{name}</span>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function LiveMonitoringSection() {
  const { toast } = useToast();
  return (
    <div className="space-y-3">
      <SectionHeader title="Global Live Monitoring" subtitle="Monitor all live activities in real time" />
      {LIVE_STREAMS.map((s, i) => (
        <Card key={i}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-sm font-bold" style={{ color: DARK }}>{s.host}</h4>
              <p className="text-[9px]" style={{ color: GRAY }}>{s.id} · {s.country}</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#EB5757" }} />
              <span className="text-[8px] font-bold" style={{ color: "#EB5757" }}>LIVE</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            <div className="text-center rounded-lg p-1" style={{ background: SOFT_BG }}>
              <p className="text-[7px]" style={{ color: GRAY }}>Viewers</p>
              <p className="text-[10px] font-bold" style={{ color: DARK }}>{s.viewers}</p>
            </div>
            <div className="text-center rounded-lg p-1" style={{ background: SOFT_BG }}>
              <p className="text-[7px]" style={{ color: GRAY }}>Revenue</p>
              <p className="text-[10px] font-bold" style={{ color: "#27AE60" }}>{s.revenue}</p>
            </div>
            <div className="text-center rounded-lg p-1" style={{ background: SOFT_BG }}>
              <p className="text-[7px]" style={{ color: GRAY }}>Gifts</p>
              <p className="text-[10px] font-bold" style={{ color: DARK }}>{s.gifts}</p>
            </div>
            <div className="text-center rounded-lg p-1" style={{ background: SOFT_BG }}>
              <p className="text-[7px]" style={{ color: GRAY }}>Country</p>
              <p className="text-[10px] font-bold" style={{ color: DARK }}>{s.country}</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            {["Join", "Monitor", "Warn", "End", "Suspend"].map((a) => (
              <button key={a} onClick={() => toast({ title: a + " — " + s.host })} className="flex-1 py-1.5 rounded-lg text-[8px] font-bold active:scale-95 transition" style={{ background: a === "Suspend" || a === "End" ? "#EB575710" : SOFT_BG, color: a === "Suspend" || a === "End" ? "#EB5757" : DARK, border: "1px solid #E5E7EB" }}>
                {a}
              </button>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function AIMonitoringSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="AI Monitoring Center" subtitle="AI-powered platform monitoring" />
      <div className="grid grid-cols-2 gap-2">
        {AI_DETECTIONS.map((d, i) => {
          const Icon = ICONS[d.icon] || Bot;
          return (
            <Card key={i}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1.5" style={{ background: `${d.color}10` }}>
                <Icon size={14} style={{ color: d.color }} />
              </div>
              <p className="text-[8px]" style={{ color: GRAY }}>{d.type}</p>
              <p className="text-sm font-bold" style={{ color: DARK }}>{d.count}</p>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: d.risk === "high" ? "#EB575710" : d.risk === "medium" ? "#F2994A10" : "#27AE6010", color: d.risk === "high" ? "#EB5757" : d.risk === "medium" ? "#F2994A" : "#27AE60" }}>{d.risk.toUpperCase()}</span>
            </Card>
          );
        })}
      </div>
      <Card>
        <h4 className="text-xs font-bold mb-2" style={{ color: DARK }}>AI Functions</h4>
        {["Risk Scoring", "Automated Alerts", "Action Recommendations", "Trend Detection"].map((f, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "#F0F0F0" }}>
            <span className="text-[10px] font-bold" style={{ color: DARK }}>{f}</span>
            <Zap size={14} style={{ color: "#A78BFA" }} />
          </div>
        ))}
      </Card>
    </div>
  );
}

function SecuritySection() {
  const { toast } = useToast();
  return (
    <div className="space-y-3">
      <SectionHeader title="Security Command Center" subtitle="Platform-wide security management" />
      <div className="grid grid-cols-2 gap-2">
        {SECURITY_DATA.map((s, i) => {
          const Icon = ICONS[s.icon] || ShieldCheck;
          return (
            <Card key={i}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1.5" style={{ background: `${s.color}10` }}>
                <Icon size={14} style={{ color: s.color }} />
              </div>
              <p className="text-[8px]" style={{ color: GRAY }}>{s.label}</p>
              <p className="text-xs font-bold" style={{ color: DARK }}>{s.value}</p>
            </Card>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {SECURITY_ACTIONS.map((a, i) => {
          const Icon = ICONS[a.icon] || Lock;
          return (
            <button key={i} onClick={() => toast({ title: a.label })} className="flex flex-col items-center gap-1 p-2.5 rounded-xl active:scale-95 transition" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Icon size={14} style={{ color: a.color }} />
              </div>
              <span className="text-[8px] font-bold text-center" style={{ color: DARK }}>{a.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FinanceSection() {
  const { toast } = useToast();
  return (
    <div className="space-y-3">
      <SectionHeader title="Global Finance Center" subtitle="Manage all financial operations" />
      {FINANCE_DATA.map((f, i) => (
        <Card key={i}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px]" style={{ color: GRAY }}>{f.label}</p>
              <p className="text-sm font-bold" style={{ color: DARK }}>{f.value}</p>
            </div>
            <p className="text-sm font-bold" style={{ color: f.color }}>{f.amount}</p>
          </div>
        </Card>
      ))}
      <div className="grid grid-cols-4 gap-2">
        {FINANCE_ACTIONS.map((a, i) => {
          const Icon = ICONS[a.icon] || Wallet;
          return (
            <button key={i} onClick={() => toast({ title: a.label })} className="flex flex-col items-center gap-1 p-2.5 rounded-xl active:scale-95 transition" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Icon size={14} style={{ color: a.color }} />
              </div>
              <span className="text-[8px] font-bold text-center" style={{ color: DARK }}>{a.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AuditSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="Global Audit Center" subtitle="Track every action across the platform" />
      {AUDIT_LOGS.map((log, i) => (
        <Card key={i}>
          <div className="flex items-center justify-between mb-1">
            <div>
              <h4 className="text-xs font-bold" style={{ color: DARK }}>{log.user}</h4>
              <p className="text-[9px]" style={{ color: GRAY }}>{log.role} · {log.time}</p>
            </div>
            <span className="text-[8px] px-2 py-0.5 rounded-full font-bold" style={{ background: "#2F80ED10", color: "#2F80ED" }}>{log.role}</span>
          </div>
          <p className="text-[10px] mb-1" style={{ color: DARK }}>{log.action}</p>
          <div className="flex items-center gap-3 text-[8px]" style={{ color: GRAY }}>
            <span className="flex items-center gap-1"><Smartphone size={9} /> {log.device}</span>
            <span className="flex items-center gap-1"><Globe size={9} /> {log.ip}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

function AutomationSection() {
  const { toast } = useToast();
  return (
    <div className="space-y-3">
      <SectionHeader title="System Automation Center" subtitle="Manage automated platform operations" />
      {AUTOMATION_RULES.map((rule, i) => {
        const Icon = ICONS[rule.icon] || Cpu;
        return (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: rule.enabled ? "#27AE6010" : "#F7F9FC" }}>
                <Icon size={16} style={{ color: rule.enabled ? "#27AE60" : GRAY }} />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold" style={{ color: DARK }}>{rule.name}</h4>
                <p className="text-[9px]" style={{ color: GRAY }}>{rule.desc}</p>
              </div>
              <button
                onClick={() => toast({ title: rule.name + " toggled" })}
                className="w-10 h-5 rounded-full relative transition"
                style={{ background: rule.enabled ? "#27AE60" : "#D1D5DB" }}
              >
                <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: rule.enabled ? "22px" : "2px" }} />
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function BISection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="Business Intelligence Center" subtitle="Executive insights and forecasting" />
      {BI_INSIGHTS.map((b, i) => (
        <Card key={i}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px]" style={{ color: GRAY }}>{b.label}</p>
              <p className="text-sm font-bold" style={{ color: DARK }}>{b.value}</p>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-bold" style={{ color: b.color }}>{b.trend}</span>
              <TrendingUp size={14} style={{ color: b.color }} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function SettingsSection() {
  const { toast } = useToast();
  return (
    <div className="space-y-3">
      <SectionHeader title="Global Settings Center" subtitle="Platform-wide configurations" />
      <div className="grid grid-cols-2 gap-2">
        {SETTINGS_GROUPS.map((s, i) => {
          const Icon = ICONS[s.icon] || SettingsIcon;
          return (
            <button key={i} onClick={() => toast({ title: s.name })} className="flex items-center gap-2 p-3 rounded-xl active:scale-95 transition" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}10` }}>
                <Icon size={14} style={{ color: s.color }} />
              </div>
              <span className="text-[10px] font-bold text-left" style={{ color: DARK }}>{s.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function OwnerPowersSection() {
  const { toast } = useToast();
  return (
    <div className="space-y-3">
      <SectionHeader title="Owner Exclusive Powers" subtitle="Available only to the Owner" />
      <div className="rounded-2xl p-3 mb-2 text-center" style={{ background: "linear-gradient(135deg, #D4AF37, #B8941E)" }}>
        <Crown size={24} className="text-white mx-auto mb-1" />
        <p className="text-xs font-bold text-white">Supreme Authority</p>
        <p className="text-[9px] text-white/80">Complete system control</p>
      </div>
      {OWNER_POWERS.map((p, i) => {
        const Icon = ICONS[p.icon] || Crown;
        return (
          <button key={i} onClick={() => toast({ title: p.name })} className="w-full text-left">
            <Card className={p.danger ? "border-red-200" : ""}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${p.color}10` }}>
                  <Icon size={16} style={{ color: p.color }} />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold" style={{ color: DARK }}>{p.name}</h4>
                  <p className="text-[9px]" style={{ color: GRAY }}>{p.desc}</p>
                </div>
                {p.danger && <AlertTriangle size={14} style={{ color: "#EB5757" }} />}
                <ChevronRight size={16} style={{ color: GRAY }} />
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
}

function SectionContent({ sectionId }) {
  switch (sectionId) {
    case "home": return <HomeSection />;
    case "search": return <GlobalSearch />;
    case "countries": return <CountriesSection />;
    case "roles": return <RolesSection />;
    case "applications": return <ApplicationsSection />;
    case "revenue": return <RevenueSection />;
    case "gifts": return <GiftSection />;
    case "coins": return <CoinSection />;
    case "rankings": return <RankingsSection />;
    case "live": return <LiveMonitoringSection />;
    case "ai": return <AIMonitoringSection />;
    case "security": return <SecuritySection />;
    case "finance": return <FinanceSection />;
    case "audit": return <AuditSection />;
    case "broadcast": return <BroadcastCenter />;
    case "automation": return <AutomationSection />;
    case "bi": return <BISection />;
    case "settings": return <SettingsSection />;
    case "powers": return <OwnerPowersSection />;
    default: return null;
  }
}

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const currentSection = OWNER_SECTIONS.find((s) => s.id === activeSection);

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        {/* Top Header Bar */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid #E5E7EB" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: SOFT_BG }}>
            <ArrowLeft size={18} style={{ color: DARK }} />
          </button>
          <div className="flex-1">
            <h1 className="text-sm font-bold" style={{ color: DARK }}>VYRO Live Connect</h1>
            <p className="text-[9px]" style={{ color: GRAY }}>Owner Dashboard · Master Control</p>
          </div>
          <button className="w-9 h-9 rounded-full flex items-center justify-center relative" style={{ background: SOFT_BG }}>
            <Bell size={16} style={{ color: DARK }} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#EB5757" }} />
          </button>
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #D4AF37, #B8941E)" }}>
            <Crown size={16} className="text-white" />
          </div>
        </div>

        {/* Section Navigation */}
        <div className="sticky top-[57px] z-20 px-4 py-2.5" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid #E5E7EB" }}>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {OWNER_SECTIONS.map((s) => {
              const Icon = ICONS[s.icon] || LayoutDashboard;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold whitespace-nowrap transition active:scale-95"
                  style={activeSection === s.id
                    ? { background: s.color, color: "#fff", boxShadow: `0 2px 8px ${s.color}30` }
                    : { background: SOFT_BG, color: GRAY }}
                >
                  <Icon size={12} /> {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Section Title */}
        <div className="px-4 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${currentSection.color}10` }}>
              {React.createElement(ICONS[currentSection.icon] || LayoutDashboard, { size: 14, style: { color: currentSection.color } })}
            </div>
            <h2 className="text-sm font-bold" style={{ color: DARK }}>{currentSection.label}</h2>
          </div>
        </div>

        {/* Report To Section */}
        <div className="px-4 pt-3">
          <ReportToSection roleKey="owner" theme="light" />
        </div>

        {/* Section Content */}
        <div className="px-4 pt-3">
          <SectionContent sectionId={activeSection} />
        </div>
      </div>
    </div>
  );
}