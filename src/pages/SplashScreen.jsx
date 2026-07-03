import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { WifiOff, RefreshCw, Download, Loader2 } from "lucide-react";

const APP_VERSION = "2.4.1";

export default function SplashScreen() {
  const navigate = useNavigate();
  const { isAuthenticated, authChecked } = useAuth();
  const [status, setStatus] = useState("loading");

  const runChecks = async () => {
    setStatus("loading");

    // Check 1: Internet connection
    if (!navigator.onLine) {
      setStatus("no_internet");
      return;
    }

    // Check 2: App version
    const storedVersion = localStorage.getItem("vyro_app_version");
    if (storedVersion && storedVersion !== APP_VERSION) {
      setStatus("update_available");
      return;
    }
    localStorage.setItem("vyro_app_version", APP_VERSION);

    // Check 3: Maintenance mode
    if (localStorage.getItem("vyro_maintenance_mode") === "true") {
      setStatus("maintenance");
      return;
    }

    // Check 4: Server + Session — AuthContext handles this in parallel
    setStatus("success");
  };

  useEffect(() => {
    runChecks();
    const handleOnline = () => runChecks();
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  useEffect(() => {
    if (status === "success" && authChecked) {
      const isFirstLaunch = localStorage.getItem("vyro_first_launch") !== "false";
      const isGuest = localStorage.getItem("vyro_guest_mode") === "true";
      if (isAuthenticated || isGuest) {
        navigate("/", { replace: true });
      } else if (isFirstLaunch) {
        navigate("/welcome", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [status, authChecked, isAuthenticated, navigate]);

  // --- Loading ---
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col items-center justify-center px-6">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-purple-500/30 blur-3xl rounded-full animate-pulse" />
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-purple-500/50">
            <span className="text-4xl">🎙️</span>
          </div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent mb-2">
          VYRO
        </h1>
        <p className="text-white/50 text-xs font-semibold tracking-[0.3em] mb-8">LIVE • CONNECT • EARN</p>
        <Loader2 size={24} className="animate-spin text-purple-400" />
        <p className="text-white/40 text-xs mt-3">Loading...</p>
        <p className="text-white/20 text-[10px] mt-8">Version {APP_VERSION}</p>
      </div>
    );
  }

  // --- No Internet ---
  if (status === "no_internet") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
          <WifiOff size={36} className="text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">No Internet Connection</h2>
        <p className="text-white/50 text-sm text-center mb-8">Please check your network connection and try again.</p>
        <div className="flex gap-3 w-full max-w-xs">
          <button onClick={() => window.close()} className="flex-1 py-3 rounded-2xl bg-white/10 text-white font-semibold text-sm">
            Exit
          </button>
          <button onClick={runChecks} className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2">
            <RefreshCw size={16} /> Retry
          </button>
        </div>
      </div>
    );
  }

  // --- Maintenance ---
  if (status === "maintenance") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mb-6">
          <RefreshCw size={36} className="text-amber-400 animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Server is under maintenance.</h2>
        <p className="text-white/50 text-sm text-center mb-8">We'll be back shortly. Thank you for your patience.</p>
        <div className="flex gap-3 w-full max-w-xs">
          <button onClick={() => window.close()} className="flex-1 py-3 rounded-2xl bg-white/10 text-white font-semibold text-sm">
            Exit
          </button>
          <button onClick={runChecks} className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2">
            <RefreshCw size={16} /> Retry
          </button>
        </div>
      </div>
    );
  }

  // --- Update Available ---
  if (status === "update_available") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
          <Download size={36} className="text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">A new version is available.</h2>
        <p className="text-white/50 text-sm text-center mb-8">Please update to the latest version for the best experience.</p>
        <div className="flex gap-3 w-full max-w-xs">
          <button onClick={() => { localStorage.setItem("vyro_app_version", APP_VERSION); runChecks(); }} className="flex-1 py-3 rounded-2xl bg-white/10 text-white font-semibold text-sm">
            Later
          </button>
          <button onClick={() => { localStorage.setItem("vyro_app_version", APP_VERSION); runChecks(); }} className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2">
            <Download size={16} /> Update Now
          </button>
        </div>
      </div>
    );
  }

  // --- Success (brief transition) ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col items-center justify-center px-6">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-purple-500/30 blur-3xl rounded-full animate-pulse" />
        <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-purple-500/50">
          <span className="text-4xl">🎙️</span>
        </div>
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent mb-2">
        VYRO
      </h1>
      <p className="text-white/50 text-sm">Welcome...</p>
      <Loader2 size={20} className="animate-spin text-purple-400 mt-4" />
    </div>
  );
}