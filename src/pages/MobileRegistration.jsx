import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowRight, ArrowLeft, Loader2, RefreshCw } from "lucide-react";
import { supabaseAuth } from "@/lib/supabaseAuth";
import { base44 } from "@/api/base44Client";
import { COUNTRY_CONFIG } from "@/components/application-id/countryConfig";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function MobileRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState("phone"); // phone | otp
  const [country, setCountry] = useState(localStorage.getItem("vyro_onboarding_country") || "QAT");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const countryConfig = COUNTRY_CONFIG[country] || COUNTRY_CONFIG.QAT;
  const fullPhone = `+${countryConfig.calling_code}${phone}`;

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  const validatePhone = () => {
    if (!phone) {
      setError("Phone number is required");
      return false;
    }
    if (phone.length < 7 || phone.length > 15) {
      setError("Phone number length is invalid for this country");
      return false;
    }
    if (!/^\d+$/.test(phone)) {
      setError("Phone number must contain only digits");
      return false;
    }
    return true;
  };

  const handleSendOtp = async () => {
    setError("");
    if (!validatePhone()) return;
    setLoading(true);
    try {
      await supabaseAuth.sendPhoneOtp(fullPhone);
      setStep("otp");
      setCountdown(60);
    } catch (e) {
      setError(e.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    if (otp.length < 6) {
      setError("Please enter the 6-digit code");
      return;
    }
    setLoading(true);
    try {
      await supabaseAuth.verifyPhoneOtp(fullPhone, otp);
      // Check if user already has a profile (existing user)
      try {
        const res = await base44.functions.invoke("userOnboarding", { action: "getProfile" });
        if (res.data?.profile?.global_id) {
          // Existing user — go home
          window.location.href = "/";
          return;
        }
      } catch (e) { /* new user — continue to password */ }
      // New user — save phone and go to create password
      localStorage.setItem("vyro_pending_phone", fullPhone);
      navigate("/create-password");
    } catch (e) {
      setError(e.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setError("");
    setLoading(true);
    try {
      await supabaseAuth.sendPhoneOtp(fullPhone);
      setCountdown(60);
    } catch (e) {
      setError(e.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // --- OTP Step ---
  if (step === "otp") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col">
        <div className="px-4 pt-12 pb-4">
          <button
            onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
            className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center active:scale-95 transition"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                <Phone size={28} className="text-purple-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">Verify Your Number</h2>
              <p className="text-white/50 text-sm">We sent a code to {fullPhone}</p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/20 text-red-300 text-sm font-medium">{error}</div>
            )}

            <div className="flex justify-center mb-6">
              <InputOTP maxLength={6} value={otp} onChange={setOtp} autoFocus autoComplete="one-time-code">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || otp.length < 6}
              className="w-full rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ height: "52px" }}
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Verifying...</>
              ) : (
                "Verify"
              )}
            </button>

            <div className="text-center mt-4">
              {countdown > 0 ? (
                <p className="text-white/40 text-sm">Resend code in {countdown}s</p>
              ) : (
                <button onClick={handleResend} disabled={loading} className="text-purple-400 text-sm font-semibold hover:underline flex items-center justify-center gap-1.5 mx-auto">
                  <RefreshCw size={14} /> Resend OTP
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Phone Entry Step ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col">
      <div className="px-4 pt-12 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center active:scale-95 transition"
        >
          <ArrowLeft size={20} className="text-white" />
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
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
              <Phone size={28} className="text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Mobile Number Registration</h2>
            <p className="text-white/50 text-sm">Enter your phone number to get started</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 text-red-300 text-sm font-medium">{error}</div>
          )}

          {/* Country selector */}
          <div className="mb-3">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-2xl bg-white/10 border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-purple-400/50"
              style={{ height: "52px" }}
            >
              {Object.entries(COUNTRY_CONFIG).map(([code, c]) => (
                <option key={code} value={code} className="bg-[#2D1B4E] text-white">
                  {c.flag} {c.name} (+{c.calling_code})
                </option>
              ))}
            </select>
          </div>

          {/* Phone input */}
          <div className="relative mb-6">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-semibold text-sm">
              +{countryConfig.calling_code}
            </div>
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="w-full pl-16 pr-4 rounded-2xl bg-white/10 border border-white/10 text-white text-sm placeholder-white/30 outline-none focus:border-purple-400/50"
              style={{ height: "52px" }}
              autoFocus
            />
          </div>

          <button
            onClick={handleSendOtp}
            disabled={loading || !phone}
            className="w-full rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ height: "52px" }}
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Sending...</>
            ) : (
              <>Continue <ArrowRight size={16} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}