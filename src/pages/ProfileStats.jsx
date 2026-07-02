import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { COLORS, profileStats, achievementStats } from "@/components/profile-stats/profileStatsData";
import BadgeTab from "@/components/profile-stats/BadgeTab";
import MedalTab from "@/components/profile-stats/MedalTab";
import LevelXPTab from "@/components/profile-stats/LevelXPTab";
import HistoryTab from "@/components/profile-stats/HistoryTab";
import LeaderboardTab from "@/components/profile-stats/LeaderboardTab";

const tabs = [
  { key: "badges", label: "Badges", icon: "🏅" },
  { key: "medals", label: "Medals", icon: "🎖️" },
  { key: "level", label: "Level & XP", icon: "📈" },
  { key: "history", label: "History", icon: "📋" },
  { key: "leaderboard", label: "Ranking", icon: "🏆" },
];

export default function ProfileStats() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("badges");

  return (
    <div className="min-h-screen" style={{ background: COLORS.white }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 px-4 py-3 flex items-center gap-3" style={{ background: `${COLORS.white}f0`, backdropFilter: "blur(20px)", borderBottom: "1px solid #EEF0F4" }}>
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: COLORS.cardBg }}>
            <ArrowLeft size={18} style={{ color: COLORS.navy }} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold" style={{ color: COLORS.navy }}>Profile & Stats</h1>
            <p className="text-[10px]" style={{ color: COLORS.muted }}>Your badges, medals & statistics</p>
          </div>
        </div>

        {/* Statistics summary */}
        {activeTab === "badges" && (
          <div className="px-4 pt-3">
            {/* Profile Stats */}
            <div className="rounded-2xl p-3 mb-3" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
              <h3 className="text-xs font-bold mb-2.5" style={{ color: COLORS.navy }}>Profile Statistics</h3>
              <div className="grid grid-cols-4 gap-2">
                {profileStats.map((s) => (
                  <div key={s.label} className="text-center">
                    <span className="text-lg block mb-0.5">{s.icon}</span>
                    <p className="text-xs font-bold" style={{ color: s.color }}>{s.value.toLocaleString()}</p>
                    <p className="text-[8px]" style={{ color: COLORS.muted }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Achievement Stats */}
            <div className="rounded-2xl p-3 mb-3" style={{ background: `${COLORS.gold}08`, border: `1px solid ${COLORS.gold}20` }}>
              <h3 className="text-xs font-bold mb-2.5" style={{ color: COLORS.navy }}>Achievement Statistics</h3>
              <div className="grid grid-cols-3 gap-2">
                {achievementStats.map((s) => (
                  <div key={s.label} className="text-center">
                    <span className="text-lg block mb-0.5">{s.icon}</span>
                    <p className="text-sm font-bold" style={{ color: s.color }}>{s.value.toLocaleString()}</p>
                    <p className="text-[8px]" style={{ color: COLORS.muted }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="sticky top-[57px] z-10 px-4 pt-3 pb-2" style={{ background: `${COLORS.white}f0`, backdropFilter: "blur(20px)" }}>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {tabs.map((t) => (
                <button key={t.key} onClick={() => setActiveTab(t.key)}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold transition active:scale-95 whitespace-nowrap flex items-center gap-1.5 ${activeTab === t.key ? "text-white" : ""}`}
                  style={activeTab === t.key
                    ? { background: COLORS.primary, boxShadow: `0 3px 10px ${COLORS.primary}40` }
                    : { background: COLORS.cardBg, color: COLORS.muted, border: "1px solid #EEF0F4" }}>
                  <span>{t.icon}</span> {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === "badges" && <BadgeTab />}
          {activeTab === "medals" && <MedalTab />}
          {activeTab === "level" && <LevelXPTab />}
          {activeTab === "history" && <HistoryTab />}
          {activeTab === "leaderboard" && <LeaderboardTab />}
        </div>
      </div>
    </div>
  );
}