import React from "react";
import { useRealtimeStatus } from "@/components/GlobalRealtimeProvider";
import { useAuth } from "@/lib/AuthContext";
import { Loader2, AlertTriangle } from "lucide-react";

/**
 * Lightweight, non-intrusive realtime connection indicator.
 * Only shown for transient problem states (RECONNECTING / ERROR) while the
 * user is authenticated. CONNECTED / DISCONNECTED-while-logged-out stay
 * silent.
 */
export default function RealtimeStatusIndicator() {
  const { status } = useRealtimeStatus();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;
  if (status === "CONNECTED" || status === "CONNECTING" || status === "DISCONNECTED")
    return null;

  const config = {
    RECONNECTING: {
      icon: Loader2,
      className: "animate-spin text-amber-400",
      label: "Reconnecting",
    },
    ERROR: {
      icon: AlertTriangle,
      className: "text-red-400",
      label: "Connection error",
    },
  }[status];

  if (!config) return null;
  const Icon = config.icon;

  return (
    <div className="fixed top-3 right-3 z-[60] flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 shadow-lg">
      <Icon size={12} className={config.className} />
      <span className="text-[10px] font-medium text-white/80">{config.label}</span>
    </div>
  );
}