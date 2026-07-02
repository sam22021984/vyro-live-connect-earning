import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";
import { rewardSections, rewards, COLORS } from "./tasksData";
import RewardCard from "./RewardCard";

export default function RewardCenterTab() {
  const [section, setSection] = useState("available");
  const [rewardList, setRewardList] = useState(rewards);
  const [preview, setPreview] = useState(null);
  const { toast } = useToast();

  const handleClaim = (reward) => {
    setRewardList((prev) => ({
      ...prev,
      available: prev.available.filter((r) => r.id !== reward.id),
      claimed: [reward, ...prev.claimed],
    }));
    toast({ title: "🎉 Reward Claimed!", description: `${reward.name} added to your account.` });
  };

  const handleUse = (reward) => {
    toast({ title: "✨ Reward Activated!", description: `${reward.name} is now active.` });
  };

  const handleView = (reward) => setPreview(reward);

  return (
    <div>
      <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
        {rewardSections.map((s) => (
          <button key={s.key} onClick={() => setSection(s.key)}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap active:scale-95 transition flex items-center gap-1.5 ${section === s.key ? "text-white" : ""}`}
            style={section === s.key ? { background: COLORS.primary } : { background: COLORS.cardBg, color: COLORS.muted, border: "1px solid #EEF0F4" }}>
            <span>{s.icon}</span> {s.label}
            <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={section === s.key ? { background: "rgba(255,255,255,0.25)" } : { background: "#E5E7EB" }}>{rewardList[s.key].length}</span>
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {rewardList[section].length === 0 ? (
          <div className="text-center py-12">
            <p className="text-3xl mb-2">📭</p>
            <p className="text-xs font-medium" style={{ color: COLORS.muted }}>No {section} rewards</p>
          </div>
        ) : (
          rewardList[section].map((r) => (
            <RewardCard key={r.id} reward={r} isClaimed={section === "claimed"} onClaim={handleClaim} onView={handleView} onUse={handleUse} />
          ))
        )}
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setPreview(null)} />
          <div className="relative w-full max-w-md bg-white rounded-t-3xl animate-fadeIn">
            <div className="sticky top-0 bg-white pt-3 pb-2 z-10">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
              <div className="flex items-center justify-between px-4">
                <h2 className="text-sm font-bold" style={{ color: COLORS.navy }}>Reward Preview</h2>
                <button onClick={() => setPreview(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="px-4 pb-6">
              <div className="flex flex-col items-center py-4">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-3"
                  style={{ background: `${preview.color}15`, border: `1px solid ${preview.color}30` }}>
                  {preview.icon}
                </div>
                <h3 className="text-base font-bold" style={{ color: COLORS.navy }}>{preview.name}</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${preview.color}20`, color: preview.color }}>{preview.type}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${COLORS.gold}20`, color: COLORS.gold }}>{preview.rarity}</span>
                </div>
              </div>
              <div className="rounded-2xl p-3" style={{ background: COLORS.cardBg }}>
                <p className="text-xs" style={{ color: COLORS.muted }}>{preview.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}