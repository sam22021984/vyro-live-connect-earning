import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ServiceDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, icon, gradient } = location.state || { name: "Service", icon: "⚙️", gradient: "from-purple-400 to-blue-400" };

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition"
          >
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="text-base font-bold text-gray-800">{name}</h1>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
          <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5`}
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.35)" }}
          >
            <span className="text-4xl">{icon}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">{name}</h2>
          <p className="text-sm text-gray-400 text-center max-w-[240px]">
            {name} content and features will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}