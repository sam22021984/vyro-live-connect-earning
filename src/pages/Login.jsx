import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import SocialButtons from "@/components/SocialButtons";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleProvider = (provider) => {
    if (provider === "google") base44.auth.loginWithProvider("google", "/");
    else if (provider === "facebook") base44.auth.loginWithProvider("facebook", "/");
    else if (provider === "whatsapp" || provider === "mobile") {
      setError(`${provider === "whatsapp" ? "WhatsApp" : "Mobile"} login is coming soon!`);
    }
  };

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