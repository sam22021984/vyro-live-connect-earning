import React from "react";
import { useNavigate } from "react-router-dom";
import { PartyPopper, Users, Clock, Trophy, Plus, Settings, History } from "lucide-react";

export default function PartyCenter({ profile }) {
  const navigate = useNavigate();

  const stats = [
    { label: "Created", value: 0, icon: PartyPopper, color: "text-pink-500" },
    { label: "Joined", value: 0, icon: Users, color: "text-fuchsia-500" },
    { label: "Active", value: 0, icon: Users, color: "text-purple-500" },
    { label: "Total Hrs", value: 0, icon: Clock, color: "text-violet-500" },
  ];

  return (
    <div className="px-3 pt-4">
      <h2 className="text-sm font-bold text-gray-800 mb-2 px-1 flex items-center gap-1.5"><PartyPopper size={14} className="text-pink-500" /> Party Center</h2>
      <div className="bg-white rounded-2xl border border-gray-50 shadow-sm p-3">
        <div className="grid grid-cols-4 gap-2 mb-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center py-2">
              <s.icon size={14} className={s.color} />
              <span className={`text-sm font-bold ${s.color} mt-0.5`}>{s.value}</span>
              <span className="text-[8px] text-gray-400 text-center">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate("/go-live")} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition">
            <Plus size={13} /> Create Party
          </button>
          <button onClick={() => navigate("/party-dashboard")} className="flex-1 py-2.5 rounded-xl bg-gray-50 text-gray-600 text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition border border-gray-100">
            <Settings size={13} /> Manage
          </button>
          <button onClick={() => navigate("/party-dashboard")} className="py-2.5 px-4 rounded-xl bg-gray-50 text-gray-600 text-xs font-bold flex items-center justify-center active:scale-95 transition border border-gray-100">
            <History size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}