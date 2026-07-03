import React from "react";
import { GlassCard, SectionHeader, InfoRow, ActionButton, GOLD, BLUE, TEXT_MUTED } from "@/components/user-dashboard/Shared";
import { AGENCY_INFO } from "../../agency-dashboard/agencyDashboardData";

export default function ProfileSection() {
  return (
    <div className="space-y-4">
      <GlassCard className="!p-0 overflow-hidden">
        <div className="h-24 relative" style={{ background: `linear-gradient(135deg, ${BLUE}, #1A2952)` }}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
        </div>
        <div className="px-4 pb-4 -mt-12">
          <img src={AGENCY_INFO.logo} alt={AGENCY_INFO.agency_name} className="w-20 h-20 rounded-2xl object-cover border-2 mb-3" style={{ borderColor: GOLD }} />
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-base font-bold text-white">{AGENCY_INFO.agency_name}</h2>
            <span className="text-xs">✅</span>
          </div>
          <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>Premium Agency · Since {AGENCY_INFO.join_date}</p>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${GOLD}20`, color: GOLD }}>{AGENCY_INFO.level}</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${BLUE}20`, color: BLUE }}>RANK {AGENCY_INFO.rank}</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: "#10B98120", color: "#10B981" }}>{AGENCY_INFO.verification_status}</span>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Agency Information" icon="📋" />
        <InfoRow label="Agency Name" value={AGENCY_INFO.agency_name} icon="🏢" />
        <InfoRow label="Agency ID" value={AGENCY_INFO.agency_id} icon="🆔" />
        <InfoRow label="Registration Number" value={AGENCY_INFO.registration_number} icon="📄" />
        <InfoRow label="Country" value={`${AGENCY_INFO.country_flag} ${AGENCY_INFO.country}`} icon="🌍" />
        <InfoRow label="Contact" value={AGENCY_INFO.contact} icon="📧" />
        <InfoRow label="Manager Name" value={AGENCY_INFO.manager_name} icon="👤" />
        <InfoRow label="Verification" value={AGENCY_INFO.verification_status} icon="✅" color="#10B981" />
        <InfoRow label="Join Date" value={AGENCY_INFO.join_date} icon="📅" />
        <InfoRow label="Agency Rank" value={AGENCY_INFO.rank} icon="🏆" color={GOLD} />
        <InfoRow label="Agency Level" value={AGENCY_INFO.level} icon="⭐" color={BLUE} />
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-3 gap-2">
          <ActionButton label="Edit Profile" icon="✏️" color={BLUE} />
          <ActionButton label="Upload Logo" icon="🖼️" color={GOLD} />
          <ActionButton label="Update Info" icon="📝" color="#10B981" />
          <ActionButton label="Verify Docs" icon="📄" color="#F59E0B" />
          <ActionButton label="Settings" icon="⚙️" color="#64748B" />
        </div>
      </div>
    </div>
  );
}