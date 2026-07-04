import React from "react";
import { X, Clock, Users, TrendingUp, Gift, Coins, DollarSign, Trophy, Award } from "lucide-react";

function formatDuration(seconds) {
  if (!seconds) return "0m";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function StatRow({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
        <Icon size={16} style={{ color }} />
      </div>
      <div className="flex-1">
        <p className="text-[10px] text-gray-400">{label}</p>
        <p className="text-sm font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

export default function PostLiveSummary({ summary, onClose }) {
  if (!summary) return null;
  const s = summary;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-3xl bg-white shadow-2xl animate-fadeIn overflow-hidden">
        {/* Header */}
        <div className="relative px-5 py-5 text-center" style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)" }}>
          <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <X size={14} className="text-white" />
          </button>
          <div className="w-14 h-14 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-2">
            <Trophy size={28} className="text-white" />
          </div>
          <h2 className="text-base font-bold text-white">Live Session Ended</h2>
          <p className="text-[10px] text-white/70 mt-0.5">{s.room_name}</p>
        </div>

        {/* Body */}
        <div className="p-4 space-y-2.5 max-h-[55vh] overflow-y-auto scrollbar-hide">
          <StatRow icon={Clock} label="Total Duration" value={formatDuration(s.duration_seconds)} color="#3B82F6" />
          <StatRow icon={Users} label="Total Visitors" value={s.total_visitors || 0} color="#10B981" />
          <StatRow icon={TrendingUp} label="Peak Online" value={s.peak_viewers || 0} color="#F59E0B" />
          <StatRow icon={Gift} label="Gifts Received" value={s.total_gifts || 0} color="#EC4899" />
          <StatRow icon={Coins} label="Coins Earned" value={(s.total_coins || 0).toLocaleString()} color="#F59E0B" />
          <StatRow icon={DollarSign} label="Your Earnings" value={`${(s.host_earnings_coins || 0).toLocaleString()} coins`} color="#8B5CF6" />

          {/* Top Gifters */}
          {s.top_gifters && s.top_gifters.length > 0 && (
            <div className="pt-2">
              <p className="text-[10px] font-bold text-gray-500 mb-2 flex items-center gap-1">
                <Award size={12} /> Top Gifters
              </p>
              <div className="space-y-1.5">
                {s.top_gifters.map((g, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" style={{ background: i === 0 ? "#F59E0B" : i === 1 ? "#9CA3AF" : i === 2 ? "#D97706" : "#E5E7EB", color: i > 2 ? "#6B7280" : "#fff" }}>{i + 1}</span>
                    <span className="flex-1 text-xs font-medium text-gray-700 truncate">{g.name}</span>
                    <span className="text-[10px] font-bold text-amber-500">{(g.coins || 0).toLocaleString()} 🪙</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 pt-2">
          <button onClick={onClose} className="w-full py-3 rounded-2xl text-sm font-bold text-white transition active:scale-95" style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)" }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}