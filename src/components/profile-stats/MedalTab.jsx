import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { X, Calendar, Gift, Lock } from "lucide-react";
import { COLORS } from "./profileStatsData";
import MedalCard from "./MedalCard";

const defaultMedals = [
  { id: "d1", name: "No Medals Yet", rank: "—", icon: "🎖️", reward: "Complete tasks to earn medals", earned_date: "Locked", equipped: false },
];

export default function MedalTab({ achievements = [] }) {
  const [detail, setDetail] = useState(null);
  const [medalList, setMedalList] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    // Map Achievement records to medal display format
    if (!achievements || achievements.length === 0) {
      setMedalList(defaultMedals);
      return;
    }

    const mapped = achievements.map((a, i) => ({
      id: a.id || `m${i}`,
      name: a.name || "Medal",
      rank: a.is_unlocked ? `#${i + 1}` : "Locked",
      icon: a.icon || "🎖️",
      reward: a.description || "Achievement reward",
      earned_date: a.is_unlocked && a.created_date ? new Date(a.created_date).toLocaleDateString() : "Locked",
      equipped: false,
      is_unlocked: a.is_unlocked || false,
      color: a.color || COLORS.gold,
    }));

    // Show earned first, then locked
    mapped.sort((a, b) => (b.is_unlocked ? 1 : 0) - (a.is_unlocked ? 1 : 0));
    setMedalList(mapped);
  }, [achievements]);

  const handleEquip = (medal) => {
    setMedalList((prev) => prev.map((m) => (m.id === medal.id ? { ...m, equipped: true } : { ...m, equipped: false })));
    toast({ title: "🎖️ Medal Equipped!", description: `${medal.name} is now active.` });
  };

  const handleShare = (medal) => {
    toast({ title: "📢 Shared to Feed!", description: `${medal.name} shared.` });
  };

  const earned = medalList.filter((m) => m.is_unlocked);
  const locked = medalList.filter((m) => !m.is_unlocked);

  return (
    <div>
      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="rounded-2xl p-2.5 text-center" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
          <p className="text-base font-bold" style={{ color: COLORS.gold }}>{earned.length}</p>
          <p className="text-[8px]" style={{ color: COLORS.muted }}>Earned</p>
        </div>
        <div className="rounded-2xl p-2.5 text-center" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
          <p className="text-base font-bold" style={{ color: COLORS.muted }}>{locked.length}</p>
          <p className="text-[8px]" style={{ color: COLORS.muted }}>Locked</p>
        </div>
        <div className="rounded-2xl p-2.5 text-center" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
          <p className="text-base font-bold" style={{ color: COLORS.primary }}>{medalList.length}</p>
          <p className="text-[8px]" style={{ color: COLORS.muted }}>Total</p>
        </div>
      </div>

      {medalList.length === 0 || (medalList.length === 1 && medalList[0].id === "d1") ? (
        <div className="rounded-2xl p-8 text-center" style={{ background: COLORS.cardBg, border: "1px solid #EEF0F4" }}>
          <span className="text-3xl block mb-2">🎖️</span>
          <p className="text-xs font-bold" style={{ color: COLORS.navy }}>No Medals Yet</p>
          <p className="text-[10px] mt-1" style={{ color: COLORS.muted }}>Complete tasks and activities to earn medals</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {medalList.map((m) => (
            <MedalCard key={m.id} medal={m} onView={setDetail} onEquip={handleEquip} onShare={handleShare} />
          ))}
        </div>
      )}

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
                  style={{ background: `${detail.color || COLORS.gold}15`, border: `1px solid ${detail.color || COLORS.gold}30` }}>
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
                {detail.is_unlocked ? (
                  <>
                    <Calendar size={14} style={{ color: COLORS.primary }} />
                    <span className="text-[11px] font-bold" style={{ color: COLORS.primary }}>Earned: {detail.earned_date}</span>
                  </>
                ) : (
                  <>
                    <Lock size={14} style={{ color: COLORS.muted }} />
                    <span className="text-[11px] font-bold" style={{ color: COLORS.muted }}>Not yet earned</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}