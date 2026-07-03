import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ChevronRight, ChevronDown, Shield, Briefcase,
  LayoutDashboard, Users, Mic, Handshake, Building2, TrendingUp,
  FileCheck, BadgeCheck, LifeBuoy, AlertTriangle, PartyPopper,
  Swords, Megaphone, BarChart3, ScrollText, FileText, Bell,
  Radio, MessageSquare, Plus,
} from "lucide-react";
import {
  ADMIN_SECTIONS, ADMIN_KPIS, ADMIN_QUICK_ACTIONS, ADMIN_REALTIME_COUNTERS,
  ADMIN_LIVE_STREAM, ADMIN_AGENCIES, ADMIN_AGENTS, ADMIN_HOSTS,
  ADMIN_APPLICATIONS, ADMIN_VERIFICATIONS, ADMIN_SUPPORT_CASES,
  ADMIN_REPORTS, ADMIN_EVENTS, ADMIN_PK_BATTLES, ADMIN_COMM_TARGETS,
  ADMIN_COMM_TYPES, ADMIN_ANALYTICS, ADMIN_AUDIT_LOGS, ADMIN_REPORTING_STRUCTURE,
} from "@/components/admin-dashboard/adminDashboardData";
import ReportToSection from "@/components/shared/ReportToSection";
import AdminPolicyTab from "@/components/admin-dashboard/AdminPolicyTab";

const ICONS = {
  LayoutDashboard, Users, Mic, Handshake, Building2, TrendingUp, FileCheck,
  BadgeCheck, LifeBuoy, AlertTriangle, PartyPopper, Swords, Megaphone,
  BarChart3, ScrollText, FileText, Bell, Radio, MessageSquare, Plus,
  Shield, Briefcase, ChevronDown, ArrowLeft, ChevronRight,
};

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";
const SLATE = "#475569";

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
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #334155 100%)", boxShadow: "0 8px 24px rgba(15,27,61,0.2)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #94A3B8, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "linear-gradient(135deg, #64748B, #475569)", boxShadow: "0 4px 16px rgba(100,116,139,0.4)" }}>👨‍💼</div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white">Operations Support Center</h2>
            <p className="text-[10px] text-white/60">Agency · Agent · Host Operations</p>
          </div>
        </div>
      </div>

      <Card className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${ADMIN_REPORTING_STRUCTURE.color}10` }}>
          <Shield size={18} style={{ color: ADMIN_REPORTING_STRUCTURE.color }} />
        </div>
        <div className="flex-1">
          <p className="text-[10px]" style={{ color: GRAY }}>Reports To</p>
          <p className="text-sm font-bold" style={{ color: DARK }}>🛡️ {ADMIN_REPORTING_STRUCTURE.reportsTo}</p>
        </div>
      </Card>

      <Card>
        <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>Directly Manages</p>
        <div className="flex flex-wrap gap-2">
          {ADMIN_REPORTING_STRUCTURE.manages.map((m, i) => (
            <span key={i} className="text-[10px] px-2.5 py-1 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{m}</span>
          ))}
        </div>
      </Card>

      <div>
        <SectionHeader title="Real-Time Counters" subtitle="Live operations activity" />
        <div className="grid grid-cols-3 gap-2">
          {ADMIN_REALTIME_COUNTERS.map((c, i) => {
            const Icon = ICONS[c.icon] || Briefcase;
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
        <SectionHeader title="Executive Overview" subtitle="Assigned operations metrics" />
        <div className="grid grid-cols-2 gap-2">
          {ADMIN_KPIS.map((k, i) => {
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
                  <span className="text-[9px] font-bold" style={{ color: k.trend === "up" ? "#27AE60" : k.trend === "down" ? "#EB5757" : GRAY }}>{k.change}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <SectionHeader title="Quick Actions" />
        <div className="grid grid-cols-2 gap-2">
          {ADMIN_QUICK_ACTIONS.map((a, i) => {
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
        <SectionHeader title="Live Operations Stream" subtitle="Real-time admin activity" />
        <Card>
          <div className="space-y-2">
            {ADMIN_LIVE_STREAM.map((item, i) => (
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
        <SectionHeader title="All Modules" subtitle="13 operations support centers" />
        <div className="grid grid-cols-3 gap-2">
          {ADMIN_SECTIONS.map((s, i) => {
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
      <SectionHeader title="🏢 Agency Management" subtitle="Manage all assigned agencies" />
      <div className="space-y-2">
        {ADMIN_AGENCIES.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Building2 size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.id} • {a.owner} • {a.country}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.hosts} hosts • {a.agents} agents • {a.revenue}</p>
              </div>
              <StatusBadge status={a.status} color={a.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Profile", "Review Performance", "Verify Documents", "Send Warning", "Send Notice", "Suspend Request", "Escalate", "Generate Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AgentsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🤝 Talent Agent Management" subtitle="Manage all assigned talent agents" />
      <div className="space-y-2">
        {ADMIN_AGENTS.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Handshake size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.id} • {a.agency} • {a.hosts} hosts</p>
                <p className="text-[10px]" style={{ color: GRAY }}>Rating: {a.rating}</p>
              </div>
              <StatusBadge status={a.status} color={a.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Profile", "Review Performance", "Verify Documents", "Send Notice", "Monitor", "Escalate", "Generate Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function HostsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎙️ Host Management" subtitle="Monitor and support assigned hosts" />
      <div className="space-y-2">
        {ADMIN_HOSTS.map((h, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${h.color}10` }}>
                <Mic size={16} style={{ color: h.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{h.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{h.id} • {h.agency} • {h.agent}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{h.level} • {h.hours} • {h.revenue} • {h.followers}</p>
              </div>
              <StatusBadge status={h.status} color={h.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Profile", "Monitor Live", "Review Performance", "Verify Documents", "Issue Warning", "Escalate", "Contact", "Generate Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ApplicationsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📋 Application Management" subtitle="Review host, agent, and agency applications" />
      <div className="space-y-2">
        {ADMIN_APPLICATIONS.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <FileCheck size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.id} — {a.applicant}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.type} • Agency: {a.agency} • {a.date}</p>
              </div>
              <StatusBadge status={a.status} color={a.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Review", "Verify Documents", "Approve", "Reject", "Request Info", "Escalate to Super Admin"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function VerificationSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="✅ Verification Center" subtitle="Review and verify entity documents" />
      <div className="space-y-2">
        {ADMIN_VERIFICATIONS.map((v, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${v.color}10` }}>
                <BadgeCheck size={16} style={{ color: v.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{v.id} — {v.entity}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{v.type} • Documents: {v.documents}</p>
              </div>
              <StatusBadge status={v.status} color={v.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Review Documents", "Approve", "Reject", "Request Re-Submission", "Verify Identity", "Verify Business"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function SupportSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎫 Support Center" subtitle="Handle support cases and inquiries" />
      <div className="space-y-2">
        {ADMIN_SUPPORT_CASES.map((c, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${c.color}10` }}>
                <LifeBuoy size={16} style={{ color: c.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{c.id} — {c.subject}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{c.category} • Priority: {c.priority}</p>
              </div>
              <StatusBadge status={c.status} color={c.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Open Case", "Assign", "Resolve", "Close", "Escalate", "Generate Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ComplianceSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🚨 Reports & Compliance" subtitle="Handle complaints, reports, and violations" />
      <div className="space-y-2">
        {ADMIN_REPORTS.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${r.color}10` }}>
                <AlertTriangle size={16} style={{ color: r.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{r.id} — {r.type}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>Reporter: {r.reporter} • Target: {r.target}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>Severity: {r.severity}</p>
              </div>
              <StatusBadge status={r.status} color={r.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Review Reports", "Investigate", "Issue Warning", "Create Violation", "Escalate", "Track Compliance"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function EventsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎉 Event Support" subtitle="Manage and support events" />
      <div className="space-y-2">
        {ADMIN_EVENTS.map((e, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${e.color}10` }}>🎉</div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{e.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{e.id} • {e.type} • {e.participants} participants</p>
              </div>
              <StatusBadge status={e.status} color={e.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Events", "Register Participants", "Verify Entries", "Monitor", "Review Results", "Generate Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function PKSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="⚔️ PK Support" subtitle="Monitor PK battles and resolve disputes" />
      <div className="space-y-2">
        {ADMIN_PK_BATTLES.map((p, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${p.color}10` }}>
                <Swords size={16} style={{ color: p.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{p.match}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{p.id} • Score: {p.score}</p>
              </div>
              <StatusBadge status={p.status} color={p.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Monitor Battles", "Verify Results", "Review Complaints", "Resolve Disputes", "Escalate", "Generate Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CommunicationSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📢 Communication Center" subtitle="Communicate with assigned entities" />
      <div>
        <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>Send To</p>
        <div className="grid grid-cols-1 gap-2">
          {ADMIN_COMM_TARGETS.map((c, i) => {
            const Icon = ICONS[c.icon] || Megaphone;
            return (
              <button key={i} className="rounded-xl p-3 flex items-center gap-2 active:scale-95 transition" style={{ background: `${c.color}08`, border: `1px solid ${c.color}20` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${c.color}15` }}>
                  <Icon size={14} style={{ color: c.color }} />
                </div>
                <span className="text-[11px] font-semibold flex-1 text-left" style={{ color: DARK }}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>Message Type</p>
        <div className="grid grid-cols-2 gap-2">
          {ADMIN_COMM_TYPES.map((c, i) => {
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
      <Card style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
        <p className="text-[10px] font-bold" style={{ color: "#EB5757" }}>❌ Restriction</p>
        <p className="text-[10px]" style={{ color: GRAY }}>Cannot send messages to all platform users — only assigned entities.</p>
      </Card>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📊 Reporting & Analytics" subtitle="Performance reports and analytics" />
      <div className="grid grid-cols-2 gap-2">
        {ADMIN_ANALYTICS.map((a, i) => {
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
        {["Generate Report", "Export", "Download Analytics", "Compare Performance"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AuditSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📋 Audit Log Center" subtitle="Track all entity and admin activities" />
      <div className="space-y-2">
        {ADMIN_AUDIT_LOGS.map((l, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${l.color}10` }}>
                <ScrollText size={16} style={{ color: l.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{l.action}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>Entity: {l.entity} • By: {l.admin}</p>
              </div>
              <span className="text-[9px]" style={{ color: GRAY }}>{l.time}</span>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Search Logs", "View History", "Export Logs", "Generate Audit Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

const SECTIONS = {
  overview: HomeSection, agencies: AgenciesSection, agents: AgentsSection,
  hosts: HostsSection, applications: ApplicationsSection, verification: VerificationSection,
  support: SupportSection, compliance: ComplianceSection, events: EventsSection,
  pk: PKSection, communication: CommunicationSection, analytics: AnalyticsSection,
  audit: AuditSection, policy: AdminPolicyTab,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);

  const ActiveComponent = SECTIONS[activeSection] || HomeSection;
  const activeSectionData = ADMIN_SECTIONS.find(s => s.id === activeSection) || ADMIN_SECTIONS[0];

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #334155 100%)", boxShadow: "0 4px 16px rgba(15,27,61,0.15)" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              <Briefcase size={16} /> Admin Dashboard
            </h1>
            <p className="text-[10px] text-white/60">Agency · Agent · Host Operations Support</p>
          </div>
          <button onClick={() => setShowSidebar(!showSidebar)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(148,163,184,0.2)" }}>
            <LayoutDashboard size={16} style={{ color: "#CBD5E1" }} />
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
                {ADMIN_SECTIONS.map((s, i) => {
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
          <ReportToSection roleKey="admin" theme="light" />
        </div>

        <div className="px-4 pt-3">
          <ActiveComponent onNavigate={(id) => { setActiveSection(id); setShowSidebar(false); }} />
        </div>
      </div>
    </div>
  );
}