import React from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Share2, Copy, QrCode } from "lucide-react";

const QUICK_ACTIONS = [
  { label: "Edit Profile", icon: Pencil, color: "from-purple-500 to-violet-600", path: "/edit-profile" },
  { label: "Share Profile", icon: Share2, color: "from-blue-500 to-cyan-500" },
  { label: "Copy User ID", icon: Copy, color: "from-gray-500 to-slate-600" },
  { label: "QR Code", icon: QrCode, color: "from-green-500 to-emerald-600" },
];

export default function QuickActions({ profile }) {
  const navigate = useNavigate();

  const handleAction = (action) => {
    if (action.path) { navigate(action.path); return; }
    if (action.label === "Copy User ID") {
      navigator.clipboard?.writeText(profile?.global_id || profile?.user_id || "");
      return;
    }
  };

  return (
    <div className="px-3 pt-4">
      <h2 className="text-sm font-bold text-gray-800 mb-2 px-1">⚡ Quick Actions</h2>
      <div className="grid grid-cols-4 gap-2">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.label}
            onClick={() => handleAction(action)}
            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-white border border-gray-50 shadow-sm active:scale-95 transition"
          >
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-sm`}>
              <action.icon size={16} className="text-white" />
            </div>
            <span className="text-[8px] font-bold text-gray-600 text-center leading-tight">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}