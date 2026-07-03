import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";

const BANNERS = [
  { title: "VIP Membership", desc: "Unlock exclusive privileges & badges", gradient: "from-purple-500 to-indigo-600", icon: "👑", route: "/vip-membership" },
  { title: "Coin Recharge Bonus", desc: "Get 20% extra coins on your first recharge", gradient: "from-amber-400 to-orange-500", icon: "💰", route: "/coins-recharge" },
  { title: "Lucky Draw Campaign", desc: "Win exciting prizes every week!", gradient: "from-pink-500 to-rose-500", icon: "🎁", route: "/vyro-mall" },
  { title: "Official PK Battle", desc: "Join the ultimate streaming competition", gradient: "from-blue-500 to-cyan-500", icon: "⚔️", route: "/party-dashboard" },
  { title: "Festival Celebration", desc: "Special rewards and seasonal events", gradient: "from-green-500 to-emerald-500", icon: "🎉", route: "/tasks-rewards" },
];

export default function PromoBanner() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % BANNERS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const banner = BANNERS[index];

  return (
    <div className="px-3 pt-3">
      <button
        onClick={() => navigate(banner.route)}
        className={`w-full rounded-2xl p-4 bg-gradient-to-r ${banner.gradient} text-white text-left relative overflow-hidden active:scale-[0.98] transition`}
      >
        <div className="absolute right-0 top-0 text-6xl opacity-20 -mr-2 -mt-2">{banner.icon}</div>
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">{banner.icon}</div>
          <div className="flex-1">
            <h3 className="text-sm font-bold flex items-center gap-1.5">{banner.title} <Sparkles size={12} /></h3>
            <p className="text-[10px] text-white/80">{banner.desc}</p>
          </div>
          <ChevronRight size={18} className="text-white/60" />
        </div>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-1 mt-2">
        {BANNERS.map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all ${i === index ? "w-4 bg-purple-500" : "w-1 bg-gray-200"}`} />
        ))}
      </div>
    </div>
  );
}