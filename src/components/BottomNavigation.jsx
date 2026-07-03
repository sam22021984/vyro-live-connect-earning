import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Compass, Plus, MessageCircle, User, WifiOff, Users } from "lucide-react";
import { base44 } from "@/api/base44Client";

const HIDE_DELAY = 5000;
const AUTH_PATHS = ["/login", "/register", "/forgot-password", "/reset-password", "/splash", "/welcome", "/language-selection", "/region-selection", "/permissions-intro", "/mobile-register", "/create-password", "/profile-setup", "/welcome-animation"];

// Scroll position memory per tab route
const scrollMemory = {};

function useScrollMemory(path) {
  const saveScroll = useCallback(() => {
    scrollMemory[path] = window.scrollY;
  }, [path]);

  const restoreScroll = useCallback(() => {
    if (scrollMemory[path] !== undefined) {
      window.scrollTo({ top: scrollMemory[path], behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [path]);

  useEffect(() => {
    restoreScroll();
    const handler = () => saveScroll();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [restoreScroll, saveScroll]);

  return saveScroll;
}

export default function BottomNavigation() {
  const [visible, setVisible] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useScrollMemory(location.pathname);

  // Track unread messages
  useEffect(() => {
    const loadUnread = async () => {
      try {
        const conversations = await base44.entities.ChatConversation.list();
        const unread = conversations.reduce((sum, c) => sum + (c.unread_count || 0), 0);
        setUnreadCount(unread);
      } catch {}
    };
    loadUnread();
    const sub = base44.entities.ChatConversation?.subscribe?.(() => loadUnread());
    return () => { if (sub) sub(); };
  }, []);

  // Online/offline detection
  useEffect(() => {
    const goOnline = () => setIsOffline(false);
    const goOffline = () => setIsOffline(true);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  // Auto-hide on auth/onboarding pages
  useEffect(() => {
    if (AUTH_PATHS.includes(location.pathname)) return;

    const handleInteraction = () => {
      setVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(false), HIDE_DELAY);
    };

    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("click", handleInteraction);
    window.addEventListener("scroll", handleInteraction, { passive: true });

    handleInteraction();

    return () => {
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [location.pathname]);

  if (AUTH_PATHS.includes(location.pathname)) return null;

  const tabs = [
    { icon: Home, label: "Home", path: "/", color: "#8B5CF6" },
    { icon: Users, label: "Community", path: "/community-dashboard", color: "#3B82F6" },
    { icon: Plus, label: "Go Live", path: "/go-live", color: "#EC4899", isCenter: true },
    { icon: MessageCircle, label: "Inbox", path: "/messages", color: "#10B981", badge: unreadCount },
    { icon: User, label: "Profile", path: "/profile-dashboard", color: "#F59E0B" },
  ];

  const handleTabClick = (path) => {
    if (navigator.vibrate) navigator.vibrate(10);

    // If already on the tab, scroll to top and save 0
    if (location.pathname === path) {
      scrollMemory[path] = 0;
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Trigger refresh by dispatching a custom event
      window.dispatchEvent(new CustomEvent("tab-refresh", { detail: { path } }));
      return;
    }
    navigate(path);
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Offline indicator */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-500 text-white text-center py-1 text-[10px] font-bold flex items-center justify-center gap-1.5">
          <WifiOff size={11} /> You're offline. Showing cached content.
        </div>
      )}

      <div
        className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-out safe-bottom"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(100%)",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <div
          className="flex items-center justify-around px-2 py-1.5 mx-auto"
          style={{
            maxWidth: "480px",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%))",
            borderTop: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 -4px 24px rgba(13,27,62,0.06)",
          }}
        >
          {tabs.map((tab) => {
            const active = isActive(tab.path);

            if (tab.isCenter) {
              return (
                <button
                  key={tab.label}
                  onClick={() => handleTabClick(tab.path)}
                  className="flex flex-col items-center gap-0.5 active:scale-90 transition"
                  style={{ transform: "translateY(-8px)" }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #EC4899 100%)",
                      boxShadow: "0 6px 20px rgba(139,92,246,0.5), 0 0 12px rgba(236,72,153,0.25), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.15)",
                      animation: "floatingGlow 2.5s ease-in-out infinite",
                    }}
                  >
                    <tab.icon size={22} className="text-white" strokeWidth={2.5} style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }} />
                  </div>
                  <span className="text-[8px] font-bold text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #8B5CF6, #EC4899)" }}>{tab.label}</span>
                </button>
              );
            }

            return (
              <button
                key={tab.label}
                onClick={() => handleTabClick(tab.path)}
                className="flex flex-col items-center gap-0.5 py-1 px-2 active:scale-90 transition relative"
              >
                <div className="relative">
                  <tab.icon
                    size={22}
                    strokeWidth={active ? 2.5 : 2}
                    style={{
                      color: active ? tab.color : "#9CA3AF",
                      transition: "all 0.2s",
                    }}
                  />
                  {tab.badge > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 min-w-[15px] h-[15px] px-0.5 rounded-full text-white text-[8px] font-bold flex items-center justify-center"
                      style={{ background: "#EF4444", border: "1.5px solid #fff" }}
                    >
                      {tab.badge > 99 ? "99+" : tab.badge}
                    </span>
                  )}
                  {active && (
                    <div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: tab.color }}
                    />
                  )}
                </div>
                <span
                  className="text-[8px] font-bold transition"
                  style={{ color: active ? tab.color : "#9CA3AF" }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}