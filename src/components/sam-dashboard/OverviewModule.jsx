import React from "react";
import { Users, Activity, UserPlus, Mic, Briefcase, Building2, Coins, DollarSign, Clock, ArrowDownCircle, Store, AlertTriangle, Circle } from "lucide-react";
import { SAM_STATS } from "@/components/sam-dashboard/samData";

const ICON_MAP = { Users, Activity, UserPlus, Mic, Briefcase, Building2, Coins, DollarSign, Clock, ArrowDownCircle, Store, AlertTriangle };

function StatCard({ stat }) {
  const Icon = ICON_MAP[stat.icon] || Circle;
  return (
    <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}20` }}>
          <Icon size={14} style={{ color: stat.color }} />
        </div>
        <span className="text-[8px] flex-1" style={{ color: "rgba(244,240,250,0.4)" }}>{stat.label}</span>
      </div>
      <p className="text-lg font-bold" style={{ color: "#F4F0FA" }}>{stat.value}</p>
      <p className="text-[8px] mt-0.5" style={{ color: stat.color }}>{stat.trend}</p>
    </div>
  );
}

export default function OverviewModule() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl p-3 text-center" style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(59,130,246,0.1))", border: "1px solid rgba(212,175,55,0.2)" }}>
        <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.5)" }}>🌐 VYRO Live Connect</p>
        <h3 className="text-sm font-bold mt-0.5" style={{ color: "#D4AF37" }}>Super Admin Manager Dashboard</h3>
        <p className="text-[9px] mt-1" style={{ color: "rgba(244,240,250,0.4)" }}>Real-time platform overview · Last updated: just now</p>
      </div>
      <h4 className="text-xs font-bold px-1" style={{ color: "#F4F0FA" }}>Platform KPIs</h4>
      <div className="grid grid-cols-2 gap-2">
        {SAM_STATS.map((s, i) => <StatCard key={i} stat={s} />)}
      </div>
    </div>
  );
}