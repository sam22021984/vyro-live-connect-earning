import React, { useState } from "react";
import { CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import { SAM_RECHARGES } from "@/components/sam-dashboard/samData";
import { useToast } from "@/components/ui/use-toast";

const statusColors = { pending: "#F59E0B", approved: "#10B981", rejected: "#EF4444" };

export default function OfflineRechargeModule() {
  const [recharges, setRecharges] = useState(SAM_RECHARGES);
  const { toast } = useToast();

  const handleAction = (id, action) => {
    setRecharges((prev) => prev.map((r) => r.id === id ? { ...r, status: action, approvedBy: "SAM-001", notes: action === "approved" ? "Approved by SAM" : "Rejected by SAM" } : r));
    toast({ title: `Recharge ${action}` });
  };

  return (
    <div className="space-y-3">
      {recharges.map((r) => (
        <div key={r.id} className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-xs font-bold" style={{ color: "#F4F0FA" }}>{r.seller}</h4>
              <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>→ {r.customer} · {r.date}</p>
            </div>
            <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${statusColors[r.status]}20`, color: statusColors[r.status] }}>{r.status.toUpperCase()}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="text-center p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p className="text-[10px] font-bold" style={{ color: "#D4AF37" }}>{r.coins.toLocaleString()}</p>
              <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Coins</p>
            </div>
            <div className="text-center p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p className="text-[10px] font-bold" style={{ color: "#10B981" }}>+{r.bonus.toLocaleString()}</p>
              <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Bonus</p>
            </div>
            <div className="text-center p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p className="text-[10px] font-bold" style={{ color: "#3B82F6" }}>{r.amount}</p>
              <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Amount</p>
            </div>
          </div>
          {r.status === "pending" ? (
            <div className="flex gap-1.5">
              <button onClick={() => handleAction(r.id, "approved")} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[9px] font-bold active:scale-90 transition" style={{ background: "#10B98115", color: "#10B981", border: "1px solid #10B98130" }}>
                <CheckCircle size={12} /> Approve
              </button>
              <button onClick={() => handleAction(r.id, "rejected")} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[9px] font-bold active:scale-90 transition" style={{ background: "#EF444415", color: "#EF4444", border: "1px solid #EF444430" }}>
                <XCircle size={12} /> Reject
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
              <Clock size={10} style={{ color: statusColors[r.status] }} />
              <span className="text-[9px]" style={{ color: "rgba(244,240,250,0.5)" }}>Approved by {r.approvedBy} · {r.notes}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}