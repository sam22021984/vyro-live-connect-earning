import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Settings, Shield, Bell, Globe, HelpCircle, MessageSquare, Flag, Info, RefreshCw, LogOut, ChevronRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

const MENU_ITEMS = [
  { id: "account_settings", label: "Account Settings", icon: Settings, path: "/settings/0" },
  { id: "privacy", label: "Privacy Settings", icon: Shield, path: "/settings/2" },
  { id: "security", label: "Security Settings", icon: Shield, path: "/settings/8" },
  { id: "notifications", label: "Notifications", icon: Bell, path: "/settings/4" },
  { id: "language", label: "Language", icon: Globe, path: "/settings/3" },
  { id: "help", label: "Help Center", icon: HelpCircle, path: "/support-center" },
  { id: "feedback", label: "Feedback", icon: MessageSquare, path: "/support-center" },
  { id: "report", label: "Report a Problem", icon: Flag, path: "/support-center" },
  { id: "about", label: "About App", icon: Info, path: "/settings/6" },
  { id: "switch", label: "Switch Account", icon: RefreshCw },
  { id: "logout", label: "Logout", icon: LogOut, color: "text-red-500" },
];

export default function MyMoreMenu({ onClose }) {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleAction = (item) => {
    if (item.id === "logout") { setShowLogoutConfirm(true); return; }
    if (item.id === "switch") { window.location.href = "/login"; return; }
    if (item.path) navigate(item.path);
    onClose();
  };

  const handleLogout = async () => {
    try { await base44.auth.logout("/splash"); } catch { window.location.href = "/splash"; }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={onClose}>
        <div className="w-full bg-white rounded-t-3xl max-h-[70vh] overflow-hidden animate-fadeIn" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
            <h3 className="text-sm font-bold text-gray-800">More Options</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-90">
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          <div className="py-1 overflow-y-auto" style={{ maxHeight: "400px" }}>
            {MENU_ITEMS.map((item) => (
              <button key={item.id} onClick={() => handleAction(item)} className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-50 transition text-left">
                <item.icon size={18} className={item.color || "text-gray-500"} />
                <span className={`text-sm font-medium flex-1 ${item.color || "text-gray-700"}`}>{item.label}</span>
                <ChevronRight size={14} className="text-gray-300" />
              </button>
            ))}
          </div>
          <div className="h-2" />
        </div>
      </div>

      {/* Logout confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center px-6" onClick={() => setShowLogoutConfirm(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-3">
              <LogOut size={28} className="text-red-500" />
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">Are you sure you want to log out?</h3>
            <p className="text-xs text-gray-400 mb-4">You'll need to sign in again to access your account.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 active:scale-95">Cancel</button>
              <button onClick={handleLogout} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-red-500 active:scale-95">Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}