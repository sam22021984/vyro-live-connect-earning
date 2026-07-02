import React from "react";
import { ChevronRight, Settings, LogOut } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function MoreServices() {
  const handleLogout = async () => {
    await base44.auth.logout("/login");
  };

  return (
    <div className="px-4 mb-8">
      {/* More Services */}
      <button className="w-full bg-white rounded-[18px] p-4 shadow-sm border border-gray-50 flex items-center justify-between mb-3 transition-all duration-300 hover:shadow-md active:scale-[0.98]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center">
            <Settings size={16} className="text-purple-500" />
          </div>
          <span className="text-sm font-semibold text-gray-700">More Services</span>
        </div>
        <ChevronRight size={18} className="text-gray-300" />
      </button>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full bg-gradient-to-r from-red-500 to-orange-500 rounded-[18px] p-4 shadow-lg shadow-red-100 flex items-center justify-center gap-2.5 transition-all duration-300 hover:shadow-xl hover:shadow-red-200 active:scale-[0.98]"
      >
        <LogOut size={18} className="text-white" />
        <span className="text-sm font-bold text-white">Logout</span>
      </button>
    </div>
  );
}