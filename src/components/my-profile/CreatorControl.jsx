import React from "react";
import { useNavigate } from "react-router-dom";
import { Video, BarChart3, DollarSign, Users, FileText, Calendar, ListChecks, Megaphone } from "lucide-react";

const CREATOR_OPTIONS = [
  { label: "Creator Dashboard", icon: Video, path: "/creator-center" },
  { label: "Live Analytics", icon: BarChart3, path: "/profile-stats" },
  { label: "Revenue Analytics", icon: DollarSign, path: "/finance" },
  { label: "Audience Insights", icon: Users, path: "/profile-stats" },
  { label: "Performance Reports", icon: FileText, path: "/profile-stats" },
  { label: "Event Participation", icon: Calendar, path: "/tasks-rewards" },
  { label: "Creator Tasks", icon: ListChecks, path: "/tasks-rewards" },
  { label: "Official Campaigns", icon: Megaphone, path: "/tasks-rewards" },
];

export default function CreatorControl({ profile }) {
  const navigate = useNavigate();
  if (!profile?.is_host && !profile?.is_creator) return null;

  return (
    <div className="px-3 pt-4">
      <h2 className="text-sm font-bold text-gray-800 mb-2 px-1">🎬 Creator Control</h2>
      <div className="bg-white rounded-2xl border border-gray-50 shadow-sm divide-y divide-gray-50">
        {CREATOR_OPTIONS.map((opt) => (
          <button key={opt.label} onClick={() => navigate(opt.path)} className="w-full flex items-center gap-3 p-3 active:bg-gray-50 transition">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
              <opt.icon size={16} className="text-white" />
            </div>
            <span className="text-xs font-medium text-gray-700 flex-1 text-left">{opt.label}</span>
            <span className="text-gray-300">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}