import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function OnboardingShell({ children, showBack = true, onBack, step, totalSteps }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col">
      {showBack && (
        <div className="px-4 pt-12 pb-2">
          <button
            onClick={onBack || (() => navigate(-1))}
            className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center active:scale-95 transition"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
        </div>
      )}

      <div className="text-center mb-4 px-6">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
          VYRO
        </h1>
        <p className="text-white/40 text-[10px] font-semibold tracking-[0.3em] mt-1">
          LIVE • CONNECT • EARN
        </p>
      </div>

      <div className="flex-1 px-6 pb-8 overflow-y-auto">{children}</div>

      {step && totalSteps && (
        <div className="flex justify-center gap-2 pb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === step - 1 ? "w-6 bg-purple-400" : "w-1.5 bg-white/20"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}