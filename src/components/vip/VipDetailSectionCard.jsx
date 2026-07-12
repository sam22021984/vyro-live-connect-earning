import React from "react";

export default function VipDetailSectionCard({ icon: Icon, title, color, glow, children }) {
  return (
    <div
      className="rounded-2xl p-4 bg-white/5 border border-white/10"
      style={{ boxShadow: `0 4px 20px ${glow}15` }}
    >
      <div className="flex items-center gap-2 mb-3">
        {Icon && (
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}20`, border: `1px solid ${color}40` }}
          >
            <Icon size={14} style={{ color }} />
          </div>
        )}
        <h3 className="text-sm font-bold" style={{ color }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}