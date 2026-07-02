import React from "react";
import { CheckCircle, Globe, Shield } from "lucide-react";
import { COLORS } from "./communityData";

export default function Footer() {
  return (
    <div className="mt-6 px-4 py-4 border-t" style={{ borderColor: COLORS.border }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
        {[
          { label: "Platform Version", value: "v2.4.1", icon: Globe },
          { label: "System Status", value: "Operational", icon: CheckCircle },
          { label: "API Status", value: "Online", icon: CheckCircle },
          { label: "Security Status", value: "Protected", icon: Shield },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5 p-2 rounded-lg" style={{ background: COLORS.bgPrimary }}>
            <s.icon size={12} style={{ color: COLORS.emerald }} />
            <div>
              <p className="text-[8px]" style={{ color: COLORS.textSecondary }}>{s.label}</p>
              <p className="text-[10px] font-bold" style={{ color: COLORS.textPrimary }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 text-[9px]" style={{ color: COLORS.textSecondary }}>
        <span>© 2026 VYRO Live Connect</span>
        <span>·</span>
        <button className="hover:underline">Privacy Policy</button>
        <span>·</span>
        <button className="hover:underline">Terms of Service</button>
        <span>·</span>
        <button className="hover:underline">Support Center</button>
      </div>
    </div>
  );
}