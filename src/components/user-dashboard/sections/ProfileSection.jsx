import React from "react";
import { GlassCard, SectionHeader, InfoRow, ActionButton, GOLD, BLUE, TEXT_MUTED } from "../Shared";
import { USER_INFO } from "../userDashboardData";

export default function ProfileSection() {
  return (
    <div className="space-y-4">
      <GlassCard className="!p-0 overflow-hidden">
        <div className="h-24 relative" style={{ background: `linear-gradient(135deg, ${BLUE}, #1A2952)` }}>
          <img src={USER_INFO.cover} alt="cover" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="px-4 pb-4 -mt-12">
          <img src={USER_INFO.avatar} alt={USER_INFO.username} className="w-20 h-20 rounded-2xl object-cover border-2 mb-3" style={{ borderColor: GOLD }} />
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-base font-bold text-white">{USER_INFO.username}</h2>
            <span className="text-xs">✅</span>
          </div>
          <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>{USER_INFO.bio}</p>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${GOLD}20`, color: GOLD }}>⭐ VIP {USER_INFO.vip_level}</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${BLUE}20`, color: BLUE }}>Lv.{USER_INFO.level}</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: "#10B98120", color: "#10B981" }}>✅ Verified</span>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Profile Information" icon="📋" />
        <InfoRow label="User ID" value={USER_INFO.user_id} icon="🆔" />
        <InfoRow label="Username" value={USER_INFO.username} icon="👤" />
        <InfoRow label="Gender" value={USER_INFO.gender} icon="⚧" />
        <InfoRow label="Country" value={`${USER_INFO.country_flag} ${USER_INFO.country}`} icon="🌍" />
        <InfoRow label="Language" value={USER_INFO.language} icon="🌐" />
        <InfoRow label="Join Date" value={USER_INFO.join_date} icon="📅" />
        <InfoRow label="VIP Badge" value={USER_INFO.vip_level} icon="⭐" color={GOLD} />
        <InfoRow label="Level Badge" value={`Level ${USER_INFO.level}`} icon="🏆" color={BLUE} />
        <div className="py-2.5">
          <span className="text-[11px]" style={{ color: TEXT_MUTED }}>Bio</span>
          <p className="text-[11px] text-white mt-1">{USER_INFO.bio}</p>
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-3 gap-2">
          <ActionButton label="Edit Profile" icon="✏️" color={BLUE} />
          <ActionButton label="Change Avatar" icon="🖼️" color={GOLD} />
          <ActionButton label="Change Cover" icon="🎨" color="#EC4899" />
          <ActionButton label="Update Bio" icon="📝" color="#10B981" />
          <ActionButton label="Privacy" icon="🔒" color="#EF4444" />
          <ActionButton label="Account" icon="⚙️" color="#64748B" />
        </div>
      </div>
    </div>
  );
}