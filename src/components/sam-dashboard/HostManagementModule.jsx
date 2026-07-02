import React from "react";
import { CheckCircle, XCircle, Radio, Eye, Gift, DollarSign } from "lucide-react";
import { SAM_HOSTS } from "@/components/sam-dashboard/samData";
import { useToast } from "@/components/ui/use-toast";

const statusColors = { live: "#EF4444", offline: "#6B7280" };

export default function HostManagementModule() {
  const { toast } = useToast();
  return (
    <div className="space-y-3">
      {SAM_HOSTS.map((h) => (
        <div key={h.id} className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <img src={h.avatar} alt={h.name} className="w-10 h-10 rounded-full object-cover" />
              {h.status === "live" && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full" style={{ background: "#EF4444", border: "2px solid #0A0F1E" }} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold truncate" style={{ color: "#F4F0FA" }}>{h.name}</h4>
                {h.verified && <CheckCircle size={10} style={{ color: "#3B82F6" }} />}
              </div>
              <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>{h.room}</p>
              <span className="inline-block text-[8px] px-1.5 py-0.5 rounded-full font-bold mt-0.5" style={{ background: `${statusColors[h.status]}20`, color: statusColors[h.status] }}>
                {h.status === "live" && <Radio size={8} className="inline mr-0.5 animate-pulse" />}{h.status.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="text-center p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
              <Gift size={12} className="mx-auto mb-0.5" style={{ color: "#D4AF37" }} />
              <p className="text-[10px] font-bold" style={{ color: "#F4F0FA" }}>{h.gifts.toLocaleString()}</p>
              <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Gifts Received</p>
            </div>
            <div className="text-center p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
              <DollarSign size={12} className="mx-auto mb-0.5" style={{ color: "#10B981" }} />
              <p className="text-[10px] font-bold" style={{ color: "#F4F0FA" }}>{h.earnings}</p>
              <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Earnings</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => toast({ title: "Viewing " + h.name + " details" })} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#3B82F615", color: "#3B82F6", border: "1px solid #3B82F630" }}>
              <Eye size={10} /> View
            </button>
            {!h.verified && <button onClick={() => toast({ title: "Verification approved" })} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#10B98115", color: "#10B981", border: "1px solid #10B98130" }}>
              <CheckCircle size={10} /> Verify
            </button>}
            <button onClick={() => toast({ title: "Host restricted" })} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#EF444415", color: "#EF4444", border: "1px solid #EF444430" }}>
              <XCircle size={10} /> Restrict
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}