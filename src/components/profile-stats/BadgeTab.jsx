import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { X, Calendar, Gift } from "lucide-react";
import { badgeCategories, badges, COLORS } from "./profileStatsData";
import BadgeCard from "./BadgeCard";

export default function BadgeTab() {
  const [cat, setCat] = useState("vip");
  const [badgeList, setBadgeList] = useState(badges);
  const [detail, setDetail] = useState(null);
  const { toast } = useToast();

  const handleEquip = (badge) => {
    setBadgeList((prev) => ({
      ...prev,
      [cat]: prev[cat].map((b) => (b.id === badge.id ? { ...b, status: "active" } : { ...b, status: b.status === "active" ? "unlocked" : b.status })),
    }));
    toast({ title: "✅ Badge Equipped!", description: `${badge.name} is now active on your profile.` });
  };

  const handleRemove = (badge) => {
    setBadgeList((prev) => ({
      ...prev,
      [cat]: prev[cat].map((b) => (b.id === badge.id ? { ...b, status: "unlocked" } : b)),
    }));
    toast({ title: "Badge Removed", description: `${badge.name} deactivated.` });
  };

  const handleShare = (badge) => {
    toast({ title: "📢 Shared to Feed!", description: `${badge.name} shared to your feed.` });
  };

  return (
    <div>
      <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
        {badgeCategories.map((c) => (
          <button key={c.key} onClick={() => setCat(c.key)}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap active:scale-95 transition flex items-center gap-1.5 ${cat === c.key ? "text-white" : ""}`}
            style={cat === c.key ? { background: COLORS.primary } : { background: COLORS.cardBg, color: COLORS.muted, border: "1px solid #EEF0F4" }}>
            <span>{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {badgeList[cat].map((b) => (
          <BadgeCard key={b.id} badge={b} onView={setDetail} onEquip={handleEquip} onRemove={handleRemove} onShare={handleShare} />
        ))}
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetail(null)} />
          <div className="relative w-full max-w-md bg-white rounded-t-3xl animate-fadeIn">
            <div className="sticky top-0 bg-white pt-3 pb-2 z-10">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
              <div className="flex items-center justify-between px-4">
                <h2 className="text-sm font-bold" style={{ color: COLORS.navy }}>Badge Details</h2>
                <button onClick={() => setDetail(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="px-4 pb-6">
              <div className="flex flex-col items-center py-4">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-3"
                  style={{ background: `${detail.color}15`, border: `1px solid ${detail.color}30` }}>
                  {detail.icon}
                </div>
                <h3 className="text-base font-bold" style={{ color: COLORS.navy }}>{detail.name}</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${detail.color}20`, color: detail.color }}>{detail.level}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize" style={{ background: COLORS.cardBg, color: COLORS.muted }}>{detail.status}</span>
                </div>
              </div>
              <div className="rounded-2xl p-3 mb-3" style={{ background: COLORS.cardBg }}>
                <p className="text-xs" style={{ color: COLORS.muted }}>{detail.description}</p>
              </div>
              <div className="rounded-2xl p-3 flex items-center gap-2" style={{ background: `${COLORS.primary}10` }}>
                <Calendar size={14} style={{ color: COLORS.primary }} />
                <span className="text-[11px] font-bold" style={{ color: COLORS.primary }}>Unlock Date: {detail.unlock_date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}