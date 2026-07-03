import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ChevronRight, ChevronDown, Search, PartyPopper, Shield,
  LayoutDashboard, Calendar, Trophy, Gift, Users, Globe, Mic,
  Building2, Crown, TrendingUp, Medal, Mail, BrainCircuit, BarChart3,
  FileText, Settings, Rocket, CheckCircle, Clock, Zap, DollarSign,
  UserPlus, Heart, Megaphone, Bell, MessageSquare, Coins, Award,
  Swords, LifeBuoy, Plus,
} from "lucide-react";
import {
  EVT_SECTIONS, EVT_KPIS, EVT_QUICK_ACTIONS, EVT_REALTIME_COUNTERS,
  EVT_LIVE_STREAM, EVT_EVENT_TYPES, EVT_EVENTS, EVT_COMPETITIONS,
  EVT_REWARD_TYPES, EVT_PARTICIPANTS, EVT_GLOBAL_MONITORING, EVT_HOST_EVENTS,
  EVT_AGENCY_EVENTS, EVT_VIP_EVENTS, EVT_REVENUE_SOURCES, EVT_REVENUE_PERIODS,
  EVT_RANKINGS, EVT_COMM_TARGETS, EVT_COMM_TYPES, EVT_FESTIVAL_EVENTS,
  EVT_COUNTRY_PERFORMANCE, EVT_AI_INSIGHTS, EVT_ANALYTICS, EVT_REPORTS,
  EVT_TEAM_MEMBERS, EVT_SETTINGS_GROUPS, EVT_EXCLUSIVE_TOOLS, EVT_REPORTING_STRUCTURE,
} from "@/components/event-manager/eventManagerData";

const ICONS = {
  LayoutDashboard, Calendar, Trophy, Gift, Users, Globe, Mic, Building2,
  Crown, TrendingUp, Medal, Mail, BrainCircuit, BarChart3, FileText,
  Settings, Rocket, CheckCircle, Clock, Zap, DollarSign, UserPlus,
  Heart, Megaphone, Bell, MessageSquare, Coins, Award, Swords, LifeBuoy,
  Plus, PartyPopper, Search, ChevronDown, ArrowLeft, ChevronRight, Shield,
};

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";
const SLATE = "#475569";
const EVT_PINK = "#EC4899";

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
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #831843 100%)", boxShadow: "0 8px 24px rgba(15,27,61,0.2)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #EC4899, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "linear-gradient(135deg, #EC4899, #BE185D)", boxShadow: "0 4px 16px rgba(236,72,153,0.4)" }}>🎉</div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white">Event Command Center</h2>
            <p className="text-[10px] text-white/60">Global Event & Competition Control</p>
          </div>
        </div>
      </div>

      <Card className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${EVT_REPORTING_STRUCTURE.color}10` }}>
          <Building2 size={18} style={{ color: EVT_REPORTING_STRUCTURE.color }} />
        </div>
        <div>
          <p className="text-[10px]" style={{ color: GRAY }}>Reports To</p>
          <p className="text-sm font-bold" style={{ color: DARK }}>🏢 {EVT_REPORTING_STRUCTURE.reportsTo}</p>
        </div>
      </Card>

      <div>
        <SectionHeader title="Real-Time Counters" subtitle="Live event activity" />
        <div className="grid grid-cols-3 gap-2">
          {EVT_REALTIME_COUNTERS.map((c, i) => {
            const Icon = ICONS[c.icon] || PartyPopper;
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
        <SectionHeader title="Executive KPIs" subtitle="Event overview metrics" />
        <div className="grid grid-cols-2 gap-2">
          {EVT_KPIS.map((k, i) => {
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
          {EVT_QUICK_ACTIONS.map((a, i) => {
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
        <SectionHeader title="Live Event Activity" subtitle="Real-time event stream" />
        <Card>
          <div className="space-y-2">
            {EVT_LIVE_STREAM.map((item, i) => (
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
        <SectionHeader title="All Modules" subtitle="20 event management centers" />
        <div className="grid grid-cols-3 gap-2">
          {EVT_SECTIONS.map((s, i) => {
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

function ManagementSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📅 Event Management" subtitle="Manage all platform events" />
      <div className="grid grid-cols-2 gap-2">
        {EVT_EVENT_TYPES.map((c, i) => {
          const Icon = ICONS[c.icon] || Calendar;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${c.color}10` }}>
                  <Icon size={14} style={{ color: c.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight font-bold" style={{ color: DARK }}>{c.type}</span>
              </div>
              <p className="text-sm font-bold" style={{ color: c.color }}>{c.participants}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{c.count} events</p>
            </Card>
          );
        })}
      </div>
      <div className="space-y-2">
        {EVT_EVENTS.map((e, i) => (
          <Card key={i}>
            <div className="flex items-center gap-2 mb-2">
              <PartyPopper size={16} style={{ color: e.color }} />
              <span className="text-[10px] font-bold" style={{ color: DARK }}>{e.id}</span>
              <span className="text-[9px]" style={{ color: GRAY }}>{e.type}</span>
              <div className="flex-1" />
              <StatusBadge status={e.status} color={e.color} />
            </div>
            <p className="text-sm font-bold mb-2" style={{ color: DARK }}>{e.name}</p>
            <div className="flex items-center justify-between text-[9px]" style={{ color: GRAY }}>
              <span>👥 {e.participants}</span>
              <span style={{ color: "#27AE60" }} className="font-bold">{e.revenue}</span>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Event", "Edit", "Activate", "Pause", "End", "Delete"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CompetitionSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏆 Competition Management" subtitle="Manage competitions and ranking events" />
      <div className="space-y-2">
        {EVT_COMPETITIONS.map((c, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${c.color}10` }}>
                <Trophy size={16} style={{ color: c.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{c.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{c.type} • {c.participants} participants</p>
              </div>
              <div className="text-right">
                <StatusBadge status={c.status} color={c.color} />
                <p className="text-[9px] mt-1" style={{ color: GRAY }}>Winner: {c.winner}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Competition", "Configure Rules", "Manage Rankings", "Monitor", "Announce Winners"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function RewardsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎁 Event Rewards Center" subtitle="Manage event rewards and prizes" />
      <div className="grid grid-cols-2 gap-2">
        {EVT_REWARD_TYPES.map((r, i) => {
          const Icon = ICONS[r.icon] || Gift;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${r.color}10` }}>
                  <Icon size={14} style={{ color: r.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{r.type}</span>
              </div>
              <p className="text-sm font-bold" style={{ color: r.color }}>{r.total}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{r.count} rewards</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Reward", "Assign Reward", "Approve Distribution", "Review History"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ParticipationSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="👥 Participation Management" subtitle="Manage participants and registrations" />
      <div className="space-y-2">
        {EVT_PARTICIPANTS.map((p, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${p.color}10` }}>
                <Users size={16} style={{ color: p.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{p.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{p.event} • {p.date}</p>
              </div>
              <StatusBadge status={p.status} color={p.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Participants", "Approve", "Reject", "Remove", "Export List"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function GlobalSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🌍 Global Event Monitoring" subtitle="Monitor all live and scheduled events globally" />
      <div className="space-y-2">
        {EVT_GLOBAL_MONITORING.map((g, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${g.color}10` }}>
                <Globe size={16} style={{ color: g.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{g.region}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{g.active} active • {g.participants} participants</p>
              </div>
              <p className="text-sm font-bold" style={{ color: "#27AE60" }}>{g.revenue}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Monitor Event", "View Live Activity", "Review Performance", "Generate Insights"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function HostSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎙️ Host Event Center" subtitle="Manage host-related events and competitions" />
      <div className="space-y-2">
        {EVT_HOST_EVENTS.map((h, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${h.color}10` }}>
                <Mic size={16} style={{ color: h.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{h.event}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{h.host} • {h.participants} • {h.engagement} eng.</p>
              </div>
              <StatusBadge status={h.status} color={h.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Host Event", "Assign Hosts", "Monitor Participation", "Analyze Performance"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AgencySection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏢 Agency Event Center" subtitle="Manage agency-based events and contests" />
      <div className="space-y-2">
        {EVT_AGENCY_EVENTS.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Building2 size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.event}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.agency} • {a.participants} participants</p>
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
        {["Create Agency Event", "Assign Agencies", "Review Results", "Generate Reports"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function VipSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="💎 VIP Event Center" subtitle="Manage exclusive VIP events" />
      <div className="space-y-2">
        {EVT_VIP_EVENTS.map((v, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${v.color}10` }}>
                <Crown size={16} style={{ color: v.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{v.event}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{v.tier} tier • {v.participants} participants</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{v.revenue}</p>
                <StatusBadge status={v.status} color={v.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create VIP Event", "Invite VIP Members", "Monitor Participation", "Analyze Engagement"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function RevenueSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📈 Event Revenue Center" subtitle="Monitor event-related revenue and earnings" />
      <div className="grid grid-cols-2 gap-2">
        {EVT_REVENUE_PERIODS.map((p, i) => (
          <Card key={i}>
            <p className="text-[9px]" style={{ color: GRAY }}>{p.label} Revenue</p>
            <p className="text-lg font-bold" style={{ color: p.color }}>{p.value}</p>
            <p className="text-[9px] font-bold" style={{ color: "#27AE60" }}>{p.change}</p>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        {EVT_REVENUE_SOURCES.map((r, i) => {
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
        {["Analyze Revenue", "Export Reports", "Compare Events"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function RankingsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏅 Event Rankings Center" subtitle="Track top performers and event rankings" />
      <div className="space-y-2">
        {EVT_RANKINGS.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: r.rank <= 3 ? `linear-gradient(135deg, ${r.color}, ${r.color}cc)` : `${SLATE}20`, color: r.rank <= 3 ? WHITE : SLATE }}>
                {r.rank}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{r.name} {r.country}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{r.category}</p>
              </div>
              <p className="text-sm font-bold" style={{ color: "#27AE60" }}>{r.score}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Rankings", "Export Rankings", "Analyze Results"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CommunicationSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📨 Event Communication" subtitle="Manage event announcements and notifications" />
      <div>
        <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>Send To</p>
        <div className="grid grid-cols-2 gap-2">
          {EVT_COMM_TARGETS.map((c, i) => {
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
          {EVT_COMM_TYPES.map((c, i) => {
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

function FestivalSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎊 Festival & Seasonal Events" subtitle="Manage seasonal and festival campaigns" />
      <div className="space-y-2">
        {EVT_FESTIVAL_EVENTS.map((f, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${f.color}10` }}>🎊</div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{f.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{f.type} • {f.participants} • {f.revenue}</p>
              </div>
              <StatusBadge status={f.status} color={f.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Campaign", "Launch Campaign", "Schedule Campaign", "Analyze Results"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CountrySection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🌍 Country Event Performance" subtitle="Monitor event performance by country" />
      <div className="space-y-2">
        {EVT_COUNTRY_PERFORMANCE.map((c, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <span className="text-xl">{c.flag}</span>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{c.country}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{c.events} events • {c.participants} participants</p>
              </div>
              <p className="text-sm font-bold" style={{ color: "#27AE60" }}>{c.revenue}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Statistics", "Compare Countries", "Export Reports", "Analyze Growth"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AISection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🧠 AI Event Intelligence" subtitle="AI-powered event analysis and forecasting" />
      <div className="grid grid-cols-2 gap-2">
        {EVT_AI_INSIGHTS.map((a, i) => {
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
        {["Generate Insights", "Analyze Trends", "Forecast Results", "Optimize Events"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📊 Event Analytics Center" subtitle="Advanced event performance analytics" />
      <div className="grid grid-cols-2 gap-2">
        {EVT_ANALYTICS.map((a, i) => {
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
        {["View Analytics", "Export Analytics", "Compare Metrics", "Generate Insights"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ReportsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📋 Event Report Management" subtitle="Generate and manage event reports" />
      <div className="grid grid-cols-1 gap-2">
        {EVT_REPORTS.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${EVT_PINK}10` }}>
                <FileText size={16} style={{ color: EVT_PINK }} />
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
      <SectionHeader title="👥 Event Operations Team" subtitle="Manage event department staff" />
      <div className="space-y-2">
        {EVT_TEAM_MEMBERS.map((t, i) => (
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
        {["Add Staff", "Assign Tasks", "Monitor Productivity", "Review Performance"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="⚙️ Event Settings" subtitle="Manage event system settings" />
      <div className="grid grid-cols-2 gap-2">
        {EVT_SETTINGS_GROUPS.map((s, i) => {
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
      <SectionHeader title="🚀 Exclusive Tools" subtitle="Executive tools for Event Managers only" />
      <div className="grid grid-cols-1 gap-2">
        {EVT_EXCLUSIVE_TOOLS.map((t, i) => {
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
  overview: HomeSection, management: ManagementSection, competition: CompetitionSection,
  rewards: RewardsSection, participation: ParticipationSection, global: GlobalSection,
  host: HostSection, agency: AgencySection, vip: VipSection, revenue: RevenueSection,
  rankings: RankingsSection, communication: CommunicationSection, festival: FestivalSection,
  country: CountrySection, ai: AISection, analytics: AnalyticsSection, reports: ReportsSection,
  team: TeamSection, settings: SettingsSection, exclusive: ExclusiveSection,
};

export default function EventManagerDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);

  const ActiveComponent = SECTIONS[activeSection] || HomeSection;
  const activeSectionData = EVT_SECTIONS.find(s => s.id === activeSection) || EVT_SECTIONS[0];

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #831843 100%)", boxShadow: "0 4px 16px rgba(15,27,61,0.15)" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              <PartyPopper size={16} /> Event Manager
            </h1>
            <p className="text-[10px] text-white/60">Global Event & Competition Control</p>
          </div>
          <button onClick={() => setShowSidebar(!showSidebar)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(236,72,153,0.2)" }}>
            <LayoutDashboard size={16} style={{ color: "#F9A8D4" }} />
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
                {EVT_SECTIONS.map((s, i) => {
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