import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ChevronRight, Swords, Shield,
  LayoutDashboard, Trophy, PartyPopper, Gift, Award, Globe,
  BrainCircuit, AlertTriangle, DollarSign, Medal, Mic,
  Building2, BarChart3, Megaphone, FileText, Users, Settings, Rocket,
  CheckCircle, Calendar, Radio, TrendingUp, Coins, Crown,
  Bell, MessageSquare, Bot, Eye, Unlink, ShieldCheck,
  Activity, Clock, Plus, Search, Zap,
} from "lucide-react";
import {
  PK_SECTIONS, PK_KPIS, PK_QUICK_ACTIONS, PK_REALTIME_COUNTERS, PK_LIVE_STREAM,
  PK_BATTLES, PK_TOURNAMENTS, PK_EVENTS, PK_REWARD_TYPES, PK_RANKINGS,
  PK_GLOBAL_MONITORS, FAIR_PLAY_INSIGHTS, PK_DISPUTES, PK_REVENUE_DATA,
  PK_REVENUE_PERIODS, PK_ACHIEVEMENTS, HOST_PK_PERFORMANCE,
  AGENCY_PK_PERFORMANCE, COUNTRY_PK_PERFORMANCE, PK_ANALYTICS_DATA,
  PK_COMM_TARGETS, PK_COMM_TYPES, PK_REPORTS, PK_TEAM_MEMBERS,
  PK_SETTINGS_GROUPS, PK_EXCLUSIVE_TOOLS, PK_REPORTING_STRUCTURE,
} from "@/components/pk-manager/pkManagerData";
import ReportToSection from "@/components/shared/ReportToSection";
import LiveModuleSidebar from "@/components/shared/LiveModuleSidebar";
import PkManagerPolicyTab from "@/components/pk-manager/PkManagerPolicyTab";

const ICONS = {
  LayoutDashboard, Swords, Trophy, PartyPopper, Gift, Award, Globe, BrainCircuit,
  AlertTriangle, DollarSign, Medal, Mic, Building2, BarChart3, Megaphone, FileText,
  Users, Settings, Rocket, CheckCircle, Calendar, Radio, TrendingUp, Coins, Crown,
  Bell, MessageSquare, Bot, Eye, Unlink, ShieldCheck, Activity, Clock, Plus, Search,
  Zap, Shield,
};

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";
const SLATE = "#475569";
const PK_RED = "#EF4444";

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
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #7F1D1D 100%)", boxShadow: "0 8px 24px rgba(15,27,61,0.2)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #EF4444, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "linear-gradient(135deg, #EF4444, #B91C1C)", boxShadow: "0 4px 16px rgba(239,68,68,0.4)" }}>⚔️</div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white">PK Command Center</h2>
            <p className="text-[10px] text-white/60">PK Battle & Competition Control Center</p>
          </div>
        </div>
      </div>

      <Card className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${PK_REPORTING_STRUCTURE.color}10` }}>
          <Building2 size={18} style={{ color: PK_REPORTING_STRUCTURE.color }} />
        </div>
        <div>
          <p className="text-[10px]" style={{ color: GRAY }}>Reports To</p>
          <p className="text-sm font-bold" style={{ color: DARK }}>🏢 {PK_REPORTING_STRUCTURE.reportsTo}</p>
        </div>
      </Card>

      <div>
        <SectionHeader title="Real-Time Counters" subtitle="Live PK battle monitoring" />
        <div className="grid grid-cols-3 gap-2">
          {PK_REALTIME_COUNTERS.map((c, i) => {
            const Icon = ICONS[c.icon] || Swords;
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
        <SectionHeader title="Executive KPIs" subtitle="PK overview metrics" />
        <div className="grid grid-cols-2 gap-2">
          {PK_KPIS.map((k, i) => {
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
          {PK_QUICK_ACTIONS.map((a, i) => {
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
        <SectionHeader title="Live PK Activity" subtitle="Real-time battle stream" />
        <Card>
          <div className="space-y-2">
            {PK_LIVE_STREAM.map((item, i) => (
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
        <SectionHeader title="All Modules" subtitle="20 PK management centers" />
        <div className="grid grid-cols-3 gap-2">
          {PK_SECTIONS.map((s, i) => {
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

function BattlesSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎙️ PK Battle Management" subtitle="Manage all PK battles" />
      <div className="space-y-2">
        {PK_BATTLES.map((b, i) => (
          <Card key={i}>
            <div className="flex items-center gap-2 mb-2">
              <Swords size={16} style={{ color: b.color }} />
              <span className="text-[10px] font-bold" style={{ color: DARK }}>{b.id}</span>
              <span className="text-[10px]" style={{ color: GRAY }}>{b.country}</span>
              <div className="flex-1" />
              <StatusBadge status={b.status} color={b.color} />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 text-center">
                <p className="text-xs font-bold" style={{ color: DARK }}>{b.hostA}</p>
                {b.winner === b.hostA && <span className="text-[8px] font-bold" style={{ color: "#27AE60" }}>🏆 WINNER</span>}
              </div>
              <span className="text-[10px] font-bold" style={{ color: GRAY }}>VS</span>
              <div className="flex-1 text-center">
                <p className="text-xs font-bold" style={{ color: DARK }}>{b.hostB}</p>
                {b.winner === b.hostB && <span className="text-[8px] font-bold" style={{ color: "#27AE60" }}>🏆 WINNER</span>}
              </div>
            </div>
            <div className="flex items-center justify-between text-[9px]" style={{ color: GRAY }}>
              <span>⏱ {b.duration}</span>
              <span>🎁 {b.gifts}</span>
              <span style={{ color: "#27AE60" }} className="font-bold">{b.revenue}</span>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Battle", "Edit Battle", "Start", "End", "Cancel", "Review"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function TournamentsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏆 PK Tournament Center" subtitle="Manage tournaments and championships" />
      <div className="space-y-2">
        {PK_TOURNAMENTS.map((t, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${t.color}10` }}>
                <Trophy size={16} style={{ color: t.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{t.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{t.participants} participants • Prize: {t.prize}</p>
              </div>
              <StatusBadge status={t.status} color={t.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Tournament", "Manage Brackets", "Schedule Matches", "Announce Winners"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function EventsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎉 PK Event Management" subtitle="Manage PK competitions and seasonal events" />
      <div className="space-y-2">
        {PK_EVENTS.map((e, i) => (
          <Card key={i}>
            <div className="flex items-start gap-3">
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
        {["Create Event", "Launch Event", "Edit", "Pause", "End Event"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function RewardsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎁 PK Rewards Center" subtitle="Manage PK rewards and incentives" />
      <div className="grid grid-cols-2 gap-2">
        {PK_REWARD_TYPES.map((r, i) => {
          const Icon = ICONS[r.icon] || Gift;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${r.color}10` }}>
                  <Icon size={14} style={{ color: r.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight font-bold" style={{ color: DARK }}>{r.type}</span>
              </div>
              <p className="text-sm font-bold" style={{ color: r.color }}>{r.distributed}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{r.count} rewards</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Reward", "Assign Reward", "Approve Distribution", "View History"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function RankingsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏅 PK Rankings Center" subtitle="Track top PK performers" />
      <div className="space-y-2">
        {PK_RANKINGS.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: r.rank <= 3 ? `linear-gradient(135deg, ${r.color}, ${r.color}cc)` : `${SLATE}20`, color: r.rank <= 3 ? WHITE : SLATE }}>
                {r.rank}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{r.name} {r.country}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{r.type} • {r.wins} wins</p>
              </div>
              <p className="text-sm font-bold" style={{ color: "#27AE60" }}>{r.revenue}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Rankings", "Export Rankings", "Analyze Performance"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function MonitoringSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🌍 Global PK Monitoring" subtitle="Monitor all live PK battles globally" />
      <div className="space-y-2">
        {PK_GLOBAL_MONITORS.map((m, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${m.color}10` }}>
                <Globe size={16} style={{ color: m.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{m.region}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{m.battles} total • {m.live} live now</p>
              </div>
              <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{m.revenue}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Live Battles", "Monitor Activity", "Join Battle", "Review Results"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function FairPlaySection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🧠 AI Fair Play Center" subtitle="AI-powered anti-cheat and battle integrity" />
      <div className="grid grid-cols-2 gap-2">
        {FAIR_PLAY_INSIGHTS.map((f, i) => {
          const Icon = ICONS[f.icon] || BrainCircuit;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${f.color}10` }}>
                  <Icon size={14} style={{ color: f.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{f.title}</span>
              </div>
              <p className="text-sm font-bold" style={{ color: f.color }}>{f.value}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{f.detail}</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Analyze Battle", "Generate Risk Score", "Flag Activity", "Recommend Actions"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function DisputesSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🚨 PK Reports & Disputes" subtitle="Manage battle reports and disputes" />
      <div className="space-y-2">
        {PK_DISPUTES.map((d, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${d.color}10` }}>
                <AlertTriangle size={16} style={{ color: d.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{d.id} — {d.complainant}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{d.type} • {d.target} • Severity: {d.severity}</p>
              </div>
              <StatusBadge status={d.status} color={d.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Review Complaint", "Investigate", "Approve Resolution", "Reject Claim", "Close Case"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function RevenueSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="💰 PK Revenue Center" subtitle="Monitor PK-related revenue and earnings" />
      <div className="grid grid-cols-4 gap-2">
        {PK_REVENUE_PERIODS.map((p, i) => (
          <Card key={i} className="text-center">
            <p className="text-[9px]" style={{ color: GRAY }}>{p.label}</p>
            <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{p.value}</p>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        {PK_REVENUE_DATA.map((r, i) => {
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
        {["Analyze Revenue", "Export Report", "Compare Revenue"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AchievementsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎖️ PK Achievement Center" subtitle="Manage PK achievements and milestone rewards" />
      <div className="space-y-2">
        {PK_ACHIEVEMENTS.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Medal size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{a.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.earners} earners • Reward: {a.reward}</p>
              </div>
              <StatusBadge status={a.status} color={a.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Achievement", "Assign Rewards", "Track Progress", "Generate Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function HostPerfSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎙️ Host PK Performance" subtitle="Monitor host PK performance" />
      <div className="space-y-2">
        {HOST_PK_PERFORMANCE.map((h, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${h.color}10` }}>
                <Mic size={16} style={{ color: h.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{h.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{h.wins}W / {h.losses}L • Win Rate: {h.winRate}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{h.revenue}</p>
                <p className="text-[9px]" style={{ color: h.color }}>Rating: {h.rating}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Performance", "Analyze Results", "Compare Hosts", "Export Stats"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AgencyPerfSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏢 Agency PK Performance" subtitle="Monitor agency PK activities and rankings" />
      <div className="space-y-2">
        {AGENCY_PK_PERFORMANCE.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: a.rank <= 3 ? `linear-gradient(135deg, ${a.color}, ${a.color}cc)` : `${SLATE}20`, color: a.rank <= 3 ? WHITE : SLATE }}>
                #{a.rank}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.wins} wins • Win Rate: {a.winRate}</p>
              </div>
              <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{a.revenue}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Rankings", "Compare Agencies", "Export Reports", "Analyze"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CountryPerfSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🌍 Country PK Performance" subtitle="Track PK performance by country" />
      <div className="space-y-2">
        {COUNTRY_PK_PERFORMANCE.map((c, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <span className="text-xl">{c.flag}</span>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{c.country}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{c.battles} battles • {c.wins} wins</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{c.revenue}</p>
                <p className="text-[9px]" style={{ color: c.color }}>{c.rate} win rate</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Statistics", "Compare Countries", "Export Reports", "Monitor Growth"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📈 PK Analytics Center" subtitle="Advanced PK performance analytics" />
      <div className="grid grid-cols-2 gap-2">
        {PK_ANALYTICS_DATA.map((a, i) => {
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
        {["View Analytics", "Export Analytics", "Generate Insights", "Compare Metrics"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CommunicationSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📨 PK Communication Center" subtitle="Manage communication with PK participants" />
      <div>
        <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>Send To</p>
        <div className="grid grid-cols-2 gap-2">
          {PK_COMM_TARGETS.map((c, i) => {
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
        <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>Method</p>
        <div className="grid grid-cols-2 gap-2">
          {PK_COMM_TYPES.map((c, i) => {
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
    </div>
  );
}

function ReportsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📋 PK Report Management" subtitle="Generate and manage PK reports" />
      <div className="grid grid-cols-1 gap-2">
        {PK_REPORTS.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${PK_RED}10` }}>
                <FileText size={16} style={{ color: PK_RED }} />
              </div>
              <span className="text-xs font-semibold flex-1" style={{ color: DARK }}>{r}</span>
              <ChevronRight size={16} style={{ color: GRAY }} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Generate Report", "Export Report", "Schedule Report", "Archive Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function TeamSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="👥 PK Operations Team" subtitle="Manage PK operations staff" />
      <div className="space-y-2">
        {PK_TEAM_MEMBERS.map((t, i) => (
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
        {["Add Staff", "Assign Tasks", "Review Performance", "Monitor Productivity"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="⚙️ PK Settings Center" subtitle="Manage PK system settings" />
      <div className="grid grid-cols-2 gap-2">
        {PK_SETTINGS_GROUPS.map((s, i) => {
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
      <SectionHeader title="🚀 Exclusive Tools" subtitle="Executive tools for PK Managers only" />
      <div className="grid grid-cols-1 gap-2">
        {PK_EXCLUSIVE_TOOLS.map((t, i) => {
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
  overview: HomeSection, battles: BattlesSection, tournaments: TournamentsSection,
  events: EventsSection, rewards: RewardsSection, rankings: RankingsSection,
  monitoring: MonitoringSection, fairplay: FairPlaySection, disputes: DisputesSection,
  revenue: RevenueSection, achievements: AchievementsSection, hostperf: HostPerfSection,
  agencyperf: AgencyPerfSection, countryperf: CountryPerfSection, analytics: AnalyticsSection,
  communication: CommunicationSection, reports: ReportsSection, team: TeamSection,
  settings: SettingsSection, exclusive: ExclusiveSection, policy: PkManagerPolicyTab,
};

export default function PkManagerDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);

  const ActiveComponent = SECTIONS[activeSection] || HomeSection;
  const activeSectionData = PK_SECTIONS.find(s => s.id === activeSection) || PK_SECTIONS[0];

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #7F1D1D 100%)", boxShadow: "0 4px 16px rgba(15,27,61,0.15)" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              <Swords size={16} /> PK Manager Dashboard
            </h1>
            <p className="text-[10px] text-white/60">PK Battle & Competition Control</p>
          </div>
          <button onClick={() => setShowSidebar(!showSidebar)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.2)" }}>
            <LayoutDashboard size={16} style={{ color: "#FCA5A5" }} />
          </button>
        </div>

        <div className="px-4 pt-3">
          <button onClick={() => setShowSidebar(!showSidebar)} className="w-full rounded-xl p-2.5 flex items-center gap-2 active:scale-95 transition" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${activeSectionData.color}10` }}>
              {(() => { const Icon = ICONS[activeSectionData.icon] || LayoutDashboard; return <Icon size={14} style={{ color: activeSectionData.color }} />; })()}
            </div>
            <span className="text-xs font-bold flex-1 text-left" style={{ color: DARK }}>{activeSectionData.label}</span>
            <ChevronRight size={16} style={{ color: GRAY }} className={showSidebar ? "rotate-90 transition" : "transition"} />
          </button>
        </div>

        {showSidebar && (
          <div className="px-4 pt-2 animate-fadeIn">
            <div className="rounded-2xl p-3" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
              <LiveModuleSidebar
                dashboardCode="PK_DASHBOARD"
                iconMap={ICONS}
                activeSection={activeSection}
                onNavigate={(id) => { setActiveSection(id); setShowSidebar(false); }}
                staticSections={PK_SECTIONS}
                defaultColor="#EF4444"
              />
            </div>
          </div>
        )}

        <div className="px-4 pt-3">
          <ReportToSection roleKey="pk-manager" theme="light" />
        </div>

        <div className="px-4 pt-3">
          <ActiveComponent onNavigate={(id) => { setActiveSection(id); setShowSidebar(false); }} />
        </div>
      </div>
    </div>
  );
}