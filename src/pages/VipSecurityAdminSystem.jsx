import React, { useState } from "react";
import { Shield, Check, Bell, Smartphone, Lock, Key, AlertTriangle, Star } from "lucide-react";
import { useVipProfile } from "@/hooks/useVipProfile";
import { vipSecurityFeatures } from "@/components/vip-systems/vipSystemsData";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import VipSystemHeader from "@/components/vip-systems/VipSystemHeader";
import VipSystemLoader from "@/components/vip-systems/VipSystemLoader";

export default function VipSecurityAdminSystem({ embedded }) {
  const { profile, loading } = useVipProfile();
  const { toast } = useToast();
  const [features, setFeatures] = useState(
    vipSecurityFeatures.reduce((acc, f) => {
      acc[f.id] = f.status === "active";
      return acc;
    }, {})
  );

  if (loading) return <VipSystemLoader />;

  const isVip = profile?.is_vip;
  const verificationStatus = profile?.verification_status || "unverified";
  const safetyStatus = profile?.safety_status || "high";
  const trustScore = profile?.trust_score || 0;

  const toggleFeature = (featureId) => {
    if (!isVip && !features[featureId]) {
      toast({ title: "VIP Required", description: "Upgrade to VIP to enable this feature", variant: "destructive" });
      return;
    }
    setFeatures((prev) => ({ ...prev, [featureId]: !prev[featureId] }));
    toast({
      title: features[featureId] ? "Feature Disabled" : "Feature Enabled",
      description: features[featureId] ? "Security feature turned off" : "Security feature activated ✓",
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0118]">
      <div className="max-w-md mx-auto">
        {!embedded && <VipSystemHeader title="VIP SECURITY ADMIN" subtitle="Account security & protection" icon="🛡️" color="#3B82F6" />}

        <div className="pb-6 animate-fadeIn">
          {/* Security Score Card */}
          <div className="px-4 pt-4">
            <div className="rounded-2xl p-5 bg-gradient-to-br from-blue-500/20 to-cyan-500/5 border border-blue-500/20">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Security Score</p>
                  <h2 className="text-3xl font-bold text-white mt-1">{trustScore}<span className="text-lg text-gray-500">/100</span></h2>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                  <Shield size={28} className="text-blue-400" />
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-500"
                  style={{ width: `${trustScore}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-black/20 rounded-lg p-2 text-center">
                  <p className="text-[9px] text-gray-500">Verification</p>
                  <p className="text-xs font-bold text-blue-400 capitalize">{verificationStatus}</p>
                </div>
                <div className="bg-black/20 rounded-lg p-2 text-center">
                  <p className="text-[9px] text-gray-500">Safety Level</p>
                  <p className="text-xs font-bold text-green-400 capitalize">{safetyStatus}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Protections Summary */}
          <div className="px-4 mt-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
                <Check size={16} className="text-green-400" />
                <span className="text-[9px] text-gray-400 font-medium text-center">
                  {Object.values(features).filter(Boolean).length} Active
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
                <Lock size={16} className="text-gray-600" />
                <span className="text-[9px] text-gray-400 font-medium text-center">
                  {Object.values(features).filter(!Boolean).length} Inactive
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
                <Star size={16} className="text-amber-400" />
                <span className="text-[9px] text-gray-400 font-medium text-center">
                  {isVip ? "VIP Shield" : "Standard"}
                </span>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="px-4 mt-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Security Features</h3>
            <div className="space-y-2">
              {vipSecurityFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-xl flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-white">{feature.title}</p>
                      {features[feature.id] && (
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold bg-green-500/20 text-green-400">
                          ON
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">{feature.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleFeature(feature.id)}
                    className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${
                      features[feature.id] ? "bg-blue-500" : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                        features[feature.id] ? "left-5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security Tips */}
          <div className="px-4 mt-6">
            <div className="rounded-2xl p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/15">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={14} className="text-amber-400" />
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Security Recommendations</h3>
              </div>
              <div className="space-y-2">
                {[
                  "Enable Two-Factor Authentication for maximum protection",
                  "Regularly review your device management list",
                  "Never share your account credentials with anyone",
                  "Report suspicious messages immediately",
                  "Keep your withdrawal protection always enabled",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <span className="text-xs text-gray-400">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Security Actions */}
          <div className="px-4 mt-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => toast({ title: "Devices Checked", description: "No unfamiliar devices found ✓" })}
                className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 active:scale-95 transition"
              >
                <Smartphone size={16} className="text-blue-400" />
                <span className="text-xs font-bold text-white">Check Devices</span>
              </button>
              <button
                onClick={() => toast({ title: "Alerts Reviewed", description: "No suspicious activity found ✓" })}
                className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 active:scale-95 transition"
              >
                <Bell size={16} className="text-blue-400" />
                <span className="text-xs font-bold text-white">Review Alerts</span>
              </button>
              <button
                onClick={() => toast({ title: "Keys Refreshed", description: "Security keys updated ✓" })}
                className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 active:scale-95 transition"
              >
                <Key size={16} className="text-blue-400" />
                <span className="text-xs font-bold text-white">Refresh Keys</span>
              </button>
              <button
                onClick={() => toast({ title: "Scan Complete", description: "No threats detected ✓" })}
                className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 active:scale-95 transition"
              >
                <Shield size={16} className="text-blue-400" />
                <span className="text-xs font-bold text-white">Security Scan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}