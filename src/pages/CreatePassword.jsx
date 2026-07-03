import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowRight, Loader2, Check, X } from "lucide-react";
import { supabaseAuth } from "@/lib/supabaseAuth";
import { base44 } from "@/api/base44Client";

export default function CreatePassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const rules = [
    { label: "At least 8 characters", pass: password.length >= 8 },
    { label: "One uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "One lowercase letter", pass: /[a-z]/.test(password) },
    { label: "One numeric digit", pass: /\d/.test(password) },
    { label: "One special character", pass: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];
  const allPass = rules.every((r) => r.pass);
  const passwordsMatch = password === confirm && password.length > 0;

  const handleSubmit = async () => {
    setError("");
    if (!allPass) {
      setError("Please meet all password requirements");
      return;
    }
    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // Set password on the phone-authenticated account
      const token = supabaseAuth.getToken();
      if (token) {
        await supabaseAuth.resetPassword(token, password);
      }

      // Initialize VYRO profile with Global ID
      const country = localStorage.getItem("vyro_onboarding_country") || "QAT";
      const phone = localStorage.getItem("vyro_pending_phone") || "";
      const username = `user_${phone.slice(-4)}`;

      await base44.functions.invoke("userOnboarding", {
        action: "initProfile",
        role: "user",
        username,
        country,
      });

      localStorage.removeItem("vyro_pending_phone");
      window.location.href = "/profile-setup";
    } catch (e) {
      setError(e.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col">
      <div className="px-4 pt-12 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center active:scale-95 transition"
        >
          <ArrowRight size={20} className="text-white rotate-180" />
        </button>
      </div>

      <div className="text-center mb-6 px-6">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent mb-1">
          VYRO
        </h1>
        <p className="text-white/40 text-[10px] font-semibold tracking-[0.3em]">LIVE • CONNECT • EARN</p>
      </div>

      <div className="flex-1 px-6">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
              <Lock size={28} className="text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Create Password</h2>
            <p className="text-white/50 text-sm">Set a secure password for your account</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 text-red-300 text-sm font-medium">{error}</div>
          )}

          {/* Password */}
          <div className="relative mb-3">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-11 rounded-2xl bg-white/10 border border-white/10 text-white text-sm placeholder-white/30 outline-none focus:border-purple-400/50"
              style={{ height: "52px" }}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative mb-4">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full pl-11 pr-11 rounded-2xl bg-white/10 border border-white/10 text-white text-sm placeholder-white/30 outline-none focus:border-purple-400/50"
              style={{ height: "52px" }}
            />
            {confirm.length > 0 && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                {passwordsMatch ? (
                  <Check size={18} className="text-green-400" />
                ) : (
                  <X size={18} className="text-red-400" />
                )}
              </div>
            )}
          </div>

          {/* Password rules */}
          <div className="space-y-1.5 mb-6">
            {rules.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${r.pass ? "bg-green-500/30" : "bg-white/10"}`}>
                  {r.pass ? <Check size={10} className="text-green-400" /> : <X size={10} className="text-white/30" />}
                </div>
                <span className={`text-xs ${r.pass ? "text-green-400" : "text-white/40"}`}>{r.label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !allPass || !passwordsMatch}
            className="w-full rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ height: "52px" }}
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Creating account...</>
            ) : (
              <>Continue <ArrowRight size={16} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}