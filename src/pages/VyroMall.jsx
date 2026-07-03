import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Coins, Sparkles, TrendingUp, Shield, Check } from "lucide-react";
import { mallSections, rarityStyles } from "@/components/mall/mallData";
import MallItemCard from "@/components/mall/MallItemCard";
import { useServicesData } from "@/hooks/useServicesData";

export default function VyroMall() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const { data } = useServicesData();
  const userCoins = data?.mall?.coins || 0;

  const section = mallSections.find((s) => s.id === activeSection) || mallSections[0];

  return (
    <div className="min-h-screen bg-[#0A0118]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-[#0A0118]/90 backdrop-blur-xl border-b border-orange-500/20">
          <div className="px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => navigate("/more-services")}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition"
            >
              <ArrowLeft size={18} className="text-orange-400" />
            </button>
            <div className="flex items-center gap-2 flex-1">
              <span className="text-lg">🛒</span>
              <div>
                <h1 className="text-sm font-bold bg-gradient-to-r from-orange-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  VYRO MALL
                </h1>
                <p className="text-[9px] text-gray-400 -mt-0.5">Premium Digital Marketplace</p>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Coins size={13} className="text-amber-400" />
              <span className="text-xs font-bold text-amber-300">{userCoins.toLocaleString()}</span>
            </div>
          </div>

          {/* Scrollable section tab bar */}
          <div className="overflow-x-auto scrollbar-hide px-2 pb-2">
            <div className="flex gap-1.5 min-w-max">
              {mallSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeSection === s.id
                      ? `bg-gradient-to-r ${s.gradient} text-white shadow-lg`
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                  style={activeSection === s.id ? { boxShadow: `0 4px 12px ${s.color}40` } : {}}
                >
                  <span className="text-sm">{s.icon}</span>
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section content */}
        <div className="p-4 space-y-4 animate-fadeIn pb-8">
          {/* Section hero banner */}
          <div
            className="rounded-2xl p-4 border"
            style={{
              background: `linear-gradient(135deg, ${section.color}25, ${section.color}05)`,
              borderColor: `${section.color}30`,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{
                  background: `linear-gradient(135deg, ${section.color}30, ${section.color}10)`,
                  border: `1px solid ${section.color}40`,
                  boxShadow: `0 4px 12px ${section.color}25, inset 0 1px 3px rgba(255,255,255,0.1)`,
                }}
              >
                <span style={{ filter: `drop-shadow(0 2px 3px ${section.color}60)` }}>{section.icon}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-bold text-white">{section.name}</h2>
                <p className="text-[10px] font-medium" style={{ color: section.color }}>{section.subtitle}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">{section.description}</p>
          </div>

          {/* Home: showcase banners */}
          {section.id === "home" && (
            <div className="space-y-3">
              {section.banners.map((banner, i) => {
                const colors = ["#F97316", "#A855F7", "#3B82F6", "#EC4899", "#F59E0B", "#10B981", "#EF4444"];
                const c = colors[i % colors.length];
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-4 border flex items-center gap-3 active:scale-[0.98] transition cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${c}20, ${c}05)`,
                      borderColor: `${c}30`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${c}25`, border: `1px solid ${c}40` }}
                    >
                      <Sparkles size={18} style={{ color: c }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white">{banner}</h3>
                      <p className="text-[10px] text-gray-400">Tap to explore collection</p>
                    </div>
                    <TrendingUp size={16} style={{ color: c }} />
                  </div>
                );
              })}

              {/* Global mall features */}
              <div className="rounded-2xl p-4 bg-white/5 border border-white/5 mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={14} className="text-orange-400" />
                  <h3 className="text-xs font-bold text-gray-200">Mall Features</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["3D Premium Item Cards", "Luxury Animation Effects", "Gold / Diamond / Neon Themes", "Real-Time Preview System", "Activate & Equip System", "Gift & Collection System"].map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 p-2 rounded-lg bg-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                      <span className="text-[10px] text-gray-300">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Non-home: show items grid + features */}
          {section.id !== "home" && (
            <>
              {/* Items grid */}
              {section.items.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {section.items.map((item, i) => (
                    <MallItemCard key={i} item={item} sectionColor={section.color} />
                  ))}
                </div>
              )}

              {/* Features list */}
              {section.features && section.features.length > 0 && (
                <div className="rounded-2xl p-4 bg-white/5 border border-white/5">
                  <h3 className="text-xs font-bold text-gray-200 mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {section.features.map((f, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                        style={{ background: `${section.color}15`, color: section.color, border: `1px solid ${section.color}25` }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Available actions */}
              {section.actions && section.actions.length > 0 && (
                <div className="rounded-2xl p-4 border" style={{ background: `${section.color}08`, borderColor: `${section.color}20` }}>
                  <h3 className="text-xs font-bold mb-2" style={{ color: section.color }}>Available Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {section.actions.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${section.color}25` }}>
                          <Check size={9} style={{ color: section.color }} />
                        </div>
                        <span className="text-[10px] text-gray-300">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}