import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabaseAuth } from "@/lib/supabaseAuth";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, Fingerprint, Sparkles } from "lucide-react";
import SocialButtons from "@/components/SocialButtons";
import GlobalIdBadge from "@/components/auth/GlobalIdBadge";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [welcomeData, setWelcomeData] = useState(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Handle Google OAuth callback — runs on mount if ?code=...&state=google_* is in URL
  useEffect(() => {
    const code = supabaseAuth.getGoogleCallbackCode();
    if (!code) return;
    setGoogleLoading(true);
    supabaseAuth.handleGoogleCallback(code)
      .then(async () => {
        try {
          const res = await base44.functions.invoke("userOnboarding", { action: "getProfile" });
          if (res.data?.profile?.global_id) {
            setWelcomeData({ globalId: res.data.profile.global_id, username: res.data.profile.username, role: res.data.profile.role });
          } else {
            window.location.href = "/";
          }
        } catch {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        setError(err.message || "Google login failed");
        setGoogleLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await supabaseAuth.signIn(email, password);
      // Fetch profile + global_id
      try {
        const res = await base44.functions.invoke("userOnboarding", { action: "getProfile" });
        if (res.data?.profile?.global_id) {
          setWelcomeData({ globalId: res.data.profile.global_id, username: res.data.profile.username, role: res.data.profile.role });
        } else {
          window.location.href = "/";
        }
      } catch {
        window.location.href = "/";
      }
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleProvider = (provider) => {
    if (provider === "google") supabaseAuth.loginWithProvider("google", "/");
    else if (provider === "facebook") supabaseAuth.loginWithProvider("facebook", "/");
    else if (provider === "apple") supabaseAuth.loginWithProvider("apple", "/");
    else if (provider === "twitter") supabaseAuth.loginWithProvider("twitter", "/");
    else if (provider === "whatsapp" || provider === "mobile") {
      setError(`${provider === "whatsapp" ? "WhatsApp" : "Mobile"} login is coming soon!`);
    }
  };

  useEffect(() => {
    if (welcomeData) {
      const timer = setTimeout(() => { window.location.href = "/"; }, 2500);
      return () => clearTimeout(timer);
    }
  }, [welcomeData]);

  // Google login loading screen
  if (googleLoading && !welcomeData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="relative inline-flex mb-6">
            <div className="absolute inset-0 bg-purple-500/30 blur-3xl rounded-full" />
            <div className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl">
              <Loader2 size={36} className="animate-spin text-[#6F35E0]" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Signing in with Google</h2>
          <p className="text-sm text-white/50">Please wait...</p>
        </div>
      </div>
    );
  }

  // Welcome back screen — shows Global ID briefly before redirect
  if (welcomeData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="relative inline-flex mb-6">
            <div className="absolute inset-0 bg-purple-500/30 blur-3xl rounded-full" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-purple-500/50">
              <Sparkles size={36} className="text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">Welcome back!</h2>
          <p className="text-sm text-white/50 mb-6">{welcomeData.username}</p>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-6 mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center shadow-lg">
                <Fingerprint size={24} className="text-white" />
              </div>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">Your Global ID</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl font-mono font-extrabold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                {welcomeData.globalId}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-white/60">
            <Loader2 size={16} className="animate-spin" />
            <span className="text-sm">Loading your dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col bg-[#1A0B2E]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/6a461e2b7cac52b13d542424/06c8c1eef_generated_image.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0B2E]/60 via-[#1A0B2E]/40 to-[#1A0B2E]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="px-4 pt-12 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center active:scale-95 transition"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
        </div>

        {/* Logo */}
        <div className="text-center mt-4 mb-auto">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
            VYRO
          </h1>
          <p className="text-white/70 text-xs font-semibold tracking-[0.3em] mt-1">
            LIVE • CONNECT • EARN
          </p>
        </div>

        {/* Bottom white card */}
        <div className="bg-white rounded-t-[32px] px-6 pt-7 pb-8 shadow-2xl">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-sm text-gray-400 mt-1">Login to continue enjoying the best live experience.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-500 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Email / Phone Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 h-13 rounded-2xl bg-gray-50 border-gray-100 text-sm"
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
                className="pl-11 pr-11 rounded-2xl bg-gray-50 border-gray-100 text-sm"
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

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs font-semibold text-[#6F35E0] hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-200 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center"
              style={{ height: "52px" }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-gray-400 font-medium">or</span>
            </div>
          </div>

          {/* Social buttons */}
          <SocialButtons onProvider={handleProvider} />

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-[#6F35E0] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}