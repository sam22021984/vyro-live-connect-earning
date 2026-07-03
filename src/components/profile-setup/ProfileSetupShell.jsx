import React from "react";
import { ArrowLeft } from "lucide-react";

export default function ProfileSetupShell({ children, step, totalSteps, title, subtitle, onBack, showBack = true }) {
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F4FF] to-white flex flex-col">
      {showBack && (
        <div className="px-4 pt-12 pb-2">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center active:scale-95 transition flex-shrink-0"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 font-medium">Step {step + 1} of {totalSteps}</p>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#6F35E0] to-[#C135E0] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        {title && <h2 className="text-xl font-bold text-[#2D1B4E]">{title}</h2>}
        {subtitle && <p className="text-sm text-gray-400 mb-5">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}