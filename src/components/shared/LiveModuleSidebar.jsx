import React from "react";
import { LayoutDashboard, ChevronDown } from "lucide-react";
import { useLiveDashboardModules } from "@/hooks/useDashboardRegistry";

const WHITE = "#FFFFFF";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";
const SOFT_WHITE = "#F4F0FA";

const GLASS = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

/**
 * Reusable sidebar that renders a dashboard's module list from the LIVE
 * registry (normalized *_dashboard_modules tables), falling back to the
 * dashboard's static sections array when no live modules exist.
 *
 * Props:
 *   dashboardCode    — canonical dashboard_code (e.g. "ADMIN_DASHBOARD")
 *   iconMap          — dashboard's ICONS object (string → lucide component)
 *   activeSection    — currently active section ID
 *   onNavigate       — (sectionId) => void
 *   staticSections   — fallback array: [{ id, label, icon, color, gradient? }]
 *   resolveSectionId — optional: (module) => sectionId (default: module_code)
 *   defaultColor     — fallback color for modules without a static match
 *   gridCols         — grid columns (default 4; SAM uses 3)
 *   theme            — "light" (default) | "dark" (SAM uses dark glass theme)
 */
export default function LiveModuleSidebar({
  dashboardCode,
  iconMap = {},
  activeSection,
  onNavigate,
  staticSections = [],
  resolveSectionId,
  defaultColor = "#2F80ED",
  gridCols = 4,
  theme = "light",
}) {
  const { modules, hasLiveModules } = useLiveDashboardModules(dashboardCode);
  const isDark = theme === "dark";

  // Build lookups from static sections
  const staticLookup = {};
  staticSections.forEach((s) => {
    staticLookup[s.id] = { icon: s.icon, color: s.color, label: s.label, gradient: s.gradient };
  });

  const defaultResolve = (m) => m.module_code;
  const resolver = resolveSectionId || defaultResolve;

  let items;
  if (hasLiveModules) {
    items = modules.map((m) => {
      const sectionId = resolver(m);
      const matched = staticLookup[sectionId];
      return {
        id: sectionId,
        label: m.module_name || matched?.label || m.module_code,
        icon: matched?.icon || m.module_code,
        color: matched?.color || defaultColor,
        gradient: matched?.gradient,
        isLive: true,
        hasRealtime: m.realtime_sources?.length > 0,
      };
    });
  } else {
    items = staticSections.map((s) => ({
      id: s.id,
      label: s.label,
      icon: s.icon,
      color: s.color,
      gradient: s.gradient,
      isLive: false,
      hasRealtime: false,
    }));
  }

  const gridClass = gridCols === 3 ? "grid-cols-3" : "grid-cols-4";

  return (
    <div className={`grid ${gridClass} gap-2`}>
      {items.map((s, i) => {
        const Icon = iconMap[s.icon] || LayoutDashboard;
        const isActive = s.id === activeSection;

        // Dark theme: glass morphism + gradient active state
        const activeBg = isDark
          ? (s.gradient || `linear-gradient(135deg, ${s.color}, ${s.color}cc)`)
          : `${s.color}10`;
        const inactiveBg = isDark ? GLASS.background : "#F7F9FC";
        const inactiveBorder = isDark ? GLASS.border : "1px solid transparent";
        const activeBorder = isDark ? GLASS.border : `1px solid ${s.color}30`;
        const iconBg = isDark
          ? (isActive ? "rgba(255,255,255,0.2)" : `${s.color}20`)
          : `${s.color}10`;
        const iconColor = isDark
          ? (isActive ? "#fff" : s.color)
          : s.color;
        const textColor = isDark
          ? (isActive ? "#fff" : SOFT_WHITE)
          : (isActive ? s.color : DARK);

        return (
          <button
            key={i}
            onClick={() => onNavigate(s.id)}
            className="rounded-xl p-2 flex flex-col items-center gap-1 active:scale-95 transition relative"
            style={{
              background: isActive ? activeBg : inactiveBg,
              border: isActive ? activeBorder : inactiveBorder,
              backdropFilter: isDark ? "blur(20px)" : undefined,
              boxShadow: isActive && isDark ? `0 4px 12px ${s.color}40` : undefined,
            }}
          >
            {s.isLive && s.hasRealtime && (
              <span
                className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                title="Live realtime data"
              />
            )}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: iconBg }}
            >
              <Icon size={14} style={{ color: iconColor }} />
            </div>
            <span
              className="text-[8px] font-semibold text-center leading-tight"
              style={{ color: textColor }}
            >
              {s.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Compact bar showing the active section name + dropdown toggle.
 * Shows a LIVE badge when live modules are loaded.
 */
export function LiveModuleBar({
  dashboardCode,
  iconMap = {},
  activeSection,
  staticSections = [],
  defaultColor = "#2F80ED",
  showSidebar,
  onToggleSidebar,
}) {
  const { hasLiveModules } = useLiveDashboardModules(dashboardCode);

  const activeData = staticSections.find((s) => s.id === activeSection) || staticSections[0];
  const Icon = (activeData && iconMap[activeData.icon]) || LayoutDashboard;

  return (
    <button
      onClick={onToggleSidebar}
      className="w-full rounded-xl p-2.5 flex items-center gap-2 active:scale-95 transition"
      style={{ background: WHITE, border: "1px solid #E5E7EB" }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ background: `${activeData?.color || defaultColor}10` }}
      >
        <Icon size={14} style={{ color: activeData?.color || defaultColor }} />
      </div>
      <span className="text-xs font-bold flex-1 text-left" style={{ color: DARK }}>
        {activeData?.label || "Dashboard"}
      </span>
      {hasLiveModules && (
        <span className="text-[7px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5" style={{ background: "#10B98115", color: "#059669" }}>
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> LIVE
        </span>
      )}
      <ChevronDown size={16} style={{ color: GRAY }} className={showSidebar ? "rotate-180 transition" : "transition"} />
    </button>
  );
}