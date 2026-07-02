import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { COLORS } from "@/components/tasks-rewards/tasksData";
import TaskCenterTab from "@/components/tasks-rewards/TaskCenterTab";
import RewardCenterTab from "@/components/tasks-rewards/RewardCenterTab";
import DailyBonusTab from "@/components/tasks-rewards/DailyBonusTab";
import EventsTab from "@/components/tasks-rewards/EventsTab";
import AchievementTab from "@/components/tasks-rewards/AchievementTab";

const tabs = [
  { key: "task-center", label: "Tasks", icon: "📋" },
  { key: "reward-center", label: "Rewards", icon: "🎁" },
  { key: "daily-bonus", label: "Daily Bonus", icon: "📅" },
  { key: "events", label: "Events", icon: "🎉" },
  { key: "achievements", label: "Achievement", icon: "🏆" },
];

export default function TasksRewards() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("task-center");

  return (
    <div className="min-h-screen" style={{ background: COLORS.white }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 px-4 py-3 flex items-center gap-3" style={{ background: `${COLORS.white}f0`, backdropFilter: "blur(20px)", borderBottom: "1px solid #EEF0F4" }}>
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: COLORS.cardBg }}>
            <ArrowLeft size={18} style={{ color: COLORS.navy }} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold" style={{ color: COLORS.navy }}>Tasks & Rewards</h1>
            <p className="text-[10px]" style={{ color: COLORS.muted }}>Complete tasks, earn rewards</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: `${COLORS.gold}15` }}>
            <span className="text-sm">🪙</span>
            <span className="text-xs font-bold" style={{ color: COLORS.gold }}>12,450</span>
          </div>
        </div>

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
          {activeTab === "task-center" && <TaskCenterTab />}
          {activeTab === "reward-center" && <RewardCenterTab />}
          {activeTab === "daily-bonus" && <DailyBonusTab />}
          {activeTab === "events" && <EventsTab />}
          {activeTab === "achievements" && <AchievementTab />}
        </div>
      </div>
    </div>
  );
}