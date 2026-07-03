import React, { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { GlassCard, SectionHeader, GOLD, BLUE, TEXT_MUTED } from "@/components/user-dashboard/Shared";

const POLICY = {
  position: "Agency",
  department: "Agency Management & Host Operations",
  reportsTo: "Super Admin Manager (SAM)",
  purpose: "An Agency is an officially approved business partner of VYRO Live Connect responsible for recruiting, managing, training, supporting, and supervising Hosts through assigned Agents while maintaining platform standards, compliance, and business growth. Agencies serve as the primary management organization for Hosts and are responsible for ensuring professional operations, performance, and adherence to all platform policies.",
  authorityLevel: "Agencies have management authority over their assigned Agents and Hosts.",
  authorityMay: [
    "Recruit and onboard Hosts", "Recruit and manage Agents", "Approve Host applications (subject to platform rules)",
    "Assign Hosts to Agents", "Monitor Host performance", "View Agency reports and analytics",
    "Receive commissions and bonuses", "Participate in official campaigns", "Submit support requests",
  ],
  authorityMayNot: [
    "Access Super Admin systems", "Modify platform settings", "Approve financial withdrawals",
    "Access confidential platform data", "Manipulate rankings or rewards", "Create fake Hosts, Agents, or Agencies",
    "Interfere with another Agency's members", "Bypass platform security or compliance controls",
  ],
  responsibilities: [
    { title: "Recruitment", items: ["Recruit qualified Hosts", "Recruit professional Agents", "Verify applicant information", "Promote sustainable Agency growth"] },
    { title: "Host Management", items: ["Supervise assigned Hosts", "Provide onboarding and training", "Monitor Host activity", "Support Host development", "Resolve operational issues"] },
    { title: "Agent Management", items: ["Assign responsibilities", "Monitor Agent performance", "Provide coaching and guidance", "Ensure compliance with platform policies"] },
    { title: "Performance Management", items: ["Meet Agency performance targets", "Improve Host retention", "Increase Agency revenue", "Participate in official campaigns"] },
    { title: "Compliance", items: ["Follow all platform policies", "Comply with applicable laws and regulations", "Cooperate with audits and investigations", "Maintain accurate Agency records"] },
  ],
  performanceExpectations: [
    "Maintain active Hosts and Agents", "Achieve recruitment targets", "Maintain high compliance standards",
    "Support platform growth", "Improve Host quality and engagement", "Respond promptly to platform communications", "Maintain a positive reputation",
  ],
  commissions: [
    "Host commission", "Performance commission", "Recruitment bonuses", "Campaign incentives",
    "Seasonal bonuses", "Ranking rewards", "Achievement rewards",
  ],
  commissionsNote: "All commissions are subject to verification, compliance review, fraud detection, and financial approval.",
  benefits: [
    "Verified Agency Badge", "Premium Dashboard Access", "Advanced Analytics", "Recruitment Tools",
    "Priority Support", "Exclusive Events", "Special Campaign Access", "Agency Awards", "Performance Recognition",
  ],
  benefitsNote: "Benefits are based on eligibility, compliance, and performance.",
  prohibited: [
    { icon: "💸", title: "Fraud & Financial Abuse", items: ["Fake Hosts", "Fake Agents", "Fake gifting", "Coin manipulation", "Commission fraud", "Revenue manipulation", "Money laundering"] },
    { icon: "👥", title: "Recruitment Violations", items: ["Recruiting under false information", "Buying or selling accounts", "Unauthorized Host transfers", "Recruiting minors where prohibited by law"] },
    { icon: "💬", title: "Community Violations", items: ["Harassment", "Threats", "Hate speech", "Bullying", "Discrimination"] },
    { icon: "⚙️", title: "Platform Abuse", items: ["Using bots or automation", "Exploiting platform vulnerabilities", "Unauthorized access attempts", "Sharing confidential platform information", "Circumventing platform restrictions"] },
  ],
  accountSecurity: [
    "Protect account credentials", "Maintain accurate Agency information", "Enable additional security features when available",
    "Report security incidents immediately", "Protect confidential Host, Agent, and platform information",
  ],
  monitoring: [
    "Audit Agency operations", "Review recruitment activities", "Monitor financial transactions",
    "Verify Host and Agent records", "Investigate suspicious activities", "Suspend or terminate Agency privileges when necessary",
  ],
  disciplinary: [
    { level: 1, action: "Official Warning", color: "#F59E0B" },
    { level: 2, action: "Temporary Restrictions", color: "#FB923C" },
    { level: 3, action: "Commission Suspension", color: "#F97316" },
    { level: 4, action: "Agency Suspension", color: "#EF4444" },
    { level: 5, action: "Permanent Agency Termination", color: "#DC2626" },
  ],
  disciplinaryNote: "Serious violations may result in immediate termination without prior notice.",
  confidentiality: [
    "Platform business information", "User information", "Host information", "Agent information",
    "Financial information", "Internal communications", "Security procedures", "Operational documents",
  ],
  confidentialityNote: "Confidentiality obligations continue after termination of the Agency relationship.",
  legalCompliance: [
    "Applicable local laws", "International regulations where applicable", "Copyright laws", "Privacy laws",
    "Anti-fraud regulations", "Anti-money laundering regulations", "Platform Terms of Service", "Community Guidelines",
  ],
};

export default function AgencyPolicyTab() {
  const [expanded, setExpanded] = useState("authority");
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #2D1B69 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
        <div className="relative">
          <div className="text-3xl mb-1">🌐</div>
          <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
          <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>Agency Policy, Authority, Responsibilities & Terms</p>
        </div>
      </div>

      {/* Position & Department */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📋</span>
          <h3 className="text-sm font-bold text-white">Position & Department</h3>
        </div>
        <div className="space-y-2.5">
          <div>
            <p className="text-[9px]" style={{ color: TEXT_MUTED }}>🏢 POSITION TITLE</p>
            <p className="text-xs font-bold text-white">{POLICY.position}</p>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <p className="text-[9px]" style={{ color: TEXT_MUTED }}>📍 DEPARTMENT</p>
            <p className="text-xs font-bold" style={{ color: BLUE }}>{POLICY.department}</p>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <p className="text-[9px]" style={{ color: TEXT_MUTED }}>📊 REPORTING TO</p>
            <p className="text-xs font-bold" style={{ color: GOLD }}>{POLICY.reportsTo}</p>
          </div>
        </div>
      </GlassCard>

      {/* Role Purpose */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🎯</span>
          <h3 className="text-sm font-bold text-white">Role Purpose</h3>
        </div>
        <p className="text-[11px] leading-relaxed" style={{ color: TEXT_MUTED }}>{POLICY.purpose}</p>
      </GlassCard>

      {/* Authority Level */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🔐</span>
          <h3 className="text-sm font-bold text-white">Authority Level</h3>
        </div>
        <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>{POLICY.authorityLevel}</p>

        <p className="text-[10px] font-bold mb-2" style={{ color: "#10B981" }}>✅ AGENCIES MAY:</p>
        <div className="space-y-1.5 mb-3">
          {POLICY.authorityMay.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: "#10B981" }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>

        <p className="text-[10px] font-bold mb-2" style={{ color: "#EF4444" }}>❌ AGENCIES MAY NOT:</p>
        <div className="space-y-1.5">
          {POLICY.authorityMayNot.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <X size={11} style={{ color: "#EF4444" }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <CollapsibleCard id="responsibilities" title="Primary Responsibilities" icon="📋" expanded={expanded} toggle={toggle} accent={BLUE}>
        <div className="space-y-3">
          {POLICY.responsibilities.map((r, i) => (
            <div key={i} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p className="text-[10px] font-bold mb-2" style={{ color: BLUE }}>📌 {r.title.toUpperCase()}</p>
              <div className="space-y-1.5">
                {r.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Check size={10} style={{ color: BLUE }} />
                    <span className="text-[11px]" style={{ color: TEXT_MUTED }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="performance" title="Performance Expectations" icon="📈" expanded={expanded} toggle={toggle} accent="#10B981">
        <div className="space-y-1.5">
          {POLICY.performanceExpectations.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: "#10B981" }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="commissions" title="Commissions & Rewards" icon="💰" expanded={expanded} toggle={toggle} accent={GOLD}>
        <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>Eligible Agencies may receive:</p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {POLICY.commissions.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2" style={{ background: `${GOLD}08` }}>
              <Check size={10} style={{ color: GOLD }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}15` }}>
          <p className="text-[10px] leading-relaxed" style={{ color: TEXT_MUTED }}>{POLICY.commissionsNote}</p>
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="benefits" title="Benefits" icon="🎁" expanded={expanded} toggle={toggle} accent="#EC4899">
        <div className="grid grid-cols-2 gap-2 mb-3">
          {POLICY.benefits.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2" style={{ background: "#EC489908" }}>
              <Check size={10} style={{ color: "#EC4899" }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: "#EC489908", border: "1px solid #EC489915" }}>
          <p className="text-[10px] leading-relaxed" style={{ color: TEXT_MUTED }}>{POLICY.benefitsNote}</p>
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="prohibited" title="Prohibited Activities" icon="⚠️" expanded={expanded} toggle={toggle} accent="#EF4444">
        <div className="space-y-3">
          {POLICY.prohibited.map((p, i) => (
            <div key={i} className="rounded-xl p-3" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.1)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{p.icon}</span>
                <p className="text-xs font-bold text-white">{p.title}</p>
              </div>
              <div className="space-y-1.5">
                {p.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <X size={10} style={{ color: "#EF4444" }} />
                    <span className="text-[11px]" style={{ color: TEXT_MUTED }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="security" title="Account & Data Security" icon="🔒" expanded={expanded} toggle={toggle} accent={BLUE}>
        <div className="space-y-1.5">
          {POLICY.accountSecurity.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: BLUE }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="monitoring" title="Monitoring & Audits" icon="📊" expanded={expanded} toggle={toggle} accent="#8B5CF6">
        <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>VYRO Live Connect reserves the right to:</p>
        <div className="space-y-1.5">
          {POLICY.monitoring.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: "#8B5CF6" }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="disciplinary" title="Disciplinary Actions" icon="⚠️" expanded={expanded} toggle={toggle} accent="#EF4444">
        <div className="space-y-2 mb-3">
          {POLICY.disciplinary.map((d) => (
            <div key={d.level} className="rounded-xl p-3 flex items-center gap-3" style={{ background: `${d.color}10`, border: `1px solid ${d.color}20` }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: d.color }}>
                {d.level}
              </div>
              <div className="flex-1">
                <p className="text-[9px]" style={{ color: TEXT_MUTED }}>Level {d.level}</p>
                <p className="text-xs font-bold" style={{ color: d.color }}>{d.action}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: "#EF444408", border: "1px solid #EF444415" }}>
          <p className="text-[10px] leading-relaxed" style={{ color: TEXT_MUTED }}>{POLICY.disciplinaryNote}</p>
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="confidentiality" title="Confidentiality" icon="🔒" expanded={expanded} toggle={toggle} accent="#06B6D4">
        <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>Agencies must not disclose:</p>
        <div className="space-y-1.5 mb-3">
          {POLICY.confidentiality.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <X size={11} style={{ color: "#06B6D4" }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: "#06B6D408", border: "1px solid #06B6D415" }}>
          <p className="text-[10px] leading-relaxed" style={{ color: TEXT_MUTED }}>{POLICY.confidentialityNote}</p>
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="legal" title="Legal Compliance" icon="⚖️" expanded={expanded} toggle={toggle} accent="#64748B">
        <div className="space-y-1.5">
          {POLICY.legalCompliance.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: "#64748B" }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* Policy Updates */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📜</span>
          <h3 className="text-sm font-bold text-white">Policy Updates</h3>
        </div>
        <p className="text-[11px] leading-relaxed" style={{ color: TEXT_MUTED }}>
          VYRO Live Connect reserves the right to amend, modify, or replace this policy at any time. Continued participation as an Agency constitutes acceptance of the latest version of this policy.
        </p>
      </GlassCard>

      {/* Agreement */}
      <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #2D1B69 100%)" }}>
        <div className="text-2xl mb-2">📜</div>
        <h3 className="text-sm font-bold text-white mb-2">Agency Agreement</h3>
        <p className="text-[11px] text-white/60 leading-relaxed">
          By registering and operating as an Agency on VYRO Live Connect, the Agency confirms that it has read, understood, and agreed to comply with all platform policies, operational procedures, compliance requirements, security standards, financial rules, community guidelines, and future policy updates issued by VYRO Live Connect.
        </p>
        <p className="text-[10px] text-white/40 leading-relaxed mt-2">
          Failure to comply may result in warnings, commission suspension, account restrictions, permanent termination, forfeiture of unpaid incentives where permitted by law, and legal action where applicable.
        </p>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] font-bold tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>END OF OFFICIAL AGENCY POLICY DOCUMENT</p>
      </div>
    </div>
  );
}

function CollapsibleCard({ id, title, icon, expanded, toggle, accent, children }) {
  const isOpen = expanded === id;
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${accent}25`, backdropFilter: "blur(12px)" }}>
      <button onClick={() => toggle(id)} className="w-full p-4 flex items-center gap-3 active:scale-[0.98] transition">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${accent}15` }}>
          {icon}
        </div>
        <h3 className="flex-1 text-left text-sm font-bold text-white">{title}</h3>
        <ChevronDown size={18} style={{ color: "rgba(255,255,255,0.4)" }} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="px-4 pb-4 animate-fadeIn">{children}</div>}
    </div>
  );
}