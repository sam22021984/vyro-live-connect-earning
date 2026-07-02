import React from "react";
import { Shield, ShieldOff, Crown, Key, History, CheckCircle } from "lucide-react";
import { SAM_ADMINS } from "@/components/sam-dashboard/samData";
import { useToast } from "@/components/ui/use-toast";

const statusColors = { active: "#10B981", suspended: "#F59E0B" };
const roleColors = { "Super Admin": "#D4AF37", "Admin": "#3B82F6", "Moderator": "#10B981" };

export default function AdminControlModule() {
  const { toast } = useToast();
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-2xl p-3 text-center" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}>
          <Crown size={16} className="mx-auto" style={{ color: "#D4AF37" }} />
          <p className="text-lg font-bold mt-1" style={{ color: "#F4F0FA" }}>1</p>
          <p className="text-[8px]" style={{ color: "rgba(244,240,250,0.4)" }}>Super Admins</p>
        </div>
        <div className="rounded-2xl p-3 text-center" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
          <Shield size={16} className="mx-auto" style={{ color: "#3B82F6" }} />
          <p className="text-lg font-bold mt-1" style={{ color: "#F4F0FA" }}>2</p>
          <p className="text-[8px]" style={{ color: "rgba(244,240,250,0.4)" }}>Admins</p>
        </div>
        <div className="rounded-2xl p-3 text-center" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
          <Key size={16} className="mx-auto" style={{ color: "#10B981" }} />
          <p className="text-lg font-bold mt-1" style={{ color: "#F4F0FA" }}>1</p>
          <p className="text-[8px]" style={{ color: "rgba(244,240,250,0.4)" }}>Moderators</p>
        </div>
      </div>
      {SAM_ADMINS.map((a) => (
        <div key={a.id} className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3 mb-2">
            <img src={a.avatar} alt={a.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold truncate" style={{ color: "#F4F0FA" }}>{a.name}</h4>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${roleColors[a.role]}20`, color: roleColors[a.role] }}>{a.role}</span>
              </div>
              <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>{a.id} · {a.permissions} permissions · Last active: {a.lastActive}</p>
            </div>
            <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${statusColors[a.status]}20`, color: statusColors[a.status] }}>{a.status.toUpperCase()}</span>
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => toast({ title: "Managing " + a.name + " permissions" })} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#8B5CF615", color: "#8B5CF6", border: "1px solid #8B5CF630" }}>
              <Key size={10} /> Permissions
            </button>
            <button onClick={() => toast({ title: "Viewing audit logs" })} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#3B82F615", color: "#3B82F6", border: "1px solid #3B82F630" }}>
              <History size={10} /> Audit Logs
            </button>
            {a.status === "active" ? (
              <button onClick={() => toast({ title: a.name + " suspended" })} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#F59E0B15", color: "#F59E0B", border: "1px solid #F59E0B30" }}>
                <ShieldOff size={10} /> Suspend
              </button>
            ) : (
              <button onClick={() => toast({ title: a.name + " activated" })} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#10B98115", color: "#10B981", border: "1px solid #10B98130" }}>
                <CheckCircle size={10} /> Activate
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}