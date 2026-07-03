import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function VipSystemHeader({ title, subtitle, icon, color }) {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-30 bg-[#0A0118]/90 backdrop-blur-xl border-b border-white/10">
      <div className="px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div className="flex items-center gap-2 flex-1">
          {icon && <span className="text-xl">{icon}</span>}
          <div>
            <h1
              className="text-sm font-bold bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(to right, ${color}, #fff)` }}
            >
              {title}
            </h1>
            {subtitle && <p className="text-[10px] text-gray-500 font-medium">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}