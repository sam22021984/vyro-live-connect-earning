import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPlus, UserMinus, UserCheck, UserX, Eye, X,
  CheckCircle, Circle, ChevronRight,
} from "lucide-react";

const MENU_OPTIONS = [
  { id: "add_friend", label: "Add Friend", icon: UserPlus, color: "#10B981" },
  { id: "remove_friend", label: "Remove Friend", icon: UserMinus, color: "#EF4444" },
  { id: "follow", label: "Follow", icon: UserCheck, color: "#3B82F6" },
  { id: "block", label: "Block", icon: UserX, color: "#F59E0B" },
  { id: "unblock", label: "Unblock", icon: CheckCircle, color: "#10B981" },
  { id: "full_profile", label: "See Full Profile", icon: Eye, color: "#8B5CF6" },
];

export default function FriendsMenu({ onClose }) {
  const [action, setAction] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (opt) => {
    if (opt.id === "full_profile") {
      onClose();
      navigate("/profile-stats");
      return;
    }
    setAction(opt);
  };

  const confirmAction = () => {
    setAction(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-sm max-h-[80vh] overflow-y-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Quick Actions</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {!action ? (
          /* Menu options */
          <div className="p-2">
            {MENU_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition group"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${opt.color}15` }}>
                  <opt.icon size={18} style={{ color: opt.color }} />
                </div>
                <span className="flex-1 text-left text-sm font-medium text-gray-700">{opt.label}</span>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition" />
              </button>
            ))}
          </div>
        ) : (
          /* Confirm action */
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `${action.color}15` }}>
              <action.icon size={32} style={{ color: action.color }} />
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">{action.label}?</h3>
            <p className="text-xs text-gray-400 mb-5 leading-relaxed">
              Are you sure you want to {action.label.toLowerCase()} this user? This action can be changed later.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setAction(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 active:scale-95 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white active:scale-95 transition"
                style={{ background: action.color }}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}