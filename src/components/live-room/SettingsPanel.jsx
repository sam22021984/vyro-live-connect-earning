import React from "react";
import { X } from "lucide-react";
import { COLORS, FUNCTION_ITEMS, ENTERTAINMENT_ITEMS } from "./roomData";
import { useToast } from "@/components/ui/use-toast";

export default function SettingsPanel({ onClose, onArchive, onBackup, onScheduler, giftStats, roomScore, aiStats }) {
  const { toast } = useToast();

  const isFailed = (res) => res?.success === false || (!!res?.error && !res?.success);

  const handleArchive = async () => {
    toast({ title: "Archiving room…" });
    const res = onArchive ? await onArchive() : null;
    toast({ title: isFailed(res) ? `Archive failed: ${res?.error || ""}` : "Room archived ✓", variant: isFailed(res) ? "destructive" : "default" });
  };

  const handleBackup = async () => {
    toast({ title: "Backing up room data…" });
    const res = onBackup ? await onBackup() : null;
    toast({ title: isFailed(res) ? `Backup failed: ${res?.error || ""}` : "Room backed up ✓", variant: isFailed(res) ? "destructive" : "default" });
  };

  const handleScheduler = async () => {
    toast({ title: "Running scheduler…" });
    const res = onScheduler ? await onScheduler() : null;
    toast({ title: isFailed(res) ? "Scheduler failed" : `Scheduler ran ✓ (${res?.processed_rooms ?? 0} rooms)`, variant: isFailed(res) ? "destructive" : "default" });
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

          {/* Live room analytics */}
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: COLORS.gold }}>📊 Live Analytics</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl p-3 text-center" style={{ background: "rgba(14,69,72,0.5)", border: `1px solid ${COLORS.gold}30` }}>
                <p className="text-lg font-bold" style={{ color: COLORS.gold }}>{giftStats?.total_gift_coins ?? "—"}</p>
                <p className="text-[8px]" style={{ color: COLORS.softGray }}>Gift Coins</p>
              </div>
              <div className="rounded-xl p-3 text-center" style={{ background: "rgba(14,69,72,0.5)", border: `1px solid ${COLORS.gold}30` }}>
                <p className="text-lg font-bold" style={{ color: COLORS.gold }}>{roomScore ?? "—"}</p>
                <p className="text-[8px]" style={{ color: COLORS.softGray }}>Room Score</p>
              </div>
            </div>
            {aiStats && (
              <div className="grid grid-cols-4 gap-1.5 mt-2">
                <div className="rounded-lg p-2 text-center" style={{ background: "rgba(14,69,72,0.4)" }}>
                  <p className="text-xs font-bold" style={{ color: aiStats.health != null ? COLORS.gold : COLORS.softGray }}>{aiStats.health != null ? aiStats.health : "—"}</p>
                  <p className="text-[7px]" style={{ color: COLORS.softGray }}>Health</p>
                </div>
                <div className="rounded-lg p-2 text-center" style={{ background: "rgba(14,69,72,0.4)" }}>
                  <p className="text-xs font-bold" style={{ color: aiStats.profit != null ? COLORS.gold : COLORS.softGray }}>{aiStats.profit != null ? aiStats.profit : "—"}</p>
                  <p className="text-[7px]" style={{ color: COLORS.softGray }}>Profit</p>
                </div>
                <div className="rounded-lg p-2 text-center" style={{ background: "rgba(14,69,72,0.4)" }}>
                  <p className="text-xs font-bold" style={{ color: aiStats.activity != null ? COLORS.gold : COLORS.softGray }}>{aiStats.activity != null ? aiStats.activity : "—"}</p>
                  <p className="text-[7px]" style={{ color: COLORS.softGray }}>Activity</p>
                </div>
                <div className="rounded-lg p-2 text-center" style={{ background: "rgba(14,69,72,0.4)" }}>
                  <p className="text-xs font-bold" style={{ color: aiStats.growth != null ? COLORS.gold : COLORS.softGray }}>{aiStats.growth != null ? aiStats.growth : "—"}</p>
                  <p className="text-[7px]" style={{ color: COLORS.softGray }}>Growth</p>
                </div>
              </div>
            )}
            {aiStats?.action && (
              <div className="rounded-lg p-2 mt-1.5 text-center" style={{ background: `${COLORS.gold}10`, border: `1px solid ${COLORS.gold}25` }}>
                <span className="text-[9px] font-bold" style={{ color: COLORS.gold }}>🤖 AI Action: {aiStats.action}</span>
              </div>
            )}
          </div>

          {/* Room management: scheduler + backup + archive */}
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: COLORS.gold }}>🗄️ Room Management</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleScheduler}
                className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl transition active:scale-95"
                style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)" }}
              >
                <span className="text-base">⏰</span>
                <span className="text-[9px] font-bold" style={{ color: "#3B82F6" }}>Scheduler</span>
              </button>
              <button
                onClick={handleBackup}
                className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl transition active:scale-95"
                style={{ background: `${COLORS.gold}15`, border: `1px solid ${COLORS.gold}40` }}
              >
                <span className="text-base">💾</span>
                <span className="text-[9px] font-bold" style={{ color: COLORS.gold }}>Backup</span>
              </button>
              <button
                onClick={handleArchive}
                className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl transition active:scale-95"
                style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)" }}
              >
                <span className="text-base">📦</span>
                <span className="text-[9px] font-bold" style={{ color: "#FF6B6B" }}>Archive</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}