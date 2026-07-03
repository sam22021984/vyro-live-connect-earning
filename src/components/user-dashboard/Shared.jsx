import React from "react";

export const GOLD = "#D4AF37";
export const BLUE = "#3B82F6";
export const WHITE = "#FFFFFF";
export const BG_DARK = "#0A0E1A";
export const TEXT_MUTED = "rgba(255,255,255,0.5)";
export const TEXT_DIM = "rgba(255,255,255,0.35)";

export function GlassCard({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-3 ${className}`}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {children}
    </div>
  );
}

export function SectionHeader({ title, subtitle, icon }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      {icon && <span className="text-lg">{icon}</span>}
      <div>
        <h3 className="text-sm font-bold text-white">{title}</h3>
        {subtitle && <p className="text-[10px]" style={{ color: TEXT_MUTED }}>{subtitle}</p>}
      </div>
    </div>
  );
}

export function StatCard({ label, value, icon, color }) {
  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
      </div>
      <p className="text-base font-bold text-white leading-tight">{value}</p>
      <p className="text-[9px] mt-0.5" style={{ color: TEXT_MUTED }}>{label}</p>
    </GlassCard>
  );
}

export function ActionButton({ label, icon, color }) {
  return (
    <button
      className="flex flex-col items-center gap-1.5 p-3 rounded-xl active:scale-95 transition"
      style={{ background: `${color}12`, border: `1px solid ${color}25` }}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-[9px] font-semibold text-center leading-tight" style={{ color }}>{label}</span>
    </button>
  );
}

export function InfoRow({ label, value, icon, color = WHITE }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-sm">{icon}</span>}
        <span className="text-[11px]" style={{ color: TEXT_MUTED }}>{label}</span>
      </div>
      <span className="text-[11px] font-semibold" style={{ color }}>{value}</span>
    </div>
  );
}

export function ProgressBar({ value, max, color = GOLD }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: `linear-gradient(to right, ${color}, ${color}aa)` }} />
    </div>
  );
}