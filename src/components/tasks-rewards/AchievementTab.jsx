import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { X, Gift } from "lucide-react";
import { achievementCategories, achievements, COLORS } from "./tasksData";
import AchievementCard from "./AchievementCard";

export default function AchievementTab() {
  const [cat, setCat] = useState("user");
  const [achList, setAchList] = useState(achievements);
  const [detail, setDetail] = useState(null);
  const { toast } = useToast();

  const handleClaim = (ach) => {
    setAchList((prev) => ({
      ...prev,
      [cat]: prev[cat].map((a) => (a.id === ach.id ? { ...a, status: "claimed" } : a)),
    }));
    toast({ title: "🎁 Reward Claimed!", description: `${ach.name} - ${ach.reward}` });
  };

  const handleShare = (ach) => {
    toast({ title: "📢 Shared to Feed!", description: `${ach.name} achievement shared.` });
  };

  return (
    <div>
      <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
        {achievementCategories.map((c) => (
          <button key={c.key} onClick={() => setCat(c.key)}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap active:scale-95 transition flex items-center gap-1.5 ${cat === c.key ? "text-white" : ""}`}
            style={cat === c.key ? { background: COLORS.primary } : { background: COLORS.cardBg, color: COLORS.muted, border: "1px solid #EEF0F4" }}>
            <span>{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {achList[cat].map((a) => (
          <AchievementCard key={a.id} achievement={a} onView={setDetail} onClaim={handleClaim} onShare={handleShare} />
        ))}
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetail(null)} />
          <div className="relative w-full max-w-md bg-white rounded-t-3xl animate-fadeIn">
            <div className="sticky top-0 bg-white pt-3 pb-2 z-10">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
              <div className="flex items-center justify-between px-4">
                <h2 className="text-sm font-bold" style={{ color: COLORS.navy }}>Achievement</h2>
                <button onClick={() => setDetail(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="px-4 pb-6">
              <div className="flex flex-col items-center py-4">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-3"
                  style={{ background: detail.status === "locked" ? "#E5E7EB" : `${COLORS.primary}15`, border: `1px solid ${COLORS.primary}30`, opacity: detail.status === "locked" ? 0.6 : 1 }}>
                  {detail.badge}
                </div>
                <h3 className="text-base font-bold" style={{ color: COLORS.navy }}>{detail.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1.5 capitalize" style={{ background: COLORS.cardBg, color: COLORS.muted }}>{detail.status.replace("_", " ")}</span>
              </div>
              <div className="rounded-2xl p-3 mb-3" style={{ background: COLORS.cardBg }}>
                <p className="text-[11px] font-bold mb-1" style={{ color: COLORS.navy }}>Unlock Condition</p>
                <p className="text-xs" style={{ color: COLORS.muted }}>{detail.condition}</p>
              </div>
              <div className="rounded-2xl p-3" style={{ background: `${COLORS.gold}10`, border: `1px solid ${COLORS.gold}30` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Gift size={13} style={{ color: COLORS.gold }} />
                  <p className="text-[11px] font-bold" style={{ color: COLORS.gold }}>Reward</p>
                </div>
                <p className="text-xs" style={{ color: COLORS.navy }}>{detail.reward}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}