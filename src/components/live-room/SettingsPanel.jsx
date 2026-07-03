import React from "react";
import { X } from "lucide-react";
import { COLORS, FUNCTION_ITEMS, ENTERTAINMENT_ITEMS } from "./roomData";
import { useToast } from "@/components/ui/use-toast";

export default function SettingsPanel({ onClose, onArchive, onBackup }) {
  const { toast } = useToast();

  const handleArchive = async () => {
    toast({ title: "Archiving room…" });
    const res = onArchive ? await onArchive() : null;
    toast({ title: res?.success === false ? "Archive failed" : "Room archived ✓" });
  };

  const handleBackup = async () => {
    toast({ title: "Backing up room data…" });
    const res = onBackup ? await onBackup() : null;
    toast({ title: res?.success === false ? "Backup failed" : "Room backed up ✓" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-md rounded-t-3xl max-h-[80vh] overflow-y-auto animate-fadeIn"
        style={{
          background: COLORS.tealDeep,
          border: `1px solid ${COLORS.gold}30`,
          boxShadow: `0 -8px 32px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Drag handle */}
        <div className="sticky top-0 z-10 pt-3 pb-2" style={{ background: COLORS.tealDeep }}>
          <div className="w-10 h-1 rounded-full mx-auto mb-2" style={{ background: `${COLORS.gold}40` }} />
          <div className="flex items-center justify-between px-4">
            <h2 className="text-sm font-bold text-white">Room Settings</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
              <X size={16} style={{ color: COLORS.softGray }} />
            </button>
          </div>
        </div>

        <div className="px-4 pb-6 space-y-4">
          {/* Entertainment quick actions */}
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: COLORS.gold }}>🎉 Entertainment</p>
            <div className="grid grid-cols-3 gap-2">
              {ENTERTAINMENT_ITEMS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => toast({ title: item.label + " activated" })}
                  className="flex flex-col items-center gap-1 py-2.5 rounded-xl transition active:scale-95"
                  style={{ background: item.gradient, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[9px] font-bold text-white">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Function grid (5x3) */}
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: COLORS.gold }}>⚙️ Room Functions</p>
            <div className="grid grid-cols-5 gap-2">
              {FUNCTION_ITEMS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => toast({ title: item.label })}
                  className="flex flex-col items-center gap-1 p-1.5 rounded-xl transition active:scale-90"
                  style={{
                    background: "rgba(14, 69, 72, 0.5)",
                    border: `1px solid ${COLORS.gold}30`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(6,35,37,0.8)",
                      border: `1px solid ${COLORS.gold}40`,
                    }}
                  >
                    <span className="text-sm">{item.icon}</span>
                  </div>
                  <span className="text-[7px] font-semibold text-center leading-tight" style={{ color: COLORS.softGray }}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Room management: archive + backup */}
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: COLORS.gold }}>🗄️ Room Management</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleBackup}
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl transition active:scale-95"
                style={{ background: `${COLORS.gold}15`, border: `1px solid ${COLORS.gold}40` }}
              >
                <span className="text-base">💾</span>
                <span className="text-[10px] font-bold" style={{ color: COLORS.gold }}>Backup Data</span>
              </button>
              <button
                onClick={handleArchive}
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl transition active:scale-95"
                style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)" }}
              >
                <span className="text-base">📦</span>
                <span className="text-[10px] font-bold" style={{ color: "#FF6B6B" }}>Archive Room</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}