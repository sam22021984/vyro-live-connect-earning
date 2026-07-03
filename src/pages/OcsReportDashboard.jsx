import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Search, X, Check, ChevronRight, FileText,
  Upload, Send, Clock, Filter,
} from "lucide-react";
import { OCS_REPORT } from "@/components/seller-dashboard/ocsReportData";
import ReportToSection from "@/components/shared/ReportToSection";
import { useToast } from "@/components/ui/use-toast";

const DARK_BG = "#0A0E1A";
const CARD_BG = "#111827";
const GOLD = "#FFD700";
const TEAL = "#22D3EE";

export default function OcsReportDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeView, setActiveView] = useState("overview");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [reportForm, setReportForm] = useState({ type: "", description: "", notes: "" });

  const handleAction = (action) => {
    toast({ title: action, description: "Action processed successfully." });
  };

  const handleCreateReport = () => {
    if (!reportForm.type) {
      toast({ title: "Missing Info", description: "Please select a report type.", variant: "destructive" });
      return;
    }
    toast({ title: "Report Created ✅", description: `${reportForm.type} created as draft.` });
    setShowCreateModal(false);
    setReportForm({ type: "", description: "", notes: "" });
  };

  const getStatusColor = (statusId) => {
    const s = OCS_REPORT.reportStatuses.find((r) => r.id === statusId);
    return s ? s.color : "#6B7280";
  };

  const filteredReports = OCS_REPORT.reports.filter(
    (r) => r.id.toLowerCase().includes(searchQuery.toLowerCase()) || r.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterByStatus = (statusId) => {
    if (!statusId) return filteredReports;
    return filteredReports.filter((r) => r.statusId === statusId);
  };

  return (
    <div className="min-h-screen" style={{ background: DARK_BG }}>
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "rgba(10,14,26,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,215,0,0.15)" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,215,0,0.1)" }}>
            <ArrowLeft size={18} style={{ color: GOLD }} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold" style={{ color: GOLD }}>OCS Report Center</h1>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>Offline Coin Seller Reporting System</p>
          </div>
          <FileText size={18} style={{ color: GOLD }} />
        </div>

        {/* Tabs */}
        <div className="sticky top-[57px] z-20 px-2 py-2 overflow-x-auto scrollbar-hide" style={{ background: "rgba(10,14,26,0.85)", backdropFilter: "blur(20px)" }}>
          <div className="flex gap-1.5">
            {[
              { id: "overview", label: "Overview", icon: "📊" },
              { id: "reports", label: "Reports", icon: "📋" },
              { id: "actions", label: "Actions", icon: "⚡" },
              { id: "sam", label: "SAM Center", icon: "🛡️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-[11px] font-bold transition flex items-center gap-1.5 ${activeView === tab.id ? "text-black" : "text-white/60"}`}
                style={{
                  background: activeView === tab.id ? `linear-gradient(135deg, ${GOLD}, ${TEAL})` : "rgba(255,255,255,0.05)",
                  boxShadow: activeView === tab.id ? `0 4px 12px ${GOLD}40` : "none",
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pt-4">
          {/* OVERVIEW */}
          {activeView === "overview" && (
            <div className="space-y-4 animate-fadeIn">
              {/* Position Card */}
              <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.12), rgba(34,211,238,0.08))", border: "1px solid rgba(255,215,0,0.2)" }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🪙</span>
                    <div>
                      <h3 className="text-sm font-bold text-white">{OCS_REPORT.sellerInfo.title}</h3>
                      <p className="text-[10px]" style={{ color: TEAL }}>Position: {OCS_REPORT.sellerInfo.position}</p>
                    </div>
                  </div>
                  <div className="rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <p className="text-[9px] text-white/40">REPORTS TO</p>
                    <p className="text-xs font-bold" style={{ color: GOLD }}>{OCS_REPORT.sellerInfo.reportsTo}</p>
                  </div>
                </div>
              </div>

              {/* Report To Section */}
              <ReportToSection roleKey="seller" theme="dark" />

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
                  <div key={i} className="rounded-xl p-3 text-center" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-[9px] text-white/40">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Send Report Button */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full py-3.5 rounded-2xl text-sm font-bold text-black active:scale-[0.98] transition flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${TEAL})`, boxShadow: `0 8px 24px ${GOLD}30` }}
              >
                <Send size={18} /> Send Report
              </button>

              {/* Responsibilities */}
              <div className="rounded-2xl p-4" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 className="text-xs font-bold text-white mb-3">📋 Primary Responsibilities</h3>
                <div className="space-y-2">
                  {OCS_REPORT.responsibilities.map((r, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${TEAL}15` }}>
                        <Check size={10} style={{ color: TEAL }} />
                      </div>
                      <span className="text-[11px] text-white/60 leading-relaxed">{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authority */}
              <div className="rounded-2xl p-4" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 className="text-xs font-bold text-white mb-3">🔐 Authority</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-green-400 mb-2">✅ May:</p>
                    <div className="space-y-1.5">
                      {OCS_REPORT.authority.may.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check size={10} className="text-green-400 flex-shrink-0" />
                          <span className="text-[11px] text-white/60">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <p className="text-[10px] font-bold text-red-400 mb-2">❌ Cannot:</p>
                    <div className="space-y-1.5">
                      {OCS_REPORT.authority.mayNot.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <X size={10} className="text-red-400 flex-shrink-0" />
                          <span className="text-[11px] text-white/60">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REPORTS */}
          {activeView === "reports" && (
            <div className="space-y-4 animate-fadeIn">
              {/* Search */}
              <div className="rounded-2xl p-2 flex items-center gap-2" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}>
                <Search size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reports by ID or type..."
                  className="flex-1 bg-transparent text-xs text-white placeholder-white/30 outline-none"
                />
              </div>

              {/* Status Filter Pills */}
              <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
                <button onClick={() => setActiveView("reports")} className="flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold text-white" style={{ background: `${GOLD}15`, color: GOLD }}>
                  All ({filteredReports.length})
                </button>
                {OCS_REPORT.reportStatuses.map((s) => {
                  const count = filterByStatus(s.id).length;
                  return (
                    <button key={s.id} className="flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold transition" style={{ background: `${s.color}10`, color: s.color, border: `1px solid ${s.color}20` }}>
                      {s.name} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Report List */}
              <div className="space-y-2">
                {filteredReports.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedReport(r)}
                    className="w-full rounded-xl p-3 text-left active:scale-[0.98] transition"
                    style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${getStatusColor(r.statusId)}15` }}>
                          <FileText size={14} style={{ color: getStatusColor(r.statusId) }} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{r.id}</p>
                          <p className="text-[9px] text-white/40">{r.type}</p>
                        </div>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${getStatusColor(r.statusId)}15`, color: getStatusColor(r.statusId) }}>
                        {r.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/50 mb-1.5">{r.description}</p>
                    <div className="flex items-center justify-between text-[9px] text-white/30">
                      <span>{r.date} • {r.time}</span>
                      <span>📎 {r.attachments} attachments</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ACTIONS */}
          {activeView === "actions" && (
            <div className="space-y-4 animate-fadeIn">
              {/* Report Submission Actions */}
              <div className="rounded-2xl p-4" style={{ background: CARD_BG, border: "1px solid rgba(255,215,0,0.15)" }}>
                <h3 className="text-xs font-bold text-white mb-3 flex items-center gap-1.5">
                  <Send size={12} style={{ color: GOLD }} /> Report Submission Actions
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {OCS_REPORT.actions.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => a.id === "create" ? setShowCreateModal(true) : handleAction(a.label)}
                      className="rounded-xl p-3 flex flex-col items-center gap-1.5 active:scale-95 transition"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <span className="text-xl">{a.icon}</span>
                      <span className="text-[9px] font-semibold text-white/60 text-center leading-tight">{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dashboard Action Buttons */}
              <div className="rounded-2xl p-4" style={{ background: CARD_BG, border: "1px solid rgba(34,211,238,0.15)" }}>
                <h3 className="text-xs font-bold text-white mb-3 flex items-center gap-1.5">
                  <ChevronRight size={12} style={{ color: TEAL }} /> Dashboard Actions
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {OCS_REPORT.dashboardButtons.map((b) => (
                    <button
                      key={b.path}
                      onClick={() => handleAction(b.label)}
                      className="rounded-xl p-3 flex flex-col items-center gap-1.5 active:scale-95 transition"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <span className="text-xl">{b.icon}</span>
                      <span className="text-[9px] font-semibold text-white/60 text-center leading-tight">{b.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Report Types */}
              <div className="rounded-2xl p-4" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 className="text-xs font-bold text-white mb-3">📋 Report Types</h3>
                <div className="space-y-2">
                  {OCS_REPORT.reportTypes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setReportForm({ ...reportForm, type: t.name }); setShowCreateModal(true); }}
                      className="w-full rounded-xl p-2.5 flex items-center gap-2.5 active:scale-[0.98] transition"
                      style={{ background: `${t.color}08`, border: `1px solid ${t.color}15` }}
                    >
                      <span className="text-lg">{t.icon}</span>
                      <span className="text-[11px] font-semibold text-white/70 flex-1 text-left">{t.name}</span>
                      <ChevronRight size={14} style={{ color: t.color }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Report Statuses */}
              <div className="rounded-2xl p-4" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 className="text-xs font-bold text-white mb-3">🔄 Report Statuses</h3>
                <div className="flex flex-wrap gap-2">
                  {OCS_REPORT.reportStatuses.map((s) => (
                    <span key={s.id} className="text-[10px] px-2.5 py-1 rounded-full font-medium" style={{ background: `${s.color}10`, color: s.color, border: `1px solid ${s.color}20` }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SAM CENTER */}
          {activeView === "sam" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="rounded-2xl p-4 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.12), rgba(34,211,238,0.08))", border: "1px solid rgba(255,215,0,0.2)" }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
                <div className="relative">
                  <div className="text-3xl mb-1">🛡️</div>
                  <h3 className="text-sm font-bold text-white">Super Admin Manager</h3>
                  <p className="text-[10px]" style={{ color: TEAL }}>Report Center</p>
                  <p className="text-[9px] text-white/40 mt-1">SAM Dashboard Additional Features</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {OCS_REPORT.samCenter.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleAction(s.label)}
                    className="rounded-xl p-3 flex flex-col items-center gap-2 active:scale-95 transition"
                    style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span className="text-2xl">{s.icon}</span>
                    <span className="text-[10px] font-semibold text-white/60 text-center leading-tight">{s.label}</span>
                  </button>
                ))}
              </div>

              {/* Approval History */}
              <div className="rounded-2xl p-4" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 className="text-xs font-bold text-white mb-3 flex items-center gap-1.5">
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
                        <p className="text-xs font-bold text-white">{h.action}</p>
                        <p className="text-[9px] text-white/40">{h.by} ({h.role}) • {h.date} {h.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
          <div className="relative w-full max-w-md rounded-t-3xl max-h-[85vh] overflow-y-auto animate-fadeIn" style={{ background: CARD_BG, border: "1px solid rgba(255,215,0,0.2)" }}>
            <div className="sticky top-0 pt-3 pb-2 z-10" style={{ background: CARD_BG }}>
              <div className="w-10 h-1 rounded-full mx-auto mb-2" style={{ background: "rgba(255,255,255,0.2)" }} />
              <div className="flex items-center justify-between px-4">
                <h2 className="text-sm font-bold" style={{ color: GOLD }}>Create Report</h2>
                <button onClick={() => setShowCreateModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <X size={14} className="text-white/60" />
                </button>
              </div>
            </div>
            <div className="px-4 pb-6 space-y-3">
              {/* Report Type */}
              <div>
                <label className="text-[10px] font-bold text-white/60 mb-1 block">Report Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {OCS_REPORT.reportTypes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setReportForm({ ...reportForm, type: t.name })}
                      className={`rounded-xl p-2.5 flex items-center gap-2 transition ${reportForm.type === t.name ? "text-black" : "text-white/60"}`}
                      style={{
                        background: reportForm.type === t.name ? `linear-gradient(135deg, ${t.color}, ${t.color}cc)` : `${t.color}08`,
                        border: reportForm.type === t.name ? "none" : `1px solid ${t.color}15`,
                      }}
                    >
                      <span className="text-sm">{t.icon}</span>
                      <span className="text-[9px] font-bold text-left leading-tight">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-[10px] font-bold text-white/60 mb-1 block">Description</label>
                <textarea
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                  placeholder="Enter report description..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl text-xs text-white placeholder-white/30 outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,215,0,0.15)" }}
                />
              </div>

              {/* Notes */}
              <div>
                <label className="text-[10px] font-bold text-white/60 mb-1 block">Notes</label>
                <textarea
                  value={reportForm.notes}
                  onChange={(e) => setReportForm({ ...reportForm, notes: e.target.value })}
                  placeholder="Add notes..."
                  rows={2}
                  className="w-full px-3 py-2.5 rounded-xl text-xs text-white placeholder-white/30 outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(34,211,238,0.15)" }}
                />
              </div>

              {/* Upload buttons */}
              <div>
                <label className="text-[10px] font-bold text-white/60 mb-1 block">Attachments</label>
                <div className="flex flex-wrap gap-2">
                  {OCS_REPORT.actions.filter((a) => a.id !== "create" && a.id !== "save" && a.id !== "submit" && a.id !== "edit" && a.id !== "notes" && a.id !== "submitFinal").map((a) => (
                    <button
                      key={a.id}
                      onClick={() => handleAction(a.label)}
                      className="text-[10px] px-2.5 py-1.5 rounded-lg font-semibold text-white/60 active:scale-95 transition flex items-center gap-1"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <Upload size={10} /> {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => handleAction("Save Draft")}
                  className="flex-1 py-3 rounded-2xl text-sm font-bold text-white active:scale-[0.98] transition"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  Save Draft
                </button>
                <button
                  onClick={handleCreateReport}
                  className="flex-1 py-3 rounded-2xl text-sm font-bold text-black active:scale-[0.98] transition flex items-center justify-center gap-2"
                  style={{ background: `linear-gradient(135deg, ${GOLD}, ${TEAL})`, boxShadow: `0 6px 20px ${GOLD}30` }}
                >
                  <Send size={14} /> Submit
                </button>
              </div>
              <p className="text-[9px] text-white/30 text-center">Report will be sent to: Super Admin Manager (SAM) Only</p>
            </div>
          </div>
        </div>
      )}

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedReport(null)} />
          <div className="relative w-full max-w-md rounded-t-3xl max-h-[85vh] overflow-y-auto animate-fadeIn" style={{ background: CARD_BG, border: `1px solid ${getStatusColor(selectedReport.statusId)}30` }}>
            <div className="sticky top-0 pt-3 pb-2 z-10" style={{ background: CARD_BG }}>
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
                <span className="text-[10px] text-white/40">{selectedReport.type}</span>
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
                <p className="text-[10px] font-bold text-white/60 mb-1">Description</p>
                <p className="text-[11px] text-white/70">{selectedReport.description}</p>
              </div>

              {selectedReport.comments && (
                <div className="rounded-xl p-3" style={{ background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.15)" }}>
                  <p className="text-[10px] font-bold text-white/60 mb-1">Comments</p>
                  <p className="text-[11px] text-white/70">{selectedReport.comments}</p>
                </div>
              )}

              <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                <p className="text-[10px] font-bold text-white/60 mb-1">Attachments</p>
                <p className="text-[11px] text-white/70">📎 {selectedReport.attachments} file(s) attached</p>
              </div>

              <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                <p className="text-[10px] font-bold text-white/60 mb-2">Approval History</p>
                <div className="space-y-1.5">
                  {OCS_REPORT.approvalHistory.filter((h) => h.reportId === selectedReport.id).map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${getStatusColor(selectedReport.statusId)}20` }}>
                        <Check size={10} style={{ color: getStatusColor(selectedReport.statusId) }} />
                      </div>
                      <span className="text-[10px] text-white/60">{h.action} by {h.by} ({h.role}) — {h.date} {h.time}</span>
                    </div>
                  ))}
                  {OCS_REPORT.approvalHistory.filter((h) => h.reportId === selectedReport.id).length === 0 && (
                    <p className="text-[10px] text-white/40">No approval history for this report.</p>
                  )}
                </div>
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
      <span className="text-[10px] text-white/40">{label}</span>
      <span className="text-[11px] font-semibold text-white/80">{value}</span>
    </div>
  );
}