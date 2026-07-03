import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ChevronRight, ChevronDown, Rocket, Shield,
  LayoutDashboard, Users, Mic, Handshake, Building2, TrendingUp,
  Target, DollarSign, Megaphone, PartyPopper, FileCheck, Mail,
  BarChart3, BrainCircuit, Trophy, FileText, FolderOpen, Settings,
  Bell, Calendar, Globe, MessageSquare, CheckCircle, Activity,
  ClipboardList, Zap, ShieldCheck, Lightbulb, FileSignature,
  FileBarChart, FileSpreadsheet, Plus, CheckSquare,
} from "lucide-react";
import {
  BDEV_SECTIONS, BDEV_KPIS, BDEV_QUICK_ACTIONS, BDEV_REALTIME_COUNTERS,
  BDEV_LIVE_STREAM, BDEV_HOST_LEADS, BDEV_AGENTS, BDEV_AGENCIES, BDEV_LEADS,
  BDEV_MARKETS, BDEV_PARTNERSHIPS, BDEV_CAMPAIGNS, BDEV_REVENUE,
  BDEV_REGIONS, BDEV_APPLICATIONS, BDEV_COMM_TARGETS, BDEV_COMM_TYPES,
  BDEV_EVENTS, BDEV_PERFORMANCE, BDEV_AI_INSIGHTS, BDEV_TASKS,
  BDEV_DOCUMENTS, BDEV_ANALYTICS, BDEV_SETTINGS_GROUPS, BDEV_EXCLUSIVE_TOOLS,
  BDEV_REPORTING_STRUCTURE,
} from "@/components/business-developer/businessDeveloperData";
import ReportToSection from "@/components/shared/ReportToSection";
import BusinessDeveloperPolicyTab from "@/components/business-developer/BusinessDeveloperPolicyTab";

const ICONS = {
  LayoutDashboard, Users, Mic, Handshake, Building2, TrendingUp, Target,
  DollarSign, Megaphone, PartyPopper, FileCheck, Mail, BarChart3,
  BrainCircuit, Trophy, FileText, FolderOpen, Settings, Bell, Calendar,
  Globe, MessageSquare, CheckCircle, Activity, ClipboardList, Zap,
  ShieldCheck, Lightbulb, FileSignature, FileBarChart, FileSpreadsheet,
  Plus, CheckSquare, Rocket, ChevronDown, ArrowLeft, ChevronRight, Shield,
};

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";
const SLATE = "#475569";
const BDEV_BLUE = "#3B82F6";

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
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #1E3A8A 100%)", boxShadow: "0 8px 24px rgba(15,27,61,0.2)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "linear-gradient(135deg, #3B82F6, #1D4ED8)", boxShadow: "0 4px 16px rgba(59,130,246,0.4)" }}>🚀</div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white">Growth & Expansion Center</h2>
            <p className="text-[10px] text-white/60">Recruitment · Partnerships · Market Expansion</p>
          </div>
        </div>
      </div>

      <Card className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${BDEV_REPORTING_STRUCTURE.color}10` }}>
          <Building2 size={18} style={{ color: BDEV_REPORTING_STRUCTURE.color }} />
        </div>
        <div>
          <p className="text-[10px]" style={{ color: GRAY }}>Reports To</p>
          <p className="text-sm font-bold" style={{ color: DARK }}>🏢 {BDEV_REPORTING_STRUCTURE.reportsTo}</p>
        </div>
      </Card>

      <div>
        <SectionHeader title="Real-Time Counters" subtitle="Live growth activity" />
        <div className="grid grid-cols-3 gap-2">
          {BDEV_REALTIME_COUNTERS.map((c, i) => {
            const Icon = ICONS[c.icon] || Rocket;
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
        <SectionHeader title="Executive KPIs" subtitle="Business growth overview" />
        <div className="grid grid-cols-2 gap-2">
          {BDEV_KPIS.map((k, i) => {
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
          {BDEV_QUICK_ACTIONS.map((a, i) => {
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
        <SectionHeader title="Live Business Activity" subtitle="Real-time growth stream" />
        <Card>
          <div className="space-y-2">
            {BDEV_LIVE_STREAM.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.status === "success" ? "#27AE60" : item.status === "warning" ? "#F2994A" : item.status === "error" ? "#EB5757" : "#3B82F6" }} />
                <p className="text-[11px] flex-1" style={{ color: DARK }}>{item.text}</p>
                <span className="text-[9px]" style={{ color: GRAY }}>{item.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <SectionHeader title="All Modules" subtitle="20 business development centers" />
        <div className="grid grid-cols-3 gap-2">
          {BDEV_SECTIONS.map((s, i) => {
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

function HostRecruitSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎙️ Host Recruitment" subtitle="Manage host recruitment activities" />
      <div className="space-y-2">
        {BDEV_HOST_LEADS.map((h, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${h.color}10` }}>
                <Mic size={16} style={{ color: h.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{h.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{h.id} • {h.country} • {h.date}</p>
              </div>
              <StatusBadge status={h.status} color={h.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Add Host", "Review", "Approve", "Reject", "Track", "Contact"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AgentRecruitSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🤝 Talent Agent Recruitment" subtitle="Recruit and manage talent agents" />
      <div className="space-y-2">
        {BDEV_AGENTS.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Handshake size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.id} • {a.region} • {a.hosts} hosts</p>
              </div>
              <StatusBadge status={a.status} color={a.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Add Agent", "Approve", "Reject", "View Performance", "Contact"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AgencyDevSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏢 Agency Development" subtitle="Develop and expand agency partnerships" />
      <div className="space-y-2">
        {BDEV_AGENCIES.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Building2 size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.owner} • {a.hosts} hosts • {a.revenue}</p>
              </div>
              <StatusBadge status={a.status} color={a.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Add Agency", "Approve", "Reject", "Monitor", "Review Revenue"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function LeadsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎯 Lead Management" subtitle="Manage business opportunities and prospects" />
      <div className="space-y-2">
        {BDEV_LEADS.map((l, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${l.color}10` }}>
                <Target size={16} style={{ color: l.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{l.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{l.source} • Value: {l.value}</p>
              </div>
              <StatusBadge status={l.status} color={l.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Lead", "Assign", "Update", "Convert", "Archive"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ExpansionSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🌍 Market Expansion" subtitle="Identify and develop new market opportunities" />
      <div className="space-y-2">
        {BDEV_MARKETS.map((m, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${m.color}10` }}>{m.flag}</div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{m.country}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{m.users} users • Growth: {m.growth}</p>
              </div>
              <StatusBadge status={m.potential} color={m.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Analyze Market", "Create Plan", "Launch Campaign", "Monitor Results"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function PartnershipsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🤝 Partnership Management" subtitle="Manage strategic partnerships" />
      <div className="space-y-2">
        {BDEV_PARTNERSHIPS.map((p, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${p.color}10` }}>
                <Handshake size={16} style={{ color: p.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{p.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{p.type} • Revenue: {p.revenue}</p>
              </div>
              <StatusBadge status={p.status} color={p.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Add Partner", "Review", "Approve", "Renew", "Terminate"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CampaignsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📣 Campaign Management" subtitle="Manage recruitment and growth campaigns" />
      <div className="space-y-2">
        {BDEV_CAMPAIGNS.map((c, i) => (
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
        {["Create", "Launch", "Pause", "Stop", "View Analytics"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function RevenueSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="💰 Revenue Growth" subtitle="Track revenue from business development" />
      <div className="grid grid-cols-2 gap-2">
        {BDEV_REVENUE.map((p, i) => (
          <Card key={i}>
            <p className="text-[9px]" style={{ color: GRAY }}>{p.label}</p>
            <p className="text-lg font-bold" style={{ color: p.color }}>{p.value}</p>
            <p className="text-[9px] font-bold" style={{ color: "#27AE60" }}>{p.change}</p>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Revenue", "Analysis", "Forecast", "Export Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function RegionalSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📈 Regional Performance" subtitle="Monitor regional growth and performance" />
      <div className="space-y-2">
        {BDEV_REGIONS.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${r.color}10` }}>
                <Globe size={16} style={{ color: r.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{r.region}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{r.hosts} hosts • {r.revenue}</p>
              </div>
              <span className="text-[10px] font-bold" style={{ color: r.color }}>{r.growth}</span>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Region", "Compare", "Generate Report", "Export Data"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ApplicationsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📋 Application Management" subtitle="Review business-related applications" />
      <div className="space-y-2">
        {BDEV_APPLICATIONS.map((a, i) => (
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

function CommunicationSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📨 Communication Center" subtitle="Communicate with hosts, agents, agencies, partners" />
      <div>
        <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>Send To</p>
        <div className="grid grid-cols-2 gap-2">
          {BDEV_COMM_TARGETS.map((c, i) => {
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
          {BDEV_COMM_TYPES.map((c, i) => {
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

function EventsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎉 Event Development" subtitle="Manage recruitment and promotional events" />
      <div className="space-y-2">
        {BDEV_EVENTS.map((e, i) => (
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
        {["Create Event", "Edit", "Launch", "Manage Participants", "Close"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function PerformanceSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏆 Performance Tracking" subtitle="Track targets, achievements, and KPIs" />
      <div className="grid grid-cols-2 gap-2">
        {BDEV_PERFORMANCE.map((p, i) => {
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
        {["View KPIs", "Review Performance", "Generate Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AISection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🧠 Business Intelligence" subtitle="Advanced insights and forecasting" />
      <div className="grid grid-cols-2 gap-2">
        {BDEV_AI_INSIGHTS.map((a, i) => {
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
        {["Analyze Trends", "Forecast Growth", "View Insights", "Export Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function TasksSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="✅ Task Management" subtitle="Manage daily business development activities" />
      <div className="space-y-2">
        {BDEV_TASKS.map((t, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${t.color}10` }}>
                <CheckSquare size={16} style={{ color: t.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{t.title}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{t.id} • Priority: {t.priority} • Due: {t.due}</p>
              </div>
              <StatusBadge status={t.status} color={t.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Task", "Assign", "Edit", "Complete", "Track"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function DocumentsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📁 Document Center" subtitle="Manage business documents and agreements" />
      <div className="grid grid-cols-2 gap-2">
        {BDEV_DOCUMENTS.map((d, i) => {
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
        {["Upload", "Download", "Share", "Archive"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📊 Analytics Center" subtitle="Comprehensive analytics and reporting" />
      <div className="grid grid-cols-2 gap-2">
        {BDEV_ANALYTICS.map((a, i) => {
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
        {["Generate Report", "Export Analytics", "Compare Performance"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="⚙️ Business Settings" subtitle="Manage business development configurations" />
      <div className="grid grid-cols-2 gap-2">
        {BDEV_SETTINGS_GROUPS.map((s, i) => {
          const Icon = ICONS[s.icon] || Settings;
          return (
            <button key={i} className="rounded-xl p-3 flex items-center gap-2 active:scale-95 transition text-left" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <span className="text-[11px] font-semibold flex-1" style={{ color: DARK }}>{s.name}</span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Update Settings", "Configure", "Save", "Reset"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ExclusiveSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🚀 Exclusive Tools" subtitle="Special tools for Business Developers only" />
      <div className="grid grid-cols-1 gap-2">
        {BDEV_EXCLUSIVE_TOOLS.map((t, i) => {
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
  overview: HomeSection, "host-recruit": HostRecruitSection, "agent-recruit": AgentRecruitSection,
  "agency-dev": AgencyDevSection, leads: LeadsSection, expansion: ExpansionSection,
  partnerships: PartnershipsSection, campaigns: CampaignsSection, revenue: RevenueSection,
  regional: RegionalSection, applications: ApplicationsSection, communication: CommunicationSection,
  events: EventsSection, performance: PerformanceSection, ai: AISection, tasks: TasksSection,
  documents: DocumentsSection, analytics: AnalyticsSection, settings: SettingsSection,
  exclusive: ExclusiveSection, policy: BusinessDeveloperPolicyTab,
};

export default function BusinessDeveloperDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);

  const ActiveComponent = SECTIONS[activeSection] || HomeSection;
  const activeSectionData = BDEV_SECTIONS.find(s => s.id === activeSection) || BDEV_SECTIONS[0];

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #1E3A8A 100%)", boxShadow: "0 4px 16px rgba(15,27,61,0.15)" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              <Rocket size={16} /> Business Developer
            </h1>
            <p className="text-[10px] text-white/60">Growth & Expansion Control Center</p>
          </div>
          <button onClick={() => setShowSidebar(!showSidebar)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(59,130,246,0.2)" }}>
            <LayoutDashboard size={16} style={{ color: "#93C5FD" }} />
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
                {BDEV_SECTIONS.map((s, i) => {
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
          <ReportToSection roleKey="business-developer" theme="light" />
        </div>

        <div className="px-4 pt-3">
          <ActiveComponent onNavigate={(id) => { setActiveSection(id); setShowSidebar(false); }} />
        </div>
      </div>
    </div>
  );
}