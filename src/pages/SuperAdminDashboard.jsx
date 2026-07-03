import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ChevronRight, Shield,
  LayoutDashboard, Building2, Handshake, Mic, UserCog, FileText,
  TrendingUp, DollarSign, PartyPopper, Swords, AlertTriangle,
  ShieldCheck, Megaphone, BarChart3, ScrollText, Settings,
  Radio, Calendar, Search, FileCheck, Bell, MessageSquare, Mail,
  LogIn, Smartphone, Globe, ShieldOff, Lock, Snowflake, LogOut,
  Activity, Heart,
} from "lucide-react";
import {
  SUPERADMIN_SECTIONS, SUPERADMIN_KPIS, SUPERADMIN_QUICK_ACTIONS,
  SUPERADMIN_REALTIME_COUNTERS, SUPERADMIN_LIVE_STREAM,
  AGENCIES, AGENTS, HOSTS, ADMINS, APPLICATIONS, APPLICATION_LIST,
  PERFORMANCE_DATA, REVENUE_DATA, REVENUE_PERIODS, PK_BATTLES,
  VIOLATIONS, SECURITY_DATA, SECURITY_ACTIONS, COMM_TARGETS, COMM_TYPES,
  ANALYTICS_DATA, AUDIT_LOGS, SETTINGS_GROUPS, EVENTS,
} from "@/components/super-admin/superAdminData";
import ReportToSection from "@/components/shared/ReportToSection";

const ICONS = {
  LayoutDashboard, Building2, Handshake, Mic, UserCog, FileText, TrendingUp,
  DollarSign, PartyPopper, Swords, AlertTriangle, ShieldCheck, Megaphone,
  BarChart3, ScrollText, Settings, Radio, Calendar, Search, FileCheck, Bell,
  MessageSquare, Mail, LogIn, Smartphone, Globe, ShieldOff, Lock, Snowflake,
  LogOut, Activity, Heart, Shield,
};

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";
const SLATE = "#475569";

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl p-3 ${className}`} style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
      {children}
    </div>
  );
}

function KpiCard({ kpi }) {
  const Icon = ICONS[kpi.icon] || BarChart3;
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

function StatusBadge({ status, color }) {
  return <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: `${color}15`, color }}>{status}</span>;
}

function HomeSection({ onNavigate }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #1E3A5F 100%)", boxShadow: "0 8px 24px rgba(15,27,61,0.2)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #94A3B8, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #475569, #64748B)", boxShadow: "0 4px 16px rgba(71,85,105,0.4)" }}>
            <Shield size={28} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white">Operations Command Center</h2>
            <p className="text-[10px] text-white/60">Agency • Host • Agent • Admin Operations</p>
          </div>
        </div>
      </div>

      <div>
        <SectionHeader title="Real-Time Counters" subtitle="Live operational monitoring" />
        <div className="grid grid-cols-3 gap-2">
          {SUPERADMIN_REALTIME_COUNTERS.map((c, i) => {
            const Icon = ICONS[c.icon] || BarChart3;
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
        <SectionHeader title="Executive KPIs" subtitle="Operational overview metrics" />
        <div className="grid grid-cols-2 gap-2">
          {SUPERADMIN_KPIS.map((k, i) => <KpiCard key={i} kpi={k} />)}
        </div>
      </div>

      <div>
        <SectionHeader title="Quick Actions" />
        <div className="grid grid-cols-2 gap-2">
          {SUPERADMIN_QUICK_ACTIONS.map((a, i) => {
            const Icon = ICONS[a.icon] || Search;
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
        <SectionHeader title="Live Operations Activity" subtitle="Real-time event stream" />
        <Card>
          <div className="space-y-2">
            {SUPERADMIN_LIVE_STREAM.map((item, i) => (
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
        <SectionHeader title="All Modules" subtitle="16 operational management centers" />
        <div className="grid grid-cols-3 gap-2">
          {SUPERADMIN_SECTIONS.map((s, i) => {
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

function AgenciesSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏢 Agency Management" subtitle="Manage all registered agencies" />
      <div className="space-y-2">
        {AGENCIES.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Building2 size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.name} <span className="text-[9px]" style={{ color: GRAY }}>({a.id})</span></p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.owner} • {a.country}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.hosts} hosts • {a.agents} agents</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{a.revenue}</p>
                <StatusBadge status={a.status} color={a.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Profile", "Approve", "Suspend", "Reactivate", "Review Revenue", "Send Warning", "Contact", "Export"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AgentsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🤝 Agent Management" subtitle="Manage all talent agents and recruitment" />
      <div className="space-y-2">
        {AGENTS.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: `linear-gradient(135deg, ${a.color}, ${a.color}cc)` }}>
                {a.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.name} <span className="text-[9px]" style={{ color: GRAY }}>({a.id})</span></p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.agency} • {a.hosts} hosts managed</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{a.revenue}</p>
                <p className="text-[9px]" style={{ color: a.color }}>{a.rating} rating</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Approve", "Suspend", "Reactivate", "View Performance", "Review Earnings", "Send Notice", "Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function HostsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎙️ Host Management" subtitle="Manage all hosts and streaming activities" />
      <div className="space-y-2">
        {HOSTS.map((h, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${h.color}10` }}>
                <Mic size={16} style={{ color: h.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{h.name} <span className="text-[9px]" style={{ color: GRAY }}>({h.id})</span></p>
                <p className="text-[10px]" style={{ color: GRAY }}>{h.agency} • Agent: {h.agent}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{h.level} • {h.followers} followers • {h.liveHours} live</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{h.revenue}</p>
                <StatusBadge status={h.status} color={h.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Approve", "Suspend", "Reactivate", "Review Performance", "Monitor Live", "View Revenue", "Violations", "Warning", "Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AdminsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="👨‍💼 Admin Management" subtitle="Manage operational administrators" />
      <div className="space-y-2">
        {ADMINS.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: `linear-gradient(135deg, ${a.color}, ${a.color}cc)` }}>
                {a.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.name} <span className="text-[9px]" style={{ color: GRAY }}>({a.id})</span></p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.department} • {a.tasks} tasks</p>
                <p className="text-[9px]" style={{ color: GRAY }}>Last active: {a.lastActive}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: a.color }}>{a.score}</p>
                <StatusBadge status={a.status} color={a.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Admin", "Edit", "Assign Permissions", "Assign Tasks", "Suspend", "Reactivate", "Review", "Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ApplicationsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📋 Application Management" subtitle="Review and process applications" />
      <div className="grid grid-cols-1 gap-2">
        {APPLICATIONS.map((a, i) => {
          const Icon = ICONS[a.icon] || FileText;
          return (
            <Card key={i}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                  <Icon size={16} style={{ color: a.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: DARK }}>{a.type}</p>
                  <div className="flex gap-3 text-[10px] mt-0.5">
                    <span style={{ color: "#F2994A" }}>{a.pending} pending</span>
                    <span style={{ color: "#27AE60" }}>{a.approved} approved</span>
                    <span style={{ color: "#EB5757" }}>{a.rejected} rejected</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="space-y-2">
        {APPLICATION_LIST.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <FileText size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{a.id} — {a.applicant}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.type} • {a.date}</p>
              </div>
              <StatusBadge status={a.status} color={a.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Review", "Approve", "Reject", "Request Info", "Escalate"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function PerformanceSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📈 Performance Monitoring" subtitle="Track performance across all teams" />
      <div className="grid grid-cols-2 gap-2">
        {PERFORMANCE_DATA.map((p, i) => {
          const Icon = ICONS[p.icon] || TrendingUp;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${p.color}10` }}>
                  <Icon size={14} style={{ color: p.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{p.category}</span>
              </div>
              <p className="text-lg font-bold" style={{ color: p.color }}>{p.value}</p>
              <p className="text-[9px] font-bold" style={{ color: "#27AE60" }}>{p.change}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function RevenueSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="💰 Revenue Monitoring" subtitle="Track revenue across all operations" />
      <div className="grid grid-cols-4 gap-2">
        {REVENUE_PERIODS.map((p, i) => (
          <Card key={i} className="text-center">
            <p className="text-[9px]" style={{ color: GRAY }}>{p.label}</p>
            <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{p.value}</p>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        {REVENUE_DATA.map((r, i) => {
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

function EventsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎉 Event Monitoring" subtitle="Monitor events involving hosts, agencies, agents" />
      <div className="space-y-2">
        {EVENTS.map((e, i) => (
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
    </div>
  );
}

function PKSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="⚔️ PK Battle Monitoring" subtitle="Monitor PK battles and competitions" />
      <div className="space-y-2">
        {PK_BATTLES.map((p, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <Swords size={20} style={{ color: p.color }} />
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{p.id}</p>
                <p className="text-[11px]" style={{ color: DARK }}>{p.hostA} <span style={{ color: GRAY }}>vs</span> {p.hostB}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{p.scoreA} — {p.scoreB}</p>
              </div>
              <StatusBadge status={p.status} color={p.color} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ViolationsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🚨 Reports & Violations" subtitle="Manage reports and disciplinary actions" />
      <div className="space-y-2">
        {VIOLATIONS.map((v, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${v.color}10` }}>
                <AlertTriangle size={16} style={{ color: v.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{v.id} — {v.target}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{v.type} • Severity: {v.severity} • {v.date}</p>
              </div>
              <StatusBadge status={v.status} color={v.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Review", "Investigate", "Issue Warning", "Suspend", "Close Case"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🛡️ Security Monitoring" subtitle="Monitor security and access logs" />
      <div className="grid grid-cols-2 gap-2">
        {SECURITY_DATA.map((s, i) => {
          const Icon = ICONS[s.icon] || ShieldCheck;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}10` }}>
                  <Icon size={14} style={{ color: s.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{s.label}</span>
              </div>
              <p className="text-sm font-bold" style={{ color: DARK }}>{s.value}</p>
            </Card>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {SECURITY_ACTIONS.map((a, i) => {
          const Icon = ICONS[a.icon] || Lock;
          return (
            <button key={i} className="rounded-xl p-3 flex items-center gap-2 active:scale-95 transition" style={{ background: `${a.color}08`, border: `1px solid ${a.color}20` }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${a.color}15` }}>
                <Icon size={14} style={{ color: a.color }} />
              </div>
              <span className="text-[11px] font-semibold" style={{ color: DARK }}>{a.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CommunicationSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📢 Communication Center" subtitle="Send communications to teams" />
      <div>
        <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>Send To</p>
        <div className="grid grid-cols-2 gap-2">
          {COMM_TARGETS.map((c, i) => {
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
          {COMM_TYPES.map((c, i) => {
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

function AnalyticsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📊 Analytics Center" subtitle="Business intelligence & growth analytics" />
      <div className="grid grid-cols-2 gap-2">
        {ANALYTICS_DATA.map((a, i) => {
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
    </div>
  );
}

function AuditSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📋 Audit Log Center" subtitle="Track all operational activities" />
      <div className="space-y-2">
        {AUDIT_LOGS.map((l, i) => (
          <Card key={i}>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: l.color }} />
              <div className="flex-1">
                <p className="text-[11px] font-bold" style={{ color: DARK }}>{l.actor}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{l.action} — {l.target}</p>
              </div>
              <span className="text-[9px]" style={{ color: GRAY }}>{l.time}</span>
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
      <SectionHeader title="⚙️ Operation Settings" subtitle="Manage operational rules & configuration" />
      <div className="grid grid-cols-2 gap-2">
        {SETTINGS_GROUPS.map((s, i) => {
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
        {["Update Settings", "Save Changes", "Restore Defaults"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

const SECTIONS = {
  overview: HomeSection, agencies: AgenciesSection, agents: AgentsSection,
  hosts: HostsSection, admins: AdminsSection, applications: ApplicationsSection,
  performance: PerformanceSection, revenue: RevenueSection, events: EventsSection,
  pk: PKSection, violations: ViolationsSection, security: SecuritySection,
  communication: CommunicationSection, analytics: AnalyticsSection,
  audit: AuditSection, settings: SettingsSection,
};

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);

  const ActiveComponent = SECTIONS[activeSection] || HomeSection;
  const activeSectionData = SUPERADMIN_SECTIONS.find(s => s.id === activeSection) || SUPERADMIN_SECTIONS[0];

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 100%)", boxShadow: "0 4px 16px rgba(15,27,61,0.15)" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              <Shield size={16} /> Super Admin Dashboard
            </h1>
            <p className="text-[10px] text-white/60">Agency, Host, Agent & Admin Operations</p>
          </div>
          <button onClick={() => setShowSidebar(!showSidebar)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(148,163,184,0.2)" }}>
            <LayoutDashboard size={16} style={{ color: "#94A3B8" }} />
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
              <div className="grid grid-cols-4 gap-2">
                {SUPERADMIN_SECTIONS.map((s, i) => {
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
          <ReportToSection roleKey="super-admin" theme="light" />
        </div>

        <div className="px-4 pt-3">
          <ActiveComponent onNavigate={(id) => { setActiveSection(id); setShowSidebar(false); }} />
        </div>
      </div>
    </div>
  );
}