import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { COLORS } from "@/components/profile-stats/profileStatsData";
import { useProfileStats } from "@/hooks/useProfileStats";
import BadgeTab from "@/components/profile-stats/BadgeTab";
import MedalTab from "@/components/profile-stats/MedalTab";
import LevelXPTab from "@/components/profile-stats/LevelXPTab";
import HistoryTab from "@/components/profile-stats/HistoryTab";
import LeaderboardTab from "@/components/profile-stats/LeaderboardTab";
import { useBackNav } from "@/hooks/useBackNav";

const tabs = [
  { key: "badges", label: "Badges", icon: "🏅" },
  { key: "medals", label: "Medals", icon: "🎖️" },
  { key: "level", label: "Level & XP", icon: "📈" },
  { key: "history", label: "History", icon: "📋" },
  { key: "leaderboard", label: "Ranking", icon: "🏆" },
];

export default function ProfileStats() {
  const navigate = useNavigate();
  const handleBack = useBackNav("/more-services");
  const [activeTab, setActiveTab] = useState("badges");
  const { profile, user, badges, achievements, transactions, leaderboard, loading } = useProfileStats();

  const profileStats = [
    { label: "Followers", value: profile?.followers || 0, icon: "👥", color: "#3B82F6" },
    { label: "Following", value: profile?.following || 0, icon: "➡️", color: "#10B981" },
    { label: "Friends", value: profile?.friends || 0, icon: "🤝", color: "#8B5CF6" },
    { label: "Visitors", value: profile?.visitors || 0, icon: "👀", color: "#EC4899" },
    { label: "Gifts Received", value: profile?.gifts_received || 0, icon: "🎁", color: "#F59E0B" },
    { label: "Gifts Sent", value: profile?.gifts_sent || 0, icon: "💝", color: "#EF4444" },
    { label: "Coins", value: profile?.coins || 0, icon: "💰", color: "#FFC83D" },
    { label: "Total XP", value: profile?.total_xp || 0, icon: "⚡", color: "#6366F1" },
  ];

  const achievementStats = [
    { label: "Achievements", value: achievements.length, icon: "🏆", color: "#FFC83D" },
    { label: "Badges", value: badges.length, icon: "🏅", color: "#3B82F6" },
    { label: "User Level", value: profile?.user_level || 1, icon: "📈", color: "#8B5CF6" },
    { label: "Host Level", value: profile?.host_level || 1, icon: "🎤", color: "#EF4444" },
    { label: "Gifting Level", value: profile?.gifting_level || 1, icon: "💝", color: "#F59E0B" },
    { label: "Streaming Lv", value: profile?.streaming_level || 1, icon: "📺", color: "#06B6D4" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: COLORS.white }}>
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: COLORS.white }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 px-4 py-3 flex items-center gap-3" style={{ background: `${COLORS.white}f0`, backdropFilter: "blur(20px)", borderBottom: "1px solid #EEF0F4" }}>
          <button onClick={handleBack} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: COLORS.cardBg }}>
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
          {activeTab === "badges" && <BadgeTab badges={badges} />}
          {activeTab === "medals" && <MedalTab />}
          {activeTab === "level" && <LevelXPTab profile={profile} />}
          {activeTab === "history" && <HistoryTab transactions={transactions} />}
          {activeTab === "leaderboard" && <LeaderboardTab leaderboard={leaderboard} currentUserId={user?.id} />}
        </div>
      </div>
    </div>
  );
}