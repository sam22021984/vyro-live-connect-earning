import React from "react";
import { Building2, Briefcase, TrendingUp, DollarSign, Percent, Eye } from "lucide-react";
import { SAM_AGENCIES } from "@/components/sam-dashboard/samData";
import { useToast } from "@/components/ui/use-toast";

export default function AgencyManagementModule() {
  const { toast } = useToast();
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl p-3" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <Building2 size={16} style={{ color: "#6366F1" }} />
          <p className="text-lg font-bold mt-1" style={{ color: "#F4F0FA" }}>342</p>
          <p className="text-[8px]" style={{ color: "rgba(244,240,250,0.4)" }}>Total Agencies</p>
        </div>
        <div className="rounded-2xl p-3" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
          <Briefcase size={16} style={{ color: "#F59E0B" }} />
          <p className="text-lg font-bold mt-1" style={{ color: "#F4F0FA" }}>1,250</p>
          <p className="text-[8px]" style={{ color: "rgba(244,240,250,0.4)" }}>Total Agents</p>
        </div>
      </div>
      {SAM_AGENCIES.map((a) => (
        <div key={a.id} className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#6366F115" }}>
              <Building2 size={18} style={{ color: "#6366F1" }} />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold" style={{ color: "#F4F0FA" }}>{a.name}</h4>
              <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>{a.id} · Owner: {a.owner}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            <div className="text-center p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p className="text-[10px] font-bold" style={{ color: "#F4F0FA" }}>{a.hosts}</p>
              <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Hosts</p>
            </div>
            <div className="text-center p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p className="text-[10px] font-bold" style={{ color: "#10B981" }}>{a.revenue}</p>
              <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Revenue</p>
            </div>
            <div className="text-center p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p className="text-[10px] font-bold" style={{ color: "#D4AF37" }}>{a.commission}</p>
              <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Commission</p>
            </div>
            <div className="text-center p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p className="text-[10px] font-bold" style={{ color: "#3B82F6" }}>{a.performance}%</p>
              <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Perf</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => toast({ title: "Viewing " + a.name + " performance" })} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#6366F115", color: "#6366F1", border: "1px solid #6366F130" }}>
              <TrendingUp size={10} /> Performance
            </button>
            <button onClick={() => toast({ title: "Viewing revenue" })} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#10B98115", color: "#10B981", border: "1px solid #10B98130" }}>
              <DollarSign size={10} /> Revenue
            </button>
            <button onClick={() => toast({ title: "Viewing commission" })} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#D4AF3715", color: "#D4AF37", border: "1px solid #D4AF3730" }}>
              <Percent size={10} /> Commission
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}