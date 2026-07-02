import React from "react";
import { hostBottomActions } from "@/components/levels/host/hostData";

export default function HostBottomBar() {
  return (
    <div className="sticky bottom-0 z-20 mt-4">
      <div className="rounded-2xl p-2 mx-4 mb-4" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 8px 32px rgba(13,27,62,0.12)" }}>
        <div className="grid grid-cols-5 gap-1">
          {hostBottomActions.map((a, i) => (
            <button key={i} className="flex flex-col items-center gap-0.5 py-1.5 rounded-xl active:scale-95 transition hover:bg-gray-50">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: `${a.color}15`, border: `1px solid ${a.color}20` }}>{a.icon}</div>
              <span className="text-[7px] font-bold text-gray-600">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}