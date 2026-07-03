import React from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, LogIn, Eye } from "lucide-react";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    const isFirstLaunch = localStorage.getItem("vyro_first_launch") !== "false";
    if (isFirstLaunch) {
      navigate("/language-selection");
    } else {
      navigate("/register");
    }
  };

  const handleLogin = () => {
    localStorage.setItem("vyro_first_launch", "false");
    navigate("/login");
  };

  const handleGuest = () => {
    localStorage.setItem("vyro_guest_mode", "true");
    localStorage.setItem("vyro_first_launch", "false");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col">
      {/* Top: Logo */}
      <div className="pt-16 pb-8 text-center">
        <div className="relative inline-flex mb-4">
          <div className="absolute inset-0 bg-purple-500/30 blur-3xl rounded-full animate-pulse" />
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-purple-500/50">
            <span className="text-4xl">🎙️</span>
          </div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
          VYRO
        </h1>
        <p className="text-white/50 text-xs font-semibold tracking-[0.3em] mt-1">LIVE • CONNECT • EARN</p>
      </div>

      {/* Middle: Illustration + Text */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-full max-w-[260px] mb-8">
          <img
            src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=500&h=500&fit=crop"
            alt="VYRO Live"
            className="w-full rounded-3xl object-cover shadow-2xl"
            style={{ maxHeight: "260px" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to VYRO</h2>
        <p className="text-white/60 text-sm leading-relaxed max-w-[280px]">
          Join the global community. Watch live streams, connect with friends, and earn rewards.
        </p>
      </div>

      {/* Bottom: Actions */}
      <div className="px-6 pb-10 space-y-3">
        <button
          onClick={handleSignUp}
          className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          style={{ height: "52px" }}
        >
          <UserPlus size={18} />
          Sign Up
        </button>
        <button
          onClick={handleLogin}
          className="w-full rounded-2xl bg-white/10 backdrop-blur-md text-white font-bold text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          style={{ height: "52px" }}
        >
          <LogIn size={18} />
          Login
        </button>
        <button
          onClick={handleGuest}
          className="w-full rounded-2xl text-white/60 font-medium text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 py-3"
        >
          <Eye size={16} />
          Continue as Guest
        </button>
        <p className="text-white/30 text-[10px] text-center mt-2">
          Guests can watch live streams but cannot chat, send gifts, or use coins.
        </p>
      </div>
    </div>
  );
}