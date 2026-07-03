import React from "react";
import { GlassCard, SectionHeader, ActionButton, TEXT_MUTED } from "../Shared";
import { GIFT_DATA } from "../userDashboardData";

export default function GiftSection() {
  return (
    <div className="space-y-4">
      <GlassCard className="text-center !p-4">
        <div className="text-3xl mb-1">🎁</div>
        <h2 className="text-base font-bold text-white">Gift Center</h2>
        <p className="text-[10px] mt-1" style={{ color: TEXT_MUTED }}>74 gifts in your collection</p>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Gift Collection" icon="🎀" />
        <div className="grid grid-cols-3 gap-2">
          {GIFT_DATA.collection.map((g, i) => (
            <div key={i} className="flex flex-col items-center gap-1 p-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
              <span className="text-2xl">{g.icon}</span>
              <span className="text-[9px] font-bold text-white">{g.name}</span>
              <span className="text-[8px]" style={{ color: "#D4AF37" }}>🪙 {g.price}</span>
              <span className="text-[8px]" style={{ color: TEXT_MUTED }}>x{g.owned}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Gift History" icon="📋" />
        <div className="space-y-2">
          {GIFT_DATA.history.map((h, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white">{h.gift}</p>
                <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{h.to} · {h.date}</p>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: h.type === "Sent" ? "#EF444420" : "#10B98120", color: h.type === "Sent" ? "#EF4444" : "#10B981" }}>
                {h.type.toUpperCase()}
              </span>
              <span className="text-[11px] font-bold" style={{ color: h.type === "Sent" ? "#EF4444" : "#10B981" }}>{h.amount}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-3 gap-2">
          {GIFT_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}