import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ChevronRight, LifeBuoy,
  LayoutDashboard, Ticket, User, Mic, Handshake, Building2, Crown,
  Lock, Scale, ShieldAlert, CreditCard, Banknote, Radio, Settings,
  BookOpen, MessageSquare, FileText, Users, BarChart3, Rocket,
  AlertTriangle, CheckCircle2, Clock, Timer, Smile, AlertOctagon,
  CheckCircle, PlusCircle, UserPlus, ArrowUpCircle, MessageCircle,
  PauseCircle, Calendar, CalendarDays, CalendarRange, ShieldCheck,
  Coins, Swords, Gift, Zap, Cpu, Layers, Megaphone, Bell,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  SUPPORT_SECTIONS, SUPPORT_KPIS, SUPPORT_QUICK_ACTIONS, SUPPORT_REALTIME_COUNTERS,
  SUPPORT_LIVE_STREAM, TICKET_CATEGORIES, TICKETS, APPEALS, FRAUD_REPORTS,
  PAYMENT_ISSUES, WITHDRAWAL_ISSUES, RECOVERY_REQUESTS, LIVE_ISSUES,
  TECHNICAL_ISSUES, KNOWLEDGE_ARTICLES, SUPPORT_STAFF, SUPPORT_ANALYTICS,
  SUPPORT_REPORTS, SUPPORT_COMM_TYPES, SUPPORT_EXCLUSIVE_TOOLS,
  SUPPORT_PERMISSIONS_ALLOWED, SUPPORT_PERMISSIONS_RESTRICTED,
} from "@/components/support-manager/supportManagerData";
import ReportToSection from "@/components/shared/ReportToSection";

const ICONS = {
  LayoutDashboard, Ticket, User, Mic, Handshake, Building2, Crown, Lock,
  Scale, ShieldAlert, CreditCard, Banknote, Radio, Settings, BookOpen,
  MessageSquare, FileText, Users, BarChart3, Rocket, AlertTriangle,
  CheckCircle2, Clock, Timer, Smile, AlertOctagon, CheckCircle, PlusCircle,
  UserPlus, ArrowUpCircle, MessageCircle, PauseCircle, Calendar, CalendarDays,
  CalendarRange, ShieldCheck, Coins, Swords, Gift, Zap, Cpu, Layers,
  Megaphone, Bell, LifeBuoy,
};

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";
const BLUE = "#2F80ED";

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

function PriorityBadge({ priority }) {
  const c = priority === "Urgent" ? "#EB5757" : priority === "High" ? "#F2994A" : priority === "Medium" ? "#2F80ED" : "#27AE60";
  return <span className="px-1.5 py-0.5 rounded-full text-[7px] font-bold" style={{ background: `${c}15`, color: c }}>{priority}</span>;
}

function HomeSection({ onNavigate }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #0B5394 100%)", boxShadow: "0 8px 24px rgba(15,27,61,0.2)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #2F80ED, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2F80ED, #56CCF2)", boxShadow: "0 4px 16px rgba(47,128,237,0.4)" }}>
            <LifeBuoy size={28} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white">Support Command Center</h2>
            <p className="text-[10px] text-white/60">Enterprise Customer Support Control</p>
          </div>
        </div>
      </div>

      <div>
        <SectionHeader title="Real-Time Counters" subtitle="Live support activity monitoring" />
        <div className="grid grid-cols-3 gap-2">
          {SUPPORT_REALTIME_COUNTERS.map((c, i) => {
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
        <SectionHeader title="Overview KPIs" subtitle="Support operations performance" />
        <div className="grid grid-cols-2 gap-2">
          {SUPPORT_KPIS.map((k, i) => <KpiCard key={i} kpi={k} />)}
        </div>
      </div>

      <div>
        <SectionHeader title="Quick Actions" />
        <div className="grid grid-cols-2 gap-2">
          {SUPPORT_QUICK_ACTIONS.map((a, i) => {
            const Icon = ICONS[a.icon] || PlusCircle;
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
        <SectionHeader title="Live Support Activity" subtitle="Real-time ticket & case stream" />
        <Card>
          <div className="space-y-2">
            {SUPPORT_LIVE_STREAM.map((item, i) => (
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
        <SectionHeader title="All Modules" subtitle="20 support management centers" />
        <div className="grid grid-cols-3 gap-2">
          {SUPPORT_SECTIONS.map((s, i) => {
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

function TicketsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎫 Ticket Management" subtitle="Manage all customer support tickets" />
      <div className="grid grid-cols-2 gap-2">
        {TICKET_CATEGORIES.map((c, i) => {
          const Icon = ICONS[c.icon] || Ticket;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${c.color}10` }}>
                  <Icon size={14} style={{ color: c.color }} />
                </div>
                <span className="text-[10px] font-bold flex-1" style={{ color: DARK }}>{c.category}</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span style={{ color: "#F2994A" }}>{c.open} open</span>
                <span style={{ color: "#27AE60" }}>{c.resolved} resolved</span>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="space-y-2">
        {TICKETS.map((t, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${t.color}10` }}>
                <Ticket size={16} style={{ color: t.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold" style={{ color: DARK }}>{t.id}</p>
                  <PriorityBadge priority={t.priority} />
                </div>
                <p className="text-[10px]" style={{ color: GRAY }}>{t.user} • {t.category}</p>
                <p className="text-[9px]" style={{ color: GRAY }}>Assigned: {t.assigned} • {t.created}</p>
              </div>
              <StatusBadge status={t.status} color={t.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create", "Assign", "Update", "Escalate", "Close", "Reopen"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${BLUE}10`, color: BLUE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function GenericSupportSection({ title, subtitle, emoji, items, actions }) {
  return (
    <div className="space-y-3">
      <SectionHeader title={title} subtitle={subtitle} />
      <div className="space-y-2">
        {items.map((item, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${item.color}10` }}>{emoji}</div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{item.id}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{item.user || item.host || item.reporter || ""} {item.issue || item.reason || item.type || item.issue || ""}</p>
                {item.amount && <p className="text-[10px] font-bold" style={{ color: "#27AE60" }}>{item.amount}</p>}
                {item.date && <p className="text-[9px]" style={{ color: GRAY }}>{item.date}</p>}
              </div>
              <StatusBadge status={item.status} color={item.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {actions.map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${BLUE}10`, color: BLUE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AppealsSection() {
  return <GenericSupportSection title="⚖️ Appeals Management" subtitle="Review appeals submitted by users" emoji="⚖️" items={APPEALS} actions={["Review", "Approve", "Reject", "Request Info"]} />;
}

function FraudSection() {
  return <GenericSupportSection title="🚨 Fraud Report Center" subtitle="Review fraud and abuse reports" emoji="🚨" items={FRAUD_REPORTS.map(f => ({ ...f, user: `${f.reporter} → ${f.target}`, issue: `${f.type} • ${f.severity}` }))} actions={["Investigate", "Escalate", "Submit Findings", "Recommend"]} />;
}

function PaymentSection() {
  return <GenericSupportSection title="💳 Payment Support" subtitle="Handle payment-related issues" emoji="💳" items={PAYMENT_ISSUES} actions={["Verify", "Resolve", "Escalate Finance"]} />;
}

function WithdrawalSection() {
  return <GenericSupportSection title="🏦 Withdrawal Support" subtitle="Assist users with withdrawal issues" emoji="🏦" items={WITHDRAWAL_ISSUES} actions={["Verify", "Review Status", "Resolve", "Escalate"]} />;
}

function RecoverySection() {
  return <GenericSupportSection title="🔐 Account Recovery" subtitle="Handle account recovery requests" emoji="🔐" items={RECOVERY_REQUESTS.map(r => ({ ...r, user: r.user, issue: r.type }))} actions={["Verify Identity", "Recover", "Reset Password", "Restore Access"]} />;
}

function LiveSection() {
  return <GenericSupportSection title="📡 Live Stream Support" subtitle="Provide assistance during live streaming" emoji="📡" items={LIVE_ISSUES.map(l => ({ ...l, user: l.host, issue: l.issue, id: l.id }))} actions={["Monitor", "Technical Support", "Resolve", "Escalate"]} />;
}

function TechnicalSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="⚙️ Technical Support" subtitle="Handle platform technical issues" />
      <div className="space-y-2">
        {TECHNICAL_ISSUES.map((t, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${t.color}10` }}>
                <Settings size={16} style={{ color: t.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{t.id} — {t.issue}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{t.assigned} • Severity: {t.severity}</p>
              </div>
              <StatusBadge status={t.status} color={t.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Review Bug", "Assign Dev", "Track", "Verify Fix"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${BLUE}10`, color: BLUE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function KnowledgeSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📚 Knowledge Base" subtitle="Manage help articles and support resources" />
      <div className="grid grid-cols-2 gap-2">
        {KNOWLEDGE_ARTICLES.map((a, i) => {
          const Icon = ICONS[a.icon] || BookOpen;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${a.color}10` }}>
                  <Icon size={14} style={{ color: a.color }} />
                </div>
                <span className="px-1.5 py-0.5 rounded-full text-[7px] font-bold" style={{ background: a.status === "Published" ? "#27AE6015" : "#F2994A15", color: a.status === "Published" ? "#27AE60" : "#F2994A" }}>{a.status}</span>
              </div>
              <p className="text-[11px] font-bold" style={{ color: DARK }}>{a.title}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{a.category} • {a.views} views</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Article", "Edit", "Publish", "Archive"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${BLUE}10`, color: BLUE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CommunicationSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📨 Communication Center" subtitle="Manage support communications" />
      <div className="grid grid-cols-2 gap-2">
        {SUPPORT_COMM_TYPES.map((c, i) => {
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

function ReportsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📑 Report Management" subtitle="Generate operational support reports" />
      <div className="grid grid-cols-2 gap-2">
        {SUPPORT_REPORTS.map((r, i) => {
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

function StaffSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="👥 Staff Management" subtitle="Manage support team members" />
      <div className="space-y-2">
        {SUPPORT_STAFF.map((s, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)` }}>
                {s.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{s.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{s.role} • {s.staff_id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: s.color }}>{s.rating}</p>
                <p className="text-[9px]" style={{ color: GRAY }}>{s.tickets} tickets</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📈 Analytics Center" subtitle="Advanced support performance analytics" />
      <div className="grid grid-cols-2 gap-2">
        {SUPPORT_ANALYTICS.map((a, i) => (
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

function ToolsSection() {
  const { toast } = useToast();
  return (
    <div className="space-y-3">
      <SectionHeader title="🚀 Exclusive Tools" subtitle="Special tools available only to Support Managers" />
      <div className="space-y-2">
        {SUPPORT_EXCLUSIVE_TOOLS.map((t, i) => {
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
      <div>
        <SectionHeader title="Support Manager Permissions" />
        <Card>
          <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ Allowed</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {SUPPORT_PERMISSIONS_ALLOWED.map((p, i) => (
              <span key={i} className="text-[9px] px-2 py-1 rounded-full" style={{ background: "#27AE6010", color: "#27AE60" }}>{p}</span>
            ))}
          </div>
          <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>❌ Restricted</p>
          <div className="flex flex-wrap gap-1.5">
            {SUPPORT_PERMISSIONS_RESTRICTED.map((p, i) => (
              <span key={i} className="text-[9px] px-2 py-1 rounded-full" style={{ background: "#EB575710", color: "#EB5757" }}>{p}</span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

const userSupportActions = ["View Profile", "Review History", "Send Response", "Resolve", "Recover Account", "Escalate"];
const hostSupportActions = ["View Profile", "Review Revenue", "Resolve", "Escalate", "Recovery", "Guidance"];
const agentSupportActions = ["Review Request", "Resolve", "Escalate", "Guidance", "History"];
const agencySupportActions = ["View Profile", "Resolve", "Review Reports", "Escalate", "Consultation"];
const vipSupportActions = ["View Profile", "Priority Resolution", "Assistance", "Escalate", "Complaint Handling"];

const SECTIONS = {
  overview: HomeSection, tickets: TicketsSection,
  user_support: () => <GenericSupportSection title="👤 User Support" subtitle="Provide support for platform users" emoji="👤" items={TICKETS.filter(t => t.category === "Account Issues" || t.category === "Login Problems").map(t => ({ ...t }))} actions={userSupportActions} />,
  host_support: () => <GenericSupportSection title="🎙️ Host Support" subtitle="Handle host-related issues and requests" emoji="🎙️" items={LIVE_ISSUES.map(l => ({ ...l, user: l.host, issue: l.issue, id: l.id }))} actions={hostSupportActions} />,
  agent_support: () => <GenericSupportSection title="🤝 Agent Support" subtitle="Provide support to Talent Agents" emoji="🤝" items={TICKETS.filter(t => t.category === "Agency Issues").map(t => ({ ...t }))} actions={agentSupportActions} />,
  agency_support: () => <GenericSupportSection title="🏢 Agency Support" subtitle="Manage agency-related support cases" emoji="🏢" items={TICKETS.filter(t => t.category === "Agency Issues").map(t => ({ ...t }))} actions={agencySupportActions} />,
  vip_support: () => <GenericSupportSection title="💎 VIP Support" subtitle="Dedicated premium support for VIP users" emoji="💎" items={TICKETS.filter(t => t.category === "VIP Issues").map(t => ({ ...t }))} actions={vipSupportActions} />,
  recovery: RecoverySection, appeals: AppealsSection, fraud: FraudSection,
  payment: PaymentSection, withdrawal: WithdrawalSection, live: LiveSection,
  technical: TechnicalSection, knowledge: KnowledgeSection, communication: CommunicationSection,
  reports: ReportsSection, staff: StaffSection, analytics: AnalyticsSection, tools: ToolsSection,
};

export default function SupportManagerDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);

  const ActiveComponent = SECTIONS[activeSection] || HomeSection;
  const activeSectionData = SUPPORT_SECTIONS.find(s => s.id === activeSection) || SUPPORT_SECTIONS[0];

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 100%)", boxShadow: "0 4px 16px rgba(15,27,61,0.15)" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              <LifeBuoy size={16} /> Support Manager Dashboard
            </h1>
            <p className="text-[10px] text-white/60">Customer Support & Service Control Center</p>
          </div>
          <button onClick={() => setShowSidebar(!showSidebar)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(47,128,237,0.2)" }}>
            <LayoutDashboard size={16} style={{ color: "#56CCF2" }} />
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
                {SUPPORT_SECTIONS.map((s, i) => {
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
          <ReportToSection roleKey="support-manager" theme="light" />
        </div>

        <div className="px-4 pt-3">
          <ActiveComponent onNavigate={(id) => { setActiveSection(id); setShowSidebar(false); }} />
        </div>
      </div>
    </div>
  );
}