import React, { useState } from "react";
import { X, ChevronUp, ChevronDown, Search, Power } from "lucide-react";
import { COLORS, FUNCTION_ITEMS, ENTERTAINMENT_ITEMS } from "./roomData";
import SeatManagementSection from "./SeatManagementSection";
import { useToast } from "@/components/ui/use-toast";

export default function SettingsPanel({ onClose, onArchive, onBackup, onScheduler, onEndRoom, endingRoom, giftStats, roomScore, aiStats, seatCount, onSeatCountChange, userRole = "viewer", onResetSeats }) {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");

  const isOwner = userRole === "owner";
  const isAdmin = userRole === "owner" || userRole === "admin";
  const isViewer = !isAdmin;

  const restrictedToast = () => toast({ title: "⛔ Only the room owner can change this setting", variant: "destructive" });
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

  const panelHeight = expanded ? "82vh" : "60vh";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />

      <div
        className="relative w-[90%] max-w-md flex flex-col animate-fadeIn transition-all duration-300 ease-out"
        style={{
          height: panelHeight,
          borderRadius: "26px 26px 0 0",
          background: "rgba(6, 35, 37, 0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${COLORS.gold}25`,
          borderTop: `1px solid ${COLORS.gold}40`,
          boxShadow: "0 -12px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
          overflow: "hidden",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Fixed Header */}
        <div
          className="flex-shrink-0 flex flex-col"
          style={{
            padding: "12px 20px 10px",
            borderBottom: `1px solid ${COLORS.gold}15`,
            background: "rgba(6,35,37,0.6)",
          }}
        >
          {/* Drag handle + expand toggle */}
          <div className="flex flex-col items-center mb-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex flex-col items-center gap-1 active:scale-95 transition"
            >
              <div className="w-10 h-1 rounded-full" style={{ background: `${COLORS.gold}50` }} />
              {expanded
                ? <ChevronDown size={14} style={{ color: COLORS.softGray }} />
                : <ChevronUp size={14} style={{ color: COLORS.softGray }} />}
            </button>
          </div>

          {/* Title row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-wide">Room Settings</h2>
              <span
                className="text-[8px] px-2 py-0.5 rounded-full font-bold tracking-wider"
                style={{
                  background: isOwner ? `${COLORS.gold}20` : isAdmin ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.08)",
                  color: isOwner ? COLORS.gold : isAdmin ? "#60A5FA" : COLORS.softGray,
                }}
              >
                {isOwner ? "👑 OWNER" : isAdmin ? "🛡️ ADMIN" : "👁️ VIEWER"}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center active:scale-90 transition"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <X size={14} style={{ color: COLORS.softGray }} />
            </button>
          </div>

          {/* Search bar */}
          <div
            className="flex items-center gap-2 mt-2.5 rounded-xl px-3"
            style={{
              height: "36px",
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${COLORS.gold}15`,
            }}
          >
            <Search size={13} style={{ color: COLORS.softGray }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search settings…"
              className="flex-1 bg-transparent text-[10px] text-white placeholder:text-white/35 outline-none"
            />
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ padding: "16px 20px 20px" }}>
          <div className="space-y-5">
            {/* Seat Management */}
            <section>
              <SectionLabel icon="💺" label="Seat Management" restricted={!isOwner} />
              <SeatManagementSection
                seatCount={seatCount || 10}
                onSeatCountChange={isOwner ? (onSeatCountChange || (() => {})) : () => toast({ title: "⛔ Only the room owner can change seats", variant: "destructive" })}
                readOnly={!isOwner}
              />
              {isOwner && onResetSeats && (
                <button
                  onClick={onResetSeats}
                  className="w-full mt-2 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition active:scale-95"
                  style={{ background: `${COLORS.purple}15`, border: `1px solid ${COLORS.purple}30`, color: COLORS.purple }}
                >
                  🔄 Reset All Seats
                </button>
              )}
            </section>

            <Divider />

            {/* Entertainment */}
            <section>
              <SectionLabel icon="🎉" label="Entertainment" restricted={!isAdmin} />
              <div className="grid grid-cols-3 gap-2">
                {ENTERTAINMENT_ITEMS.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => isAdmin ? toast({ title: item.label + " activated" }) : restrictedToast()}
                    disabled={!isAdmin}
                    className={`flex flex-col items-center gap-1 py-2.5 rounded-xl transition ${isAdmin ? "active:scale-95" : "opacity-40"}`}
                    style={{ background: item.gradient, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-[9px] font-bold text-white">{item.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <Divider />

            {/* Room Functions */}
            <section>
              <SectionLabel icon="⚙️" label="Room Functions" restricted={!isAdmin} />
              <div className="grid grid-cols-5 gap-2">
                {FUNCTION_ITEMS.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => isAdmin ? toast({ title: item.label }) : restrictedToast()}
                    disabled={!isAdmin}
                    className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition ${isAdmin ? "active:scale-90" : "opacity-40"}`}
                    style={{ background: "rgba(14,69,72,0.5)", border: `1px solid ${COLORS.gold}30` }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(6,35,37,0.8)", border: `1px solid ${COLORS.gold}40` }}
                    >
                      <span className="text-sm">{item.icon}</span>
                    </div>
                    <span className="text-[7px] font-semibold text-center leading-tight" style={{ color: COLORS.softGray }}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <Divider />

            {/* Live Analytics */}
            <section>
              <SectionLabel icon="📊" label="Live Analytics" />
              <div className="grid grid-cols-2 gap-2">
                <StatCard value={giftStats?.total_gift_coins ?? "—"} label="Gift Coins" />
                <StatCard value={roomScore ?? "—"} label="Room Score" />
              </div>
              {aiStats && (
                <div className="grid grid-cols-4 gap-1.5 mt-2">
                  <MiniStat value={aiStats.health} label="Health" />
                  <MiniStat value={aiStats.profit} label="Profit" />
                  <MiniStat value={aiStats.activity} label="Activity" />
                  <MiniStat value={aiStats.growth} label="Growth" />
                </div>
              )}
              {aiStats?.action && (
                <div className="rounded-lg p-2 mt-1.5 text-center" style={{ background: `${COLORS.gold}10`, border: `1px solid ${COLORS.gold}25` }}>
                  <span className="text-[9px] font-bold" style={{ color: COLORS.gold }}>🤖 AI Action: {aiStats.action}</span>
                </div>
              )}
            </section>

            <Divider />

            {/* Room Management */}
            <section>
              <SectionLabel icon="🗄️" label="Room Management" restricted={!isOwner} />
              <div className="grid grid-cols-3 gap-2">
                <MgmtButton icon="⏰" label="Scheduler" color="#3B82F6" bg="rgba(59,130,246,0.1)" border="rgba(59,130,246,0.3)" onClick={isOwner ? handleScheduler : restrictedToast} disabled={!isOwner} />
                <MgmtButton icon="💾" label="Backup" color={COLORS.gold} bg={`${COLORS.gold}15`} border={`${COLORS.gold}40`} onClick={isOwner ? handleBackup : restrictedToast} disabled={!isOwner} />
                <MgmtButton icon="📦" label="Archive" color="#FF6B6B" bg="rgba(255,107,107,0.1)" border="rgba(255,107,107,0.3)" onClick={isOwner ? handleArchive : restrictedToast} disabled={!isOwner} />
              </div>
            </section>

            {/* End Room — host only */}
            {isOwner && (
              <section>
                <button
                  onClick={onEndRoom}
                  disabled={endingRoom}
                  className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-white transition active:scale-95 disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)", boxShadow: "0 4px 12px rgba(239,68,68,0.3)" }}
                >
                  <Power size={14} />
                  {endingRoom ? "Ending Room…" : "End Live Room"}
                </button>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ icon, label, restricted }) {
  return (
    <div className="flex items-center gap-1.5 mb-2.5">
      <span className="text-xs">{icon}</span>
      <span className="text-[11px] font-bold tracking-wide" style={{ color: COLORS.gold }}>{label}</span>
      {restricted && <span className="text-[8px]" style={{ color: COLORS.softGray }}>(Restricted)</span>}
    </div>
  );
}

function Divider() {
  return <div className="h-px" style={{ background: `${COLORS.gold}10` }} />;
}

function StatCard({ value, label }) {
  return (
    <div
      className="rounded-xl p-3 text-center"
      style={{ background: "rgba(14,69,72,0.5)", border: `1px solid ${COLORS.gold}30` }}
    >
      <p className="text-lg font-bold" style={{ color: COLORS.gold }}>{value}</p>
      <p className="text-[8px]" style={{ color: COLORS.softGray }}>{label}</p>
    </div>
  );
}

function MiniStat({ value, label }) {
  return (
    <div className="rounded-lg p-2 text-center" style={{ background: "rgba(14,69,72,0.4)" }}>
      <p className="text-xs font-bold" style={{ color: value != null ? COLORS.gold : COLORS.softGray }}>{value != null ? value : "—"}</p>
      <p className="text-[7px]" style={{ color: COLORS.softGray }}>{label}</p>
    </div>
  );
}

function MgmtButton({ icon, label, color, bg, border, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl transition ${!disabled ? "active:scale-95" : "opacity-40"}`}
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <span className="text-base">{icon}</span>
      <span className="text-[9px] font-bold" style={{ color }}>{label}</span>
    </button>
  );
}