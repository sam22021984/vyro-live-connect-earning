import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle, ShieldCheck, Phone, Mail, UserCircle, FileText, Camera, ChevronRight, Inbox } from "lucide-react";
import { FINANCE_COLORS } from "@/components/finance/financeData";
import FinanceSubHeader from "@/components/finance/FinanceSubHeader";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

import { backendGateway } from "@/lib/backendGateway";
const STATUS_STYLE = {
  verified: { color: FINANCE_COLORS.success, label: "Verified" },
  in_progress: { color: FINANCE_COLORS.info, label: "In Progress" },
  pending: { color: FINANCE_COLORS.warning, label: "Pending" },
  failed: { color: FINANCE_COLORS.error, label: "Failed" },
  expired: { color: FINANCE_COLORS.textSecondary, label: "Expired" },
  revoked: { color: FINANCE_COLORS.error, label: "Revoked" },
};

// Verification types that are handled by the Face Verification flow
const FACE_TYPES = ["face", "identity", "age"];

export default function UserVerification() {
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
      const res = await backendGateway.readTable("verification_records", { filter: { user_id: user.id }, limit: 50, order: "created_date", ascending: false });
      setRecords(Array.isArray(res) ? res : []);
    } catch (e) {
      setError(e?.message || "Failed to load verification records.");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => { fetchRecords(); }, [fetchRecords]);

  const latestByType = React.useMemo(() => {
    const map = {};
    (records || []).forEach((r) => {
      if (!map[r.verification_type] || new Date(r.created_date) > new Date(map[r.verification_type].created_date)) {
        map[r.verification_type] = r;
      }
    });
    return map;
  }, [records]);

  const overallStatus = user?.verification_status || "unverified";

  const verificationItems = [
    { type: "phone", label: "Phone Verification", icon: Phone, actionable: false },
    { type: "email", label: "Email Verification", icon: Mail, actionable: false },
    { type: "face", label: "Selfie / Face Verification", icon: Camera, actionable: true },
    { type: "identity", label: "Identity Verification", icon: UserCircle, actionable: true },
    { type: "age", label: "Document / Age Verification", icon: FileText, actionable: true },
  ];

  const handleAction = (item) => {
    if (FACE_TYPES.includes(item.type)) navigate("/face-verification");
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: FINANCE_COLORS.bg }}>
      <FinanceSubHeader title="KYC & Verification" subtitle="Your verification records" />

      <div className="px-4 pt-4 space-y-4">
        {/* Overall status */}
        <div
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: FINANCE_COLORS.navyGradient, boxShadow: "0 4px 16px rgba(15,27,61,0.2)" }}
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${FINANCE_COLORS.gold}20`, border: `1px solid ${FINANCE_COLORS.gold}40` }}>
            <ShieldCheck size={20} style={{ color: FINANCE_COLORS.goldLight }} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-white/60">Verification Status</p>
            <p className="text-sm font-bold text-white capitalize">{overallStatus}</p>
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
            <p className="text-xs mt-3" style={{ color: FINANCE_COLORS.textSecondary }}>Loading verification records…</p>
          </div>
        ) : (records || []).length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <Inbox size={28} style={{ color: FINANCE_COLORS.textSecondary }} />
            <p className="text-sm font-bold mt-2" style={{ color: FINANCE_COLORS.textPrimary }}>No verification records</p>
            <p className="text-[11px] mt-1" style={{ color: FINANCE_COLORS.textSecondary }}>Start face verification to begin KYC.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {verificationItems.map((item) => {
              const rec = latestByType[item.type];
              const status = rec ? (STATUS_STYLE[rec.status] || STATUS_STYLE.pending) : { color: FINANCE_COLORS.textSecondary, label: "Not Started" };
              const Icon = item.icon;
              const clickable = item.actionable;
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => clickable && handleAction(item)}
                  disabled={!clickable}
                  className="w-full text-left rounded-2xl p-3.5 flex items-center gap-3 transition active:scale-[0.98] disabled:active:scale-100"
                  style={{ background: FINANCE_COLORS.card, border: `1px solid ${FINANCE_COLORS.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${status.color}10` }}>
                    <Icon size={18} style={{ color: status.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>{item.label}</p>
                    <p className="text-[9px]" style={{ color: FINANCE_COLORS.textSecondary }}>
                      {rec ? `Method: ${rec.method || "—"} · ${rec.verified_date ? new Date(rec.verified_date).toLocaleDateString() : "Pending"}` : "No record yet"}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: `${status.color}15`, color: status.color }}>
                    {status.label}
                  </span>
                  {clickable && <ChevronRight size={16} style={{ color: FINANCE_COLORS.textSecondary }} />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}