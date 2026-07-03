import React from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Phone, FileText, DollarSign } from "lucide-react";

export default function AgencyCenter({ profile }) {
  const navigate = useNavigate();

  if (!profile?.is_agency && profile?.role !== "agency") {
    return (
      <div className="px-3 pt-4">
        <h2 className="text-sm font-bold text-gray-800 mb-2 px-1 flex items-center gap-1.5"><Building2 size={14} className="text-violet-500" /> Agency Center</h2>
        <div className="bg-white rounded-2xl border border-gray-50 shadow-sm p-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
              <Building2 size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-700">No Agency Linked</h3>
              <p className="text-[10px] text-gray-400">Join an agency to grow your streaming career</p>
            </div>
          </div>
          <button onClick={() => navigate("/agency-dashboard")} className="w-full py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold active:scale-95">
            Find Agency
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 pt-4">
      <h2 className="text-sm font-bold text-gray-800 mb-2 px-1 flex items-center gap-1.5"><Building2 size={14} className="text-violet-500" /> Agency Center</h2>
      <div className="bg-white rounded-2xl border border-gray-50 shadow-sm divide-y divide-gray-50">
        {[
          { label: "Contact Manager", icon: Phone, path: "/agency-dashboard" },
          { label: "Agency Reports", icon: FileText, path: "/agency-dashboard" },
          { label: "Agency Earnings", icon: DollarSign, path: "/agency-dashboard" },
        ].map((opt) => (
          <button key={opt.label} onClick={() => navigate(opt.path)} className="w-full flex items-center gap-3 p-3 active:bg-gray-50 transition">
            <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
              <opt.icon size={14} className="text-violet-500" />
            </div>
            <span className="text-xs font-medium text-gray-700 flex-1 text-left">{opt.label}</span>
            <span className="text-gray-300">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}