import React, { useState } from "react";
import { ChevronDown, Check, X, Briefcase } from "lucide-react";

const DARK = "#0F1B3D";
const SLATE = "#64748B";
const BLUE = "#3B82F6";
const WHITE = "#FFFFFF";
const GRAY = "#6B7280";

const POLICY = {
  position: "Admin (AN)",
  department: "Administrative Control",
  reporting: "Super Admin (SA)",
  manages: ["Agents"],
  purpose: "An Admin is responsible for managing daily platform operations, supervising Agents, monitoring user activities, ensuring policy compliance, and maintaining operational stability. The Admin serves as the operational bridge between Agents and the Super Admin.",
  authority: {
    may: [
      "Monitor Agents and Host activities", "Review Agent performance", "Verify operational reports",
      "Escalate issues to Super Admin", "Monitor policy compliance", "Handle operational disputes",
      "Issue warnings according to platform policies", "Review suspicious activities", "Manage assigned operational tasks",
    ],
    mayNot: [
      "Modify platform core settings", "Access Owner-level controls", "Change commission structures",
      "Change financial policies", "Approve major financial transactions", "Create fake accounts",
      "Manipulate platform rankings", "Modify system logs", "Override Super Admin decisions",
    ],
  },
  responsibilities: [
    { icon: "👥", title: "Agent Management", items: ["Supervise assigned Agents", "Review Agent performance", "Monitor Agent compliance", "Support Agent development"] },
    { icon: "📊", title: "Operational Monitoring", items: ["Monitor platform activities", "Identify suspicious behavior", "Ensure smooth daily operations", "Maintain system order"] },
    { icon: "🛡️", title: "Compliance Management", items: ["Enforce platform policies", "Investigate violations", "Document incidents", "Submit reports to Super Admin"] },
    { icon: "💬", title: "Communication Management", items: ["Coordinate with Agents", "Communicate operational updates", "Escalate major issues"] },
    { icon: "🤝", title: "User Protection", items: ["Monitor abuse reports", "Assist in dispute resolution", "Protect platform integrity"] },
  ],
  expectations: ["Maintain operational stability", "Ensure policy compliance", "Resolve issues efficiently", "Support platform growth", "Submit accurate reports", "Maintain professional conduct"],
  kpis: ["Issue resolution rate", "Compliance enforcement", "Agent performance quality", "Report accuracy", "Response time", "Operational efficiency"],
  prohibited: [
    { icon: "⚙️", title: "System Abuse", items: ["Unauthorized system access", "Data manipulation", "Record alteration", "Unauthorized approvals"] },
    { icon: "💸", title: "Financial Abuse", items: ["Commission manipulation", "Unauthorized financial actions", "Revenue fraud"] },
    { icon: "⚖️", title: "Authority Abuse", items: ["Misuse of administrative privileges", "Personal gain through position", "Unfair treatment of users"] },
    { icon: "🔐", title: "Security Violations", items: ["Sharing confidential information", "Revealing internal procedures", "Leaking business information"] },
  ],
  compensation: ["Administrative commissions", "Performance bonuses", "Leadership rewards", "Operational incentives", "Event bonuses", "Seasonal rewards"],
  benefits: ["Admin Badge", "Exclusive Profile Frame", "Priority Support Access", "VIP Benefits", "Event Invitations", "Leadership Recognition", "Performance Awards"],
  disciplinary: [
    { level: 1, action: "Written Warning", color: "#F59E0B" },
    { level: 2, action: "Temporary Restriction", color: "#FB923C" },
    { level: 3, action: "Administrative Privilege Suspension", color: "#F97316" },
    { level: 4, action: "Position Removal", color: "#EF4444" },
    { level: 5, action: "Permanent Account Termination", color: "#DC2626" },
  ],
  confidentiality: ["Share internal reports", "Share user information", "Share financial records", "Share system access details", "Share confidential business data"],
  conduct: ["Remain impartial", "Act professionally", "Follow company policies", "Respect user privacy", "Protect platform reputation"],
};

export default function AdminPolicyTab() {
  const [expanded, setExpanded] = useState("authority");
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #334155 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #64748B, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative text-center">
          <div className="text-3xl mb-1">🌐</div>
          <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
          <p className="text-[11px] mt-1" style={{ color: "#94A3B8" }}>Admin Policy, Authority, Responsibilities & Terms</p>
        </div>
      </div>

      {/* Position info */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2">
          <Briefcase size={14} style={{ color: SLATE }} />
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
            <div className="flex flex-wrap gap-1.5">
              {POLICY.manages.map((m, i) => (
                <span key={i} className="text-[10px] px-2 py-1 rounded-full" style={{ background: `${SLATE}10`, color: SLATE }}>{m}</span>
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
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Admins have operational authority within assigned responsibilities.</p>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ Admins MAY:</p>
            <div className="space-y-1.5">
              {POLICY.authority.may.map((item, i) => (
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
            <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>❌ Admins MAY NOT:</p>
            <div className="space-y-1.5">
              {POLICY.authority.mayNot.map((item, i) => (
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
            <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: "#3B82F608", border: "1px solid #3B82F615" }}>
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
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#64748B08" }}>
              <span className="text-sm">💰</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px]" style={{ color: GRAY }}>Subject to company policies and performance evaluation.</p>
      </CollapsibleCard>

      <CollapsibleCard id="benefits" title="Benefits" icon="🎁" expanded={expanded} toggle={toggle} accent={SLATE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Qualified Admins may receive:</p>
        <div className="space-y-2">
          {POLICY.benefits.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#64748B08" }}>
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
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Admins must not:</p>
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
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Admins must:</p>
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
      <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #334155 100%)" }}>
        <div className="text-2xl mb-2">📜</div>
        <h3 className="text-sm font-bold text-white mb-2">Agreement</h3>
        <p className="text-[11px] text-white/60 leading-relaxed">
          By serving as an Admin on VYRO Live Connect, the Admin agrees to comply with all platform policies, operational procedures, security requirements, compliance standards, and future platform updates.
        </p>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] font-bold tracking-wider" style={{ color: `${SLATE}99` }}>END OF ADMIN POLICY DOCUMENT</p>
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