import React from "react";
import { UserCog, CheckCircle, History } from "lucide-react";
import { SAM_PROFILE, SAM_PERMISSIONS } from "@/components/sam-dashboard/samData";

const activityColors = { approval: "#10B981", action: "#3B82F6", security: "#EF4444", report: "#D4AF37" };

export default function SamProfileModule() {
  return (
    <div className="space-y-3">
      {/* Profile header */}
      <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(139,92,246,0.1))", border: "1px solid rgba(212,175,55,0.2)" }}>
        <div className="w-16 h-16 rounded-2xl mx-auto mb-2 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #D4AF37, #B8941E)" }}>
          <UserCog size={28} className="text-white" />
        </div>
        <h3 className="text-sm font-bold" style={{ color: "#F4F0FA" }}>{SAM_PROFILE.name}</h3>
        <p className="text-[10px]" style={{ color: "#D4AF37" }}>{SAM_PROFILE.role}</p>
        <p className="text-[9px] mt-0.5" style={{ color: "rgba(244,240,250,0.4)" }}>{SAM_PROFILE.email}</p>
        <div className="inline-block mt-2 px-3 py-0.5 rounded-full" style={{ background: "rgba(212,175,55,0.2)" }}>
          <span className="text-[10px] font-bold" style={{ color: "#D4AF37" }}>SAM ID: {SAM_PROFILE.sam_id}</span>
        </div>
      </div>

      {/* Permissions */}
      <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <h4 className="text-xs font-bold mb-2" style={{ color: "#F4F0FA" }}>SAM Permission Summary</h4>
        <div className="space-y-1.5">
          {SAM_PERMISSIONS.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle size={12} style={{ color: "#10B981" }} />
              <span className="text-[10px]" style={{ color: "rgba(244,240,250,0.7)" }}>{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity history */}
      <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-2 mb-2">
          <History size={14} style={{ color: "#3B82F6" }} />
          <h4 className="text-xs font-bold" style={{ color: "#F4F0FA" }}>Activity History</h4>
        </div>
        <div className="space-y-2">
          {SAM_PROFILE.activity_history.map((h, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: activityColors[h.type] }} />
              <div className="flex-1">
                <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.8)" }}>{h.action}</p>
                <p className="text-[8px]" style={{ color: "rgba(244,240,250,0.3)" }}>{h.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}