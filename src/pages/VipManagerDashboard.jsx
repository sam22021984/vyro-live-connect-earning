import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Crown, ChevronRight, Bell,
  LayoutDashboard, Globe, Users, FileText, DollarSign, Gift, Coins,
  Trophy, Radio, Bot, ShieldCheck, CreditCard, ScrollText, Megaphone,
  Cpu, TrendingUp, Settings as SettingsIcon, Target, PartyPopper, Sparkles,
  Mic, MessageSquare, BarChart3, Medal, Brain, RefreshCw, Award,
  UserCheck, UserPlus, Wifi, Headphones, ArrowUpCircle, Star, Activity,
  Calendar, CalendarDays, CalendarRange, Handshake, Palette, Dice5,
  Square, MessageCircle, AlertTriangle, Rocket, Zap, LifeBuoy,
  ArrowRightLeft, Bell as BellIcon, Mail, Send, Percent, Power, Wrench,
  MapPin, Eye, Clock, Search as SearchIcon, LifeBuoy as LifeBuoyIcon,
  CalendarClock, ShieldOff, LogIn, Lock, KeyRound, Snowflake, Unlock,
  Receipt, UserX, Smartphone, Headphones as HeadphonesIcon, Star as StarIcon,
  CheckCircle2, XCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  VIP_SECTIONS, VIP_KPIS, VIP_QUICK_ACTIONS, VIP_REALTIME_COUNTERS,
  VIP_LIVE_STREAM, VIP_MEMBERS, VIP_LEVELS, VIP_REWARDS, VIP_EVENTS,
  VIP_HOST_SESSIONS, VIP_REVENUE_DATA, VIP_REVENUE_PERIODS, VIP_RETENTION,
  VIP_GROWTH, VIP_BENEFITS, VIP_PARTNERS, VIP_COUNTRY_PERF, VIP_RANKINGS,
  VIP_AI_INSIGHTS, VIP_ANALYTICS, VIP_REPORTS, VIP_TEAM, VIP_SETTINGS_GROUPS,
  VIP_EXCLUSIVE_TOOLS, VIP_COMMUNICATION_TYPES, VIP_PERMISSIONS_ALLOWED,
  VIP_PERMISSIONS_RESTRICTED, VIP_TIME_FILTERS,
} from "@/components/vip-manager/vipManagerData";

const ICONS = {
  LayoutDashboard, Globe, Users, FileText, DollarSign, Gift, Coins, Trophy,
  Radio, Bot, ShieldCheck, CreditCard, ScrollText, Megaphone, Cpu, TrendingUp,
  Settings: SettingsIcon, Crown, Target, PartyPopper, Sparkles, Mic,
  MessageSquare, BarChart3, Medal, Brain, RefreshCw, Award, UserCheck,
  UserPlus, Wifi, Headphones, ArrowUpCircle, Star, Activity, Calendar,
  CalendarDays, CalendarRange, Handshake, Palette, Dice5, Square,
  MessageCircle, AlertTriangle, Rocket, Zap, LifeBuoy, ArrowRightLeft,
  Bell: BellIcon, Mail, Send, Percent, Power, Wrench, MapPin, Eye, Clock,
  Search: SearchIcon, CalendarClock, ShieldOff, LogIn, Lock, KeyRound,
  Snowflake, Unlock, Receipt, UserX, Smartphone, Headphones: HeadphonesIcon,
  Star: StarIcon, LifeBuoy: LifeBuoyIcon, CheckCircle2, XCircle,
};

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const PANEL = "#EEF2F7";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";
const GOLD = "#D4AF37";

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

function HomeSection({ onNavigate }) {
  return (
    <div className="space-y-4">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #2D1B69 100%)", boxShadow: "0 8px 24px rgba(15,27,61,0.2)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: "linear-gradient(135deg, #D4AF37, #B8941E)", boxShadow: "0 4px 16px rgba(212,175,55,0.4)" }}>
            💎
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white">VIP Command Center</h2>
            <p className="text-[10px] text-white/60">Enterprise VIP Membership Control</p>
          </div>
        </div>
      </div>

      {/* Real-time counters */}
      <div>
        <SectionHeader title="Real-Time Counters" subtitle="Live VIP activity monitoring" />
        <div className="grid grid-cols-3 gap-2">
          {VIP_REALTIME_COUNTERS.map((c, i) => {
            const Icon = ICONS[c.icon] || Activity;
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

      {/* KPIs */}
      <div>
        <SectionHeader title="Overview KPIs" subtitle="VIP program performance metrics" />
        <div className="grid grid-cols-2 gap-2">
          {VIP_KPIS.map((k, i) => <KpiCard key={i} kpi={k} />)}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <SectionHeader title="Quick Actions" />
        <div className="grid grid-cols-2 gap-2">
          {VIP_QUICK_ACTIONS.map((a, i) => {
            const Icon = ICONS[a.icon] || Activity;
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

      {/* Live Data Stream */}
      <div>
        <SectionHeader title="Live VIP Activity" subtitle="Real-time VIP event stream" />
        <Card>
          <div className="space-y-2">
            {VIP_LIVE_STREAM.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.status === "success" ? "#27AE60" : item.status === "warning" ? "#F2994A" : item.status === "error" ? "#EB5757" : "#2F80ED" }} />
                <p className="text-[11px] flex-1" style={{ color: DARK }}>{item.text}</p>
                <span className="text-[9px]" style={{ color: GRAY }}>{item.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Module grid */}
      <div>
        <SectionHeader title="All Modules" subtitle="20 VIP management centers" />
        <div className="grid grid-cols-3 gap-2">
          {VIP_SECTIONS.map((s, i) => {
            const Icon = ICONS[s.icon] || Activity;
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

function MembersSection() {
  const statusColor = (s) => s === "Active" ? "#27AE60" : s === "Expiring" ? "#F2994A" : "#EB5757";
  return (
    <div className="space-y-3">
      <SectionHeader title="👑 VIP Member Management" subtitle="Manage all VIP members across the platform" />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                {["VIP ID", "User ID", "Level", "Join Date", "Expiry", "Spending", "Status"].map(h => (
                  <th key={h} className="text-[9px] font-bold py-2 px-1" style={{ color: GRAY }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VIP_MEMBERS.map((m, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #F3F4F6" }}>
                  <td className="text-[10px] font-bold py-2 px-1" style={{ color: GOLD }}>{m.vip_id}</td>
                  <td className="text-[10px] py-2 px-1" style={{ color: DARK }}>{m.user_id}</td>
                  <td className="text-[10px] py-2 px-1" style={{ color: DARK }}>{m.level}</td>
                  <td className="text-[10px] py-2 px-1" style={{ color: GRAY }}>{m.join_date}</td>
                  <td className="text-[10px] py-2 px-1" style={{ color: GRAY }}>{m.expiry}</td>
                  <td className="text-[10px] font-bold py-2 px-1" style={{ color: "#27AE60" }}>{m.spending}</td>
                  <td className="text-[10px] py-2 px-1">
                    <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold" style={{ background: `${statusColor(m.status)}15`, color: statusColor(m.status) }}>{m.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="flex flex-wrap gap-2">
        {["View Member", "Upgrade VIP", "Downgrade VIP", "Extend Membership", "Suspend VIP", "Reactivate VIP"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${GOLD}10`, color: GOLD }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function LevelsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏆 VIP Level Management" subtitle="Manage VIP level structures and benefits" />
      <div className="space-y-2">
        {VIP_LEVELS.map((l, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xs" style={{ background: `linear-gradient(135deg, ${l.color}, ${l.color}cc)`, boxShadow: `0 4px 8px ${l.color}30` }}>
                {l.level.replace("VIP ", "")}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{l.level}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{l.members} members</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: "#27AE60" }}>{l.revenue}</p>
                <p className="text-[9px]" style={{ color: GRAY }}>revenue</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create VIP Level", "Edit VIP Level", "Update Benefits", "Manage Requirements"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${GOLD}10`, color: GOLD }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function RewardsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎁 VIP Rewards Center" subtitle="Manage VIP reward distribution" />
      <div className="space-y-2">
        {VIP_REWARDS.map((r, i) => {
          const Icon = ICONS[r.icon] || Gift;
          return (
            <Card key={i}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${r.color}10` }}>
                  <Icon size={20} style={{ color: r.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: DARK }}>{r.name}</p>
                  <p className="text-[10px]" style={{ color: GRAY }}>{r.type} • {r.distributed}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold" style={{ color: r.color }}>{r.value}</p>
                  <p className="text-[9px]" style={{ color: GRAY }}>{r.recipients} recipients</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Reward", "Distribute Reward", "Edit Reward", "View History"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${GOLD}10`, color: GOLD }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function EventsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎉 VIP Event Management" subtitle="Manage VIP-exclusive events and competitions" />
      <div className="space-y-2">
        {VIP_EVENTS.map((e, i) => (
          <Card key={i}>
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ background: `${e.color}10` }}>🎉</div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{e.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{e.type} • {e.date}</p>
                <p className="text-[10px] mt-1" style={{ color: e.color }}>{e.participants} participants</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: `${e.color}15`, color: e.color }}>{e.status}</span>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Event", "Schedule Event", "Launch Event", "Monitor", "Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${GOLD}10`, color: GOLD }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function HostEngagementSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎙️ VIP Host Engagement" subtitle="Manage VIP interactions with top hosts" />
      <div className="space-y-2">
        {VIP_HOST_SESSIONS.map((s, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${s.color}10` }}>
                <Mic size={16} style={{ color: s.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{s.host} ↔ {s.vip}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{s.type} • {s.date} • {s.duration}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: `${s.color}15`, color: s.color }}>{s.status}</span>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Arrange Session", "Create Meet & Greet", "Launch Live Event", "Monitor"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${GOLD}10`, color: GOLD }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function RevenueSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="💰 VIP Revenue Center" subtitle="Monitor VIP-related revenue performance" />
      <div className="grid grid-cols-3 gap-2">
        {VIP_REVENUE_PERIODS.map((p, i) => (
          <Card key={i} className="text-center">
            <p className="text-[9px]" style={{ color: GRAY }}>{p.label}</p>
            <p className="text-sm font-bold" style={{ color: "#27AE60" }}>{p.value}</p>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        {VIP_REVENUE_DATA.map((r, i) => {
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
    </div>
  );
}

function RetentionSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎯 VIP Retention Center" subtitle="Monitor VIP retention and loyalty" />
      <div className="grid grid-cols-2 gap-2">
        {VIP_RETENTION.map((r, i) => (
          <Card key={i}>
            <p className="text-[10px] mb-1" style={{ color: GRAY }}>{r.label}</p>
            <p className="text-lg font-bold" style={{ color: r.color }}>{r.value}</p>
            <p className="text-[9px] font-bold" style={{ color: "#27AE60" }}>{r.trend}</p>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Track Renewals", "Monitor Churn", "Launch Campaign", "Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${GOLD}10`, color: GOLD }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function GrowthSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📈 VIP Growth Center" subtitle="Track VIP program growth and expansion" />
      <Card>
        <div className="space-y-2">
          {VIP_GROWTH.map((g, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[10px] font-bold w-8" style={{ color: GRAY }}>{g.month}</span>
              <div className="flex-1 h-6 rounded-lg relative overflow-hidden" style={{ background: "#F3F4F6" }}>
                <div className="h-full rounded-lg flex items-center justify-end pr-2" style={{ width: `${(i + 1) * 14}%`, background: "linear-gradient(90deg, #D4AF37, #F59E0B)" }}>
                  <span className="text-[8px] font-bold text-white">{g.growth}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold w-14 text-right" style={{ color: DARK }}>{g.members}</span>
            </div>
          ))}
        </div>
      </Card>
      <div className="flex flex-wrap gap-2">
        {["Monitor Growth", "Analyze Trends", "Forecast", "Export"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${GOLD}10`, color: GOLD }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CommunicationSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📨 VIP Communication Center" subtitle="Manage VIP communications" />
      <div className="grid grid-cols-2 gap-2">
        {VIP_COMMUNICATION_TYPES.map((c, i) => {
          const Icon = ICONS[c.icon] || MessageSquare;
          return (
            <button key={i} className="rounded-xl p-3 flex items-center gap-2 active:scale-95 transition" style={{ background: `${c.color}08`, border: `1px solid ${c.color}20` }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${c.color}15` }}>
                <Icon size={16} style={{ color: c.color }} />
              </div>
              <span className="text-[11px] font-semibold" style={{ color: DARK }}>{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BenefitsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎁 Exclusive Benefits Center" subtitle="Manage VIP-exclusive privileges" />
      <div className="grid grid-cols-2 gap-2">
        {VIP_BENEFITS.map((b, i) => {
          const Icon = ICONS[b.icon] || Sparkles;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${b.color}10` }}>
                  <Icon size={14} style={{ color: b.color }} />
                </div>
                <span className="px-1.5 py-0.5 rounded-full text-[7px] font-bold" style={{ background: b.active ? "#27AE6015" : "#EB575715", color: b.active ? "#27AE60" : "#EB5757" }}>
                  {b.active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-[11px] font-bold" style={{ color: DARK }}>{b.name}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{b.category}</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Add Benefit", "Edit Benefit", "Remove Benefit", "Activate"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${GOLD}10`, color: GOLD }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function PartnershipsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🤝 VIP Partnership Center" subtitle="Manage premium partnerships and collaborations" />
      <div className="space-y-2">
        {VIP_PARTNERS.map((p, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${p.color}10` }}>🤝</div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{p.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{p.type} • {p.tier} Tier</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{p.revenue}</p>
                <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold" style={{ background: `${p.color}15`, color: p.color }}>{p.status}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CountrySection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🌍 VIP Country Performance" subtitle="Monitor VIP performance by country" />
      <div className="space-y-2">
        {VIP_COUNTRY_PERF.map((c, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${c.color}10` }}>🌍</div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{c.country}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{c.members} members</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{c.revenue}</p>
                <p className="text-[9px] font-bold" style={{ color: c.color }}>{c.growth}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function RankingsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏅 Top VIP Rankings" subtitle="Track top-performing VIP users" />
      <div className="space-y-2">
        {VIP_RANKINGS.map((r, i) => {
          const Icon = ICONS[r.icon] || Trophy;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} style={{ color: r.color }} />
                <p className="text-xs font-bold" style={{ color: DARK }}>{r.category}</p>
              </div>
              <div className="space-y-1">
                {r.top.map((t, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: j === 0 ? "#D4AF37" : j === 1 ? "#A0AEC0" : "#CD7F32" }}>{j + 1}</span>
                    <span className="text-[11px]" style={{ color: DARK }}>{t}</span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function AISection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🧠 AI VIP Intelligence Center" subtitle="AI-powered VIP analytics and predictions" />
      <div className="grid grid-cols-2 gap-2">
        {VIP_AI_INSIGHTS.map((a, i) => {
          const Icon = ICONS[a.icon] || Brain;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${a.color}10` }}>
                  <Icon size={14} style={{ color: a.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{a.label}</span>
              </div>
              <p className="text-base font-bold" style={{ color: a.color }}>{a.value}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{a.detail}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📊 VIP Analytics Center" subtitle="Advanced VIP performance analytics" />
      <div className="grid grid-cols-2 gap-2">
        {VIP_ANALYTICS.map((a, i) => (
          <Card key={i}>
            <p className="text-[10px] mb-1" style={{ color: GRAY }}>{a.metric}</p>
            <p className="text-lg font-bold" style={{ color: a.color }}>{a.value}</p>
            <p className="text-[9px] font-bold" style={{ color: "#27AE60" }}>{a.change}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReportsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📋 VIP Report Management" subtitle="Generate VIP reports" />
      <div className="grid grid-cols-2 gap-2">
        {VIP_REPORTS.map((r, i) => {
          const Icon = ICONS[r.icon] || FileText;
          return (
            <button key={i} className="rounded-xl p-3 flex items-center gap-2 active:scale-95 transition text-left" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${r.color}10` }}>
                <Icon size={16} style={{ color: r.color }} />
              </div>
              <div>
                <p className="text-[11px] font-bold" style={{ color: DARK }}>{r.name}</p>
                <p className="text-[9px]" style={{ color: GRAY }}>{r.type}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TeamSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="👥 VIP Team Management" subtitle="Manage VIP operations staff" />
      <div className="space-y-2">
        {VIP_TEAM.map((t, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)` }}>
                {t.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{t.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{t.role} • {t.staff_id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: t.color }}>{t.performance}</p>
                <p className="text-[9px]" style={{ color: GRAY }}>{t.tasks} tasks</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="⚙️ VIP Settings Center" subtitle="Manage VIP system settings" />
      <div className="grid grid-cols-2 gap-2">
        {VIP_SETTINGS_GROUPS.map((s, i) => {
          const Icon = ICONS[s.icon] || SettingsIcon;
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
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${GOLD}10`, color: GOLD }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ToolsSection() {
  const { toast } = useToast();
  return (
    <div className="space-y-3">
      <SectionHeader title="🚀 VIP Manager Exclusive Tools" subtitle="Exclusive tools available only to VIP Managers" />
      <div className="space-y-2">
        {VIP_EXCLUSIVE_TOOLS.map((t, i) => {
          const Icon = ICONS[t.icon] || Rocket;
          return (
            <button key={i} onClick={() => toast({ title: t.name, description: t.desc })} className="w-full rounded-xl p-3 flex items-center gap-3 active:scale-[0.98] transition text-left" style={{ background: WHITE, border: `1px solid ${t.danger ? "#FECACA" : "#E5E7EB"}` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${t.color}10` }}>
                <Icon size={18} style={{ color: t.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{t.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{t.desc}</p>
              </div>
              {t.danger && <AlertTriangle size={14} style={{ color: "#EB5757" }} />}
            </button>
          );
        })}
      </div>

      {/* Permissions */}
      <div>
        <SectionHeader title="VIP Manager Permissions" />
        <Card>
          <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ Allowed</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {VIP_PERMISSIONS_ALLOWED.map((p, i) => (
              <span key={i} className="text-[9px] px-2 py-1 rounded-full" style={{ background: "#27AE6010", color: "#27AE60" }}>{p}</span>
            ))}
          </div>
          <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>❌ Restricted</p>
          <div className="flex flex-wrap gap-1.5">
            {VIP_PERMISSIONS_RESTRICTED.map((p, i) => (
              <span key={i} className="text-[9px] px-2 py-1 rounded-full" style={{ background: "#EB575710", color: "#EB5757" }}>{p}</span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

const SECTIONS = {
  overview: HomeSection, members: MembersSection, levels: LevelsSection,
  rewards: RewardsSection, events: EventsSection, host_engagement: HostEngagementSection,
  revenue: RevenueSection, retention: RetentionSection, growth: GrowthSection,
  communication: CommunicationSection, benefits: BenefitsSection, partnerships: PartnershipsSection,
  country: CountrySection, rankings: RankingsSection, ai: AISection,
  analytics: AnalyticsSection, reports: ReportsSection, team: TeamSection,
  settings: SettingsSection, tools: ToolsSection,
};

export default function VipManagerDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);

  const ActiveComponent = SECTIONS[activeSection] || HomeSection;
  const activeSectionData = VIP_SECTIONS.find(s => s.id === activeSection) || VIP_SECTIONS[0];

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 100%)", boxShadow: "0 4px 16px rgba(15,27,61,0.15)" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              <span>💎</span> VIP Manager Dashboard
            </h1>
            <p className="text-[10px] text-white/60">VIP Membership & Premium Experience Control Center</p>
          </div>
          <button onClick={() => setShowSidebar(!showSidebar)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(212,175,55,0.2)" }}>
            <LayoutDashboard size={16} style={{ color: GOLD }} />
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="px-4 pt-3">
          <button onClick={() => setShowSidebar(!showSidebar)} className="w-full rounded-xl p-2.5 flex items-center gap-2 active:scale-95 transition" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${activeSectionData.color}10` }}>
              {(() => { const Icon = ICONS[activeSectionData.icon] || LayoutDashboard; return <Icon size={14} style={{ color: activeSectionData.color }} />; })()}
            </div>
            <span className="text-xs font-bold flex-1 text-left" style={{ color: DARK }}>{activeSectionData.label}</span>
            <ChevronRight size={16} style={{ color: GRAY }} className={showSidebar ? "rotate-90 transition" : "transition"} />
          </button>
        </div>

        {/* Section selector */}
        {showSidebar && (
          <div className="px-4 pt-2 animate-fadeIn">
            <div className="rounded-2xl p-3" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
              <div className="grid grid-cols-4 gap-2">
                {VIP_SECTIONS.map((s, i) => {
                  const Icon = ICONS[s.icon] || Activity;
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

        {/* Content */}
        <div className="px-4 pt-3">
          <ActiveComponent onNavigate={(id) => { setActiveSection(id); setShowSidebar(false); }} />
        </div>
      </div>
    </div>
  );
}