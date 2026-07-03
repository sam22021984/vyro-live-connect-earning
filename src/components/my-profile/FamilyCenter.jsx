import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, MessageCircle, LogOut, UserPlus } from "lucide-react";

export default function FamilyCenter({ profile }) {
  const navigate = useNavigate();

  return (
    <div className="px-3 pt-4">
      <h2 className="text-sm font-bold text-gray-800 mb-2 px-1 flex items-center gap-1.5"><Users size={14} className="text-emerald-500" /> Family Center</h2>
      <div className="bg-white rounded-2xl border border-gray-50 shadow-sm p-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
            <Users size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-700">No Family Yet</h3>
            <p className="text-[10px] text-gray-400">Join a family to connect and earn together</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate("/family-center")} className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold active:scale-95">
            Find Family
          </button>
          <button onClick={() => navigate("/family-center")} className="flex-1 py-2 rounded-xl bg-gray-50 text-gray-600 text-xs font-bold active:scale-95 border border-gray-100">
            Create Family
          </button>
        </div>
      </div>
    </div>
  );
}