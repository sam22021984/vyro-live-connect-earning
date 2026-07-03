import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, User, Radio, ChevronRight, Shield, Sparkles, Lock, Store } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { getControlCenterDashboards } from "@/lib/roleUtils";

const ICON_MAP = {
  user: Sparkles,
  host: Radio,
  agent: User,
  agency: Building2,
  store: Store,
};

export default function ControlCenter() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }
    (async () => {
      try {
        let profiles = await base44.entities.UserProfile.filter({ user_id: user.id });
        if (profiles.length === 0) {
          profiles = await base44.entities.UserProfile.filter({ created_by_id: user.id });
        }
        if (profiles.length > 0) setProfile(profiles[0]);
      } catch (e) {
        // profile may not exist yet
      }
      setLoading(false);
    })();
  }, [user?.id]);

  const userRole = profile?.role || "user";
  const { visible, locked } = getControlCenterDashboards(userRole);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 100%)" }}>
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">Control Center</h1>
            <p className="text-[10px] text-white/60">Role: {userRole} · Enterprise Operations Hub</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <Shield size={18} className="text-white" />
          </div>
        </div>

        {/* Banner */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 60%, #2D1B69 100%)", boxShadow: "0 8px 24px rgba(15,27,61,0.25)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)", transform: "translate(30%, -30%)" }} />
            <div className="relative">
              <h2 className="text-sm font-bold mb-1">Enterprise Operations</h2>
              <p className="text-[11px] text-white/70 leading-relaxed">
                {visible.length} dashboard{visible.length !== 1 ? "s" : ""} available for your role. {locked.length > 0 && `${locked.length} locked — upgrade your role to unlock.`}
              </p>
            </div>
          </div>
        </div>

        {/* Accessible Dashboard Cards */}
        <div className="px-4 pt-4 space-y-3">
          {visible.length > 0 && (
            <h3 className="text-xs font-bold uppercase tracking-wider px-1 text-gray-400">Your Dashboards</h3>
          )}
          {visible.map((d) => {
            const Icon = ICON_MAP[d.icon] || Sparkles;
            return (
              <button
                key={d.id}
                onClick={() => navigate(d.path)}
                className="w-full text-left rounded-2xl p-4 bg-white border border-gray-100 active:scale-[0.98] transition"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: d.gradient }}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-800">{d.title}</h3>
                    <p className="text-[10px] text-gray-400">{d.modules.length} modules available</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-300" />
                </div>
                <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">{d.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {d.modules.map((m, i) => (
                    <span key={i} className="text-[9px] px-2 py-1 rounded-full font-medium" style={{ background: `${d.color}10`, color: d.color }}>
                      {m}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}

          {/* Locked Dashboards */}
          {locked.length > 0 && (
            <>
              <h3 className="text-xs font-bold uppercase tracking-wider px-1 pt-2 text-gray-400">Locked Dashboards</h3>
              {locked.map((d) => {
                const Icon = ICON_MAP[d.icon] || Sparkles;
                return (
                  <div
                    key={d.id}
                    className="w-full rounded-2xl p-4 bg-gray-50 border border-gray-100 relative overflow-hidden opacity-60"
                  >
                    <div className="absolute top-3 right-3 text-[8px] px-1.5 py-0.5 rounded-full font-bold bg-gray-200 text-gray-500 flex items-center gap-1">
                      <Lock size={8} /> LOCKED
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: d.gradient, opacity: 0.5 }}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-gray-800">{d.title}</h3>
                        <p className="text-[10px] text-gray-400">{d.modules.length} modules</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{d.description}</p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}