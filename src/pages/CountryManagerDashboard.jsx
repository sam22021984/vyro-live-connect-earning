import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ChevronRight, ChevronDown, Search, Globe, Shield,
  LayoutDashboard, Users, Mic, User, Building2, FileCheck,
  DollarSign, Gift, Coins, Trophy, Radio, Swords, PartyPopper,
  Crown, Flag, ShieldCheck, Megaphone, BarChart3, Settings,
  CheckCircle, Calendar, CalendarRange, UserPlus, Bell, MessageSquare,
  Mail, Heart, Repeat, Award, Gem, Sparkles, Hash, Fingerprint,
  AtSign, Phone, AudioLines, ArrowUpFromLine, Plus,
} from "lucide-react";
import {
  CTRY_SECTIONS, CTRY_KPIS, CTRY_QUICK_ACTIONS, CTRY_REALTIME_COUNTERS,
  CTRY_LIVE_STREAM, CTRY_SEARCH_TYPES, CTRY_SEARCH_RESULTS, CTRY_USERS,
  CTRY_HOSTS, CTRY_AGENTS, CTRY_AGENCIES, CTRY_APPLICATIONS, CTRY_REVENUE_PERIODS,
  CTRY_REVENUE_SOURCES, CTRY_GIFT_STATS, CTRY_COIN_STATS, CTRY_RANKINGS,
  CTRY_LIVE_STREAMS, CTRY_PK_BATTLES, CTRY_EVENTS, CTRY_VIP_STATS,
  CTRY_REPORTS, CTRY_SECURITY_LOGS, CTRY_BROADCAST_TARGETS, CTRY_BROADCAST_TYPES,
  CTRY_ANALYTICS, CTRY_SETTINGS_GROUPS, CTRY_COUNTRY_INFO, CTRY_REPORTING_STRUCTURE,
} from "@/components/country-manager/countryManagerData";

const ICONS = {
  LayoutDashboard, Search, Users, Mic, User, Building2, FileCheck,
  DollarSign, Gift, Coins, Trophy, Radio, Swords, PartyPopper, Crown,
  Flag, ShieldCheck, Megaphone, BarChart3, Settings, CheckCircle,
  Calendar, CalendarRange, UserPlus, Bell, MessageSquare, Mail, Heart,
  Repeat, Award, Gem, Sparkles, Hash, Fingerprint, AtSign, Phone,
  AudioLines, ArrowUpFromLine, Plus, Globe, ChevronDown, ArrowLeft,
  ChevronRight, Shield,
};

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";
const SLATE = "#475569";
const CTRY_GREEN = "#10B981";

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
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #065F46 100%)", boxShadow: "0 8px 24px rgba(15,27,61,0.2)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #10B981, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "linear-gradient(135deg, #10B981, #047857)", boxShadow: "0 4px 16px rgba(16,185,129,0.4)" }}>🌍</div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white">Country Command Center</h2>
            <p className="text-[10px] text-white/60">{CTRY_COUNTRY_INFO.flag} {CTRY_COUNTRY_INFO.name} • Country Operations Control</p>
          </div>
        </div>
      </div>

      <Card className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${CTRY_REPORTING_STRUCTURE.color}10` }}>
          <Building2 size={18} style={{ color: CTRY_REPORTING_STRUCTURE.color }} />
        </div>
        <div>
          <p className="text-[10px]" style={{ color: GRAY }}>Reports To</p>
          <p className="text-sm font-bold" style={{ color: DARK }}>🏢 {CTRY_REPORTING_STRUCTURE.reportsTo}</p>
        </div>
      </Card>

      <div>
        <SectionHeader title="Real-Time Counters" subtitle="Live country activity" />
        <div className="grid grid-cols-3 gap-2">
          {CTRY_REALTIME_COUNTERS.map((c, i) => {
            const Icon = ICONS[c.icon] || Globe;
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
        <SectionHeader title="Executive KPIs" subtitle="Country overview metrics" />
        <div className="grid grid-cols-2 gap-2">
          {CTRY_KPIS.map((k, i) => {
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
          {CTRY_QUICK_ACTIONS.map((a, i) => {
            const Icon = ICONS[a.icon] || Plus;
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
        <SectionHeader title="Live Country Activity" subtitle="Real-time event stream" />
        <Card>
          <div className="space-y-2">
            {CTRY_LIVE_STREAM.map((item, i) => (
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
        <SectionHeader title="All Modules" subtitle="20 country management centers" />
        <div className="grid grid-cols-3 gap-2">
          {CTRY_SECTIONS.map((s, i) => {
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

function SearchSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🔍 Country Search Center" subtitle="Search users, hosts, agents, and agencies" />
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Search size={16} style={{ color: GRAY }} />
          <input type="text" placeholder="Search by ID, name, phone..." className="flex-1 bg-transparent text-xs outline-none" style={{ color: DARK }} />
        </div>
        <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>Search By</p>
        <div className="grid grid-cols-4 gap-2">
          {CTRY_SEARCH_TYPES.map((s, i) => {
            const Icon = ICONS[s.icon] || Search;
            return (
              <button key={i} className="rounded-xl p-2 flex flex-col items-center gap-1 active:scale-95 transition" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                  <Icon size={12} style={{ color: s.color }} />
                </div>
                <span className="text-[8px] font-semibold text-center" style={{ color: DARK }}>{s.label}</span>
              </button>
            );
          })}
        </div>
      </Card>
      <SectionHeader title="Search Results" />
      <div className="space-y-2">
        {CTRY_SEARCH_RESULTS.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}cc)` }}>
                {r.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{r.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{r.id} • {r.type} • {r.revenue}</p>
              </div>
              <StatusBadge status={r.status} color={r.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Profile", "Send Message", "Issue Warning", "Suspend", "Reactivate"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function UsersSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="👥 User Management" subtitle="Manage all users within the country" />
      <div className="space-y-2">
        {CTRY_USERS.map((u, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: `linear-gradient(135deg, ${u.color}, ${u.color}cc)` }}>
                {u.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{u.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{u.id} • {u.device} • VIP: {u.vip}</p>
              </div>
              <StatusBadge status={u.status} color={u.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Profile", "Issue Warning", "Suspend", "Reactivate", "Send Message"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function HostsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎙️ Host Management" subtitle="Monitor and manage all hosts" />
      <div className="space-y-2">
        {CTRY_HOSTS.map((h, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${h.color}10` }}>
                <Mic size={16} style={{ color: h.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{h.name} <span className="text-[9px]" style={{ color: h.color }}>{h.level}</span></p>
                <p className="text-[10px]" style={{ color: GRAY }}>{h.followers} followers • {h.agency} • {h.revenue}</p>
              </div>
              <StatusBadge status={h.status} color={h.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Host", "View Performance", "Warning", "Suspend", "Feature Host"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AgentsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🧑‍💼 Talent Agent Management" subtitle="Monitor all talent agents" />
      <div className="space-y-2">
        {CTRY_AGENTS.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <User size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.hosts} hosts • {a.agency} • {a.revenue}</p>
              </div>
              <StatusBadge status={a.status} color={a.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Agent", "Performance Analytics", "Warning", "Suspend Agent"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AgenciesSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏢 Agency Management" subtitle="Manage all agencies within the country" />
      <div className="space-y-2">
        {CTRY_AGENCIES.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Building2 size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>Owner: {a.owner} • {a.hosts} hosts • {a.revenue}</p>
              </div>
              <StatusBadge status={a.status} color={a.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Agency", "Revenue Analysis", "Warning", "Suspend Agency"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ApplicationsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📋 Country Application Center" subtitle="Manage host, agent, and agency applications" />
      <div className="space-y-2">
        {CTRY_APPLICATIONS.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <FileCheck size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.id} — {a.applicant}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.type} • {a.date}</p>
              </div>
              <StatusBadge status={a.status} color={a.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Approve", "Reject", "Hold", "Request Documents"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function RevenueSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="💰 Country Revenue Center" subtitle="Track and monitor country revenue" />
      <div className="grid grid-cols-2 gap-2">
        {CTRY_REVENUE_PERIODS.map((p, i) => (
          <Card key={i}>
            <p className="text-[9px]" style={{ color: GRAY }}>{p.label} Revenue</p>
            <p className="text-lg font-bold" style={{ color: p.color }}>{p.value}</p>
            <p className="text-[9px] font-bold" style={{ color: "#27AE60" }}>{p.change}</p>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        {CTRY_REVENUE_SOURCES.map((r, i) => {
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
        {["Revenue Analytics", "Revenue Forecasting", "Export Reports"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function GiftsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎁 Country Gift Center" subtitle="Track gift analytics and trends" />
      <div className="grid grid-cols-2 gap-2">
        {CTRY_GIFT_STATS.map((g, i) => {
          const Icon = ICONS[g.icon] || Gift;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${g.color}10` }}>
                  <Icon size={14} style={{ color: g.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{g.metric}</span>
              </div>
              <p className="text-sm font-bold" style={{ color: g.color }}>{g.value}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{g.detail}</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Gift Statistics", "Gift Reports", "Gift Trends"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CoinsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🪙 Country Coin Center" subtitle="Monitor coin economy statistics" />
      <div className="grid grid-cols-1 gap-2">
        {CTRY_COIN_STATS.map((c, i) => {
          const Icon = ICONS[c.icon] || Coins;
          return (
            <Card key={i}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${c.color}10` }}>
                  <Icon size={16} style={{ color: c.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: DARK }}>{c.metric}</p>
                  <p className="text-[10px]" style={{ color: GRAY }}>{c.revenue} revenue</p>
                </div>
                <p className="text-lg font-bold" style={{ color: c.color }}>{c.value}</p>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Coin Analytics", "Promotion Reports", "Sales Reports"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function RankingsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏆 Country Ranking Center" subtitle="Track top performers across categories" />
      <div className="space-y-2">
        {CTRY_RANKINGS.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: r.rank <= 3 ? `linear-gradient(135deg, ${r.color}, ${r.color}cc)` : `${SLATE}20`, color: r.rank <= 3 ? WHITE : SLATE }}>
                {r.rank}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{r.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{r.category}</p>
              </div>
              <p className="text-sm font-bold" style={{ color: "#27AE60" }}>{r.score}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Daily", "Weekly", "Monthly", "Lifetime"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function LiveSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📡 Live Monitoring Center" subtitle="Monitor all active live streams" />
      <div className="space-y-2">
        {CTRY_LIVE_STREAMS.map((l, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${l.color}10` }}>
                <Radio size={16} style={{ color: l.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{l.host}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{l.viewers} viewers • Gifts: {l.gifts} • Rev: {l.revenue}</p>
              </div>
              <StatusBadge status={l.status} color={l.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Watch Live", "Send Warning", "Contact Host", "End Live Stream"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function PkSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="⚔️ PK Monitoring Center" subtitle="Monitor active PK battles" />
      <div className="space-y-2">
        {CTRY_PK_BATTLES.map((p, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${p.color}10` }}>
                <Swords size={16} style={{ color: p.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{p.hostA} vs {p.hostB}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{p.viewers} viewers • {p.revenue} revenue</p>
              </div>
              <StatusBadge status={p.status} color={p.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Monitor PK", "Warning", "End PK Session"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function EventsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎉 Event Management" subtitle="Manage country, festival, and competition events" />
      <div className="space-y-2">
        {CTRY_EVENTS.map((e, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${e.color}10` }}>🎉</div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{e.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{e.type} • {e.participants} participants</p>
              </div>
              <StatusBadge status={e.status} color={e.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Event", "Edit Event", "Launch Event", "End Event"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function VipSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="💎 VIP Management" subtitle="Manage VIP users and programs" />
      <div className="grid grid-cols-2 gap-2">
        {CTRY_VIP_STATS.map((v, i) => {
          const Icon = ICONS[v.icon] || Crown;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${v.color}10` }}>
                  <Icon size={14} style={{ color: v.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{v.metric}</span>
              </div>
              <p className="text-sm font-bold" style={{ color: v.color }}>{v.value}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{v.detail}</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View VIP Members", "Upgrade VIP", "VIP Analytics"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ReportsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🚩 Report Management" subtitle="Manage user, host, agency, and fraud reports" />
      <div className="space-y-2">
        {CTRY_REPORTS.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${r.color}10` }}>
                <Flag size={16} style={{ color: r.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{r.id} — {r.type}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{r.target} • {r.reason} • {r.date}</p>
              </div>
              <StatusBadge status={r.status} color={r.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Review Report", "Warning", "Suspend Account", "Resolve Case"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🔒 Security Center" subtitle="Monitor security logs and threats" />
      <div className="space-y-2">
        {CTRY_SECURITY_LOGS.map((s, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}10` }}>
                <ShieldCheck size={16} style={{ color: s.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{s.id} — {s.action}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{s.target} • {s.ip} • {s.date}</p>
              </div>
              <StatusBadge status={s.severity} color={s.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Lock Account", "Freeze Account", "Unlock Account"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function BroadcastSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📢 Broadcast Center" subtitle="Send country-wide messages" />
      <div>
        <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>Send To</p>
        <div className="grid grid-cols-2 gap-2">
          {CTRY_BROADCAST_TARGETS.map((c, i) => {
            const Icon = ICONS[c.icon] || Megaphone;
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
        <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>Message Type</p>
        <div className="grid grid-cols-1 gap-2">
          {CTRY_BROADCAST_TYPES.map((c, i) => {
            const Icon = ICONS[c.icon] || Bell;
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
      <div className="flex flex-wrap gap-2">
        {["Create Broadcast", "Send Broadcast"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📊 Country Analytics" subtitle="Advanced country performance analytics" />
      <div className="grid grid-cols-2 gap-2">
        {CTRY_ANALYTICS.map((a, i) => {
          const Icon = ICONS[a.icon] || BarChart3;
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
        {["Export Analytics", "Generate Reports"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="⚙️ Country Settings" subtitle="Manage country system settings" />
      <div className="grid grid-cols-2 gap-2">
        {CTRY_SETTINGS_GROUPS.map((s, i) => {
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
        {["Update Settings", "Save Configuration"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

const SECTIONS = {
  overview: HomeSection, search: SearchSection, users: UsersSection, hosts: HostsSection,
  agents: AgentsSection, agencies: AgenciesSection, applications: ApplicationsSection,
  revenue: RevenueSection, gifts: GiftsSection, coins: CoinsSection, rankings: RankingsSection,
  live: LiveSection, pk: PkSection, events: EventsSection, vip: VipSection,
  reports: ReportsSection, security: SecuritySection, broadcast: BroadcastSection,
  analytics: AnalyticsSection, settings: SettingsSection,
};

export default function CountryManagerDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);

  const ActiveComponent = SECTIONS[activeSection] || HomeSection;
  const activeSectionData = CTRY_SECTIONS.find(s => s.id === activeSection) || CTRY_SECTIONS[0];

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #065F46 100%)", boxShadow: "0 4px 16px rgba(15,27,61,0.15)" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              <Globe size={16} /> Country Manager
            </h1>
            <p className="text-[10px] text-white/60">{CTRY_COUNTRY_INFO.flag} {CTRY_COUNTRY_INFO.name} • Country Operations Control</p>
          </div>
          <button onClick={() => setShowSidebar(!showSidebar)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.2)" }}>
            <LayoutDashboard size={16} style={{ color: "#6EE7B7" }} />
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
                {CTRY_SECTIONS.map((s, i) => {
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
          <ActiveComponent onNavigate={(id) => { setActiveSection(id); setShowSidebar(false); }} />
        </div>
      </div>
    </div>
  );
}