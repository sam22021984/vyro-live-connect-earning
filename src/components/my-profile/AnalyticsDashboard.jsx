import React from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Eye, UserPlus, UserMinus, Clock, Globe, TrendingUp, Video } from "lucide-react";

export default function AnalyticsDashboard({ profile }) {
  const navigate = useNavigate();

  const analytics = [
    { label: "Profile Views", value: profile?.visitors || 0, icon: Eye, color: "text-blue-500" },
    { label: "New Followers", value: 0, icon: UserPlus, color: "text-green-500" },
    { label: "Lost Followers", value: 0, icon: UserMinus, color: "text-red-500" },
    { label: "Engagement", value: "—%", icon: TrendingUp, color: "text-purple-500" },
    { label: "Avg Watch", value: "0m", icon: Clock, color: "text-orange-500" },
    { label: "Peak Time", value: "—", icon: Clock, color: "text-cyan-500" },
  ];

  return (
    <div className="px-3 pt-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-1.5"><BarChart3 size={14} className="text-cyan-500" /> Analytics Dashboard</h2>
        <button onClick={() => navigate("/profile-stats")} className="text-[10px] text-purple-500 font-bold">Details ›</button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-50 shadow-sm p-3">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {analytics.map((a) => (
            <div key={a.label} className="flex flex-col items-center py-2">
              <a.icon size={14} className={a.color} />
              <span className={`text-sm font-bold ${a.color} mt-0.5`}>{a.value}</span>
              <span className="text-[8px] text-gray-400 text-center">{a.label}</span>
            </div>
          ))}
        </div>
        {/* Mini chart placeholder */}
        <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 p-3 mb-2">
          <div className="flex items-center gap-1.5 mb-2">
            <Globe size={12} className="text-blue-500" />
            <span className="text-[10px] font-bold text-gray-600">Top Countries</span>
          </div>
          <div className="flex items-end gap-1 h-12">
            {[60, 40, 30, 20, 15].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-blue-400 to-cyan-300" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <button onClick={() => navigate("/profile-stats")} className="w-full py-2 rounded-xl bg-gray-50 text-gray-600 text-xs font-bold active:scale-95 border border-gray-100">
          View Full Analytics
        </button>
      </div>
    </div>
  );
}