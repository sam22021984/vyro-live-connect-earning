import React from "react";
import { useLevelDashboard } from "@/hooks/useLevelDashboard";
import { Check, Lock, Crown, Loader2 } from "lucide-react";

export default function PrivilegesTab() {
  const { privileges, milestones, loading } = useLevelDashboard();

  if (loading && privileges.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* SECTION 09 — Exclusive Privileges */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Exclusive Privileges</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">Current tier & upcoming privileges</p>
        {privileges.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">No privileges equipped yet</p>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {privileges.map((p, i) => {
              const isActive = p.status === "Active";
              return (
                <div key={i} className="rounded-2xl p-3" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: `1px solid ${isActive ? p.color : "#E5E7EB"}30`, boxShadow: isActive ? `0 4px 12px ${p.color}15` : "none", opacity: isActive ? 1 : 0.8 }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base" style={{ background: `${p.color}15`, border: `1px solid ${p.color}25` }}>
                      <span style={{ filter: isActive ? `drop-shadow(0 1px 2px ${p.color}50)` : "grayscale(1)" }}>{p.icon}</span>
                    </div>
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5" style={{ background: isActive ? "#22C55E15" : "#94A3B815", color: isActive ? "#22C55E" : "#94A3B8" }}>
                      {isActive ? <Check size={8} /> : <Lock size={8} />} {p.status}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-800 truncate">{p.name}</p>
                  <p className="text-[9px] text-gray-400">{p.desc}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION 10 — Level Milestones */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Level Milestones</h3>
        <p className="text-[10px] text-gray-400 mb-3 px-1">Reward unlock timeline</p>
        <div className="relative pl-6">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-amber-200 to-purple-200" />
          {milestones.map((m, i) => {
            const color = m.reached ? "#22C55E" : "#94A3B8";
            return (
              <div key={i} className="relative mb-3">
                {/* Dot */}
                <div className="absolute -left-6 top-3 w-5 h-5 rounded-full flex items-center justify-center text-[10px] z-10" style={{ background: m.reached ? "#22C55E" : "#E5E7EB", border: "2px solid #fff", boxShadow: `0 2px 6px ${color}40` }}>
                  {m.reached ? <Check size={10} className="text-white" /> : <Lock size={9} className="text-gray-400" />}
                </div>
                {/* Card */}
                <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: `1px solid ${m.reached ? "#22C55E" : "#E5E7EB"}30`, opacity: m.reached ? 1 : 0.8 }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg" style={{ background: `${m.reached ? "#FFC83D" : "#94A3B8"}15`, border: `1px solid ${m.reached ? "#FFC83D" : "#94A3B8"}25` }}>
                    <span style={{ filter: m.reached ? "none" : "grayscale(1)" }}>{m.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-gray-800">LV{m.level}</span>
                      <Crown size={11} className="text-amber-500" />
                    </div>
                    <p className="text-[10px] text-gray-500">{m.name}</p>
                    <p className="text-[9px] font-semibold text-amber-600">{m.coins} coins</p>
                  </div>
                  <button className="text-[9px] font-bold py-1.5 px-2.5 rounded-lg active:scale-95 transition" style={{ background: m.reached ? "#22C55E10" : "#1F6BFF10", color: m.reached ? "#22C55E" : "#1F6BFF" }}>
                    {m.reached ? "Rewards" : "Preview"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}