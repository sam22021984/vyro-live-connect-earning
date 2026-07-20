import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle, ShieldAlert, Inbox, ChevronRight, LifeBuoy } from "lucide-react";
import { FINANCE_COLORS } from "@/components/finance/financeData";
import FinanceSubHeader from "@/components/finance/FinanceSubHeader";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

import { backendGateway } from "@/lib/backendGateway";
const SEVERITY_STYLE = {
  low: { color: FINANCE_COLORS.info, label: "Low" },
  medium: { color: FINANCE_COLORS.warning, label: "Medium" },
  high: { color: FINANCE_COLORS.error, label: "High" },
  critical: { color: FINANCE_COLORS.error, label: "Critical" },
};

const STATUS_STYLE = {
  active: { color: FINANCE_COLORS.error, label: "Active" },
  expired: { color: FINANCE_COLORS.textSecondary, label: "Expired" },
  lifted: { color: FINANCE_COLORS.success, label: "Lifted" },
  escalated: { color: FINANCE_COLORS.warning, label: "Escalated" },
  appealed: { color: FINANCE_COLORS.info, label: "Appealed" },
};

export default function UserWarnings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecords = useCallback(async () => {
    if (!user?.id) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await backendGateway.readTable("enforcement_actions", { filter: { user_id: user.id }, limit: 50, order: "created_date", ascending: false });
      setRecords(Array.isArray(res) ? res : []);
    } catch (e) {
      setError(e?.message || "Failed to load warning history.");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => { fetchRecords(); }, [fetchRecords]);

  const hasActive = (records || []).some((r) => r.status === "active");
  const accountStatus = hasActive ? "Restricted" : "Good Standing";
  const accountColor = hasActive ? FINANCE_COLORS.error : FINANCE_COLORS.success;

  return (
    <div className="min-h-screen pb-24" style={{ background: FINANCE_COLORS.bg }}>
      <FinanceSubHeader title="Warnings & Account Status" subtitle="Your warning history" />

      <div className="px-4 pt-4 space-y-4">
        {/* Account status */}
        <div
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: FINANCE_COLORS.navyGradient, boxShadow: "0 4px 16px rgba(15,27,61,0.2)" }}
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${accountColor}20`, border: `1px solid ${accountColor}40` }}>
            <ShieldAlert size={20} style={{ color: accountColor }} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-white/60">Account Status</p>
            <p className="text-sm font-bold" style={{ color: accountColor }}>{accountStatus}</p>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl p-3 flex items-start gap-2" style={{ background: `${FINANCE_COLORS.error}10`, border: `1px solid ${FINANCE_COLORS.error}30` }}>
            <AlertCircle size={16} style={{ color: FINANCE_COLORS.error }} className="mt-0.5 flex-shrink-0" />
            <p className="text-xs font-medium" style={{ color: FINANCE_COLORS.error }}>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center py-16">
            <Loader2 className="w-7 h-7 animate-spin" style={{ color: FINANCE_COLORS.royalBlue }} />
            <p className="text-xs mt-3" style={{ color: FINANCE_COLORS.textSecondary }}>Loading warning history…</p>
          </div>
        ) : (records || []).length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <Inbox size={28} style={{ color: FINANCE_COLORS.success }} />
            <p className="text-sm font-bold mt-2" style={{ color: FINANCE_COLORS.textPrimary }}>No warnings</p>
            <p className="text-[11px] mt-1" style={{ color: FINANCE_COLORS.textSecondary }}>Your account is in good standing.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {(records || []).map((r) => {
              const sev = SEVERITY_STYLE[r.severity] || SEVERITY_STYLE.low;
              const st = STATUS_STYLE[r.status] || STATUS_STYLE.expired;
              return (
                <div
                  key={r.id}
                  className="rounded-2xl p-3.5"
                  style={{ background: FINANCE_COLORS.card, border: `1px solid ${FINANCE_COLORS.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold capitalize" style={{ color: FINANCE_COLORS.textPrimary }}>
                      {r.action_type?.replace(/_/g, " ") || "Action"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: `${st.color}15`, color: st.color }}>
                      {st.label}
                    </span>
                  </div>
                  <p className="text-[11px] mb-2" style={{ color: FINANCE_COLORS.textSecondary }}>{r.reason || "No reason provided."}</p>
                  <div className="flex items-center justify-between text-[9px]" style={{ color: FINANCE_COLORS.textSecondary }}>
                    <span>Severity: <span style={{ color: sev.color, fontWeight: 700 }}>{sev.label}</span></span>
                    <span>{r.start_date ? new Date(r.start_date).toLocaleDateString() : ""}</span>
                  </div>
                  {r.appeal_status && r.appeal_status !== "none" && (
                    <div className="mt-2 text-[9px]" style={{ color: FINANCE_COLORS.info }}>
                      Appeal: {r.appeal_status}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Support & appeal */}
        <button
          type="button"
          onClick={() => navigate("/support-center")}
          className="w-full text-left rounded-2xl p-3.5 flex items-center gap-3 transition active:scale-[0.98]"
          style={{ background: FINANCE_COLORS.card, border: `1px solid ${FINANCE_COLORS.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${FINANCE_COLORS.royalBlue}10` }}>
            <LifeBuoy size={18} style={{ color: FINANCE_COLORS.royalBlue }} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>Support & Appeal</p>
            <p className="text-[9px]" style={{ color: FINANCE_COLORS.textSecondary }}>Open a ticket to appeal a warning</p>
          </div>
          <ChevronRight size={16} style={{ color: FINANCE_COLORS.textSecondary }} />
        </button>
      </div>
    </div>
  );
}