import React from "react";
import { Coins, TrendingUp, Store, Activity, CheckCircle, FileText } from "lucide-react";
import { SAM_COIN_DATA } from "@/components/sam-dashboard/samData";
import { useToast } from "@/components/ui/use-toast";

export default function CoinManagementModule() {
  const { toast } = useToast();
  const stats = [
    { label: "Price Per Coin", value: SAM_COIN_DATA.price_per_coin, icon: Coins, color: "#D4AF37" },
    { label: "Total Supply", value: SAM_COIN_DATA.total_supply, icon: TrendingUp, color: "#3B82F6" },
    { label: "In Circulation", value: SAM_COIN_DATA.circulation, icon: Activity, color: "#10B981" },
    { label: "Transactions Today", value: SAM_COIN_DATA.transactions_today.toLocaleString(), icon: Activity, color: "#8B5CF6" },
    { label: "Active Sellers", value: SAM_COIN_DATA.active_sellers, icon: Store, color: "#06B6D4" },
    { label: "Recharge Activity", value: SAM_COIN_DATA.recharge_activity, icon: TrendingUp, color: "#EC4899" },
  ];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {stats.map((s, i) => (
          <div key={i} className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: `${s.color}20` }}>
              <s.icon size={14} style={{ color: s.color }} />
            </div>
            <p className="text-sm font-bold" style={{ color: "#F4F0FA" }}>{s.value}</p>
            <p className="text-[8px]" style={{ color: "rgba(244,240,250,0.4)" }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <h4 className="text-xs font-bold px-1" style={{ color: "#F4F0FA" }}>Controls</h4>
        <button onClick={() => toast({ title: "Coin operations approved" })} className="w-full flex items-center gap-2 p-3 rounded-xl text-xs font-bold active:scale-95 transition" style={{ background: "#10B98115", color: "#10B981", border: "1px solid #10B98130" }}>
          <CheckCircle size={14} /> Approve Coin Operations
        </button>
        <button onClick={() => toast({ title: "Viewing coin logs" })} className="w-full flex items-center gap-2 p-3 rounded-xl text-xs font-bold active:scale-95 transition" style={{ background: "#3B82F615", color: "#3B82F6", border: "1px solid #3B82F630" }}>
          <FileText size={14} /> View Coin Logs
        </button>
        <button onClick={() => toast({ title: "Monitoring coin sellers" })} className="w-full flex items-center gap-2 p-3 rounded-xl text-xs font-bold active:scale-95 transition" style={{ background: "#06B6D415", color: "#06B6D4", border: "1px solid #06B6D430" }}>
          <Store size={14} /> Monitor Coin Sellers
        </button>
        <button onClick={() => toast({ title: "Monitoring recharge activity" })} className="w-full flex items-center gap-2 p-3 rounded-xl text-xs font-bold active:scale-95 transition" style={{ background: "#EC489915", color: "#EC4899", border: "1px solid #EC489930" }}>
          <Activity size={14} /> Monitor Recharge Activity
        </button>
      </div>
    </div>
  );
}