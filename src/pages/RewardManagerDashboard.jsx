import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ChevronRight, Gift, Shield,
  LayoutDashboard, Trophy, Target, PartyPopper, Crown, Handshake,
  Building2, Mic, User, Medal, Coins, Globe, Award, BrainCircuit,
  BarChart3, FileText, Users, Settings, Rocket,
  Clock, CheckCircle, XCircle, Wallet, TrendingUp,
  DollarSign, UserPlus, LogIn, UserCheck, Star, Gem,
  Zap, RefreshCw, ShieldAlert, Sparkles, ScrollText, Gauge, Plus,
} from "lucide-react";
import {
  REWARD_SECTIONS, REWARD_KPIS, REWARD_QUICK_ACTIONS,
  REWARD_REALTIME_COUNTERS, REWARD_LIVE_STREAM,
  REWARD_TYPES, ACHIEVEMENT_TYPES, ACHIEVEMENT_LIST,
  EVENT_REWARDS, VIP_REWARDS, AGENT_REWARDS, AGENCY_REWARDS,
  HOST_REWARDS, USER_REWARDS, LOYALTY_PROGRAMS, BONUS_LIST,
  COIN_REWARDS, COUNTRY_REWARDS, TOP_EARNERS, AI_INSIGHTS,
  ANALYTICS_DATA, REWARD_REPORTS, TEAM_MEMBERS, SETTINGS_GROUPS,
  EXCLUSIVE_TOOLS, REPORTING_STRUCTURE,
} from "@/components/reward-manager/rewardManagerData";
import ReportToSection from "@/components/shared/ReportToSection";
import RewardManagerPolicyTab from "@/components/reward-manager/RewardManagerPolicyTab";

const ICONS = {
  LayoutDashboard, Trophy, Target, PartyPopper, Crown, Handshake, Building2,
  Mic, User, Medal, Coins, Globe, Award, BrainCircuit, BarChart3, FileText,
  Users, Settings, Rocket, Clock, CheckCircle, XCircle, Wallet, TrendingUp,
  DollarSign, UserPlus, LogIn, UserCheck, Star, Gem, Zap, RefreshCw,
  ShieldAlert, Sparkles, ScrollText, Gauge, Gift, Shield, Plus,
};

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";
const SLATE = "#475569";
const GOLD = "#F59E0B";

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl p-3 ${className}`} style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>{children}</div>
  );
}

function StatusBadge({ status, color }) {
  return <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: `${color}15`, color }}>{status}</span>;
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
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #78350F 100%)", boxShadow: "0 8px 24px rgba(15,27,61,0.2)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #F59E0B, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)", boxShadow: "0 4px 16px rgba(245,158,11,0.4)" }}>🎁</div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white">Rewards Command Center</h2>
            <p className="text-[10px] text-white/60">Enterprise Rewards, Incentives & Achievement Control</p>
          </div>
        </div>
      </div>

      <Card className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${REPORTING_STRUCTURE.color}10` }}>
          <Building2 size={18} style={{ color: REPORTING_STRUCTURE.color }} />
        </div>
        <div>
          <p className="text-[10px]" style={{ color: GRAY }}>Reports To</p>
          <p className="text-sm font-bold" style={{ color: DARK }}>🏢 {REPORTING_STRUCTURE.reportsTo}</p>
        </div>
      </Card>

      <div>
        <SectionHeader title="Real-Time Counters" subtitle="Live reward distribution monitoring" />
        <div className="grid grid-cols-3 gap-2">
          {REWARD_REALTIME_COUNTERS.map((c, i) => {
            const Icon = ICONS[c.icon] || Gift;
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
        <SectionHeader title="Executive KPIs" subtitle="Reward overview metrics" />
        <div className="grid grid-cols-2 gap-2">
          {REWARD_KPIS.map((k, i) => {
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
          {REWARD_QUICK_ACTIONS.map((a, i) => {
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
        <SectionHeader title="Live Reward Activity" subtitle="Real-time distribution stream" />
        <Card>
          <div className="space-y-2">
            {REWARD_LIVE_STREAM.map((item, i) => (
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
        <SectionHeader title="All Modules" subtitle="20 reward management centers" />
        <div className="grid grid-cols-3 gap-2">
          {REWARD_SECTIONS.map((s, i) => {
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

function RewardTypesSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏆 Reward Management Center" subtitle="Manage all platform rewards" />
      <div className="grid grid-cols-2 gap-2">
        {REWARD_TYPES.map((r, i) => {
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
              <p className="text-[9px]" style={{ color: GRAY }}>{r.active} active</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Reward", "Edit Reward", "Activate", "Deactivate", "Delete", "View History"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AchievementsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎯 Achievement Rewards Center" subtitle="Manage milestone and achievement rewards" />
      <div className="grid grid-cols-2 gap-2">
        {ACHIEVEMENT_TYPES.map((a, i) => {
          const Icon = ICONS[a.icon] || Target;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${a.color}10` }}>
                  <Icon size={14} style={{ color: a.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{a.type}</span>
              </div>
              <p className="text-sm font-bold" style={{ color: DARK }}>{a.count}</p>
              <p className="text-[9px] font-bold" style={{ color: a.color }}>Reward: {a.reward}</p>
            </Card>
          );
        })}
      </div>
      <div className="space-y-2">
        {ACHIEVEMENT_LIST.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Target size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{a.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.type} • {a.earners} earners • {a.reward}</p>
              </div>
              <StatusBadge status={a.status} color={a.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Achievement", "Set Requirements", "Assign Rewards", "Track Progress"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function EventRewardsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎉 Event Rewards Center" subtitle="Manage event-based reward programs" />
      <div className="space-y-2">
        {EVENT_REWARDS.map((e, i) => (
          <Card key={i}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${e.color}10` }}>🎉</div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{e.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{e.participants} participants • Pool: {e.pool}</p>
              </div>
              <StatusBadge status={e.status} color={e.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Event Reward", "Assign Winners", "Approve Distribution", "Launch Campaign"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function VIPRewardsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="💎 VIP Rewards Center" subtitle="Manage exclusive VIP reward programs" />
      <div className="grid grid-cols-2 gap-2">
        {VIP_REWARDS.map((v, i) => {
          const Icon = ICONS[v.icon] || Crown;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${v.color}10` }}>
                  <Icon size={14} style={{ color: v.color }} />
                </div>
                <span className="text-[10px] font-bold" style={{ color: DARK }}>{v.tier}</span>
              </div>
              <p className="text-sm font-bold" style={{ color: v.color }}>{v.rewards}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{v.members} members</p>
              <p className="text-[9px]" style={{ color: GRAY }}>Avg: {v.avgPerUser}</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create VIP Reward", "Assign VIP Rewards", "Monitor Usage", "Analyze Performance"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AgentRewardsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🤝 Agent Rewards Center" subtitle="Manage incentive programs for Talent Agents" />
      <div className="space-y-2">
        {AGENT_REWARDS.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: `linear-gradient(135deg, ${a.color}, ${a.color}cc)` }}>
                {a.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.agency} • Performance: {a.performance}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{a.incentive}</p>
                <StatusBadge status={a.status} color={a.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Incentive Plan", "Assign Rewards", "Review Performance", "Approve Incentives"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AgencyRewardsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏢 Agency Rewards Center" subtitle="Manage agency achievement and performance rewards" />
      <div className="space-y-2">
        {AGENCY_REWARDS.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Building2 size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>Performance: {a.performance}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{a.reward}</p>
                <StatusBadge status={a.status} color={a.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Agency Reward", "Assign Rewards", "Review Performance", "Generate Reports"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function HostRewardsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎙️ Host Rewards Center" subtitle="Manage host achievement and earnings incentives" />
      <div className="space-y-2">
        {HOST_REWARDS.map((h, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${h.color}10` }}>
                <Mic size={16} style={{ color: h.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{h.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{h.achievement}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{h.reward}</p>
                <StatusBadge status={h.status} color={h.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Host Reward", "Assign Reward", "Monitor Performance", "Review Eligibility"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function UserRewardsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="👤 User Rewards Center" subtitle="Manage user loyalty and engagement rewards" />
      <div className="grid grid-cols-2 gap-2">
        {USER_REWARDS.map((u, i) => {
          const Icon = ICONS[u.icon] || User;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${u.color}10` }}>
                  <Icon size={14} style={{ color: u.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight font-bold" style={{ color: DARK }}>{u.tier}</span>
              </div>
              <p className="text-sm font-bold" style={{ color: u.color }}>{u.rewards}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{u.count} users</p>
              <p className="text-[9px]" style={{ color: "#27AE60" }}>{u.engagement} engagement</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create User Reward", "Track Participation", "Approve Rewards", "Analyze Engagement"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function LoyaltySection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎖️ Loyalty Program Center" subtitle="Manage loyalty programs and retention rewards" />
      <div className="space-y-2">
        {LOYALTY_PROGRAMS.map((l, i) => {
          const Icon = ICONS[l.icon] || Award;
          return (
            <Card key={i}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${l.color}10` }}>
                  <Icon size={16} style={{ color: l.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: DARK }}>{l.tier} Tier</p>
                  <p className="text-[10px]" style={{ color: GRAY }}>{l.members} members • {l.points} points</p>
                </div>
                <p className="text-xs font-bold" style={{ color: l.color }}>{l.reward}</p>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Loyalty Program", "Define Rules", "Track Points", "Distribute Rewards"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function BonusSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="💰 Bonus Management Center" subtitle="Manage bonus rewards and incentive payouts" />
      <div className="space-y-2">
        {BONUS_LIST.map((b, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${b.color}10` }}>
                <Gift size={16} style={{ color: b.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{b.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{b.recipient} • {b.amount}</p>
              </div>
              <StatusBadge status={b.status} color={b.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Bonus", "Approve Bonus", "Distribute Bonus", "Audit History"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CoinsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🪙 Coin Reward Center" subtitle="Manage coin-based rewards and distributions" />
      <div className="space-y-2">
        {COIN_REWARDS.map((c, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${c.color}10` }}>
                <Coins size={16} style={{ color: c.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{c.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{c.amount} • {c.recipients} recipients</p>
              </div>
              <p className="text-xs font-bold" style={{ color: c.color }}>{c.distributed}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Coin Reward", "Assign Coins", "Monitor Distribution", "Export Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CountrySection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🌍 Country Reward Performance" subtitle="Monitor reward performance by country" />
      <div className="space-y-2">
        {COUNTRY_REWARDS.map((c, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <span className="text-xl">{c.flag}</span>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{c.country}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{c.earners} earners</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{c.rewards}</p>
                <p className="text-[9px]" style={{ color: c.color }}>{c.rate} rate</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Statistics", "Compare Countries", "Export Reports"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function TopEarnersSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏅 Top Reward Earners" subtitle="Track top reward earners across platform" />
      <div className="space-y-2">
        {TOP_EARNERS.map((t, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: t.rank <= 3 ? `linear-gradient(135deg, ${t.color}, ${t.color}cc)` : `${SLATE}20`, color: t.rank <= 3 ? WHITE : SLATE }}>
                {t.rank}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{t.name} {t.country}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{t.type}</p>
              </div>
              <p className="text-sm font-bold" style={{ color: t.color }}>{t.earnings}</p>
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

function AISection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🧠 AI Reward Intelligence" subtitle="AI-powered reward optimization and prediction" />
      <div className="grid grid-cols-2 gap-2">
        {AI_INSIGHTS.map((a, i) => {
          const Icon = ICONS[a.icon] || BrainCircuit;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${a.color}10` }}>
                  <Icon size={14} style={{ color: a.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight" style={{ color: GRAY }}>{a.title}</span>
              </div>
              <p className="text-lg font-bold" style={{ color: a.color }}>{a.value}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{a.detail}</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Generate Insights", "Analyze Trends", "Forecast Results", "Optimize Rewards"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📊 Reward Analytics Center" subtitle="Advanced reward performance analytics" />
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
      <div className="flex flex-wrap gap-2">
        {["View Analytics", "Compare Metrics", "Export Analytics", "Generate Insights"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ReportsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📋 Reward Report Management" subtitle="Generate and manage reward reports" />
      <div className="grid grid-cols-1 gap-2">
        {REWARD_REPORTS.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${GOLD}10` }}>
                <FileText size={16} style={{ color: GOLD }} />
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
      <SectionHeader title="👥 Reward Team Management" subtitle="Manage reward department staff" />
      <div className="space-y-2">
        {TEAM_MEMBERS.map((t, i) => (
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
        {["Add Staff", "Assign Tasks", "Monitor Performance", "Review Productivity"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="⚙️ Reward Settings Center" subtitle="Manage reward system configurations" />
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
      <SectionHeader title="🚀 Exclusive Tools" subtitle="Executive tools for Reward Managers only" />
      <div className="grid grid-cols-1 gap-2">
        {EXCLUSIVE_TOOLS.map((t, i) => {
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
  overview: HomeSection, management: RewardTypesSection, achievements: AchievementsSection,
  events: EventRewardsSection, vip: VIPRewardsSection, agents: AgentRewardsSection,
  agencies: AgencyRewardsSection, hosts: HostRewardsSection, users: UserRewardsSection,
  loyalty: LoyaltySection, bonus: BonusSection, coins: CoinsSection,
  country: CountrySection, earners: TopEarnersSection, ai: AISection,
  analytics: AnalyticsSection, reports: ReportsSection, team: TeamSection,
  settings: SettingsSection, exclusive: ExclusiveSection, policy: RewardManagerPolicyTab,
};

export default function RewardManagerDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);

  const ActiveComponent = SECTIONS[activeSection] || HomeSection;
  const activeSectionData = REWARD_SECTIONS.find(s => s.id === activeSection) || REWARD_SECTIONS[0];

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #78350F 100%)", boxShadow: "0 4px 16px rgba(15,27,61,0.15)" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              <Gift size={16} /> Reward Manager Dashboard
            </h1>
            <p className="text-[10px] text-white/60">Rewards, Incentives & Achievement Control</p>
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
            <ChevronRight size={16} style={{ color: GRAY }} className={showSidebar ? "rotate-90 transition" : "transition"} />
          </button>
        </div>

        {showSidebar && (
          <div className="px-4 pt-2 animate-fadeIn">
            <div className="rounded-2xl p-3" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
              <div className="grid grid-cols-4 gap-2">
                {REWARD_SECTIONS.map((s, i) => {
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
          <ReportToSection roleKey="reward-manager" theme="light" />
        </div>

        <div className="px-4 pt-3">
          <ActiveComponent onNavigate={(id) => { setActiveSection(id); setShowSidebar(false); }} />
        </div>
      </div>
    </div>
  );
}