import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Check, Coins, TrendingUp, BookOpen, ChevronRight } from "lucide-react";
import { levelSystems as staticLevelSystems } from "@/components/levels/levelData";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import UserLevelDashboard from "@/components/levels/UserLevelDashboard";
import StreamingLevelDashboard from "@/components/levels/StreamingLevelDashboard";
import HostLevelDashboard from "@/components/levels/HostLevelDashboard";
import GiftingLevelDashboard from "@/components/levels/GiftingLevelDashboard";
import { useBackNav } from "@/hooks/useBackNav";

import { backendGateway } from "@/lib/backendGateway";
export default function LevelSystem() {
  const navigate = useNavigate();
  const handleBack = useBackNav("/more-services");
  const { user: authUser } = useAuth();
  const [activeLevel, setActiveLevel] = useState(null);
  const [activeView, setActiveView] = useState("overview");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!authUser?.id) return;
    const loadProfile = async () => {
      try {
        let p = await backendGateway.readTable("user_profiles", { filter: { user_id: authUser.id }, limit: 100, order: "created_at", ascending: true });
        if (p.length === 0) p = await backendGateway.readTable("user_profiles", { filter: { created_by: authUser.id }, limit: 100, order: "created_at", ascending: true });
        if (p.length > 0) setProfile(p[0]);
      } catch (e) {}
    };
    loadProfile();

    // Real-time subscription — reload profile when it changes
    let unsub;
    try {
      unsub = base44.entities.UserProfile?.subscribe?.(() => loadProfile());
    } catch (e) { /* ignore */ }
    return () => { try { unsub?.(); } catch (e) {} };
  }, [authUser?.id]);

  // Merge static config with real profile data
  const levelSystems = staticLevelSystems.map((sys) => {
    if (sys.id === "user") {
      const xp = profile?.user_xp || 0;
      const xpMax = profile?.user_xp_max || 10000;
      return { ...sys, level: profile?.user_level || 1, progress: xpMax > 0 ? Math.round((xp / xpMax) * 100) : 0, remainingXp: Math.max(xpMax - xp, 0), nextLevel: (profile?.user_level || 1) + 1 };
    }
    if (sys.id === "host") {
      const xp = profile?.host_xp || 0;
      const xpMax = profile?.host_xp_max || 10000;
      return { ...sys, level: profile?.host_level || 1, progress: xpMax > 0 ? Math.round((xp / xpMax) * 100) : 0, remainingXp: Math.max(xpMax - xp, 0), nextLevel: (profile?.host_level || 1) + 1 };
    }
    if (sys.id === "gifting") {
      const xp = profile?.gifting_xp || 0;
      const xpMax = profile?.gifting_xp_max || 10000;
      return { ...sys, level: profile?.gifting_level || 1, progress: xpMax > 0 ? Math.round((xp / xpMax) * 100) : 0, remainingXp: Math.max(xpMax - xp, 0), nextLevel: (profile?.gifting_level || 1) + 1 };
    }
    if (sys.id === "streaming") {
      const xp = profile?.streaming_xp || 0;
      const xpMax = profile?.streaming_xp_max || 10000;
      return { ...sys, level: profile?.streaming_level || 1, progress: xpMax > 0 ? Math.round((xp / xpMax) * 100) : 0, remainingXp: Math.max(xpMax - xp, 0), nextLevel: (profile?.streaming_level || 1) + 1 };
    }
    return sys;
  });

  const formatNum = (n) => n.toLocaleString();

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={handleBack} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-gray-800">Level System</h1>
            <p className="text-[10px] text-gray-400">VYRO Profile Level System</p>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Hero banner - overview only */}
          {activeView === "overview" && (
          <div className="rounded-2xl p-4 bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600 text-white shadow-lg shadow-purple-200">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} />
              <h2 className="text-sm font-bold">Level Progress</h2>
            </div>
            <p className="text-xs text-white/80">Four independent level systems track your growth across VYRO Live Connect.</p>
          </div>
          )}

          {/* User Level Dashboard */}
          {activeView === "user-dashboard" && <UserLevelDashboard />}

          {/* Streaming Level Dashboard */}
          {activeView === "stream-dashboard" && <StreamingLevelDashboard />}

          {/* Host Level Dashboard */}
          {activeView === "host-dashboard" && <HostLevelDashboard />}

          {/* Gifting Level Dashboard */}
          {activeView === "gifting-dashboard" && <GiftingLevelDashboard />}

          {/* Level cards - overview only */}
          {activeView === "overview" && (
          <div className="space-y-4">
            {levelSystems.map((level) => (
              <div
                key={level.id}
                className="relative rounded-3xl overflow-hidden bg-white border border-gray-50 shadow-sm"
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 bg-gradient-to-r ${level.gradient}`} />

                <div className="p-4">
                  {/* 3D Icon */}
                  <div className="flex justify-center mb-3">
                    <div
                      className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
                      style={{
                        background: `linear-gradient(135deg, ${level.color}25, ${level.color}10)`,
                        border: `1px solid ${level.color}40`,
                        boxShadow: `0 6px 20px ${level.color}30, inset 0 2px 4px rgba(255,255,255,0.5)`,
                      }}
                    >
                      <span style={{ filter: `drop-shadow(0 2px 4px ${level.color}60)` }}>{level.icon}</span>
                    </div>
                  </div>

                  {/* Level number */}
                  <div className="text-center mb-3">
                    <h3 className="text-sm font-bold text-gray-800">{level.name}</h3>
                    <p className="text-2xl font-bold" style={{ color: level.color }}>
                      LV.{level.level}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs font-bold" style={{ color: level.color }}>{level.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${level.progress}%`,
                          background: `linear-gradient(to right, ${level.color}, ${level.color}cc)`,
                          boxShadow: `0 0 8px ${level.color}60`,
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5 text-center">
                      {formatNum(level.remainingXp)} XP Needed To Reach LV.{level.nextLevel}
                    </p>
                  </div>

                  {/* How To Level Up button */}
                  <button
                    onClick={() => setActiveLevel(level)}
                    className={`w-full py-2.5 rounded-xl bg-gradient-to-r ${level.gradient} text-white text-xs font-bold active:scale-95 transition shadow-sm`}
                  >
                    How To Level Up
                  </button>
                </div>
              </div>
            ))}

            {/* Level System Guide Button */}
            <button
              onClick={() => navigate("/level-system-guide")}
              className="w-full rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition mb-2"
              style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #4C1D95 100%)", boxShadow: "0 8px 24px rgba(76,29,175,0.2)" }}
            >
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                <BookOpen size={20} className="text-yellow-400" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-sm font-bold text-white">Level System Guide</h3>
                <p className="text-[10px] text-white/70">Complete guide to all four level systems</p>
              </div>
              <ChevronRight size={18} className="text-white/50" />
            </button>

            {/* Bottom navigation tiles */}
            <div className="pt-2">
              <h3 className="text-xs font-bold text-gray-700 mb-3 px-1">Explore Level Dashboards</h3>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setActiveView("overview")}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-gray-100 active:scale-95 transition"
                  style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.04)" }}
                >
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-xl shadow-md shadow-purple-200">
                    📊
                  </div>
                  <span className="text-[10px] font-bold text-gray-700">Overview</span>
                </button>
                <button
                  onClick={() => setActiveView("user-dashboard")}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-gray-100 active:scale-95 transition"
                  style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.04)" }}
                >
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl shadow-md shadow-blue-200">
                    👤
                  </div>
                  <span className="text-[10px] font-bold text-gray-700">User Level</span>
                </button>
                <button
                  onClick={() => setActiveView("host-dashboard")}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-gray-100 active:scale-95 transition"
                  style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.04)" }}
                >
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center text-xl shadow-md shadow-red-200">
                    🎙️
                  </div>
                  <span className="text-[10px] font-bold text-gray-700">Host Level</span>
                </button>
                <button
                  onClick={() => setActiveView("stream-dashboard")}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-gray-100 active:scale-95 transition"
                  style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.04)" }}
                >
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-xl shadow-md shadow-blue-200">
                    📡
                  </div>
                  <span className="text-[10px] font-bold text-gray-700">Streaming Level</span>
                </button>
                <button
                  onClick={() => setActiveView("gifting-dashboard")}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-gray-100 active:scale-95 transition col-span-2"
                  style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.04)" }}
                >
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-xl shadow-md shadow-amber-200">
                    🎁
                  </div>
                  <span className="text-[10px] font-bold text-gray-700">Gifting Level</span>
                </button>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Bottom Sheet / Modal */}
      {activeLevel && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setActiveLevel(null)}
          />

          {/* Sheet */}
          <div className="relative w-full max-w-md bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-fadeIn">
            {/* Drag handle */}
            <div className="sticky top-0 bg-white pt-3 pb-2 z-10">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
              <div className="flex items-center justify-between px-4">
                <h2 className="text-sm font-bold text-gray-800">{activeLevel.name} Details</h2>
                <button onClick={() => setActiveLevel(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="px-4 pb-6 space-y-4">
              {/* 3D Icon + level */}
              <div className="flex flex-col items-center py-2">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${activeLevel.color}25, ${activeLevel.color}10)`,
                    border: `1px solid ${activeLevel.color}40`,
                    boxShadow: `0 6px 20px ${activeLevel.color}30, inset 0 2px 4px rgba(255,255,255,0.5)`,
                  }}
                >
                  <span style={{ filter: `drop-shadow(0 2px 4px ${activeLevel.color}60)` }}>{activeLevel.icon}</span>
                </div>
                <p className="text-2xl font-bold" style={{ color: activeLevel.color }}>
                  LV.{activeLevel.level}
                </p>
              </div>

              {/* About */}
              <div className="rounded-2xl p-3 bg-gray-50">
                <h3 className="text-xs font-bold text-gray-700 mb-1">About {activeLevel.name}</h3>
                <p className="text-xs text-gray-500">{activeLevel.about}</p>
              </div>

              {/* How to increase */}
              <div className="rounded-2xl p-3 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-700 mb-2">How To Increase {activeLevel.name}</h3>
                <div className="space-y-2">
                  {activeLevel.howToIncrease.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${activeLevel.color}20` }}>
                        <Check size={12} style={{ color: activeLevel.color }} />
                      </div>
                      <span className="text-xs text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current level requirement */}
              <div className="rounded-2xl p-3" style={{ background: `${activeLevel.color}10`, border: `1px solid ${activeLevel.color}20` }}>
                <h3 className="text-xs font-bold mb-2" style={{ color: activeLevel.color }}>Current Level Requirement</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Level Range</span>
                    <span className="text-xs font-bold text-gray-700">{activeLevel.levelRange}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Coins size={12} /> Coins Required
                    </span>
                    <span className="text-xs font-bold text-gray-700">{activeLevel.coinsRequired}</span>
                  </div>
                </div>
              </div>

              {/* Progress info */}
              <div className="rounded-2xl p-3 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Progress to LV.{activeLevel.nextLevel}</span>
                  <span className="text-xs font-bold" style={{ color: activeLevel.color }}>{activeLevel.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${activeLevel.progress}%`, background: `linear-gradient(to right, ${activeLevel.color}, ${activeLevel.color}cc)` }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1.5 text-center">
                  {formatNum(activeLevel.remainingXp)} XP Needed To Reach LV.{activeLevel.nextLevel}
                </p>
              </div>

              {/* Description */}
              <div className="rounded-2xl p-3 bg-gray-50">
                <h3 className="text-xs font-bold text-gray-700 mb-1">Short Description</h3>
                <p className="text-xs text-gray-500">{activeLevel.description}</p>
              </div>

              {/* Icon system */}
              <div className="rounded-2xl p-3 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-700 mb-2">Premium Level Icon System</h3>
                <div className="grid grid-cols-2 gap-2">
                  {activeLevel.iconSystem.map((icon, i) => {
                    const isUnlocked = i <= Math.floor((activeLevel.level - 1) / 5);
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-2 p-2 rounded-xl ${isUnlocked ? "bg-gray-50" : "bg-gray-50 opacity-40"}`}
                      >
                        <span className="text-lg">{isUnlocked ? icon.icon : "🔒"}</span>
                        <span className="text-[10px] font-medium text-gray-600 flex-1">{icon.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}