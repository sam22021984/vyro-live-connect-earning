import React from "react";
import { GlassCard, SectionHeader, ActionButton, StatCard, BLUE, TEXT_MUTED } from "../Shared";
import { REFERRAL_DATA } from "../userDashboardData";

export default function ReferralSection() {
  return (
    <div className="space-y-4">
      <GlassCard className="text-center !p-4">
        <div className="text-3xl mb-1">👥</div>
        <h2 className="text-base font-bold text-white">Referral Center</h2>
        <p className="text-[10px] mt-1" style={{ color: TEXT_MUTED }}>Invite friends and earn rewards!</p>
      </GlassCard>

      <div className="grid grid-cols-3 gap-2">
        <StatCard label="Total Invites" value={REFERRAL_DATA.totalInvites.toString()} icon="📨" color={BLUE} />
        <StatCard label="Successful" value={REFERRAL_DATA.successful.toString()} icon="✅" color="#10B981" />
        <StatCard label="Rewards" value={REFERRAL_DATA.rewards} icon="🎁" color="#D4AF37" />
      </div>

      <GlassCard>
        <SectionHeader title="Your Referral Code" icon="🎫" />
        <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: `${BLUE}10`, border: `1px dashed ${BLUE}40` }}>
          <span className="text-[11px] font-bold flex-1" style={{ color: BLUE }}>{REFERRAL_DATA.code}</span>
          <button className="text-[9px] px-2 py-1 rounded-full font-bold text-white" style={{ background: BLUE }}>Copy</button>
        </div>
        <div className="mt-2 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
          <p className="text-[9px] mb-1" style={{ color: TEXT_MUTED }}>Referral Link</p>
          <p className="text-[10px] text-white truncate">{REFERRAL_DATA.link}</p>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Recent Referrals" icon="📋" />
        <div className="space-y-2">
          {REFERRAL_DATA.recent.map((r, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white">{r.name}</p>
                <p className="text-[9px]" style={{ color: TEXT_MUTED }}>{r.date}</p>
              </div>
              <span className="text-[11px] font-bold" style={{ color: "#D4AF37" }}>{r.reward}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Actions" icon="⚡" />
        <div className="grid grid-cols-3 gap-2">
          {REFERRAL_DATA.actions.map((a, i) => (
            <ActionButton key={i} label={a.label} icon={a.icon} color={a.color} />
          ))}
        </div>
      </div>
    </div>
  );
}