import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabaseAuth } from "@/lib/supabaseAuth";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, ArrowRight, CheckCircle2, Fingerprint, Sparkles } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import SocialButtons from "@/components/SocialButtons";
import GlobalIdBadge from "@/components/auth/GlobalIdBadge";
import { COUNTRY_LIST } from "@/components/application-id/countryConfig";
import { toast } from "@/components/ui/use-toast";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [onboarding, setOnboarding] = useState(null);
  const [country, setCountry] = useState(localStorage.getItem("vyro_onboarding_country") || "QAT");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await supabaseAuth.signUp(email, password);
      // Initialize profile with Global ID
      const res = await base44.functions.invoke("userOnboarding", {
        action: "initProfile",
        role: "user",
        username: email.split("@")[0],
        country,
      });
      const { profile, global_id, isNew } = res.data;
      setOnboarding({ profile, globalId: global_id, isNew });
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      await supabaseAuth.verifyOtp(email, otpCode, password);
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await supabaseAuth.resendOtp(email);
      toast({ title: "Code sent", description: "Check your email for the new code." });
    } catch (err) {
      setError(err.message || "Failed to resend code");
    }
  };

  const handleProvider = (provider) => {
    if (provider === "google") supabaseAuth.loginWithProvider("google", "/");
    else if (provider === "facebook") supabaseAuth.loginWithProvider("facebook", "/");
    else if (provider === "apple") supabaseAuth.loginWithProvider("apple", "/");
    else if (provider === "twitter") supabaseAuth.loginWithProvider("twitter", "/");
    else if (provider === "mobile") navigate("/mobile-register");
    else if (provider === "whatsapp") setError("WhatsApp sign up is coming soon!");
  };

  // Success screen after signup — shows generated Global ID
  if (onboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F7F4FF] to-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="relative inline-flex mb-6">
            <div className="absolute inset-0 bg-purple-200/50 blur-2xl rounded-full" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-200">
              <CheckCircle2 size={40} className="text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome to VYRO!</h2>
          <p className="text-sm text-gray-400 mb-6">
            Your account has been created successfully. Here is your unique Global ID.
          </p>

          <div className="bg-white rounded-3xl shadow-xl border border-purple-50 p-6 mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-200">
                <Fingerprint size={28} className="text-white" />
              </div>
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Your Global ID</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl font-mono font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {onboarding.globalId}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 text-xs font-medium mb-4">
              <Sparkles size={12} />
              {onboarding.isNew ? "New account created" : "Account linked"}
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Save this ID — it's your unique identity on VYRO. Others can find you by searching this ID.
            </p>
          </div>

          <button
            onClick={() => window.location.href = "/"}
            className="w-full rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-200 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ height: "52px" }}
          >
            Enter VYRO
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // OTP verification screen
  if (showOtp) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F7F4FF] to-white flex flex-col">
        {/* Top bar */}
        <div className="px-4 pt-12 pb-4">
          <button
            onClick={() => setShowOtp(false)}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center active:scale-95 transition"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500 bg-clip-text text-transparent mb-1">
                VYRO
              </h1>
              <p className="text-gray-400 text-xs font-semibold tracking-[0.3em]">LIVE • CONNECT • EARN</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-purple-50 p-6">
              <h2 className="text-xl font-bold text-gray-800 text-center">Verify your email</h2>
              <p className="text-sm text-gray-400 text-center mt-1 mb-6">We sent a code to {email}</p>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-500 text-sm font-medium">{error}</div>
              )}

              <div className="flex justify-center mb-6">
                <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode} autoFocus autoComplete="one-time-code">
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
                disabled={loading || otpCode.length < 6}
                className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-200 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center"
                style={{ height: "52px" }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Didn't receive the code?{" "}
                <button onClick={handleResend} className="font-bold text-[#6F35E0] hover:underline">
                  Resend
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F4FF] to-white flex flex-col">
      {/* Top bar */}
      <div className="px-4 pt-12 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center active:scale-95 transition"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Logo */}
      <div className="text-center mt-2">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500 bg-clip-text text-transparent">
          VYRO
        </h1>
        <p className="text-gray-400 text-xs font-semibold tracking-[0.3em] mt-1">LIVE • CONNECT • EARN</p>
      </div>

      {/* Hero image */}
      <div className="flex justify-center px-6 mt-4 mb-4">
        <div className="relative w-full max-w-[280px]">
          <img
            src="https://media.base44.com/images/public/6a461e2b7cac52b13d542424/79096d953_generated_image.png"
            alt="VYRO host"
            className="w-full rounded-3xl object-cover"
            style={{ maxHeight: "320px" }}
          />
        </div>
      </div>

      {/* Welcome text */}
      <div className="text-center px-6 mb-5">
        <h2 className="text-2xl font-bold text-[#2D1B4E]">Welcome to VYRO</h2>
        <p className="text-sm text-gray-400 mt-1">Join the global community, enjoy live streams and earn rewards.</p>
      </div>

      {/* Social buttons */}
      <div className="px-6 mb-4">
        <SocialButtons onProvider={handleProvider} />
      </div>

      {/* Divider */}
      <div className="relative mx-6 mb-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#F7F4FF] px-4 text-gray-400 font-medium">or</span>
        </div>
      </div>

      {/* Country selector */}
      <div className="px-6 mb-3">
        <div className="relative">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-2xl bg-white border-gray-100 text-sm shadow-sm px-4 py-3 appearance-none font-medium text-gray-700"
            style={{ height: "48px" }}
          >
            {COUNTRY_LIST.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name} (+{c.calling_code})
              </option>
            ))}
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
        </div>
      </div>

      {/* Email signup form */}
      <div className="px-6 mb-8">
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-500 text-sm font-medium">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-11 rounded-2xl bg-white border-gray-100 text-sm shadow-sm"
              style={{ height: "52px" }}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-11 pr-11 rounded-2xl bg-white border-gray-100 text-sm shadow-sm"
              style={{ height: "52px" }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-11 rounded-2xl bg-white border-gray-100 text-sm shadow-sm"
              style={{ height: "52px" }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-200 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ height: "52px" }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Sign Up
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="pb-8">
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#6F35E0] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}