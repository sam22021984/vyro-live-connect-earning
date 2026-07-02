import React from "react";
import { Menu, X } from "lucide-react";
import { COLORS, SIDEBAR_ITEMS } from "./communityData";

export default function Sidebar({ active, onSelect, open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <div
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 flex-shrink-0 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderRight: `1px solid ${COLORS.border}`,
        }}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: `linear-gradient(135deg, ${COLORS.royalBlue}, ${COLORS.skyBlue})` }}>
              V
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>VYRO Community</p>
              <p className="text-[9px]" style={{ color: COLORS.textSecondary }}>Enterprise Dashboard</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden w-7 h-7 rounded-full flex items-center justify-center" style={{ background: COLORS.border }}>
            <X size={14} style={{ color: COLORS.textSecondary }} />
          </button>
        </div>

        <div className="overflow-y-auto py-3 px-2 h-[calc(100vh-65px)]">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => { onSelect(item.key); onClose(); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 mb-0.5 ${active === item.key ? "text-white" : ""}`}
              style={active === item.key
                ? { background: `linear-gradient(135deg, ${COLORS.royalBlue}, ${COLORS.skyBlue})`, boxShadow: `0 4px 12px ${COLORS.royalBlue}30` }
                : { color: COLORS.textSecondary }
              }
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          <div className="mt-4 mx-2 p-3 rounded-2xl" style={{ background: `linear-gradient(135deg, ${COLORS.gold}15, ${COLORS.amber}10)`, border: `1px solid ${COLORS.gold}30` }}>
            <p className="text-[10px] font-bold" style={{ color: COLORS.gold }}>💎 Premium Plan</p>
            <p className="text-[9px] mt-0.5" style={{ color: COLORS.textSecondary }}>Unlock advanced analytics & tools</p>
            <button className="w-full mt-2 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: COLORS.gold }}>Upgrade</button>
          </div>
        </div>
      </div>
    </>
  );
}