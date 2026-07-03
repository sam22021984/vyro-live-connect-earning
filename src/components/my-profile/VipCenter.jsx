import React from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Calendar, Gift, Star, Sparkles } from "lucide-react";

export default function VipCenter({ profile }) {
  const navigate = useNavigate();

  if (!profile?.is_vip) {
    return (
      <div className="px-3 pt-4">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-4 text-white shadow-lg shadow-amber-200">
          <div className="flex items-center gap-2 mb-1">
            <Crown size={18} />
            <h3 className="text-sm font-bold">Upgrade to VIP</h3>
          </div>
          <p className="text-xs text-white/80 mb-3">Unlock exclusive badges, decorations, themes, and rewards.</p>
          <button onClick={() => navigate("/vip-membership")} className="w-full py-2.5 rounded-xl bg-white text-amber-600 text-xs font-bold active:scale-95 transition">
            Upgrade VIP
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 pt-4">
      <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-4 text-white shadow-lg shadow-amber-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Crown size={18} />
            <div>
              <h3 className="text-sm font-bold">VIP {profile?.vip_tier || "1"}</h3>
              <p className="text-[10px] text-white/70">Expires: {profile?.vip_expiry || "N/A"}</p>
            </div>
          </div>
          <Sparkles size={20} className="text-white/60" />
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-white/15 rounded-xl p-2 text-center">
            <Gift size={14} className="mx-auto mb-0.5" />
            <p className="text-[9px] font-bold">Rewards</p>
          </div>
          <div className="bg-white/15 rounded-xl p-2 text-center">
            <Star size={14} className="mx-auto mb-0.5" />
            <p className="text-[9px] font-bold">Badges</p>
          </div>
          <div className="bg-white/15 rounded-xl p-2 text-center">
            <Sparkles size={14} className="mx-auto mb-0.5" />
            <p className="text-[9px] font-bold">Decor</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate("/vip-membership")} className="flex-1 py-2 rounded-xl bg-white text-amber-600 text-xs font-bold active:scale-95">Renew VIP</button>
          <button onClick={() => navigate("/vip-membership")} className="flex-1 py-2 rounded-xl bg-white/20 text-white text-xs font-bold active:scale-95">View Benefits</button>
        </div>
      </div>
    </div>
  );
}