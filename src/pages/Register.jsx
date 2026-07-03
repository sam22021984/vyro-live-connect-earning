import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabaseAuth } from "@/lib/supabaseAuth";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, ArrowRight } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import SocialButtons from "@/components/SocialButtons";
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
      setShowOtp(true);
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
      await supabaseAuth.verifyOtp(email, otpCode);
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
    else if (provider === "whatsapp" || provider === "mobile") {
      setError(`${provider === "whatsapp" ? "WhatsApp" : "Mobile"} sign up is coming soon!`);
    }
  };

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