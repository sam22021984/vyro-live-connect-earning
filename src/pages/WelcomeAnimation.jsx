import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Gift } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function WelcomeAnimation() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await base44.functions.invoke("userOnboarding", { action: "getProfile" });
        if (res.data?.profile) setProfile(res.data.profile);
      } catch {}
    };
    loadProfile();
  }, []);

  const handleStart = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Floating sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300/30"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -30, -60] }}
          transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
        >
          <Sparkles size={16} />
        </motion.div>
      ))}

      {/* Avatar */}
      <motion.div
        className="relative mb-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-purple-500/40 blur-3xl rounded-full" />
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt="Profile"
            className="relative w-28 h-28 rounded-full object-cover border-4 border-purple-400 shadow-2xl shadow-purple-500/50"
          />
        ) : (
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-purple-500/50 border-4 border-purple-400">
            <span className="text-5xl">🎙️</span>
          </div>
        )}
      </motion.div>

      {/* Welcome text */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="text-4xl mb-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
        >
          🎉
        </motion.div>
        <h1 className="text-2xl font-extrabold text-white mb-1">Welcome to VYRO!</h1>
        <p className="text-sm text-white/60 mb-1">
          {profile?.full_name || profile?.username || "New User"}
        </p>
        {profile?.global_id && (
          <p className="text-[10px] text-white/30 font-mono">ID: {profile.global_id}</p>
        )}
      </motion.div>

      {/* Welcome bonus badge */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30">
          <Gift size={16} className="text-yellow-400" />
          <span className="text-xs text-yellow-300 font-semibold">Welcome Bonus: 500 Coins!</span>
        </div>
      </motion.div>

      {/* Start button */}
      <motion.button
        onClick={handleStart}
        className="mt-10 w-full max-w-xs rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-500/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        style={{ height: "52px" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        Start Exploring <ArrowRight size={16} />
      </motion.button>
    </div>
  );
}