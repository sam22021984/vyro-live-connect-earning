import React from "react";
import { LogOut, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";

export default function MoreServices() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await base44.auth.logout("/login");
  };

  return (
    <div className="px-4 mb-8">
      {/* More Services Card - navigates to new page */}
      <button
        onClick={() => navigate("/more-services")}
        className="w-full rounded-[24px] overflow-hidden flex items-center justify-between p-4 transition-all duration-300 active:scale-[0.99]"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(248,249,252,0.8))",
          boxShadow: "0 6px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,1)",
          border: "1px solid rgba(255,255,255,0.9)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 flex items-center justify-center"
            style={{
              boxShadow: "0 3px 8px rgba(245,158,11,0.3), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -2px 3px rgba(180,83,9,0.2)",
            }}
          >
            <Sparkles size={16} className="text-white" style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.2))" }} />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-gray-800">More Services</h3>
            <p className="text-[10px] text-gray-400 font-medium">16 premium services</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
          <span className="text-gray-400 text-sm font-bold">›</span>
        </div>
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full mt-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-[18px] p-4 shadow-lg shadow-red-100 flex items-center justify-center gap-2.5 transition-all duration-300 hover:shadow-xl hover:shadow-red-200 active:scale-[0.98]"
      >
        <LogOut size={18} className="text-white" />
        <span className="text-sm font-bold text-white">Logout</span>
      </button>
    </div>
  );
}