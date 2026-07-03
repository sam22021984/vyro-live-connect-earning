import React, { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { GlassCard, SectionHeader, GOLD, BLUE, TEXT_MUTED } from "./Shared";

const POLICY = {
  position: "User",
  department: "Community & Platform Services",
  purpose: "A User is a registered member of VYRO Live Connect who uses the platform to watch live streams, interact with Hosts, participate in community activities, send virtual gifts, and enjoy platform features while maintaining a safe, respectful, and positive environment.",
  rights: [
    "Create and manage a personal account", "Watch live streams", "Follow Hosts and other users",
    "Send virtual gifts", "Participate in PK events and platform activities", "Chat during live broadcasts",
    "Purchase virtual coins", "Report inappropriate content", "Block or mute other users", "Protect personal privacy",
  ],
  restrictions: [
    "Access administrative systems", "Modify platform settings", "Access financial management systems",
    "Create fake accounts", "Use bots, scripts, or automation", "Manipulate rankings or rewards",
    "Share confidential platform information", "Attempt unauthorized access to any account or system",
  ],
  responsibilities: [
    "Providing accurate account information", "Keeping login credentials secure",
    "Respecting Hosts, users, agents, and platform staff", "Following all platform rules and community guidelines",
    "Reporting violations responsibly", "Using platform features honestly and fairly",
  ],
  communityStandards: [
    "Be respectful", "Use appropriate language", "Support a friendly community",
    "Respect cultural diversity", "Avoid disruptive behavior", "Follow moderator instructions",
  ],
  prohibited: [
    { icon: "👤", title: "Account Violations", items: ["Fake accounts", "Multiple unauthorized accounts", "Account sharing", "Selling or buying accounts", "Identity impersonation"] },
    { icon: "💸", title: "Financial Abuse", items: ["Fraudulent payments", "Chargeback abuse", "Coin manipulation", "Fake gifting", "Money laundering activities"] },
    { icon: "💬", title: "Community Violations", items: ["Harassment", "Bullying", "Hate speech", "Threats", "Discrimination", "Sexual harassment", "Spam or excessive advertising"] },
    { icon: "📸", title: "Content Violations", items: ["Illegal content", "Copyright infringement", "False information", "Fraudulent promotions", "Adult or explicit content", "Violent or extremist content", "Gambling or illegal activities"] },
    { icon: "⚙️", title: "Platform Abuse", items: ["Hacking attempts", "System exploitation", "Reverse engineering", "Unauthorized software", "Bot usage", "Automated activity"] },
  ],
  coinsPurchases: [
    "Purchase virtual coins", "Send gifts to Hosts", "Participate in official promotions",
    "Receive promotional rewards where eligible",
  ],
  coinsNote: "All purchases are final except where required by applicable law. The platform reserves the right to review suspicious transactions.",
  accountSecurity: [
    "Keep passwords confidential", "Enable two-factor authentication when available",
    "Report unauthorized access immediately", "Protect their devices from unauthorized use",
  ],
  securityNote: "Users are responsible for activity occurring on their accounts.",
  privacy: [
    "Operate platform services", "Improve user experience", "Prevent fraud",
    "Maintain security", "Comply with legal obligations",
  ],
  monitoring: [
    "Monitor platform activity", "Review reports", "Remove violating content",
    "Investigate suspicious behavior", "Restrict platform features", "Suspend or permanently terminate accounts",
  ],
  disciplinary: [
    { level: 1, action: "Warning", color: "#F59E0B" },
    { level: 2, action: "Temporary Chat Restriction", color: "#FB923C" },
    { level: 3, action: "Temporary Account Restriction", color: "#F97316" },
    { level: 4, action: "Account Suspension", color: "#EF4444" },
    { level: 5, action: "Permanent Account Termination", color: "#DC2626" },
  ],
  disciplinaryNote: "Serious violations may result in immediate permanent suspension without prior notice.",
  reporting: [
    "Fraud", "Abuse", "Harassment", "Fake accounts", "Illegal content", "Security concerns",
  ],
  reportingNote: "False or malicious reports may also result in disciplinary action.",
  legalCompliance: [
    "Applicable local laws", "International regulations where applicable", "Copyright laws",
    "Privacy laws", "Anti-fraud regulations", "Platform Terms of Service", "Community Guidelines",
  ],
};

export default function UserPolicyTab() {
  const [expanded, setExpanded] = useState("rights");
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #334155 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #64748B, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative">
          <div className="text-3xl mb-1">🌐</div>
          <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
          <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>User Policy, Rights, Responsibilities & Terms</p>
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
            <p className="text-[9px]" style={{ color: TEXT_MUTED }}>👤 POSITION TITLE</p>
            <p className="text-xs font-bold text-white">{POLICY.position}</p>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <p className="text-[9px]" style={{ color: TEXT_MUTED }}>📍 DEPARTMENT</p>
            <p className="text-xs font-bold" style={{ color: BLUE }}>{POLICY.department}</p>
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

      <CollapsibleCard id="rights" title="User Rights" icon="🔐" expanded={expanded} toggle={toggle} accent="#10B981">
        <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>Every User has the right to:</p>
        <div className="space-y-1.5">
          {POLICY.rights.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#10B98115" }}>
                <Check size={10} style={{ color: "#10B981" }} />
              </div>
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="restrictions" title="User Restrictions" icon="🚫" expanded={expanded} toggle={toggle} accent="#EF4444">
        <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>Users MAY NOT:</p>
        <div className="space-y-1.5">
          {POLICY.restrictions.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#EF444415" }}>
                <X size={10} style={{ color: "#EF4444" }} />
              </div>
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="responsibilities" title="User Responsibilities" icon="📋" expanded={expanded} toggle={toggle} accent={BLUE}>
        <div className="space-y-1.5">
          {POLICY.responsibilities.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: BLUE }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="community" title="Community Standards" icon="💬" expanded={expanded} toggle={toggle} accent="#8B5CF6">
        <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>Users must:</p>
        <div className="space-y-1.5">
          {POLICY.communityStandards.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: "#8B5CF6" }} />
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
                    <span className="text-[11px]" style={{ color: TEXT_MUTED }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="coins" title="Coins & Purchases" icon="💰" expanded={expanded} toggle={toggle} accent={GOLD}>
        <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>Users may:</p>
        <div className="space-y-1.5 mb-3">
          {POLICY.coinsPurchases.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: GOLD }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}15` }}>
          <p className="text-[10px] leading-relaxed" style={{ color: TEXT_MUTED }}>{POLICY.coinsNote}</p>
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="security" title="Account Security" icon="🔒" expanded={expanded} toggle={toggle} accent={BLUE}>
        <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>Users must:</p>
        <div className="space-y-1.5 mb-3">
          {POLICY.accountSecurity.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: BLUE }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: `${BLUE}08`, border: `1px solid ${BLUE}15` }}>
          <p className="text-[10px] leading-relaxed" style={{ color: TEXT_MUTED }}>{POLICY.securityNote}</p>
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="privacy" title="Privacy & Data Protection" icon="🔐" expanded={expanded} toggle={toggle} accent="#06B6D4">
        <p className="text-[11px] mb-2" style={{ color: TEXT_MUTED }}>The platform is committed to protecting user information. Users agree that VYRO Live Connect may process account and usage data to:</p>
        <div className="space-y-1.5">
          {POLICY.privacy.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: "#06B6D4" }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="monitoring" title="Monitoring & Enforcement" icon="📊" expanded={expanded} toggle={toggle} accent="#8B5CF6">
        <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>VYRO Live Connect may:</p>
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

      <CollapsibleCard id="reporting" title="Reporting Violations" icon="📞" expanded={expanded} toggle={toggle} accent="#10B981">
        <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>Users are encouraged to report:</p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {POLICY.reporting.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2" style={{ background: "#10B98108" }}>
              <Check size={10} style={{ color: "#10B981" }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: "#F59E0B08", border: "1px solid #F59E0B15" }}>
          <p className="text-[10px] leading-relaxed" style={{ color: TEXT_MUTED }}>{POLICY.reportingNote}</p>
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="legal" title="Legal Compliance" icon="⚖️" expanded={expanded} toggle={toggle} accent="#64748B">
        <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>Users agree to comply with:</p>
        <div className="space-y-1.5">
          {POLICY.legalCompliance.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: "#64748B" }} />
              <span className="text-[11px] text-white">{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* Policy Updates Note */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📜</span>
          <h3 className="text-sm font-bold text-white">Policy Updates</h3>
        </div>
        <p className="text-[11px] leading-relaxed" style={{ color: TEXT_MUTED }}>
          VYRO Live Connect reserves the right to modify or update this policy at any time. Continued use of the platform constitutes acceptance of the latest version.
        </p>
      </GlassCard>

      {/* Agreement */}
      <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #334155 100%)" }}>
        <div className="text-2xl mb-2">📜</div>
        <h3 className="text-sm font-bold text-white mb-2">User Agreement</h3>
        <p className="text-[11px] text-white/60 leading-relaxed">
          By creating an account or using VYRO Live Connect, the User confirms that they have read, understood, and agreed to comply with all platform policies, community guidelines, operational requirements, and future policy updates.
        </p>
        <p className="text-[10px] text-white/40 leading-relaxed mt-2">
          Failure to comply may result in warnings, feature restrictions, account suspension, permanent termination, loss of virtual assets where permitted by law, or legal action when applicable.
        </p>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] font-bold tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>END OF OFFICIAL USER POLICY DOCUMENT</p>
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