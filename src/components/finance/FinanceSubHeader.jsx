import React from "react";
import { ArrowLeft } from "lucide-react";
import { FINANCE_COLORS } from "./financeData";
import { useBackNav } from "@/hooks/useBackNav";

/**
 * Compact sticky header for user-facing Finance sub-pages.
 * Back navigation always returns to the Finance page (/finance).
 */
export default function FinanceSubHeader({ title, subtitle }) {
  const handleBack = useBackNav("/finance");
  return (
    <div
      className="sticky top-0 z-30 px-4 py-3"
      style={{ background: FINANCE_COLORS.navyGradient, boxShadow: "0 4px 20px rgba(15,27,61,0.3)" }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition"
          style={{ background: "rgba(255,255,255,0.1)" }}
          aria-label="Back to Finance"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold text-white truncate">{title}</h1>
          {subtitle && <p className="text-[10px] text-white/60 truncate">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}