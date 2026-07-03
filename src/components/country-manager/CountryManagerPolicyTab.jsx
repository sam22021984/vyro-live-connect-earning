import React, { useState } from "react";
import { ChevronDown, Check, X, Globe } from "lucide-react";

const DARK = "#0F1B3D";
const GREEN = "#10B981";
const BLUE = "#1D4ED8";
const GOLD = "#F59E0B";
const WHITE = "#FFFFFF";
const GRAY = "#6B7280";

const POLICY = {
  position: "Country Manager (CM)",
  department: "Executive Management Department",
  reporting: "👑 Application Owner (AO)",
  directOversight: {
    title: "Management Department",
    items: ["Business Developer (BD)"],
    note: "Administrative Control",
    adminItem: "Super Admin (SA)",
  },
  indirectOversight: [
    "Business Manager (BM)", "Reward Manager (RM)", "PK Manager (PM)",
    "Event Manager (EM)", "Support Manager (SM)", "Marketing Manager (MM)",
    "Finance Manager (FM)", "Admin (AN)", "Agent", "Host",
  ],
  purpose: "The Country Manager is the highest operational authority within a country and acts as the official representative of the Application Owner. The Country Manager is responsible for country-wide growth, operational management, revenue performance, compliance oversight, risk management, and execution of company objectives. The Country Manager serves as the only direct reporting channel between the country operations and the Application Owner.",
  authority: [
    "Manage country operations", "Supervise Business Developer", "Supervise Super Admin",
    "Review departmental performance", "Approve operational strategies", "Recommend organizational changes",
    "Approve regional campaigns", "Review revenue performance", "Review compliance reports",
    "Review risk assessments", "Monitor company growth", "Escalate strategic matters to Application Owner",
  ],
  limitations: [
    "Override Application Owner decisions", "Change company ownership", "Transfer company ownership",
    "Access Owner personal accounts", "Modify company equity structure", "Alter core financial policies without approval",
    "Approve unauthorized expenditures", "Change company legal structure", "Manipulate company revenue records",
  ],
  responsibilities: [
    { icon: "🌍", title: "Country Operations Management", items: ["Manage all country operations", "Ensure business continuity", "Maintain operational standards", "Monitor country-wide performance"] },
    { icon: "👑", title: "Leadership & Management", items: ["Lead management teams", "Guide department heads", "Improve organizational performance", "Ensure accountability"] },
    { icon: "💰", title: "Revenue Growth", items: ["Monitor country revenue", "Identify growth opportunities", "Support expansion strategies", "Improve profitability"] },
    { icon: "🎯", title: "Strategic Execution", items: ["Execute company objectives", "Implement approved strategies", "Monitor project progress", "Ensure successful delivery"] },
    { icon: "🛡️", title: "Compliance & Governance", items: ["Ensure policy compliance", "Support legal compliance", "Monitor operational risks", "Maintain company standards"] },
    { icon: "📋", title: "Reporting", items: ["Prepare executive reports", "Submit country performance reports", "Present strategic updates", "Communicate directly with Application Owner"] },
  ],
  expectations: ["Achieve growth targets", "Improve operational performance", "Maintain compliance standards", "Support sustainable expansion", "Strengthen organizational stability", "Protect company interests"],
  kpis: ["Revenue growth", "Country profitability", "User growth", "Host growth", "Agent growth", "Operational efficiency", "Compliance score", "Retention rates", "Risk management effectiveness", "Strategic goal achievement"],
  financial: {
    items: ["Revenue monitoring", "Financial performance oversight", "Budget supervision", "Financial reporting review", "Profitability analysis"],
    note: "The Country Manager does NOT directly control company funds unless authorized by the Application Owner.",
  },
  prohibited: [
    { icon: "⚖️", title: "Governance Violations", items: ["Abuse of authority", "Unauthorized decision-making", "Conflict of interest"] },
    { icon: "💸", title: "Financial Violations", items: ["Revenue manipulation", "Unauthorized payments", "Financial fraud"] },
    { icon: "🛡️", title: "Compliance Violations", items: ["Ignoring company policies", "Concealing violations", "Failing to report risks"] },
    { icon: "👥", title: "Leadership Violations", items: ["Discrimination", "Harassment", "Abuse of position"] },
  ],
  compensation: ["Executive commission", "Leadership incentives", "Performance bonuses", "Revenue growth rewards", "Strategic achievement bonuses", "Annual executive awards"],
  benefits: ["Country Manager Badge", "Executive Profile Frame", "Premium Chat Bubble", "Executive VIP Status", "Priority Support", "Leadership Recognition", "Executive Event Access", "Strategic Leadership Awards"],
  disciplinary: [
    { level: 1, action: "Executive Warning", color: "#F59E0B" },
    { level: 2, action: "Performance Review", color: "#FB923C" },
    { level: 3, action: "Authority Restriction", color: "#F97316" },
    { level: 4, action: "Position Suspension", color: "#EF4444" },
    { level: 5, action: "Position Termination", color: "#DC2626" },
  ],
  confidentiality: ["Share executive reports", "Share company strategies", "Share financial records", "Share confidential business information", "Disclose internal decisions without authorization"],
  conduct: ["Demonstrate leadership", "Maintain professionalism", "Protect company interests", "Support company growth", "Ensure fairness", "Follow company policies"],
};

export default function CountryManagerPolicyTab() {
  const [expanded, setExpanded] = useState("authority");
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #065F46 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #10B981, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative text-center">
          <div className="text-3xl mb-1">🌐</div>
          <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
          <p className="text-[11px] mt-1" style={{ color: GREEN }}>Country Manager (CM) Policy, Authority, Responsibilities & Terms</p>
        </div>
      </div>

      {/* Position info */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2">
          <Globe size={14} style={{ color: GREEN }} />
          <h3 className="text-xs font-bold" style={{ color: DARK }}>Position & Department</h3>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>POSITION TITLE</p>
            <p className="text-xs font-bold" style={{ color: GREEN }}>{POLICY.position}</p>
          </div>
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>DEPARTMENT</p>
            <p className="text-xs font-bold" style={{ color: DARK }}>{POLICY.department}</p>
          </div>
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>REPORTING TO</p>
            <p className="text-[11px] font-semibold" style={{ color: GOLD }}>{POLICY.reporting}</p>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[9px] mb-2" style={{ color: GRAY }}>👥 DIRECT OVERSIGHT</p>
            <p className="text-[10px] font-bold mb-1" style={{ color: BLUE }}>{POLICY.directOversight.title}</p>
            <div className="space-y-1.5">
              {POLICY.directOversight.items.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={10} style={{ color: GREEN }} />
                  <span className="text-[11px]" style={{ color: GRAY }}>{m}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold" style={{ color: GRAY }}>{POLICY.directOversight.note}:</span>
                <span className="text-[11px]" style={{ color: GRAY }}>{POLICY.directOversight.adminItem}</span>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[9px] mb-2" style={{ color: GRAY }}>INDIRECT OVERSIGHT</p>
            <div className="flex flex-wrap gap-1.5">
              {POLICY.indirectOversight.map((m, i) => (
                <span key={i} className="text-[9px] px-2 py-1 rounded-full" style={{ background: `${GREEN}10`, color: GREEN }}>{m}</span>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[9px] mb-1" style={{ color: GRAY }}>ROLE PURPOSE</p>
            <p className="text-[11px] leading-relaxed" style={{ color: GRAY }}>{POLICY.purpose}</p>
          </div>
        </div>
      </div>

      <CollapsibleCard id="authority" title="Authority Level" icon="🔐" expanded={expanded} toggle={toggle} accent={GREEN}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Country Manager has executive-level operational authority.</p>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ Country Manager MAY:</p>
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

      <CollapsibleCard id="expectations" title="Performance Expectations" icon="📈" expanded={expanded} toggle={toggle} accent={GREEN}>
        <div className="space-y-2">
          {POLICY.expectations.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: GREEN }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="kpis" title="Key Performance Indicators (KPIs)" icon="📊" expanded={expanded} toggle={toggle} accent={BLUE}>
        <div className="grid grid-cols-2 gap-2">
          {POLICY.kpis.map((item, i) => (
            <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: "#1D4ED808", border: "1px solid #1D4ED815" }}>
              <p className="text-[10px]" style={{ color: GRAY }}>{item}</p>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="financial" title="Financial Responsibilities" icon="💰" expanded={expanded} toggle={toggle} accent={GREEN}>
        <div className="space-y-2 mb-3">
          {POLICY.financial.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#10B98108" }}>
              <span className="text-sm">💰</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: "#F59E0B10", border: "1px solid #F59E0B20" }}>
          <p className="text-[10px]" style={{ color: "#D97706" }}>⚠️ {POLICY.financial.note}</p>
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

      <CollapsibleCard id="compensation" title="Compensation & Benefits" icon="💰" expanded={expanded} toggle={toggle} accent={GREEN}>
        <div className="space-y-2 mb-3">
          {POLICY.compensation.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#10B98108" }}>
              <span className="text-sm">💰</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px]" style={{ color: GRAY }}>Subject to company policies and performance evaluation.</p>
      </CollapsibleCard>

      <CollapsibleCard id="benefits" title="Benefits" icon="🎁" expanded={expanded} toggle={toggle} accent={GREEN}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Qualified Country Managers may receive:</p>
        <div className="space-y-2">
          {POLICY.benefits.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#10B98108" }}>
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
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Country Managers must not:</p>
        <div className="space-y-2">
          {POLICY.confidentiality.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <X size={11} style={{ color: "#EB5757" }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="conduct" title="Professional Conduct" icon="🤝" expanded={expanded} toggle={toggle} accent={GREEN}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Country Managers must:</p>
        <div className="space-y-2">
          {POLICY.conduct.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: GREEN }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* Agreement */}
      <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #065F46 100%)" }}>
        <div className="text-2xl mb-2">📜</div>
        <h3 className="text-sm font-bold text-white mb-2">Agreement</h3>
        <p className="text-[11px] text-white/60 leading-relaxed">
          By serving as a Country Manager on VYRO Live Connect, the Country Manager agrees to comply with all company policies, executive procedures, compliance standards, governance requirements, and future organizational updates.
        </p>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] font-bold tracking-wider" style={{ color: `${GREEN}99` }}>END OF COUNTRY MANAGER POLICY DOCUMENT</p>
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