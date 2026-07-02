import React, { useRef } from "react";
import { Pin, VolumeX, Ban, Flag, Trash2 } from "lucide-react";

const OPTIONS = [
  { key: "pin", label: "Pin Chat", icon: Pin, color: "#1F6BFF" },
  { key: "mute", label: "Mute Chat", icon: VolumeX, color: "#8A94A6" },
  { key: "block", label: "Block User", icon: Ban, color: "#EF4444" },
  { key: "report", label: "Report User", icon: Flag, color: "#F59E0B" },
  { key: "delete", label: "Delete Conversation", icon: Trash2, color: "#EF4444" },
];

export default function LongPressMenu({ open, onClose, onAction, isPinned, isMuted }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl pb-6 animate-fadeIn">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-3" />
        <div className="px-4 space-y-1">
          {OPTIONS.map((opt) => {
            const active = (opt.key === "pin" && isPinned) || (opt.key === "mute" && isMuted);
            return (
              <button
                key={opt.key}
                onClick={() => onAction(opt.key)}
                className="w-full flex items-center gap-3 py-3 px-3 rounded-xl active:bg-gray-50 transition"
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${opt.color}15` }}>
                  <opt.icon size={18} style={{ color: opt.color }} />
                </div>
                <span className="text-sm font-semibold text-gray-700 flex-1 text-left">
                  {active ? `Un${opt.key === "pin" ? "pin" : "mute"} Chat` : opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}