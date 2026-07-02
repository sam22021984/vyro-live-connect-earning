import React from "react";
import { Wallet, CreditCard, Database, Radio, Wrench, AlertTriangle, Circle } from "lucide-react";
import { SAM_SYSTEM_HEALTH } from "@/components/sam-dashboard/samData";
import { useToast } from "@/components/ui/use-toast";

const ICON_MAP = { Wallet, CreditCard, Database, Radio, Wrench, AlertTriangle };
const statusColors = { operational: "#10B981", degraded: "#F59E0B", warning: "#F59E0B", down: "#EF4444" };

export default function SystemHealthModule() {
  const { toast } = useToast();
  const operational = SAM_SYSTEM_HEALTH.filter((s) => s.status === "operational").length;
  return (
    <div className="space-y-3">
      <div className="rounded-2xl p-3 text-center" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(59,130,246,0.1))", border: "1px solid rgba(16,185,129,0.2)" }}>
        <p className="text-2xl font-bold" style={{ color: "#10B981" }}>{operational}/{SAM_SYSTEM_HEALTH.length}</p>
        <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.5)" }}>Services Operational</p>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10B981" }} />
          <span className="text-[9px]" style={{ color: "#10B981" }}>Auto-monitoring active</span>
        </div>
      </div>
      {SAM_SYSTEM_HEALTH.map((s, i) => {
        const Icon = ICON_MAP[s.icon] || Circle;
        return (
          <div key={i} className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${statusColors[s.status]}30` }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${statusColors[s.status]}20` }}>
                <Icon size={16} style={{ color: statusColors[s.status] }} />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold" style={{ color: "#F4F0FA" }}>{s.service}</h4>
                <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>Uptime: {s.uptime}{s.errors ? ` · ${s.errors} errors` : ""}</p>
              </div>
              <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${statusColors[s.status]}20`, color: statusColors[s.status] }}>{s.status.toUpperCase()}</span>
            </div>
          </div>
        );
      })}
      <button onClick={() => toast({ title: "Auto-repair triggered" })} className="w-full py-3 rounded-2xl text-xs font-bold active:scale-95 transition" style={{ background: "linear-gradient(135deg, #10B981, #059669)", color: "#fff" }}>
        🔧 Run Auto-Repair System
      </button>
    </div>
  );
}