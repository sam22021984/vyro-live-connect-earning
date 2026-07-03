import React, { useState } from "react";
import { ChevronDown, Check, X, TrendingUp } from "lucide-react";

const DARK = "#0F1B3D";
const BLUE = "#3B82F6";
const PURPLE = "#8B5CF6";
const WHITE = "#FFFFFF";
const GRAY = "#6B7280";

const POLICY = {
  position: "Business Developer (BD)",
  department: "Management Department",
  reporting: "Country Manager (CM)",
  directOversight: ["Business Manager (BM)"],
  indirectOversight: ["Reward Manager (RM)", "PK Manager (PM)", "Event Manager (EM)", "Support Manager (SM)", "Marketing Manager (MM)", "Finance Manager (FM)"],
  purpose: "The Business Developer is responsible for business growth, market expansion, strategic partnerships, revenue development, operational improvement, and execution of business objectives. The Business Developer serves as the bridge between the Country Manager and Business Operations, ensuring that company goals are successfully implemented and achieved.",
  authority: {
    may: [
      "Supervise Business Manager",
      "Review departmental performance",
      "Propose growth strategies",
      "Recommend operational improvements",
      "Review revenue trends",
      "Monitor department KPIs",
      "Recommend promotional campaigns",
      "Evaluate market opportunities",
      "Submit business reports to Country Manager",
      "Coordinate with management departments",
    ],
    mayNot: [
      "Override Country Manager decisions",
      "Change company ownership structure",
      "Approve executive financial policies",
      "Modify commission systems",
      "Access Owner-level controls",
      "Approve major financial transactions",
      "Alter company governance policies",
      "Remove department heads without approval",
    ],
  },
  responsibilities: [
    { icon: "📈", title: "Business Growth", items: ["Develop growth strategies", "Identify new opportunities", "Expand market presence", "Improve business performance"] },
    { icon: "🎯", title: "Strategic Development", items: ["Execute business plans", "Support long-term company goals", "Monitor project implementation", "Improve operational efficiency"] },
    { icon: "📊", title: "Performance Management", items: ["Review Business Manager reports", "Monitor department performance", "Track growth metrics", "Improve productivity"] },
    { icon: "💰", title: "Revenue Development", items: ["Support revenue growth initiatives", "Analyze performance trends", "Recommend improvement strategies", "Assist in profitability enhancement"] },
    { icon: "📝", title: "Reporting", items: ["Prepare business reports", "Submit performance updates", "Present strategic recommendations", "Report directly to Country Manager"] },
  ],
  expectations: ["Achieve growth objectives", "Improve operational performance", "Increase revenue opportunities", "Support organizational expansion", "Maintain strong management standards", "Contribute to company success"],
  kpis: ["Revenue growth", "User growth", "Host growth", "Agent growth", "Department performance", "Market expansion", "Operational efficiency", "Business target achievement", "Strategic project success"],
  financial: {
    responsible: ["Business performance analysis", "Revenue growth planning", "Financial trend monitoring", "Business opportunity evaluation"],
    note: "Business Developers do NOT directly control company funds unless specifically authorized.",
  },
  prohibited: [
    { icon: "📊", title: "Business Violations", items: ["Misrepresentation of company information", "Unauthorized agreements", "Unauthorized commitments"] },
    { icon: "💰", title: "Financial Violations", items: ["Revenue manipulation", "False reporting", "Financial misconduct"] },
    { icon: "⚡", title: "Management Violations", items: ["Abuse of authority", "Unfair treatment", "Conflict of interest"] },
    { icon: "📋", title: "Compliance Violations", items: ["Ignoring company policies", "Concealing business risks", "Failure to report major issues"] },
  ],
  compensation: ["Management commission", "Growth incentives", "Performance bonuses", "Revenue achievement rewards", "Strategic development bonuses", "Annual excellence awards"],
  benefits: ["Business Developer Badge", "Executive Profile Frame", "Premium Chat Bubble", "VIP Status Benefits", "Leadership Recognition", "Priority Support", "Management Event Access", "Business Excellence Awards"],
  disciplinary: [
    { level: 1, action: "Management Warning", color: "#F59E0B" },
    { level: 2, action: "Performance Review", color: "#FB923C" },
    { level: 3, action: "Authority Restriction", color: "#F97316" },
    { level: 4, action: "Position Suspension", color: "#EF4444" },
    { level: 5, action: "Position Termination", color: "#DC2626" },
  ],
  confidentiality: ["Share business strategies", "Share financial reports", "Share confidential plans", "Share internal management information", "Disclose sensitive company data"],
  conduct: ["Demonstrate leadership", "Maintain professionalism", "Support company objectives", "Promote ethical practices", "Protect company interests", "Follow company policies"],
};

export default function BusinessDeveloperPolicyTab() {
  const [expanded, setExpanded] = useState("authority");
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #1E3A8A 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative text-center">
          <div className="text-3xl mb-1">🌐</div>
          <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
          <p className="text-[11px] mt-1" style={{ color: BLUE }}>Business Developer (BD) Policy, Authority, Responsibilities & Terms</p>
        </div>
      </div>

      {/* Position info */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2">
          <TrendingUp size={14} style={{ color: BLUE }} />
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
            <p className="text-[11px] font-semibold" style={{ color: PURPLE }}>🌍 {POLICY.reporting}</p>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[9px] mb-2" style={{ color: GRAY }}>👥 DIRECT OVERSIGHT</p>
            <div className="flex flex-wrap gap-1.5">
              {POLICY.directOversight.map((o, i) => (
                <span key={i} className="text-[10px] px-2 py-1 rounded-full" style={{ background: `${BLUE}10`, color: BLUE }}>{o}</span>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[9px] mb-2" style={{ color: GRAY }}>👥 INDIRECT OVERSIGHT</p>
            <div className="flex flex-wrap gap-1.5">
              {POLICY.indirectOversight.map((o, i) => (
                <span key={i} className="text-[10px] px-2 py-1 rounded-full" style={{ background: `${PURPLE}10`, color: PURPLE }}>{o}</span>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[9px] mb-1" style={{ color: GRAY }}>ROLE PURPOSE</p>
            <p className="text-[11px] leading-relaxed" style={{ color: GRAY }}>{POLICY.purpose}</p>
          </div>
        </div>
      </div>

      <CollapsibleCard id="authority" title="Authority Level" icon="🔐" expanded={expanded} toggle={toggle} accent={BLUE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Business Developer has senior management authority over business operations.</p>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ Business Developer MAY:</p>
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
            <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>❌ Business Developer MAY NOT:</p>
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

      <CollapsibleCard id="responsibilities" title="Primary Responsibilities" icon="📋" expanded={expanded} toggle={toggle} accent={PURPLE}>
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
                    <Check size={10} style={{ color: PURPLE }} />
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

      <CollapsibleCard id="kpis" title="Key Performance Indicators (KPIs)" icon="📊" expanded={expanded} toggle={toggle} accent={PURPLE}>
        <div className="grid grid-cols-2 gap-2">
          {POLICY.kpis.map((item, i) => (
            <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: "#8B5CF608", border: "1px solid #8B5CF615" }}>
              <p className="text-[10px]" style={{ color: GRAY }}>{item}</p>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="financial" title="Financial Responsibilities" icon="💰" expanded={expanded} toggle={toggle} accent={BLUE}>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ Responsible for:</p>
            <div className="space-y-1.5">
              {POLICY.financial.responsible.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={10} style={{ color: "#27AE60" }} />
                  <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <div className="rounded-xl p-3" style={{ background: "#EB575708", border: "1px solid #EB575710" }}>
              <p className="text-[11px]" style={{ color: "#EB5757" }}>{POLICY.financial.note}</p>
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
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Eligible Business Developers may receive:</p>
        <div className="space-y-2">
          {POLICY.compensation.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#3B82F608" }}>
              <span className="text-sm">💰</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="benefits" title="Benefits" icon="🎁" expanded={expanded} toggle={toggle} accent={BLUE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Qualified Business Developers may receive:</p>
        <div className="space-y-2">
          {POLICY.benefits.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#3B82F608" }}>
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

      <CollapsibleCard id="confidentiality" title="Confidentiality" icon="🔒" expanded={expanded} toggle={toggle} accent={PURPLE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Business Developers must not:</p>
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
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Business Developers must:</p>
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
          By serving as a Business Developer on VYRO Live Connect, the Business Developer agrees to comply with all company policies, management procedures, compliance standards, confidentiality requirements, and future organizational updates.
        </p>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] font-bold tracking-wider" style={{ color: `${BLUE}99` }}>END OF BUSINESS DEVELOPER POLICY DOCUMENT</p>
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