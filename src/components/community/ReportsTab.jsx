import React, { useState } from "react";
import { Loader2, Ban, AlertTriangle, CheckCircle, FileText, Eye } from "lucide-react";
import { COLORS } from "./communityData";
import { useToast } from "@/components/ui/use-toast";

const SEVERITY_STYLES = {
  low: { bg: `${COLORS.skyBlue}15`, color: COLORS.skyBlue, label: "Low" },
  medium: { bg: `${COLORS.amber}15`, color: COLORS.amber, label: "Medium" },
  high: { bg: `${COLORS.crimson}15`, color: COLORS.crimson, label: "High" },
  critical: { bg: `${COLORS.crimson}25`, color: COLORS.crimson, label: "Critical" },
};

const STATUS_STYLES = {
  pending: { bg: `${COLORS.amber}15`, color: COLORS.amber, icon: AlertTriangle },
  investigating: { bg: `${COLORS.skyBlue}15`, color: COLORS.skyBlue, icon: Eye },
  reviewing: { bg: `${COLORS.royalBlue}15`, color: COLORS.royalBlue, icon: FileText },
  resolved: { bg: `${COLORS.emerald}15`, color: COLORS.emerald, icon: CheckCircle },
};

export default function ReportsTab({ reports = [], loading }) {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? reports : reports.filter((r) => r.status === filter);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>🚩 Reports & Moderation</h3>
        <span className="text-[10px]" style={{ color: COLORS.textSecondary }}>{filtered.length} reports</span>
      </div>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
        {["all", "pending", "investigating", "reviewing", "resolved"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={"py-1.5 px-3 rounded-full text-[10px] font-bold whitespace-nowrap transition active:scale-95 capitalize " + (filter === f ? "text-white" : "")}
            style={filter === f
              ? { background: `linear-gradient(135deg, ${COLORS.royalBlue}, ${COLORS.skyBlue})` }
              : { background: COLORS.bgPrimary, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}` }
            }
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: COLORS.royalBlue }} />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-xs py-12" style={{ color: COLORS.textSecondary }}>No reports found</p>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((r) => {
            const sev = SEVERITY_STYLES[r.severity];
            const st = STATUS_STYLES[r.status];
            return (
              <div key={r.id} className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>{r.reported}</span>
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: sev.bg, color: sev.color }}>{sev.label}</span>
                    </div>
                    <p className="text-[10px]" style={{ color: COLORS.textSecondary }}>{r.reason}</p>
                    <p className="text-[9px] mt-0.5" style={{ color: COLORS.textSecondary }}>By {r.reporter} · {r.date}</p>
                  </div>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full" style={{ background: st.bg }}>
                    <st.icon size={10} style={{ color: st.color }} />
                    <span className="text-[9px] font-bold capitalize" style={{ color: st.color }}>{r.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] mb-2 px-2 py-1 rounded-lg" style={{ background: COLORS.bgPrimary }}>
                  <FileText size={10} style={{ color: COLORS.textSecondary }} />
                  <span style={{ color: COLORS.textSecondary }}>Evidence: {r.evidence}</span>
                </div>
                {r.status !== "resolved" && (
                  <div className="flex gap-1.5">
                    <button onClick={() => toast({ title: "Reviewing report..." })} className="flex-1 py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1" style={{ background: `${COLORS.royalBlue}15`, color: COLORS.royalBlue }}>
                      <Eye size={11} /> Review
                    </button>
                    <button onClick={() => toast({ title: "Warning sent" })} className="flex-1 py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1" style={{ background: `${COLORS.amber}15`, color: COLORS.amber }}>
                      <AlertTriangle size={11} /> Warn
                    </button>
                    <button onClick={() => toast({ title: "User banned" })} className="flex-1 py-1.5 rounded-lg text-[10px] font-bold text-white flex items-center justify-center gap-1" style={{ background: COLORS.crimson }}>
                      <Ban size={11} /> Ban
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}