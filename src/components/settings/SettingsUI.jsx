import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

export const DARK = "#1A1B3A";
export const CARD_BG = "#FFFFFF";
export const MUTED = "#8B8FA3";

export function SettingsShell({ title, subtitle, loading, children }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition"
          >
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <div>
            <h1 className="text-base font-bold text-gray-800">{title}</h1>
            {subtitle && <p className="text-[10px] text-gray-400">{subtitle}</p>}
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin text-purple-400" />
          </div>
        ) : (
          <div className="p-4 pb-24">{children}</div>
        )}
      </div>
    </div>
  );
}

export function SettingsCard({ title, children }) {
  return (
    <div className="mb-4">
      {title && (
        <h3 className="text-xs font-bold mb-2 px-1" style={{ color: DARK }}>{title}</h3>
      )}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: CARD_BG,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)",
          border: "1px solid #F0F1F5",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function ToggleRow({ icon: Icon, label, description, value, onChange, color = "#8B5CF6", isLast }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3.5"
      style={{ borderBottom: isLast ? "none" : "1px solid #F0F1F5" }}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}12` }}
        >
          <Icon size={16} style={{ color }} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">{label}</p>
          {description && <p className="text-[10px] text-gray-400 truncate">{description}</p>}
        </div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className="flex-shrink-0 w-11 h-6 rounded-full transition-all duration-200 relative"
        style={{
          background: value ? color : "#E5E7EB",
          boxShadow: value ? `0 0 8px ${color}40` : "none",
        }}
      >
        <div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-200"
          style={{ left: value ? "22px" : "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
        />
      </button>
    </div>
  );
}

export function SelectRow({ icon: Icon, label, description, value, options, onChange, color = "#8B5CF6", isLast }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3.5"
      style={{ borderBottom: isLast ? "none" : "1px solid #F0F1F5" }}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}12` }}
        >
          <Icon size={16} style={{ color }} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">{label}</p>
          {description && <p className="text-[10px] text-gray-400 truncate">{description}</p>}
        </div>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-xs font-semibold bg-gray-50 rounded-lg px-3 py-2 outline-none cursor-pointer"
        style={{ color: DARK, border: "1px solid #E5E7EB" }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export function InfoRow({ icon: Icon, label, value, color = "#8B5CF6", isLast, onClick }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3.5"
      style={{ borderBottom: isLast ? "none" : "1px solid #F0F1F5" }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}12` }}
        >
          <Icon size={16} style={{ color }} />
        </div>
        <p className="text-sm font-semibold text-gray-800 truncate">{label}</p>
      </div>
      <span className="text-xs font-medium text-gray-400">{value}</span>
    </div>
  );
}

export function ActionRow({ icon: Icon, label, description, color = "#8B5CF6", isLast, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition active:bg-gray-50"
      style={{ borderBottom: isLast ? "none" : "1px solid #F0F1F5" }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}12` }}
      >
        <Icon size={16} style={{ color: danger ? "#EF4444" : color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: danger ? "#EF4444" : DARK }}>{label}</p>
        {description && <p className="text-[10px] text-gray-400 truncate">{description}</p>}
      </div>
      <span className="text-gray-300 text-sm">›</span>
    </button>
  );
}