import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mic, ImagePlay, Video, MessageCircle, User } from "lucide-react";

const HIDE_DELAY = 4000;
const AUTH_PATHS = ["/login", "/register", "/forgot-password", "/reset-password"];

export default function FloatingNavigation() {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const showNav = useCallback(() => {
    setVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), HIDE_DELAY);
  }, []);

  useEffect(() => {
    if (AUTH_PATHS.includes(location.pathname)) return;

    const handleInteraction = () => showNav();

    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("click", handleInteraction);
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("wheel", handleInteraction, { passive: true });

    showNav();

    return () => {
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("wheel", handleInteraction);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [location.pathname, showNav]);

  if (AUTH_PATHS.includes(location.pathname)) return null;

  const handleTap = (path) => {
    if (navigator.vibrate) navigator.vibrate(10);
    navigate(path);
  };

  const sideButtons = [
    { icon: Mic, label: "Party", path: "/more-services", color: "#EF4444" },
    { icon: ImagePlay, label: "Moments", path: "/", color: "#EC4899" },
  ];
  const rightButtons = [
    { icon: MessageCircle, label: "Messages", path: "/more-services", color: "#3B82F6", badge: 3 },
    { icon: User, label: "Me", path: "/", color: "#F59E0B" },
  ];

  const renderSideButton = (btn) => (
    <button
      key={btn.label}
      onClick={() => handleTap(btn.path)}
      className="flex flex-col items-center gap-0 w-9 py-0.5 active:scale-90 transition"
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center relative"
        style={{
          background: `${btn.color}12`,
          border: `1px solid ${btn.color}20`,
        }}
      >
        <btn.icon size={14} style={{ color: btn.color }} strokeWidth={2.5} />
        {btn.badge && (
          <span
            className="absolute -top-0.5 -right-0.5 min-w-[13px] h-[13px] px-0.5 rounded-full text-white text-[7px] font-bold flex items-center justify-center"
            style={{ background: "#EF4444", border: "1.5px solid #fff" }}
          >
            {btn.badge}
          </span>
        )}
      </div>
      <span className="text-[7px] font-bold text-gray-600">{btn.label}</span>
    </button>
  );

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div
        className="flex items-center gap-0 mb-0.5 px-2 py-1 rounded-full pointer-events-auto"
        style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: "0 8px 32px rgba(13,27,62,0.15), 0 2px 8px rgba(13,27,62,0.08), inset 0 1px 0 rgba(255,255,255,0.95)",
        }}
      >
        {sideButtons.map(renderSideButton)}

        {/* Go Live — Center Main Button */}
        <button
          onClick={() => handleTap("/")}
          className="flex flex-col items-center gap-0 mx-1.5 active:scale-90 transition"
          style={{ transform: "translateY(-3px)" }}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #EC4899 100%)",
              boxShadow: "0 6px 20px rgba(139,92,246,0.5), 0 0 12px rgba(236,72,153,0.25), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.15)",
              animation: "floatingGlow 2.5s ease-in-out infinite",
            }}
          >
            <Video size={20} className="text-white" strokeWidth={2.5} style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }} />
          </div>
          <span className="text-[7px] font-bold text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #8B5CF6, #EC4899)" }}>Go Live</span>
        </button>

        {rightButtons.map(renderSideButton)}
      </div>
    </div>
  );
}