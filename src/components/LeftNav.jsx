import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, Plus, MessageCircle, User } from "lucide-react";
import { base44 } from "@/api/base44Client";

const AUTH_PATHS = [
  "/login", "/register", "/forgot-password", "/reset-password",
  "/splash", "/welcome", "/language-selection", "/region-selection",
  "/permissions-intro", "/mobile-register", "/create-password",
  "/profile-setup", "/welcome-animation",
];

const RAIL_WIDTH = 48;

export default function LeftNav() {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

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

  if (AUTH_PATHS.includes(location.pathname)) return null;
  if (location.pathname.startsWith("/live-room")) return null;

  const tabs = [
    { icon: Home, label: "Home", path: "/", color: "#8B5CF6" },
    { icon: Users, label: "Community", path: "/community-dashboard", color: "#3B82F6" },
    { icon: Plus, label: "Live", path: "/go-live", color: "#EC4899", isCenter: true },
    { icon: MessageCircle, label: "Inbox", path: "/messages", color: "#10B981", badge: unreadCount },
    { icon: User, label: "Profile", path: "/profile-dashboard", color: "#F59E0B" },
  ];

  const handleTabClick = (path) => {
    if (navigator.vibrate) navigator.vibrate(10);
    if (location.pathname === path) {
      window.dispatchEvent(new CustomEvent("tab-refresh", { detail: { path } }));
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate(path);
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className="fixed top-0 left-0 bottom-0 z-50 flex flex-col items-center safe-top safe-bottom"
      style={{
        width: `${RAIL_WIDTH}px`,
        background: "#FFFFFF",
        borderRight: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "2px 0 8px rgba(13,27,62,0.05)",
        paddingTop: "8px",
        paddingBottom: "72px",
        gap: "4px",
      }}
    >
      {tabs.map((tab) => {
        const active = isActive(tab.path);

        if (tab.isCenter) {
          return (
            <button
              key={tab.label}
              onClick={() => handleTabClick(tab.path)}
              className="flex flex-col items-center gap-0.5 active:scale-90 transition my-1"
              aria-label={tab.label}
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: "34px",
                  height: "34px",
                  background: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #EC4899 100%)",
                  boxShadow: "0 3px 10px rgba(139,92,246,0.4)",
                }}
              >
                <tab.icon size={18} className="text-white" strokeWidth={2.5} />
              </div>
            </button>
          );
        }

        return (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab.path)}
            className="flex flex-col items-center gap-0.5 py-2 active:scale-90 transition relative w-full justify-center"
            aria-label={tab.label}
          >
            <div className="relative">
              <tab.icon
                size={20}
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
          </button>
        );
      })}
    </div>
  );
}