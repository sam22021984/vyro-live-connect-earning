import React, { useState } from "react";
import { ChevronDown, Check, X, LifeBuoy } from "lucide-react";

const DARK = "#0F1B3D";
const BLUE = "#2F80ED";
const TEAL = "#56CCF2";
const WHITE = "#FFFFFF";
const GRAY = "#6B7280";

const POLICY = {
  position: "Support Manager (SM)",
  department: "Management Department",
  reporting: "Business Manager (BM)",
  purpose: "The Support Manager is responsible for handling all user support operations, complaint resolution, technical assistance coordination, service quality monitoring, and ensuring smooth user experience across the platform. The role focuses on resolving issues quickly, maintaining user satisfaction, and ensuring platform stability from a support perspective.",
  authority: {
    may: [
      "Handle user complaints and tickets",
      "Resolve basic user issues",
      "Escalate technical problems",
      "Coordinate with Admin for system issues",
      "Monitor support team performance",
      "Improve service quality",
      "Track recurring issues",
      "Submit support reports to Business Manager",
    ],
    mayNot: [
      "Access financial systems",
      "Approve withdrawals or payments",
      "Change platform policies",
      "Modify commission structures",
      "Access Owner or Country Manager controls",
      "Manipulate user data",
      "Override Business Manager decisions",
      "Create fake resolutions or reports",
    ],
  },
  responsibilities: [
    { icon: "🎧", title: "User Support Handling", items: ["Respond to user queries", "Resolve complaints", "Provide platform guidance", "Ensure fast response time"] },
    { icon: "🔧", title: "Issue Resolution", items: ["Identify technical issues", "Escalate system bugs", "Coordinate fixes with Admin/Super Admin", "Track resolution progress"] },
    { icon: "📊", title: "Quality Monitoring", items: ["Monitor support quality", "Improve user satisfaction", "Analyze repeated issues", "Suggest system improvements"] },
    { icon: "📢", title: "Communication", items: ["Communicate updates to users", "Provide resolution feedback", "Maintain professional interaction"] },
    { icon: "📈", title: "Reporting", items: ["Prepare support reports", "Submit weekly performance reports", "Report major issues to Business Manager"] },
  ],
  expectations: ["Maintain fast response times", "Resolve issues efficiently", "Improve user satisfaction", "Reduce complaint volume", "Ensure service quality", "Maintain professional communication"],
  kpis: ["Ticket resolution time", "User satisfaction rate", "Complaint resolution success rate", "Response time efficiency", "Support accuracy", "System issue escalation rate"],
  financial: {
    notResponsible: ["Payments", "Withdrawals", "Revenue handling", "Commission distribution"],
    note: "Support Managers only assist in issue reporting related to transactions.",
  },
  prohibited: [
    { icon: "⚠️", title: "Support Abuse", items: ["Fake ticket resolution", "Ignoring user complaints", "Misreporting issues"] },
    { icon: "🔒", title: "Data Misuse", items: ["Sharing user private data", "Accessing unauthorized accounts", "Leaking system information"] },
    { icon: "⚡", title: "Authority Misuse", items: ["Giving false promises", "Acting beyond authority", "Changing decisions without approval"] },
  ],
  compensation: ["Management commission", "Performance bonuses", "Support efficiency rewards", "User satisfaction incentives", "Monthly excellence awards"],
  benefits: ["Support Manager Badge", "Premium Profile Frame", "Priority System Access", "VIP Benefits", "Leadership Recognition", "Performance Rewards", "Internal Training Access"],
  disciplinary: [
    { level: 1, action: "Warning", color: "#F59E0B" },
    { level: 2, action: "Performance Review", color: "#FB923C" },
    { level: 3, action: "Access Restriction", color: "#F97316" },
    { level: 4, action: "Suspension", color: "#EF4444" },
    { level: 5, action: "Termination", color: "#DC2626" },
  ],
  confidentiality: ["Share user data", "Leak internal support systems", "Disclose complaint details publicly", "Share system vulnerabilities", "Misuse support logs"],
  conduct: ["Be polite and professional", "Respect users", "Maintain neutrality", "Follow company policies", "Ensure fair treatment", "Protect platform reputation"],
};

export default function SupportManagerPolicyTab() {
  const [expanded, setExpanded] = useState("authority");
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #1E3A8A 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #2F80ED, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative text-center">
          <div className="text-3xl mb-1">🌐</div>
          <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
          <p className="text-[11px] mt-1" style={{ color: TEAL }}>Support Manager (SM) Policy, Authority, Responsibilities & Terms</p>
        </div>
      </div>

      {/* Position info */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2">
          <LifeBuoy size={14} style={{ color: BLUE }} />
          <h3 className="text-xs font-bold" style={{ color: DARK }}>Position & Department</h3>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>POSITION TITLE</p>
            <p className="text-xs font-bold" style={{ color: BLUE }}>{POLICY.position}</p>
          </div>
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>DEPARTMENT</p>
            <p className="text-xs font-bold" style={{ color: DARK }}>{POLICY.department}</p>
          </div>
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>REPORTING TO</p>
            <p className="text-[11px] font-semibold" style={{ color: TEAL }}>🏢 {POLICY.reporting}</p>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[9px] mb-1" style={{ color: GRAY }}>ROLE PURPOSE</p>
            <p className="text-[11px] leading-relaxed" style={{ color: GRAY }}>{POLICY.purpose}</p>
          </div>
        </div>
      </div>

      <CollapsibleCard id="authority" title="Authority Level" icon="🔐" expanded={expanded} toggle={toggle} accent={BLUE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Support Manager has operational authority over support-related activities only.</p>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ Support Manager MAY:</p>
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
            <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>❌ Support Manager MAY NOT:</p>
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

      <CollapsibleCard id="responsibilities" title="Primary Responsibilities" icon="📋" expanded={expanded} toggle={toggle} accent={TEAL}>
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
                    <Check size={10} style={{ color: TEAL }} />
                    <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="expectations" title="Performance Expectations" icon="📈" expanded={expanded} toggle={toggle} accent={BLUE}>
        <div className="space-y-2">
          {POLICY.expectations.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: BLUE }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="kpis" title="Key Performance Indicators (KPIs)" icon="📊" expanded={expanded} toggle={toggle} accent={TEAL}>
        <div className="grid grid-cols-2 gap-2">
          {POLICY.kpis.map((item, i) => (
            <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: "#2F80ED08", border: "1px solid #2F80ED15" }}>
              <p className="text-[10px]" style={{ color: GRAY }}>{item}</p>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="financial" title="Financial Responsibilities" icon="💰" expanded={expanded} toggle={toggle} accent={BLUE}>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>❌ Support Managers are NOT responsible for:</p>
            <div className="space-y-1.5">
              {POLICY.financial.notResponsible.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <X size={10} style={{ color: "#EB5757" }} />
                  <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <div className="rounded-xl p-3" style={{ background: "#2F80ED08", border: "1px solid #2F80ED15" }}>
              <p className="text-[11px]" style={{ color: BLUE }}>{POLICY.financial.note}</p>
            </div>
          </div>
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

      <CollapsibleCard id="compensation" title="Compensation & Benefits" icon="💰" expanded={expanded} toggle={toggle} accent={BLUE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Eligible Support Managers may receive:</p>
        <div className="space-y-2">
          {POLICY.compensation.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#2F80ED08" }}>
              <span className="text-sm">💰</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="benefits" title="Benefits" icon="🎁" expanded={expanded} toggle={toggle} accent={BLUE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Qualified Support Managers may receive:</p>
        <div className="space-y-2">
          {POLICY.benefits.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#2F80ED08" }}>
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

      <CollapsibleCard id="confidentiality" title="Confidentiality" icon="🔒" expanded={expanded} toggle={toggle} accent={TEAL}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Support Managers must not:</p>
        <div className="space-y-2">
          {POLICY.confidentiality.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <X size={11} style={{ color: "#EB5757" }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="conduct" title="Professional Conduct" icon="🤝" expanded={expanded} toggle={toggle} accent={BLUE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Support Managers must:</p>
        <div className="space-y-2">
          {POLICY.conduct.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: BLUE }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* Agreement */}
      <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #1E3A8A 100%)" }}>
        <div className="text-2xl mb-2">📜</div>
        <h3 className="text-sm font-bold text-white mb-2">Agreement</h3>
        <p className="text-[11px] text-white/60 leading-relaxed">
          By serving as a Support Manager on VYRO Live Connect, the Support Manager agrees to comply with all platform policies, support procedures, operational standards, confidentiality requirements, and future updates.
        </p>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] font-bold tracking-wider" style={{ color: `${BLUE}99` }}>END OF SUPPORT MANAGER POLICY DOCUMENT</p>
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