import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { X, Calendar, Gift } from "lucide-react";
import { medalCategories, medals, COLORS } from "./profileStatsData";
import MedalCard from "./MedalCard";

export default function MedalTab() {
  const [cat, setCat] = useState("daily");
  const [medalList, setMedalList] = useState(medals);
  const [detail, setDetail] = useState(null);
  const { toast } = useToast();

  const handleEquip = (medal) => {
    setMedalList((prev) => ({
      ...prev,
      [cat]: prev[cat].map((m) => (m.id === medal.id ? { ...m, equipped: true } : { ...m, equipped: false })),
    }));
    toast({ title: "🎖️ Medal Equipped!", description: `${medal.name} is now active.` });
  };

  const handleShare = (medal) => {
    toast({ title: "📢 Shared to Feed!", description: `${medal.name} shared.` });
  };

  return (
    <div>
      <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
        {medalCategories.map((c) => (
          <button key={c.key} onClick={() => setCat(c.key)}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap active:scale-95 transition flex items-center gap-1.5 ${cat === c.key ? "text-white" : ""}`}
            style={cat === c.key ? { background: COLORS.primary } : { background: COLORS.cardBg, color: COLORS.muted, border: "1px solid #EEF0F4" }}>
            <span>{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {medalList[cat].map((m) => (
          <MedalCard key={m.id} medal={m} onView={setDetail} onEquip={handleEquip} onShare={handleShare} />
        ))}
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetail(null)} />
          <div className="relative w-full max-w-md bg-white rounded-t-3xl animate-fadeIn">
            <div className="sticky top-0 bg-white pt-3 pb-2 z-10">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
              <div className="flex items-center justify-between px-4">
                <h2 className="text-sm font-bold" style={{ color: COLORS.navy }}>Medal Details</h2>
                <button onClick={() => setDetail(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="px-4 pb-6">
              <div className="flex flex-col items-center py-4">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-3"
                  style={{ background: `${COLORS.gold}15`, border: `1px solid ${COLORS.gold}30` }}>
                  {detail.icon}
                </div>
                <h3 className="text-base font-bold" style={{ color: COLORS.navy }}>{detail.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1.5" style={{ background: `${COLORS.gold}20`, color: COLORS.gold }}>Rank {detail.rank}</span>
              </div>
              <div className="rounded-2xl p-3 mb-3 flex items-center gap-2" style={{ background: `${COLORS.gold}10` }}>
                <Gift size={14} style={{ color: COLORS.gold }} />
                <span className="text-xs font-bold" style={{ color: COLORS.gold }}>{detail.reward}</span>
              </div>
              <div className="rounded-2xl p-3 flex items-center gap-2" style={{ background: COLORS.cardBg }}>
                <Calendar size={14} style={{ color: COLORS.primary }} />
                <span className="text-[11px] font-bold" style={{ color: COLORS.primary }}>Earned: {detail.earned_date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}