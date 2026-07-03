import React, { useState } from "react";
import { ChevronDown, Check, X, Shield } from "lucide-react";

const DARK = "#0F1B3D";
const SLATE = "#475569";
const BLUE = "#2F80ED";
const WHITE = "#FFFFFF";
const GRAY = "#6B7280";

const POLICY = {
  position: "Super Admin (SA)",
  department: "Administrative Control",
  reporting: "Super Admin Manager",
  manages: ["Admins (AN)", "Administrative Operations", "Platform Compliance & Security Monitoring"],
  purpose: "The Super Admin is responsible for overseeing platform administration, security monitoring, compliance enforcement, operational supervision, and administrative performance management. The Super Admin acts as the highest administrative authority within the platform and serves as the primary bridge between the Country Manager and the Administrative Control Department.",
  authority: [
    "Supervise all Admin operations", "Review Admin performance", "Monitor platform compliance",
    "Monitor platform security", "Investigate fraud and abuse cases", "Review administrative reports",
    "Recommend disciplinary actions", "Escalate major issues to Country Manager", "Audit operational activities",
    "Monitor platform risk indicators", "Enforce administrative policies", "Review suspicious transactions",
  ],
  limitations: [
    "Override Application Owner decisions", "Modify company ownership structures", "Change company commission policies",
    "Approve company financial distribution", "Access Owner private accounts", "Create unauthorized system changes",
    "Manipulate rankings, rewards, or revenue", "Modify audit logs", "Bypass compliance procedures",
  ],
  responsibilities: [
    { icon: "📋", title: "Administrative Supervision", items: ["Manage all Admin personnel", "Review Admin reports", "Monitor Admin performance", "Ensure operational efficiency"] },
    { icon: "🛡️", title: "Compliance Enforcement", items: ["Enforce platform rules", "Investigate policy violations", "Monitor compliance standards", "Maintain platform integrity"] },
    { icon: "🔒", title: "Security Monitoring", items: ["Detect suspicious activities", "Monitor security threats", "Prevent fraud and abuse", "Coordinate security reviews"] },
    { icon: "⚠️", title: "Risk Management", items: ["Identify operational risks", "Recommend corrective actions", "Escalate critical risks"] },
    { icon: "📊", title: "Reporting", items: ["Prepare reports for Country Manager", "Submit compliance reviews", "Provide operational summaries"] },
  ],
  expectations: ["Maintain platform stability", "Ensure policy enforcement", "Improve operational efficiency", "Reduce fraud incidents", "Support platform growth", "Maintain accurate reporting"],
  kpis: ["Compliance rate", "Fraud prevention effectiveness", "Administrative performance", "Issue resolution efficiency", "Security incident management", "Reporting accuracy", "Operational stability"],
  prohibited: [
    { icon: "⚖️", title: "Administrative Abuse", items: ["Abuse of authority", "Unfair enforcement", "Personal gain through position"] },
    { icon: "🔐", title: "Security Violations", items: ["Sharing access credentials", "Unauthorized data disclosure", "Security negligence"] },
    { icon: "💸", title: "Financial Violations", items: ["Revenue manipulation", "Commission manipulation", "Unauthorized approvals"] },
    { icon: "📋", title: "Reporting Violations", items: ["False reporting", "Concealing incidents", "Data manipulation"] },
  ],
  compensation: ["Administrative commission", "Leadership incentives", "Performance bonuses", "Operational rewards", "Special achievement bonuses", "Annual recognition awards"],
  benefits: ["Super Admin Badge", "Premium Profile Frame", "Exclusive Chat Bubble", "Priority Support", "VIP Benefits", "Leadership Recognition", "Special Event Access", "Performance Awards"],
  disciplinary: [
    { level: 1, action: "Official Warning", color: "#F59E0B" },
    { level: 2, action: "Administrative Review", color: "#FB923C" },
    { level: 3, action: "Privilege Suspension", color: "#F97316" },
    { level: 4, action: "Position Removal", color: "#EF4444" },
    { level: 5, action: "Permanent Account Termination", color: "#DC2626" },
  ],
  confidentiality: ["Share internal reports", "Share security information", "Share user data", "Share business strategies", "Share confidential operational information"],
  conduct: ["Lead by example", "Maintain professionalism", "Ensure fairness", "Protect company interests", "Follow company policies", "Respect confidentiality"],
};

export default function SuperAdminPolicyTab() {
  const [expanded, setExpanded] = useState("authority");
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #2F80ED, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative text-center">
          <div className="text-3xl mb-1">🌐</div>
          <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
          <p className="text-[11px] mt-1" style={{ color: "#56CCF2" }}>Super Admin Policy, Authority, Responsibilities & Terms</p>
        </div>
      </div>

      {/* Position info */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2">
          <Shield size={14} style={{ color: SLATE }} />
          <h3 className="text-xs font-bold" style={{ color: DARK }}>Position & Department</h3>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>POSITION TITLE</p>
            <p className="text-xs font-bold" style={{ color: SLATE }}>{POLICY.position}</p>
          </div>
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>DEPARTMENT</p>
            <p className="text-xs font-bold" style={{ color: DARK }}>{POLICY.department}</p>
          </div>
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>REPORTING TO</p>
            <p className="text-[11px] font-semibold" style={{ color: BLUE }}>{POLICY.reporting}</p>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[9px] mb-2" style={{ color: GRAY }}>👥 MANAGES</p>
            <div className="space-y-1.5">
              {POLICY.manages.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={10} style={{ color: SLATE }} />
                  <span className="text-[11px]" style={{ color: GRAY }}>{m}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[9px] mb-1" style={{ color: GRAY }}>ROLE PURPOSE</p>
            <p className="text-[11px] leading-relaxed" style={{ color: GRAY }}>{POLICY.purpose}</p>
          </div>
        </div>
      </div>

      <CollapsibleCard id="authority" title="Authority Level" icon="🔐" expanded={expanded} toggle={toggle} accent={SLATE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Super Admin has high-level administrative authority.</p>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ Super Admin MAY:</p>
            <div className="space-y-1.5">
              {POLICY.authority.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#27AE6015" }}>
                    <Check size={10} style={{ color: "#27AE60" }} />
                  </div>
                  <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>🚫 Authority Limitations:</p>
            <div className="space-y-1.5">
              {POLICY.limitations.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#EB575715" }}>
                    <X size={10} style={{ color: "#EB5757" }} />
                  </div>
                  <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="responsibilities" title="Primary Responsibilities" icon="📋" expanded={expanded} toggle={toggle} accent={BLUE}>
        <div className="space-y-3">
          {POLICY.responsibilities.map((r, i) => (
            <div key={i} className="rounded-xl p-3" style={{ background: "#F7F9FC" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{r.icon}</span>
                <p className="text-xs font-bold" style={{ color: DARK }}>{r.title}</p>
              </div>
              <div className="space-y-1.5">
                {r.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Check size={10} style={{ color: BLUE }} />
                    <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="expectations" title="Performance Expectations" icon="📈" expanded={expanded} toggle={toggle} accent={SLATE}>
        <div className="space-y-2">
          {POLICY.expectations.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: SLATE }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="kpis" title="Key Performance Indicators (KPIs)" icon="📊" expanded={expanded} toggle={toggle} accent={BLUE}>
        <div className="grid grid-cols-2 gap-2">
          {POLICY.kpis.map((item, i) => (
            <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: "#2F80ED08", border: "1px solid #2F80ED15" }}>
              <p className="text-[10px]" style={{ color: GRAY }}>{item}</p>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="prohibited" title="Prohibited Activities" icon="🚫" expanded={expanded} toggle={toggle} accent="#EB5757">
        <div className="space-y-3">
          {POLICY.prohibited.map((p, i) => (
            <div key={i} className="rounded-xl p-3" style={{ background: "#EB575706", border: "1px solid #EB575710" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{p.icon}</span>
                <p className="text-xs font-bold" style={{ color: DARK }}>{p.title}</p>
              </div>
              <div className="space-y-1.5">
                {p.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <X size={10} style={{ color: "#EB5757" }} />
                    <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="compensation" title="Compensation & Benefits" icon="💰" expanded={expanded} toggle={toggle} accent={SLATE}>
        <div className="space-y-2 mb-3">
          {POLICY.compensation.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#47556908" }}>
              <span className="text-sm">💰</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px]" style={{ color: GRAY }}>Subject to company policies and performance evaluation.</p>
      </CollapsibleCard>

      <CollapsibleCard id="benefits" title="Benefits" icon="🎁" expanded={expanded} toggle={toggle} accent={SLATE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Qualified Super Admins may receive:</p>
        <div className="space-y-2">
          {POLICY.benefits.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#47556908" }}>
              <span className="text-sm">🎁</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="disciplinary" title="Disciplinary Actions" icon="⚠️" expanded={expanded} toggle={toggle} accent="#EB5757">
        <div className="space-y-2">
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
      </CollapsibleCard>

      <CollapsibleCard id="confidentiality" title="Confidentiality" icon="🔒" expanded={expanded} toggle={toggle} accent={BLUE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Super Admins must not:</p>
        <div className="space-y-2">
          {POLICY.confidentiality.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <X size={11} style={{ color: "#EB5757" }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="conduct" title="Professional Conduct" icon="🤝" expanded={expanded} toggle={toggle} accent={SLATE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Super Admins must:</p>
        <div className="space-y-2">
          {POLICY.conduct.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: SLATE }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* Agreement */}
      <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 100%)" }}>
        <div className="text-2xl mb-2">📜</div>
        <h3 className="text-sm font-bold text-white mb-2">Agreement</h3>
        <p className="text-[11px] text-white/60 leading-relaxed">
          By serving as a Super Admin on VYRO Live Connect, the Super Admin agrees to comply with all platform policies, administrative procedures, compliance requirements, security standards, and future company updates.
        </p>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] font-bold tracking-wider" style={{ color: `${SLATE}99` }}>END OF SUPER ADMIN POLICY DOCUMENT</p>
      </div>
    </div>
  );
}

function CollapsibleCard({ id, title, icon, expanded, toggle, accent, children }) {
  const isOpen = expanded === id;
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: WHITE, border: `1px solid ${accent}20` }}>
      <button onClick={() => toggle(id)} className="w-full p-4 flex items-center gap-3 active:scale-[0.98] transition">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: `${accent}15` }}>
          {icon}
        </div>
        <h3 className="flex-1 text-left text-sm font-bold" style={{ color: DARK }}>{title}</h3>
        <ChevronDown size={18} style={{ color: GRAY }} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="px-4 pb-4 animate-fadeIn">{children}</div>}
    </div>
  );
}