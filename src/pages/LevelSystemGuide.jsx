import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Check, Star, Crown, Sparkles, Award } from "lucide-react";
import { LEVEL_GUIDE } from "@/components/levels/levelGuideData";

export default function LevelSystemGuide() {
  const navigate = useNavigate();
  const [expandedLevel, setExpandedLevel] = useState(null);

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid #F0F1F5" }}>
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "#F7F9FC" }}>
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-gray-800">Level System Guide</h1>
            <p className="text-[10px] text-gray-400">VYRO Live Connect Earning</p>
          </div>
          <Sparkles size={18} className="text-purple-500" />
        </div>

        {/* Hero */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 relative overflow-hidden bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600 text-white shadow-lg shadow-purple-200">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FFFFFF, transparent 70%)", transform: "translate(30%, -30%)" }} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <Crown size={18} />
                <h2 className="text-sm font-bold">VYRO Live Connect Earning</h2>
              </div>
              <p className="text-xs text-white/80">Four independent level systems track your growth. Master them all to unlock legendary rewards.</p>
            </div>
          </div>
        </div>

        {/* Level sections */}
        <div className="px-4 pt-4 space-y-3">
          {LEVEL_GUIDE.levels.map((level) => {
            const isOpen = expandedLevel === level.id;
            return (
              <div key={level.id} className="rounded-2xl overflow-hidden bg-white border border-gray-100" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
                {/* Top bar */}
                <div className={`h-1.5 bg-gradient-to-r ${level.gradient}`} />

                {/* Header row */}
                <button
                  onClick={() => setExpandedLevel(isOpen ? null : level.id)}
                  className="w-full p-4 flex items-center gap-3 active:scale-[0.98] transition"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${level.gradient}`} style={{ boxShadow: `0 4px 12px ${level.color}30` }}>
                    <span style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }}>{level.icon}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-bold text-gray-800">{level.name}</h3>
                    <p className="text-[10px] font-semibold" style={{ color: level.color }}>{level.range}</p>
                  </div>
                  <ChevronRight size={20} className={`text-gray-300 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="px-4 pb-4 space-y-3 animate-fadeIn">
                    {/* What is */}
                    <div className="rounded-xl p-3 bg-gray-50">
                      <h4 className="text-xs font-bold text-gray-700 mb-1">What is {level.name}?</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{level.whatIs}</p>
                    </div>

                    {/* How to increase */}
                    <div className="rounded-xl p-3 border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-700 mb-2">How to Increase {level.name}</h4>
                      <div className="grid grid-cols-1 gap-1.5">
                        {level.howToIncrease.map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${level.color}20` }}>
                              <Check size={12} style={{ color: level.color }} />
                            </div>
                            <span className="text-xs text-gray-600">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="rounded-xl p-3 border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-700 mb-2">{level.name} Benefits</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {level.benefits.map((b, i) => (
                          <span key={i} className="text-[10px] px-2.5 py-1 rounded-full font-medium" style={{ background: `${level.color}10`, color: level.color }}>
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Premium 3D Icons */}
                    <div className="rounded-xl p-3 border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-700 mb-2">Premium 3D Level Icons</h4>
                      <div className="flex flex-wrap gap-2">
                        {level.iconSystem.map((iconName, i) => (
                          <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: `${level.color}08` }}>
                            <Star size={10} style={{ color: level.color, fill: level.color }} />
                            <span className="text-[10px] font-medium text-gray-600">{iconName}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rule */}
                    <div className="rounded-xl p-3" style={{ background: `${level.color}10`, border: `1px solid ${level.color}20` }}>
                      <h4 className="text-xs font-bold mb-1" style={{ color: level.color }}>Level Rule</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{level.rule}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Example section */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 bg-white border border-gray-100" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Award size={16} className="text-purple-500" />
              <h3 className="text-sm font-bold text-gray-800">Example: Multiple Levels</h3>
            </div>
            <p className="text-xs text-gray-500 mb-3">A user can have multiple levels at the same time:</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {LEVEL_GUIDE.example.multiLevel.map((m, i) => (
                <div key={i} className="rounded-xl p-3 text-center" style={{ background: `${m.color}10`, border: `1px solid ${m.color}20` }}>
                  <p className="text-[10px] text-gray-500">{m.label}</p>
                  <p className="text-lg font-bold" style={{ color: m.color }}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* Scenario */}
            <div className="space-y-3">
              <div className="rounded-xl p-3 bg-gray-50">
                <h4 className="text-xs font-bold text-gray-700 mb-2">If a user:</h4>
                <div className="space-y-1.5">
                  {LEVEL_GUIDE.example.scenarioGifting.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100">
                        <Check size={12} className="text-amber-600" />
                      </div>
                      <span className="text-xs text-gray-600">{s}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] font-semibold text-gray-700 mt-2">→ User Level and Gifting Level increase</p>
              </div>

              <div className="rounded-xl p-3 bg-gray-50">
                <h4 className="text-xs font-bold text-gray-700 mb-2">If the same user also hosts live streams:</h4>
                <div className="space-y-1.5">
                  {LEVEL_GUIDE.example.scenarioHosting.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100">
                        <Check size={12} className="text-red-500" />
                      </div>
                      <span className="text-xs text-gray-600">{s}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] font-semibold text-gray-700 mt-2">→ Host Level and Streaming Level increase</p>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 mt-3 text-center leading-relaxed">
              All four level systems are independent and progress separately based on different activities.
            </p>
          </div>
        </div>

        {/* Ultimate Rewards */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #4C1D95 50%, #831843 100%)" }}>
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #FFFFFF, transparent 70%)", transform: "translate(30%, -30%)" }} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Crown size={18} className="text-yellow-400" />
                <h3 className="text-sm font-bold text-white">Ultimate Rewards</h3>
              </div>
              <div className="space-y-3">
                {LEVEL_GUIDE.ultimateRewards.map((reward, i) => (
                  <div key={i} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{reward.icon}</span>
                      <h4 className="text-xs font-bold text-white">{reward.tier}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {reward.rewards.map((r, j) => (
                        <span key={j} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${reward.color}30`, color: "#FFFFFF" }}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}