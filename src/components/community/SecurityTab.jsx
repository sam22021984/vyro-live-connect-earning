import React from "react";
import { Shield, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { COLORS } from "./communityData";
import { useCommunitySecurity } from "@/hooks/useCommunitySecurity";

const STATUS_STYLES = {
  active: { bg: `${COLORS.emerald}15`, color: COLORS.emerald, icon: CheckCircle, label: "Active" },
  warning: { bg: `${COLORS.amber}15`, color: COLORS.amber, icon: AlertTriangle, label: "Warning" },
  error: { bg: `${COLORS.crimson}15`, color: COLORS.crimson, icon: AlertTriangle, label: "Error" },
};

export default function SecurityTab() {
  const { data, loading } = useCommunitySecurity();

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={24} className="animate-spin" style={{ color: COLORS.emerald }} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>🛡️ Security Center</h3>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLORS.emerald }} />
          <span className="text-[9px] font-semibold" style={{ color: COLORS.emerald }}>LIVE</span>
        </div>
      </div>

      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.emerald}, ${COLORS.skyBlue})` }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)" }} />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Shield size={18} className="text-white" />
              <h2 className="text-sm font-bold text-white">{data.score >= 90 ? "System Secure" : data.score >= 70 ? "Minor Issues" : "Attention Required"}</h2>
            </div>
            <p className="text-[10px] text-white/80">{data.activeAlerts} active alerts • {data.recentEvents} events this week</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-white">{data.score}%</p>
            <p className="text-[9px] text-white/70">Security Score</p>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Active Alerts", value: data.activeAlerts, color: data.criticalAlerts > 0 ? COLORS.crimson : COLORS.amber },
          { label: "Events (7d)", value: data.recentEvents, color: COLORS.royalBlue },
          { label: "Devices", value: data.activeDevices, color: COLORS.emerald },
          { label: "Pending", value: data.pendingReviews, color: COLORS.amber },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-2 text-center" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}` }}>
            <p className="text-sm font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[8px]" style={{ color: COLORS.textSecondary }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Security items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {data.items.map((item) => {
          const st = STATUS_STYLES[item.status] || STATUS_STYLES.active;
          return (
            <div key={item.label} className="rounded-2xl p-3 flex items-center gap-2.5" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${st.color}15` }}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>{item.label}</span>
                <p className="text-[10px]" style={{ color: COLORS.textSecondary }}>{item.detail}</p>
              </div>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: st.bg }}>
                <st.icon size={10} style={{ color: st.color }} />
                <span className="text-[9px] font-bold" style={{ color: st.color }}>{st.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Threat detection */}
      {(data.vpnDevices > 0 || data.emulatorDevices > 0 || data.blockedDevices > 0) && (
        <div className="rounded-2xl p-3" style={{ background: `${COLORS.crimson}08`, border: `1px solid ${COLORS.crimson}20` }}>
          <p className="text-[10px] font-bold mb-2 flex items-center gap-1" style={{ color: COLORS.crimson }}>
            <AlertTriangle size={12} /> Threat Detection
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "VPN/Proxy", value: data.vpnDevices },
              { label: "Emulators", value: data.emulatorDevices },
              { label: "Blocked", value: data.blockedDevices },
            ].map((t) => (
              <div key={t.label} className="text-center p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.5)" }}>
                <p className="text-sm font-bold" style={{ color: t.value > 0 ? COLORS.crimson : COLORS.emerald }}>{t.value}</p>
                <p className="text-[8px]" style={{ color: COLORS.textSecondary }}>{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer status */}
      <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}` }}>
        <p className="text-[10px] font-bold mb-2" style={{ color: COLORS.textSecondary }}>System Status</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "API Status", status: "Operational" },
            { label: "Database Status", status: "Operational" },
            { label: "Security Status", status: data.score >= 90 ? "Protected" : data.score >= 70 ? "Monitoring" : "At Risk" },
            { label: "Platform Version", status: "v2.4.1" },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between p-2 rounded-lg" style={{ background: COLORS.bgPrimary }}>
              <span className="text-[10px]" style={{ color: COLORS.textSecondary }}>{s.label}</span>
              <span className="text-[10px] font-bold flex items-center gap-1" style={{ color: COLORS.emerald }}>
                <CheckCircle size={10} /> {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}