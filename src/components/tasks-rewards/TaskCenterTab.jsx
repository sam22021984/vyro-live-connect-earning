import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { X, Target, Gift, Clock, TrendingUp } from "lucide-react";
import { taskCategories, tasks, COLORS } from "./tasksData";
import TaskCard from "./TaskCard";

export default function TaskCenterTab() {
  const [cat, setCat] = useState("daily");
  const [taskList, setTaskList] = useState(tasks);
  const [detailTask, setDetailTask] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAction = (task) => {
    setTaskList((prev) => ({
      ...prev,
      [cat]: prev[cat].map((t) => {
        if (t.id !== task.id) return t;
        if (t.status === "not_started") {
          toast({ title: "📋 Task Started!", description: t.title });
          return { ...t, status: "in_progress", progress: t.progress > 0 ? t.progress : 1 };
        }
        if (t.status === "in_progress") {
          if (task.action_path && task.action_path !== "/") navigate(task.action_path);
          return t;
        }
        if (t.status === "completed") {
          toast({ title: "🎉 Reward Claimed!", description: `${t.reward_amount} ${t.reward_type} added to your wallet.` });
          return { ...t, status: "claimed" };
        }
        return t;
      }),
    }));
  };

  const handleView = (task) => setDetailTask(task);

  return (
    <div>
      <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
        {taskCategories.map((c) => (
          <button key={c.key} onClick={() => setCat(c.key)}
            className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap active:scale-95 transition flex items-center gap-1.5 ${cat === c.key ? "text-white" : ""}`}
            style={cat === c.key ? { background: COLORS.primary } : { background: COLORS.cardBg, color: COLORS.muted, border: "1px solid #EEF0F4" }}>
            <span>{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

      {taskList[cat].map((t) => (
        <TaskCard key={t.id} task={t} onAction={handleAction} onView={handleView} />
      ))}

      {detailTask && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetailTask(null)} />
          <div className="relative w-full max-w-md bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto animate-fadeIn">
            <div className="sticky top-0 bg-white pt-3 pb-2 z-10">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
              <div className="flex items-center justify-between px-4">
                <h2 className="text-sm font-bold" style={{ color: COLORS.navy }}>{detailTask.title}</h2>
                <button onClick={() => setDetailTask(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="px-4 pb-6 space-y-3">
              <div className="flex flex-col items-center py-3">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-2" style={{ background: `${COLORS.primary}15`, border: `1px solid ${COLORS.primary}30` }}>
                  {detailTask.reward_icon}
                </div>
                <p className="text-xs" style={{ color: COLORS.muted }}>{detailTask.description}</p>
              </div>
              <div className="rounded-2xl p-3 space-y-2.5" style={{ background: COLORS.cardBg }}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] flex items-center gap-1.5" style={{ color: COLORS.muted }}><Target size={13} /> Target</span>
                  <span className="text-[11px] font-bold" style={{ color: COLORS.navy }}>{detailTask.progress}/{detailTask.target}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] flex items-center gap-1.5" style={{ color: COLORS.muted }}><Gift size={13} /> Reward</span>
                  <span className="text-[11px] font-bold" style={{ color: COLORS.gold }}>{detailTask.reward_amount} {detailTask.reward_type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] flex items-center gap-1.5" style={{ color: COLORS.muted }}><Clock size={13} /> Time Left</span>
                  <span className="text-[11px] font-bold" style={{ color: COLORS.danger }}>{detailTask.time_left}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] flex items-center gap-1.5" style={{ color: COLORS.muted }}><TrendingUp size={13} /> Progress</span>
                  <span className="text-[11px] font-bold" style={{ color: COLORS.primary }}>{Math.round((detailTask.progress / detailTask.target) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}