import React from "react";
import { ArrowLeft, Search, Bell, SlidersHorizontal, Plus, RefreshCw } from "lucide-react";
import { COLORS } from "./partyData";
import { useToast } from "@/components/ui/use-toast";

export default function PartyHeader({ onSearch }) {
  const { toast } = useToast();

  return (
    <div className="sticky top-0 z-20" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${COLORS.border}` }}>
      <div className="px-4 py-2.5 flex items-center gap-2.5">
        <button onClick={() => window.history.back()} className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: COLORS.bgPrimary }}>
          <ArrowLeft size={18} style={{ color: COLORS.textPrimary }} />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-bold flex items-center gap-1" style={{ color: COLORS.textPrimary }}>
            🎉 Party Dashboard
          </h1>
          <p className="text-[9px]" style={{ color: COLORS.textSecondary }}>Enterprise Social Party Platform</p>
        </div>

        <button onClick={() => toast({ title: "Notifications" })} className="w-9 h-9 rounded-xl flex items-center justify-center relative flex-shrink-0" style={{ background: COLORS.bgPrimary }}>
          <Bell size={16} style={{ color: COLORS.amber }} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: COLORS.crimson }} />
        </button>

        <button onClick={() => toast({ title: "Filters" })} className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: COLORS.bgPrimary }}>
          <SlidersHorizontal size={15} style={{ color: COLORS.textSecondary }} />
        </button>

        <button onClick={() => toast({ title: "Refreshing..." })} className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: COLORS.bgPrimary }}>
          <RefreshCw size={15} style={{ color: COLORS.emerald }} />
        </button>

        <button onClick={() => toast({ title: "Create Party Room" })} className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-white flex-shrink-0 transition active:scale-95" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})`, boxShadow: `0 4px 12px ${COLORS.gold}30` }}>
          <Plus size={14} /> Create
        </button>
      </div>

      <div className="px-4 pb-2.5">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: COLORS.textSecondary }} />
          <input
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Search party rooms, hosts, categories..."
            className="w-full py-2 pl-9 pr-4 rounded-xl text-xs outline-none"
            style={{ background: COLORS.bgPrimary, border: `1px solid ${COLORS.border}`, color: COLORS.textPrimary }}
          />
        </div>
      </div>
    </div>
  );
}