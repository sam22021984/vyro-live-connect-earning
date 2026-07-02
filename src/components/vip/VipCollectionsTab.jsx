import React from "react";

const collections = {
  frames: {
    title: "🖼️ Frame Collection",
    items: [
      { name: "Silver Frame", icon: "🥈", color: "#C0C0C0", unlocked: true },
      { name: "Golden Frame", icon: "🥇", color: "#FFD700", unlocked: true },
      { name: "Diamond Frame", icon: "💎", color: "#B9F2FF", unlocked: true },
      { name: "Phoenix Frame", icon: "🔥", color: "#FF4500", unlocked: true },
      { name: "Dragon Frame", icon: "🐉", color: "#DC143C", unlocked: false },
      { name: "Galaxy Frame", icon: "🌌", color: "#4B0082", unlocked: false },
    ],
  },
  badges: {
    title: "🏆 Badge Collection",
    items: [
      { name: "VIP 1 Badge", icon: "🛡️", color: "#C0C0C0", unlocked: true },
      { name: "Golden Badge", icon: "👑", color: "#FFD700", unlocked: true },
      { name: "Sapphire Badge", icon: "💎", color: "#4169E1", unlocked: true },
      { name: "Phoenix Badge", icon: "🔥", color: "#9B30FF", unlocked: true },
      { name: "Dragon Badge", icon: "🐉", color: "#FFD700", unlocked: false },
      { name: "Legendary Badge", icon: "🌌", color: "#4B0082", unlocked: false },
    ],
  },
  effects: {
    title: "✨ Entry Effects",
    items: [
      { name: "Silver Sparkle", icon: "✨", color: "#C0C0C0", unlocked: true },
      { name: "Golden Burst", icon: "🌟", color: "#FFD700", unlocked: true },
      { name: "Diamond Rain", icon: "💎", color: "#B9F2FF", unlocked: true },
      { name: "Phoenix Fire", icon: "🔥", color: "#FF4500", unlocked: true },
      { name: "Dragon Storm", icon: "🐉", color: "#DC143C", unlocked: false },
      { name: "Galaxy Warp", icon: "🌌", color: "#4B0082", unlocked: false },
    ],
  },
};

export default function VipCollectionsTab({ type }) {
  const data = collections[type] || collections.frames;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-amber-300 text-center">{data.title}</h2>

      <div className="grid grid-cols-2 gap-3">
        {data.items.map((item, i) => (
          <div
            key={i}
            className={`rounded-2xl p-4 flex flex-col items-center gap-2 border transition ${
              item.unlocked
                ? "bg-white/5 border-white/10"
                : "bg-black/20 border-white/5 opacity-50"
            }`}
            style={item.unlocked ? { boxShadow: `0 2px 12px ${item.color}20` } : {}}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
              style={{
                background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
                border: `1px solid ${item.color}40`,
              }}
            >
              {item.unlocked ? item.icon : "🔒"}
            </div>
            <p className="text-xs font-semibold text-gray-300 text-center">{item.name}</p>
            {item.unlocked ? (
              <button className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0A0118] text-[10px] font-bold active:scale-95 transition">
                Apply
              </button>
            ) : (
              <span className="text-[10px] text-gray-500">Locked</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}