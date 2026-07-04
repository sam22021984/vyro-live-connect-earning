import React from "react";
import { CheckCircle2, XCircle, ShieldCheck, AlertTriangle, ArrowRight, RotateCcw } from "lucide-react";

export default function VerificationResult({ status, message, attemptCount, onRetry, onContinue }) {
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center px-6">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-green-400/40 blur-3xl rounded-full animate-pulse" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/40">
            <ShieldCheck size={48} className="text-white" />
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-white mb-2">Verification Successful!</h2>
        <p className="text-sm text-white/60 mb-1 max-w-xs">
          Your identity has been verified and your account is now active.
        </p>
        <div className="flex items-center gap-2 mt-2 mb-8 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-400/30">
          <CheckCircle2 size={14} className="text-green-400" />
          <span className="text-xs font-bold text-green-300">Identity Verified</span>
        </div>

        <button
          onClick={onContinue}
          className="w-full max-w-xs rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          style={{ height: "52px" }}
        >
          Continue to VYRO <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  if (status === "review_required") {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center px-6">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-red-500/30 blur-3xl rounded-full" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-red-500/30">
            <AlertTriangle size={48} className="text-white" />
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-white mb-2">Account Under Review</h2>
        <p className="text-sm text-white/60 mb-2 max-w-xs">{message}</p>
        <p className="text-xs text-white/40 mb-8">
          Failed attempts: {attemptCount}/3
        </p>

        <div className="w-full max-w-xs p-4 rounded-2xl bg-red-500/10 border border-red-400/20 mb-6">
          <p className="text-xs text-red-300/80">
            Your account has been flagged for manual review by our security team. This happens when verification fails 3 times.
            Please contact support if you believe this is an error.
          </p>
        </div>

        <button
          onClick={onContinue}
          className="w-full max-w-xs rounded-2xl bg-white/10 text-white font-bold text-sm transition-all active:scale-[0.98]"
          style={{ height: "52px" }}
        >
          Go to Home
        </button>
      </div>
    );
  }

  // failure
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center px-6">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-red-500/30 blur-3xl rounded-full" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-red-500/30">
          <XCircle size={48} className="text-white" />
        </div>
      </div>

      <h2 className="text-xl font-extrabold text-white mb-2">Verification Failed</h2>
      <p className="text-sm text-white/60 mb-2 max-w-xs">{message}</p>
      <p className="text-xs text-white/40 mb-8">
        Attempts remaining: {Math.max(0, 3 - attemptCount)}
      </p>

      {attemptCount < 3 && (
        <button
          onClick={onRetry}
          className="w-full max-w-xs rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          style={{ height: "52px" }}
        >
          <RotateCcw size={16} /> Try Again
        </button>
      )}
    </div>
  );
}