import React from "react";
import { Gift, DollarSign } from "lucide-react";
import { SAM_GIFT_REVENUE } from "@/components/sam-dashboard/samData";

export default function GiftRevenueModule() {
  const totals = SAM_GIFT_REVENUE.reduce((acc, g) => ({
    total: acc.total + parseFloat(g.totalValue.replace(/[$K]/g, "")) * (g.totalValue.includes("K") ? 1000 : 1),
    platform: acc.platform + parseFloat(g.platform.replace(/[$K]/g, "")) * (g.platform.includes("K") ? 1000 : 1),
    host: acc.host + parseFloat(g.host.replace(/[$K]/g, "")) * (g.host.includes("K") ? 1000 : 1),
    agency: acc.agency + parseFloat(g.agency.replace(/[$K]/g, "")) * (g.agency.includes("K") ? 1000 : 1),
    agent: acc.agent + parseFloat(g.agent.replace(/[$K]/g, "")) * (g.agent.includes("K") ? 1000 : 1),
  }), { total: 0, platform: 0, host: 0, agency: 0, agent: 0 });

  return (
    <div className="space-y-3">
      {/* Revenue split summary */}
      <div className="rounded-2xl p-3" style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(16,185,129,0.1))", border: "1px solid rgba(212,175,55,0.2)" }}>
        <h4 className="text-xs font-bold mb-2" style={{ color: "#D4AF37" }}>Revenue Split Summary</h4>
        <div className="space-y-1.5">
          {[
            { label: "Platform Share (30%)", value: totals.platform, color: "#3B82F6" },
            { label: "Host Share (50%)", value: totals.host, color: "#EC4899" },
            { label: "Agency Share (15%)", value: totals.agency, color: "#6366F1" },
            { label: "Agent Share (5%)", value: totals.agent, color: "#F59E0B" },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-[10px]" style={{ color: "rgba(244,240,250,0.7)" }}>{s.label}</span>
              </div>
              <span className="text-[10px] font-bold" style={{ color: s.color }}>${(s.value / 1000).toFixed(1)}K</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gift transactions */}
      {SAM_GIFT_REVENUE.map((g, i) => (
        <div key={i} className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{g.gift.split(" ")[0]}</span>
            <div className="flex-1">
              <h4 className="text-xs font-bold" style={{ color: "#F4F0FA" }}>{g.gift}</h4>
              <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>{g.transactions.toLocaleString()} transactions</p>
            </div>
            <span className="text-sm font-bold" style={{ color: "#D4AF37" }}>{g.totalValue}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <div className="text-center p-1.5 rounded-lg" style={{ background: "rgba(59,130,246,0.1)" }}>
              <p className="text-[9px] font-bold" style={{ color: "#3B82F6" }}>{g.platform}</p>
              <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Platform</p>
            </div>
            <div className="text-center p-1.5 rounded-lg" style={{ background: "rgba(236,72,153,0.1)" }}>
              <p className="text-[9px] font-bold" style={{ color: "#EC4899" }}>{g.host}</p>
              <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Host</p>
            </div>
            <div className="text-center p-1.5 rounded-lg" style={{ background: "rgba(99,102,241,0.1)" }}>
              <p className="text-[9px] font-bold" style={{ color: "#6366F1" }}>{g.agency}</p>
              <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Agency</p>
            </div>
            <div className="text-center p-1.5 rounded-lg" style={{ background: "rgba(245,158,11,0.1)" }}>
              <p className="text-[9px] font-bold" style={{ color: "#F59E0B" }}>{g.agent}</p>
              <p className="text-[7px]" style={{ color: "rgba(244,240,250,0.4)" }}>Agent</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}