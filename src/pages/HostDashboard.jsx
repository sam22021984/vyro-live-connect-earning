import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, User, BadgeCheck, Hash, Layers, Building2, Users, Heart,
  Trophy, Gauge, Radio, Clock, Eye, TrendingUp, History, Square,
  CalendarPlus, DollarSign, Sun, CalendarDays, Calendar, Gift, Award,
  Percent, ArrowDownToLine, Download, FileText, BarChart3, Globe,
  Repeat, Activity, CheckSquare, Target, CheckCircle, FolderOpen,
  Star, Archive, Image, Upload, Trash2, Film, MapPin, BookOpen,
  AlertTriangle, AlertCircle, Scale, MessageSquare, Circle, Users2,
} from "lucide-react";
import { HOST_INFO as HOST_INFO_D, HOST_STATS as HOST_STATS_D, HOST_MODULES as HOST_MODULES_D } from "@/components/host/hostData";
import { useDashboardData } from "@/hooks/useDashboardData";
import ReportToSection from "@/components/shared/ReportToSection";
import HostPolicyTab from "@/components/host/HostPolicyTab";

const ICON_MAP = {
  ArrowLeft, User, BadgeCheck, Hash, Layers, Building2, Users, Heart,
  Trophy, Gauge, Radio, Clock, Eye, TrendingUp, History, Square,
  CalendarPlus, DollarSign, Sun, CalendarDays, Calendar, Gift, Award,
  Percent, ArrowDownToLine, Download, FileText, BarChart3, Globe,
  Repeat, Activity, CheckSquare, Target, CheckCircle, FolderOpen,
  Star, Archive, Image, Upload, Trash2, Film, MapPin, BookOpen,
  AlertTriangle, AlertCircle, Scale, MessageSquare, Circle, Users2,
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

  if (module.id === "live_streaming_center") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-4 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-3">Recent Streams</h4>
          <div className="space-y-2">
            {module.recentStreams.map((s, i) => (
              <div key={i} className="p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-800">{s.title}</span>
                  <span className="text-[10px] font-bold" style={{ color }}>{s.earnings}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <span>{s.date}</span>
                  <span>· {s.duration}</span>
                  <span>· {s.viewers.toLocaleString()} viewers</span>
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

  if (module.id === "earnings_center") {
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
        <div className="rounded-2xl p-3 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-2">Recent Transactions</h4>
          <div className="space-y-2">
            {module.transactions.map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: t.amount.startsWith("+") ? "#D1FAE5" : "#FEE2E2" }}>
                  <span style={{ color: t.amount.startsWith("+") ? "#059669" : "#DC2626" }}>
                    {getIcon(t.type.includes("Gift") ? "Gift" : t.type.includes("Withdrawal") ? "ArrowDownToLine" : "Award", 13)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">{t.type}</p>
                  <p className="text-[10px] text-gray-400">{t.detail} · {t.date}</p>
                </div>
                <span className="text-xs font-bold" style={{ color: t.amount.startsWith("+") ? "#059669" : "#DC2626" }}>{t.amount}</span>
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

  if (module.id === "audience_analytics") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-4 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-3">Audience Demographics</h4>
          <div className="space-y-2.5">
            {module.demographics.map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-lg">{d.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-gray-600">{d.country}</span>
                    <span className="text-[11px] font-bold text-gray-800">{d.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${d.pct * 3.5}%`, background: d.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-4 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-3">Engagement Metrics</h4>
          <div className="space-y-3">
            {module.engagement.map((e, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-gray-600">{e.metric}</span>
                  <span className="text-[11px] font-bold text-gray-800">{e.value}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${e.value}%`, background: e.color }} />
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

  if (module.id === "host_tasks_rewards") {
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
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>{t.reward}</span>
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

  if (module.id === "content_management") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-3 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-2">Media Library</h4>
          <div className="grid grid-cols-2 gap-2">
            {module.mediaLibrary.map((m, i) => (
              <div key={i} className="p-3 rounded-xl bg-gray-50">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: `${color}15` }}>
                  <span style={{ color }}>{getIcon(m.icon, 14)}</span>
                </div>
                <p className="text-xs font-bold text-gray-800 truncate">{m.title}</p>
                <p className="text-[10px] text-gray-400">{m.type} · {m.size}</p>
                <p className="text-[10px] text-gray-400">{m.date}</p>
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

  if (module.id === "host_ranking_center") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {module.features.map((f, i) => <FeatureCard key={i} feature={f} color={color} />)}
        </div>
        <div className="rounded-2xl p-3 border border-gray-100 bg-white">
          <h4 className="text-xs font-bold text-gray-700 mb-2">Host Leaderboard</h4>
          <div className="space-y-2">
            {module.leaderboard.map((h, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${h.isYou ? "" : "bg-gray-50"}`} style={h.isYou ? { background: `${color}10`, border: `1px solid ${color}30` } : {}}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold" style={{ background: h.rank <= 3 ? ["#D4AF37", "#C0C0C0", "#CD7F32"][h.rank - 1] : "#E5E7EB", color: h.rank <= 3 ? "#fff" : "#6B7280" }}>
                  {h.rank}
                </div>
                <img src={h.avatar} alt={h.name} className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">{h.name}</p>
                  <p className="text-[10px] text-gray-400">{h.followers} followers</p>
                </div>
                <span className="text-xs font-bold" style={{ color }}>{h.score}</span>
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

  if (module.id === "host_policy") {
    return <HostPolicyTab />;
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
              const stStyle = h.status === "passed" || h.status === "earned" || h.status === "completed" ? statusStyles.success : statusStyles.warning;
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

export default function HostDashboard() {
  const navigate = useNavigate();
  const { info: HOST_INFO, stats: HOST_STATS, modules: HOST_MODULES, loading } = useDashboardData("host", { info: HOST_INFO_D, stats: HOST_STATS_D, modules: HOST_MODULES_D });
  const [activeModule, setActiveModule] = useState(HOST_MODULES[0]?.id);
  const currentModule = HOST_MODULES.find((m) => m.id === activeModule) || HOST_MODULES[0];

  if (loading || !currentModule) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 100%)" }}>
          <button onClick={() => navigate("/control-center")} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">Host Dashboard</h1>
            <p className="text-[10px] text-white/60">{HOST_INFO.host_name} · Streamer Control Center</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <Radio size={18} className="text-white" />
          </div>
        </div>

        {/* Host Banner */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 60%, #4C1D95 100%)", boxShadow: "0 8px 24px rgba(15,27,61,0.25)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #EC4899, transparent 70%)", transform: "translate(30%, -30%)" }} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #EC4899, #8B5CF6)" }}>
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt={HOST_INFO.host_name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-sm font-bold">{HOST_INFO.host_name}</h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>
                      LEVEL {HOST_INFO.host_level}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1" style={{ background: "rgba(16,185,129,0.2)", color: "#10B981" }}>
                      <BadgeCheck size={10} /> {HOST_INFO.verification_status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-[9px] text-white/50">Host ID</p>
                  <p className="text-[11px] font-bold">{HOST_INFO.host_id}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-white/50">Followers</p>
                  <p className="text-[11px] font-bold" style={{ color: "#EC4899" }}>{(HOST_INFO.total_followers / 1000).toFixed(1)}K</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-white/50">Rank</p>
                  <p className="text-[11px] font-bold" style={{ color: "#D4AF37" }}>#{HOST_INFO.current_rank}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-white/60">Monthly Performance</span>
                  <span className="text-[10px] font-bold" style={{ color: "#10B981" }}>{HOST_INFO.monthly_performance_score}/100</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${HOST_INFO.monthly_performance_score}%`, background: "linear-gradient(to right, #8B5CF6, #EC4899)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report To Section */}
        <div className="px-4 pt-3">
          <ReportToSection roleKey="host" theme="light" />
        </div>

        {/* Stats Grid */}
        <div className="px-4 pt-4">
          <h3 className="text-xs font-bold text-gray-700 mb-2 px-1">Dashboard Statistics</h3>
          <div className="grid grid-cols-3 gap-2">
            {HOST_STATS.map((s, i) => (
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
              {HOST_MODULES.map((m) => (
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