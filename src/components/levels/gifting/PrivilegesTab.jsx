import React from "react";
import { useLevelSubDashboard } from "@/hooks/useLevelSubDashboard";
import { Loader2 } from "lucide-react";

export default function PrivilegesTab() {
  const { benefits, history, loading } = useLevelSubDashboard("gifting");

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Exclusive Gifter Privileges</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">VIP supporter benefits</p>
        {benefits.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">No privileges equipped yet</p>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {benefits.map((p, i) => (
              <div key={i} className="rounded-2xl p-3" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: `1px solid ${p.color}30`, boxShadow: `0 4px 12px ${p.color}15` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg mb-2" style={{ background: `${p.color}15`, border: `1px solid ${p.color}25` }}>
                  <span style={{ filter: `drop-shadow(0 1px 2px ${p.color}50)` }}>{p.icon}</span>
                </div>
                <p className="text-[11px] font-bold text-gray-800 mb-0.5">{p.name}</p>
                <p className="text-[9px] text-gray-400 mb-2">{p.desc}</p>
                <button className="w-full text-[9px] font-bold py-1.5 rounded-lg active:scale-95 transition" style={{ background: `${p.color}10`, color: p.color }}>View Details</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Gifting History</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">Recent gifting activity</p>
        {history.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">No recent activity</p>
        ) : (
          <div className="rounded-2xl p-3 space-y-2.5" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: "1px solid rgba(255,255,255,0.9)" }}>
            {history.map((h, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{ background: `${h.color}15`, border: `1px solid ${h.color}25` }}>{h.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-gray-800 truncate">{h.desc}</p>
                  <p className="text-[9px] text-gray-400">{h.type} • {h.date}</p>
                </div>
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-md" style={{ background: `${h.color}15`, color: h.color }}>{h.type}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}