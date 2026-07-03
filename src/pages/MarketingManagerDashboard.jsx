import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ChevronRight, ChevronDown, Search, Megaphone, Shield,
  LayoutDashboard, Target, Mic, Building2, Globe, Smartphone,
  Handshake, PartyPopper, DollarSign, TrendingUp, BrainCircuit,
  Trophy, Mail, FileText, Gift, BarChart3, Users, Settings, Rocket,
  CheckCircle, Calendar, Eye, Image, Zap, UserPlus, Wallet, Heart,
  Bell, MessageSquare, Clock, Palette, Type, Video, Facebook,
  Instagram, Music, Youtube, Twitter, Linkedin,
  RectangleHorizontal, Plus,
} from "lucide-react";
import {
  MKTG_SECTIONS, MKTG_KPIS, MKTG_QUICK_ACTIONS, MKTG_REALTIME_COUNTERS,
  MKTG_LIVE_STREAM, MKTG_CAMPAIGNS, MKTG_CAMPAIGN_TYPES, MKTG_ACQUISITION_DATA,
  MKTG_HOST_PROMOS, MKTG_AGENCY_PROMOS, MKTG_BRAND_ASSETS, MKTG_SOCIAL_PLATFORMS,
  MKTG_INFLUENCERS, MKTG_EVENT_PROMOS, MKTG_AD_CHANNELS, MKTG_GROWTH_METRICS,
  MKTG_AI_INSIGHTS, MKTG_BRAND_RANKINGS, MKTG_COMM_TARGETS, MKTG_COMM_TYPES,
  MKTG_CONTENT_TYPES, MKTG_PROMOTIONS, MKTG_REPORTS, MKTG_TEAM_MEMBERS,
  MKTG_SETTINGS_GROUPS, MKTG_EXCLUSIVE_TOOLS, MKTG_REPORTING_STRUCTURE,
} from "@/components/marketing-manager/marketingManagerData";
import ReportToSection from "@/components/shared/ReportToSection";

const ICONS = {
  LayoutDashboard, Megaphone, Target, Mic, Building2, Globe, Smartphone,
  Handshake, PartyPopper, DollarSign, TrendingUp, BrainCircuit, Trophy,
  Mail, FileText, Gift, BarChart3, Users, Settings, Rocket, CheckCircle,
  Calendar, Eye, Image, Zap, UserPlus, Wallet, Heart, Bell, MessageSquare,
  Clock, Palette, Type, Video, Facebook, Instagram, Music, Youtube,
  Twitter, Linkedin, Search, ChevronDown, ArrowLeft, ChevronRight,
  RectangleHorizontal, Shield, Plus,
};

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";
const SLATE = "#475569";
const MKTG_BLUE = "#3B82F6";

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
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "linear-gradient(135deg, #3B82F6, #1D4ED8)", boxShadow: "0 4px 16px rgba(59,130,246,0.4)" }}>📢</div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white">Marketing Command Center</h2>
            <p className="text-[10px] text-white/60">Global Marketing & Branding Control</p>
          </div>
        </div>
      </div>

      <Card className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${MKTG_REPORTING_STRUCTURE.color}10` }}>
          <Building2 size={18} style={{ color: MKTG_REPORTING_STRUCTURE.color }} />
        </div>
        <div>
          <p className="text-[10px]" style={{ color: GRAY }}>Reports To</p>
          <p className="text-sm font-bold" style={{ color: DARK }}>🏢 {MKTG_REPORTING_STRUCTURE.reportsTo}</p>
        </div>
      </Card>

      <div>
        <SectionHeader title="Real-Time Counters" subtitle="Live marketing activity" />
        <div className="grid grid-cols-3 gap-2">
          {MKTG_REALTIME_COUNTERS.map((c, i) => {
            const Icon = ICONS[c.icon] || Megaphone;
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
        <SectionHeader title="Executive KPIs" subtitle="Marketing overview metrics" />
        <div className="grid grid-cols-2 gap-2">
          {MKTG_KPIS.map((k, i) => {
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
          {MKTG_QUICK_ACTIONS.map((a, i) => {
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
        <SectionHeader title="Live Marketing Activity" subtitle="Real-time campaign stream" />
        <Card>
          <div className="space-y-2">
            {MKTG_LIVE_STREAM.map((item, i) => (
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
        <SectionHeader title="All Modules" subtitle="20 marketing management centers" />
        <div className="grid grid-cols-3 gap-2">
          {MKTG_SECTIONS.map((s, i) => {
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

function CampaignsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📣 Campaign Management" subtitle="Manage all marketing campaigns" />
      <div className="grid grid-cols-2 gap-2">
        {MKTG_CAMPAIGN_TYPES.map((c, i) => {
          const Icon = ICONS[c.icon] || Megaphone;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${c.color}10` }}>
                  <Icon size={14} style={{ color: c.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight font-bold" style={{ color: DARK }}>{c.type}</span>
              </div>
              <p className="text-sm font-bold" style={{ color: c.color }}>{c.reach}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{c.count} campaigns</p>
            </Card>
          );
        })}
      </div>
      <div className="space-y-2">
        {MKTG_CAMPAIGNS.map((c, i) => (
          <Card key={i}>
            <div className="flex items-center gap-2 mb-2">
              <Megaphone size={16} style={{ color: c.color }} />
              <span className="text-[10px] font-bold" style={{ color: DARK }}>{c.id}</span>
              <span className="text-[9px]" style={{ color: GRAY }}>{c.type}</span>
              <div className="flex-1" />
              <StatusBadge status={c.status} color={c.color} />
            </div>
            <p className="text-sm font-bold mb-2" style={{ color: DARK }}>{c.name}</p>
            <div className="flex items-center justify-between text-[9px]" style={{ color: GRAY }}>
              <span>👁 {c.reach}</span>
              <span>💰 {c.budget}</span>
              <span style={{ color: "#27AE60" }} className="font-bold">ROI {c.roi}</span>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Campaign", "Edit", "Launch", "Pause", "Resume", "Stop", "View Analytics"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AcquisitionSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎯 User Acquisition" subtitle="Manage new user acquisition" />
      <div className="space-y-2">
        {MKTG_ACQUISITION_DATA.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Target size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.channel}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.users} users • CPA: {a.cost}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: a.color }}>{a.conversion}</p>
                <p className="text-[9px]" style={{ color: GRAY }}>conversion</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Campaign", "Monitor Registrations", "Analyze Conversion", "Export Report"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function HostPromoSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎙️ Host Promotion" subtitle="Promote hosts and increase reach" />
      <div className="space-y-2">
        {MKTG_HOST_PROMOS.map((h, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${h.color}10` }}>
                <Mic size={16} style={{ color: h.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{h.host}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{h.campaign}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{h.growth}</p>
                <p className="text-[9px]" style={{ color: GRAY }}>{h.reach} reach</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Feature Host", "Promote Stream", "Launch Campaign", "Track Growth", "Analyze"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AgencyPromoSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏢 Agency Promotion" subtitle="Promote agencies and recruitment" />
      <div className="space-y-2">
        {MKTG_AGENCY_PROMOS.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                <Building2 size={16} style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{a.agency}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{a.campaign}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{a.growth}</p>
                <p className="text-[9px]" style={{ color: GRAY }}>{a.reach} reach</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Feature Agency", "Agency Campaign", "Advertisement", "Tracking"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function BrandSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🌍 Brand Management" subtitle="Manage platform branding and reputation" />
      <div className="grid grid-cols-2 gap-2">
        {MKTG_BRAND_ASSETS.map((b, i) => {
          const Icon = ICONS[b.icon] || Globe;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${b.color}10` }}>
                  <Icon size={14} style={{ color: b.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight font-bold" style={{ color: DARK }}>{b.type}</span>
              </div>
              <p className="text-sm font-bold" style={{ color: b.color }}>{b.count}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{b.status}</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Manage Brand Assets", "Update Guidelines", "Launch Branding Campaign", "Monitor Performance"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function SocialSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📱 Social Media Center" subtitle="Manage official social media channels" />
      <div className="space-y-2">
        {MKTG_SOCIAL_PLATFORMS.map((s, i) => {
          const Icon = ICONS[s.icon] || Smartphone;
          return (
            <Card key={i}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}10` }}>
                  <Icon size={16} style={{ color: s.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: DARK }}>{s.platform}</p>
                  <p className="text-[10px]" style={{ color: GRAY }}>{s.followers} followers • {s.posts} posts</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold" style={{ color: s.color }}>{s.engagement}</p>
                  <p className="text-[9px]" style={{ color: GRAY }}>engagement</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Post", "Schedule Post", "Publish Content", "Monitor Engagement", "Analyze"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function InfluencersSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🤝 Influencer Management" subtitle="Manage influencer collaborations" />
      <div className="space-y-2">
        {MKTG_INFLUENCERS.map((inf, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: `linear-gradient(135deg, ${inf.color}, ${inf.color}cc)` }}>
                {inf.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{inf.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{inf.platform} • {inf.followers} followers</p>
              </div>
              <StatusBadge status={inf.status} color={inf.color} />
            </div>
            <div className="mt-2 flex items-center justify-between text-[9px]" style={{ color: GRAY }}>
              <span> Campaign: {inf.campaign}</span>
              <span style={{ color: "#27AE60" }} className="font-bold">{inf.reach} reach</span>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Add Influencer", "Review", "Approve Collaboration", "Monitor Campaign", "Analyze"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function EventPromoSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎉 Event Promotion" subtitle="Promote events and competitions" />
      <div className="space-y-2">
        {MKTG_EVENT_PROMOS.map((e, i) => (
          <Card key={i}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${e.color}10` }}>🎉</div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{e.event}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{e.promotion}</p>
                <p className="text-[9px] mt-1" style={{ color: GRAY }}>{e.reach} reach • {e.participation} participants</p>
              </div>
              <StatusBadge status={e.status} color={e.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Promotion", "Launch Campaign", "Manage Ads", "Monitor Participation"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AdvertisingSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="💰 Advertising Center" subtitle="Manage paid advertising campaigns" />
      <div className="space-y-2">
        {MKTG_AD_CHANNELS.map((a, i) => {
          const Icon = ICONS[a.icon] || DollarSign;
          return (
            <Card key={i}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}10` }}>
                  <Icon size={16} style={{ color: a.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: DARK }}>{a.channel}</p>
                  <p className="text-[10px]" style={{ color: GRAY }}>{a.spend} spend • {a.reach} reach</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold" style={{ color: "#27AE60" }}>{a.roi}</p>
                  <p className="text-[9px]" style={{ color: GRAY }}>{a.conversion} conv</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Ad Campaign", "Manage Budget", "Analyze ROI", "Optimize Campaign"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function GrowthSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📈 Growth Analytics" subtitle="Monitor platform growth metrics" />
      <div className="grid grid-cols-2 gap-2">
        {MKTG_GROWTH_METRICS.map((g, i) => {
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
        {["View Analytics", "Export Analytics", "Compare Performance"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AISection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🧠 AI Marketing Intelligence" subtitle="AI-powered insights and forecasting" />
      <div className="grid grid-cols-2 gap-2">
        {MKTG_AI_INSIGHTS.map((a, i) => {
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

function BrandPerfSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🏆 Brand Performance" subtitle="Track brand visibility and engagement" />
      <div className="space-y-2">
        {MKTG_BRAND_RANKINGS.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: r.rank <= 3 ? `linear-gradient(135deg, ${r.color}, ${r.color}cc)` : `${SLATE}20`, color: r.rank <= 3 ? WHITE : SLATE }}>
                {r.rank}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: DARK }}>{r.metric}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: DARK }}>{r.value}</p>
                <p className="text-[9px] font-bold" style={{ color: "#27AE60" }}>{r.trend}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["View Rankings", "Analyze Reach", "Monitor Engagement", "Export Reports"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function CommunicationSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📨 Marketing Communication" subtitle="Manage marketing communications" />
      <div>
        <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>Send To</p>
        <div className="grid grid-cols-2 gap-2">
          {MKTG_COMM_TARGETS.map((c, i) => {
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
          {MKTG_COMM_TYPES.map((c, i) => {
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

function ContentSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📋 Content Management" subtitle="Manage promotional content" />
      <div className="grid grid-cols-2 gap-2">
        {MKTG_CONTENT_TYPES.map((c, i) => {
          const Icon = ICONS[c.icon] || FileText;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${c.color}10` }}>
                  <Icon size={14} style={{ color: c.color }} />
                </div>
                <span className="text-[9px] flex-1 leading-tight font-bold" style={{ color: DARK }}>{c.type}</span>
              </div>
              <p className="text-sm font-bold" style={{ color: c.color }}>{c.count}</p>
              <p className="text-[9px]" style={{ color: GRAY }}>{c.published} published</p>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Upload Content", "Edit Content", "Publish Content", "Archive Content"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function PromotionsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🎁 Promotion Management" subtitle="Manage platform promotions and offers" />
      <div className="space-y-2">
        {MKTG_PROMOTIONS.map((p, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${p.color}10` }}>
                <Gift size={16} style={{ color: p.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: DARK }}>{p.name}</p>
                <p className="text-[10px]" style={{ color: GRAY }}>{p.type} • {p.users} users</p>
              </div>
              <StatusBadge status={p.status} color={p.color} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Create Offer", "Launch Promotion", "Schedule Promotion", "Analyze Results"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ReportsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="📊 Report Management" subtitle="Generate marketing reports" />
      <div className="grid grid-cols-1 gap-2">
        {MKTG_REPORTS.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${MKTG_BLUE}10` }}>
                <FileText size={16} style={{ color: MKTG_BLUE }} />
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
      <SectionHeader title="👥 Marketing Team" subtitle="Manage marketing staff and teams" />
      <div className="space-y-2">
        {MKTG_TEAM_MEMBERS.map((t, i) => (
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
      <SectionHeader title="⚙️ Marketing Settings" subtitle="Manage marketing configurations" />
      <div className="grid grid-cols-2 gap-2">
        {MKTG_SETTINGS_GROUPS.map((s, i) => {
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
        {["Update Settings", "Save Configuration", "Manage Preferences", "Reset Settings"].map((a, i) => (
          <button key={i} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${SLATE}10`, color: SLATE }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function ExclusiveSection() {
  return (
    <div className="space-y-3">
      <SectionHeader title="🚀 Exclusive Tools" subtitle="Executive tools for Marketing Managers only" />
      <div className="grid grid-cols-1 gap-2">
        {MKTG_EXCLUSIVE_TOOLS.map((t, i) => {
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
  overview: HomeSection, campaigns: CampaignsSection, acquisition: AcquisitionSection,
  hostpromo: HostPromoSection, agencypromo: AgencyPromoSection, brand: BrandSection,
  social: SocialSection, influencers: InfluencersSection, eventpromo: EventPromoSection,
  advertising: AdvertisingSection, growth: GrowthSection, ai: AISection,
  brandperf: BrandPerfSection, communication: CommunicationSection, content: ContentSection,
  promotions: PromotionsSection, reports: ReportsSection, team: TeamSection,
  settings: SettingsSection, exclusive: ExclusiveSection,
};

export default function MarketingManagerDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);

  const ActiveComponent = SECTIONS[activeSection] || HomeSection;
  const activeSectionData = MKTG_SECTIONS.find(s => s.id === activeSection) || MKTG_SECTIONS[0];

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #1E3A8A 100%)", boxShadow: "0 4px 16px rgba(15,27,61,0.15)" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              <Megaphone size={16} /> Marketing Manager
            </h1>
            <p className="text-[10px] text-white/60">Global Marketing & Branding Control</p>
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
                {MKTG_SECTIONS.map((s, i) => {
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
          <ReportToSection roleKey="marketing-manager" theme="light" />
        </div>

        <div className="px-4 pt-3">
          <ActiveComponent onNavigate={(id) => { setActiveSection(id); setShowSidebar(false); }} />
        </div>
      </div>
    </div>
  );
}