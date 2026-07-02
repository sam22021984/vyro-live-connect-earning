import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Building2, BadgeCheck, Hash, Layers, Trophy, Users, UserCheck,
  UserX, UserPlus, UserMinus, CheckCircle, PauseCircle, ArrowRightLeft,
  FileText, UserSearch, BarChart3, GitBranch, Calendar, Send, XCircle,
  DollarSign, Percent, TrendingUp, LineChart, FileBarChart, Download,
  ArrowDownToLine, Gauge, Activity, Target, Megaphone, Gift, PlusCircle,
  Pencil, StopCircle, ShieldCheck, ShieldAlert, AlertTriangle, AlertCircle,
  FileSearch, Scale, MessageSquare, Globe, MapPin, ListOrdered, Columns3,
  Star, Circle, Eye,
} from "lucide-react";
import { AGENCY_INFO, AGENCY_STATS, AGENCY_MODULES } from "@/components/agency/agencyData";

const formatNum = (n) => n.toLocaleString();

const ICON_MAP = {
  ArrowLeft, Building2, BadgeCheck, Hash, Layers, Trophy, Users, UserCheck,
  UserX, UserPlus, UserMinus, CheckCircle, PauseCircle, ArrowRightLeft,
  FileText, UserSearch, BarChart3, GitBranch, Calendar, Send, XCircle,
  DollarSign, Percent, TrendingUp, LineChart, FileBarChart, Download,
  ArrowDownToLine, Gauge, Activity, Target, Megaphone, Gift, PlusCircle,
  Pencil, StopCircle, ShieldCheck, ShieldAlert, AlertTriangle, AlertCircle,
  FileSearch, Scale, MessageSquare, Globe, MapPin, ListOrdered, Columns3,
  Star, Circle, Eye,
};

const getIcon = (name, size = 16, className = "") => {
  const Icon = ICON_MAP[name] || Circle;
  return <Icon size={size} className={className} />;
};

const actionTypeStyles = {
  primary: { bg: "#0F1B3D", text: "#fff", border: "#0F1B3D" },
  secondary: { bg: "#fff", text: "#0F1B3D", border: "#E5E7EB" },
  success: { bg: "#10B981", text: "#fff", border: "#059669" },
  danger: { bg: "#EF4444", text: "#fff", border: "#DC2626" },
  warning: { bg: "#F59E0B", text: "#fff", border: "#D97706" },
};

const statusStyles = {
  success: { bg: "#D1FAE5", text: "#059669" },
  warning: { bg: "#FEF3C7", text: "#D97706" },
  danger: { bg: "#FEE2E2", text: "#DC2626" },
};

function ActionButton({ action }) {
  const style = actionTypeStyles[action.type] || actionTypeStyles.secondary;
  return (
    <button
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition"
      style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
    >
      {getIcon(action.icon, 14)}
      {action.label}
    </button>
  );
}

function FeatureCard({ feature, color }) {
  const status = feature.status ? statusStyles[feature.status] : null;
  return (
    <div className="rounded-2xl p-3 border border-gray-100 bg-white" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
          <span style={{ color }}>{getIcon(feature.icon, 14)}</span>
        </div>
        <span className="text-[11px] text-gray-500 font-medium">{feature.label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-gray-800">{feature.value}</span>
        {status && (
          <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: status.bg, color: status.text }}>
            {feature.status?.toUpperCase()}
          </span>
        )}
      </div>
      {feature.detail && <p className="text-[10px] text-gray-400 mt-0.5">{feature.detail}</p>}
    </div>
  );
}

function ModuleContent({ module }) {
  const color = module.color;

  if (module.id === "revenue_management") {
    const maxVal = Math.max(...module.revenueBreakdown.map((d) => d.value));
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-4 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-3">Revenue Trend (6 Months)</h4>
          <div className="flex items-end gap-3 h-32">
            {module.revenueBreakdown.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] font-bold text-gray-500">${d.value}K</span>
                <div className="w-full rounded-t-lg transition-all" style={{ height: `${(d.value / maxVal) * 100}%`, background: `linear-gradient(to top, ${color}, ${color}aa)` }} />
                <span className="text-[9px] text-gray-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {module.actions.map((a, i) => <ActionButton key={i} action={a} />)}
        </div>
      </div>
    );
  }

  if (module.id === "host_management") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-3 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-2">Top Hosts</h4>
          <div className="space-y-2">
            {module.hostList.map((h, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
                <img src={h.avatar} alt={h.name} className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">{h.name}</p>
                  <p className="text-[10px] text-gray-400">{h.id} · LV.{h.level}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold" style={{ color }}>${formatNum(h.revenue)}</p>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={h.status === "active" ? statusStyles.success : statusStyles.warning}>
                    {h.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {module.actions.map((a, i) => <ActionButton key={i} action={a} />)}
        </div>
      </div>
    );
  }

  if (module.id === "recruitment_center") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-4 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-3">Hiring Pipeline</h4>
          <div className="space-y-2">
            {module.pipeline.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ background: p.color }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-gray-600">{p.stage}</span>
                    <span className="text-[11px] font-bold text-gray-800">{p.count}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(p.count / 34) * 100}%`, background: p.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {module.actions.map((a, i) => <ActionButton key={i} action={a} />)}
        </div>
      </div>
    );
  }

  if (module.id === "performance_analytics") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-4 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-3">KPI Dashboard</h4>
          <div className="grid grid-cols-2 gap-3">
            {module.kpis.map((k, i) => {
              const pct = Math.min((k.value / (k.target * 1.3)) * 100, 100);
              const onTarget = k.value >= k.target;
              return (
                <div key={i} className="p-2.5 rounded-xl bg-gray-50">
                  <p className="text-[10px] text-gray-500 mb-1">{k.name}</p>
                  <div className="flex items-baseline gap-1 mb-1.5">
                    <span className="text-lg font-bold text-gray-800">{k.value}{k.unit}</span>
                    <span className="text-[9px] text-gray-400">/ {k.target}{k.unit}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: onTarget ? "#10B981" : "#F59E0B" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {module.actions.map((a, i) => <ActionButton key={i} action={a} />)}
        </div>
      </div>
    );
  }

  if (module.id === "events_campaigns") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-3 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-2">Active Campaigns</h4>
          <div className="space-y-2">
            {module.campaigns.map((c, i) => (
              <div key={i} className="p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-800">{c.name}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={c.status === "active" ? statusStyles.success : { bg: "#E5E7EB", text: "#6B7280" }}>
                    {c.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-gray-400">{c.type}</span>
                  <span className="text-[10px] text-gray-400">·</span>
                  <span className="text-[10px] text-gray-400">{c.participants} participants</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: c.status === "active" ? color : "#9CA3AF" }} />
                </div>
                <span className="text-[9px] text-gray-400 mt-1 block">{c.progress}% complete</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {module.actions.map((a, i) => <ActionButton key={i} action={a} />)}
        </div>
      </div>
    );
  }

  if (module.id === "compliance_center") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-3 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-2">Recent Violations</h4>
          <div className="space-y-2">
            {module.violations.map((v, i) => {
              const sevStyle = v.severity === "medium" ? statusStyles.warning : v.severity === "high" ? statusStyles.danger : { bg: "#FEF3C7", text: "#92400E" };
              const stStyle = v.status === "resolved" ? statusStyles.success : v.status === "reviewing" ? statusStyles.warning : { bg: "#FEE2E2", text: "#DC2626" };
              return (
                <div key={i} className="p-3 rounded-xl bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-800">{v.host}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={stStyle}>{v.status.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500">{v.type}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={sevStyle}>{v.severity.toUpperCase()}</span>
                    <span className="text-[10px] text-gray-400 ml-auto">{v.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {module.actions.map((a, i) => <ActionButton key={i} action={a} />)}
        </div>
      </div>
    );
  }

  if (module.id === "agency_leaderboard") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-3 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-2">Global Agency Rankings</h4>
          <div className="space-y-2">
            {module.leaderboard.map((a, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${a.isOwn ? "bg-blue-50 border border-blue-200" : "bg-gray-50"}`}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0" style={{
                  background: a.rank === 1 ? "linear-gradient(135deg, #D4AF37, #FFD700)" : a.rank === 2 ? "linear-gradient(135deg, #9CA3AF, #D1D5DB)" : a.rank === 3 ? "linear-gradient(135deg, #B45309, #D97706)" : "#E5E7EB",
                  color: a.rank <= 3 ? "#fff" : "#6B7280",
                }}>
                  {a.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">{a.name}{a.isOwn && " (You)"}</p>
                  <p className="text-[10px] text-gray-400">{a.hosts} hosts · {a.region}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold" style={{ color }}>${formatNum(a.revenue)}</p>
                  <span className="text-[9px] text-gray-400">{a.change > 0 ? `↑${a.change}` : a.change < 0 ? `↓${Math.abs(a.change)}` : "—"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {module.actions.map((a, i) => <ActionButton key={i} action={a} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2">
        {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
      </div>
      <div className="flex flex-wrap gap-2">
        {module.actions.map((a, i) => <ActionButton key={i} action={a} />)}
      </div>
    </div>
  );
}

export default function AgencyDashboard() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(AGENCY_MODULES[0].id);
  const currentModule = AGENCY_MODULES.find((m) => m.id === activeModule);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 100%)" }}>
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">Agency Dashboard</h1>
            <p className="text-[10px] text-white/60">{AGENCY_INFO.agency_name} · Control Center</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <Building2 size={18} className="text-white" />
          </div>
        </div>

        {/* Agency Banner */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 60%, #2D1B69 100%)", boxShadow: "0 8px 24px rgba(15,27,61,0.25)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)", transform: "translate(30%, -30%)" }} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #D4AF37, #B8941E)" }}>
                  <Building2 size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-bold">{AGENCY_INFO.agency_name}</h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>
                      LEVEL {AGENCY_INFO.agency_level}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1" style={{ background: "rgba(16,185,129,0.2)", color: "#10B981" }}>
                      <BadgeCheck size={10} /> {AGENCY_INFO.verification_status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-[9px] text-white/50">Agency ID</p>
                  <p className="text-[11px] font-bold">{AGENCY_INFO.agency_id}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-white/50">Global Rank</p>
                  <p className="text-[11px] font-bold" style={{ color: "#D4AF37" }}>#{AGENCY_INFO.agency_rank}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-white/50">Score</p>
                  <p className="text-[11px] font-bold" style={{ color: "#10B981" }}>{AGENCY_INFO.performance_score}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-4 pt-4">
          <h3 className="text-xs font-bold text-gray-700 mb-2 px-1">Dashboard Statistics</h3>
          <div className="grid grid-cols-3 gap-2">
            {AGENCY_STATS.map((s, i) => (
              <div key={i} className="rounded-xl p-2.5 border border-gray-100 bg-white" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-1.5" style={{ background: `${s.color}15` }}>
                  <span style={{ color: s.color }}>{getIcon(s.icon, 13)}</span>
                </div>
                <p className="text-sm font-bold text-gray-800 leading-none">{s.value}</p>
                <p className="text-[8px] text-gray-400 mt-1 leading-tight">{s.label}</p>
                <p className="text-[8px] mt-0.5 leading-tight" style={{ color: s.color }}>{s.trend}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Module Tabs */}
        <div className="sticky top-[57px] z-20 px-4 pt-4 pb-2" style={{ background: "#F5F7FA" }}>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {AGENCY_MODULES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={`flex items-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-bold transition active:scale-95 whitespace-nowrap ${activeModule === m.id ? "text-white" : "bg-white text-gray-500 border border-gray-100"}`}
                  style={activeModule === m.id ? { background: m.gradient, boxShadow: `0 3px 10px ${m.color}40` } : {}}
                >
                  {getIcon(m.icon, 13)}
                  {m.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Module Content */}
        <div className="px-4 pt-2">
          <div className="rounded-2xl p-3 mb-3" style={{ background: `${currentModule.color}10`, border: `1px solid ${currentModule.color}25` }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: currentModule.gradient }}>
                {getIcon(currentModule.icon, 16, "text-white")}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800">{currentModule.title}</h3>
                <p className="text-[10px] text-gray-500">{currentModule.description}</p>
              </div>
            </div>
          </div>
          <ModuleContent module={currentModule} />
        </div>
      </div>
    </div>
  );
}