import React from "react";
import { hostEvents } from "@/components/levels/host/hostData";

export default function EventsTab() {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">Event Center</h3>
      <p className="text-[10px] text-gray-400 mb-3 px-1">Active & upcoming host events</p>
      <div className="grid grid-cols-2 gap-2.5">
        {hostEvents.map((e, i) => {
          const isActive = e.status === "Active";
          return (
            <div key={i} className="rounded-2xl p-3" style={{ background: "linear-gradient(135deg, #FFFFFF, #F5F7FA)", border: `1px solid ${e.color}30`, boxShadow: `0 4px 12px ${e.color}15` }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${e.color}15`, border: `1px solid ${e.color}25` }}>
                  <span style={{ filter: `drop-shadow(0 1px 2px ${e.color}50)` }}>{e.icon}</span>
                </div>
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-md" style={{ background: isActive ? "#22C55E15" : "#94A3B815", color: isActive ? "#22C55E" : "#94A3B8" }}>{e.status}</span>
              </div>
              <p className="text-[10px] font-bold text-gray-800 truncate">{e.name}</p>
              <p className="text-[9px] text-gray-400 mb-2">{e.desc}</p>
              <button className="w-full text-[9px] font-bold py-1.5 rounded-lg active:scale-95 transition" style={{ background: e.color, color: "#fff" }}>{isActive ? "Join Event" : "View Details"}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}