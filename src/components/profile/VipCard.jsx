import React from "react";
import { Crown, ArrowRight, Sparkles, Frame } from "lucide-react";

export default function VipCard({ profile }) {
  const isVip = profile?.is_vip;

  return (
    <div className="px-4 mb-4">
      <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Crown size={18} className="text-yellow-500" />
            <h3 className="text-sm font-bold text-gray-800">VIP Membership</h3>
          </div>
          {isVip && (
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full">
              Active ✓
            </span>
          )}
        </div>

        {/* VIP Status Card */}
        <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-blue-500 rounded-[16px] p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👑</span>
              <div>
                <p className="text-white font-bold text-sm">VIP {profile?.vip_tier || "Elite"}</p>
                <p className="text-white/70 text-[10px]">Tier 3 • Expires: {profile?.vip_expiry || "Apr 2025"}</p>
              </div>
            </div>
            <button className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 transition-all duration-300 hover:bg-white/30">
              Dashboard <ArrowRight size={10} />
            </button>
          </div>
        </div>

        {/* VIP Features */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-purple-50 rounded-[14px] p-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Sparkles size={14} className="text-purple-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-700">ENTRY EFFECT</p>
              <p className="text-[9px] text-gray-400">VIP Intro</p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-[14px] p-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm">🖼️</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-700">AVATAR FRAME</p>
              <p className="text-[9px] text-gray-400">VIP Frame</p>
            </div>
          </div>
        </div>

        {/* Customize button */}
        <button className="w-full mt-3 py-2 bg-gray-50 rounded-[12px] text-[11px] font-semibold text-purple-500 transition-all duration-300 hover:bg-purple-50">
          Customize Effects ✨
        </button>
      </div>
    </div>
  );
}