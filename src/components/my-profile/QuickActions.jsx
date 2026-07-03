import React from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Share2, Copy, QrCode, Wallet, Video, Mic, PartyPopper, ListChecks, Crown, Users, Building2, BarChart3, Radio } from "lucide-react";

const QUICK_ACTIONS = [
  { label: "Edit Profile", icon: Pencil, color: "from-purple-500 to-violet-600", path: "/edit-profile" },
  { label: "Share Profile", icon: Share2, color: "from-blue-500 to-cyan-500" },
  { label: "Copy User ID", icon: Copy, color: "from-gray-500 to-slate-600" },
  { label: "QR Code", icon: QrCode, color: "from-green-500 to-emerald-600" },
  { label: "Wallet", icon: Wallet, color: "from-amber-500 to-orange-500", path: "/finance" },
  { label: "Creator Center", icon: Video, color: "from-red-500 to-pink-500", path: "/creator-center" },
  { label: "Live Center", icon: Radio, color: "from-rose-500 to-red-600", path: "/live-room" },
  { label: "Audio Room", icon: Mic, color: "from-indigo-500 to-blue-600", path: "/party-dashboard" },
  { label: "Party Center", icon: PartyPopper, color: "from-pink-500 to-fuchsia-600", path: "/party-dashboard" },
  { label: "Tasks", icon: ListChecks, color: "from-teal-500 to-green-600", path: "/tasks-rewards" },
  { label: "VIP Center", icon: Crown, color: "from-yellow-500 to-amber-600", path: "/vip-membership" },
  { label: "Family", icon: Users, color: "from-emerald-500 to-teal-600", path: "/family-center" },
  { label: "Agency", icon: Building2, color: "from-violet-500 to-purple-600", path: "/agency-dashboard" },
  { label: "Analytics", icon: BarChart3, color: "from-cyan-500 to-blue-600", path: "/profile-stats" },
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