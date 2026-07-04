import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { COLORS } from "@/components/tasks-rewards/tasksData";
import TaskCenterTab from "@/components/tasks-rewards/TaskCenterTab";
import RewardCenterTab from "@/components/tasks-rewards/RewardCenterTab";
import DailyBonusTab from "@/components/tasks-rewards/DailyBonusTab";
import EventsTab from "@/components/tasks-rewards/EventsTab";
import AchievementTab from "@/components/tasks-rewards/AchievementTab";
import { useBackNav } from "@/hooks/useBackNav";

const tabs = [
  { key: "task-center", label: "Tasks", icon: "📋" },
  { key: "reward-center", label: "Rewards", icon: "🎁" },
  { key: "daily-bonus", label: "Daily Bonus", icon: "📅" },
  { key: "events", label: "Events", icon: "🎉" },
  { key: "achievements", label: "Achievement", icon: "🏆" },
];

export default function TasksRewards() {
  const navigate = useNavigate();
  const handleBack = useBackNav("/more-services");
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("task-center");
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (!user?.id) return;
    const loadProfile = async () => {
      try {
        let p = await base44.entities.UserProfile.filter({ user_id: user.id });
        if (p.length === 0) p = await base44.entities.UserProfile.filter({ created_by_id: user.id });
        if (p.length > 0) setCoins(p[0].coins || 0);
      } catch (e) {}
    };
    loadProfile();
    let unsub;
    try { unsub = base44.entities.UserProfile?.subscribe?.(() => loadProfile()); } catch (e) {}
    return () => { try { unsub?.(); } catch (e) {} };
  }, [user?.id]);

  return (
    <div className="min-h-screen" style={{ background: COLORS.white }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 px-4 py-3 flex items-center gap-3" style={{ background: `${COLORS.white}f0`, backdropFilter: "blur(20px)", borderBottom: "1px solid #EEF0F4" }}>
          <button onClick={handleBack} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: COLORS.cardBg }}>
            <ArrowLeft size={18} style={{ color: COLORS.navy }} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold" style={{ color: COLORS.navy }}>Tasks & Rewards</h1>
            <p className="text-[10px]" style={{ color: COLORS.muted }}>Complete tasks, earn rewards</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: `${COLORS.gold}15` }}>
            <span className="text-sm">🪙</span>
            <span className="text-xs font-bold" style={{ color: COLORS.gold }}>{coins.toLocaleString()}</span>
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