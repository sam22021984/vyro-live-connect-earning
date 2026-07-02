import React from "react";
import { userLevelTiers } from "@/components/levels/userLevelTiers";
import { collectionConfig } from "@/components/levels/userLevelTiers";
import TierCard from "@/components/levels/TierCard";

export default function LevelJourney({ currentLevel }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-800 mb-1 px-1">User Level Journey</h3>
      <p className="text-[10px] text-gray-400 mb-3 px-1">LV1 → LV300 Progression Timeline</p>

      {/* Journey position indicator */}
      <div className="rounded-2xl p-4 mb-4" style={{ background: "linear-gradient(135deg, #1F6BFF10, #0D1B3E05)", border: "1px solid #1F6BFF20" }}>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Previous", value: "LV21-30", sub: "Silver Guardian", color: "#94A3B8" },
            { label: "Current", value: `LV${currentLevel}`, sub: "Silver Commander", color: "#1F6BFF" },
            { label: "Next", value: "LV41-50", sub: "Silver Emperor", color: "#F59E0B" },
          ].map((p, i) => (
            <div key={i} className="rounded-xl p-2" style={{ background: `${p.color}10`, border: `1px solid ${p.color}20` }}>
              <p className="text-[9px] text-gray-400 uppercase">{p.label}</p>
              <p className="text-xs font-bold" style={{ color: p.color }}>{p.value}</p>
              <p className="text-[8px] text-gray-400">{p.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full tier timeline */}
      <div className="space-y-3">
        {userLevelTiers.map((tier) => (
          <TierCard key={tier.tier} tier={tier} currentLevel={currentLevel} />
        ))}
      </div>
    </div>
  );
}