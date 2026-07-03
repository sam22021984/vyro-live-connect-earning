import React, { useState } from "react";
import { ClipboardList, Check, Clock, X } from "lucide-react";
import { OCS_REPORT } from "@/components/seller-dashboard/ocsReportData";
import { useToast } from "@/components/ui/use-toast";

const SOFT_WHITE = "#F4F0FA";
const GOLD = "#D4AF37";
const TEAL = "#22D3EE";
const GLASS = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" };

export default function OcsReportCenterModule() {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState(null);

  const getStatusColor = (statusId) => {
    const s = OCS_REPORT.reportStatuses.find((r) => r.id === statusId);
    return s ? s.color : "#6B7280";
  };

  const handleAction = (action) => {
    toast({ title: action, description: "Action processed successfully." });
  };

  const pendingReports = OCS_REPORT.reports.filter((r) => ["submitted", "review", "returned"].includes(r.statusId));

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ ...GLASS, background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(34,211,238,0.1))" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${GOLD}, ${TEAL})` }}>
            <ClipboardList size={22} className="text-black" />
          </div>
          <div>
            <h3 className="text-sm font-bold" style={{ color: SOFT_WHITE }}>OCS Report Center</h3>
            <p className="text-[10px]" style={{ color: TEAL }}>Offline Coin Seller Report Management</p>
            <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>Review, approve & manage seller reports</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: "Total", value: OCS_REPORT.stats.total, color: GOLD },
          { label: "Approved", value: OCS_REPORT.stats.approved, color: "#10B981" },
          { label: "Pending", value: OCS_REPORT.stats.pending, color: "#F59E0B" },
          { label: "Drafts", value: OCS_REPORT.stats.drafts, color: "#6B7280" },
          { label: "Rejected", value: OCS_REPORT.stats.rejected, color: "#EF4444" },
          { label: "Completed", value: OCS_REPORT.stats.completed, color: TEAL },
        ].map((s, i) => (
          <div key={i} className="rounded-xl p-3 text-center" style={GLASS}>
            <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* SAM Center Actions */}
      <div className="rounded-2xl p-4" style={GLASS}>
        <h3 className="text-xs font-bold mb-3 flex items-center gap-1.5" style={{ color: SOFT_WHITE }}>
          <ClipboardList size={12} style={{ color: GOLD }} /> SAM Report Center Actions
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {OCS_REPORT.samCenter.map((s, i) => (
            <button
              key={i}
              onClick={() => handleAction(s.label)}
              className="rounded-xl p-3 flex flex-col items-center gap-1.5 active:scale-95 transition"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-xl">{s.icon}</span>
              <span className="text-[9px] font-semibold text-center leading-tight" style={{ color: "rgba(244,240,250,0.6)" }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pending Reports for SAM Review */}
      <div className="rounded-2xl p-4" style={GLASS}>
        <h3 className="text-xs font-bold mb-3 flex items-center gap-1.5" style={{ color: SOFT_WHITE }}>
          <Clock size={12} style={{ color: "#F59E0B" }} /> Reports Awaiting SAM Review
        </h3>
        <div className="space-y-2">
          {pendingReports.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedReport(r)}
              className="w-full rounded-xl p-3 text-left active:scale-[0.98] transition"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${getStatusColor(r.statusId)}20` }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <p className="text-xs font-bold" style={{ color: SOFT_WHITE }}>{r.id}</p>
                  <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>{r.type}</p>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${getStatusColor(r.statusId)}15`, color: getStatusColor(r.statusId) }}>
                  {r.status}
                </span>
              </div>
              <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.5)" }}>{r.description}</p>
              <div className="flex items-center justify-between text-[9px] mt-1.5" style={{ color: "rgba(244,240,250,0.3)" }}>
                <span>{r.sender} • {r.date}</span>
                <span>📎 {r.attachments}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Approval History */}
      <div className="rounded-2xl p-4" style={GLASS}>
        <h3 className="text-xs font-bold mb-3 flex items-center gap-1.5" style={{ color: SOFT_WHITE }}>
          <Clock size={12} style={{ color: GOLD }} /> Approval History (RPT-2847)
        </h3>
        <div className="space-y-2">
          {OCS_REPORT.approvalHistory.map((h, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ background: i === OCS_REPORT.approvalHistory.length - 1 ? "#10B981" : `${GOLD}30` }}>
                  {i === OCS_REPORT.approvalHistory.length - 1 ? <Check size={12} /> : i + 1}
                </div>
                {i < OCS_REPORT.approvalHistory.length - 1 && <div className="w-0.5 h-6" style={{ background: `${GOLD}30` }} />}
              </div>
              <div className="flex-1 pb-2">
                <p className="text-xs font-bold" style={{ color: SOFT_WHITE }}>{h.action}</p>
                <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>{h.by} ({h.role}) • {h.date} {h.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedReport(null)} />
          <div className="relative w-full max-w-md rounded-t-3xl max-h-[85vh] overflow-y-auto animate-fadeIn" style={{ background: "#131A2E", border: `1px solid ${getStatusColor(selectedReport.statusId)}30` }}>
            <div className="sticky top-0 pt-3 pb-2 z-10" style={{ background: "#131A2E" }}>
              <div className="w-10 h-1 rounded-full mx-auto mb-2" style={{ background: "rgba(255,255,255,0.2)" }} />
              <div className="flex items-center justify-between px-4">
                <h2 className="text-sm font-bold" style={{ color: GOLD }}>{selectedReport.id}</h2>
                <button onClick={() => setSelectedReport(null)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <X size={14} className="text-white/60" />
                </button>
              </div>
            </div>
            <div className="px-4 pb-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2.5 py-1 rounded-full font-bold" style={{ background: `${getStatusColor(selectedReport.statusId)}15`, color: getStatusColor(selectedReport.statusId) }}>
                  {selectedReport.status}
                </span>
                <span className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>{selectedReport.type}</span>
              </div>

              <div className="rounded-xl p-3 space-y-2" style={{ background: "rgba(255,255,255,0.03)" }}>
                <DetailRow label="Report ID" value={selectedReport.id} />
                <DetailRow label="Report Type" value={selectedReport.type} />
                <DetailRow label="Sender Name" value={selectedReport.sender} />
                <DetailRow label="Sender Role" value={selectedReport.role} />
                <DetailRow label="Receiver Name" value={selectedReport.receiver} />
                <DetailRow label="Receiver Role" value={selectedReport.receiverRole} />
                <DetailRow label="Date" value={selectedReport.date} />
                <DetailRow label="Time" value={selectedReport.time} />
                <DetailRow label="Country" value={selectedReport.country} />
                <DetailRow label="Department" value={selectedReport.department} />
              </div>

              <div className="rounded-xl p-3" style={{ background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.15)" }}>
                <p className="text-[10px] font-bold mb-1" style={{ color: "rgba(244,240,250,0.6)" }}>Description</p>
                <p className="text-[11px]" style={{ color: "rgba(244,240,250,0.7)" }}>{selectedReport.description}</p>
              </div>

              {selectedReport.comments && (
                <div className="rounded-xl p-3" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
                  <p className="text-[10px] font-bold mb-1" style={{ color: "rgba(244,240,250,0.6)" }}>Comments</p>
                  <p className="text-[11px]" style={{ color: "rgba(244,240,250,0.7)" }}>{selectedReport.comments}</p>
                </div>
              )}

              {/* SAM Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => { handleAction("Approve Report"); setSelectedReport(null); }} className="py-2.5 rounded-xl text-[10px] font-bold text-white active:scale-95 transition" style={{ background: "linear-gradient(135deg, #059669, #10B981)" }}>
                  ✅ Approve
                </button>
                <button onClick={() => { handleAction("Reject Report"); setSelectedReport(null); }} className="py-2.5 rounded-xl text-[10px] font-bold text-white active:scale-95 transition" style={{ background: "linear-gradient(135deg, #DC2626, #EF4444)" }}>
                  ❌ Reject
                </button>
                <button onClick={() => { handleAction("Request Correction"); setSelectedReport(null); }} className="py-2.5 rounded-xl text-[10px] font-bold text-white active:scale-95 transition" style={{ background: "linear-gradient(135deg, #D97706, #F59E0B)" }}>
                  ↩️ Return
                </button>
              </div>

              <div className="flex gap-2">
                <button onClick={() => handleAction("Download PDF")} className="flex-1 py-2.5 rounded-xl text-[11px] font-bold text-white active:scale-95 transition" style={{ background: "rgba(255,255,255,0.08)" }}>
                  📕 Download PDF
                </button>
                <button onClick={() => handleAction("Export Excel")} className="flex-1 py-2.5 rounded-xl text-[11px] font-bold text-black active:scale-95 transition" style={{ background: `linear-gradient(135deg, ${GOLD}, ${TEAL})` }}>
                  📊 Export Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>{label}</span>
      <span className="text-[11px] font-semibold" style={{ color: "rgba(244,240,250,0.8)" }}>{value}</span>
    </div>
  );
}