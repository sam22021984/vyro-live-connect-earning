import React, { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";

const DARK = "#0F1B3D";
const PINK = "#EC4899";
const PURPLE = "#8B5CF6";
const GOLD = "#D4AF37";
const BLUE = "#3B82F6";
const WHITE = "#FFFFFF";
const GRAY = "rgba(255,255,255,0.5)";
const MUTED = "rgba(255,255,255,0.4)";

const POLICY = {
  position: "Host",
  department: "Live Streaming & User Engagement",
  reportsTo: "Agent",
  purpose: "A Host is an official content creator of VYRO Live Connect responsible for producing live entertainment, engaging audiences, building an active community, supporting platform campaigns, maintaining professional standards, and contributing to the overall growth and success of the platform. Hosts represent the VYRO Live Connect brand while interacting with users and are expected to uphold the highest standards of professionalism, integrity, and compliance.",
  authorityLevel: "Hosts have limited operational authority.",
  authorityMay: [
    "Go Live", "Receive Virtual Gifts", "Join Official Events", "Participate in PK Battles",
    "Earn Rewards & Commissions", "Build and Manage Followers", "Apply for VIP Programs",
    "Participate in Official Campaigns", "Create Original Live Content", "Promote Their Live Sessions",
  ],
  authorityMayNot: [
    "Access Administrative Systems", "Access Financial Systems", "Approve Users", "Approve Withdrawals",
    "Modify Platform Settings", "Manage Agents", "Manage Agencies", "Manipulate Rankings",
    "Manipulate Coins or Rewards", "Create Fake Accounts", "Use Unauthorized Software, Bots, Scripts, or Automation",
    "Misrepresent the Platform or Company",
  ],
  responsibilities: [
    { icon: "🎬", title: "Live Streaming", items: ["Conduct live broadcasts consistently", "Maintain minimum activity requirements", "Deliver high-quality and engaging content", "Ensure professional presentation during streams"] },
    { icon: "💬", title: "Audience Engagement", items: ["Interact respectfully with viewers", "Respond to comments appropriately", "Build a positive and welcoming community", "Encourage healthy audience participation"] },
    { icon: "📈", title: "Community Growth", items: ["Attract new viewers", "Increase audience retention", "Promote platform activities", "Build long-term follower relationships"] },
    { icon: "🏆", title: "Event Participation", items: ["Join official platform campaigns", "Participate in PK competitions", "Support seasonal and promotional events", "Cooperate with platform initiatives"] },
    { icon: "🤝", title: "Professional Conduct", items: ["Maintain respectful behavior", "Protect the reputation of the platform", "Follow instructions from Agents and Management", "Report technical or policy issues promptly"] },
    { icon: "🛡️", title: "Compliance", items: ["Follow all VYRO Live Connect policies", "Comply with applicable local laws and regulations", "Maintain account security", "Cooperate with compliance investigations"] },
  ],
  performanceExpectations: [
    "Maintain regular streaming schedules", "Meet assigned activity targets", "Achieve audience engagement goals",
    "Maintain positive user ratings", "Avoid policy violations", "Support platform growth",
    "Maintain professional conduct at all times", "Cooperate with official platform activities",
  ],
  prohibited: [
    { icon: "💸", title: "Fraud & Financial Abuse", items: ["Fake gifting", "Self-gifting", "Coin manipulation", "Revenue manipulation", "Fake transactions", "Artificial ranking inflation", "Money laundering activities"] },
    { icon: "👤", title: "Account Violations", items: ["Multiple unauthorized accounts", "Account sharing", "Selling accounts", "Buying accounts", "Renting accounts", "Identity impersonation"] },
    { icon: "💬", title: "Community Violations", items: ["Harassment", "Threats", "Hate speech", "Bullying", "Discrimination", "Sexual harassment", "Abuse toward users or staff"] },
    { icon: "📸", title: "Content Violations", items: ["Illegal content", "Copyright infringement", "Fraudulent promotions", "False advertising", "Misleading claims", "Violent or extremist content", "Adult or prohibited content", "Gambling promotion", "Drug-related promotion"] },
    { icon: "⚙️", title: "Platform Abuse", items: ["Using bots or automation", "Exploiting system bugs", "Circumventing platform restrictions", "Attempting unauthorized access", "Sharing confidential information"] },
  ],
  earnings: [
    "Gift Earnings", "Target Rewards", "PK Rewards", "Event Rewards", "VIP Rewards",
    "Seasonal Bonuses", "Performance Bonuses", "Campaign Incentives", "Special Recognition Awards",
  ],
  earningsNote: "All earnings are subject to platform verification, fraud detection, tax compliance, and policy review before payout.",
  benefits: [
    "Premium Avatar Frames", "Entrance Effects", "Chat Bubbles", "VIP Privileges", "Exclusive Badges",
    "Event Invitations", "Campaign Access", "Featured Host Promotion", "Performance Recognition", "Priority Support",
  ],
  benefitsNote: "Benefits are granted based on eligibility, activity, compliance, and performance.",
  accountSecurity: [
    "Protecting login credentials", "Enabling two-factor authentication where available",
    "Maintaining accurate account information", "Reporting unauthorized access immediately",
    "Preventing unauthorized account usage",
  ],
  securityNote: "The platform is not responsible for losses caused by negligence or credential sharing.",
  monitoring: [
    "Monitor live broadcasts", "Review recorded content", "Investigate suspicious activities",
    "Audit rewards and earnings", "Remove violating content", "Suspend or terminate accounts when necessary",
  ],
  disciplinary: [
    { level: 1, action: "Official Warning", color: "#F59E0B" },
    { level: 2, action: "Temporary Restrictions", color: "#FB923C" },
    { level: 3, action: "Reward Suspension", color: "#F97316" },
    { level: 4, action: "Temporary Account Suspension", color: "#EF4444" },
    { level: 5, action: "Permanent Account Termination", color: "#DC2626" },
  ],
  disciplinaryNote: "Severe violations may result in immediate permanent termination without prior warning.",
  confidentiality: [
    "Internal platform information", "User information", "Financial information", "Administrative instructions",
    "Security procedures", "Business strategies", "Source code or technical information", "Confidential communications",
  ],
  confidentialityNote: "Confidentiality obligations continue even after leaving the platform.",
  legalCompliance: [
    "Applicable national laws", "International regulations where applicable", "Copyright laws", "Privacy laws",
    "Anti-fraud regulations", "Anti-money laundering requirements", "Platform Terms of Service", "Community Guidelines",
  ],
};

export default function HostPolicyTab() {
  const [expanded, setExpanded] = useState("authority");
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #4C1D95 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${PINK}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
        <div className="relative">
          <div className="text-3xl mb-1">🌐</div>
          <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
          <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>Host Policy, Authority, Responsibilities & Terms</p>
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
            <p className="text-[9px]" style={{ color: MUTED }}>🎤 POSITION TITLE</p>
            <p className="text-xs font-bold text-white">{POLICY.position}</p>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <p className="text-[9px]" style={{ color: MUTED }}>📍 DEPARTMENT</p>
            <p className="text-xs font-bold" style={{ color: PINK }}>{POLICY.department}</p>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <p className="text-[9px]" style={{ color: MUTED }}>📊 REPORTING TO</p>
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
        <p className="text-[11px] leading-relaxed" style={{ color: GRAY }}>{POLICY.purpose}</p>
      </GlassCard>

      {/* Authority Level */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🔐</span>
          <h3 className="text-sm font-bold text-white">Authority Level</h3>
        </div>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>{POLICY.authorityLevel}</p>

        <p className="text-[10px] font-bold mb-2" style={{ color: "#10B981" }}>✅ HOSTS MAY:</p>
        <div className="space-y-1.5 mb-3">
          {POLICY.authorityMay.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: "#10B981" }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>

        <p className="text-[10px] font-bold mb-2" style={{ color: "#EF4444" }}>❌ HOSTS MAY NOT:</p>
        <div className="space-y-1.5">
          {POLICY.authorityMayNot.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <X size={11} style={{ color: "#EF4444" }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <CollapsibleCard id="responsibilities" title="Primary Responsibilities" icon="📋" expanded={expanded} toggle={toggle} accent={PINK}>
        <div className="space-y-3">
          {POLICY.responsibilities.map((r, i) => (
            <div key={i} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p className="text-[10px] font-bold mb-2" style={{ color: PINK }}>{r.icon} {r.title.toUpperCase()}</p>
              <div className="space-y-1.5">
                {r.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Check size={10} style={{ color: PINK }} />
                    <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
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
                    <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="earnings" title="Earnings & Rewards" icon="💰" expanded={expanded} toggle={toggle} accent={GOLD}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Eligible Hosts may receive:</p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {POLICY.earnings.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2" style={{ background: `${GOLD}08` }}>
              <Check size={10} style={{ color: GOLD }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}15` }}>
          <p className="text-[10px] leading-relaxed" style={{ color: GRAY }}>{POLICY.earningsNote}</p>
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="benefits" title="Benefits" icon="🎁" expanded={expanded} toggle={toggle} accent={PURPLE}>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {POLICY.benefits.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2" style={{ background: `${PURPLE}08` }}>
              <Check size={10} style={{ color: PURPLE }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: `${PURPLE}08`, border: `1px solid ${PURPLE}15` }}>
          <p className="text-[10px] leading-relaxed" style={{ color: GRAY }}>{POLICY.benefitsNote}</p>
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="security" title="Account Security" icon="🔒" expanded={expanded} toggle={toggle} accent={BLUE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Hosts are responsible for:</p>
        <div className="space-y-1.5 mb-3">
          {POLICY.accountSecurity.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: BLUE }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: `${BLUE}08`, border: `1px solid ${BLUE}15` }}>
          <p className="text-[10px] leading-relaxed" style={{ color: GRAY }}>{POLICY.securityNote}</p>
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="monitoring" title="Monitoring & Compliance" icon="📊" expanded={expanded} toggle={toggle} accent="#8B5CF6">
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>The platform reserves the right to:</p>
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
                <p className="text-[9px]" style={{ color: GRAY }}>Level {d.level}</p>
                <p className="text-xs font-bold" style={{ color: d.color }}>{d.action}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: "#EF444408", border: "1px solid #EF444415" }}>
          <p className="text-[10px] leading-relaxed" style={{ color: GRAY }}>{POLICY.disciplinaryNote}</p>
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="confidentiality" title="Confidentiality" icon="🔒" expanded={expanded} toggle={toggle} accent="#06B6D4">
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Hosts must not disclose:</p>
        <div className="space-y-1.5 mb-3">
          {POLICY.confidentiality.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <X size={11} style={{ color: "#06B6D4" }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: "#06B6D408", border: "1px solid #06B6D415" }}>
          <p className="text-[10px] leading-relaxed" style={{ color: GRAY }}>{POLICY.confidentialityNote}</p>
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
        <p className="text-[11px] leading-relaxed" style={{ color: GRAY }}>
          VYRO Live Connect reserves the right to update, modify, replace, or revise this policy at any time. Continued use of the platform constitutes acceptance of the latest version of this policy.
        </p>
      </GlassCard>

      {/* Agreement */}
      <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #4C1D95 100%)" }}>
        <div className="text-2xl mb-2">📜</div>
        <h3 className="text-sm font-bold text-white mb-2">Agreement</h3>
        <p className="text-[11px] text-white/60 leading-relaxed">
          By operating as a Host on VYRO Live Connect, the Host confirms that they have read, understood, and agreed to comply with all platform policies, operational procedures, compliance requirements, security standards, community guidelines, and future policy updates issued by VYRO Live Connect.
        </p>
        <p className="text-[10px] text-white/40 leading-relaxed mt-2">
          Failure to comply may result in disciplinary action, suspension of rewards, account restrictions, permanent termination, or legal action where applicable.
        </p>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] font-bold tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>END OF OFFICIAL HOST POLICY DOCUMENT</p>
      </div>
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-2xl p-4 ${className}`} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
      {children}
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