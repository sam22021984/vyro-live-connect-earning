import React from "react";
import { Check, Circle, Loader2, ChevronRight } from "lucide-react";

export default function VerificationSteps({ steps, currentIndex, livenessChecks }) {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold text-white/50">STEP {currentIndex + 1} OF {steps.length}</span>
        <span className="text-[10px] font-bold text-purple-300">
          {Object.keys(livenessChecks).filter(k => livenessChecks[k]?.passed).length} / {steps.length} Complete
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
          style={{
            width: `${(Object.keys(livenessChecks).filter(k => livenessChecks[k]?.passed).length / steps.length) * 100}%`,
          }}
        />
      </div>

      {/* Current step instruction */}
      <div className="text-center mb-3">
        <p className="text-sm font-bold text-white">{steps[currentIndex]?.instruction || "Processing..."}</p>
      </div>

      {/* Step dots */}
      <div className="flex items-center justify-center gap-1.5">
        {steps.map((step, i) => {
          const check = livenessChecks[step.key];
          const isPassed = check?.passed;
          const isCurrent = i === currentIndex;
          const isPending = i > currentIndex;

          return (
            <React.Fragment key={step.key}>
              <div
                className={`flex items-center justify-center transition-all duration-300 ${
                  isPassed ? "w-6 h-6" : isCurrent ? "w-7 h-7" : "w-5 h-5"
                }`}
              >
                {isPassed ? (
                  <div className="w-full h-full rounded-full bg-green-500/30 border border-green-400 flex items-center justify-center">
                    <Check size={12} className="text-green-400" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-full h-full rounded-full bg-purple-500/30 border border-purple-400 flex items-center justify-center animate-pulse">
                    <Loader2 size={14} className="text-purple-300 animate-spin" />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
                    <Circle size={6} className="text-white/30 fill-white/20" />
                  </div>
                )}
              </div>
              {!isPending && i < steps.length - 1 && (
                <div className={`w-3 h-0.5 ${isPassed ? "bg-green-400/50" : "bg-white/10"}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}