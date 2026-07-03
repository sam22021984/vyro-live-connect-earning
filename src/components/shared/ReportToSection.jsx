import React, { useState } from "react";
import { ChevronDown, ChevronUp, User, Check, ArrowRight } from "lucide-react";
import { ROLE_HIERARCHY } from "@/components/shared/roleHierarchy";

export default function ReportToSection({ roleKey, theme = "light" }) {
  const [expanded, setExpanded] = useState(false);
  const role = ROLE_HIERARCHY[roleKey];
  if (!role) return null;

  const isDark = theme === "dark";
  const accent = isDark ? "#FFD700" : "#6366F1";
  const accentTeal = isDark ? "#22D3EE" : "#0EA5E9";
  const cardBg = isDark ? "#111827" : "#FFFFFF";
  const borderColor = isDark ? "rgba(255,215,0,0.2)" : "rgba(99,102,241,0.15)";
  const textColor = isDark ? "#FFFFFF" : "#1F2937";
  const subTextColor = isDark ? "rgba(255,255,255,0.5)" : "#6B7280";
  const lightTextColor = isDark ? "rgba(255,255,255,0.4)" : "#9CA3AF";
  const innerBg = isDark ? "rgba(255,255,255,0.03)" : "#F9FAFB";

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
      {/* Header - always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center gap-3 active:scale-[0.98] transition"
      >
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
          {role.icon}
        </div>
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-1.5">
            <User size={11} style={{ color: accent }} />
            <h3 className="text-xs font-bold" style={{ color: textColor }}>{role.title}</h3>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px]" style={{ color: subTextColor }}>Reports to:</span>
            <span className="text-[10px] font-bold" style={{ color: accent }}>{role.reportsTo}</span>
          </div>
        </div>
        {expanded ? <ChevronUp size={16} style={{ color: lightTextColor }} /> : <ChevronDown size={16} style={{ color: lightTextColor }} />}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 animate-fadeIn">
          {/* Reports To Card */}
          <div className="rounded-xl p-3" style={{ background: `${accent}08`, border: `1px solid ${accent}15` }}>
            <p className="text-[9px] font-bold mb-1" style={{ color: lightTextColor }}>📌 REPORTS TO</p>
            <p className="text-sm font-bold" style={{ color: accent }}>{role.reportsTo}</p>
            <p className="text-[10px] mt-1" style={{ color: subTextColor }}>{role.reportsToNote}</p>
          </div>

          {/* Position Level */}
          <div className="rounded-xl p-3" style={{ background: innerBg }}>
            <p className="text-[9px] font-bold mb-1" style={{ color: lightTextColor }}>📍 POSITION LEVEL</p>
            <p className="text-xs font-bold" style={{ color: textColor }}>{role.positionLevel}</p>
          </div>

          {/* Responsibilities */}
          {role.responsibilities.length > 0 && (
            <div className="rounded-xl p-3" style={{ background: innerBg }}>
              <p className="text-[9px] font-bold mb-2" style={{ color: lightTextColor }}>📋 PRIMARY RESPONSIBILITIES</p>
              <div className="space-y-1.5">
                {role.responsibilities.map((r, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${accentTeal}15` }}>
                      <Check size={9} style={{ color: accentTeal }} />
                    </div>
                    <span className="text-[11px] leading-relaxed" style={{ color: subTextColor }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Authority */}
          {role.authority.length > 0 && (
            <div className="rounded-xl p-3" style={{ background: innerBg }}>
              <p className="text-[9px] font-bold mb-2" style={{ color: lightTextColor }}>🔐 AUTHORITY</p>
              <div className="space-y-1.5">
                {role.authority.map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${accent}15` }}>
                      <Check size={9} style={{ color: accent }} />
                    </div>
                    <span className="text-[11px] leading-relaxed" style={{ color: subTextColor }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reports Received From */}
          {role.reportsReceivedFrom.length > 0 && (
            <div className="rounded-xl p-3" style={{ background: innerBg }}>
              <p className="text-[9px] font-bold mb-2" style={{ color: lightTextColor }}>📥 REPORTS RECEIVED FROM</p>
              <div className="space-y-1.5">
                {role.reportsReceivedFrom.map((r, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <ArrowRight size={10} style={{ color: accentTeal }} />
                    <span className="text-[11px] font-semibold" style={{ color: textColor }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}