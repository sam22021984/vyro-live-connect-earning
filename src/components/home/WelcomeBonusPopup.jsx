import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, Coins, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function WelcomeBonusPopup() {
  const [show, setShow] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem("vyro_welcome_bonus_shown");
    if (!shown) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClaim = async () => {
    setClaiming(true);
    try {
      await base44.functions.invoke("userOnboarding", { action: "claimWelcomeBonus" });
      setClaimed(true);
      localStorage.setItem("vyro_welcome_bonus_shown", "true");
      setTimeout(() => setShow(false), 2500);
    } catch {
      // Already claimed or error — dismiss
      localStorage.setItem("vyro_welcome_bonus_shown", "true");
      setShow(false);
    } finally {
      setClaiming(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("vyro_welcome_bonus_shown", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleDismiss} />

          <motion.div
            className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] p-6 text-center overflow-hidden"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-300/40"
                style={{ left: `${15 + i * 14}%`, top: `${10 + (i % 2) * 20}%` }}
                animate={{ y: [0, -15, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              >
                <Sparkles size={14} />
              </motion.div>
            ))}

            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
            >
              <X size={16} className="text-white/60" />
            </button>

            {claimed ? (
              <>
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4 mt-2">
                  <Coins size={32} className="text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Bonus Claimed!</h3>
                <p className="text-sm text-white/60">500 coins added to your wallet. Enjoy VYRO!</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-4 mt-2 shadow-lg shadow-yellow-500/30">
                  <Gift size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">🎉 Welcome Bonus!</h3>
                <p className="text-sm text-white/60 mb-1">You've received a welcome gift of</p>
                <div className="flex items-center justify-center gap-1.5 mb-5">
                  <Coins size={18} className="text-yellow-400" />
                  <span className="text-2xl font-bold text-yellow-400">500</span>
                  <span className="text-sm text-white/60">coins</span>
                </div>

                <button
                  onClick={handleClaim}
                  disabled={claiming}
                  className="w-full rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-sm shadow-lg transition active:scale-[0.98] disabled:opacity-50"
                  style={{ height: "48px" }}
                >
                  {claiming ? "Claiming..." : "Claim Now"}
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}