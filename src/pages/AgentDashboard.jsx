import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, User, BadgeCheck, Hash, Layers, Building2, Users, UserCheck,
  Target, Gauge, UserPlus, FileText, UserSearch, GitBranch, BarChart3,
  CheckCircle, XCircle, MessageSquare, Headphones, Activity, AlertCircle,
  Eye, Pencil, Sun, CalendarDays, Calendar, LifeBuoy, DollarSign, Gift,
  Award, Download, ArrowDownToLine, Percent, TrendingUp, CheckSquare,
  Trophy, History, Scale, AlertTriangle, ShieldCheck, Circle, Clock, Lock,
} from "lucide-react";
import { AGENT_INFO as AGENT_INFO_D, AGENT_STATS as AGENT_STATS_D, AGENT_MODULES as AGENT_MODULES_D } from "@/components/agent/agentData";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useRoleGuard } from "@/hooks/useRoleGuard";
import ReportToSection from "@/components/shared/ReportToSection";
import AgentPolicyTab from "@/components/agent/AgentPolicyTab";

const formatNum = (n) => n.toLocaleString();

const ICON_MAP = {
  ArrowLeft, User, BadgeCheck, Hash, Layers, Building2, Users, UserCheck,
  Target, Gauge, UserPlus, FileText, UserSearch, GitBranch, BarChart3,
  CheckCircle, XCircle, MessageSquare, Headphones, Activity, AlertCircle,
  Eye, Pencil, Sun, CalendarDays, Calendar, LifeBuoy, DollarSign, Gift,
  Award, Download, ArrowDownToLine, Percent, TrendingUp, CheckSquare,
  Trophy, History, Scale, AlertTriangle, ShieldCheck, Circle, Clock, FileText,
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

  if (module.id === "recruitment_management") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-4 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-3">Recruitment Pipeline</h4>
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
                    <div className="h-full rounded-full" style={{ width: `${(p.count / 18) * 100}%`, background: p.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-3 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-2">Recent Candidates</h4>
          <div className="space-y-2">
            {module.candidates.map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
                <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">{c.name}</p>
                  <p className="text-[10px] text-gray-400">{c.id} · {c.date}</p>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={c.stage === "Approved" ? statusStyles.success : statusStyles.warning}>
                  {c.stage.toUpperCase()}
                </span>
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

  if (module.id === "host_support_center") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-3 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-2">Assigned Hosts</h4>
          <div className="space-y-2">
            {module.hosts.map((h, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
                <img src={h.avatar} alt={h.name} className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">{h.name}</p>
                  <p className="text-[10px] text-gray-400">{h.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold" style={{ color }}>{h.performance}%</p>
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

  if (module.id === "target_kpi_center") {
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

  if (module.id === "earnings_commission") {
    const maxVal = Math.max(...module.earningsBreakdown.map((d) => d.value));
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-4 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-3">Earnings Trend (6 Months)</h4>
          <div className="flex items-end gap-3 h-32">
            {module.earningsBreakdown.map((d, i) => (
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

  if (module.id === "analytics_center") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-4 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-3">Recruitment Funnel</h4>
          <div className="space-y-3">
            {module.analytics.map((a, i) => {
              const pct = (a.value / a.max) * 100;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-gray-600">{a.metric}</span>
                    <span className="text-[11px] font-bold text-gray-800">{a.value} / {a.max}</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: a.color }} />
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

  if (module.id === "tasks_achievements") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-3 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-2">Active Tasks</h4>
          <div className="space-y-2">
            {module.tasks.map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: t.completed ? "#10B981" : "#E5E7EB" }}>
                  {t.completed ? <CheckCircle size={14} className="text-white" /> : <Clock size={14} className="text-gray-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${t.completed ? "text-gray-400 line-through" : "text-gray-800"}`}>{t.name}</p>
                  <p className="text-[10px] text-gray-400">{t.type} task</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>
                  {t.reward}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-3 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-2">Achievement Badges</h4>
          <div className="grid grid-cols-4 gap-2">
            {module.badges.map((b, i) => (
              <div key={i} className={`flex flex-col items-center gap-1 p-2 rounded-xl ${b.earned ? "bg-gray-50" : "bg-gray-50 opacity-40"}`}>
                <span className="text-2xl">{b.icon}</span>
                <span className="text-[8px] font-medium text-gray-600 text-center leading-tight">{b.name}</span>
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

  if (module.id === "agent_policy") {
    return <AgentPolicyTab />;
  }

  if (module.id === "support_compliance") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-3 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-2">Compliance History</h4>
          <div className="space-y-2">
            {module.complianceHistory.map((h, i) => {
              const stStyle = h.status === "passed" || h.status === "earned" || h.status === "acknowledged" ? statusStyles.success : statusStyles.warning;
              return (
                <div key={i} className="p-3 rounded-xl bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-800">{h.type}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={stStyle}>{h.status.toUpperCase()}</span>
                  </div>
                  <p className="text-[10px] text-gray-500">{h.detail}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{h.date}</p>
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

export default function AgentDashboard() {
  const navigate = useNavigate();
  const { hasAccess, loading: roleLoading } = useRoleGuard("agent");
  const { info: AGENT_INFO, stats: AGENT_STATS, modules: AGENT_MODULES, loading } = useDashboardData("agent", { info: AGENT_INFO_D, stats: AGENT_STATS_D, modules: AGENT_MODULES_D });
  const [activeModule, setActiveModule] = useState(AGENT_MODULES[0]?.id);
  const currentModule = AGENT_MODULES.find((m) => m.id === activeModule) || AGENT_MODULES[0];

  if (roleLoading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-red-400" />
          </div>
          <h2 className="text-base font-bold text-gray-800 mb-1">Access Denied</h2>
          <p className="text-xs text-gray-400 mb-4">Your role does not have access to the Agent Dashboard.</p>
          <button onClick={() => navigate("/control-center")} className="px-6 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-bold active:scale-95 transition">
            Back to Control Center
          </button>
        </div>
      </div>
    );
  }

  if (loading || !currentModule) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 100%)" }}>
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">Agent Dashboard</h1>
            <p className="text-[10px] text-white/60">{AGENT_INFO.agent_name} · Control Center</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
        </div>

        {/* Agent Banner */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 60%, #2D1B69 100%)", boxShadow: "0 8px 24px rgba(15,27,61,0.25)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)", transform: "translate(30%, -30%)" }} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #D4AF37, #B8941E)" }}>
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-bold">{AGENT_INFO.agent_name}</h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>
                      LEVEL {AGENT_INFO.agent_level}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1" style={{ background: "rgba(16,185,129,0.2)", color: "#10B981" }}>
                      <BadgeCheck size={10} /> {AGENT_INFO.verification_status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-[9px] text-white/50">Agent ID</p>
                  <p className="text-[11px] font-bold">{AGENT_INFO.agent_id}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-white/50">Recruits</p>
                  <p className="text-[11px] font-bold" style={{ color: "#D4AF37" }}>{AGENT_INFO.total_recruits}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-white/50">Score</p>
                  <p className="text-[11px] font-bold" style={{ color: "#10B981" }}>{AGENT_INFO.performance_score}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-white/60">Monthly Target</span>
                  <span className="text-[10px] font-bold" style={{ color: "#D4AF37" }}>{AGENT_INFO.monthly_target_pct}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${AGENT_INFO.monthly_target_pct}%`, background: "linear-gradient(to right, #D4AF37, #10B981)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report To Section */}
        <div className="px-4 pt-3">
          <ReportToSection roleKey="agent" theme="light" />
        </div>

        {/* Stats Grid */}
        <div className="px-4 pt-4">
          <h3 className="text-xs font-bold text-gray-700 mb-2 px-1">Dashboard Statistics</h3>
          <div className="grid grid-cols-3 gap-2">
            {AGENT_STATS.map((s, i) => (
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
              {AGENT_MODULES.map((m) => (
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