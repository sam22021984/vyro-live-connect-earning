import React from "react";
import { Wallet, Store, Building2, Briefcase, Mic, Circle } from "lucide-react";
import { SAM_WALLETS } from "@/components/sam-dashboard/samData";
import { useToast } from "@/components/ui/use-toast";

const ICON_MAP = { Wallet, Store, Building2, Briefcase, Mic };

export default function WalletControlModule() {
  const { toast } = useToast();
  return (
    <div className="space-y-3">
      {SAM_WALLETS.map((w, i) => {
        const Icon = ICON_MAP[w.icon] || Circle;
        return (
          <div key={i} className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${w.color}20` }}>
                <Icon size={18} style={{ color: w.color }} />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold" style={{ color: "#F4F0FA" }}>{w.type}</h4>
                <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>{w.count} wallets</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: w.color }}>{w.balance}</p>
                <p className="text-[8px]" style={{ color: "rgba(244,240,250,0.4)" }}>Total Balance</p>
              </div>
            </div>
            {w.suspicious > 0 && (
              <div className="rounded-lg p-2 mb-2" style={{ background: "#EF444415", border: "1px solid #EF444430" }}>
                <span className="text-[9px] font-bold" style={{ color: "#EF4444" }}>⚠️ {w.suspicious} suspicious activity detected</span>
              </div>
            )}
            <div className="flex gap-1.5">
              <button onClick={() => toast({ title: "Viewing " + w.type + " balance" })} className="flex-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: `${w.color}15`, color: w.color, border: `1px solid ${w.color}30` }}>Balance</button>
              <button onClick={() => toast({ title: "Viewing transactions" })} className="flex-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "rgba(255,255,255,0.05)", color: "#F4F0FA", border: "1px solid rgba(255,255,255,0.08)" }}>Transactions</button>
              <button onClick={() => toast({ title: "Viewing wallet logs" })} className="flex-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "rgba(255,255,255,0.05)", color: "#F4F0FA", border: "1px solid rgba(255,255,255,0.08)" }}>Logs</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}