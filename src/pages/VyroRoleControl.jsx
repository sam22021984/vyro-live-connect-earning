import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Check, Lock, Crown } from "lucide-react";
import { useVipProfile } from "@/hooks/useVipProfile";
import { roleHierarchy } from "@/components/vip-systems/vipSystemsData";
import VipSystemHeader from "@/components/vip-systems/VipSystemHeader";
import VipSystemLoader from "@/components/vip-systems/VipSystemLoader";

export default function VyroRoleControl() {
  const { profile, loading } = useVipProfile();
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  if (loading) return <VipSystemLoader />;

  const currentRole = profile?.role || "user";
  const currentIndex = roleHierarchy.findIndex((r) => r.id === currentRole);

  return (
    <div className="min-h-screen bg-[#0A0118]">
      <div className="max-w-md mx-auto">
        <VipSystemHeader title="VYRO ROLE CONTROL" subtitle="Manage your role & permissions" icon="🎭" color="#6366F1" />

        <div className="pb-6 animate-fadeIn">
          {/* Current Role Card */}
          <div className="px-4 pt-4">
            <div
              className="rounded-2xl p-5 bg-gradient-to-br shadow-2xl"
              style={{
                backgroundImage: `linear-gradient(135deg, ${roleHierarchy[currentIndex]?.color}33, ${roleHierarchy[currentIndex]?.color}11)`,
                border: `1px solid ${roleHierarchy[currentIndex]?.color}44`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ backgroundColor: `${roleHierarchy[currentIndex]?.color}22` }}
                >
                  {roleHierarchy[currentIndex]?.icon}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Current Role</p>
                  <h2 className="text-lg font-bold text-white">{roleHierarchy[currentIndex]?.name}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{roleHierarchy[currentIndex]?.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-gray-500">Permissions active</span>
                <span className="font-bold" style={{ color: roleHierarchy[currentIndex]?.color }}>
                  {roleHierarchy[currentIndex]?.permissions.length} features
                </span>
              </div>
            </div>
          </div>

          {/* Role Hierarchy */}
          <div className="px-4 mt-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Role Hierarchy</h3>
            <p className="text-xs text-gray-600 mb-3">Tap a role to view its permissions and requirements</p>
            <div className="space-y-2">
              {roleHierarchy.map((role, idx) => {
                const isCurrent = role.id === currentRole;
                const isUnlocked = idx <= currentIndex;
                const isSelected = selectedRole === role.id;
                return (
                  <div key={role.id}>
                    <button
                      onClick={() => setSelectedRole(isSelected ? null : role.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                        isCurrent
                          ? "bg-white/10 border border-white/20"
                          : isUnlocked
                          ? "bg-white/5 border border-white/5"
                          : "bg-white/[0.02] border border-white/5 opacity-60"
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ backgroundColor: `${role.color}22` }}
                      >
                        {isUnlocked ? role.icon : <Lock size={16} className="text-gray-600" />}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{role.name}</span>
                          {isCurrent && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${role.color}33`, color: role.color }}>
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-500">{role.permissions.length} permissions</p>
                      </div>
                      {isUnlocked ? (
                        <Check size={16} className="text-green-400 flex-shrink-0" />
                      ) : (
                        <Lock size={14} className="text-gray-600 flex-shrink-0" />
                      )}
                    </button>

                    {/* Expanded Details */}
                    {isSelected && (
                      <div className="mt-1 mb-2 ml-2 mr-2 p-4 rounded-xl bg-black/30 border border-white/5 animate-fadeIn">
                        <p className="text-xs text-gray-400 mb-3">{role.description}</p>
                        <div className="space-y-1.5">
                          {role.permissions.map((perm, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <Check size={12} className="text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-xs text-gray-300">{perm}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/5">
                          <p className="text-[10px] text-gray-500 font-semibold uppercase">Requirements</p>
                          <p className="text-xs text-gray-400 mt-1">{role.requirements}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upgrade CTA */}
          {currentIndex < roleHierarchy.length - 1 && (
            <div className="px-4 mt-6">
              <div className="rounded-2xl p-5 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-indigo-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Crown size={16} className="text-indigo-400" />
                  <h3 className="text-sm font-bold text-white">Next Role: {roleHierarchy[currentIndex + 1]?.name}</h3>
                </div>
                <p className="text-xs text-gray-400 mb-3">{roleHierarchy[currentIndex + 1]?.requirements}</p>
                <button
                  onClick={() => navigate("/apply-center")}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition"
                >
                  Apply for Upgrade
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}