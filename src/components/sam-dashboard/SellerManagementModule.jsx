import React from "react";
import { CheckCircle, XCircle, Star, Wallet, TrendingUp, ShieldCheck, FileText } from "lucide-react";
import { SAM_SELLERS } from "@/components/sam-dashboard/samData";
import { useToast } from "@/components/ui/use-toast";

const statusColors = { active: "#10B981", pending: "#F59E0B", rejected: "#EF4444" };

export default function SellerManagementModule() {
  const { toast } = useToast();
  return (
    <div className="space-y-3">
      {SAM_SELLERS.map((s) => (
        <div key={s.id} className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3 mb-2">
            <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold truncate" style={{ color: "#F4F0FA" }}>{s.name}</h4>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${statusColors[s.status]}20`, color: statusColors[s.status] }}>{s.status.toUpperCase()}</span>
              </div>
              <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>{s.id}</p>
            </div>
          </div>
          {s.status === "active" && (
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="text-center p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                <Wallet size={12} className="mx-auto mb-0.5" style={{ color: "#D4AF37" }} />
                <p className="text-[10px] font-bold" style={{ color: "#F4F0FA" }}>{(s.wallet / 1000).toFixed(0)}K</p>
                <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Wallet</p>
              </div>
              <div className="text-center p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                <TrendingUp size={12} className="mx-auto mb-0.5" style={{ color: "#10B981" }} />
                <p className="text-[10px] font-bold" style={{ color: "#F4F0FA" }}>${(s.revenue / 1000).toFixed(0)}K</p>
                <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Revenue</p>
              </div>
              <div className="text-center p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                <Star size={12} className="mx-auto mb-0.5" style={{ color: "#F59E0B" }} />
                <p className="text-[10px] font-bold" style={{ color: "#F4F0FA" }}>{s.performance}%</p>
                <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Perf</p>
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-1.5">
            {s.status === "pending" ? (
              <>
                <button onClick={() => toast({ title: s.name + " approved as seller" })} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-bold active:scale-90 transition" style={{ background: "#10B98115", color: "#10B981", border: "1px solid #10B98130" }}>
                  <CheckCircle size={10} /> Approve Seller
                </button>
                <button onClick={() => toast({ title: s.name + " rejected" })} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-bold active:scale-90 transition" style={{ background: "#EF444415", color: "#EF4444", border: "1px solid #EF444430" }}>
                  <XCircle size={10} /> Reject Seller
                </button>
                <button onClick={() => toast({ title: "Add review notes" })} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#3B82F615", color: "#3B82F6", border: "1px solid #3B82F630" }}>
                  <FileText size={10} /> Review Notes
                </button>
              </>
            ) : (
              <>
                <button onClick={() => toast({ title: "Viewing seller wallet" })} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#D4AF3715", color: "#D4AF37", border: "1px solid #D4AF3730" }}>
                  <Wallet size={10} /> Wallet
                </button>
                <button onClick={() => toast({ title: "Viewing performance" })} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#10B98115", color: "#10B981", border: "1px solid #10B98130" }}>
                  <TrendingUp size={10} /> Performance
                </button>
                <button onClick={() => toast({ title: "Viewing security logs" })} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#DC262615", color: "#DC2626", border: "1px solid #DC262630" }}>
                  <ShieldCheck size={10} /> Security Logs
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}