import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { tasks as staticTasks } from "@/components/tasks-rewards/tasksData";

export function useUserTasks() {
  const { user } = useAuth();
  const [userTasks, setUserTasks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }
    loadUserTasks();
  }, [user?.id]);

  const loadUserTasks = async () => {
    try {
      const records = await base44.entities.UserTask.filter({ user_id: user.id });
      const map = {};
      records.forEach((r) => { map[r.task_id] = r; });
      setUserTasks(map);
    } catch (e) {
      // first-time users have no records
    }
    setLoading(false);
  };

  const getMergedTasks = (category) => {
    return staticTasks[category].map((task) => {
      const ut = userTasks[task.id];
      if (ut) return { ...task, status: ut.status, progress: ut.progress };
      return task;
    });
  };

  const saveTask = useCallback(async (task, category) => {
    const existing = userTasks[task.id];
    const payload = {
      user_id: user.id,
      task_id: task.id,
      category,
      status: task.status,
      progress: task.progress,
      reward_type: task.reward_type,
      reward_amount: task.reward_amount,
    };
    if (existing?.id) {
      const updated = await base44.entities.UserTask.update(existing.id, payload);
      setUserTasks((prev) => ({ ...prev, [task.id]: updated }));
    } else {
      const created = await base44.entities.UserTask.create(payload);
      setUserTasks((prev) => ({ ...prev, [task.id]: created }));
    }
  }, [user, userTasks]);

  const claimReward = useCallback(async (task, category) => {
    const existing = userTasks[task.id];
    const payload = {
      user_id: user.id,
      task_id: task.id,
      category,
      status: "claimed",
      progress: task.progress,
      reward_type: task.reward_type,
      reward_amount: task.reward_amount,
      claimed_date: new Date().toISOString(),
    };
    if (existing?.id) {
      const updated = await base44.entities.UserTask.update(existing.id, payload);
      setUserTasks((prev) => ({ ...prev, [task.id]: updated }));
    } else {
      const created = await base44.entities.UserTask.create(payload);
      setUserTasks((prev) => ({ ...prev, [task.id]: created }));
    }

    // Centralized: credit coins + XP, create Transaction, send Notification — atomically on backend
    try {
      await base44.functions.invoke("claimReward", {
        action: "claim",
        reward_type: task.reward_type,
        reward_amount: task.reward_amount,
        reward_name: `${task.reward_amount} ${task.reward_type}`,
        source: "task",
        task_id: task.id,
        icon: task.reward_icon,
      });
    } catch (e) {
      // UserTask is already marked claimed; coin credit may still succeed on retry
      console.error("Reward credit failed:", e);
    }
  }, [user, userTasks]);

  return { getMergedTasks, saveTask, claimReward, loading };
}