import React from "react";
import { ShieldAlert, Monitor, LogIn, Bug } from "lucide-react";
import { SAM_SECURITY } from "@/components/sam-dashboard/samData";

const severityColors = { high: "#EF4444", medium: "#F59E0B", low: "#10B981" };
const typeIcons = { login: LogIn, device: Monitor, fraud: ShieldAlert };

export default function SecurityModule() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl p-3" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <ShieldAlert size={16} style={{ color: "#EF4444" }} />
          <p className="text-lg font-bold mt-1" style={{ color: "#F4F0FA" }}>3</p>
          <p className="text-[8px]" style={{ color: "rgba(244,240,250,0.4)" }}>High Severity</p>
        </div>
        <div className="rounded-2xl p-3" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
          <Bug size={16} style={{ color: "#F59E0B" }} />
          <p className="text-lg font-bold mt-1" style={{ color: "#F4F0FA" }}>2</p>
          <p className="text-[8px]" style={{ color: "rgba(244,240,250,0.4)" }}>Medium Severity</p>
        </div>
      </div>
      {SAM_SECURITY.map((s) => {
        const Icon = typeIcons[s.type] || ShieldAlert;
        return (
          <div key={s.id} className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${severityColors[s.severity]}30` }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${severityColors[s.severity]}20` }}>
                <Icon size={16} style={{ color: severityColors[s.severity] }} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold" style={{ color: "#F4F0FA" }}>{s.event}</h4>
                <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>User: {s.user} · IP: {s.ip} · {s.time}</p>
              </div>
              <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${severityColors[s.severity]}20`, color: severityColors[s.severity] }}>{s.severity.toUpperCase()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}