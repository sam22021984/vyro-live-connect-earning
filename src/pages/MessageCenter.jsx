import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Mail, Bell, Megaphone, LifeBuoy, BadgeCheck, Flag, Server,
  CheckCircle, XCircle, Scale, ShieldAlert, Archive, Circle, ChevronRight,
} from "lucide-react";
import { MESSAGE_CATEGORIES } from "@/components/message-center/messageCenterData";
import CategoryContent from "@/components/message-center/CategoryContent";
import { useToast } from "@/components/ui/use-toast";
import { useServicesData } from "@/hooks/useServicesData";

const ICON_MAP = {
  ArrowLeft, Mail, Bell, Megaphone, LifeBuoy, BadgeCheck, Flag, Server,
  CheckCircle, XCircle, Scale, ShieldAlert, Archive, Circle, ChevronRight,
};

const getIcon = (name, size = 16, className = "") => {
  const Icon = ICON_MAP[name] || Circle;
  return <Icon size={size} className={className} />;
};

const DARK_BG = "linear-gradient(160deg, #0A0F1E 0%, #131A2E 40%, #1A1240 100%)";
const SOFT_WHITE = "#F4F0FA";
const GOLD = "#D4AF37";
const ROYAL_BLUE = "#3B82F6";
const GLASS = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" };

export default function MessageCenter() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data, loading, markAllAsRead } = useServicesData();
  const [activeCategory, setActiveCategory] = useState(MESSAGE_CATEGORIES[0].id);
  const currentCategory = MESSAGE_CATEGORIES.find((c) => c.id === activeCategory);

  const mcStats = data?.messageCenter?.stats || { unread: 0, alerts: 0, announcements: 0, tickets: 0, total: 0 };
  const mcNotifications = data?.messageCenter?.notificationsByType || {};

  const handleMarkAllRead = async () => {
    await markAllAsRead();
    toast({ title: "✅ All messages marked as read" });
  };

  const realStats = [
    { label: "Total Messages", value: String(mcStats.total), icon: "Mail", color: "#3B82F6", trend: `${mcStats.unread} unread` },
    { label: "Unread Messages", value: String(mcStats.unread), icon: "Bell", color: "#EF4444", trend: mcStats.unread > 0 ? "Needs attention" : "All read" },
    { label: "Announcements", value: String(mcStats.announcements), icon: "Megaphone", color: "#8B5CF6", trend: "Official" },
    { label: "Support Tickets", value: String(mcStats.tickets), icon: "LifeBuoy", color: "#F59E0B", trend: mcStats.tickets > 0 ? "Active" : "None open" },
    { label: "Security Alerts", value: String(mcStats.alerts), icon: "ShieldAlert", color: "#DC2626", trend: mcStats.alerts > 0 ? "Review needed" : "All clear" },
    { label: "System Messages", value: String(mcStats.total), icon: "Server", color: "#6366F1", trend: "Auto-generated" },
  ];

  return (
    <div className="min-h-screen" style={{ background: DARK_BG }}>
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "rgba(10,15,30,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.08)" }}>
            <ArrowLeft size={18} style={{ color: SOFT_WHITE }} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold" style={{ color: SOFT_WHITE }}>Message Center</h1>
            <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>Enterprise Communication Hub</p>
          </div>
          <button onClick={handleMarkAllRead} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: `linear-gradient(135deg, ${ROYAL_BLUE}, #6366F1)` }} title="Mark all as read">
            <Mail size={18} className="text-white" />
          </button>
        </div>

        {/* Hero Banner */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 relative overflow-hidden" style={{ ...GLASS, background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(99,102,241,0.1))" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <Bell size={16} style={{ color: GOLD }} />
                <h2 className="text-sm font-bold" style={{ color: SOFT_WHITE }}>Communication Center</h2>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "rgba(244,240,250,0.6)" }}>
                Your centralized hub for platform notifications, support communications, verification updates, reports, violations, and official announcements.
              </p>
              <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <p className="text-lg font-bold" style={{ color: GOLD }}>{mcStats.unread}</p>
                  <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>Unread</p>
                </div>
                <div>
                  <p className="text-lg font-bold" style={{ color: "#EF4444" }}>{mcStats.alerts}</p>
                  <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>Alerts</p>
                </div>
                <div>
                  <p className="text-lg font-bold" style={{ color: "#10B981" }}>{mcStats.announcements}</p>
                  <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>Announcements</p>
                </div>
                <div>
                  <p className="text-lg font-bold" style={{ color: ROYAL_BLUE }}>{mcStats.tickets}</p>
                  <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>Tickets</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Statistics */}
        <div className="px-4 pt-4">
          <h3 className="text-xs font-bold mb-2 px-1" style={{ color: SOFT_WHITE }}>Dashboard Statistics</h3>
          <div className="grid grid-cols-3 gap-2">
            {realStats.map((s, i) => (
              <div key={i} className="rounded-xl p-2.5 text-center" style={GLASS}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center mx-auto mb-1.5" style={{ background: `${s.color}20` }}>
                  <span style={{ color: s.color }}>{getIcon(s.icon, 13)}</span>
                </div>
                <p className="text-sm font-bold leading-none" style={{ color: SOFT_WHITE }}>{s.value}</p>
                <p className="text-[8px] mt-1 leading-tight" style={{ color: "rgba(244,240,250,0.4)" }}>{s.label}</p>
                <p className="text-[7px] mt-0.5 leading-tight" style={{ color: s.color }}>{s.trend}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Grid */}
        <div className="px-4 pt-4">
          <h3 className="text-xs font-bold mb-2 px-1" style={{ color: SOFT_WHITE }}>Categories</h3>
          <div className="grid grid-cols-2 gap-2">
            {MESSAGE_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className="flex items-center gap-2 p-3 rounded-2xl transition active:scale-95"
                style={activeCategory === c.id
                  ? { background: c.gradient, boxShadow: `0 4px 12px ${c.color}40` }
                  : { ...GLASS }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={activeCategory === c.id ? { background: "rgba(255,255,255,0.2)" } : { background: `${c.color}20` }}>
                  {getIcon(c.icon, 15, activeCategory === c.id ? "text-white" : "")}
                </div>
                <span className="text-[10px] font-bold leading-tight text-left" style={activeCategory === c.id ? { color: "#fff" } : { color: SOFT_WHITE }}>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Category Content */}
        <div className="px-4 pt-4">
          <CategoryContent category={currentCategory} realNotifications={mcNotifications[currentCategory?.id] || []} onMarkRead={(id) => { /* handled by hook */ }} />
        </div>
      </div>
    </div>
  );
}