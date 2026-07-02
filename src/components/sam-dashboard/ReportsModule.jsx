import React from "react";
import { FileText, Download, BarChart3 } from "lucide-react";
import { SAM_REPORTS } from "@/components/sam-dashboard/samData";
import { useToast } from "@/components/ui/use-toast";

const typeColors = { daily: "#3B82F6", monthly: "#8B5CF6", coins: "#D4AF37", recharge: "#10B981", withdrawal: "#EF4444", growth: "#EC4899", seller: "#06B6D4" };

export default function ReportsModule() {
  const { toast } = useToast();
  return (
    <div className="space-y-3">
      {SAM_REPORTS.map((r) => (
        <div key={r.id} className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${typeColors[r.type]}20` }}>
              <FileText size={16} style={{ color: typeColors[r.type] }} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold" style={{ color: "#F4F0FA" }}>{r.title}</h4>
              <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>{r.date} · {r.id}</p>
            </div>
            <span className="text-xs font-bold" style={{ color: typeColors[r.type] }}>{r.value}</span>
          </div>
          <div className="flex gap-1.5 mt-2.5">
            <button onClick={() => toast({ title: "Viewing " + r.title })} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#3B82F615", color: "#3B82F6", border: "1px solid #3B82F630" }}>
              <BarChart3 size={10} /> View
            </button>
            <button onClick={() => toast({ title: "Exported as PDF" })} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#EF444415", color: "#EF4444", border: "1px solid #EF444430" }}>
              <Download size={10} /> PDF
            </button>
            <button onClick={() => toast({ title: "Exported as Excel" })} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#10B98115", color: "#10B981", border: "1px solid #10B98130" }}>
              <Download size={10} /> Excel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}