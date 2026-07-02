import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { X, Download, Filter } from "lucide-react";
import { historyTypes, historyFilters, historyRecords, COLORS } from "./profileStatsData";

const statusColors = {
  Success: COLORS.success, Completed: COLORS.success, Sent: COLORS.primary, Received: COLORS.success,
  Claimed: COLORS.success, Victory: COLORS.success, "Processing": COLORS.gold, Ended: COLORS.muted,
  Failed: COLORS.danger, Blocked: COLORS.danger, Defeat: COLORS.danger,
};

export default function HistoryTab() {
  const [type, setType] = useState("login");
  const [filter, setFilter] = useState("today");
  const [detail, setDetail] = useState(null);
  const { toast } = useToast();

  const handleExport = () => {
    toast({ title: "📄 Report Exported!", description: `${historyTypes.find(t => t.key === type)?.label} history PDF generated.` });
  };

  return (
    <div>
      {/* History type tabs */}
      <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
        {historyTypes.map((t) => (
          <button key={t.key} onClick={() => setType(t.key)}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap active:scale-95 transition flex items-center gap-1.5 ${type === t.key ? "text-white" : ""}`}
            style={type === t.key ? { background: COLORS.primary } : { background: COLORS.cardBg, color: COLORS.muted, border: "1px solid #EEF0F4" }}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      {/* Filter + Export */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide flex-1">
          {historyFilters.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`py-1.5 px-3 rounded-lg text-[10px] font-bold whitespace-nowrap active:scale-95 transition ${filter === f.key ? "text-white" : ""}`}
              style={filter === f.key ? { background: COLORS.navy } : { background: COLORS.cardBg, color: COLORS.muted }}>
              {f.label}
            </button>
          ))}
        </div>
        <button onClick={handleExport} className="flex items-center gap-1 py-1.5 px-3 rounded-lg text-[10px] font-bold text-white active:scale-95 transition flex-shrink-0" style={{ background: COLORS.gold }}>
          <Download size={11} /> Export
        </button>
      </div>

      {/* Records */}
      <div className="space-y-2.5">
        {historyRecords[type].map((r) => (
          <button key={r.id} onClick={() => setDetail(r)} className="w-full text-left rounded-2xl p-3 flex items-center gap-3 active:scale-[0.98] transition"
            style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: COLORS.white }}>{r.icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold truncate" style={{ color: COLORS.navy }}>{r.activity}</h4>
              <p className="text-[9px]" style={{ color: COLORS.muted }}>{r.date}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-bold" style={{ color: COLORS.navy }}>{r.amount}</p>
              <span className="text-[9px] font-bold" style={{ color: statusColors[r.status] || COLORS.muted }}>{r.status}</span>
            </div>
          </button>
        ))}
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetail(null)} />
          <div className="relative w-full max-w-md bg-white rounded-t-3xl animate-fadeIn">
            <div className="sticky top-0 bg-white pt-3 pb-2 z-10">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
              <div className="flex items-center justify-between px-4">
                <h2 className="text-sm font-bold" style={{ color: COLORS.navy }}>Record Details</h2>
                <button onClick={() => setDetail(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="px-4 pb-6">
              <div className="flex flex-col items-center py-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3" style={{ background: COLORS.cardBg }}>{detail.icon}</div>
                <h3 className="text-sm font-bold text-center" style={{ color: COLORS.navy }}>{detail.activity}</h3>
              </div>
              <div className="rounded-2xl p-3 space-y-2.5" style={{ background: COLORS.cardBg }}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px]" style={{ color: COLORS.muted }}>Date</span>
                  <span className="text-[11px] font-bold" style={{ color: COLORS.navy }}>{detail.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px]" style={{ color: COLORS.muted }}>Amount</span>
                  <span className="text-[11px] font-bold" style={{ color: COLORS.navy }}>{detail.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px]" style={{ color: COLORS.muted }}>Status</span>
                  <span className="text-[11px] font-bold" style={{ color: statusColors[detail.status] || COLORS.muted }}>{detail.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}