import React, { useState } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { SAM_WITHDRAWALS } from "@/components/sam-dashboard/samData";
import { useToast } from "@/components/ui/use-toast";

const statusColors = { pending: "#F59E0B", approved: "#10B981", rejected: "#EF4444" };

export default function WithdrawalModule() {
  const [withdrawals, setWithdrawals] = useState(SAM_WITHDRAWALS);
  const { toast } = useToast();
  const handleAction = (id, action) => {
    setWithdrawals((prev) => prev.map((w) => w.id === id ? { ...w, status: action, approvedBy: "SAM-001" } : w));
    toast({ title: `Withdrawal ${action}` });
  };
  return (
    <div className="space-y-3">
      {withdrawals.map((w) => (
        <div key={w.id} className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3 mb-2">
            <img src={w.avatar} alt={w.user} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <h4 className="text-xs font-bold" style={{ color: "#F4F0FA" }}>{w.user}</h4>
              <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>{w.method} · {w.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold" style={{ color: "#10B981" }}>{w.amount}</p>
              <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${statusColors[w.status]}20`, color: statusColors[w.status] }}>{w.status.toUpperCase()}</span>
            </div>
          </div>
          {w.status === "pending" ? (
            <div className="flex gap-1.5">
              <button onClick={() => handleAction(w.id, "approved")} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[9px] font-bold active:scale-90 transition" style={{ background: "#10B98115", color: "#10B981", border: "1px solid #10B98130" }}>
                <CheckCircle size={12} /> Approve
              </button>
              <button onClick={() => handleAction(w.id, "rejected")} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[9px] font-bold active:scale-90 transition" style={{ background: "#EF444415", color: "#EF4444", border: "1px solid #EF444430" }}>
                <XCircle size={12} /> Reject
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
              <Clock size={10} style={{ color: statusColors[w.status] }} />
              <span className="text-[9px]" style={{ color: "rgba(244,240,250,0.5)" }}>Processed by {w.approvedBy}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}