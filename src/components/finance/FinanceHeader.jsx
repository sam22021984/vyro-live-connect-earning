import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Search } from "lucide-react";
import { FINANCE_COLORS } from "./financeData";

export default function FinanceHeader({ title, subtitle }) {
  const navigate = useNavigate();

  return (
    <div
      className="sticky top-0 z-30 px-4 py-3"
      style={{ background: FINANCE_COLORS.navyGradient, boxShadow: "0 4px 20px rgba(15,27,61,0.3)" }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/more-services")}
          className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-base font-bold text-white">{title}</h1>
          {subtitle && <p className="text-[10px] text-white/60">{subtitle}</p>}
        </div>
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <Search size={16} className="text-white" />
        </button>
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center relative active:scale-95 transition"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <Bell size={16} className="text-white" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: FINANCE_COLORS.gold }} />
        </button>
      </div>
    </div>
  );
}