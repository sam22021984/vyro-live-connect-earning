import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListChecks, Gift } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DAILY_TASKS = [
  { name: "Daily Login", reward: 50, progress: 100, claimed: true },
  { name: "Watch Live", reward: 30, progress: 60, claimed: false },
  { name: "Send Gifts", reward: 100, progress: 0, claimed: false },
  { name: "Follow Users", reward: 20, progress: 50, claimed: false },
  { name: "Share Content", reward: 40, progress: 0, claimed: false },
  { name: "Invite Friends", reward: 200, progress: 0, claimed: false },
];

const WEEKLY_TASKS = [
  { name: "Complete Live Hours", reward: 500, progress: 30, claimed: false },
  { name: "Spend 1000 Coins", reward: 300, progress: 15, claimed: false },
  { name: "Make 3 New Friends", reward: 150, progress: 66, claimed: false },
  { name: "Participate in Events", reward: 250, progress: 0, claimed: false },
];

function TaskCard({ task }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const completed = task.progress >= 100;

  return (
    <div className="bg-white rounded-2xl border border-gray-50 shadow-sm p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
            <ListChecks size={14} className="text-purple-500" />
          </div>
          <span className="text-xs font-bold text-gray-700">{task.name}</span>
        </div>
        <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-600">
          <Gift size={10} /> {task.reward}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all" style={{ width: `${task.progress}%` }} />
        </div>
        <span className="text-[9px] text-gray-400 font-medium">{task.progress}%</span>
        {task.claimed ? (
          <span className="text-[9px] font-bold text-green-500 px-2">✓ Done</span>
        ) : completed ? (
          <button onClick={() => toast({ title: `Claimed ${task.reward} coins!` })} className="px-3 py-1 rounded-lg text-[9px] font-bold text-white bg-green-500 active:scale-95">
            Claim
          </button>
        ) : (
          <button onClick={() => navigate("/tasks-rewards")} className="px-2 py-1 rounded-lg text-[9px] font-bold text-purple-600 bg-purple-50 active:scale-95">
            Go
          </button>
        )}
      </div>
    </div>
  );
}

export default function TasksCenter({ profile }) {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState("daily");

  return (
    <div className="px-3 pt-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-1.5"><ListChecks size={14} className="text-teal-500" /> Tasks Center</h2>
        <button onClick={() => navigate("/tasks-rewards")} className="text-[10px] text-purple-500 font-bold">View All ›</button>
      </div>
      <div className="flex gap-1 mb-2">
        <button onClick={() => setTab("daily")} className={`px-3 py-1.5 rounded-full text-xs font-bold ${tab === "daily" ? "bg-purple-500 text-white" : "bg-gray-50 text-gray-500"}`}>Daily</button>
        <button onClick={() => setTab("weekly")} className={`px-3 py-1.5 rounded-full text-xs font-bold ${tab === "weekly" ? "bg-purple-500 text-white" : "bg-gray-50 text-gray-500"}`}>Weekly</button>
      </div>
      <div className="space-y-2">
        {(tab === "daily" ? DAILY_TASKS : WEEKLY_TASKS).map((task) => (
          <TaskCard key={task.name} task={task} />
        ))}
      </div>
    </div>
  );
}