import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ChevronRight, ChevronDown, Search, Briefcase, Shield,
  LayoutDashboard, Users, Mic, Handshake, Building2, TrendingUp,
  Target, DollarSign, Megaphone, PartyPopper, FileCheck, Mail,
  BarChart3, BrainCircuit, Trophy, FileText, FolderOpen, Settings,
  Bell, Calendar, CalendarRange, Percent, Globe, MessageSquare,
  CheckCircle, Activity, ClipboardList, Zap, ShieldCheck, Lightbulb,
  FileSignature, FileBarChart, FileSpreadsheet, Plus, Rocket,
} from "lucide-react";
import {
  BIZ_SECTIONS, BIZ_KPIS, BIZ_QUICK_ACTIONS, BIZ_REALTIME_COUNTERS,
  BIZ_LIVE_STREAM, BIZ_TEAM_MEMBERS, BIZ_HOST_PERF, BIZ_AGENTS, BIZ_AGENCIES,
  BIZ_GROWTH_METRICS, BIZ_TARGETS, BIZ_REVENUE_PERIODS, BIZ_CAMPAIGNS,
  BIZ_EVENTS, BIZ_APPLICATIONS, BIZ_COMM_TARGETS, BIZ_COMM_TYPES,
  BIZ_ANALYTICS, BIZ_AI_INSIGHTS, BIZ_PERFORMANCE, BIZ_REPORTS,
  BIZ_DOCUMENTS, BIZ_OPERATIONS, BIZ_NOTIFICATION_LOGS, BIZ_SETTINGS_GROUPS,
  BIZ_EXCLUSIVE_TOOLS, BIZ_REPORTING_STRUCTURE,
} from "@/components/business-manager/businessManagerData";
import ReportToSection from "@/components/shared/ReportToSection";

const ICONS = {
  LayoutDashboard, Users, Mic, Handshake, Building2, TrendingUp, Target,
  DollarSign, Megaphone, PartyPopper, FileCheck, Mail, BarChart3,
  BrainCircuit, Trophy, FileText, FolderOpen, Settings, Bell, Calendar,
  CalendarRange, Percent, Globe, MessageSquare, CheckCircle, Activity,
  ClipboardList, Zap, ShieldCheck, Lightbulb, FileSignature, FileBarChart,
  FileSpreadsheet, Plus, Briefcase, Search, ChevronDown, ArrowLeft,
  ChevronRight, Shield,
};

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";
const SLATE = "#475569";
const BIZ_GOLD = "#F59E0B";

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
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)", boxShadow: "0 4px 16px rgba(245,158,11,0.4)" }}>💼</div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white">Business Command Center</h2>
            <p className="text-[10px] text-white/60">Business Operations & Growth Control</p>
          </div>
        </div>
      </div>

      <Card className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${BIZ_REPORTING_STRUCTURE.color}10` }}>
          <Building2 size={18} style={{ color: BIZ_REPORTING_STRUCTURE.color }} />
        </div>
        <div>
          <p className="text-[10px]" style={{ color: GRAY }}>Reports To</p>
          <p className="text-sm font-bold" style={{ color: DARK }}>🏢 {BIZ_REPORTING_STRUCTURE.reportsTo}</p>
        </div>
      </Card>

      <div>
        <SectionHeader title="Real-Time Counters" subtitle="Live business activity" />
        <div className="grid grid-cols-3 gap-2">
          {BIZ_REALTIME_COUNTERS.map((c, i) => {
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
        <SectionHeader title="Executive KPIs" subtitle="Business overview metrics" />
        <div className="grid grid-cols-2 gap-2">
          {BIZ_KPIS.map((k, i) => {
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
          {BIZ_QUICK_ACTIONS.map((a, i) => {
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
        <SectionHeader title="Live Business Activity" subtitle="Real-time operations stream" />
        <Card>
          <div className="space-y-2">
            {BIZ_LIVE_STREAM.map((item, i) => (
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
        <SectionHeader title="All Modules" subtitle="20 business management centers" />
        <div className="grid grid-cols-3 gap-2">
          {BIZ_SECTIONS.map((s, i) => {
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

function TeamSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="👥 Team Management" subtitle="Manage business teams and staff" />
      <div className="space-y-2">
        {BIZ_TEAM_MEMBERS.map((t, i) => (
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
                <p className="text-xs font-bold" style={{ color: t.color }}>{t.rating}</p>
                <StatusBadge status={t.status} color={t.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Add Member", "Assign Task", "Monitor Performance", "Approve Requests", "Remove Member"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function HostsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎙️ Host Performance" subtitle="Monitor and optimize host performance" />
      <div className="space-y-2">
        {BIZ_HOST_PERF.map((h, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${h.color}10` }}>
                <Mic size={16} style={{ color: h.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{h.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{h.revenue} • {h.followers} followers • {h.hours} streamed</p>
              </div>
              <StatusBadge status={h.status} color={h.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Profile", "Performance Review", "Send Recommendation", "Issue Warning", "Reward Host"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AgentsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🤝 Agent Management" subtitle="Manage talent agents and productivity" />
      <div className="space-y-2">
        {BIZ_AGENTS.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Handshake size={16} style={{ color: a.color }} />
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
        {["View Agent", "Assign Targets", "Monitor Performance", "Approve Incentives"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AgenciesSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏢 Agency Management" subtitle="Manage agency activities and performance" />
      <div className="space-y-2">
        {BIZ_AGENCIES.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Building2 size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.hosts} hosts • {a.revenue} • Growth: {a.growth}</p>
              </div>
              <StatusBadge status={a.status} color={a.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Agency", "Review Performance", "Approve Requests", "Suspend", "Generate Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function GrowthSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📈 Business Growth" subtitle="Track and manage growth activities" />
      <div className="grid grid-cols-2 gap-2">
        {BIZ_GROWTH_METRICS.map((g, i) => {
          const Icon = ICONS[g.icon] || TrendingUp;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${g.color}10` }}>
                  <Icon size={14} style={{ color: g.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{g.metric}</span>
              </div>
              <p className="text-lg font-bold" style={{ color: g.color }}>{g.value}</p>
              <p className="text-[9px] font-bold" style={{ color: "#27AE60" }}>{g.change}</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Metrics", "Analyze Trends", "Create Growth Plan", "Monitor Progress"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function TargetsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎯 Target Management" subtitle="Manage business goals and objectives" />
      <div className="space-y-2">
        {BIZ_TARGETS.map((t, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${t.color}10` }}>
                <Target size={16} style={{ color: t.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{t.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{t.achieved} / {t.target}</p>
              </div>
              <StatusBadge status={t.status} color={t.color} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1 h-2 rounded-full mr-2" style={{ background: "#F3F4F6" }}>
                <div className="h-full rounded-full" style={{ width: t.rate, background: t.color }} />
              </div>
              <span className="text-[10px] font-bold" style={{ color: t.color }}>{t.rate}</span>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Target", "Assign Target", "Update Target", "Close Target"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function RevenueSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="💰 Revenue Management" subtitle="Monitor revenue performance and profitability" />
      <div className="grid grid-cols-2 gap-2">
        {BIZ_REVENUE_PERIODS.map((p, i) => (
          <Card key={i}>
            <p className="text-[9px]" style={{ color: GRAY }}>{p.label}</p>
            <p className="text-lg font-bold" style={{ color: p.color }}>{p.value}</p>
            <p className="text-[9px] font-bold" style={{ color: "#27AE60" }}>{p.change}</p>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Revenue Analysis", "Revenue Forecast", "Generate Report", "Export Data"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CampaignsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📣 Campaign Management" subtitle="Manage marketing and recruitment campaigns" />
      <div className="space-y-2">
        {BIZ_CAMPAIGNS.map((c, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${c.color}10` }}>
                <Megaphone size={16} style={{ color: c.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{c.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{c.type} • {c.reach} reach</p>
              </div>
              <StatusBadge status={c.status} color={c.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Campaign", "Launch", "Pause", "End", "Analyze Results"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function EventsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎉 Event Management" subtitle="Manage business and promotional events" />
      <div className="space-y-2">
        {BIZ_EVENTS.map((e, i) => (
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
        {["Create Event", "Edit Event", "Launch", "Monitor", "Close Event"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ApplicationsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📋 Application Management" subtitle="Manage host, agent, and agency applications" />
      <div className="space-y-2">
        {BIZ_APPLICATIONS.map((a, i) => (
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
        {["Review", "Approve", "Reject", "Hold", "Request Documents"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CommunicationSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📨 Communication Center" subtitle="Internal communication and announcements" />
      <div>
        <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>Send To</p>
        <div className="grid grid-cols-2 gap-2">
          {BIZ_COMM_TARGETS.map((c, i) => {
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
          {BIZ_COMM_TYPES.map((c, i) => {
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

function AnalyticsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📊 Analytics Center" subtitle="Advanced analytics and business reporting" />
      <div className="grid grid-cols-2 gap-2">
        {BIZ_ANALYTICS.map((a, i) => {
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
        {["View Analytics", "Export Analytics", "Compare Data"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AISection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🧠 Business Intelligence" subtitle="AI-powered forecasting and insights" />
      <div className="grid grid-cols-2 gap-2">
        {BIZ_AI_INSIGHTS.map((a, i) => {
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
        {["Generate Insights", "Analyze Trends", "Create Forecast"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function PerformanceSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏆 Performance Management" subtitle="Track business achievements and performance" />
      <div className="grid grid-cols-2 gap-2">
        {BIZ_PERFORMANCE.map((p, i) => {
          const Icon = ICONS[p.icon] || Trophy;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${p.color}10` }}>
                  <Icon size={14} style={{ color: p.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{p.metric}</span>
              </div>
              <p className="text-lg font-bold" style={{ color: p.color }}>{p.value}</p>
              <p className="text-[9px] font-bold" style={{ color: "#27AE60" }}>{p.change}</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Performance", "Generate Scorecard", "Assign Rewards", "Track Achievements"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ReportsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📑 Report Management" subtitle="Generate and manage business reports" />
      <div className="grid grid-cols-1 gap-2">
        {BIZ_REPORTS.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${BIZ_GOLD}10` }}>
                <FileText size={16} style={{ color: BIZ_GOLD }} />
              </div>
              <span className="text-xs font-semibold flex-1" style={{ color: DARK }}>{r}</span>
              <ChevronRight size={16} style={{ color: GRAY }} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Report", "Export Report", "Schedule Report", "Archive Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function DocumentsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📁 Document Management" subtitle="Manage contracts and operational documents" />
      <div className="grid grid-cols-2 gap-2">
        {BIZ_DOCUMENTS.map((d, i) => {
          const Icon = ICONS[d.icon] || FolderOpen;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${d.color}10` }}>
                  <Icon size={14} style={{ color: d.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{d.type}</span>
              </div>
              <p className="text-sm font-bold" style={{ color: d.color }}>{d.count}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{d.name}</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Upload Document", "Download", "Share", "Archive"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function OperationsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="⚙️ Operations Center" subtitle="Manage day-to-day business operations" />
      <div className="grid grid-cols-2 gap-2">
        {BIZ_OPERATIONS.map((o, i) => {
          const Icon = ICONS[o.icon] || Settings;
          return (
            <button key={i} className="rounded-xl p-3 flex items-center gap-2 active:scale-95 transition text-left" style={{ background: `${o.color}08`, border: `1px solid ${o.color}20` }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${o.color}15` }}>
                <Icon size={16} style={{ color: o.color }} />
              </div>
              <span className="text-[11px] font-semibold flex-1" style={{ color: DARK }}>{o.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NotificationsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🔔 Notification Center" subtitle="Manage alerts and notifications" />
      <div className="space-y-2">
        {BIZ_NOTIFICATION_LOGS.map((n, i) => (
          <Card key={i}>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${n.color}10` }}>
                <Bell size={14} style={{ color: n.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{n.title}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{n.message}</p>
                <p className="text-[9px] mt-0.5" style={{ color: GRAY }}>{n.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Alert", "Send Notification", "Schedule", "View Logs"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ExclusiveSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🚀 Exclusive Tools" subtitle="Executive tools for Business Managers only" />
      <div className="grid grid-cols-1 gap-2">
        {BIZ_EXCLUSIVE_TOOLS.map((t, i) => {
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
  overview: HomeSection, team: TeamSection, hosts: HostsSection, agents: AgentsSection,
  agencies: AgenciesSection, growth: GrowthSection, targets: TargetsSection,
  revenue: RevenueSection, campaigns: CampaignsSection, events: EventsSection,
  applications: ApplicationsSection, communication: CommunicationSection,
  analytics: AnalyticsSection, ai: AISection, performance: PerformanceSection,
  reports: ReportsSection, documents: DocumentsSection, operations: OperationsSection,
  notifications: NotificationsSection, exclusive: ExclusiveSection,
};

export default function BusinessManagerDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);

  const ActiveComponent = SECTIONS[activeSection] || HomeSection;
  const activeSectionData = BIZ_SECTIONS.find(s => s.id === activeSection) || BIZ_SECTIONS[0];

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #78350F 100%)", boxShadow: "0 4px 16px rgba(15,27,61,0.15)" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              <Briefcase size={16} /> Business Manager
            </h1>
            <p className="text-[10px] text-white/60">Business Operations & Growth Control</p>
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
                {BIZ_SECTIONS.map((s, i) => {
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
          <ReportToSection roleKey="business-manager" theme="light" />
        </div>

        <div className="px-4 pt-3">
          <ActiveComponent onNavigate={(id) => { setActiveSection(id); setShowSidebar(false); }} />
        </div>
      </div>
    </div>
  );
}