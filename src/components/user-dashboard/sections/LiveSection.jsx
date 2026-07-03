import React, { useState } from "react";
import { GlassCard, SectionHeader, ActionButton, TEXT_MUTED } from "../Shared";
import { LIVE_DATA } from "../userDashboardData";

export default function LiveSection() {
  const [activeCat, setActiveCat] = useState(LIVE_DATA.categories[0]);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {LIVE_DATA.categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition ${activeCat === c ? "text-white" : ""}`}
              style={activeCat === c ? { background: "#8B5CF6" } : { background: "rgba(255,255,255,0.05)", color: TEXT_MUTED }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <GlassCard>
        <SectionHeader title="Recently Watched" icon="👁️" />
        <div className="space-y-2">
          {LIVE_DATA.recentlyWatched.map((r, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white">{r.title}</p>
                <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{r.name} · {r.viewers} viewers</p>
              </div>
              {r.live ? (
                <span className="text-[8px] px-2 py-0.5 rounded-full font-bold animate-pulse" style={{ background: "#EF444420", color: "#EF4444" }}>● LIVE</span>
              ) : (
                <span className="text-[8px] px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(255,255,255,0.05)", color: TEXT_MUTED }}>OFFLINE</span>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Trending Live" icon="🔥" />
        <div className="space-y-2">
          {LIVE_DATA.trending.map((t, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#8B5CF615" }}>
                <span className="text-sm">🔥</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white">{t.name}</p>
                <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{t.viewers} watching</p>
              </div>
              {t.live && <span className="text-[8px] px-2 py-0.5 rounded-full font-bold animate-pulse" style={{ background: "#EF444420", color: "#EF4444" }}>● LIVE</span>}
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Favorite Hosts" icon="⭐" />
        <div className="grid grid-cols-2 gap-2">
          {LIVE_DATA.favoriteHosts.map((h, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
              <img src={h.avatar} alt={h.name} className="w-9 h-9 rounded-full object-cover" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-white truncate">{h.name}</p>
                <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{h.followers} followers</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-3 gap-2">
          {LIVE_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}